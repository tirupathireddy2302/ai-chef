import { useState } from "react";

import {
  analyzeFoodImage,
} from "../services/imageRecipeApi";

import "../styles/RecipeFromImage.css";

function RecipeFromImage() {
  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState(null);

  const [result, setResult] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleImageChange = (e) => {
    const file =
      e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };

  const handleAnalyze =
    async () => {

      if (!image) {
        alert(
          "Select an image first"
        );
        return;
      }

      try {

        setLoading(true);

        const data =
          await analyzeFoodImage(
            image
          );

        setResult(data);

      } catch (error) {

        console.error(error);

        alert(
          "Failed to analyze image"
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <div className="image-ai-page">

      <h1>
        📷 AI Recipe From Image
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={
          handleImageChange
        }
      />

      {preview && (
        <img
          src={preview}
          alt="Food"
          className="preview-image"
        />
      )}

      <button
        onClick={handleAnalyze}
      >
        {loading
          ? "Analyzing..."
          : "Analyze Food"}
      </button>

      {result && (
        <div className="result-box">
          <pre>
            {result}
          </pre>
        </div>
      )}

    </div>
  );
}

export default RecipeFromImage;