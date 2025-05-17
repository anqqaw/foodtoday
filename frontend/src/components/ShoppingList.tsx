import React, { useEffect, useState } from "react";
import { fetchShoppingList, clearShoppingList, deleteFromShoppingList, toggleItemCompleted } from "../helpers/api";
import ShoppingListItemCard from "./ShoppingListItemCard";

interface ShoppingListItem {
  id: number;
  title: string;
  completed?: boolean;
}

const ShoppingList: React.FC = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadShoppingList = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchShoppingList();

        if (response && Array.isArray(response.shoppingList)) {
          const items = response.shoppingList.map((item: any) => ({
            id: item.id,
            title: item.title,
            completed: item.completed ?? false,
          }));

          setShoppingList(items);
        } else {
          setError("Unexpected shopping list format");
        }
      } catch (error) {
        console.error("Error loading shopping list:", error);
        setError("Failed to load shopping list.");
      } finally {
        setLoading(false);
      }
    };

    loadShoppingList();
  }, []);

  const handleClearList = async () => {
    try {
      await clearShoppingList();
      setShoppingList([]);
    } catch (error) {
      console.error("Error clearing shopping list:", error);
      setError("Failed to clear shopping list.");
    }
  };

  const handleRemoveItem = async (id: number) => {
    try {
      const response = await deleteFromShoppingList(id);
      const updatedList = response.shoppingList as { id: number; title: string; completed: boolean }[];
      setShoppingList(updatedList);
    } catch (error) {
      console.error("Error deleting item from shopping list:", error);
      setError("Failed to delete item.");
    }
  };

  const handleToggleItem = async (id: number) => {
    try {
      const response = await toggleItemCompleted(id);
      setShoppingList(response.shoppingList);
    } catch (error) {
      console.error("Error toggling item in shopping list:", error);
      setError("Failed to toggle item.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-[#E7C36E]">
        <p className="text-lg animate-pulse">Loading shopping list...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-[#E7C36E] font-['Space_Grotesk'] px-4 py-8">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6">Shopping List</h1>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : shoppingList.length === 0 ? (
        <p className="text-center text-[#E7C36E]/70">Your shopping list is empty</p>
      ) : (
        <div className="space-y-4">
          {shoppingList.map((item) => (
            <ShoppingListItemCard
              key={item.id}
              id={item.id}
              title={item.title}
              completed={item.completed}
              onDelete={handleRemoveItem}
              onToggle={handleToggleItem}
            />
          ))}
        </div>
      )}

      {shoppingList.length > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleClearList}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
