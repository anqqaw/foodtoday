import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  searchDinners,
  Dinner,
} from "../helpers/api";

type PrepTimeFilter = number | null;

const DinnerList: React.FC = () => {
  const [dinners, setDinners] = useState<Dinner[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [prepTimeFilter, setPrepTimeFilter] = useState<PrepTimeFilter>(null);
  const [isPrepDropdownOpen, setIsPrepDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const debounceTimeout = useRef<number | null>(null);
  const prepDropdownRef = useRef<HTMLDivElement | null>(null);

  const prepTimeLabel = prepTimeFilter ? `${prepTimeFilter} min or less` : "Any prep time";

  const applyLocalFilterFallback = (items: Dinner[]) => {
    return items.filter((dinner) => {
      if (prepTimeFilter !== null && dinner.preparationTime > prepTimeFilter) return false;
      return true;
    });
  };

  const fetchData = async () => {
    try {
      const searched = await searchDinners(searchQuery, {
        maxPrepTime: prepTimeFilter ?? undefined,
      });

      const fallbackFiltered = applyLocalFilterFallback(searched);
      setDinners(fallbackFiltered);
    } catch (error) {
      console.error("Error fetching dinners:", error);
    }
  };

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const options = await fetchDinnerFilters();
        setFilterOptions({
          prepTimes: options.prepTimes.length > 0 ? options.prepTimes : [15, 30, 45, 60],
          diets: options.diets,
        });
      } catch (error) {
        console.error("Error loading dinner filter options:", error);
      }
    };

    loadFilterOptions();
  }, []);

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = window.setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [searchQuery, prepTimeFilter]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const targetNode = event.target as Node;
      if (prepDropdownRef.current && !prepDropdownRef.current.contains(targetNode)) {
        setIsPrepDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-black text-gray-900 dark:text-white font-['Space_Grotesk'] pb-20 transition-colors">
      {/* Header */}
      <div className="px-6 pt-10 pb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 dark:text-[#E7C36E] mb-1">Browse</p>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Dinners</h1>
      </div>

      <div className="px-6 mb-6">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search dinners..."
          className="w-full p-3 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-amber-100 dark:border-gray-800 focus:ring-2 focus:ring-amber-400 dark:focus:ring-[#E7C36E] outline-none transition-all shadow-sm"
        />
      </div>

      <div className="px-6 mb-6">
        <div ref={prepDropdownRef} className="relative">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Prep Time
          </p>
          <button
            type="button"
            onClick={() => setIsPrepDropdownOpen((prev) => !prev)}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-900 text-gray-800 dark:text-white border border-amber-100 dark:border-gray-800 text-left flex items-center justify-between"
          >
            <span>{prepTimeLabel}</span>
            <span className="text-amber-500">{isPrepDropdownOpen ? "▲" : "▼"}</span>
          </button>

          {isPrepDropdownOpen && (
            <div className="absolute z-20 mt-2 w-full rounded-xl border border-amber-100 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
              <button
                type="button"
                onClick={() => {
                  setPrepTimeFilter(null);
                  setIsPrepDropdownOpen(false);
                }}
                className={`w-full px-3 py-2 text-left hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors ${prepTimeFilter === null ? "text-amber-600 dark:text-[#E7C36E]" : "text-gray-700 dark:text-gray-100"
                  }`}
              >
                Any prep time
              </button>
              {[15, 30, 45, 60].map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => {
                    setPrepTimeFilter(time);
                    setIsPrepDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors ${prepTimeFilter === time ? "text-amber-600 dark:text-[#E7C36E]" : "text-gray-700 dark:text-gray-100"
                    }`}
                >
                  {time} min or less
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-6">
        {dinners.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-600 text-lg">No dinners found.</p>
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
                <div className="absolute bottom-0 w-full bg-white/80 dark:bg-black/60 backdrop-blur-sm p-3 flex flex-col items-center text-center">
                  <h2 className="text-lg font-semibold text-amber-600 dark:text-[#E7C36E]">{dinner.title}</h2>
                  <div className="flex text-amber-600 dark:text-[#E7C36E] text-opacity-70 text-sm mt-1">
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
    </div>
  );
};

export default DinnerList;
