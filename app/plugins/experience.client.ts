// EXPERIENCE POLISH — the one orchestrator for premium motion.
// Everything here is opt-in via data attributes; zero layout/content change.
//
//   [data-split]        SplitText line reveal on large headings
//   [data-mask-reveal]  clip-path mask reveal for images (figure wraps img)
//   [data-parallax]     subtle scrub parallax on hero/section visuals
//
// Plus: one MASTER timeline (scrubbed over the whole page) that connects
// section transitions — it drives the blueprint layer's drift and a global
// progress custom property; and one rAF-throttled pointer bus feeding
// --mx / --my for cursor-reactive glass reflections.
//
// Performance: transform/opacity only, passive listeners, quickSetters,
// will-change scoped to animation lifetime, everything skipped under
// prefers-reduced-motion.

import { gsap, ScrollTrigger, SplitText } from '~~/lib/gsap'
import { ease, stagger } from '~~/lib/animation/motion'

export default defineNuxtPlugin((nuxtApp) => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return

  // ---------- pointer bus (cursor-reactive reflections) ----------
  const root = document.documentElement
  const setMx = gsap.quickSetter(root, '--mx') as (v: number) => void
  const setMy = gsap.quickSetter(root, '--my') as (v: number) => void
  let px = 0.5, py = 0.35, queued = false
  window.addEventListener('pointermove', (e) => {
    px = e.clientX / window.innerWidth
    py = e.clientY / window.innerHeight
    if (!queued) {
      queued = true
      requestAnimationFrame(() => { setMx(px); setMy(py); queued = false })
    }
  }, { passive: true })
  setMx(px); setMy(py)

  // ---------- per-page wiring (torn down + re-run on each route change) ----------
  // All GSAP work is created inside a gsap.context(): a single `ctx.revert()`
  // kills every timeline + ScrollTrigger it made and reverts the inline styles.
  // SplitText's DOM rewrite isn't tracked by the context, so those instances are
  // reverted explicitly. `teardown()` runs at the top of every `wire()`, so at
  // most one generation of motion ever exists — no duplicate master timelines,
  // orphaned ScrollTriggers, or stale SplitText across navigations.
  let ctx: ReturnType<typeof gsap.context> | null = null
  const splits: SplitText[] = []

  function teardown() {
    for (const s of splits) s.revert()
    splits.length = 0
    ctx?.revert()
    ctx = null
  }

  function wire() {
    teardown()
    ctx = gsap.context(() => {
      // 1 · SplitText on large headings
      for (const el of document.querySelectorAll<HTMLElement>('[data-split]:not([data-split-done])')) {
        el.dataset.splitDone = '1'
        const split = new SplitText(el, { type: 'lines', linesClass: 'split-line' })
        splits.push(split)
        for (const line of split.lines) {
          const wrap = document.createElement('span')
          wrap.className = 'split-mask'
          line.parentNode!.insertBefore(wrap, line)
          wrap.appendChild(line)
        }
        gsap.set(split.lines, { yPercent: 110, willChange: 'transform' })
        ScrollTrigger.create({
          trigger: el,
          start: 'top 86%',
          once: true,
          onEnter: () => gsap.to(split.lines, {
            yPercent: 0,
            duration: 0.9,
            ease: ease.out,
            stagger: stagger.base,
            onComplete: () => gsap.set(split.lines, { willChange: 'auto' }),
          }),
        })
      }

      // 2 · Mask-based image reveals
      for (const fig of document.querySelectorAll<HTMLElement>('[data-mask-reveal]:not([data-mask-done])')) {
        fig.dataset.maskDone = '1'
        const img = fig.querySelector('img')
        if (!img) continue
        gsap.set(fig, { clipPath: 'inset(0% 0% 100% 0%)', willChange: 'clip-path' })
        gsap.set(img, { scale: 1.14, willChange: 'transform' })
        ScrollTrigger.create({
          trigger: fig,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(fig, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.0, ease: ease.out })
            gsap.to(img, {
              scale: 1, duration: 1.3, ease: ease.out,
              onComplete: () => { gsap.set([fig, img], { willChange: 'auto' }) },
            })
          },
        })
      }

      // 5 · Subtle parallax on hero/section visuals
      for (const el of document.querySelectorAll<HTMLElement>('[data-parallax]:not([data-parallax-done])')) {
        el.dataset.parallaxDone = '1'
        const amount = Number(el.dataset.parallax) || 6
        gsap.fromTo(el, { yPercent: amount }, {
          yPercent: -amount,
          ease: 'none',
          scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        })
      }

      // 4 + 9 · MASTER timeline — one scrubbed timeline across the page,
      // connecting sections: drives blueprint drift + global progress var.
      const blueprint = document.querySelector<HTMLElement>('.blueprint-layer')
      const master = gsap.timeline({
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.8 },
      })
      master.fromTo(root, { '--scroll-progress': 0 }, { '--scroll-progress': 1, ease: 'none' }, 0)
      if (blueprint) {
        master.fromTo(blueprint,
          { backgroundPosition: '0px 0px', opacity: 0.04 },
          { backgroundPosition: '0px -160px', opacity: 0.055, ease: 'none' }, 0)
      }
    })
  }

  // setTimeout (not rAF): rAF is suspended in occluded/background tabs,
  // which would leave the page unwired until first focus.
  // Guard on pathname: both `app:suspense:resolve` and `page:finish` fire on the
  // initial load, and we must wire the page exactly ONCE per route (a second
  // wire() would teardown the first's freshly-created SplitText). teardown()
  // then runs only on a genuine route change.
  let lastPath = ""
  const schedule = () => {
    setTimeout(() => {
      const path = window.location.pathname
      if (path === lastPath) return
      lastPath = path
      wire()
      ScrollTrigger.refresh()
    }, 0)
  }
  // HYDRATION SAFETY: wire() runs SplitText, which mutates [data-split] headings
  // into <span class="split-mask"> wrappers. On initial load this MUST wait until
  // hydration is fully settled — the page sections are Suspense-wrapped and
  // hydrate after the root mounts, so firing on `app:mounted` corrupts the DOM
  // mid-hydration (server plain text vs client-mutated spans). `app:suspense:resolve`
  // fires after the top-level page Suspense resolves = post-hydration.
  nuxtApp.hook('app:suspense:resolve', schedule) // initial load (after hydration)
  nuxtApp.hook('page:finish', schedule)          // client-side navigations

  // Vite HMR: tear the whole context down so an edit doesn't stack a second
  // generation of timelines/ScrollTriggers/SplitText on top of the live one.
  if (import.meta.hot) import.meta.hot.dispose(teardown)
})
