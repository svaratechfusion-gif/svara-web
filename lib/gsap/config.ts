// Global motion configuration — applied once by lib/gsap/index.ts. Owns the
// house motion language (default eases/durations, signature CustomEases) and
// the global ScrollTrigger posture, so no component ever sets globals.
import { gsap, ScrollTrigger, CustomEase } from "./register";

/**
 * Smooth scrolling in this app is Lenis (lenis/nuxt), driven by gsap.ticker
 * in app.vue with lagSmoothing(0) so ScrollTrigger reads the smoothed value
 * in perfect sync. ScrollSmoother is therefore registered (see register.ts)
 * but must never be created — two smoothers fighting over scrollTop is the
 * classic double-smoothing bug. This constant exists so the decision is
 * discoverable in code, not just in a comment.
 */
export const SMOOTH_SCROLL_DRIVER = "lenis" as const;

/** Signature eases — the experience's motion vocabulary. */
export const EASES = {
  /** Default for camera/scene movement: swift start, long settle. */
  cinematic: "svara-cinematic",
  /** For elements assembling into place (particles, glyphs). */
  assemble: "svara-assemble",
  /** For the one deliberate hard beat (Scene 04's cut) — near-step. */
  cut: "svara-cut",
} as const;

let applied = false;

export function applyGlobalConfig() {
  if (applied) return;
  applied = true;

  CustomEase.create(EASES.cinematic, "M0,0 C0.18,0.08 0.34,1 1,1");
  CustomEase.create(EASES.assemble, "M0,0 C0.28,0 0.36,1 1,1");
  CustomEase.create(EASES.cut, "M0,0 C0.92,0 1,0.08 1,1");

  gsap.defaults({
    ease: EASES.cinematic,
    duration: 0.9,
    overwrite: "auto",
  });

  // Only meaningful in the browser — guard so the module stays importable
  // during SSR (config runs again on the client via the Nuxt plugin).
  if (typeof window !== "undefined") {
    ScrollTrigger.defaults({
      // markers stay opt-in per-trigger; never globally on.
      markers: false,
    });
    ScrollTrigger.config({
      // visibilitychange/resize handling only — skip the expensive
      // auto-refresh on every DOM mutation; this app's layout is stable
      // after fonts load (see the fonts.ready refresh in the Nuxt plugin).
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
    });
  }
}

/**
 * Reduced-motion is a first-class mode, not an afterthought: returns a
 * gsap.matchMedia() pre-split on prefers-reduced-motion so callers register
 * both variants in one place and cleanup is automatic.
 *
 *   motionMedia().add({ motion: "(prefers-reduced-motion: no-preference)",
 *                       still: "(prefers-reduced-motion: reduce)" }, ctx => {...})
 */
export function motionMedia() {
  return gsap.matchMedia();
}

export const MOTION_QUERIES = {
  motion: "(prefers-reduced-motion: no-preference)",
  still: "(prefers-reduced-motion: reduce)",
  mobile: "(max-width: 768px)",
  desktop: "(min-width: 769px)",
} as const;
