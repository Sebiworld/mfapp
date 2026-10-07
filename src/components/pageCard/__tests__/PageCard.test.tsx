import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { PageCardDto } from "@models/page/page-card-dto.model";
import { PageCard } from "../PageCard";
import "@utils/i18n/i18n";

/**
 * Renders one page card inside router and theme.
 * @param fields - card fields to set
 */
const renderCard = (fields: Record<string, unknown>): void => {
  // Cast: only the fields read by PageCard are set.
  const card = { id: 1, url: "/bereiche/chor/", ...fields } as PageCardDto;

  render(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      <MemoryRouter>
        <PageCard card={card} />
      </MemoryRouter>
    </ThemeProvider>
  );
};

describe("PageCard", () => {
  it("starts the accessible name of each link with its visible text", () => {
    renderCard({ title: "Chorgesang" });

    const link = screen.getByRole("link");

    expect(link.getAttribute("aria-label")).toContain(
      link.textContent as string
    );
  });

  it("starts the accessible name of the Facebook link with its visible text", () => {
    renderCard({
      title: "Probenwochenende",
      external_type: "Facebook",
      external_link: "https://facebook.com/post/1",
    });

    const link = screen.getByRole("link");

    expect(
      link.getAttribute("aria-label")?.startsWith(link.textContent as string)
    ).toBe(true);
  });

  it("names the more link after the card, so a list of cards has distinct link names", () => {
    renderCard({ title: "Chorgesang &amp; Ensemble" });

    expect(
      screen.getByRole("link", { name: "Mehr dazu…: „Chorgesang & Ensemble“" })
    ).toHaveAttribute("href", "/bereiche/chor/");
  });

  it("names the Facebook link after the post", () => {
    renderCard({
      title: "Probenwochenende in der Musicalfabrik",
      external_type: "Facebook",
      external_link: "https://facebook.com/post/1",
    });

    expect(
      screen.getByRole("link", {
        name: "Mehr dazu auf Facebook…: „Probenwochenende in der Musicalfabrik“",
      })
    ).toHaveAttribute("href", "https://facebook.com/post/1");
  });
});
