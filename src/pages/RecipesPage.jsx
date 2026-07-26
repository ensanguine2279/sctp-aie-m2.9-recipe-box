import { useState, useEffect } from "react";
import { CuisineFilterBar } from "../components/CuisineFilterBar";
import { RecipeCard } from "../components/RecipeCard";

export function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the cuisine filter and the independent counter
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [planCount, setPlanCount] = useState(0);

  // Fetch recipes on mount
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

  // Extract unique cuisines for the filter dropdown
  const uniqueCuisines = [...new Set(recipes.map((r) => r.cuisine))];

  // Deliberately unmemoized filtering on every render
  const filteredRecipes = selectedCuisine
    ? recipes.filter((r) => r.cuisine === selectedCuisine)
    : recipes;

  if (loading) return <div>Loading recipes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="recipes-page" style={{ padding: "20px" }}>
      <h1>Recipe Dashboard</h1>

      {/* Unrelated state control */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setPlanCount((prev) => prev + 1)}>
          Plan to Cook ({planCount})
        </button>
      </div>

      {/* Filter Bar */}
      <CuisineFilterBar
        value={selectedCuisine}
        onChange={setSelectedCuisine}
        cuisines={uniqueCuisines}
      />

      {/* Recipe List Display */}
      <div className="recipe-list" style={{ marginTop: "20px" }}>
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id || recipe.name}
            name={recipe.name}
            cuisine={recipe.cuisine}
            servings={recipe.servings}
            minutes={recipe.minutes}
          />
        ))}
      </div>
    </div>
  );
}
