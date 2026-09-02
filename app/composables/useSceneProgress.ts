// SCENE PROGRESS — the ONE subscription point for the Products cinematic scroll.
//
// Every consumer (overlays, dashboard stages, atmosphere, title cards) subscribes
// here with a plain callback and receives the shared, frame-memoised progress
// `0 → 1`. There is exactly ONE tick, and it is registered on `gsap.ticker` —
// the site's single tick source, the same one that drives Lenis (see
// app/plugins/lenis.client.ts). No component spawns a competing rAF loop.
//
// Callbacks write straight to element style. That is deliberate: pushing a
// per-frame number through Vue reactivity would re-render every subscribed
// component 60 times a second for what is, in the end, one transform string.
//
// SEVERAL SCENES, STILL ONE TICK. /products now holds two independent pinned
// scenes — the hero, and the film below the Stride block — so "the scene's
// progress" is no longer a single number. A component picks its scene by
// injection: whichever ancestor provided `SCENE_PROGRESS_EL` owns it, and a
// component with no such ancestor keeps the original whole-page behaviour (which
// is what /divisions' DivAtmosphere relies on). Subscribers are bucketed by
// scene; the one ticker walks the buckets.
import { inject, onBeforeUnmount, onMounted, ref, type InjectionKey, type Ref } from 'vue'
import { getScrollProgress, getElementProgress } from '~/utils/scroll-progress'

type Subscriber = (progress: number) => void

/**
 * Provide the progress source for every descendant.
 *
 * Either the wrapper element whose scroll drives a pinned scene (ProductHeroPin), or a
 * function returning 0 → 1 directly — which is how a normal flow block reveals on entry
 * without being pinned at all (SceneReveal).
 */
export type SceneProgressSource = Ref<HTMLElement | null> | (() => number)
export const SCENE_PROGRESS_EL: InjectionKey<SceneProgressSource> = Symbol('scene-progress-el')

interface Bucket {
  src: () => number
  subs: Set<Subscriber>
  last: number
}

/** `null` is the default bucket: whole-page progress, for components outside a scene. */
const buckets = new Map<SceneProgressSource | null, Bucket>()
let ticking = false
let removeTick: (() => void) | null = null

function totalSubscribers(): number {
  let n = 0
  for (const b of buckets.values()) n += b.subs.size
  return n
}

function tick(): void {
  for (const b of buckets.values()) {
    const p = b.src()
    if (p === b.last) continue // idle — this scene didn't move
    b.last = p
    for (const fn of b.subs) fn(p)
  }
}

async function start(): Promise<void> {
  if (ticking) return
  ticking = true
  const { gsap } = await import('~~/lib/gsap')
  if (!ticking) return // unsubscribed while the module was loading
  gsap.ticker.add(tick)
  removeTick = () => gsap.ticker.remove(tick)
}

function stop(): void {
  ticking = false
  removeTick?.()
  removeTick = null
}

/**
 * Subscribe to the scene's scroll progress. The callback fires once immediately
 * on mount (so the scene is correct on first paint after hydration) and then on
 * every frame the scroll actually moved. Auto-unsubscribes on unmount.
 */
export function useSceneProgress(onProgress: Subscriber): void {
  // Resolved at setup, not on mount: injection is only available synchronously.
  const sceneEl = inject(SCENE_PROGRESS_EL, null)

  onMounted(() => {
    let bucket = buckets.get(sceneEl)
    if (!bucket) {
      bucket = {
        src: !sceneEl
          ? getScrollProgress
          : typeof sceneEl === 'function'
            ? sceneEl
            : () => getElementProgress(sceneEl.value),
        subs: new Set(),
        last: Number.NaN,
      }
      buckets.set(sceneEl, bucket)
    }
    bucket.subs.add(onProgress)
    if (totalSubscribers() === 1) void start()
    onProgress(bucket.src())
  })

  onBeforeUnmount(() => {
    const bucket = buckets.get(sceneEl)
    if (!bucket) return
    bucket.subs.delete(onProgress)
    if (bucket.subs.size === 0) buckets.delete(sceneEl)
    if (totalSubscribers() === 0) stop()
  })
}

/**
 * A boolean ref that is `true` while progress sits inside `[from, to]`.
 *
 * This is the switch the text reveals play on — and the reason they can play
 * **out** as well as in. Progress alone can't do that: it only ever increases
 * while you scroll forward, so an animation driven by progress can never walk
 * itself back. A window boolean flips both ways, in both scroll directions.
 */
export function useSceneWindow(from: number, to: number, pad = 0): Ref<boolean> {
  const active = ref(false)
  useSceneProgress((p) => {
    const next = p >= from - pad && p <= to + pad
    if (active.value !== next) active.value = next
  })
  return active
}

const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v)

/** Linear 0→1 across `[a, b]`; a hard step at `a` when the window has no width. */
export function ramp(p: number, a: number, b: number): number {
  return b > a ? clamp01((p - a) / (b - a)) : p >= a ? 1 : 0
}

/** Smoothstep — the easing every scene transition uses, so they read as one system. */
export function smooth(t: number): number {
  const c = clamp01(t)
  return c * c * (3 - 2 * c)
}

/** Smoother (quintic) — for the long, slow camera-ish moves. */
export function smoother(t: number): number {
  const c = clamp01(t)
  return c * c * c * (c * (c * 6 - 15) + 10)
}

export { clamp01 }
