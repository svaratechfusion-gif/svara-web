---
tags: [moc, home]
updated: 2026-07-13
---

# 🧠 SVARA — Project Brain

This vault is the **single source of truth** for how the SVARA marketing site is built — the
narrative, the visual system, the engineering, the content, and why decisions were made. It
exists for both humans and AI agents (Claude Code) working on the codebase.

> [!info] What is this project?
> SVARA (`svara-web`, package name `svara-web`) is the marketing site for SVARA TechFusion, an
> AI-native enterprise intelligence company. Built on **Nuxt 4 / Vue 3** — no Tailwind, no
> React. Every scene is directed, not just laid out: the homepage is one continuous story told
> through an interactive particle-intelligence engine (Helios) and scroll-choreographed
> sections. See [[Brand Strategy]] for the "why."

This vault is **new** (created 2026-07-13, migrating the documentation *pattern* — not the
code — from the `next16-claude-starter` reference project). The existing `docs/` folder is a
separate git submodule holding the earlier "Volume 0–9 OS" documents (Company OS, Design OS,
Engineering OS, etc.) — that content stays where it is; this vault is the leaner, linked,
actively-maintained layer on top, and the one AI agents are pointed at first.

## 🗺️ Map of Content

### 01 — Brand
- [[Brand Strategy]] — positioning, the film metaphor, the 0→100 emotional timeline
- [[Visual Language]] — layers, stack flow, the 11 rules, scene checklist
- [[Motion Language]] — spring-physics philosophy, GSAP + Helios + Lenis, motion tokens
- [[Typography]] — type scale, families, usage rules
- [[Colors]] — the palette and what each token means

### 02 — Website
- [[Home]] — the 8-section homepage, what each section communicates, how Helios ties them together
- [[Ecosystem]] — `/ecosystem` — the connected-platform narrative
- [[Products]] — `/products` + `/products/[slug]` — the 10 platforms
- [[Architecture]] — `/architecture`
- [[Technology]] — `/technology` + `/technologies/[slug]`
- [[Divisions]] — `/divisions` — the six technology divisions
- [[Blogs]] — `/blog`
- [[Contact]] — `/contact` + the contact API route

### 03 — Engineering
- [[Hero Module]] — the Hero's current architecture and the plan to isolate it
- [[Animation System]] — GSAP (Club), the Helios particle engine, `v-reveal`, Lenis
- [[Folder Structure]] — where everything lives, placement rules, known dead paths
- [[Performance Budget]] — device-tier particle budgets, adaptive quality, the RAF-occlusion gotcha

### 04 — Content
- [[Home Content Bible]] — how `lib/content/home.ts` is structured and consumed
- [[Ecosystem Content Bible]] — connected-ecosystem copy sources
- [[Product Content Bible]] — the 10-platform content files
- [[SEO]] — `@nuxtjs/seo`, `lib/seo/`, the SEO/GEO strategy
- [[Schema]] — JSON-LD (Organization / WebSite / FAQPage / …) implementation

### 05 — Decisions
- [[Decision Log]] — Architecture Decision Records (ADRs)
- [[Version History]] — chronological log of notable changes

## 🏷️ Tag legend

| Tag | Meaning |
|-----|---------|
| `#stable` | Documented and reliable — safe to depend on |
| `#wip` | Work in progress / partially documented |
| `#todo` | Needs attention or is unfinished |
| `#decision` | Records or relates to an architectural decision |
| `#do-not-modify` | Code that must not be edited without sign-off (Helios core physics/morph) |

## Conventions

- **Wikilinks** — link generously with `[[note-name]]`. A link to a not-yet-written note is
  fine; it marks something worth documenting later.
- **Frontmatter** — every note carries `tags` and an `updated` date.
- **One concept per note** — keep notes focused and linkable.
- When you change code, behaviour, dependencies, or architecture, update the matching note in
  the same turn — [[Decision Log]] for architectural choices, [[Version History]] for
  everything notable.

## Source-of-truth hierarchy

| Layer | Files | Purpose |
|-------|-------|---------|
| **This vault** (`obsidian/`) | all of `obsidian/**` | Engineering + design source of truth, linked & navigable |
| **`docs/` submodule** | `docs/**` | The earlier Volume 0–9 OS documents — company narrative, content bibles at their fullest, research |
| **Root `README.md`** | repo root | Points here and into `docs/` |
