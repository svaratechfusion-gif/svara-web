# COMPONENT CATALOG

Not code. Behavior.

Every component in the SVARA system, defined by purpose, states, dependencies, and acceptance criteria.

---

## AI Core

**Purpose:** Represent enterprise intelligence as a persistent 3D particle world.
**Type:** System (lib/experience/)

| State | Description | Trigger |
|-------|-------------|---------|
| Dormant | Particles inactive. World dark. | Cold load, before boot sequence |
| Emerging | Particles begin assembling. Data appearing. | Boot sequence start |
| Active | Particles connected. Neural structures visible. | Scene 3 onward |
| Fragmented | Particles disconnected. Silos forming. | Scene 4 (Collapse) |
| Connected | Particles re-linked across all channels. | Scene 5 (Reconnect) |
| Scaling | Particle grid expanding to full viewport. | Scene 8 (Scale) |
| Restored | World settled. Particles slow. Final state. | Scene 9 (Ending) |

**Dependencies:** `CameraController`, `ParticleEngine`, `LightingLayer`, `MotionDirector`
**Acceptance:** Transitions between states are driven by scroll progress. No state skips. Each state persists for its full scene duration.

---

## ParticleEngine

**Purpose:** Simulation of data as particles. Every behavior is a named channel.
**Type:** System (lib/experience/ParticleEngine.ts)

| Channel | Meaning | Writer | Reader |
|---------|---------|--------|--------|
| `particleBirth` | Data appearing | SceneDirector birth beat | Three.js render loop |
| `particleConnect` | Relationships forming | SceneDirector emergence beat | Three.js render loop |
| `particleDisconnect` | Silos breaking | SceneDirector collapse beat | Three.js render loop |
| `particleReconnect` | SVARA unifying | SceneDirector reconnect beat | Three.js render loop |
| `scrollEnergy` | Urgency/discovery | ScrollController velocity | Three.js render loop |
| `productEngage` | Capability clusters | ProductDirector | Three.js render loop |
| `industryExpand` | Landscape formation | SceneDirector industry beat | Three.js render loop |

**Dependencies:** `GSAP` (writers), `Three.js` (reader)
**Acceptance:** GSAP never touches Three.js objects. GSAP writes scalars. Render loop reads scalars. Channel values are 0-1.

---

## CameraController

**Purpose:** Manage all camera position, rotation, FOV, and transitions.
**Type:** System (lib/experience/CameraController.ts)

| State | Shot | Position | FOV |
|-------|------|----------|-----|
| Static | Fixed | Origin | 45° |
| Pushing | Slow forward tracking | Moves +Z | 45° |
| Orbiting | Circular around core | Rotates around Y | 45° |
| PullingBack | Reverse tracking | Moves -Z | 45° → 60° |
| Rising | Ascending | Moves +Y | 45° |
| Settling | Returning to static | Returns to origin | 45° |

**Dependencies:** `Three.js`, `MotionDirector`
**Acceptance:** No code outside `CameraController` reads or writes `camera.position`, `camera.rotation`, or `camera.fov`.

---

## TypographyDirector

**Purpose:** Generate text from particles. Transition through 5 states.
**Type:** System (lib/experience/TypographyDirector.ts)

| State | Description | Visual |
|-------|-------------|--------|
| Dormant | No text visible | Particles only |
| Generated | Particles assemble into recognizable text | Text emerges from particle field |
| Focused | Text fully solid, primary message | Full opacity, hero scale |
| Supporting | Text present but secondary | Reduced scale, muted |
| Dissolved | Text returns to particles | Characters break into particles |

**Dependencies:** `ParticleEngine`, `CameraController`
**Acceptance:** No fade, no slide, no bounce. Text enters and exits exclusively through particle assembly/disassembly. Transitions are state-driven, not time-driven.

---

## LightingLayer

**Purpose:** Lighting intensity across the experience arc.
**Type:** System (lib/experience/LightingLayer.ts)

| Scene | Intensity | Color | Notes |
|-------|-----------|-------|-------|
| Birth | 10% | Neutral | Darkest after Collapse |
| Emergence | 25% | Warm | Growing |
| Intelligence | 45% | Neutral | Core formation |
| Collapse | 5% | Cool | Darkest point. Darker than Birth. |
| Reconnect | 80% | Warm | Peak brightness |
| Products | 65% | Neutral | Settled |
| Industries | 50% | Warm | Landscape |
| Scale | 40% | Cool | Wide view |
| Ending | 30% | Neutral | Resolve |

**Dependencies:** `Three.js`, `MotionDirector`
**Acceptance:** Lighting is driven by scene progress. Transition between intensities is smooth (GSAP tween, 2s duration). Collapse is measurably darker than Birth (5% vs 10%).

---

## ContentSlot

**Purpose:** Single entry point for content on every page. Manages scroll intersection and consistent spacing.
**Type:** UI component (app/components/ui/ContentSlot.vue)

| State | Description |
|-------|-------------|
| Hidden | Below viewport |
| Visible | In viewport, content revealed |
| Past | Scrolled past, content settled |

**Dependencies:** None (pure layout)
**Acceptance:** Provides max-width container (1280px). Consistent horizontal padding (32px). Consistent vertical padding (96px mobile, 128px desktop). No scroll logic in this component.

---

## PageHero

**Purpose:** Consistent hero section for every content page.
**Type:** UI component (app/components/ui/PageHero.vue)

**Props:**
- `title: string` — Primary headline
- `description?: string` — Subtitle text
- `breadcrumb?: { label: string; to: string }` — Optional back link

**States:**
- Default: Hero visible, 60svh min-height, title + optional subtitle
- With breadcrumb: Back link above title

**Dependencies:** None
**Acceptance:** Hero renders at top of page. Min-height 60svh. No Three.js canvas. No animation. Pure content.

---

## SectionContent

**Purpose:** Consistent section layout with heading and content area.
**Type:** UI component (app/components/ui/SectionContent.vue)

**Props:**
- `heading?: string` — Optional section heading
- `headingTag?: "h2" | "h3"` — Heading level (default h2)
- `wide?: boolean` — Widen content max-width (default false = 672px)
- `class?: string` — Additional classes

**Dependencies:** `ContentSlot`
**Acceptance:** Wraps content in `ContentSlot`. Heading renders at `.text-h2` or `.text-h3`. Content area max-width 672px (standard) or 896px (wide). No animation.

---

## AppHeader

**Purpose:** Global navigation. Context-aware (homepage vs subpages).
**Type:** Layout component (app/components/layout/AppHeader.vue)

| State | Homepage | Subpages |
|-------|----------|----------|
| Hidden | scrollY < 48vh | — |
| Visible | scrollY ≥ 48vh | Always visible from page load |
| Scrolled | scrollY > 40px (adds backdrop blur) | scrollY > 40px (adds backdrop blur) |

**Nav Items:** Platform, Products, Technology, Industries, Knowledge, Company

**Dependencies:** None
**Acceptance:** NuxtLink-based navigation. Transition: opacity + translateY, 500ms. Reduced motion: opacity only, no transform. On homepage, hidden for first 48% of viewport. On subpages, visible from page load.

---

## AppFooter

**Purpose:** Minimal global footer. One closing statement. Not a link farm.
**Type:** Layout component (app/components/layout/AppFooter.vue)

**Content:** SVARA logo, tagline, copyright, Privacy Policy + Terms links.

**Dependencies:** None
**Acceptance:** Renders on all pages. Minimal design. No navigation. Copyright year auto-updates.

---

## PageLoader

**Purpose:** Cold boot loading sequence. Not a spinner — the reveal is the experience.
**Type:** Layout component (app/components/layout/PageLoader.vue)

| State | Description |
|-------|-------------|
| Loading | Boot sequence executing |
| Complete | Sets `usePageReveal()` to true, triggers content reveal |

**Dependencies:** `usePageReveal` composable
**Acceptance:** Shows on cold load only. Skipped on client-side navigation. On complete, `app.vue` transitions scale(0.97) → scale(1) over 700ms. `transformDone` removes transform after transition (prevents `position: fixed` breakage).

---

## SceneBirth

**Purpose:** Scene 01 — Enterprise Reality. Particles assemble. No text. No brand.
**Type:** Scene component (app/components/scenes/SceneBirth.vue)

**Registers:** Scene range with `useSceneRange("birth")`
**Height:** 100svh (5s + 0s hold)

**Dependencies:** `IntelligenceWorld`, `ParticleEngine`, `useSceneRange`
**Acceptance:** No visible text. No brand elements. Camera static. Particles assembling. Exits at 12% scroll.

---

## SceneEmergence

**Purpose:** Scene 02 — Data patterns emerging. Slow push camera.
**Type:** Scene component (app/components/scenes/SceneEmergence.vue)

**Registers:** Scene range with `useSceneRange("emergence")`
**Height:** 170svh (5s + 3.5s hold)

**Dependencies:** `IntelligenceWorld`, `ParticleEngine`, `CameraController`, `useSceneRange`
**Acceptance:** Camera slow push active. Particles forming connecting patterns. No text. Exits at 24% scroll.

---

## SceneIntelligence

**Purpose:** Scene 03 — Core formation. First typography. Camera orbit.
**Type:** Scene component (app/components/scenes/SceneIntelligence.vue)

**Registers:** Scene range with `useSceneRange("intelligence")`
**Height:** 230svh (8s + 3.5s hold)

**Dependencies:** `IntelligenceWorld`, `ParticleEngine`, `CameraController`, `TypographyDirector`, `useSceneRange`
**Acceptance:** Camera orbits core. Particles form neural-like structures. Typography: "Data becomes intelligence." Text state: Dormant → Generated → Focused. No fade/slide/bounce. Exits at 36% scroll.

---

## SceneData

**Purpose:** Scene 04 — Collapse. System fragments. Text dissolves. Darkest lighting.
**Type:** Scene component (app/components/scenes/SceneData.vue)

**Registers:** Scene range with `useSceneRange("data")`
**Height:** 270svh (10s + 3.5s hold)

**Dependencies:** `IntelligenceWorld`, `ParticleEngine`, `CameraController`, `TypographyDirector`, `LightingLayer`, `useSceneRange`
**Acceptance:** Camera pull back. Particles disconnect. Typography dissolves (Focused → Dissolved). Lighting drops to 5%. This is the darkest point of the experience. Exits at 48% scroll.

---

## SceneSvara

**Purpose:** Scene 05 — SVARA reconnects. Peak lighting. Brand appears. Nav unlocks.
**Type:** Scene component (app/components/scenes/SceneSvara.vue)

**Registers:** Scene range with `useSceneRange("svara")`
**Height:** 310svh (12s + 3.5s hold)

**Dependencies:** `IntelligenceWorld`, `ParticleEngine`, `CameraController`, `TypographyDirector`, `LightingLayer`, `AppHeader`, `useSceneRange`
**Acceptance:** Camera static. Particles reconnect. Lighting rises to 80% (peak). SVARA brand mark appears. AppHeader becomes visible. Typography: "SVARA reconnects." Exits at 60% scroll.

---

## SceneProducts

**Purpose:** Scene 06 — Products as capability clusters. Camera fly-through.
**Type:** Scene component (app/components/scenes/SceneProducts.vue)

**Registers:** Scene range with `useSceneRange("products")`
**Height:** 470svh (20s + 3.5s hold)

**Dependencies:** `IntelligenceWorld`, `ProductDirector`, `CameraController`, `ParticleEngine`, `TypographyDirector`, `useSceneRange`
**Acceptance:** Camera fly-through between clusters. Products grouped as: Sense, Think, Simulate, Operate, Grow. No feature-level detail. Product names float. Particles orbit each cluster. Exits at 72% scroll.

---

## SceneIndustries

**Purpose:** Scene 07 — Industries as landscapes. Camera rise.
**Type:** Scene component (app/components/scenes/SceneIndustries.vue)

**Registers:** Scene range with `useSceneRange("industries")`
**Height:** 470svh (20s + 3.5s hold)

**Dependencies:** `IntelligenceWorld`, `CameraController`, `ParticleEngine`, `TypographyDirector`, `useSceneRange`
**Acceptance:** Camera rises. Landscape formations. Industry names as terrain labels. Exits at 84% scroll.

---

## SceneScale

**Purpose:** Scene 08 — Enterprise scale reveal. Full pull back.
**Type:** Scene component (app/components/scenes/SceneScale.vue)

**Registers:** Scene range with `useSceneRange("scale")`
**Height:** 370svh (15s + 3.5s hold)

**Dependencies:** `IntelligenceWorld`, `CameraController`, `ParticleEngine`, `useSceneRange`
**Acceptance:** Camera full pull back. Unified particle grid spans viewport. No text explaining scale. Scale is felt visually. Exits at 92% scroll.

---

## SceneEnding

**Purpose:** Scene 09 — Invitation. Final headline resolves. CTA.
**Type:** Scene component (app/components/scenes/SceneEnding.vue)

**Registers:** Scene range with `useSceneRange("ending")`
**Height:** 160svh (3s + 5s hold)

**Dependencies:** `IntelligenceWorld`, `TypographyDirector`, `ParticleEngine`, `useSceneRange`
**Acceptance:** Final headline resolves from particles: "Engineering The Intelligence Layer Of Tomorrow." CTA functional. World settles (particles slow). 100svh silence tail after scene. Footer renders below tail.
