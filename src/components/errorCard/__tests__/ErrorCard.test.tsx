import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { AxiosError } from "axios";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { ErrorResponseDto } from "@models/error-response-dto.model";
import { ErrorCard } from "../ErrorCard";
import "@utils/i18n/i18n";

const renderCard = (errorcode?: string): void => {
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

describe("ErrorCard", () => {
  it.each([
    ["a missing page", "not_found_exception"],
    ["a missing performance", "performance_not_found"],
    ["an unknown error", "some_unknown_code"],
  ])("has one level-one heading inside main for %s", (_label, errorcode) => {
    renderCard(errorcode);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("main")).toContainElement(
      screen.getByRole("heading", { level: 1 })
    );
  });
});
