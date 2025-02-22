import axios from "axios";

const ENDPOINT = import.meta.env.VITE_ENDPOINT || 'http://localhost:9000';

export interface IngredientDetail {
  name: string;
  unit?: string;
  qty?: number;
}

export interface Dinner {
  id: number;
  title: string;
  description: string;
  serves: string;
  preparationTime: number;
  totalTime: number;
  images: string;
}

export interface DinnerDetails extends Omit<Dinner, "images"> {
  images: string[];
  ingredients: IngredientDetail[];
  steps: string[];
}

export const fetchDinnerDetails = async (id: string): Promise<DinnerDetails> => {
  const token = localStorage.getItem("googleAuthToken");
  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await axios.get<DinnerDetails>(
      `${ENDPOINT}/api/dinners/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching dinner details:", error);
    throw error;
  }
};

export const fetchRandomDinner = async (): Promise<Dinner> => {
  const token = localStorage.getItem("googleAuthToken");
  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await axios.get<{ dinner: Dinner }>(`${ENDPOINT}/api/dinners/random`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.dinner;
  } catch (error) {
    console.error("Error fetching random dinner:", error);
    throw error;
  }
};

export const searchDinners = async (query: string): Promise<Dinner[]> => {
  try {
    const token = localStorage.getItem("googleAuthToken");
    const response = await axios.get<{ dinners: Dinner[] }>(
      `${ENDPOINT}/api/search-dinners?q=${query}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          query: query,
        }
      }
    );
    return response.data.dinners;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};
