# MOTION OS

## Technical motion specification. GSAP. Lenis. Three.js. Particles. Lighting. Camera. Typography. Timeline ownership.

---

## 01 — GSAP

### Single point of contact

Only `MotionDirector` imports or calls GSAP. No component, page, or scene imports GSAP directly. Components receive animation state through channels (scalar values) or props.

### Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| `gsap` (Club) | 3.15.0 | Core animation engine, timelines, ticker |
| `gsap/ScrollTrigger` | — | Scroll-linked animation registration |
| `gsap/MotionPathPlugin` | — | Particle path animation |

### Animation Tokens

All animation values come from `docs/01_BRAND/DESIGN_TOKENS.md` and `docs/01_BRAND/INTERACTION_TOKENS.md`. No magic numbers.

| Token Source | Values |
|-------------|--------|
| Duration | Animation scale (—anim-1 through —anim-10) |
| Easing | Named: power1.out, power2.out, power3.inOut, power4.out |
| Overlap | Scene transition overlap: 20% of scene duration |
| Stagger | Element stagger: 50ms between items |

### Ticker

`gsap.ticker` is the single frame pump. Three.js renders from `gsap.ticker`. Lenis runs `autoRaf: false`. No `requestAnimationFrame()` outside of `gsap.ticker`. No `useRafFn()`. No `setInterval` for animation.

---

## 02 — Lenis

### Configuration

| Property | Value | Reason |
|----------|-------|--------|
| `autoRaf` | `false` | GSAP ticker owns the render loop |
| `lerp` | `0.05` | Default smooth scroll interpolation |
| `duration` | `1.2` | Scroll duration multiplier |
| `easing` | `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))` | Custom ease |
| `orientation` | `vertical` | Vertical scroll only |
| `gestureOrientation` | `vertical` | Trackpad/mousewheel vertical only |
| `smoothWheel` | `true` | Enable smooth scroll |
| `wheelMultiplier` | `1` | No multiplier |
| `touchMultiplier` | `1` | No multiplier |

### Integration

```
gsap.ticker.add(() => {
  lenis.raf()
  renderer.render()
})
```

Lenis provides `scroll` progress to `ScrollController`. `ScrollController` publishes 0–1 progress to `MasterTimeline`.

### Reduced Motion

When `prefers-reduced-motion: reduce`:
- `lerp` = 1 (no interpolation)
- `duration` = 0.1 (near-instant)

---

## 03 — Three.js

### IntelligenceWorld

Single persistent Three.js canvas. Mounted once. Never unmounted. Persists across all scenes and pages.

| Property | Value |
|----------|-------|
| Renderer | `WebGLRenderer` with `antialias: true`, `alpha: true` |
| Tone mapping | `ACESFilmicToneMapping` |
| Tone mapping exposure | `1.0` |
| Pixel ratio | `Math.min(window.devicePixelRatio, 2)` |
| Background | Transparent (alpha) |
| Size | Full viewport. Resizes with window. |

### Render Loop

```
gsap.ticker.add(() => {
  lenis.raf()
  world.render()  // renderer.render(scene, camera)
})
```

### Scene

- Single `Scene` object. Contents change, scene does not.
- Fog: exponential fog at distance 100
- Background: transparent
- All objects added/removed through `SceneManager`

### Performance

- Max draw calls: 200
- Max geometry: 100,000 vertices
- Max textures: 50
- Max simultaneous objects: 500
- LOD for particles (distant particles decrease in count)

---

## 04 — Particles

### ParticleEngine

8-channel particle system. Each channel independently controlled.

| Property | Per Channel |
|----------|-------------|
| `count` | Number of particles (0–5000) |
| `speed` | Movement speed (0–10) |
| `opacity` | Global opacity (0–1) |
| `color` | Base color (hex) |
| `size` | Particle size (0.5–5) |
| `direction` | Movement vector (x, y, z) |
| `behavior` | Behavior mode (see below) |
| `spread` | Spatial spread (0–100) |

### Channel Map

| Channel | Represents | Default Count | Default Behavior |
|---------|-----------|---------------|------------------|
| 1 | Raw signals | 3000 | Chaotic |
| 2 | Structured data | 2000 | Flow |
| 3 | Intelligence | 1000 | Orbit |
| 4 | Predictions | 1500 | Directional |
| 5 | Actions | 500 | Burst |
| 6 | Learning | 1000 | Return |
| 7 | Connections | 800 | Line |
| 8 | Ambient | 2000 | Drift |

### Behaviors

| Behavior | Description | Parameters |
|----------|-------------|------------|
| `Chaotic` | Random movement, no pattern | speed, jitter |
| `Flow` | Organized stream along path | path, speed, spread |
| `Orbit` | Circular orbit around center | radius, speed, tilt |
| `Directional` | Movement in one direction | vector, speed |
| `Burst` | Explosive outward movement | force, spread, life |
| `Return` | Inward flow toward center | pull, speed |
| `Line` | Connected particle lines | maxDistance, opacity |
| `Drift` | Slow ambient movement | speed, variance |

### Performance Limits

- Total particles across all channels: 10,000 max
- Per-channel max: 5,000
- LOD: particles at distance > 50 reduce count by 50%
- Off-screen channels pause (not destroy)
- Particle size capped at 5px to avoid overdraw

---

## 05 — Lighting

### LightingLayer

All scene lighting controlled through `LightingLayer`. No component adds lights directly.

| Property | Control |
|----------|---------|
| Ambient | Global ambient light intensity (0–1) |
| Directional | Main directional light angle + intensity |
| Point | Secondary point lights (max 3) |
| Rim | Rim light for edge definition |
| Hemisphere | Sky/ground color gradient |

### Scene Lighting Config

| Scene | Ambient | Directional | Point | Rim |
|-------|---------|-------------|-------|-----|
| 01 — The Category | 0.15 | 0.3 | 0 | 0.1 |
| 02 — The Problem | 0.05 | 0.1 | 0 | 0 |
| 03 — The Framework | 0.4 | 0.5 | 0.2 | 0.3 |
| 04 — The Platform | 0.8 | 0.7 | 0.4 | 0.5 |
| 05 — Capabilities | 0.65 | 0.6 | 0.3 | 0.4 |
| 06 — Proof | 0.5 | 0.5 | 0.2 | 0.3 |
| 07 — Future | 0.35 | 0.4 | 0.1 | 0.2 |
| 08 — Invitation | 0.3 | 0.35 | 0.1 | 0.15 |

### Transition

Lighting blends over 800ms between scenes. GSAP tween on all light intensity values simultaneously.

---

## 06 — Camera

### CameraController

Only `CameraController` positions, animates, or configures the camera. No component touches `camera.position`, `camera.lookAt`, `camera.fov`, or `camera.rotation` directly.

### Camera Setup

| Property | Value |
|----------|-------|
| Type | PerspectiveCamera |
| FOV | 45° (default) |
| Near | 0.1 |
| Far | 1000 |
| Position (default) | (0, 0, 20) |
| LookAt (default) | (0, 0, 0) |

### Camera Shots

| Shot | Position | LookAt | Duration | Easing |
|------|----------|--------|----------|--------|
| Static | (0, 0, 20) | (0, 0, 0) | — | — |
| Pull Back | (0, 0, 20) → (0, 0, 40) | (0, 0, 0) | 2000ms | power2.out |
| Orbit | Circular r=20, y=0–5 | (0, 0, 0) | scene duration | linear |
| Fly Through | Path through 9 nodes | next node | 3000ms per node | power2.inOut |
| Rise | (0, -10, 30) → (0, 20, 40) | (0, 0, 0) | 4000ms | power2.out |

### Scene Camera Mapping

| Scene | Shot | Duration | Transition From Previous |
|-------|------|----------|------------------------|
| 01 | Static | scene start | None (cold boot) |
| 02 | Pull Back | 2000ms | Cut at scene boundary |
| 03 | Orbit | 15000ms | Match cut from Pull Back apex |
| 04 | Static | scene duration | Blend from orbit end |
| 05 | Fly Through | 13000ms | Cut at scene boundary |
| 06 | Rise | 10000ms | Blend from Fly Through end |
| 07 | Pull Back | 7000ms | Continue Rise trajectory outward |
| 08 | Static | scene end | Blend from Pull Back apex |

---

## 07 — Typography

### TypographyDirector

All text animation flows through `TypographyDirector`. 5 states.

| State | Description | Duration | Easing |
|-------|-------------|----------|--------|
| `enter` | Text appears from particles | 1000ms | power2.out |
| `exit` | Text dissolves to particles | 800ms | power2.in |
| `emphasis` | Key word or phrase highlights | 500ms | power1.out |
| `rest` | Idle state after animation | — | — |
| `emergency` | Urgent transition (immediate) | 200ms | power4.out |

### State Transitions

```
enter → emphasis → rest → exit
```

Text enters. Key words emphasize. Text rests. Text exits. No other sequence.

### Text Generation

Text is generated from particles. Characters form as particles converge into letter shapes. Characters dissolve as particles diverge away.

| Property | Value |
|----------|-------|
| Particles per character | 50 |
| Convergence spread | 20 units |
| Character spacing | Geist Sans metrics |
| Line height | 1.2 (single line), 1.5 (multi-line) |

### Text Visibility

All scene text exists in DOM (for screen readers) and in canvas (for particle generation). Canvas text is `aria-hidden="true"`.

---

## 08 — Timeline Ownership

### Ownership Map

| Component | Owns | No Other Component May |
|-----------|------|----------------------|
| `MotionDirector` | GSAP, all `gsap.to()`/`gsap.from()`/`gsap.timeline()` | Import or call GSAP |
| `ScrollController` | ScrollTrigger instances | Create ScrollTrigger, call ScrollTrigger.create/refresh/update |
| `CameraController` | Camera position, rotation, FOV | Access camera.position, camera.lookAt, camera.fov, camera.rotation |
| `MasterTimeline` | Homepage scene coordination | Create parallel timelines |
| `SceneManager` | Scene lifecycle, object add/remove | Add or remove scene objects directly |
| `ParticleEngine` | All particle state | Create particle geometries |
| `LightingLayer` | All lights | Add or modify scene lights |
| `TypographyDirector` | All particle-based text | Generate text from particles |
| `ProductDirector` | Product visualization | Render product data as 3D |
| `gsap.ticker` | Render loop | requestAnimationFrame, setInterval for animation |

### Conflict Resolution

If two components attempt to animate the same property, the component listed higher in the ownership map wins. If ownership is ambiguous, the task is blocked until `EXECUTION_OS` contract resolves it.

### Rule

**No two systems animate the same property. No two components fight over the same transform.**
