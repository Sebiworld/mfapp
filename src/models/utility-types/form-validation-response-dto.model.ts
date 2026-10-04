export interface FormValidationFieldResponseDto {
  name: string;
  label: string;
  currentValue: unknown;
  error: string[];
  error_details: {
    code: string;
    message: string;
  }[];
  isSuccessful: boolean;
}

export interface FormValidationResponseDto {
  status: boolean;
  submission_blocked: boolean;
  /** Error code of a rejected request (`form_validation_failed`, `too_many_requests`, …). */
  errorcode?: string;
  /** Translated message string on HTTP errors; a map of messages on legacy 200 responses. */
  error?: string | { [key: string]: string };
  success: { [key: string]: string };
  fields: { [key: string]: FormValidationFieldResponseDto };
  request_id?: number;
}
