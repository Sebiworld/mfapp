import { describe, expect, it } from "vitest";
import { trimWords } from "../trimWords";

describe("trimWords", () => {
  it("returns the text unchanged when it fits the character limit", () => {
    expect(trimWords("Musical Fabrik", 20)).toBe("Musical Fabrik");
  });

  it("cuts at the last full word and appends the default ellipsis", () => {
    expect(trimWords("Musical Fabrik Werkstatt", 16)).toBe("Musical Fabrik…");
  });

  it("appends a custom end string instead of the default ellipsis", () => {
    expect(trimWords("Musical Fabrik Werkstatt", 16, " (mehr)")).toBe(
      "Musical Fabrik (mehr)"
    );
  });

  it("falls back to a hard cut when there is no space to break on", () => {
    expect(trimWords("Supercalifragilistic", 10)).toBe("Supercalifr…");
  });
});
