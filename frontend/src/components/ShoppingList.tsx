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
      await deleteFromShoppingList(id);
      setShoppingList((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item from shopping list:", error);
      setError("Failed to delete item.");
    }
  };

  const handleToggleItem = async (id: number) => {
    try {
      await toggleItemCompleted(id);
      setShoppingList((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      );
    } catch (error) {
      console.error("Error toggling item in shopping list:", error);
      setError("Failed to toggle item.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg animate-pulse">Loading shopping list...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-['Space_Grotesk']">
      <div className="max-w-6xl mx-auto px-6 lg:px-0 py-10">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6">Shopping List</h1>

        {error ? (
          <p className="text-red-500 text-center text-lg">{error}</p>
        ) : shoppingList.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">Your shopping list is empty</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleClearList}
              className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Clear Shopping List
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
