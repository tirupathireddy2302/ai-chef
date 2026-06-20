import RecipeCard from "./RecipeCard";
import { useNavigate } from "react-router-dom";

function RecommendedRecipes() {
  const navigate = useNavigate();

  const recipes = [
    {
      title: "Margherita Pizza",
      rating: "4.8",
      time: "25 min",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
    },
    {
      title: "Chicken Burger",
      rating: "4.9",
      time: "20 min",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    },
    {
      title: "Dessert",
      rating: "4.8",
      time: "30 min",
      image:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300",
    },
    {
      title: "Chocolate Cake",
      rating: "4.9",
      time: "45 min",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
    },
  ];

  return (
    <section className="recommended-section">
      <div className="section-header">
  <h2>Recommended For You</h2>

  <span>
    See All
  </span>
</div>

     <div className="recommended-list">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate(
                `/search?q=${recipe.title}`
              )
            }
          >
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecommendedRecipes;