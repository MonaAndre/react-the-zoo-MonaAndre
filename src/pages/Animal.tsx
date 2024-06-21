import { useParams } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "../components/Spinner";
import { ShowAnimalsDetails } from "../components/ShowAnimalsDetails";

export const Animal = () => {
  const { animalid } = useParams<{ animalid: string }>();
  const [animal, setAnimal] = useState<IAnimal>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!animalid) return;

    const getAnimal = async () => {
      setLoading(true);
      try {
        const response = await axios.get<IAnimal>(
          `https://animals.azurewebsites.net/api/animals/${animalid}`
        );
        setAnimal(response.data);
      } catch (error) {
        console.error("Failed to fetch animal:", error);
      } finally {
        setLoading(false);
      }
    };

    getAnimal();
  }, [animalid]);

  return (
    <>
      <h1>Animal Details</h1>
      {loading && <Spinner />}
      {animal && !loading && <ShowAnimalsDetails animal={animal} />}
    </>
  );
};
