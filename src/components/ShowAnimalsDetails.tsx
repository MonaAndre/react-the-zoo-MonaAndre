import '../styling/ShowAnimalDetails.css';
import { Link } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import { useState, useEffect } from "react";

interface IShowAnimalDetailsProps {
  animal: IAnimal;
}

export const ShowAnimalsDetails = ({ animal }: IShowAnimalDetailsProps) => {
  const [isFed, setIsFed] = useState(animal.isFed);
  const [lastFed, setLastFed] = useState(animal.lastFed);

  useEffect(() => {
    const storedFeedData = localStorage.getItem(`animal_${animal.id}_feed`);
    if (storedFeedData) {
      const { isFed, lastFed } = JSON.parse(storedFeedData);
      setIsFed(isFed);
      setLastFed(lastFed);
    }

    const interval = setInterval(() => {
      const lastFedDate = new Date(lastFed);
      const now = new Date();
      const hoursSinceLastFed = (now.getTime() - lastFedDate.getTime()) / 1000 / 60 / 60;

      if (hoursSinceLastFed >= 4) {
        setIsFed(false);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [animal.id, lastFed]);

  const handleFeed = () => {
    const now = new Date();
    const updatedLastFed = now.toISOString();
    setIsFed(true);
    setLastFed(updatedLastFed);

    localStorage.setItem(`animal_${animal.id}_feed`, JSON.stringify({
      isFed: true,
      lastFed: updatedLastFed,
    }));
  };

  return (
    <>
      <Link to={"/animals"}>Tillbaka</Link>
      <div className="animal-details-card">
        <h3>{animal.name}</h3>
        <img className="img" src={animal.imageUrl} alt={animal.name} />
        <p>{animal.longDescription}</p>
        <p>Djur matad senaste: {lastFed ? new Date(lastFed).toLocaleString() : 'Aldrig'}</p>
        <button onClick={handleFeed} disabled={isFed}>Mata djur</button>
      </div>
    </>
  );
};
