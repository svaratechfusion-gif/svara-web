/**
 * ------------------------------------------------
 * Module
 *   experience (types)
 * Purpose
 *   The declarative SceneConfig contract — one config object per scene,
 *   read by the Experience Engine. This is the layer the docs call
 *   `~/types/experience.ts` and the one the user-proposed config shape
 *   codifies: every scene = { id, title, entry, exit, camera, motion,
 *   lighting, content, transition }.
 *
 *   Authoring words, not code, is the point. Swap GSAP for Motion One and
 *   only the director's adapter changes — the configs (and the registry)
 *   are framework-agnostic data.
 * Owner
 *   Engineering OS (Experience Engine)
 * Dependencies
 *   lib/experience/SceneDirector (type-only — Emotion union)
 *   lib/experience/pacing         (type-only — ScenePacing shape ref)
 * Performance Budget
 *   n/a (compile-time types only — zero runtime cost)
 * Inputs
 *   n/a
 * Outputs
 *   SceneConfig type + supporting unions
 * Acceptance
 *   - 9 fields, no more, no less (one config = one scene, no ambiguity)
 *   - entry/exit are normalized 0..1 global-progress fractions
 *   - motion ops expressed as beat fractions (0..1 within the scene)
 *   - no GSAP/Three types imported at runtime (type-only)
 * ------------------------------------------------
 **/

import type { Emotion } from "~~/lib/experience/SceneDirector";

/** Camera narrator mode — intent only. The math lives in SceneDirector.conduct(). */
export type CameraMode =
  | "static"
  | "approach"
  | "flyThrough"
  | "orbit"
  | "pullBack"
  | "pan";

/** Stage temperature — the thermal register a scene moves toward. */
export type LightTemperature = "warm" | "cool" | "neutral";

/** How a scene arrives — the choreographic handoff between beats. */
export type TransitionKind =
  | "seamless"
  | "cut"
  | "organize"
  | "pulse"
  | "drift";

/**
 * Easing token. Left as a string (not a closed union) because GSAP's vocab
 * is large and the registry is the single decl place — a typo surfaces at
 * the build step, where the director adapter passes it straight through.
 */
export type EaseToken = string;

/** Tweened write to a ParticleEngine channel, expressed as a beat fraction. */
export interface MotionTween {
  kind: "tween";
  /** ParticleEngine channel name (e.g. "emergence", "coreLight"). */
  channel: string;
  from: number;
  to: number;
  /** Start position as a fraction of the beat (0..1). */
  at: number;
  /** Duration as a fraction of the beat (0..1). */
  duration: number;
  ease: EaseToken;
}

/** Instant write to a ParticleEngine channel (zero-duration set). */
export interface MotionSet {
  kind: "set";
  channel: string;
  value: number;
  /** Position as a fraction of the beat (0..1). */
  at: number;
}

export type MotionOp = MotionTween | MotionSet;

/** Stage lighting intent — what the LightingLayer should reach mid-scene. */
export interface LightingIntent {
  /** 0..1 normalized stage illumination. */
  intensity: number;
  temperature: LightTemperature;
}

/**
 * The config object. Exactly nine fields. `entry`/`exit` are the global
 * progress fractions the scene occupies on the MasterTimeline; they are
 * derived from pacing (single source of truth for timing) at registry
 * build time, so an author never writes them by hand.
 */
export interface SceneConfig {
  id: string;
  title: string;
  entry: number;
  exit: number;
  camera: CameraMode;
  motion: readonly MotionOp[];
  lighting: LightingIntent;
  content: string;
  transition: TransitionKind;
}

/** Author-side shape — everything except the two pacing-derived fields. */
export type SceneConfigDraft = Omit<SceneConfig, "entry" | "exit"> & {
  /** Optional emotion tag carried alongside (used by SceneDirector, not the registry itself). */
  emotion?: Emotion;
};