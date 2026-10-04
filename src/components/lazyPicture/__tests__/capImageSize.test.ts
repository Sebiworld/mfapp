import { describe, expect, it } from "vitest";
import { capImageSize } from "../capImageSize";

describe("capImageSize", () => {
  const image = { width: 1000, height: 500 };

  it("doubles the size when the original is large enough", () => {
    expect(capImageSize(image, { width: 300 }, 2)).toEqual({
      width: 600,
      height: undefined,
    });
  });

  it("limits the 2x width to the original width", () => {
    expect(capImageSize(image, { width: 700 }, 2).width).toBe(1000);
  });

  it("limits the 1x width to the original width", () => {
    expect(capImageSize(image, { width: 1600 }, 1).width).toBe(1000);
  });

  it("keeps the ratio of width and height when capping", () => {
    expect(capImageSize(image, { width: 800, height: 200 }, 2)).toEqual({
      width: 1000,
      height: 250,
    });
  });

  it("limits a height-only request to the original height", () => {
    expect(capImageSize(image, { height: 400 }, 2)).toEqual({
      width: undefined,
      height: 500,
    });
  });

  it("does not cap when the original size is unknown", () => {
    expect(capImageSize({ width: 0, height: 0 }, { width: 300 }, 2).width).toBe(
      600
    );
  });
});
