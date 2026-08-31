// SHARED HERO-TEXT ENTRANCE MOTION — the single source of truth for hero text reveals.
// Extracted verbatim from the Investors hero (app/components/investors/IRHeroCinematic.vue,
// `softEase` entrance): a restrained fade + subtle upward translate, soft ease, staggered
// per element. Reused across heroes via motion-v's :initial / :animate / :transition so
// every hero shares the same cinematic motion language. No new animation framework —
// motion-v is already the site's hero animation library.

/** Investors "softEase" — the master hero easing (cubic-bezier). */
export const HERO_EASE = [0.215, 0.61, 0.355, 1] as const

/** Timing, matched to the Investors hero (durations 0.8–1.0s, ~0.1s stagger). */
export const HERO_DURATION = 0.85
export const HERO_STAGGER = 0.1
export const HERO_Y = 16

/** Fade-up initial state (opacity 0 + small upward offset). */
export const heroInitial = (y: number = HERO_Y) => ({ opacity: 0, y })

/** Revealed state. */
export const heroAnimate = { opacity: 1, y: 0 } as const

/** Staggered transition for the element at `index` in the hero's entrance sequence. */
export const heroTransition = (index = 0, duration: number = HERO_DURATION) => ({
  duration,
  ease: HERO_EASE,
  delay: index * HERO_STAGGER,
})
