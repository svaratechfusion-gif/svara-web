# HOMEPAGE BLUEPRINT

**Version:** 1.0 | **Status:** Approved | **Owner:** Product Team | **Review Date:** 2026-10-08
**Dependencies:** 005_UX_OS.md, 006_EXPERIENCE_OS.md, 007_MOTION_SYSTEM.md, 008_ENGINEERING_OS.md, 009_SEO_OS.md, 010_IMPLEMENTATION_CONTRACTS.md | **Related:** 012_DESIGN_PRINCIPLES.md

---

## 01 — Purpose

The homepage teaches Enterprise Intelligence Infrastructure as a category, establishes SVARA as its definer, and guides the visitor toward the next step in their journey. It does not sell. It does not announce. It teaches.

The homepage is the only page that uses the cinematic scroll experience. Every other page is standard content. The homepage earns the right for every other page to exist.

---

## 02 — Business Goal

| Goal | Measure |
|------|---------|
| Category comprehension | 80% of visitors can state "Enterprise Intelligence Infrastructure is..." after one visit |
| Scroll completion | 60%+ of visitors reach Scene 08 |
| Brand recall | 50%+ of visitors remember SVARA as the company behind EII |
| CTA conversion | 5%+ click-through to Platform, Products, or Contact |
| Bounce rate | < 40% on homepage |

---

## 03 — User Goal

The visitor arrives not knowing the category exists. They leave with:

- Awareness that a new category exists (Enterprise Intelligence Infrastructure)
- Recognition that Intelligence Fragmentation is their problem
- Understanding of the Intelligence Loop framework
- Knowledge that SVARA is the infrastructure that delivers it
- Clarity on what to do next

---

## 04 — Audience

| Persona | Primary Need | What They Get From Homepage |
|---------|-------------|---------------------------|
| Enterprise CXO | Strategic relevance | "This category matters to my business" |
| Enterprise Architect | Technical understanding | "The Intelligence Loop framework makes sense" |
| Investor | Market opportunity | "This is a new category. SVARA owns it." |
| Engineering Talent | Technical challenge | "I want to build this" |
| Government / Regulator | Compliance confidence | Category education (defers to Company page) |

The homepage does not serve all audiences equally. It prioritizes the CXO and Architect. Other personas find their depth on subsequent pages.

---

## 05 — Questions Answered

| Scene | Primary Question | Secondary Questions |
|-------|-----------------|-------------------|
| 01 | What is Enterprise Intelligence Infrastructure? | Why have I not heard of this before? |
| 02 | Why does it matter? | What is Intelligence Fragmentation? What does it cost? |
| 03 | How do we solve it? | What is the Intelligence Loop? How do the five stages connect? |
| 04 | Who builds it? | What is SVARA? Why should I trust them? |
| 05 | What can it do? | What products does SVARA have? How do they map to outcomes? |
| 06 | Does it work? | What industries use it? Is it enterprise-scale? |
| 07 | Where is this going? | What is the future of enterprise intelligence? |
| 08 | What now? | What should I read next? How do I start? |

---

## 06 — Scene Flow

### Act 1 — Category (Scenes 01–02)

The visitor learns the category exists and the problem is real.

```
Scene 01: The Category (0–15%, 15s)
  Camera: Static
  Emotion: Curiosity
  Content: "Enterprise Intelligence Infrastructure"
  World: Dark void → particles assemble into a core
  Lighting: 15% Neutral
  Nav: Hidden
  Brand: Hidden

Scene 02: The Problem (15–35%, 20s)
  Camera: Pull Back
  Emotion: Concern (darkest scene)
  Content: "Data is everywhere. Intelligence is nowhere."
  World: Core fragments into isolated silos
  Lighting: 5% Cool
  Nav: Hidden
  Brand: Hidden
```

### Act 2 — Framework (Scene 03)

The visitor receives the mental model that makes the category understandable.

```
Scene 03: The Framework (35–50%, 15s)
  Camera: Orbit
  Emotion: Understanding
  Content: "Sense. Think. Predict. Act. Learn."
  World: Silos connect into a flowing five-stage chain
  Lighting: 40% Warm
  Nav: Appears
  Brand: Hidden
```

### Act 3 — Evidence (Scenes 04–06)

The visitor meets SVARA, sees the products, and understands enterprise scale.

```
Scene 04: The Platform (50–62%, 12s)
  Camera: Static (settle)
  Emotion: Relief (brightest scene, 80%)
  Content: "SVARA"
  World: Framework layers settle into unified structure
  Lighting: 80% Warm
  Brand: First appearance

Scene 05: Capabilities (62–75%, 13s)
  Camera: Fly Through
  Emotion: Confidence
  Content: Nine product names
  World: Nine product nodes orbiting core
  Lighting: 65% Neutral
  Nav + Brand: Visible

Scene 06: Proof (75–85%, 10s)
  Camera: Rise
  Emotion: Trust
  Content: Industry names (terrain labels)
  World: Industry landscapes forming beneath
  Lighting: 50% Warm
  Nav + Brand: Visible
```

### Act 4 — Horizon (Scenes 07–08)

The visitor sees the future and chooses their next step.

```
Scene 07: Future (85–92%, 7s)
  Camera: Pull Back (widest shot)
  Emotion: Inspiration
  Content: None (felt, not described)
  World: All landscapes merge into one connected grid
  Lighting: 35% Neutral
  Nav + Brand: Visible

Scene 08: Invitation (92–100%, 8s)
  Camera: Static (settle)
  Emotion: Action
  Content: "Engineering The Intelligence Layer Of Tomorrow"
  World: Grid settles, particles slow to ambient
  Lighting: 30% Neutral
  CTAs: Platform | Products | Contact
```

---

## 07 — Information Flow

### Progressive Disclosure

The homepage reveals information in strict order. Each piece of information depends on the previous:

```
Scene 01: Category exists (name only)
Scene 02: Problem exists (fragmentation)
Scene 03: Framework exists (loop)
Scene 04: Company exists (SVARA)
Scene 05: Products exist (nine names)
Scene 06: Scale exists (industries)
Scene 07: Future exists (connected)
Scene 08: Next step exists (choice)
```

### What Is NOT on the Homepage

- Product details (price, features, comparisons)
- Case studies (deferred to Industry pages)
- Technical architecture (deferred to Technology page)
- Team photos or founder story (deferred to Company page)
- Blog posts or news
- Social media feeds
- Email capture forms (CTAs link to Contact page)
- Chat widgets
- Cookie consent (handled at legal level)

### Content Count Per Scene

| Scene | Words | Lines of Text | Entities Mentioned |
|-------|-------|---------------|-------------------|
| 01 | 3 | 1 | Enterprise Intelligence Infrastructure |
| 02 | 6 | 2 (split) | Intelligence Fragmentation |
| 03 | 6 | 5 (one per stage) | Sense, Think, Predict, Act, Learn |
| 04 | 1 | 1 | SVARA |
| 05 | 9 | 9 (one per product) | Vision AI, Drone AI, Edge AI, AI Agents, Digital Twin, Business Cloud, AI OS, Command Center, Growth Intelligence |
| 06 | 12 | 12 (one per industry) | Manufacturing, Energy, Logistics, Healthcare, Defense, Smart Cities, Agriculture, Aviation, Marine, Mining, Telecom, Supply Chain |
| 07 | 0 | 0 | None |
| 08 | 7 | 2 | Platform, Products, Contact |

**Total: 44 words across all 8 scenes.**

---

## 08 — Content Hierarchy

### Scene Content Architecture

Each scene has a strict content stack:

```
┌─────────────────────────────────┐
│  THREE.JS WORLD (background)    │  aria-hidden="true"
│  ┌───────────────────────────┐  │
│  │  TEXT OVERLAY (foreground)│  │  Real DOM, readable
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  INTERACTION ELEMENTS     │  │  Hover targets, CTAs
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  SCENE INDICATOR         │  │  Progress bar / dots
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

### Typography

| Element | Size (desktop) | Weight | Leading | Tracking |
|---------|---------------|--------|---------|----------|
| Category name (S01) | 7.5rem / 120px | 300 (Light) | 0.95 | -0.03em |
| Problem text (S02) | 4.5rem / 72px | 300 (Light) | 1.1 | -0.02em |
| Framework stages (S03) | 5rem / 80px | 600 (Semibold) | 1.2 | -0.03em |
| Brand name (S04) | 8rem / 128px | 600 (Semibold) | 0.9 | 0 |
| Product names (S05) | 1.25rem / 20px | 500 (Medium) | 1.4 | 0 |
| Industry names (S06) | 0.875rem / 14px | 400 (Regular) | 1.2 | 0.05em |
| Headline (S08) | 3rem / 48px | 300 (Light) | 1.1 | -0.02em |
| CTA text (S08) | 1rem / 16px | 500 (Medium) | 1 | 0 |

### Mobile Typography

| Element | Size (mobile < 768px) |
|---------|----------------------|
| Category name (S01) | 2.5rem / 40px |
| Problem text (S02) | 1.75rem / 28px |
| Framework stages (S03) | 2rem / 32px |
| Brand name (S04) | 3.5rem / 56px |
| Product names (S05) | 1rem / 16px |
| Headline (S08) | 1.5rem / 24px |

### Colors

| Element | Color |
|---------|-------|
| Scene text (S01–S03, before brand) | #F5F5F0 (Off-white, light) |
| Scene text (S04–S08, after brand) | Inherits from lighting context |
| CTA buttons | #1A1A1A (Dark) text on transparent bg |
| Scene indicator | #FFFFFF at 30% opacity, current dot at 80% |

---

## 09 — Motion Opportunities

### Scene-Specific Motion

| Scene | Primary Motion | Technique | Duration |
|-------|---------------|-----------|----------|
| 01 | Particles assemble from chaos into a core | ParticleEngine Channel 1: dispersion→gather | 15s, scroll-scrubbed |
| 02 | Core fragments into isolated clusters | ParticleEngine Channel 2: gather→split | 20s, scroll-scrubbed |
| 03 | Clusters connect into five-stage flowing chain | ParticleEngine Channel 3: split→flow | 15s, scroll-scrubbed |
| 04 | Flow settles into one stable structure | ParticleEngine Channel 4: flow→settle | 12s, scroll-scrubbed |
| 05 | Nine nodes orbit the core, each with unique character | ParticleEngine Channel 5: settle→orbit | 13s, scroll-scrubbed |
| 06 | Terrain landscapes form beneath the visitor | ParticleEngine Channel 6: orbit→landscape | 10s, scroll-scrubbed |
| 07 | All landscapes merge into one connected grid | ParticleEngine Channel 7: landscape→grid | 7s, scroll-scrubbed |
| 08 | Grid settles, particles slow to ambient flow | ParticleEngine Channel 8: grid→ambient | 8s, scroll-scrubbed |

### ParticleEngine Configuration

| Channel | Behavior | Count | Speed | Opacity | Color | Size | Direction | Spread |
|---------|----------|-------|-------|---------|-------|------|-----------|--------|
| 1 (S01) | Flow-to-center | 2000 | 0.3 | 0.4 | #6C7A89 | 2 | Inward | Wide |
| 2 (S02) | Fragmented | 2000 | 0.6 | 0.3 | #3B4A5A | 3 | Random | Extreme |
| 3 (S03) | Pathed-chain | 2000 | 0.4 | 0.5 | #D4A574 | 2 | Sequential | Narrow |
| 4 (S04) | Stable-ambient | 1500 | 0.2 | 0.6 | #C9A96E | 2 | Gentle orbit | Minimal |
| 5 (S05) | Orbital-nodes | 1500 | 0.5 | 0.5 | #8BA1B5 | 3 | Radial orbits | Medium |
| 6 (S06) | Terrain-flow | 500 | 0.3 | 0.4 | #7A9B7E | 1 | Horizontal sweep | Wide |
| 7 (S07) | Grid-pulse | 500 | 0.2 | 0.3 | #9BA4B5 | 1 | Grid-aligned | Full |
| 8 (S08) | Ambient-drift | 500 | 0.1 | 0.2 | #A0A0A0 | 1 | Random | Gentle |

**Total particle count: 10,000** (within budget).

### Scroll-Driven Animation

Every scene transition is pinned to scroll progress via ScrollTrigger. No time-based animations on the homepage. The visitor controls pace; SVARA controls sequence.

- Scene transitions: 1500ms, power4.out, scroll-scrubbed
- Lighting blends: 800ms between scenes
- Particle channel transitions: 600ms, power2.inOut
- Text opacity/position: 400ms, power2.out

---

## 10 — Camera Opportunities

### Camera by Scene

| Scene | Shot Type | Position | Movement | Narrative Purpose |
|-------|-----------|----------|----------|-------------------|
| 01 | Static | Origin (0, 0, 10) | None | "This is the truth. Absorb it." |
| 02 | Pull Back | (0, 0, 10) → (0, 0, 18) | Slow widening | "See how big the problem is." |
| 03 | Orbit | Circular path, r=12 | 180° arc | "Understand the relationship between stages." |
| 04 | Static | (0, 0, 10) | None | "The answer has arrived. Settle." |
| 05 | Fly Through | Path through 9 node positions | Directed flight | "Explore what exists." |
| 06 | Rise | (0, -5, 12) → (0, 10, 12) | Ascending vertical | "See the scale across industries." |
| 07 | Pull Back | (0, 10, 12) → (0, 5, 25) | Widest shot | "The full horizon." |
| 08 | Static | (0, 5, 15) | None | "The journey is complete. Rest." |

### Camera Rules

- Camera position changes ONLY at scene boundaries (never mid-scene)
- Camera movement is always motivated by narrative, never decorative
- Camera transitions are 1500ms, power4.out
- No camera rotation (pitch/yaw/roll) unless specified
- Camera respects `prefers-reduced-motion: reduce` — switches to static at each scene waypoint with 200ms snap transitions

### CameraController Implementation

```typescript
// CameraController receives scene index and transitions to target position
// Target positions defined in scene config array
// Interpolated via gsap.to(camera.position, { x, y, z, duration: 1.5, ease: "power4.out" })
// No direct mutation of camera.position outside CameraController
```

---

## 11 — SEO

### Primary Search Intent

"What is Enterprise Intelligence Infrastructure?"

### Secondary Search Intents

1. "What is Intelligence Fragmentation?"
2. "How does the Intelligence Loop work?"
3. "What is SVARA?"
4. "What is enterprise AI infrastructure?"
5. "How to connect enterprise data to decision-making?"

### Structured Data

**JSON-LD: WebSite**

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SVARA",
  "url": "https://svara.com",
  "description": "Enterprise Intelligence Infrastructure",
  "inLanguage": "en-US"
}
```

**JSON-LD: Article (for homepage content)**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Enterprise Intelligence Infrastructure",
  "description": "Enterprise Intelligence Infrastructure is the connected system of sensing, reasoning, prediction, orchestration, and learning that transforms fragmented enterprise data into continuously improving operational intelligence.",
  "author": {
    "@type": "Organization",
    "name": "SVARA"
  }
}
```

### Meta Tags

```html
<title>SVARA — Enterprise Intelligence Infrastructure</title>
<meta name="description" content="Enterprise Intelligence Infrastructure is the connected system of sensing, reasoning, prediction, orchestration, and learning that transforms fragmented enterprise data into continuously improving operational intelligence. SVARA engineers the intelligence layer." />
<meta property="og:title" content="SVARA — Enterprise Intelligence Infrastructure" />
<meta property="og:description" content="Enterprise Intelligence Infrastructure is the connected system of sensing, reasoning, prediction, orchestration, and learning." />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="SVARA — Enterprise Intelligence Infrastructure" />
<meta name="twitter:description" content="Enterprise Intelligence Infrastructure: the connected system of sensing, reasoning, prediction, orchestration, and learning." />
```

### Internal Linking (from homepage)

| Scene | Link To | Type |
|-------|---------|------|
| 03 | `/platform` | Framework detail |
| 04 | `/company` | Company page |
| 05 | `/products` | Product overview |
| 06 | `/industries` | Industry overview |
| 08 | `/platform` | CTA |
| 08 | `/products` | CTA |
| 08 | `/contact` | CTA |

---

## 12 — LLM Targets

### AI Answer Paragraph (must be first 200 words, self-contained)

> Enterprise Intelligence Infrastructure is the connected system of sensing, reasoning, prediction, orchestration, and learning that transforms fragmented enterprise data into continuously improving operational intelligence. It is a new category of enterprise infrastructure — the layer that connects every signal to every decision to every action to every outcome, and closes the loop so the organization becomes more intelligent with every cycle. SVARA engineers this intelligence layer.

This paragraph is the first parsable content on the page (within the first 200 words, within a `<p>` tag or visible text). It must appear in Scene 01 as visible text.

### AI Answer Optimization

- The bolded/visible text in Scene 01 ("Enterprise Intelligence Infrastructure") is the exact phrase LLMs will associate with SVARA
- The full definition is readable by screen readers and crawlers even if it is revealed via scroll
- The page's `description` meta tag contains the first sentence of the definition
- JSON-LD Article markup embeds the full definition

### FAQ Schema (3–5 questions)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Enterprise Intelligence Infrastructure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Enterprise Intelligence Infrastructure is the connected system of sensing, reasoning, prediction, orchestration, and learning that transforms fragmented enterprise data into continuously improving operational intelligence."
      }
    },
    {
      "@type": "Question",
      "name": "What problem does Enterprise Intelligence Infrastructure solve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It solves Intelligence Fragmentation — the state where enterprise intelligence is broken across disconnected vendors, departments, systems, time, and expertise."
      }
    },
    {
      "@type": "Question",
      "name": "How does the Intelligence Loop work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Intelligence Loop has five stages: Sense (observe what is happening), Think (understand why), Predict (forecast what happens next), Act (coordinate action), and Learn (capture outcomes to improve the next cycle)."
      }
    },
    {
      "@type": "Question",
      "name": "Who builds Enterprise Intelligence Infrastructure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SVARA engineers the intelligence layer that connects fragmented enterprise systems into one continuously learning operational ecosystem."
      }
    }
  ]
}
```

---

## 13 — Accessibility

### WCAG 2.2 AA Compliance

| Requirement | Implementation |
|-------------|---------------|
| Text alternatives | Canvas is `aria-hidden="true"`. All text is real DOM. |
| Keyboard navigation | Space/PageDown advances one scene. Tab reaches CTAs in Scene 08. |
| Focus management | Skip-to-content link available from Scene 01. |
| Color contrast | White text (#FFFFFF) on dark backgrounds (≥ 5% lighting) passes 7:1 ratio. Scene 01 uses #F5F5F0 on dark void — verify ratio ≥ 4.5:1. |
| Resize text | All scene text readable at 200% zoom. |
| Motion | `prefers-reduced-motion: reduce` disables all non-essential animation. |

### Reduced Motion Mode

When `prefers-reduced-motion: reduce`:

| System | Behavior |
|--------|----------|
| Particles | Static at current scene position. No movement. |
| Camera | Snap to scene waypoints (200ms fade). No interpolation. |
| Scroll | Lenis lerp = 1 (no smoothing). Duration = 0.1. |
| Scene transitions | 500ms crossfade (no scroll-scrubbed animation). |
| Particle transitions | Instant channel switch. No flow animation. |

---

## 14 — Performance

### Budget

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP | < 2.5s | Scene 01 text visible |
| FCP | < 1.5s | Page background visible |
| TBT | < 200ms | Main thread blocking |
| CLS | < 0.1 | Layout stability |
| FPS | 60fps | Scroll animation smoothness |
| Initial JS | < 200KB | Core experience bundle |
| Memory | < 200MB | Particle system + scene state |

### Loading Strategy

| Asset | Strategy | Priority |
|-------|----------|----------|
| HTML + CSS | Inline critical CSS in `<head>` | Highest |
| Geist Sans | `font-display: swap`, preload | High |
| Three.js | Async import, deferred to after first paint | Medium |
| GSAP | Synchronous in `<head>` (60 bytes) via plugin | High |
| Lenis | Synchronous, loaded with GSAP | High |
| Scene Vue components | Dynamic import per scene | Low |
| Particle system | Initialized after IntelligenceWorld mount | Low |

### Scene Lazy Loading

Scenes load on demand based on scroll position:

- Scene 01: Loaded immediately (critical for LCP)
- Scene 02: Preloaded after Scene 01 mount
- Scenes 03–04: Loaded when scroll > 25%
- Scenes 05–06: Loaded when scroll > 45%
- Scenes 07–08: Loaded when scroll > 65%

### Render Optimization

- Particle count capped at 10,000 (across all 8 channels)
- Pixel ratio capped at 2 (devicePixelRatio > 2 rounds down)
- ACESFilmicToneMapping for HDR-like quality without performance cost
- gsap.ticker is the single frame pump (no redundant rAF calls)
- Three.js renderer uses `renderer.setAnimationLoop(null)` — driven by gsap.ticker
- Scene components use `v-show` not `v-if` to avoid mount/unmount thrashing during scroll

---

## 15 — Acceptance Criteria

### Category Comprehension

- [ ] Visitor can articulate "Enterprise Intelligence Infrastructure is a category that connects sensing, reasoning, prediction, orchestration, and learning" after one visit
- [ ] Scene 01 text appears within 2.5s of page load
- [ ] Category name is the first visible content (Scene 01 headline)

### Scroll Experience

- [ ] All 8 scenes trigger in correct order as visitor scrolls
- [ ] Scene transitions overlap by 20% of scene duration
- [ ] No scene is skippable (all 8 must be passed to reach footer)
- [ ] Visual tail at 100%+ ensures no early timeline cutoff
- [ ] Lenis scroll feels smooth (lerp 0.05 on desktop)
- [ ] No scroll jank (FPS stays at 60 throughout)

### Visual Fidelity

- [ ] Particles transition between channel configurations at scene boundaries
- [ ] Lighting blends over 800ms between scenes
- [ ] Camera moves only at scene boundaries (never mid-scene)
- [ ] Brand appears first at Scene 04 (never before)
- [ ] Nav appears at Scene 03 (never before)
- [ ] Nav hidden during Scenes 01–02

### Responsive

- [ ] Full experience works at 375px–2560px
- [ ] Mobile typography matches spec (see Section 08)
- [ ] Hamburger menu at < 768px
- [ ] Touch scroll works with full experience intact
- [ ] Reduced particle count on mobile (capped at 5,000 for < 768px)

### Accessibility

- [ ] `prefers-reduced-motion: reduce` disables all non-essential animation
- [ ] Essential scene text is in DOM (not canvas), readable by screen readers
- [ ] Canvas is `aria-hidden="true"`
- [ ] Skip-to-content link available from Scene 01
- [ ] All text readable at 200% zoom
- [ ] Keyboard: Space/PageDown advances one scene
- [ ] Scene indicator visible (progress bar or dots)

### SEO

- [ ] Primary search intent defined: "What is Enterprise Intelligence Infrastructure?"
- [ ] Meta title and description match spec
- [ ] JSON-LD WebSite and Article structured data present
- [ ] FAQPage JSON-LD present with 4 questions
- [ ] AI answer paragraph is in first 200 words of parsable content
- [ ] Internal links from scenes to Platform, Products, Industries, Contact

### Performance

- [ ] LCP < 2.5s
- [ ] FCP < 1.5s
- [ ] TBT < 200ms
- [ ] CLS < 0.1
- [ ] FPS 60 during scroll
- [ ] Initial JS bundle < 200KB
- [ ] Memory < 200MB

### Code Quality

- [ ] Only MotionDirector imports GSAP
- [ ] Only ScrollController creates ScrollTrigger instances
- [ ] Only CameraController touches camera.position
- [ ] gsap.ticker is the single frame pump
- [ ] No `requestAnimationFrame()` outside gsap.ticker
- [ ] No two components animate the same property
- [ ] All animation values reference tokens (no magic numbers)

---

## Appendix A — Entity Reference

Entities mentioned or defined on the homepage, with links to canonical pages:

| Entity | Canonical Page | Mentioned In |
|--------|---------------|--------------|
| Enterprise Intelligence Infrastructure | `/knowledge/encyclopedia/enterprise-intelligence-infrastructure` | Scene 01 |
| Intelligence Fragmentation | `/knowledge/encyclopedia/intelligence-fragmentation` | Scene 02 |
| Intelligence Loop | `/platform` | Scene 03 |
| SVARA | `/company` | Scene 04 |
| All 9 products | `/products` | Scene 05 |
| All 12 industries | `/industries` | Scene 06 |

---

## Appendix B — Implementation Contract Mapping

| Scene | Contract ID | Components |
|-------|------------|------------|
| Scene 01 | HP-001 | Scene01.vue, ParticleEngine (Channel 1), CameraController (Static) |
| Scene 02 | HP-002 | Scene02.vue, ParticleEngine (Channel 2), CameraController (PullBack) |
| Scene 03 | HP-003 | Scene03.vue, ParticleEngine (Channel 3), CameraController (Orbit) |
| Scene 04 | HP-004 | Scene04.vue, ParticleEngine (Channel 4), CameraController (Static), BrandAppearance |
| Scene 05 | HP-005 | Scene05.vue, ParticleEngine (Channel 5), CameraController (FlyThrough) |
| Scene 06 | HP-006 | Scene06.vue, ParticleEngine (Channel 6), CameraController (Rise) |
| Scene 07 | HP-007 | Scene07.vue, ParticleEngine (Channel 7), CameraController (PullBack) |
| Scene 08 | HP-008 | Scene08.vue, ParticleEngine (Channel 8), CameraController (Static), CTAs |
| Infrastructure | HP-010 | MasterTimeline, ScrollController, SceneManager |
| 3D World | HP-011 | IntelligenceWorld (Three.js canvas), LightingLayer |
| Navigation | HP-012 | AppHeader (Scene 03+ visibility) |
| Loading | HP-013 | PageLoader |
| SEO | HP-014 | Meta tags, JSON-LD, structured data |

---

## Appendix C — Files to Create / Modify

| Action | File Path |
|--------|-----------|
| Create | `app/components/scenes/Scene01.vue` |
| Create | `app/components/scenes/Scene02.vue` |
| Create | `app/components/scenes/Scene03.vue` |
| Create | `app/components/scenes/Scene04.vue` |
| Create | `app/components/scenes/Scene05.vue` |
| Create | `app/components/scenes/Scene06.vue` |
| Create | `app/components/scenes/Scene07.vue` |
| Create | `app/components/scenes/Scene08.vue` |
| Modify | `app/pages/index.vue` — replace old scene components with new |
| Modify | `app/app.vue` — verify Lenis + GSAP ticker setup |
| Keep | `app/lib/experience/MotionDirector.ts` — single GSAP point of contact |
| Keep | `app/lib/experience/ScrollController.ts` — scroll progress publisher |
| Keep | `app/lib/experience/MasterTimeline.ts` — scroll-scrubbed timeline |
| Keep | `app/lib/experience/SceneManager.ts` — scene lifecycle |
| Keep | `app/lib/experience/CameraController.ts` — camera position transitions |
| Keep | `app/lib/experience/ParticleEngine.ts` — 8-channel particle system |
| Keep | `app/lib/experience/LightingLayer.ts` — scene lighting config |
| Keep | `app/lib/experience/TypographyDirector.ts` — text animation states |
| Delete | `app/components/scenes/SceneBirth.vue` (old) |
| Delete | `app/components/scenes/SceneEmergence.vue` (old) |
| Delete | `app/components/scenes/SceneIntelligence.vue` (old) |
| Delete | `app/components/scenes/SceneData.vue` (old) |
| Delete | `app/components/scenes/SceneSvara.vue` (old) |
| Delete | `app/components/scenes/SceneProducts.vue` (old) |
| Delete | `app/components/scenes/SceneIndustries.vue` (old) |
| Delete | `app/components/scenes/SceneScale.vue` (old) |
| Delete | `app/components/scenes/SceneEnding.vue` (old) |
