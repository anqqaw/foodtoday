import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRandomDinner, Dinner } from "../helpers/api";
import DinnerCard from "./DinnerCard";

const DinnersView: React.FC = () => {
  const [dinners, setDinners] = useState<Dinner[]>([]);
  const navigate = useNavigate();
  const isFetching = useRef(false);
  const dinnerRefs = useRef<HTMLDivElement[]>([]);
  const currentDinnerIndex = useRef(0);
  const isScrolling = useRef(false);

  const loadRandomDinner = async () => {
    if (isFetching.current) return;
    isFetching.current = true;

    try {
      const newDinner = await fetchRandomDinner();
      setDinners((prev) => [...prev, newDinner]);
    } catch (error) {
    } finally {
      setTimeout(() => {
        isFetching.current = false;
      }, 500);
    }
  };

  useEffect(() => {
    loadRandomDinner();
  }, []);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();

      if (isScrolling.current || isFetching.current || dinners.length === 0) return;
      isScrolling.current = true;

      const deltaY = event.deltaY;

      if (deltaY > 0) {
        if (currentDinnerIndex.current < dinners.length - 1) {
          currentDinnerIndex.current += 1;
        } else {
          loadRandomDinner().then(() => {
            setTimeout(() => {
              currentDinnerIndex.current += 1;
              const nextDinner = dinnerRefs.current[currentDinnerIndex.current];
              if (nextDinner) {
                nextDinner.scrollIntoView({ behavior: "smooth" });
              }
              setTimeout(() => {
                isScrolling.current = false;
              }, 500);
            }, 500);
          });
          return;
        }
      }

      setTimeout(() => {
        const nextDinner = dinnerRefs.current[currentDinnerIndex.current];
        if (nextDinner) {
          nextDinner.scrollIntoView({ behavior: "smooth" });
        }
        setTimeout(() => {
          isScrolling.current = false;
        }, 500);
      }, 500);
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [dinners]);

  return (
    <div className="relative w-full h-screen overflow-hidden pb-16">
      {dinners.map((dinner, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) dinnerRefs.current[index] = el;
          }}
          className="relative min-h-screen flex flex-col items-center justify-center"
        >
          <DinnerCard dinner={dinner} navigate={navigate} />
        </div>
      ))}
    </div>
  );
};

export default DinnersView;
