import { FC, ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PerformanceDetailDto } from "@models/utility-types/performance-detail-dto.model";
import { formatBerlinTime } from "@utils/functions/formatBerlinTime";
import { parseHtml } from "@utils/functions/parseHtml";
import { getAdmissionTimestamp } from "../functions/getPerformanceTimes";

interface PerformanceVisitInfoProps {
  performance: PerformanceDetailDto;
}

interface VisitBlockProps {
  title: string;
  children: ReactNode;
}

const VisitBlock: FC<VisitBlockProps> = ({ title, children }) => (
  <Box className="visit-block">
    <Typography variant="h6" component="h3">
      {title}
    </Typography>

    {children}
  </Box>
);

/**
 * Shows everything a visitor needs to know: admission, location, accessibility and notes.
 * Blocks without data are left out, including the section heading when nothing is left.
 * @param performance The performance to describe.
 */
export const PerformanceVisitInfo: FC<PerformanceVisitInfoProps> = ({
  performance,
}) => {
  const { t } = useTranslation();
  const { location } = performance;

  const admission = getAdmissionTimestamp(performance);

  const facts: { label: string; value: string }[] = [];

  if (admission !== null) {
    facts.push({
      label: t("performance.admission"),
      value: t("performance.time-suffix", {
        time: formatBerlinTime(admission),
      }),
    });
  }

  const hasLocation = !!(location && (location.title || location.address));
  const hasContent =
    facts.length > 0 ||
    hasLocation ||
    !!location?.accessibility_info ||
    !!performance.visitor_info ||
    !!performance.description;

  if (!hasContent) {
    return null;
  }

  return (
    <Box
      component="section"
      className="performance-visit"
      data-testid="performance-visit"
    >
      <Typography variant="h4" component="h2">
        {t("performance.visit")}
      </Typography>

      {facts.length > 0 && (
        <Box component="dl" className="visit-facts" data-testid="visit-facts">
          {facts.map((fact) => (
            <Box className="visit-fact" key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </Box>
          ))}
        </Box>
      )}

      {hasLocation && location && (
        <VisitBlock title={t("performance.location")}>
          <Box className="visit-text" data-testid="visit-location">
            {location.title && !location.address?.includes(location.title) && (
              <Typography className="location-title">
                {location.title}
              </Typography>
            )}

            {location.address && parseHtml(location.address)}
          </Box>
        </VisitBlock>
      )}

      {location?.accessibility_info && (
        <VisitBlock title={t("performance.accessibility")}>
          <Box className="visit-text" data-testid="visit-accessibility">
            {parseHtml(location.accessibility_info)}
          </Box>
        </VisitBlock>
      )}

      {performance.visitor_info && (
        <VisitBlock title={t("performance.visitor-info")}>
          <Box className="visit-text" data-testid="visit-visitor-info">
            {parseHtml(performance.visitor_info)}
          </Box>
        </VisitBlock>
      )}

      {performance.description && (
        <VisitBlock title={t("performance.special")}>
          <Box className="visit-text" data-testid="visit-description">
            {parseHtml(performance.description)}
          </Box>
        </VisitBlock>
      )}
    </Box>
  );
};
