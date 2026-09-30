import { describe, expect, it } from "vitest";
import { getPerformanceUrl } from "../getPerformanceUrl";

describe("getPerformanceUrl", () => {
  it("appends the performance path to a project url with trailing slash", () => {
    expect(getPerformanceUrl("/projekte/annie/", 11649)).toBe(
      "/projekte/annie/auffuehrungen/11649"
    );
  });

  it("adds the missing trailing slash", () => {
    expect(getPerformanceUrl("/projekte/annie", 11649)).toBe(
      "/projekte/annie/auffuehrungen/11649"
    );
  });
});
