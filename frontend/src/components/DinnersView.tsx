import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { fetchRandomDinner, Dinner } from "../helpers/api";
import HamburgerMenu from "./HamburgerMenu";
import DinnerCard from "./DinnerCard";

const DinnersView: React.FC = () => {
  const [dinners, setDinners] = useState<Dinner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const loadRandomDinner = useCallback(async () => {
    try {
      const newDinner = await fetchRandomDinner();
      setDinners((prev) => {
        const updatedDinners = [...prev, newDinner];
        setCurrentIndex(updatedDinners.length - 1);
        return updatedDinners;
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    if (dinners.length === 0) {
      loadRandomDinner();
    }
  }, [dinners.length, loadRandomDinner]);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedDown: () => loadRandomDinner(), // Swipe left to get a new recipe
    onSwipedUp: () => {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1); // Swipe right to go back
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div {...handlers} className="relative w-full h-screen overflow-hidden">
      {dinners.length > 0 && (
        <div className="relative min-h-screen flex flex-col items-center justify-center">
          <DinnerCard dinner={dinners[currentIndex]} navigate={navigate} />
        </div>
      )}

      <div className="fixed bottom-4 right-4 z-50">
        <HamburgerMenu />
      </div>
    </div>
  );
};

export default DinnersView;
