import { ContentBlockDtoVariant } from "./content-block-dto-variant.model";

export interface ContentBlockDto {
  id: number;
  type: string;
  grid_classes: string;
  classes: string;
  depth: number;
  children?: ContentBlockDtoVariant[];
  background_pattern?: string;
}
