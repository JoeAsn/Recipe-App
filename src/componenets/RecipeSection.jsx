import "../styles/RecipeSection.css";
import { generateRecipe } from '../api/recipeAPI'
import { useEffect, useRef ,useState } from "react";
export default function RecipeSection(props) {
  const { ingList, recipeReady, setApiResult, setter } = props;
  const recipe = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      recipe.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
  });

  async function handleClick() {
    if (!ingList || ingList.length === 0) return;
    setLoading(true);
    try {
      const payload = ingList.map(i => String(i).trim()).filter(Boolean);
      const result = await generateRecipe(payload);
      setApiResult(result);
      setter(true);
    } catch (err) {
      console.error('Recipe generation failed', err);
      const message = err?.message ? `Failed to generate recipe: ${err.message}` : 'Failed to generate recipe. Please try again.';
      if (typeof setApiResult === 'function') setApiResult(message);
      if (typeof setter === 'function') setter(true);
    } finally {
      setLoading(false);
    }
  }

  const buttonText = loading
    ? 'Generating...'
    : recipeReady
      ? 'Your recipe is ready'
      : 'Get a recipe';

  return (
    <section className="recipe-section" ref={recipe}>
      <div className="recipe-content">
        <div className="recipe-text">
          <h2>Ready for a recipe?</h2>
          <p className="recipe-description">
            Generate a recipe from your list of ingredients.
          </p>
        </div>
        <button className="recipe-btn" onClick={handleClick} disabled={loading}>
          {loading && <span className="recipe-btn__spinner" aria-hidden="true" />}
          {buttonText}
        </button>
      </div>
    </section>
  ) 
}
