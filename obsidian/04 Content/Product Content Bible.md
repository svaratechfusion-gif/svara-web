---
tags: [content, stable]
updated: 2026-07-13
---

# Product Content Bible

The content files powering [[Products]] and, via the same shape, [[Technology]] and the
Industries detail pages. Each file exports a `KnowledgeProductContent` object
(`lib/types/content.ts`) consumed by `useKnowledgeProduct` + `KnowledgeProductLayout.vue`.

## The `KnowledgeProductContent` shape

```ts
{
  canonicalDefinition: string   // the "what is X" answer — AI/LLM-answer-target framing
  aiAnswerTarget: string
  architecture: { overview: string, components: { name, description }[] }
  useCases: {...}[]
  deployment: { overview: string, steps: {...}[], integration: string }
  metadata: {
    pageType: "article" | "product" | "defined-term" | "collection"
    // ...
  }
  // + more — see lib/types/content.ts for the full interface
}
```

`canonicalDefinition` / `aiAnswerTarget` exist specifically to give LLM/AI-search crawlers a
direct, quotable answer near the top of the page — see [[SEO]] for the GEO (generative-engine
optimization) strategy this serves.

## Files (one per platform/topic)

`lib/content/` — `vision-ai.ts`, `drone-ai.ts`, `edge-ai.ts`, `ai-agents.ts`,
`digital-twin.ts`, `business-cloud.ts`, `ai-os.ts`, plus the broader Technology/Industries set
(`computer-vision.ts`, `nlp.ts`, `sensor-fusion.ts`, `swarm-intelligence.ts`,
`digital-engineering` topics, `manufacturing.ts`, `healthcare.ts`, `logistics.ts`,
`agriculture.ts`, `construction.ts`, `defense.ts`, `energy.ts`, `government.ts`, `mining.ts`,
`ports.ts`, `retail.ts`, `smart-cities.ts`, and more — 43 files total under `lib/content/`).

See [[Products]] for the current slug-mapping table and its known gaps.

## Related

[[Products]] · [[Technology]] · [[SEO]] · [[Home Content Bible]]
