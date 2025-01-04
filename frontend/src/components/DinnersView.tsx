import React, { useEffect, useState } from "react";
import axios from "axios";

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
  const [currentDinnerIndex, setCurrentDinnerIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchDinners = async () => {
      const token = localStorage.getItem("googleAuthToken");
      if (token) {
        try {
          const response = await axios.get(`${ENDPOINT}/api/dinners`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.data.dinners && response.data.dinners.length > 0) {
            setDinners(response.data.dinners);
          } else {
            console.error("No dinners found in the API response.");
          }
        } catch (error) {
          console.error("Error fetching dinners:", error);
        }
      }
    };

    fetchDinners();
  }, []);

  const handlePrevious = () => {
    setCurrentDinnerIndex((prevIndex) =>
      prevIndex !== null && prevIndex > 0 ? prevIndex - 1 : dinners.length - 1
    );
  };

  const handleNext = () => {
    setCurrentDinnerIndex((prevIndex) =>
      prevIndex !== null && prevIndex < dinners.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleRandomize = () => {
    if (dinners.length > 0) {
      const randomIndex = Math.floor(Math.random() * dinners.length);
      setCurrentDinnerIndex(randomIndex);
    }
  };

  if (dinners.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading dinners...</p>
      </div>
    );
  }

  const currentDinner =
    currentDinnerIndex !== null ? dinners[currentDinnerIndex] : null;

  return (
    <div className="relative min-h-screen w-full">
      {currentDinner === null ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <button
            onClick={handleRandomize}
            className="w-40 h-40 bg-blue-500 text-white text-lg font-bold rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-all"
          >
            <span
              className="text-gray-900 font-bold text-2xl shadow-md"
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            ></span>
            DinnrMeUp
          </button>
        </div>
      ) : (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${currentDinner.images}')`,
            }}
          ></div>

          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          <div className="absolute bottom-10 left-10 text-white space-y-4">
            <h1 className="text-4xl font-bold">{currentDinner.title}</h1>
            <p className="text-lg">{currentDinner.description}</p>
            <p>
              Difficulty:{" "}
              <span className="font-medium">{currentDinner.difficulty}</span>
            </p>
            <p>
              Preparation Time:{" "}
              <span className="font-medium">
                {currentDinner.preparationTime} minutes
              </span>
            </p>
            <p>
              Total Time:{" "}
              <span className="font-medium">
                {currentDinner.totalTime} minutes
              </span>
            </p>
          </div>

          <button
            onClick={handlePrevious}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-70 text-black text-lg font-semibold px-4 py-2 rounded-full"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-70 text-black text-lg font-semibold px-4 py-2 rounded-full"
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default DinnersView;
