// STRIDE REVEAL CASCADE — the one staggered-reveal timeline behind every Stride
// heading, chip and bento card.
//
// A single value `p` advances 0 → 1 over a fixed duration; each item derives its own
// eased 0 → 1 from `p` plus a per-item start offset. `localProg(v, i)` is that derived
// value. Ported from the source project's `useRevealCascade`, with the numbers intact
// (DURATION 1400, SPREAD 0.55, easeOutQuart).
//
// Two deliberate differences from a naive Vue port:
//  · It ticks off `gsap.ticker` (via useTicker) — the site's single rAF — rather than
//    starting its own loop. See app/composables/useTicker.ts.
//  · `p` is NOT reactive and `apply` writes inline styles directly to DOM nodes. A
//    heading is 30-plus letter spans; making each one a reactive binding would
//    re-render the whole subtree every frame for 1.4s. The elements are static markup
//    written once; only their style attributes move.
//
// Trigger: by default the cascade starts when `rootRef` scrolls into view
// (IntersectionObserver, rootMargin "0px 0px -15% 0px"). Reduced motion jumps
// straight to the revealed end state and never ticks.
import { onMounted, onBeforeUnmount, ref, type Ref } from 'vue'
import { useTicker } from './useTicker'

const DURATION = 1400 // ms for the whole cascade
const SPREAD = 0.55 // fraction of the timeline over which item starts are staggered

const easeOutQuart = (t: number): number => 1 - (1 - t) ** 4
const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v)

export interface RevealCascadeOptions {
  /** Number of items on the timeline; read at start so it may depend on rendered DOM. */
  total: () => number
  /** Per-frame writer. `localProg(i)` is item `i`'s eased 0 → 1. */
  apply: (p: number, localProg: (i: number) => number) => void
}

export interface RevealCascade {
  rootRef: Ref<HTMLElement | null>
}

export function useRevealCascade(options: RevealCascadeOptions): RevealCascade {
  const rootRef = ref<HTMLElement | null>(null)

  let started = false
  let done = true // no ticking until start()
  let t0: number | null = null
  let total = 1
  let io: IntersectionObserver | null = null

  // `span` is the slice of the timeline each item actually animates over: starts are
  // staggered across SPREAD, so an item has (1 - SPREAD) left to finish in.
  const span = 1 - SPREAD
  const localProgAt = (v: number, i: number): number => {
    const s = total > 1 ? (i / (total - 1)) * SPREAD : 0
    return easeOutQuart(span <= 0 ? 1 : clamp01((v - s) / span))
  }

  const write = (p: number): void => {
    options.apply(p, (i: number) => localProgAt(p, i))
  }

  const start = (): void => {
    if (started) return
    started = true
    total = Math.max(1, options.total())
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      write(1)
      return
    }
    t0 = null
    done = false
  }

  useTicker(() => {
    if (done) return
    const now = performance.now()
    if (t0 === null) t0 = now
    const t = Math.min((now - t0) / DURATION, 1)
    write(t)
    if (t >= 1) done = true
  })

  onMounted(() => {
    const el = rootRef.value
    if (!el) return
    // Pre-write frame 0 so nothing flashes in at full opacity before the first tick.
    total = Math.max(1, options.total())
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      write(1)
      started = true
      return
    }
    write(0)
    io = new IntersectionObserver(
      (entries) => {
        if (entries.some(e => e.isIntersecting)) {
          start()
          io?.disconnect()
          io = null
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    )
    io.observe(el)
  })

  onBeforeUnmount(() => {
    io?.disconnect()
    io = null
    done = true
  })

  return { rootRef }
}
