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
      <div className="min-h-screen flex items-center justify-center bg-amber-50 dark:bg-black transition-colors">
        <p className="text-lg animate-pulse text-amber-500 dark:text-[#E7C36E]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-black font-['Space_Grotesk'] transition-colors">
      {/* Header */}
      <div className="px-6 pt-10 pb-4 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 dark:text-[#E7C36E] mb-1">Your list</p>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Shopping</h1>
        </div>
        <button
          onClick={() => setShowInput(true)}
          className="w-10 h-10 rounded-full bg-amber-500 dark:bg-[#E7C36E] text-white dark:text-black flex items-center justify-center text-xl font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
          aria-label="Add item"
        >
          +
        </button>
      </div>

      <div className="px-4 pb-24">
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
              className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-amber-300 dark:border-gray-700 px-4 py-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
              autoFocus
            />
          </form>
        )}

        {shoppingList.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-20 text-center">
            <p className="text-4xl mb-3">🛒</p>
            <p className="text-gray-400 dark:text-gray-500 font-medium">Your shopping list is empty.</p>
            <p className="text-gray-300 dark:text-gray-600 text-sm mt-1">Tap + to add items.</p>
          </div>
        ) : (
          <div className="space-y-3">
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
              type="button"
              onClick={handleClearList}
              className="px-4 py-2 rounded-xl border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-300 text-sm font-semibold shadow-sm hover:bg-red-100 dark:hover:bg-red-900/50 active:scale-95 transition-all"
            >
              Clear all items
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
