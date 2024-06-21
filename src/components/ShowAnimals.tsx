import "../styling/ShowAnimals.css";
import { IAnimal } from "../models/IAnimal";
import { ShowAnimal } from "./ShowAnimal";

interface IShowAnimalsProps {
  animals: IAnimal[];
}

export const ShowAnimals = ({ animals }: IShowAnimalsProps) => {
  if (!animals) {
    return <p>Inga djur hittades</p>;
  }

  return (
    <>
    <div className="animals-container">
      {animals.map((animal) => (
        <ShowAnimal key={animal.id} animal={animal} />
      ))}
      </div>
      
    </>
  );
};
