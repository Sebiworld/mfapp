import { beforeEach, describe, expect, it, vi } from "vitest";
import { render as renderRaw, screen } from "@testing-library/react";
import { ReactElement } from "react";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { PageContents } from "../PageContents";
import { usePageUnlockKey } from "@src/context/pageUnlock/PageUnlockContext";
import { useGlobalStore } from "@src/store/global.store";
import { pageUnlocksStoreActions } from "@src/store/pageUnlocks/pageUnlocks.actions";
import { nowInSeconds } from "@src/store/pageUnlocks/pageUnlocks.selectors";
import "@utils/i18n/i18n";

// Shows the key the content blocks receive.
vi.mock("@components/contentBlocks/ContentBlocks", () => ({
  ContentBlocks: () => (
    <div data-testid="blocks">{usePageUnlockKey() ?? "no-key"}</div>
  ),
}));

// Sections show other pages; they must not get the key.
vi.mock("@components/sections/SectionsContainer", () => ({
  SectionsContainer: () => (
    <div data-testid="sections">{usePageUnlockKey() ?? "no-key"}</div>
  ),
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
  ({
    id: 7,
    title: "Galerie",
    template: { id: 1, name: "gallery", label: "Gallery" },
    ...fields,
  }) as unknown as PageDtoVariant;

beforeEach(() => {
  useGlobalStore.setState({ pageUnlocks: {} });
});

describe("PageContents of password protected pages", () => {
  it("shows title and password field of a locked page", () => {
    render(<PageContents page={page({ locked: true })} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Galerie" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Passwort/)).toBeInTheDocument();
    expect(screen.queryByTestId("blocks")).toBeNull();
  });

  it("hands the stored key to the content of an opened page", () => {
    pageUnlocksStoreActions.setPageUnlock(
      7,
      "k7",
      nowInSeconds() + 60,
      "password"
    );

    render(
      <PageContents
        page={page({ locked: false, contents: [{ id: 1, type: "image" }] })}
      />
    );

    expect(screen.getByTestId("blocks").textContent).toBe("k7");
    expect(screen.queryByLabelText(/Passwort/)).toBeNull();
  });

  it("hands the key to the page's own blocks only, not to its sections", () => {
    pageUnlocksStoreActions.setPageUnlock(
      7,
      "k7",
      nowInSeconds() + 60,
      "password"
    );

    render(
      <PageContents
        page={page({
          locked: false,
          contents: [{ id: 1, type: "image" }],
          sections: [{ id: 2, type: "pages-grid" }],
        })}
      />
    );

    expect(screen.getByTestId("blocks").textContent).toBe("k7");
    expect(screen.getByTestId("sections").textContent).toBe("no-key");
  });

  it("hands no key to the content of other pages", () => {
    render(
      <PageContents
        page={page({ id: 8, contents: [{ id: 1, type: "image" }] })}
      />
    );

    expect(screen.getByTestId("blocks").textContent).toBe("no-key");
  });
});
