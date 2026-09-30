import { Suspense } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContentBlock } from "../ContentBlock";
import { ContentBlockDtoVariant } from "@models/content/content-block-dto-variant.model";

// The dispatcher lazy-loads each variant; stub them out with lightweight
// components so the test asserts on dispatch, not on the variants' own
// rendering.
vi.mock("../variants/ContentText", () => ({
  ContentText: ({ block }: { block: ContentBlockDtoVariant }) => (
    <div data-testid="variant-text">{block.id}</div>
  ),
}));
vi.mock("../variants/ContentImage", () => ({
  ContentImage: ({ block }: { block: ContentBlockDtoVariant }) => (
    <div data-testid="variant-image">{block.id}</div>
  ),
}));

const baseBlock = {
  grid_classes: "",
  classes: "",
  depth: 0,
};

const renderBlock = (block: ContentBlockDtoVariant) =>
  render(
    <Suspense fallback={null}>
      <ContentBlock block={block} />
    </Suspense>
  );

describe("ContentBlock dispatcher", () => {
  it("renders ContentText for a text block", async () => {
    renderBlock({ ...baseBlock, id: 1, type: "text" });

    expect(await screen.findByTestId("variant-text")).toHaveTextContent("1");
    expect(screen.queryByTestId("variant-image")).not.toBeInTheDocument();
  });

  it("renders ContentImage for an image block", async () => {
    renderBlock({ ...baseBlock, id: 2, type: "image" });

    expect(await screen.findByTestId("variant-image")).toHaveTextContent("2");
    expect(screen.queryByTestId("variant-text")).not.toBeInTheDocument();
  });

  it("falls back to the TODO marker for an unhandled type", () => {
    render(<ContentBlock block={{ ...baseBlock, id: 3, type: "timeline" }} />);

    expect(screen.getByText("TODO:", { exact: false })).toHaveTextContent(
      "TODO: timeline"
    );
  });
});
