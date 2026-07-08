# SVARA EXPERIENCE SPECIFICATION
## 00 — PROJECT OVERVIEW

**Type:** SES (SVARA Experience Specification)
**Status:** Source of Truth
**Last Updated:** Sprint 1

---

## What SVARA Is

SVARA builds **Enterprise Intelligence Infrastructure** — the technology layer that connects enterprise systems, operational data, AI models, and human decision-making into one continuously learning intelligence ecosystem.

We are not an AI company. We are not a software company. We are an Enterprise Intelligence Infrastructure company.

---

## Document Map

| # | Document | Purpose |
|---|----------|---------|
| 00 | Project Overview | This file. Mission, scope, SES structure |
| 01 | Brand Operating System | Identity, voice, visual identity, messaging |
| 02 | Information Architecture | Site structure, navigation, URL hierarchy |
| 03 | Content Operating System | Content model, knowledge graph, LLM strategy |
| 04 | Design System | Visual language, typography, color, spacing |
| 05 | Experience System | Emotion arc, scroll phases, scene structure |
| 06 | Motion System | Animation philosophy, camera, particles, scroll |
| 07 | Technical Architecture | Stack, file structure, architecture principles |
| 08 | SEO · GEO · LLM System | Search and AI optimization strategy |
| 09 | Implementation Contracts | Execution contracts for every page and component |
| 10 | Acceptance Criteria | Scorecard, review process, quality gates |

---

## Sprint Plan

| Sprint | Scope | Dependencies |
|--------|-------|-------------|
| 01 | Foundation: routing, layout, shared components, motion architecture, SEO | None |
| 02 | Content: all copy created, approved, and placed in content slots | Sprint 01 |
| 03 | Motion: wire scenes to MasterTimeline, particle channels, camera moves | Sprint 02 |
| 04 | Homepage: full 9-scene experience with animation | Sprint 03 |
| 05 | Platform: 8-layer page with content, SEO, structured data | Sprint 01 |
| 06 | Products: overview + 10 Knowledge Hubs | Sprint 05 |
| 07 | Industries: overview + 4 industry deep-dives | Sprint 05 |
| 08 | Knowledge Hub: FAQ, glossary, case studies | Sprint 05 |
| 09 | Investors: investment thesis, market, traction | Sprint 05 |
| 10 | Optimization: performance, accessibility, mobile, launch | Sprint 09 |

---

## Roles

| SVARA Owns | OpenCode Owns |
|------------|---------------|
| Product strategy | Architecture implementation |
| Creative direction | Vue / Nuxt |
| Brand | Three.js |
| Story | GSAP |
| UX | Lenis |
| Content | Performance |
| Experience | Testing |
| Acceptance criteria | Refactoring |

---

## Supporting Documents

| Document | Purpose |
|----------|---------|
| `PROJECT_RULES.md` | 13 laws. Inviolable. |
| `DECISION_LOG.md` | Every major decision, recorded. |
| `COMPONENT_CATALOG.md` | Behavior-first specs for every component. |
| `CONTENT_INVENTORY.md` | Every sentence classified: Keep/Rewrite/Remove/New. |

## Directory

```
docs/
├── 00_PROJECT_OVERVIEW.md
├── 01_BRAND_OPERATING_SYSTEM.md
├── 02_INFORMATION_ARCHITECTURE.md
├── 03_CONTENT_OPERATING_SYSTEM.md
├── 04_DESIGN_SYSTEM.md
├── 05_EXPERIENCE_SYSTEM.md
├── 06_MOTION_SYSTEM.md
├── 07_TECHNICAL_ARCHITECTURE.md
├── 08_SEO_GEO_LLM_SYSTEM.md
├── 09_IMPLEMENTATION_CONTRACTS/
│   ├── 001_PROJECT_AUDIT.md
│   ├── 002_SYSTEM_OWNERSHIP.md
│   ├── 003_HOMEPAGE.md
│   ├── 004_PLATFORM.md
│   ├── 005_PRODUCTS.md
│   └── ...
├── 10_ACCEPTANCE_CRITERIA.md
├── DECISION_LOG.md
├── COMPONENT_CATALOG.md
├── CONTENT_INVENTORY.md
├── CREATIVE_BRIEF.md
└── BRAND_STYLE.md
```

---

## Guiding Principles

1. **Particles are data, not decoration.** Every particle behavior has semantic meaning.
2. **Text is earned, not dropped.** No fade, no slide, no bounce. Text generates from particles.
3. **One owner per system.** No duplicated responsibilities. No component self-animates.
4. **The visitor learns something valuable even if they never become a customer.**
5. **If removing it does not reduce understanding, trust, or emotional impact, it should not exist.**

---

**End of SES-00. This is the constitution.**
