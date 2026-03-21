import { Colorvariant } from "@models/colorvariant.model";

export interface AlertDto {
  id?: number;
  severity?: "success" | "info" | "warning" | "error";
  color?: Colorvariant;
  type?: "filled" | "outlined" | "standard";
  title?: string;
  text?: string;
  classes?: string;
  icon?: string;
  closable?: boolean;
}
