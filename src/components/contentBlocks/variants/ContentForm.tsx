import { ContentBlockFormDto } from "@models/content/content-block-form-dto.model";
import { Box } from "@mui/joy";
import React from "react";

export interface ContentTextProps {
  block: ContentBlockFormDto;
}

export const ContentForm: React.FC<ContentTextProps> = ({ block }) => {
  return <Box className={`content-block ${block.classes}`}>FORM</Box>;
};
