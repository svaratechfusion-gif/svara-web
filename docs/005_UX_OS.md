# UX OS

**Version:** 1.0 | **Status:** Approved | **Owner:** Experience Team | **Review Date:** 2026-10-08
**Dependencies:** DOCUMENT 001, DOCUMENT 002, DOCUMENT 003 | **Related:** DOCUMENT 006, DOCUMENT 007

## Navigation. Architecture. Journeys. Interaction. Flow. Decisions. Access.

---

## 01 — Navigation

### Primary Navigation

| Label | Path | Type |
|-------|------|------|
| Experience | `/` | Cinematic homepage |
| Platform | `/platform` | Product page |
| Products | `/products` | Product overview |
| Industries | `/industries` | Industry overview |
| Technology | `/technology` | Product page |
| Knowledge | `/knowledge` | Resource hub |
| Investors | `/investors` | Business page |
| Company | `/company` | Business page |
| Contact | `/contact` | Utility |

### Behavior

| Context | Nav State | Transition |
|---------|-----------|------------|
| Homepage, scroll < 48vh | Hidden | Opacity 0, translateY(-14px), pointer-events none |
| Homepage, scroll ≥ 48vh | Visible | Opacity 1, translateY(0), pointer-events auto |
| All other pages | Visible from page load | Same as above |
| Any page, scrolled > 40px | Chrome: backdrop blur + shadow | 500ms transition |

### Mobile

Hamburger menu at < 768px. Same items. Slide-out drawer.

### Navigation Rules

- Every page is reachable in two clicks from any other page
- Current page is visually indicated in the nav
- Nav does not change structure across pages (no surprise menus)
- External links open in same tab (enterprise users hate new tabs)
- No dropdown menus on desktop (single-level nav, clear hierarchy)

---

## 02 — Information Architecture

### URL Hierarchy

```
/
├── platform
├── products/[slug]
├── industries/[slug]
├── technology
├── knowledge
│   ├── knowledge/faq
│   └── knowledge/glossary
├── investors
├── company
├── contact
└── legal
    ├── legal/privacy
    └── legal/terms
```

### Routing Rules

- All routes are static (no dynamic params beyond `[slug]`)
- 404 redirects to `/`
- Product pages: `/products/[slug]`
- Industry pages: `/industries/[slug]`
- Knowledge pages: `/knowledge/glossary`, `/knowledge/faq`
- Legal pages: `/legal/privacy`, `/legal/terms`

### IA Principles

- **One page, one purpose.** No page serves two audiences. If a page tries to serve both a CXO and an engineer, split it.
- **Depth before breadth.** Three levels max: Category → Section → Detail. No page is more than three clicks from the homepage.
- **Predictable URLs.** The URL tells the user where they are. `/products/vision-ai` is clear. `/p/v42` is not.
- **Plural for collections, singular for pages.** `/products` lists products. `/products/vision-ai` is one product.

---

## 03 — User Journeys

### Personas

| Persona | Goal | Entry Point | Success |
|---------|------|-------------|---------|
| Enterprise CXO | Understand the category | Homepage → Platform → Products | Book a conversation |
| Enterprise Architect | Evaluate technical fit | Technology → Knowledge → Docs | Understand architecture |
| Investor | Assess opportunity | Investors → Company → Contact | Request deck |
| Government / Regulator | Verify compliance | Company → Legal → Technology | Trust in security |
| Engineering Talent | Evaluate technical challenge | Technology → Knowledge → Products | Apply or contribute |
| Partner / Integrator | Understand integration model | Platform → Technology → Contact | Explore partnership |

### CXO Journey

1. **Homepage** — Experience the problem and solution emotionally
2. **Platform** — Understand the infrastructure layer
3. **Products** — See capability range
4. **Industries** — Confirm relevance to their sector
5. **Contact** — Initiate conversation

### Architect Journey

1. **Technology** — Dive into architecture
2. **Knowledge / FAQ** — Technical Q&A
3. **Glossary** — Understand SVARA terminology
4. **Products** — Product-specific docs

### Investor Journey

1. **Investors** — Thesis, market, traction
2. **Company** — Team, story, vision
3. **Contact** — Request materials

### Government / Regulator Journey

1. **Company** — Legal name, jurisdiction
2. **Legal** — Privacy, terms, compliance
3. **Technology / Security** — Architecture, data handling

### Talent Journey

1. **Technology** — See the technical depth
2. **Knowledge** — Understand the intellectual rigor
3. **Products** — See what they would build
4. **Company** — Read the culture, mission, team

---

## 04 — Interaction Rules

### Every interaction serves one purpose

A user interacts with SVARA for one reason: to understand. Every interaction must make the user smarter. If an interaction does not teach, it does not belong.

### Interaction Types

| Type | Purpose | Duration | Easing |
|------|---------|----------|--------|
| **Hover (card)** | Confirm interactivity | 300ms | power2.out |
| **Hover (button)** | Invite click | 200ms | power1.out |
| **Hover (link)** | Show destination | 150ms | linear |
| **Click (nav)** | Navigate | 400ms | power3.inOut |
| **Click (button)** | Execute | 250ms | power2.out |
| **Scroll (trigger)** | Progress scene | 1500ms | power4.out |
| **Scroll (reveal)** | Show content | 600ms | power2.out |
| **Page transition** | Change context | 600ms | power2.inOut |

### Interaction Principles

- **No surprises.** Every interactive element looks interactive. Every click produces a response within 200ms.
- **No dead ends.** Every action leads somewhere. No click does nothing.
- **No unnecessary steps.** If a user can complete a goal in two clicks, do not make them take three.
- **Feedback on every action.** Click produces visual response. Hover produces visual response. Scroll produces visual response. No action is silent.

---

## 05 — Scene Flow

### The 8 Scenes

The homepage is a scroll-driven narrative of 8 scenes. Each scene teaches one concept.

| Scene | Teaches | User Learns |
|-------|---------|-------------|
| 01 | The Gap | Enterprise intelligence is fragmented. Information exists. Intelligence does not. |
| 02 | The Enemy | Intelligence Fragmentation — broken across vendors, departments, systems, time |
| 03 | The Loop | Observe → Understand → Predict → Coordinate → Improve |
| 04 | The Infrastructure | SVARA connects every signal to every decision to every action |
| 05 | The Products | 9 products deliver 5 outcomes |
| 06 | The Industries | 12 industries, one infrastructure |
| 07 | The Proof | Evidence, examples, results |
| 08 | The Invitation | Choose your path — platform, products, contact |

### Scene Transition Rules

- Each scene triggers when it reaches 40% of viewport
- Transitions overlap by 20% of the scene duration
- Camera position changes only at scene boundaries
- Particles persist across scenes (channel configurations change)
- No scene lasts longer than 6000ms of scroll time

### Scene Decision Tree

```
User enters homepage
  ↓
Scene 01: Do I have this problem?
  ├── Yes → Continue to Scene 02
  └── No → Navigate to Products or Industries
  ↓
Scene 02: Is fragmentation affecting my operations?
  ├── Yes → Continue to Scene 03
  └── Not sure → Continue (Scene 03 will clarify)
  ↓
Scene 03: Does the Intelligence Loop make sense?
  ├── Yes → Continue to Scene 04
  └── Want details → Navigate to Platform
  ↓
Scene 04+: Continue through proof and invitation
```

---

## 06 — Decision Trees

### Homepage Decision Tree

```
What does the user need?
  │
  ├── "Do I have this problem?"
  │     → Enter homepage at Scene 01
  │
  ├── "Show me the product"
  │     → Navigate to Products
  │
  ├── "Show me the platform"
  │     → Navigate to Platform
  │
  ├── "Is this relevant to my industry?"
  │     → Navigate to Industries
  │
  ├── "Prove it"
  │     → Navigate to Knowledge / Case Studies
  │
  ├── "I'm an investor"
  │     → Navigate to Investors
  │
  └── "Who is SVARA?"
        → Navigate to Company
```

### Page-Level Decision Trees

Each page answers exactly one question:
- Platform: "How does the Intelligence Loop work?"
- Products: "What does SVARA make?"
- Industries: "Does this apply to my industry?"
- Technology: "How is it built?"
- Knowledge: "What does SVARA know?"
- Investors: "Is this a good investment?"
- Company: "Who is behind this?"

If a page cannot state its question in 10 words, the page is not ready.

---

## 07 — Accessibility

### Standards

- WCAG 2.2 AA minimum. AAA where feasible.
- All interactive elements reachable by keyboard
- All animations respect `prefers-reduced-motion`
- All content readable at 200% zoom without horizontal scroll

### Accessibility Rules

- Every image has alt text that describes the content, not the file
- Every interactive element has a visible focus state
- Every icon has an aria-label
- Every video has captions
- Every color combination meets 4.5:1 contrast ratio (normal text) and 3:1 (large text)
- Every form input has an associated label
- No information is conveyed by color alone
- All animations can be paused

### Motion Accessibility

- `prefers-reduced-motion: reduce` disables all non-essential animations
- Essential animations (scroll-triggered reveals) reduce to 50% duration
- Particle systems pause when not in viewport
- No auto-playing video or animation
- All scene transitions can be skipped (skip button appears after 3s of continuous scroll)

### Focus Management

- Page title updates on navigation (screen reader announces the new page)
- Focus moves to the main content area on page load (skip nav link)
- Modal/drawer traps focus while open
- Focus returns to the trigger element when modal/drawer closes

---

## 08 — The UX Rule

**Every decision the user makes should feel obvious in retrospect.**

If a user has to think about where to click, the UX failed. If a user has to wonder what a page is about, the IA failed. If a user has to guess what happens next, the interaction failed.

Good UX is invisible. The user does not notice the navigation, the layout, or the interactions. They only notice what they learned.
