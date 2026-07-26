import { useState, useEffect, useMemo, useCallback } from "react";

import CuisineFilterBar from "../components/CuisineFilterBar";
import { RecipeList } from "../components/RecipeList";
import { mockRecipes } from "../../data/mockRecipesData";

import styles from "./RecipesPage.module.css";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the cuisine filter and the independent counter
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [planCount, setPlanCount] = useState(0);

  // Simulate fetching mock data on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setRecipes(mockRecipes);
        setLoading(false);
      } catch (err) {
        setError("Failed to load mock recipes");
        setLoading(false);
      }
    }, 500); // Small timeout to mimic network latency

    return () => clearTimeout(timer);
  }, []);

  // Handler for cuisine filter changes
  const handleCuisineChange = useCallback((cuisine) => {
    setSelectedCuisine(cuisine);
  }, []);

  // Extract unique cuisines for the filter dropdown
  const uniqueCuisines = useMemo(
    () => [...new Set(recipes.map((r) => r.cuisine))],
    [recipes],
  );

  // Memoize the filtered recipes to avoid unnecessary recalculations
  const filteredRecipes = useMemo(() => {
    return selectedCuisine
      ? recipes.filter((r) => r.cuisine === selectedCuisine)
      : recipes;
  }, [selectedCuisine, recipes]);

  return (
    <div className={styles.page}>
      <h1 className={styles.header}>Recipe Dashboard</h1>

      {/* Unrelated state control */}
      <div className={styles.controlsSection}>
        <button
          className={styles.planButton}
          onClick={() => setPlanCount((prev) => prev + 1)}
        >
          Plan to Cook ({planCount})
        </button>
      </div>

      {/* Filter Bar */}
      <CuisineFilterBar
        value={selectedCuisine}
        onChange={handleCuisineChange}
        cuisines={uniqueCuisines}
      />

      {/* Recipe List Display */}
      <RecipeList recipes={filteredRecipes} loading={loading} error={error} />
    </div>
  );
}
