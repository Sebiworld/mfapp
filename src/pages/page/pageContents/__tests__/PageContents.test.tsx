import { describe, expect, it, vi } from "vitest";
import { render as renderRaw, screen } from "@testing-library/react";
import { ReactElement } from "react";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { SectionDtoVariant } from "@models/section/section-dto-variant.model";
import { PageContents } from "../PageContents";
import "@utils/i18n/i18n";

vi.mock("@components/nextPerformanceCard/NextPerformanceCard", () => ({
  NextPerformanceCard: (props: {
    projectId?: number;
    showProject?: boolean;
    maxDaysAhead?: number;
  }) => (
    <div
      data-testid="next-performance-card"
      data-props={JSON.stringify(props)}
    />
  ),
}));
vi.mock("@components/sections/SectionsContainer", () => ({
  SectionsContainer: ({ sections }: { sections: SectionDtoVariant[] }) => (
    <div data-testid="sections">
      {sections.map((section) => section.type).join(",")}
    </div>
  ),
}));
vi.mock("@components/contentBlocks/ContentBlocks", () => ({
  ContentBlocks: () => null,
}));

const render = (element: ReactElement): void => {
  renderRaw(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      {element}
    </ThemeProvider>
  );
};

// Cast: only the fields read by PageContents are set.
const page = (fields: Record<string, unknown>): PageDtoVariant =>
  ({ id: 1, title: "Seite", ...fields }) as unknown as PageDtoVariant;

const section = (id: number, type: string): SectionDtoVariant =>
  ({ id, type }) as unknown as SectionDtoVariant;

/** Lists the rendered blocks of the main area in order. */
const order = (): string[] =>
  Array.from(screen.getByTestId("page-contents").children).map((child) =>
    child.getAttribute("data-testid") === "sections"
      ? `sections:${child.textContent}`
      : (child.getAttribute("data-testid") ?? child.className)
  );

describe("PageContents with the next performance card", () => {
  it("puts the card right after a leading hero on the home page", () => {
    render(
      <PageContents
        page={page({
          template: { id: 1, name: "home", label: "Home" },
          sections: [section(1, "hero"), section(2, "pages-grid")],
        })}
      />
    );

    expect(order()).toEqual([
      "home-heading",
      "sections:hero",
      "next-performance-card",
      "sections:pages-grid",
    ]);
    expect(
      JSON.parse(
        screen.getByTestId("next-performance-card").dataset.props ?? "{}"
      )
    ).toEqual({ showProject: true, centered: true, maxDaysAhead: 30 });
  });

  it("puts the card first on a home page without leading hero", () => {
    render(
      <PageContents
        page={page({
          template: { id: 1, name: "home", label: "Home" },
          sections: [section(2, "pages-grid"), section(1, "hero")],
        })}
      />
    );

    expect(order()).toEqual([
      "home-heading",
      "next-performance-card",
      "sections:pages-grid,hero",
    ]);
  });

  it("puts the card of its own project first on a project page", () => {
    render(
      <PageContents
        page={page({
          template: { id: 2, name: "project", label: "Projekt" },
          project_id: 700,
        })}
      />
    );

    expect(order()[0]).toBe("next-performance-card");
    expect(
      JSON.parse(
        screen.getByTestId("next-performance-card").dataset.props ?? "{}"
      )
    ).toEqual({ projectId: 700 });
  });

  it("shows no card on other pages", () => {
    render(
      <PageContents
        page={page({
          template: { id: 3, name: "basic-page", label: "Seite" },
          project_id: 700,
          sections: [section(1, "hero")],
        })}
      />
    );

    expect(screen.queryByTestId("next-performance-card")).toBeNull();
    expect(screen.getByTestId("sections")).toHaveTextContent("hero");
  });
});

describe("PageContents heading", () => {
  it("gives the home page a level-one heading, which its sections and hero do not provide", () => {
    render(
      <PageContents
        page={page({
          template: { id: 1, name: "home", label: "Home" },
          sections: [section(1, "hero")],
        })}
      />
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Musical-Fabrik e.V." })
    ).toBeInTheDocument();
  });
});
