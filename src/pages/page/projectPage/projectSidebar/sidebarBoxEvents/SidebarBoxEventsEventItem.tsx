import { formatBerlinDate } from "@utils/functions/formatBerlinDate";
import { getPerformanceUrl } from "@utils/functions/getPerformanceUrl";
import { PerformanceDto } from "@models/utility-types/performance-dto.model";
import { Box, Chip, Typography } from "@mui/material";
import { Link } from "react-router";

export interface SidebarBoxEventsEventItemProps {
  item: PerformanceDto;
  projectUrl?: string;
  onClose?: () => void;
}

export const SidebarBoxEventsEventItem: React.FC<
  SidebarBoxEventsEventItemProps
> = ({ item, projectUrl, onClose }) => {
  const linkProps = projectUrl
    ? {
        component: Link,
        to: getPerformanceUrl(projectUrl, item.id),
        onClick: onClose,
      }
    : {};

  return (
    <Box className="event-item" data-testid="event-item" {...linkProps}>
      <Box className="seasons-container">
        {item.seasons?.map((season) => (
          <Chip
            key={season.id}
            className="season"
            label={season.title}
            color="contrast"
            size="small"
          />
        ))}
      </Box>

      <Typography className="date" title={item.title}>
        {formatBerlinDate(item.timestamp)}
      </Typography>

      <Box className="casts-container">
        {item.casts?.map((cast) => (
          <Chip
            key={cast.id}
            className="cast"
            label={cast.title}
            size="small"
          ></Chip>
        ))}
      </Box>
    </Box>
  );
};
