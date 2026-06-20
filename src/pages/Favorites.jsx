import { useEffect, useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import BackButton from "../components/BackButton";
import { getFavorites, deleteFavorite} from "../services/favoriteService";
import { useAuth } from "../context/AuthContext";
import "../styles/Favorites.css"

function Favorites() {

  const navigate =
    useNavigate();

  const { user } =
    useAuth();

  const [favorites,
    setFavorites] =
    useState([]);

  useEffect(() => {

    if (!user)
      return;

    const loadFavorites =
      async () => {

        const data =
          await getFavorites(
            user.uid
            
          );
console.log(
  "Firebase Favorites:",
  data
);
        setFavorites(
          data
        );

      };

    loadFavorites();

  }, [user]);

  const removeFavorite =
    async (
      favoriteId
    ) => {

      try {

        await deleteFavorite(
          user.uid,
          favoriteId
        );

        setFavorites(
          prev =>
            prev.filter(
              recipe =>
                recipe.id !==
                favoriteId
            )
        );

      } catch (error) {

        console.error(
          error
        );

      }

    };

  return (

    <div className="favorites-page">

     <BackButton />

<div className="favorites-header">

  <h1>
    ❤️ Favorite Recipes ({favorites.length})
  </h1>

  <Link
    to="/grocery-list"
    className="grocery-btn"
  >
    🛒 Grocery List
  </Link>

      </div>

      {favorites.length === 0 ? (

        <div className="empty-favorites">

          <h2>
            No Favorites Yet 😢
          </h2>

          <p>
            Add some recipes
            to favorites.
          </p>

        </div>

      ) : (

       <div className="favorites-grid">

  {favorites.map((recipe) => (

    <div
      className="favorite-card"
      key={recipe.id}
      onClick={() =>
        navigate(`/search?q=${recipe.title}`)
      }
    >
<div className="favorite-image">

  <img
    src={recipe.image}
    alt={recipe.title}
  />

  <button
    className="remove-btn"
                    onClick={(e) => {

                      e.stopPropagation();

                      removeFavorite(
                        recipe.id
                      );

                    }}
                  >
                    ❌
                  </button>

                </div>

               <div className="favorite-content">

  <h3>
    {recipe.title}
  </h3>

  {recipe.rating && (
    <p className="favorite-rating">
      ⭐ {recipe.rating}
    </p>
  )}

  {recipe.time && (
    <p className="favorite-time">
      ⏱ {recipe.time}
    </p>
  )}

</div>

              </div>

            )
          )}

        </div>

      )}

    </div>

  );
}

export default Favorites;