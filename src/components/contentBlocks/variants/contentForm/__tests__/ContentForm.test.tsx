import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { AxiosError, AxiosResponse } from "axios";
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

  it("sends the honeypot field empty with every submission", async () => {
    vi.mocked(pageApi.submitPageForm).mockResolvedValue(
      response({ success: { finished: "Thanks" } })
    );
    const { container } = renderForm();

    fillAndSubmit(container);

    await screen.findByText("Thanks");
    expect(pageApi.submitPageForm).toHaveBeenLastCalledWith(
      "/kontakt",
      5,
      expect.objectContaining({ website: "" })
    );
  });

  it("hides the honeypot input from people and assistive technology", () => {
    const { container } = renderForm();
    const honeypot = container.querySelector(
      'input[name="website"]'
    ) as HTMLInputElement;

    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot).toHaveAttribute("autocomplete", "off");
    expect(honeypot.closest("[aria-hidden='true']")).not.toBeNull();
    expect(honeypot.closest(".hp-website")).not.toBeNull();
  });

  it("passes a filled honeypot value through unchanged", async () => {
    vi.mocked(pageApi.submitPageForm).mockResolvedValue(
      response({ success: { finished: "Thanks" } })
    );
    const { container } = renderForm();
    const honeypot = container.querySelector(
      'input[name="website"]'
    ) as HTMLInputElement;
    fireEvent.change(honeypot, { target: { value: "https://spam.invalid" } });

    fillAndSubmit(container);

    await screen.findByText("Thanks");
    expect(pageApi.submitPageForm).toHaveBeenLastCalledWith(
      "/kontakt",
      5,
      expect.objectContaining({ website: "https://spam.invalid" })
    );
  });

  describe("rejected submissions", () => {
    const reject = (
      status: number,
      data: Partial<FormValidationResponseDto> & { errorcode?: string },
      headers: Record<string, string> = {}
    ): void => {
      vi.mocked(pageApi.submitPageForm).mockRejectedValue(
        new AxiosError(
          `Request failed with status code ${status}`,
          "ERR_BAD_REQUEST",
          undefined,
          undefined,
          { status, data, headers } as unknown as AxiosResponse
        )
      );
    };

    it("explains a 429 in German, keeps the input and hides the English backend text", async () => {
      reject(
        429,
        {
          errorcode: "too_many_requests",
          error: "Too many submissions. Please try again later.",
        },
        { "retry-after": "3592" }
      );
      const { container } = renderForm();

      fillAndSubmit(container);

      expect(
        await screen.findByText(
          /zu viele Formulare.*Bitte versuchen Sie es später noch einmal\./
        )
      ).toBeInTheDocument();
      expect(screen.queryByText(/Too many submissions/)).toBeNull();
      expect(
        (container.querySelector('input[name="firstname"]') as HTMLInputElement)
          .value
      ).toBe("Anna");
    });

    it("shows the general text without a wait time, also when Retry-After is readable", async () => {
      reject(
        429,
        { errorcode: "too_many_requests" },
        { "retry-after": "3600" }
      );
      const { container, unmount } = renderForm();
      fillAndSubmit(container);
      expect(
        await screen.findByText(/Bitte versuchen Sie es später noch einmal\./)
      ).toBeInTheDocument();
      expect(screen.queryByText(/Minute/)).toBeNull();
      unmount();

      reject(429, { errorcode: "too_many_requests" });
      const second = renderForm();
      fillAndSubmit(second.container);
      expect(
        await screen.findByText(/Bitte versuchen Sie es später noch einmal\./)
      ).toBeInTheDocument();
    });

    it("shows field errors at the field and a summary for form_validation_failed", async () => {
      reject(400, {
        errorcode: "form_validation_failed",
        error: "Ein oder mehrere Felder sind noch nicht korrekt ausgefüllt.",
        fields: {
          firstname: {
            name: "firstname",
            error: ["Der Name ist ungültig"],
            isSuccessful: false,
          } as FormValidationResponseDto["fields"][string],
        },
        submission_blocked: true,
        status: false,
      });
      const { container } = renderForm();

      fillAndSubmit(container);

      expect(
        await screen.findByText("Der Name ist ungültig")
      ).toBeInTheDocument();
      expect(screen.getByText("Formularfehler")).toBeInTheDocument();
    });

    it("uses fixed German wording for known codes", async () => {
      reject(400, { errorcode: "form_already_submitted", error: "english" });
      const { container } = renderForm();

      fillAndSubmit(container);

      expect(
        await screen.findByText(/mit denselben Angaben bereits abgeschickt/)
      ).toBeInTheDocument();
      expect(screen.queryByText("english")).toBeNull();
    });

    it("falls back to the backend text for unknown error codes", async () => {
      reject(400, { errorcode: "form_error", error: "Backend text" });
      const { container } = renderForm();

      fillAndSubmit(container);

      expect(await screen.findByText("Backend text")).toBeInTheDocument();
    });
  });
});
