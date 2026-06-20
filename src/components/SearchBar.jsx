import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchSuggestions } from "../services/recipeApi";
import "../styles/SearchBar.css";

function SearchBar() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] =
    useState([]);

  const [recentSearches,
    setRecentSearches] =
    useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(
        localStorage.getItem(
          "recentSearches"
        )
      ) || [];

    setRecentSearches(saved);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const data =
          await searchSuggestions(query);

        setSuggestions(
          data.slice(0, 5)
        );
      } catch (error) {
        console.error(error);
      }
    };

    const timer =
      setTimeout(fetchSuggestions, 300);

    return () =>
      clearTimeout(timer);
  }, [query]);

  const saveSearch = (
    searchTerm
  ) => {
    const searches =
      JSON.parse(
        localStorage.getItem(
          "recentSearches"
        )
      ) || [];

    const updated = [
      searchTerm,
      ...searches.filter(
        item =>
          item !== searchTerm
      ),
    ].slice(0, 5);

    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updated)
    );

    setRecentSearches(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    saveSearch(query);

    navigate(
      `/search?q=${query}`
    );

    setSuggestions([]);
  };

  const handleSuggestionClick = (
    recipeTitle
  ) => {
    saveSearch(recipeTitle);

    setQuery(recipeTitle);

    navigate(
      `/search?q=${recipeTitle}`
    );

    setSuggestions([]);
  };

  return (
    <div className="search-wrapper">

      <form
        className="search-container"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) =>
            setQuery(
              e.target.value
            )
          }
        />

        {query && (
          <button
            type="button"
            className="clear-btn"
            onClick={() => {
              setQuery("");
              setSuggestions([]);
            }}
          >
            ✕
          </button>
        )}

        <button
          type="submit"
          className="search-btn"
        >
          🔍
        </button>
      </form>

      {recentSearches.length > 0 &&
        !query && (
          <div className="recent-searches">

            <div className="recent-header">

              <h4>
                Recent Searches
              </h4>

              <button
                className="clear-history"
                onClick={() => {
                  localStorage.removeItem(
                    "recentSearches"
                  );

                  setRecentSearches(
                    []
                  );
                }}
              >
                Clear
              </button>

            </div>

            <div className="recent-list">

              {recentSearches.map(
                (
                  item,
                  index
                ) => (
                  <span
                    key={index}
                    onClick={() =>
                      handleSuggestionClick(
                        item
                      )
                    }
                  >
                    🕒 {item}
                  </span>
                )
              )}

            </div>

          </div>
        )}

      {suggestions.length > 0 && (
        <div className="suggestions-dropdown">

          {suggestions.map(
            (item) => (
              <div
                key={item.id}
                className="suggestion-item"
                onClick={() =>
                  handleSuggestionClick(
                    item.title
                  )
                }
              >
                🍽️ {item.title}
              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}

export default SearchBar;