import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDinnerDetails, DinnerDetails as DinnerDetailsType, addToShoppingList } from "../helpers/api";
import { ShoppingCart, Clock, Users, Timer, ChefHat, Utensils } from "lucide-react";

const DinnerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [dinner, setDinner] = useState<DinnerDetailsType | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

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
        console.log("Added to shopping list!");
      }
    } catch (error) {
      console.log("Error adding to Shopping list:", error);
    }
  };

  if (!dinner) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-gray-400 text-lg animate-pulse">
          Loading dinner details...
        </p>
      </div>
    );
  }

  const heroImage = Array.isArray(dinner.images)
    ? dinner.images[0]
    : (dinner.images as unknown as string);

  return (
    <div className="min-h-screen bg-black text-white font-['Space_Grotesk']">
      {/* Top bar / title */}
      <div className="w-full bg-black py-5 px-6 text-center">
        <h1 className="text-[#E7C36E] text-base font-bold uppercase tracking-wide">
          {dinner.title}
        </h1>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
        <div
          className={`absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-700 ${imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          style={{ backgroundImage: heroImage ? `url('${heroImage}')` : "none" }}
        >
          {heroImage && (
            <img
              src={heroImage}
              alt={dinner.title}
              className="hidden"
              onLoad={() => setImageLoaded(true)}
            />
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-[#E7C36E]/20 text-[#E7C36E] rounded-full mb-4">
              Recipe
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {dinner.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 -mt-6 relative z-10 pb-16">

        {/* Add to Shopping List */}
        <div className="flex justify-center mt-8 mb-8">
          <button
            onClick={addShoppingList}
            className="group flex items-center gap-3 px-6 py-3 rounded-full bg-[#E7C36E] text-black font-semibold shadow-lg hover:bg-[#d1ac5a] hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Shopping List
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="p-4 text-center bg-gray-900 rounded-lg border border-gray-800">
            <Users className="w-5 h-5 text-[#E7C36E] mx-auto mb-2" />
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Serves
            </p>
            <p className="text-xl font-semibold text-white">{dinner.serves}</p>
          </div>

          <div className="p-4 text-center bg-gray-900 rounded-lg border border-gray-800">
            <Timer className="w-5 h-5 text-[#E7C36E] mx-auto mb-2" />
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Prep
            </p>
            <p className="text-xl font-semibold text-white">
              {dinner.preparationTime} mins
            </p>
          </div>

          <div className="p-4 text-center bg-gray-900 rounded-lg border border-gray-800">
            <Clock className="w-5 h-5 text-[#E7C36E] mx-auto mb-2" />
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Total
            </p>
            <p className="text-xl font-semibold text-white">
              {dinner.totalTime} mins
            </p>
          </div>
        </div>

        {/* Ingredients + Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Ingredients */}
          <div className="shadow-lg overflow-hidden rounded-lg">
            <div className="bg-[#E7C36E] px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Ingredients</h2>
            </div>
            <div className="bg-white p-6">
              <ul className="space-y-3 text-gray-800">
                {dinner.ingredients.map((ingredient, index) => (
                  <li key={index} className="leading-relaxed">
                    {ingredient.qty && ingredient.unit ? (
                      <>
                        <span className="font-semibold text-[#E7C36E]">
                          {ingredient.qty} {ingredient.unit}
                        </span>{" "}
                        {ingredient.name}
                      </>
                    ) : (
                      ingredient.name
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Steps */}
          <div className="shadow-lg overflow-hidden rounded-lg">
            <div className="bg-emerald-700 px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                <Utensils className="w-5 h-5 text-emerald-200" />
              </div>
              <h2 className="text-2xl font-bold text-white">Steps</h2>
            </div>
            <div className="bg-white p-6">
              <ol className="space-y-4 list-decimal pl-5 text-gray-800">
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
