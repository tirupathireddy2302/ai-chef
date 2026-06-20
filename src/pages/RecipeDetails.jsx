import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById } from "../services/recipeApi";
import { saveFavorite } from "../services/favoriteService";
import { useAuth } from "../context/AuthContext";

import "./../styles/RecipeDetails.css";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] =
    useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data =
          await getRecipeById(id);

        setRecipe(data);

        setIsFavorite(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

const toggleFavorite = async () => {

  if (!user) {
    alert("Please login first");
    return;
  }

  if (isFavorite) {
    alert("Already saved");
    return;
  }

  try {

    const recipeToSave = {
      recipeId: recipe.id,
      title: recipe.title,
      image: recipe.image,
      rating:
        recipe.spoonacularScore || 4.5,
      time:
        recipe.readyInMinutes,
      ingredients:
        recipe.extendedIngredients?.map(
          item => item.original
        ) || []
    };

    await saveFavorite(
      user.uid,
      recipeToSave
    );

    setIsFavorite(true);

    alert(
      "❤️ Saved to Favorites"
    );

  } catch (error) {

    console.error(error);

  }

};

  const shareRecipe = async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      alert(
        "Recipe link copied!"
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <h2>
          Loading Recipe...
        </h2>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="loading-container">
        <h2>
          Recipe Not Found
        </h2>
      </div>
    );
  }

  const ingredients =
    recipe.extendedIngredients ||
    [];
    const startCookingMode = () => {

  if (!recipe.instructions)
    return;

  const text =
    recipe.instructions
      .replace(/<[^>]*>/g, "");

  const speech =
    new SpeechSynthesisUtterance(
      text
    );

  speech.lang = "en-US";

  window.speechSynthesis.speak(
    speech
  );

};

  return (
    <div className="recipe-details">

      <button
        className="back-btn"
        onClick={() =>
          navigate(-1)
        }
      >
        ← Back
      </button>

      <div className="recipe-header">

        <div className="recipe-image">
          <img
            src={recipe.image}
            alt={recipe.title}
          />
        </div>

        <div className="recipe-content">

          <h1>
            {recipe.title}
          </h1>

          <div className="recipe-tags">

            <span>
              🍽️{" "}
              {recipe.dishTypes?.[0] ||
                "Recipe"}
            </span>

            <span>
              🌍{" "}
              {recipe.cuisines?.[0] ||
                "International"}
            </span>

            <span>
              ⏱️{" "}
              {
                recipe.readyInMinutes
              }
              min
            </span>

          </div>

          <p className="recipe-description">
            Discover how to prepare
            this delicious recipe
            step by step.
          </p>

          <div className="action-buttons">

            <button
              className={`favorite-btn-details ${
                isFavorite
                  ? "active"
                  : ""
              }`}
              onClick={
                toggleFavorite
              }
            >
              {isFavorite
                ? "❤️ Saved"
                : "🤍 Save Recipe"}
            </button>

            <button
              className="share-btn"
              onClick={
                shareRecipe
              }
            >
              🔗 Share
            </button>

            <button
              className="print-btn"
              onClick={() =>
                window.print()
              }
            >
              🖨 Print
            </button>
            <div className="voice-controls">

  <button
    className="voice-btn"
    onClick={startCookingMode}
  >
    🎙 Start Cooking
  </button>

  <button
    className="pause-btn"
    onClick={() =>
      window.speechSynthesis.pause()
    }
  >
    ⏸ Pause
  </button>

  <button
    className="resume-btn"
    onClick={() =>
      window.speechSynthesis.resume()
    }
  >
    ▶ Resume
  </button>

  <button
    className="stop-btn"
    onClick={() =>
      window.speechSynthesis.cancel()
    }
  >
    ⏹ Stop
  </button>

</div>

          </div>

        </div>

      </div>

      <div className="ingredients-section">

        <h2>
          Ingredients
        </h2>

        <div className="ingredients-grid">

          {ingredients.map(
            (
              item,
              index
            ) => (
              <div
                className="ingredient-card"
                key={`${item.id}-${index}`}
              >
                <strong>
                  {
                    item.original
                  }
                </strong>
              </div>
            )
          )}

        </div>

      </div>

      <div className="instructions-section">

        <h2>
          Instructions
        </h2>

        <div
          className="instructions-content"
          dangerouslySetInnerHTML={{
            __html:
              recipe.instructions ||
              "<p>No instructions available.</p>",
          }}
        />

      </div>

      {recipe.sourceUrl && (
        <div className="source-section">

          <a
            href={
              recipe.sourceUrl
            }
            target="_blank"
            rel="noopener noreferrer"
            className="youtube-btn"
          >
            🔗 View Original
            Recipe
          </a>

        </div>
      )}

    </div>
  );
}

export default RecipeDetails;