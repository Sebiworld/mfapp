import { SxProps } from "@mui/material";

export const contentBlocksStyles: SxProps = {
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  gap: '16px',

  ".content-block": {
    position: "relative",
    // display: 'flex',
    // flexDirection: 'column',
    // flex: '1 1 auto',
    maxWidth: "100%",
    width: "38em",
    textAlign: "left",

    "&.content-form": {
      width: "100%",
    },

    "&.center": {
      textAlign: "center",
      marginLeft: "auto",
      marginRight: "auto",
    },

    p: {
      position: "relative",
      maxWidth: "100%",
      width: "38em",
      alignSelf: "center",

      "&:first-of-type": {
        marginTop: 0,
      }
    },
  },
};
