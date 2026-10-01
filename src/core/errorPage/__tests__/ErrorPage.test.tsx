import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import "@utils/i18n/i18n";

const reload = vi.fn();

const Broken = (): never => {
  throw (globalThis as { __error?: Error }).__error;
};

/** Fresh page module per render: the "reload under way" flag lives in the reload helper module. */
const renderWithError = async (error: Error): Promise<void> => {
  vi.resetModules();
  const { ErrorPage } = await import("../ErrorPage");
  (globalThis as { __error?: Error }).__error = error;
  vi.spyOn(console, "error").mockImplementation(() => undefined);

  const router = createMemoryRouter(
    [{ path: "/", Component: Broken, ErrorBoundary: ErrorPage }],
    { initialEntries: ["/"] }
  );

  render(<RouterProvider router={router} />);
};

beforeEach(() => {
  reload.mockClear();
  sessionStorage.clear();
  Object.defineProperty(window, "location", {
    configurable: true,
    value: { ...window.location, reload },
  });
});

afterEach(() => vi.restoreAllMocks());

describe("ErrorPage", () => {
  it("shows the four texts for an ordinary error, without reloading", async () => {
    await renderWithError(new Error("Cannot read properties of undefined"));

    expect(
      screen.getByRole("heading", { name: "Da ist etwas schiefgelaufen." })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Wahrscheinlich gibt es gerade eine neue Version. Einmal neu laden, dann geht’s weiter."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Neu laden" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Zur Startseite" })
    ).toHaveAttribute("href", "/");
    expect(screen.queryByText(/Unexpected Application Error/)).toBeNull();
    expect(reload).not.toHaveBeenCalled();
  });

  it("reloads the button's page when it is pressed", async () => {
    await renderWithError(new Error("Cannot read properties of undefined"));

    fireEvent.click(screen.getByRole("button", { name: "Neu laden" }));

    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("reloads once by itself for a failed code load", async () => {
    await renderWithError(
      new TypeError("Failed to fetch dynamically imported module: /a.js")
    );

    expect(reload).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId("error-page")).toBeNull();
  });

  it("shows the page instead of a second reload when the load error lasts", async () => {
    sessionStorage.setItem("mfLoadErrorReload", String(Date.now()));

    await renderWithError(
      new TypeError("Failed to fetch dynamically imported module: /a.js")
    );

    expect(reload).not.toHaveBeenCalled();
    expect(screen.getByTestId("error-page")).toBeInTheDocument();
  });
});
