import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRandomDinner, Dinner } from "../helpers/api";
import HamburgerMenu from "./HamburgerMenu";
import DinnerCard from "./DinnerCard";

const DinnersView: React.FC = () => {
  const [dinners, setDinners] = useState<Dinner[]>([]);
  const navigate = useNavigate();
  const isFetching = useRef(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const loadRandomDinner = async () => {
    if (isFetching.current) return;
    isFetching.current = true;

    try {
      const newDinner = await fetchRandomDinner();
      setDinners((prev) => [...prev, newDinner]);
    } catch (error) {
    } finally {
      isFetching.current = false;
    }
  };

  useEffect(() => {
    loadRandomDinner();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isFetching.current) return;
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

      debounceTimeout.current = setTimeout(() => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= fullHeight - 50) {
          loadRandomDinner();
        }
      }, 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full">
      {dinners.map((dinner, index) => (
        <div key={index} className="relative min-h-screen flex flex-col items-center justify-center">
          <DinnerCard dinner={dinner} navigate={navigate} />
        </div>
      ))}
      <div className="absolute bottom-4 right-4">
        <HamburgerMenu />
      </div>
    </div>
  );
};

export default DinnersView;
