# Performance Engineering

**Business:** A janky experience destroys trust.
**User:** Smooth, responsive, 60fps.
**Owner:** OpenCode
**Acceptance:** Lighthouse ≥ 90 all metrics. 60fps on target devices.

---

## Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 90 |
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Frame rate | 60fps |
| JS bundle (gzipped) | < 500KB |

## Mobile

| Constraint | Limit |
|------------|-------|
| Particles | ≤ 10,000 |
| Three.js | No post-processing |
| Lenis lerp | 0.15 (less aggressive smoothing) |
| GSAP | Reduced motion: no tweens |

## Key Patterns

- `gsap.ticker` is the single rAF pump (no duplicate `requestAnimationFrame`)
- `ScrollTrigger.config({ ignoreMobileResize: true })`
- `document.fonts.ready` → `ScrollTrigger.refresh()` (prevents layout shift reflow)
- Fontsource for self-hosted Geist Sans (no Google Fonts latency)
- Vendored GSAP + Lenis (no CDN dependency)
