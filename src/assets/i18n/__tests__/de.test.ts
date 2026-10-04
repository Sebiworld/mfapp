import { describe, expect, it } from "vitest";
import de from "../de.json";

/**
 * Collects all string values of a nested translation object.
 * @param node - translation object or value
 * @returns all texts
 */
const texts = (node: unknown): string[] => {
  if (typeof node === "string") {
    return [node];
  }

  if (node && typeof node === "object") {
    return Object.values(node).flatMap(texts);
  }

  return [];
};

describe("de.json", () => {
  it("uses the ellipsis character instead of three dots", () => {
    expect(texts(de).filter((text) => text.includes("..."))).toEqual([]);
  });
});
