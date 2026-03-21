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
  error: { [key: string]: string };
  success: { [key: string]: string };
  fields: { [key: string]: FormValidationFieldResponseDto };
  request_id?: number;
}
