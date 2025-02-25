import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { emoji: "🏠", label: "Home", path: "/" },
    { emoji: "🍽️", label: "Dinners", path: "/dinners" },
    { emoji: "⚙️", label: "Settings", path: "/settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around items-center py-3 border-t border-gray-200 z-50">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center text-gray-500 hover:text-gray-700 transition-all ${location.pathname === item.path ? "text-blue-500 font-bold" : ""
            }`}
        >
          <span className="text-2xl">{item.emoji}</span>
          <span className="text-sm">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavBar;
