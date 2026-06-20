import { GoogleGenerativeAI }
from "@google/generative-ai";

const genAI =
  new GoogleGenerativeAI(
    import.meta.env.VITE_GEMINI_API_KEY
  );

export async function generateMealPlan(
  budget,
  diet,
  days,
  language = "English"
) {

  try {

    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

    const prompt = `
Generate the ENTIRE meal plan in:

${language}
Create a ${days}-day Indian meal plan.

Budget: ₹${budget}

Diet Type: ${diet}

IMPORTANT RULES:

1. Return ONLY plain text.
2. Do NOT use markdown.
3. Do NOT use:
   - **
   - *
   - #
   - ---
   - markdown headings
4. Use emojis only.
5. Keep the response clean and readable.

Format EXACTLY like this:

📅 Day 1

🍳 Breakfast:
Meal Name

🍛 Lunch:
Meal Name

🌙 Dinner:
Meal Name


📅 Day 2

🍳 Breakfast:
Meal Name

🍛 Lunch:
Meal Name

🌙 Dinner:
Meal Name


🛒 Grocery List:
• Item 1
• Item 2
• Item 3


🔥 Daily Calories:
XXXX kcal


💰 Budget Summary:
₹XXXX
`;

      const result =
        await model.generateContent(
          prompt
        );

      const text =
        result.response.text();

      const cleanedText =
        text
          .replace(/\*\*/g, "")
          .replace(/\*/g, "")
          .replace(/#/g, "")
          .replace(/---/g, "")
          .replace(/__/g, "")
          .replace(/`/g, "")
          .trim();

      return cleanedText;

  } catch (error) {

      console.error(
        "Meal Planner Error:",
        error
      );

      return `
❌ Failed to generate meal plan.

Please try again.
`;
  }
}