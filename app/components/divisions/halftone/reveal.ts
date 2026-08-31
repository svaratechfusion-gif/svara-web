/**
 * The hero's entrance — one place for the whole choreography.
 *
 * Every piece holds at its resting state until the preloader's curtains BEGIN
 * to lift, then leans on the delays below to space itself out. So `0` is not
 * the first visible frame — it is about 650ms before it, which is the point.
 * The curtains take that long to clear, and a page that waits for them sits
 * there blank while they do. Keep the budget small enough that the *ends* of
 * these animations land on a page someone is actually looking at.
 *
 * The order is the reading order: the headline first, then the frame around it,
 * then the copy, then the panels along the bottom.
 *
 * The halftone field is absent on purpose — it starts developing the instant
 * the signal fires and its wave takes ~2.5s to climb, so it underruns
 * everything here rather than taking a slot of its own.
 *
 * The reference's `brand` / `nav` / `cta` slots are gone: those were its own
 * header, and this page keeps SVARA's global navigation, which enters on its own.
 */

/** ms after the curtains begin to lift. */
export const REVEAL_DELAY = {
  /** The star, and first — the eye is already on it. */
  headline: 200,
  rule: 420,
  lead: 500,
  stats: 560,
  /** Per stat card, on top of `stats`. */
  statStep: 80,
  body: 620,
  actions: 760,
  proof: 840,
  /** Late on purpose: the bar arrives under a word that has already landed. */
  headlineBar: 1100,
} as const
