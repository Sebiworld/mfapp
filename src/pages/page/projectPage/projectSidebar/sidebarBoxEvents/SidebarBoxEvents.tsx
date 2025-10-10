import { ProjectEventsData } from "@models/project-dto.model";
import { useTranslation } from "react-i18next";
import { isValidArray } from "@utils/functions/isValidArray";
import { sidebarBoxEventsStyles } from "./sidebarBoxEvents.styles";
import { useMemo } from "react";
import { PerformanceDto } from "@models/utility-types/performance-dto.model";
import { useCurrentDate } from "@utils/hooks/useCurrentDate";
import { Box, Button, Typography } from "@mui/material";
import { SidebarBoxEventsEventItem } from "./SidebarBoxEventsEventItem";
import { Link } from "react-router";

export interface SidebarBoxEventsProps {
  data?: ProjectEventsData;
}

export const SidebarBoxEvents: React.FC<SidebarBoxEventsProps> = ({ data }) => {
  const { t } = useTranslation();
  const currentDate = useCurrentDate(1000 * 60);

  const sortedPerformances = useMemo(() => {
    const output: {
      past: PerformanceDto[];
      future: PerformanceDto[];
    } = {
      past: [],
      future: [],
    };

    if (!isValidArray(data?.performances) || !data.performances.length) {
      return output;
    }

    for (const performance of data.performances) {
      if (performance.timestamp * 1000 > currentDate.getTime()) {
        output.future.push(performance);
      } else {
        output.past.push(performance);
      }
    }

    return output;
  }, [data?.performances, currentDate]);

  if (!isValidArray(data?.performances) || !data.performances.length) {
    return null;
  }

  return (
    <Box
      className="sidebar-box sidebar-box-events"
      data-testid="sidebar-box-events"
      sx={sidebarBoxEventsStyles}
    >
      <Typography className="box-title" variant="h3">
        {t("project.events.title")}
      </Typography>

      <Box className="lists-wrapper">
        {!!sortedPerformances.future?.length && (
          <Box component="section" className="events-section future">
            <Box className="events-container">
              {sortedPerformances.future.map((item) => (
                <SidebarBoxEventsEventItem key={item.id} item={item} />
              ))}
            </Box>

            {data.ticket_page?.url && (
              <Button
                color="contrast"
                component={Link}
                to={data.ticket_page.url}
              >
                {t("project.events.get-tickets")}
              </Button>
            )}
          </Box>
        )}

        {!!sortedPerformances.past?.length && (
          <Box component="section" className="events-section past">
            <Typography variant="bodyXS" className="description">
              {t("project.events.already-passed")}:
            </Typography>

            <Box className="events-container ">
              {sortedPerformances.past.map((item) => (
                <SidebarBoxEventsEventItem key={item.id} item={item} />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
