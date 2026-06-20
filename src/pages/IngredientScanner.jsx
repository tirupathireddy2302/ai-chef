import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import { savePantryItem } from "../services/pantryService";
import { useAuth } from "../context/AuthContext";
import { saveGroceryItem} from "../services/groceryService";
import "../styles/IngredientScanner.css";

function IngredientScanner() {

  const navigate =
    useNavigate();

  const { user } =
    useAuth();

  const [image,
    setImage] =
    useState(null);

  const [preview,
    setPreview] =
    useState("");

  const [ingredients,
    setIngredients] =
    useState([]);

  const [loading,
    setLoading] =
    useState(false);

  const handleImage =
    (e) => {

      const file =
        e.target.files[0];

      if (!file)
        return;

      setImage(file);

      setPreview(
        URL.createObjectURL(
          file
        )
      );

    };

  const scanIngredients =
    async () => {

      if (!image) {

        alert(
          "Please select an image"
        );

        return;

      }

      try {

        setLoading(true);

        const reader =
          new FileReader();

        reader.onload =
          async () => {

            try {

              const base64 =
                reader.result
                  .split(",")[1];

              const response =
                await axios.post(
                  "http://localhost:5000/scan-ingredients",
                  {
                    image:
                      base64
                  }
                );

              const detected =
                response.data.ingredients
                  .split("\n")
                  .filter(
                    item =>
                      item.trim()
                  );

              setIngredients(
                detected
              );

            } catch (error) {

              console.error(
                error
              );

              alert(
                "Failed to scan image"
              );

            } finally {

              setLoading(
                false
              );

            }

          };

        reader.readAsDataURL(
          image
        );

      } catch (error) {

        console.error(error);

if (error.response) {
  console.log(error.response.data);
}

        setLoading(
          false
        );

      }

    };

  const addAllToPantry =
    async () => {

      if (!user) {

        alert(
          "Please login first"
        );

        return;

      }

      try {

        for (
          const item
          of ingredients
        ) {

          await savePantryItem(
            user.uid,
            {
              name:
                item.trim(),
              category:
                "Detected"
            }
          );

        }

        alert(
          "🥫 Added To Pantry!"
        );

      } catch (error) {

        console.error(
          error
        );

      }

    };

  const addToGroceryList =
  async () => {

    if (!user) {

      alert(
        "Please login first"
      );

      return;

    }

    try {

      for (
        const item
        of ingredients
      ) {

        await saveGroceryItem(
          user.uid,
          {
            name: item.trim(),
            quantity: 1,
            category: "Detected",
            price: 0,
            checked: false
          }
        );

      }

      alert(
        "🛒 Added To Grocery List!"
      );

    } catch (error) {

      console.error(
        error
      );

      alert(
        "Failed to add items"
      );

    }

  };
 const findRecipes =
  () => {

    if (
      ingredients.length === 0
    ) {

      alert(
        "Please scan ingredients first"
      );

      return;

    }

    const searchQuery =
      ingredients
        .slice(0, 5)
        .join(" ");

    navigate(
      `/search?q=${encodeURIComponent(
        searchQuery
      )}`
    );

  };
  return (

    <div className="scanner-page">

      <BackButton />

      <h1>
        📸 AI Ingredient Scanner
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={
          handleImage
        }
      />

      {preview && (

        <img
          src={preview}
          alt="Preview"
          className="scanner-image"
        />

      )}

      <button
        className="scan-btn"
        onClick={
          scanIngredients
        }
      >
        {
          loading
            ? "Scanning..."
            : "🔍 Scan Ingredients"
        }
      </button>

      {ingredients.length >
        0 && (

        <>

          <div className="ingredients-result">

            <h2>
              Detected Ingredients
            </h2>

            {ingredients.map(
              (
                item,
                index
              ) => (

                <div
                  key={
                    index
                  }
                  className="ingredient-chip"
                >
                  ✅ {item}
                </div>

              )
            )}

          </div>

          <div className="scanner-actions">

            <button
              className="add-pantry-btn"
              onClick={
                addAllToPantry
              }
            >
              🥫 Add To Pantry
            </button>

            <button
  className="add-grocery-btn"
  onClick={
    addToGroceryList
  }
>
  🛒 Add To Grocery
</button>

<button
  className="find-recipe-btn"
  onClick={
    findRecipes
  }
>
  🍳 Find Recipes
</button>

          </div>

        </>

      )}

    </div>

  );

}

export default IngredientScanner;