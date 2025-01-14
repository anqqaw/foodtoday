import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
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

      {/* Menu Content */}
      {isOpen && (
        <div className="absolute top-14 left-0 bg-white w-80 rounded-lg shadow-2xl p-6 z-50 animate-fade-in">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Menu
          </h3>
          <ul className="space-y-3">
            <li
              className="cursor-pointer p-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              onClick={() => {
                setIsOpen(false);
                navigate("/dinners-list");
              }}
            >
              Dinners
            </li>
            <li
              className="cursor-pointer p-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              onClick={() => {
                setIsOpen(false);
                navigate("/contact-us");
              }}
            >
              Contact Us
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
