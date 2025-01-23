import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDinners, Dinner } from "../helpers/api";
import HamburgerMenu from "./HamburgerMenu";
import DinnerCard from "./DinnerCard";
import DinnerNavigation from "./DinnerNavigation";

const DinnersView: React.FC = () => {
  const [dinners, setDinners] = useState<Dinner[]>([]);
  const [filteredDinners, setFilteredDinners] = useState<Dinner[]>([]);
  const [currentDinnerIndex, setCurrentDinnerIndex] = useState<number | null>(
    null
  );

  const navigate = useNavigate();

  useEffect(() => {
    const loadDinners = async () => {
      try {
        const fetchedDinners = await fetchDinners();
        setDinners(fetchedDinners);
        setFilteredDinners(fetchedDinners);

        if (fetchedDinners.length > 0) {
          const randomIndex = Math.floor(Math.random() * fetchedDinners.length);
          setCurrentDinnerIndex(randomIndex);
        }
      } catch (error) {
        console.error("Error loading dinners:", error);
      }
    };

    loadDinners();
  }, []);

  const currentDinner =
    currentDinnerIndex !== null && filteredDinners[currentDinnerIndex]
      ? filteredDinners[currentDinnerIndex]
      : null;

  return (
    <div className="relative min-h-screen w-full">
      {currentDinner ? (
        <div>
          <DinnerCard dinner={currentDinner} navigate={navigate} />
          <DinnerNavigation
            currentIndex={currentDinnerIndex}
            dinners={filteredDinners}
            setCurrentDinnerIndex={setCurrentDinnerIndex}
          />
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
