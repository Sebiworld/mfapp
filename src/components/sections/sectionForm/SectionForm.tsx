import { ContentBlocks } from "@components/contentBlocks/ContentBlocks";
import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { SectionFormDto } from "@models/section/section-form.model";
import { sectionFormStyles } from "./sectionForm.styles";
import { ContentForm } from "@components/contentBlocks/variants/contentForm/ContentForm";
import { Alerts } from "@components/alerts/Alerts";

export interface SectionFormProps {
  section: SectionFormDto;
}

export const SectionForm: React.FC<SectionFormProps> = ({ section }) => {
  const classes = useMemo(() => {
    const output = ["section", `section-${section.type}`];

    if (section.classes && typeof section.classes === "string") {
      output.push(...section.classes.split(" "));
    }

    return output.join(" ");
  }, [section]);

  return (
    <Box
      component="section"
      id={section.section_name}
      className={classes}
      sx={sectionFormStyles}
    >
      {section?.alerts && <Alerts alerts={section?.alerts}></Alerts>}

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
