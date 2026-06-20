import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";

import {
  savePantryItem,
  getPantryItems,
  deletePantryItem
} from "../services/pantryService";

import { useAuth }
from "../context/AuthContext";

import "../styles/PantryManager.css";

function PantryManager() {

  const { user } =
    useAuth();

  const [itemName,
    setItemName] =
    useState("");

  const [category,
    setCategory] =
    useState("Vegetables");

  const [items,
    setItems] =
    useState([]);

  const [recipeIdeas,
    setRecipeIdeas] =
    useState([]);

  useEffect(() => {

    if (!user)
      return;

    loadItems();

  }, [user]);

  const loadItems =
    async () => {

      try {

        const data =
          await getPantryItems(
            user.uid
          );

        setItems(data);

      } catch (error) {

        console.error(error);

      }

    };

  const addItem =
    async () => {

      if (
        !itemName.trim()
      )
        return;

      try {

        await savePantryItem(
          user.uid,
          {
            name: itemName,
            category
          }
        );

        setItemName("");

        loadItems();

      } catch (error) {

        console.error(error);

      }

    };

  const removeItem =
    async (id) => {

      try {

        await deletePantryItem(
          user.uid,
          id
        );

        loadItems();

      } catch (error) {

        console.error(error);

      }

    };

  const generateRecipe =
    () => {

      if (
        items.length === 0
      ) {

        alert(
          "Please add some pantry items first."
        );

        return;

      }

      const ingredients =
        items.map(
          item =>
            item.name.toLowerCase()
        );

      const ideas = [];

      if (
        ingredients.includes(
          "rice"
        ) &&
        ingredients.includes(
          "egg"
        )
      ) {

        ideas.push(
          "🍳 Egg Fried Rice"
        );

      }

      if (
        ingredients.includes(
          "tomato"
        ) &&
        ingredients.includes(
          "onion"
        )
      ) {

        ideas.push(
          "🍅 Tomato Onion Curry"
        );

      }

      if (
        ingredients.includes(
          "potato"
        )
      ) {

        ideas.push(
          "🥔 Potato Fry"
        );

      }

      if (
        ingredients.includes(
          "milk"
        )
      ) {

        ideas.push(
          "🥛 Milk Shake"
        );

      }

      if (
        ingredients.includes(
          "chicken"
        )
      ) {

        ideas.push(
          "🍗 Chicken Curry"
        );

      }

      if (
        ideas.length === 0
      ) {

        ideas.push(
          "🤖 No matching recipes found."
        );

      }

      setRecipeIdeas(
        ideas
      );

    };

  return (

    <div className="pantry-page">

      <BackButton />

      <h1>
        🥫 Pantry Manager
      </h1>

      <div className="pantry-form">

        <input
          type="text"
          placeholder="Ingredient Name"
          value={itemName}
          onChange={(e) =>
            setItemName(
              e.target.value
            )
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        >

          <option>
            Vegetables
          </option>

          <option>
            Fruits
          </option>

          <option>
            Dairy
          </option>

          <option>
            Meat
          </option>

          <option>
            Grains
          </option>

          <option>
            Spices
          </option>

        </select>

        <button
          onClick={addItem}
        >
          ➕ Add
        </button>

      </div>

      <div className="pantry-actions">

        <button
          className="cook-btn"
          onClick={
            generateRecipe
          }
        >
          🍳 What Can I Cook?
        </button>

      </div>

      {recipeIdeas.length > 0 && (

        <div className="recipe-ideas">

          <h3>
            🍳 Recipe Suggestions
          </h3>

          {recipeIdeas.map(
            (
              recipe,
              index
            ) => (

              <div
                key={index}
                className="recipe-idea-card"
              >
                {recipe}
              </div>

            )
          )}

        </div>

      )}

      <div className="pantry-list">

        {items.map(
          item => (

            <div
              key={item.id}
              className="pantry-card"
            >

              <h4>
                {item.name}
              </h4>

              <p>
                {item.category}
              </p>

              <button
                onClick={() =>
                  removeItem(
                    item.id
                  )
                }
              >
                🗑
              </button>

            </div>

          )
        )}

      </div>

    </div>

  );

}

export default PantryManager;