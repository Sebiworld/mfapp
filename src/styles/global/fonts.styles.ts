import { Interpolation } from "@emotion/react";
import { Theme } from "@mui/joy";

// import '@assets/fonts/aileron/Aileron-Black.otf';
// import '@assets/fonts/aileron/Aileron-Black.ttf';
// import '@assets/fonts/aileron/Aileron-Black.svg';
// import '@assets/fonts/aileron/Aileron-Black.eot';
// import '@assets/fonts/aileron/Aileron-Black.woff';
// import '@assets/fonts/aileron/Aileron-Black.woff2';

const fontPath = './assets/fonts/';

export const globalFontsStyles: Interpolation<Theme>[] = [
  {
    '@font-face': {
      fontFamily: "Aileron",
      src: `local("Aileron"),
    url("${fontPath}aileron/Aileron-Bold.otf") format("opentype"),
    url("${fontPath}aileron/Aileron-Bold.ttf") format("truetype"),
    url("${fontPath}aileron/Aileron-Bold.svg") format("svg"),
    url("${fontPath}aileron/Aileron-Bold.eot") format("eot"),
    url("${fontPath}aileron/Aileron-Bold.woff") format("woff"),
    url("${fontPath}aileron/Aileron-Bold.woff2") format("woff2")`,
      fontWeight: 700,
      fontStyle: 'normal',
      fontDisplay: 'swap'
    }
  },
  {
    '@font-face': {
      fontFamily: "Aileron",
      src: `local("Aileron"),
    url("${fontPath}aileron/Aileron-Heavy.otf") format("opentype"),
    url("${fontPath}aileron/Aileron-Heavy.ttf") format("truetype"),
        url("${fontPath}aileron/Aileron-Heavy.svg") format("svg"),
        url("${fontPath}aileron/Aileron-Heavy.eot") format("eot"),
        url("${fontPath}aileron/Aileron-Heavy.woff") format("woff"),
        url("${fontPath}aileron/Aileron-Heavy.woff2") format("woff2")`,
      fontWeight: 800,
      fontStyle: 'normal',
      fontDisplay: 'swap'
    }
  },
  {
    '@font-face': {
      fontFamily: "Aileron",
      src: `local("Aileron"),
        url("${fontPath}aileron/Aileron-HeavyItalic.otf") format("opentype"),
        url("${fontPath}aileron/Aileron-HeavyItalic.ttf") format("truetype"),
        url("${fontPath}aileron/Aileron-HeavyItalic.svg") format("svg"),
        url("${fontPath}aileron/Aileron-HeavyItalic.eot") format("eot"),
        url("${fontPath}aileron/Aileron-HeavyItalic.woff") format("woff"),
        url("${fontPath}aileron/Aileron-HeavyItalic.woff2") format("woff2")`,
      fontWeight: 800,
      fontStyle: 'italic',
      fontDisplay: 'swap'
    }
  },
  {
    '@font-face': {
      fontFamily: "Aileron",
      src: `local("Aileron"),
        url("${fontPath}aileron/Aileron-Light.otf") format("opentype"),
        url("${fontPath}aileron/Aileron-Light.ttf") format("truetype"),
        url("${fontPath}aileron/Aileron-Light.svg") format("svg"),
        url("${fontPath}aileron/Aileron-Light.eot") format("eot"),
        url("${fontPath}aileron/Aileron-Light.woff") format("woff"),
        url("${fontPath}aileron/Aileron-Light.woff2") format("woff2")`,
      fontWeight: 400,
      fontStyle: 'normal',
      fontDisplay: 'swap'
    }
  },
  {
    '@font-face': {
      fontFamily: "Aileron",
      src: `local("Aileron"),
        url("${fontPath}aileron/Aileron-LightItalic.otf") format("opentype"),
        url("${fontPath}aileron/Aileron-LightItalic.ttf") format("truetype"),
        url("${fontPath}aileron/Aileron-LightItalic.svg") format("svg"),
        url("${fontPath}aileron/Aileron-LightItalic.eot") format("eot"),
        url("${fontPath}aileron/Aileron-LightItalic.woff") format("woff"),
        url("${fontPath}aileron/Aileron-LightItalic.woff2") format("woff2")`,
      fontWeight: 400,
      fontStyle: 'italic',
      fontDisplay: 'swap'
    }
  }
];