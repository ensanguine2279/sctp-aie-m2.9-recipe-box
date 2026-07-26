import { render, screen } from "@testing-library/react";
import { RecipeCard } from "./RecipeCard";

describe("RecipeCard Component", () => {
  it("renders recipe details, cuisine, servings, and formatted duration correctly", () => {
    // Arrange: Define a fixed set of props
    const recipeProps = {
      name: "Chicken Tikka Masala",
      cuisine: "Indian",
      servings: 4,
      minutes: 75,
    };

    // Act: Render the component
    render(<RecipeCard {...recipeProps} />);

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
});
