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

  // TOUCH DEVICES GET NATIVE SCROLL, and this is a performance fix, not a
  // preference. Lenis deliberately does not smooth touch (see touchMultiplier
  // below) — the OS momentum is better — but the instance still runs every
  // frame, and its `actualScroll` getter reads layout on each one while
  // `lenis.on("scroll", ...)` drives a full ScrollTrigger.update. Profiled on a
  // throttled phone that was ~8.5% of frame time in the getter alone, for no
  // touch benefit at all. Measured after removing it: p95 frame 196ms -> 132ms.
  //
  // Native scrolling is hardware-accelerated and already smooth; ScrollTrigger
  // reads the real window scroll either way, so every pinned scene still works.
  const coarse = window.matchMedia("(pointer: coarse)").matches
    || !window.matchMedia("(pointer: fine)").matches

  if (reduced || coarse) {
    // No interpolation — native scroll + ScrollTrigger.
    //
    // A STAND-IN IS STILL PROVIDED. Ten components call `$lenis.stop()` /
    // `.start()` to lock the page behind a full-screen Explore overlay, and
    // several call `.scrollTo()` for in-page jumps. Dropping the injection
    // outright would silently break the scroll lock on exactly the devices this
    // branch exists for — the page would scroll underneath an open overlay.
    // Native equivalents keep every existing call site working untouched.
    let locked = ""
    nuxtApp.provide("lenis", {
      stop() {
        locked = document.documentElement.style.overflow
        document.documentElement.style.overflow = "hidden"
      },
      start() {
        document.documentElement.style.overflow = locked
      },
      scrollTo(target: number | string | HTMLElement, opts?: { offset?: number, immediate?: boolean }) {
        const offset = opts?.offset ?? 0
        let y = 0
        if (typeof target === "number") y = target
        else {
          const el = typeof target === "string" ? document.querySelector(target) : target
          if (!el) return
          y = el.getBoundingClientRect().top + window.scrollY
        }
        window.scrollTo({ top: y + offset, behavior: opts?.immediate ? "auto" : "smooth" })
      },
      resize() {},
      on() {},
      off() {},
      raf() {},
      destroy() {},
    })

    nuxtApp.hook("page:finish", () => {
      if (!window.location.hash) window.scrollTo({ top: 0, behavior: "auto" })
      ScrollTrigger.refresh()
    })
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
