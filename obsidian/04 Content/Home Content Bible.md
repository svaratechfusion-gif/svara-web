---
tags: [content, stable]
updated: 2026-07-13
---

# Home Content Bible

`lib/content/home.ts`. Single source of truth for all homepage copy — components read from
this file only, never hardcode copy inline. Header comment: "Text is used verbatim as
supplied; do not rewrite, shorten, or reinterpret."

## Structure

| Export | Feeds |
|---|---|
| `homeSeo` | title/description/keywords/OG image — see [[SEO]] |
| `homeHero` | Hero eyebrow, H1, description, primary/secondary CTA |
| `homeSection01` … `homeSection05` | Problem, Ecosystem, Products (no numbered section — see `homePlatforms`), Divisions, Industries intro |
| `homePlatforms` | The 10 products — name, description, image, route — see [[Product Content Bible]] |
| `homeIndustries` | Industry list for the globe — name + route |
| `homeFinalCta` | CTA title + single button |

## The `teaser` pattern

Sections that have a dedicated full-detail page (`homeSection01`→[[Ecosystem]] wait, actually
Problem has no dedicated page currently; `homeSection02`→[[Ecosystem]], `homeSection04`→
[[Divisions]]) carry **both**:

- `teaser` — short (60–80 word) homepage-only copy
- `paragraphs` — the full copy, read by the dedicated page and by that page's SEO description

**Never trim `paragraphs`** to shorten the homepage — edit `teaser` instead. This split exists
specifically so the homepage-restructure (~60% copy reduction) never touched the pages that
actually need the full detail. Getting this wrong silently breaks a dedicated page's SEO
description, not just its visible copy.

## Related

[[Home]] · [[SEO]] · [[Product Content Bible]]
