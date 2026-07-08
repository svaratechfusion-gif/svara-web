# MOTION SYSTEM

**Version:** 2.0 | **Status:** Approved | **Owner:** Engineering Team | **Review Date:** 2026-10-08
**Dependencies:** 006_EXPERIENCE_OS.md, 014_HOMEPAGE_BLUEPRINT.md | **Related:** 005_UX_OS.md, 008_ENGINEERING_SYSTEM.md

---

## TL;DR

Every motion on SVARA communicates a concept. No animation is decorative. Motion is evidence — of connection, fragmentation, intelligence, scale, and resolution. The Motion System is the technical specification for how that happens across camera, particles, lighting, typography, scroll, mouse, timeline, scene ownership, performance, and interaction.

This document overrides 007_MOTION_OS.md v1.0 in its entirety.

---

## 01 — Camera

### Controller Ownership

Only `CameraController` positions, animates, or configures the camera. No component touches `camera.position`, `camera.lookAt`, `camera.fov`, or `camera.rotation` directly. No scene component calls methods on the camera object.

### Setup

| Property | Value |
|----------|-------|
| Type | PerspectiveCamera |
| FOV | 45° (default) |
| Near | 0.1 |
| Far | 1000 |
| Position (default) | (0, 0, 20) |
| LookAt (default) | (0, 0, 0) |

### Shot Types

Five shot types. Each has a narrative meaning. No camera movement without narrative reason.

| Shot | Movement | Narrative Meaning | Default Duration | Easing |
|------|----------|-------------------|------------------|--------|
| **Static** | None | "This is the truth. Absorb it." | Scene duration | — |
| **Pull Back** | Camera widens from subject | "See the bigger picture." | 2000ms | power2.out |
| **Orbit** | Circular around subject | "Understand the relationship." | Scene duration | power4.out (scroll-scrubbed) |
| **Fly Through** | Directed path through nodes | "Explore the possibilities." | 3000ms per node | power2.inOut |
| **Rise** | Ascending vertical | "See the scale." | 4000ms | power2.out |

### Scene Mapping

| Scene | Shot | Camera Position | Transition | Duration |
|-------|------|-----------------|------------|----------|
| 01 — Category | Static | (0, 0, 10) | None (cold boot) | 15s |
| 02 — Problem | Pull Back | (0, 0, 10) → (0, 0, 18) | Cut at 15% scroll | 20s |
| 03 — Framework | Orbit | Circle r=12, y=0–5 | Match cut from Pull Back apex | 15s |
| 04 — Platform | Static | (0, 0, 10) | Blend from orbit end (1500ms) | 12s |
| 05 — Capabilities | Fly Through | 9-node path | Cut at 62% scroll | 13s |
| 06 — Proof | Rise | (0, -5, 12) → (0, 10, 12) | Blend from Fly Through end | 10s |
| 07 — Future | Pull Back | (0, 10, 12) → (0, 5, 25) | Continue Rise trajectory outward | 7s |
| 08 — Invitation | Static | (0, 5, 15) | Blend from Pull Back apex | 8s |

### Camera Transition Rules

- Camera position changes ONLY at scene boundaries, never mid-scene
- Scene transitions: 1500ms, power4.out, scroll-scrubbed
- Camera blends between shots use lookAt(0,0,0) as consistent target
- No camera rotation (pitch/yaw/roll) unless specified per scene
- `prefers-reduced-motion: reduce` snaps camera to each scene waypoint with 200ms fade, no interpolation

### Animation Method

```
gsap.to(camera.position, {
  x: targetX,
  y: targetY,
  z: targetZ,
  duration: 1.5,
  ease: "power4.out",
  scrollTrigger: { trigger, start, end, scrub }
})
```

---

## 02 — Particles

### ParticleEngine

8-channel particle system. Each channel independently controlled. Total particles across all channels: 10,000 max.

| Property | Per Channel | Range |
|----------|-------------|-------|
| `count` | Number of active particles | 0–5000 |
| `behavior` | Movement mode | 8 modes |
| `speed` | Movement speed | 0–10 |
| `opacity` | Global opacity | 0–1 |
| `color` | Base hex color | Any |
| `size` | Particle size | 0.5–5 |
| `direction` | Movement vector | (x, y, z) |
| `spread` | Spatial spread | 0–100 |

### Channel Configuration by Scene

| Channel | Scene | Behavior | Count | Speed | Opacity | Color | Size | Direction | Spread |
|---------|-------|----------|-------|-------|---------|-------|------|-----------|--------|
| 1 | 01 — Category | Flow-to-center | 2000 | 0.3 | 0.4 | #6C7A89 | 2 | Inward | Wide |
| 2 | 02 — Problem | Fragmented | 2000 | 0.6 | 0.3 | #3B4A5A | 3 | Random | Extreme |
| 3 | 03 — Framework | Pathed-chain | 2000 | 0.4 | 0.5 | #D4A574 | 2 | Sequential | Narrow |
| 4 | 04 — Platform | Stable-ambient | 1500 | 0.2 | 0.6 | #C9A96E | 2 | Gentle orbit | Minimal |
| 5 | 05 — Capabilities | Orbital-nodes | 1500 | 0.5 | 0.5 | #8BA1B5 | 3 | Radial orbits | Medium |
| 6 | 06 — Proof | Terrain-flow | 500 | 0.3 | 0.4 | #7A9B7E | 1 | Horizontal sweep | Wide |
| 7 | 07 — Future | Grid-pulse | 500 | 0.2 | 0.3 | #9BA4B5 | 1 | Grid-aligned | Full |
| 8 | 08 — Invitation | Ambient-drift | 500 | 0.1 | 0.2 | #A0A0A0 | 1 | Random | Gentle |

### Behaviors

| Behavior | Description | Parameters | Visual Purpose |
|----------|-------------|------------|----------------|
| `flow-to-center` | Particles converge inward to a central point | pull, speed, spread | Assembling intelligence from chaos |
| `fragmented` | Particles move independently with no coordination | speed, jitter, variance | Intelligence silos, broken system |
| `pathed-chain` | Particles follow a sequential path through waypoints | path, speed, spread, stagger | The five-stage Intelligence Loop |
| `stable-ambient` | Particles drift gently in a contained area | speed, bounds, gentleness | Order, resolution, the settled platform |
| `orbital-nodes` | Particles orbit around distinct center points | radius, speed, tilt, count | Products orbiting infrastructure |
| `terrain-flow` | Particles move in horizontal sweeps with elevation | sweep, height, speed | Industry landscapes, breadth of application |
| `grid-pulse` | Particles align to grid and pulse in sequence | gridSize, pulseSpeed, phase | Connected world, future state |
| `ambient-drift` | Minimal slow movement with no goal | speed, variance, life | Calm, completion, invitation to act |

### Behavior Transition

Particles persist across scenes — channel configurations change, particles do not reset. Transitions blend over 600ms, power2.inOut.

### Performance Rules

- Total particles: 10,000 max (across all 8 channels)
- Per-channel max: 5,000
- Mobile (< 768px): cap total at 5,000
- LOD: particles at distance > 50 reduce count by 50%
- Off-screen channels pause (state preserved, not destroyed)
- Particle size capped at 5px to prevent overdraw
- Max draw calls: 200
- Max geometry: 100,000 vertices

### Implementation

Particles use `Points` with `BufferGeometry`. Positions updated in `onBeforeRender` via `gsap.ticker`. No `requestAnimationFrame`.

---

## 03 — Lighting

### Controller Ownership

All scene lighting controlled through `LightingLayer`. No component adds or modifies lights directly. No component accesses Three.js `Light` objects.

### Light Types

| Light | Purpose | Max Count |
|-------|---------|-----------|
| Ambient | Global base illumination | 1 |
| Directional | Primary direction + shadow definition | 1 |
| Hemisphere | Sky/ground color gradient | 1 |
| Rim | Edge definition for 3D forms | 1 |
| Point | Secondary accent highlights | 3 |

### Scene Lighting Config

| Scene | Ambient | Directional | Point | Rim | Hemisphere | Visual Effect |
|-------|---------|-------------|-------|-----|------------|---------------|
| 01 — Category | 0.15 | 0.3, 45° | 0 | 0.1 | #1a1a2e / #0f0f1a | Void emerging. Just enough light to see the core form. |
| 02 — Problem | 0.05 | 0.1, 30° | 0 | 0 | #0a0a14 / #050510 | Darkest scene. Crisis. Fragmentation is serious. |
| 03 — Framework | 0.4 | 0.5, 60° | 0.2 | 0.3 | #2a1f0e / #1a150a | Warm amber. Understanding brings light. |
| 04 — Platform | 0.8 | 0.7, 45° | 0.4 | 0.5 | #3a2a10 / #1a150a | Peak brightness. Relief. The answer arrives. |
| 05 — Capabilities | 0.65 | 0.6, 30° | 0.3 | 0.4 | #1a2a3a / #0f1a2a | Neutral bright. Exploration of what exists. |
| 06 — Proof | 0.5 | 0.5, 45° | 0.2 | 0.3 | #1a2a1a / #0f1a0f | Steady warm. Trust without spectacle. |
| 07 — Future | 0.35 | 0.4, 60° | 0.1 | 0.2 | #1a1a2a / #0f0f1a | Soft neutral. Contemplation. The future is calm. |
| 08 — Invitation | 0.3 | 0.35, 45° | 0.1 | 0.15 | #1a1a1a / #0f0f0f | Calm resolution. Journey complete. |

### Lighting Arc

The lighting tells its own story independent of the camera and particles:

```
Scene 01: 15%  — Beginning. Unknown.
Scene 02: 5%   — Crisis. Darkest point.
Scene 03: 40%  — Hope. Understanding brings warmth.
Scene 04: 80%  — Relief. Brightest point.
Scene 05: 65%  — Exploration. Bright but neutral.
Scene 06: 50%  — Trust. Warm confidence.
Scene 07: 35%  — Contemplation. Soft future.
Scene 08: 30%  — Resolution. Calm completion.
```

### Transition

Lighting blends over 800ms between scenes. GSAP tween on all light intensity values simultaneously.

```
gsap.to(lightValues, {
  ambient: 0.8,
  directional: 0.7,
  duration: 0.8,
  ease: "power2.inOut"
})
```

---

## 04 — Typography

### Controller Ownership

All text animation flows through `TypographyDirector`. No scene component animates text directly. Scenes pass text content and state; TypographyDirector handles the particle-to-character transition.

### Text States

| State | Description | Duration | Easing | Trigger |
|-------|-------------|----------|--------|---------|
| `enter` | Text appears — particles converge into letter shapes | 1000ms | power2.out | Scene becomes active |
| `emphasis` | Key word or phrase highlights (pulse, glow, or scale) | 500ms | power1.out | 300ms after enter completes |
| `rest` | Idle state — text is fully formed, particles gently orbit characters | — | — | 500ms after emphasis completes |
| `exit` | Text dissolves — particles diverge away from letter shapes | 800ms | power2.in | Scene becomes inactive |
| `emergency` | Immediate text swap — particles snap to new positions | 200ms | power4.out | Urgent scene transition |

### State Machine

```
inactive → enter → emphasis → rest → exit → inactive
```

Text enters. Key words emphasize. Text rests. Text exits. No other sequence. Emergency overrides from any state.

### Scene Text Content

| Scene | Text | Characters | State Duration |
|-------|------|------------|----------------|
| 01 | "Enterprise Intelligence Infrastructure" | 42 | enter 1s → emphasis 0.5s → rest 13.5s |
| 02 | "Data is everywhere. Intelligence is nowhere." | 53 | enter 1s → rest 19s |
| 03 | "Sense. Think. Predict. Act. Learn." | 37 | enter 1s → emphasis 0.5s per word → rest 8s |
| 04 | "SVARA" | 5 | enter 1s → rest 11s |
| 05 | 9 product names | Varies | enter 1s per name → rest 12s |
| 06 | 12 industry names | Varies | enter 1s per name → rest 8s |
| 07 | (no text) | 0 | — |
| 08 | "Engineering The Intelligence Layer Of Tomorrow" | 51 | enter 1s → rest 7s |

### Particle-to-Character System

| Property | Value |
|----------|-------|
| Particles per character | 50 |
| Convergence origin | Random within 20-unit sphere around character position |
| Character spacing | Geist Sans metrics (via canvas measureText) |
| Line height | 1.2 (single line), 1.5 (multi-line) |
| Divergence destination | Random within 25-unit sphere (scene context-appropriate) |

### DOM + Canvas Dual Rendering

All scene text exists in two places:
- **DOM**: Real text nodes, screen-reader accessible, aria-hidden="false"
- **Canvas**: Particle-generated text, aria-hidden="true"

DOM text is positioned to overlay the canvas text. DOM text is invisible (opacity 0) when canvas is active. If canvas fails to load, DOM text becomes visible (opacity 1).

### Typography Design Tokens

| Scene | Font Size (Desktop) | Weight | Leading | Tracking | Color |
|-------|-------------------|--------|---------|----------|-------|
| 01 | 7.5rem / 120px | 300 Light | 0.95 | -0.03em | #F5F5F0 |
| 02 | 4.5rem / 72px | 300 Light | 1.1 | -0.02em | #F5F5F0 |
| 03 | 5rem / 80px | 600 Semibold | 1.2 | -0.03em | #F5F5F0 |
| 04 | 8rem / 128px | 600 Semibold | 0.9 | 0 | #F5F5F0 |
| 05 | 1.25rem / 20px | 500 Medium | 1.4 | 0 | Scene-context |
| 06 | 0.875rem / 14px | 400 Regular | 1.2 | 0.05em | Scene-context |
| 07 | — | — | — | — | — |
| 08 (headline) | 3rem / 48px | 300 Light | 1.1 | -0.02em | Scene-context |
| 08 (CTA) | 1rem / 16px | 500 Medium | 1 | 0 | Scene-context |

**Mobile** (< 768px): Scene 01 = 2.5rem, Scene 02 = 1.75rem, Scene 03 = 2rem, Scene 04 = 3.5rem, Scene 05 = 1rem, Scene 08 headline = 1.5rem.

---

## 05 — Scroll

### Controller Ownership

Only `ScrollController` creates ScrollTrigger instances. No component calls `ScrollTrigger.create()`, `ScrollTrigger.refresh()`, or `ScrollTrigger.update()` directly.

### Architecture

```
User Scroll
    │
    ▼
Lenis (smooth scroll)
    │
    ▼
ScrollController (0–1 progress)
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

### Lenis Configuration

| Property | Value | Reduced Motion |
|----------|-------|----------------|
| `autoRaf` | `false` | `false` |
| `lerp` | `0.05` | `1` (no smoothing) |
| `duration` | `1.2` | `0.1` (near-instant) |
| `easing` | `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))` | Linear |
| `orientation` | vertical | vertical |
| `smoothWheel` | true | false |
| `wheelMultiplier` | 1 | 1 |
| `touchMultiplier` | 1 | 1 |

### Lenis Integration

```
gsap.ticker.add(() => {
  lenis.raf()
  renderer.render()
})
```

`gsap.ticker` is the single frame pump. No `requestAnimationFrame()` outside of `gsap.ticker`. No `useRafFn()`. No `setInterval` for animation.

### ScrollController

| Method | Returns | Description |
|--------|---------|-------------|
| `getProgress()` | 0–1 | Current scroll progress across the entire experience |
| `getVelocity()` | pixels/s | Current scroll velocity |
| `getDirection()` | "up" | "down" | Current scroll direction |
| `getSceneProgress(sceneIndex)` | 0–1 | Progress within a specific scene |
| `onSceneChange(callback)` | void | Fires when scene index changes |

### Scene Scroll Boundaries

| Scene | Scroll Range | Total Height |
|-------|-------------|--------------|
| 01 — Category | 0–15% | 15svh |
| 02 — Problem | 15–35% | 20svh |
| 03 — Framework | 35–50% | 15svh |
| 04 — Platform | 50–62% | 12svh |
| 05 — Capabilities | 62–75% | 13svh |
| 06 — Proof | 75–85% | 10svh |
| 07 — Future | 85–92% | 7svh |
| 08 — Invitation | 92–100% | 8svh |
| Visual tail | 100%+ | 100svh (scroll silence for footer) |

**Total scroll height: 200svh** (100svh scenes + 100svh tail).

### Scene Transition Mechanics

- Each transition begins when the next scene reaches 40% of viewport
- Transitions overlap by 20% of the scene duration
- Particles persist across transitions (channel configurations change, particles do not reset)
- Camera position changes only at scene boundaries
- Lighting blends over 800ms between scenes

### MasterTimeline

Single scroll-scrubbed timeline that coordinates all scene transitions. Created once, never recreated. All scene animations are children of this timeline.

- Timeline is pinned to the full experience height via ScrollTrigger
- Scene markers at 0%, 15%, 35%, 50%, 62%, 75%, 85%, 92%, 100%
- Each marker triggers scene enter/exit, camera move, lighting blend, particle transition
- No two animations target the same property

---

## 06 — Mouse

### Controller Ownership

Mouse input is captured by `ScrollController` (for cursor position) and distributed as read-only signals. No component attaches `mousemove` listeners directly.

### Mouse Signals

| Signal | Range | Description |
|--------|-------|-------------|
| `cursorX` | -1 to 1 | Normalized horizontal cursor position |
| `cursorY` | -1 to 1 | Normalized vertical cursor position |
| `cursorSpeed` | 0–1 | Normalized cursor movement speed |

### Per-Scene Mouse Effects

| Scene | Mouse Effect | Intensity | Description |
|-------|-------------|-----------|-------------|
| 01 — Category | Particle direction influence | 0.3 | Mouse movement subtly shifts particle flow direction |
| 02 — Problem | Scroll-driven only | 0 | No mouse effect. Fragmentation is revealed by scroll, not cursor. |
| 03 — Framework | Stage highlight | 0.5 | Hovering near a framework stage highlights it |
| 04 — Platform | None | 0 | Relaxed. The user breathes. |
| 05 — Capabilities | Product hover highlight | 0.7 | Hovering over a product name highlights its orbital node |
| 06 — Proof | Terrain pan | 0.4 | Mouse position shifts the terrain viewpoint slightly |
| 07 — Future | Grid ripple | 0.6 | Mouse position creates a subtle ripple across the connected grid |
| 08 — Invitation | CTA hover | 0.8 | CTA buttons respond to hover with 200ms scale + opacity transition |

### Interaction Rules

- All mouse effects feel subtle, not controlling. The visitor influences the world, they do not steer it.
- Mouse response is capped at 200ms latency
- Mouse effects are additive to scroll-driven animation, never overriding
- On touch devices, mouse effects are disabled (no parallax, no hover)
- `prefers-reduced-motion: reduce` disables all mouse-driven animation

---

## 07 — Timeline

### Architecture

```
MasterTimeline (single, scroll-scrubbed)
    │
    ├── Scene 01 timeline (0–15%)
    │   ├── ParticleEngine: channel 1 transition
    │   ├── CameraController: static
    │   └── TypographyDirector: "Enterprise Intelligence Infrastructure"
    │
    ├── Scene 02 timeline (15–35%)
    │   ├── ParticleEngine: channel 1→2 transition
    │   ├── CameraController: pull back
    │   └── TypographyDirector: "Data is everywhere..."
    │
    ├── Scene 03 timeline (35–50%)
    │   ├── ParticleEngine: channel 2→3 transition
    │   ├── CameraController: orbit
    │   ├── TypographyDirector: "Sense. Think. Predict. Act. Learn."
    │   └── AppHeader: show nav
    │
    ├── Scene 04 timeline (50–62%)
    │   ├── ParticleEngine: channel 3→4 transition
    │   ├── CameraController: static
    │   ├── TypographyDirector: "SVARA"
    │   ├── LightingLayer: 80% peak
    │   └── BrandAppearance: first show
    │
    ├── Scene 05 timeline (62–75%)
    │   ├── ParticleEngine: channel 4→5 transition
    │   ├── CameraController: fly through
    │   └── TypographyDirector: 9 product names
    │
    ├── Scene 06 timeline (75–85%)
    │   ├── ParticleEngine: channel 5→6 transition
    │   ├── CameraController: rise
    │   └── TypographyDirector: 12 industry names
    │
    ├── Scene 07 timeline (85–92%)
    │   ├── ParticleEngine: channel 6→7 transition
    │   ├── CameraController: pull back
    │   └── (no text)
    │
    └── Scene 08 timeline (92–100%)
        ├── ParticleEngine: channel 7→8 transition
        ├── CameraController: static
        ├── TypographyDirector: "Engineering The Intelligence Layer Of Tomorrow"
        └── CTAAppearance: show Platform / Products / Contact
```

### Timeline Creation

The `MasterTimeline` is a single `gsap.timeline()`:

```typescript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".home-experience",
    start: "top top",
    end: "+=200svh",
    pin: true,
    scrub: 1.5
  }
})
```

All scene animations are `.add()` calls on this one timeline. No parallel timelines.

### Scene Timeline Structure

Each scene adds a label-based sub-timeline:

```typescript
tl.addLabel("scene-01", "0%")
  .to(camera.position, { x: 0, y: 0, z: 10, duration: 0 }, "scene-01")
  .to(particleEngine.channel(1).config, { ... }, "scene-01")
  .to(lightingLayer.config, { ambient: 0.15, ... }, "scene-01")
  // ...
```

Scene markers at: 0%, 15%, 35%, 50%, 62%, 75%, 85%, 92%, 100%.

### Rerender Handling

On window resize, `ScrollTrigger.refresh()` recalculates all scene positions. No manual timeline adjustment. SceneManager queries `ScrollTrigger` positions to determine active scene after refresh.

---

## 08 — Scene Ownership

### Ownership Map

| Component | Owns | No Other Component May |
|-----------|------|------------------------|
| `MotionDirector` | GSAP, all `gsap.to()`/`gsap.from()`/`gsap.timeline()` | Import or call GSAP directly |
| `ScrollController` | ScrollTrigger instances, scroll progress | Create ScrollTrigger, call ScrollTrigger.create/refresh/update |
| `CameraController` | Camera position, rotation, FOV, lookAt | Access camera.position, camera.lookAt, camera.fov, camera.rotation |
| `MasterTimeline` | Homepage scene coordination, label markers | Create parallel timelines |
| `SceneManager` | Scene lifecycle, active scene tracking | Add or remove scene objects directly |
| `ParticleEngine` | All particle state, BufferGeometry, Points | Create particle geometries, modify vertex positions |
| `LightingLayer` | All lights, ambient/directional/point/rim/hemisphere | Add or modify scene lights |
| `TypographyDirector` | All particle-based text, character meshes | Generate text from particles |
| `ProductDirector` | Product visualization, orbital nodes | Render product data as 3D |
| `gsap.ticker` | Render loop, single frame pump | requestAnimationFrame, setInterval for animation |
| `AppHeader` | Nav visibility, brand appearance | Show/hide nav outside AppHeader |
| `Scene01–08` | Scene-specific DOM content, overlay layout | Touch camera, lights, particles, or timeline |

### Data Flow

```
ScrollController (publish: 0–1 progress)
    │
    ▼
MasterTimeline (evaluate: scene markers)
    │
    ▼
SceneManager (emit: activeScene, sceneProgress)
    │
    ▼
CameraController (receive: sceneIndex → animate to target position)
ParticleEngine (receive: sceneIndex → transition channels)
LightingLayer (receive: sceneIndex → blend to config)
TypographyDirector (receive: sceneIndex → enter/exit text)
AppHeader (receive: sceneIndex → show/hide nav + brand)
Scene01–08 (receive: active → show/hide DOM content)
```

### Conflict Resolution

If two components attempt to animate the same property, the component higher on the ownership map wins:

1. MasterTimeline (coordinates the whole)
2. SceneManager (lifecycle decisions)
3. CameraController (spatial authority)
4. LightingLayer (visual authority)
5. ParticleEngine (particle authority)
6. TypographyDirector (text authority)
7. Scene components (DOM authority)

If ownership is ambiguous, the task is blocked until the spec resolves it. No component assumes ownership that is not explicitly granted.

### Rule

**No two systems animate the same property. No two components fight over the same transform.**

---

## 09 — Performance Budgets

### Frame Budget

| Metric | Target | Measuring Point |
|--------|--------|-----------------|
| FPS | 60 (16.67ms per frame) | During active scroll |
| FPS (mobile) | 30 (33.33ms per frame) | Devices < 768px |
| Frame budget — particles | < 4ms | Particle position updates |
| Frame budget — renderer | < 8ms | Three.js draw calls |
| Frame budget — scroll | < 2ms | Lenis + ScrollTrigger |
| Frame budget — DOM | < 2ms | Vue reactivity + layout |
| Frame budget — buffer | < 0.67ms | Headroom |

### Load Budget

| Metric | Target | Asset |
|--------|--------|-------|
| LCP | < 2.5s | Scene 01 text visible |
| FCP | < 1.5s | Page background visible |
| TBT | < 200ms | Main thread blocking |
| CLS | < 0.1 | Layout stability |
| Initial JS | < 200KB | Core experience bundle |
| Three.js | Async, deferred | IntelligenceWorld |
| Scene Vue components | Dynamic import per scene | Scene01–08 |

### Memory Budget

| Subsystem | Limit | Notes |
|-----------|-------|-------|
| Particle system | 10,000 particles × 16 bytes = 160KB | Position + color + size + velocity |
| Scene state | < 10MB | Active scene only |
| Textures | < 50 textures | Max 1024×1024 each |
| Geometry | < 100,000 vertices | Across all scene objects |
| Total | < 200MB | Heap memory |

### Draw Call Budget

| Context | Limit |
|---------|-------|
| Max draw calls | 200 |
| Max simultaneous objects | 500 |
| Particle LOD | Count reduces 50% at distance > 50 |
| Off-screen channels | Paused (state preserved, not rendering) |

### Loading Strategy

| Phase | What Loads | When | Priority |
|-------|-----------|------|----------|
| 1 — Critical | HTML, CSS (inline critical), Geist Sans (preload) | First request | Highest |
| 2 — Engine | GSAP (sync in head), Lenis (sync), Three.js (async defer) | After FCP | High |
| 3 — Scene 01 | IntelligenceWorld, Scene01.vue, ParticleEngine channel 1 | After engine ready | High |
| 4 — Preload next | Scene02.vue (preloaded) | After Scene 01 mount | Medium |
| 5 — Mid-load | Scenes 03–04 | Scroll > 25% | Medium |
| 6 — Late-load | Scenes 05–08 | Scroll > 65% | Low |

### Reduced Motion Performance

When `prefers-reduced-motion: reduce`:

- Particles: static positions, no movement loop
- Camera: snap transitions (200ms), no interpolation
- Scene transitions: 500ms crossfade, no scroll-scrubbed animation
- Particle count: 0 (all channels empty — DOM-only experience)
- JS bundle: 70KB savings (particle physics skipped)

---

## 10 — Interaction Rules

### Rule 1 — Scroll is primary. Mouse is secondary.

Scroll controls the narrative sequence. Mouse controls subtle influence. No mouse interaction overrides scroll position. No scroll interaction is optional.

### Rule 2 — Every interaction responds within 200ms.

Hit targets are 44×44px minimum. No interaction requires precision. Hover effects trigger within 100ms of cursor entering target area.

### Rule 3 — No interaction is required.

The narrative plays fully by scrolling alone. The visitor never needs to click, hover, or interact to receive the complete message. Interactions enhance — they do not gate.

### Rule 4 — Interactions are contextual.

| Context | Primary | Secondary | Disabled |
|---------|---------|-----------|----------|
| Scene 01 — Category | Scroll | Mouse → particle direction | Keyboard nav, CTA |
| Scene 02 — Problem | Scroll | None | Mouse effects |
| Scene 03 — Framework | Scroll | Hover → stage highlight | CTA |
| Scene 04 — Platform | Scroll | None | Mouse effects, hover |
| Scene 05 — Capabilities | Scroll | Hover → product node | CTA |
| Scene 06 — Proof | Scroll | Mouse → terrain pan | Hover |
| Scene 07 — Future | Scroll | Mouse → grid ripple | Hover, CTA |
| Scene 08 — Invitation | Scroll (ends) | Click → CTA, Hover → buttons | — |

### Rule 5 — Touch is a first-class input.

Touch scroll activates the same scroll-driven narrative as mouse wheel. On touch devices:

- Mouse effects disabled (no parallax, no hover-driven highlights)
- Touch targets: 44×44px minimum
- Swipe down = scroll forward. Swipe up = scroll back.
- No gesture conflicts (pinch-zoom, pull-to-refresh disabled on experience container)

### Rule 6 — Motion has meaning.

Every animation communicates a concept. If removing an animation does not reduce understanding, the animation is decoration. Decoration does not ship.

### Rule 7 — Animation is evidence, not spectacle.

- Particles prove data flows
- Camera movement proves scale
- Lighting proves transformation
- Text generation proves intelligence assembling
- If the animation does not prove something, it does not exist

### Rule 8 — Timing is proportional.

- Scene transitions: 1500ms, power4.out (scroll-scrubbed)
- Lighting blends: 800ms, power2.inOut
- Particle channel transitions: 600ms, power2.inOut
- Text enter: 1000ms, power2.out
- Text exit: 800ms, power2.in
- Text emphasis: 500ms, power1.out
- Hover response: 200ms, power2.out
- Nav show: 400ms, power2.out
- Nav hide: 300ms, power2.in
- Page transitions: 600ms, power2.inOut

### Rule 9 — Reduced motion is not reduced experience.

`prefers-reduced-motion: reduce` switches to DOM-only mode. The narrative is preserved. All text, CTAs, and scene content remain. The difference is: no particles, no camera interpolation, no scroll smoothing, no mouse effects. The experience is complete without animation.

### Rule 10 — One viewport. One message.

A viewport contains exactly one message. If a viewport contains two messages, split them. If a viewport contains zero messages, delete it. Every scroll position reveals something the visitor did not know before.
