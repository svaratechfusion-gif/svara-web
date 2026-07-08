# INFORMATION ARCHITECTURE

**Version:** 1.0 | **Status:** Approved | **Owner:** Experience Team | **Review Date:** 2026-10-08
**Dependencies:** 001_COMPANY_OS.md, 002_CATEGORY_OS.md | **Related:** 004_CONTENT_OS.md, 005_UX_OS.md

---

## TL;DR

The website is organized by knowledge, not by pages. A visitor must understand Company before Platform, Platform before Capabilities, Capabilities before Products, and so on. The hierarchy is not a menu — it is a prerequisite chain. Pages emerge from the knowledge structure, not the other way around.

---

## 01 — The Knowledge Hierarchy

### The Vertical Descent

Every visitor enters at their level of understanding. The hierarchy defines what must be known before the next level makes sense.

```
                         COMPANY
                            │
                         PLATFORM
                            │
                       CAPABILITIES
                            │
                         PRODUCTS
                            │
                      TECHNOLOGIES
                            │
                        INDUSTRIES
                            │
                        KNOWLEDGE
                            │
                        INVESTORS
                            │
                         CONTACT
```

| Level | Question It Answers | Prerequisite |
|-------|---------------------|--------------|
| **Company** | Who is SVARA? | None |
| **Platform** | What does SVARA build? | Company |
| **Capabilities** | How does it work? | Platform |
| **Products** | What can I use? | Capabilities |
| **Technologies** | How is it built? | Products |
| **Industries** | Where does it apply? | Technologies |
| **Knowledge** | What else should I know? | Industries |
| **Investors** | Why does this matter financially? | Knowledge |
| **Contact** | How do I reach SVARA? | Investors |

### The Core Insight

A visitor who lands on Products without understanding Capabilities will not understand what they are buying. A visitor who lands on Industries without understanding Platform will not understand why SVARA is different.

The hierarchy prevents premature understanding. It does not block access — it provides context. Every page links up (to its parent) and down (to its children). The visitor navigates the tree to their depth of need.

---

## 02 — URL Structure

### URL Hierarchy

```
/                           → Experience (cinematic entry point)
├── company                 → Company OS
├── platform                → Platform overview
├── capabilities            → Capabilities overview
│   ├── capabilities/sense
│   ├── capabilities/think
│   ├── capabilities/predict
│   ├── capabilities/act
│   └── capabilities/learn
├── products                → Products overview
│   ├── products/vision-ai
│   ├── products/drone-ai
│   ├── products/edge-ai
│   ├── products/ai-agents
│   ├── products/digital-twin
│   ├── products/business-cloud
│   ├── products/ai-os
│   ├── products/command-center
│   └── products/growth-intelligence
├── technologies            → Technology overview
│   ├── technologies/edge-computing
│   ├── technologies/computer-vision
│   ├── technologies/nlp
│   ├── technologies/sensor-fusion
│   └── technologies/swarm-intelligence
├── industries              → Industries overview
│   ├── industries/manufacturing
│   ├── industries/energy
│   ├── industries/logistics
│   ├── industries/healthcare
│   ├── industries/defense
│   ├── industries/smart-cities
│   ├── industries/agriculture
│   ├── industries/aviation
│   ├── industries/marine
│   ├── industries/mining
│   ├── industries/telecom
│   └── industries/supply-chain
├── knowledge               → Knowledge hub
│   ├── knowledge/encyclopedia
│   ├── knowledge/glossary
│   └── knowledge/faq
├── investors               → Investor relations
├── contact                 → Contact page
└── legal
    ├── legal/privacy
    └── legal/terms
```

### URL Rules

| Rule | Example | Anti-Example |
|------|---------|--------------|
| URL mirrors knowledge depth | `/capabilities/sense` | `/sense` |
| Plural for collections | `/products` | `/product` |
| Singular for detail pages | `/products/vision-ai` | `/products/vision-ai-product` |
| No dynamic parameters beyond `[slug]` | `/industries/manufacturing` | `/industries?id=5` |
| No file extensions | `/company` | `/company.html` |
| Kebab-case for multi-word slugs | `/products/vision-ai` | `/products/VisionAI` |
| Maximum three levels deep | `/knowledge/encyclopedia/` | `/knowledge/encyclopedia/enterprise-intelligence-infrastructure/definition/` |

### Redirect Strategy

| Pattern | Redirects To | Reason |
|---------|--------------|--------|
| `/platform` | `/capabilities` | Platform book is now Capabilities |
| `/technology` | `/technologies` | Plural alignment |
| `/docs/*` | `/knowledge/encyclopedia/*` | Consolidation |

---

## 03 — Navigation

### Primary Navigation (Desktop ≥ 768px)

The primary nav reflects the knowledge hierarchy. Items are ordered by the prerequisite chain, not by importance.

| Position | Label | Path | Visibility |
|----------|-------|------|------------|
| 1 | Company | `/company` | Always visible after Scene 04 |
| 2 | Platform | `/platform` | Always visible after Scene 04 |
| 3 | Products | `/products` | Always visible after Scene 04 |
| 4 | Industries | `/industries` | Always visible after Scene 04 |
| 5 | Knowledge | `/knowledge` | Always visible after Scene 04 |
| 6 | Investors | `/investors` | Always visible after Scene 04 |
| 7 | Contact | `/contact` | Always visible after Scene 04 |

**Capabilities and Technologies are NOT in the primary nav.** They are discovered in-context. Capabilities appear on the Platform page and link to their detail pages. Technologies appear on Product pages and link to their detail pages. This prevents nav bloat and respects the knowledge hierarchy.

### Mobile Navigation (< 768px)

- Hamburger menu at < 768px
- Slide-out drawer from the left
- Same items as desktop primary nav
- Active page is visually indicated
- Drawer closes on navigation

### Navigation Rules

| Rule | Rationale |
|------|-----------|
| Every page reachable in two clicks from any page | Enterprise users do not browse — they navigate with intent |
| Current page visually indicated | Orientation is critical in a deep hierarchy |
| Nav structure is consistent across all pages | Surprise menus reduce trust |
| No dropdown menus on desktop | Single-level nav forces clear hierarchy. Sub-pages are linked from parent page content. |
| External links open in same tab | Enterprise users actively reject new tabs |
| Nav hidden during homepage scenes 01–03 | Brand does not appear before Scene 04 (Experience OS rule) |
| Nav visible from page load on all non-homepage pages | Standard navigation behavior |

### Footer Navigation

The footer repeats the primary nav plus legal links:

```
Company   Platform   Products   Industries   Knowledge   Investors   Contact
                              Privacy   Terms
```

Footer is present on every page except the homepage (where brand appears at Scene 04).

---

## 04 — Entity-to-Page Mapping

Every entity in the SVARA knowledge graph maps to exactly one page.

| Entity Type | Page Pattern | Example |
|-------------|-------------|---------|
| **Company** | `/company` | Company |
| **Capability** | `/capabilities/[slug]` | `/capabilities/sense` |
| **Outcome** | Defined on capability page | Observe → `/capabilities/sense` |
| **Product** | `/products/[slug]` | `/products/vision-ai` |
| **Technology** | `/technologies/[slug]` | `/technologies/edge-computing` |
| **Industry** | `/industries/[slug]` | `/industries/manufacturing` |
| **Term** | `/knowledge/glossary` | Glossary entry |
| **Concept** | `/knowledge/encyclopedia/[slug]` | Encyclopedia article |
| **FAQ** | `/knowledge/faq` | FAQ entry |

### Entity-to-Page Rules

- Every entity has exactly one canonical page
- Every page contains exactly one primary entity
- Related entities link to their canonical pages
- No page represents an entity that does not exist in the knowledge graph
- If an entity is removed from the knowledge graph, its page is redirected to its parent

---

## 05 — Knowledge Graph Navigation

### Up Navigation

Every page links to its parent in the hierarchy:

| Page | Parent Link | Context |
|------|-------------|---------|
| `/capabilities/sense` | `/capabilities` | "Back to Capabilities" |
| `/products/vision-ai` | `/products` | "Back to Products" |
| `/industries/manufacturing` | `/industries` | "Back to Industries" |
| `/knowledge/glossary` | `/knowledge` | "Back to Knowledge" |

### Down Navigation

Every page links to its children in the hierarchy:

| Page | Child Links | Context |
|------|-------------|---------|
| `/capabilities` | `/capabilities/sense`, `/capabilities/think`, etc. | "The five capabilities" |
| `/products` | `/products/vision-ai`, `/products/drone-ai`, etc. | "Our products" |
| `/industries` | `/industries/manufacturing`, `/industries/energy`, etc. | "Industries we serve" |

### Lateral Navigation

Every page links to sibling pages at the same level:

| Page | Sibling Links | Context |
|------|--------------|---------|
| `/capabilities/sense` | `/capabilities/think`, `/capabilities/predict`, etc. | "Next capability" |
| `/products/vision-ai` | `/products/drone-ai`, `/products/edge-ai`, etc. | "Related products" |
| `/industries/manufacturing` | `/industries/energy`, `/industries/logistics`, etc. | "Related industries" |

### Cross-Linking Rules

| Source | Links To | When |
|--------|---------|------|
| Product page | Capability page | Product mentions its primary capability |
| Product page | Technology page | Product mentions its underlying technologies |
| Product page | Industry pages | Product mentions applicable industries |
| Industry page | Product pages | Industry mentions relevant products |
| Capability page | Product pages | Capability mentions products that deliver it |
| Encyclopedia article | Term, Capability, Product, Industry pages | Article mentions entities |
| Capability page | Outcome | Each capability delivers one outcome |
| Product page | Outcome | Each product serves one or more outcomes |

---

## 06 — Page Architecture

Every page follows the same structure, derived from the knowledge hierarchy:

```
┌────────────────────────────────────────┐
│            UP LINK                      │
│  ← Back to [Parent]                   │
├────────────────────────────────────────┤
│                                        │
│  01 — HEADLINE                         │
│       One line. One concept.           │
│                                        │
│  02 — TL;DR                            │
│       Three sentences maximum.         │
│       The entire page in miniature.    │
│                                        │
│  03 — THE ANSWER                       │
│       Bold one-paragraph answer.       │
│       The page's question answered.    │
│                                        │
│  04 — BODY SECTIONS                    │
│       Each section teaches one idea.   │
│       One idea per section.            │
│       Sections ordered by prerequisite.│
│                                        │
│  05 — RELATED                          │
│       Links down to children.          │
│       Links laterally to siblings.     │
│       Links up to parent.              │
│                                        │
│  06 — NEXT                             │
│       What to read next.               │
│       Always the next level down.      │
│                                        │
├────────────────────────────────────────┤
│            FOOTER                       │
│  Primary nav + Legal                   │
└────────────────────────────────────────┘
```

### Page Type Definitions

| Page Type | Purpose | Depth | Sections |
|-----------|---------|-------|----------|
| **Experience** (`/`) | Cinematic entry point | 0 | Storyboard only |
| **Overview** (`/products`, `/industries`) | List of children | 1 | TL;DR, Children grid, Parent link |
| **Detail** (`/products/vision-ai`, `/capabilities/sense`) | One entity in depth | 2 | Full 6-section architecture |
| **Hub** (`/knowledge`) | Collection of reference types | 1 | Search, Browse, Featured |
| **Utility** (`/contact`, `/legal/*`) | Function | 0 | Minimal: form or text |

### Page Count

The IA defines approximately 45 pages:

| Section | Overview | Detail Pages | Total |
|---------|----------|-------------|-------|
| `/` | 1 | — | 1 |
| `/company` | — | 1 | 1 |
| `/platform` | — | 1 | 1 |
| `/capabilities` | 1 | 5 | 6 |
| `/products` | 1 | 9 | 10 |
| `/technologies` | 1 | 5 | 6 |
| `/industries` | 1 | 12 | 13 |
| `/knowledge` | 1 | 3 | 4 |
| `/investors` | — | 1 | 1 |
| `/contact` | — | 1 | 1 |
| `/legal` | — | 2 | 2 |
| **Total** | **5** | **41** | **46** |

---

## 07 — Experience-to-IA Mapping

### Scene-to-Page Alignment

The cinematic homepage (8 scenes) teaches the knowledge hierarchy in sequence:

| Scene | Teaches | Maps To IA Level |
|-------|---------|-----------------|
| Scene 01 — The Gap | Why SVARA exists | Company |
| Scene 02 — Fragmentation | The problem | Company (Enemy) |
| Scene 03 — Intelligence Loop | The solution framework | Platform |
| Scene 04 — The Five Capabilities | How it works | Capabilities |
| Scene 05 — Products | What we build | Products |
| Scene 06 — Scale | Where it applies | Industries |
| Scene 07 — The Timeline | Where we are going | Knowledge |
| Scene 08 — The Intersection | What to do next | Contact |

Every scene teaches exactly one level of the knowledge hierarchy. By the end of the experience, the visitor has learned the entire prerequisite chain — from Company to Contact.

### Post-Experience Navigation

After the cinematic experience (`/`), the visitor lands on a transition that offers:

- "Explore Capabilities" → `/capabilities`
- "See Products" → `/products`
- "Read the Encyclopedia" → `/knowledge`

This is the handoff from story to structure. The visitor now navigates the knowledge tree from their current depth of understanding.

---

## 08 — Routing Rules

| Rule | Details |
|------|---------|
| All routes are static | No dynamic params beyond `[slug]` |
| 404 redirects to `/` | Prevent dead ends |
| Product routes | `/products/[slug]` |
| Capability routes | `/capabilities/[slug]` |
| Technology routes | `/technologies/[slug]` |
| Industry routes | `/industries/[slug]` |
| Knowledge routes | `/knowledge/glossary`, `/knowledge/faq`, `/knowledge/encyclopedia` |
| Legal routes | `/legal/privacy`, `/legal/terms` |
| Trailing slashes | No trailing slashes. `/products` not `/products/`. |

### Redirect Rules

| Old URL | New URL | TTL |
|---------|---------|-----|
| `/platform` | `/platform` (stays) | Permanent |
| `/technology` | `/technologies` | 301 |
| `/docs/` | `/knowledge/` | 301 |
| `/faq` | `/knowledge/faq` | 301 |
| `/glossary` | `/knowledge/glossary` | 301 |

---

## 09 — The IA Principles

### P1 — Knowledge before pages

The hierarchy is defined by what a visitor must understand before the next level makes sense. Pages are derived from the hierarchy, not the other way around. If a page does not correspond to a level in the knowledge tree, it does not exist.

### P2 — One entity, one page

Every entity in the knowledge graph maps to exactly one canonical page. No entity is defined in two places. If an entity changes, its page changes. All other pages that reference the entity link to its canonical page.

### P3 — Depth is a service, not a barrier

The hierarchy does not hide content. It organizes content by prerequisite understanding. Every page links up (to explain context), down (to explain detail), and laterally (to explain alternatives). The visitor never hits a dead end.

### P4 — The nav is a map, not the destination

The primary navigation shows the top two levels of the knowledge tree. It is an orientation tool, not a content directory. The third level (detail pages) is discovered through content links on overview pages. This keeps the nav clean and the hierarchy clear.

### P5 — The experience teaches the tree

The cinematic homepage teaches the entire knowledge hierarchy in sequence. By the time the visitor reaches the end, they understand the structure of the website because they have learned the structure of the knowledge. The IA is transparent because it is taught.

---

## The IA Rule

**If a page cannot answer "What knowledge does this assume?" and "What knowledge does this teach?" then the page does not belong in the hierarchy.**
