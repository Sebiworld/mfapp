import { PerformanceLocationDto } from "@models/utility-types/performance-detail-dto.model";

const toCoordinate = (
  value: number | string | null | undefined
): number | null => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const numeric = Number(value);

  return Number.isFinite(numeric) ? numeric : null;
};

/**
 * Builds a route planner link to the location.
 * @param location Location with optional `lat` and `lng`.
 * @returns URL, or `null` when a coordinate is missing.
 */
export const getDirectionsUrl = (
  location: Pick<PerformanceLocationDto, "lat" | "lng">
): string | null => {
  const lat = toCoordinate(location.lat);
  const lng = toCoordinate(location.lng);

  if (lat === null || lng === null) {
    return null;
  }

  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
};
