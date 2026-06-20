import { useNavigate } from "react-router-dom";
import "../styles/IndianRecipes.css";

function IndianRecipes() {
  const navigate = useNavigate();

  const recipes = [
    {
      name: "Biryani",
      image:
        "https://images.unsplash.com/photo-1563379091339-03246963d29a?w=500",
    },
    {
      name: "Dosa",
      image:
        "https://images.unsplash.com/photo-1630383249896-424e482df921?w=500",
    },
    {
      name: "Idli",
      image:
        "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500",
    },
    {
      name: "Paneer",
      image:
        "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500",
    },
    {
      name: "Pongal",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
    },
  ];

  const handleRecipeClick = (recipeName) => {
    console.log("Opening:", recipeName);

    navigate(
      `/indian-recipe/${recipeName}`
    );
  };

  return (
    <section className="indian-section">

      <div className="section-header">
        <h2>
          🍛 Popular Indian Recipes
        </h2>

        <span
          style={{
            cursor: "pointer",
          }}
        >
          See All
        </span>
      </div>

      <div className="indian-list">

        {recipes.map(
          (recipe, index) => (
            <div
              key={index}
              className="indian-card"
              onClick={() =>
                handleRecipeClick(
                  recipe.name
                )
              }
            >
              <div className="indian-avatar">

                <img
                  src={recipe.image}
                  alt={recipe.name}
                />

              </div>

              <h4>
                {recipe.name}
              </h4>

            </div>
          )
        )}

      </div>

    </section>
  );
}

export default IndianRecipes;