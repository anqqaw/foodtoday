import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ENDPOINT = process.env.REACT_APP_API_URL || "http://localhost:9000";

interface Dinner {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  preparationTime: number;
  totalTime: number;
  images?: string[];
}

const DinnerList: React.FC = () => {
  const [dinners, setDinners] = useState<Dinner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDinners = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("googleAuthToken");
        const response = await axios.get<{ dinners: Dinner[] }>(
          `${ENDPOINT}/api/dinners-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setDinners(response.data.dinners);
      } catch (err) {
        console.error("Error fetching dinners:", err);
        setError("Failed to fetch dinners. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDinners();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading dinners...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Available Dinners</h1>
      {dinners.length === 0 ? (
        <p className="text-gray-600 text-lg">No dinners available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dinners.map((dinner) => (
            <div
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300"
              onClick={() => navigate(`/dinner/${dinner.id}`)}
            >
              {dinner.images && dinner.images[0] && (
                <div
                  className="h-40 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${dinner.images[0]}')`,
                  }}
                ></div>
              )}
              <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-800">{dinner.title}</h2>
                <p className="text-gray-600 mt-2">{dinner.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Difficulty: <span className="font-medium">{dinner.difficulty}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Preparation Time: {dinner.preparationTime} mins
                </p>
                <p className="text-sm text-gray-500">
                  Total Time: {dinner.totalTime} mins
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DinnerList;
