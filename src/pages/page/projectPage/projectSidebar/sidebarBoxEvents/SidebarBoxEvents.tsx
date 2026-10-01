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
import { getNextPerformance } from "@utils/functions/getNextPerformance";

export interface SidebarBoxEventsProps {
  data?: ProjectEventsData;
  projectUrl?: string;
  showTitle?: boolean;
  onClose?: () => void;
}

export const SidebarBoxEvents: React.FC<SidebarBoxEventsProps> = ({
  data,
  projectUrl,
  showTitle,
  onClose,
}) => {
  const { t } = useTranslation();
  const currentDate = useCurrentDate(1000 * 60);

  // useEffect(() => {
  //   console.log("SidebarBoxEvents data:", data);
  // }, [data]);

  const nextPerformance = useMemo(
    () =>
      getNextPerformance(
        data?.performances ?? [],
        Math.floor(currentDate.getTime() / 1000)
      ),
    [data, currentDate]
  );

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
      // The next performance is shown in its own highlight above the list.
      if (performance.id === nextPerformance?.id) {
        continue;
      }

      if (performance.timestamp * 1000 > currentDate.getTime()) {
        output.future.push(performance);
      } else {
        output.past.push(performance);
      }
    }

    return output;
  }, [data, currentDate, nextPerformance]);

  if (!isValidArray(data?.performances) || !data.performances.length) {
    return null;
  }

  return (
    <Box
      className="sidebar-box sidebar-box-events"
      data-testid="sidebar-box-events"
      sx={sidebarBoxEventsStyles}
    >
      {showTitle !== false && (
        <Typography className="box-title" variant="h3">
          {t("project.events.title")}
        </Typography>
      )}

      <Box className="lists-wrapper">
        {nextPerformance && (
          <Box
            component="section"
            className="events-section next"
            data-testid="next-performance"
          >
            <Typography variant="bodyXS" className="description">
              {t("project.events.next-performance")}:
            </Typography>

            <SidebarBoxEventsEventItem
              item={nextPerformance}
              projectUrl={projectUrl}
              onClose={onClose}
            />
          </Box>
        )}

        {!!sortedPerformances.future?.length && (
          <Box component="section" className="events-section future">
            <Box className="events-container">
              {sortedPerformances.future.map((item) => (
                <SidebarBoxEventsEventItem
                  key={item.id}
                  item={item}
                  projectUrl={projectUrl}
                  onClose={onClose}
                />
              ))}
            </Box>

            {data.ticket_page?.url && (
              <Button
                variant="contained"
                color="contrast"
                component={Link}
                to={data.ticket_page.url}
                onClick={onClose}
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
                <SidebarBoxEventsEventItem
                  key={item.id}
                  item={item}
                  projectUrl={projectUrl}
                  onClose={onClose}
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
