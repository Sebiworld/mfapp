import { Colorvariant } from "@models/colorvariant.model";

export interface AlertDto {
  id?: number;
  color?: Colorvariant;
  title?: string;
  text?: string;
  classes?: string;
  icon?: string;
}
