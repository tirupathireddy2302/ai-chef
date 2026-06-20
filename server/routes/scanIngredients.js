import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

console.log(
  "Route Key:",
  process.env.GEMINI_API_KEY
);

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/", async (req, res) => {

  try {

    const { image } = req.body;

    if (!image) {

      return res.status(400).json({
        error: "No image provided",
      });

    }

    let response;

    for (let i = 0; i < 3; i++) {

      try {

        response =
          await ai.models.generateContent({

            model: "gemini-2.0-flash",

            contents: [
              {
                role: "user",

                parts: [

                  {
                    inlineData: {
                      mimeType: "image/jpeg",
                      data: image,
                    },
                  },

                  {
                    text: `
Analyze this food, kitchen, pantry, or fridge image.

Identify all visible food ingredients.

Return ONLY ingredient names.

Example:

Tomato
Onion
Egg
Milk
Cheese

Rules:
- No numbering
- No explanations
- No extra text
- One ingredient per line
`,
                  },

                ],
              },
            ],

          });

        break;

      } catch (error) {

        console.log(
          `Gemini Retry ${i + 1}/3`
        );

        if (i === 2) {
          throw error;
        }

        await new Promise(
          resolve =>
            setTimeout(
              resolve,
              2000
            )
        );

      }

    }

    const ingredientsText =
      response?.text || "";

    res.json({
      ingredients:
        ingredientsText,
    });

  } catch (error) {

    console.error(
      "Gemini Error:",
      error
    );

    res.status(500).json({
      error:
        error.message ||
        "Failed to scan image",
    });

  }

});

export default router;