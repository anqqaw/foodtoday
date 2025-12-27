import React from "react";
import { NavigateFunction } from "react-router-dom";

interface Dinner {
  id: number;
  title: string;
  description: string;
  serves: string;
  preparationTime: number;
  totalTime: number;
  images: string;
}

interface DinnerCardProps {
  dinner: Dinner;
  navigate: NavigateFunction;
}

const DinnerCard: React.FC<DinnerCardProps> = ({ dinner, navigate }) => {
  return (
    <>
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('${dinner.images}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div
        className="absolute bottom-0 left-0 w-full bg-black/90 text-[#E7C36E] font-['Space_Grotesk'] p-10 flex flex-col items-center pb-20"
      >
        <h1
          className="text-4xl font-bold text-center mb-4 -mt-6 cursor-pointer"
          onClick={() => navigate(`/dinner/${dinner.id}`)}
        >
          {dinner.title}
        </h1>

        <div className="flex gap-6">
          <p>
            Prep: <span className="font-medium">{dinner.preparationTime} min</span>
          </p>
          <p>
            Total: <span className="font-medium">{dinner.totalTime} min</span>
          </p>
          <p>
            Serves: <span className="font-medium">{dinner.serves}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default DinnerCard;
