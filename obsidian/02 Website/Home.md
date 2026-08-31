---
tags: [website, stable]
updated: 2026-07-14
---

# Home — `/`

`app/pages/index.vue`. Eight sections, one continuous story — see [[Brand Strategy]] for the
emotional-arc rationale. Content: [[Home Content Bible]]. SEO/schema: [[SEO]] · [[Schema]].

## Section order & components

| # | Section | Component | Story beat |
|---|---|---|---|
| 1 | Hero | `home/HeroSection.vue` + `home/HeroParticleField.vue` | A static premium image — see [[Hero Module]] |
| 2 | Problem | `sections/ProblemSection.vue` | Fragmentation named — 3 floating glass panels converge into "The Intelligence Layer" |
| 3 | Connected Ecosystem | `sections/SolutionSection.vue` | Relief — inputs → intelligence layer → outputs, both wire-sets pulse with traveling packets |
| 4 | Products | `sections/ProductsSection.vue` | 10 floating glass capsules, hover reveals name, click navigates |
| 5 | Technology (Divisions) | `sections/TechnologySection.vue` | 6 CSS 3D-flip monoliths, hover reveals division name |
| 6 | Industries | `sections/IndustriesSection.vue` | Rotating pseudo-3D globe, markers illuminate front-facing |
| 7 | Why SVARA (Trust) | `sections/TrustSection.vue` | 5 unfolding architectural cards |
| 8 | CTA | `sections/CtaSection.vue` | One glass "intelligence core," one button, nothing else |

`app/components/footer/Footer.vue` closes the page (not counted as a narrative section). Paths
above reflect the Sprint 2 folder move — see [[Folder Structure]]. `home/` now holds only the
two Hero files.

> [!note]
> `AboutSection.vue`, `ArchitectureSection.vue`, `EcosystemSection.vue`, `MetricsSection.vue`,
> `NextEraSection.vue`, `PlatformSection.vue`, `TrustBar.vue`, `WhoSection.vue` were confirmed
> dead (zero references) during the Sprint 2 audit — not rendered on `/`, not used anywhere.
> Held for deletion pending a LOCKED-term naming collision, see [[Folder Structure]].

## The Intelligence Engine (Helios)

**As of Sprint 4, this no longer renders inside the Hero at all** — see [[Hero Module]]
ADR-0007. It's a page-wide ambient particle cloud only, reduced to two states:

1. **Dormant** — fully invisible, from page load until the Hero scrolls out of view.
2. **Flow** — starts once, the moment the Hero exits the viewport (`IntersectionObserver`, not
   a continuous scroll value); a continuous downward current for the rest of the page,
   independent of further scroll.

While flowing, particles are pulled toward whichever section is in view (Problem's 3 panels,
Products' 10 capsules, Industries' globe markers, Technology's 6 monoliths, CTA's core) via
`useIntelligenceTargets`. Footer thins the cloud (`engine.setDensity()`) — "particles become
sparse." Both mechanisms are unchanged by the Sprint 4 removal.

Full engineering detail: [[Hero Module]] · [[Animation System]].

## Content pattern

Each section reads a `teaser` field (60–80 words, homepage-only) from
[[Home Content Bible]] rather than the full `paragraphs` array used by the section's dedicated
page — see that note for why the two must never be conflated.

## Related

[[Ecosystem]] · [[Products]] · [[Technology]] · [[Divisions]] · [[Hero Module]] · [[Brand Strategy]]
