import axios from "axios";
console.log(
  "API KEY:",
  import.meta.env.VITE_SPOONACULAR_API_KEY
);
const API_KEY =
  import.meta.env.VITE_SPOONACULAR_API_KEY;

const BASE_URL =
  "https://api.spoonacular.com/recipes";

export const searchRecipes = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/complexSearch`,
    {
      params: {
        query,
        number: 20,
        addRecipeInformation: true,
        apiKey: API_KEY,
      },
    }
  );

  return response.data.results;
};

export const getRecipeById = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/${id}/information`,
    {
      params: {
        apiKey: API_KEY,
      },
    }
  );

  return response.data;
};

export const searchSuggestions = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/autocomplete`,
    {
      params: {
        query,
        number: 5,
        apiKey: API_KEY,
      },
    }
  );

  return response.data;
};