import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import SearchResults from "./pages/SearchResults";
import Favorites from "./pages/Favorites";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import AuthPage from "./pages/AuthPage";
import LiveChannelsPage from "./pages/LiveChannelsPage";
import AIRecipeGenerator from "./pages/AIRecipeGenerator";
import RecipeFromImage from "./pages/RecipeFromImage";
import AIKitchenAssistant from "./pages/AIKitchenAssistant";
import ProtectedRoute from "./components/ProtectedRoute";
import IndianRecipeDetails from "./pages/IndianRecipeDetails";
import GroceryList from "./pages/GroceryList";
import AIMealPlanner from "./pages/AIMealPlanner";
import MealPlanHistory from "./pages/MealPlanHistory";
import AIChefChat from "./pages/AIChefChat";
import PantryManager from "./pages/PantryManager";
import IngredientScanner from "./pages/IngredientScanner";
import NutritionAnalyzer from "./pages/NutritionAnalyzer";
import PriceCompare from "./pages/PriceCompare";
import "./App.css";

function App() {

  const [darkMode,
    setDarkMode] =
    useState(
      localStorage.getItem(
        "darkMode"
      ) === "true"
    );

  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      darkMode
    );

    if (darkMode) {

      document.body.classList.add(
        "dark-theme"
      );

    } else {

      document.body.classList.remove(
        "dark-theme"
      );

    }

  }, [darkMode]);

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/search"
          element={<SearchResults />}
        />

        <Route
          path="/meal-planner"
          element={<AIMealPlanner />}
          
        />
        <Route
          path="/pantry"
          element={<PantryManager />}
        />
        
        <Route
          path="/ai-chef"
          element={<AIChefChat />}
        />
        <Route
          path="/ingredient-scanner"
          element={<IngredientScanner />}
        />
        <Route
          path="/nutrition-analyzer"
          element={<NutritionAnalyzer />}
        />
        <Route
          path="/price-compare"
          element={<PriceCompare />}
        />

        <Route
          path="/indian-recipe/:name"
          element={<IndianRecipeDetails />}
        />

        <Route
          path="/grocery-list"
          element={<GroceryList />}
        />

        <Route
          path="/explore"
          element={<Explore />}
        />

        <Route
          path="/ai-recipe"
          element={<AIRecipeGenerator />}
        />

        <Route
          path="/recipe-image"
          element={<RecipeFromImage />}
        />

        <Route
          path="/ai-kitchen"
          element={<AIKitchenAssistant />}
        />

        <Route
          path="/meal-history"
          element={<MealPlanHistory />}
        />

        <Route
          path="/auth"
          element={<AuthPage />}
        />

        <Route
          path="/live-channels"
          element={<LiveChannelsPage />}
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recipe/:id"
          element={<RecipeDetails />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;