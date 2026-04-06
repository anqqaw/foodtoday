import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { emoji: "", label: "Random", path: "/" },
    { emoji: "", label: "Dinners", path: "/dinners" },
    { emoji: "", label: "Shopping List", path: "/shoppinglist" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-white dark:bg-black shadow-lg flex justify-around items-center border-t border-gray-200 dark:border-gray-800 z-50 transition-colors">
      {menuItems.map((item, idx) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={idx}
            onClick={() => navigate(item.path)}
            className={`
              flex flex-col items-center transition-all
              ${isActive
                ? "text-amber-600 dark:text-[#E7C36E] font-bold"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}
            `}
          >
            <span className="text-2xl">{item.emoji}</span>
            <span className="text-sm">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNavBar;
