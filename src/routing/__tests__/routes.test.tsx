import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router";
import { ROUTES } from "../routes";

vi.mock("@src/App", () => ({ App: () => <Outlet /> }));
vi.mock("@core/errorPage/ErrorPage", () => ({ ErrorPage: () => null }));
vi.mock("@pages/page/Page", () => ({
  Page: () => <div data-testid="route">page</div>,
}));
vi.mock("@pages/performancePage/PerformancePage", () => ({
  PerformancePage: () => <div data-testid="route">performance</div>,
}));
vi.mock("@pages/settingsPage/SettingsPage", () => ({
  SettingsPage: () => null,
}));
vi.mock("@pages/games/secretCodePage/SecretCodePage", () => ({
  SecretCodePage: () => null,
}));

/**
 * Renders the app routes at a path and returns the name of the page component that was chosen.
 * @param path Path to open.
 * @returns `performance` or `page`.
 */
const routeOf = async (path: string): Promise<string | null> => {
  const router = createMemoryRouter(ROUTES, { initialEntries: [path] });

  render(<RouterProvider router={router} />);

  return (await screen.findByTestId("route")).textContent;
};

describe("routes", () => {
  it.each([
    "/projekte/annie/vorstellungen/12525",
    "/andere-projekte/musical-fabrik-in-concert/vorstellungen/12525",
    "/andere-projekte/musical-fabrik-in-concert/vorstellungen/12525/",
    "/andere-projekte/reihe/musical-fabrik-in-concert/vorstellungen/7",
    "/Projekte/annie/Vorstellungen/1",
  ])("opens the performance page at %s", async (path) => {
    expect(await routeOf(path)).toBe("performance");
  });

  it.each([
    "/",
    "/projekte/annie/",
    "/projekte/annie/rollen/hauptrollen/annie/",
    "/andere-projekte/musical-fabrik-in-concert/vorstellungen/",
    "/vorstellungen/12525",
  ])("loads the regular page at %s", async (path) => {
    expect(await routeOf(path)).toBe("page");
  });
});
