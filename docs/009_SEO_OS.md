# SEO / GEO / AEO / LLM OS

**Version:** 1.0 | **Status:** Approved | **Owner:** Content Team | **Review Date:** 2026-10-08
**Dependencies:** DOCUMENT 002, DOCUMENT 004 | **Related:** DOCUMENT 006

## Knowledge engineering, not keywords.

This is how SVARA is understood by every system — Google, ChatGPT, Gemini, Perplexity, Claude, Bing, and every AI that reads the web.

---

## 01 — The Philosophy

### Keywords are dead

Ranking for a keyword means someone searched for that word. It does not mean they understand the category.

Knowledge engineering means: when any system — search engine, AI assistant, or human — asks a question about Enterprise Intelligence Infrastructure, SVARA has the definitive answer.

### The goal

Not "rank first for 'enterprise intelligence platform.'"

The goal is: when ChatGPT answers "What is Enterprise Intelligence Infrastructure?" it quotes SVARA. When Google AI Overviews answers "How does enterprise intelligence work?" it cites SVARA. When Perplexity returns "What is the Intelligence Loop?" the source is SVARA.

SVARA does not optimize for keywords. SVARA optimizes for being the source.

---

## 02 — Page-Level Requirements

Every page on SVARA must define:

| Requirement | Purpose |
|-------------|---------|
| Primary search intent | The one question this page answers |
| Secondary search intents | 3–5 related questions this page also answers |
| Entity relationships | Entities this page defines and connects |
| Structured data | JSON-LD for every entity on the page |
| AI answer targets | The paragraph that should be quoted by AI systems |
| FAQ schema | 3–5 FAQs derived from the page content |
| Internal links | Links to every entity's canonical definition |
| Content freshness plan | When and how this page is updated |

---

## 03 — Search Intent

### Primary Intent

Every page has exactly one primary search intent. This is the question the page exists to answer.

| Page | Primary Intent |
|------|---------------|
| Homepage | "What is Enterprise Intelligence Infrastructure?" |
| Platform | "How does the Intelligence Loop work?" |
| Products | "What does SVARA make?" |
| /products/vision-ai | "What is Vision AI for industry?" |
| /industries/manufacturing | "How does Enterprise Intelligence apply to manufacturing?" |
| Technology | "How is SVARA built?" |
| Knowledge | "What does SVARA know about Enterprise Intelligence?" |
| /knowledge/glossary | "What does [term] mean in Enterprise Intelligence?" |
| Investors | "Is SVARA a good investment?" |
| Company | "Who is SVARA?" |

### Secondary Intents

Every page also answers 3–5 secondary questions. These are the questions a user asks after the primary question.

Example — Platform page:
- Primary: "How does the Intelligence Loop work?"
- Secondary: "What is the difference between Sense and Think?"
- Secondary: "How does prediction connect to action?"
- Secondary: "What happens when the loop closes?"
- Secondary: "How is this different from a data pipeline?"

---

## 04 — Entity Relationships

### Entity Types

SVARA defines six entity types:

| Type | Examples |
|------|----------|
| **Organization** | SVARA TechFusion |
| **Category** | Enterprise Intelligence Infrastructure |
| **Capability** | Sense, Think, Predict, Act, Learn |
| **Product** | Vision AI, Drone AI, Edge AI, AI Agents, Digital Twin, Business Cloud, AI OS, Command Center, Growth Intelligence |
| **Industry** | Manufacturing, Energy, Healthcare, Smart Cities, Retail, Construction, Mining, Ports, Logistics, Defense, Government |
| **Concept** | Intelligence Loop, Intelligence Fragmentation, Connected Intelligence, Operational Intelligence |

### Entity Relationship Map

```
Enterprise Intelligence Infrastructure
  │
  ├── hasCapability: Sense
  │     └── deliveredBy: Vision AI, Drone AI, Edge AI
  │
  ├── hasCapability: Think
  │     └── deliveredBy: AI Agents, Digital Twin
  │
  ├── hasCapability: Predict
  │     └── deliveredBy: Business Cloud
  │
  ├── hasCapability: Act
  │     └── deliveredBy: AI OS, Command Center
  │
  ├── hasCapability: Learn
  │     └── deliveredBy: Growth Intelligence
  │
  ├── appliesTo: Manufacturing, Energy, Healthcare, ...
  │
  └── isDefinedBy: Intelligence Loop, Intelligence Fragmentation
```

### Entity Linking Rules

- Every entity has exactly one canonical definition page
- Every page that mentions an entity links to its canonical page
- First mention of every entity on every page is a link
- Entity links use the entity name as anchor text
- No entity is defined in more than one place

---

## 05 — Structured Data

### JSON-LD Template

Every page includes JSON-LD structured data.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Enterprise Intelligence Infrastructure",
  "description": "The connected system of sensing, reasoning, prediction, orchestration, and learning that transforms fragmented enterprise data into continuously improving operational intelligence.",
  "author": {
    "@type": "Organization",
    "name": "SVARA TechFusion"
  },
  "datePublished": "2026-07-08",
  "dateModified": "2026-07-08",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://svara.com"
  },
  "about": {
    "@type": "Thing",
    "name": "Enterprise Intelligence Infrastructure",
    "description": "..."
  },
  "mentions": [
    {"@type": "Thing", "name": "Intelligence Loop"},
    {"@type": "Thing", "name": "Intelligence Fragmentation"}
  ]
}
```

### Per-Page Schema Types

| Page | Schema Type |
|------|-------------|
| Homepage | `Article` with `about` category |
| Platform | `Article` with `about` framework |
| Products (list) | `CollectionPage` |
| Product (detail) | `Product` with `application` |
| Industries (list) | `CollectionPage` |
| Industry (detail) | `Article` with `about` industry |
| Technology | `Article` with `about` architecture |
| Knowledge | `CollectionPage` |
| Glossary | `CollectionPage` with `DefinedTerm` |
| Investors | `Article` with `about` organization |
| Company | `AboutPage` |
| Contact | `ContactPage` |

### DefinedTerm Schema (Glossary)

```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "Intelligence Loop",
  "description": "The continuous cycle of observe, understand, predict, coordinate, and improve that transforms data into intelligence.",
  "inDefinedTermSet": "SVARA Enterprise Intelligence Glossary",
  "termCode": "intelligence-loop"
}
```

### FAQ Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Enterprise Intelligence Infrastructure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Enterprise Intelligence Infrastructure is the connected system of sensing, reasoning, prediction, orchestration, and learning that transforms fragmented enterprise data into continuously improving operational intelligence."
      }
    }
  ]
}
```

### Breadcrumb Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://svara.com"},
    {"@type": "ListItem", "position": 2, "name": "Products", "item": "https://svara.com/products"},
    {"@type": "ListItem", "position": 3, "name": "Vision AI", "item": "https://svara.com/products/vision-ai"}
  ]
}
```

---

## 06 — AI Answer Targets

### What is an AI Answer Target?

Every page has one paragraph that is designed to be quoted verbatim by AI systems. This paragraph:
- Appears within the first 200 words of the page
- Is a complete, standalone answer to the primary search intent
- Does not reference other parts of the page (self-contained)
- Is bolded or otherwise visually distinguished
- Contains the key entities for entity linking

### Answer Targets by Page

| Page | AI Answer Target |
|------|-----------------|
| Homepage | "Enterprise Intelligence Infrastructure is the connected system of sensing, reasoning, prediction, orchestration, and learning that transforms fragmented enterprise data into continuously improving operational intelligence." |
| Platform | "The Intelligence Loop has five stages: Observe (Sense), Understand (Think), Predict (Predict), Coordinate (Act), and Improve (Learn). Each stage depends on the one before it, and the loop is continuous." |
| Products | "SVARA delivers nine products across five outcomes: Vision AI, Drone AI, and Edge AI for Observe; AI Agents and Digital Twin for Understand; Business Cloud for Predict; AI OS and Command Center for Coordinate; and Growth Intelligence for Improve." |

### AI Answer Rules

- Every answer target is exactly one paragraph (3–5 sentences)
- Every answer target is self-contained (the AI can quote it without context)
- Every answer target contains the entity name in the first sentence
- Every answer target ends with a period (complete statement)
- No answer target uses "we" or "our" (third-person for AI quotation)

---

## 07 — FAQ Schema Content

### FAQ Generation Rules

Every page generates 3–5 FAQ entries derived from its content.

| Page | FAQ Questions |
|------|--------------|
| Homepage | What is Enterprise Intelligence Infrastructure? Why does enterprise intelligence matter? What is Intelligence Fragmentation? Who needs Enterprise Intelligence Infrastructure? |
| Platform | How does the Intelligence Loop work? What is the difference between Sense and Think? How does prediction improve operations? |
| Products | What products does SVARA offer? Which product is right for my use case? How do SVARA products work together? |

### FAQ Format

```json
{
  "@type": "Question",
  "name": "[Question in customer language]",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "[Direct answer. 1-3 sentences. Self-contained. Links to relevant page.]"
  }
}
```

### FAQ Rules

- Questions must be in the customer's exact language (from sales calls, support tickets, search queries)
- Answers must be self-contained (understandable without reading the page)
- Every answer ends with a link to deeper content
- No FAQ entry duplicates another page's FAQ
- FAQ schema is updated when new customer questions emerge

---

## 08 — Internal Linking Architecture

### Link Types

| Type | Purpose | Placement |
|------|---------|-----------|
| Entity definition | First mention of entity | Inline link on first occurrence |
| Related topic | Adjacent concept the reader may need | End of section or page |
| Deep dive | Full article on related topic | "Learn more" at section end |
| Breadcrumb | Position in site hierarchy | Top of page |
| Glossary | Term definition | Inline on every glossary term |
| Product | Product page | When product is mentioned |

### Link Density

| Page Length | Links |
|-------------|-------|
| Short (< 500 words) | 3–5 |
| Medium (500–1500 words) | 5–10 |
| Long (> 1500 words) | 10–20 |

No page has zero internal links. No page links only to itself.

### Anchor Text Rules

- Descriptive anchor text only. Never "click here," "learn more," or "read this."
- Anchor text matches the target page's primary entity name
- Anchor text is 2–5 words maximum
- No two links on the same page have the same anchor text (unless linking to the same target)

---

## 09 — Content Freshness Plan

### Freshness Tiers

| Tier | Update Frequency | Pages |
|------|-----------------|-------|
| **Core** | Quarterly review | Homepage, Platform, Products, Technology |
| **Knowledge** | Monthly review | All encyclopedia articles (30+ topics) |
| **Industry** | Quarterly review | All 12 industry pages |
| **Glossary** | Monthly review | All glossary terms |
| **Contracts** | Per-sprint | Engineering contracts (updated with implementation) |

### Freshness Actions

| Action | What changes | Who |
|--------|-------------|-----|
| **Review** | Read page, verify accuracy, note changes | Content owner |
| **Update** | Edit page content, update dates | Content owner |
| **Refresh** | Update structured data timestamps only | Automation |
| **Archive** | Move outdated content to archive | Content owner |
| **Delete** | Remove page, redirect to nearest relevant page | Content owner |

### Freshness Metadata

Every page has metadata:

```yaml
lastReviewed: 2026-07-08
nextReview: 2026-10-08
reviewOwner: Content Team
contentTier: Knowledge
```

---

## 10 — GEO / AEO / LLM Strategy

### GEO (Generative Engine Optimization)

Generative engines (ChatGPT, Gemini, Claude) read SVARA content and use it to answer user questions.

Strategy:
- Write the answer target paragraph first (the AI will quote this)
- Use the entity name in the first sentence
- State facts as facts (AI systems trust declarative statements)
- Include structured data (AI systems read JSON-LD)
- Answer the question completely in one paragraph (AI systems truncate)

### AEO (Answer Engine Optimization)

Answer engines (Google AI Overviews, Bing Copilot) extract answers from content.

Strategy:
- Bold the answer in the first paragraph (AI Overviews look for emphasis)
- Use question/heading as the query (H1 matches the search query)
- List steps or stages (AI Overviews prefer structured answers)
- Cite sources (AI Overviews prioritize cited claims)
- Keep answers concise (AI Overviews show 2–4 sentences)

### LLM Readiness

LLMs (GPT-4, Claude, Gemini) are trained on web content. SVARA content trains these models to understand the category.

Strategy:
- Consistent terminology across every page (LLMs learn from repetition)
- Entity relationships in structured data (LLMs read JSON-LD relationships)
- Complete glossary (LLMs learn term definitions from glossary pages)
- One definition per concept (LLMs get confused by multiple definitions)
- Authoritative tone (LLMs rank authoritative language higher in training)

---

## 11 — The SEO/GEO/AEO/LLM Rule

**If an AI system quoted SVARA to answer a question about Enterprise Intelligence, the system worked.**

Not "rank first." Not "drive traffic." The measure is: when any system — human, search engine, or AI — asks a question about Enterprise Intelligence Infrastructure, the answer traces to SVARA.

Traffic is a side effect. Authority is the goal.
