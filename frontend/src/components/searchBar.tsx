import React, { useState, useEffect } from "react";
import axios from "axios";

interface Dinner {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  preparationTime: number;
  totalTime: number;
  images: string;
}

interface SearchBarProps {
  onSearchResults: (results: Dinner[]) => void;
}

const ENDPOINT = process.env.REACT_APP_API_URL || "http://localhost:9000";

const SearchBar: React.FC<SearchBarProps> = ({ onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Dinner[]>([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim().length === 0) {
        setSuggestions([]);
        onSearchResults([]);
        return;
      }

      const token = localStorage.getItem("googleAuthToken");
      if (token) {
        try {
          const response = await axios.get(`${ENDPOINT}/api/search-dinners`, {
            params: { query: searchQuery },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          const results = response.data.dinners || [];
          setSuggestions(results);
          onSearchResults(results);
        } catch (error) {
          console.error("Error fetching search suggestions:", error);
          setSuggestions([]);
        }
      }
    };

    fetchSearchResults();
  }, [searchQuery, onSearchResults]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto p-4">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search for a dinner..."
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
      />

      {suggestions.length > 0 && (
        <div className="absolute bg-white shadow-lg rounded-lg mt-2 w-full z-10">
          {suggestions.map((dinner) => (
            <div
              key={dinner.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSearchQuery(dinner.title);
                setSuggestions([]);
                onSearchResults([dinner]);
              }}
            >
              {dinner.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
