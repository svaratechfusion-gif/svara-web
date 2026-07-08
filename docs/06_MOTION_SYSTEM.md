# SVARA EXPERIENCE SPECIFICATION
## 06 — MOTION SYSTEM

**Type:** SES
**Status:** Source of Truth

---

## System Ownership

| System | Owner | Controls |
|--------|-------|----------|
| GSAP | `MotionDirector` | Timelines, sequencing, transitions |
| Lenis | `ScrollController` | Scroll position, velocity, inertia |
| Three.js | `WorldEngine` | Scene, renderer, camera, shaders |
| Particles | `ParticleEngine` | Particle simulation (channel-based) |
| Camera | `CameraController` | Camera position, FOV, orbit |
| Scenes | `SceneManager` | Scene transitions, range registration |

---

## Implementation Contracts

### Contract 1: Single rAF Pump
`gsap.ticker` is the only frame pump. Lenis runs `autoRaf: false`. Three.js render is called from `gsap.ticker`. No `requestAnimationFrame` calls outside `gsap.ticker`.

### Contract 2: Channel-Based Particles
GSAP tweens named scalars in `ParticleEngine`. Three.js render loop reads them. GSAP never touches Three.js objects directly. No `gsap.to(threeObject)` anywhere.

### Contract 3: One Master Timeline
`MasterTimeline` is the only scroll-scrubbed GSAP timeline. No component creates its own `ScrollTrigger` or timeline. Components register with `SceneController`.

### Contract 4: No Component Self-Animates
Components declare content. The motion system drives animation. No component imports GSAP or Lenis.

### Contract 5: Content Owns Layout
Sections define height via pacing table (`lib/experience/pacing.ts`). Scroll range derives from pacing, not DOM.

### Contract 6: No ScrollTrigger in Components
All `ScrollTrigger.create()` calls are owned by `ScrollController`. Components register with `SceneManager` instead.

---

## Camera Language

| Shot | Description | Use |
|------|-------------|-----|
| Static | No movement. Fixed position. | Arrival, scene open, settle |
| Slow Push | Gentle forward tracking. | Core formation, Reconnect |
| Orbit | Circular motion around subject. | Products, Intelligence cluster |
| Fly Through | Directed movement through space. | Scene transitions |
| Pull Back | Reverse tracking. Expands view. | Collapse, Scale reveal |
| Rise | Ascending vertical movement. | Industries landscapes |
| Cut | Instantaneous (zero ease). Zero interpolation. | Collapse midpoint only |

---

## Particle Semantics

| Behavior | Meaning | Channel |
|----------|---------|---------|
| Assemble | Data appearing | `particleBirth` |
| Connect | Data forming relationships | `particleConnect` |
| Disconnect | Data silos breaking | `particleDisconnect` |
| Reconnect | SVARA unifying data | `particleReconnect` |
| Accelerate | Urgency/discovery | `scrollEnergy` |
| Settle | Resolution, calm | `scrollDirection` (—1) |
| Orbit | Capability clusters | `productEngage` |
| Rise | Landscape forming | `industryExpand` |

---

## Typography States

| State | Description |
|-------|-------------|
| Dormant | No text visible. Particles only. |
| Generated | Particles assemble into recognizable text. |
| Focused | Text fully solid. Primary message. |
| Supporting | Text present but secondary. Smaller. |
| Dissolved | Text dissolves back into particles. |

*No fade, no slide, no bounce. Text generates from particles or dissolves back into them.*

---

## Scroll Infrastructure

- **Lenis** provides smooth scrolling with configurable lerp
- **GSAP ScrollTrigger** drives the master timeline
- **Lenis autoRaf: false** — gsap.ticker calls lenis.raf
- **Reduced motion:** lerp = 1 (instant scroll, no animation)

---

**End of SES-06.**
