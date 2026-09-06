// IS THE PAGE BEING SCROLLED RIGHT NOW?
//
// One passive listener for the whole site, so the heavy WebGL scenes can drop
// their frame rate while the page moves and return to full rate the moment it
// settles. Scrolling is when a page can least afford a full render pass, and it
// is also when nobody is studying the hero — a capped rate is invisible in
// motion and the scene is back at full quality before the reader has stopped.
//
// Deliberately module-scoped rather than a composable: the scenes are plain TS
// and know nothing about Vue, and one listener beats one per scene.

/** How long after the last scroll event the page still counts as moving. */
const IDLE_MS = 140

let lastScrollAt = 0
let attached = false

function onScroll(): void {
  lastScrollAt = performance.now()
}

function attach(): void {
  if (attached || typeof window === 'undefined') return
  attached = true
  window.addEventListener('scroll', onScroll, { passive: true })
  // Lenis writes scroll positions programmatically on desktop, which still
  // fires the native scroll event, so one listener covers both paths.
}

/** True while the page is scrolling, or was within the last IDLE_MS. */
export function isScrolling(): boolean {
  attach()
  return performance.now() - lastScrollAt < IDLE_MS
}
