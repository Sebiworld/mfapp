import { useColorScheme } from "@mui/joy";

export const useColorTheme = () => {
  const { mode, systemMode } = useColorScheme();
  return (mode !== 'system' ? mode : systemMode) || 'light';
}