import { GlobalStyles } from "@mui/joy";
import { globalFontsStyles } from "./fonts.styles";
import { globalContentStyles } from "./content.styles";
import { globalVariablesStyles } from "./variables.styles";
import { toastifyStyles } from "./vendors/toastify.styles";
import { useGlobalStore } from "@src/store/global.store";
import { selectGlobalCss } from "@src/store/settings.store";
import { useMemo } from "react";

export const GlobalStylesElement = () => {
  const globalCss = useGlobalStore(selectGlobalCss);

  const styles = useMemo(() => {
    const output = [
      ...globalVariablesStyles,
      ...globalContentStyles,
      ...globalFontsStyles,
      ...toastifyStyles,
    ];

    // Add global Css variables if set:
    if (globalCss) {
      output.push({ ":root": globalCss });
    }

    return output;
  }, [globalCss]);

  return <GlobalStyles styles={styles} />;
};
