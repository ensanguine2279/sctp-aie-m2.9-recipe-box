import { formatDuration } from "../utils/formatDuration";

describe("formatDuration", () => {
  // Case 1: Value of 0
  it("handles 0 minutes correctly", () => {
    expect(formatDuration(0)).toBe("0 min");
  });

  // Case 2: Value under 60
  it("handles values under 60 minutes correctly", () => {
    expect(formatDuration(45)).toBe("45 min");
  });

  // Case 3: Value of exactly 60
  it("handles exactly 60 minutes correctly", () => {
    expect(formatDuration(60)).toBe("1 hr");
  });

  // Case 4: Value over 60
  it("handles values over 60 minutes correctly", () => {
    expect(formatDuration(90)).toBe("1 hr 30 min");
  });
});
