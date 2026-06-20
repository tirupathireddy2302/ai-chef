import axios from "axios";

export const searchProductPrice =
  async (query) => {

    try {

      const response =
        await axios.post(
          "https://grocery-pricing-api.p.rapidapi.com/shopping",
          `query=${query}&page=1&country=us`,
          {
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded",

              "x-rapidapi-key":
                import.meta.env
                  .VITE_RAPID_API_KEY,

              "x-rapidapi-host":
                "grocery-pricing-api.p.rapidapi.com"
            }
          }
        );

      return response.data;

    } catch (error) {

      console.error(error);

      return null;

    }

  };