import { IconButton, Stack, useColorScheme } from "@mui/joy";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import React from "react";
import { useColorScheme as useMaterialColorScheme } from "@mui/material/styles";

export default function ThemeSelect() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  const { setMode: setMaterialMode } = useMaterialColorScheme();

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <IconButton
      variant="plain"
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
        setMaterialMode(mode === "light" ? "dark" : "light");
      }}
      sx={{
        ".hover-container": {
          display: "none",
        },
        "&:hover": {
          ".hover-container": {
            display: "inline-block",
          },
        },
      }}
    >
      {mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
      <Stack className="hover-container">
        {" "}
        <TrendingFlatIcon></TrendingFlatIcon>{" "}
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </Stack>
    </IconButton>
  );
}
