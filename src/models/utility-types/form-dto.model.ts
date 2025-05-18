export interface FormElementDto {
  name: string;
  id: string;
  label?: string;
  description?: string;
  notes?: string;
  required?: boolean;
  errors?: string[];
  successes?: string[];
  columnWidth?: number;
  size?: number;
  type: "element";
}

export interface FormInputDto extends Omit<FormElementDto, "type"> {
  minlength?: number;
  maxlength?: number;
  type: "input";
}

export interface FormInputText extends Omit<FormInputDto, "type"> {
  type: "text";
  value?: string;
}

export interface FormInputTextarea extends Omit<FormInputDto, "type"> {
  type: "textarea";
  value?: string;
}

export interface FormInputNumber extends Omit<FormInputDto, "type"> {
  type: "number";
  value?: string;
}

export interface FormInputEmail extends Omit<FormInputDto, "type"> {
  type: "email";
  value?: string;
}

export interface FormInputMarkup extends Omit<FormInputDto, "type"> {
  type: "markup";
  value?: string;
}

export interface FormInputCheckbox extends Omit<FormInputDto, "type"> {
  type: "checkbox";
  value?: boolean;
}

export interface FormInputOptionsOption {
  id: string;
  title?: string;
  value: string | number;
}

export interface FormInputOptions extends Omit<FormInputDto, "type"> {
  type: "options";
  value?: string | string[];
  isMultiselect?: boolean;
  options?: FormInputOptionsOption[];
}

export interface FormInputAntispamCode extends Omit<FormInputDto, "type"> {
  type: "antispam_code";
  value?: string;
  code?: string;
}

export interface FormFieldsetOpen extends Omit<FormElementDto, "type"> {
  type: "fieldset_open";
}
export interface FormFieldsetClose extends Omit<FormElementDto, "type"> {
  type: "fieldset_close";
}

export type FormInputTextVariant =
  | FormInputDto
  | FormInputText
  | FormInputNumber
  | FormInputTextarea
  | FormInputEmail
  | FormInputAntispamCode;

export type FormInputVariant =
  | FormInputTextVariant
  | FormInputMarkup
  | FormInputCheckbox
  | FormInputOptions;

export interface FormGroupedElement
  extends Partial<Omit<FormFieldsetOpen, "type">> {
  fields: FormGroupedElementVariant[];
  type: "group";
}

export type FormGroupedElementVariant =
  | FormElementDto
  | FormInputVariant
  | FormGroupedElement;

export type FormElementVariant =
  | FormElementDto
  | FormInputVariant
  | FormFieldsetOpen
  | FormFieldsetClose;

export interface FormDto {
  page_id: number;
  form_origin: number;
  fields: FormElementVariant[];
}
