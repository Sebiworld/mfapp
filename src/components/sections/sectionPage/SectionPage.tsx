import { Alerts } from "@components/alerts/Alerts";
import { ContentBlocks } from "@components/contentBlocks/ContentBlocks";
import { SectionDto } from "@models/section/section-dto.model";
import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";

export interface SectionPageProps {
  section: SectionDto;
}

export const SectionPage: React.FC<SectionPageProps> = ({ section }) => {
  const classes = useMemo(() => {
    const output = ["section", `section-${section.type}`];

    if (section.classes && typeof section.classes === "string") {
      output.push(...section.classes.split(" "));
    }

    return output.join(" ");
  }, [section]);

  return (
    <Box component="section" id={section.section_name} className={classes}>
      {section?.alerts && <Alerts alerts={section?.alerts}></Alerts>}

      {section.title && !section.hide_title && (
        <Typography variant="h2" className="section-title">
          {section.title}
        </Typography>
      )}

      <ContentBlocks blocks={section.contents}></ContentBlocks>
    </Box>
  );
};
