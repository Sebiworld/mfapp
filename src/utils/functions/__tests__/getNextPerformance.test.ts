import { describe, expect, it } from "vitest";
import { getNextPerformance } from "../getNextPerformance";
import { PerformanceDto } from "@models/utility-types/performance-dto.model";

const perf = (id: number, timestamp: number): PerformanceDto => ({
  id,
  timestamp,
});

describe("getNextPerformance", () => {
  it("returns undefined for an empty list", () => {
    expect(getNextPerformance([], 100)).toBeUndefined();
  });

  it("returns undefined when all performances are past", () => {
    expect(getNextPerformance([perf(1, 10), perf(2, 20)], 100)).toBeUndefined();
  });

  it("does not count a performance starting exactly now", () => {
    expect(getNextPerformance([perf(1, 100)], 100)).toBeUndefined();
    expect(getNextPerformance([perf(1, 100), perf(2, 101)], 100)?.id).toBe(2);
  });

  it("picks the earliest future one from an unsorted list", () => {
    const list = [perf(1, 500), perf(2, 50), perf(3, 200), perf(4, 300)];

    expect(getNextPerformance(list, 100)?.id).toBe(3);
  });
});
