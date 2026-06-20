import {
  FaHome,
  FaCompass,
  FaHeart,
  FaUser,
  FaRobot,
  FaShoppingBasket
} from "react-icons/fa";

import { GiChefToque } from "react-icons/gi";
import { MdRestaurantMenu } from "react-icons/md";

import { Link } from "react-router-dom";

import "./../styles/Sidebar.css";

function Sidebar() {

  return (

    <aside className="sidebar">

      <div className="logo">
        <h2>Recipe</h2>
        
      </div>

      <nav>

        <Link
          to="/"
          className="nav-item"
        >
          <FaHome />
          <span>Home</span>
        </Link>

        <Link
          to="/explore"
          className="nav-item"
        >
          <FaCompass />
          <span>Explore</span>
        </Link>

        <Link
          to="/ai-kitchen"
          className="nav-item"
        >
          <FaRobot />
          <span>AI Kitchen</span>
        </Link>

        <Link
          to="/ai-chef"
          className="nav-item"
        >
          <GiChefToque />
          <span>AI Chef</span>
        </Link>

        <Link
           to="/pantry"
           className="nav-item"
          >
         🥫 Pantry
        </Link>

        <Link
          to="/meal-planner"
          className="nav-item"
        >
          <MdRestaurantMenu />
          <span>Meal Planner</span>
        </Link>

        <Link
          to="/grocery-list"
          className="nav-item"
        >
          <FaShoppingBasket />
          <span>Grocery List</span>
        </Link>

        <Link
         to="/ingredient-scanner"
         className="nav-item"
        >
        📸 Ingredient Scanner
        </Link>

        <Link
          to="/favorites"
          className="nav-item"
        >
          <FaHeart />
          <span>Favorites</span>
        </Link>
        <Link
  to="/price-compare"
  className="nav-item"
>
  <span>🛒</span>
  <span>Price Compare</span>
</Link>

        <Link
          to="/profile"
          className="nav-item"
        >
          <FaUser />
          <span>Profile</span>
        </Link>

      </nav>

    </aside>

  );
}

export default Sidebar;