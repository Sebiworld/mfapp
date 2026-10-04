import { afterEach, describe, expect, it } from "vitest";
import {
  clearProjectDetailsPrefetch,
  loadSharedProjectDetails,
} from "../projectDetailsPrefetch";
import {
  clearNextPerformancesPrefetch,
  loadSharedNextPerformances,
} from "../nextPerformancesPrefetch";

const projectDetails = (thrown: unknown) =>
  loadSharedProjectDetails(() => Promise.reject(thrown), 1);
const nextPerformances = (thrown: unknown) =>
  loadSharedNextPerformances(() => Promise.reject(thrown), 1);

describe.each([
  ["project details", projectDetails],
  ["next performances", nextPerformances],
])("%s prefetch: thrown values", (_name, run) => {
  afterEach(() => {
    clearProjectDetailsPrefetch();
    clearNextPerformancesPrefetch();
  });

  it("keeps an Error as it is", async () => {
    const error = new Error("boom");
    expect(await run(error)).toBe(error);
  });

  it("turns null and undefined into a readable message", async () => {
    for (const thrown of [null, undefined]) {
      const result = await run(thrown);
      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe("Unknown error");
      clearProjectDetailsPrefetch();
      clearNextPerformancesPrefetch();
    }
  });

  it("serializes a thrown object", async () => {
    const result = await run({ code: 7 });
    expect((result as Error).message).toBe('{"code":7}');
  });
});
