import React from "react";
import { useNavigate } from "react-router-dom";

const HamburgerMenu: React.FC = () => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate("/dinners-list");
  };

  return (
    <div className="relative">
      <button
        onClick={handleMenuClick}
        className="p-4 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100 transition-transform transform hover:scale-110 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default HamburgerMenu;
