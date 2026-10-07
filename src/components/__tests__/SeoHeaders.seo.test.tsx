import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { PageDto } from "@models/page/page-dto.model";
import { useGlobalStore } from "@src/store/global.store";
import { SeoHeaders } from "../SeoHeaders";

const FULL_SEO = {
  title: "Annie | Musical-Fabrik e.V.",
  description: "Beschreibung aus der API",
  canonical: "https://www.musical-fabrik.de/projekte/annie/",
  image: "https://example.test/annie.jpg",
  noindex: false,
};

const makePage = (seo: unknown, extra: Partial<PageDto> = {}): PageDto =>
  ({
    id: 1,
    title: "Annie",
    template: { name: "basic-page" },
    httpUrl: "https://backend.test/projekte/annie/",
    ...(seo === undefined ? {} : { seo }),
    ...extra,
  }) as unknown as PageDto;

const meta = (selector: string): string | null =>
  document.head.querySelector(selector)?.getAttribute("content") ?? null;

const addStaticImage = (): void => {
  const element = document.createElement("meta");
  element.setAttribute("property", "og:image");
  element.setAttribute("data-static-seo", "og:image");
  element.setAttribute("content", "https://example.test/static.jpg");
  document.head.appendChild(element);
};

describe("SeoHeaders with the seo object", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
    useGlobalStore.setState({
      configurationParams: {
        seo_description: "Konfiguration",
        main_image: { http_url: "https://example.test/logo.jpg" },
      },
    } as never);
  });

  afterEach(() => {
    cleanup();
    document.head
      .querySelectorAll("meta,link,title")
      .forEach((e) => e.remove());
  });

  it("takes title, description, canonical and image from seo", () => {
    render(<SeoHeaders page={makePage(FULL_SEO)} />);

    expect(document.head.querySelector("title")?.textContent).toBe(
      "Annie | Musical-Fabrik e.V."
    );
    expect(meta('meta[property="og:title"]')).toBe(
      "Annie | Musical-Fabrik e.V."
    );
    expect(meta('meta[name="description"]')).toBe("Beschreibung aus der API");
    expect(
      document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")
    ).toBe(FULL_SEO.canonical);
    expect(meta('meta[property="og:url"]')).toBe(FULL_SEO.canonical);
    expect(meta('meta[name="twitter:url"]')).toBe(FULL_SEO.canonical);
    expect(meta('meta[property="og:image"]')).toBe(FULL_SEO.image);
    expect(meta('meta[name="twitter:image"]')).toBe(FULL_SEO.image);
  });

  it("sets robots noindex only when seo.noindex is true", () => {
    const { unmount } = render(
      <SeoHeaders page={makePage({ ...FULL_SEO, noindex: true })} />
    );
    expect(meta('meta[name="robots"]')).toBe("noindex");
    unmount();

    render(<SeoHeaders page={makePage(FULL_SEO)} />);
    expect(document.head.querySelector('meta[name="robots"]')).toBeNull();
  });

  it.each([
    ["an empty array", []],
    ["no seo", undefined],
  ])("falls back to the page values with %s", (_label, seo) => {
    window.history.pushState({}, "", "/projekte/annie/?utm=1#x");
    addStaticImage();
    render(<SeoHeaders page={makePage(seo)} />);

    const canonical = `${window.location.origin}/projekte/annie/`;
    expect(document.head.querySelector("title")?.textContent).toBe(
      "Annie | Musical-Fabrik e.V."
    );
    expect(meta('meta[name="description"]')).toBe("Konfiguration");
    expect(
      document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")
    ).toBe(canonical);
    expect(meta('meta[property="og:url"]')).toBe(canonical);
    expect(document.head.querySelector('meta[name="robots"]')).toBeNull();
    // The static preview image stays, the configuration logo is not used.
    expect(meta('meta[property="og:image"]')).toBe(
      "https://example.test/static.jpg"
    );
    expect(
      document.head.querySelector('meta[name="twitter:image"]')
    ).toBeNull();
  });

  it("adds a trailing slash to the fallback canonical", () => {
    window.history.pushState({}, "", "/satzung");
    render(<SeoHeaders page={makePage(undefined)} />);

    expect(
      document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")
    ).toBe(`${window.location.origin}/satzung/`);
  });

  it("does not append the site suffix to a finished title", () => {
    render(
      <SeoHeaders
        page={makePage({ ...FULL_SEO, title: "Musical-Fabrik e.V." })}
      />
    );

    expect(document.head.querySelector("title")?.textContent).toBe(
      "Musical-Fabrik e.V."
    );
  });

  it("emits exactly one tag per kind", () => {
    render(<SeoHeaders page={makePage(FULL_SEO)} />);

    for (const selector of [
      "title",
      'meta[property="og:title"]',
      'meta[property="og:image"]',
      'meta[name="description"]',
      'link[rel="canonical"]',
    ]) {
      expect(document.head.querySelectorAll(selector)).toHaveLength(1);
    }
  });

  it("brings static tags back when the next page has no value for them", () => {
    addStaticImage();
    const staticDescription = document.createElement("meta");
    staticDescription.setAttribute("name", "description");
    staticDescription.setAttribute("data-static-seo", "description");
    staticDescription.setAttribute("content", "static description");
    document.head.appendChild(staticDescription);
    useGlobalStore.setState({ configurationParams: {} } as never);

    const { rerender, unmount } = render(
      <SeoHeaders page={makePage(FULL_SEO)} />
    );
    expect(meta('meta[property="og:image"]')).toBe(FULL_SEO.image);
    expect(meta('meta[name="description"]')).toBe("Beschreibung aus der API");

    rerender(<SeoHeaders page={makePage([])} />);
    expect(
      document.head.querySelectorAll('meta[property="og:image"]')
    ).toHaveLength(1);
    expect(meta('meta[property="og:image"]')).toBe(
      "https://example.test/static.jpg"
    );
    expect(
      document.head.querySelectorAll('meta[name="description"]')
    ).toHaveLength(1);
    expect(meta('meta[name="description"]')).toBe("static description");

    rerender(<SeoHeaders page={makePage(FULL_SEO)} />);
    expect(
      document.head.querySelectorAll('meta[property="og:image"]')
    ).toHaveLength(1);
    expect(meta('meta[property="og:image"]')).toBe(FULL_SEO.image);

    unmount();
    expect(meta('meta[property="og:image"]')).toBe(
      "https://example.test/static.jpg"
    );
  });

  it("uses the canonical address, not the backend address, in the structured data", () => {
    render(
      <SeoHeaders
        page={makePage(FULL_SEO, { template: { name: "project" } as never })}
      />
    );

    const data = JSON.parse(
      document.body.querySelector('script[type="application/ld+json"]')
        ?.textContent ?? "null"
    );
    expect(data.url).toBe(FULL_SEO.canonical);
  });
});
