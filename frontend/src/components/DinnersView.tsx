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
  const [currentDinnerIndex, setCurrentDinnerIndex] = useState(0);

  useEffect(() => {
    const fetchDinners = async () => {
      const token = localStorage.getItem("googleAuthToken");
      if (token) {
        try {
          const response = await axios.get(`${ENDPOINT}/api/dinners`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("API Response Data:", response.data);

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
      prevIndex > 0 ? prevIndex - 1 : dinners.length - 1
    );
  };

  const handleNext = () => {
    setCurrentDinnerIndex((prevIndex) =>
      prevIndex < dinners.length - 1 ? prevIndex + 1 : 0
    );
  };

  if (dinners.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading dinners...</p>
      </div>
    );
  }

  const currentDinner = dinners[currentDinnerIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="relative rounded-lg overflow-hidden shadow-lg bg-white w-full max-w-xl">
        <div
          className="h-64 bg-cover bg-center"
          style={{
            backgroundImage: `url('${currentDinner.images}')`,
          }}
        ></div>

        <div className="p-6">
          <h4 className="text-2xl font-bold text-gray-800 mb-4">
            {currentDinner.title}
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            {currentDinner.description}
          </p>
          <div className="text-sm text-gray-600 space-y-1">
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
              <span className="font-medium">{currentDinner.totalTime} minutes</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6 w-full max-w-xl">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DinnersView;
