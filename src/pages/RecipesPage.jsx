import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";

import CuisineFilterBar from "../components/CuisineFilterBar";
import RecipeList from "../components/RecipeList";
import { mockRecipes } from "../../data/mockRecipesData";

import styles from "./RecipesPage.module.css";

// Lazy load the RecipeDetails component to generate a separate bundle chunk
const RecipeDetails = lazy(() => import("../components/RecipeDetails"));

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the cuisine filter and search query
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // State to track which recipe is currently open in the details panel
  const [activeRecipe, setActiveRecipe] = useState(null);

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

  // Memoize filtered recipes based on both selected cuisine and search query
  const filteredRecipes = useMemo(() => {
    return recipes.filter((r) => {
      const matchesCuisine = selectedCuisine
        ? r.cuisine === selectedCuisine
        : true;
      const matchesSearch = searchQuery
        ? r.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCuisine && matchesSearch;
    });
  }, [recipes, selectedCuisine, searchQuery]);

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

      {/* Filter and Search Controls */}
      <div className={styles.filterContainer}>
        <div className={styles.searchGroup}>
          <label htmlFor="recipe-search" className={styles.label}>
            Search by Name:{" "}
          </label>
          <input
            id="recipe-search"
            type="text"
            className={styles.searchInput}
            placeholder="Enter recipe name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <CuisineFilterBar
          value={selectedCuisine}
          onChange={handleCuisineChange}
          cuisines={uniqueCuisines}
        />
      </div>

      {/* Recipe List Display */}
      <RecipeList recipes={filteredRecipes} loading={loading} error={error} />

      {activeRecipe && (
        <Suspense
          fallback={<div className={styles.loading}>Loading details...</div>}
        >
          <RecipeDetails
            recipe={activeRecipe}
            onClose={() => setActiveRecipe(null)}
          />
        </Suspense>
      )}
    </div>
  );
}
