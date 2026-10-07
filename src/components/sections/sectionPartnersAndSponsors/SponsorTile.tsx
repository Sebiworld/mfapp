import { SponsorsItemDto } from "@models/section/section-partners-and-sponsors-dto.model";
import { Box, Card } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { LazyPictureSize } from "@components/lazyPicture/components/LazyPictureWithoutFallback";

/** Sponsor tiles are at most 178px wide at every breakpoint. */
const SPONSOR_IMAGE_SIZES: LazyPictureSize[] = [{ width: 200 }];

/** How long a tapped logo keeps its original colours. */
export const SPONSOR_REVEAL_MS = 4000;

/** Accessible name for a sponsor without title or image description. */
const SPONSOR_FALLBACK_NAME = "Förderer-Logo";

export interface SponsorTileProps {
  sponsor: SponsorsItemDto;
}

/**
 * A sponsor logo in grey. Tapping the tile (or Enter/Space) shows the original colours for a few seconds;
 * activating it again switches back at once. Mouse hover is handled by the styles.
 */
export const SponsorTile: React.FC<SponsorTileProps> = ({ sponsor }) => {
  const [revealed, setRevealed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const clearTimer = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = undefined;
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const toggle = useCallback(() => {
    clearTimer();

    if (revealed) {
      setRevealed(false);
      return;
    }

    setRevealed(true);
    timer.current = setTimeout(() => {
      timer.current = undefined;
      setRevealed(false);
    }, SPONSOR_REVEAL_MS);
  }, [revealed, clearTimer]);

  return (
    <Box
      className={`list-item sponsor partner aspect-ratio ar-1-1${revealed ? " revealed" : ""}`}
    >
      <Card
        component="button"
        type="button"
        variant="outlined"
        className="item-wrapper ar-content"
        aria-pressed={revealed}
        aria-label={
          sponsor.title || sponsor.image?.description || SPONSOR_FALLBACK_NAME
        }
        onClick={toggle}
      >
        <Box className="item-content">
          {!!sponsor.image && (
            <LazyPicture
              image={sponsor.image}
              sizes={SPONSOR_IMAGE_SIZES}
            ></LazyPicture>
          )}
        </Box>
      </Card>
    </Box>
  );
};
