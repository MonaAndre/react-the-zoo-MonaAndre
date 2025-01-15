import "../styling/ShowAnimal.css"
import { useNavigate } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import { useState, useEffect } from "react";

interface IShowAnimalProps {
  animal: IAnimal;
}

export const ShowAnimal = ({ animal }: IShowAnimalProps) => {
  const navigate = useNavigate();
  const [backgroundColor, setBackgroundColor] = useState<string>("red");

  useEffect(() => {
    const storedFeedData = localStorage.getItem(`animal_${animal.id}_feed`);
    if (storedFeedData) {
      const { lastFed, isFed } = JSON.parse(storedFeedData);
      const lastFedDate = new Date(lastFed);
      const now = new Date();
      const hoursSinceLastFed = (now.getTime() - lastFedDate.getTime()) / 1000 / 60 / 60;

      if (hoursSinceLastFed <= 3) {
        setBackgroundColor("green");
      } else if (hoursSinceLastFed > 3 && hoursSinceLastFed <= 4) {
        setBackgroundColor("yellow");
      } else {
        setBackgroundColor("red");
      }

      if (hoursSinceLastFed >= 3 && isFed) {
        localStorage.setItem(`animal_${animal.id}_feed`, JSON.stringify({
          isFed: false,
          lastFed
        }));
      }
    } else {
      setBackgroundColor("black");
    }
  }, [animal.id]);

  const handleClick = () => {
    navigate("/react-the-zoo-MonaAndre/animal/" + animal.id);
  };

  return (
    <div className="animal-card" style={{ backgroundColor }}>
      <h2>{animal.name}</h2>
      {animal.imageUrl && <img className="img" src={animal.imageUrl} alt={animal.name} />}
      <p>Description: {animal.shortDescription}</p>
      <button onClick={handleClick}>Läs mer</button>
    </div>
  );
};
