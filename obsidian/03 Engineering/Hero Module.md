---
tags: [frontend, animation, stable]
updated: 2026-07-14
---

# Hero Module

## The visual — a static image behind glass, no particle form

The Hero's particle visual (first a full bust, then briefly a head-only "SVARA Intelligence
Head") was removed entirely. See [[Decision Log]] ADR-0007. The Hero now shows a static
image inside `HeroVisual.vue`, a glass-panel "museum display" treatment; the particle engine
still exists but no longer renders anything inside the Hero section.

> [!note] Image source — explicit user call, not my earlier recommendation
> `HeroVisual.vue` renders `/images/hero/robot-head.png` — the exact asset ADR-0007 flagged
> and declined to use (a stock sci-fi-robot render). The user reviewed that flag and directed
> its use anyway, styled behind a glass panel specifically so it reads as a curated artifact
> rather than a literal robot graphic. This is their call, not a reversal I made unprompted —
> if the framing doesn't land, the fix is the panel treatment or a different asset, not
> reverting silently. `home/hero-core.jpg` (neon "portal" render, logo baked in) remains
> unused and untouched.

## Current architecture

| File | Role |
|---|---|
| `app/components/home/HeroSection.vue` | Layout, copy, headline, Connect/Menu triggers; renders `<HeroVisual />` in the visual column. |
| `app/components/home/HeroVisual.vue` | The glass panel itself — `--radius-image` corners, `--glass-*` tokens (bg/blur/border/shadow/reflection), the image at ~90% size, vertically centered, bled slightly past the right edge and clipped by the panel's own `overflow: hidden`. |
| `app/components/home/HeroParticleField.vue` | Mounted separately at page level (`app/pages/index.vue`). Owns the `HeliosEngine` instance, viewport-aspect entity offset, and an `IntersectionObserver` on `.hero` that starts `engine.flow()` once — the moment the Hero scrolls out of view, never before. Publishes the live engine via `useIntelligenceEngine()`. |
| `lib/helios/` | The shared, page-wide ambient particle engine — powers the downward Flow cloud, section gravity (Problem/Products/Industries/Technology/CTA), and Footer density. Three states: `Dormant` (fully invisible, pre-boot rest), `Orbit` (Hero-only halo around the Hero image, active from mount until Hero scroll-out), and `Flow` (unchanged). See [[Animation System]] and [[Decision Log]] ADR-0008. |

## Why Flow is gated behind an IntersectionObserver, not started immediately

Starting `engine.flow()` right on mount was the first attempt — it broke immediately in
testing: the ambient cloud rendered *while the Hero was still on screen*, overlapping the
headline. The old assemble→dissolve→flow chain had scroll-gating for exactly this reason
(Flow only ever started once the Hero had scrolled past); removing the head visual removed
that gating by accident along with it. Fixed by watching `.hero` with an `IntersectionObserver`
and calling `flow()` once, on exit — simpler than reintroducing a continuous scroll value, and
`Dormant`'s opacity target is now 0 (was 0.3) so nothing renders at all until then.

> [!warning] `app/components/hero 2/`
> Still present, still dead — a leftover Hero implementation from an even earlier, superseded
> "Chassis" architecture. Not referenced by any route. Untouched by this change.

## Related

[[Home]] · [[Animation System]] · [[Motion Language]] · [[Folder Structure]] · [[Decision Log]]
