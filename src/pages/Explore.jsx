import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import RecommendedRecipes from "../components/RecommendedRecipes";

import "../styles/Explore.css";

function Explore() {
  const navigate = useNavigate();

  return (
    <div className="explore-page">

      <div className="explore-top">

        <button
          className="explore-back-btn"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>

      </div>

      <div className="explore-hero">

        <div className="explore-text">

          <h1>
            🔍 Explore Recipes
          </h1>

          <p>
            Discover delicious recipes from
            around the world and find your
            next favorite meal.
          </p>

        </div>

      </div>

      <Categories />

      <RecommendedRecipes />

    </div>
  );
}

export default Explore;