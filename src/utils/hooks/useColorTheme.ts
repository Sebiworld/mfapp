import { useColorScheme } from "@mui/material";

export const useColorTheme = () => {
  const { mode, systemMode } = useColorScheme();

  return (mode !== "system" ? mode : systemMode) || "light";
};
