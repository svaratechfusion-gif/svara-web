# Platform Experience

**Status:** Draft
**Owner:** SVARA
**Purpose:** Explain the intelligence infrastructure layer.
**Business Goal:** Generate understanding.
**Primary Persona:** Enterprise CXOs
**Secondary Persona:** Enterprise Architects
**User Question:** What is the platform and how does it work?
**Success Metrics:**
- Time on page
- Scroll depth
- Click-through to Products

---

## Sections (8-Layer Blueprint)

| # | Layer | Content |
|---|-------|---------|
| 1 | Arrival | "Platform — One intelligence layer across your entire enterprise." |
| 2 | Context | Enterprise data is growing faster than human capacity to interpret it. |
| 3 | Problem | Disconnected tools create silos. Data never flows. Insights are delayed. |
| 4 | Insight | Intelligence must be infrastructure — not point solutions. |
| 5 | SVARA | SVARA connects every enterprise system into one intelligence ecosystem. |
| 6 | Evidence | Architecture overview. Capability layers. Case study snippets. |
| 7 | Future | What the intelligent enterprise looks like. |
| 8 | Next Journey | CTA: "Explore Products" → `/products` |

---

## Motion

Sections reveal via scroll-triggered transitions. Content cards float upward with particle reveal. No scene-based camera — standard page scroll with GSAP-driven entry animations.

## Camera

No active camera (this is not a 3D experience). Particles in hero section only — static decorative field behind headline.

## Content

Every section follows the 7-layer content formula (Question → Reality → Problem → Insight → SVARA → Evidence → Outcome). No feature lists. No technical deep-dive. The platform is described as infrastructure, not a product.

## SEO

`useSeoMeta` with title "SVARA TechFusion — Platform" and 3-sentence description. Schema.org WebPage + BreadcrumbList. Unique URL: `/platform`.

## Accessibility

- Standard heading hierarchy (h1 → h2 → h3)
- All cards keyboard navigable
- Reduced motion: no scroll-triggered transforms
- Skip-to-content
- Link text states destination

## Performance

- No Three.js on this page (hero uses lightweight CSS particles or static SVG)
- Standard Nuxt SSR rendering
- No heavy animations

## Acceptance Criteria

- ✓ All 8 layers render in order
- ✓ Architecture section shows 5 capability layers (Sense → Think → Simulate → Operate → Grow)
- ✓ Each layer links to corresponding product Knowledge Hub
- ✓ No feature lists
- ✓ No technical architecture diagrams on this page (those live on Technology page)
- ✓ CTA at bottom links to `/products`

---

# Tasks

## PL-001

**Title:** Platform — Arrival Hero
**Files:** `pages/platform.vue`, `components/ui/PageHero.vue`, `components/ui/ContentSlot.vue`

**Creative Intent:** The visitor should immediately understand what the platform is.
**Business Intent:** State the category before explaining the product.
**Technical Intent:** PageHero component with primary headline + description. CSS particles in background (no Three.js).

**Dependencies:** `PageHero`, `ContentSlot`

**Acceptance Criteria:**
- ✓ Headline: "Platform"
- ✓ Subtitle: "One intelligence layer across your entire enterprise."
- ✓ Background particle effect (CSS, not Three.js)
- ✓ No nav reveal animation (visible from page load)
- ✓ Responsive: headline clamp matches hero text class

**Definition of Done:** All acceptance criteria met.

---

## PL-002

**Title:** Platform — Context + Problem
**Files:** `pages/platform.vue`, `components/ui/SectionContent.vue`

**Creative Intent:** The visitor should recognize their own operational pain.
**Business Intent:** Validate the problem before presenting the solution.
**Technical Intent:** Two SectionContent instances. Context section sets the world-as-it-is. Problem section names what's broken.

**Dependencies:** `SectionContent`

**Acceptance Criteria:**
- ✓ Context section reads: data growing faster than human interpretation
- ✓ Problem section names: disconnected tools, silos, delayed insights
- ✓ No SVARA branding in these two sections
- ✓ Scroll reveal animation on both sections

**Definition of Done:** All acceptance criteria met.

---

## PL-003

**Title:** Platform — SVARA Answer
**Files:** `pages/platform.vue`, `components/ui/SectionContent.vue`

**Creative Intent:** The visitor should feel relief that there's a unified solution.
**Business Intent:** Present SVARA as the infrastructure layer, not a point tool.
**Technical Intent:** SectionContent with heading + body. Architecture visualization showing the five capability layers stacked vertically.

**Dependencies:** `SectionContent`

**Acceptance Criteria:**
- ✓ Architecture visualization shows: Sense → Think → Simulate → Operate → Grow
- ✓ Each layer name links to `/products`
- ✓ No feature-level detail
- ✓ SVARA branding present

**Definition of Done:** All acceptance criteria met.

---

## PL-004

**Title:** Platform — Evidence + Future + CTA
**Files:** `pages/platform.vue`, `components/ui/SectionContent.vue`

**Creative Intent:** The visitor should feel confident that SVARA is real.
**Business Intent:** Provide social proof without case study depth.
**Technical Intent:** Evidence section with card-glass snippets (3 case study summaries). Future section with vision statement. CTA links to Products.

**Dependencies:** `SectionContent`

**Acceptance Criteria:**
- ✓ Evidence cards show outcome metrics
- ✓ Future section describes the intelligent enterprise
- ✓ CTA button links to `/products`
- ✓ No "Learn More" — link text is "Explore Products"

**Definition of Done:** All acceptance criteria met.

---

## PL-005

**Title:** Platform — SEO + Structured Data
**Files:** `pages/platform.vue`

**Creative Intent:** Answer "What is SVARA's platform?" for search and AI.
**Business Intent:** Rank for platform/category queries.
**Technical Intent:** `useSeoMeta` with title + description. Schema.org WebPage node. BreadcrumbList: Home > Platform.

**Dependencies:** `@nuxtjs/seo`

**Acceptance Criteria:**
- ✓ Title: "SVARA TechFusion — Platform"
- ✓ Description: 3-sentence summary
- ✓ BreadcrumbList structured data
- ✓ Canonical URL: `https://svaratechfusion.com/platform`
- ✓ Open Graph tags present

**Definition of Done:** All acceptance criteria met.
