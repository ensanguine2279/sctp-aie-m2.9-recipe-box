import { useState, useEffect } from "react";
import { RecipeCard } from "./RecipeCard";
import styles from "./RecipeList.module.css";

/**
 * A component that fetches recipes from an API and renders them as a list of RecipeCards.
 */
export function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);
        const response = await fetch("/api/recipes");

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading recipes...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (recipes.length === 0) {
    return <div className={styles.noRecipes}>No recipes found.</div>;
  }

  return (
    <div className={styles.listContainer}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id || recipe.name}
          name={recipe.name}
          cuisine={recipe.cuisine}
          servings={recipe.servings}
          minutes={recipe.minutes}
        />
      ))}
    </div>
  );
}
