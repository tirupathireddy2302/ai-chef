import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import BackButton from "../components/BackButton";
import MealPlanCards from "../components/MealPlanCards";
import { useNavigate} from "react-router-dom";
import { generateMealPlan} from "../services/mealPlannerApi";
import "../styles/AIMealPlanner.css";
import { saveMealPlan as saveMealPlanToFirebase } from "../services/mealPlanService";
import {useAuth} from "../context/AuthContext";

function AIMealPlanner() {

  const [budget, setBudget] = useState("");
  const [language,setLanguage] =useState("English");
  const { user } =useAuth();
  const [days,setDays] =useState("7");
  const [diet,setDiet] =useState("Vegetarian");
  const navigate = useNavigate();
  const [mealPlan, setMealPlan] = useState("");
  const [loading,setLoading] =useState(false);

  useEffect(() => {

    return () => {

      window.speechSynthesis.cancel();

    };

  }, []);

  const generatePlan =
    async () => {

      if (!budget) {

        alert(
          "Please enter a budget."
        );

        return;
      }

      try {

  setLoading(true);

  const result =
    await generateMealPlan(
      budget,
      diet,
      days,
      language
    );

  setMealPlan(result);

} catch (error) {

  console.error(error);

  alert(
    "⚠️ AI Meal Planner is temporarily unavailable."
  );

  setMealPlan("");

} finally {

  setLoading(false);

}
    };

  const speakMealPlan =
    () => {

      if (!mealPlan) return;

      window.speechSynthesis.cancel();

      const speech =
        new SpeechSynthesisUtterance(
          mealPlan
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

  const handleSaveMealPlan = async () => {

  if (!mealPlan) return;

  if (!user) {

    alert(
      "Please login first"
    );

    return;

  }

  try {

    const planData = {

      budget,

      diet,

      days,

      plan: mealPlan,

      createdAt:
        new Date().toLocaleString()

    };

    await saveMealPlanToFirebase(
      user.uid,
      planData
    );

    alert(
      "❤️ Meal Plan Saved To Cloud!"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Failed to save meal plan"
    );

  }

};

  const downloadPDF =
    () => {

      if (!mealPlan) return;

      const doc =
        new jsPDF();

      const lines =
        doc.splitTextToSize(
          mealPlan,
          180
        );

      doc.text(
        lines,
        10,
        10
      );

      doc.save(
        "meal-plan.pdf"
      );
    };
    const addToGroceryList =
() => {

  if (!mealPlan)
    return;

  const existing =
    JSON.parse(
      localStorage.getItem(
        "groceryList"
      )
    ) || [];

  const lines =
    mealPlan
      .split("\n")
      .map(
        item =>
          item.trim()
      )
      .filter(
        item =>
          item.length > 0
      );

  const groceryItems =
    lines.filter(
      item =>

        !item.includes("📅") &&
        !item.includes("🍳") &&
        !item.includes("🍛") &&
        !item.includes("🌙") &&
        !item.includes("🔥") &&
        !item.includes("💰") &&
        !item.includes("Breakfast") &&
        !item.includes("Lunch") &&
        !item.includes("Dinner")
    );

  const updated = [

    ...new Set([
      ...existing,
      ...groceryItems
    ])

  ];

  localStorage.setItem(
    "groceryList",
    JSON.stringify(
      updated
    )
  );

  alert(
    "🛒 Added To Grocery List!"
  );

};
  return (

    <div className="meal-page">

      <BackButton />

      <h1>
        🤖 AI Meal Planner
      </h1>

      <div className="planner-form">

        <input
          type="number"
          placeholder="Budget ₹"
          value={budget}
          onChange={(e) =>
            setBudget(
              e.target.value
            )
          }
        />

        <select
          value={diet}
          onChange={(e) =>
            setDiet(
              e.target.value
            )
          }
        >
          <option>
            Vegetarian
          </option>

          <option>
            Non Vegetarian
          </option>

          <option>
            Vegan
          </option>
        </select>

        <select
          value={days}
          onChange={(e) =>
            setDays(
              e.target.value
            )
          }
        >
          <option value="3">
            3 Days
          </option>

          <option value="7">
            7 Days
          </option>

          <option value="14">
            14 Days
          </option>
        </select>
        <select
  value={language}
  onChange={(e) =>
    setLanguage(
      e.target.value
    )
  }
  className="language-select"
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
<button
  className="history-btn"
  onClick={() =>
    navigate(
      "/meal-history"
    )
  }
>
  📜 History
</button>

        <button
          onClick={generatePlan}
        >
          {loading
            ? "Generating..."
            : "Generate Plan"}
        </button>

      </div>
{mealPlan && (

  <div className="meal-results">

    {!mealPlan.includes(
      "Failed to generate meal plan"
    ) && (

      <div className="meal-actions">
        <button
  className="grocery-btn"
  onClick={
    addToGroceryList
  }
>
  🛒 Add To Grocery List
</button>

        <button
          className="speak-btn"
          onClick={speakMealPlan}
        >
          🔊 Read Plan
        </button>

        <button
          className="stop-btn"
          onClick={stopSpeaking}
        >
          ⏹ Stop Reading
        </button>

        <button
  className="save-ai-btn"
  onClick={handleSaveMealPlan}
  disabled={!user}
>
  ❤️ Save Plan
</button>

        <button
          className="pdf-btn"
          onClick={downloadPDF}
        >
          📄 Download PDF
        </button>

      </div>

    )}
<MealPlanCards
  mealPlan={mealPlan}
/>

  </div>

)}

  </div>

  );
}

export default AIMealPlanner;