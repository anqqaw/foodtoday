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
      ></div>

      <div className="absolute bottom-10 left-10 text-white space-y-4 font-['Space_Grotesk']">
        <h1
          className="text-4xl font-bold"
          onClick={() => navigate(`/dinner/${dinner.id}`)}
        >
          {dinner.title}
        </h1>
        <p className="text-lg">{dinner.description}</p>
        <p>
          Serves: <span className="font-medium">{dinner.serves}</span>
        </p>
        <p>
          Preparation Time: <span className="font-medium">{dinner.preparationTime} minutes</span>
        </p>
        <p>
          Total Time: <span className="font-medium">{dinner.totalTime} minutes</span>
        </p>
      </div>
    </>
  );
};

export default DinnerCard;
