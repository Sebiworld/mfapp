import { globalFontsStyles } from "./fonts.styles";
import { globalContentStyles } from "./content.styles";
import { globalVariablesStyles } from "./variables.styles";
import { toastifyStyles } from "./vendors/toastify.styles";
import { useGlobalStore } from "@src/store/global.store";
import { selectGlobalCss } from "@src/store/configuration/configuration.selectors";
import { useMemo } from "react";
import { GlobalStyles, Interpolation, Theme } from "@mui/material";
import { globalAspectRatioStyles } from "./aspect-ratio.styles";
import { lightgalleryStyles } from "./vendors/lightgallery.styles";
import "react-virtualized/styles.css";

export const GlobalStylesElement = () => {
  const globalCss = useGlobalStore(selectGlobalCss);

  const styles = useMemo(() => {
    const output: Interpolation<Theme> = [
      ...globalVariablesStyles,
      ...globalContentStyles,
      ...globalFontsStyles,
      ...globalAspectRatioStyles,
      ...toastifyStyles,
      ...lightgalleryStyles,

      // Add global Css variables if set:
      globalCss ? { ":root": globalCss } : {},
    ];

    return output;
  }, [globalCss]);

  return <GlobalStyles styles={styles} />;
};
