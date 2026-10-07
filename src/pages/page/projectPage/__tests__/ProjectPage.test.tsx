import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { useState } from "react";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { useGlobalStore } from "@src/store/global.store";
import { ProjectDto } from "@models/project-dto.model";
import { ProjectPage } from "../ProjectPage";
import "@utils/i18n/i18n";

const loadProjectDetails = vi.fn();
vi.mock("@api/hooks/useProjectsApi", () => ({
  useProjectsApi: () => ({ loadProjectDetails }),
}));

vi.mock("../projectSidebar/ProjectSidebar", () => ({
  ProjectSidebar: () => <aside data-testid="project-sidebar" />,
}));

vi.mock("@components/lazyPicture/LazyPicture", () => ({
  LazyPicture: () => <span />,
}));

const mounts = vi.hoisted(() => ({ content: 0 }));

/** Stands in for page contents that load data when they mount. */
const PageContentsStandIn = () => {
  useState(() => {
    mounts.content += 1;
    return null;
  });

  return <p>Seiteninhalt</p>;
};

const PROJECT_ID = 3;

describe("ProjectPage", () => {
  beforeEach(() => {
    mounts.content = 0;
    useGlobalStore.setState((state) => {
      state.projects = {};
      state.projectDetails = {};
      return state;
    });
  });

  it("keeps the page contents mounted when the project arrives after the page", () => {
    render(
      <ThemeProvider theme={{ [THEME_ID]: mfTheme }}>
        <MemoryRouter>
          <ProjectPage page={{ project_id: PROJECT_ID }}>
            <PageContentsStandIn />
          </ProjectPage>
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.queryByTestId("project-header")).toBeNull();

    act(() => {
      useGlobalStore.setState((state) => {
        state.projects = {
          [PROJECT_ID]: {
            id: PROJECT_ID,
            title: "Annie",
            url: "/projekte/annie/",
          } as ProjectDto,
        };
        return state;
      });
    });

    expect(screen.getByTestId("project-header")).toHaveTextContent("Annie");
    expect(screen.getByText("Seiteninhalt")).toBeInTheDocument();
    expect(mounts.content).toBe(1);
  });

  it("names the header image link after the project", () => {
    useGlobalStore.setState((state) => {
      state.projects = {
        [PROJECT_ID]: {
          id: PROJECT_ID,
          title: "Annie &amp; <em>Co</em>",
          url: "/projekte/annie/",
        } as ProjectDto,
      };
      return state;
    });

    render(
      <ThemeProvider theme={{ [THEME_ID]: mfTheme }}>
        <MemoryRouter>
          <ProjectPage page={{ project_id: PROJECT_ID }} />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(
      screen.getByRole("link", { name: "Zum Projekt Annie & Co" })
    ).toHaveAttribute("href", "/projekte/annie/");
  });

  it("renders the project title as the only level-one heading", () => {
    useGlobalStore.setState((state) => {
      state.projects = {
        [PROJECT_ID]: {
          id: PROJECT_ID,
          title: "Annie",
          url: "/projekte/annie/",
        } as ProjectDto,
      };
      return state;
    });

    render(
      <ThemeProvider theme={{ [THEME_ID]: mfTheme }}>
        <MemoryRouter>
          <ProjectPage
            page={{ project_id: PROJECT_ID, template: { name: "project" } }}
          />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Annie"
    );
  });

  it("keeps the project title below level one on pages with their own heading", () => {
    useGlobalStore.setState((state) => {
      state.projects = {
        [PROJECT_ID]: {
          id: PROJECT_ID,
          title: "Annie",
          url: "/projekte/annie/",
        } as ProjectDto,
      };
      return state;
    });

    render(
      <ThemeProvider theme={{ [THEME_ID]: mfTheme }}>
        <MemoryRouter>
          <ProjectPage
            page={{ project_id: PROJECT_ID, template: { name: "basic-page" } }}
          >
            <h1>Tickets und Infos</h1>
          </ProjectPage>
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Tickets und Infos"
    );
    expect(screen.getByRole("heading", { name: "Annie" })).toBeInTheDocument();
  });
});
