/** Brand oranges and reds the rising hearts take turns in. */
export const HEART_BURST_COLORS: readonly string[] = [
  "#fd8e00",
  "#e5383b",
  "#fdba74",
  "#ec5476",
  "#fb923c",
];

/** Hearts per burst. */
export const HEART_BURST_COUNT = 9;

/** Time until the next burst may start; about as long as the hearts of one burst fly. */
export const HEART_BURST_LOCK_MS = 1300;

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const HEART_PATH =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
const HEART_EASING = "cubic-bezier(0.23, 1, 0.32, 1)";

/**
 * Picks a random number in a range.
 * @param min Lower bound.
 * @param max Upper bound.
 * @returns A number between `min` and `max`.
 */
const between = (min: number, max: number): number =>
  min + Math.random() * (max - min);

/**
 * Builds the heart shape of one particle.
 * @param color Fill colour.
 * @returns An SVG element that fills its parent.
 */
const createHeartShape = (color: string): SVGSVGElement => {
  const svg = document.createElementNS(SVG_NAMESPACE, "svg");
  svg.setAttribute("viewBox", "0 0 24 22");
  svg.setAttribute("fill", color);

  const path = document.createElementNS(SVG_NAMESPACE, "path");
  path.setAttribute("d", HEART_PATH);
  svg.appendChild(path);

  return svg;
};

/**
 * Lets small brand hearts rise from the middle of a container and fade out. The particles are plain elements
 * animated with the Web Animations API (only `transform` and `opacity`), and each removes itself when its flight
 * ends. Without `Element.animate` nothing happens, so no particle can stay behind unanimated.
 * @param container Element the hearts start from; it needs `position: relative` and visible overflow.
 */
export const spawnHeartBurst = (container: HTMLElement): void => {
  if (typeof container.animate !== "function") {
    return;
  }

  const rect = container.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  for (let index = 0; index < HEART_BURST_COUNT; index++) {
    const size = between(12, 22);
    const particle = document.createElement("span");
    particle.className = "heart-particle";
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${centerX - size / 2}px`;
    particle.style.top = `${centerY - size / 2}px`;
    particle.appendChild(
      createHeartShape(HEART_BURST_COLORS[index % HEART_BURST_COLORS.length])
    );
    container.appendChild(particle);

    const drift = between(-45, 45);
    const rise = between(70, 130);
    const rotation = between(-20, 20);
    const animation = particle.animate(
      [
        { transform: "translate(0, 0) scale(0.4)", opacity: 0 },
        {
          transform: `translate(${(drift * 0.35).toFixed(1)}px, -26px) scale(1) rotate(${(rotation / 3).toFixed(1)}deg)`,
          opacity: 1,
          offset: 0.25,
        },
        {
          transform: `translate(${drift.toFixed(1)}px, ${(-rise).toFixed(1)}px) scale(0.8) rotate(${rotation.toFixed(1)}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: between(950, 1400),
        delay: index * 35,
        easing: HEART_EASING,
        fill: "both",
      }
    );

    // A cancelled flight (e.g. the element left the document) ends without `finish`.
    animation.onfinish = () => particle.remove();
    animation.oncancel = () => particle.remove();
  }
};
