# Homepage Experience

**Status:** Draft
**Owner:** SVARA
**Purpose:** Introduce the Enterprise Intelligence category.
**Business Goal:** Generate trust.
**Primary Persona:** Enterprise CXOs
**Secondary Persona:** Investors
**User Question:** Why does enterprise intelligence matter?
**Success Metrics:**
- Average engagement
- Scroll completion
- Time on page
- CTA conversion

---

## Scenes

| Scene | Phase | Emotion | Duration | Hold | Component | Nav Visible |
|-------|-------|---------|----------|------|-----------|-------------|
| 01 | Enterprise Reality | Curiosity | 5s | 0s | SceneBirth | No |
| 02 | Emergence | Discovery | 5s | 3.5s | SceneEmergence | No |
| 03 | Intelligence | Wonder | 8s | 3.5s | SceneIntelligence | No |
| 04 | Collapse | Concern | 10s | 3.5s | SceneData | No |
| 05 | Reconnect | Relief | 12s | 3.5s | SceneSvara | Yes — at threshold |
| 06 | Products | Confidence | 20s | 3.5s | SceneProducts | Yes |
| 07 | Industries | Trust | 20s | 3.5s | SceneIndustries | Yes |
| 08 | Scale | Respect | 15s | 3.5s | SceneScale | Yes |
| 09 | Invitation | Action | 3s | 5s | SceneEnding | Yes |

---

## Motion

Each scene writes to named particle channels via `SceneDirector`. No component animates itself. `MasterTimeline` drives scroll-scrubbed progress, `ScrollController` publishes 0-1 global progress.

## Camera

Static through Act 1. Slow push Act 2. Orbit Act 3 (core formation). Pull back Act 4 (collapse). Static Act 5 (reconnection). Fly-through clusters Act 6. Rise Act 7 (landscape). Pull back Act 8 (scale reveal). Settle Act 9 (resolution).

## Content

No text in Acts 1-2. Typography emerges from particles in Act 3 (focused). Dissolves in Act 4. Re-emerges Act 5 (SVARA branding). Product/industry names float in Acts 6-7. Final headline resolves Act 9.

## SEO

Single page. No sub-routes. `useSeoMeta` with title and description. Schema.org Organization identity. Open Graph and Twitter Card tags.

## Accessibility

- Reduced motion: Lenis lerp = 1, no GSAP tweens, no Three.js animation
- All scene text in DOM (not canvas) for screen readers
- Skip-to-content link
- Keyboard navigation for CTA
- Focus management on scene transitions
- `aria-hidden="true"` on canvas world

## Performance

- `<ClientOnly>` wraps Three.js world — SSR renders nothing
- Particle count ≤ 10k on mobile, ≤ 50k on desktop
- Lenis + GSAP ticker is the single rAF pump
- Font swap handled via `document.fonts.ready` → `ScrollTrigger.refresh()`

## Acceptance Criteria

- ✓ 60fps on target devices (MacBook Pro M-series, iPhone 14 Pro)
- ✓ No layout shift on font load
- ✓ All 9 scenes register and resolve
- ✓ Navigation hidden through Acts 1-4, visible from Act 5
- ✓ Reduced motion disables all animation
- ✓ PageLoader shows on cold load only
- ✓ No console errors
- ✓ No TypeScript errors

---

# Tasks

## HP-001

**Title:** Scene 01 — Enterprise Reality
**Files:** `SceneBirth.vue`, `SceneDirector.ts`, `CameraController.ts`, `MotionDirector.ts`, `ParticleEngine.ts`, `IntelligenceWorld.vue`, `pacing.ts` · `sectionSvh("birth")`

**Creative Intent:** The visitor should immediately understand that the page is alive and intentionally interactive.
**Business Intent:** Introduce the problem before introducing SVARA.
**Technical Intent:** No DOM scrolling. Camera remains static. Particles simulate distributed enterprise events.

**Dependencies:** `CameraController`, `ParticleEngine`, `MotionDirector`, `GSAP`, `Lenis`

**Acceptance Criteria:**
- ✓ 60fps
- ✓ No layout shift
- ✓ Camera static
- ✓ Mouse interaction working
- ✓ Scene exits at 12% scroll
- ✓ No visible text or brand elements

**Definition of Done:** All acceptance criteria met.

---

## HP-002

**Title:** Scene 02 — Emergence
**Files:** `SceneEmergence.vue`, `CameraController.ts`, `ParticleEngine.ts`, `TypographyDirector.ts`, `pacing.ts` · `sectionSvh("emergence")`

**Creative Intent:** The visitor should sense that the data is forming into something meaningful.
**Business Intent:** Show that enterprise data has untapped potential.
**Technical Intent:** Slow push camera. Particles begin connecting. Still no text.

**Dependencies:** `CameraController`, `ParticleEngine`, `TypographyDirector`

**Acceptance Criteria:**
- ✓ Camera begins slow push
- ✓ Particles form connecting patterns
- ✓ No text rendered
- ✓ Scene exit at 24% scroll
- ✓ No layout shift

**Definition of Done:** All acceptance criteria met.

---

## HP-003

**Title:** Scene 03 — Intelligence
**Files:** `SceneIntelligence.vue`, `CameraController.ts`, `ParticleEngine.ts`, `TypographyDirector.ts`, `pacing.ts` · `sectionSvh("intelligence")`

**Creative Intent:** The visitor should feel wonder as intelligence emerges from the data.
**Business Intent:** Establish intelligence as a natural emergent property of connected data.
**Technical Intent:** Camera orbits the core. Particles form neural-like structure. First typography: "Data becomes intelligence." Text is generated from particles, not faded in.

**Dependencies:** `CameraController`, `ParticleEngine`, `TypographyDirector`

**Acceptance Criteria:**
- ✓ Camera orbits the core structure
- ✓ Particles form neural-like connections
- ✓ Typography state transitions: Dormant → Generated → Focused
- ✓ No fade, slide, or bounce on text
- ✓ Scene exit at 36% scroll

**Definition of Done:** All acceptance criteria met.

---

## HP-004

**Title:** Scene 04 — Collapse
**Files:** `SceneData.vue`, `CameraController.ts`, `ParticleEngine.ts`, `TypographyDirector.ts`, `pacing.ts` · `sectionSvh("data")`

**Creative Intent:** The visitor should feel concern as the system fragments.
**Business Intent:** Demonstrate the cost of disconnected enterprise systems.
**Technical Intent:** Camera pulls back. Particles disconnect and fragment. Text dissolves back into particles. Lighting drops to 5% (the darkest point — darker than Birth).

**Dependencies:** `CameraController`, `ParticleEngine`, `TypographyDirector`, `LightingLayer`

**Acceptance Criteria:**
- ✓ Camera pull back (wider view)
- ✓ Particles disconnect (disconnected state)
- ✓ Typography transitions: Focused → Dissolved
- ✓ Lighting intensity at 5% (minimum of entire experience)
- ✓ Scene exit at 48% scroll

**Definition of Done:** All acceptance criteria met.

---

## HP-005

**Title:** Scene 05 — Reconnect (SVARA)
**Files:** `SceneSvara.vue`, `CameraController.ts`, `ParticleEngine.ts`, `TypographyDirector.ts`, `LightingLayer.ts`, `pacing.ts` · `sectionSvh("svara")`

**Creative Intent:** The visitor should feel relief as the system heals.
**Business Intent:** First introduction of SVARA. The answer appears.
**Technical Intent:** Camera returns to static. Particles re-link across every silo. Lighting rises to 80% (peak of entire experience). Text: "SVARA reconnects." SVARA branding appears. Navigation becomes visible.

**Dependencies:** `CameraController`, `ParticleEngine`, `TypographyDirector`, `LightingLayer`, `AppHeader`

**Acceptance Criteria:**
- ✓ Camera static (no movement)
- ✓ Particles reconnect across all channels
- ✓ Lighting intensity at 80% (peak)
- ✓ SVARA brand mark visible
- ✓ AppHeader becomes visible (opacity transition)
- ✓ Scene exit at 60% scroll

**Definition of Done:** All acceptance criteria met.

---

## HP-006

**Title:** Scene 06 — Products
**Files:** `SceneProducts.vue`, `ProductDirector.ts`, `CameraController.ts`, `ParticleEngine.ts`, `TypographyDirector.ts`, `pacing.ts` · `sectionSvh("products")`

**Creative Intent:** The visitor should feel confidence as capabilities are revealed.
**Business Intent:** Introduce product categories without listing features.
**Technical Intent:** Camera fly-through clusters. Particles orbit in category groups (Sense, Think, Simulate, Operate, Grow). Product names float in space. No feature details — just categories.

**Dependencies:** `ProductDirector`, `CameraController`, `ParticleEngine`, `TypographyDirector`

**Acceptance Criteria:**
- ✓ Camera fly-through between clusters
- ✓ Products grouped by capability (5 clusters)
- ✓ No feature-level detail
- ✓ Particles orbit each cluster
- ✓ Scene exit at 72% scroll

**Definition of Done:** All acceptance criteria met.

---

## HP-007

**Title:** Scene 07 — Industries
**Files:** `SceneIndustries.vue`, `CameraController.ts`, `ParticleEngine.ts`, `TypographyDirector.ts`, `pacing.ts` · `sectionSvh("industries")`

**Creative Intent:** The visitor should feel trust as the system applies everywhere.
**Business Intent:** Show breadth without depth. Industry landscapes.
**Technical Intent:** Camera rises (ascending). Landscape formations extend in all directions. Industry names appear as terrain labels. Environment shifts per industry.

**Dependencies:** `CameraController`, `ParticleEngine`, `TypographyDirector`

**Acceptance Criteria:**
- ✓ Camera rise movement
- ✓ Landscape formations per industry
- ✓ Industry names as terrain labels
- ✓ Scene exit at 84% scroll

**Definition of Done:** All acceptance criteria met.

---

## HP-008

**Title:** Scene 08 — Scale
**Files:** `SceneScale.vue`, `CameraController.ts`, `ParticleEngine.ts`, `pacing.ts` · `sectionSvh("scale")`

**Creative Intent:** The visitor should feel respect for the scale of the system.
**Business Intent:** Enterprise scale visualization.
**Technical Intent:** Camera pulls back to reveal the full enterprise scope. The entire world resolves into a single intelligence layer. Particles form a unified grid spanning the full viewport.

**Dependencies:** `CameraController`, `ParticleEngine`

**Acceptance Criteria:**
- ✓ Camera full pull back
- ✓ Unified grid visible spanning full viewport
- ✓ Scale is felt, not described (no text explaining scale)
- ✓ Scene exit at 92% scroll

**Definition of Done:** All acceptance criteria met.

---

## HP-009

**Title:** Scene 09 — Invitation
**Files:** `SceneEnding.vue`, `TypographyDirector.ts`, `ParticleEngine.ts`, `pacing.ts` · `sectionSvh("ending")`

**Creative Intent:** The visitor should feel compelled to act.
**Business Intent:** Drive CTA engagement.
**Technical Intent:** Typography resolves from particles into final headline: "Engineering The Intelligence Layer Of Tomorrow." CTA appears. Footer section becomes visible. World settles. Scene holds for scroll silence.

**Dependencies:** `TypographyDirector`, `ParticleEngine`

**Acceptance Criteria:**
- ✓ Final headline resolves: "Engineering The Intelligence Layer Of Tomorrow."
- ✓ CTA visible and functional
- ✓ World settles (particles slow to near-stop)
- ✓ 100svh tail silence
- ✓ Footer renders below tail

**Definition of Done:** All acceptance criteria met.

---

## HP-010

**Title:** Master Timeline & Scroll Infrastructure
**Files:** `MasterTimeline.ts`, `ScrollController.ts`, `MotionDirector.ts`, `pacing.ts`, `app.vue`

**Creative Intent:** Seamless scroll-driven narrative with no jank.
**Business Intent:** The scroll is the UX. If it breaks, the experience breaks.
**Technical Intent:** Single `gsap.timeline` (paused) scrubbed by single `ScrollTrigger`. `gsap.ticker` drives Lenis. `ScrollController` publishes 0-1 progress. `MasterTimeline.build()` partitions by pacing weights.

**Dependencies:** `GSAP`, `Lenis`

**Acceptance Criteria:**
- ✓ Single rAF pump: `gsap.ticker` calls `lenis.raf()`
- ✓ Single ScrollTrigger: `ScrollController` — no component creates its own
- ✓ Single timeline: `MasterTimeline` — no component creates its own
- ✓ `gsap.ticker.lagSmoothing(0)` applied
- ✓ Reduced motion: Lenis lerp = 1, no animation
- ✓ No `requestAnimationFrame` calls outside `gsap.ticker`

**Definition of Done:** All acceptance criteria met.

---

## HP-011

**Title:** IntelligenceWorld — Persistent Canvas
**Files:** `IntelligenceWorld.vue`, `WorldAtmosphere.vue`, `ParticleEngine.ts`, `CameraController.ts`

**Creative Intent:** One world, 9 scenes. The canvas persists across the page. No canvas reload or flash during scroll.
**Business Intent:** The 3D world feels alive and continuous.
**Technical Intent:** Single Three.js scene and renderer. Camera managed by `CameraController`. Particles managed by `ParticleEngine`. World mounts once on homepage and disposes on route change.

**Dependencies:** `Three.js`, `TresJS`, `ParticleEngine`, `CameraController`

**Acceptance Criteria:**
- ✓ Single canvas element for entire experience
- ✓ No canvas flicker or reload during scroll
- ✓ World disposes on route change (no memory leak)
- ✓ `<ClientOnly>` wraps the canvas
- ✓ World only mounts on homepage (`/`)
- ✓ Particles capped: 50k desktop, 10k mobile

**Definition of Done:** All acceptance criteria met.

---

## HP-012

**Title:** AppHeader — Progressive Reveal
**Files:** `AppHeader.vue`, `app.vue`

**Creative Intent:** The navigation should feel earned, not expected.
**Business Intent:** First 48% of the experience has no nav. Full focus on the story.
**Technical Intent:** `isHomepage` check. On `/`, nav opacity is 0 until scroll > 48vh (48% threshold). On other pages, nav is visible from page load. Transition: opacity + translateY over 500ms.

**Dependencies:** None

**Acceptance Criteria:**
- ✓ Nav hidden on `/` for first 48% of viewport height
- ✓ Nav visible on all other pages from page load
- ✓ Smooth opacity + translateY transition
- ✓ Nav items use `NuxtLink` (not `<a href="#">`)
- ✓ Reduced motion: no transform transition (opacity only)

**Definition of Done:** All acceptance criteria met.

---

## HP-013

**Title:** PageLoader — Cold Boot Sequence
**Files:** `PageLoader.vue`, `app.vue`, `usePageReveal.ts`

**Creative Intent:** The page should feel like it's booting up, not loading.
**Business Intent:** No loading spinner. The reveal itself is the experience.
**Technical Intent:** PageLoader shows on cold load. On completion, sets `usePageReveal()` to `true`. `app.vue` responds with scale(0.97) → scale(1) transition. On client-side navigation, PageLoader is skipped (state persists).

**Dependencies:** None

**Acceptance Criteria:**
- ✓ PageLoader visible on cold load
- ✓ PageLoader skipped on client-side navigation
- ✓ Scale transition: 0.97 → 1 over 700ms
- ✓ `transformDone` removes transform after transition (no `position: fixed` breakage)
- ✓ Reduced motion: PageLoader still shows, but no scale animation

**Definition of Done:** All acceptance criteria met.

---

## HP-014

**Title:** Homepage SEO & Structured Data
**Files:** `pages/index.vue`, `nuxt.config.ts`

**Creative Intent:** The homepage should answer "What is SVARA?" for both humans and AI.
**Business Intent:** Rank for enterprise intelligence infrastructure queries.
**Technical Intent:** `useSeoMeta` with title + 3-sentence description. Schema.org Organization identity from `nuxt.config.ts`. Open Graph and Twitter Card tags.

**Dependencies:** `@nuxtjs/seo`

**Acceptance Criteria:**
- ✓ Unique `<title>`: "SVARA TechFusion — Engineering The Intelligence Layer Of Tomorrow"
- ✓ `<meta name="description">` with 3-sentence summary (who, what, problem, why different)
- ✓ `og:title`, `og:description`, `og:image`, `og:url`
- ✓ `twitter:card`, `twitter:title`, `twitter:description`
- ✓ Schema.org Organization identity present
- ✓ No duplicate or conflicting meta tags

**Definition of Done:** All acceptance criteria met.
