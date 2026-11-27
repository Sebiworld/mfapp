import { describe, expect, it } from "vitest";
import { i18n, zod } from "@utils/i18n/i18n";
import { superRefineIsNotEmpty } from "@utils/functions/zod/superRefineIsNotEmpty";

const firstMessage = (
  schema: zod.ZodType,
  input: unknown
): string | undefined => {
  const result = schema.safeParse(input);
  return result.success ? undefined : result.error.issues[0]?.message;
};

describe("German validation messages", () => {
  it("translates built-in issues", () => {
    expect(firstMessage(zod.string(), undefined)).toBe("Darf nicht leer sein");
    expect(firstMessage(zod.string().min(3), "ab")).toBe(
      "Dieser Text muss mindestens 3 Zeichen enthalten"
    );
    expect(firstMessage(zod.string().max(2), "abc")).toBe(
      "Dieser Text darf höchstens 2 Zeichen enthalten"
    );
    expect(firstMessage(zod.string().email(), "x")).toBe(
      "Ungültige E-Mail-Adresse"
    );
    expect(firstMessage(zod.number(), "x")).toBe(
      "Zahl erwartet, String erhalten"
    );
  });

  it("translates custom issues by key", () => {
    expect(
      firstMessage(
        zod.array(zod.string()).superRefine(superRefineIsNotEmpty),
        []
      )
    ).toBe("Feld darf nicht leer sein");
  });

  it("keeps plain message strings untouched", () => {
    expect(firstMessage(zod.string().min(1, "some.key"), "")).toBe("some.key");
  });

  it("resolves app translations through i18next", () => {
    expect(i18n.t("general.required")).not.toBe("general.required");
  });
});
