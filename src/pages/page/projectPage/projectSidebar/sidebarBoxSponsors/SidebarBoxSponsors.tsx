import { Box, Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { isValidArray } from "@utils/functions/isValidArray";
import { sidebarBoxSponsorsStyles } from "./sidebarBoxSponsors.styles";
import { SponsorDto } from "@models/utility-types/sponsor-dto.model";

export interface SidebarBoxSponsorsProps {
  data?: SponsorDto[];
  type?: string;
}

export const SidebarBoxSponsors: React.FC<SidebarBoxSponsorsProps> = ({
  data,
  type = "sponsors",
}) => {
  const { t } = useTranslation();

  if (!isValidArray(data) || !data.length) {
    return null;
  }

  return (
    <Box
      className={`sidebar-box sidebar-box-${type}`}
      data-testid={`sidebar-box-${type}`}
      sx={sidebarBoxSponsorsStyles}
    >
      <Typography className="box-title" level="h3">
        {t(`project.${type}`)}
      </Typography>

      <Box className="list-container">
        {data.map((item, index, all) => {
          let text = item.title;

          if (index + 1 < all.length) {
            text += ", ";
          }

          return (
            <span
              key={item.id}
              dangerouslySetInnerHTML={{ __html: text }}
            ></span>
          );
        })}
      </Box>
    </Box>
  );
};
