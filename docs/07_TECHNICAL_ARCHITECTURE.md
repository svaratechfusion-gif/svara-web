# SVARA EXPERIENCE SPECIFICATION
## 07 — TECHNICAL ARCHITECTURE

**Type:** SES
**Status:** Source of Truth

---

## Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Nuxt 4 + Vue 3 | SSR, routing, component system |
| Styling | Tailwind CSS v4 | Utility-first styling |
| 3D | Three.js v0.185.1 | Particle field, camera, world rendering |
| Animation | GSAP 3.15.0 (Club) | Timeline, scroll-triggered animation |
| Scroll | Lenis 1.3.25 | Smooth scrolling, momentum |
| SEO | `@nuxtjs/seo` | Meta tags, structured data, sitemap |
| Icons | `@lucide/vue` | Icon system |
| Font | Geist Sans (Fontsource) | Self-hosted typography |

---

## File Structure

```
app/
├── app.vue                    # Root: Lenis, GSAP ticker, page reveal
├── layouts/
│   └── default.vue            # AppHeader + slot + AppFooter
├── pages/
│   ├── index.vue              # Experience homepage
│   ├── platform.vue           # Platform page
│   ├── products.vue           # Products overview
│   ├── products/[slug].vue    # Product Knowledge Hub
│   ├── industries.vue         # Industries overview
│   ├── industries/[slug].vue  # Industry page
│   ├── technology.vue         # Technology page
│   ├── knowledge.vue          # Knowledge hub
│   ├── knowledge/faq.vue      # FAQ
│   ├── knowledge/glossary.vue # Glossary
│   ├── investors.vue          # Investors
│   ├── company.vue            # Company
│   └── contact.vue            # Contact
├── components/
│   ├── layout/                # AppHeader, AppFooter, PageLoader
│   ├── scenes/                # Experience scene components
│   ├── three/                 # Three.js world components
│   ├── ui/                    # Shared UI components
│   └── products/              # Product page components
├── composables/               # Vue composables (usePageSeo, etc.)
├── plugins/                   # GSAP, Lenis registration
└── assets/css/                # Tailwind, custom styles
```

---

## Motion Engine Architecture

```
lib/experience/
├── MotionDirector.ts     # Façade — owns all motion systems
├── ScrollController.ts   # Single ScrollTrigger owner
├── MasterTimeline.ts     # Single scroll-scrubbed timeline
├── SceneManager.ts       # Scene lifecycle and registration
├── SceneDirector.ts      # Scene content direction
├── CameraController.ts   # Camera position and animation
├── ParticleEngine.ts     # Channel-based particle simulation
├── LightingLayer.ts      # Lighting states
├── TypographyDirector.ts # Typography generation
├── ProductDirector.ts    # Product scene direction
├── AtmosphereLayer.ts    # Atmosphere effects
├── CursorController.ts   # Cursor tracking
├── PerformanceMonitor.ts # Performance tracking
└── pacing.ts             # Timing table (single source of truth)
```

---

## Key Constraints

| Constraint | Rule |
|------------|------|
| No `ScrollTrigger.create()` in components | All triggers through `ScrollController` |
| No `gsap.timeline()` in components | All timelines through `MasterTimeline` |
| No `new THREE.PerspectiveCamera()` outside world | Camera owned by `CameraController` |
| No `window.addEventListener("scroll")` | Lenis + ScrollController own scroll |
| No duplicate rAF | `gsap.ticker` is the single frame pump |
| No GSAP access in Vue components | Components declare content only |

---

## Vendored Dependencies

GSAP Club plugins and Lenis are vendored under `lib/gsap/` and `lib/lenis/` with Vite aliases in `nuxt.config.ts`. The npm packages exist only for TypeScript declarations.

---

**End of SES-07.**
