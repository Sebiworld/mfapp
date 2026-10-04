import React from "react";
import Masonry from "@mui/lab/Masonry";

import { SectionPagesGridDto } from "@models/section/section-pages-grid-dto.model";
import { pagesGridStyles } from "./pagesGrid.styles";
import { Box } from "@mui/material";
import { PageCard } from "@components/pageCard/PageCard";

/** Columns per breakpoint of the card grid. */
type PagesGridColumns = Partial<
  Record<"xs" | "sm" | "md" | "lg" | "xl" | "xxl", number>
>;

/** Columns for a grid that spans the content width. */
const FULL_WIDTH_COLUMNS: PagesGridColumns = {
  xs: 1,
  sm: 2,
  md: 3,
  xl: 4,
  xxl: 5,
};

export interface PagesGridProps {
  section: SectionPagesGridDto;
  // Narrower containers (e.g. the aside column) need fewer columns than the full content width.
  columns?: PagesGridColumns;
}

export const PagesGrid: React.FC<PagesGridProps> = ({
  section,
  columns = FULL_WIDTH_COLUMNS,
}) => {
  // useEffect(() => {
  //   console.log("PagesGrid", section);
  // }, [section]);

  return (
    <Box className="pages-grid" data-testid="pages-grid" sx={pagesGridStyles}>
      <Masonry columns={columns} spacing={2} columns-md={3}>
        {section.cards?.map((card) => (
          <PageCard key={card.id} card={card} headingLevel={3}></PageCard>
        ))}
      </Masonry>
    </Box>
  );
};
