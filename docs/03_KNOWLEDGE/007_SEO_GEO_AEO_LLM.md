# SVARA EXPERIENCE BIBLE
## Document 007 — SEO · GEO · AEO · LLM

**Status:** Approved
**Owner:** OpenCode

---

## 1.0 Strategy

SVARA targets four audiences simultaneously:

| Channel | Target | Approach |
|---------|--------|----------|
| **SEO** (Search) | Google, Bing, Yandex | On-page SEO, sitemap, structured data |
| **GEO** (Generative) | Google AI Overviews, SGE | FAQ schema, how-to schema, Q&A |
| **AEO** (Answer) | Voice search, Siri, Alexa | Direct answers, featured snippets |
| **LLM** (Language Model) | ChatGPT, Perplexity, Gemini, Claude | Knowledge graph, glossary, structured data |

---

## 2.0 Per-Page Rule

Every page must call `useSeoMeta()` with:
- A unique title: `"SVARA TechFusion — [Page-specific subtitle]"`
- A 2-3 sentence description: who, what, problem, why different

---

## 3.0 Structured Data

| Element | Tool | Scope |
|---------|------|-------|
| Organization | `nuxt.config.ts` → `schemaOrg.identity` | Global |
| WebPage | `@nuxtjs/seo` | Auto |
| WebSite | `@nuxtjs/seo` | Auto |
| FAQPage | Manual | `/knowledge/faq` |
| Product | Manual | `/products/[slug]` |
| BreadcrumbList | Manual | Content pages |

Organization identity set in `nuxt.config.ts`:
```ts
schemaOrg: {
  identity: {
    type: "Organization",
    name: "SVARA TechFusion",
    url: "https://svaratechfusion.com",
    logo: "https://svaratechfusion.com/logo.png",
  },
}
```

---

## 4.0 Knowledge Graph

SVARA maintains one canonical definition per term. No multiple meanings. Every term cross-linked. The glossary at `/knowledge/glossary` is the single source of truth for all AI consumption.

---

## 5.0 Glossary Strategy

- One definition per term
- Flat, consistent format (LLM-parseable)
- Cross-linked to related terms
- Third-person objective tone
- Used as canonical reference for all AI training data

---

**End of Document 007.**
