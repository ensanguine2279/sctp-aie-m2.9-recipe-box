import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { RecipeCard } from "./RecipeCard";

const mockRecipe = {
  id: 1,
  name: "Chicken Tikka Masala",
  cuisine: "Indian",
  servings: 4,
  minutes: 75,
};

describe("RecipeCard Component", () => {
  it("renders recipe details, cuisine, servings, and formatted duration correctly", () => {
    // Arrange: Define a fixed set of props

    // Act: Render the component
    render(<RecipeCard {...mockRecipe} />);

    // Assert: Verify that the name, cuisine, servings, and formatted duration appear in the document
    //
    // That syntax—like /chicken tikka masala/i—is a JavaScript Regular Expression (RegExp)
    // combined with a flag, rather than a standard string.
    // The forward slashes denote the start and end of a regular expression pattern.
    // Instead of matching an exact, rigid string (like 'Chicken Tikka Masala'), a regex allows you to
    // perform flexible text matching.
    // The i at the end stands for case-insensitive.
    expect(
      screen.getByRole("heading", { name: /chicken tikka masala/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/indian/i)).toBeInTheDocument();
    expect(screen.getByText(/4/i)).toBeInTheDocument();
    expect(screen.getByText(/1 hr/i)).toBeInTheDocument();
  });

  it("calls onAddToPlan with the correct recipe id when the add button is clicked", async () => {
    const user = userEvent.setup();
    const handleAddToPlan = vi.fn();

    // Render the RecipeCard passing the mock recipe and the callback prop
    render(
      <RecipeCard
        id={mockRecipe.id}
        name={mockRecipe.name}
        cuisine={mockRecipe.cuisine}
        servings={mockRecipe.servings}
        minutes={mockRecipe.minutes}
        onClick={handleAddToPlan}
      />,
    );

    // Find the card element by its name heading or a test id
    const cardTitle = screen.getByText(mockRecipe.name);

    // Simulate user clicking the card (or its container)
    await user.click(cardTitle);

    // Assert that the callback was called and received the expected arguments (e.g., id or recipe object)
    expect(handleAddToPlan).toHaveBeenCalledTimes(1);
    expect(handleAddToPlan).toHaveBeenCalledWith(mockRecipe.id);
  });
});
