# ENGINEERING OS

**Version:** 1.0 | **Status:** Approved | **Owner:** Engineering Team | **Review Date:** 2026-10-08
**Dependencies:** DOCUMENT 006, DOCUMENT 007 | **Related:** DOCUMENT 010

## Architecture. Folder Structure. Coding Standards. Performance Budgets. Testing Strategy. Deployment. Monitoring.

---

## 01 — Architecture

### System Architecture

```
┌──────────────────────────────────────────────┐
│                 Nuxt 4 SSR                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────────┐ │
│  │  Pages   │ │ Layouts  │ │  Middleware   │ │
│  └──────────┘ └──────────┘ └──────────────┘ │
└──────────────────────┬───────────────────────┘
                       │
┌──────────────────────▼───────────────────────┐
│              Experience Layer                 │
│  ┌────────┐ ┌──────┐ ┌──────┐ ┌──────────┐ │
│  │SceneMan│ │Scroll│ │Motion│ │Typography│ │
│  │ -ager  │ │Contr.│ │Director│ │Director  │ │
│  └────────┘ └──────┘ └──────┘ └──────────┘ │
└──────────────────────┬───────────────────────┘
                       │
┌──────────────────────▼───────────────────────┐
│              3D World Layer                   │
│  ┌──────────┐ ┌──────┐ ┌──────┐ ┌──────────┐│
│  │Intelligen│ │Camera│ │Particle│ │ Lighting ││
│  │ ceWorld  │ │Contr.│ │Engine │ │  Layer   ││
│  └──────────┘ └──────┘ └──────┘ └──────────┘│
└──────────────────────┬───────────────────────┘
                       │
┌──────────────────────▼───────────────────────┐
│             Engine Layer                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────────┐ │
│  │  GSAP    │ │  Lenis   │ │  Three.js    │ │
│  │ (ticker) │ │ (scroll) │ │  (renderer)  │ │
│  └──────────┘ └──────────┘ └──────────────┘ │
└──────────────────────────────────────────────┘
```

### Data Flow

```
User Scroll
    │
    ▼
Lenis (smooth scroll)
    │
    ▼
ScrollController (0-1 progress)
    │
    ▼
MasterTimeline (timeline scrub)
    │
    ▼
SceneManager → CameraController → ParticleEngine → LightingLayer → TypographyDirector
    │
    ▼
Renderer (Three.js via gsap.ticker)
```

---

## 02 — Folder Structure

```
app/
├── components/
│   ├── scenes/
│   │   ├── Scene01.vue
│   │   ├── Scene02.vue
│   │   ├── Scene03.vue
│   │   ├── Scene04.vue
│   │   ├── Scene05.vue
│   │   ├── Scene06.vue
│   │   ├── Scene07.vue
│   │   └── Scene08.vue
│   ├── AppHeader.vue
│   ├── PageLoader.vue
│   └── ...
├── composables/
│   └── useScrollProgress.ts
├── layouts/
│   ├── default.vue
│   └── homepage.vue
├── pages/
│   ├── index.vue
│   ├── platform.vue
│   ├── products/
│   │   └── [slug].vue
│   ├── industries/
│   │   └── [slug].vue
│   ├── technology.vue
│   ├── knowledge/
│   │   ├── index.vue
│   │   ├── faq.vue
│   │   └── glossary.vue
│   ├── investors.vue
│   ├── company.vue
│   ├── contact.vue
│   └── legal/
│       ├── privacy.vue
│       └── terms.vue
├── lib/
│   └── experience/
│       ├── MotionDirector.ts
│       ├── ScrollController.ts
│       ├── MasterTimeline.ts
│       ├── SceneManager.ts
│       ├── CameraController.ts
│       ├── ParticleEngine.ts
│       ├── LightingLayer.ts
│       ├── TypographyDirector.ts
│       ├── ProductDirector.ts
│       └── pacing.ts
├── stores/
│   └── experience.ts
├── types/
│   └── experience.ts
└── utils/
    ├── products.ts
    ├── industries.ts
    └── seo.ts

public/
├── fonts/
├── models/
└── textures/

docs/
├── 000_PROJECT_OVERVIEW.md
├── 001_COMPANY_OS.md
├── 002_CATEGORY_OS.md
├── 003_INFORMATION_ARCHITECTURE.md
├── 004_CONTENT_OS.md
├── 005_UX_OS.md
├── 006_EXPERIENCE_OS.md
├── 007_MOTION_OS.md
├── 008_ENGINEERING_OS.md
├── 00_COMPANY/
├── 01_BRAND/
├── 02_CATEGORY/
├── 03_KNOWLEDGE/
├── 04_EXPERIENCE/
├── 05_ENGINEERING/
└── 06_EXECUTION/
```

---

## 03 — Coding Standards

### TypeScript

- Strict mode enabled. `noImplicitAny: true`. `strictNullChecks: true`.
- All functions have explicit return types. No inferred return types.
- All props have TypeScript interfaces. No inline prop types.
- All data files (`products.ts`, `industries.ts`) export typed constants.

### Naming

| Element | Convention | Example |
|---------|-----------|---------|
| Components | PascalCase | `Scene01.vue`, `AppHeader.vue` |
| Composables | camelCase with `use` prefix | `useScrollProgress.ts` |
| Libraries | PascalCase | `MotionDirector.ts` |
| Utils | camelCase | `products.ts` |
| Types | PascalCase | `ExperienceState.ts` |
| Stores | camelCase | `experience.ts` |
| Files | PascalCase for components, camelCase for logic | `Scene01.vue`, `scrollController.ts` |
| CSS classes | Tailwind utility classes only | No custom CSS classes |
| Variables | camelCase | `scrollProgress` |
| Constants | UPPER_SNAKE_CASE | `MAX_PARTICLES` |

### Imports

Order:
1. Vue/Nuxt imports
2. Third-party libraries (gsap, three, lenis)
3. Internal lib (lib/experience/)
4. Components
5. Utils
6. Types

No barrel imports (`index.ts`). Import from the specific file.

### Components

- Single root element per component (Vue 3 standard)
- No component exceeds 300 lines
- No component owns GSAP, ScrollTrigger, or camera
- Components receive animation state through props or channels
- All text content in `<template>`, not generated in `<script>`

### CSS

- Tailwind CSS v4 utility classes only
- No custom CSS files
- No scoped styles (use utility classes)
- Design tokens as CSS variables in tailwind config
- No inline styles

### Error Handling

- All Three.js operations wrapped in try/catch
- GSAP timeline creation wrapped in try/catch
- Scroll trigger registration wrapped in try/catch
- Errors logged to console in development, silently handled in production
- No error message displayed to user (fail gracefully)

---

## 04 — Performance Budgets

### Lighthouse

| Metric | Target | Hard Limit |
|--------|--------|------------|
| Performance | 95+ | 90 |
| Accessibility | 100 | 95 |
| Best Practices | 100 | 95 |
| SEO | 100 | 95 |

### Core Web Vitals

| Metric | Target | Hard Limit |
|--------|--------|------------|
| Largest Contentful Paint (LCP) | < 2.5s | < 3.5s |
| First Input Delay (FID) | < 50ms | < 100ms |
| Cumulative Layout Shift (CLS) | < 0.1 | < 0.25 |
| Interaction to Next Paint (INP) | < 200ms | < 300ms |

### Frame Rate

| State | Target | Hard Limit |
|-------|--------|------------|
| Idle (no scroll) | 60fps | 55fps |
| Scrolling | 60fps | 30fps |
| Scene transition | 60fps | 30fps |
| All particles active | 60fps | 24fps |

### Bundle Size

| Asset | Target | Hard Limit |
|-------|--------|------------|
| Initial JS (total) | < 200KB | < 350KB |
| Initial CSS | < 50KB | < 100KB |
| Three.js (dynamic import) | < 150KB | < 200KB |
| GSAP (dynamic import) | < 50KB | < 80KB |
| Total page weight | < 1MB | < 2MB |

### Memory

| State | Target | Hard Limit |
|-------|--------|------------|
| Idle | < 100MB | < 150MB |
| Scrolling with 3D | < 200MB | < 350MB |
| All scenes loaded | < 250MB | < 400MB |

### Asset Limits

| Asset | Limit |
|-------|-------|
| Three.js textures | 2048x2048 max |
| GSAP timeline tweens | 100 max per timeline (profile beyond) |
| Particles (total) | 10,000 max |
| Simultaneous 3D objects | 500 max |
| Draw calls | 200 max |
| Vertex count | 100,000 max |

---

## 05 — Testing Strategy

### Unit Tests

- Test all `lib/experience/` modules in isolation
- Mock GSAP, Three.js, and Lenis in unit tests
- Test `pacing.ts` token resolution
- Test `products.ts` and `industries.ts` data integrity
- Test `ScrollController` progress calculation
- Test `ParticleEngine` channel configuration

### Integration Tests

- Test scene transitions end-to-end
- Test scroll → ScrollController → MasterTimeline chain
- Test camera position changes across scene boundaries
- Test particle persistence across scene transitions
- Test lighting blend timing

### Visual Regression Tests

- Capture screenshots at each scene boundary
- Compare against baseline on PR
- Viewports: 1440x900 (desktop), 768x1024 (tablet), 375x812 (mobile)

### Performance Tests

- Lighthouse CI on every PR
- Frame rate measurement during scroll (60fps target)
- Memory leak detection (heap snapshot comparison)
- Bundle size comparison against baseline

### Test Commands

```
npm run test:unit         # Unit tests
npm run test:integration  # Integration tests
npm run test:visual       # Visual regression
npm run test:perf         # Performance benchmarks
npm run test:all          # All tests
```

---

## 06 — Deployment

### Environments

| Environment | URL | Branch | Build |
|-------------|-----|--------|-------|
| Development | localhost:3000 | local | `npm run dev` |
| Staging | staging.svara.com | `main` | `npm run generate` |
| Production | svara.com | `release/*` | `npm run generate` |

### Build Command

```
npm run generate
```

Outputs static site to `dist/`. Nuxt 4 static generation.

### Pre-deploy Checks

1. `npm run lint` — no errors
2. `npm run typecheck` — no errors  
3. `npm run test:all` — all tests pass
4. `npm run build` — build succeeds
5. Lighthouse CI — all metrics pass
6. Bundle size — within budget

### Deployment Process

1. PR merged to `main`
2. Staging build triggered automatically
3. Staging URL smoke-tested (manual)
4. Release branch created from `main`: `release/v<version>`
5. Production build triggered
6. Deploy to CDN
7. Smoke test production URL
8. Tag release in git: `v<version>`

### Rollback

- Previous build is always available on CDN
- Rollback: redeploy previous build
- Target: < 15 minutes from decision to rollback complete
- Database: no database (static site). Rollback is CDN URL revert.

---

## 07 — Monitoring

### Client-Side Monitoring

| Metric | Tool | Alert Threshold |
|--------|------|-----------------|
| LCP | Web Vitals API | > 3.5s |
| CLS | Web Vitals API | > 0.25 |
| INP | Web Vitals API | > 300ms |
| Frame rate | Custom `performance.now()` check | < 24fps for 5s |
| JS errors | `window.onerror` | Any error |
| Memory | `performance.memory` | > 350MB |

### Uptime Monitoring

- CDN uptime: 99.9% SLA
- DNS resolution: < 100ms
- SSL certificate: auto-renewed, 30-day expiry alert
- Monitoring provider: as configured

### Performance Alerts

- Lighthouse score drops below target → Slack alert
- Bundle size increases > 10% from baseline → Slack alert
- Frame rate drops below 24fps for > 5s → Slack alert
- New console errors in production → Slack alert

### Logging

- No server logs (static site)
- Client-side errors logged to monitoring provider
- No PII logged
- Development: verbose console logs
- Production: errors only, no debug logging

---

## 08 — The Engineering Rule

**Code without an approved specification is waste.**

Every feature has a specification before it has code. Spec first. Approval second. Implementation third. This order is inviolable.

If the implementation disagrees with the spec, fix the implementation — not the spec.
