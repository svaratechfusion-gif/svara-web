# SVARA EXPERIENCE BIBLE
## Document 004 — Homepage Blueprint

**Status:** Approved
**Owner:** SVARA + OpenCode

---

## 1.0 Purpose

The homepage is a cinematic documentary about the birth of enterprise intelligence. It is not a landing page. It does not list features, products, or team members. It tells a story.

A first-time visitor must understand, within 60 seconds:
1. Enterprises generate enormous amounts of disconnected operational intelligence.
2. Fragmentation — not data scarcity — is the real problem.
3. SVARA is Enterprise Intelligence Infrastructure, not another SaaS tool.
4. SVARA's products work together as one coordinated ecosystem.
5. The company is technically credible and enterprise-focused.

---

## 2.0 Scenes

| # | Scene | Phase | Emotion | Question | Scroll % | Duration |
|---|-------|-------|---------|----------|----------|----------|
| 1 | Enterprise Reality | Birth | Curiosity | What exists? | 0-12% | 5s |
| 2 | Emergence | Emergence | Discovery | What happens when data connects? | 12-24% | 5s |
| 3 | Intelligence | Core | Wonder | What's the potential? | 24-36% | 8s |
| 4 | Collapse | Collapse | Concern | What goes wrong? | 36-48% | 10s |
| 5 | Reconnect | Reconnect | Relief | What fixes it? | 48-60% | 12s |
| 6 | Products | Products | Confidence | What does SVARA do? | 60-72% | 20s |
| 7 | Industries | Industries | Trust | Who is it for? | 72-84% | 20s |
| 8 | Scale | Scale | Respect | How big is this? | 84-92% | 15s |
| 9 | Invitation | Exit | Action | What now? | 92-100% | 3s |

---

## 3.0 Narrative Arc

```
Act 1 (Scenes 1-3): The Problem
  Scene 1 — Data exists. It's everywhere.
  Scene 2 — It connects. Patterns emerge.
  Scene 3 — It thinks. Intelligence is born.

Act 2 (Scene 4): The Crisis
  Scene 4 — It breaks. Fragmentation. Silos.

Act 3 (Scenes 5-8): The Answer
  Scene 5 — SVARA reconnects. The intelligence layer forms.
  Scene 6 — Products emerge as capabilities.
  Scene 7 — Applied across industries.
  Scene 8 — At enterprise scale.

Act 4 (Scene 9): The Invitation
  Scene 9 — Engineering The Intelligence Layer Of Tomorrow.
```

**Navigation visibility:** Hidden during Acts 1-2 (Scenes 1-4). Appears at Act 3 (Scene 5) — the SVARA reveal.

**SVARA branding:** First appears at Scene 5. No brand mark before the reconnect.

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
| 1 | None | Particles only. No text or brand. |
| 2 | None | Particles only. No text or brand. |
| 3 | "Data becomes intelligence." | First text. Generates from particles. |
| 4 | "It breaks." | Text dissolves back into particles. |
| 5 | "SVARA reconnects." | Brand mark appears. Nav unlocks. |
| 6 | Cluster labels: Sense, Think, Simulate, Operate, Grow | Product names float. No feature details. |
| 7 | Industry names | Terrain labels. |
| 8 | None | Scale felt visually, not described. |
| 9 | "Engineering The Intelligence Layer Of Tomorrow." | Final headline + CTA. World settles. |

---

## 6.0 Camera Language

| Scene | Shot | Description |
|-------|------|-------------|
| 1 | Static | Fixed position. World forms around viewer. |
| 2 | Slow Push | Gentle forward tracking into the data. |
| 3 | Orbit | Circular motion around the intelligence core. |
| 4 | Pull Back | Expanding view. System fragments. Cut at midpoint. |
| 5 | Static | Camera stops. World stabilizes. |
| 6 | Fly Through | Directed flight between product clusters. |
| 7 | Rise | Ascending through industry landscapes. |
| 8 | Pull Back | Full pull back to enterprise scale. |
| 9 | Static | Settles. Holds. |

---

## 7.0 Lighting

| Scene | Intensity | Color |
|-------|-----------|-------|
| 1 — Birth | 10% | Neutral |
| 2 — Emergence | 25% | Warm |
| 3 — Intelligence | 45% | Neutral |
| 4 — Collapse | 5% | Cool (darkest) |
| 5 — Reconnect | 80% | Warm (peak) |
| 6 — Products | 65% | Neutral |
| 7 — Industries | 50% | Warm |
| 8 — Scale | 40% | Cool |
| 9 — Invitation | 30% | Neutral |

---

## 8.0 Accessibility

- Reduced motion: Lenis lerp = 1, no GSAP tweens, no Three.js animation
- All scene text in DOM (not canvas) for screen readers
- `aria-hidden="true"` on canvas world
- Skip-to-content link
- Focus management on CTA

---

## 9.0 Acceptance

The homepage succeeds when a first-time visitor can state all five Milestone 1 outcomes after one scroll-through. Measured by:
- Average engagement time
- Scroll completion rate
- CTA conversion
- User interview: "What did you learn?"

---

**End of Document 004 — Homepage Blueprint. This is the single source of truth for the homepage experience.**
