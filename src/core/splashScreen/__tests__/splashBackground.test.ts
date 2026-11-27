import { describe, expect, it } from "vitest";
import { mfTheme } from "@styles/theme/mfTheme";
import indexHtml from "../../../../index.html?raw";
import { splashScreenStyles } from "../splashScreen.styles";

/**
 * Reads the background colour the early splash gets in one colour scheme from the boot style of `index.html`.
 * @param selector Selector the rule starts with.
 * @returns The colour value written in that rule.
 */
const bootBackground = (selector: string): string | undefined => {
  const style = new DOMParser()
    .parseFromString(indexHtml, "text/html")
    .getElementById("mf-boot-style")?.textContent;

  return style?.match(
    new RegExp(
      `${selector.replace(/[.#]/g, "\\$&")}\\{[^}]*?background:(#[0-9a-f]+)`
    )
  )?.[1];
};

describe("splash background", () => {
  it("is the page background in the app splash", () => {
    const styles = splashScreenStyles as (
      theme: typeof mfTheme
    ) => Record<string, unknown>;

    expect(styles(mfTheme).backgroundColor).toBe(
      mfTheme.vars?.palette.background.default
    );
  });

  it("is the page background colour in the early splash, light and dark", () => {
    expect(bootBackground("#mf-boot-splash")).toBe("#fff");
    expect(bootBackground("html.theme-dark #mf-boot-splash")).toBe("#000");
    expect(
      mfTheme.colorSchemes.dark?.palette?.background?.default?.toLowerCase()
    ).toBe("#000000");
    expect(
      mfTheme.colorSchemes.light?.palette?.background?.default?.toLowerCase()
    ).toBe("#fff");
  });
});
