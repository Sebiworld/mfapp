/** Kinds of motion that play once per session; each keeps its own set of keys. */
export type MotionScope = "project-header" | "project-sidebar";

/**
 * Keys that have played in this page load. Lives in memory only (never in the persisted store), so a reload or a new
 * tab plays everything once more.
 */
const playedKeys = new Map<MotionScope, Set<string>>();

/**
 * Tells whether a motion has played in this session.
 * @param scope Kind of motion.
 * @param key Key within the scope, e.g. a project id.
 * @returns `true` once `markPlayed` was called for scope and key.
 */
export const hasPlayed = (scope: MotionScope, key: string): boolean =>
  playedKeys.get(scope)?.has(key) ?? false;

/**
 * Records that a motion has started, so it does not play again in this session.
 * @param scope Kind of motion.
 * @param key Key within the scope.
 */
export const markPlayed = (scope: MotionScope, key: string): void => {
  let keys = playedKeys.get(scope);

  if (!keys) {
    keys = new Set();
    playedKeys.set(scope, keys);
  }

  keys.add(key);
};
