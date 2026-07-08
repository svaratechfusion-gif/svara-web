# SVARA EXPERIENCE SPECIFICATION
## 09-002 — SYSTEM OWNERSHIP MAP

**Type:** Implementation Contract
**Status:** Current

---

## Ownership Table

| # | System | Owner | Responsibility | Acceptance Criteria |
|---|--------|-------|---------------|-------------------|
| 1 | Experience Director | `MotionDirector` | Owns all motion systems, disposal on route change | No orphaned listeners on HMR. Single `dispose()` call tears down everything. |
| 2 | Scroll Language | `ScrollController` | One ScrollTrigger for the entire page. Progress 0-1. | No component creates its own ScrollTrigger. All use ScrollController. |
| 3 | Camera Language | `CameraController` | Camera position, FOV, orbit, transitions | No `camera.position` writes outside CameraController. |
| 4 | Particle Language | `ParticleEngine` | Channel-based particle simulation | GSAP writes named channels. Three.js render loop reads them. No direct GSAP → Three.js. |
| 5 | Lighting Language | `LightingLayer` | Ambient, directional, intensity, color | Lighting responds to scene progress. Configurable per scene. |
| 6 | Typography Language | `TypographyDirector` | Text generation from particles, state machine | Text state: Dormant → Generated → Focused → Supporting → Dissolved. No fade/slide/bounce. |
| 7 | Content Slots | `ContentSlot` | Scroll intersection, consistent spacing | Every page uses ContentSlot. No section has direct scroll listeners. |

---

## Ownership Rules

1. **One owner per system.** No two systems control the same property.
2. **No component self-animates.** Components declare content. The motion system drives animation.
3. **No GSAP in Vue components.** Components import nothing from `gsap` or `lenis/vue`.
4. **Channel-based communication.** Systems communicate through named channels (particle channels, progress values), never through direct method calls on another system's internal state.

---

**End of SES-09-002.**
