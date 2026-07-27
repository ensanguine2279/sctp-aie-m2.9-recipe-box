import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import RecipesPage from "./RecipesPage";

// Mock the mockRecipes data
vi.mock("../../data/mockRecipesData", () => ({
  mockRecipes: [
    {
      id: 1,
      name: "Spaghetti Carbonara",
      cuisine: "Italian",
      servings: 2,
      minutes: 30,
    },
    {
      id: 2,
      name: "Margherita Pizza",
      cuisine: "Italian",
      servings: 4,
      minutes: 20,
    },
    { id: 3, name: "Pad Thai", cuisine: "Thai", servings: 2, minutes: 25 },
  ],
}));

describe("RecipesPage Integration Test", () => {
  it("renders recipes, filters by cuisine using userEvent, and updates the visible recipe count", async () => {
    const user = userEvent.setup();

    // Render the full page
    render(<RecipesPage />);

    // Wait for the loading state to resolve and initial recipes to appear
    // (All 3 mock recipes should be visible initially)
    const initialCards = await screen.findAllByRole("heading", { level: 3 });
    expect(initialCards).toHaveLength(3);

    // Find the cuisine filter select element
    const cuisineSelect = screen.getByRole("combobox", {
      name: /filter by cuisine/i,
    });
    expect(cuisineSelect).toBeInTheDocument();

    // Change the cuisine filter to "Italian" using userEvent
    await user.selectOptions(cuisineSelect, "Italian");

    // Assert that the visible recipe count updates to match the filtered results (2 Italian recipes)
    await waitFor(() => {
      const filteredCards = screen.getAllByRole("heading", { level: 3 });
      expect(filteredCards).toHaveLength(2);
    });

    // Verify specific recipe names are displayed correctly post-filter
    expect(screen.getByText("Spaghetti Carbonara")).toBeInTheDocument();
    expect(screen.getByText("Margherita Pizza")).toBeInTheDocument();

    expect(screen.queryByText("Pad Thai")).not.toBeInTheDocument();
  });
});
