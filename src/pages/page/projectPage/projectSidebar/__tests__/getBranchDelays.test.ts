import { describe, expect, it } from "vitest";
import { getBranchDelays } from "../getBranchDelays";

describe("getBranchDelays", () => {
  it("lets each underline branch off when the edge reaches it", () => {
    expect(getBranchDelays([100, 300], 400)).toEqual([130, 390]);
    expect(getBranchDelays([50], 0)).toEqual([0]);
  });

  it("follows a different edge duration", () => {
    expect(getBranchDelays([100, 400], 400, 1000)).toEqual([250, 1000]);
  });

  it("starts every branch at once without a measurable edge", () => {
    expect(getBranchDelays([20, 80], -10)).toEqual([0, 0]);
    expect(getBranchDelays([], 400)).toEqual([]);
  });
});
