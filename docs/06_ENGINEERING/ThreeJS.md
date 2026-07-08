# Three.js Engineering

**Business:** One persistent 3D world powers the entire homepage experience.
**User:** (transparent — rendered output is the experience)
**Owner:** `IntelligenceWorld.vue` + `lib/experience/`
**Acceptance:** Single canvas. No flicker on scroll. Disposes on route change.

---

## Architecture

| Component | Responsibility |
|-----------|---------------|
| `IntelligenceWorld.vue` | Scene, renderer, camera, mount lifecycle |
| `WorldAtmosphere.vue` | Background effects, fog |
| `BirthSequence.vue` | Boot animation (time-based, pre-scroll) |
| `CameraController` | Camera position, FOV, orbit |
| `ParticleEngine` | Particle simulation (channel-driven) |
| `LightingLayer` | Ambient/directional light control |

## Constraints

| Constraint | Rule |
|------------|------|
| Single canvas | One `canvas` element for entire experience |
| No SSR | `<ClientOnly>` wraps all Three.js components |
| Particle cap | 50k desktop, 10k mobile |
| No direct GSAP → Three.js | Channel-based communication via `ParticleEngine` |
| Dispose on route change | `MotionDirector.dispose()` kills all listeners |
