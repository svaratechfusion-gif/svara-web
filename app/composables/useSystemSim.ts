// SVARA PRODUCTS — deterministic live-simulation engine. One reusable, reduced-
// motion-aware, offscreen-pausing telemetry layer that every product "system"
// consumes so the /products page feels like live intelligence infrastructure
// WITHOUT per-frame Vue churn or random jitter. Values move smoothly via layered
// sines + seeded pseudo-randomness (deterministic → visually controlled). All
// numbers here are SIMULATED demo telemetry, not production customer data.
import { onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'

/** mulberry32 — deterministic PRNG seeded from an integer. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Smooth deterministic value in [min,max] — layered sines around the midpoint. */
export function wave(t: number, seed: number, min: number, max: number): number {
  const mid = (min + max) / 2, amp = (max - min) / 2
  const s = Math.sin(t * 0.7 + seed) * 0.6 + Math.sin(t * 1.9 + seed * 2.3) * 0.3 + Math.sin(t * 0.31 + seed * 5.1) * 0.1
  return mid + amp * Math.max(-1, Math.min(1, s))
}

/** Deterministic "is this event firing now" pulse (0..1 ramp-then-decay). */
export function pulse(t: number, period: number, seed: number, width = 0.35): number {
  const ph = (t / period + seed) % 1
  return Math.max(0, 1 - ph / width) ** 2
}

/**
 * A throttled, reduced-motion-aware, offscreen-pausing ticker. Calls `cb(elapsed)`
 * ~`fps` times/second while the element is in view and the tab is visible. Under
 * prefers-reduced-motion it renders ONE static frame then stops. Client-only;
 * auto-cleans on unmount. `rootRef` (optional) drives IntersectionObserver.
 */
export function useTicker(
  cb: (t: number) => void,
  opts: { fps?: number, rootRef?: Ref<HTMLElement | null> } = {},
): { inView: Ref<boolean>, reduced: Ref<boolean> } {
  const fps = opts.fps ?? 12
  const interval = 1000 / fps
  const inView = ref(true)
  const reduced = ref(false)
  let raf = 0, last = 0, startT = 0, running = false, io: IntersectionObserver | null = null

  function loop(now: number) {
    if (!running) return
    if (!startT) startT = now
    if (now - last >= interval) { last = now; cb((now - startT) / 1000) }
    raf = requestAnimationFrame(loop)
  }
  function play() { if (running || reduced.value) return; running = true; last = 0; raf = requestAnimationFrame(loop) }
  function stop() { running = false; cancelAnimationFrame(raf) }
  function evaluate() { if (!document.hidden && inView.value && !reduced.value) play(); else stop() }
  const onVis = () => evaluate()

  onMounted(() => {
    reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced.value) { cb(0); return }
    document.addEventListener('visibilitychange', onVis, { passive: true })
    if (opts.rootRef?.value) {
      io = new IntersectionObserver((entries) => { inView.value = entries[0]?.isIntersecting ?? true; evaluate() }, { rootMargin: '120px' })
      io.observe(opts.rootRef.value)
    }
    evaluate()
  })
  watch(inView, evaluate)
  onBeforeUnmount(() => { stop(); io?.disconnect(); document.removeEventListener('visibilitychange', onVis) })

  return { inView, reduced }
}

/** Ease a live value toward a target (frame-rate independent-ish per tick). */
export function approach(current: number, target: number, factor = 0.16): number {
  return current + (target - current) * factor
}
