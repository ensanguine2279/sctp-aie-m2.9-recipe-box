import { render, screen } from "@testing-library/react";
import { RecipeList } from "./RecipeList";

describe("RecipeList Component", () => {
  afterEach(() => {
    // Restore fetch to its original implementation after each test
    vi.restoreAllMocks();
  });

  it("renders the loading state initially when fetch does not resolve immediately", () => {
    // Arrange: Create a fetch promise that never resolves to keep it in the loading state
    vi.spyOn(global, "fetch").mockImplementation(() => new Promise(() => {}));

    // Act
    render(<RecipeList />);

    // Assert: Check that a loading indicator or text appears
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders recipes successfully when fetch resolves with data", async () => {
    // Arrange: Mock a successful API response
    const mockRecipes = [
      {
        id: 1,
        name: "Spaghetti Carbonara",
        cuisine: "Italian",
        servings: 2,
        minutes: 30,
      },
    ];

    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockRecipes,
    });

    // Act
    render(<RecipeList />);

    // Assert: Use findByText to wait for the asynchronous data to load and render
    const recipeName = await screen.findByText(/spaghetti carbonara/i);
    expect(recipeName).toBeInTheDocument();
  });

  it("renders an error message when fetch fails", async () => {
    // Arrange: Mock a failed API response or network rejection
    vi.spyOn(global, "fetch").mockRejectedValueOnce(
      new Error("Failed to fetch recipes"),
    );

    // Act
    render(<RecipeList />);

    // Assert: Wait for the error message to appear in the document
    const errorMessage = await screen.findByText(/failed to fetch recipes/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
