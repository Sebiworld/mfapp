import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { resetMatchMedia, setReducedMotion } from "@src/test/motion";
import { usePointerSpotlight } from "../usePointerSpotlight";

/**
 * Tile that wires the spotlight handlers to a plain element.
 * @returns The tile.
 */
const Tile: React.FC = () => {
  const spotlight = usePointerSpotlight();

  return <div data-testid="tile" {...spotlight} />;
};

/**
 * Renders the tile with a fixed box of 200 × 100 at the top left corner.
 * @returns The tile element.
 */
const renderTile = (): HTMLElement => {
  const { getByTestId } = render(<Tile />);
  const tile = getByTestId("tile");

  tile.getBoundingClientRect = () =>
    ({
      left: 0,
      top: 0,
      width: 200,
      height: 100,
      right: 200,
      bottom: 100,
      x: 0,
      y: 0,
    }) as DOMRect;

  return tile;
};

describe("usePointerSpotlight", () => {
  let frames: FrameRequestCallback[];
  let requestFrame: ReturnType<typeof vi.fn>;

  /** Runs every queued animation frame callback once. */
  const flushFrames = (): void => {
    const queued = frames;
    frames = [];

    for (const callback of queued) {
      callback(performance.now());
    }
  };

  beforeEach(() => {
    frames = [];
    requestFrame = vi.fn((callback: FrameRequestCallback) => {
      frames.push(callback);

      return frames.length;
    });
    vi.stubGlobal("requestAnimationFrame", requestFrame);
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    resetMatchMedia();
  });

  it("puts the spotlight under the mouse", () => {
    setReducedMotion(false);
    const tile = renderTile();

    fireEvent.pointerMove(tile, {
      pointerType: "mouse",
      clientX: 50,
      clientY: 25,
    });
    flushFrames();

    expect(tile.style.getPropertyValue("--spot-x")).toBe("25.00%");
    expect(tile.style.getPropertyValue("--spot-y")).toBe("25.00%");
  });

  it("writes once per frame", () => {
    setReducedMotion(false);
    const tile = renderTile();

    fireEvent.pointerMove(tile, {
      pointerType: "mouse",
      clientX: 20,
      clientY: 10,
    });
    fireEvent.pointerMove(tile, {
      pointerType: "mouse",
      clientX: 40,
      clientY: 20,
    });
    fireEvent.pointerMove(tile, {
      pointerType: "mouse",
      clientX: 150,
      clientY: 75,
    });

    expect(requestFrame).toHaveBeenCalledTimes(1);
    expect(tile.style.getPropertyValue("--spot-x")).toBe("");

    flushFrames();

    expect(tile.style.getPropertyValue("--spot-x")).toBe("75.00%");
    expect(tile.style.getPropertyValue("--spot-y")).toBe("75.00%");
  });

  it("ignores touch and pen", () => {
    setReducedMotion(false);
    const tile = renderTile();

    for (const pointerType of ["touch", "pen"]) {
      fireEvent.pointerEnter(tile, { pointerType, clientX: 50, clientY: 25 });
      fireEvent.pointerMove(tile, { pointerType, clientX: 60, clientY: 30 });
    }

    flushFrames();

    expect(requestFrame).not.toHaveBeenCalled();
    expect(tile.style.getPropertyValue("--spot-x")).toBe("");
    expect(tile.style.getPropertyValue("--spot-y")).toBe("");
  });

  it("keeps the spotlight still with reduced motion", () => {
    setReducedMotion(true);
    const tile = renderTile();

    fireEvent.pointerEnter(tile, {
      pointerType: "mouse",
      clientX: 50,
      clientY: 25,
    });
    fireEvent.pointerMove(tile, {
      pointerType: "mouse",
      clientX: 60,
      clientY: 30,
    });
    flushFrames();

    expect(requestFrame).not.toHaveBeenCalled();
    expect(tile.style.getPropertyValue("--spot-x")).toBe("");
    expect(tile.style.getPropertyValue("--spot-y")).toBe("");
  });
});
