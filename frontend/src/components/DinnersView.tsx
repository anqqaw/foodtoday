import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import DinnerCard from "./DinnerCard";
import DinnerNavigation from "./DinnerNavigation";

const ENDPOINT = process.env.REACT_APP_API_URL || "http://localhost:9000";

interface Dinner {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  preparationTime: number;
  totalTime: number;
  images: string;
}

const DinnersView: React.FC = () => {
  const [dinners, setDinners] = useState<Dinner[]>([]);
  const [filteredDinners, setFilteredDinners] = useState<Dinner[]>([]);
  const [currentDinnerIndex, setCurrentDinnerIndex] = useState<number | null>(
    null
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDinners = async () => {
      const token = localStorage.getItem("googleAuthToken");
      if (token) {
        try {
          const response = await axios.get(`${ENDPOINT}/api/dinners`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const fetchedDinners = response.data.dinners || [];
          setDinners(fetchedDinners);
          setFilteredDinners(fetchedDinners);

          if (fetchedDinners.length > 0) {
            const randomIndex = Math.floor(Math.random() * fetchedDinners.length);
            setCurrentDinnerIndex(randomIndex);
          }
        } catch (error) {
          console.error("Error fetching dinners:", error);
        }
      }
    };
    fetchDinners();
  }, []);

  /*
  if (dinners.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading dinners...</p>
      </div>
    );
  }
  */

  const currentDinner =
    currentDinnerIndex !== null && filteredDinners[currentDinnerIndex]
      ? filteredDinners[currentDinnerIndex]
      : null;

  return (
    <div className="relative min-h-screen w-full">
      <div className="flex justify-between items-center p-4">
        <div className="absolute top-4 left-4">
          <HamburgerMenu />
        </div>
      </div>
      {currentDinner ? (
        <>
          <DinnerCard dinner={currentDinner} navigate={navigate} />
          <DinnerNavigation
            currentIndex={currentDinnerIndex}
            dinners={filteredDinners}
            setCurrentDinnerIndex={setCurrentDinnerIndex}
          />
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <p className="text-gray-600 text-lg">No dinner selected.</p>
        </div>
      )}
    </div>
  );
};

export default DinnersView;
