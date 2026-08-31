---
tags: [meta, changelog]
updated: 2026-07-13
---

# Version History

Chronological log of notable changes. Human-curated — not a mirror of `git log` (see the raw
commit list at the bottom for that). Newest first.

## 2026-07-13

- **`obsidian/` vault created** — migrated the documentation *pattern* (not code — the stacks
  don't match) from `textura-agency/next16-claude-starter`: vault-as-source-of-truth,
  ADR discipline, folder-placement rules. Structure: `01 Brand` / `02 Website` /
  `03 Engineering` / `04 Content` / `05 Decisions`, per explicit user spec. See
  [[Decision Log]] ADR-0005. Surfaced several confirmed-dead/orphaned paths in the process
  (`lib/lenis/`, `lib/gsap`'s vendored source tree, `lib/experience 2/`, empty placeholder
  folders, stray "2"-suffixed duplicate files) — flagged, not yet removed.
- **Stage 5 — section gravity + Footer density** — the one Helios particle system now pulls
  toward whichever section is in view (Problem/Products/Industries/Technology/CTA) and thins
  near the Footer. Two real bugs found and fixed during verification: a persistent-offset
  requirement (Flow state recomputes target from scratch every frame) and a coordinate-space
  mismatch (NDC→world results weren't converted into the entity's local space). See
  [[Decision Log]] ADR-0003, ADR-0004.

## 2026-07-12

- **Stage 4 — page-wide flow** — the dissolved particle cloud expands from a Hero-bounded
  canvas to a `position: fixed` page-wide overlay; becomes a continuous downward current after
  scroll-driven dissolve completes, independent of further scroll.
- **Global navigation** — Connect moved top-right (fixed), Menu moved into the Hero's
  bottom-right (scrolls away with it).

## 2026-07-10 – 2026-07-11

- **Helios Stages 1–3** — Hero-scoped particle engine built: humanoid-sentinel assembly from
  ~13–18k particles (device-tier), cursor "magnetic dust" local attraction, elegant
  (non-explosive) scroll-driven dissolve sequenced head→neck→shoulders→torso. See
  [[Decision Log]] ADR-0002.
- **Content Bible Vol. 01 — homepage content integration** — exact-copy content wired in from
  `lib/content/home.ts`.
- **Homepage Sprint 1** — narrative complete, "one story, ten beats."
- **Visual polish + Experience polish passes** — craftsmanship/motion refinement without
  redesign or content changes.

## Earlier (SVARA 2.0 sprints, from git history)

- **SVARA 2.0 Sprint 0–2.1** — audited and archived V1 (`archive/v1`), scaffolded the V2
  structure, built the foundation engine, then the first Helios technical architecture pass
  and anatomical region system (head/face/neck/chest/shoulders) feeding the 7-state lifecycle
  (Dormant→Assemble→Idle→Interact→Dissolve→Flow→Reassemble).
- **SVARA OS v1.0** — the `docs/` submodule's Volume 0-9 documentation (Constitution, Company
  OS, Category OS, Engineering OS, Motion OS, SEO/GEO/AEO/LLM OS, Homepage Blueprint, Decision
  Ledger, Implementation Contracts) — the earlier, fuller documentation layer this vault now
  sits alongside rather than replaces.

## Raw commit reference (most recent 12)

| Commit | Description |
|---|---|
| `2e2e7ab` | Global navigation — Connect top-right, Menu bottom-right floating dock |
| `cad20c8` | Content Bible Vol 01 — homepage content integration (exact copy) |
| `9aeb1ef` | HOMEPAGE SPRINT 1 — complete the narrative (one story, ten beats) |
| `3ec61f7` | VISUAL POLISH — craftsmanship pass (no redesign, no new concepts) |
| `84b6bdf` | EXPERIENCE POLISH — premium motion layer (no layout/content changes) |
| `615d132` | SVARA 2.0 — SHIP: production homepage + polish |
| `4866526` | Helios — 7-state lifecycle |
| `2fe447d` | Helios — anatomical region system |
| `fa340bc` | SVARA 2.0 Sprint 2.1 — Helios Engine technical architecture |
| `e3fb47b` | SVARA 2.0 Sprint 2 — Helios Engine |
| `2518aed` | SVARA 2.0 Sprint 1 — Foundation Engine |
| `3689a2f` | SVARA 2.0 Sprint 0 — audit, archive V1, scaffold V2 structure |

Everything wired in this session (Stage 4–5 flow/section-gravity, the two coordinate/physics
bug fixes, and this vault) is **uncommitted** as of this entry — see `git status`.

## Related

[[Decision Log]] · [[Folder Structure]]
