---
tags: [seo, stable]
updated: 2026-07-13
---

# Schema (JSON-LD)

`lib/seo/jsonld.ts` — nine generator functions, one per schema.org type in use. Structured
data is **JSON-LD only** — no microdata/RDFa in markup (same rule Next16 codifies in
`html-semantics.md`; SVARA arrived at the same convention independently).

## Generators

| Function | Schema.org type | Used by |
|---|---|---|
| `generateWebSiteJsonLd` | `WebSite` | Root layout / homepage |
| `generateArticleJsonLd` | `Article` | Blog/article-type pages |
| `generateProductJsonLd` | `Product` | Product detail pages |
| `generateDefinedTermJsonLd` | `DefinedTerm` | Glossary / technology-topic pages |
| `generateFaqJsonLd` | `FAQPage` | `/knowledge/faq` |
| `generateBreadcrumbJsonLd` | `BreadcrumbList` | Any page with breadcrumb nav |
| `generateCollectionPageJsonLd` | `CollectionPage` | Index pages (Products, Industries, …) |
| `generateAboutPageJsonLd` | `AboutPage` | `/company` |
| `generateContactPageJsonLd` | `ContactPage` | [[Contact]] |
| `generateKnowledgeProductJsonLd` | (composite, from `KnowledgeProductContent`) | Every Product/Technology/Industry detail page — see [[Product Content Bible]] |

`Organization` identity is configured once in `nuxt.config.ts`'s `schemaOrg.identity` block
(fed by `lib/seo/site.ts`) via the `@nuxtjs/seo` module, rather than a hand-written generator —
the module renders that graph automatically.

## Related

[[SEO]] · [[Product Content Bible]]
