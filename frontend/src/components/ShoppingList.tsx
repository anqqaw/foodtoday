import React, { useState, useEffect } from 'react';
import { fetchShoppingList, deleteFromShoppingList } from '../helpers/api';

const ShoppingList: React.FC = () => {
  const [shoppingList, setShoppingList] = useState<{ qty?: number; unit?: string; name: string }[]>([]);

  const loadShoppingList = async () => {
    try {
      const list = await fetchShoppingList();
      setShoppingList(list);
    } catch (e) {
      console.error('Error loading shopping list:', e);
    }
  };

  useEffect(() => {
    loadShoppingList();
  }, []);

  const handleRemove = async (itemName: string) => {
    try {
      const updateList = await deleteFromShoppingList(itemName);
      setShoppingList(updateList);
    } catch (e) {
      console.error('Error deleting item from shopping list:', e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-['Space_Grotesk'] flex justify-center items-center p-6">
      {shoppingList.length > 0 ? (
        <div className="text-lg text-gray-700 space-y-4">
          {shoppingList.map((item, index) => (
            <div
              key={index}
              className="leading-relaxed bg-white-100 p-3 rounded-lg w-full max-w-md shadow-lg rounded-xl p-6"
              onClick={() => handleRemove(item.name)}
            >
              {item.qty && item.unit ? `${item.qty} ${item.unit} ${item.name}` : item.name}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-lg">Shopping list is empty</p>
      )}
    </div>
  );
};

export default ShoppingList;
