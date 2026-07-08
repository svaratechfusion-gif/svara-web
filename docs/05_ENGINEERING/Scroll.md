# Scroll Language

**Business:** Scroll is the UX. If it breaks, the experience breaks.
**User:** Progress through the narrative at their own pace.
**Owner:** `ScrollController` + `MasterTimeline` (lib/experience/)
**Acceptance:** Single ScrollTrigger for entire page. Single MasterTimeline. No component creates its own.

---

## Phases

| % | Phase | Emotion | Systems Active |
|---|-------|---------|----------------|
| 0% | Birth | Curiosity | Camera (static), Particles (assembling) |
| 12% | Emergence | Discovery | Camera (slow push), Particles (connecting) |
| 24% | Intelligence | Wonder | Camera (orbit), Lighting (rising) |
| 36% | Collapse | Concern | Camera (pull back), Particles (disconnect) |
| 48% | Reconnect | Relief | Lighting (peak 80%), Particles (re-link) |
| 60% | Products | Confidence | Camera (fly through), Clusters |
| 72% | Industries | Trust | Camera (rise), Landscapes |
| 84% | Scale | Respect | Camera (pull back), Grid |
| 100% | Exit | Action | Camera (settle), Typography resolves |

## Infrastructure

- Lenis `autoRaf: false` — `gsap.ticker` calls `lenis.raf()`
- `ScrollController` creates one `ScrollTrigger` scrubbing `MasterTimeline`
- `MasterTimeline` is `paused: true`, driven by scroll progress
- `gsap.ticker.lagSmoothing(0)` — no delay compensation
- Reduced motion: Lenis lerp = 1, no GSAP tweens
