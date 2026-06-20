import express from "express";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

const ai =
  new GoogleGenAI({
    apiKey:
      process.env.GEMINI_API_KEY,
  });

router.post(
  "/",
  async (req, res) => {

    try {

      const { image } =
        req.body;

      const response =
        await ai.models.generateContent({

          model:
            "gemini-2.5-flash",

          contents: [
            {
              role: "user",

              parts: [

                {
                  inlineData: {
                    mimeType:
                      "image/jpeg",

                    data:
                      image,
                  },
                },

                {
                  text: `
Analyze this food image.

Return exactly:

Food:
Calories:
Protein:
Carbs:
Fat:

Example:

Food: Pizza
Calories: 420 kcal
Protein: 18 g
Carbs: 45 g
Fat: 20 g
`,
                },

              ],
            },
          ],
        });

      res.json({
        result:
          response.text,
      });

    } catch (error) {

      console.error(
        error
      );

      res.status(500).json({
        error:
          "Analysis failed",
      });

    }

  }
);

export default router;