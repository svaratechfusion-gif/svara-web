# Particle Language

**Business:** Particles are data, not decoration. Every behavior has meaning.
**User:** Read the state of the system through particle behavior.
**Owner:** `ParticleEngine` (lib/experience/)
**Acceptance:** GSAP writes scalars to named channels. Three.js render loop reads them. No direct GSAP → Three.js.

---

## Channels

| Channel | Meaning | Writer | Reader |
|---------|---------|--------|--------|
| `particleBirth` | Data appearing | SceneDirector | Render loop |
| `particleConnect` | Relationships forming | SceneDirector | Render loop |
| `particleDisconnect` | Silos breaking | SceneDirector | Render loop |
| `particleReconnect` | SVARA unifying | SceneDirector | Render loop |
| `scrollEnergy` | Urgency / discovery velocity | ScrollController | Render loop |
| `scrollDirection` | Scroll direction (1 / -1) | ScrollController | Render loop |
| `productEngage` | Capability cluster activity | ProductDirector | Render loop |
| `industryExpand` | Landscape formation | SceneDirector | Render loop |

## Rules

- Every channel is a 0-1 scalar
- Channels are independent — multiple can be active simultaneously
- No channel has side effects (writing a channel never triggers another animation)
