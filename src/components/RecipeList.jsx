import { useState, useEffect, memo } from "react";

import { RecipeCard } from "./RecipeCard";

import styles from "./RecipeList.module.css";

/**
 * A component that fetches recipes from an API and renders them as a list of RecipeCards.
 */
export function RecipeList({
  recipes: recipesProp,
  loading: loadingProp,
  error: errorProp,
  onRecipeClick,
}) {
  console.log("RecipeList rendered");

  const [fetchedRecipes, setFetchedRecipes] = useState([]);
  const [fetchedLoading, setFetchedLoading] = useState(true);
  const [fetchedError, setFetchedError] = useState(null);

  // If parent passes props, those are used
  // If parent does not pass props, fetch own state instead
  const isControlled =
    recipesProp !== undefined ||
    loadingProp !== undefined ||
    errorProp !== undefined;

  useEffect(() => {
    if (isControlled) {
      return;
    }

    async function fetchRecipes() {
      try {
        setFetchedLoading(true);
        const response = await fetch("/api/recipes");

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const data = await response.json();
        setFetchedRecipes(data);
      } catch (err) {
        setFetchedError(err.message || "Something went wrong");
      } finally {
        setFetchedLoading(false);
      }
    }

    fetchRecipes();
  }, [isControlled]);

  // ?? only falls back for null/undefined
  // || falls back for any falsy value (like [], 0, "", false)
  const recipes = recipesProp ?? fetchedRecipes;
  const loading = loadingProp ?? fetchedLoading;
  const error = errorProp ?? fetchedError;

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
    <>
      <div className={styles.resultCount}>
        <span className={styles.resultCountValue}>{recipes.length}</span>
        <span className={styles.resultCountLabel}>recipes found</span>
      </div>
      <div className={styles.listContainer}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id || recipe.name}
            name={recipe.name}
            cuisine={recipe.cuisine}
            servings={recipe.servings}
            minutes={recipe.minutes}
            onClick={() => onRecipeClick?.(recipe)}
          />
        ))}
      </div>
    </>
  );
}

export default memo(RecipeList);
