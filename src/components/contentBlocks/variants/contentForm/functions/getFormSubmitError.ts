import { AxiosError } from "axios";
import { TFunction } from "i18next";
import { FormValidationResponseDto } from "@models/utility-types/form-validation-response-dto.model";

export interface FormSubmitError {
  title?: string;
  message: string;
}

/**
 * Turns a rejected form submission into a German message for the form.
 * The backend `error` text is only used for unknown error codes, because
 * `429` carries an English text and the known codes have fixed wording here.
 * Field errors of a `400` are rendered at the fields themselves.
 *
 * @param error The axios error of the submission.
 * @param t Translation function.
 * @returns The message, or undefined when the error is not a form rejection (network error, 5xx).
 */
export const getFormSubmitError = (
  error: AxiosError<FormValidationResponseDto>,
  t: TFunction
): FormSubmitError | undefined => {
  const status = error.response?.status;

  // Always the general text: the wait time (`Retry-After`) is deliberately not shown.
  if (status === 429) {
    return { message: t("error.form_too_many_requests") };
  }

  if (status !== 400) {
    return undefined;
  }

  const data = error.response?.data;

  switch (data?.errorcode) {
    case "form_validation_failed":
      return {
        title: t("error.form_error.title"),
        message: t("error.form_error.description"),
      };
    case "form_already_submitted":
      return { message: t("error.form_already_submitted") };
    case "form_rejected":
      return { message: t("error.form_rejected") };
    case "form_save_failed":
      return { message: t("error.form_save_failed") };
    default:
      break;
  }

  if (typeof data?.error === "string" && data.error) {
    return { message: data.error };
  }

  return undefined;
};
