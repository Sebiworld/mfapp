import { SxProps } from "@mui/material";

export const effectMaterialStyles: SxProps = {

  '.slider-wrapper': {
    // height: '500px',
    '--swiper-material-scale': 10,
    '--swiper-material-slide-size': '400px',
    '--swiper-material-slide-border-radius': '16px',

    'swiper-container': {
      position: 'relative',
      display: 'block',
      height: 'var(--swiper-material-slide-size)',
      width: 'calc(100% - 32px)',
      maxWidth: 'calc(var(--swiper-material-slide-size) * 2)',

      '.lazy-picture img': {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        borderRadius: 'var(--swiper-material-slide-border-radius)'
      },

      '.slide-label': {
        position: 'absolute',
        color: '#fff',
        left: 0,
        bottom: 0,
        width: '100%',
        height: '50%',
        boxSizing: 'border-box',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        fontWeight: '500',
        justifyContent: 'flex-end',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        textShadow: '0px 0px 5px rgba(0, 0, 0, .25)',
        backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .2) 50%)'
      },

      '.swiper-material-wrapper': {
        borderRadius: 'var(--swiper-material-slide-border-radius)',
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        boxSzing: 'border-box',
        pointerEvents: 'auto',
        // height: 'var(--swiper-material-slide-size)'
      },

      '.swiper-material-content': {
        position: 'absolute',
        transform: 'translate3d(0, 0, 0)',
        fontSize: '18px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },

      '&.swiper-horizontal .swiper-material-content': {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },

      '&.swiper-vertical .swiper-material-content': {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }
    }
  }
}