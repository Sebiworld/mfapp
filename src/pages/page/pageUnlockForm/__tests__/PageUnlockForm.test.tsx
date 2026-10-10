import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AxiosError, AxiosResponse } from "axios";
import "@utils/i18n/i18n";
import { MFApi } from "@api/axios/mfApi";
import { PageUnlockForm } from "../PageUnlockForm";
import { useGlobalStore } from "@src/store/global.store";

vi.mock("@api/axios/mfApi", () => ({
  MFApi: { unlockPage: vi.fn() },
}));

/** Builds the rejection axios produces for an error status. */
const rejectWith = (status: number, errorcode: string): AxiosError =>
  Object.assign(new AxiosError("Request failed"), {
    response: { status, data: { errorcode, error: "" } } as AxiosResponse,
  });

const submit = async (password: string): Promise<void> => {
  const user = userEvent.setup();
  const field = screen.getByLabelText(/Passwort/);

  await user.clear(field);
  if (password) {
    await user.type(field, password);
  }
  await user.keyboard("{Enter}");
};

beforeEach(() => {
  useGlobalStore.setState({ pageUnlocks: {} });
});

describe("PageUnlockForm", () => {
  it("shows a wrong password as such (403)", async () => {
    vi.mocked(MFApi.unlockPage).mockRejectedValue(
      rejectWith(403, "wrong_password")
    );
    render(<PageUnlockForm pageId={7} />);

    await submit("falsch");

    expect(
      await screen.findByText("Das Passwort ist falsch.")
    ).toBeInTheDocument();
    expect(MFApi.unlockPage).toHaveBeenCalledWith(7, "falsch");
    expect(useGlobalStore.getState().pageUnlocks[7]).toBeUndefined();
  });

  it("asks to try again later after too many attempts (429)", async () => {
    vi.mocked(MFApi.unlockPage).mockRejectedValue(
      rejectWith(429, "too_many_requests")
    );
    render(<PageUnlockForm pageId={7} />);

    await submit("egal");

    expect(
      await screen.findByText(
        "Zu viele Versuche. Bitte versuch es später noch einmal."
      )
    ).toBeInTheDocument();
  });

  it("marks the field as required when the API misses the password (400)", async () => {
    vi.mocked(MFApi.unlockPage).mockRejectedValue(
      rejectWith(400, "missing_required_parameter")
    );
    render(<PageUnlockForm pageId={7} />);

    await submit("   ");

    expect(await screen.findByText("Pflichtfeld")).toBeInTheDocument();
  });

  it("does not send an empty field", async () => {
    render(<PageUnlockForm pageId={7} />);

    await submit("");

    expect(await screen.findByText("Pflichtfeld")).toBeInTheDocument();
    expect(MFApi.unlockPage).not.toHaveBeenCalled();
  });

  it("stores the key and asks for the page again (200)", async () => {
    vi.mocked(MFApi.unlockPage).mockResolvedValue({
      status: 200,
      data: { unlock_key: "1900000000.sig", expires: 1900000000 },
    } as AxiosResponse);
    const onUnlocked = vi.fn().mockResolvedValue(true);
    render(<PageUnlockForm pageId={7} onUnlocked={onUnlocked} />);

    await submit("richtig");

    await waitFor(() => expect(onUnlocked).toHaveBeenCalledTimes(1));
    expect(useGlobalStore.getState().pageUnlocks[7]).toEqual({
      key: "1900000000.sig",
      expires: 1900000000,
      source: "password",
      signedIn: false,
    });
  });

  it("stays usable when the page does not open after the right password", async () => {
    vi.mocked(MFApi.unlockPage).mockResolvedValue({
      status: 200,
      data: { unlock_key: "1900000000.sig", expires: 1900000000 },
    } as AxiosResponse);
    render(
      <PageUnlockForm
        pageId={7}
        onUnlocked={vi.fn().mockResolvedValue(false)}
      />
    );

    await submit("richtig");

    expect(
      await screen.findByText(
        "Die Seite konnte nicht entsperrt werden. Bitte versuch es später noch einmal."
      )
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Passwort/)).toBeEnabled();
    expect(screen.getByRole("button", { name: "Entsperren" })).toBeEnabled();
  });
});
