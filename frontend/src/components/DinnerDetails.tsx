import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDinnerDetails, DinnerDetails as DinnerDetailsType } from "../helpers/api";

const DinnerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [dinner, setDinner] = useState<DinnerDetailsType | null>(null);

  useEffect(() => {
    const loadDinnerDetails = async () => {
      try {
        if (id) {
          const details = await fetchDinnerDetails(id);
          setDinner(details);
        }
      } catch (error) {
        console.error("Error loading dinner details:", error);
      }
    };

    loadDinnerDetails();
  }, [id]);

  if (!dinner) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading dinner details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative w-full h-96 bg-cover bg-center mb-8"
        style={{
          backgroundImage: `url('${dinner.images[0]}')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold text-center px-4">
            {dinner.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-0">
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          {dinner.description}
        </p>

        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 text-lg font-medium text-gray-800">
            Difficulty: <span className="font-normal">{dinner.difficulty}</span>
          </div>
          <div className="flex-1 text-lg font-medium text-gray-800">
            Prep Time:{" "}
            <span className="font-normal">{dinner.preparationTime} mins</span>
          </div>
          <div className="flex-1 text-lg font-medium text-gray-800">
            Total Time: <span className="font-normal">{dinner.totalTime} mins</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Ingredients</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dinner.ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="text-gray-700 text-lg bg-gray-100 p-3 rounded-md"
              >
                {ingredient.qty && ingredient.unit
                  ? `${ingredient.qty} ${ingredient.unit} ${ingredient.name}`
                  : ingredient.name}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Steps</h2>
          <ol className="list-decimal pl-5 text-lg text-gray-700 space-y-4">
            {dinner.steps.map((step, index) => (
              <li key={index} className="leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DinnerDetails;
