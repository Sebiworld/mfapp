import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { ContentForm } from "../ContentForm";
import { contentFormStyles } from "../contentForm.styles";
import { ContentBlockFormDto } from "@models/content/content-block-form-dto.model";

vi.mock("@api/axios/pageApi", () => ({
  pageApi: { submitPageForm: vi.fn() },
}));

vi.mock("react-rewards", () => ({
  useReward: () => ({ reward: vi.fn(), isAnimating: false }),
}));

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

vi.mock("@src/context/appContext/useAppContext", () => ({
  useAppContext: () => ({ matomoInstance: { trackEvent: vi.fn() } }),
}));

// Cast: the DTO unions require per-type fields the form never reads here.
const block = {
  id: 10,
  type: "form",
  grid_classes: "",
  classes: "",
  depth: 0,
  form: {
    page_id: 1,
    form_origin: 5,
    fields: [
      {
        id: "g1",
        name: "personal",
        type: "fieldset_open",
        label: "Persönliche Daten",
        description: "<p>Angaben zur Person</p>",
      },
      { id: "f1", name: "first_name", type: "text", columnWidth: 50 },
      { id: "f2", name: "last_name", type: "text", columnWidth: 50 },
      { id: "f3", name: "street", type: "text", columnWidth: 66 },
      { id: "f4", name: "birthday", type: "text" },
      { id: "c1", name: "contact", type: "checkbox", columnWidth: 34 },
      { id: "g1c", name: "personal_END", type: "fieldset_close" },
      {
        id: "g2",
        name: "payment",
        type: "fieldset_open",
        label: "Zahlungsdaten",
        description: "{{infotext_zahlungsdaten}}",
      },
      { id: "f5", name: "iban", type: "text" },
      { id: "g2c", name: "payment_END", type: "fieldset_close" },
    ],
  },
} as unknown as ContentBlockFormDto;

/**
 * Renders the test form.
 * @returns the container element
 */
const renderForm = (): HTMLElement => {
  const { container } = render(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      <MemoryRouter initialEntries={["/"]}>
        <ContentForm block={block} />
      </MemoryRouter>
    </ThemeProvider>
  );

  return container;
};

/**
 * Finds the layout block of an input by its field name.
 * @param container - rendered form
 * @param name - field name
 * @returns the layout block
 */
const blockOf = (container: HTMLElement, name: string): HTMLElement =>
  container
    .querySelector(`input[name="${name}"]`)
    ?.closest(".layout-block") as HTMLElement;

describe("ContentForm layout", () => {
  it("gives fields the share of the row the CMS sets as column width, in twelfths", () => {
    const container = renderForm();

    expect(
      blockOf(container, "first_name").style.getPropertyValue("--column-span")
    ).toBe("6");
    expect(
      blockOf(container, "street").style.getPropertyValue("--column-span")
    ).toBe("8");
    expect(
      blockOf(container, "contact").style.getPropertyValue("--column-span")
    ).toBe("4");
  });

  it("leaves fields without a column width at full width", () => {
    const container = renderForm();

    expect(
      blockOf(container, "birthday").style.getPropertyValue("--column-span")
    ).toBe("");
  });

  it("names each fieldset group by its title", () => {
    renderForm();

    expect(
      screen.getByRole("group", { name: "Persönliche Daten" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: "Zahlungsdaten" })
    ).toBeInTheDocument();
  });

  it("shows the description of a fieldset below its title", () => {
    renderForm();

    expect(screen.getByText("Angaben zur Person")).toBeInTheDocument();
  });

  it("hides a fieldset description that is only an unfilled CMS placeholder", () => {
    const container = renderForm();

    expect(container.textContent).not.toContain("{{");
  });

  it("stacks the fieldsets in one column and places fields on a twelve-column grid", () => {
    // Cast: the sx function is only read here as a plain tree of selectors.
    const styles = (
      contentFormStyles as unknown as (
        theme: typeof mfTheme
      ) => Record<string, Record<string, unknown>>
    )(mfTheme);
    const group = styles[".form-group.form-group"] as Record<
      string,
      Record<string, unknown>
    >;

    expect(group).toMatchObject({
      gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    });
    expect(group["& > .layout-block"]).toMatchObject({
      gridColumn: "span var(--column-span, 12)",
    });
    expect(group["& > .form-group"]).toMatchObject({ gridColumn: "1 / -1" });
    expect(group["& > .form-group:has(> .form-group-label)"]).toMatchObject({
      marginTop: "28px",
    });
    expect(group["& > .form-group"]).not.toHaveProperty("marginTop");
  });

  it("keeps the form at the measure of running text, also inside content columns", () => {
    // Cast: the sx function is only read here as a plain tree of selectors.
    const styles = (
      contentFormStyles as unknown as (
        theme: typeof mfTheme
      ) => Record<string, Record<string, unknown>>
    )(mfTheme);

    expect(styles["&.content-form.content-form"]).toEqual({ maxWidth: "38em" });
  });
});
