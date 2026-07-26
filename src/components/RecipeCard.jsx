import { formatDuration } from "../utils/formatDuration"; // Adjust the import path as needed

/**
 * A pure display component that renders recipe details.
 *
 * @param {Object} props
 * @param {string} props.name - The name of the recipe
 * @param {string} props.cuisine - The cuisine type
 * @param {number} props.servings - Number of servings
 * @param {number} props.minutes - Total preparation/cooking time in minutes
 */
export function RecipeCard({ name, cuisine, servings, minutes }) {
  return (
    <div className="recipe-card">
      <h3>{name}</h3>
      <p>
        <strong>Cuisine:</strong> {cuisine}
      </p>
      <p>
        <strong>Servings:</strong> {servings}
      </p>
      <p>
        <strong>Time:</strong> {formatDuration(minutes)}
      </p>
    </div>
  );
}
