import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { parseHtml } from "../parseHtml";

const renderHtml = (html: string): void => {
  const router = createMemoryRouter([
    { path: "*", element: <div>{parseHtml(html)}</div> },
  ]);

  render(<RouterProvider router={router} />);
};

describe("parseHtml links", () => {
  it("keeps relative links as router links", () => {
    renderHtml('<a href="/projekte/annie/">Annie</a>');

    const link = screen.getByRole("link", { name: "Annie" });

    expect(link).toHaveAttribute("href", "/projekte/annie/");
    expect(link).not.toHaveAttribute("target");
  });

  it("turns links to the own host into router links", () => {
    renderHtml(
      `<a href="${window.location.origin}/projekte/annie/?x=1#y">Own</a>`
    );

    const link = screen.getByRole("link", { name: "Own" });

    expect(link).toHaveAttribute("href", "/projekte/annie/?x=1#y");
    expect(link).not.toHaveAttribute("target");
  });

  it("leaves external links as plain links in a new tab", () => {
    renderHtml('<a href="https://example.org/a/b">Extern</a>');

    const link = screen.getByRole("link", { name: "Extern" });

    expect(link).toHaveAttribute("href", "https://example.org/a/b");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("keeps mail links in place", () => {
    renderHtml('<a href="mailto:info@example.org">Mail</a>');

    const link = screen.getByRole("link", { name: "Mail" });

    expect(link).toHaveAttribute("href", "mailto:info@example.org");
    expect(link).not.toHaveAttribute("target");
  });

  it("passes the class on", () => {
    renderHtml('<a class="btn" href="https://example.org">X</a>');

    expect(screen.getByRole("link", { name: "X" })).toHaveClass("btn");
  });
});
