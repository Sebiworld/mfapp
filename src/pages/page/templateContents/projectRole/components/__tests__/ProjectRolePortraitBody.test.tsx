import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectRolePortraitBody } from "../ProjectRolePortraitBody";

describe("ProjectRolePortraitBody", () => {
  it("wraps its children in a plain body without a click area", () => {
    const { container } = render(
      <ProjectRolePortraitBody>
        <span>Inhalt</span>
      </ProjectRolePortraitBody>
    );

    expect(container.querySelector(".portrait-body")).toContainElement(
      screen.getByText("Inhalt")
    );
    expect(container.querySelector(".MuiCardActionArea-root")).toBeNull();
  });
});
