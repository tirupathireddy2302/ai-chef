import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI =
  new GoogleGenerativeAI(
    import.meta.env.VITE_GEMINI_API_KEY
  );

export async function generateRecipe(
  ingredients,
  language = "English"
) {

  try {

    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

    const prompt = `
You are a professional chef and food expert.

Create a delicious recipe using:

${ingredients}

Generate the ENTIRE response in:
${language}

IMPORTANT RULES:

1. Return ONLY plain text.
2. DO NOT use markdown.
3. DO NOT use:
   - **
   - *
   - #
   - ---
4. Use emojis only.
5. Keep the response clean and beautiful.

Format EXACTLY like this:

🍽 Recipe Name:
Recipe Name Here

⏱ Cooking Time:
XX Minutes

🛒 Ingredients:
• Ingredient 1
• Ingredient 2
• Ingredient 3

👨‍🍳 Instructions:
1. Step one
2. Step two
3. Step three

🔥 Calories:
XXX kcal

💡 Chef Tips:
Helpful cooking tip here.
`;

    const result =
      await model.generateContent(
        prompt
      );

    const text =
      result.response.text();

    return text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/#/g, "")
      .replace(/---/g, "")
      .replace(/__/g, "")
      .replace(/`/g, "")
      .trim();

  } catch (error) {

    console.error(
      "Recipe Error:",
      error
    );

    throw error;
  }
}