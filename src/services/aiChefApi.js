import { GoogleGenerativeAI }
from "@google/generative-ai";

const genAI =
  new GoogleGenerativeAI(
    import.meta.env.VITE_GEMINI_API_KEY
  );

export async function askChef(
  question
) {

  try {

    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
      });

    const prompt = `
You are an expert professional chef.

IMPORTANT RULES:

1. Return ONLY plain text.
2. DO NOT use markdown.
3. DO NOT use:
   - **
   - *
   - #
   - ---
4. Keep answers short and helpful.
5. Give one best recipe suggestion.
6. Include:
   🍽 Recipe Name
   ⏱ Cooking Time
   🛒 Ingredients
   👨‍🍳 Steps
   💡 Chef Tip
7. Maximum 150 words.

Example Format:

🍽 Recipe Name:
Chicken Fried Rice

⏱ Cooking Time:
20 Minutes

🛒 Ingredients:
• Rice
• Chicken
• Onion
• Soy Sauce

👨‍🍳 Steps:
1. Cook chicken.
2. Add onions.
3. Mix rice.
4. Stir fry.

💡 Chef Tip:
Use leftover rice for best results.

User Question:

${question}
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
      .trim();

  } catch (error) {

    console.error(
      "Chef Error:",
      error
    );

    return `
❌ AI Chef is currently unavailable.

Please try again later.
`;
  }
}