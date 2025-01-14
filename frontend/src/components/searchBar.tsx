import React, { useState } from "react";

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
  dinners: Dinner[];
  onSearchResults: (results: Dinner[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ dinners, onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredDinners = dinners.filter((dinner) =>
      dinner.title.toLowerCase().includes(query)
    );

    onSearchResults(filteredDinners);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto p-4">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for a dinner..."
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
      />
    </div>
  );
};

export default SearchBar;
