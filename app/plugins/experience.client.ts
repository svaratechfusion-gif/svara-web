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
import { duration, ease, stagger } from '~~/lib/animation/motion'

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

  // ---------- per-page wiring (re-run on route change) ----------
  const cleanups: Array<() => void> = []

  function wire() {
    // 1 · SplitText on large headings
    for (const el of document.querySelectorAll<HTMLElement>('[data-split]:not([data-split-done])')) {
      el.dataset.splitDone = '1'
      const split = new SplitText(el, { type: 'lines', linesClass: 'split-line' })
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
      cleanups.push(() => split.revert())
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
    cleanups.push(() => { master.scrollTrigger?.kill(); master.kill() })
  }

  // setTimeout (not rAF): rAF is suspended in occluded/background tabs,
  // which would leave the page unwired until first focus.
  const schedule = () => setTimeout(() => { wire(); ScrollTrigger.refresh() }, 0)
  nuxtApp.hook('app:mounted', schedule)   // initial load
  nuxtApp.hook('page:finish', schedule)   // client-side navigations
})
