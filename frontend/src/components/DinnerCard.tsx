import React from "react";
import { NavigateFunction } from "react-router-dom";

interface Dinner {
  id: number;
  title: string;
  description: string;
  difficulty: string;
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
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${dinner.images}')`,
          imageRendering: 'auto',
        }}
      ></div>

      <div className="absolute bottom-10 left-10 text-white space-y-4">
        <h1
          className="text-4xl font-bold"
          onClick={() => navigate(`/dinner/${dinner.id}`)}
        >
          {dinner.title}
        </h1>
        <p className="text-lg">{dinner.description}</p>
        <p>
          Difficulty: <span className="font-medium">{dinner.difficulty}</span>
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
