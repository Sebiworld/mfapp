import { ContentBlocks } from "@components/contentBlocks/ContentBlocks";
import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { SectionFormDto } from "@models/section/section-form.model";
import { sectionFormStyles } from "./sectionForm.styles";
import { ContentForm } from "@components/contentBlocks/variants/contentForm/ContentForm";

export interface SectionFormProps {
  section: SectionFormDto;
}

export const SectionForm: React.FC<SectionFormProps> = ({ section }) => {
  const classes: string = useMemo(() => {
    if (!section?.id) {
      return "";
    }

    const output: string[] = ["section", "section-form"];

    if (section.classes && typeof section.classes === "string") {
      output.push(...section.classes.split(" "));
    }

    return output.join(" ");
  }, [section?.classes, section?.id]);

  return (
    <Box
      component="section"
      id={section.section_name}
      className={classes}
      sx={sectionFormStyles}
    >
      {section.title && !section.hide_title && (
        <Typography variant="h2" className="section-title">
          {section.title}
        </Typography>
      )}

      <ContentBlocks blocks={section.contents}></ContentBlocks>

      {!!section?.form && (
        <Box className="form-container">
          <ContentForm block={section} />
        </Box>
      )}
    </Box>
  );
};
