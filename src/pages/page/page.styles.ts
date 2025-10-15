import { SxProps } from "@mui/material";

export const pageStyles: SxProps = {
  position: "relative",
  minHeight: "600px",

  "&.template-project_role, &.template-project_roles_container, &.template-articles_container":
    {
      ".page-title": {
        textAlign: "center",

        "&:last-child": {
          marginBottom: "-8px",
        },
      },
    },

  ".alert": {
    // width: 400,
    mx: "auto",
    marginY: "128px",
  },
};
