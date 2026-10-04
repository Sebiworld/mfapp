import { describe, expect, it } from "vitest";
import { ProjectDto } from "@models/project-dto.model";
import { findProjectOfPath } from "../usePrefetchProjectData";

const PROJECTS = {
  1: { id: 1, url: "/projekte/annie/" },
  2: { id: 2, url: "/andere-projekte/x/" },
  3: { id: 3, url: "/andere-projekte/x/y/" },
} as unknown as { [key: number]: ProjectDto }; // only the fields the lookup reads

describe("findProjectOfPath", () => {
  it("finds the project of a page below it", () => {
    expect(
      findProjectOfPath(PROJECTS, "/projekte/annie/vorstellungen/7")?.id
    ).toBe(1);
  });

  it("prefers the deepest project URL", () => {
    expect(findProjectOfPath(PROJECTS, "/andere-projekte/x/y/z/")?.id).toBe(3);
  });

  it("finds nothing outside of projects or without projects", () => {
    expect(findProjectOfPath(PROJECTS, "/satzung/")).toBeUndefined();
    expect(findProjectOfPath(undefined, "/projekte/annie/")).toBeUndefined();
  });
});
