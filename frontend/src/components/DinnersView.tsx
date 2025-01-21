import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import HamburgerMenu from "./HamburgerMenu";
import RandomizerButton from "./RandomizerButton";
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
          const response = await axios.get(`${ENDPOINT}/api/dinners-list`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setDinners(response.data.dinners || []);
          setFilteredDinners(response.data.dinners || []);
        } catch (error) {
          console.error("Error fetching dinners:", error);
        }
      }
    };
    fetchDinners();
  }, []);

  const handleRandomize = () => {
    if (filteredDinners.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredDinners.length);
      setCurrentDinnerIndex(randomIndex);
    }
  };

  const handleSearchResults = (results: Dinner[]) => {
    setFilteredDinners(results);
    setCurrentDinnerIndex(null);
  };

  if (dinners.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading dinners...</p>
      </div>
    );
  }

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
        <SearchBar onSearchResults={handleSearchResults} />
      </div>

      {currentDinner === null ? (
        <RandomizerButton onClick={handleRandomize} />
      ) : (
        <>
          <DinnerCard dinner={currentDinner} navigate={navigate} />
          <DinnerNavigation
            currentIndex={currentDinnerIndex}
            dinners={filteredDinners}
            setCurrentDinnerIndex={setCurrentDinnerIndex}
          />
        </>
      )}
    </div>
  );
};

export default DinnersView;
