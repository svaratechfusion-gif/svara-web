---
tags: [brand, frontend, animation, stable]
updated: 2026-07-13
---

# Motion Language

SVARA's motion runs on **two coherent systems**, chosen per job — never CSS keyframes
competing with either. Full engineering detail: [[Animation System]]. This note is the
*design* rule set.

## Two systems, two jobs

| System | Drives | Why |
|---|---|---|
| **GSAP (Club, vendored)** + ScrollTrigger | Section reveals, scroll-scrubbed line/path draws, the `v-reveal` directive, master timeline | Deterministic, scrubbable, well-understood DOM/SVG animation |
| **Helios** (custom Three.js particle engine, spring-physics) | The one intelligence-engine particle system — Hero assembly, cursor reaction, scroll dissolve, page-wide flow, section gravity | Physically coherent motion that must compose (cursor force + scroll dissolve + section pull all act on the same particles at once) — a spring integrator is the only thing that composes cleanly |

**Rule: states write only to a target; a spring produces the actual motion.** This is the
core Helios discipline — every force (cursor attraction, scroll dissolve, section gravity)
either sets a target position or nudges a persistent offset that a downstream target
computation reads; nothing sets `position` directly except the spring integrator itself. See
[[Decision Log]] for the bug this discipline caught (Stage 5's section-gravity, ADR-style entry).

## Values

Duration/easing tokens live in `styles/design-tokens.css` and are mirrored in
`lib/animation/motion.ts` (keep both in sync — same discipline as Next16's grid-breakpoint
duplication rule):

```css
--motion-fast: 200ms;
--motion-medium: 300ms;
--motion-slow: 600ms;
--motion-hero: 1200ms;
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);   /* power3.out-like */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

## Rules

- **Never explosive.** Dissolve/assembly reads as elegant loss-of-structure, not a game-style
  particle burst — outer particles leave first, inner delay, never a uniform "pop."
- **Never chase the cursor.** Cursor interaction is local, elastic-return "magnetic dust," not
  full-object rotation or tracking.
- **`prefers-reduced-motion: reduce` is honored everywhere** — Helios and GSAP-driven
  animation both check it and skip/no-op rather than degrade gracefully mid-animation.
- **One render loop per concern.** Helios owns one `requestAnimationFrame` loop for the whole
  page (not one per section); GSAP's ScrollTrigger owns scroll measurement. Neither writes to
  the other's state directly — GSAP hands Helios a normalized scroll `0–1` via `setScroll()`,
  nothing more.

## Related

[[Animation System]] · [[Visual Language]] · [[Performance Budget]] · [[Hero Module]]
