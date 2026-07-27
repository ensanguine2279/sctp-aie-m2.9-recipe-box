import { formatDuration } from "../utils/formatDuration";
import styles from "./RecipeDetails.module.css";

export default function RecipeDetails({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.title}>{recipe.name}</h2>

        <div className={styles.detailsGrid}>
          <p>
            <strong>Cuisine:</strong> {recipe.cuisine}
          </p>
          <p>
            <strong>Servings:</strong> {recipe.servings}
          </p>
          <p>
            <strong>Cooking Time:</strong> {formatDuration(recipe.minutes)}
          </p>
        </div>

        <h3 className={styles.sectionTitle}>Ingredients</h3>
        <ul className={styles.ingredientsList}>
          <li>Placeholder Ingredient 1 (e.g., 2 cups main ingredient)</li>
          <li>Placeholder Ingredient 2 (e.g., 1 tbsp seasoning)</li>
          <li>Placeholder Ingredient 3 (e.g., Salt and pepper to taste)</li>
        </ul>
      </div>
    </div>
  );
}
