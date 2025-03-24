import axios from "axios";

const ENDPOINT = import.meta.env.VITE_ENDPOINT || 'http://localhost:9000';

// Type Definitions
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

export interface ShoppingListItem {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface ShoppingListResponse {
  shoppingList: ShoppingListItem[];
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

export const fetchShoppingList = async (): Promise<ShoppingListResponse> => {
  const token = localStorage.getItem("googleAuthToken");
  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await axios.get<ShoppingListResponse>(`${ENDPOINT}/api/users/shoppinglist`, {
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

    return response.data;
  } catch (error) {
    console.log("Error clearing Shopping list", error);
    throw error;
  }
};

export const deleteFromShoppingList = async (item: string) => {
  const token = localStorage.getItem("googleAuthToken");
  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await axios.delete(`${ENDPOINT}/api/users/shoppinglist`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { item },
    });

    return response.data;
  } catch (error) {
    console.log("Error deleting item from shopping list:", error);
    throw error;
  }
};
