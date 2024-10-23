import { Box } from "@mui/joy";
import { mfLogoStyles } from "./mfLogo.styles";
import { useColorTheme } from "@utils/hooks/useColorTheme";
import { MfLogoHorizontal } from "./MfLogoHorizontal";
import { MfLogoVertical } from "./MfLogoVertical";

export interface MfLogoProps {
  layout?: "horizontal" | "vertical";
}

export const MfLogo = ({ layout = "horizontal" }: MfLogoProps) => {
  const theme = useColorTheme();

  return (
    <Box className={`mf-logo theme-${theme}`} sx={mfLogoStyles}>
      {layout === "horizontal" ? (
        <MfLogoHorizontal></MfLogoHorizontal>
      ) : (
        <MfLogoVertical></MfLogoVertical>
      )}
    </Box>
  );
};
