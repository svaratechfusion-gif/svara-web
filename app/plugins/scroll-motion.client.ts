// SCROLL MOTION — the layer that makes the page *respond* to scrolling.
//
// Smooth scrolling itself is NOT here: it is owned by the single Lenis instance in
// `lenis.client.ts`, driven by gsap.ticker. This plugin adds no scroll driver, no second
// rAF and no ScrollSmoother — doing so would be the double-smoothing bug that
// lib/gsap/config.ts explicitly warns about. It only *reads* the scroll and drives motion
// from it, on that same ticker.
//
// It runs AFTER lenis.client.ts (Nuxt orders plugins by filename: l < s), but it never
// touches `$lenis` for measurement — position and velocity are derived from window.scrollY
// so every signal below works identically under reduced motion, where Lenis is
// deliberately not initialised and the page uses native scroll.
//
// WHAT IT PUBLISHES (global, safe on every page):
//
//   --scroll-progress   0 → 1 down the document        (on <html>)
//   --scroll-velocity   -1 → 1, signed, eased          (on <html>)
//   .is-scrolling       present on <html> while moving (on <html>)
//
// WHAT IT OFFERS (opt-in, per element — nothing is applied automatically):
//
//   data-parallax="0.3"    drifts against the scroll as it crosses the viewport
//   data-scroll-skew       shears with scroll velocity, settles when you stop
//
// Opt-in is deliberate. This site is full of pinned scenes (/products), fixed-position
// video grounds (/divisions, /architecture, /investors, /contact) and WebGL layers;
// blanket-transforming every section would break all three.
import { gsap, ScrollTrigger } from '~~/lib/gsap'

/** Below this, a velocity reading is noise and the page counts as still. */
const STILL = 0.02
/** Velocity is normalised against this px/frame before clamping to ±1. */
const VELOCITY_SCALE = 55
/** Max shear, in degrees, at full velocity. */
const SKEW_MAX = 2.4
/** How fast the eased velocity chases the raw reading (0..1 per frame). */
const VELOCITY_LERP = 0.12

export default defineNuxtPlugin((nuxtApp) => {
  const root = document.documentElement
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // ── the global scroll signals ──────────────────────────────────────────────
  let lastY = window.scrollY
  let eased = 0
  let progress = -1
  let scrolling = false
  let stillFrames = 0

  const setVar = (name: string, value: number, prev: number, epsilon: number): number => {
    if (Math.abs(value - prev) < epsilon) return prev
    root.style.setProperty(name, value.toFixed(4))
    return value
  }

  let lastVelocityVar = 0
  const tick = (): void => {
    const y = window.scrollY
    const raw = y - lastY
    lastY = y

    // progress
    const scrollable = document.documentElement.scrollHeight - window.innerHeight
    const p = scrollable > 0 ? Math.min(1, Math.max(0, y / scrollable)) : 0
    progress = setVar('--scroll-progress', p, progress, 0.001)

    // velocity, eased so a flick decays instead of snapping
    const target = Math.max(-1, Math.min(1, raw / VELOCITY_SCALE))
    eased += (target - eased) * VELOCITY_LERP
    if (Math.abs(eased) < 0.0005) eased = 0
    lastVelocityVar = setVar('--scroll-velocity', eased, lastVelocityVar, 0.002)

    // .is-scrolling — held for a few still frames so it does not strobe
    const moving = Math.abs(eased) > STILL
    if (moving) stillFrames = 0
    else stillFrames++
    const next = moving || stillFrames < 8
    if (next !== scrolling) {
      scrolling = next
      root.classList.toggle('is-scrolling', scrolling)
    }

    // velocity shear on opted-in elements
    if (!reduced && skewEls.length) {
      const deg = eased * SKEW_MAX
      for (const el of skewEls) el.style.transform = `skewY(${deg.toFixed(3)}deg)`
    }
  }

  let skewEls: HTMLElement[] = []
  const triggers: ScrollTrigger[] = []

  // ── opt-in effects, rebuilt per page ───────────────────────────────────────
  const teardownEffects = (): void => {
    for (const t of triggers.splice(0)) t.kill()
    for (const el of skewEls) el.style.transform = ''
    skewEls = []
  }

  const buildEffects = (): void => {
    teardownEffects()
    if (reduced) return

    // data-parallax="0.3" → drifts ±(0.3 × 100)px across its viewport crossing.
    for (const el of Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))) {
      const depth = Number.parseFloat(el.dataset.parallax || '0.2')
      if (!Number.isFinite(depth) || depth === 0) continue
      const shift = depth * 100

      // An element that drifts inside an `overflow: hidden` frame would expose a gap at
      // whichever edge it pulls away from. Scale it up by just enough to stay covered
      // across the full ±shift travel — computed from its measured height, so a tall
      // image is barely scaled and a short one is scaled more.
      const h = el.getBoundingClientRect().height
      const cover = h > 0 ? 1 + (2 * shift) / h : 1

      const tween = gsap.fromTo(
        el,
        { y: -shift, scale: cover },
        {
          y: shift,
          scale: cover,
          ease: 'none',
          scrollTrigger: {
            // The frame the element travels inside. Defaults to the parent, but an
            // <img> is often wrapped in a <picture>, which is inline and therefore has
            // no usable trigger box — mark the real frame with `data-parallax-frame`.
            trigger: el.closest('[data-parallax-frame]') ?? el.parentElement ?? el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      )
      const st = tween.scrollTrigger
      if (st) triggers.push(st)
    }

    skewEls = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-skew]'))
  }

  // ── in-page anchors go through the smooth scroller ─────────────────────────
  // Capture phase, and only `#…` links: the product-explore plugin owns `/products/…`
  // clicks on the same phase and the two must not contend for the same anchor.
  const onClick = (e: MouseEvent): void => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = (e.target as Element | null)?.closest?.('a')
    const href = a?.getAttribute('href')
    if (!href || !href.startsWith('#') || href.length < 2) return
    const target = document.querySelector(href)
    if (!target) return
    e.preventDefault()
    const lenis = (nuxtApp as unknown as { $lenis?: { scrollTo: (t: Element, o?: object) => void } }).$lenis
    if (lenis) lenis.scrollTo(target, { offset: -12 })
    else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })

    // preventDefault() suppressed the browser's own hash update along with its jump, so
    // put the hash back: without it the section is not linkable and Back does nothing.
    // replaceState rather than pushState — matching the native anchor behaviour of not
    // stacking a history entry per in-page jump would need pushState, but this site's
    // anchors are section jumps within one page, and stacking them makes Back feel broken.
    if (window.location.hash !== href) window.history.replaceState(null, '', href)
  }

  document.addEventListener('click', onClick, true)
  gsap.ticker.add(tick)
  nuxtApp.hook('page:finish', () => {
    // let the new page paint before measuring its parallax targets
    requestAnimationFrame(() => { buildEffects(); ScrollTrigger.refresh() })
  })
  buildEffects()

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      gsap.ticker.remove(tick)
      document.removeEventListener('click', onClick, true)
      teardownEffects()
    })
  }
})
