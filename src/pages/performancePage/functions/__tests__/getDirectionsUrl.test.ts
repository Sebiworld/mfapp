import { describe, expect, it } from "vitest";
import { getDirectionsUrl } from "../getDirectionsUrl";

describe("getDirectionsUrl", () => {
  it("builds a link from both coordinates", () => {
    expect(getDirectionsUrl({ lat: 51.84, lng: 8.29 })).toBe(
      "https://www.google.com/maps/dir/?api=1&destination=51.84,8.29"
    );
  });

  it("accepts numeric strings", () => {
    expect(getDirectionsUrl({ lat: "51.84", lng: "8.29" })).toContain(
      "51.84,8.29"
    );
  });

  it("returns null when a coordinate is missing", () => {
    expect(getDirectionsUrl({ lat: null, lng: null })).toBeNull();
    expect(getDirectionsUrl({ lat: 51.84, lng: null })).toBeNull();
    expect(getDirectionsUrl({ lat: "", lng: 8.29 })).toBeNull();
  });
});
