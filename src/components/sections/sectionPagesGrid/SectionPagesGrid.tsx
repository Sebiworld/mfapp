import { ContentBlocks } from "@components/contentBlocks/ContentBlocks";
import React, { ReactNode, useMemo } from "react";

import { SectionPagesGridDto } from "@models/section/section-pages-grid-dto.model";
import { sectionPagesGridStyles } from "./sectionPagesGrid.styles";
import { FeaturedSlider } from "./featuredSlider/FeaturedSlider";
import { PagesGrid } from "./pagesGrid/PagesGrid";
import { PagesMosaic } from "./pagesMosaic/PagesMosaic";
import { Box, Typography } from "@mui/material";
import { Alerts } from "@components/alerts/Alerts";

/** CMS class that shows the cards as a photo mosaic instead of the card grid. */
const MOSAIC_CLASS = "tiles-mosaic";

/** CMS class that sets the section as an aside to the one above: text left, cards in the right half. */
const ASIDE_CLASS = "aside";

/** Card columns in the right half of an aside. */
const ASIDE_COLUMNS = { xs: 1, sm: 2, md: 1, lg: 2 };

export interface SectionPagesGridProps {
  section: SectionPagesGridDto;
}

/**
 * Picks the view for the cards of a section: featured slider, photo mosaic or card grid.
 * @param section - section whose cards to show
 * @returns the rendered cards
 */
const renderCards = (section: SectionPagesGridDto): ReactNode => {
  if (section.gallery_type?.value === "featured_slider") {
    return <FeaturedSlider section={section}></FeaturedSlider>;
  }

  const classes = section.classes?.split(" ") ?? [];

  if (classes.includes(MOSAIC_CLASS)) {
    return <PagesMosaic section={section}></PagesMosaic>;
  }

  return (
    <PagesGrid
      section={section}
      columns={classes.includes(ASIDE_CLASS) ? ASIDE_COLUMNS : undefined}
    ></PagesGrid>
  );
};

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

      {renderCards(section)}
    </Box>
  );
};
