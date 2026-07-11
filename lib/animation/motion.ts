// SVARA 2.0 — Motion tokens (values only; nothing here animates).
// Single source for every duration/easing used by GSAP, CSS, or Vue
// transitions. Mirrors the --motion-*/--ease-* CSS variables in
// styles/design-tokens.css — keep the two in sync.

/** Durations in seconds (GSAP convention). */
export const duration = {
  fast: 0.2,
  medium: 0.3,
  slow: 0.6,
  hero: 1.2,
} as const

/** Durations in milliseconds (CSS convention). */
export const durationMs = {
  fast: 200,
  medium: 300,
  slow: 600,
  hero: 1200,
} as const

/** GSAP ease strings. */
export const ease = {
  /** default UI ease */
  smooth: 'power2.inOut',
  /** entrances — decelerating (power3.out per V4 animation rules) */
  out: 'power3.out',
  /** exits — accelerating */
  in: 'power2.in',
  /** long cinematic moves */
  hero: 'power4.out',
  /** springy accent — use sparingly; never on core layout motion */
  elastic: 'elastic.out(1, 0.75)',
} as const

/** CSS cubic-bezier equivalents (for non-GSAP transitions). */
export const easeCss = {
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
} as const

/** Default stagger steps in seconds. */
export const stagger = {
  tight: 0.04,
  base: 0.08,
  loose: 0.15,
} as const

export type DurationToken = keyof typeof duration
export type EaseToken = keyof typeof ease
