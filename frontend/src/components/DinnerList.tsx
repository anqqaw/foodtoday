import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchDinners, Dinner } from "../helpers/api";

const DinnerList: React.FC = () => {
  const [dinners, setDinners] = useState<Dinner[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  let debounceTimeout: number | null = null;

  const fetchData = async (query: string) => {
    try {
      const result = await searchDinners(query);
      setDinners(result);
    } catch (error) {
      console.error("Error fetching dinners:", error);
    }
  };

  useEffect(() => {
    if (debounceTimeout) clearTimeout(debounceTimeout);

    debounceTimeout = window.setTimeout(() => {
      fetchData(searchQuery);
    }, 500);

    return () => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
    };
  }, [searchQuery]);

  return (
    <div className="min-h-screen p-8 bg-black text-white font-['Space_Grotesk'] pb-20">
      <div className="flex justify-between items-center mb-6">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search dinners..."
          className="w-64 p-3 rounded-lg text-white opacity-50 focus:ring-2 focus:ring-[#E7C36E] outline-none"
        />
      </div>

      {dinners.length === 0 ? (
        <p className="text-gray-600 text-lg">No dinners found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dinners.map((dinner) => (
            <div
              key={dinner.id}
              className="relative overflow-hidden rounded-lg transform hover:scale-105 transition duration-200 cursor-pointer"
              onClick={() => navigate(`/dinner/${dinner.id}`)}
            >
              {dinner.images && (
                <div
                  className="w-full h-56 bg-cover bg-center"
                  style={{ backgroundImage: `url('${dinner.images}')` }}
                />
              )}
              <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur-sm p-3 flex flex-col items-center text-center">
                <h2 className="text-lg font-semibold text-white">{dinner.title}</h2>
                <div className="flex text-gray-300 text-sm mt-1">
                  <span>{dinner.preparationTime} min</span>
                  <span className="mx-2">•</span>
                  <span>{dinner.totalTime} min</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DinnerList;
