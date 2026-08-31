---
tags: [website, stable]
updated: 2026-07-13
---

# Technology — `/technology` + `/technologies/[slug]`

`app/pages/technology.vue` (index) and `app/pages/technologies/[slug].vue` (dynamic detail).
Distinct from [[Divisions]] (`/divisions`) — Technology covers individual technology
capabilities/topics (e.g. computer vision, NLP, sensor fusion, swarm intelligence — see the
matching files in `lib/content/`: `computer-vision.ts`, `nlp.ts`, `sensor-fusion.ts`,
`swarm-intelligence.ts`, `edge-computing.ts`), while Divisions covers the six *organizational*
technology groups the platforms are built through.

Uses the same `KnowledgeProductContent` shape and `useKnowledgeProduct` composable as
[[Products]] — see [[Product Content Bible]] for the canonical-definition pattern shared
across Products/Technology/Industries detail pages.

## Related

[[Divisions]] · [[Products]] · [[Home]] §5 (homepage "Technology" section renders the six
Divisions, not this page's topic list — don't conflate the two when editing either)
