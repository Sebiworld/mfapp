import { ContentBlocks } from "@components/contentBlocks/ContentBlocks";
import React, { useMemo } from "react";

import { SectionPagesGridDto } from "@models/section/section-pages-grid-dto.model";
import { sectionPagesGridStyles } from "./sectionPagesGrid.styles";
import { FeaturedSlider } from "./featuredSlider/FeaturedSlider";
import { PagesGrid } from "./pagesGrid/PagesGrid";
import { Box, Typography } from "@mui/material";
import { Alerts } from "@components/alerts/Alerts";

export interface SectionPagesGridProps {
  section: SectionPagesGridDto;
}

export const SectionPagesGrid: React.FC<SectionPagesGridProps> = ({
  section,
}) => {
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
      sx={sectionPagesGridStyles}
    >
      {section?.alerts && <Alerts alerts={section?.alerts}></Alerts>}

      {section.title && !section.hide_title && (
        <Typography className="section-title" variant="h2">
          {section.title}
        </Typography>
      )}
      <ContentBlocks blocks={section.contents}></ContentBlocks>

      {section.gallery_type?.value === "featured_slider" ? (
        <FeaturedSlider section={section}></FeaturedSlider>
      ) : (
        <PagesGrid section={section}></PagesGrid>
      )}
    </Box>
  );
};
