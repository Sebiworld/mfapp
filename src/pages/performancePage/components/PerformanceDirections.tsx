import { FC, MouseEvent, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Popover,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { PerformanceLocationDto } from "@models/utility-types/performance-detail-dto.model";
import { parseHtml } from "@utils/functions/parseHtml";
import { getDirectionsUrl } from "../functions/getDirectionsUrl";
import { directionsPaperStyles } from "../performancePage.styles";

interface PerformanceDirectionsProps {
  location: PerformanceLocationDto | null;
}

/**
 * Button that opens the directions text of the location, with the route planner link when coordinates exist.
 * Shown as a popover; on narrow screens as a dialog so the text stays readable and closable.
 * @param location Location of the performance; nothing is rendered without `directions`.
 */
export const PerformanceDirections: FC<PerformanceDirectionsProps> = ({
  location,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  if (!location?.directions) {
    return null;
  }

  const routeUrl = getDirectionsUrl(location);
  const close = (): void => setAnchor(null);

  const content = (
    <Box className="directions-body">
      <Box className="directions-text" data-testid="visit-directions">
        {parseHtml(location.directions)}
      </Box>

      {routeUrl && (
        <Button
          className="route-button"
          variant="outlined"
          color="contrast"
          size="small"
          href={routeUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("performance.route")}
        </Button>
      )}
    </Box>
  );

  return (
    <>
      <Button
        className="directions-button"
        data-testid="directions-button"
        variant="outlined"
        color="contrast"
        aria-haspopup="dialog"
        aria-expanded={!!anchor}
        onClick={(event: MouseEvent<HTMLElement>) =>
          setAnchor(event.currentTarget)
        }
      >
        {t("performance.directions")}
      </Button>

      {isNarrow ? (
        <Dialog
          open={!!anchor}
          onClose={close}
          fullWidth
          maxWidth="sm"
          scroll="paper"
          aria-labelledby="directions-title"
          slotProps={{ paper: { sx: directionsPaperStyles } }}
        >
          <DialogTitle id="directions-title">
            {t("performance.directions")}
          </DialogTitle>

          <DialogContent>{content}</DialogContent>

          <DialogActions>
            <Button onClick={close} color="contrast">
              {t("performance.close")}
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Popover
          open={!!anchor}
          anchorEl={anchor}
          onClose={close}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          slotProps={{
            paper: {
              className: "directions-popover",
              sx: directionsPaperStyles,
              "aria-label": t("performance.directions"),
            },
          }}
        >
          {content}
        </Popover>
      )}
    </>
  );
};
