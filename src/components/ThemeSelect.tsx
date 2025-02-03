import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import React from "react";
import { useColorScheme } from "@mui/material/styles";
import { IconButton, Stack } from "@mui/material";

export default function ThemeSelect() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

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
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
      sx={{
        ".hover-container": {
          display: "none",
        },
        "&:hover": {
          ".hover-container": {
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "center"
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
