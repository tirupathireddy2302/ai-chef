import { useEffect, useState } from "react";
import {
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import { searchRecipes } from "../services/recipeApi";
import RecipeGrid from "../components/RecipeGrid";

import "./../styles/SearchResults.css";

function SearchResults() {
  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const query =
    searchParams.get("q");

  const [recipes, setRecipes] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);

        const data =
          await searchRecipes(query);

        setRecipes(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchRecipes();
    }
  }, [query]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>

        <h2>
          Finding delicious recipes...
        </h2>
      </div>
    );
  }

  return (
    <div className="search-page">

      <div className="search-header">

        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          🏠 Back to Home
        </button>

        <button
          className="history-btn"
          onClick={() => navigate(-1)}
        >
          ← Go Back
        </button>

      </div>

      <h1>
        Search Results for "{query}"
      </h1>

      <p className="results-count">
        Found {recipes.length} recipes
      </p>

      {recipes.length > 0 ? (
        <RecipeGrid recipes={recipes} />
      ) : (
        <div className="no-results">
          😕 No recipes found
        </div>
      )}

    </div>
  );
}

export default SearchResults;