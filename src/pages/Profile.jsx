import "./../styles/Profile.css";

import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import { signOut } from "firebase/auth";

import { auth } from "../firebase";

import { useNavigate } from "react-router-dom";

function Profile() {

  const navigate =
    useNavigate();

  const { user } =
    useAuth();

  const [favoritesCount,
    setFavoritesCount] =
    useState(0);

  const [darkMode,
    setDarkMode] =
    useState(
      localStorage.getItem(
        "darkMode"
      ) === "true"
    );

  useEffect(() => {

    const favorites =
      JSON.parse(
        localStorage.getItem(
          "favorites"
        )
      ) || [];

    setFavoritesCount(
      favorites.length
    );

  }, []);

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

  const handleLogout =
    async () => {

      try {

        await signOut(
          auth
        );

        navigate(
          "/auth"
        );

      } catch (error) {

        console.error(
          error
        );

      }

    };

  return (

    <div className="profile-page">

      <button
        className="profile-back-btn"
        onClick={() =>
          navigate("/")
        }
      >
        ← Back
      </button>

      <div className="profile-card">

        <h2>
          👤 My Profile
        </h2>

        <p className="profile-email">
          {user?.email}
        </p>

        <div className="profile-stats">

          <div>
            <h3>
              {favoritesCount}
            </h3>

            <span>
              Favorites
            </span>
          </div>

        </div>

        <div className="profile-setting">

          <span>
            🌙 Dark Mode
          </span>

          <label className="switch">

            <input
              type="checkbox"
              checked={darkMode}
              onChange={() =>
                setDarkMode(
                  !darkMode
                )
              }
            />

            <span className="slider"></span>

          </label>

        </div>

        <button
          className="logout-btn"
          onClick={
            handleLogout
          }
        >
          Logout
        </button>

      </div>

    </div>

  );
}

export default Profile;