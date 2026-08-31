---
tags: [website, stable]
updated: 2026-07-13
---

# Products — `/products` + `/products/[slug]`

`app/pages/products.vue` (index) and `app/pages/products/[slug].vue` (dynamic detail,
via `useKnowledgeProduct` composable + `KnowledgeProductLayout.vue`). Ten platforms, each with
its own content file under `lib/content/`.

## The ten platforms (from `homePlatforms`, [[Home Content Bible]])

| Platform | Slug | Content file |
|---|---|---|
| Vision AI | `/products/vision-ai` | `lib/content/vision-ai.ts` |
| Drone AI | `/products/drone-ai` | `lib/content/drone-ai.ts` |
| Edge AI | `/products/edge-ai` | `lib/content/edge-ai.ts` |
| Generative & Cognitive AI | `/products` (no dedicated slug yet) | — |
| Autonomous AI Agents | `/products/ai-agents` | `lib/content/ai-agents.ts` |
| Digital Twin | `/products/digital-twin` | `lib/content/digital-twin.ts` |
| Unified Business Cloud | `/products/business-cloud` | `lib/content/business-cloud.ts` |
| One AI OS | `/products/ai-os` | `lib/content/ai-os.ts` |
| Digital Engineering | `/products` (no dedicated slug yet) | — |
| Growth & PR Tech | `/products` (no dedicated slug yet) | `lib/content/growth-intelligence.ts`? — verify mapping |

> [!note] `#todo`
> Three platforms (Generative & Cognitive AI, Digital Engineering, Growth & PR Tech) route
> back to `/products` instead of a dedicated slug — confirm whether that's intentional
> (not yet built) or a content-file naming mismatch before treating the table above as final.

## Content model

Each product content file follows the `KnowledgeProductContent` shape (see
`lib/types/content.ts`) — `canonicalDefinition`, `aiAnswerTarget`, `architecture`, `useCases`,
`deployment`, `metadata` (with a `pageType` union), etc. This is the same
canonical-definition/AI-answer-target structure used for `/technologies/[slug]` and
`/industries/[slug]` — see [[Product Content Bible]] for the full pattern.

## Related

[[Home]] · [[Product Content Bible]] · [[Technology]]
