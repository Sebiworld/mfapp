import { useEffect } from "react";
import { Route as rootRoute } from "@routes/__root";
import { useGlobalStore } from "@src/store/global.store";
import { selectRegistrationConfirm } from "@src/store/auth.store";

export const useHandleRegistrationConfirm = () => {
  const searchParams = rootRoute.useSearch();
  const token = searchParams?.registration_confirm;
  const registrationConfirm = useGlobalStore(selectRegistrationConfirm);

  useEffect(() => {
    if (!token) {
      return;
    }
    registrationConfirm(token);
  }, [registrationConfirm, token]);
};
