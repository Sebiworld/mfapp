import { selectLogin } from "@src/store/auth.store";
import { useGlobalStore } from "@src/store/global.store";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { StartupModalContentProps } from "../../../StartupModal";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
} from "@mui/material";

const loginSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});
type FormData = z.infer<typeof loginSchema>;
const formDataDefaults: FormData = {
  email: "",
  password: "",
};

export const StartupModalLoginForm = ({
  closeModal,
  setIsRegistrationActive,
}: StartupModalContentProps & {
  setIsRegistrationActive: Dispatch<SetStateAction<boolean>>;
}) => {
  const login = useGlobalStore(selectLogin);
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: formDataDefaults,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("submit", data);

    if (!data?.email || !data?.password) {
      toast.error(t("startup.error-no-email-password"));
      return;
    }

    await login(data.email, data.password);

    if (closeModal && typeof closeModal === "function") {
      closeModal();
    }
  };

  return (
    <Box
      className="modal-content"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <section className="form-section">
        <p className="content-block layout-block">
          <strong>Bist du bereits ein Mitglied der Musical-Fabrik?</strong>
          <br />
          Melde dich an, um Zugang zu internen Nachrichten und Probenplänen zu
          bekommen!
        </p>

        <Button
          color="primary"
          variant="outlined"
          onClick={() => {
            setIsRegistrationActive(true);
          }}
        >
          Mitgliedszugang anfragen
        </Button>

        <p className="content-block layout-block center">oder einloggen:</p>
      </section>

      <section className="form-section">
        <FormControl>
          <FormLabel>{t("startup.email")}</FormLabel>
          <Controller
            rules={{
              required: true,
            }}
            control={control}
            name={"email"}
            render={({
              field: { onChange, onBlur, value, disabled, name, ref },
            }) => (
              <TextField
                variant="outlined"
                type="email"
                className="email-input"
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                disabled={disabled}
                value={value}
                ref={ref}
              />
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel>{t("startup.password")}</FormLabel>
          <Controller
            rules={{
              required: true,
            }}
            control={control}
            name={"password"}
            render={({
              field: { onChange, onBlur, value, disabled, name, ref },
            }) => (
              <TextField
                variant="outlined"
                type="password"
                className="password-input"
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                disabled={disabled}
                value={value}
                ref={ref}
              />
            )}
          />

          {(errors.password || errors.email) && (
            <FormHelperText>
              {t("startup.error-wrong-credentials")}
            </FormHelperText>
          )}
        </FormControl>
      </section>

      <Box className="actions">
        <Button color="primary" variant="contained" type="submit">
          {t("general.actions.login")}
        </Button>
      </Box>
    </Box>
  );
};
