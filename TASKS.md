# SVARA Web — Task Board

> Part 17: OpenCode tasks. One ticket at a time.

## Global Constraints

### Motion (Part 15)
- **Lenis** → smooth scroll
- **GSAP** → transitions / scroll-driven reveals
- **Framer Motion / `motion-v`** → micro-interactions (Vue port already present)
- **Three.js / TresJS** → interactive visualizations only
- **Rule:** motion only where necessary; respect `prefers-reduced-motion`

### Performance (Part 16)
- Lighthouse 95+
- CLS < 0.05
- 60 FPS
- Images: AVIF/WebP via `@nuxt/image`
- Fonts: self-hosted (already using `@fontsource/ibm-plex-sans`, `@fontsource/jetbrains-mono`)
- Everything lazy
- Desktop: 60 FPS
- Laptop: 45+ FPS
- Mobile: 30+ FPS
- Keep geometry instanced
- Avoid thousands of unique meshes; prefer `InstancedMesh`

### Visual Language (Helios)
- **Canvas:** engineered white `#F8FAFC`, not empty white
- **Palette:** ultra-light wireframes `#D7E9FF`, structural nodes `#76A8D6`, deep navy `#1D2E6D`
- **Background:** 7-layer architectural lattice (grid, hexes, pathways, particles, cursor glow)
- **Typography:** IBM Plex Sans primary, JetBrains Mono for system readouts, large condensed headings, tight tracking, massive scale
- **Feel:** Enterprise Architecture Blueprint, not AI startup landing page

## Definition of Done (Part 18)

Launch succeeds when:

- ✅ Mobile works
- ✅ Desktop works
- ✅ Lighthouse >95
- ✅ Core Web Vitals pass
- ✅ Responsive
- ✅ Enterprise story is clear
- ✅ SEO metadata complete
- ✅ Structured data present
- ✅ Contact works

---

## Tickets

| ID | Task | Status | Scope | Acceptance Criteria |
|----|------|--------|-------|---------------------|
| 000 | **Experience Zero** | ✅ DONE | 0–3s: intelligence emerging from a white canvas | Tiny pulses → connections → assembled tagline; reduced-motion skip; no CLS |
| 001 | **Navigation** | CANCELLED | Header, nav links, mobile menu, logo, CTA | Replaced by Experience Zero; revisit if needed |
| 002 | **Reality** | ✅ DONE | 3–8s: the shared condition every buyer recognises | No product/company mention; pure statement; no CTA |
| 003 | **Fragmentation** | ✅ DONE | 3–8s: disconnected systems diagram | Visual fracture; matches existing problem diagram |
| 004 | **Intelligence** | ✅ DONE | 8–15s: the loop as the answer | Closed-loop diagram; contrast with fragmentation |
| 005 | **SVARA** | ✅ DONE | After 15s: the answer gets a name | Bold company reveal; clear mission statement |
| 006 | **Helios Visual System** | ✅ DONE | Background architecture + typography + palette | 7-layer canvas background; IBM Plex Sans + JetBrains Mono; new color tokens |
| 007 | **Helios Sprint 2 — Architectural Experience** | ✅ DONE | Reusable background intelligence system, unified typography, motion language, scene transitions | Configurable `BackgroundArchitecture`; engineered motion tokens; GSAP-powered `v-reveal` with enter/exit; `SceneSnap` for intentional scene boundaries |
| 008 | **Helios Sprint 2 — BIS Refinement** | ✅ DONE | Background Intelligence System aligned to enterprise intelligence topology | Modular hex/cube cells; structured data topology; data tokens on pathways; blueprint grid with labels; no random particles/blobs/glowing orbs |
| 009 | **Helios Visual Language v2** | ✅ DONE | Millions-of-modules background, updated color system, max 15% opacity | 90–280 tiny modules (hex/square/triangle/cross/dot); wireframe/solid/transparent/blueprint styles; slow assembly motion; new palette `#F8FBFF` / `#D7E9FF` / `#76A8D6` / `#5D8FBE` / `#1D2E6D` |
| 010 | **Helios Motion Rules** | ✅ DONE | Background motion follows intent, breathing speed, 7-layer architecture | Structural hex frameworks; 220–720 micro hex modules with assemble/connect/branch/merge/dissolve/rebuild lifecycle; data streams; occasional pulses; depth fog; subtle cursor reaction |
| 011 | **Helios Scroll Behaviour** | ✅ DONE | Background reorganizes on scroll instead of only moving upward | Scroll progress drives dynamic module targets; topology fades in/out as connections reform; structural hex frameworks shift with scroll; parallax reduced to emphasize reorganization |
| 012 | **Helios Scene Integration** | ✅ DONE | One continuous background that never resets, only evolves | Background uses accumulated `evolution` value; advances with time + scroll distance; topology cycles continuously; same instance in `app.vue` persists across route changes |
| 007 | **Platform** | TODO | Five capability cards | Links to capabilities; responsive grid; fits new visual language |
| 008 | **Products** | TODO | Nine-product ecosystem grid | Lazy-loaded; links to products; fits new visual language |
| 009 | **Industries** | TODO | Twelve vertical cards | Lazy-loaded; links to industries; fits new visual language |
| 010 | **Trust** | TODO | Four trust pillars | Text-first; credible signals; fits new visual language |
| 011 | **SEO** | TODO | Meta, schema, Open Graph, sitemap | `@nuxtjs/seo` tuned; page-level meta per route |
| 012 | **Performance** | TODO | Image module, lazy loading, font/CDN tuning | `@nuxt/image` installed; Lighthouse 95+; CLS < 0.05 |
| 013 | **Accessibility** | TODO | A11y audit, focus states, ARIA, color contrast | Keyboard navigable; screen-reader friendly; WCAG 2.1 AA target |

---

## Current Pick

Last completed: **Tasks 000–012 — Experience Zero, narrative homepage, Helios visual system, architectural experience layer, BIS enterprise topology, visual language v2, motion rules, scroll behaviour, and scene integration**

Next task to work on: **???** (recommend Task 013 — Platform, since the narrative and visual foundation is set)

Update the "Current Pick" line when starting a ticket, and mark status as `IN_PROGRESS` → `DONE`.
