import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import scanIngredients from "./routes/scanIngredients.js";
import analyzeFood from "./routes/analyzeFood.js";



console.log(
  "GEMINI KEY:",
  process.env.GEMINI_API_KEY
);

const app = express();

app.use(cors());

app.use(
  express.json({
    limit: "20mb",
  })
);

app.use(
  "/scan-ingredients",
  scanIngredients
);

app.use(
  "/analyze-food",
  analyzeFood
);
app.get("/", (req, res) => {
  res.send(
    "Ingredient Scanner API Running 🚀"
  );
});

app.listen(5000, () => {
  console.log(
    "🚀 Server running on port 5000"
  );
});