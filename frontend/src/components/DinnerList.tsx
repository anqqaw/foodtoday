import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDinners, searchDinners, Dinner } from "../helpers/api";

const DinnerList: React.FC = () => {
  const [dinners, setDinners] = useState<Dinner[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  const debounceTimeoutRef = useRef<number | null>(null);

  const fetchData = async (query: string) => {
    try {
      const result = query ? await searchDinners(query) : await fetchDinners();
      setDinners(result);
    } catch (error) {
      console.error("Error fetching dinners:", error);
    }
  };

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = window.setTimeout(() => {
      fetchData(searchQuery);
    }, 500);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchQuery, fetchData]);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900">Available Dinners</h1>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search dinners..."
          className="w-64 p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {dinners.length === 0 ? (
        <p className="text-gray-600 text-lg">No dinners found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dinners.map((dinner) => (
            <div
              key={dinner.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer"
              onClick={() => navigate(`/dinner/${dinner.id}`)}
            >
              {dinner.images && (
                <div
                  className="h-32 bg-cover bg-center rounded-t-xl"
                  style={{ backgroundImage: `url('${dinner.images}')` }}
                ></div>
              )}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-900">{dinner.title}</h2>
                <p className="text-gray-700 mt-2">{dinner.description}</p>
                <p className="text-sm text-gray-500 mt-2">
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
