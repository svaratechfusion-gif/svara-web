// SHARED SCROLL PROGRESS `0 → 1` for the pinned Products scene sequence —
// computed **at most once per frame**, no matter how many callers ask for it.
//
// Why this exists. A dozen independent consumers need the same number every
// frame (every ScrollFade overlay, every dashboard stage, the atmosphere, the
// act-window store). If each computed it as
// `scrollY / (documentElement.scrollHeight - innerHeight)` that would be a
// forced synchronous layout per consumer per frame, interleaved with the style
// writes those same consumers perform — textbook layout thrashing.
//
// Two things fix that:
//  - `scrollHeight` is measured ONCE, not per frame. The page height is fixed by
//    the sequence spacer, so it only changes on resize/reflow — a ResizeObserver
//    invalidates the cache.
//  - The result is memoised per frame using `document.timeline.currentTime`,
//    which is constant for the whole frame. Every caller within one frame shares
//    a single `scrollY` read.
//
// Callers do NOT run their own rAF — they subscribe through
// `useSceneProgress()`, which ticks once off `gsap.ticker` (the site's single
// tick source, see app/plugins/lenis.client.ts).

const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v)

/** Scrollable distance in px; `-1` = needs re-measuring. */
let scrollMax = -1
let observer: ResizeObserver | null = null

function measure(): number {
  // Progress runs 0 → 1 across the PINNED SCENE only — the sticky scene wrapper —
  // not the whole document. The wrapper is exactly the sequence's scroll length, so
  // measuring it (rather than documentElement) keeps the choreography aligned with the
  // scene even though the CTA + footer add their own height in normal flow below it.
  // (`offsetHeight - innerHeight` is the distance over which the sticky stage stays
  // pinned, i.e. where progress must reach 1.) Falls back to the document on any route
  // that has no scene wrapper.
  const scene = typeof document !== 'undefined'
    ? (document.querySelector('.ps-scene') as HTMLElement | null)
    : null
  const height = scene ? scene.offsetHeight : document.documentElement.scrollHeight
  scrollMax = height - window.innerHeight
  return scrollMax
}

/** Lazily watch for reflows that change page height (also covers window resizes). */
function ensureObserver(): void {
  if (observer || typeof ResizeObserver === 'undefined') return
  observer = new ResizeObserver(() => {
    scrollMax = -1 // invalidate; re-measured on the next read
  })
  observer.observe(document.documentElement)
}

let cachedProgress = 0
/** Frame the cached value belongs to (`currentTime` is stable within a frame). */
let cachedAt: number | null = null

/** Scroll progress `0 → 1` through the pinned sequence. Cheap to call repeatedly. */
export function getScrollProgress(): number {
  if (typeof window === 'undefined') return 0
  ensureObserver()
  const now = document.timeline?.currentTime
  const stamp = typeof now === 'number' ? now : null
  if (stamp !== null && stamp === cachedAt) return cachedProgress
  const max = scrollMax < 0 ? measure() : scrollMax
  cachedProgress = max > 0 ? clamp01(window.scrollY / max) : 0
  cachedAt = stamp
  return cachedProgress
}

/** Force a re-measure (e.g. after the sequence spacer height changes). */
export function invalidateScrollProgress(): void {
  scrollMax = -1
  cachedAt = null
}
