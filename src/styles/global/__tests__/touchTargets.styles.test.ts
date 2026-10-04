import { describe, expect, it } from "vitest";
import { globalTouchTargetStyles } from "../touchTargets.styles";

describe("touch target styles", () => {
  // Cast: the style list is only read here as plain objects.
  const coarse = (
    globalTouchTargetStyles as unknown as Record<
      string,
      Record<string, Record<string, unknown>>
    >[]
  )[0]["@media (pointer: coarse)"];

  it("gives buttons a hit area of at least 44px on touch screens, without changing how they look", () => {
    const area = coarse[".MuiButtonBase-root::after"];

    expect(area).toMatchObject({
      content: '""',
      position: "absolute",
      top: "min(0px, calc((100% - 44px) / 2))",
      bottom: "min(0px, calc((100% - 44px) / 2))",
      left: "min(0px, calc((100% - 44px) / 2))",
      right: "min(0px, calc((100% - 44px) / 2))",
    });
    expect(area).not.toHaveProperty("background");
  });
});
