import { mfLogoStyles } from "./mfLogo.styles";
import { useColorTheme } from "@utils/hooks/useColorTheme";
import { MfLogoHorizontal } from "./MfLogoHorizontal";
import { MfLogoVertical } from "./MfLogoVertical";
import { Box } from "@mui/material";

export interface MfLogoProps {
  layout?: "horizontal" | "vertical";
  color?: "light" | "dark";
}

export const MfLogo = ({ layout = "horizontal", color }: MfLogoProps) => {
  const theme = useColorTheme();

  return (
    <Box className={`mf-logo theme-${color ?? theme}`} sx={mfLogoStyles}>
      {layout === "horizontal" ? (
        <MfLogoHorizontal></MfLogoHorizontal>
      ) : (
        <MfLogoVertical></MfLogoVertical>
      )}
    </Box>
  );
};
