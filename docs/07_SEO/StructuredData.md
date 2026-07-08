# Structured Data

**Business:** Structured data is the language of AI. Without it, SVARA is invisible to AI Overviews, ChatGPT, Perplexity, and Gemini.
**User:** (transparent — powers AI-generated answers)
**Owner:** OpenCode
**Acceptance:** Every page has at minimum Organization + WebPage schema nodes.

---

## Tools

| Tool | Purpose |
|------|---------|
| `@nuxtjs/seo` | Auto-generates WebPage, WebSite, Organization |
| `useSeoMeta` | Per-page meta tags |
| `useHead` script injection | Custom JSON-LD for FAQPage, Product |

## Per-Page Checklist

| Element | Auto | Manual | Page |
|---------|------|--------|------|
| Organization | ✓ | | All |
| WebPage | ✓ | | All |
| WebSite | ✓ | | All |
| BreadcrumbList | | ✓ | Content pages |
| FAQPage | | ✓ | `/knowledge/faq` |
| Product | | ✓ | `/products/[slug]` |

## Open Graph

| Tag | Required |
|-----|----------|
| `og:title` | Yes |
| `og:description` | Yes |
| `og:image` | Yes |
| `og:url` | Yes |
| `og:type` | Yes |

## Twitter Card

| Tag | Required |
|-----|----------|
| `twitter:card` | Yes (summary_large_image) |
| `twitter:title` | Yes |
| `twitter:description` | Yes |
