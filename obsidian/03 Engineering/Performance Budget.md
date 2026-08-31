---
tags: [architecture, performance, stable]
updated: 2026-07-13
---

# Performance Budget

## Helios particle budgets (device-tier)

`lib/helios/utils/device.ts` detects a device tier and caps particle count accordingly:

| Tier | Particle count |
|---|---|
| Desktop | 18,000 |
| Laptop | 13,000 |
| Tablet | 8,000 |
| Mobile | 4,000 |

Desktop/laptop land inside the originally-specified 12,000–20,000 band; tablet/mobile
intentionally scale below it for hardware/performance headroom.

## Adaptive quality ladder

`lib/helios/utils/adaptiveQuality.ts` (`AdaptiveQuality`) — watches smoothed FPS against the
tier's target and steps down/up through four levels, **degrading background detail before
entity quality**, and recovering slowly (asymmetric — quick to degrade, slow to restore, so
it doesn't flicker between levels):

```
L0 full → L1 pixelRatio 1.5 → L2 hide connections → L3 activeParticles 60%
```

This runs independently of, and composes with, the deliberate `engine.setDensity()` control
(used by the Footer to thin the cloud intentionally — see [[Home]]) — the adaptive ladder only
touches `setActiveParticleRatio` under sustained low FPS (a rare, degraded-performance path),
so the two rarely fight in practice.

## Render loop discipline

- **One `requestAnimationFrame` loop for the whole page** — Helios owns exactly one; GSAP's
  ScrollTrigger owns scroll measurement separately. No per-section rAF loops.
- **No allocation inside the per-frame update.** `HeliosEngine.update()` is explicitly
  documented "spec-fixed order, no allocation inside" — scratch buffers/vectors are allocated
  once at construction, never per-frame.
- Per-particle deterministic scalars (`noiseOffset`, `dissolveOrder`) are precomputed once at
  construction, not recalculated per frame.

## ⚠️ The RAF-occlusion verification gotcha

**Chrome fully suspends `requestAnimationFrame` for occluded/non-OS-focused windows.** This
has cost real debugging time more than once on this project (documented previously for
GSAP/ScrollTrigger; reconfirmed for Helios during the Stage 5 section-gravity work).

Symptom: the automation/browser window isn't the OS-foreground window (common with headless
or automated browser tooling) → `requestAnimationFrame` stops firing entirely, not just
throttles → the page appears frozen at whatever frame it was on when occlusion started → a
debug overlay showing `State: dormant`, `FPS: 0`, `Draw calls: 0` frozen indefinitely is the
tell, not a real bug.

**Verification workaround (Helios-specific):** temporarily expose the live engine instance on
`window` (dev-only, `import.meta.dev` gated) and manually pump its update/render pipeline via
direct method calls, bypassing the suspended rAF chain entirely:

```js
const engine = window.__heliosEngine // temporary dev hook, remove after verifying
for (let i = 0; i < 200; i++) {
  engine['update'](0.033)
  engine['rendererSys'].render(0.033, false)
}
```

This let a genuinely frozen-looking scattered cloud be fast-forwarded to confirm assembly,
flow, and section-gravity all worked correctly — the code was fine; the verification
environment was lying. **Always suspect this before assuming an animation/engine bug** when a
browser-automation screenshot shows something static that should be moving. For GSAP/
ScrollTrigger specifically, the prior documented workaround is forcing end-states directly:
`ScrollTrigger.update()` + `gsap.globalTimeline.progress(1)` before screenshotting.

## Related

[[Animation System]] · [[Hero Module]] · [[Decision Log]]
