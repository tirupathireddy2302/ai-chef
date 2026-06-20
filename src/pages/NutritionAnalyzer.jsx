import { useState } from "react";
import axios from "axios";

import BackButton from "../components/BackButton";
import "../styles/NutritionAnalyzer.css";

function NutritionAnalyzer() {

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [result, setResult] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleImage =
    (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      setImage(file);

      setPreview(
        URL.createObjectURL(file)
      );

    };

  const analyzeFood =
    async () => {

      if (!image) {

        alert(
          "Please select an image"
        );

        return;

      }

      try {

        setLoading(true);

        const reader =
          new FileReader();

        reader.onload =
          async () => {

            try {

              const base64 =
                reader.result
                  .split(",")[1];

              const response =
                await axios.post(
                  "http://localhost:5000/analyze-food",
                  {
                    image: base64
                  }
                );

              setResult(
                response.data.result
              );

            } catch (error) {

              console.error(error);

              alert(
                "Failed to analyze food"
              );

            } finally {

              setLoading(false);

            }

          };

        reader.readAsDataURL(
          image
        );

      } catch (error) {

        console.error(error);

        setLoading(false);

      }

    };

  return (

    <div className="nutrition-page">

      <BackButton />

      <h1>
        🥗 AI Nutrition Analyzer
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
      />

      {preview && (

        <img
          src={preview}
          alt="Food"
          className="nutrition-image"
        />

      )}

      <button
        className="analyze-btn"
        onClick={analyzeFood}
      >
        {
          loading
            ? "Analyzing..."
            : "🔍 Analyze Nutrition"
        }
      </button>

      {result && (

        <div className="nutrition-result">

          <h2>
            Nutrition Report
          </h2>

          <pre>
            {result}
          </pre>

        </div>

      )}

    </div>

  );

}

export default NutritionAnalyzer;