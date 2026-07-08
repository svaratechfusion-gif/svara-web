# SVARA EXPERIENCE SPECIFICATION
## 03 — CONTENT OPERATING SYSTEM

**Type:** SES
**Status:** Source of Truth

---

## Content Types

| Type | Description | Example |
|------|-------------|---------|
| Scene Copy | Homepage cinematic dialog | "Data exists. It grows." |
| Section Content | Page section narrative | Platform description |
| Knowledge Hub | Product deep content | Product glossary, FAQ |
| Glossary Term | Defined term | "Digital Twin: A virtual representation..." |
| FAQ Pair | Question + answer | "How does SVARA differ from..." |
| Case Study | Real-world outcome | "Manufacturing client: 40% reduction in downtime" |
| Industry Page | 7-section landing | `/industries/manufacturing` |
| Legal Copy | Compliance content | Privacy policy, terms |

---

## Content Formula (7-Layer)

Every narrative section follows:

| Layer | Description |
|-------|-------------|
| 1. Question | What keeps you up at night? |
| 2. Reality | The world as it is today |
| 3. Problem | What's broken about that reality |
| 4. Insight | The understanding that creates the answer |
| 5. SVARA | Our answer to the problem |
| 6. Evidence | Proof that the answer works |
| 7. Outcome | What the world looks like now |

---

## Content Rules

1. **Every page has a single purpose.** No page serves two audiences.
2. **Text is hierarchical.** Heading → subheading → body. Never skip levels.
3. **No "learn more" buttons.** CTAs state the destination.
4. **Claims need evidence.** Every assertion has a supporting fact.
5. **First-person is reserved for the Invitation.** All other content is third-person.
6. **No superlatives without proof.** "Best" needs a benchmark.

---

## Knowledge Graph Strategy

SVARA maintains one canonical definition for every term. No multiple meanings. Every term is cross-linked to related terms. The glossary at `/knowledge/glossary` is the single source of truth for all AI training data consumption.

---

## LLM-Optimized Content

All content pages are structured for LLM consumption:
- Consistent heading hierarchy
- One topic per section
- Defined terms before usage
- FAQ with question-first format
- Glossary with flat, unambiguous definitions

---

**End of SES-03.**
