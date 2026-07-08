# ENGINEERING SYSTEM

**Version:** 2.0 | **Status:** Approved | **Owner:** Engineering Team | **Review Date:** 2026-10-08
**Dependencies:** 007_MOTION_SYSTEM.md | **Related:** 010_IMPLEMENTATION_CONTRACTS.md

---

## TL;DR

Four-layer architecture: Nuxt SSR → Experience Layer → 3D World Layer → Engine Layer. TypeScript strict mode. Tailwind utility-only CSS. GSAP is the single animation engine. Lenis is the single scroll engine. Three.js is the single 3D renderer. Vue is the single UI framework. No CMS — content is code. Performance budgets at every layer. Tests at every boundary. Static deployment via `npm run generate`.

This document overrides 008_ENGINEERING_OS.md v1.0 in its entirety.

---

## 01 — Folder Structure

### Top-Level

```
svara-web/
├── app/                        # Nuxt application
├── public/                     # Static assets
├── docs/                       # SVARA OS documentation
├── tests/                      # Test suites
├── nuxt.config.ts              # Nuxt configuration
├── tailwind.config.ts          # Tailwind CSS v4 configuration
├── tsconfig.json               # TypeScript configuration
├── package.json
└── .env                        # Environment variables (local only)
```

### app/ — Application

```
app/
├── components/
│   ├── scenes/
│   │   ├── Scene01.vue          # Homepage scene 1
│   │   ├── Scene02.vue          # Homepage scene 2
│   │   ├── Scene03.vue          # Homepage scene 3
│   │   ├── Scene04.vue          # Homepage scene 4
│   │   ├── Scene05.vue          # Homepage scene 5
│   │   ├── Scene06.vue          # Homepage scene 6
│   │   ├── Scene07.vue          # Homepage scene 7
│   │   └── Scene08.vue          # Homepage scene 8
│   ├── AppHeader.vue            # Navigation (multi-page aware)
│   ├── PageLoader.vue           # Cold-boot loader
│   ├── IntelligenceWorld.vue    # Three.js canvas mount
│   └── WorldAtmosphere.vue      # Atmospheric effects
│
├── composables/
│   ├── usePageReveal.ts         # Page transition state
│   └── useScrollProgress.ts     # Scroll progress from ScrollController
│
├── layouts/
│   └── default.vue              # Single layout for all pages
│
├── pages/
│   ├── index.vue                # Homepage (cinematic experience)
│   ├── platform.vue             # Platform overview
│   ├── products.vue             # Products overview
│   ├── products/
│   │   └── [slug].vue           # Product detail page
│   ├── industries.vue           # Industries overview
│   ├── industries/
│   │   └── [slug].vue           # Industry detail page
│   ├── technology.vue           # Technology page
│   ├── knowledge.vue            # Knowledge hub
│   ├── knowledge/
│   │   ├── faq.vue              # FAQ page
│   │   └── glossary.vue         # Glossary page
│   ├── investors.vue            # Investor page
│   ├── company.vue              # Company page
│   ├── contact.vue              # Contact page
│   └── legal/
│       ├── privacy.vue          # Privacy policy
│       └── terms.vue            # Terms of service
│
├── lib/
│   ├── experience/              # Experience engine (homepage only)
│   │   ├── MotionDirector.ts    # Single GSAP point of contact
│   │   ├── ScrollController.ts  # Scroll state publisher
│   │   ├── MasterTimeline.ts    # Coordinated scene timeline
│   │   ├── SceneManager.ts      # Scene lifecycle manager
│   │   ├── CameraController.ts  # Camera position authority
│   │   ├── ParticleEngine.ts    # 8-channel particle system
│   │   ├── LightingLayer.ts     # Scene lighting control
│   │   ├── TypographyDirector.ts# Text animation states
│   │   ├── ProductDirector.ts   # Product 3D visualization
│   │   └── pacing.ts            # Animation timing tokens
│   │
│   ├── content/                 # Content management
│   │   ├── encyclopedia.ts      # Encyclopedia articles
│   │   ├── faq.ts               # FAQ entries
│   │   └── glossary.ts          # Glossary terms
│   │
│   └── seo/                     # SEO utilities
│       ├── jsonld.ts            # JSON-LD generators
│       └── meta.ts              # Meta tag generators
│
├── plugins/
│   ├── gsap.client.ts           # GSAP + ScrollTrigger plugin
│   └── three.client.ts          # Three.js plugin
│
├── stores/
│   └── experience.ts            # Experience state (scene, progress)
│
├── types/
│   ├── experience.ts            # Experience type definitions
│   └── content.ts               # Content type definitions
│
├── utils/
│   ├── products.ts              # Product data (9 products)
│   ├── industries.ts            # Industry data (12 industries)
│   └── seo.ts                   # SEO constants
│
└── app.vue                      # Root component (Lenis, loader, transition)
```

### public/ — Static Assets

```
public/
├── fonts/
│   └── geist/                   # Geist Sans (self-hosted)
├── models/                      # 3D models (GLTF)
└── textures/                    # Three.js textures
```

### tests/

```
tests/
├── unit/
│   ├── MotionDirector.spec.ts
│   ├── ScrollController.spec.ts
│   ├── ParticleEngine.spec.ts
│   ├── CameraController.spec.ts
│   ├── LightingLayer.spec.ts
│   ├── TypographyDirector.spec.ts
│   ├── pacing.spec.ts
│   └── products.spec.ts
├── integration/
│   ├── scroll-to-scene.spec.ts
│   └── scene-transition.spec.ts
├── visual/
│   └── scene-screenshots.spec.ts
└── perf/
    └── frame-rate.spec.ts
```

---

## 02 — Coding Standards

### TypeScript

| Rule | Value |
|------|-------|
| Mode | Strict |
| `noImplicitAny` | `true` |
| `strictNullChecks` | `true` |
| Return types | Explicit on all functions |
| Prop types | TypeScript interfaces (no inline) |
| Data exports | Typed constants |
| `any` | Forbidden. Use `unknown` + type guard. |

### Naming

| Element | Convention | Example |
|---------|-----------|---------|
| Vue components | PascalCase | `Scene01.vue`, `AppHeader.vue` |
| Composables | camelCase, `use` prefix | `useScrollProgress.ts` |
| Lib modules | PascalCase (classes) | `MotionDirector.ts` |
| Lib modules | camelCase (utilities) | `pacing.ts` |
| Type definitions | PascalCase | `SceneConfig` |
| Stores | camelCase | `experience.ts` |
| Data files | camelCase | `products.ts` |
| CSS classes | Tailwind only | No custom CSS |
| Variables | camelCase | `scrollProgress` |
| Constants | UPPER_SNAKE_CASE | `MAX_PARTICLES` |
| Files (components) | PascalCase | `Scene01.vue` |
| Files (logic) | camelCase | `scrollController.ts` |
| Files (data) | camelCase | `products.ts` |
| Files (types) | camelCase | `experience.ts` |

### Imports

Order (separated by blank line):
1. Vue / Nuxt (`import { ref } from "vue"`)
2. Third-party (`import { gsap } from "gsap"`)
3. Internal lib (`import { MotionDirector } from "~/lib/experience/MotionDirector"`)
4. Components (`import Scene01 from "~/components/scenes/Scene01.vue"`)
5. Utils (`import { products } from "~/utils/products"`)
6. Types (`import type { SceneConfig } from "~/types/experience"`)

No barrel imports (`index.ts`). Import from the specific file using `~` alias.

### Vue Components

| Rule | Rationale |
|------|-----------|
| Single root element | Vue 3 standard |
| Max 300 lines per component | Exceeds 300 → split into sub-components |
| No GSAP imports | Only MotionDirector owns GSAP |
| No ScrollTrigger calls | Only ScrollController owns ScrollTrigger |
| No camera access | Only CameraController owns camera |
| Animation state via props or channels | Components receive, never create |
| Text in `<template>`, not generated in `<script>` | Screen-reader accessible |
| `defineProps` + TypeScript interface | Explicity typed component contracts |
| `v-show` for scene components (not `v-if`) | Avoid mount/unmount thrashing during scroll |

### CSS

| Rule | Rationale |
|------|-----------|
| Tailwind CSS v4 utility classes only | No custom CSS files |
| No scoped styles | Use utility classes consistently |
| Design tokens as CSS variables | Defined in `tailwind.config.ts` |
| No inline styles | Use utility classes |
| Responsive via Tailwind breakpoints | `sm:`, `md:`, `lg:`, `xl:` |
| Dark mode: not supported | Enterprise site, light theme only |

### Error Handling

| Context | Strategy |
|---------|----------|
| Three.js | try/catch around all operations |
| GSAP timeline creation | try/catch |
| ScrollTrigger registration | try/catch |
| Development errors | Console log with context |
| Production errors | Silent fail. No user-facing messages. |
| Canvas WebGL context loss | Re-create IntelligenceWorld |
| Font load failure | Fallback to system sans-serif |

### Git

| Convention | Rule |
|-----------|------|
| Commits | Conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`) |
| Branches | `feat/<name>`, `fix/<name>`, `docs/<name>` |
| PR size | < 400 lines changed |
| PR description | Links to spec document + acceptance criteria |

---

## 03 — GSAP

### Role

GSAP is the single animation engine for the entire site. No other animation library is used. No CSS transitions for complex animation (CSS transitions are acceptable for micro-interactions like hover states).

### Library Versions

| Package | Version | Purpose |
|---------|---------|---------|
| `gsap` (Club) | 3.15.0 | Core engine, timelines, ticker |
| `gsap/ScrollTrigger` | built-in | Scroll-linked animation |
| `gsap/MotionPathPlugin` | built-in | Particle path animation |
| `gsap/EasePack` | built-in | Additional easing functions |

### Single Point of Contact

Only `MotionDirector` imports or calls GSAP. No component, page, scene, or composable imports GSAP directly.

```
MotionDirector.ts  ←── the only file that imports "gsap"
    │
    ├── createTimeline()     → returns gsap.timeline
    ├── createTween()        → returns gsap.to/from
    ├── registerPlugins()    → registers ScrollTrigger, MotionPath
    └── dispose()            → kills all GSAP instances
```

Components receive animation state through scalar channels or props. They never call `gsap.to()`, `gsap.from()`, or `gsap.timeline()`.

### Ticker

`gsap.ticker` is the single frame pump. All render loops run through it.

```
gsap.ticker.add(() => {
  lenis.raf()           // advance smooth scroll
  threeRenderer.render() // render Three.js frame
})
```

Rules:
- No `requestAnimationFrame()` outside of `gsap.ticker`
- No `useRafFn()`, `setInterval`, or `setTimeout` for animation
- `gsap.ticker.lagSmoothing(0)` — no lag smoothing

### ScrollTrigger

ScrollTrigger instances are owned by `ScrollController` only. No component calls `ScrollTrigger.create()`, `ScrollTrigger.refresh()`, or `ScrollTrigger.update()` directly.

MasterTimeline uses ScrollTrigger for the single homepage pin:

```typescript
ScrollTrigger.create({
  trigger: ".home-experience",
  start: "top top",
  end: "+=200svh",
  pin: true,
  scrub: 1.5
})
```

### Animation Tokens

All animation values reference tokens. No magic numbers.

| Token | Values |
|-------|--------|
| Duration | `--anim-1` (100ms) through `--anim-10` (5000ms) |
| Default ease | `power2.out` |
| Scroll ease | `power4.out` |
| Scene transition ease | `power4.out` |
| Overlap | 20% of scene duration |
| Stagger | 50ms between items |

---

## 04 — Lenis

### Role

Lenis is the single smooth scroll engine. It provides the smoothed scroll position that drives ScrollTrigger and the entire cinematic experience.

### Configuration

```typescript
const lenisOptions = {
  autoRaf: false,        // GSAP ticker owns render loop
  lerp: 0.05,            // Default interpolation
  duration: 1.2,         // Scroll duration multiplier
  easing: (t: number) =>
    Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1
}
```

### Reduced Motion

```typescript
const isReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches

const lenisOptions = {
  ...baseOptions,
  lerp: isReducedMotion ? 1 : 0.05,
  duration: isReducedMotion ? 0.1 : 1.2,
  smoothWheel: !isReducedMotion
}
```

### Integration

Lenis is mounted in `app.vue` via `<VueLenis root>`. The `gsap.ticker` drives `lenis.raf()`.

```typescript
// app.vue
gsap.ticker.add((time: number) => {
  lenisRef.value?.raf(time * 1000)
})
```

### Data Flow

```
Lenis (smooth scroll position)
    │
    ▼
ScrollController (publishes 0–1 progress + velocity + direction)
    │
    ▼
MasterTimeline (scroll-scrubbed)
    │
    ▼
SceneManager → CameraController → ParticleEngine → LightingLayer → TypographyDirector
```

### Ownership

| What | Who |
|------|-----|
| Lenis instance | `app.vue` (via `<VueLenis root>`) |
| `lenis.raf()` call | `gsap.ticker` callback in `app.vue` |
| Scroll data extraction | `ScrollController` (reads from Lenis on ticker) |
| ScrollTrigger update | `useLenis` callback in `app.vue` calls `ScrollTrigger.update()` |

---

## 05 — Three.js

### Role

Three.js renders the 3D particle world behind the homepage cinematic experience. It is used on the homepage only. Other pages are DOM-only.

### Library Versions

| Package | Version | Purpose |
|---------|---------|---------|
| `three` | 0.185.1 | Core 3D engine |
| `@types/three` | latest | TypeScript definitions |

### IntelligenceWorld

Single persistent Three.js canvas. Mounted once. Never unmounted. Persists across all scenes.

```typescript
class IntelligenceWorld {
  renderer: WebGLRenderer
  scene: Scene
  camera: PerspectiveCamera

  constructor(container: HTMLElement) {
    this.renderer = new WebGLRenderer({
      antialias: true,
      alpha: true
    })
    this.renderer.toneMapping = ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.0
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(this.renderer.domElement)

    this.scene = new Scene()
    this.scene.fog = new FogExp2(0x000000, 0.01)

    this.camera = new PerspectiveCamera(
      45,                                     // FOV
      container.clientWidth / container.clientHeight, // aspect
      0.1,                                    // near
      1000                                    // far
    )
    this.camera.position.set(0, 0, 20)
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  resize(width: number, height: number) {
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  dispose() {
    this.renderer.dispose()
    this.scene.clear()
  }
}
```

### Configuration

| Property | Value |
|----------|-------|
| Renderer | `WebGLRenderer`, antialias + alpha |
| Tone mapping | ACESFilmicToneMapping |
| Exposure | 1.0 |
| Pixel ratio | `min(devicePixelRatio, 2)` |
| Background | Transparent |
| Fog | `FogExp2(0x000000, 0.01)` |
| Size | Full viewport, resize listener |

### Render Loop

Three.js render is driven by `gsap.ticker`, not by Three.js's own animation loop.

```typescript
// In MotionDirector or IntelligenceWorld
gsap.ticker.add(() => {
  world.render()
})

// Disable Three.js native loop
renderer.setAnimationLoop(null)
```

### Scene Management

- Single `Scene` object. Contents change, scene does not.
- All objects added/removed through `SceneManager`
- ParticleEngine manages its own `Points` objects within the scene
- LightingLayer manages all light objects within the scene
- CameraController only manipulates `camera.position` and `camera.lookAt`

### Ownership

| Component | Owns |
|-----------|------|
| `IntelligenceWorld` | Renderer instance, scene object, camera object |
| `CameraController` | Camera position, rotation, FOV, lookAt |
| `ParticleEngine` | Particle Points, BufferGeometry |
| `LightingLayer` | All Light objects |
| `SceneManager` | Object add/remove lifecycle |

### Performance

| Limit | Value |
|-------|-------|
| Max draw calls | 200 |
| Max geometry vertices | 100,000 |
| Max textures | 50 (1024×1024 max) |
| Max simultaneous objects | 500 |
| Pixel ratio cap | 2 |
| Texture size cap | 2048×2048 |

---

## 06 — Vue (Component Architecture)

### Framework

Nuxt 4 + Vue 3. Composition API throughout. `<script setup lang="ts">` on all components. No Options API.

### Page Structure

Every page follows the same architecture:

```vue
<script setup lang="ts">
// 1. SEO meta
useSeoMeta({ ... })

// 2. Data imports
const products = await useProducts()

// 3. Page state
const isReady = ref(false)

// 4. Lifecycle
onMounted(() => { ... })
</script>

<template>
  <div class="page-container">
    <PageHeader />
    <PageContent />
    <PageFooter />
  </div>
</template>
```

### Page Types

| Type | Pattern | Example |
|------|---------|---------|
| Cinematic | `<ClientOnly>` + scene components | `index.vue` |
| Overview | Heading + grid of linked cards | `products.vue`, `industries.vue` |
| Detail | Full 6-section page architecture | `products/[slug].vue`, `industries/[slug].vue` |
| Hub | Search + browse + featured | `knowledge.vue` |
| Utility | Form or static content | `contact.vue`, `legal/privacy.vue` |

### Component Hierarchy

```
app.vue
├── PageLoader (conditional, cold boot only)
├── <VueLenis root>
│   └── <NuxtLayout>
│       ├── AppHeader (pages > homepage: always visible)
│       │   └── Nav items → <NuxtLink>
│       └── <NuxtPage>
│           ├── index.vue (homepage)
│           │   ├── <ClientOnly>
│           │   │   ├── IntelligenceWorld
│           │   │   └── WorldAtmosphere
│           │   ├── Scene01–08 (v-show based on active scene)
│           │   └── <div class="home-experience__tail" /> (scroll silence)
│           ├── platform.vue
│           │   └── PlatformShell → CapabilityCards → TimelineIntegration
│           ├── products.vue
│           │   └── ProductGrid → ProductCard → ProductFilter
│           └── ...
```

### State Management

No Pinia. Simple composables with `useState` for cross-page state:

```typescript
// stores/experience.ts
export const useExperienceStore = () => {
  const sceneIndex = useState("sceneIndex", () => 0)
  const sceneProgress = useState("sceneProgress", () => 0)
  const isComplete = useState("isComplete", () => false)

  return { sceneIndex, sceneProgress, isComplete }
}
```

### Lazy Loading

| Component | Load Strategy |
|-----------|--------------|
| Scene01.vue | Eager (critical for LCP) |
| Scene02.vue | Preloaded after Scene01 mount |
| Scenes 03–04 | Dynamic: scroll > 25% |
| Scenes 05–06 | Dynamic: scroll > 45% |
| Scenes 07–08 | Dynamic: scroll > 65% |
| IntelligenceWorld | Async defer after FCP |
| All other pages | Standard Nuxt lazy loading |

### Component Rules

- Single root element
- Max 300 lines
- No GSAP imports
- No ScrollTrigger calls
- No camera access
- Text in `<template>`, not generated in `<script>`
- `defineProps` with TypeScript interface
- `v-show` for scene components (not `v-if`)

---

## 07 — CMS (Content Management)

### Philosophy

SVARA does not use a traditional CMS. Content is code. This is intentional:

- **Experience content** (scene text, motion config) lives in component code and `lib/experience/` — it is part of the engineering, not the writing process
- **Knowledge content** (encyclopedia articles, FAQ, glossary) lives in `lib/content/` as typed TypeScript files — reviewed and versioned through git
- **Data content** (products, industries) lives in `utils/` as typed constants — single source of truth

### Content Layers

| Layer | Location | Format | Edited By | Review Process |
|-------|----------|--------|-----------|----------------|
| Scene text | `components/scenes/Scene*.vue` | HTML in `<template>` | Engineering + Content | PR review |
| Motion config | `lib/experience/` | TypeScript | Engineering | PR review |
| Encyclopedia | `lib/content/encyclopedia.ts` | TypeScript objects | Content | PR review |
| FAQ | `lib/content/faq.ts` | TypeScript objects | Content | PR review |
| Glossary | `lib/content/glossary.ts` | TypeScript objects | Content | PR review |
| Products | `utils/products.ts` | TypeScript constants | Product | PR review |
| Industries | `utils/industries.ts` | TypeScript constants | Product | PR review |
| SEO metadata | `utils/seo.ts` | TypeScript constants | Content + SEO | PR review |

### Content File Format

All content files export typed arrays of content objects:

```typescript
// lib/content/glossary.ts
export interface GlossaryEntry {
  term: string
  definition: string
  relatedTerms: string[]
  category: "core" | "condition" | "technology" | "standard"
}

export const glossary: GlossaryEntry[] = [
  {
    term: "Intelligence Loop",
    definition: "The continuous cycle of observe, understand, predict, coordinate, and improve.",
    relatedTerms: ["Enterprise Intelligence Infrastructure", "Sensing"],
    category: "core"
  },
  // ...
]
```

### Content Rules

- Every content entry has a `version` field for change tracking
- Every content entry has a `lastReviewed` date
- Content changes go through the same PR process as code changes
- No content is edited in a CMS UI — all editing is in-editor
- Content types are defined in `types/content.ts` — single source of truth for shape
- Content exports are immutable at runtime (readonly arrays)

### Future CMS Consideration

If content volume exceeds what is practical in TypeScript files (> 500 entries), migrate to:

1. Markdown files in `content/` directory (processed at build time)
2. Headless CMS with Nuxt Content v3 (if a non-technical content team requires it)

This migration path is defined but not activated. The threshold is 500 entries or a dedicated content editor who cannot use git.

---

## 08 — Performance

### Budgets

| Metric | Target | Hard Limit |
|--------|--------|------------|
| LCP | < 2.5s | < 3.5s |
| FCP | < 1.5s | < 2.0s |
| TBT | < 200ms | < 300ms |
| CLS | < 0.1 | < 0.25 |
| INP | < 200ms | < 300ms |
| FPS (idle) | 60 | 55 |
| FPS (scrolling) | 60 | 30 |
| FPS (transition) | 60 | 30 |

### Bundle Budgets

| Asset | Target | Hard Limit |
|-------|--------|------------|
| Initial JS | < 200KB | < 350KB |
| Initial CSS | < 50KB | < 100KB |
| Three.js (deferred) | < 150KB | < 200KB |
| GSAP | < 50KB | < 80KB |
| Total page weight | < 1MB | < 2MB |
| Fonts | < 100KB | < 150KB |

### Memory Budgets

| State | Target | Hard Limit |
|-------|--------|------------|
| Idle (no 3D) | < 50MB | < 100MB |
| Scrolling with 3D | < 200MB | < 350MB |
| All scenes loaded | < 250MB | < 400MB |

### Frame Budget (per frame at 60fps = 16.67ms)

| Subsystem | Budget |
|-----------|--------|
| Particle position updates | < 4ms |
| Three.js draw calls | < 8ms |
| Lenis + ScrollTrigger | < 2ms |
| Vue reactivity + layout | < 2ms |
| Headroom | < 0.67ms |

### Asset Limits

| Asset | Limit |
|-------|-------|
| Three.js textures | 2048×2048 max |
| GSAP timeline tweens | 100 max per timeline |
| Total particles | 10,000 max |
| Simultaneous 3D objects | 500 max |
| Draw calls | 200 max |
| Vertex count | 100,000 max |
| Font files | 2 (Geist Sans Regular + Bold) |

### Loading Strategy

| Phase | What Loads | Trigger |
|-------|-----------|---------|
| 1 — Critical | HTML, CSS, Geist Sans (preload) | First request |
| 2 — Engine | GSAP (sync in `<head>`), Lenis (sync), Three.js (deferred) | After FCP |
| 3 — Homepage | IntelligenceWorld, Scene01, ParticleEngine channel 1 | After engine ready |
| 4 — Preload | Scene02 | After Scene01 mount |
| 5 — Mid-load | Scenes 03–04 | Scroll > 25% |
| 6 — Late-load | Scenes 05–08 | Scroll > 65% |

### Performance Rules

1. No `requestAnimationFrame()` outside of `gsap.ticker`
2. No `setInterval` for animation
3. LOD for particles at distance > 50 (reduce count by 50%)
4. Off-screen particle channels pause (state preserved)
5. Pixel ratio capped at 2
6. Scene components use `v-show` (not `v-if`) during active experience
7. Dynamic imports for all non-critical components
8. Font-display: swap for Geist Sans

---

## 09 — Testing

### Test Types

| Type | What It Covers | When It Runs |
|------|---------------|--------------|
| Unit | Individual modules in isolation | Every commit |
| Integration | Module interactions and data flow | Every PR |
| Visual | Screenshot comparison at scene boundaries | Every PR |
| Performance | Lighthouse, frame rate, bundle size | Every PR |

### Unit Tests

Test all `lib/experience/` modules in isolation:

| Module | What to Test |
|--------|-------------|
| `MotionDirector` | Timeline creation, tween creation, dispose |
| `ScrollController` | Progress calculation, velocity, direction, scene detection |
| `MasterTimeline` | Scene marker positions, callback dispatch |
| `SceneManager` | Scene lifecycle, active scene tracking |
| `CameraController` | Position transitions, shot type mapping |
| `ParticleEngine` | Channel configuration, behavior transitions, total count cap |
| `LightingLayer` | Scene config application, blend timing |
| `TypographyDirector` | State transitions, text content |
| `pacing` | Token resolution |
| `products` | Data integrity, outcome mapping |
| `industries` | Data integrity |

### Integration Tests

| Test | What It Verifies |
|------|-----------------|
| Scroll → ScrollController → MasterTimeline | Progress propagates correctly |
| Scene boundary → CameraController | Camera reaches correct position |
| Scene boundary → LightingLayer | Lighting achieves correct config |
| Scene transition → ParticleEngine | Channels transition to correct config |
| Scene transition → TypographyDirector | Text enters and exits at correct scroll positions |

### Visual Regression Tests

| Viewport | Scene | Capture Point |
|----------|-------|---------------|
| 1440×900 | 01–08 | Center of each scene range |
| 768×1024 | 01–08 | Center of each scene range |
| 375×812 | 01–08 | Center of each scene range |

### Performance Tests

| Test | Measurement | Threshold |
|------|-------------|-----------|
| Lighthouse CI | Performance score | ≥ 95 |
| Frame rate during scroll | FPS over 5s scroll | ≥ 55 average |
| Bundle size | Total JS + CSS | ≤ 250KB initial |
| Memory | Heap snapshot | ≤ 200MB with all scenes loaded |

### Test Commands

```bash
npm run test:unit          # Unit tests (Vitest)
npm run test:integration   # Integration tests (Vitest + jsdom)
npm run test:visual        # Visual regression (Playwright)
npm run test:perf          # Performance benchmarks
npm run test:all           # All tests
npm run lint               # ESLint
npm run typecheck          # vue-tsc --noEmit
```

### Testing Rules

1. Mock GSAP, Three.js, and Lenis in unit tests (never instantiate real instances)
2. Every bug fix includes a test that reproduces the bug
3. Every new module includes unit tests (80% coverage minimum)
4. Integration tests use a real browser environment (Playwright)
5. Visual tests have a 1% pixel diff threshold

---

## 10 — Deployment

### Environments

| Environment | URL | Branch | Build Command | Hosting |
|-------------|-----|--------|--------------|---------|
| Development | `localhost:3000` | local | `npm run dev` | Local |
| Staging | `staging.svara.com` | `main` | `npm run generate` | CDN |
| Production | `svara.com` | `release/*` | `npm run generate` | CDN |

### Build

```bash
npm run generate    # Nuxt 4 static generation → dist/
```

Outputs a fully static site to `dist/`. No server runtime. No database. No API.

### Pre-deploy Checklist

- [ ] `npm run lint` — no errors
- [ ] `npm run typecheck` — no errors
- [ ] `npm run test:all` — all tests pass
- [ ] `npm run generate` — build succeeds
- [ ] Lighthouse CI — all metrics pass
- [ ] Bundle size — within budget

### Deployment Process

1. PR merged to `main`
2. Staging build triggered (automatic via CI)
3. Staging URL smoke-tested (manual)
4. Release branch created from `main`:
   ```
   git checkout main
   git checkout -b release/v<version>
   ```
5. Production build triggered (manual via CI)
6. Deploy to CDN
7. Smoke test production URL
8. Tag release in git:
   ```
   git tag v<version>
   git push origin v<version>
   ```

### Rollback

| Aspect | Detail |
|--------|--------|
| Mechanism | Redeploy previous build URL |
| Target | < 15 minutes from decision |
| Database | None (static site) — rollback is CDN revert |
| Previous builds | Always available on CDN |
| Verification | Smoke test after rollback |

### Monitoring

| Category | Metric | Tool | Alert Threshold |
|----------|--------|------|-----------------|
| Performance | LCP | Web Vitals API | > 3.5s |
| Performance | CLS | Web Vitals API | > 0.25 |
| Performance | INP | Web Vitals API | > 300ms |
| Performance | Frame rate | Custom `performance.now()` check | < 24fps for 5s |
| Errors | JS errors | `window.onerror` | Any error |
| Memory | Heap usage | `performance.memory` | > 350MB |
| Uptime | CDN | Provider SLA | 99.9% |
| Uptime | DNS | Provider | < 100ms resolution |

### Logging

| Environment | Level | Detail |
|-------------|-------|--------|
| Development | Verbose | All console logs |
| Staging | Info | Key lifecycle events |
| Production | Errors only | No debug logging, no PII |

---

## The Engineering Rule

**Code without an approved specification is waste.**

Every feature has a specification before it has code. Spec first. Approval second. Implementation third. This order is inviolable.

If the implementation disagrees with the spec, fix the implementation — not the spec.
