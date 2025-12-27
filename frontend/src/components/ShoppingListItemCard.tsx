import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

interface Props {
  id: number;
  title: string;
  completed?: boolean;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onAdd?: () => void;
}

const ShoppingListItemCard: React.FC<Props> = ({
  id,
  title,
  completed,
  onDelete,
  onToggle,
  onAdd,
}) => {
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | "down" | null>(null);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setSwipeDirection("left");
      onToggle(id);
      setTimeout(() => setSwipeDirection(null), 300);
    },
    onSwipedRight: () => {
      setSwipeDirection("right");
      setTimeout(() => {
        onDelete(id);
        setSwipeDirection(null)
      }, 300);
    },
    onSwipedDown: () => {
      setSwipeDirection("down");
      if (onAdd) onAdd();
      setTimeout(() => setSwipeDirection(null), 300);
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true,
    delta: 10,
  });

  const bgColor =
    swipeDirection === "left"
      ? "bg-[#047857]"
      : swipeDirection === "right"
        ? "bg-red-600"
        : swipeDirection === "down"
          ? "bg-black"
          : "bg-transparent";

  const icon =
    swipeDirection === "left" ? "✅" : swipeDirection === "right" ? "❌" : null;

  return (
    <div
      {...swipeHandlers}
      className={`relative w-full transition-all duration-300 rounded-md overflow-hidden ${bgColor}`}
    >
      {icon && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl text-white z-10">
          {icon}
        </div>
      )}
      <div
        className={`w-full px-6 py-4 ${completed ? "text-gray-500 line-through" : "text-[#E7C36E]"
          }`}
      >
        {title}
      </div>
    </div>
  );
};

export default ShoppingListItemCard;
