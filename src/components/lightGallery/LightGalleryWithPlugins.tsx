import LightGalleryElement, { LightGalleryProps } from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const PLUGINS = [lgThumbnail, lgZoom];

/**
 * The lightGallery element with the thumbnail and zoom plugins. Kept in its own module, so the library is only
 * loaded when a gallery is opened for the first time.
 * @param props lightGallery settings and event handlers.
 * @returns The lightGallery element.
 */
export const LightGalleryWithPlugins = (
  props: Omit<LightGalleryProps, "plugins">
) => <LightGalleryElement plugins={PLUGINS} {...props} />;
