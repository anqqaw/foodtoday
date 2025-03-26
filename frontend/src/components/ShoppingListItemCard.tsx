import React from "react";
import { useSwipeable } from "react-swipeable";

interface Props {
  id: number;
  title: string;
  completed?: boolean;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const ShoppingListItemCard: React.FC<Props> = ({ id, title, completed, onDelete, onToggle }) => {
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => onToggle(id),
    onSwipedRight: () => onDelete(id),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div
      {...swipeHandlers}
      className={`bg-white shadow-lg rounded-xl overflow-hidden transform transition hover:scale-105 cursor-pointer ${completed ? "opacity-50 line-through" : ""
        }`}
    >
      <div className="p-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
    </div>
  );
};

export default ShoppingListItemCard;
