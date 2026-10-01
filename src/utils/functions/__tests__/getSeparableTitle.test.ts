import { describe, expect, it } from "vitest";
import { getSeparableTitle } from "../getSeparableTitle";

describe("getSeparableTitle", () => {
  it("turns every break marker of the separable title into a soft hyphen", () => {
    expect(
      getSeparableTitle({ title: "Eva Ober", title_separable: "Ev_a O_ber" })
    ).toBe("Ev&shy;a O&shy;ber");
  });

  it("prefers the separable title over the title", () => {
    expect(
      getSeparableTitle({ title: "Eva Ober", title_separable: "Eva Ober-Sep" })
    ).toBe("Eva Ober-Sep");
  });

  it("falls back to the title and leaves its underscores alone", () => {
    expect(getSeparableTitle({ title: "Name_mit_Strich" })).toBe(
      "Name_mit_Strich"
    );
    expect(getSeparableTitle({ title: "Eva", title_separable: "" })).toBe(
      "Eva"
    );
  });

  it("gives an empty string without any name", () => {
    expect(getSeparableTitle({ title: "" })).toBe("");
  });
});
