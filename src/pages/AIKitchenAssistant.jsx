import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

import { generateRecipe } from "../services/aiRecipeApi";
import { analyzeFoodImage } from "../services/imageRecipeApi";

import "../styles/AIKitchenAssistant.css";


function AIKitchenAssistant() {

  const navigate =
    useNavigate();

  const [mode,
    setMode] =
    useState("ingredients");

  const [ingredients,
    setIngredients] =
    useState("");
    const [language,
  setLanguage] =
  useState("English");

  const [image,
    setImage] =
    useState(null);

  const [preview,
    setPreview] =
    useState(null);

  const [result,
    setResult] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const [listening,
    setListening] =
    useState(false);

  useEffect(() => {

    return () => {

      window.speechSynthesis.cancel();

    };

  }, []);

  const startListening =
    () => {

      const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

      if (
        !SpeechRecognition
      ) {

        alert(
          "Speech Recognition not supported in this browser."
        );

        return;
      }

      const recognition =
        new SpeechRecognition();

      recognition.lang =
        "en-US";

      recognition.start();

      setListening(true);

      recognition.onresult =
        (event) => {

          const transcript =
            event.results[0][0]
              .transcript;

          setIngredients(
            transcript
          );

          setListening(
            false
          );
        };

      recognition.onerror =
        () => {

          setListening(
            false
          );

        };

      recognition.onend =
        () => {

          setListening(
            false
          );

        };
    };

  const speakRecipe =
    (text) => {

      window.speechSynthesis.cancel();

      const speech =
        new SpeechSynthesisUtterance(
          text
        );

      speech.lang =
        "en-US";

      window.speechSynthesis.speak(
        speech
      );
    };

  const stopSpeaking =
    () => {

      window.speechSynthesis.cancel();

    };

  const handleGenerate =
    async () => {

      if (
        !ingredients.trim()
      )
        return;

      try {

        setLoading(true);

       const data =
  await generateRecipe(
    ingredients,
    language
  );

        setResult(data);

      } catch (error) {

  console.error(error);

  alert(
    "⚠️ AI Recipe Generator is temporarily unavailable."
  );

  setResult("");

      } finally {

        setLoading(false);

      }
    };
    const saveAIRecipe = () => {

  if (!result) return;

  const favorites =
    JSON.parse(
      localStorage.getItem("favorites")
    ) || [];

  const aiRecipe = {
    id: Date.now(),
    title: ingredients || "AI Generated Recipe",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
    content: result,
    rating: "AI",
    time: "Custom"
  };

  favorites.push(aiRecipe);

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );

  alert("❤️ Recipe Saved!");
};

const downloadPDF = () => {

  if (!result) return;

  const doc = new jsPDF();

  const lines =
    doc.splitTextToSize(
      result,
      180
    );

  doc.text(
    lines,
    10,
    10
  );

  doc.save("recipe.pdf");
};

  const handleImage =
    async () => {

      if (!image)
        return;

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
    "⚠️ Food Analysis is temporarily unavailable."
  );

  setResult("");


      } finally {

        setLoading(false);

      }
    };
    const switchMode = (newMode) => {

  setMode(newMode);

  setResult("");

  setIngredients("");

  setImage(null);

  setPreview(null);

  setLoading(false);

  setListening(false);

  window.speechSynthesis.cancel();

};

  return (

    <div className="ai-kitchen">

      <button
        className="ai-back-btn"
        onClick={() => {

          window.speechSynthesis.cancel();

          navigate("/");

        }}
      >
        ← Back
      </button>

      <h1>
        🤖 AI Kitchen Assistant
      </h1>

      <div className="ai-tabs">

        <button
  className={
    mode === "ingredients"
      ? "active"
      : ""
  }
  onClick={() =>
    switchMode(
      "ingredients"
    )
  }
>
  🍽 Ingredients
</button>

<button
  className={
    mode === "image"
      ? "active"
      : ""
  }
  onClick={() =>
    switchMode(
      "image"
    )
  }
>
  📷 Upload Image
</button>
      </div>

      {mode ===
        "ingredients" && (
          

        <>
        <select
  className="language-select"
  value={language}
  onChange={(e) =>
    setLanguage(
      e.target.value
    )
  }
>
  <option value="English">
    English
  </option>

  <option value="Hindi">
    Hindi
  </option>

  <option value="Telugu">
    Telugu
  </option>

  <option value="Tamil">
    Tamil
  </option>

  <option value="Kannada">
    Kannada
  </option>

  <option value="Malayalam">
    Malayalam
  </option>
</select>

          <textarea
            placeholder="Chicken, Rice, Onion"
            value={
              ingredients
            }
            onChange={(e) =>
              setIngredients(
                e.target.value
              )
            }
          />

          <div className="voice-actions">

            <button
              className="voice-btn"
              onClick={
                startListening
              }
            >
              {listening
                ? "🎤 Listening..."
                : "🎙 Speak Ingredients"}
            </button>

          </div>

          <button
  className="generate-btn"
  onClick={handleGenerate}
  disabled={loading}
>
  {loading
    ? "Generating..."
    : "🍳 Generate Recipe"}
</button>
        </>

      )}

      {mode ===
        "image" && (

        <>

          <input
          className="upload-input"
            type="file"
            accept="image/*"
           onChange={(e) => {

  const file =
    e.target.files?.[0];

  if (!file) return;

  setImage(file);

  setPreview(
    URL.createObjectURL(file)
  );

  setResult("");

}}
          />

          {preview && (

            <img
              src={preview}
              alt="preview"
              className="preview"
            />

          )}

         <button
  className="analyze-btn"
  onClick={handleImage}
  disabled={loading}
>
  {loading
    ? "Analyzing..."
    : "🔍 Analyze Food"}
</button>
        </>

      )}

      {loading && (

  <h3 className="loading-text">
    {mode === "ingredients"
      ? "🍳 Generating Recipe..."
      : "🔍 Analyzing Food..."}
  </h3>

)}

      {result && (

  <div className="ai-result">

    {!result.includes(
      "Failed"
    ) && (

      <div className="result-actions">

        <button
          className="speak-btn"
          onClick={() =>
            speakRecipe(result)
          }
        >
          🔊 Read Recipe
        </button>

        <button
          className="stop-btn"
          onClick={stopSpeaking}
        >
          ⏹ Stop Reading
        </button>

        <button
          className="save-ai-btn"
          onClick={saveAIRecipe}
        >
          ❤️ Save Recipe
        </button>

        <button
          className="pdf-btn"
          onClick={downloadPDF}
        >
          📄 Download PDF
        </button>

      </div>

    )}

    <div className="recipe-output">
      {result}
    </div>

  </div>

)}
    </div>
  );
}

export default AIKitchenAssistant;