import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDinners, searchDinners, Dinner } from "../helpers/api";

const DinnerList: React.FC = () => {
  const [dinners, setDinners] = useState<Dinner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = searchQuery ? await searchDinners(searchQuery) : await fetchDinners();
        setDinners(result);
      } catch (err) {
        setError("Failed to fetch dinners. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchData, 300);
    return () => clearTimeout(debounceFetch);
  }, [searchQuery]);

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Available Dinners</h1>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search dinners..."
          className="w-64 p-2 border rounded shadow-sm"
        />
      </div>

      {dinners.length === 0 ? (
        <p className="text-gray-600 text-lg">No dinners found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dinners.map((dinner) => (
            <div
              key={dinner.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer"
              onClick={() => navigate(`/dinner/${dinner.id}`)}
            >
              {dinner.images && (
                <div
                  className="h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url('${dinner.images}')` }}
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
