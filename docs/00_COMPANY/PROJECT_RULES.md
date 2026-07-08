# PROJECT RULES
## PROJECT HELIOS

> **Project codename:** Helios — the source. Everything else orbits it. See `docs/00_COMPANY/PROJECT_HELIOS.md`.

> **SVARA OS is the company's operating system.** Every asset — website, sales deck, investor deck, knowledge base, product docs — flows from this one source. See `docs/00_COMPANY/SVARA_OS.md`.

> **NORTH STAR STATEMENT.** Every engineer, every designer, every marketer must memorize this: *SVARA engineers the intelligence layer that connects fragmented enterprise systems into one continuously learning operational ecosystem.* Everything we build reinforces that sentence.

**This is law. Not guidelines. Not best practices. Law.**

---

## The Helios Principle

Every decision must answer five questions. In order. No skipping.

```
Why?
 ↓
Who?
 ↓
What?
 ↓
How?
 ↓
Measure.
```

| Question | What it demands |
|----------|----------------|
| **Why?** | What gap does this fill? Which OS document authorizes this? If no document exists, the decision does not exist. |
| **Who?** | Who owns this decision? Who is affected? Who decides when it is done? |
| **What?** | What exactly are we doing? What is in scope? What is out of scope? What does success look like? |
| **How?** | How will we execute? What is the approach? What are the dependencies? What is the timeline? |
| **Measure.** | How do we know it worked? What is the metric? What is the target? When do we measure? |

**If one question cannot be answered, stop.**

Not pause. Not defer. Stop. The missing answer must be found before any work begins.

The Helios Principle applies to every decision — architecture, design, content, product, hiring, pricing, partnership. Every single one.

---

## Mantra

> Engineer understanding, not pages.

SVARA is not a website. SVARA is an Enterprise Intelligence Experience delivered through the browser.

---

## Development Pipeline

Every feature passes through all nine stages. No shortcuts. No skipping.

```
Research
   ↓
Knowledge
   ↓
Framework
   ↓
Specification
   ↓
UX
   ↓
Engineering
   ↓
Implementation
   ↓
QA
   ↓
Release
```

| Stage | What happens | Document |
|-------|-------------|----------|
| **Research** | Identify the gap. What problem exists? Why does SVARA exist to solve it? | Company OS |
| **Knowledge** | Define what we know. Topic, terminology, evidence, sources. | Knowledge OS |
| **Framework** | Build the mental model. How does this fit into the category? | Category OS |
| **Specification** | Write the contract. Purpose, owner, dependencies, inputs, outputs, acceptance. | Engineering Contract |
| **UX** | Design the experience. How does the user learn this? | Experience OS |
| **Engineering** | Architect the solution. Stack, engines, ownership, performance budget. | Engineering OS |
| **Implementation** | Write the code. Spec first, code second. | Execution |
| **QA** | Verify against acceptance criteria. Three gates. | QA Checklist |
| **Release** | Ship. Document the outcome. Close the loop. | Changelog |

---

## The Three Non-Negotiables

### 1. Substance before spectacle

Every animation must communicate, not decorate. If removing an animation does not reduce understanding, trust, or emotional impact, it should not exist. Particles are data. Motion is meaning. Decoration is noise.

### 2. Architecture before implementation

Every feature gets a specification before it gets code. Spec first. Approval second. Implementation third. Merging fourth. This order is inviolable. Code written without an approved spec is waste — regardless of quality.

### 3. One source of truth

Chat is for discussion. `/docs` is the truth. If it's not documented, it does not exist. A decision made in conversation but not recorded in the SES is not a decision. If two sources disagree, the SES wins. Fix the implementation, not the spec.

---

### Rule 000 — The Helios Principle supersedes all rules

If any rule in this document contradicts the Helios Principle, the Helios Principle wins. The five questions (Why → Who → What → How → Measure) are the master gauntlet. Every other rule is a specialized application of this principle.

### Rule 001 — Every scene answers ONE question

A scene that does not answer a single, identifiable question does not belong. The question is the scene's purpose. If a scene cannot state its question in ten words, it is not ready.

### Rule 002 — Every animation has one owner

No two systems animate the same property. No two components fight over the same transform. Ownership is assigned in `09_IMPLEMENTATION_CONTRACTS/002_SYSTEM_OWNERSHIP.md`. If ownership is ambiguous, the task is blocked until it is resolved.

### Rule 003 — No component owns GSAP

Only `MotionDirector` imports or calls GSAP. Components receive animation state through channels (scalar values) or props. A component caught with `gsap.to()`, `gsap.from()`, or `gsap.timeline()` is non-compliant. Fix immediately.

### Rule 004 — No component owns ScrollTrigger

Only `SceneDirector` and `ScrollController` create `ScrollTrigger` instances. No component registers scroll triggers. No component calls `ScrollTrigger.create()`, `ScrollTrigger.refresh()`, or `ScrollTrigger.update()`.

### Rule 005 — No page owns camera movement

Only `CameraController` positions, animates, or configures the camera. No page, scene, or component accesses `camera.position`, `camera.lookAt`, `camera.fov`, or `camera.rotation` directly.

### Rule 006 — No duplicated render loops

`gsap.ticker` is the single frame pump. Lenis runs `autoRaf: false`. Three.js renders from `gsap.ticker`. No `requestAnimationFrame()` outside of `gsap.ticker`. No `useRafFn()`. No `setInterval` for animation.

### Rule 007 — No animation without acceptance criteria

Every task that includes animation must list acceptance criteria for that animation in the implementation contract. "Make it look good" is not acceptance criteria. State the observable behavior.

### Rule 008 — No placeholder content

Every section of every page must have real copy before it ships. Not "placeholder", not "TODO", not "content coming soon". If the copy is not approved, the section does not render.

### Rule 009 — No lorem ipsum. Ever.

There is no acceptable use of lorem ipsum in SVARA. Not in development. Not in staging. Not in design mockups. If content does not exist, the component does not render.

### Rule 010 — No implementation without specification approval

No code is written for a feature, page, scene, or component whose specification has not been approved in the SES (`docs/`). Spec first. Approval second. Implementation third. Merging fourth. This order is inviolable.

### Rule 011 — One source of truth per concept

A concept (e.g. product list, industry list, scene pacing, brand color) has exactly one file that defines it. All consumers import from that file. No duplication. No drift. If two files contain the same data, one must be deleted and its consumers redirected.

### Rule 012 — The operating manual is the product

`docs/` is not documentation. It is the executable specification of SVARA. Every file in `docs/` is a binding contract between intent and implementation. If the implementation disagrees with the SES, the SES wins. Fix the implementation, not the spec.

### Rule 013 — Revisit on every sprint

Every sprint opens with a review of PROJECT_RULES.md. Rules can be added, amended, or removed only by unanimous consent of the team. Silence is consent.

---

*Violating a rule is a blocking issue. The sprint does not ship until the violation is resolved.*
