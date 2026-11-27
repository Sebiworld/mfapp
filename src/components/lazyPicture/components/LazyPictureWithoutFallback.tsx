import { ImageDto } from "@models/image-dto.model";
import {
  ComponentPropsWithoutRef,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Box } from "@mui/material";
import React from "react";
import { getMimetypeForExtension } from "@utils/functions/mimetype/getMimetypeForExtension";
import { isValidArray } from "@utils/functions/isValidArray";
import { uniqBy } from "lodash";
import { lazyPictureWithoutFallbackStyles } from "./lazyPictureWithoutFallback.styles";
import { mediaPlaceholders } from "../mediaPlaceholders";
import { LazyPictureSecureWithoutFallback } from "./LazyPictureSecureWithoutFallback";
import { getImageFileUrl } from "../getImageFileUrl";
import { capImageSize } from "../capImageSize";
import { usePageUnlockKey } from "@src/context/pageUnlock/PageUnlockContext";
import { useReducedMotion } from "@utils/hooks/useReducedMotion";

export interface LazyPictureSize {
  media?: string;
  width?: number;
  height?: number;
}

export interface LazyPictureWithoutFallbackProps {
  image?: ImageDto;
  pictureProps?: Partial<
    ComponentPropsWithoutRef<"picture"> & { [key: string]: unknown }
  >;
  imageProps?: Partial<
    ComponentPropsWithoutRef<"img"> & { [key: string]: unknown }
  >;
  sizes?: LazyPictureSize[];
  defaultSize?: LazyPictureSize;
  className?: string;
  children?: React.ReactNode;
}

/** Fade of a lazy image: `fading` hides it until it has loaded, `loaded` fades it in. */
type ImageFade = "none" | "fading" | "loaded";

const FADE_CLASSES: Record<ImageFade, string | undefined> = {
  none: undefined,
  fading: "is-fading-in",
  loaded: "is-loaded",
};

/**
 * Picture with WebP and original sources per size, loading lazily unless the caller overrides `loading`. A lazy image
 * that is not loaded yet and lies below the visible area when it mounts fades in once it has loaded; eager images,
 * images already in view (they may be the LCP), cached images and reduced motion show at once.
 * @param props.image Image to show; renders nothing without a basename.
 * @param props.pictureProps Props for the `picture` element.
 * @param props.imageProps Props for the `img` element; its `onLoad`/`onError` run besides the own handlers.
 * @param props.sizes Widths per media query.
 * @param props.defaultSize Size of the fallback image; otherwise the size without media query.
 * @param props.className Class of the `picture` element.
 * @param props.children Rendered before the image inside the `picture`.
 * @returns The picture, or the secure variant after a secure image failed to load.
 */
export const LazyPictureWithoutFallback: React.FC<
  LazyPictureWithoutFallbackProps
> = ({
  image,
  pictureProps,
  imageProps,
  sizes,
  defaultSize,
  className,
  children,
}) => {
  const [hasError, setHasError] = useState(false);
  const unlockKey = usePageUnlockKey();
  const isReducedMotion = useReducedMotion();
  const imageRef = useRef<HTMLImageElement>(null);
  const [fade, setFade] = useState<ImageFade>("none");

  const {
    onLoad: onImageLoad,
    onError: onImageError,
    className: imageClassName,
    ...otherImageProps
  } = imageProps ?? {};
  const fadesIn =
    (imageProps?.loading ?? "lazy") === "lazy" && !isReducedMotion;

  // Before the first paint: an image hidden only after it was painted would flicker. Images already in view stay
  // visible: a fade would delay what the visitor is waiting for.
  useLayoutEffect(() => {
    const element = imageRef.current;

    if (
      fadesIn &&
      element &&
      !element.complete &&
      element.getBoundingClientRect().top >= window.innerHeight
    ) {
      setFade("fading");
    }
  }, [fadesIn]);

  const sources = useMemo(() => {
    if (
      !image?.basename ||
      !sizes ||
      !isValidArray(sizes) ||
      image.ext === "svg"
    ) {
      return;
    }

    return uniqBy(sizes, "media").map((size) => {
      const size1x = capImageSize(image, size, 1);
      const size2x = capImageSize(image, size, 2);
      const has2x =
        size2x.width !== size1x.width || size2x.height !== size1x.height;

      const urlWebp = getImageFileUrl(
        image,
        { ...size1x, webp: true },
        unlockKey
      );
      const urlWebp2x = getImageFileUrl(
        image,
        { ...size2x, webp: true },
        unlockKey
      );
      const url = getImageFileUrl(image, size1x, unlockKey);
      const url2x = getImageFileUrl(image, size2x, unlockKey);

      const media = size.media
        ? (mediaPlaceholders[size.media] ?? size.media)
        : undefined;

      return (
        <React.Fragment key={size.media || "default"}>
          <source
            media={media}
            srcSet={has2x ? `${urlWebp} 1x, ${urlWebp2x} 2x` : urlWebp}
            type="image/webp"
          />
          <source
            media={media}
            srcSet={has2x ? `${url} 1x, ${url2x} 2x` : url}
            type={getMimetypeForExtension(image.ext)}
          />
        </React.Fragment>
      );
    });
  }, [image, sizes, unlockKey]);

  const fileUrl = useMemo((): string | undefined => {
    if (!image?.basename) {
      return;
    }

    const sizeWithoutMedia = sizes?.find((size) => !size.media);

    const width = defaultSize ? defaultSize?.width : sizeWithoutMedia?.width;
    const height = defaultSize ? defaultSize?.height : sizeWithoutMedia?.height;

    return getImageFileUrl(
      image,
      { ...capImageSize(image, { width, height }, 1) },
      unlockKey
    );
  }, [defaultSize, image, sizes, unlockKey]);

  if (!image?.basename) {
    return;
  }

  if (hasError && image?.secure) {
    return (
      <LazyPictureSecureWithoutFallback
        image={image}
        pictureProps={pictureProps}
        imageProps={imageProps}
        sizes={sizes}
        defaultSize={defaultSize}
        className={className}
        children={children}
      />
    );
  }

  return (
    <Box
      component="picture"
      className={className}
      {...pictureProps}
      sx={lazyPictureWithoutFallbackStyles}
    >
      {sources}
      {children}

      <img
        alt={image.description ?? ""}
        src={fileUrl}
        width={image.width}
        height={image.height}
        loading="lazy"
        {...otherImageProps}
        ref={imageRef}
        className={
          [imageClassName, FADE_CLASSES[fade]].filter(Boolean).join(" ") ||
          undefined
        }
        onLoad={(event) => {
          setHasError(false);
          setFade((current) => (current === "fading" ? "loaded" : current));
          onImageLoad?.(event);
        }}
        onError={(event) => {
          setHasError(true);
          // A broken image shows its alternative text instead of staying hidden.
          setFade("none");
          onImageError?.(event);
        }}
      />
    </Box>
  );
};
