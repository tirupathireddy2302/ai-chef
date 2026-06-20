import { useState } from "react";

import { generateRecipe }
from "../services/aiRecipeApi";

import "../styles/AIRecipeGenerator.css";

function AIRecipeGenerator() {

  const [ingredients,
    setIngredients] =
    useState("");

  const [recipe,
    setRecipe] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const handleGenerate =
    async () => {

      if (!ingredients.trim()) {

        alert(
          "Enter some ingredients"
        );

        return;
      }

      try {

        setLoading(true);

        const result =
          await generateRecipe(
            ingredients
          );

        setRecipe(result);

      } catch (error) {

        console.error(error);

        alert(
          "Failed to generate recipe"
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <div className="ai-page">

      <h1>
        🤖 AI Recipe Generator
      </h1>

      <p>
        Enter ingredients separated by commas.
      </p>

      <textarea
        placeholder="Chicken, Rice, Onion"
        value={ingredients}
        onChange={(e) =>
          setIngredients(
            e.target.value
          )
        }
      />

      <button
        onClick={handleGenerate}
      >
        {loading
          ? "Generating..."
          : "Generate Recipe"}
      </button>

      {recipe && (
        <div className="recipe-result">

          <pre>
            {recipe}
          </pre>

        </div>
      )}

    </div>
  );
}

export default AIRecipeGenerator;