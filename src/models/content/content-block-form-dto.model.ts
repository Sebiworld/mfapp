import { FormDto } from "@models/utility-types/form-dto.model";
import { ContentBlockDto } from "./content-block-dto.model";

export interface ContentBlockFormDto extends ContentBlockDto {
  type: "form";
  title?: string;
  hide_title?: boolean;
  form: FormDto;
}
