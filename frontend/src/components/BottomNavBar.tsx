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
    <div className="fixed bottom-0 left-0 w-full h-16 bg-black shadow-lg flex justify-around items-center border-t border-gray-800 z-50">
      {menuItems.map((item, idx) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={idx}
            onClick={() => navigate(item.path)}
            className={`
              flex flex-col items-center transition-all
              ${isActive
                ? "text-[#E7C36E] font-bold"
                : "text-gray-400 hover:text-gray-200"}
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
