import React from "react";

interface Dinner {
  id: number;
  title: string;
  description: string;
}

interface DinnersListViewProps {
  dinners: Dinner[];
}

const DinnersListView: React.FC<DinnersListViewProps> = ({ dinners }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dinners</h1>
      {dinners.length === 0 ? (
        <p className="text-gray-600">No dinners available to display.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dinners.map((dinner) => (
            <li
              key={dinner.id}
              className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {dinner.title}
              </h2>
              <p className="text-gray-600 mt-2">{dinner.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DinnersListView;
