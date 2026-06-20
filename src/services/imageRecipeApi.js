import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const genAI =
  new GoogleGenerativeAI(
    import.meta.env
      .VITE_GEMINI_API_KEY
  );

function fileToGenerativePart(
  file
) {
  return new Promise(
    (resolve) => {

      const reader =
        new FileReader();

      reader.onloadend =
        () => {
          resolve({
            inlineData: {
              data: reader.result
                .split(",")[1],
              mimeType:
                file.type,
            },
          });
        };

      reader.readAsDataURL(
        file
      );
    }
  );
}

export async function
analyzeFoodImage(file) {

  const model =
    genAI.getGenerativeModel({
      model:
        "gemini-2.5-flash",
    });

  const imagePart =
    await fileToGenerativePart(
      file
    );

  const prompt = `
Identify this food.

Return:

🍽 Dish Name

🛒 Ingredients

👨‍🍳 Recipe

🔥 Calories

💡 Cooking Tips
`;

  const result =
    await model.generateContent([
      prompt,
      imagePart,
    ]);

  return result.response.text();
}