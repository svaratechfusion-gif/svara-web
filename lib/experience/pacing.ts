// THE director's timing sheet — the single source of truth for scene pacing.
//
// Timecodes (user-provided):
//   00:00 Birth · 00:05 Emergence · 00:10 Intelligence · 00:18 Data Collapse
//   00:28 SVARA Restores Intelligence · 00:40 Products · 01:00 Industries
//   01:20 Enterprise Scale · 01:35 Final Reveal
//
// Scroll is user-paced, so `seconds` are PROPORTIONS, not literal playback
// time (only Birth's boot cascade is genuinely time-based). `hold` is the
// trailing silence after a scene — a directing decision, the pause before
// the next beat.
//
// Two systems consume this so they can never drift apart:
//   1. SceneDirector — timeline weights (`weightSvh`) + holds (`holdSvh`),
//      partitioning the ONE master timeline.
//   2. Scene*.vue    — each caption section's scroll height (`sectionSvh`),
//      so a caption sits over exactly its own particle beat.
// Because section height = scene weight + trailing hold, the two partitions
// land on identical scroll boundaries.

export interface ScenePacing {
  /** DOM section id (useSceneRange) — what the caption component registers. */
  domId: string;
  /** SceneDirector beat id — what writes the particle channels. */
  timelineId: string;
  /** Duration from the timing sheet, in cinematic seconds (a proportion). */
  seconds: number;
  /** Trailing silence after the scene, in seconds. */
  hold: number;
}

/** Scroll real estate per cinematic second. Tune the whole experience length here. */
export const SVH_PER_SECOND = 20;

/**
 * Ordered scene table. Birth is a HOLD (time-based cascade, no scroll-driven
 * beat). Ending's hold exists for a mechanical reason too: a section must be
 * at least one viewport taller than its beat for the sticky closing lines to
 * PIN through the beat (60svh alone gives sticky zero room to stick).
 */
export const SCENES: readonly ScenePacing[] = [
  { domId: "birth", timelineId: "birth", seconds: 5, hold: 0 },
  { domId: "emergence", timelineId: "emergence", seconds: 5, hold: 3.5 },
  { domId: "intelligence", timelineId: "creation", seconds: 8, hold: 3.5 },
  { domId: "data", timelineId: "dataCollapse", seconds: 10, hold: 3.5 },
  { domId: "svara", timelineId: "reconnection", seconds: 12, hold: 3.5 },
  { domId: "products", timelineId: "productGalaxy", seconds: 20, hold: 3.5 },
  { domId: "industries", timelineId: "industryExpansion", seconds: 20, hold: 3.5 },
  { domId: "scale", timelineId: "scale", seconds: 15, hold: 3.5 },
  { domId: "ending", timelineId: "ending", seconds: 3, hold: 5 },
] as const;

function findByTimeline(timelineId: string) {
  const scene = SCENES.find((s) => s.timelineId === timelineId);
  if (!scene) throw new Error(`pacing: unknown timeline scene "${timelineId}"`);
  return scene;
}

function findByDom(domId: string) {
  const scene = SCENES.find((s) => s.domId === domId);
  if (!scene) throw new Error(`pacing: unknown DOM scene "${domId}"`);
  return scene;
}

/** Timeline segment weight for a beat (excludes its trailing hold). */
export function weightSvh(timelineId: string) {
  return findByTimeline(timelineId).seconds * SVH_PER_SECOND;
}

/** Trailing-hold weight after a beat. */
export function holdSvh(timelineId: string) {
  return findByTimeline(timelineId).hold * SVH_PER_SECOND;
}

/** A caption section's scroll height = its scene weight + trailing hold. */
export function sectionSvh(domId: string) {
  const scene = findByDom(domId);
  return (scene.seconds + scene.hold) * SVH_PER_SECOND;
}

/**
 * Total svh the scripted scenes occupy — used to derive the silent tail
 * hold (anything the document scrolls beyond this, e.g. the footer).
 */
export const SCRIPT_SVH = SCENES.reduce((sum, s) => sum + (s.seconds + s.hold) * SVH_PER_SECOND, 0);
