import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useAuthApi } from "@api/hooks/useAuthApi";

export const useHandleRegistrationConfirm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams?.get("registration_confirm");
  const { registrationConfirm } = useAuthApi();

  useEffect(() => {
    if (!token) {
      return;
    }

    registrationConfirm(token);
  }, [registrationConfirm, token]);
};
