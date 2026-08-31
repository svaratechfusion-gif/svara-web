---
tags: [seo, stable]
updated: 2026-07-13
---

# SEO

## Stack

`@nuxtjs/seo` (a real Nuxt module, `^5.3.2`) handles sitemap/robots/canonical/OG scaffolding —
the module-based equivalent of Next16's hand-rolled `generate-page-metadata.ts` +
`robots.ts`/`sitemap.ts`. No need to hand-roll what the module already does.

`lib/seo/site.ts` — the single source of truth for site identity (`SITE_URL`,
`ORGANIZATION_NAME`, `DEFAULT_LOGO`), consumed by both `nuxt.config.ts` (the `site.url`/
`schemaOrg.identity` config) and every JSON-LD helper — same "one config, everything reads it"
principle as Next16's `siteConfig`. **Domain is deferred** until production hosting is known —
this constant is the one place to update.

`lib/seo/meta.ts` — `generateMetaTags(config)` builds per-page meta; `generateAiAnswerTarget`
/ `extractAiAnswerParagraph` are GEO-specific helpers (below).

## SEO/GEO strategy — the four-question structure

Every content page (Products/Technology/Industries detail pages) is structured to directly
answer four question types, both for traditional search and for AI/LLM answer engines:

1. **What is it** — `canonicalDefinition` (see [[Product Content Bible]])
2. **How does it work** — `architecture`
3. **How is it used** — `useCases`
4. **How is it deployed** — `deployment`

This is deliberately AI-answer-engine-aware (GEO — generative engine optimization), not just
classic SEO: `aiAnswerTarget` and `extractAiAnswerParagraph` exist to give crawlers a single,
quotable, unambiguous paragraph near the top of the page rather than making them infer an
answer from prose spread across the page.

## Related

[[Schema]] · [[Product Content Bible]] · [[Home Content Bible]]
