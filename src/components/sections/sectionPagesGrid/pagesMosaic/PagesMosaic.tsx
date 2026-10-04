import { FC } from "react";
import { Link } from "react-router";
import { Box, Typography } from "@mui/material";
import { SectionPagesGridDto } from "@models/section/section-pages-grid-dto.model";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { LazyPictureSize } from "@components/lazyPicture/components/LazyPictureWithoutFallback";
import { parseHtml } from "@utils/functions/parseHtml";
import { pagesMosaicStyles } from "./pagesMosaic.styles";

/** Tile image widths per breakpoint (two columns below `md`, three above); widest first. */
const MOSAIC_TILE_IMAGE_SIZES: LazyPictureSize[] = [
  { media: "xl-up", width: 800 },
  { media: "lg-up", width: 500 },
  { media: "md-up", width: 400 },
  { media: "sm-up", width: 900 },
  { width: 600 },
];

export interface PagesMosaicProps {
  section: SectionPagesGridDto;
}

/**
 * Shows the cards of a section as poster tiles within the content width: every tile is the card image with its title
 * on a black bar, and the whole tile links to the page. Intros stay on the linked pages.
 * @param section Section whose cards fill the mosaic.
 */
export const PagesMosaic: FC<PagesMosaicProps> = ({ section }) => {
  return (
    <Box
      className="pages-mosaic"
      data-testid="pages-mosaic"
      sx={pagesMosaicStyles}
    >
      {section.cards?.map((card) => {
        const image = card.card_image || card.main_image;

        return (
          <Link key={card.id} to={card.url} className="mosaic-tile">
            {/* The title names the link, so the image is decorative here; a tile without image keeps its dark fill. */}
            {!!image && (
              <LazyPicture
                image={{ ...image, description: "", caption: undefined }}
                placeholder={false}
                className="tile-image"
                sizes={MOSAIC_TILE_IMAGE_SIZES}
              ></LazyPicture>
            )}

            <Typography variant="h3" component="span" className="tile-title">
              {parseHtml(card.title)}
            </Typography>
          </Link>
        );
      })}
    </Box>
  );
};
