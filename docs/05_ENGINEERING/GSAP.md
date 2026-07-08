# GSAP Engineering

**Business:** GSAP drives all animation. One owner. One timeline. No exceptions.
**User:** (transparent — engineering concern)
**Owner:** `MotionDirector`
**Acceptance:** No component imports or calls GSAP. Only `MotionDirector` and its subsystems.

---

## Contracts

| Contract | Enforcement |
|----------|-------------|
| Single rAF pump | `gsap.ticker` is the only frame pump |
| No `gsap.to()` in components | Lint for GSAP imports in `components/` |
| No `gsap.timeline()` in components | All timelines through `MasterTimeline` |
| No `ScrollTrigger.create()` in components | All triggers through `ScrollController` |
| No `requestAnimationFrame()` outside ticker | Single `gsap.ticker.add()` in `app.vue` |

## Plugins Loaded

- ScrollTrigger
- Club premium plugins (registered in `lib/gsap/register.ts`)

## Setup

- `gsap.ticker.lagSmoothing(0)` — disable lag compensation
- `gsap.ticker.add(driveLenis)` — Lenis runs on GSAP's ticker
- `document.fonts.ready.then(() => ScrollTrigger.refresh())` — reflow after font load
