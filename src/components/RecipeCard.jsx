import {
  useState,
  useEffect
} from "react";

import { useNavigate } from "react-router-dom";

function RecipeCard({ recipe }) {

  const navigate = useNavigate();

  const [isFavorite,
    setIsFavorite] =
    useState(false);

  useEffect(() => {

    const favorites =
      JSON.parse(
        localStorage.getItem(
          "favorites"
        )
      ) || [];

    const exists =
      favorites.find(
        item =>
          item.title === recipe.title
      );

    setIsFavorite(!!exists);

  }, [recipe]);

  const handleFavorite = (e) => {

    e.stopPropagation();

    const favorites =
      JSON.parse(
        localStorage.getItem(
          "favorites"
        )
      ) || [];

    const exists =
      favorites.find(
        item =>
          item.title === recipe.title
      );

    if (exists) {

      const updated =
        favorites.filter(
          item =>
            item.title !== recipe.title
        );

      localStorage.setItem(
        "favorites",
        JSON.stringify(updated)
      );

      setIsFavorite(false);

    } else {

      const recipeToSave = {

        ...recipe,

        ingredients:
          recipe.ingredients || [
            "Rice",
            "Onion",
            "Tomato",
            "Spices"
          ]

      };

      favorites.push(recipeToSave);

      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
      );

      setIsFavorite(true);
    }
  };

  return (
    <div
      className="recommend-channel"
      onClick={() =>
        navigate(
          `/search?q=${recipe.title}`
        )
      }
    >
      <div className="recommend-avatar">

        <img
          src={recipe.image}
          alt={recipe.title}
        />

        <button
          className="favorite-circle"
          onClick={handleFavorite}
        >
          {isFavorite
            ? "❤️"
            : "🤍"}
        </button>

      </div>

      <h4>
        {recipe.title}
      </h4>

      <p>
        ⭐ {recipe.rating}
      </p>

      <span>
        ⏱ {recipe.time}
      </span>

    </div>
  );
}

export default RecipeCard;