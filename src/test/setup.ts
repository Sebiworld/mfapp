import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";
import { cleanup } from "@testing-library/react";

// Runs after every test so a persisted store write in one test (zustand's
// `persist` middleware writes the "mfStore" key on every state change) never
// leaks into the next test via jsdom's shared localStorage.
afterEach(() => {
  cleanup();
  localStorage.clear();
});

// lightGallery starts timers of its own (50 ms after the setup, and until a closed lightbox is removed) that use
// `window` and cannot be cancelled. A test file that ended before they fired let them run after jsdom was torn down,
// which Vitest reports as an unhandled `window is not defined`. So a file that created a lightbox waits for them.
let lightboxSeen = false;
let lightboxObserver: MutationObserver | undefined;

beforeAll(() => {
  lightboxObserver = new MutationObserver((records) => {
    lightboxSeen ||= records.some((record) =>
      Array.from(record.addedNodes).some(
        (node) =>
          node instanceof Element &&
          (node.matches(".lg-container") ||
            node.querySelector(".lg-container") !== null)
      )
    );
  });
  lightboxObserver.observe(document.body, { childList: true, subtree: true });
});

afterAll(async () => {
  lightboxObserver?.disconnect();

  if (!lightboxSeen) {
    return;
  }

  cleanup();
  // Longer than the delayed teardown of an open lightbox and the 50 ms setup timer.
  const deadline = Date.now() + 2000;

  while (document.querySelector(".lg-container") && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 20));
  }

  await new Promise((resolve) => setTimeout(resolve, 100));
});
