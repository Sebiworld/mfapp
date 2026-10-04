import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { ImageDto } from "@models/image-dto.model";
import { SectionPagesGridDto } from "@models/section/section-pages-grid-dto.model";
import { PagesMosaic } from "../PagesMosaic";

describe("PagesMosaic", () => {
  it("requests a sized, versioned image for each tile and never more than the original", () => {
    // Cast: only the fields read by the mosaic and the picture are set.
    const image = {
      page_id: 7,
      basename: "tile.jpg",
      ext: "jpg",
      modified: 1700000000,
      filesize: 2048,
      width: 500,
      height: 400,
    } as ImageDto;
    const section = {
      cards: [{ id: 1, url: "/a", title: "A", card_image: image }],
    } as unknown as SectionPagesGridDto;
    const { container } = render(
      <MemoryRouter>
        <ThemeProvider
          theme={{ [THEME_ID]: mfTheme }}
          noSsr
          defaultMode="light"
        >
          <PagesMosaic section={section} />
        </ThemeProvider>
      </MemoryRouter>
    );
    const urls = [
      ...Array.from(container.querySelectorAll("source")).flatMap((source) =>
        source
          .getAttribute("srcset")!
          .split(",")
          .map((candidate) => candidate.trim().split(" ")[0])
      ),
      container.querySelector("img")!.getAttribute("src")!,
    ].map((url) => new URL(url, "http://localhost").searchParams);

    expect(urls.length).toBeGreaterThan(4);
    for (const params of urls) {
      expect(params.get("v")).toBe("1700000000.2048");
      expect(Number(params.get("width"))).toBeGreaterThan(0);
      expect(Number(params.get("width"))).toBeLessThanOrEqual(500);
    }
  });
});
