import React from "react";

interface RandomizerButtonProps {
  onClick: () => void;
}

const RandomizerButton: React.FC<RandomizerButtonProps> = ({ onClick }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={onClick}
        className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 shadow-md flex items-center justify-center hover:scale-105 transition-transform duration-300"
      >
        <span
          className="text-lg font-bold text-gray-700 drop-shadow-lg font-sans"
          style={{
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          DinnrMeUp
        </span>
      </button>
    </div>
  );
};

export default RandomizerButton;
