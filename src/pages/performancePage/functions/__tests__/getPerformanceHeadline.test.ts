import { describe, expect, it } from "vitest";
import { getPerformanceHeadline } from "../getPerformanceHeadline";

describe("getPerformanceHeadline", () => {
  it("puts the category before the title", () => {
    expect(
      getPerformanceHeadline({
        title: "Abendvorstellung",
        event: { title: "Premiere" },
      })
    ).toEqual(["Premiere", "Abendvorstellung"]);
  });

  it("leaves out a missing or blank part", () => {
    expect(
      getPerformanceHeadline({ title: " ", event: { title: "Premiere" } })
    ).toEqual(["Premiere"]);
    expect(
      getPerformanceHeadline({ title: "Abendvorstellung", event: null })
    ).toEqual(["Abendvorstellung"]);
    expect(getPerformanceHeadline({ title: null, event: null })).toEqual([]);
  });

  it("shows a name that is both category and title once", () => {
    expect(
      getPerformanceHeadline({
        title: "premiere ",
        event: { title: "Premiere" },
      })
    ).toEqual(["Premiere"]);
  });
});
