// SMOOTH SCROLL — the single authoritative scroll system for the whole site.
//
// Architecture (Phase 01B, Decision 02):
//
//     Lenis  ──drives──▶  virtual scroll position (real window scroll)
//       ▲                        │
//       │ raf(time)              │ 'scroll' event
//   gsap.ticker  ◀── ONE rAF ────┘
//       │
//       └──▶ ScrollTrigger.update()  (pins / scrubs / reveals stay in sync)
//
// - ONE Lenis instance, ONE tick source (gsap.ticker). No component may spawn a
//   competing requestAnimationFrame loop for scrolling.
// - Client-only (`.client`) — `new Lenis()` touches window; never runs on SSR.
// - Reduced-motion: Lenis is NOT initialised; native scroll is used and
//   ScrollTrigger still works (it reads the real window scroll either way).
// - Route compatible: on `page:finish` we reset to top (unless there's a hash),
//   resize, and refresh ScrollTrigger so pinned scenes recompute for the new
//   page. Cleanup on app unmount + HMR dispose.
//
// The instance is provided as `$lenis` (via useNuxtApp) for programmatic scroll
// (anchor links, "back to top"). Do not `new Lenis()` anywhere else.
import Lenis from "lenis"
import { gsap, ScrollTrigger } from "~~/lib/gsap"

export default defineNuxtPlugin((nuxtApp) => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (reduced) {
    // No interpolation under reduced motion — native scroll + ScrollTrigger.
    nuxtApp.hook("page:finish", () => ScrollTrigger.refresh())
    return
  }

  const lenis = new Lenis({
    // lerp mode (frame-rate independent), not duration mode: duration mode restarts a
    // fixed-length tween on every wheel step, which stutters under a fast scroll.
    //
    // 0.075 rather than the original 0.1 — a longer glide that still tracks the pointer.
    // This is THE knob for the site's scroll feel: raise it toward 0.12 for a tighter,
    // more immediate page; drop it toward 0.05 for a heavier cinematic drift. Below ~0.04
    // it reads as lag rather than weight.
    lerp: 0.075,
    smoothWheel: true,
    wheelMultiplier: 1,
    // Touch is left to the OS: Lenis does not smooth touch, and its native momentum is
    // better than anything interpolated here.
    touchMultiplier: 1.5,
  })

  // ONE tick source: gsap.ticker drives Lenis's raf (Lenis runs no rAF of its own).
  const raf = (time: number) => lenis.raf(time * 1000) // gsap time is seconds → ms
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0) // scroll must not lag-smooth

  // Keep ScrollTrigger's pin/scrub math in sync with every Lenis scroll frame.
  lenis.on("scroll", ScrollTrigger.update)

  // Expose for programmatic scroll.
  nuxtApp.provide("lenis", lenis)

  // Route changes: reset scroll (respect in-page anchors), resize, recompute triggers.
  nuxtApp.hook("page:finish", () => {
    if (!window.location.hash) lenis.scrollTo(0, { immediate: true })
    lenis.resize()
    ScrollTrigger.refresh()
  })

  // Teardown — the instance is a page-lifetime singleton in production (the SPA
  // root never unmounts), so the only teardown that matters is Vite HMR dispose
  // in dev, which otherwise stacks duplicate ticker callbacks + Lenis instances.
  const destroy = () => {
    gsap.ticker.remove(raf)
    lenis.destroy()
  }
  if (import.meta.hot) import.meta.hot.dispose(destroy)
})
