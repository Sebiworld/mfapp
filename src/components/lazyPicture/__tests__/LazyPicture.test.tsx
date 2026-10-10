import { describe, expect, it } from "vitest";
import { render as baseRender } from "@testing-library/react";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { ImageDto } from "@models/image-dto.model";
import { LazyPicture } from "../LazyPicture";
import { LazyPictureSize } from "../components/LazyPictureWithoutFallback";

// Cast: only the fields read by the picture are set.
const makeImage = (overrides: Partial<ImageDto> = {}): ImageDto =>
  ({
    page_id: 12,
    basename: "poster.jpg",
    ext: "jpg",
    modified: 1700000000,
    filesize: 4096,
    width: 2000,
    height: 1000,
    ...overrides,
  }) as ImageDto;

const render = (ui: React.ReactElement): ReturnType<typeof baseRender> =>
  baseRender(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      {ui}
    </ThemeProvider>
  );

const SIZES: LazyPictureSize[] = [
  { media: "md-up", width: 1200 },
  { width: 600 },
];

const widthsOf = (srcSet: string): number[] =>
  srcSet.split(",").map((candidate) => {
    const url = new URL(candidate.trim().split(" ")[0], "http://localhost");

    return Number(url.searchParams.get("width"));
  });

describe("LazyPicture", () => {
  it("puts the version on every source and on the fallback image", () => {
    const { container } = render(
      <LazyPicture image={makeImage()} sizes={SIZES} />
    );
    const urls = [
      ...Array.from(container.querySelectorAll("source")).flatMap((source) =>
        source
          .getAttribute("srcset")!
          .split(",")
          .map((candidate) => candidate.trim().split(" ")[0])
      ),
      container.querySelector("img")!.getAttribute("src")!,
    ];

    expect(urls.length).toBeGreaterThan(4);
    for (const url of urls) {
      expect(new URL(url, "http://localhost").searchParams.get("v")).toBe(
        "1700000000.4096"
      );
    }
  });

  it("offers no candidate wider than the original image", () => {
    const { container } = render(
      <LazyPicture image={makeImage({ width: 1000 })} sizes={SIZES} />
    );
    const widths = Array.from(container.querySelectorAll("source")).flatMap(
      (source) => widthsOf(source.getAttribute("srcset")!)
    );

    expect(widths.length).toBeGreaterThan(0);
    expect(Math.max(...widths)).toBe(1000);
  });

  it("offers the 2x candidate when the original is wide enough", () => {
    const { container } = render(
      <LazyPicture image={makeImage()} sizes={[{ width: 600 }]} />
    );
    const srcSet = container.querySelector("source")!.getAttribute("srcset")!;

    expect(widthsOf(srcSet)).toEqual([600, 1200]);
  });

  it("requests the capped width for the fallback image", () => {
    const { container } = render(
      <LazyPicture image={makeImage({ width: 500 })} sizes={[{ width: 600 }]} />
    );
    const src = container.querySelector("img")!.getAttribute("src")!;

    expect(new URL(src, "http://localhost").searchParams.get("width")).toBe(
      "500"
    );
  });

  it("loads lazily unless the caller overrides it", () => {
    const { container } = render(
      <LazyPicture
        image={makeImage()}
        imageProps={{ loading: "eager", fetchPriority: "high" }}
      />
    );
    const img = container.querySelector("img")!;

    expect(img.getAttribute("loading")).toBe("eager");
    expect(img.getAttribute("fetchpriority")).toBe("high");
  });
});

describe("LazyPicture placeholder", () => {
  it("marks the placeholder images as decorative", () => {
    const withString = render(<LazyPicture placeholder="/img/portrait.jpg" />);

    expect(withString.container.querySelector("img")).toHaveAttribute(
      "alt",
      ""
    );
    withString.unmount();

    const withDefault = render(<LazyPicture />);

    expect(withDefault.container.querySelector("img")).toHaveAttribute(
      "alt",
      ""
    );
  });

  it("marks an image without description as decorative", () => {
    const { container } = render(
      <LazyPicture image={makeImage({ description: undefined })} />
    );

    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });
});

describe("LazyPicture placeholder shell", () => {
  const shellOf = (container: HTMLElement): string[] => {
    const figure = container.firstElementChild!;
    const picture = figure.querySelector(":scope > picture");

    return [
      figure.tagName,
      figure.classList.contains("lazy-picture") ? "lazy-picture" : "",
      picture ? "picture" : "",
      picture?.querySelector(":scope > img") ? "img" : "",
    ];
  };

  it("wraps every placeholder like a real image", () => {
    const real = render(<LazyPicture image={makeImage()} />);
    const expected = shellOf(real.container);
    real.unmount();

    const byString = render(<LazyPicture placeholder="/img/portrait.jpg" />);
    expect(shellOf(byString.container)).toEqual(expected);
    byString.unmount();

    const byDefault = render(<LazyPicture />);
    expect(shellOf(byDefault.container)).toEqual(expected);
    byDefault.unmount();

    const byImage = render(<LazyPicture placeholder={makeImage()} />);
    expect(shellOf(byImage.container)).toEqual(expected);
  });

  it("keeps the caller class on the figure and limits the image width", () => {
    const { container } = render(<LazyPicture className="ar-content" />);
    const figure = container.querySelector("figure")!;
    const img = figure.querySelector("img")!;

    expect(figure).toHaveClass("lazy-picture", "ar-content");
    expect(img).toHaveAttribute("src", "/img/mf-bg.jpg");
    expect(getComputedStyle(img).maxWidth).toBe("100%");
  });

  it("renders nothing when the placeholder is disabled", () => {
    const { container } = render(<LazyPicture placeholder={false} />);

    expect(container).toBeEmptyDOMElement();
  });
});
