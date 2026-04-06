import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Shuffle, UtensilsCrossed, ShoppingCart, Settings } from "lucide-react";

const BottomNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Shuffle, label: "Random", path: "/" },
    { icon: UtensilsCrossed, label: "Dinners", path: "/dinners" },
    { icon: ShoppingCart, label: "Shopping", path: "/shoppinglist" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-t border-amber-100 dark:border-gray-800 z-50 transition-colors">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all"
            >
              <Icon
                className={`w-5 h-5 transition-colors ${
                  isActive
                    ? "text-amber-500 dark:text-[#E7C36E]"
                    : "text-gray-400 dark:text-gray-500"
                }`}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive
                    ? "text-amber-500 dark:text-[#E7C36E]"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-amber-500 dark:bg-[#E7C36E]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavBar;
