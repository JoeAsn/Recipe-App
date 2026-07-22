const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;
console.log(API_KEY)

// const MODEL = "openai/gpt-oss-120b";

const API_URL = "https://router.huggingface.co/v1/chat/completions";
export async function generateRecipe(ingredients = []) {
  const cleanIngredients = ingredients

    .map((item) => item.trim())

    .filter(Boolean);

  if (cleanIngredients.length === 0) {
    throw new Error("Please add ingredients first.");
  }

  if (!API_KEY) {
    throw new Error("Missing VITE_HUGGINGFACE_API_KEY in .env.");
  }

  const prompt = `<s>[INST]

Create a short recipe using these ingredients: ${cleanIngredients.join(", ")}.



Include:

- Title

- Ingredients

- Steps

[/INST]`;

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      Authorization: `Bearer ${API_KEY}`,

      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      model: "openai/gpt-oss-120b", // must be a real string here
      messages: [
        {
          role: "user",
          content: `Create a short recipe using these ingredients: ${cleanIngredients.join(", ")}.\n\nInclude:\n- Title\n- Ingredients\n- Steps`,
        },
      ],
      temperature: 0.7,
      top_p: 0.9,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || `API request failed with status ${response.status}`,
    );
  }

  if (data.error && data.estimated_time) {
    throw new Error(`Model is loading. Try again in ${data.estimated_time}s`);
  }

  console.log(data);
  const recipe =
    data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text;

  if (!recipe) {
    throw new Error("You have given an invalid recipe.");
  }
	return recipe
	.replace(prompt, "")
	.replace("<s>", "")
	.replace(/\*/g, "")
	.replace(/#/g, "")
	.trim();
}
