import axios from "axios";
import { IAnimal } from "../models/IAnimal";
import { IApiResponse } from "../models/IApiResponse";

export interface IAnimalsLoader {
  animals: IAnimal[];
}

export const animalsLoader = async (): Promise<IAnimalsLoader> => {
  try {
    const response = await axios.get<IApiResponse>(
      "https://animals.azurewebsites.net/api/animals"
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch animals");
    }

    console.log("API response:", response.data); 
    return { animals: response.data };
  } catch (error) {
    console.error("Failed to fetch animals:", error);
    return { animals: [] };
  }
};
