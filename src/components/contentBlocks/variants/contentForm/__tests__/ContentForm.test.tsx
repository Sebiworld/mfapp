import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { AxiosResponse } from "axios";
import { ContentForm } from "../ContentForm";
import { pageApi } from "@api/axios/pageApi";
import { ContentBlockFormDto } from "@models/content/content-block-form-dto.model";
import { FormValidationResponseDto } from "@models/utility-types/form-validation-response-dto.model";

vi.mock("@api/axios/pageApi", () => ({
  pageApi: { submitPageForm: vi.fn() },
}));

vi.mock("react-rewards", () => ({
  useReward: () => ({ reward: vi.fn(), isAnimating: false }),
}));

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

const trackEvent = vi.fn();
vi.mock("@src/context/appContext/useAppContext", () => ({
  useAppContext: () => ({ matomoInstance: { trackEvent } }),
}));

// Cast: the DTO unions require per-type fields the form never reads here.
const block = {
  id: 10,
  type: "form",
  grid_classes: "",
  classes: "extra-a extra-b",
  depth: 2,
  form: {
    page_id: 1,
    form_origin: 5,
    fields: [
      { id: "g1", name: "group", type: "fieldset_open", label: "Group label" },
      { id: "f1", name: "firstname", type: "text", required: true },
      { id: "g1c", name: "group_END", type: "fieldset_close" },
      { id: "f2", name: "note", type: "text" },
    ],
  },
} as unknown as ContentBlockFormDto;

const response = (
  data: Partial<FormValidationResponseDto>
): AxiosResponse<FormValidationResponseDto> =>
  ({ status: 200, data }) as AxiosResponse<FormValidationResponseDto>;

const renderForm = () =>
  render(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      <MemoryRouter initialEntries={["/kontakt"]}>
        <ContentForm block={block} />
      </MemoryRouter>
    </ThemeProvider>
  );

const fillAndSubmit = (container: HTMLElement) => {
  const input = container.querySelector('input[name="firstname"]');
  fireEvent.change(input as HTMLInputElement, { target: { value: "Anna" } });
  fireEvent.submit(container.querySelector("form") as HTMLFormElement);
};

describe("ContentForm", () => {
  it("builds the root classes from depth and block classes", () => {
    const { container } = renderForm();

    expect(container.querySelector("form")).toHaveClass(
      "content-block",
      "layout-block",
      "content-form",
      "block-depth-2",
      "extra-a",
      "extra-b"
    );
  });

  it("renders grouped and ungrouped fields", () => {
    const { container } = renderForm();

    expect(screen.getByText("Group label")).toBeInTheDocument();
    expect(container.querySelector('input[name="firstname"]')).not.toBeNull();
    expect(container.querySelector('input[name="note"]')).not.toBeNull();
  });

  it("submits to the current path and shows the success messages", async () => {
    vi.mocked(pageApi.submitPageForm).mockResolvedValue(
      response({ success: { finished: "Thanks" }, request_id: 7 })
    );
    const { container } = renderForm();

    fillAndSubmit(container);

    expect(await screen.findByText("Thanks")).toBeInTheDocument();
    expect(pageApi.submitPageForm).toHaveBeenCalledWith(
      "/kontakt",
      5,
      expect.objectContaining({ firstname: "Anna" })
    );
    expect(trackEvent).toHaveBeenCalledWith("form", "submit", "success", 7);
  });

  it("shows server-side error messages", async () => {
    vi.mocked(pageApi.submitPageForm).mockResolvedValue(
      response({ error: { firstname: "Server says no" } })
    );
    const { container } = renderForm();

    fillAndSubmit(container);

    expect(await screen.findByText("Server says no")).toBeInTheDocument();
  });

  it("blocks the submit and shows the local error when a required field is empty", async () => {
    const { container } = renderForm();

    fireEvent.submit(container.querySelector("form") as HTMLFormElement);

    await waitFor(() => {
      expect(container.querySelector(".form-messages")).not.toBeNull();
    });
    expect(pageApi.submitPageForm).not.toHaveBeenCalled();
  });
});
