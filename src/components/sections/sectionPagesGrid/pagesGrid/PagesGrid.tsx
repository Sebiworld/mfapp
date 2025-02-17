import React from "react";
import Masonry from "@mui/lab/Masonry";

import { SectionPagesGridDto } from "@models/section/section-pages-grid-dto.model";
import { pagesGridStyles } from "./pagesGrid.styles";
import { Box } from "@mui/material";
import { PageCard } from "@components/pageCard/PageCard";

export interface PagesGridProps {
  section: SectionPagesGridDto;
}

export const PagesGrid: React.FC<PagesGridProps> = ({ section }) => {
  // useEffect(() => {
  //   console.log("PagesGrid", section);
  // }, [section]);

  return (
    <Box className="pages-grid" data-testid="pages-grid" sx={pagesGridStyles}>
      <Masonry
        columns={{ xs: 1, sm: 2, md: 3, xl: 4, xxl: 5 }}
        spacing={2}
        columns-md={3}
      >
        {section.cards?.map((card) => (
          <PageCard key={card.id} card={card} headingLevel={3}></PageCard>
        ))}
      </Masonry>
    </Box>
  );
};
