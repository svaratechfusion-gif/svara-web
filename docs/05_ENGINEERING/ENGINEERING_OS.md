# ENGINEERING OS

## Technology serves experience. Experience serves knowledge. Knowledge serves category. Category serves company.

### The order

Engineering is almost last. Exactly where it belongs.

Not because engineering is不重要. Because engineering must serve something. Engineering without a knowledge source to implement, an experience to power, a category to prove, and a company to build is engineering for its own sake.

SVARA does not write code. SVARA implements documents.

---

## 01 — The Chain

```
COMPANY OS     →  Why
  └── CATEGORY OS   →  What
       └── KNOWLEDGE OS  →  Know
            └── EXPERIENCE OS →  Show
                 └── ENGINEERING OS →  Build
```

Engineering builds what experience shows, which teaches what knowledge knows, which defines what category is, which exists because company exists.

---

## 02 — The Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Nuxt 4 + Vue 3 | Page structure, routing, SSR |
| 3D Engine | Three.js v0.185.1 | Intelligence World, 3D scenes |
| Animation | GSAP 3.15.0 (Club) | All motion, timeline, scroll, ticker |
| Scroll | Lenis 1.3.25 | Smooth scroll, rate control |
| Styling | Tailwind CSS v4 | Utility-first, design tokens |
| Typography | Geist Sans | Primary typeface |
| Icons | @lucide/vue | Icon system |
| SEO | @nuxtjs/seo | Structured data, meta |
| Package Manager | npm | Dependency management |

---

## 03 — The Engine Architecture

### Motion Engine

| Component | Owner | Responsibility |
|-----------|-------|----------------|
| MotionDirector | GSAP | Single point of contact for GSAP. No component imports GSAP directly |
| ScrollController | Scene transitions | Creates ScrollTrigger instances. No component creates ScrollTrigger directly |
| MasterTimeline | Homepage | Coordinates all scene timelines. Single timeline to rule them all |
| pacing.ts | Timing | All durations, delays, overlaps in one file. No magic numbers |

### 3D Engine

| Component | Owner | Responsibility |
|-----------|-------|----------------|
| CameraController | Camera | Positions, animates, configures the camera. No component touches camera.position |
| ParticleEngine | Particles | 8-channel particle system. Each channel independently controlled |
| LightingLayer | Lighting | All scene lighting. No component adds lights directly |
| IntelligenceWorld | World | The 3D environment that persists across all scenes |

### Typography Engine

| Component | Owner | Responsibility |
|-----------|-------|----------------|
| TypographyDirector | Text | 5 states (enter, exit, emphasis, rest, emergency). All text animation flows through here |

### Product Engine

| Component | Owner | Responsibility |
|-----------|-------|----------------|
| ProductDirector | Product viz | Renders product data from `products.ts` as 3D visualization |

---

## 04 — The Ownership Rules

### Rule 001 — No component owns GSAP
Only MotionDirector imports or calls GSAP. Components receive animation state through channels or props.

### Rule 002 — No component owns ScrollTrigger
Only ScrollController creates ScrollTrigger instances. No component registers scroll triggers.

### Rule 003 — No page owns camera movement
Only CameraController positions, animates, or configures the camera.

### Rule 004 — No duplicated render loops
gsap.ticker is the single frame pump. Lenis runs autoRaf: false. Three.js renders from gsap.ticker. No requestAnimationFrame outside gsap.ticker.

### Rule 005 — No animation without acceptance criteria
Every animation contract lists observable acceptance criteria. "Make it look good" is not acceptance criteria.

### Rule 006 — Every property has one owner
No two systems animate the same property. No two components fight over the same transform.

---

## 05 — Performance Budgets

| Metric | Target | Hard Limit |
|--------|--------|------------|
| Time to Interactive | < 2s | < 3s |
| First Contentful Paint | < 1.5s | < 2s |
| Largest Contentful Paint | < 2.5s | < 3.5s |
| Cumulative Layout Shift | < 0.1 | < 0.25 |
| First Input Delay | < 50ms | < 100ms |
| Frame rate (scroll) | 60fps | 30fps |
| Frame rate (idle) | 60fps | 55fps |
| Memory | < 200MB | < 350MB |
| Bundle size (initial) | < 200KB | < 350KB |

### Performance rules

- No Three.js texture larger than 2048x2048
- No GSAP timeline with more than 100 tweens without profiling
- No particle system with more than 10,000 particles without LOD
- No scroll trigger without debounced refresh on resize
- No animation on pages the user has not yet seen (lazy timeline creation)

---

## 06 — The Data Architecture

### Single source of truth files

| File | Contains | Consumed By |
|------|----------|-------------|
| `app/utils/products.ts` | 9 products with capability mapping | ProductDirector, all product pages |
| `app/utils/industries.ts` | 12 industries with capability mapping | Industry pages, filtering |
| `docs/01_BRAND/DESIGN_TOKENS.md` | All design tokens | CSS variables, component props |
| `docs/01_BRAND/INTERACTION_TOKENS.md` | All interaction specs | MotionDirector, animation config |

No data is duplicated. No file contains data that belongs in another file.

---

## 07 — The Engineering Rule

**Code without an approved specification is waste.**

Every feature has a specification before it has code. Spec first. Approval second. Implementation third. This order is inviolable.

The specification is the contract. The implementation is the execution. If the implementation disagrees with the spec, fix the implementation — not the spec.
