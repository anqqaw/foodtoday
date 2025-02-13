import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRandomDinner, Dinner } from "../helpers/api";
import HamburgerMenu from "./HamburgerMenu";
import DinnerCard from "./DinnerCard";

const DinnersView: React.FC = () => {
  const [currentDinner, setCurrentDinner] = useState<Dinner | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRandomDinner = async () => {
      try {
        const randomDinner = await fetchRandomDinner();
        setCurrentDinner(randomDinner);
      } catch (error) {
        console.error("Error fetching random dinner:", error);
      }
    };

    loadRandomDinner();
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      {currentDinner ? (
        <div>
          <DinnerCard dinner={currentDinner} navigate={navigate} />
          <div className="absolute bottom-4 right-4">
            <HamburgerMenu />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <p className="text-gray-600 text-lg">No dinner selected.</p>
        </div>
      )}
    </div>
  );
};

export default DinnersView;
