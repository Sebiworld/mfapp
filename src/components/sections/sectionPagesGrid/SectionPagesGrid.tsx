import { ContentBlocks } from "@components/contentBlocks/ContentBlocks";
import { Box, Typography } from "@mui/joy";
import React from "react";

import { SectionPagesGridDto } from "@models/section/section-pages-grid-dto.model";
import { sectionPagesGridStyles } from "./sectionPagesGrid.styles";
import { FeaturedSlider } from "./featuredSlider/FeaturedSlider";
import { PagesGrid } from "./pagesGrid/PagesGrid";

export interface SectionPagesGridProps {
  section: SectionPagesGridDto;
}

export const SectionPagesGrid: React.FC<SectionPagesGridProps> = ({
  section,
}) => {
  // console.log("SectionPagesGrid", section);

  return (
    <Box
      component="section"
      id={section.section_name}
      className="section section-pages-grid"
      sx={sectionPagesGridStyles}
    >
      {section.title && !section.hide_title && (
        <Typography className="section-title" level="h2">
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
