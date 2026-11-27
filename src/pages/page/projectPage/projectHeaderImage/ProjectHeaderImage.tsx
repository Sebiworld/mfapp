import {
  ComponentType,
  lazy,
  LazyExoticComponent,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box } from "@mui/material";
import { Link } from "react-router";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { LazyPictureSize } from "@components/lazyPicture/components/LazyPictureWithoutFallback";
import { ProjectDetailsDto } from "@models/project-dto.model";
import { usePlayOncePerSession } from "@utils/hooks/usePlayOncePerSession";
import {
  PROJECT_HEADER_ANIMATIONS,
  ProjectHeaderAnimationLoader,
  ProjectHeaderAnimationProps,
} from "./projectHeaderAnimations";
import { projectHeaderImageStyles } from "./projectHeaderImage.styles";

/** The project header image spans the viewport up to the 1600px content limit; widest first. */
const PROJECT_IMAGE_SIZES: LazyPictureSize[] = [
  { media: "xl-up", width: 1600 },
  { media: "lg-up", width: 1536 },
  { media: "md-up", width: 1200 },
  { media: "sm-up", width: 900 },
  { width: 600 },
];

/** The header image is the largest visible element on load, so it must not wait for lazy loading. */
const PROJECT_IMAGE_PROPS = {
  loading: "eager",
  fetchPriority: "high",
} as const;

type LazyHeaderAnimation = LazyExoticComponent<
  ComponentType<ProjectHeaderAnimationProps>
>;

/**
 * Stands in for an animation module that failed to load: ends at once, so the header shows the plain image.
 * @param props `onEnd` of the header; the project is not used.
 * @returns Nothing visible.
 */
const EndAtOnce: React.FC<ProjectHeaderAnimationProps> = ({ onEnd }) => {
  useEffect(() => {
    onEnd();
  }, [onEnd]);

  return null;
};

/**
 * Wraps a loader into a lazy component that ends at once when the module fails to load.
 * @param load Loader of the animation module.
 * @returns The lazy component.
 */
const toLazyAnimation = (
  load: ProjectHeaderAnimationLoader
): LazyHeaderAnimation =>
  lazy(async () => {
    try {
      return await load();
    } catch {
      return { default: EndAtOnce };
    }
  });

/** One lazy component per project name, created once, so a remount neither loads nor mounts the module anew. */
const LAZY_ANIMATIONS = new Map<string, LazyHeaderAnimation>(
  Object.entries(PROJECT_HEADER_ANIMATIONS).map(([name, load]) => [
    name,
    toLazyAnimation(load),
  ])
);

export interface ProjectHeaderImageProps {
  project: ProjectDetailsDto;
  /** Accessible name of the link; the image link has no text of its own. */
  label?: string;
}

/**
 * Project header image linking to the project start page. Once per project and session, after the splash and once
 * the image has loaded, a stage light in the project colour sweeps across it (or the project's own animation
 * plays). The image itself is never hidden or delayed, so it stays the largest element on load and the final state.
 * @param props Project and link label, see `ProjectHeaderImageProps`.
 * @returns The header link.
 */
export const ProjectHeaderImage: React.FC<ProjectHeaderImageProps> = ({
  project,
  label,
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const motionKey = String(project.id);
  const [loadedKey, setLoadedKey] = useState<string>();

  useEffect(() => {
    const link = linkRef.current;

    if (!link) {
      return;
    }

    // A failed image counts as settled too: the light must not wait for it for ever.
    const onSettled = (event: Event): void => {
      if (event.target instanceof HTMLImageElement) {
        setLoadedKey(motionKey);
      }
    };

    // Capture phase: `load` does not bubble, and the image element may be replaced (secure image fallback).
    link.addEventListener("load", onSettled, true);
    link.addEventListener("error", onSettled, true);

    if (link.querySelector("img")?.complete) {
      setLoadedKey(motionKey);
    }

    return () => {
      link.removeEventListener("load", onSettled, true);
      link.removeEventListener("error", onSettled, true);
    };
  }, [motionKey]);

  const { phase, isPaused, onAnimationEnd } = usePlayOncePerSession({
    scope: "project-header",
    key: motionKey,
    targetRef: linkRef,
    isReady: loadedKey === motionKey,
    waitForIdle: true,
  });

  // A Map lookup, so a name like "constructor" does not pick up a prototype member.
  const CustomAnimation = LAZY_ANIMATIONS.get(project.name);

  const classes = ["main-image", "aspect-ratio", "ar-3-1"];

  if (phase !== "static" && !CustomAnimation) {
    classes.push("with-light");
  }

  if (phase === "armed") {
    classes.push("is-armed");
  }

  if (phase === "playing") {
    classes.push("is-playing");
  }

  if (isPaused) {
    classes.push("is-paused");
  }

  return (
    <Box
      ref={linkRef}
      className={classes.join(" ")}
      component={Link}
      to={project.url}
      aria-label={label}
      sx={projectHeaderImageStyles}
    >
      <LazyPicture
        image={project.main_image}
        className="ar-content"
        sizes={PROJECT_IMAGE_SIZES}
        imageProps={PROJECT_IMAGE_PROPS}
      ></LazyPicture>

      {phase !== "static" && !CustomAnimation && (
        <Box
          className="header-motion header-light"
          aria-hidden="true"
          onAnimationEnd={(event) => {
            // The light is drawn by the layer's own pseudo element, whose events target the layer.
            if (event.target === event.currentTarget) {
              onAnimationEnd();
            }
          }}
        />
      )}

      {phase === "playing" && CustomAnimation && (
        <Box className="header-motion header-custom" aria-hidden="true">
          <Suspense fallback={null}>
            {/* Taken from a map built once per module, so the same name always yields the same component. */}
            {/* eslint-disable-next-line react-hooks/static-components */}
            <CustomAnimation project={project} onEnd={onAnimationEnd} />
          </Suspense>
        </Box>
      )}
    </Box>
  );
};
