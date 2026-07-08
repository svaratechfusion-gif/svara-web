# SVARA EXPERIENCE BIBLE
## Document 004 — Homepage Blueprint

**Status:** Approved
**Owner:** SVARA + OpenCode

---

## 1.0 Purpose

SVARA sells **Enterprise Intelligence Infrastructure**. Everything else — products, industries, case studies — is evidence of the category.

The homepage is not a product showcase. It is a category introduction. A first-time visitor must understand, within one scroll-through:

1. Enterprise Intelligence Infrastructure is a new category.
2. Data fragmentation created it. Fragmentation — not scarcity — is the real crisis.
3. Sense → Think → Simulate → Operate → Grow is the framework for the category.
4. SVARA is the infrastructure that delivers the framework.
5. The category is real at enterprise scale.

---

## 2.0 Scenes

| # | Scene | Emotion | Question | Scroll % | Duration |
|---|-------|---------|----------|----------|----------|
| 1 | The Category | Curiosity | What is Enterprise Intelligence Infrastructure? | 0–15% | 15s |
| 2 | The Problem | Concern | Why does it matter? | 15–35% | 20s |
| 3 | The Framework | Understanding | How do we solve it? | 35–50% | 15s |
| 4 | The Platform | Relief | Who builds it? | 50–62% | 12s |
| 5 | Capabilities | Confidence | What can it do? | 62–75% | 13s |
| 6 | Proof | Trust | Does it work? | 75–85% | 10s |
| 7 | Future | Inspiration | Where is this going? | 85–92% | 7s |
| 8 | Invitation | Action | What now? | 92–100% | 8s |

---

## 3.0 Narrative Arc

```
Act 1 — Category (Scenes 1–2)
  Scene 1: Name the category. Enterprise Intelligence Infrastructure.
  Scene 2: Validate the pain that created it.

Act 2 — Framework (Scene 3)
  Scene 3: Teach the mental model. Sense → Think → Predict → Act → Learn.

Act 3 — Evidence (Scenes 4–6)
  Scene 4: Reveal the platform that delivers it.
  Scene 5: Capabilities prove the category is real.
  Scene 6: Enterprise-scale proof.

Act 4 — Horizon (Scenes 7–8)
  Scene 7: Paint the vision.
  Scene 8: Extend the invitation.
```

**Navigation visibility:** Hidden during Act 1 (Scenes 1–2). Appears at Scene 3 — the Framework reveal.

**SVARA branding:** First appears at Scene 4 — The Platform. No brand mark before the platform reveal.

**SVARA branding:** First appears at Scene 4 — The Platform. No brand mark before the platform reveal.

---

## 4.0 Technical Architecture

| System | Responsibility |
|--------|---------------|
| `IntelligenceWorld.vue` | Single persistent Three.js canvas |
| `SceneManager` | Scene lifecycle and scroll range registration |
| `ScrollController` | Single ScrollTrigger, publishes 0-1 progress |
| `MasterTimeline` | Single scroll-scrubbed timeline |
| `CameraController` | All camera position and movement |
| `ParticleEngine` | Channel-based particle simulation |
| `LightingLayer` | Scene-dependent lighting intensity |
| `TypographyDirector` | Text generation from particles (5 states) |

---

## 5.0 Content (Per Scene)

| Scene | On-Screen Text | Notes |
|-------|---------------|-------|
| 1 | "Enterprise Intelligence Infrastructure." | Category name. Generates from particles. |
| 2 | "Data is everywhere. Intelligence is nowhere." | Problem statement. Text dissolves to fragments. |
| 3 | "Sense. Think. Predict. Act. Learn." | Framework as flowing chain. Nav becomes visible. |
| 4 | "SVARA." | Brand appears. Platform settles. |
| 5 | Vision AI. Drone AI. Edge AI. AI Agents. Digital Twin. Business Cloud. AI OS. Command Center. Growth Intelligence. | Products orbit as capability evidence. No feature details. |
| 6 | Industry terrain labels | Evidence of breadth. |
| 7 | None | Scale felt visually, not described. |
| 8 | "Engineering The Intelligence Layer Of Tomorrow." | Final headline + CTA. World settles. |

---

## 6.0 Camera Language

| Scene | Shot | Description |
|-------|------|-------------|
| 1 | Static | Fixed position. Category name forms. |
| 2 | Pull Back | Expanding view. System fragments into silos. |
| 3 | Orbit | Circular motion along the framework flow. |
| 4 | Static | Camera stops. Infrastructure settles. |
| 5 | Fly Through | Directed flight between capability nodes. |
| 6 | Rise | Ascending through industry landscapes. |
| 7 | Pull Back | Full pull back to enterprise scale horizon. |
| 8 | Static | Settles. Holds. |

---

## 7.0 Lighting

| Scene | Intensity | Color |
|-------|-----------|-------|
| 1 — The Category | 15% | Neutral |
| 2 — The Problem | 5% | Cool (darkest) |
| 3 — The Framework | 40% | Warm |
| 4 — The Platform | 80% | Warm (peak) |
| 5 — Capabilities | 65% | Neutral |
| 6 — Proof | 50% | Warm |
| 7 — Future | 35% | Neutral |
| 8 — Invitation | 30% | Neutral |

---

## 8.0 Accessibility

- Reduced motion: Lenis lerp = 1, no GSAP tweens, no Three.js animation
- All scene text in DOM (not canvas) for screen readers
- `aria-hidden="true"` on canvas world
- Skip-to-content link
- Focus management on CTA

---

## 9.0 Acceptance

The homepage succeeds when a first-time visitor can state all five outcomes after one scroll-through:

1. "Enterprise Intelligence Infrastructure is a category."
2. "Data fragmentation is the problem it solves."
3. "Sense → Think → Simulate → Operate → Grow is the framework."
4. "SVARA is the infrastructure."
5. "It works across industries at scale."

Measured by:
- Average engagement time
- Scroll completion rate
- CTA conversion
- User interview: "What did you learn?"

---

**End of Document 004 — Homepage Blueprint. This is the single source of truth for the homepage experience.**
