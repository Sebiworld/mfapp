import { useEffect } from "react";
import { useGlobalStore } from "@src/store/global.store";
import { selectRegistrationConfirm } from "@src/store/auth.store";
import { useSearchParams } from "react-router";

export const useHandleRegistrationConfirm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams?.get("registration_confirm");
  const registrationConfirm = useGlobalStore(selectRegistrationConfirm);

  useEffect(() => {
    if (!token) {
      return;
    }
    registrationConfirm(token);
  }, [registrationConfirm, token]);
};
