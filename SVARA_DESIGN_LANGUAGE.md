# SVARA Design Language 1.0

## DNA 01 — Philosophy

> **SVARA exists visually to make Enterprise Intelligence understandable in ≤ 45 seconds.**
>
> Every pixel, frame, word, object, interaction, second serves one question:
>
> **Does this help a technical buyer understand Enterprise Intelligence better?**
>
> If yes → keep. If no → delete.

---

### The Three Laws

| Law | Statement | Test |
|-----|-----------|------|
| **1. Intelligence Over Decoration** | No visual element exists for beauty. Only for explanation. | Hover it — does it teach? Scroll it — does it reveal? Click it — does it transform? |
| **2. Density Is Respect** | Bloomberg density honors the operator's expertise. Apple restraint honors their attention. Both at once. | Viewport contains exactly 4 elements: Headline → Visual → Explanation → Continue. |
| **3. Terminal Honesty** | Monospace for data. Hairline borders for structure. No shadows pretending depth. No gradients pretending meaning. | Inspect element — is every color, type, space, motion justified by intelligence? |

---

### The North Star Metric

> **Time to Understanding** — seconds until a technical buyer says: *"I understand what SVARA does and why it matters."*

**Target: ≤ 45 seconds.**

Not time on page. Not scroll depth. Not bounce rate.

**Understanding.**

---

### The Consequence

> We would rather ship less.
>
> We would rather ship later.
>
> We would rather ship nothing.
>
> Than ship something that doesn't help someone understand Enterprise Intelligence better.

---

## DNA 02 — Spatial Language

> **Not layout. Space.**
>
> How does intelligence occupy space?

---

### The Z-Axis of Intelligence

| Depth | Layer | Content | Visual Weight | Interaction |
|-------|-------|---------|---------------|-------------|
| **Z: -100 to -10** | **Substrate** | Architectural grid, dormant volumetric cones | 0% opacity (felt, not seen) | Fixed — never moves |
| **Z: -10 to 0** | **Signal Field** | Flowing data streams, latent prediction corridors | 5–15% opacity | Subtle parallax (0.1× scroll) |
| **Z: 0** | **Intelligence Plane** | Loop diagram, topology maps, capability nodes | 100% opacity | Primary interaction plane |
| **Z: +10 to +100** | **Evidence Layer** | Spec tables, certifications, ROI calculators | 100% opacity | Scroll-revealed, sticky |
| **Z: +100+** | **Horizon** | Deployment tiers, reference architectures | 50% opacity | Pull-back camera only |

**Rule**: Intelligence lives at Z=0. Everything else supports it.

---

### Distance = Cognitive Load

| Distance | Meaning | Max Elements |
|----------|---------|--------------|
| **Intimate (0–200px)** | One concept, fully resolved | 1 visual + 1 explanation |
| **Personal (200–600px)** | Related concepts, comparable | 2–3 capability nodes |
| **Social (600–1200px)** | Chapter scope, full topology | 5 loop nodes + topology |
| **Public (1200px+)** | Enterprise scope, deployment | Reference architecture |

**Rule**: If it doesn't fit at its distance, the concept is wrong.

---

### Scale = Certainty

| Scale | Certainty | Visual Treatment |
|-------|-----------|------------------|
| **1:1 (Hero)** | Absolute — this IS the answer | 60vh, centered, loop pulse |
| **1:2 (Section)** | High — one capability proven | 40vh, expanded detail |
| **1:4 (Detail)** | Measured — specs, metrics | Table, sparkline, badge |
| **1:8 (Reference)** | Projected — ROI, deployment | Calculator, tier cards |

**Rule**: Larger = more certain. Never enlarge uncertainty.

---

### Perspective = Camera = Understanding

| Camera Move | Spatial Meaning | When |
|-------------|-----------------|------|
| **Hold (Z: fixed)** | "This is true." | Loop center, KPI strip, certifications |
| **Push (Z: -10 → 0)** | "Look closer." | Node expand, topology drill, product detail |
| **Orbit (Y-rot: ±15°)** | "See the relationship." | Loop cycle, topology neighbors, capability flow |
| **Fly Through (Z: 0 → -50)** | "Enter the signal." | Signal path trace, data flow, prediction corridor |
| **Pull Back (Z: 0 → +100)** | "See the system." | Chapter exit, deployment tier, enterprise map |

**No other camera moves exist.**

---

### The Grid — Universal Coordinate System

| Property | Value | Rule |
|----------|-------|------|
| **Base unit** | 4px | All coordinates = n × 4px |
| **Major grid** | 32px | Aligns all panels, cards, diagrams |
| **Macro grid** | 128px | Aligns chapter sections, hero zones |
| **Z-steps** | 100px | Layer separation (see Z-axis table) |
| **Camera FOV** | 45° | Fixed — no zoom, only dolly |

**Every object, panel, diagram, text block snaps to this grid.**

---

### Foreground / Background Contract

| Foreground (Intelligence) | Background (Substrate) |
|---------------------------|------------------------|
| **Active** — animates, responds, reveals | **Passive** — grid breathes (0.5Hz micro-pulse) |
| **Opaque** — 100% contrast | **Transparent** — 2–4% opacity only |
| **Sharp** — hairline borders, crisp type | **Soft** — volumetric cones, no edges |
| **Moves on click** — transforms state | **Moves on scroll** — 0.1× parallax only |
| **Never more than 4 elements** | **Never competes** — felt, not seen |

---

### Spatial Audit Checklist

- [ ] Every element has declared Z-depth (Substrate/Signal/Intelligence/Evidence/Horizon)
- [ ] Distance matches cognitive load (Intimate → 1 concept, Public → reference)
- [ ] Scale matches certainty (Hero = absolute, Reference = projected)
- [ ] Camera moves only from 5-move vocabulary (Hold/Push/Orbit/Fly Through/Pull Back)
- [ ] All coordinates snap to 4px base / 32px major / 128px macro grid
- [ ] Foreground = active/opaque/sharp/moving/≤4 elements
- [ ] Background = passive/transparent/soft/subtle/never competes
- [ ] No element exists at wrong Z-depth for its meaning

---

## DNA 03 — Visual Language

> **Your architecture. Topology. Infrastructure. Blueprints. Spatial systems.**
>
> **Everything graphical belongs here.**

---

### The Visual Vocabulary — Six Primitives

| Primitive | Definition | Intelligence Meaning | Never |
|-----------|------------|---------------------|-------|
| **Node** | 8px circle, 2px stroke, intelligence blue fill | Processing unit: sensor, model, actuator, gateway | Never decorative; always = compute |
| **Edge** | 1px dashed line, intelligence blue, animated flow | Signal path: observation, inference, command | Never solid unless confirmed live |
| **Volume** | Rounded rect, frosted glass, 1px border | Intelligence boundary: capability, deployment, security zone | Never opaque; always shows depth |
| **Vector** | Arrowhead + bezier curve, intelligence blue | Transformation: raw → structured → predicted → action | Never straight unless latency < 1ms |
| **Field** | Subtle gradient mesh, intelligence blue at 3% | Influence area: prediction horizon, anomaly radius | Never decorative; always = probability |
| **Grid** | 32px lines, structure at 12%, major at 24% | Coordinate system: reference frame, latency budget | Never decorative; always = measurement |

**Rule**: Every graphical element IS one of these six. No exceptions.

---

### Topology Types — One Per Concept

| Topology | Structure | Intelligence Concept | Visual Signature |
|----------|-----------|---------------------|------------------|
| **Loop** | 5-node cycle, center = IMPROVE | Intelligence cycle: Observe→Understand→Predict→Coordinate→Improve | Center pulse, clockwise flow |
| **Tree** | Root → branches → leaves | Capability hierarchy: Platform → Capability → Product → Feature | Root at top, gravity down |
| **Mesh** | Fully connected nodes | Signal fabric: every sensor talks to every model | Uniform density, no center |
| **Flow** | Linear pipeline, stations | Data pipeline: ingest → transform → enrich → serve | Left→right, stations as volumes |
| **Star** | Central hub, radial spokes | Coordination: one decision → many actions | Hub pulses, spokes animate sequentially |
| **Field** | Gradient mesh + vectors | Prediction horizon: probability density over spacetime | Blue mesh, vectors show gradient |

**Rule**: One topology per concept. Never mix.

---

### Blueprints — The Specification Style

| Blueprint Type | Purpose | Visual Language |
|----------------|---------|-----------------|
| **Schematic** | How intelligence connects | Nodes + edges only, no volumes, labels = technical specs |
| **Floorplan** | Where intelligence deploys | Volumes + grid, labels = deployment tiers, latency zones |
| **Circuit** | How signal transforms | Vectors + stations, labels = transforms, latencies, protocols |
| **Map** | Where intelligence creates value | Field + nodes, labels = industries, ROI, signal density |
| **Section** | How intelligence scales | Stacked volumes, labels = 3-node / 12-node / 50-node tiers |

**Rule**: Every blueprint = one topology type + one blueprint type. No hybrids.

---

### Visual Grammar — Zero Exceptions

| Rule | Enforcement |
|------|-------------|
| **Only intelligence blue** (`#0066cc` / `#4da6ff`) on active intelligence | Lint: any other color on node/edge/vector/field = error |
| **Only structure** (`#0a0a0a` / `#e8e8e8`) on passive elements | Lint: any blue on grid/label/border = error |
| **Only frosted glass** (`rgba(255,255,255,0.74)` + blur) for volumes | CSS: `.volume { backdrop-filter: blur(24px); background: rgba(255,255,255,0.74); }` |
| **Only 1px hairlines** for edges, grids, borders | CSS: `border-width: 1px` only; no 2px+ |
| **Only 6px radius** for volumes, 999px for tags | CSS: `border-radius: var(--panel-radius)` / `999px` |
| **Only 8px nodes**, 4px edge stroke, 12px vector heads | Design tokens enforced in CI |
| **No shadows, no glows, no blurs** (except volume blur) | Lint: `box-shadow`, `filter: blur`, `drop-shadow` = error |
| **No gradients** (except 3% field mesh) | Lint: `linear-gradient`, `radial-gradient` = error |

---

### 2D ↔ 3D Consistency

| 2D (CSS/SVG) | 3D (WebGL) | Consistency Rule |
|--------------|------------|------------------|
| Node = 8px circle | Node = 0.3m sphere | Same intelligence blue, same pulse behavior |
| Edge = 1px dashed | Edge = 0.02m tube | Same flow animation, same intelligence blue |
| Volume = frosted rect | Volume = 1m³ glass cube | Same frost, same border, same intelligence boundary |
| Vector = bezier arrow | Vector = particle stream | Same path, same intelligence blue |
| Field = 3% mesh | Field = volumetric fog | Same probability meaning, same blue |
| Grid = 32px lines | Grid = 1m lines | Same structure color, same 12%/24% opacity |

**Rule**: 2D and 3D are the same visual language — different renderers only.

---

### Visual Audit Checklist

- [ ] Every graphical element is one of 6 primitives (Node/Edge/Volume/Vector/Field/Grid)
- [ ] Every diagram uses exactly one topology type (Loop/Tree/Mesh/Flow/Star/Field)
- [ ] Every blueprint uses exactly one blueprint type (Schematic/Floorplan/Circuit/Map/Section)
- [ ] Only intelligence blue on active intelligence; only structure on passive
- [ ] Only frosted glass for volumes; only 1px hairlines; only 6px/999px radius
- [ ] No shadows, glows, blurs, gradients (except 3% field mesh)
- [ ] 2D and 3D render the same visual language
- [ ] Every element explains an enterprise concept — zero decoration

---

## DNA 04 — Material Language

> **Everything physical.**
>
> No fake materials. No CSS tricks pretending to be substance.
>
> Six materials. One universe.

---

### The Six Materials

| Material | Token | Physical Properties | Intelligence Meaning | 2D Render | 3D Shader |
|----------|-------|---------------------|---------------------|-----------|-----------|
| **Frosted Glass** | `--mat-glass` | Semi-transparent, blurred edges, subtle refraction, 2–8mm thickness | Intelligence layer — processing, not storage. The reasoning surface. | `backdrop-filter: blur(24px); background: rgba(255,255,255,0.74); border: 1px solid rgba(7,17,31,0.12);` | Transmission 0.9, roughness 0.05, thickness 4mm, IOR 1.5 |
| **Brushed Aluminium** | `--mat-aluminium` | Anisotropic highlights, cool tone, fine grain, 0.35 roughness | Infrastructure — durable, structural, deployed. The chassis. | `background: linear-gradient(90deg, #e8e8e8 0%, #d0d0d0 50%, #e8e8e8 100%); filter: url(#aluminium-noise);` | Anisotropic 0.8, roughness 0.35, clearcoat 0.1, rotation 15° |
| **Ceramic White** | `--mat-ceramic` | Matte, slight subsurface scatter, warm white (#fffef7), 0.15 roughness | Clean compute — training, inference, sterile. The silicon. | `background: #fffef7; box-shadow: inset 0 0 0 1px rgba(7,17,31,0.06);` | Subsurface 0.02, roughness 0.15, albedo #fffef7 |
| **Liquid Crystal** | `--mat-lc` | Birefringent shifts, polarized shimmer, phase transitions | Active reasoning — prediction, optimization. The thinking. | `background: linear-gradient(135deg, rgba(0,102,204,0.08) 0%, rgba(0,102,204,0.02) 100%);` | Thin-film interference, polarization rotation, 4Hz shimmer |
| **Blue Volumetric Light** | `--mat-volumetric` | Tyndall scattering, coherent beams, 460–480nm peak | Signal flow — data in motion, intelligence propagating. | `filter: drop-shadow(0 0 24px rgba(0,102,204,0.15));` | Mie scattering, density 0.08, cone falloff, 460–480nm |
| **Graphite** | `--mat-graphite` | Matte dark (#1a1a2e), subtle sheen, conductive, 0.8 roughness | Edge — rugged, air-gapped, secure. The boundary. | `background: #1a1a2e; border: 1px solid rgba(255,255,255,0.06);` | Roughness 0.8, metallic 0.2, albedo #1a1a2e |

---

### Material Rules

| Rule | Enforcement |
|------|-------------|
| **One material per object** | Lint: no multi-material components |
| **Intelligence = Glass + LC + Volumetric** | Only these three on active reasoning surfaces |
| **Infrastructure = Aluminium + Ceramic** | Only these on deployed/chassis elements |
| **Edge = Graphite** | Only on air-gapped, secure, boundary elements |
| **No material mixing** | A panel is ONE material. A node is ONE material. |
| **Dark mode = same materials, adjusted albedo** | No new materials in dark mode |

---

### Reflection & Transparency Physics

| Property | Glass | Aluminium | Ceramic | LC | Volumetric | Graphite |
|----------|-------|-----------|---------|-----|------------|----------|
| **Transmission** | 0.85–0.95 | 0 | 0 | 0.05 | N/A | 0 |
| **Reflection** | 0.05 (Fresnel) | 0.4 (aniso) | 0.02 | 0.1 (polarized) | N/A | 0.1 |
| **Roughness** | 0.05 | 0.35 (aniso) | 0.15 | 0.01 | N/A | 0.8 |
| **IOR** | 1.5 | 1.5 (coating) | 1.55 | 1.5–1.7 (birefringent) | N/A | 2.0 |
| **Subsurface** | 0 | 0 | 0.02 | 0 | Volumetric | 0 |

**Implementation**: Single PBR shader with material ID uniform. CSS fallback per material.

---

### Material Audit Checklist

- [ ] Only 6 materials used in entire codebase
- [ ] Every 3D object has exactly one material ID
- [ ] Intelligence surfaces = Glass + LC + Volumetric only
- [ ] Infrastructure surfaces = Aluminium + Ceramic only
- [ ] Edge surfaces = Graphite only
- [ ] No material mixing on single object
- [ ] Dark mode uses same 6 materials, adjusted albedo
- [ ] CSS fallback exists for every material
- [ ] No CSS-only "fake" materials (gradients pretending to be glass)
- [ ] Reflection/refraction physics consistent across 2D/3D

---

## DNA 05 — Lighting Language

> **This is HUGE. Nobody documents lighting. We will.**
>
> **Light becomes part of the brand.**

---

### The Lighting Philosophy

> **Light reveals intelligence. Shadow defines structure. Both are deliberate.**

| Principle | Rule |
|-----------|------|
| **Single HDRI** | One environment map only — `studio_neutral_4k.hdr` (cool white, 5600K) |
| **No point lights** | All illumination from HDRI + 2 rectangular area lights (key + fill) |
| **Key area** | 4m × 2m, 3000 lux, 45° elevation, slight blue bias (intelligence) |
| **Fill area** | 6m × 3m, 800 lux, opposite side, warm bias (structure) |
| **No bloom** | Volumetric light ONLY via Volumetric material — never post-process |
| **Shadows** | Contact-hardening PCSS, 64 samples, zero bias |
| **Exposure** | Fixed EV 12.5 — never auto-exposure |
| **Dark mode** | Same HDRI, EV 9.5, materials adjust albedo (not lighting) |

---

### The Five Light Types

| Light Type | Purpose | Visual Signature | Intelligence Meaning |
|------------|---------|------------------|---------------------|
| **Morning** (Key HDRI) | Base truth — the world as it is | Cool 5600K, soft directional from 45° | Reality observed — raw signals entering |
| **Ambient** (Fill HDRI) | Context — the space between | Hemisphere dome, 800 lux, warm bias | Infrastructure holding — the substrate |
| **Volumetric** (Blue cones) | Intelligence propagating | Tyndall scattering, 460-480nm peak, 0.5-2m falloff | Signal flow — data becoming reasoning |
| **Rim** (Material edge catch) | Boundary definition | Anisotropic highlight on Aluminium, 15° grazing | Edge of intelligence — deployment boundary |
| **Highlight** (Surface specular) | Active processing | Sharp 0.05 roughness catch on Glass/LC | Intelligence working — reasoning surface |

**Rule**: Every light type has ONE purpose. Never decorative.

---

### Lighting States — Intelligence Lifecycle

| State | Key | Fill | Volumetric | Rim | Highlight | Duration |
|-------|-----|------|------------|-----|-----------|----------|
| **Dormant** | 100% | 100% | 0% | 20% | 0% | ∞ (waiting) |
| **Ingesting** | 100% | 100% | 60% (pulse 2Hz) | 40% | 30% | Per signal |
| **Processing** | 100% | 100% | 40% (steady) | 60% | 80% (rippling 4Hz) | ∞ (active) |
| **Predicting** | 100% | 80% | 80% (cone forward) | 40% | 60% (forward bias) | Per horizon |
| **Coordinating** | 100% | 100% | 60% (star pattern) | 80% | 40% (sequential) | Per action |
| **Optimizing** | 100% | 100% | 40% (relaxing) | 100% | 20% (annealing) | 2s cycle |
| **Degraded** | 80% | 60% | 100% (amber pulse 1Hz) | 40% | 10% | ∞ (attention) |
| **Offline** | 30% | 20% | 0% | 0% | 0% | — (dead) |

**Physics**: All lighting via GPU compute shader. Zero CPU animation. 60fps guaranteed.

---

### 2D Lighting — CSS Consistency

| 3D Light | CSS Equivalent | Rule |
|----------|----------------|------|
| Morning (key) | `box-shadow: 0 4px 24px rgba(0,102,204,0.08)` | Only on active intelligence panels |
| Ambient (fill) | `background: var(--bg-panel)` | Base panel surface |
| Volumetric | `background: radial-gradient(ellipse at center, rgba(0,102,204,0.03) 0%, transparent 70%)` | Only on intelligence volumes |
| Rim | `border: 1px solid var(--border-strong)` | Only on Aluminium-framed objects |
| Highlight | `background: linear-gradient(135deg, var(--accent) 0%, transparent 100%)` | Only on active Glass/LC surfaces |

**Rule**: CSS lighting matches 3D lighting intent. No shadows, no glows, no fake depth.

---

### Dark Mode Lighting — Inverted, Not Different

| Property | Light | Dark | Rule |
|----------|-------|------|------|
| HDRI | Same | Same | Environment unchanged |
| Exposure | EV 12.5 | EV 9.5 | Materials darken, light stays |
| Key area | 3000 lux | 3000 lux | Same intensity |
| Fill area | 800 lux | 800 lux | Same intensity |
| Volumetric | Blue 460-480nm | Blue 460-480nm | Same wavelength |
| Rim catch | 20% intensity | 35% intensity | Brighter on dark |
| Highlight | 5% roughness | 3% roughness | Sharper on dark |

**Rule**: Light is truth. Materials adapt. HDRI never changes.

---

### Lighting Audit Checklist

- [ ] Single HDRI only (`studio_neutral_4k.hdr`)
- [ ] Zero point/spot/directional lights
- [ ] Key + fill area lights only (2 rect areas)
- [ ] No bloom, no SSAO, no SSR, no post-process
- [ ] Volumetric light ONLY via Volumetric material
- [ ] Fixed exposure EV 12.5 / 9.5 (dark)
- [ ] Contact-hardening PCSS shadows, 64 samples
- [ ] 5 light types only (Morning/Ambient/Volumetric/Rim/Highlight)
- [ ] 8 lighting states only (Dormant→Offline)
- [ ] CSS lighting matches 3D intent exactly
- [ ] Dark mode = same HDRI, adjusted exposure
- [ ] GPU compute only, 60fps sustained

---

## DNA 06 — Typography Language

> **Typography becomes architecture. Not decoration.**
>
> Display → Headline → Body → Technical. Four levels. No fifth.

---

### The Four Voices

| Voice | Font | Purpose | Scale | Tracking | Leading |
|-------|------|---------|-------|----------|---------|
| **Display** | `SF Pro Display` / `Inter Tight` | Hero, massive numbers, editorial headlines | 48–96px (clamped) | `-0.04em` | 0.92 |
| **Headline** | `SF Pro Text` / `Inter` | Section titles, card headers, scannable concepts | 14–40px | `-0.02em` | 1.1 |
| **Body** | `SF Pro Text` / `Inter` | Prose, descriptions, evidence, explanations | 12–16px | `0` | 1.5 |
| **Technical** | `JetBrains Mono` | All data, coordinates, telemetry, diagnostics, specs | 10–14px | `+0.02em` to `+0.1em` | 1.2–1.4 |

**No other fonts. Ever.**

---

### Display — Massive, Editorial, Compressed, Confident

| Token | Size | Weight | Tracking | Leading | Use |
|-------|------|--------|----------|---------|-----|
| `--display-hero` | `clamp(48px, 8vw, 96px)` | 700 | `-0.04em` | 0.92 | Page hero, single metric |
| `--display-large` | `clamp(32px, 5vw, 56px)` | 700 | `-0.03em` | 0.96 | Section hero |
| `--display-medium` | `clamp(24px, 3vw, 36px)` | 600 | `-0.02em` | 1.0 | Major stat callout |

**Rule**: One idea per display. Never multiple concepts.

---

### Headlines — One Idea, Never Multiple

| Token | Size | Weight | Tracking | Leading | Use |
|-------|------|--------|----------|---------|-----|
| `--headline-1` | `clamp(28px, 3.5vw, 40px)` | 600 | `-0.02em` | 1.1 | Page title |
| `--headline-2` | `clamp(22px, 2.5vw, 28px)` | 600 | `-0.015em` | 1.15 | Section title |
| `--headline-3` | `clamp(18px, 2vw, 22px)` | 600 | `-0.01em` | 1.2 | Card title, panel header |
| `--headline-4` | `14px` | 600 | `-0.01em` | 1.25 | Subsection, sidebar header |

**Rule**: If a headline needs two sentences, it's two headlines.

---

### Body — Prose, Descriptions, UI Labels

| Token | Size | Weight | Tracking | Leading | Use |
|-------|------|--------|----------|---------|-----|
| `--body-large` | `16px` | 400 | `0` | 1.55 | Lead paragraph |
| `--body` | `14px` | 400 | `0` | 1.5 | Standard prose |
| `--body-small` | `13px` | 400 | `0` | 1.5 | Dense UI text |
| `--body-xsmall` | `12px` | 400 | `0.01em` | 1.45 | Helper, hint |

---

### Technical Labels — JetBrains Mono

**Coordinates. Telemetry. Diagnostics. System Status.**

| Token | Size | Weight | Tracking | Leading | Use |
|-------|------|--------|----------|---------|-----|
| `--technical-large` | `14px` | 500 | `0.02em` | 1.4 | Prominent metric, KPI value |
| `--technical` | `13px` | 400 | `0.02em` | 1.4 | Standard data cell |
| `--technical-small` | `12px` | 400 | `0.03em` | 1.35 | Dense table, timestamp |
| `--technical-micro` | `11px` | 400 | `0.04em` | 1.3 | Metadata, badge, chip |
| `--technical-label` | `10px` | 500 | `0.08em` | 1.2 | Column header, axis label |
| `--technical-tag` | `10px` | 600 | `0.1em` | 1.1 | Tag, badge, status chip |

**All technical text**: `font-variant-numeric: tabular-nums tabular-slashed-zero`

---

### Information Hierarchy — Only Four Levels

```
HERO          →  Display (one metric, one idea)
    ↓
SECTION       →  Headline (one concept, scannable)
    ↓
CAPTION       →  Body (prose, explanation, evidence)
    ↓
METADATA      →  Technical (coordinates, timestamps, tags)
```

**No fifth level. No "sub-caption." No "fine print."**

If you need a fifth level, the architecture is wrong.

---

### Text Rule

> **Every sentence should survive if read alone.**

No fluff. No "designed to help you..." No "empowering enterprises to..."

**Write**: "2.3M signals/sec ingested. P99 latency 847ms. 99.97% uptime."

**Delete**: "Our platform is designed to help enterprises ingest massive amounts of data with incredibly low latency and industry-leading uptime."

---

### Density Variants

| Token | Dense | Standard | Comfortable |
|-------|-------|----------|-------------|
| `--display-hero` | `clamp(40px, 7vw, 72px)` | `clamp(48px, 8vw, 96px)` | `clamp(56px, 9vw, 112px)` |
| `--headline-1` | `clamp(24px, 3vw, 32px)` | `clamp(28px, 3.5vw, 40px)` | `clamp(32px, 4vw, 48px)` |
| `--body` | `13px` | `14px` | `15px` |
| `--technical` | `12px` | `13px` | `14px` |
| `--technical-label` | `9px` | `10px` | `11px` |

Controlled via `data-density="dense|standard|comfortable"` on `<html>`.

---

### Dark Mode Adjustments

| Property | Light | Dark |
|----------|-------|------|
| Font weight | 400 / 600 / 700 | 400 / 600 / 700 (same) |
| Color contrast | `--fg` on `--bg` | `--fg` on `--bg` (verified 4.5:1+) |
| Technical text | `#0a0a0a` | `#e8e8e8` |
| Muted text | `#666666` | `#999999` |

**No weight bumps in dark mode.** Contrast via color tokens only.

---

### Typography Audit Checklist

- [ ] Only 4 typefaces loaded (Display, Headline, Body, Technical)
- [ ] No text without declared token (no raw px/rem)
- [ ] All numbers tabular (`tabular-nums`)
- [ ] Every headline = one idea
- [ ] No sentence > 25 words in body
- [ ] No "marketing speak" — only facts, specs, evidence
- [ ] Four hierarchy levels max per view
- [ ] Dark mode contrast verified per token

---

## Section 0 — The Manifesto

### The Sentence

> **SVARA doesn't have a website. SVARA has a language.**

Apple has a language.
Stripe has a language.
Linear has a language.
Nothing has a language.
**SVARA needs one.**

---

### Principles

#### 1. Intelligence Topology
The closed loop: Observe → Understand → Predict → Coordinate → Improve.
Every diagram is this loop or a zoom into one node.

#### 2. Infrastructure Geometry
Architectural substrate. CAD grid. Structural guides.
`html::before` renders: fine grid (32px), major grid (128px), center axes, origin marker.
Respects density, theme, reduced motion.

#### 3. Computational Space
Live data fields. KPI strip. Real-time metrics.
Tabular numbers. Monospace. Dense.

#### 4. Dynamic Data Streams
Signal inventory tables. Connector protocols. Latency budgets.
Frequency. Budget. Connector. Per industry.

#### 5. Enterprise Maps
Reference architectures per vertical.
3-node → 12-node → 50-node tiers.
Deployments, signals/day, ROI.

#### 6. Digital Twin Structures
Spec tables. Certifications (SOC2, ISO27001, FedRAMP).
Compliance evidence. Not badges — receipts.

#### 7. Modular Intelligence
One module. Composes everything.
Panel. Tag. Table. Loop. Topology.
LEGO. Atoms. Architecture.

---

### Design Rule

**Every visual must answer: What enterprise concept am I explaining?**

If the answer is "Nothing" — **Delete it.**

---

### Forget / Instead

| Forget | Instead |
|--------|---------|
| Icons | Intelligence Topology |
| Gradients | Infrastructure Geometry |
| Illustrations | Computational Space |
| Dashboards | Dynamic Data Streams |
| Screenshots | Enterprise Maps |
| Mockups | Digital Twin Structures |
| Components | Modular Intelligence |

---

### The Three Layers

| Layer | Name | Role | Token |
|-------|------|------|-------|
| **1** | **Background** | Architectural substrate. Never the hero. | `--arch-grid-*`, `--bg`, `--border` |
| **2** | **Intelligence** | Live diagrams. Topology. Signals. Relationships. | Loop SVG, IndustryTopology, signal tables |
| **3** | **Meaning** | Typography. Charts. Explanations. Evidence. | KPI strip, spec tables, certifications |

---

## Section 1 — Design Tokens

### Color (4 + neutrals)

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--bg` | `#ffffff` | `#0d0d0d` | Page background |
| `--bg-panel` | `#fafafa` | `#141414` | Panel surface |
| `--fg` | `#0a0a0a` | `#e8e8e8` | Primary text |
| `--fg-muted` | `#666666` | `#999999` | Secondary text |
| `--fg-faint` | `#999999` | `#666666` | Labels, timestamps |
| `--border` | `#e0e0e0` | `#2a2a2a` | Hairlines |
| `--border-strong` | `#cccccc` | `#333333` | Panel borders |
| `--accent` | `#0066cc` | `#4da6ff` | Links, active, axes |
| `--positive` | `#008000` | `#4ade80` | Success, green |
| `--negative` | `#cc0000` | `#f87171` | Error, red |
| `--warning` | `#b8860b` | `#fbbf24` | Warning, amber |

### Typography

| Token | Value | Use |
|-------|-------|-----|
| `--font-sans` | `-apple-system, BlinkMacSystemFont, "SF Pro Text", ...` | UI, body |
| `--font-mono` | `"SF Mono", "Monaco", "Inconsolata", ...` | Data, code, specs |
| `--text-xs` | `10px` (9px dense / 11px comfortable) | Timestamps, labels |
| `--text-sm` | `11px` | Dense body |
| `--text-base` | `12px` | Standard body |
| `--text-md` | `13px` | Emphasis |
| `--text-lg` | `14px` | Headers |
| `--text-xl` | `16px` | Section titles |
| `--text-2xl` | `20px` | Page title |
| `--text-3xl` | `28px` | Hero number |
| `--leading-tight` | `1.2` | Data rows |
| `--leading-snug` | `1.35` | UI default |
| `--leading-normal` | `1.5` | Prose |

### Spacing (4px base)

| Token | Value |
|-------|-------|
| `--space-1` | `2px` |
| `--space-2` | `4px` |
| `--space-3` | `6px` |
| `--space-4` | `8px` |
| `--space-5` | `12px` |
| `--space-6` | `16px` |
| `--space-8` | `24px` |
| `--space-10` | `32px` |
| `--space-12` | `48px` |

### Panel System

| Token | Value |
|-------|-------|
| `--panel-radius` | `6px` |
| `--panel-border` | `1px solid var(--border)` |
| `--panel-shadow` | `none` |
| `--panel-padding` | `var(--space-4)` |

### Motion

| Token | Value |
|-------|-------|
| `--duration-instant` | `0ms` |
| `--duration-fast` | `80ms` |
| `--duration-normal` | `150ms` |
| `--easing` | `cubic-bezier(0.4, 0, 0.2, 1)` |

**Reduced motion**: all durations → `0ms`.

### Architectural Background (Layer 1)

| Token | Light | Dark | Dense | Comfortable |
|-------|-------|------|-------|-------------|
| `--arch-grid-size` | `32px` | `32px` | `24px` | `40px` |
| `--arch-grid-color` | `#0a0a0a` | `#e8e8e8` | — | — |
| `--arch-grid-opacity` | `0.025` | `0.025` | `0.02` | `0.03` |
| `--arch-major-grid-opacity` | `0.04` | `0.04` | `0.035` | `0.045` |
| `--arch-guide-color` | `#0066cc` | `#4da6ff` | — | — |
| `--arch-guide-opacity` | `0.015` | `0.015` | `0.012` | `0.018` |
| `--arch-origin-opacity` | `0.03` | `0.03` | `0.025` | `0.035` |

Rendered via `html::before` — fixed, `z-index: -1`, `pointer-events: none`.

---

## Section 2 — Component Primitives

### Panel
```vue
<div class="panel">...</div>
```
```css
.panel {
  background: var(--bg-panel);
  border: var(--panel-border);
  border-radius: var(--panel-radius);
  padding: var(--panel-padding);
}
```

### Tag
```vue
<span class="tag tag--product">SENSE</span>
```
Variants: `--product` (accent), `--model` (positive), `--signal` (warning), `--neutral` (muted).

### Table
```vue
<table class="table">...</table>
```
```css
.table { width: 100%; border-collapse: collapse; font-size: var(--text-sm); }
.table th { font-family: var(--font-mono); font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.05em; color: var(--fg-faint); background: var(--bg); }
```

### KPI Strip
Sticky top bar: 6 metrics (label, value, trend). Monospace values. Live pulse indicator.

### Loop Diagram
Interactive 5-node SVG. Click node → inline detail panel. Center = IMPROVE (loop closer).

### IndustryTopology
Per-industry signal flow SVG. Nodes: source → process → action → sink. Legend: Source/Process/Action/Sink.

---

## Section 3 — Patterns

### Density Toggle
`⌘⇧D` or header button → `data-density="dense|comfortable"` on `<html>`. Persists in localStorage.

### Theme Toggle
`⌘⇧T` or header button → `data-theme="light|dark"` on `<html>`. Persists + respects `prefers-color-scheme`.

### Keyboard Shortcuts
| Keys | Action |
|------|--------|
| `⌘K` | Global search |
| `⌘⇧D` | Toggle density |
| `⌘⇧T` | Toggle theme |
| `G I` | Go to Industries |
| `G P` | Go to Products |

---

## Section 4 — Governance

### ESLint Rule: `svara/require-enterprise-concept`
Every `.vue` `<script setup>` must have JSDoc:
```js
/**
 * @enterpriseConcept Intelligence Loop — closed cycle Observe→Understand→Predict→Coordinate→Improve
 */
```
CI fails if missing.

### Visual Audit Checklist
- [ ] No emoji icons (Lucide SVG only)
- [ ] No gradients on text/buttons/headers
- [ ] No decorative animations (motion = state change only)
- [ ] No `box-shadow` as decoration (elevation only)
- [ ] All numbers tabular (`font-variant-numeric: tabular-nums`)
- [ ] Dark mode contrast verified independently
- [ ] Reduced motion tested
- [ ] Print styles clean (header, status, tabs hidden)

---

## DNA 07 — Motion Language

> **Not animations. Physics. Weight. Acceleration. Momentum. Meaning.**

---

### The Motion Philosophy

> **We've animated objects. We never animated meaning.**
>
> **From today: Motion becomes communication.**

---

### Motion Types — Six Physics, Six Meanings

| Type | Enterprise Concept | Physics Metaphor | Trigger | Duration | Easing |
|------|-------------------|------------------|---------|----------|--------|
| **Discovery** | User discovers something | Free fall → terminal velocity | First reveal, drill-down, search result | 200ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| **Synchronization** | Two systems become one | Phase locking | Data merge, connector link, loop close | 400ms | `cubic-bezier(0.25, 0.1, 0.25, 1)` |
| **Intelligence** | Information begins reasoning | Resonance build | Model inference, pattern detection | 300ms | `cubic-bezier(0.2, 0, 0.2, 1)` |
| **Prediction** | Future appears before present | Wave propagation | Forecast render, horizon expand | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| **Optimization** | Chaos becomes order | Annealing decay | Retrain, rebalance, auto-tune | 800ms | `cubic-bezier(0.2, 0, 0.2, 1)` |
| **Evolution** | One system transforms | Metamorphosis | Version upgrade, architecture shift | 1000ms | `cubic-bezier(0.2, 0, 0.2, 1)` |

**Rule**: No motion without a type. If you can't name it, delete it.

---

### Camera Language — Five Moves, Five Meanings

> **We stop thinking camera movement. We start thinking camera storytelling.**

| Move | Enterprise Meaning | Physics | Duration | Easing |
|------|-------------------|---------|----------|--------|
| **Hold** | Confidence. Stability. | Zero velocity, zero acceleration | ∞ (static) | — |
| **Push** | Curiosity. Drill deeper. | Constant velocity Z | 200ms | `cubic-bezier(0.2, 0, 0.2, 1)` |
| **Orbit** | Understanding. Context. | Constant angular velocity Y | 400ms | `cubic-bezier(0.25, 0.1, 0.25, 1)` |
| **Fly Through** | Discovery. Enter signal. | Acceleration → cruise → decel | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| **Pull Back** | Scale. Bigger picture. | Exponential scale out | 300ms | `cubic-bezier(0.2, 0, 0.2, 1)` |

**Nothing else exists.** No pan, tilt, dolly, truck, pedestal, roll, zoom, rack focus — unless it *is* one of these five.

---

### Interaction Motion — Response Physics

| Interaction | Physics | Duration | Easing | Meaning |
|-------------|---------|----------|--------|---------|
| **Hover probe** | Spring (k=300, d=30) | 80ms | `cubic-bezier(0.2, 0, 0.2, 1)` | "I see you" |
| **Click transform** | Mass-spring (m=1, k=500, d=50) | 150ms | `cubic-bezier(0.2, 0, 0.2, 1)` | "It responds" |
| **Panel expand** | Damped oscillation | 300ms | `cubic-bezier(0.25, 0.1, 0.25, 1)` | "More exists" |
| **Topology transition** | Seek + arrive | 400ms | `cubic-bezier(0.25, 0.1, 0.25, 1)` | "Relationships shift" |
| **3D camera move** | PID controller | 300-600ms | Per camera move | "Perspective shifts" |

---

### Scroll Philosophy — Time as Space

> **Scroll ≠ Move page.**
>
> **Scroll = Advance the story.**

| Scroll Behavior | Physics | Enterprise Meaning |
|-----------------|---------|-------------------|
| **Section snap** | Momentum + arrest | Chapter complete. Concept locked. |
| **Progress indicator** | Linear progress | Mission status. Where in the loop? |
| **Reveal on enter** | Triggered activation | Intelligence activates. Data arrives. |
| **Parallax (subtle, Layer 1 only)** | 0.1× velocity | Depth. Substrate vs. signal. |
| **Sticky KPI** | Fixed position | Mission constants. Always visible. |

---

### Motion Audit Checklist

- [ ] Every animation tagged with Motion Type (Discovery/Sync/Intelligence/Prediction/Optimization/Evolution)
- [ ] Every camera move is one of 5 (Hold/Push/Orbit/Fly Through/Pull Back)
- [ ] No animation > 600ms except Fly Through
- [ ] All motion respects `prefers-reduced-motion: reduce`
- [ ] Scroll advances narrative, not just pixels
- [ ] Sticky elements serve mission context, not navigation

---

## Section 6 — Motion DNA

> **We've animated objects. We never animated meaning.**
>
> **From today: Motion becomes communication.**

---

### Motion Types

Each motion type maps to an enterprise intelligence concept.

| Type | Enterprise Concept | Trigger | Feeling |
|------|-------------------|---------|---------|
| **Discovery** | User discovers something | First reveal, drill-down, search result | "There it is" |
| **Synchronization** | Two systems become one | Data merge, connector link, loop close | "It connects" |
| **Intelligence** | Information begins reasoning | Model inference, pattern detection | "It thinks" |
| **Prediction** | Future appears before present | Forecast render, horizon expand | "I see ahead" |
| **Optimization** | Chaos becomes order | Retrain, rebalance, auto-tune | "It improves" |
| **Evolution** | One system transforms into another | Version upgrade, architecture shift | "It grows" |

**Rule**: No motion without a type. If you can't name it, delete it.

---

### Camera Language

We stop thinking *camera movement*.

We start thinking *camera storytelling*.

**Only five moves exist.**

| Move | Enterprise Meaning | When |
|------|-------------------|------|
| **Hold** | Confidence. Stability. The system is certain. | KPI steady, model converged, deployment healthy |
| **Push** | Curiosity. Drill deeper. There's more to see. | Node expand, detail panel, topology zoom |
| **Orbit** | Understanding. See all sides. Contextualize. | Loop diagram rotate, 3D topology, multi-view |
| **Fly Through** | Discovery. Enter the system. Follow the signal. | Signal path trace, data flow, deployment journey |
| **Pull Back** | Scale. Context. The bigger picture. | Industry map, enterprise view, architecture tier |

**Nothing else.** No pan, tilt, dolly, truck, pedestal, roll, zoom, rack focus — unless it *is* one of these five.

---

### Camera Tokens

| Token | Hold | Push | Orbit | Fly Through | Pull Back |
|-------|------|------|-------|-------------|-----------|
| `--motion-duration` | `0ms` (instant) | `200ms` | `400ms` | `600ms` | `300ms` |
| `--motion-easing` | — | `cubic-bezier(0.2, 0, 0.2, 1)` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | `cubic-bezier(0.16, 1, 0.3, 1)` | `cubic-bezier(0.2, 0, 0.2, 1)` |
| `--motion-distance` | — | `8px` (Z) | `15°` (rot Y) | `100%` (path) | `2x` (scale) |
| `--motion-pause` | `∞` | `150ms` | `200ms` | `100ms` | `200ms` |

**Reduced motion**: all durations → `0ms`, distances → `0`.

---

### Scroll Philosophy

> **Scroll ≠ Move page.**
>
> **Scroll = Advance the story.**

| Scroll Behavior | Enterprise Meaning |
|-----------------|-------------------|
| **Section snap** | Chapter complete. Concept locked. |
| **Progress indicator** | Mission status. Where in the loop? |
| **Reveal on enter** | Intelligence activates. Data arrives. |
| **Parallax (subtle, Layer 1 only)** | Depth. Substrate vs. signal. |
| **Sticky KPI** | Mission constants. Always visible. |

**Implementation**:
- `scroll-snap-type: y mandatory` on main
- Each section = one concept = one scroll stop
- IntersectionObserver triggers Layer 2/3 reveals
- Layer 1 (background) moves at 0.1× scroll (subtle parallax)

---

### Motion Audit Checklist

- [ ] Every animation tagged with Motion Type (Discovery/Sync/Intelligence/Prediction/Optimization/Evolution)
- [ ] Every camera move is one of 5 (Hold/Push/Orbit/Fly Through/Pull Back)
- [ ] No animation > 600ms except Fly Through
- [ ] All motion respects `prefers-reduced-motion: reduce`
- [ ] Scroll advances narrative, not just pixels
- [ ] Sticky elements serve mission context, not navigation

---

## Section 7 — Typography DNA

> **Typography becomes architecture. Not decoration.**

---

### Typefaces

| Role | Font | Purpose |
|------|------|---------|
| **Display** | `SF Pro Display` / `Inter Tight` (fallback) | Hero, massive numbers, editorial headlines |
| **Headline** | `SF Pro Text` / `Inter` (fallback) | Section titles, card headers |
| **Body** | `SF Pro Text` / `Inter` (fallback) | Prose, descriptions, UI labels |
| **Technical** | `JetBrains Mono` | All data, coordinates, telemetry, diagnostics, system status |

**No other fonts. Ever.**

---

### Display — Massive, Editorial, Compressed, Confident

| Token | Size | Weight | Tracking | Leading | Use |
|-------|------|--------|----------|---------|-----|
| `--display-hero` | `clamp(48px, 8vw, 96px)` | 700 | `-0.04em` | 0.92 | Page hero, single metric |
| `--display-large` | `clamp(32px, 5vw, 56px)` | 700 | `-0.03em` | 0.96 | Section hero |
| `--display-medium` | `clamp(24px, 3vw, 36px)` | 600 | `-0.02em` | 1.0 | Major stat callout |

**Rule**: One idea per display. Never multiple concepts.

---

### Headlines — One Idea, Never Multiple

| Token | Size | Weight | Tracking | Leading | Use |
|-------|------|--------|----------|---------|-----|
| `--headline-1` | `clamp(28px, 3.5vw, 40px)` | 600 | `-0.02em` | 1.1 | Page title |
| `--headline-2` | `clamp(22px, 2.5vw, 28px)` | 600 | `-0.015em` | 1.15 | Section title |
| `--headline-3` | `clamp(18px, 2vw, 22px)` | 600 | `-0.01em` | 1.2 | Card title, panel header |
| `--headline-4` | `14px` | 600 | `0` | 1.25 | Subsection, sidebar header |

**Rule**: If a headline needs two sentences, it's two headlines.

---

### Body — Prose, Descriptions, UI Labels

| Token | Size | Weight | Tracking | Leading | Use |
|-------|------|--------|----------|---------|-----|
| `--body-large` | `16px` | 400 | `0` | 1.55 | Lead paragraph |
| `--body` | `14px` | 400 | `0` | 1.5 | Standard prose |
| `--body-small` | `13px` | 400 | `0` | 1.5 | Dense UI text |
| `--body-xsmall` | `12px` | 400 | `0.01em` | 1.45 | Helper, hint |

---

### Technical Labels — JetBrains Mono

**Coordinates. Telemetry. Diagnostics. System Status.**

| Token | Size | Weight | Tracking | Leading | Use |
|-------|------|--------|----------|---------|-----|
| `--technical-large` | `14px` | 500 | `0.02em` | 1.4 | Prominent metric, KPI value |
| `--technical` | `13px` | 400 | `0.02em` | 1.4 | Standard data cell |
| `--technical-small` | `12px` | 400 | `0.03em` | 1.35 | Dense table, timestamp |
| `--technical-micro` | `11px` | 400 | `0.04em` | 1.3 | Metadata, badge, chip |
| `--technical-label` | `10px` | 500 | `0.08em` | 1.2 | Column header, axis label |
| `--technical-tag` | `10px` | 600 | `0.1em` | 1.1 | Tag, badge, status chip |

**All technical text**: `font-variant-numeric: tabular-nums tabular-slashed-zero`

---

### Information Hierarchy — Only Four Levels

```
HERO          →  Display (one metric, one idea)
    ↓
SECTION       →  Headline (one concept, scannable)
    ↓
CAPTION       →  Body (prose, explanation, evidence)
    ↓
METADATA      →  Technical (coordinates, timestamps, tags)
```

**No fifth level. No "sub-caption." No "fine print."**

If you need a fifth level, the architecture is wrong.

---

### Text Rule

> **Every sentence should survive if read alone.**

No fluff. No "designed to help you..." No "empowering enterprises to..."

**Write**: "2.3M signals/sec ingested. P99 latency 847ms. 99.97% uptime."

**Delete**: "Our platform is designed to help enterprises ingest massive amounts of data with incredibly low latency and industry-leading uptime."

---

### Density Variants

| Token | Dense | Standard | Comfortable |
|-------|-------|----------|-------------|
| `--display-hero` | `clamp(40px, 7vw, 72px)` | `clamp(48px, 8vw, 96px)` | `clamp(56px, 9vw, 112px)` |
| `--headline-1` | `clamp(24px, 3vw, 32px)` | `clamp(28px, 3.5vw, 40px)` | `clamp(32px, 4vw, 48px)` |
| `--body` | `13px` | `14px` | `15px` |
| `--technical` | `12px` | `13px` | `14px` |
| `--technical-label` | `9px` | `10px` | `11px` |

Controlled via `data-density="dense|standard|comfortable"` on `<html>`.

---

### Dark Mode Adjustments

| Property | Light | Dark |
|----------|-------|------|
| Font weight | 400 / 600 / 700 | 400 / 600 / 700 (same) |
| Color contrast | `--fg` on `--bg` | `--fg` on `--bg` (verified 4.5:1+) |
| Technical text | `#0a0a0a` | `#e8e8e8` |
| Muted text | `#666666` | `#999999` |

**No weight bumps in dark mode.** Contrast via color tokens only.

---

### Typography Audit Checklist

- [ ] Only 4 typefaces loaded (Display, Headline, Body, Technical)
- [ ] No text without declared token (no raw px/rem)
- [ ] All numbers tabular (`tabular-nums`)
- [ ] Every headline = one idea
- [ ] No sentence > 25 words in body
- [ ] No "marketing speak" — only facts, specs, evidence
- [ ] Four hierarchy levels max per view
- [ ] Dark mode contrast verified per token

---

## Section 8 — 3D Language

> **Every object belongs to one universe. No random CGI.**

---

### Materials — The SVARA Palette

| Material | Surface | Use | Never |
|----------|---------|-----|-------|
| **Frosted Glass** | `backdrop-filter: blur(24px)`; `background: rgba(255,255,255,0.74)`; 1px hairline border | Panels, modals, overlays — Layer 2 intelligence surfaces | Opacity > 0.8; colored tint |
| **Brushed Aluminium** | Anisotropic highlight 15°; roughness 0.35; clearcoat 0.1 | Structural frames, chassis, deployment tiers | Mirror finish; colored anodize |
| **Ceramic White** | Subsurface scattering 0.02; roughness 0.15; pure `#ffffff` | Core compute nodes, reference architecture blocks | Any hue shift; gloss > 0.2 |
| **Liquid Crystal** | IOR 1.55; thin-film interference 380–420nm; animated phase | Data streams, signal flows, prediction horizons | Particle systems; "magic" shaders |
| **Blue Volumetric Light** | Mie scattering; 460–480nm peak; 0.5–2m falloff | Intelligence activation, Loop closure, prediction confidence | Bloom; lens flare; god rays |
| **Graphite** | Roughness 0.8; microfacet; `#1a1a2e` base | Edge infrastructure, air-gapped nodes, legacy bridges | Specular highlight > 0.15 |

**Rule**: One material per object. No multi-material objects unless the object *is* a junction (e.g., glass-aluminium frame).

---

### Lighting — Architectural, Not Cinematic

| Principle | Spec |
|-----------|------|
| **Key** | Single directional (sun-equivalent) — 45° elevation, 315° azimuth; 1.0 intensity; 5600K |
| **Fill** | Hemisphere dome — 0.3 intensity; 6500K zenith → 4000K horizon |
| **Rim** | None. Edge definition via material contrast only. |
| **Volumetric** | Blue (460–480nm) cone lights at intelligence nodes; radius 1.5m; falloff quadratic; density 0.08 |
| **Ambient Occlusion** | Baked, 256px, 16 samples — baked into Ceramic/Graphite albedo |
| **Shadows** | VSM 2048²; contact hardening 0.05m; no PCF blur |
| **Exposure** | Fixed EV 14.5 — no auto-exposure, no tone mapping |

**Forbidden**: Bloom, lens flare, chromatic aberration, vignette, film grain, color grading LUTs, HDR skyboxes.

---

### Geometry — Modular, Mathematical, Structural

| Primitive | Dimensions | Grid | Use |
|-----------|------------|------|-----|
| **Voxel** | 1×1×1m | 1m³ | Compute node, storage brick, edge gateway |
| **Beam** | 0.1×0.1×variable | 0.5m increments | Structural frame, connectivity spine |
| **Plate** | variable×variable×0.05 | 0.5m | Platform, deployment tier, reference arch layer |
| **Conduit** | 0.08m Ø | 0.25m bend radius | Data stream, signal path, prediction corridor |
| **Node** | 0.3m icosphere (subdiv 2) | — | Intelligence core, prediction engine, coordination hub |

**Assembly Rules**:
- All objects snap to 0.5m grid
- Rotation: 90° increments only
- Scale: integer multiples of base unit
- Boolean operations only at junctions (beam→plate, conduit→node)
- No free-floating geometry — everything connected to grid origin

---

### Behaviour — Alive, Processing, Never Floating

| State | Animation | Duration | Trigger |
|-------|-----------|----------|---------|
| **Idle** | Subsurface pulse (Ceramic) — 0.02 intensity, 4s period | ∞ | Default |
| **Ingest** | Conduit flow — Liquid Crystal phase shift 0→2π | 800ms | Signal arrival |
| **Process** | Node rotation — 15° Y, ease-in-out | 1200ms | Intelligence active |
| **Predict** | Volumetric cone expand — 0.5→2m radius | 600ms | Prediction emitted |
| **Coordinate** | Beam highlight — aluminium → blue volumetric | 400ms | Action dispatched |
| **Improve** | Plate ripple — 0.02m displacement wave | 1000ms | Loop closed |
| **Degraded** | Graphite flicker — 0.15→0.05 roughness | 200ms | Signal loss |
| **Offline** | Frosted Glass → 0.3 opacity, no blur | 300ms | Node down |

**Physics**: All motion uses `cubic-bezier(0.16, 1, 0.3, 1)` — natural ease, no spring, no bounce.

**Reduced Motion**: All behaviours → instant state swap (0ms).

---

## DNA 08 — Camera Language

> **This one is missing from almost every website. We define it.**
>
> **Push. Orbit. Focus. Hold. Reveal. Fly-through.**
>
> **Everything.**

---

### The Camera Philosophy

> **We stop thinking camera movement. We start thinking camera storytelling.**

Every camera move is a sentence in the intelligence narrative. No decorative moves. No "cinematic" flourishes. Only six moves, each with one enterprise meaning.

---

### The Six Moves — Complete Vocabulary

| Move | Enterprise Meaning | Physics | Duration | Easing | Trigger |
|------|-------------------|---------|----------|--------|---------|
| **Hold** | Confidence. "This is true." | Zero velocity, zero acceleration. Absolute stillness. | ∞ (static) | — | KPI steady, model converged, deployment healthy, certification earned |
| **Push** | Curiosity. "Look closer." | Constant velocity Z (dolly in). No acceleration at start/end. | 800ms | `cubic-bezier(0.2, 0, 0.2, 1)` | Node expand, detail panel, topology zoom, capability drill |
| **Orbit** | Understanding. "See the relationship." | Constant angular velocity Y (15°/s). Radius fixed. | 1200ms | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Loop diagram rotate, 3D topology, multi-view capability |
| **Focus** | Attention. "Here is the signal." | Depth-of-field shift + subtle dolly. Aperture 1.8 → 0.5. | 300ms | `cubic-bezier(0.4, 0, 0.2, 1)` | KPI anomaly, topology alert, prediction highlight, search result |
| **Reveal** | Discovery. "Enter the stream." | Fly-through + focus pull. Accel → cruise → decel + aperture pull. | 1500ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Signal path trace, data flow, deployment journey, prediction corridor |
| **Pull Back** | Scale. "See the system." | Exponential scale out (2× per 500ms). Z negative velocity. | 1000ms | `cubic-bezier(0.2, 0, 0.2, 1)` | Chapter exit, deployment tier, enterprise map, architecture tier |

**No other moves exist.** No pan, tilt, dolly, truck, pedestal, roll, zoom, rack focus, shake, handheld — unless it *is* one of these six.

---

### Camera Tokens — The Physics Constants

| Token | Hold | Push | Orbit | Focus | Reveal | Pull Back |
|-------|------|------|-------|-------|--------|-----------|
| `--cam-duration` | `0ms` (instant) | `800ms` | `1200ms` | `300ms` | `1500ms` | `1000ms` |
| `--cam-easing` | — | `cubic-bezier(0.2, 0, 0.2, 1)` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | `cubic-bezier(0.4, 0, 0.2, 1)` | `cubic-bezier(0.16, 1, 0.3, 1)` | `cubic-bezier(0.2, 0, 0.2, 1)` |
| `--cam-distance` | — | `8px` (Z) | `15°` (rot Y) | `DOF 1.8→0.5` | `100%` (path) | `2x` (scale) |
| `--cam-pause` | `∞` | `150ms` | `200ms` | `100ms` | `100ms` | `200ms` |

**Reduced motion**: all durations → `0ms`, distances → `0`, DOF → disabled.

---

### Camera States — Intelligence Lifecycle

| State | Active Move | Duration | Trigger |
|-------|-------------|----------|---------|
| **Dormant** | Hold | ∞ | Waiting for signal |
| **Ingesting** | Focus (pulse 2Hz) | Per signal | Signal arrival |
| **Processing** | Orbit (slow, 5°/s) | ∞ | Model active |
| **Predicting** | Focus → Push | Per horizon | Forecast emitted |
| **Coordinating** | Orbit (star pattern) | Per action | Action dispatched |
| **Optimizing** | Pull Back → Hold | 2s cycle | Retrain cycle |
| **Degraded** | Focus (amber pulse 1Hz) | ∞ | Attention needed |
| **Offline** | Hold (static, dimmed) | — | Node down |

---

### Scene Composition — Three Layers, One Camera

| Layer | Z-Range | Content | Camera Behavior |
|-------|---------|---------|-----------------|
| **1 — Substrate** | -100m to -10m | Architectural grid, volumetric fog, blue light cones (dormant) | Fixed (Hold) — never moves |
| **2 — Intelligence** | -10m to +10m | Nodes, conduits, flowing crystals, active beams | Orbit / Push / Focus / Reveal |
| **3 — Meaning** | +10m to +100m | Typography panels, KPI displays, spec tables, enterprise maps | Pull Back / Hold |

**Rule**: Camera never crosses Layer 1 → 2 boundary without **Reveal**. Layer 3 always in screen space (CSS3D overlay), never in WebGL space.

---

### Camera Audit Checklist

- [ ] Only 6 moves used (Hold/Push/Orbit/Focus/Reveal/Pull Back)
- [ ] Every move tagged with enterprise meaning
- [ ] No pan, tilt, dolly, truck, pedestal, roll, zoom, rack focus, shake, handheld
- [ ] Durations match tokens exactly
- [ ] Easings match tokens exactly
- [ ] Camera never crosses Layer 1→2 without Reveal
- [ ] Layer 3 rendered as CSS3D overlay, never WebGL
- [ ] Reduced motion = instant state swaps
- [ ] Focus uses DOF shift, not just position
- [ ] Reveal = Fly Through + Focus Pull combined

---

## Section 8 — 3D Language

- [ ] Every object uses exactly one SVARA material
- [ ] All geometry snaps to 0.5m grid, 90° rotations
- [ ] Lighting = 1 key + hemisphere fill + blue volumetrics only
- [ ] No bloom, flare, chromatic aberration, vignette, grain, LUT
- [ ] All animations tagged with Behaviour state (Idle/Ingest/Process/Predict/Coordinate/Improve/Degraded/Offline)
- [ ] Camera moves only from 5-move vocabulary
- [ ] Reduced motion = instant state swaps
- [ ] Layer 3 (Meaning) rendered as CSS3D, not WebGL
- [ ] Scene loads < 200KB gzipped (GLTF + textures)
- [ ] 60fps on 5-year-old integrated GPU

---

## Section 8 — 3D Language

> **No random CGI. Every object belongs to one universe.**

---

### Materials — The SVARA Palette

| Material | Token | Visual Character | Enterprise Meaning |
|----------|-------|------------------|-------------------|
| **Frosted Glass** | `--mat-glass` | Semi-transparent, blurred edges, subtle refraction | Intelligence layer — processing, not storage |
| **Brushed Aluminium** | `--mat-aluminium` | Anisotropic highlights, cool tone, fine grain | Infrastructure — durable, structural, deployed |
| **Ceramic White** | `--mat-ceramic` | Matte, slight subsurface scatter, warm white | Clean compute — training, inference, sterile |
| **Liquid Crystal** | `--mat-lc` | Birefringent shifts, polarized shimmer | Active reasoning — prediction, optimization |
| **Blue Volumetric Light** | `--mat-volumetric` | Tyndall scattering, coherent beams | Signal flow — data in motion, intelligence propagating |
| **Graphite** | `--mat-graphite` | Matte dark, subtle sheen, conductive | Edge — rugged, air-gapped, secure |

**Implementation**: Each material = 1 PBR shader variant + 1 CSS fallback. No custom textures — procedural only.

```glsl
// Frosted Glass — single shader, parameterized
uniform float roughness;        // 0.05–0.15
uniform float transmission;     // 0.85–0.95
uniform float thickness;        // 2–8mm
uniform vec3 tint;              // #0066cc at 0.02
uniform float blur;             // screenspace, 4–16px
```

---

### Lighting — Natural, Architectural, Soft

| Principle | Rule |
|-----------|------|
| **Single HDRI** | One environment map — `studio_neutral_4k.hdr` (cool white, 5600K) |
| **No point lights** | All illumination from HDRI + 2 rectangular areas (key + fill) |
| **Key area** | 4m × 2m, 3000 lux, 45° above, slight blue bias |
| **Fill area** | 6m × 3m, 800 lux, opposite side, warm bias |
| **No bloom** | Volumetric light only via `--mat-volumetric` material |
| **Shadows** | Contact-hardening, 64-sample PCSS, zero bias |
| **Exposure** | Fixed EV 12.5 — never auto |

**Dark mode**: Same HDRI, exposure EV 9.5, materials adjust albedo (not lighting).

---

### Geometry — Modular, Mathematical, Structural, Scalable

| Primitive | Definition | Compose Rule |
|-----------|------------|--------------|
| **Module** | 1×1×1 unit cube, chamfered 2mm | All objects = module grid |
| **Strut** | 0.1×0.1×L cylinder, 8-segment | Connects modules |
| **Plate** | 1×1×0.05 slab, rounded 1mm | Floors, panels, cards |
| **Node** | 0.3 sphere, 32-segment | Junctions, connectors |
| **Beam** | 0.05×0.05×L box, emission edges | Signal paths, data flows |

**Grid**: All vertices snap to 0.125 unit grid. No arbitrary transforms.

**LOD**: 3 levels — High (≤10m), Mid (10–50m), Low (>50m). Triangle budget: High 2K, Mid 500, Low 50 per object.

---

### Behaviour — Alive, Never Floating, Always Processing

| State | Animation | Loop | Meaning |
|-------|-----------|------|---------|
| **Idle** | Micro-vibration (0.02mm, 0.5Hz) + volumetric pulse (2s) | ∞ | System healthy, listening |
| **Processing** | Surface ripple (sin, 0.5mm, 2Hz) + LC shimmer (4Hz) | ∞ | Intelligence active |
| **Transmitting** | Beam pulse (origin→dest, 400ms) + node flash (100ms) | Per event | Signal moving |
| **Optimizing** | Geometry relax (simulated annealing, 2s) | Once | Order from chaos |
| **Evolving** | Module swap (dissolve 300ms + assemble 300ms) | Once | Architecture change |
| **Degraded** | Amber pulse (1Hz) + vibration (1mm, 1Hz) | ∞ | Attention needed |
| **Offline** | Material → Graphite, emission 0, frozen | — | System down |

**Physics**: All motion via GPU compute shader — no CPU animation. 60fps guaranteed.

---

### 3D Audit Checklist

- [ ] Only 6 approved materials used
- [ ] Single HDRI, fixed exposure
- [ ] No point/spot lights
- [ ] All geometry on 0.125 unit grid
- [ ] Only 5 primitives (Module, Strut, Plate, Node, Beam)
- [ ] 3 LODs per object, budgets met
- [ ] 7 behaviour states only, no custom animations
- [ ] GPU compute only, 60fps on 5-year-old iGPU
- [ ] Scene < 200KB gzipped
- [ ] CSS fallback for every 3D element

---

## Section 9 — Story Architecture

> **We no longer build pages. We build chapters.**

Every page answers **one question**. Not ten. Not three. One.

| Route | Chapter | Question | Layer 2 (Intelligence) | Layer 3 (Meaning) |
|-------|---------|----------|------------------------|-------------------|
| `/` | **HOME** | Why does intelligence matter? | Loop diagram (live) | KPI strip + problem statement |
| `/platform` | **PLATFORM** | How does intelligence work? | 5-node loop + capability expandables | Spec tables, signal flows, models |
| `/products` | **PRODUCTS** | How is intelligence delivered? | Product grid (bento) → detail panels | Specs, status, deployment models |
| `/industries` | **INDUSTRIES** | Where does intelligence create value? | Topology selector + signal inventory | Reference arch, ROI, deployments |
| `/technology` | **TECHNOLOGY** | What powers intelligence? | Architecture diagram (3D) | Technical deep-dives, benchmarks |
| `/company` | **COMPANY** | Why should I trust SVARA? | Trust signals (live metrics) | Certifications, team, investors, DPIIT |
| `/contact` | **CONTACT** | How do we build together? | Deployment calculator | Trial request, sales routing, Slack connect |

---

### Chapter Structure — Identical for Every Page

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (sticky) — Logo, Search, Density, Theme, Nav, CTA  │
├─────────────────────────────────────────────────────────────┤
│  KPI STRIP (sticky) — 6 mission constants, always visible  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  HERO — One sentence answer to the chapter question        │
│  Layer 2: Minimal diagram / live metric                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  BODY — Evidence for the answer                             │
│  Layer 2: Interactive intelligence (topology, loop, grid)  │
│  Layer 3: Spec tables, certifications, calculations        │
│                                                             │
│  Scroll-snap sections = sub-concepts                        │
│  IntersectionObserver reveals = intelligence activating     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  FOOTER (sticky) — Status bar: version, live, updated,     │
│  density, theme                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### Content Rules

| Rule | Enforcement |
|------|-------------|
| **One question per page** | CI: `enterpriseConcept` JSDoc must match route table |
| **Hero = one sentence** | Lint: `<h1>` word count ≤ 18 |
| **No marketing fluff** | Lint: banned phrases ("empower", "seamless", "revolutionary", "unlock", "leverage") |
| **Every claim evidenced** | Review: spec table / cert / metric / topology within 1 scroll |
| **Layer 2 before Layer 3** | Visual: intelligence diagram above fold, evidence below |
| **Scroll advances story** | `scroll-snap-type: y mandatory` on main; each section = concept |

---

### Navigation Philosophy

| Pattern | Use |
|---------|-----|
| **Header nav** | Chapter switching only (7 items max) |
| **Breadcrumbs** | Never — you're in a chapter, not a hierarchy |
| **Back button** | Browser native — chapters are URLs |
| **Progress indicator** | Top bar: 7 dots, current chapter highlighted |
| **Deep links** | Every section anchorable (`#capabilities`, `#specs`) |

---

### Story Audit Checklist

- [ ] 7 routes, 7 questions, 0 extra pages
- [ ] Each hero answers its question in one sentence
- [ ] Zero marketing phrases in codebase
- [ ] Layer 2 intelligence visible above fold on every page
- [ ] Scroll snap sections = sub-concepts (not arbitrary chunks)
- [ ] Progress indicator shows chapter position
- [ ] Deep links work for every evidence section
- [ ] Print stylesheet = clean chapter PDF

---

## Section 10 — Color DNA

> **White ≈ 80% · Blue ≈ 15% · Dark Navy ≈ 5% · Nothing else.**
>
> **Blue means intelligence. Not decoration.**

---

### The Three Colors

| Role | Token | Light | Dark | Surface % | Meaning |
|------|-------|-------|------|-----------|---------|
| **Substrate** | `--color-white` | `#ffffff` | `#0d0d0d` | ~80% | Paper. Canvas. Silence. The page is white. |
| **Intelligence** | `--color-intelligence` | `#0066cc` | `#4da6ff` | ~15% | Active reasoning. Live signal. The loop. |
| **Structure** | `--color-structure` | `#0a0a0a` | `#e8e8e8` | ~5% | Text. Borders. The architecture that holds. |

**No other colors exist.**

---

### Intelligence Blue — The Only Accent

`--color-intelligence` appears **only** on:

| Element | Why |
|---------|-----|
| Active loop node | Intelligence is processing here |
| Live signal path | Data is flowing now |
| Prediction horizon | Future is being computed |
| Primary CTA | "Build intelligence" |
| KPI trend (positive) | Intelligence improving |
| Focus ring | Keyboard is navigating intelligence |
| Architectural guide lines (Layer 1) | The grid is intelligent substrate |

**Never on**: Decorative borders, hover states for non-intelligence elements, backgrounds, illustrations, gradients, loading spinners.

---

### Structure — Dark Navy

`--color-structure` is the only text color. The only border color. The only icon color.

| Use | Token |
|-----|-------|
| All body text | `--color-structure` |
| All headings | `--color-structure` |
| All borders | `--color-structure` at 12% opacity (`--border`) |
| All icons | `--color-structure` at 40% opacity (`--fg-muted`) |
| All timestamps, labels, metadata | `--color-structure` at 60% opacity (`--fg-faint`) |

---

### Semantic Color Map — Zero Exceptions

| Semantic | Token | Intelligence? |
|----------|-------|---------------|
| Success | `--color-intelligence` | Yes — model converged |
| Error | `--color-structure` + `⚠` icon | No — use structure + symbol |
| Warning | `--color-structure` + `⚡` icon | No — use structure + symbol |
| Info | `--color-intelligence` | Yes — live insight |
| Link | `--color-intelligence` | Yes — navigate to intelligence |
| Active state | `--color-intelligence` | Yes — intelligence selected |
| Disabled | `--color-structure` at 20% | No — intelligence absent |

**No green for success. No red for error. No amber for warning.**

Intelligence *is* success. Structure *is* error. Intelligence *is* info.

---

### Dark Mode — Inverted, Not New

| Light | Dark | Rule |
|-------|------|------|
| `--color-white` `#ffffff` | `#0d0d0d` | Substrate inverts |
| `--color-intelligence` `#0066cc` | `#4da6ff` | Blue lifts on dark |
| `--color-structure` `#0a0a0a` | `#e8e8e8` | Text inverts |
| `--border` 12% structure | 12% structure | Same opacity |

**No new colors in dark mode. Same three. Inverted.**

---

### Gradients — One Only

```css
/* Intelligence gradient — ONLY approved gradient */
--gradient-intelligence: linear-gradient(135deg,
  var(--color-intelligence) 0%,
  color-mix(in oklab, var(--color-intelligence) 70%, white) 100%
);
```

**Use**: Primary CTA background. Intelligence panel header. Loop center node.

**Never**: Section backgrounds. Hero backgrounds. Card backgrounds. Text gradients. Border gradients.

---

### Color Audit Checklist

- [ ] Only 3 color tokens used in entire codebase
- [ ] `--color-intelligence` appears only on intelligence-bearing elements
- [ ] No green/red/amber/purple/pink/orange/yellow/teal anywhere
- [ ] No gradients except `--gradient-intelligence`
- [ ] Dark mode uses same 3 tokens, inverted
- [ ] All borders = structure at 12% opacity
- [ ] All text = structure (or structure opacity variants)
- [ ] Focus rings = intelligence (not browser default)
- [ ] Print stylesheet = structure only (no blue)

---

## DNA 09 — Information Language

> **This is why enterprise websites fail.**
>
> **Too much information. No hierarchy.**
>
> **We'll define: What deserves attention. What stays quiet. What should never compete.**

---

### The Viewport Rule — Four Elements, One Order, No Exceptions

```
HEADLINE
  ↓
VISUAL
  ↓
EXPLANATION
  ↓
CONTINUE
```

**Exactly four elements. In this order. No exceptions.**

| Position | Content | Token | Max Height |
|----------|---------|-------|------------|
| **1. Headline** | One sentence answer to the chapter question | `--headline-1` / `--headline-2` | 2 lines |
| **2. Visual** | Intelligence diagram / topology / live metric | Layer 2 component | 40–60vh |
| **3. Explanation** | Evidence: spec, metric, certification, signal | `--body` + `--technical` table | 3–5 lines |
| **4. Continue** | Single CTA: "Explore loop" / "View topology" / "Calculate deployment" | `--color-intelligence` link | 1 line |

**Nothing else in the viewport.** No hero badges. No stat cards. No feature grids. No testimonial carousels. No partner logos.

---

### Density Tiers — One Message Per Tier

| Tier | Viewport | Message | Visual | Explanation | Continue |
|------|----------|---------|--------|-------------|----------|
| **Hero** | First paint | Why intelligence matters | Live loop (center node pulse) | 1 sentence: problem + approach | "Enter platform" |
| **Section** | Scroll stop | How one capability works | Capability expandable | Spec table (3 rows) | "View specification" |
| **Detail** | Deep link | What one product delivers | Product topology | 4-row spec + status | "Start trial" |
| **Reference** | Industry page | Where intelligence creates value | Industry topology selector | ROI + deployment tier | "Open reference architecture" |

**Each tier = one scroll snap point. One concept. One decision.**

---

### Forbidden Patterns — Delete on Sight

| Pattern | Why It Fails | Replace With |
|---------|--------------|--------------|
| **Stat cards (3–6)** | Fragments one message into noise | Single KPI strip (sticky, 6 metrics) |
| **Feature grid (3×3)** | No hierarchy, no decision path | One capability expanded, others collapsed |
| **Testimonial carousel** | Marketing, not evidence | Certification + deployment count |
| **Partner logo wall** | Trust theater | SOC2 + ISO27001 + FedRAMP badges (clickable) |
| **Multi-button hero** | Decision paralysis | One CTA: primary action |
| **Accordion FAQ** | Hides answers | Inline explanation at correct tier |
| **Infinite scroll** | No chapter boundaries | Scroll-snap sections = chapters |

---

### Information Hierarchy Enforcement — CSS Template

```css
/* Viewport template — every section follows this */
.section {
  display: grid;
  grid-template-rows: 
    auto      /* Headline */
    1fr       /* Visual (flexible) */
    auto      /* Explanation */
    auto;     /* Continue */
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

/* Visual always Layer 2 — intelligence */
.section__visual {
  min-height: 40vh;
  max-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Explanation = evidence table */
.section__explanation {
  max-width: 60ch;
  margin: 0 auto;
}

/* Continue = single intelligence link */
.section__continue {
  text-align: center;
  padding-top: var(--space-6);
}
```

---

### Mobile — Same DNA, Stacked

| Viewport | Hero | Section | Detail | Reference |
|----------|------|---------|--------|-----------|
| **Mobile (<640px)** | 35vh visual, headline 2 lines | Visual 50vh, explanation 3 lines | Product card → tap = expand | Topology selector full-width |
| **Tablet (640–1024px)** | 45vh visual | Side-by-side: visual + explanation | Bento grid (2-col) | Selector + metrics side-by-side |
| **Desktop (>1024px)** | 60vh visual, sticky KPI | 3-col: loop + capabilities + products | Full topology | Selector + ROI + arch |

**Rule**: Same 4 elements. Same order. Different proportions. Never add/remove.

---

### Information Audit Checklist

- [ ] Every viewport = Headline → Visual → Explanation → Continue (exactly 4 elements)
- [ ] No stat cards, feature grids, carousels, logo walls, multi-button heroes
- [ ] One CTA per viewport
- [ ] Scroll-snap sections = one concept each
- [ ] KPI strip sticky, 6 metrics max, monospace
- [ ] Mobile/Tablet/Desktop = same 4 elements, proportional
- [ ] Deep link opens correct section with visual + explanation visible
- [ ] Print = Headline + Explanation + Continue (visual → QR to live)

---

## Section 12 — Interaction DNA

> **Hover explains. Never decorates.**
>
> **Scroll reveals. Never entertains.**
>
> **Cursor influences. Never distracts.**
>
> **Clicks transform. Never navigate abruptly.**

---

### Interaction Principles

| Principle | Meaning |
|-----------|---------|
| **Explanation > Decoration** | Every hover = new information. No color shifts for "delight." |
| **Revelation > Animation** | Scroll = intelligence activating. No parallax for beauty. |
| **Influence > Distraction** | Cursor = probe into the system. No custom cursors, no trails. |
| **Transformation > Navigation** | Click = state change in place. No page reloads for concepts. |

---

### Hover — Intelligence Probe

| Target | Hover Reveals | Duration | Motion |
|--------|---------------|----------|--------|
| **Loop node** | Capability name, 3 key metrics, signal types, "View specification" | 80ms | Fade + slide up 4px |
| **Topology node** | Signal list, latency budget, connector protocol, throughput | 80ms | Panel slides from node |
| **Product card** | Status badge detail, deployment model, latency tier, "Start trial" | 80ms | Elevate 2px, border → intelligence |
| **KPI metric** | 7-day sparkline, threshold lines, anomaly markers | 80ms | Tooltip at cursor |
| **Signal row** | Full protocol name, example payload, error rate, retry policy | 80ms | Inline expansion |
| **Certification badge** | Audit date, scope, expiration, "View report" | 80ms | Tooltip |
| **Primary CTA** | Destination preview (deployment calc / trial form / Slack connect) | 80ms | Preview panel |

**Never**: Color change only. Scale only. Glow only. Cursor change only.

**Rule**: Hover = `aria-expanded` + semantic tooltip. Screen reader announces new info.

---

### Scroll — Intelligence Activation

| Scroll Event | Intelligence Reveals | Implementation |
|--------------|---------------------|----------------|
| **Section enters (25%)** | Layer 2 diagram animates: nodes pulse, paths flow | `IntersectionObserver` + CSS `animation` |
| **Section at 50%** | Layer 3 evidence tables fade in, numbers count up | `IntersectionObserver` + `requestAnimationFrame` |
| **Section at 75%** | Continue CTA appears (if not already sticky) | `IntersectionObserver` |
| **Section exits (top)** | State persists — intelligence stays activated | No reset on scroll up |
| **KPI strip always visible** | Mission constants never hide | `position: sticky; top: 0` |

**Scroll-snap sections** = one concept = one intelligence activation.

**No**: Parallax backgrounds. Fade-in text blocks. Staggered card reveals. "Scroll to explore" indicators.

---

### Cursor — System Probe

| Cursor State | When | Visual | Meaning |
|--------------|------|--------|---------|
| **Default** | Over substrate, empty space | `default` | Observing |
| **Pointer** | Over interactive intelligence (nodes, cards, CTAs, links) | `pointer` | Can activate |
| **Crosshair** | Over topology canvas, 3D scene | `crosshair` | Can inspect |
| **Grab** | Dragging topology, rotating 3D | `grab` → `grabbing` | Manipulating structure |
| **Zoom-in** | Hovering metric sparkline, signal detail | `zoom-in` | Can magnify |
| **Not-allowed** | Disabled intelligence (offline node, locked tier) | `not-allowed` | Intelligence unavailable |

**No custom cursor images. No cursor trails. No magnetic attraction. No ripple on click.**

---

### Click — State Transformation

| Target | Click Transforms | Destination |
|--------|-----------------|-------------|
| **Loop node** | Collapsed → Expanded (inline detail panel) | Same viewport |
| **Topology node** | Node → Signal flow panel (side sheet) | Same viewport |
| **Product card** | Card → Full specification (inline expand) | Same viewport |
| **Industry selector** | Closed → Open (topology + metrics) | Same viewport |
| **KPI metric** | Value → 30-day trend modal | Overlay (ESC to close) |
| **Primary CTA** | Button → Deployment calculator / Trial form / Slack connect | Modal or inline |
| **Deep link** | Page → Section scroll + highlight | Same page, scroll position |
| **Density toggle** | Dense ↔ Standard ↔ Comfortable | Instant, persists |
| **Theme toggle** | Light ↔ Dark | Instant, persists |

**Never**: Full page navigation for concept drill-down. New tab for specification. Reload for state change.

**Rule**: Click = progressive disclosure in context. `history.pushState` for deep links only.

---

### Keyboard — First-Class Intelligence Navigation

| Keys | Action | Intelligence Context |
|------|--------|---------------------|
| `Tab` / `Shift+Tab` | Navigate interactive intelligence | Loop nodes, topology, products, KPIs, CTAs |
| `Enter` / `Space` | Activate focused intelligence | Expand node, open panel, trigger CTA |
| `Arrow keys` | Navigate within intelligence cluster | Loop cycle, topology neighbors, product variants |
| `Esc` | Close expanded intelligence | Collapse panel, dismiss modal, exit 3D |
| `⌘K` | Global intelligence search | Search all concepts, specs, deployments |
| `⌘⇧D` | Toggle density | Dense / Standard / Comfortable |
| `⌘⇧T` | Toggle theme | Light / Dark |
| `G I` | Go to Industries chapter | `/industries` + topology focus |
| `G P` | Go to Products chapter | `/products` + grid focus |
| `G L` | Go to Platform chapter | `/platform` + loop focus |
| `?` | Show keyboard shortcuts | Modal with all shortcuts |

**Focus ring**: 2px `--color-intelligence`, 2px offset. Never removed.

---

### Motion Tokens — Interaction Only

| Token | Value | Use |
|-------|-------|-----|
| `--interaction-fast` | `80ms` | Hover tooltip, focus ring, cursor change |
| `--interaction-normal` | `150ms` | Panel expand, side sheet, modal enter |
| `--interaction-slow` | `300ms` | Full topology transition, 3D camera move |
| `--interaction-easing` | `cubic-bezier(0.2, 0, 0.2, 1)` | All interaction motion |

**Reduced motion**: All → `0ms`. Instant state swaps.

---

### Interaction Audit Checklist

- [ ] Deep link opens correct section with visual + explanation visible
- [ ] Print = Headline + Explanation + Continue (visual → QR to live)

---

## DNA 10 — Interaction Language

> **Hover explains. Never decorates.**
>
> **Scroll reveals. Never entertains.**
>
> **Cursor influences. Never distracts.**
>
> **Clicks transform. Never navigate abruptly.**

---

### The Interaction Philosophy

| Principle | Meaning |
|-----------|---------|
| **Explanation > Decoration** | Every hover = new information. No color shifts for "delight." |
| **Revelation > Animation** | Scroll = intelligence activating. No parallax for beauty. |
| **Influence > Distraction** | Cursor = probe into the system. No custom cursors, no trails. |
| **Transformation > Navigation** | Click = state change in place. No page reloads for concepts. |

---

### Hover — Intelligence Probe

| Target | Hover Reveals | Duration | Motion |
|--------|---------------|----------|--------|
| **Loop node** | Capability name, 3 key metrics, signal types, "View specification" | 80ms | Fade + slide up 4px |
| **Topology node** | Signal list, latency budget, connector protocol, throughput | 80ms | Panel slides from node |
| **Product card** | Status badge detail, deployment model, latency tier, "Start trial" | 80ms | Elevate 2px, border → intelligence |
| **KPI metric** | 7-day sparkline, threshold lines, anomaly markers | 80ms | Tooltip at cursor |
| **Signal row** | Full protocol name, example payload, error rate, retry policy | 80ms | Inline expansion |
| **Certification badge** | Audit date, scope, expiration, "View report" | 80ms | Tooltip |
| **Primary CTA** | Destination preview (deployment calc / trial form / Slack connect) | 80ms | Preview panel |

**Never**: Color change only. Scale only. Glow only. Cursor change only.

**Rule**: Hover = `aria-expanded` + semantic tooltip. Screen reader announces new info.

---

### Scroll — Intelligence Activation

| Scroll Event | Intelligence Reveals | Implementation |
|--------------|---------------------|----------------|
| **Section enters (25%)** | Layer 2 diagram animates: nodes pulse, paths flow | `IntersectionObserver` + CSS `animation` |
| **Section at 50%** | Layer 3 evidence tables fade in, numbers count up | `IntersectionObserver` + `requestAnimationFrame` |
| **Section at 75%** | Continue CTA appears (if not already sticky) | `IntersectionObserver` |
| **Section exits (top)** | State persists — intelligence stays activated | No reset on scroll up |
| **KPI strip always visible** | Mission constants never hide | `position: sticky; top: 0` |

**Scroll-snap sections** = one concept = one intelligence activation.

**No**: Parallax backgrounds. Fade-in text blocks. Staggered card reveals. "Scroll to explore" indicators.

---

### Cursor — System Probe

| Cursor State | When | Visual | Meaning |
|--------------|------|--------|---------|
| **Default** | Over substrate, empty space | `default` | Observing |
| **Pointer** | Over interactive intelligence (nodes, cards, CTAs, links) | `pointer` | Can activate |
| **Crosshair** | Over topology canvas, 3D scene | `crosshair` | Can inspect |
| **Grab** | Dragging topology, rotating 3D | `grab` → `grabbing` | Manipulating structure |
| **Zoom-in** | Hovering metric sparkline, signal detail | `zoom-in` | Can magnify |
| **Not-allowed** | Disabled intelligence (offline node, locked tier) | `not-allowed` | Intelligence unavailable |

**No custom cursor images. No cursor trails. No magnetic attraction. No ripple on click.**

---

### Click — State Transformation

| Target | Click Transforms | Destination |
|--------|-----------------|-------------|
| **Loop node** | Collapsed → Expanded (inline detail panel) | Same viewport |
| **Topology node** | Node → Signal flow panel (side sheet) | Same viewport |
| **Product card** | Card → Full specification (inline expand) | Same viewport |
| **Industry selector** | Closed → Open (topology + metrics) | Same viewport |
| **KPI metric** | Value → 30-day trend modal | Overlay (ESC to close) |
| **Primary CTA** | Button → Deployment calculator / Trial form / Slack connect | Modal or inline |
| **Deep link** | Page → Section scroll + highlight | Same page, scroll position |
| **Density toggle** | Dense ↔ Standard ↔ Comfortable | Instant, persists |
| **Theme toggle** | Light ↔ Dark | Instant, persists |

**Never**: Full page navigation for concept drill-down. New tab for specification. Reload for state change.

**Rule**: Click = progressive disclosure in context. `history.pushState` for deep links only.

---

### Keyboard — First-Class Intelligence Navigation

| Keys | Action | Intelligence Context |
|------|--------|---------------------|
| `Tab` / `Shift+Tab` | Navigate interactive intelligence | Loop nodes, topology, products, KPIs, CTAs |
| `Enter` / `Space` | Activate focused intelligence | Expand node, open panel, trigger CTA |
| `Arrow keys` | Navigate within intelligence cluster | Loop cycle, topology neighbors, product variants |
| `Esc` | Close expanded intelligence | Collapse panel, dismiss modal, exit 3D |
| `⌘K` | Global intelligence search | Search all concepts, specs, deployments |
| `⌘⇧D` | Toggle density | Dense / Standard / Comfortable |
| `⌘⇧T` | Toggle theme | Light / Dark |
| `G I` | Go to Industries chapter | `/industries` + topology focus |
| `G P` | Go to Products chapter | `/products` + grid focus |
| `G L` | Go to Platform chapter | `/platform` + loop focus |
| `?` | Show keyboard shortcuts | Modal with all shortcuts |

**Focus ring**: 2px `--color-intelligence`, 2px offset. Never removed.

---

### Motion Tokens — Interaction Only

| Token | Value | Use |
|-------|-------|-----|
| `--interaction-fast` | `80ms` | Hover tooltip, focus ring, cursor change |
| `--interaction-normal` | `150ms` | Panel expand, side sheet, modal enter |
| `--interaction-slow` | `300ms` | Full topology transition, 3D camera move |
| `--interaction-easing` | `cubic-bezier(0.2, 0, 0.2, 1)` | All interaction motion |

**Reduced motion**: All → `0ms`. Instant state swaps.

---

### Interaction Audit Checklist

- [ ] Every hover reveals new semantic information (not just style)
- [ ] Every scroll event activates intelligence (IntersectionObserver)
- [ ] Cursor always system native (default/pointer/crosshair/grab/zoom-in/not-allowed)
- [ ] Every click transforms state in place (no abrupt navigation for concepts)
- [ ] Full keyboard operability (Tab, Enter, Arrows, Esc, shortcuts)
- [ ] Focus ring = intelligence blue, 2px, never removed
- [ ] All motion respects `prefers-reduced-motion: reduce`
- [ ] No custom cursors, trails, magnetic effects, ripples
- [ ] Deep links = `pushState` + scroll to section + highlight
- [ ] Print = all expanded states visible, no interactive elements

---

## DNA 11 — Interaction Language

> **Hover explains. Never decorates.**
>
> **Scroll reveals. Never entertains.**
>
> **Cursor influences. Never distracts.**
>
> **Clicks transform. Never navigate abruptly.**

---

### The Interaction Philosophy

| Principle | Meaning |
|-----------|---------|
| **Explanation > Decoration** | Every hover = new information. No color shifts for "delight." |
| **Revelation > Animation** | Scroll = intelligence activating. No parallax for beauty. |
| **Influence > Distraction** | Cursor = probe into the system. No custom cursors, no trails. |
| **Transformation > Navigation** | Click = state change in place. No page reloads for concepts. |

---

### Hover — Intelligence Probe

| Target | Hover Reveals | Duration | Motion |
|--------|---------------|----------|--------|
| **Loop node** | Capability name, 3 key metrics, signal types, "View specification" | 80ms | Fade + slide up 4px |
| **Topology node** | Signal list, latency budget, connector protocol, throughput | 80ms | Panel slides from node |
| **Product card** | Status badge detail, deployment model, latency tier, "Start trial" | 80ms | Elevate 2px, border → intelligence |
| **KPI metric** | 7-day sparkline, threshold lines, anomaly markers | 80ms | Tooltip at cursor |
| **Signal row** | Full protocol name, example payload, error rate, retry policy | 80ms | Inline expansion |
| **Certification badge** | Audit date, scope, expiration, "View report" | 80ms | Tooltip |
| **Primary CTA** | Destination preview (deployment calc / trial form / Slack connect) | 80ms | Preview panel |

**Never**: Color change only. Scale only. Glow only. Cursor change only.

**Rule**: Hover = `aria-expanded` + semantic tooltip. Screen reader announces new info.

---

### Scroll — Intelligence Activation

| Scroll Event | Intelligence Reveals | Implementation |
|--------------|---------------------|----------------|
| **Section enters (25%)** | Layer 2 diagram animates: nodes pulse, paths flow | `IntersectionObserver` + CSS `animation` |
| **Section at 50%** | Layer 3 evidence tables fade in, numbers count up | `IntersectionObserver` + `requestAnimationFrame` |
| **Section at 75%** | Continue CTA appears (if not already sticky) | `IntersectionObserver` |
| **Section exits (top)** | State persists — intelligence stays activated | No reset on scroll up |
| **KPI strip always visible** | Mission constants never hide | `position: sticky; top: 0` |

**Scroll-snap sections** = one concept = one intelligence activation.

**No**: Parallax backgrounds. Fade-in text blocks. Staggered card reveals. "Scroll to explore" indicators.

---

### Cursor — System Probe

| Cursor State | When | Visual | Meaning |
|--------------|------|--------|---------|
| **Default** | Over substrate, empty space | `default` | Observing |
| **Pointer** | Over interactive intelligence (nodes, cards, CTAs, links) | `pointer` | Can activate |
| **Crosshair** | Over topology canvas, 3D scene | `crosshair` | Can inspect |
| **Grab** | Dragging topology, rotating 3D | `grab` → `grabbing` | Manipulating structure |
| **Zoom-in** | Hovering metric sparkline, signal detail | `zoom-in` | Can magnify |
| **Not-allowed** | Disabled intelligence (offline node, locked tier) | `not-allowed` | Intelligence unavailable |

**No custom cursor images. No cursor trails. No magnetic attraction. No ripple on click.**

---

### Click — State Transformation

| Target | Click Transforms | Destination |
|--------|-----------------|-------------|
| **Loop node** | Collapsed → Expanded (inline detail panel) | Same viewport |
| **Topology node** | Node → Signal flow panel (side sheet) | Same viewport |
| **Product card** | Card → Full specification (inline expand) | Same viewport |
| **Industry selector** | Closed → Open (topology + metrics) | Same viewport |
| **KPI metric** | Value → 30-day trend modal | Overlay (ESC to close) |
| **Primary CTA** | Button → Deployment calculator / Trial form / Slack connect | Modal or inline |
| **Deep link** | Page → Section scroll + highlight | Same page, scroll position |
| **Density toggle** | Dense ↔ Standard ↔ Comfortable | Instant, persists |
| **Theme toggle** | Light ↔ Dark | Instant, persists |

**Never**: Full page navigation for concept drill-down. New tab for specification. Reload for state change.

**Rule**: Click = progressive disclosure in context. `history.pushState` for deep links only.

---

### Keyboard — First-Class Intelligence Navigation

| Keys | Action | Intelligence Context |
|------|--------|---------------------|
| `Tab` / `Shift+Tab` | Navigate interactive intelligence | Loop nodes, topology, products, KPIs, CTAs |
| `Enter` / `Space` | Activate focused intelligence | Expand node, open panel, trigger CTA |
| `Arrow keys` | Navigate within intelligence cluster | Loop cycle, topology neighbors, product variants |
| `Esc` | Close expanded intelligence | Collapse panel, dismiss modal, exit 3D |
| `⌘K` | Global intelligence search | Search all concepts, specs, deployments |
| `⌘⇧D` | Toggle density | Dense / Standard / Comfortable |
| `⌘⇧T` | Toggle theme | Light / Dark |
| `G I` | Go to Industries chapter | `/industries` + topology focus |
| `G P` | Go to Products chapter | `/products` + grid focus |
| `G L` | Go to Platform chapter | `/platform` + loop focus |
| `?` | Show keyboard shortcuts | Modal with all shortcuts |

**Focus ring**: 2px `--color-intelligence`, 2px offset. Never removed.

---

### Motion Tokens — Interaction Only

| Token | Value | Use |
|-------|-------|-----|
| `--interaction-fast` | `80ms` | Hover tooltip, focus ring, cursor change |
| `--interaction-normal` | `150ms` | Panel expand, side sheet, modal enter |
| `--interaction-slow` | `300ms` | Full topology transition, 3D camera move |
| `--interaction-easing` | `cubic-bezier(0.2, 0, 0.2, 1)` | All interaction motion |

**Reduced motion**: All → `0ms`. Instant state swaps.

---

### Interaction Audit Checklist

- [ ] Every hover reveals new semantic information (not just style)
- [ ] Every scroll event activates intelligence (IntersectionObserver)
- [ ] Cursor always system native (default/pointer/crosshair/grab/zoom-in/not-allowed)
- [ ] Every click transforms state in place (no abrupt navigation for concepts)
- [ ] Full keyboard operability (Tab, Enter, Arrows, Esc, shortcuts)
- [ ] Focus ring = intelligence blue, 2px, never removed
- [ ] All motion respects `prefers-reduced-motion: reduce`
- [ ] No custom cursors, trails, magnetic effects, ripples
- [ ] Deep links = `pushState` + scroll to section + highlight
- [ ] Print = all expanded states visible, no interactive elements

---

## DNA 12 — Engineering Language

> **This is where OpenCode comes in.**
>
> **How React works. How Three works. How GSAP works. How Lenis works.**
>
> **How everything communicates.**

---

### The Engineering Philosophy

> **Code is not infrastructure. Code is intelligence made executable.**

| Principle | Rule |
|-----------|------|
| **Ownership = Isolation** | No component touches GSAP, Three, or Lenis directly. Only through contracts. |
| **Contracts > Implementation** | Define the interface first. Swap implementations without touching consumers. |
| **Single RAF Pump** | One `requestAnimationFrame` loop drives everything. GSAP, Lenis, Three sync to it. |
| **Zero Bundle Bloat** | Tree-shaking is mandatory. No dead code. No runtime framework overhead. |
| **Type-First Contracts** | All cross-boundary communication typed. No `any`. No runtime surprises. |

---

### The Architecture — Four Layers

| Layer | Responsibility | Technologies | Boundary |
|-------|----------------|--------------|----------|
| **App Layer** | Routing, state, composition | Nuxt 3, Vue 3, Pinia | Entry point |
| **Intelligence Layer** | Components, contracts, intelligence primitives | Vue 3, TypeScript, composables | `~/components/intelligence/` |
| **Motion Layer** | GSAP orchestration, ScrollTrigger, reveal system | GSAP, ScrollTrigger, custom hooks | `~/lib/motion/` |
| **Render Layer** | Three.js scenes, WebGL, particle systems | Three.js, TresJS, custom shaders | `~/lib/render/` |

**Rule**: Layers communicate ONLY through contracts. No direct imports across layers.

---

### The Contract System — Type-First Boundaries

```typescript
// ~/contracts/intelligence.ts
export interface IntelligenceNode {
  id: string
  type: 'sensor' | 'model' | 'actuator' | 'gateway'
  position: [number, number, number]
  state: 'dormant' | 'ingesting' | 'processing' | 'predicting' | 'coordinating' | 'optimizing' | 'degraded' | 'offline'
  metrics: NodeMetrics
}

// ~/contracts/motion.ts
export interface MotionContract {
  type: 'discovery' | 'sync' | 'intelligence' | 'prediction' | 'optimization' | 'evolution'
  target: string
  duration: number
  easing: string
  onComplete?: () => void
}

// ~/contracts/render.ts
export interface RenderContract {
  scene: 'intelligence' | 'topology' | 'architecture'
  camera: CameraContract
  objects: RenderObject[]
  lighting: LightingContract
}
```

**Rule**: Every cross-layer import goes through a contract. No direct `import { gsap }` in components.

---

### GSAP — The Motion Orchestrator

| Rule | Enforcement |
|------|-------------|
| **Single GSAP instance** | Centralized in `~/lib/gsap/index.ts` — one global timeline |
| **ScrollTrigger only via contract** | `useScrollReveal(contract)` hook — never direct `ScrollTrigger.create()` |
| **Timeline ownership** | Each intelligence scene owns its timeline. `useGSAPScene()` manages lifecycle. |
| **Reduced motion = kill all tweens** | `gsap.globalTimeline.timeScale(0)` + instant state |
| **No CSS animations** | GSAP owns all motion. CSS transitions = 0. |

```typescript
// ~/lib/motion/useGSAPScene.ts
export function useGSAPScene(config: SceneConfig) {
  const timeline = gsap.timeline({ paused: true })
  const context = gsap.context(() => {
    // All GSAP work here — auto-cleanup on unmount
  })
  onUnmounted(() => { timeline.kill(); context.revert() })
  return { timeline, context }
}
```

---

### Lenis — The Scroll Physics Engine

| Rule | Spec |
|------|------|
| **Single Lenis instance** | App-level provider in `app.vue` — `useLenis()` consumes context |
| **Lenis drives GSAP** | `gsap.ticker.add(() => lenis.raf(time * 1000))` — single RAF pump |
| **Lenis owns scroll position** | GSAP ScrollTrigger reads `lenis.scroll` — never `window.scrollY` |
| **Section snapping** | `data-scene` elements + `SceneSnap` component = scroll-snap chapters |
| **Reduced motion** | `lerp: 1` — instant, no inertia |

```vue
<!-- app.vue -->
<VueLenis :options="{ lerp: 0.1, smoothWheel: true }">
  <NuxtLayout><NuxtPage /></NuxtLayout>
</VueLenis>

<!-- plugins/gsap.client.ts -->
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

---

### Three.js — The Render Engine

| Rule | Spec |
|------|------|
| **Scene per chapter** | `/` = Loop scene, `/industries` = Topology scene, `/technology` = Architecture scene |
| **Single renderer** | One `WebGLRenderer` reused across scenes — `renderer.setScene(scene)` |
| **Instanced rendering** | All nodes/conduits = `InstancedMesh` — 1 draw call per material |
| **LOD system** | High (≤10m): 2K tris, Mid (10-50m): 500 tris, Low (>50m): 50 tris |
| **Procedural materials** | Zero textures. All 6 materials = shader uniforms only. |
| **CSS3D overlay** | Layer 3 (Meaning) = `CSS3DRenderer` — never in WebGL space |

```typescript
// ~/lib/render/SceneRegistry.ts
export const sceneRegistry = {
  home: () => import('./scenes/LoopScene'),
  industries: () => import('./scenes/TopologyScene'),
  technology: () => import('./scenes/ArchitectureScene'),
} as const
```

---

### Communication Protocols — How Layers Talk

| From → To | Protocol | Example |
|-----------|----------|---------|
| **App → Intelligence** | Vue props + composables | `<IntelligenceLoop :density="density" />` |
| **Intelligence → Motion** | Contract hooks | `useScrollReveal({ type: 'discovery', target: 'loop-node' })` |
| **Motion → Render** | Event bus (typed) | `renderBus.emit('camera:push', { target: nodeId })` |
| **Render → Intelligence** | Callback props | `<ThreeScene @node-activated="onNodeActivated" />` |
| **Scroll → All** | Lenis scroll event | `lenis.on('scroll', (e) => { intelligenceBus.emit('scroll', e) })` |

**Rule**: No direct method calls across layers. Only contracts, events, and props.

---

### Component Ownership Rules

| Layer | Owns | Cannot Touch |
|-------|------|--------------|
| **App** | Routing, providers, global state | GSAP, Three, Lenis directly |
| **Intelligence** | Components, hooks, contracts, intelligence logic | GSAP internals, Three.js, Lenis internals |
| **Motion** | GSAP timelines, ScrollTrigger, reveal system, camera moves | Vue components, Three.js scenes, Lenis instance |
| **Render** | Three.js scenes, shaders, geometries, materials, camera | GSAP, Vue state, Lenis |

**Enforcement**: ESLint rule `svara/layer-boundaries` — flags cross-layer imports.

---

### Build & Runtime Contracts

| Contract | Spec |
|----------|------|
| **Bundle budget** | JS ≤ 80KB gz, CSS ≤ 15KB gz, 3D ≤ 200KB gz, Fonts ≤ 50KB gz |
| **Tree-shaking** | All layers ESM. No side effects. `sideEffects: false` in package.json |
| **TypeScript strict** | `strict: true`, `noImplicitAny: true`, `noUncheckedIndexedAccess: true` |
| **No runtime deps** | GSAP, Three, Lenis = vendored. No `node_modules` at runtime for core. |
| **CSP compliant** | No `eval`, no `new Function`, no inline scripts. Nonces for styles. |

---

### Engineering Audit Checklist

- [ ] Zero direct `import { gsap }` / `import * as THREE` / `import { lenis }` in components
- [ ] All cross-layer communication via contracts (typed interfaces)
- [ ] Single GSAP instance, single Lenis instance, single Three renderer
- [ ] GSAP ScrollTrigger only via `useScrollReveal(contract)` hook
- [ ] Lenis drives GSAP ticker — single RAF pump
- [ ] Three.js: instanced rendering, LOD, procedural materials, CSS3D overlay
- [ ] TypeScript strict mode, zero `any`, zero runtime type errors
- [ ] Bundle budgets enforced in CI (JS/CSS/3D/Fonts/Total)
- [ ] ESLint `svara/layer-boundaries` passes
- [ ] Reduced motion kills GSAP, sets Lenis lerp=1, freezes Three

---

## Section 13 — Performance DNA

> **Beauty means nothing below 60 FPS.**
>
> **Everything should feel instant.**
>
> **Performance is part of the design language.**

---

### Performance Principles

| Principle | Meaning |
|-----------|---------|
| **Speed = Trust** | Enterprise buyers equate latency with competence. 100ms = broken. |
| **Instant = Intelligence** | Intelligence doesn't wait. Neither should the interface. |
| **Budget = Design** | Every feature has a frame budget. Exceed it, cut it. |
| **Measured = Managed** | No "feels fast." Only measured fast. |

---

### Frame Budget — Non-Negotiable

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Frame time** | ≤ 16.67ms (60fps) | `performance.now()` per frame |
| **Interaction latency** | ≤ 100ms (tap → visual) | EventTiming API |
| **LCP** | ≤ 2.0s | Web Vitals |
| **CLS** | ≤ 0.05 | Web Vitals |
| **INP** | ≤ 200ms | Web Vitals |
| **TTFB** | ≤ 200ms | Server timing |
| **JS bundle (gz)** | ≤ 80KB | `webpack-bundle-analyzer` |
| **CSS (gz)** | ≤ 15KB | Build output |
| **3D scene (gz)** | ≤ 200KB | GLTF + textures |
| **Fonts (gz)** | ≤ 50KB | Subset, WOFF2 only |
| **Total page (gz)** | ≤ 300KB | Lighthouse |

**CI fails** if any metric exceeds target.

---

### Loading Strategy — Intelligence First

| Phase | What Loads | Budget | User Sees |
|-------|------------|--------|-----------|
| **0. Critical** | HTML + Critical CSS + KPI strip + Loop diagram (SVG) | ≤ 50KB | Immediate — hero + KPI + loop |
| **1. Interactive** | JS router + Interaction handlers + Typography tokens | ≤ 30KB | Clickable, scrollable, searchable |
| **2. Intelligence** | Topology engine + Capability data + Product grid | ≤ 100KB | Diagrams animate, data populates |
| **3. Enhancement** | 3D scene + Charts + Export + Offline SW | ≤ 120KB | Full 3D, offline capable |

**No spinners.** Phase 0 = usable. Each phase adds intelligence.

---

### 3D Performance — 60fps on 5-Year-Old iGPU

| Technique | Spec |
|-----------|------|
| **GPU compute only** | All animation in compute shaders — zero CPU animation |
| **Instanced rendering** | 1 draw call per material (6 max) |
| **Frustum culling** | CPU-side, per-frame, < 0.1ms |
| **LOD switching** | 3 levels, distance-based, no pop |
| **Texture atlas** | 1 atlas (1024²) for all materials — procedural fallback |
| **No post-processing** | No bloom, SSAO, SSR, DOF — volumetric is material |
| **Fixed timestep** | 16.67ms frame, interpolation for display |
| **Memory budget** | ≤ 100MB GPU, ≤ 50MB JS heap |

**Fallback**: CSS-only diagrams (SVG + IntersectionObserver) when WebGL unavailable or `prefers-reduced-motion`.

---

### Network — Enterprise Grade

| Requirement | Spec |
|-------------|------|
| **HTTP/3** | Required — QUIC, 0-RTT resumption |
| **Compression** | Brotli (level 6) + Zstd fallback |
| **Caching** | `Cache-Control: immutable, max-age=31536000` for hashed assets |
| **Service Worker** | Stale-while-revalidate + offline-first for intelligence data |
| **Prefetch** | Next chapter on hover (500ms dwell) |
| **Compression dictionary** | Shared dictionary for JSON intelligence payloads |
| **Edge** | All static on CDN (Cloudflare/CloudFront), API on edge workers |

---

### JavaScript — Minimal, Measured, Modern

| Rule | Enforcement |
|------|-------------|
| **No framework runtime** | Vanilla ES modules + native Web Components |
| **No virtual DOM** | Direct DOM + `lit-html` style tagged templates (≤ 3KB) |
| **Code splitting** | Per-chapter entry points — only load chapter JS |
| **Tree shaking** | 100% — no side effects, pure ESM |
| **Polyfills** | None — modern browsers only (last 2 versions) |
| **Main thread** | ≤ 50ms total blocking time — Web Workers for compute |
| **Long tasks** | Zero > 50ms — `scheduler.yield()` for yielding |

---

### CSS — Zero Runtime, Token-Driven

| Rule | Spec |
|------|------|
| **No CSS-in-JS** | Static `.css` files only — tokens via `@property` |
| **Critical CSS** | Inlined in `<head>` — ≤ 8KB |
| **Layered cascade** | `@layer tokens, primitives, components, utilities` |
| **Container queries** | All responsive logic — no media queries in components |
| **Color-scheme** | `light dark` — browser handles inversion |
| **Font-display** | `swap` for all — fallback = system font stack |

---

### Monitoring — Continuous, Not Periodic

| Signal | Tool | Alert |
|--------|------|-------|
| **RUM** | Vercel Analytics / Cloudflare Web Analytics | p75 INP > 200ms |
| **Synthetic** | Lighthouse CI (every PR) | Any Core Web Vital fails |
| **3D FPS** | Custom `requestAnimationFrame` monitor | < 55fps for > 5s |
| **Bundle size** | `webpack-bundle-analyzer` + size-limit | Any chunk > budget |
| **API latency** | OpenTelemetry traces | p99 > 500ms |

---

### Performance Audit Checklist

- [ ] 60fps sustained on 5-year-old iGPU (Intel UHD 620 / AMD Vega 8)
- [ ] LCP ≤ 2.0s, CLS ≤ 0.05, INP ≤ 200ms
- [ ] JS bundle ≤ 80KB gz, CSS ≤ 15KB gz, 3D ≤ 200KB gz
- [ ] Critical path = HTML + CSS + SVG loop + KPI (≤ 50KB)
- [ ] No spinners — Phase 0 usable, phases enhance
- [ ] GPU compute only for 3D — zero CPU animation
- [ ] Instanced rendering ≤ 6 draw calls
- [ ] Service Worker caches intelligence data offline
- [ ] HTTP/3 + Brotli + immutable caching
- [ ] Zero long tasks (> 50ms) on main thread
- [ ] RUM alerts on INP > 200ms, FPS < 55
- [ ] Lighthouse CI on every PR — zero regressions

---

## Section 14 — Emotional DNA

> **This is the heart of SVARA.**
>
> Every visitor should experience:

### The 60-Second Journey

| Time | Emotion | Internal Monologue | Design Manifestation |
|------|---------|-------------------|---------------------|
| **0–5 sec** | **Curiosity** | "What is this?" | Hero = one sentence question. Loop diagram animates once. KPI strip live. No fluff. |
| **5–15 sec** | **Recognition** | "This isn't another AI company." | Intelligence Topology visible. Real signal counts. Real latency. Real deployments. Not marketing. |
| **15–30 sec** | **Understanding** | "I understand the problem." | Capability expandables reveal signal→model→action flow. Spec tables appear. Evidence > claims. |
| **30–45 sec** | **Confidence** | "They've thought deeply about this." | Reference architectures per industry. ROI calculators. Certifications live. Deployment tiers transparent. |
| **45–60 sec** | **Trust** | "I want to learn more." | Contact = deployment calculator + trial request + Slack connect. No "book demo" gate. |

---

### Emotional Design Rules

| Rule | Enforcement |
|------|-------------|
| **No manipulation** | No fake urgency, fake scarcity, fake social proof, fake personalization |
| **Respect intelligence** | Visitor is a peer — technical buyer, architect, CTO. Write for them. |
| **Earn trust, don't demand it** | Every claim evidenced within 1 scroll. No "trust us" without proof. |
| **Curiosity → Trust is linear** | No emotional loops. No "back to curiosity." Each second builds. |
| **60 seconds = full chapter** | One page = one emotional arc. Scroll = time. |

---

### Anti-Patterns (Delete on Sight)

| Anti-Pattern | Why It Breaks Emotional DNA |
|--------------|----------------------------|
| "Revolutionary / Game-changing / Disruptive" | Claims trust before earning it |
| "Empower your team / Unlock potential" | Vague — visitor doesn't recognize their problem |
| Countdown timers / "Only 3 spots left" | Manipulation ≠ trust |
| Chatbot popup at 3 seconds | Interrupts curiosity → recognition |
| "Book a demo" as only CTA | Gates understanding behind sales |
| Testimonials without specs | Social proof ≠ technical proof |
| Illustrations of abstract concepts | Decoration ≠ intelligence |

---

### Emotional Audit Checklist

- [ ] 0–5s: Hero answers "What is this?" in one sentence
- [ ] 5–15s: Live intelligence visible (loop, KPI, signal counts)
- [ ] 15–30s: Capability expandables + spec tables within 1 scroll
- [ ] 30–45s: Industry reference arch + ROI + certifications visible
- [ ] 45–60s: Contact = calculator + trial + Slack (no gate)
- [ ] Zero manipulative patterns in codebase
- [ ] Zero vague marketing phrases ("empower", "unlock", "seamless")
- [ ] Every claim has evidence within same viewport
- [ ] Scroll depth at 60s ≥ 80% (measured in RUM)
- [ ] "Contact sales" click-through rate > 3% from chapter pages

---

## Section 15 — The Golden Rule

> **Pin this above every monitor.**

---

### The Question

> **Don't ask, "Does this look futuristic?"**
>
> **Ask, "Does this help someone understand Enterprise Intelligence better?"**
>
> **If the answer is no, we remove it.**

---

### The Test

Every design decision — pixel, frame, word, object, interaction, second — faces one question:

| Decision | Test |
|----------|------|
| New component | Does it explain the Intelligence Loop? |
| Animation | Does it reveal signal→model→action? |
| Color use | Is it intelligence blue on active reasoning? |
| 3D object | Is it a node/strut/plate/beam/module? |
| Type choice | Does it make specs more readable? |
| Motion | Does it synchronize understanding? |
| Scroll behavior | Does it advance the chapter? |
| Content | Does it answer the chapter question? |
| Layout | Does it prioritize intelligence over decoration? |

**If any answer is "no" → Delete. Simplify. Clarify.**

---

### The Only Metric That Matters

> **Time to Understanding.**

Not time on page. Not bounce rate. Not scroll depth.

**How many seconds until a technical buyer says: "I understand what SVARA does and why it matters."**

Target: **≤ 45 seconds.**

---

### Governance

| Role | Responsibility |
|------|----------------|
| **Designer** | Every Figma frame passes the Golden Rule test |
| **Engineer** | Every PR includes `enterpriseConcept` JSDoc + Golden Rule note |
| **Reviewer** | Rejects any change that fails the test |
| **Lead** | Weekly audit: 5 random components → do they explain? |

---

### The Consequence

> **We would rather ship less.**
>
> **We would rather ship later.**
>
> **We would rather ship nothing.**
>
> **Than ship something that doesn't help someone understand Enterprise Intelligence better.**

---

*SVARA Design Language 1.0 — July 2026*

**The Golden Rule is the only rule that matters. All other rules serve it.**