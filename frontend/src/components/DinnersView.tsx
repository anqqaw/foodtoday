import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import SearchBar from "./SearchBar";

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
  const [currentDinnerIndex, setCurrentDinnerIndex] = useState<number | null>(
    null
  );
  const [hovering, setHovering] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDinners = async () => {
      const token = localStorage.getItem("googleAuthToken");
      if (token) {
        try {
          const response = await axios.get(`${ENDPOINT}/api/dinners`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          console.log(`Reponse data`, response.data);

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
    currentDinnerIndex !== null && dinners[currentDinnerIndex]
      ? dinners[currentDinnerIndex]
      : null;


  console.log("Current Dinner:", currentDinner);

  return (
    <div className="relative min-h-screen w-full">
      {currentDinner === null ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <button
            onClick={handleRandomize}
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
      ) : (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${currentDinner.images}')`,
            }}
          ></div>

          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          <div className="absolute bottom-10 left-10 text-white space-y-4">
            <h1
              className="text-4xl font-bold"
              onClick={() => navigate(`/dinner/${encodeURIComponent(currentDinner.title)}`)}>
              {currentDinner.title}
            </h1>
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

          <div
            className="absolute top-0 left-0 w-1/2 h-1/4 cursor-pointer"
            onClick={handlePrevious}
            onMouseEnter={() => setHovering("Previous")}
            onMouseLeave={() => setHovering(null)}
          ></div>
          <div
            className="absolute top-0 right-0 w-1/2 h-1/4 cursor-pointer"
            onClick={handleNext}
            onMouseEnter={() => setHovering("Next")}
            onMouseLeave={() => setHovering(null)}
          ></div>

          {hovering && (
            <div
              className={`absolute ${hovering === "Previous" ? "left-4" : "right-4"
                } top-10 text-lg font-semibold text-white`}
            >
              {hovering}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DinnersView;
