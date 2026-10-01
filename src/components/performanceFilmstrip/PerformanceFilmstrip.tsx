import {
  CSSProperties,
  FC,
  FocusEvent,
  KeyboardEvent,
  memo,
  PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { getSeparableTitle } from "@utils/functions/getSeparableTitle";
import { parseHtml } from "@utils/functions/parseHtml";
import { FilmstripItem } from "./functions/collectFilmstripItems";
import { performanceFilmstripStyles } from "./performanceFilmstrip.styles";

/** Fewer people than this would leave a gap in the running band, so the list is repeated up to it. */
const MIN_BAND_ITEMS = 8;
const SECONDS_PER_ITEM = 3;
const PLACEHOLDER = "/img/portrait-single/portrait-placeholder-single-5.jpg";
const REACHABLE_SELECTOR = '[data-reachable="true"]';

/**
 * Reads how far the running band is currently shifted.
 * @param track The moving element.
 * @returns Horizontal shift in pixels; 0 when it cannot be read.
 */
const readTrackShift = (track: HTMLElement): number => {
  const transform = getComputedStyle(track).transform;

  if (
    !transform ||
    transform === "none" ||
    typeof DOMMatrixReadOnly === "undefined"
  ) {
    return 0;
  }

  return new DOMMatrixReadOnly(transform).m41;
};

interface FilmstripTileProps {
  item: FilmstripItem;
  isActive: boolean;
  /** True for the copies that only close the loop; they are hidden from assistive technology and focus. */
  isCopy: boolean;
  /** True for the one tile that takes part in the tab order; the others are reached with the arrow keys. */
  isTabStop: boolean;
  /** True while the tile has keyboard focus, so its caption is shown. */
  isFocused: boolean;
  onToggle: () => void;
}

const FilmstripTile: FC<FilmstripTileProps> = ({
  item,
  isActive,
  isCopy,
  isTabStop,
  isFocused,
  onToggle,
}) => (
  <Box
    component="button"
    type="button"
    className={`filmstrip-tile${isActive ? " is-active" : ""}${isFocused ? " is-focused" : ""}`}
    data-testid="filmstrip-tile"
    data-reachable={isCopy ? undefined : "true"}
    data-item-key={item.key}
    tabIndex={!isCopy && isTabStop ? 0 : -1}
    aria-pressed={isCopy ? undefined : isActive}
    onClick={onToggle}
  >
    <Box component="span" className="filmstrip-image">
      <LazyPicture
        image={item.portrait.main_image}
        sizes={[{ width: 160 }]}
        placeholder={PLACEHOLDER}
      />
    </Box>

    <Box component="span" className="filmstrip-caption">
      <span className="filmstrip-name">
        {/* Same break points as the role overview. */}
        {parseHtml(getSeparableTitle(item.portrait))}
      </span>

      {item.roleTitles.length > 0 && (
        <span className="filmstrip-role">
          {parseHtml(item.roleTitles.join(" · "))}
        </span>
      )}
    </Box>
  </Box>
);

interface PerformanceFilmstripProps {
  items: FilmstripItem[];
}

/**
 * Runs the portraits of the playing cast as an endless band. The band holds the list twice and moves by exactly
 * one copy per cycle, so the loop has no seam. It pauses while a tile is pressed (until the same tile is pressed
 * again or a press lands outside the strip), while a tile has keyboard focus and while the strip is off screen,
 * so it costs nothing when nobody watches. Hovering does not pause it. The strip is a single tab stop; the tiles
 * are reached with the arrow keys, Home and End. A focused tile is shifted into view. With reduced motion the
 * people are shown once as a static grid.
 * @param items People with their roles.
 */
const PerformanceFilmstripComponent: FC<PerformanceFilmstripProps> = ({
  items,
}) => {
  const { t } = useTranslation();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", {
    noSsr: true,
  });
  const ref = useRef<HTMLDivElement>(null);
  // True while the latest input was a pointer press rather than a key.
  const usesPointerRef = useRef(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [focusedKey, setFocusedKey] = useState<string | null>(null);
  const [tabStopKey, setTabStopKey] = useState<string | null>(null);
  // Shift of the band while it is browsed with the keyboard; `null` while it runs on its own.
  const [browseShift, setBrowseShift] = useState<number | null>(null);
  // Where in the cycle the band continues after keyboard browsing, as a negative delay in seconds.
  const [resumeDelay, setResumeDelay] = useState<number | null>(null);
  const hasItems = items.length > 0;
  const tabStop = items.some((item) => item.key === tabStopKey)
    ? tabStopKey
    : (items[0]?.key ?? null);

  // The band only mounts once people are loaded, so the observer is attached again at that point.
  useEffect(() => {
    const element = ref.current;

    if (
      reducedMotion ||
      !element ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) =>
      setIsVisible(entry.isIntersecting)
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasItems, reducedMotion]);

  // A press outside the strip releases a pressed tile. The latest input also tells pointer focus from keyboard
  // focus: clicking a tile focuses it in most browsers, which must not start keyboard browsing.
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent): void => {
      usesPointerRef.current = true;

      if (!ref.current?.contains(event.target as Node)) {
        setActiveKey(null);
      }
    };
    const handleKeyDown = (): void => {
      usesPointerRef.current = false;
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  const bandItems = useMemo(() => {
    if (!items.length) {
      return [];
    }

    const output: FilmstripItem[] = [];

    while (output.length < MIN_BAND_ITEMS) {
      output.push(...items);
    }

    return output;
  }, [items]);

  if (!items.length) {
    return null;
  }

  const toggle = (key: string): void =>
    setActiveKey((current) => (current === key ? null : key));

  /** Remembers a tile focused by keyboard and, in the running band, shifts the band so the tile is fully visible. */
  const handleFocus = (event: FocusEvent<HTMLDivElement>): void => {
    const tile = (event.target as HTMLElement).closest<HTMLElement>(
      REACHABLE_SELECTOR
    );
    const container = event.currentTarget;

    if (!tile) {
      return;
    }

    setTabStopKey(tile.dataset.itemKey ?? null);

    // A clicked or tapped tile is paused through `activeKey` alone, so leaving it never depends on focus.
    if (usesPointerRef.current) {
      return;
    }

    setFocusedKey(tile.dataset.itemKey ?? null);

    const track = container.querySelector<HTMLElement>(".filmstrip-track");

    if (reducedMotion || !track) {
      return;
    }

    // Focus may already have scrolled the clipped container; only the band's own shift is used.
    container.scrollLeft = 0;

    // Layout positions (not the moving rectangle) keep the result right while the band is still sliding.
    const slot = tile.closest<HTMLElement>(".filmstrip-slot") ?? tile;
    const base = browseShift ?? readTrackShift(track);
    const left = slot.offsetLeft;
    const right = left + tile.offsetWidth;
    let delta = 0;

    if (left + base < 0) {
      delta = -(left + base);
    } else if (right + base > container.clientWidth) {
      delta = container.clientWidth - (right + base);
    }

    setBrowseShift(base + delta);
  };

  /**
   * Ends keyboard browsing, so the band continues where the keyboard left it instead of starting over.
   * @param container The strip element.
   */
  const endBrowsing = (container: HTMLDivElement): void => {
    const track = container.querySelector<HTMLElement>(".filmstrip-track");
    const half = (track?.offsetWidth ?? 0) / 2;

    if (browseShift !== null && half > 0) {
      const cycle = bandItems.length * SECONDS_PER_ITEM;
      const position = (((-browseShift / half) % 1) + 1) % 1;

      setResumeDelay(-position * cycle);
    }

    setFocusedKey(null);
    setBrowseShift(null);
  };

  /** Ends keyboard browsing once focus leaves the strip, so the band runs again. */
  const handleBlur = (event: FocusEvent<HTMLDivElement>): void => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
      return;
    }

    endBrowsing(event.currentTarget);
    setActiveKey(null);
  };

  /**
   * A press inside the strip ends keyboard browsing; from then on only pressed tiles pause the band.
   * @param event The pointer press on the strip.
   */
  const handlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>
  ): void => {
    if (focusedKey === null && browseShift === null) {
      return;
    }

    endBrowsing(event.currentTarget);
  };

  /** Moves focus between the tiles with the arrow keys, Home and End. */
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    const tiles = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(REACHABLE_SELECTOR)
    );
    const current = tiles.indexOf(document.activeElement as HTMLElement);

    if (current === -1) {
      return;
    }

    const targets: Record<string, number> = {
      ArrowRight: Math.min(current + 1, tiles.length - 1),
      ArrowLeft: Math.max(current - 1, 0),
      Home: 0,
      End: tiles.length - 1,
    };

    if (!(event.key in targets)) {
      return;
    }

    event.preventDefault();
    tiles[targets[event.key]].focus({ preventScroll: true });
  };

  const tileProps = (item: FilmstripItem, isCopy: boolean) => ({
    item,
    isActive: activeKey === item.key,
    isCopy,
    isTabStop: tabStop === item.key,
    isFocused: !isCopy && focusedKey === item.key,
    onToggle: () => toggle(item.key),
  });

  const keyboardHandlers = {
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    onPointerDown: handlePointerDown,
  };

  if (reducedMotion) {
    return (
      <Box
        ref={ref}
        className="filmstrip is-static"
        data-testid="filmstrip"
        sx={performanceFilmstripStyles}
        role="group"
        aria-label={t("next_performance.cast")}
        {...keyboardHandlers}
      >
        <Box className="filmstrip-track">
          {items.map((item) => (
            <FilmstripTile key={item.key} {...tileProps(item, false)} />
          ))}
        </Box>
      </Box>
    );
  }

  // The only pause sources: off screen, a pressed tile, keyboard focus on a tile.
  const isPaused = !isVisible || activeKey !== null || focusedKey !== null;
  const classes = ["filmstrip", "is-running"];

  if (isPaused) {
    classes.push("is-paused");
  }

  if (browseShift !== null) {
    classes.push("is-browsing");
  }

  const trackStyle = {
    "--filmstrip-duration": `${bandItems.length * SECONDS_PER_ITEM}s`,
    ...(resumeDelay !== null && { animationDelay: `${resumeDelay}s` }),
    ...(browseShift !== null && {
      transform: `translateX(${browseShift}px)`,
    }),
  } as CSSProperties;

  return (
    <Box
      ref={ref}
      className={classes.join(" ")}
      data-testid="filmstrip"
      sx={performanceFilmstripStyles}
      role="group"
      aria-label={t("next_performance.cast")}
      {...keyboardHandlers}
    >
      <Box className="filmstrip-track" style={trackStyle}>
        {[0, 1].map((copy) =>
          bandItems.map((item, index) => {
            // Only the first occurrence of a person is reachable; repeats and the second copy close the loop.
            const isCopy = copy === 1 || index >= items.length;

            return (
              <Box
                component="span"
                className="filmstrip-slot"
                key={`${copy}-${index}-${item.key}`}
                aria-hidden={isCopy ? "true" : undefined}
              >
                <FilmstripTile {...tileProps(item, isCopy)} />
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export const PerformanceFilmstrip = memo(PerformanceFilmstripComponent);
