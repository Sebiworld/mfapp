import { MFApi } from '@api/api';
import { ImageDto } from '@models/image-dto.model';
import { Box } from '@mui/joy';
import { lazyPictureStyles } from './lazyPicture.styles';
import { ComponentPropsWithoutRef } from 'react';

export interface LazyPictureProps {
  image: ImageDto;
  pictureProps?: Partial<ComponentPropsWithoutRef<'picture'> & { [key: string]: unknown }>;
  imageProps?: Partial<ComponentPropsWithoutRef<'img'> & { [key: string]: unknown }>;
}

export const LazyPicture: React.FC<LazyPictureProps> = ({ image, pictureProps, imageProps }) => {
  if (!image?.basename) {
    return;
  }

  const fileUrl = MFApi.getFileByIdUrl(image.page_id, { file: image.basename });

  return (
    <Box component="picture" className="lazy-picture" sx={lazyPictureStyles} {...pictureProps}>
      <img
        alt={image.description}
        src={fileUrl}
        width={image.width}
        height={image.height}
        {...imageProps}
        // src="https://www.musical-fabrik.de/site/assets/files/5359/medicus-ensemble-bg.1000x500.jpg"
      />
      {/* <img alt="" src="https://www.musical-fabrik.de/site/assets/files/5359/medicus-ensemble-bg.600x0.jpg"></img> */}
    </Box>
  );
};

{
  /* <picture class="img-fluid">
    <source media="(max-width: 500px)" srcset="/site/assets/files/5359/medicus-ensemble-bg.500x350.webp 1x, /site/assets/files/5359/medicus-ensemble-bg.1000x700.webp 2x" data-srcset="/site/assets/files/5359/medicus-ensemble-bg.500x350.webp 1x, /site/assets/files/5359/medicus-ensemble-bg.1000x700.webp 2x" type="image/webp">
    <source media="(max-width: 500px)" srcset="/site/assets/files/5359/medicus-ensemble-bg.500x350.jpg 1x, /site/assets/files/5359/medicus-ensemble-bg.1000x700.jpg 2x" data-srcset="/site/assets/files/5359/medicus-ensemble-bg.500x350.jpg 1x, /site/assets/files/5359/medicus-ensemble-bg.1000x700.jpg 2x" type="image/jpeg">
    <source media="(min-width: 1100px)" srcset="/site/assets/files/5359/medicus-ensemble-bg.1100x400.webp 1x, /site/assets/files/5359/medicus-ensemble-bg.2200x800.webp 2x" data-srcset="/site/assets/files/5359/medicus-ensemble-bg.1100x400.webp 1x, /site/assets/files/5359/medicus-ensemble-bg.2200x800.webp 2x" type="image/webp">
    <source media="(min-width: 1100px)" srcset="/site/assets/files/5359/medicus-ensemble-bg.1100x400.jpg 1x, /site/assets/files/5359/medicus-ensemble-bg.2200x800.jpg 2x" data-srcset="/site/assets/files/5359/medicus-ensemble-bg.1100x400.jpg 1x, /site/assets/files/5359/medicus-ensemble-bg.2200x800.jpg 2x" type="image/jpeg">
    <source srcset="/site/assets/files/5359/medicus-ensemble-bg.1000x500.webp 1x, /site/assets/files/5359/medicus-ensemble-bg.2000x1000.webp 2x" data-srcset="/site/assets/files/5359/medicus-ensemble-bg.1000x500.webp 1x, /site/assets/files/5359/medicus-ensemble-bg.2000x1000.webp 2x" type="image/webp">
    <source srcset="/site/assets/files/5359/medicus-ensemble-bg.1000x500.jpg 1x, /site/assets/files/5359/medicus-ensemble-bg.2000x1000.jpg 2x" data-srcset="/site/assets/files/5359/medicus-ensemble-bg.1000x500.jpg 1x, /site/assets/files/5359/medicus-ensemble-bg.2000x1000.jpg 2x" type="image/jpeg">
    <img alt="Musical-Fabrik Hero" data-src="/site/assets/files/5359/medicus-ensemble-bg.1000x500.jpg" src="/site/assets/files/5359/medicus-ensemble-bg.1000x500.jpg" class="lazy-image ls-is-cached lazyloaded">
  </picture> */
}
