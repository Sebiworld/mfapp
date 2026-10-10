import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AxiosError } from "axios";
import { MFApi } from "@api/axios/mfApi";
import { ErrorResponseDto } from "@models/error-response-dto.model";
import { pageUnlocksStoreActions } from "@src/store/pageUnlocks/pageUnlocks.actions";
import { pageUnlockFormStyles } from "./pageUnlockForm.styles";

interface FormData {
  password: string;
}

export interface PageUnlockFormProps {
  /** Id of the locked page. */
  pageId: number;
  /** Called after the key is stored, to request the page again with it; resolves with whether the page opened. */
  onUnlocked?: () => Promise<boolean>;
}

/**
 * Password field of a locked page. The right password stores the page's key and asks for the page again; wrong
 * passwords, too many attempts and an empty field are shown at the field.
 * @param pageId Id of the locked page.
 * @param onUnlocked Called once the key is stored.
 * @returns The form.
 */
export const PageUnlockForm: React.FC<PageUnlockFormProps> = ({
  pageId,
  onUnlocked,
}) => {
  const { t } = useTranslation();
  // Set from the right password until the page answered: the form is replaced by the content when it opened.
  const [isUnlocked, setIsUnlocked] = useState(false);

  const schema = z.object({
    password: z.string().min(1, t("general.required")),
  });

  const {
    handleSubmit,
    control,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { password: "" },
  });

  const onSubmit: SubmitHandler<FormData> = async ({ password }) => {
    try {
      const response = await MFApi.unlockPage(pageId, password);
      const { unlock_key: key, expires } = response.data ?? {};

      if (!key || typeof expires !== "number") {
        setError("password", { message: t("page_unlock.error") });
        return;
      }

      pageUnlocksStoreActions.setPageUnlock(pageId, key, expires, "password");
      setIsUnlocked(true);

      const isOpen = (await onUnlocked?.()) ?? true;

      // Still locked or not loaded (network error, key refused): the form must stay usable.
      if (!isOpen) {
        setIsUnlocked(false);
        setError("password", { message: t("page_unlock.error") });
        // The field is enabled again only with the next render.
        setTimeout(() => setFocus("password", { shouldSelect: true }), 0);
      }
    } catch (error) {
      const status = (error as AxiosError<ErrorResponseDto>)?.response?.status;

      if (status === 403) {
        setError("password", { message: t("page_unlock.wrong_password") });
      } else if (status === 429) {
        setError("password", { message: t("page_unlock.too_many_requests") });
      } else if (status === 400) {
        setError("password", { message: t("general.required") });
      } else {
        setError("password", { message: t("page_unlock.error") });
      }

      setFocus("password", { shouldSelect: true });
    }
  };

  return (
    <Box
      component="form"
      className="page-unlock-form"
      data-testid="page-unlock-form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={pageUnlockFormStyles}
    >
      <Typography className="notice" variant="body1">
        <LockOutlinedIcon className="notice-icon" fontSize="small" />
        {t("page_unlock.notice")}
      </Typography>

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <TextField
            variant="outlined"
            type="password"
            className="password-input"
            id="page-unlock-password"
            label={t("page_unlock.password")}
            autoComplete="current-password"
            required
            name={name}
            value={value}
            inputRef={ref}
            onBlur={onBlur}
            onChange={onChange}
            disabled={isUnlocked}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        )}
      />

      <Button
        className="submit-button"
        type="submit"
        variant="contained"
        color="primary"
        loading={isSubmitting || isUnlocked}
      >
        {t("page_unlock.submit")}
      </Button>
    </Box>
  );
};
