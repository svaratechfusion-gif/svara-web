// GSAP HERO GLITCH — one shared "signal lock" burst used by every hero heading and
// subheading (via the `v-glitch` directive in plugins/glitch.client.ts).
//
// Design constraints that shaped this:
//
//  - LAYOUT-SAFE. Only transform / opacity / text-shadow / clip-path are touched, so a
//    glitching heading never reflows the hero it sits in.
//  - IT PLAYS SECOND. Every hero already owns an entrance (motion-v `:animate`, a CSS
//    `@keyframes` class like `.bh-anim` / `.rise`, or `v-reveal`). The burst is therefore
//    delayed past that entrance instead of competing with it, and `neutraliseEntrance`
//    retires a *finished* CSS animation first — a filling `animation-fill-mode: forwards`
//    outranks inline styles in the cascade, so GSAP's transform would silently do nothing
//    on those elements otherwise.
//  - IT LEAVES NO TRACE. The timeline ends on `clearProps`, so the element returns to
//    exactly its authored state and repeated bursts never accumulate inline style.
// ~~/lib/gsap is the project's single GSAP entry point (it registers every plugin and
// applies the house motion config); importing the bare gsap specifier here would bypass
// that contract.
import { gsap } from '~~/lib/gsap'

export interface GlitchOptions {
  /** seconds to wait before the first burst — must clear the hero's own entrance */
  delay?: number
  /** 0..1 scale on displacement + aberration; subheadings read better below 1 */
  intensity?: number
  /**
   * Horizontal slice cuts (clip-path). Turn OFF for a heading whose children are
   * absolutely positioned: clip-path clips the whole subtree against the element's own
   * border box, and such a heading is usually zero-height — the slice would erase it.
   */
  slice?: boolean
  /** keep firing occasional bursts after the first one */
  idle?: boolean
  /** random idle gap, in seconds */
  idleMin?: number
  idleMax?: number
}

const CYAN = 'rgba(0, 229, 255, 0.9)'
const MAGENTA = 'rgba(255, 42, 138, 0.75)'

/** chromatic aberration: the two channels split symmetrically around the glyphs */
function aberration(dx: number): string {
  return `${-dx}px 0 0 ${CYAN}, ${dx}px 0 0 ${MAGENTA}`
}

/**
 * Elements whose CSS entrance we retired. Their inline `opacity: 1` is LOAD-BEARING and
 * must never be cleared — see `releaseOpacity`.
 */
const neutralised = new WeakSet<HTMLElement>()

/**
 * A finished CSS entrance keeps applying its end state (`forwards` / `both`) and beats
 * inline styles, so GSAP could not move the element. Retire the animation and pin the
 * end state it had reached. Only safe once that entrance has actually completed.
 */
function neutraliseEntrance(el: HTMLElement): void {
  if (getComputedStyle(el).animationName === 'none') return
  el.style.animation = 'none'
  el.style.opacity = '1'
  el.style.filter = 'none'
  neutralised.add(el)
}

/**
 * Hand `opacity` back — but NOT by clearing it on an element whose entrance we retired.
 *
 * Those entrances are written as `opacity: 0` in the base rule plus a `forwards` keyframe
 * that ends at 1 (`.bh-anim` on the blog hero is exactly this). Once `animation: none` is
 * set, the keyframe is gone and the base rule is all that is left — so clearing the inline
 * `opacity: 1` made the heading and subheading fade in, glitch, and then VANISH. The
 * inline value is the only thing holding them visible.
 */
function releaseOpacity(el: HTMLElement): void {
  if (neutralised.has(el)) el.style.opacity = '1'
  else el.style.removeProperty('opacity')
}

/**
 * One burst, expressed as a frame table so the whole feel can be tuned in one place
 * rather than by editing a chain of `.to()` calls.
 *
 * Every value is multiplied by `intensity`, so a subheading can run the identical
 * choreography at a lower amplitude instead of a different, hand-tuned one.
 *
 *  x/y    px of displacement (the "signal jump")
 *  skew   degrees of shear
 *  op     opacity — the deep dips are what make it read as dropped frames
 *  ab     px of chromatic aberration (cyan left / magenta right)
 *  clip   horizontal slice kept visible this frame
 */
interface GlitchFrame {
  x: number
  y: number
  skew: number
  op: number
  ab: number
  clip: string
}

const FRAMES: readonly GlitchFrame[] = [
  { x: -9, y: 1, skew: 3.2, op: 0.90, ab: 6.0, clip: 'inset(14% 0 42% 0)' },
  { x: 13, y: -2, skew: -4.6, op: 0.68, ab: 9.5, clip: 'inset(58% 0 8% 0)' },
  { x: -7, y: 2, skew: 2.4, op: 1.00, ab: 4.5, clip: 'inset(2% 0 74% 0)' },
  { x: 11, y: -1, skew: -3.8, op: 0.78, ab: 8.0, clip: 'inset(76% 0 4% 0)' },
  { x: -6, y: 1, skew: 2.6, op: 0.94, ab: 5.5, clip: 'inset(34% 0 40% 0)' },
  { x: 7, y: -1, skew: -1.6, op: 0.86, ab: 3.5, clip: 'inset(8% 0 62% 0)' },
]

/** The tail: after settling, one late stutter, so the burst does not end on a tidy beat. */
const TAIL: readonly GlitchFrame[] = [
  { x: -5, y: 0, skew: 1.8, op: 0.82, ab: 5.0, clip: 'inset(46% 0 30% 0)' },
  { x: 4, y: 0, skew: -1.2, op: 0.95, ab: 3.0, clip: 'inset(12% 0 66% 0)' },
]

/** Hard cuts on a stepped ease, a fast settle, a beat, then a late double-tap. */
export function glitchBurst(el: HTMLElement, intensity = 1, slice = true): gsap.core.Timeline {
  const i = intensity
  const tl = gsap.timeline({ defaults: { duration: 0.05, ease: 'steps(1)' } })
  const cut = (v: string) => (slice ? { clipPath: v } : {})

  const frame = (f: GlitchFrame) =>
    tl.to(el, {
      x: f.x * i, y: f.y * i, skewX: f.skew * i,
      opacity: f.op, textShadow: aberration(f.ab * i), ...cut(f.clip),
    })

  const settle = (duration: number) =>
    tl.to(el, {
      x: 0, y: 0, skewX: 0, opacity: 1,
      textShadow: aberration(0), ...cut('inset(0% 0 0% 0)'),
      duration, ease: 'power2.out',
    })

  tl.call(() => neutraliseEntrance(el))
    .set(el, { willChange: 'transform, opacity' })

  FRAMES.forEach(frame)
  settle(0.09)
  tl.to(el, { duration: 0.11 })   // the beat that makes the tail land as a second hit
  TAIL.forEach(frame)
  settle(0.12)

  // hand the element back exactly as authored — no residue between bursts.
  // `opacity` is deliberately NOT in clearProps; releaseOpacity decides per element.
  tl.set(el, { clearProps: 'transform,textShadow,clipPath,willChange' })
  tl.call(() => releaseOpacity(el))

  return tl
}

/**
 * Attach the glitch to one element. Returns a teardown that kills the timeline and any
 * pending idle burst — the directive calls it on unmount so route changes leave nothing
 * running.
 */
export function attachGlitch(el: HTMLElement, opts: GlitchOptions = {}): () => void {
  const {
    delay = 0.9,
    intensity = 1,
    slice = true,
    idle = true,
    idleMin = 3.5,
    idleMax = 8,
  } = opts

  let tl: gsap.core.Timeline | null = null
  let idleTimer: ReturnType<typeof setTimeout> | null = null
  let killed = false

  const scheduleIdle = (): void => {
    if (!idle || killed) return
    const wait = (idleMin + Math.random() * (idleMax - idleMin)) * 1000
    idleTimer = setTimeout(() => {
      if (killed || !el.isConnected) return
      // a burst on a scrolled-away hero is wasted work
      const r = el.getBoundingClientRect()
      if (r.bottom > 0 && r.top < window.innerHeight) {
        tl = glitchBurst(el, intensity, slice)
        tl.eventCallback('onComplete', scheduleIdle)
      } else {
        scheduleIdle()
      }
    }, wait)
  }

  const start = (): void => {
    if (killed) return
    tl = glitchBurst(el, intensity, slice)
    tl.delay(delay)
    tl.eventCallback('onComplete', scheduleIdle)
  }

  start()

  return () => {
    killed = true
    if (idleTimer) clearTimeout(idleTimer)
    tl?.kill()
    // same rule on teardown: clearing opacity here would strand a retired entrance at 0
    gsap.set(el, { clearProps: 'transform,textShadow,clipPath,willChange' })
    releaseOpacity(el)
  }
}
