import { useNavigate } from "react-router-dom";
import "./../styles/home.css";
function TrendingPanel() {
  const navigate = useNavigate();

  const trendingRecipes = [
    {
      title: "Cheese Pizza",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300",
      rating: "4.8",
    },
     {
      title: "Dessert",
      image:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300",
      rating: "4.8",
    },
    {
      title: "Chicken Burger",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300",
      rating: "4.9",
    },
    
    {
      title: "Chocolate Cake",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300",
      rating: "4.9",
    },
  ];

  const handleRecipeClick = (
    recipeTitle
  ) => {
    navigate(
      `/search?q=${recipeTitle}`
    );
  };

  return (
    <div className="trending-panel">

      <div className="trending-header">
        <h2>🔥 Trending Recipes</h2>
      </div>

      {trendingRecipes.map(
        (recipe, index) => (
          <div
            className="trending-item"
            key={index}
            onClick={() =>
              handleRecipeClick(
                recipe.title
              )
            }
          >
            <img
              src={recipe.image}
              alt={recipe.title}
            />

            <div className="trending-info">
              <h4>
                {recipe.title}
              </h4>

              <p>
                ⭐ {recipe.rating}
              </p>
            </div>
          </div>
        )
      )}

    </div>
  );
}

export default TrendingPanel;