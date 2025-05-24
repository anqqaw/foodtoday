import React, { useEffect, useState } from "react";
import { fetchShoppingList, clearShoppingList, deleteFromShoppingList, toggleItemCompleted, createShoppingListItem } from "../helpers/api";
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
  const [showInput, setShowInput] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");

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

  const handleAddItem = async () => {
    if (!newItemTitle.trim()) return;

    try {
      await createShoppingListItem(newItemTitle.trim());
      setNewItemTitle("");
      setShowInput(false);

      const response = await fetchShoppingList();
      setShoppingList(response.shoppingList);
    } catch (error) {
      console.error("Error adding new item:", error);
      setError("Failed to add new item.");
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
      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}

      {showInput && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddItem();
          }}
          className="mb-4 flex items-center gap-2"
        >
          <input
            value={newItemTitle}
            onChange={(e) => setNewItemTitle(e.target.value)}
            placeholder="Add item..."
            className="bg-gray-800 text-white border border-[#E7C36E] px-4 py-2 rounded-lg w-full"
            autoFocus
          />
        </form>
      )}

      {shoppingList.length === 0 ? (
        <p className="text-center text-[#E7C36E]/70">Your shopping list is empty</p>
      ) : (
        <div className="space-y-4">
          {shoppingList.map((item, index) => (
            <ShoppingListItemCard
              key={item.id}
              id={item.id}
              title={item.title}
              completed={item.completed}
              onDelete={handleRemoveItem}
              onToggle={handleToggleItem}
              onAdd={index === 0 ? () => setShowInput(true) : undefined}
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
