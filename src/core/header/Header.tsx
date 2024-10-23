import { Box, IconButton, Sheet } from "@mui/joy";
import Menu from "@mui/icons-material/Menu";
import { headerStyles } from "./header.styles";
import { MfLogo } from "@components/mfLogo/MfLogo";
import { Link } from "@tanstack/react-router";

export interface HeaderState {
  color?: "default" | "dark" | "transparent" | "translucent";
}

export interface HeaderProps extends HeaderState {
  sidemenuOpen?: boolean;
  setSidemenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ setSidemenuOpen, color }: HeaderProps) => {
  return (
    <Sheet
      component="header"
      className={`color-${color || "default"}`}
      sx={headerStyles}
    >
      <Box component={Link} to="/" className="container-left">
        <MfLogo></MfLogo>
      </Box>

      <Box component="nav" className="container-middle"></Box>

      <Box component="nav" className="container-right">
        {setSidemenuOpen && (
          <IconButton
            variant="plain"
            color="neutral"
            onClick={() => setSidemenuOpen(true)}
          >
            <Menu />
          </IconButton>
        )}
      </Box>
    </Sheet>
  );
};
