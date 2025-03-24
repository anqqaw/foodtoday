import React, { useEffect, useState } from "react";
import { fetchShoppingList, clearShoppingList, deleteFromShoppingList } from "../helpers/api";

const ShoppingList: React.FC = () => {
  const [shoppingList, setShoppingList] = useState<{ id: number; itemName: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadShoppingList = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchShoppingList();

        if (response && Array.isArray(response.shoppingList)) {
          const extractedItems = response.shoppingList.flatMap((listItem) =>
            listItem.title.split(",").map((item) => ({
              id: listItem.id,
              itemName: item.trim(),
            }))
          );

          setShoppingList(extractedItems);
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
      setShoppingList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item from shopping list:", error);
      setError("Failed to delete item.");
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
            {shoppingList.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl overflow-hidden transform transition hover:scale-105 cursor-pointer"
                onClick={() => handleRemoveItem(item.id)}
              >
                <div className="p-6 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">{item.itemName}</h2>
                </div>
              </div>
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
