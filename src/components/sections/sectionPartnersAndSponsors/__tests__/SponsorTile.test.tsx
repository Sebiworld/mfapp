import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SponsorTile } from "../SponsorTile";

vi.mock("@components/lazyPicture/LazyPicture", () => ({
  LazyPicture: () => <img alt="" />,
}));

const REVEAL_MS = 4000;

const renderTile = () =>
  render(
    <SponsorTile
      sponsor={{
        id: 1,
        title: "Stadtwerke",
        image: { basename: "a.png" } as never,
      }}
    />
  );

const getTile = () => screen.getByRole("button", { name: "Stadtwerke" });

describe("SponsorTile", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("is a button named after the sponsor and starts in grey", () => {
    renderTile();
    expect(getTile()).toHaveAttribute("aria-pressed", "false");
    expect(getTile().closest(".list-item")).not.toHaveClass("revealed");
  });

  it("falls back to a generic name when the sponsor has no title", () => {
    render(<SponsorTile sponsor={{ id: 2, image: { basename: "b.png" } as never }} />);
    expect(screen.getByRole("button", { name: "Förderer-Logo" })).toBeInTheDocument();
  });

  it("uses the image description as name when there is no title", () => {
    render(
      <SponsorTile
        sponsor={{ id: 3, image: { basename: "c.png", description: "Bäckerei Reker" } as never }}
      />
    );
    expect(screen.getByRole("button", { name: "Bäckerei Reker" })).toBeInTheDocument();
  });

  it("shows the original colours after a tap", () => {
    renderTile();
    fireEvent.click(getTile());
    expect(getTile()).toHaveAttribute("aria-pressed", "true");
    expect(getTile().closest(".list-item")).toHaveClass("revealed");
  });

  it("goes back after 4 seconds, not before", () => {
    renderTile();
    fireEvent.click(getTile());
    act(() => vi.advanceTimersByTime(REVEAL_MS - 1));
    expect(getTile()).toHaveAttribute("aria-pressed", "true");
    act(() => vi.advanceTimersByTime(1));
    expect(getTile()).toHaveAttribute("aria-pressed", "false");
  });

  it("goes back at once on a second tap, and the old timer does not fire later", () => {
    renderTile();
    fireEvent.click(getTile());
    act(() => vi.advanceTimersByTime(1000));
    fireEvent.click(getTile());
    expect(getTile()).toHaveAttribute("aria-pressed", "false");
    // A third tap restarts a full period; the first timer must not cut it short.
    fireEvent.click(getTile());
    act(() => vi.advanceTimersByTime(REVEAL_MS - 1000 + 1));
    expect(getTile()).toHaveAttribute("aria-pressed", "true");
  });

  it("reacts to Enter and Space like a tap", async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    renderTile();
    getTile().focus();
    await user.keyboard("{Enter}");
    expect(getTile()).toHaveAttribute("aria-pressed", "true");
    await user.keyboard(" ");
    expect(getTile()).toHaveAttribute("aria-pressed", "false");
  });

  it("clears its timer on unmount", () => {
    const { unmount } = renderTile();
    fireEvent.click(getTile());
    expect(vi.getTimerCount()).toBe(1);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
