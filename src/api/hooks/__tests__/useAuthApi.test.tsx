import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useAuthApi } from "../useAuthApi";
import { MFApi } from "@api/axios/mfApi";
import { authStoreActions } from "@src/store/auth/auth.actions";
import { UserDto } from "@models/user-dto.model";

vi.mock("@api/axios/mfApi", () => ({
  MFApi: {
    registration: vi.fn(),
    registrationConfirm: vi.fn(),
  },
}));

// useReset pulls in every other API hook; the registration callbacks never call it.
vi.mock("../useReset", () => ({
  useReset: () => ({ reset: vi.fn(), reinitialize: vi.fn() }),
}));

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

// A stable `t` keeps callback identity dependent on the user fields only.
const t = (key: string, options?: Record<string, unknown>): string =>
  `${key}|${options?.name ?? ""}`;

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t }),
}));

// The hook only reads response.data.success, so the mock needs no other fields.
const successResponse = { data: { success: true } } as AxiosResponse;

const user = (fields: Partial<UserDto>): UserDto => ({
  id: "1",
  name: "user-name",
  ...fields,
});

describe("useAuthApi: registration", () => {
  beforeEach(() => {
    vi.mocked(MFApi.registration).mockResolvedValue(successResponse);
    vi.mocked(MFApi.registrationConfirm).mockResolvedValue(successResponse);
    authStoreActions.setUser(undefined);
  });

  it("greets with the nickname when the current user has one", async () => {
    authStoreActions.setUser(user({ nickname: "nick" }));
    const { result } = renderHook(() => useAuthApi());

    const output = await result.current.registration(
      "a@b.c",
      "pw",
      "A",
      "B",
      0
    );

    expect(output).toBe(true);
    expect(toast.success).toHaveBeenCalledWith(
      "auth.registration-successful|nick"
    );
  });

  it("falls back to the name when the current user has no nickname", async () => {
    authStoreActions.setUser(user({ name: "fallback-name" }));
    const { result } = renderHook(() => useAuthApi());

    await result.current.registration("a@b.c", "pw", "A", "B", 0);

    expect(toast.success).toHaveBeenCalledWith(
      "auth.registration-successful|fallback-name"
    );
  });

  it("confirms the registration with the same greeting", async () => {
    authStoreActions.setUser(user({ nickname: "nick" }));
    const { result } = renderHook(() => useAuthApi());

    const output = await result.current.registrationConfirm("token");

    expect(output).toBe(true);
    expect(toast.success).toHaveBeenCalledWith(
      "auth.registration-confirm-successful|nick"
    );
  });

  it("keeps both callbacks stable while name and nickname stay the same", () => {
    authStoreActions.setUser(user({ nickname: "nick" }));
    const { result } = renderHook(() => useAuthApi());
    const { registration, registrationConfirm } = result.current;

    // New user object, other fields changed, name and nickname unchanged.
    act(() => {
      authStoreActions.setUser(user({ nickname: "nick", first_name: "X" }));
    });

    expect(result.current.registration).toBe(registration);
    expect(result.current.registrationConfirm).toBe(registrationConfirm);
  });

  it("renews both callbacks when the name changes behind a nickname", () => {
    authStoreActions.setUser(user({ nickname: "nick" }));
    const { result } = renderHook(() => useAuthApi());
    const { registration, registrationConfirm } = result.current;

    act(() => {
      authStoreActions.setUser(user({ nickname: "nick", name: "other-name" }));
    });

    expect(result.current.registration).not.toBe(registration);
    expect(result.current.registrationConfirm).not.toBe(registrationConfirm);
  });
});
