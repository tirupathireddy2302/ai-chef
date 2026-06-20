import { useNavigate } from "react-router-dom";
import "./../styles/Categories.css";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Pizza",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300",
    },
    {
      name: "Burger",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300",
    },
    
    {
      name: "Dessert",
      image:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300",
    },
    {
      name: "Salad",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300",
    },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/search?q=${category}`);
  };

  return (
    <section className="categories-section">
      <div className="section-header">
  <h2>Popular Categories</h2>

  <span>
    See All
  </span>
</div>

      <div className="categories-container">
        {categories.map((category, index) => (
          <div
            className="category-card"
            key={index}
            onClick={() =>
              handleCategoryClick(
                category.name
              )
            }
          >
            <div className="category-image">
              <img
                src={category.image}
                alt={category.name}
              />
            </div>

            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;