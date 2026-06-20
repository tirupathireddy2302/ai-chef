import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./../styles/Home.css";

import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import LiveChannels from "../components/LiveChannels";
import RecommendedRecipes from "../components/RecommendedRecipes";
import TrendingPanel from "../components/TrendingPanel";
import RecipeGrid from "../components/RecipeGrid";
import IndianRecipes from "../components/IndianRecipes";

import { searchRecipes } from "../services/recipeApi";

function Home() {

  const navigate =
    useNavigate();

  const [recipes,
    setRecipes] =
    useState([]);

  const handleSearch =
    async (query) => {

      try {

        const data =
          await searchRecipes(
            query
          );

        setRecipes(
          data || []
        );

      } catch (error) {

        console.error(
          error
        );

      }

    };

  return (

    <div className="home">

      <Sidebar />

      <div className="main-content">

        <div className="top-header">

          <div className="header-left">

            <h3>
              Recipe Finder
            </h3>

          </div>

        </div>

        <h4>
          Hello, Tirupathi 👋
        </h4>

        <h1>
          What would you like
          <br />
          to cook today?
        </h1>

        <SearchBar
          onSearch={
            handleSearch
          }
        />

        {recipes.length > 0 ? (

          <>

            <div className="section-header search-results-title">

              <h2>
                Search Results
              </h2>

            </div>

            <RecipeGrid
              recipes={
                recipes
              }
            />

          </>

        ) : (

          <>

            {/* Hero Section */}

            <div className="hero-card">

              <div className="hero-content">

                <span className="hero-badge">
                  ✨ Featured Recipe
                </span>

                <h2>
                  Discover Amazing
                  <br />
                  Homemade Recipes
                </h2>

                <p>
                  Explore thousands
                  of delicious recipes
                  from around the world
                  and cook like a chef.
                </p>

                <button
                  className="hero-btn"
                >
                  Explore Now
                </button>

              </div>

              <div className="hero-image">

                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"
                  alt="Food"
                />

              </div>

            </div>

            {/* AI Tools Section */}

            <div className="ai-tools-section">

              <div
                className="tool-card scanner-card"
                onClick={() =>
                  navigate(
                    "/ingredient-scanner"
                  )
                }
              >

                <h2>
                  📸 AI Ingredient Scanner
                </h2>

                <p>
                  Scan ingredients from
                  any image and instantly
                  detect food items.
                </p>

              </div>

              <div
                className="tool-card nutrition-card"
                onClick={() =>
                  navigate(
                    "/nutrition-analyzer"
                  )
                }
              >

                <h2>
                  🥗 Nutrition Analyzer
                </h2>

                <p>
                  Upload food photos and
                  get calories, protein,
                  carbs and fat instantly.
                </p>

              </div>

            </div>

            <Categories />

            <IndianRecipes />

            <LiveChannels />

            <RecommendedRecipes />

          </>

        )}

      </div>

      <div className="right-panel">

        <TrendingPanel />

      </div>

    </div>

  );

}

export default Home;