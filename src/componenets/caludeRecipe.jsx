import '../styles/claudeRecipe.css';

export default function ClaudeRecipe({recipeText}) {
    if (!recipeText || typeof recipeText !== 'string') return null;
    const text = recipeText.trim();
    if (text.length === 0) return null;
    const isError = /failed|error|invalid/i.test(text);

    return (
        <section className="generated-recipe">
            <div className="generated-recipe__header">
                <h2>{isError ? 'Unable to generate recipe' : 'Your recipe'}</h2>
            </div>
            <pre className="generated-recipe__body">{text}</pre>
        </section>
    )
}