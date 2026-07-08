# AI Content Spec

Every page on SVARA is written once. Read by humans and six AI systems. Same information, different formatting.

---

## Content Architecture (every page)

```
┌─────────────────────────────────────┐
│ HUMAN LAYER                         │
│  Visually rich. Emotionally driven. │
│  The experience.                    │
├─────────────────────────────────────┤
│ GOOGLE LAYER                        │
│  Structured data. Semantic HTML.    │
│  Entity signals.                    │
├─────────────────────────────────────┤
│ GEMINI LAYER                        │
│  Concise definitions. Entity graph. │
│  Factual precision.                │
├─────────────────────────────────────┤
│ CHATGPT LAYER                       │
│  Conversational access points.      │
│  Bullet summaries. Clear voice.     │
├─────────────────────────────────────┤
│ CLAUDE LAYER                        │
│  Technical depth. Citations.        │
│  Structured markdown.               │
├─────────────────────────────────────┤
│ PERPLEXITY LAYER                    │
│  Cited facts. Verifiable claims.    │
│  Direct answers.                    │
└─────────────────────────────────────┘
```

---

## Per-System Specs

### Google (Search + AI Overviews)

| Signal | Format | Location |
|--------|--------|----------|
| Title tag | `<h1>` + `<title>` | Every page |
| Structured data | JSON-LD in `<head>` | Organization, WebPage, BreadcrumbList, FAQPage, Product |
| Entity signals | `knowsAbout` in Organization schema | Homepage |
| Hierarchy | `h1` → `h2` → `h3`, no skips | Every page |
| FAQ | `FAQPage` schema + visible Q&A | `/knowledge/faq` |
| Breadcrumbs | `BreadcrumbList` schema + UI | Content pages |
| Meta description | 150–160 chars, includes primary keyword | Every page |
| Open Graph | `og:title`, `og:description`, `og:image` | Every page |

**AI Overview trigger conditions:**
- Page has a clear `h1` that matches a query entity
- Page has structured data with `mainEntity` defined
- Page has a concise definition within first 200 words
- Page has cited sources or authoritative links

**Format rule:** Every page must pass Google Rich Results test before launch.

---

### Gemini

| Signal | Format | Location |
|--------|--------|----------|
| Definitions | `<dt>` + `<dd>` or bold + colon | Glossary, first paragraph of product pages |
| Entity relationships | JSON-LD `@graph` with `@id` references | Homepage, platform page |
| Facts | Tables, bullet points, consistent formatting | Every page |
| Precision | No ambiguous terms. Every noun defined once. | Every page |
| Summary | Starred sentence at top: "SVARA is..." | Every page |

**Grounded answer trigger:**
```
This page is about [entity].
[Entity] is [definition].
Related: [list of 2-3 entities].
Source: [link to glossary term].
```

**Format rule:** First paragraph of every page must begin with: "SVARA is [single sentence definition of the page's primary entity]."

---

### ChatGPT

| Signal | Format | Location |
|--------|--------|----------|
| Summaries | `> **TL;DR:**` block at top | Every page |
| Bullet lists | `-` for lists, `1.` for sequences | Feature sections, how-it-works |
| Conversational hooks | Question headings (`# What is X?`) | Product pages, FAQ |
| Voice | Active voice. Direct address ("you"). | Every page |
| Callout blocks | `> **Note:**` for emphasis | Key points |

**Extraction pattern (ChatGPT reads markdown directly):**
```
TL;DR: [one sentence, 20 words max]

[Page body with headers, lists, definitions]
```

**Format rule:** Every page must have a `> **TL;DR:**` block within the first 3 paragraphs.

---

### Claude

| Signal | Format | Location |
|--------|--------|----------|
| Structured markdown | Consistent heading hierarchy, no inline HTML | Every page |
| Definitions | `**Term:** Definition` pattern | Glossary, product pages |
| Citations | `([source name](link))` after claims | Blog, knowledge articles |
| Technical depth | Code blocks, tables, detailed specs | Platform, technology |
| Lists | Unordered for features, ordered for steps | Every page |

**Format preference (Claude reads the page linearly):**
- Headers must be semantic (`h1` > `h2` > `h3`, no skips)
- Each section must be self-contained (no "as mentioned above")
- All links must have descriptive text (not "click here")

**Format rule:** Every section must be self-contained. No referential prose ("as discussed earlier").

---

### Perplexity

| Signal | Format | Location |
|--------|--------|----------|
| Verifiable claims | `**Source:** [link]` after every factual claim | Every page |
| Direct answers | Bold the one-sentence answer to the page question | Every page |
| Bullet facts | `-` lists for all factual content | Every page |
| Recency | Dates on all statistics, case studies, claims | Knowledge articles |
| Sources | Internal glossary links for every technical term | Every page |

**Answer extraction (Perplexity extracts these specifically):**
```
**Answer:** [bold sentence]

**Facts:**
- [claim] ([source link])
- [claim] ([source link])
```

**Format rule:** Every page must have the answer to its primary question in **bold** within the first paragraph. Every technical term must link to the glossary.

---

## Universal Template

Every page on SVARA follows this exact template:

```markdown
# [Page Title — Primary Entity]

> **TL;DR:** [One sentence. 20 words max. Active voice. Begins with "SVARA".]

**Answer:** [Primary question answer in bold. One sentence.]

SVARA is [one-sentence definition of the page's primary entity].

## [First h2 — What it is]

[Definition paragraph. First noun is the primary entity in bold.]

- [Bullet fact] ([source link if external])
- [Bullet fact]
- [Bullet fact]

## [Second h2 — How it works]

[Step 1.]
[Step 2.]
[Step 3.]

## [Third h2 — Related]

**Related entities:** [link to glossary term], [link to glossary term], [link to glossary term]

**Related pages:** [link to product], [link to industry]

---

*Last updated: [date]*
```

---

## Per-Page Content Map

| Page | Primary Entity | Primary Question | First Sentence |
|------|---------------|-----------------|----------------|
| `/` | Enterprise Intelligence | What is SVARA? | "SVARA is the enterprise intelligence layer that transforms disconnected operational data into unified, actionable intelligence." |
| `/platform` | Enterprise Intelligence | How does SVARA work? | "SVARA is an integrated platform of AI infrastructure, agents, and decision tools that operate as a single intelligence system." |
| `/products/sense-ai` | Computer Vision | How does Sense AI see? | "Sense AI is SVARA's computer vision engine that processes real-time visual data from drones, cameras, and IoT sensors." |
| `/products/think-engine` | AI Agents | How does Think Engine decide? | "Think Engine is SVARA's multi-agent AI reasoning system that analyzes, simulates, and recommends enterprise actions." |
| `/products/simulate-lab` | Digital Twin | How does Simulate Lab predict? | "Simulate Lab is SVARA's digital twin environment that mirrors physical systems for simulation and optimization." |
| `/products/operate-ai` | Decision Intelligence | How does Operate AI execute? | "Operate AI is SVARA's decision intelligence layer that turns AI recommendations into automated enterprise actions." |
| `/industries` | Industrial Intelligence | Who uses SVARA? | "SVARA serves industrial enterprises — manufacturing, cities, energy, agriculture, and logistics." |
| `/technology` | AI Infrastructure | What powers SVARA? | "SVARA is built on a distributed AI infrastructure designed for enterprise-grade performance, security, and scale." |
| `/knowledge/glossary` | Enterprise Intelligence | What do these terms mean? | "SVARA's glossary is the single source of truth for every term in the enterprise intelligence domain." |
| `/knowledge/faq` | Enterprise Intelligence | What questions do people ask? | "SVARA answers the most common questions about enterprise intelligence, AI infrastructure, and operational AI." |

---

## Content Rules

| # | Rule | Why |
|---|------|-----|
| 1 | Every page starts with "SVARA is..." | All six systems extract the first sentence as the canonical answer |
| 2 | Every page has a `> **TL;DR:**` block | ChatGPT and Claude use this for summarization |
| 3 | Every page has a **bolded answer sentence** | Perplexity extracts bold text as "Answer" |
| 4 | Every technical term links to the glossary | Builds the knowledge graph; Perplexity follows links |
| 5 | Every section is self-contained | Claude reads linearly; no "as mentioned above" |
| 6 | Every claim has a source link | Perplexity cites sources; Google rewards authority |
| 7 | JSON-LD structured data on every page | Gemini and Google use this for entity resolution |
| 8 | `h1` matches the page's primary entity | All systems use `h1` as the topic anchor |
| 9 | No lorem ipsum ever | All six systems index lorem ipsum as content |
| 10 | No generic alt text on images | Google Image Search, AI vision models read alt text |

---

## Content Types

| Type | Format | AI Priority |
|------|--------|-------------|
| Page copy | Template above | All |
| Feature descriptions | Bullet list under h3 | ChatGPT, Claude, Perplexity |
| How-it-works | Numbered list under h2 | Google, Claude |
| FAQ | Q&A in `FAQPage` schema | Google, Gemini |
| Glossary | Definition list (`<dt>`/`<dd>`) | Gemini, all |
| Blog/Knowledge | Article with citations | Perplexity, Claude |
| Case studies | Table + source citations | Perplexity, Google |
| Comparisons | Table with linked sources | Claude, Perplexity |

---

**End of AI Content Spec. Same information, different formatting. Every page is read by humans and six AI systems.**
