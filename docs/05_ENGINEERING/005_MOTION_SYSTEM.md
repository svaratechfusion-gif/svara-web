# SVARA EXPERIENCE BIBLE
## Document 005 — Motion System

**Status:** Approved
**Owner:** OpenCode

---

## 1.0 System Ownership

| System | Owner | Controls |
|--------|-------|----------|
| GSAP | `MotionDirector` | All timelines, sequencing, transitions |
| Lenis | `ScrollController` | Scroll position, velocity, inertia |
| Three.js | `WorldEngine` | Scene, renderer, camera, shaders |
| Particles | `ParticleEngine` | Particle simulation (channel-based) |
| Camera | `CameraController` | Camera position, FOV, orbit |
| Scenes | `SceneManager` | Scene transitions, range registration |

---

## 2.0 Implementation Contracts

| # | Contract | Enforcement |
|---|----------|-------------|
| 1 | Single rAF pump | `gsap.ticker` is the only frame pump. No `requestAnimationFrame` outside it. |
| 2 | Channel-based particles | GSAP writes scalars. Three.js reads scalars. No direct GSAP→Three.js. |
| 3 | One master timeline | `MasterTimeline` is the only scroll-scrubbed timeline. No component creates its own. |
| 4 | No component self-animates | Components declare content. The motion system drives animation. No GSAP in Vue files. |
| 5 | Content owns layout | Section heights from pacing table. Scroll range from pacing, not DOM. |
| 6 | No ScrollTrigger in components | All triggers through `ScrollController`. Components register with `SceneManager`. |

---

## 3.0 Camera Language

| Shot | Use |
|------|-----|
| Static | Arrival, scene open, settle |
| Slow Push | Core formation, Reconnect |
| Orbit | Intelligence, Product clusters |
| Fly Through | Scene transitions, Products |
| Pull Back | Collapse, Scale reveal |
| Rise | Industries landscapes |
| Cut (zero ease) | Collapse midpoint only |

---

## 4.0 Particle Channels

| Channel | Meaning | Writer |
|---------|---------|--------|
| `particleBirth` | Data appearing | SceneDirector |
| `particleConnect` | Relationships forming | SceneDirector |
| `particleDisconnect` | Silos breaking | SceneDirector |
| `particleReconnect` | SVARA unifying | SceneDirector |
| `scrollEnergy` | Urgency / velocity | ScrollController |
| `productEngage` | Capability clusters | ProductDirector |
| `industryExpand` | Landscape formation | SceneDirector |

---

## 5.0 Typography States

| State | Description |
|-------|-------------|
| Dormant | No text visible. Particles only. |
| Generated | Particles assemble into recognizable text. |
| Focused | Text fully solid. Primary message. |
| Supporting | Text present but secondary. Smaller. |
| Dissolved | Text dissolves back into particles. |

No fade, no slide, no bounce. Text generates from particles or dissolves back into them.

---

## 6.0 Lighting Intensity

| Scene | Intensity |
|-------|-----------|
| Birth | 10% |
| Emergence | 25% |
| Intelligence | 45% |
| Collapse | 5% |
| Reconnect | 80% |
| Products | 65% |
| Industries | 50% |
| Scale | 40% |
| Invitation | 30% |

---

## 7.0 Scroll Phases

| % | Phase | Active Systems |
|---|-------|----------------|
| 0% | Birth | Camera (static), Particles (assembling) |
| 12% | Emergence | Camera (slow push), Particles (connecting) |
| 24% | Intelligence | Camera (orbit), Lighting (rising) |
| 36% | Collapse | Camera (pull back), Particles (disconnect) |
| 48% | Reconnect | Lighting (peak 80%), Particles (re-link) |
| 60% | Products | Camera (fly through), Clusters |
| 72% | Industries | Camera (rise), Landscapes |
| 84% | Scale | Camera (pull back), Grid |
| 100% | Exit | Camera (settle), Typography resolves |

---

**End of Document 005.**
