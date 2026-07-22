import '../styles/Ingredients.css';

export default function Ingredients({ingList}){
    return(
        <section className="ingredients-section">
            <div className="ingredients-content">
                <h2>Ingredients on hand:</h2>
                <ul className="ingredients-list">
                    {ingList.map((ings, index) => (
                        <li key={index} className="ingredients-item">{ings}</li>
                    ))}
                </ul>
            </div>
        </section>
    )
}