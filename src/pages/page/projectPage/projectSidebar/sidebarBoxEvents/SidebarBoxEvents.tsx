import { ProjectEventsData } from "@models/project-dto.model";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardOverflow,
  Typography,
} from "@mui/joy";
import { useTranslation } from "react-i18next";
import { isValidArray } from "@utils/functions/isValidArray";
import { sidebarBoxEventsStyles } from "./sidebarBoxEvents.styles";
import { formatDate } from "@utils/functions/formatDate";
import { useMemo } from "react";
import { PerformanceDto } from "@models/utility-types/performance-dto.model";
import { useCurrentDate } from "@utils/hooks/useCurrentDate";
import { Link } from "@tanstack/react-router";

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
      <Typography className="box-title" level="h3">
        {t("project.events.title")}
      </Typography>

      <Box className="lists-wrapper">
        {!!sortedPerformances.future?.length && (
          <Box className="performances-wrapper future">
            <Box className="performances-container">
              {sortedPerformances.future.map((item) => {
                return (
                  <Card
                    key={item.id}
                    variant="outlined"
                    className="performance-card"
                  >
                    <CardContent>
                      <Typography className="season">
                        {item.seasons?.map((season) => season.title).join(", ")}
                      </Typography>

                      <Typography className="date">
                        {`${formatDate(item.timestamp * 1000, "EEEE, P - p")}`}
                      </Typography>
                    </CardContent>

                    <CardOverflow className="cast" variant="soft">
                      {item.casts?.map((cast) => cast.title).join(", ")}
                    </CardOverflow>
                  </Card>
                );
              })}
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
          <Box className="performances-wrapper past">
            <Typography level="body-xs" className="description">
              {t("project.events.already-passed")}:
            </Typography>

            <Box className="performances-container ">
              {sortedPerformances.past.map((item) => {
                return (
                  <Card
                    key={item.id}
                    variant="outlined"
                    className="performance-card"
                  >
                    <CardContent>
                      <Typography className="season">
                        {item.seasons?.map((season) => season.title).join(", ")}
                      </Typography>

                      <Typography className="date">
                        {`${formatDate(item.timestamp * 1000, "EEEE, P - p")}`}
                      </Typography>
                    </CardContent>

                    <CardOverflow className="cast" variant="soft">
                      {item.casts?.map((cast) => cast.title).join(", ")}
                    </CardOverflow>
                  </Card>
                );
              })}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
