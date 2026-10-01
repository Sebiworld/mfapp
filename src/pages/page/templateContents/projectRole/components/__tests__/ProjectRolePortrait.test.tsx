import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { ProjectPortraitDto } from "@models/project-role/project-portrait-dto.model";
import { ProjectRolePortrait } from "../ProjectRolePortrait";

vi.mock("@components/lazyPicture/LazyPicture", () => ({
  LazyPicture: () => <span />,
}));

const portrait = (fields: Partial<ProjectPortraitDto>): ProjectPortraitDto => ({
  id: 1,
  name: "p1",
  title: "",
  ...fields,
});

const titleHtml = (fields: Partial<ProjectPortraitDto>): string => {
  const { container } = render(
    <ProjectRolePortrait portrait={portrait(fields)} />
  );

  return container.querySelector(".portrait-title")?.innerHTML ?? "";
};

describe("ProjectRolePortrait name", () => {
  it("renders the same markup for every kind of name", () => {
    expect(
      titleHtml({
        title: "Maximiliane Musterfrau-Beispielhausen",
        title_separable: "Maximiliane Musterfrau-Beispiel_hausen",
      })
    ).toBe("Maximiliane Musterfrau-Beispiel­hausen");
    expect(
      titleHtml({ title: "Eva Ober", title_separable: "Ev_a O_ber" })
    ).toBe("Ev­a O­ber");
    expect(
      titleHtml({ title: "Eva Ober", title_separable: "Eva Ober-Separiert" })
    ).toBe("Eva Ober-Separiert");
    expect(titleHtml({ title: "Tom &amp; <em>Jerry</em>" })).toBe(
      "Tom &amp; <em>Jerry</em>"
    );
    expect(titleHtml({ title: "Name_mit_Strich" })).toBe("Name_mit_Strich");
    expect(titleHtml({ title: "", title_separable: "" })).toBe("");
  });
});
