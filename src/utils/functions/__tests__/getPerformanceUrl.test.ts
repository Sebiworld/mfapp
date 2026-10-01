import { describe, expect, it } from "vitest";
import { getPerformanceUrl } from "../getPerformanceUrl";

describe("getPerformanceUrl", () => {
  it("appends the performance path to a project url with trailing slash", () => {
    expect(getPerformanceUrl("/projekte/testprojekt/", 700)).toBe(
      "/projekte/testprojekt/vorstellungen/700"
    );
  });

  it("adds the missing trailing slash", () => {
    expect(getPerformanceUrl("/projekte/testprojekt", 700)).toBe(
      "/projekte/testprojekt/vorstellungen/700"
    );
  });
});
