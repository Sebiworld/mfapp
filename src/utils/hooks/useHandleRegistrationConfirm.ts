import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { authStoreActions } from "@src/store/auth/auth.actions";

export const useHandleRegistrationConfirm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams?.get("registration_confirm");

  useEffect(() => {
    if (!token) {
      return;
    }

    authStoreActions.registrationConfirm(token);
  }, [token]);
};
