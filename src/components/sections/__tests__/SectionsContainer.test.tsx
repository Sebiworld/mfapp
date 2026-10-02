import { Suspense } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { SectionsContainer } from "../SectionsContainer";
import { SectionDtoVariant } from "@models/section/section-dto-variant.model";

// The dispatcher lazy-loads each section type; stub them out so the test asserts on the order of sections and breaks.
vi.mock("../sectionPage/SectionPage", () => ({
  SectionPage: ({ section }: { section: SectionDtoVariant }) => (
    <div data-testid="section">{section.section_name}</div>
  ),
}));
vi.mock(
  "../sectionPartnersAndSponsors/SectionPartnersAndSponsors",
  () => ({
    SectionPartnersAndSponsors: ({
      section,
    }: {
      section: SectionDtoVariant;
    }) => <div data-testid="section">{section.section_name}</div>,
  })
);

/**
 * Builds a minimal section DTO.
 * @param name - section name, rendered by the stubs
 * @param classes - CMS classes of the section
 * @param type - section type that picks the renderer
 * @returns the section DTO
 */
const buildSection = (
  name: string,
  classes = "",
  type = "page"
): SectionDtoVariant => ({
  type,
  id: 0,
  section_name: name,
  title: name,
  classes,
});

/**
 * Renders the given sections and lists the rendered sequence of chapters, section names and breaks.
 * @param sections - sections to render
 * @returns in render order: "chapter:<surface>" per chapter, section names, and "break" per stripe band
 */
const renderSequence = async (
  sections: SectionDtoVariant[]
): Promise<string[]> => {
  const { container } = render(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      <Suspense fallback={null}>
        <SectionsContainer sections={sections} />
      </Suspense>
    </ThemeProvider>
  );

  await screen.findAllByTestId("section");

  return [
    ...container.querySelectorAll(
      ".sections-container .chapter, .sections-container [data-testid='section'], .sections-container .section-break"
    ),
  ].map((element) => {
    if (element.classList.contains("chapter")) {
      return `chapter:${element.getAttribute("data-surface")}`;
    }

    if (element.classList.contains("section-break")) {
      return "break";
    }

    return element.textContent ?? "";
  });
};

describe("SectionsContainer", () => {
  it("draws a stripe band before sections with a spacer class from the CMS", async () => {
    const sequence = await renderSequence([
      { ...buildSection("ziele", "spacer-follows"), id: 1 },
      { ...buildSection("aktuelles", "tertiary spacer-tertiary-down"), id: 2 },
      { ...buildSection("bereiche", "spacer-down spacer-follows"), id: 3 },
      { ...buildSection("verein", "center"), id: 4 },
    ]);

    expect(sequence).toEqual([
      "chapter:page",
      "ziele",
      "break",
      "chapter:feature",
      "aktuelles",
      "break",
      "chapter:default",
      "bereiche",
      "verein",
    ]);
  });

  it("skips the band next to a section that draws its own stripe bands", async () => {
    const sequence = await renderSequence([
      { ...buildSection("bereiche", "spacer-follows"), id: 3 },
      {
        ...buildSection("partner-oben", "spacer-down", "partners-and-sponsors"),
        id: 4,
      },
      {
        ...buildSection("partner", "spacer-follows", "partners-and-sponsors"),
        id: 1,
      },
      { ...buildSection("mitglied-werden", "spacer-down"), id: 2 },
    ]);

    expect(sequence).toEqual([
      "chapter:page",
      "bereiche",
      "partner-oben",
      "partner",
      "mitglied-werden",
    ]);
  });

  it("alternates the surfaces of plain chapters and starts over after a feature chapter", async () => {
    const sequence = await renderSequence([
      { ...buildSection("das-sind-wir"), id: 1 },
      { ...buildSection("projekte", "spacer-down"), id: 2 },
      { ...buildSection("verein", "spacer-down"), id: 3 },
      { ...buildSection("ziele", "spacer-down"), id: 4 },
      { ...buildSection("aktuelles", "tertiary spacer-tertiary-down"), id: 5 },
      { ...buildSection("bereiche", "spacer-down"), id: 6 },
    ]);

    expect(
      sequence.filter((entry) => entry.startsWith("chapter:"))
    ).toEqual([
      "chapter:page",
      "chapter:paper",
      "chapter:default",
      "chapter:paper",
      "chapter:feature",
      "chapter:default",
    ]);
  });
});
