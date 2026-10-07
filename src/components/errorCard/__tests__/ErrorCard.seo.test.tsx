import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { AxiosError } from "axios";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { ErrorResponseDto } from "@models/error-response-dto.model";
import { ErrorCard } from "../ErrorCard";
import "@utils/i18n/i18n";

const renderCard = (errorcode: string): void => {
  const error = new AxiosError<ErrorResponseDto>("failed");
  error.response = {
    data: { errorcode },
  } as AxiosError<ErrorResponseDto>["response"];

  render(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }}>
      <MemoryRouter>
        <ErrorCard errorResponse={error} />
      </MemoryRouter>
    </ThemeProvider>
  );
};

describe("ErrorCard head", () => {
  afterEach(() => {
    cleanup();
    document.head.querySelectorAll("meta,title").forEach((e) => e.remove());
  });

  it.each(["not_found_exception", "performance_not_found"])(
    "marks %s as noindex with its own title",
    (errorcode) => {
      renderCard(errorcode);

      expect(document.head.querySelector("title")?.textContent).toBe(
        "Seite nicht gefunden | Musical-Fabrik e.V."
      );
      expect(
        document.head
          .querySelector('meta[name="robots"]')
          ?.getAttribute("content")
      ).toBe("noindex");
    }
  );

  it("leaves the head alone for other errors", () => {
    renderCard("some_unknown_code");

    expect(document.head.querySelector('meta[name="robots"]')).toBeNull();
  });
});
