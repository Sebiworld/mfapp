import { describe, expect, it } from "vitest";
import { globalVariablesStyles } from "../variables.styles";

describe("global variables styles", () => {
  // Cast: the style list is only read here as plain objects.
  const styles = (
    globalVariablesStyles as unknown as Record<
      string,
      Record<string, Record<string, unknown>>
    >[]
  )[0];
  const root = styles[":root"] as Record<string, unknown>;

  it("defines the shared easing and spring tokens", () => {
    expect(root["--mf-ease-out"]).toBe("cubic-bezier(0.23, 1, 0.32, 1)");
    expect(root["--mf-ease-drawer"]).toBe("cubic-bezier(0.32, 0.72, 0, 1)");
    expect(root["--mf-spring"]).toMatch(
      /^linear\(0, 0\.06, 0\.2, .*0\.998, 1\)$/
    );
  });

  it("falls back to the ease-out curve without linear() support", () => {
    expect(
      styles["@supports not (transition-timing-function: linear(0, 1))"][
        ":root"
      ]["--mf-spring"]
    ).toBe("cubic-bezier(0.23, 1, 0.32, 1)");
  });

  it("defines the shared fade-in keyframes", () => {
    expect(styles["@keyframes mf-fade-in"]).toEqual({
      from: { opacity: 0 },
      to: { opacity: 1 },
    });
  });
});
