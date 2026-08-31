---
tags: [brand, frontend, stable]
updated: 2026-07-13
---

# Visual Language

The visual system every section is built against. Tokens live in `styles/design-tokens.css`
(see [[Colors]] / [[Typography]] for the values); this note is the *philosophy*.

## The 10 commandments (standing rules for every section/page)

1. **Never invent visuals.** Every interactive object must be specified as: what story it
   tells, what the user understands in 3 seconds, what happens on hover, what happens on
   scroll. "Make it look futuristic" is not a spec.
2. **Never all-left-aligned.** Sections alternate text/visual sides (Apple/Stripe/Palantir
   pattern) — see the `grid-template-columns: 6fr 6fr` layout repeated across
   `ProblemSection.vue`, `SolutionSection.vue`, `TechnologySection.vue`, `IndustriesSection.vue`.
3. **One glass material system**, not per-component reinvention — the `--glass-*` tokens in
   [[Colors]], applied directly in each component's own scoped `<style>`. (Correction: an
   earlier version of this note pointed at `app/components/glass/` as the implementation —
   Sprint 2's component audit found that folder's Vue components were entirely unused; the
   real, live glass system is the CSS tokens alone.)
4. **Motion is physically coherent**, not decorative. Spring-physics for the Helios particle
   engine ([[Motion Language]]), GSAP ScrollTrigger for scroll-scrubbed reveals — never two
   systems fighting over the same value.
5. **Don't touch fonts/spacing/colors when only adding interactivity.** Visual refinement
   passes replace placeholders with purpose; they don't relitigate the token system.
6. **Every visual is genuinely interactive**, not just animated on load — hover, scroll-scrub,
   or click must do something meaningful (rotate to reveal, unfold, illuminate, converge).
7. **Ambient-first shadows.** Tight contact shadow + wide low-alpha ambience — never one heavy
   drop shadow (`--shadow-med`, `--shadow-glass` model this).
8. **Blue is the only accent.** `--color-accent` (`#2F7FE6`) marks interactive/data states
   only — never decorative.
9. **Architectural over sci-fi.** The Helios sentinel is "Apple Industrial Design + NVIDIA
   Omniverse + Minimal computational sculpture," explicitly not Iron-Man/robot aesthetics — no
   face, no fingers, no mechanical seams.
10. **One particle system for the whole page.** Since Stage 5, there is no per-section
    decorative animation competing with Helios — sections *register* with the one global
    engine ([[Animation System]]), they don't spawn their own.

## Scene checklist (per section, before shipping)

- [ ] What story does this section tell in one sentence?
- [ ] What does the user understand in 3 seconds?
- [ ] What is the interactive object, specifically?
- [ ] What happens on hover?
- [ ] What happens on scroll?
- [ ] Does it alternate side from the previous section?
- [ ] Does it end with an "Explore →" link if content was trimmed?

## References

Apple, Stripe, Palantir, NVIDIA Omniverse — cited for restraint (no gratuitous chrome/neon),
architectural framing, and genuinely interactive (not just autoplaying) visuals.

## Related

[[Brand Strategy]] · [[Motion Language]] · [[Colors]] · [[Typography]] · [[Home]]
