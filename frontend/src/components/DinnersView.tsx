import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRandomDinner, Dinner } from "../helpers/api";
import HamburgerMenu from "./HamburgerMenu";
import DinnerCard from "./DinnerCard";

const DinnersView: React.FC = () => {
  const [currentDinner, setCurrentDinner] = useState<Dinner | null>(null);
  const navigate = useNavigate();
  const isFetching = useRef(false);

  const loadRandomDinner = async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    console.log("isFetching:", isFetching.current);

    try {
      const newDinner = await fetchRandomDinner();
      setCurrentDinner(newDinner);
      console.log("Loaded new dinner!");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Error fetching random dinner:", error);
    } finally {
      isFetching.current = false;
    }
  };

  useEffect(() => {
    loadRandomDinner();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      console.log(`🔍 SCROLL LOGS: scrollTop=${scrollTop}, windowHeight=${windowHeight}, fullHeight=${fullHeight}`);

      if (scrollTop + windowHeight >= fullHeight - 50) {
        loadRandomDinner();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <div className="relative min-h-screen w-full" style={{ height: "200vh", background: "lightgray" }}>
      {currentDinner ? (
        <div className="relative h-screen">
          <DinnerCard dinner={currentDinner} navigate={navigate} />
          <div className="absolute bottom-4 right-4">
            <HamburgerMenu />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <p className="text-gray-600 text-lg">No dinner selected.</p>
        </div>
      )}
    </div>
  );
};

export default DinnersView;
