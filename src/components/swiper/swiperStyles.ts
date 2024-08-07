import { SxProps } from "@mui/joy/styles/types";

export const swiperStyles: SxProps = {
  'swiper-container': {
    // paddingX: '64px',
    '--swiper-navigation-sides-offset': '64px',
    '--swiper-navigation-color': 'var(--joy-palette-text-secondary, var(--joy-palette-neutral-700, #32383E))',
    // '--swiper-scrollbar-bg-color': 'red',
    '--swiper-scrollbar-drag-bg-color': 'var(--joy-palette-primary)',

    '&::part(button-prev), &::part(button-next)': {
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      padding: '8px'
    },

    '&::part(scrollbar)': {

    },
  }
};