# Lenis Engineering

**Business:** Smooth scrolling that feels natural.
**User:** Effortless scroll with physically-plausible momentum.
**Owner:** `app.vue` (lifecycle), `ScrollController` (semantics)
**Acceptance:** Single Lenis instance. autoRaf: false. Driven by gsap.ticker.

---

## Setup

| Property | Value | Reason |
|----------|-------|--------|
| `root` | `true` | Attach to viewport |
| `autoRaf` | `false` | GSAP ticker owns the frame loop |
| `lerp` | `0.1` | Smooth but responsive |
| Reduced motion | `lerp: 1` | Instant scroll, no animation |

## Vendoring

Lenis is vendored under `lib/lenis/` with Vite aliases in `nuxt.config.ts`. The npm package exists only for TypeScript declarations. The `lenis/nuxt` module is not used — `app.vue` imports `{ VueLenis, useLenis }` directly from `"lenis/vue"`.

## Integration

```
gsap.ticker.add(driveLenis)
  → lenisRef.value.raf(time * 1000)
    → lenis 'scroll' event
      → ScrollTrigger.update()
```

This ensures the smoothed scroll position and all ScrollTriggers update on the same frame.
