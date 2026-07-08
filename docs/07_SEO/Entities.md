# SEO Entities

**Business:** Google and AI platforms must understand who SVARA is.
**User:** (transparent — search result)
**Owner:** OpenCode
**Acceptance:** Schema.org Organization identity present on every page.

---

## Organization

| Property | Value |
|----------|-------|
| `@type` | Organization |
| `name` | SVARA TechFusion |
| `url` | `https://svaratechfusion.com` |
| `logo` | `https://svaratechfusion.com/logo.png` |

## Implementation

Set globally in `nuxt.config.ts` via `@nuxtjs/seo`:

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

## Per-Page Entities

| Page Type | Schema Type |
|-----------|-------------|
| Homepage | WebPage |
| Platform | WebPage |
| Products | WebPage |
| Product detail | Product |
| Industries | WebPage |
| FAQ | FAQPage |
| Glossary | WebPage |
| Investors | WebPage |
| Company | WebPage |
