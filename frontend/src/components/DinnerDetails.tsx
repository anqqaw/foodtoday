import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDinnerDetails, DinnerDetails as DinnerDetailsType, addToShoppingList } from "../helpers/api";

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

  const addShoppingList = async () => {
    try {
      if (id) {
        await addToShoppingList(id);
      }
    } catch (error) {
      console.log("Error adding to Shopping list:", error);
    }
  };

  if (!dinner) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-gray-400 text-lg animate-pulse">Loading dinner details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-['Space_Grotesk']">
      <div className="w-full bg-black py-5 px-6 text-center">
        <h1 className="text-[#E7C36E] text-base font-bold uppercase tracking-wide">
          {dinner.title}
        </h1>
      </div>
      <div
        className="w-full h-96 bg-no-repeat bg-cover bg-center mb-10"
        style={{ backgroundImage: `url('${dinner.images[0]}')` }}
      >
      </div>



      <div className="w-full px-0">
        <div className="flex justify-center space-x-7 my-6">
          <button
            onClick={() => addShoppingList()}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-[#E7C36E] hover:bg-[#d1ac5a] text-black text-2xl shadow-md transition-transform duration-200 active:scale-95"
          >
            🛒
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="text-lg font-medium text-white bg-gray-800 shadow-md p-4 rounded-lg">
            Serves: <span className="font-normal">{dinner.serves}</span>
          </div>
          <div className="text-lg font-medium text-white bg-gray-800 shadow-md p-4 rounded-lg">
            Prep Time: <span className="font-normal">{dinner.preparationTime} mins</span>
          </div>
          <div className="text-lg font-medium text-white bg-gray-800 shadow-md p-4 rounded-lg">
            Total Time: <span className="font-normal">{dinner.totalTime} mins</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0 mb-10">
          <div className="shadow-lg overflow-hidden">
            <div className="bg-[#E7C36E] px-6 py-4">
              <h2 className="text-3xl font-bold text-white">Ingredients</h2>
            </div>
            <div className="bg-white p-6">
              <ul className="list-disc pl-5 text-lg text-gray-800 space-y-4">
                {dinner.ingredients.map((ingredient, index) => (
                  <li key={index} className="leading-relaxed">
                    {ingredient.qty && ingredient.unit
                      ? `${ingredient.qty} ${ingredient.unit} ${ingredient.name}`
                      : ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="shadow-lg overflow-hidden">
            <div className="bg-[#047857] px-6 py-4">
              <h2 className="text-3xl font-bold text-white">Steps</h2>
            </div>
            <div className="bg-white p-6">
              <ol className="list-decimal pl-5 text-lg text-gray-800 space-y-4">
                {dinner.steps.map((step, index) => (
                  <li key={index} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DinnerDetails;
