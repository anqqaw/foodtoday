
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ENDPOINT = process.env.REACT_APP_API_URL || "http://localhost:9000";


interface DinnerDetails {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  preparationTime: number;
  totalTime: number;
  images: string;
  ingredients: string[];
  steps: string[];
}

const DinnerDetails: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  // console.log("ID from useParams:", title);
  const [dinner, setDinner] = useState<DinnerDetails | null>(null);

  useEffect(() => {
    const fetchDinnerDetails = async () => {
      try {
        const response = await axios.get(`${ENDPOINT}/dinner`, {
          params: { title },
        });
        setDinner(response.data);
      } catch (error) {
        console.error("Error fetching dinner details:", error);
      }
    };

    fetchDinnerDetails();
  }, [title]);

  if (!dinner) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading dinner details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div
        className="relative w-full h-64 bg-cover bg-center rounded-lg mb-6"
        style={{
          backgroundImage: `url('${dinner.images}')`,
        }}
      ></div>

      <h1 className="text-4xl font-bold mb-4">{dinner.title}</h1>
      <p className="text-lg text-gray-700 mb-4">{dinner.description}</p>

      <div className="mb-6">
        <p className="font-medium text-gray-800">Difficulty: {dinner.difficulty}</p>
        <p className="font-medium text-gray-800">
          Preparation Time: {dinner.preparationTime} minutes
        </p>
        <p className="font-medium text-gray-800">
          Total Time: {dinner.totalTime} minutes
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc pl-5">
          {dinner.ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-700">{ingredient}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Steps</h2>
        <ol className="list-decimal pl-5">
          {dinner.steps.map((step, index) => (
            <li key={index} className="text-gray-700 mb-2">{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default DinnerDetails;
