# DECISION LEDGER

**Version:** 1.0 | **Status:** Approved | **Owner:** Product Team | **Review Date:** 2026-10-08
**Dependencies:** All documents | **Related:** DOCUMENT 013

## Every important decision recorded. Future confusion prevented.

---

## D-001 — Category-first homepage

| Field | Value |
|-------|-------|
| **Decision** | Homepage begins with enterprise reality, not company introduction |
| **Reason** | Category-first positioning. SVARA sells Enterprise Intelligence Infrastructure, not itself |
| **Alternatives** | Company-first hero section |
| **Rejected** | Weak differentiation. Every startup leads with itself. Category leaders lead with the category |
| **Owner** | Product Team |
| **Date** | Sprint 0 |
| **Version** | 1.0 |

---

## D-002 — 8 scenes replace 9 scenes

| Field | Value |
|-------|-------|
| **Decision** | Reduced from 9 to 8 scenes. Absorbed redundant scenes |
| **Reason** | Every scene must answer a unique question. Two scenes had overlapping questions |
| **Alternatives** | Keep 9 scenes |
| **Rejected** | Redundancy dilutes impact. Every scene must earn its place |
| **Owner** | Experience Team |
| **Date** | Sprint 0 |
| **Version** | 1.0 |

---

## D-003 — Company OS before Brand OS

| Field | Value |
|-------|-------|
| **Decision** | Company OS (identity, enemy, promise, outcomes) comes before Brand OS |
| **Reason** | Brand without company is cosmetic. Existence must be established before identity |
| **Alternatives** | Start with brand. Start with website |
| **Rejected** | Every startup starts with brand or website. We start with existence |
| **Owner** | Product Team |
| **Date** | Sprint 0 |
| **Version** | 1.0 |

---

## D-004 — Knowledge before Experience

| Field | Value |
|-------|-------|
| **Decision** | Knowledge OS comes before Experience OS |
| **Reason** | Experience shows what knowledge knows. Empty containers animate nothing |
| **Alternatives** | Design scenes first. Build motion first |
| **Rejected** | The previous mistake. We started with scenes and had nothing to fill them with |
| **Owner** | Product Team |
| **Date** | Sprint 0 |
| **Version** | 1.0 |

---

## D-005 — Website is bottom, not top

| Field | Value |
|-------|-------|
| **Decision** | Website is one output of SVARA OS, not the project itself |
| **Reason** | Thinking "build a website" is too small. SVARA OS generates every output — sales deck, investor deck, knowledge base |
| **Alternatives** | Build the website as the primary deliverable |
| **Rejected** | The website is a symptom. SVARA OS is the system |
| **Owner** | Product Team |
| **Date** | Sprint 0 |
| **Version** | 1.0 |

---

## D-006 — Five outcomes, not features

| Field | Value |
|-------|-------|
| **Decision** | SVARA sells five outcomes: Observe, Understand, Predict, Coordinate, Improve |
| **Reason** | Customers buy outcomes, not features. Products are delivery mechanisms |
| **Alternatives** | Sell products directly. Sell capabilities |
| **Rejected** | Product-led sales competes on features. Outcome-led sales competes on value |
| **Owner** | Product Team |
| **Date** | Sprint 0 |
| **Version** | 1.0 |

---

## D-007 — The Helios Principle

| Field | Value |
|-------|-------|
| **Decision** | Every decision must answer Why -> Who -> What -> How -> Measure. Stop if one is missing |
| **Reason** | Most failures come from skipping a question. Why is the most commonly skipped |
| **Alternatives** | No principle. Agile ceremonies |
| **Rejected** | Agile answers How, not Why. Helios answers everything |
| **Owner** | Product Team |
| **Date** | Sprint 0 |
| **Version** | 1.0 |

---

## D-008 — Encyclopedia, not blog

| Field | Value |
|-------|-------|
| **Decision** | Knowledge OS produces encyclopedia entries, not blog posts |
| **Reason** | Blogs compete on frequency. Encyclopedias compete on authority. SVARA needs authority |
| **Alternatives** | Blog articles. SEO posts. Newsletters |
| **Rejected** | Blog thinking produces shallow content. Encyclopedia thinking produces category ownership |
| **Owner** | Content Team |
| **Date** | Sprint 0 |
| **Version** | 1.0 |

---

## D-009 — Motion is language, not decoration

| Field | Value |
|-------|-------|
| **Decision** | Every animation must teach. Motion without meaning is removed |
| **Reason** | Enterprise buyers trust restraint. Decoration undermines credibility |
| **Alternatives** | Animate for impressiveness. Use motion as branding |
| **Rejected** | Impressive motion is for consumer products. Enterprise buyers need understanding |
| **Owner** | Experience Team |
| **Date** | Sprint 0 |
| **Version** | 1.0 |

---

## D-010 — Code without spec is waste

| Field | Value |
|-------|-------|
| **Decision** | No code is written without an approved specification |
| **Reason** | Code without spec produces drift. Spec first, approval second, implementation third |
| **Alternatives** | Write code, iterate based on feedback |
| **Rejected** | Iteration without spec is wandering. Spec without approval is draft |
| **Owner** | Engineering Team |
| **Date** | Sprint 0 |
| **Version** | 1.0 |

---

## D-011 — Three pillars, not six linear layers

| Field | Value |
|-------|-------|
| **Decision** | SVARA OS organized as three pillars (Company, Product, Experience) feeding three sub-systems (Knowledge, Motion, Engineering) |
| **Reason** | The linear chain was too rigid. Products needed their own pillar alongside Company and Experience |
| **Alternatives** | Keep the six-layer linear chain |
| **Rejected** | Products were lost between Company and Experience. They needed their own pillar |
| **Owner** | Product Team |
| **Date** | Sprint 0 |
| **Version** | 1.0 |

---

## D-012 — Intelligence Fragmentation is the enemy

| Field | Value |
|-------|-------|
| **Decision** | SVARA's enemy is Intelligence Fragmentation, not data, AI, or legacy software |
| **Reason** | Data is abundant. AI is a tool. Legacy software is a symptom. Fragmentation is the condition |
| **Alternatives** | "Data silos." "Legacy systems." "Competitor X." |
| **Rejected** | Naming a competitor makes you a challenger. Naming a condition makes you a category creator |
| **Owner** | Product Team |
| **Date** | Sprint 0 |
| **Version** | 1.0 |

---

## D-013 — GSAP ticker owns the render loop

| Field | Value |
|-------|-------|
| **Decision** | gsap.ticker is the single frame pump. Lenis autoRaf: false. Three.js renders from gsap.ticker |
| **Reason** | Three render loops (GSAP, Lenis, Three.js) create conflict. One ticker eliminates it |
| **Alternatives** | Lenis autoRaf: true. Three.js own rAF. Separate loops |
| **Rejected** | Separate loops fight each other. One ticker, one timeline, one truth |
| **Owner** | Engineering Team |
| **Date** | Sprint 0 |
| **Version** | 1.0 |

---

## D-014 — Documents, not chat

| Field | Value |
|-------|-------|
| **Decision** | All execution artifacts trace to documents. Tasks from chat do not exist |
| **Reason** | Chat is ephemeral. Documents are permanent. A decision made in chat but not documented is not a decision |
| **Alternatives** | Jira. Linear. Slack. Notion tasks |
| **Rejected** | Tools without source documents produce orphaned tasks. Documents first |
| **Owner** | Product Team |
| **Date** | Sprint 0 |
| **Version** | 1.0 |

---

## D-015 — North Star Statement

| Field | Value |
|-------|-------|
| **Decision** | Every SVARA team member memorizes: "SVARA engineers the intelligence layer that connects fragmented enterprise systems into one continuously learning operational ecosystem" |
| **Reason** | One sentence aligns every decision. No ambiguity about what SVARA does |
| **Alternatives** | Mission statement. Vision statement. Tagline |
| **Rejected** | Three statements dilute. One sentence forces clarity |
| **Owner** | Product Team |
| **Date** | Sprint 0 |
| **Version** | 1.0 |

---

## D-016 — OpenCode is an implementation engine

| Field | Value |
|-------|-------|
| **Decision** | OpenCode receives strategically-solved tasks and executes them. It does not discover requirements |
| **Reason** | Strategy belongs to SVARA. Implementation belongs to OpenCode. AI is strongest when given precise specs |
| **Alternatives** | OpenCode participates in strategy. OpenCode discovers requirements |
| **Rejected** | AI discovers by guessing. SVARA discovers by thinking. Thinking comes before building |
| **Owner** | Product Team |
| **Date** | Sprint 0 |
| **Version** | 1.0 |

---

## D-017 — Premium rendering over maximum compatibility

| Field | Value |
|-------|-------|
| **Decision** | SVARA optimizes for modern browsers with WebGL support. Graceful degradation for older browsers |
| **Reason** | Enterprise buyers use modern hardware. This is not a consumer product targeting the bottom of the market |
| **Alternatives** | Support all browsers. Canvas fallback. No 3D |
| **Rejected** | Degrading the experience for everyone to support outliers is the wrong trade |
| **Owner** | Engineering Team |
| **Date** | Sprint 0 |
| **Version** | 1.0 |

---

## D-018 — Content OS governs all writing

| Field | Value |
|-------|-------|
| **Decision** | Every sentence SVARA writes passes through Content OS. Voice principles, sentence rules, page architecture |
| **Reason** | Inconsistent voice undermines authority. Every page must sound like the same company |
| **Alternatives** | Freelance writers. Agency content. AI-generated text |
| **Rejected** | Outsourced content cannot maintain a consistent voice. Content OS enforces it |
| **Owner** | Content Team |
| **Date** | Sprint 0 |
| **Version** | 1.0 |

---

## D-019 — Brand appears at Scene 04

| Field | Value |
|-------|-------|
| **Decision** | SVARA brand mark first appears at Scene 04 (The Platform), not before |
| **Reason** | The visitor must understand the category and the problem before they learn who solves it. Brand before understanding is noise |
| **Alternatives** | Brand on scene 01. Brand in header from scene 03 |
| **Rejected** | Branding before the visitor understands the problem feels like advertising |
| **Owner** | Experience Team |
| **Date** | Sprint 0 |
| **Version** | 1.0 |

---

## D-020 — SEO is knowledge engineering, not keywords

| Field | Value |
|-------|-------|
| **Decision** | SEO strategy is based on knowledge engineering (entities, structured data, AI answer targets) not keyword ranking |
| **Reason** | AI systems quote sources, not keywords. Being the source is more valuable than ranking first |
| **Alternatives** | Traditional SEO. Keyword research. Backlink building |
| **Rejected** | Keywords are a proxy for authority. Knowledge engineering is authority itself |
| **Owner** | Content Team |
| **Date** | Sprint 0 |
| **Version** | 1.0 |

---

## D-021 — Decisions are versioned

| Field | Value |
|-------|-------|
| **Decision** | Every decision in the ledger includes a version number. Decisions can be revised, but the history is preserved |
| **Reason** | Decisions change. Pretending they don't creates confusion. Versioning makes evolution transparent |
| **Alternatives** | Replace decisions. Delete old entries |
| **Rejected** | Deleting history erases context. Versioning preserves learning |
| **Owner** | Product Team |
| **Date** | Sprint 0 |
| **Version** | 1.0 |

---

**End of Decision Ledger. 21 decisions recorded. Every major choice has a reason, an alternative, and a rejection. Six months from now, nobody asks "why?"**
