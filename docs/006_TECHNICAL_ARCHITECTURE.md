# SVARA EXPERIENCE BIBLE
## Document 006 — Technical Architecture

**Status:** Approved
**Owner:** OpenCode

---

## 1.0 Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Nuxt 4 + Vue 3 | SSR, routing, component system |
| Styling | Tailwind CSS v4 | Utility-first styling |
| 3D | Three.js v0.185.1 | Particle field, camera, world |
| Animation | GSAP 3.15.0 (Club) | Timeline, scroll-triggered animation |
| Scroll | Lenis 1.3.25 | Smooth scrolling, momentum |
| SEO | `@nuxtjs/seo` | Meta tags, structured data, sitemap |
| Icons | `@lucide/vue` | Icon system |
| Font | Geist Sans (Fontsource) | Self-hosted typography |

---

## 2.0 File Structure

```
app/
├── app.vue                    # Root: Lenis, GSAP ticker, page reveal
├── layouts/default.vue        # AppHeader + slot + AppFooter
├── pages/
│   ├── index.vue              # Experience homepage
│   ├── platform.vue           # Platform page
│   ├── products.vue           # Products overview
│   ├── products/[slug].vue    # Knowledge Hub
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
│   ├── scenes/                # 9 experience scene components
│   ├── three/                 # Three.js world components
│   ├── ui/                    # ContentSlot, PageHero, SectionContent
│   └── products/              # Product page components
├── composables/               # usePageSeo, useStructuredData, etc.
├── plugins/                   # GSAP, Lenis registration
└── assets/css/                # Tailwind, custom styles
```

---

## 3.0 Motion Engine

```
lib/experience/
├── MotionDirector.ts      # Façade — owns all motion systems
├── ScrollController.ts    # Single ScrollTrigger owner
├── MasterTimeline.ts      # Single scroll-scrubbed timeline
├── SceneManager.ts        # Scene lifecycle and registration
├── SceneDirector.ts       # Scene content direction
├── CameraController.ts    # Camera position and animation
├── ParticleEngine.ts      # Channel-based particle simulation
├── LightingLayer.ts       # Lighting intensity and color
├── TypographyDirector.ts  # Text generation from particles
├── ProductDirector.ts     # Product scene direction
├── AtmosphereLayer.ts     # Atmosphere effects
├── CursorController.ts    # Cursor tracking
├── PerformanceMonitor.ts  # Performance tracking
└── pacing.ts              # Timing table (single source of truth)
```

---

## 4.0 Key Constraints

| Constraint | Rule |
|------------|------|
| No `ScrollTrigger.create()` in components | All through `ScrollController` |
| No `gsap.timeline()` in components | All through `MasterTimeline` |
| No direct `camera.position` access outside `CameraController` | Camera owned by `CameraController` |
| No `window.addEventListener("scroll")` | Lenis + `ScrollController` own scroll |
| No duplicate rAF | `gsap.ticker` is the single frame pump |
| No GSAP access in Vue components | Components declare content only |

---

## 5.0 Rendering Pipeline

```
User scroll → Lenis (smooth) → gsap.ticker → lenis.raf()
  → ScrollTrigger.update()
    → MasterTimeline.progress()
      → SceneManager updates each scene
        → ParticleEngine channels update
          → Three.js render loop reads channels
            → CameraController applies position
              → LightingLayer applies intensity
```

All on the same frame. No async. No drift.

---

## 6.0 Vendored Dependencies

GSAP Club plugins (`lib/gsap/`) and Lenis (`lib/lenis/`) are vendored locally with Vite aliases in `nuxt.config.ts`. npm packages exist only for TypeScript declarations.

---

**End of Document 006.**
