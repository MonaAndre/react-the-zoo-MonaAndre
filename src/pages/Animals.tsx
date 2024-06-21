import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { IAnimal } from "../models/IAnimal";
import { IAnimalsLoader } from "../loaders/animalsLoader";
import { ShowAnimals } from "../components/ShowAnimals";
import { Spinner } from "../components/Spinner";
import axios from "axios";
import { IApiResponse } from "../models/IApiResponse";

const saveAnimalsInLocalStorage = (animals: IAnimal[]) => {
  animals.forEach(animal => {
    const { id, isFed, lastFed } = animal;
    localStorage.setItem(`animal_${id}_feed`, JSON.stringify({
      isFed,
      lastFed
    }));
  });
};

const getAnimalFromLocalStorage = (id: number) => {
  const storedFeedData = localStorage.getItem(`animal_${id}_feed`);
  if (storedFeedData) {
    return JSON.parse(storedFeedData);
  }
  return null;
};

const updateAnimalsWithLocalStorage = (animals: IAnimal[]): IAnimal[] => {
  return animals.map(animal => {
    const localStorageData = getAnimalFromLocalStorage(animal.id);
    if (localStorageData) {
      return { ...animal, ...localStorageData };
    }
    return animal;
  });
};

export const Animals = () => {
  const loaderData = useLoaderData() as IAnimalsLoader;
  const initialAnimals = loaderData?.animals || [];
  const [animals, setAnimals] = useState<IAnimal[]>(initialAnimals);
  const [loading, setLoading] = useState(false);

  const getAnimals = async () => {
    try {
      setLoading(true);
      const response = await axios.get<IApiResponse>(
        "https://animals.azurewebsites.net/api/animals"
      );
      if (response.status !== 200) {
        throw new Error("Failed to fetch animals");
      }
      
      saveAnimalsInLocalStorage(response.data);

      const updatedAnimals = updateAnimalsWithLocalStorage(response.data);
      setAnimals(updatedAnimals);
    } catch (error) {
      console.error("Error fetching animals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedAnimals = initialAnimals.map(animal => getAnimalFromLocalStorage(animal.id));
    if (storedAnimals.some(animal => animal === null)) {
      getAnimals();
    } else {
      setAnimals(updateAnimalsWithLocalStorage(initialAnimals));
    }
  }, [initialAnimals]);

  return (
    <>
      <h1>Animals</h1>
      {loading ? <Spinner /> : <ShowAnimals animals={animals} />}
    </>
  );
};
