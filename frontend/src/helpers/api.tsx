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
      `${ENDPOINT}/api/dinners`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          query,
        }
      }
    );
    return response.data.dinners;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};

export const fetchShoppingList = async (): Promise<[]> => {
  const token = localStorage.getItem("googleAuthToken");
  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await axios.get(`${ENDPOINT}/api/users/shoppinglist`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching shopping list:", error);
    throw error;
  }
};

export const addToShoppingList = async (id: string) => {
  const token = localStorage.getItem("googleAuthToken");
  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await axios.get(`${ENDPOINT}/api/dinners/${id}/addtoshoppinglist`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Added to Shopping List successfully:", response.data);
    return response.data;
  } catch (error) {
    console.log("Error adding to Shopping list:", error);
    throw error;
  }
};

export const clearShoppingList = async () => {
  const token = localStorage.getItem("googleAuthToken");
  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await axios.get(`${ENDPOINT}/api/users/clearshoppinglist`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Cleared Shopping list successfully:", response.data);
    return response.data;
  } catch (error) {
    console.log("Error clearing Shopping list", error);
    throw error;
  }
}

export const deleteFromShoppingList = async (item: string) => {
  const token = localStorage.getItem("googleAuthToken");
  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await axios.delete(`${ENDPOINT}/api/users/deletefromshoppinglist`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { item },
    });

    console.log(item);

    console.log(`Deleted ${item} from Shopping list successfully`, response.data);
    return response.data;
  } catch (error) {
    console.log("Error deleting item from shopping list:", error);
    throw error;
  }
};

export const convertShoppingList = async (id: String) => {
  const token = localStorage.getItem("googleAuthToken");
  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await axios.get(`${ENDPOINT}/api/dinners/convertshoppinglist`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { id },
    });

    console.log("Converted Shopping list successfully:", response.data);
    return response.data;
  } catch (error) {
    console.log("Error converting Shopping list:", error);
    throw error;
  }
}
