import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Runs after every test so a persisted store write in one test (zustand's
// `persist` middleware writes the "mfStore" key on every state change) never
// leaks into the next test via jsdom's shared localStorage.
afterEach(() => {
  cleanup();
  localStorage.clear();
});
