import { useState } from "react";
import BackButton from "../components/BackButton";
import { searchProductPrice } from "../services/priceApi";
import "../styles/PriceCompare.css";

function PriceCompare() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);

      const data = await searchProductPrice(query);

      if (data?.products) {
        setResults(data.products);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="price-page">
      <BackButton />

      <div className="price-header">
        <h1>🛒 Real-Time Grocery Prices</h1>

        <p>
          Compare grocery prices from multiple stores
          instantly.
        </p>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search Tomato, Eggs, Milk..."
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            handleSearch()
          }
        />

        <button onClick={handleSearch}>
          🔍 Search
        </button>
      </div>

      {loading && (
        <div className="loading">
          Searching prices...
        </div>
      )}

      <div className="price-results">
        {results.map((item, index) => (
          <div
            key={index}
            className="price-card"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
            />

            <div className="card-content">
              <h3>{item.title}</h3>

              <p className="store-name">
                🏪 {item.source}
              </p>

              <h2>
                💰 {item.price}
              </h2>

              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
              >
                View Product →
              </a>
            </div>
          </div>
        ))}
      </div>

      {!loading &&
        results.length === 0 &&
        query && (
          <div className="no-results">
            No products found.
          </div>
        )}
    </div>
  );
}

export default PriceCompare;