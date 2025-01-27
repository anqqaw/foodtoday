import React from "react";

interface DinnerNavigationProps {
  currentIndex: number | null;
  dinners: { id: number }[];
  setCurrentDinnerIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const DinnerNavigation: React.FC<DinnerNavigationProps> = ({
  dinners,
  setCurrentDinnerIndex,
}) => {
  const handlePrevious = () => {
    setCurrentDinnerIndex((prevIndex) =>
      prevIndex !== null && prevIndex > 0 ? prevIndex - 1 : dinners.length - 1
    );
  };

  const handleNext = () => {
    setCurrentDinnerIndex((prevIndex) =>
      prevIndex !== null && prevIndex < dinners.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <>
      <div
        className="absolute top-0 left-0 w-1/2 h-1/4 cursor-pointer"
        onClick={handlePrevious}
      ></div>
      <div
        className="absolute top-0 right-0 w-1/2 h-1/4 cursor-pointer"
        onClick={handleNext}
      ></div>
    </>
  );
};

export default DinnerNavigation;
