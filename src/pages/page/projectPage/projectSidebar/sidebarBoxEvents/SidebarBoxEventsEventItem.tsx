import { formatDate } from "@utils/functions/formatDate";
import { PerformanceDto } from "@models/utility-types/performance-dto.model";
import { Box, Chip, Typography } from "@mui/material";

export interface SidebarBoxEventsEventItemProps {
  item: PerformanceDto;
  onClose?: () => void;
}

export const SidebarBoxEventsEventItem: React.FC<
  SidebarBoxEventsEventItemProps
> = ({ item }) => {
  return (
    <Box className="event-item" data-testid="event-item">
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
        {`${formatDate(item.timestamp * 1000, "EEEE, P - p")}`}
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
