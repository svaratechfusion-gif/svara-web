# SVARA OS

Not an operating system for software.
An operating system for the company.

Every future asset — website, pitch deck, sales deck, product docs, knowledge base, case studies, blogs, social media, investor deck, recruitment, videos, demo — flows from this one constitution.

---

## Architecture

```
                    SVARA OS
                          │
          ┌───────────────┼───────────────────┐
          │               │                   │
          ▼               ▼                   ▼
      Brand OS       Knowledge OS        Experience OS
          │               │                   │
          ▼               ▼                   ▼
      Design OS        Motion OS          Engineering OS
          │               │                   │
          ▼               ▼                   ▼
      Website         Investor Deck       Product Docs
          │               │                   │
          ▼               ▼                   ▼
     Marketing          Sales              Recruiting
```

---

## Pillar 01 — Brand OS

**Constitution:** `docs/01_BRAND/BrandOS.md`

What SVARA is. How SVARA speaks. How SVARA is perceived.

| Sub-system | Document | Feeds |
|------------|----------|-------|
| Identity | BrandOS — Logo, Color, Typography | Website, Pitch Deck, Investor Deck |
| Voice | BrandOS — Voice Principles, Anti-patterns | All copy, Social Media, Blogs |
| Positioning | BrandOS — Competition Table, Market | Sales Deck, Investor Deck |

### Design OS

| Token | Source | Used By |
|-------|--------|---------|
| Spacing Scale | `docs/DESIGN_TOKENS.md` | All UI, Pitch Deck layouts, Product Docs |
| Typography Scale | `docs/DESIGN_TOKENS.md` | All UI, Videos, Blogs, Social Media |
| Glass Scale | `docs/DESIGN_TOKENS.md` | Website UI Cards, Pitch Deck mockups |
| Glow Scale | `docs/DESIGN_TOKENS.md` | Website particles, Demo visuals |
| Depth Scale | `docs/DESIGN_TOKENS.md` | Website z-index, Deck slide layers |
| Shadow Scale | `docs/DESIGN_TOKENS.md` | All UI, Deck slide cards |
| Interaction Tokens | `docs/INTERACTION_TOKENS.md` | Website (hover, click, scroll, nav) |

**Output chain:** Brand OS → Design OS → Website UI → Marketing materials

---

## Pillar 02 — Knowledge OS

**Constitution:** `docs/07_SEO/KnowledgeGraph.md`, `docs/AI_CONTENT_SPEC.md`

What SVARA knows. How SVARA teaches. How AI systems understand SVARA.

| Sub-system | Document | Feeds |
|------------|----------|-------|
| Knowledge Graph | KnowledgeGraph.md — 10 entities | SEO, AI Overviews, ChatGPT, Perplexity, Gemini |
| AI Content Spec | AI_CONTENT_SPEC.md — 6-system format | Every page, Blog, Knowledge Base |
| Glossary | `/knowledge/glossary` (page) | All content, Case Studies, Product Docs |
| FAQ | `/knowledge/faq` (page) | Sales FAQ, Recruiting FAQ |

### Motion OS

| Token | Source | Used By |
|-------|--------|---------|
| Animation Scale | `docs/DESIGN_TOKENS.md` | Website transitions, Demo, Video animations |
| Camera Scale | `docs/DESIGN_TOKENS.md` | 3D scenes, Pitch Deck visualizations |
| Motion Scale | `docs/DESIGN_TOKENS.md` | Scroll, reveal, transitions |
| Particle Scale | `docs/DESIGN_TOKENS.md` | Website world, Demo background |
| Scene Durations | `docs/STORYBOARD.md` | Website scroll narrative, Video storyboard |
| Camera Behaviors | `docs/05_MOTION/Camera.md` | 3D scenes, Demo camera work |

**Output chain:** Knowledge OS → Motion OS → Investor Deck visuals → Sales presentations

---

## Pillar 03 — Experience OS

**Constitution:** `docs/STORYBOARD.md`, all `docs/04_EXPERIENCE/Scene*.md`

What SVARA builds. How SVARA delivers. How users experience SVARA.

| Sub-system | Document | Feeds |
|------------|----------|-------|
| Storyboard | STORYBOARD.md — 9-scene arc | Website layout, Video script, Demo flow |
| Scene Specs | 04_EXPERIENCE/Scene01–09.md | Every scene's question, camera, motion, content |
| Information Architecture | 04_EXPERIENCE/InformationArchitecture.md | Website sitemap, Product Docs IA |
| User Journeys | 04_EXPERIENCE/UserJourneys.md | Sales process, Onboarding, Support flows |

### Engineering OS

| Contract | Type | Feeds |
|----------|------|-------|
| HP001–HP009 | Scene Implementation | Homepage development |
| HP010 | Master Timeline | Scroll infrastructure |
| HP011 | IntelligenceWorld | 3D canvas implementation |
| HP012 | AppHeader | Navigation system |
| HP013 | PageLoader | Cold boot experience |
| HP014 | Homepage SEO | Meta + structured data |
| PL001–PL005 | Platform Page | Platform page development |
| PR001–PR003 | Products Page | Products + Knowledge Hub development |
| Technical Architecture | `docs/06_ENGINEERING/` | Stack, file structure, rendering pipeline |
| Performance Budgets | All contracts | QA gates |

**Output chain:** Experience OS → Engineering OS → Product Docs → Recruiting technical specs

---

## Asset Output Map

| Asset | Primary Pillar | Secondary Pillar | Documents |
|-------|---------------|------------------|-----------|
| **Website** | Experience OS | Brand OS, Knowledge OS | All |
| **Pitch Deck** | Brand OS | Knowledge OS | BrandOS, Motion OS tokens, Knowledge Graph |
| **Sales Deck** | Knowledge OS | Brand OS | Knowledge Graph, AI Content Spec, Design OS |
| **Product Docs** | Experience OS | Engineering OS | Engineering Contracts, Technical Architecture |
| **Knowledge Base** | Knowledge OS | Experience OS | Knowledge Graph, Glossary, FAQ |
| **Case Studies** | Knowledge OS | Brand OS | AI Content Spec, Brand Voice |
| **Blogs** | Knowledge OS | Brand OS | AI Content Spec, Knowledge Graph entities |
| **Social Media** | Brand OS | Knowledge OS | Brand Voice, Knowledge Graph snippets |
| **Investor Deck** | Brand OS | Experience OS | BrandOS, Motion OS, Engineering scale |
| **Recruitment** | Experience OS | Brand OS | Engineering OS specs, Brand culture |
| **Videos** | Experience OS | Knowledge OS | Storyboard, Motion OS, AI Content Spec |
| **Demo** | Experience OS | Engineering OS | Scene specs, Engineering Contracts, Interaction Tokens |

---

## The Rule

**Every future thing comes from this.**

If the asset does not trace back to SVARA OS, it does not exist.

1. Identify the asset (website, pitch deck, video, etc.)
2. Trace to its primary pillar (Brand OS, Knowledge OS, Experience OS)
3. Pull from the sub-system (Design OS, Motion OS, Engineering OS)
4. Execute from the contracts (tokens, specs, implementation contracts)
5. Verify against acceptance criteria

No new asset is created without tracing its lineage through this tree.

---

**SVARA OS is the brain. Everything else is a heartbeat.**
