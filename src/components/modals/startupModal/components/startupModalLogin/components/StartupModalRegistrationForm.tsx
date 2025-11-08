import { selectRegistration } from "@src/store/auth.store";
import { useGlobalStore } from "@src/store/global.store";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { StartupModalContentProps } from "../../../StartupModal";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
} from "@mui/material";

const registrationSchema = z
  .object({
    email: z
      .string()
      .min(1, "startup.error.email_required")
      .email("startup.error.invalid_email"),
    password: z
      .string()
      .min(1, "startup.error.password_required")
      .min(6, "startup.error.password_min_6_chars")
      .refine((password) => /[A-Z]/.test(password), {
        message: "startup.error.password_uppercase_letters",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "startup.error.password_lowercase_letters",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "startup.error.password_numbers",
      }),
    passwordRepeat: z.string().min(1, "startup.error.passwordrepeat_required"),
    firstname: z.string().min(1, "startup.error.firstname_required"),
    lastname: z.string().min(1, "startup.error.lastname_required"),
    nickname: z.string(),
    birthdate: z.instanceof(dayjs as unknown as typeof Dayjs),
    rolestext: z.string(),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "startup.error.passwords_dont_match",
    path: ["passwordRepeat"], // path of error
  });

type FormData = z.infer<typeof registrationSchema>;

const formDataDefaults: FormData = {
  email: "",
  password: "",
  passwordRepeat: "",
  firstname: "",
  lastname: "",
  nickname: "",
  birthdate: dayjs(),
  rolestext: "",
};

export const StartupModalRegistrationForm = ({
  closeModal,
  setIsRegistrationActive,
}: StartupModalContentProps & {
  setIsRegistrationActive: Dispatch<SetStateAction<boolean>>;
}) => {
  const registration = useGlobalStore(selectRegistration);
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: formDataDefaults,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await registration(
      data.email,
      data.password,
      data.firstname,
      data.lastname,
      data.birthdate.unix(),
      data.nickname,
      data.rolestext
    );

    if (closeModal && typeof closeModal === "function") {
      closeModal();
    }
  };

  return (
    <>
      <Box
        className="modal-content"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section>
          <p className="content-block layout-block">
            <strong>Bist du bereits ein Mitglied der Musical-Fabrik?</strong>
            <br />
            Registriere dich hier, um Zugang zu internen Nachrichten und
            Probenplänen zu bekommen!
          </p>
        </section>

        <section className="form-section">
          <FormControl error={!!errors.email}>
            <FormLabel>{t("startup.email")}</FormLabel>

            <Box className="form-description">
              Deine Email-Adresse ist nur für dich sichtbar und wird für den
              Login benötigt.
            </Box>

            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  variant="outlined"
                  type="email"
                  className="email-input"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              )}
              control={control}
              name={"email"}
            />

            {errors.email && (
              <FormHelperText>
                <InfoOutlined />
                {t(errors.email.message || "error.general")}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors.password}>
            <FormLabel>{t("startup.password")}</FormLabel>

            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  variant="outlined"
                  type="password"
                  className="password-input"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              )}
              control={control}
              name={"password"}
            />

            {errors.password && (
              <FormHelperText>
                <InfoOutlined />
                {t(errors.password.message || "error.general")}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors.passwordRepeat}>
            <FormLabel>{t("startup.password-repeat")}</FormLabel>

            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  variant="outlined"
                  type="password"
                  className="password-repeat-input"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              )}
              control={control}
              name={"passwordRepeat"}
            />

            {errors.passwordRepeat && (
              <FormHelperText>
                <InfoOutlined />
                {t(errors.passwordRepeat.message || "error.general")}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors.firstname}>
            <FormLabel>{t("startup.firstname")}</FormLabel>

            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  variant="outlined"
                  type="text"
                  className="firstname-input"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              )}
              control={control}
              name={"firstname"}
            />

            {errors.firstname && (
              <FormHelperText>
                <InfoOutlined />
                {t(errors.firstname.message || "error.general")}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors.lastname}>
            <FormLabel>{t("startup.lastname")}</FormLabel>

            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  variant="outlined"
                  type="text"
                  className="lastname-input"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              )}
              control={control}
              name={"lastname"}
            />

            {errors.lastname && (
              <FormHelperText>
                <InfoOutlined />
                {t(errors.lastname.message || "error.general")}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors.nickname}>
            <FormLabel>{t("startup.nickname")}</FormLabel>

            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  variant="outlined"
                  type="text"
                  className="nickname-input"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              )}
              control={control}
              name={"nickname"}
            />

            {errors.nickname && (
              <FormHelperText>
                <InfoOutlined />
                {t(errors.nickname.message || "error.general")}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors.birthdate}>
            <FormLabel>{t("startup.birthdate")}</FormLabel>

            <Controller
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  className="birthdate-input"
                  onChange={onChange}
                  value={value}
                  sx={{
                    color: "green",
                  }}
                />
              )}
              control={control}
              name={"birthdate"}
            />

            {errors.birthdate && (
              <FormHelperText>
                <InfoOutlined />
                {t(errors.birthdate.message || "error.general")}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors.rolestext}>
            <FormLabel>{t("startup.roles")}</FormLabel>

            <Box className="form-description">
              Bei welchen Projekten warst du schon dabei? Bitte schreib hier
              kurz, was du wo gemacht hast, damit wir deine Benutzerrollen
              zuordnen können!
            </Box>

            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  variant="outlined"
                  className="rolestext-input"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  minRows={2}
                  multiline
                />
              )}
              control={control}
              name={"rolestext"}
            />

            {errors.rolestext && (
              <FormHelperText>
                <InfoOutlined />
                {t(errors.rolestext.message || "error.general")}
              </FormHelperText>
            )}
          </FormControl>

          <Button color="primary" variant="contained" type="submit">
            {t("general.actions.submit")}
          </Button>
        </section>

        <section className="center">
          <p>oder:</p>
          <Button
            color="primary"
            onClick={() => {
              setIsRegistrationActive(false);
            }}
          >
            Zurück zum Login
          </Button>
        </section>
      </Box>
    </>
  );
};
