# IMPLEMENTATION CONTRACTS

**Version:** 1.0 | **Status:** Spec | **Owner:** Engineering Team | **Review Date:** 2026-10-08
**Dependencies:** DOCUMENT 006, DOCUMENT 007, DOCUMENT 008 | **Related:** DOCUMENT 011

## Every task comes from here. Nothing is built without a contract.

---

## Contract Inventory

| ID | Page | Scene / Component | Priority | Status |
|----|------|------------------|----------|--------|
| HP-001 | Homepage | Scene 01 — The Category | P0 | Spec |
| HP-002 | Homepage | Scene 02 — The Problem | P0 | Spec |
| HP-003 | Homepage | Scene 03 — The Framework | P0 | Spec |
| HP-004 | Homepage | Scene 04 — The Platform | P0 | Spec |
| HP-005 | Homepage | Scene 05 — Capabilities | P0 | Spec |
| HP-006 | Homepage | Scene 06 — Proof | P0 | Spec |
| HP-007 | Homepage | Scene 07 — Future | P0 | Spec |
| HP-008 | Homepage | Scene 08 — Invitation | P0 | Spec |
| HP-010 | Homepage | Master Timeline | P0 | Spec |
| HP-011 | Homepage | IntelligenceWorld (3D canvas) | P0 | Spec |
| HP-012 | Global | AppHeader | P1 | Spec |
| HP-013 | Global | PageLoader | P1 | Spec |
| HP-014 | Homepage | Homepage SEO | P0 | Spec |
| PL-001 | Platform | Page Shell | P1 | Spec |
| PL-002 | Platform | Capability Cards | P1 | Spec |
| PL-003 | Platform | Timeline Integration | P1 | Spec |
| PL-004 | Platform | Industry Filter | P1 | Spec |
| PL-005 | Platform | Platform SEO | P1 | Spec |
| PR-001 | Products | Product Overview Page | P1 | Spec |
| PR-002 | Products | Product Detail Page | P1 | Spec |
| PR-003 | Products | Knowledge Hub | P1 | Spec |

---

## HP-001 — Homepage Scene 01: The Category

| Field | Value |
|-------|-------|
| **Owner** | Experience Team |
| **Document** | docs/006_EXPERIENCE_OS.md (Scene 01) |
| **Priority** | P0 |

### Files

| File | Purpose |
|------|---------|
| app/components/scenes/Scene01.vue | Scene component |
| app/lib/experience/SceneManager.ts | Scene lifecycle |
| app/lib/experience/CameraController.ts | Static camera position |
| app/lib/experience/ParticleEngine.ts | Channel 1-3 config |
| app/lib/experience/LightingLayer.ts | Lighting 15%, neutral |
| app/lib/experience/TypographyDirector.ts | Text particle generation |

### Dependencies

- HP-011 (IntelligenceWorld) — 3D canvas
- HP-010 (Master Timeline) — scroll-scrubbed timeline
- pacing.ts — duration and easing tokens

### Acceptance

- [ ] Scene activates at 0% scroll progress
- [ ] Particles assemble into central core over 15s scroll
- [ ] Text "Enterprise Intelligence Infrastructure" generates from particles
- [ ] Camera remains static
- [ ] Lighting 15% intensity, neutral color
- [ ] Mouse movement subtly influences particle flow
- [ ] Nav is hidden
- [ ] Brand mark is hidden
- [ ] Scene transitions to Scene 02 at 15% scroll

### Performance

- Particles: 3000 max
- Draw calls: < 50
- Scene load: < 500ms

### QA

- [ ] Particles assemble correctly at all scroll speeds
- [ ] Text legible at 375px – 2560px
- [ ] No glitches on cold boot
- [ ] prefers-reduced-motion disables animation
- [ ] Screen reader reads DOM text

### Definition of Done

- All acceptance criteria pass
- Performance budget met
- QA checklist passed
- Code reviewed and merged
- Works in staging

---

## HP-002 — Homepage Scene 02: The Problem

| Field | Value |
|-------|-------|
| **Owner** | Experience Team |
| **Document** | docs/006_EXPERIENCE_OS.md (Scene 02) |
| **Priority** | P0 |

### Files

| File | Purpose |
|------|---------|
| app/components/scenes/Scene02.vue | Scene component |
| app/lib/experience/CameraController.ts | Pull Back camera |
| app/lib/experience/ParticleEngine.ts | Fragmentation config |
| app/lib/experience/LightingLayer.ts | Lighting 5%, cool |

### Dependencies

- HP-011 (IntelligenceWorld)
- HP-010 (Master Timeline)
- HP-001 (Scene 01 transition)

### Acceptance

- [ ] Scene activates at 15% scroll
- [ ] Camera pull back (0,0,20) -> (0,0,40) over 2000ms
- [ ] Core fragments into silos
- [ ] Text "Data is everywhere. Intelligence is nowhere." dissolves
- [ ] Lighting drops to 5%, cool blue
- [ ] Nav is hidden
- [ ] Transitions to Scene 03 at 35% scroll

### Performance

- Particles: 3000 max
- Draw calls: < 60

### QA

- [ ] Fragmentation smooth at all scroll speeds
- [ ] Camera pull back smooth
- [ ] Lighting transition seamless
- [ ] Reduced motion skips camera movement

### Definition of Done

- All acceptance criteria pass
- Performance budget met
- QA checklist passed
- Code reviewed and merged

---

## HP-003 — Homepage Scene 03: The Framework

| Field | Value |
|-------|-------|
| **Owner** | Experience Team |
| **Document** | docs/006_EXPERIENCE_OS.md (Scene 03) |
| **Priority** | P0 |

### Files

| File | Purpose |
|------|---------|
| app/components/scenes/Scene03.vue | Scene component |
| app/lib/experience/CameraController.ts | Orbit camera |
| app/lib/experience/ParticleEngine.ts | Chain flow config |
| app/lib/experience/LightingLayer.ts | Lighting 40%, warm |
| app/lib/experience/TypographyDirector.ts | Framework text |

### Dependencies

- HP-011 (IntelligenceWorld)
- HP-010 (Master Timeline)
- HP-002 (Scene 02 transition)
- HP-012 (AppHeader) — nav appears

### Acceptance

- [ ] Scene activates at 35% scroll
- [ ] Camera orbits framework flow
- [ ] Particles form chain: Sense -> Think -> Predict -> Act -> Learn
- [ ] Each stage lights up in sequence
- [ ] Text "Sense. Think. Predict. Act. Learn." appears
- [ ] Lighting rises to 40%, warm amber
- [ ] Navigation becomes visible
- [ ] Transitions to Scene 04 at 50% scroll

### Performance

- Particles: 5000 max
- Draw calls: < 80

### QA

- [ ] Orbit smooth (no wobble)
- [ ] Chain flow continuous
- [ ] Stages light in correct sequence
- [ ] Nav appears at correct time

### Definition of Done

- All acceptance criteria pass
- Performance budget met
- QA checklist passed
- Code reviewed and merged

---

## HP-004 — Homepage Scene 04: The Platform

| Field | Value |
|-------|-------|
| **Owner** | Experience Team |
| **Document** | docs/006_EXPERIENCE_OS.md (Scene 04) |
| **Priority** | P0 |

### Files

| File | Purpose |
|------|---------|
| app/components/scenes/Scene04.vue | Scene component |
| app/lib/experience/CameraController.ts | Static camera |
| app/lib/experience/ParticleEngine.ts | Re-link config |
| app/lib/experience/LightingLayer.ts | Lighting 80%, warm |
| app/lib/experience/TypographyDirector.ts | Brand text |

### Dependencies

- HP-011 (IntelligenceWorld)
- HP-010 (Master Timeline)
- HP-003 (Scene 03 transition)

### Acceptance

- [ ] Scene activates at 50% scroll
- [ ] Camera stops, holds static
- [ ] Framework layers settle into unified structure
- [ ] Particles re-link into connected whole
- [ ] Lighting peaks at 80%, warm golden
- [ ] Text "SVARA." appears — brand first reveal
- [ ] Transitions to Scene 05 at 62% scroll

### Performance

- Particles: 2000 max
- Draw calls: < 40

### QA

- [ ] Settlement smooth (no abrupt stops)
- [ ] Brand appearance correctly timed
- [ ] Lighting transition seamless

### Definition of Done

- All acceptance criteria pass
- Performance budget met
- QA checklist passed
- Code reviewed and merged

---

## HP-005 — Homepage Scene 05: Capabilities

| Field | Value |
|-------|-------|
| **Owner** | Experience Team |
| **Document** | docs/006_EXPERIENCE_OS.md (Scene 05) |
| **Priority** | P0 |

### Files

| File | Purpose |
|------|---------|
| app/components/scenes/Scene05.vue | Scene component |
| app/lib/experience/CameraController.ts | Fly Through camera |
| app/lib/experience/ParticleEngine.ts | Node orbit config |
| app/lib/experience/LightingLayer.ts | Lighting 65%, neutral |
| app/lib/experience/ProductDirector.ts | Product visualization |
| app/utils/products.ts | Product data |

### Dependencies

- HP-011 (IntelligenceWorld)
- HP-010 (Master Timeline)
- HP-004 (Scene 04 transition)

### Acceptance

- [ ] Scene activates at 62% scroll
- [ ] Camera flies through 9 product nodes
- [ ] Each product orbits as node with unique visual
- [ ] Product names appear on approach
- [ ] Lighting 65%, neutral
- [ ] Hover highlights node
- [ ] Transitions to Scene 06 at 75% scroll

### Performance

- 3D objects: 9 nodes
- Draw calls: < 100
- Texture memory: < 50MB

### QA

- [ ] Fly Through visits all 9 nodes
- [ ] Each node visually distinct
- [ ] Hover works (node highlights)
- [ ] Product names readable

### Definition of Done

- All acceptance criteria pass
- Performance budget met
- QA checklist passed
- Code reviewed and merged

---

## HP-006 — Homepage Scene 06: Proof

| Field | Value |
|-------|-------|
| **Owner** | Experience Team |
| **Document** | docs/006_EXPERIENCE_OS.md (Scene 06) |
| **Priority** | P0 |

### Files

| File | Purpose |
|------|---------|
| app/components/scenes/Scene06.vue | Scene component |
| app/lib/experience/CameraController.ts | Rise camera |
| app/lib/experience/ParticleEngine.ts | Landscape config |
| app/lib/experience/LightingLayer.ts | Lighting 50%, warm |
| app/utils/industries.ts | Industry data |

### Dependencies

- HP-011 (IntelligenceWorld)
- HP-010 (Master Timeline)
- HP-005 (Scene 05 transition)

### Acceptance

- [ ] Scene activates at 75% scroll
- [ ] Camera rises through 12 industry landscapes
- [ ] Each landscape visually distinct
- [ ] Industry names as terrain labels
- [ ] Lighting 50%, warm
- [ ] Transitions to Scene 07 at 85% scroll

### Performance

- 3D objects: 12 landscape groups
- Draw calls: < 120

### QA

- [ ] Rise path covers all 12 industries
- [ ] Each landscape distinct
- [ ] Camera smooth (no jank)
- [ ] Terrain labels readable

### Definition of Done

- All acceptance criteria pass
- Performance budget met
- QA checklist passed
- Code reviewed and merged

---

## HP-007 — Homepage Scene 07: Future

| Field | Value |
|-------|-------|
| **Owner** | Experience Team |
| **Document** | docs/006_EXPERIENCE_OS.md (Scene 07) |
| **Priority** | P0 |

### Files

| File | Purpose |
|------|---------|
| app/components/scenes/Scene07.vue | Scene component |
| app/lib/experience/CameraController.ts | Pull Back camera |
| app/lib/experience/ParticleEngine.ts | Grid config |
| app/lib/experience/LightingLayer.ts | Lighting 35%, neutral |

### Dependencies

- HP-011 (IntelligenceWorld)
- HP-010 (Master Timeline)
- HP-006 (Scene 06 transition)

### Acceptance

- [ ] Scene activates at 85% scroll
- [ ] Camera pulls back to wide horizon
- [ ] Landscapes merge into unified grid
- [ ] Grid pulses as one
- [ ] No text content
- [ ] Lighting 35%, neutral
- [ ] Transitions to Scene 08 at 92% scroll

### Performance

- Draw calls: < 50
- Particles: 1000 ambient

### QA

- [ ] Grid forms correctly
- [ ] Pulse smooth
- [ ] No text appears
- [ ] Camera pull back smooth

### Definition of Done

- All acceptance criteria pass
- Performance budget met
- QA checklist passed
- Code reviewed and merged

---

## HP-008 — Homepage Scene 08: Invitation

| Field | Value |
|-------|-------|
| **Owner** | Experience Team |
| **Document** | docs/006_EXPERIENCE_OS.md (Scene 08) |
| **Priority** | P0 |

### Files

| File | Purpose |
|------|---------|
| app/components/scenes/Scene08.vue | Scene component |
| app/lib/experience/CameraController.ts | Static camera |
| app/lib/experience/ParticleEngine.ts | Slow ambient config |
| app/lib/experience/LightingLayer.ts | Lighting 30%, neutral |

### Dependencies

- HP-011 (IntelligenceWorld)
- HP-010 (Master Timeline)
- HP-007 (Scene 07 transition)
- HP-012 (AppHeader)

### Acceptance

- [ ] Scene activates at 92% scroll
- [ ] Camera settles, holds
- [ ] Particles slow to ambient flow
- [ ] Text "Engineering The Intelligence Layer Of Tomorrow." + CTA
- [ ] Lighting 30%, neutral, calm
- [ ] CTA triggers page transition (600ms, power2.inOut)
- [ ] World persists then fades

### Performance

- Particles: 500 ambient
- Draw calls: < 30

### QA

- [ ] Final text correct
- [ ] CTA functional
- [ ] Page transition smooth
- [ ] World fade smooth
- [ ] CTA links resolve correctly

### Definition of Done

- All acceptance criteria pass
- Performance budget met
- QA checklist passed
- Code reviewed and merged

---

## HP-010 — Homepage Master Timeline

| Field | Value |
|-------|-------|
| **Owner** | Experience Team |
| **Document** | docs/006_EXPERIENCE_OS.md, docs/007_MOTION_OS.md |
| **Priority** | P0 |

### Files

| File | Purpose |
|------|---------|
| app/lib/experience/MasterTimeline.ts | Single scroll-scrubbed timeline |
| app/lib/experience/ScrollController.ts | Scroll progress 0-1 |
| app/lib/experience/pacing.ts | Duration and easing tokens |

### Dependencies

- HP-011 (IntelligenceWorld) — render loop
- All scene contracts (HP-001 through HP-008)

### Acceptance

- [ ] Single GSAP timeline scrubbed by ScrollController
- [ ] Covers all 8 scenes with correct scroll ranges
- [ ] Transitions overlap by 20% scene duration
- [ ] No scene exceeds 6000ms
- [ ] Timeline paused, scrubbed by scroll
- [ ] gsap.ticker is single frame pump
- [ ] Lenis autoRaf: false
- [ ] Three.js renders from gsap.ticker
- [ ] Reduced motion: timeline instant

### Performance

- Timeline tweens: < 100
- No tween > 6000ms
- All durations from pacing.ts

### QA

- [ ] Scroll progress 0-1 across page
- [ ] Each scene at correct scroll %
- [ ] No visual gap between scenes
- [ ] No overlap conflicts
- [ ] 60fps during scroll
- [ ] Reduced motion works

### Definition of Done

- All acceptance criteria pass
- Performance budget met
- QA checklist passed
- Code reviewed and merged

---

## HP-011 — IntelligenceWorld (3D Canvas)

| Field | Value |
|-------|-------|
| **Owner** | Experience Team |
| **Document** | docs/007_MOTION_OS.md |
| **Priority** | P0 |

### Files

| File | Purpose |
|------|---------|
| app/lib/experience/IntelligenceWorld.ts | Three.js scene, renderer, camera |
| app/lib/experience/CameraController.ts | Camera position and movement |
| app/lib/experience/ParticleEngine.ts | Particle system |
| app/lib/experience/LightingLayer.ts | Lighting system |

### Dependencies

- None (foundation component)

### Acceptance

- [ ] WebGLRenderer with antialias, alpha
- [ ] ACESFilmicToneMapping
- [ ] Pixel ratio capped at 2
- [ ] Transparent background
- [ ] Full viewport, resizes
- [ ] Single Scene object
- [ ] Exponential fog at distance 100
- [ ] Render loop via gsap.ticker
- [ ] Max draw calls: 200
- [ ] Max vertices: 100,000
- [ ] Max textures: 50

### Performance

- Initial load: < 1s
- Memory: < 100MB idle
- Frame rate: 60fps idle

### QA

- [ ] Canvas renders at all viewports
- [ ] Resize works (no stretch)
- [ ] Transparent background works
- [ ] No WebGL errors

### Definition of Done

- All acceptance criteria pass
- Performance budget met
- QA checklist passed
- Code reviewed and merged

---

## HP-012 — AppHeader

| Field | Value |
|-------|-------|
| **Owner** | Experience Team |
| **Document** | docs/005_UX_OS.md (Navigation) |
| **Priority** | P1 |

### Files

| File | Purpose |
|------|---------|
| app/components/AppHeader.vue | Navigation component |
| app/lib/experience/MotionDirector.ts | Nav animation |

### Dependencies

- HP-011 (IntelligenceWorld) — render loop awareness

### Acceptance

- [ ] Items: Platform, Products, Technology, Industries, Knowledge, Company
- [ ] Homepage: hidden < 48vh, visible >= 48vh
- [ ] Other pages: visible from load
- [ ] Scroll > 40px: backdrop blur + shadow (500ms)
- [ ] Current page indicated
- [ ] Mobile: hamburger < 768px, slide-out drawer
- [ ] Page transitions on nav click (600ms, power2.inOut)

### Performance

- Nav animation: 300-500ms
- No layout shift on appearance

### QA

- [ ] Nav matches UX spec at all scroll positions
- [ ] Mobile hamburger works
- [ ] Active page highlighted
- [ ] Keyboard nav works
- [ ] Screen reader announces items

### Definition of Done

- All acceptance criteria pass
- Performance budget met
- QA checklist passed
- Code reviewed and merged

---

## HP-013 — PageLoader

| Field | Value |
|-------|-------|
| **Owner** | Experience Team |
| **Document** | — |
| **Priority** | P1 |

### Files

| File | Purpose |
|------|---------|
| app/components/PageLoader.vue | Cold boot loading screen |

### Dependencies

- HP-011 (IntelligenceWorld) — waits for init

### Acceptance

- [ ] Appears on first visit (cold boot)
- [ ] Disappears when IntelligenceWorld ready
- [ ] Shows progress or status
- [ ] Duration: < 2s fast, < 5s slow
- [ ] Visually consistent with brand
- [ ] Respects prefers-reduced-motion
- [ ] Subsequent navigations skip

### Performance

- Loader blocks max 5s
- Loader assets: < 50KB

### QA

- [ ] Cold boot only
- [ ] Disappears when ready
- [ ] No flash before loader
- [ ] Screen reader announces loading

### Definition of Done

- All acceptance criteria pass
- Performance budget met
- QA checklist passed
- Code reviewed and merged

---

## HP-014 — Homepage SEO

| Field | Value |
|-------|-------|
| **Owner** | Content Team |
| **Document** | docs/009_SEO_OS.md |
| **Priority** | P0 |

### Files

| File | Purpose |
|------|---------|
| app/pages/index.vue | Homepage SEO head |
| app/utils/seo.ts | Structured data generators |

### Dependencies

- HP-001 through HP-008 (scene content)

### Acceptance

- [ ] Primary intent: "What is Enterprise Intelligence Infrastructure?"
- [ ] Secondary intents: 3-5 questions
- [ ] JSON-LD Article schema
- [ ] Entity relationships defined
- [ ] AI answer target in first 200 words
- [ ] FAQ schema with 3-5 entries
- [ ] Internal links to canonical entities
- [ ] Meta title and description
- [ ] Open Graph + Twitter Card
- [ ] Canonical URL
- [ ] Content freshness metadata

### Performance

- Structured data < 5KB
- No impact on LCP or FCP

### QA

- [ ] Google Structured Data test passes
- [ ] No duplicate meta tags
- [ ] Social preview renders
- [ ] AI answer target quotable

### Definition of Done

- All acceptance criteria pass
- SEO checklist passed
- Code reviewed and merged

---

## PL-001 — Platform Page Shell

| Field | Value |
|-------|-------|
| **Owner** | Product Team |
| **Document** | docs/006_EXPERIENCE_OS.md |
| **Priority** | P1 |

### Files

| File | Purpose |
|------|---------|
| app/pages/platform.vue | Platform page |
| app/layouts/default.vue | Page layout |

### Dependencies

- HP-012 (AppHeader)

### Acceptance

- [ ] Header explains Intelligence Loop
- [ ] Sections match IA
- [ ] Text from approved copy
- [ ] Responsive layout
- [ ] Internal links to Knowledge topics

### Definition of Done

- All acceptance criteria pass
- Performance budget met
- QA checklist passed
- Code reviewed and merged

---

## PL-002 — Platform Capability Cards

| Field | Value |
|-------|-------|
| **Owner** | Product Team |
| **Document** | docs/002_CATEGORY_OS.md (Framework) |
| **Priority** | P1 |

### Files

| File | Purpose |
|------|---------|
| app/components/capability/CapabilityCard.vue | Card component |
| app/pages/platform.vue | Platform page |

### Dependencies

- PL-001 (Platform shell)

### Acceptance

- [ ] 5 cards: Sense, Think, Predict, Act, Learn
- [ ] Each shows name, description, outcome
- [ ] Hover: 300ms scale 1.02, y -4px
- [ ] Cards link to knowledge or product
- [ ] Responsive (stack mobile, grid desktop)

### Definition of Done

- All acceptance criteria pass
- Performance budget met
- QA checklist passed
- Code reviewed and merged

---

## PL-003 — Platform Timeline Integration

| Field | Value |
|-------|-------|
| **Owner** | Product Team |
| **Document** | docs/006_EXPERIENCE_OS.md |
| **Priority** | P1 |

### Files

| File | Purpose |
|------|---------|
| app/components/platform/TimelineSection.vue | Timeline component |
| app/pages/platform.vue | Platform page |

### Dependencies

- PL-001 (Platform shell)

### Acceptance

- [ ] Interactive timeline showing Loop flow
- [ ] Each stage clickable, reveals detail
- [ ] Animation demonstrates continuous loop
- [ ] Scroll-linked (scrubbable)
- [ ] Responsive

### Definition of Done

- All acceptance criteria pass
- Performance budget met
- QA checklist passed
- Code reviewed and merged

---

## PL-004 — Platform Industry Filter

| Field | Value |
|-------|-------|
| **Owner** | Product Team |
| **Document** | docs/005_UX_OS.md |
| **Priority** | P1 |

### Files

| File | Purpose |
|------|---------|
| app/components/platform/IndustryFilter.vue | Filter component |
| app/utils/industries.ts | Industry data |

### Dependencies

- PL-001 (Platform shell)

### Acceptance

- [ ] Filter shows 12 industries
- [ ] Selecting shows capability relevance
- [ ] Clear/reset option
- [ ] Touch-friendly mobile
- [ ] Updates URL params

### Definition of Done

- All acceptance criteria pass
- Performance budget met
- QA checklist passed
- Code reviewed and merged

---

## PL-005 — Platform SEO

| Field | Value |
|-------|-------|
| **Owner** | Content Team |
| **Document** | docs/009_SEO_OS.md |
| **Priority** | P1 |

### Files

| File | Purpose |
|------|---------|
| app/pages/platform.vue | Platform SEO head |
| app/utils/seo.ts | Structured data generators |

### Dependencies

- PL-001 through PL-004

### Acceptance

- [ ] Primary intent: "How does the Intelligence Loop work?"
- [ ] Secondary: 3-5 questions
- [ ] JSON-LD Article
- [ ] FAQ schema 3-5 entries
- [ ] Internal links to capability definitions
- [ ] Meta title and description
- [ ] Freshness metadata

### Definition of Done

- All acceptance criteria pass
- SEO checklist passed
- Code reviewed and merged

---

## PR-001 — Product Overview Page

| Field | Value |
|-------|-------|
| **Owner** | Product Team |
| **Document** | docs/002_CATEGORY_OS.md (Products) |
| **Priority** | P1 |

### Files

| File | Purpose |
|------|---------|
| app/pages/products/index.vue | Product overview |
| app/utils/products.ts | Product data |

### Dependencies

- HP-012 (AppHeader)

### Acceptance

- [ ] Lists all 9 products
- [ ] Grouped by outcome
- [ ] Each links to detail page
- [ ] Outcome mapping indicator
- [ ] Responsive
- [ ] SEO: "What does SVARA make?"

### Definition of Done

- All acceptance criteria pass
- Performance budget met
- QA checklist passed
- Code reviewed and merged

---

## PR-002 — Product Detail Page

| Field | Value |
|-------|-------|
| **Owner** | Product Team |
| **Document** | docs/005_PRODUCT_OS.md |
| **Priority** | P1 |

### Files

| File | Purpose |
|------|---------|
| app/pages/products/[slug].vue | Product detail |
| app/utils/products.ts | Product data |

### Dependencies

- PR-001 (Product overview)

### Acceptance

- [ ] Dynamic route for 9 products
- [ ] Name, description, outcome, capabilities
- [ ] Related industries
- [ ] Related products
- [ ] CTA to platform or contact
- [ ] SEO: per-product intent
- [ ] JSON-LD Product schema

### Definition of Done

- All acceptance criteria pass
- Performance budget met
- QA checklist passed
- Code reviewed and merged

---

## PR-003 — Knowledge Hub

| Field | Value |
|-------|-------|
| **Owner** | Content Team |
| **Document** | docs/003_KNOWLEDGE_OS.md |
| **Priority** | P1 |

### Files

| File | Purpose |
|------|---------|
| app/pages/knowledge/index.vue | Knowledge hub |
| app/pages/knowledge/glossary.vue | Glossary page |
| app/pages/knowledge/faq.vue | FAQ page |

### Dependencies

- HP-012 (AppHeader)
- Knowledge OS encyclopedia content

### Acceptance

- [ ] Knowledge hub lists all topics
- [ ] Glossary shows all terms with definitions
- [ ] FAQ shows all questions with answers
- [ ] Each topic links to full article
- [ ] Search/filter for topics
- [ ] Responsive
- [ ] SEO: "Enterprise Intelligence knowledge base"

### Definition of Done

- All acceptance criteria pass
- Performance budget met
- QA checklist passed
- Code reviewed and merged
