import { FormDto } from "@models/utility-types/form-dto.model";
import { SectionDto } from "./section-dto.model";

export interface SectionFormDto extends SectionDto {
  type: "form";
  form: FormDto;
}
