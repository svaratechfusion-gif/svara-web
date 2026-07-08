# SVARA EXPERIENCE SPECIFICATION
## 02 — INFORMATION ARCHITECTURE

**Type:** SES
**Status:** Source of Truth

---

## Primary Navigation

| # | Label | Path | Type |
|---|-------|------|------|
| 1 | Experience | `/` | Cinematic homepage (10-scene experience) |
| 2 | Platform | `/platform` | Product page |
| 3 | Products | `/products` | Product overview |
| 4 | Industries | `/industries` | Industry overview |
| 5 | Technology | `/technology` | Product page |
| 6 | Knowledge | `/knowledge` | Resource hub |
| 7 | Investors | `/investors` | Business page |
| 8 | Company | `/company` | Business page |
| 9 | Contact | `/contact` | Utility page |

---

## URL Hierarchy

```
/
├── platform
├── products
│   ├── vision-ai
│   ├── drone-ai
│   ├── edge-ai
│   ├── generative-ai
│   ├── ai-agents
│   ├── ai-os
│   ├── digital-twin
│   ├── unified-business-cloud
│   ├── command-center
│   └── digital-growth
├── industries
│   ├── manufacturing
│   ├── healthcare
│   ├── energy
│   └── cities
├── technology
│   └── security
├── knowledge
│   ├── faq
│   └── glossary
├── investors
├── company
│   ├── manifesto
│   ├── about
│   └── careers
├── contact
└── legal
    ├── privacy
    └── terms
```

---

## Page Types

| Type | Description | Example |
|------|-------------|---------|
| **Experience** | Full-screen cinematic scroll-driven narrative | `/` |
| **Product** | Knowledge Hub with Q&A, glossary, architecture | `/products/vision-ai` |
| **Industry** | 7-section template: Problem → Use Cases → ROI | `/industries/manufacturing` |
| **Business** | Company, investor, contact pages | `/investors` |
| **Resource** | Knowledge base, FAQ, glossary | `/knowledge` |
| **Utility** | Legal, privacy, terms | `/legal/privacy` |

---

## Routing Rules

| Rule | Implementation |
|------|---------------|
| All routes are static | No dynamic params. Every page is a known path |
| 404 redirects to `/` | The experience is the fallback |
| Product pages follow `/products/[slug]` | Consistent pattern, no exceptions |
| Industry pages follow `/industries/[slug]` | Consistent pattern, no exceptions |
| Knowledge pages follow `/knowledge/[slug]` | FAQ, glossary, case studies |

---

## Content Priority Matrix

| Content | Lives On | Rationale |
|---------|----------|-----------|
| Category intro | Homepage (Act 3-4) | Establish the category |
| Problem | Homepage (Act 2) | Felt, not read |
| Platform overview | Homepage (Act 4) | Enough to understand the concept |
| Product details | Knowledge Hubs | Dedicated deep-dives |
| Industry deep dives | `/industries/[name]` | 7-section template per industry |
| Case studies | Knowledge | Full quotes and metrics |
| Technology architecture | `/technology` | Engineering depth |
| Investor material | `/investors` | Market size, traction |
| Company story | `/company` | Leadership, culture, careers |

---

**End of SES-02.**
