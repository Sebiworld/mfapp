import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppIcon } from "../AppIcon";
import { APP_ICONS, FALLBACK_ICON, resolveIcon } from "../appIcons";

const iconOf = (container: HTMLElement): string | null => {
  const el = container.querySelector("ion-icon") as
    (HTMLElement & { icon?: string }) | null;

  return el ? (el.icon ?? el.getAttribute("icon")) : null;
};

describe("AppIcon", () => {
  it("renders the registered icon for a known name", () => {
    const { container } = render(<AppIcon name="logo-youtube" />);

    expect(iconOf(container)).toBe(APP_ICONS["logo-youtube"]);
    expect(iconOf(container)).not.toBe(FALLBACK_ICON);
  });

  it("renders the fallback icon for an unknown name", () => {
    const { container } = render(<AppIcon name="logo-unknown-network" />);

    expect(iconOf(container)).toBe(FALLBACK_ICON);
  });

  it("renders the fallback icon for an empty name", () => {
    const { container } = render(<AppIcon name="" />);

    expect(iconOf(container)).toBe(FALLBACK_ICON);
  });

  it.each([
    "warning",
    "alert-circle",
    "information-circle",
    "checkmark-circle",
    "calendar",
    "ticket",
  ])("renders the registered icon for alert name %s", (name) => {
    const { container } = render(<AppIcon name={name} />);

    expect(iconOf(container)).toBe(APP_ICONS[name]);
    expect(iconOf(container)).not.toBe(FALLBACK_ICON);
  });

  it("ignores the ion- prefix", () => {
    expect(resolveIcon("ion-logo-whatsapp")).toBe(APP_ICONS["logo-whatsapp"]);
  });

  it("does not resolve inherited object keys", () => {
    expect(resolveIcon("constructor")).toBe(FALLBACK_ICON);
  });
});
