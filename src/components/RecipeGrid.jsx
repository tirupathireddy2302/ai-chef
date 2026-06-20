import { Link } from "react-router-dom";

import "./../styles/RecipeGrid.css";

function RecipeGrid({ recipes }) {
  return (
    <div className="recipe-grid">

      {recipes.map((recipe) => (

        <Link
          key={recipe.id}
          to={`/recipe/${recipe.id}`}
          className="recipe-card"
        >

          <img
            src={recipe.image}
            alt={recipe.title}
          />

          <div className="recipe-info">

            <h3>
              {recipe.title}
            </h3>

            <p>
              {recipe.cuisines?.[0] ||
                "International"}
            </p>

          </div>

        </Link>

      ))}

    </div>
  );
}

export default RecipeGrid;