import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { PageDto } from "@models/page/page-dto.model";
import { useGlobalStore } from "@src/store/global.store";
import { SeoHeaders } from "../SeoHeaders";

const addStatic = (attr: "name" | "property", key: string, content: string) => {
  const meta = document.createElement("meta");
  meta.setAttribute(attr, key);
  meta.setAttribute("data-static-seo", key);
  meta.setAttribute("content", content);
  document.head.appendChild(meta);
};

const addStaticTitle = () => {
  const title = document.createElement("title");
  title.setAttribute("data-static-seo", "title");
  title.textContent = "Static title";
  document.head.appendChild(title);
};

const page = {
  id: 1,
  title: "Probe",
  template: { name: "basic-page" },
} as unknown as PageDto;

describe("SeoHeaders", () => {
  beforeEach(() => {
    // Unmounting a test's render puts removed static tags back; start clean.
    document.head.querySelectorAll("[data-static-seo]").forEach((e) => e.remove());
    addStaticTitle();
    addStatic("name", "description", "static description");
    addStatic("property", "og:title", "static title");
    addStatic("property", "og:image", "https://example.test/static.jpg");
    addStatic("property", "og:image:width", "1200");
    addStatic("property", "og:site_name", "static site");
    addStatic("name", "twitter:card", "summary_large_image");
    addStatic("property", "og:type", "website");
    useGlobalStore.setState({
      configurationParams: {
        site_name: "Site",
        seo_description: "Dynamic description",
      },
    } as never);
  });

  afterEach(() => {
    document.head
      .querySelectorAll("[data-static-seo]")
      .forEach((element) => element.remove());
  });

  it("replaces static fallbacks instead of duplicating them", () => {
    render(<SeoHeaders page={page} />);

    const count = (selector: string) =>
      document.head.querySelectorAll(selector).length;

    expect(count('meta[name="description"]')).toBe(1);
    expect(count('meta[property="og:title"]')).toBe(1);
    expect(count('meta[property="og:site_name"]')).toBe(1);
    expect(count('meta[name="twitter:card"]')).toBe(1);
    expect(count('meta[property="og:type"]')).toBe(1);
    expect(
      document.head.querySelector('meta[name="twitter:card"]')
    ).toHaveAttribute("content", "summary_large_image");
  });

  it("keeps exactly one title in the head, the static one only while none is rendered", () => {
    const titles = () => document.head.querySelectorAll("title");
    const { unmount } = render(<SeoHeaders page={page} />);

    expect(titles()).toHaveLength(1);
    expect(titles()[0]).not.toHaveAttribute("data-static-seo");
    expect(titles()[0].textContent).toContain("Probe");

    unmount();
    expect(titles()).toHaveLength(1);
    expect(titles()[0]).toHaveAttribute("data-static-seo", "title");
  });

  it("keeps the static image while the page has none of its own", () => {
    render(<SeoHeaders page={page} />);

    expect(
      document.head.querySelectorAll('meta[property="og:image"]')
    ).toHaveLength(1);
    expect(
      document.head.querySelector('meta[property="og:image:width"]')
    ).not.toBeNull();
  });

  it("does not emit invalid tags", () => {
    render(<SeoHeaders page={page} />);

    expect(document.head.querySelector('meta[name="site_name"]')).toBeNull();
    expect(
      document.head.querySelector('meta[name="twitter:site_name"]')
    ).toBeNull();
    expect(document.head.querySelector('meta[name="image"]')).toBeNull();
    expect(document.head.querySelector('meta[property^="twitter:"]')).toBeNull();
  });
});
