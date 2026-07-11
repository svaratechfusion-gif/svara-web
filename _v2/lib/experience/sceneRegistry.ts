/**
 * ------------------------------------------------
 * Module
 *   sceneRegistry
 * Purpose
 *   The declarative per-scene table. One SceneConfig object per homepage
 *   scene, authored as data — the thing the docs prescribe but no one had
 *   built. The Experience Engine reads this; SceneDirector's imperative
 *   `beat()` calls are an adapter over this data, not the source of truth.
 *
 *   The nine fields per scene are the user-defined contract
 *   { id, title, entry, exit, camera, motion, lighting, content, transition }.
 *   `entry`/`exit` are NOT authored — they are derived from pacing (the
 *   single source of truth for timing) so the registry and the timeline
 *   can never drift. Author only the seven declarative fields; the build
 *   step freezes the result.
 * Owner
 *   Engineering OS (Experience Engine)
 * Dependencies
 *   lib/types/experience        (SceneConfig, MotionOp, unions)
 *   lib/experience/pacing        (SCENES, weightSvh, holdSvh)
 * Performance Budget
 *   <0.1ms per lookup (a single Array.find on a 9-element frozen array)
 * Inputs
 *   tailSvh (optional) — svh of scroll beyond the last scene (footer),
 *     when computing live entry/exit. Defaults to 0.
 * Outputs
 *   SCENE_CONFIGS : readonly SceneConfig[]   (default tail = 0)
 *   buildSceneConfigs(tailSvh) → readonly SceneConfig[]
 *   sceneConfig(id) → SceneConfig
 * Acceptance
 *   - one entry per pacing.SCENES row, same order
 *   - every `id` == a pacing timelineId (one source of truth for identity)
 *   - every `content` == a pacing domId
 *   - no authored entry/exit (derived)
 *   - 60 FPS unchanged: this is read at construction, never per frame
 * ------------------------------------------------
 **/

import type { SceneConfig, SceneConfigDraft } from "~~/lib/types/experience";
import { SCENES, weightSvh, holdSvh } from "./pacing";

/**
 * Author-side drafts. Order MUST match pacing.SCENES. The `id` is the
 * timelineId (the beat the director writes); `content` is the domId (the
 * caption section that renders over it). For most scenes these are equal —
 * "intelligence" is the one scene where the DOM id (its caption area) and
 * the timeline id (the choreographed beat) intentionally differ.
 *
 * Motion op positions/durations are BEAT FRACTIONS (0..1 within the beat)
 * — MasterTimeline normalizes each scene to its weight, so a tween at
 * `at: 0.26 / duration: 0.4` reads "26% in, lasting 40% of the beat"
 * regardless of how much scroll real estate the scene ultimately gets.
 */
const DRAFTS: Record<string, SceneConfigDraft> = {
  birth: {
    id: "birth",
    title: "Enterprise Reality",
    camera: "static",
    motion: [],
    lighting: { intensity: 0.05, temperature: "neutral" },
    content: "birth",
    transition: "seamless",
    emotion: "curiosity",
  },
  emergence: {
    id: "emergence",
    title: "Gravity",
    camera: "static",
    motion: [
      // Almost all anticipation — the organizing only commits at the end.
      { kind: "tween", channel: "emergence", from: 0, to: 1, at: 0, duration: 1, ease: "power2.in" },
    ],
    lighting: { intensity: 0.08, temperature: "neutral" },
    content: "emergence",
    transition: "seamless",
    emotion: "curiosity",
  },
  creation: {
    id: "creation",
    title: "Typography is Created",
    camera: "approach",
    motion: [
      // Core stabilizes FIRST (light rises), then letters are generated.
      { kind: "tween", channel: "coreLight", from: 0, to: 1, at: 0,    duration: 0.28, ease: "power2.in"   },
      { kind: "tween", channel: "glyph",     from: 0, to: 1, at: 0.26, duration: 0.4,  ease: "none"        },
      // The handoff — particles vanish, only typography remains.
      { kind: "tween", channel: "typoSolid", from: 0, to: 1, at: 0.68, duration: 0.08, ease: "power2.out"  },
      { kind: "tween", channel: "cameraPush",from: 0, to: 1, at: 0.04, duration: 0.68, ease: "power1.inOut" },
    ],
    lighting: { intensity: 0.4, temperature: "warm" },
    content: "intelligence",
    transition: "seamless",
    emotion: "discovery",
  },
  dataCollapse: {
    id: "dataCollapse",
    title: "Data Collapse",
    camera: "flyThrough",
    motion: [
      // Camera flies THROUGH the AI Core — not scrolling, flying.
      { kind: "tween", channel: "enter",     from: 0, to: 1, at: 0,    duration: 0.3,  ease: "power2.in" },
      // Language dissolves back into data.
      { kind: "tween", channel: "typoSolid", from: 1, to: 0, at: 0,    duration: 0.18, ease: "power1.in" },
      { kind: "tween", channel: "glyph",     from: 1, to: 0, at: 0.05, duration: 0.25, ease: "power1.in" },
      { kind: "tween", channel: "stream",    from: 0, to: 1, at: 0.25, duration: 0.35, ease: "power1.in" },
      // The UNEASED cut — a zero-duration set the scrubber snaps across.
      { kind: "set",   channel: "disconnect", value: 1, at: 0.6 },
    ],
    lighting: { intensity: 0.5, temperature: "cool" },
    content: "data",
    transition: "cut",
    emotion: "shock",
  },
  reconnection: {
    id: "reconnection",
    title: "SVARA Restores Intelligence",
    camera: "pullBack",
    motion: [
      // Camera pulls back OUT of the data world as SVARA reconnects.
      { kind: "tween", channel: "enter",     from: 1, to: 0, at: 0,    duration: 0.35, ease: "power2.out" },
      // A PULSE — one spherical wavefront races out from the core.
      { kind: "tween", channel: "pulse",     from: 0, to: 1, at: 0,    duration: 0.22, ease: "power2.out" },
      { kind: "tween", channel: "reconnect", from: 0, to: 1, at: 0.08, duration: 0.9,  ease: "power3.out" },
    ],
    lighting: { intensity: 0.7, temperature: "warm" },
    content: "svara",
    transition: "pulse",
    emotion: "understanding",
  },
  productGalaxy: {
    id: "productGalaxy",
    title: "Journey Through Products",
    camera: "orbit",
    motion: [
      // Layout resolves fast (first ~12%), then the orbit sweep owns it.
      { kind: "tween", channel: "productsLayout", from: 0, to: 1, at: 0,    duration: 0.12, ease: "power2.out" },
      { kind: "tween", channel: "productsSweep",   from: 0, to: 1, at: 0.12, duration: 0.88, ease: "none"      },
    ],
    lighting: { intensity: 0.65, temperature: "neutral" },
    content: "products",
    transition: "organize",
    emotion: "respect",
  },
  industryExpansion: {
    id: "industryExpansion",
    title: "Industries",
    camera: "pan",
    motion: [
      { kind: "tween", channel: "industriesLayout", from: 0, to: 1, at: 0,    duration: 0.12, ease: "power2.out" },
      { kind: "tween", channel: "industriesSweep",  from: 0, to: 1, at: 0.12, duration: 0.88, ease: "none"      },
    ],
    lighting: { intensity: 0.65, temperature: "warm" },
    content: "industries",
    transition: "organize",
    emotion: "respect",
  },
  scale: {
    id: "scale",
    title: "Enterprise Scale",
    camera: "pullBack",
    motion: [
      // One unbroken retreat — nearly linear, no swoop, just distance.
      { kind: "tween", channel: "scale", from: 0, to: 1, at: 0, duration: 1, ease: "power1.inOut" },
    ],
    lighting: { intensity: 0.35, temperature: "neutral" },
    transition: "drift",
    content: "scale",
    emotion: "belief",
  },
  ending: {
    id: "ending",
    title: "Final Reveal",
    camera: "static",
    motion: [
      // Everything exhales. Belief, then stillness.
      { kind: "tween", channel: "ending", from: 0, to: 1, at: 0, duration: 1, ease: "power2.out" },
    ],
    lighting: { intensity: 0.3, temperature: "warm" },
    content: "ending",
    transition: "drift",
    emotion: "action",
  },
};

function assertAligned(): void {
  for (const scene of SCENES) {
    if (!(scene.timelineId in DRAFTS)) {
      throw new Error(`sceneRegistry: pacing declares "${scene.timelineId}" but no config draft exists`);
    }
    const draft = DRAFTS[scene.timelineId]!;
    if (draft.content !== scene.domId) {
      throw new Error(
        `sceneRegistry: "${draft.id}".content "${draft.content}" ≠ pacing.domId "${scene.domId}"`,
      );
    }
  }
  const draftIds = Object.keys(DRAFTS);
  if (draftIds.length !== SCENES.length) {
    throw new Error(
      `sceneRegistry: ${draftIds.length} drafts vs ${SCENES.length} pacing scenes — counts must match`,
    );
  }
}

/**
 * Build the frozen registry. `tailSvh` is scroll real estate beyond the
 * last scene (footer) — measured at mount, passed through SceneDirector
 * into MasterTimeline. The same value MUST be used here so entry/exit
 * reflect what the visitor actually experiences.
 */
export function buildSceneConfigs(tailSvh = 0): readonly SceneConfig[] {
  assertAligned();
  const total =
    SCENES.reduce((sum, s) => sum + weightSvh(s.timelineId) + holdSvh(s.timelineId), 0) + tailSvh;
  const out: SceneConfig[] = [];
  let cursor = 0;
  for (const scene of SCENES) {
    const draft = DRAFTS[scene.timelineId]!;
    const entry = cursor / total;
    cursor += weightSvh(scene.timelineId);
    const exit = cursor / total;
    cursor += holdSvh(scene.timelineId);
    const { emotion: _emotion, ...config } = draft;
    out.push(Object.freeze({ ...config, entry, exit }));
  }
  return Object.freeze(out);
}

/** Default registry — tail = 0 (script ends exactly at last scene's exit = 1). */
export const SCENE_CONFIGS: readonly SceneConfig[] = buildSceneConfigs(0);

/** O(1)-ish lookup by beat id. Throws if unknown — better than silent failure. */
export function sceneConfig(id: string): SceneConfig {
  const cfg = SCENE_CONFIGS.find((s) => s.id === id);
  if (!cfg) throw new Error(`sceneRegistry: unknown scene "${id}"`);
  return cfg;
}