import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { GlobalStore, useGlobalStore } from "@src/store/global.store";
import { StartupModal } from "../StartupModal";

// Last `closeModal` each stand-in received, so a test can call it after the stand-in is gone.
const closers = vi.hoisted(() => new Map<string, (() => void) | undefined>());

/**
 * Stands in for one content of the modal: its name and a close button.
 * @param name Text the stand-in shows.
 * @returns A component like the real content.
 */
const stub = vi.hoisted(
  () =>
    (name: string) =>
    ({ closeModal }: { closeModal?: () => void }): React.ReactElement => {
      closers.set(name, closeModal);

      return (
        <div>
          {name}
          <button type="button" onClick={closeModal}>
            close
          </button>
        </div>
      );
    }
);

vi.mock("../components/StartupModalIntro", () => ({
  StartupModalIntro: stub("intro-content"),
}));
vi.mock("../components/StartupModalNickname", () => ({
  StartupModalNickname: stub("nickname-content"),
}));
vi.mock("../components/StartupModalLogout", () => ({
  StartupModalLogout: stub("logout-content"),
}));
vi.mock("../components/startupModalLogin/StartupModalLogin", () => ({
  StartupModalLogin: stub("login-content"),
}));

/**
 * Sets the store fields the modal picks its content from.
 * @param isLoggedIn Whether a user is logged in.
 */
const setLoggedIn = (isLoggedIn: boolean): void => {
  // Cast: the modal only reads `isLoggedIn` of the user.
  useGlobalStore.setState({
    user: { isLoggedIn } as unknown as GlobalStore["user"],
  });
};

/**
 * Renders the modal inside the app theme.
 * @param setIsStartupModalOpen Setter the parent passes in.
 */
const renderModal = (
  setIsStartupModalOpen: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  render(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      <StartupModal setIsStartupModalOpen={setIsStartupModalOpen} />
    </ThemeProvider>
  );
};

describe("StartupModal", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useGlobalStore.setState({
      didReceiveWelcomeMessage: true,
      nickname: "Anna",
    });
    setLoggedIn(false);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("stays mounted until the exit has finished", () => {
    const setOpen = vi.fn();
    renderModal(setOpen);

    fireEvent.click(screen.getByRole("button", { name: "close" }));

    expect(setOpen).not.toHaveBeenCalled();
    expect(screen.getByText("login-content")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(setOpen).toHaveBeenCalledTimes(1);
    expect(setOpen).toHaveBeenCalledWith(false);
  });

  it("keeps the shown content while it leaves", () => {
    renderModal(vi.fn());

    fireEvent.click(screen.getByRole("button", { name: "close" }));
    act(() => {
      setLoggedIn(true);
    });

    expect(screen.getByText("login-content")).toBeInTheDocument();
    expect(screen.queryByText("logout-content")).toBeNull();

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(screen.getByText("login-content")).toBeInTheDocument();
    expect(screen.queryByText("logout-content")).toBeNull();
  });

  it("does not switch back to content it has already replaced", () => {
    renderModal(vi.fn());
    const closeFromLogin = closers.get("login-content");

    // A login form closes the modal only after the user has been loaded, when the store already shows the logout.
    act(() => {
      setLoggedIn(true);
    });

    expect(screen.getByText("logout-content")).toBeInTheDocument();

    act(() => {
      closeFromLogin?.();
    });

    expect(screen.getByText("logout-content")).toBeInTheDocument();
    expect(screen.queryByText("login-content")).toBeNull();
  });
});
