import { PerformanceDto } from "@models/utility-types/performance-dto.model";

/**
 * Finds the earliest performance that starts after the given moment.
 * @param performances Performances in any order.
 * @param now Current time as Unix timestamp in seconds, like `PerformanceDto.timestamp`.
 * @returns The next performance, or undefined when none starts after `now`.
 */
export const getNextPerformance = (
  performances: PerformanceDto[],
  now: number
): PerformanceDto | undefined => {
  let next: PerformanceDto | undefined;

  for (const performance of performances) {
    if (performance.timestamp <= now) {
      continue;
    }

    if (!next || performance.timestamp < next.timestamp) {
      next = performance;
    }
  }

  return next;
};
