---
tags: [architecture, stable]
updated: 2026-07-14
---

# Folder Structure

Nuxt 4 app-dir convention. Where everything lives, and what's confirmed dead and safe to
remove. Reflects the state after Sprint 2 (SVARA 3.0 engineering unification).

## Repo root

```
svara-web/
├── app/                     ← Nuxt application code (see below)
├── lib/                     ← content, engines, third-party init (see below)
├── styles/design-tokens.css ← the single design-token file
├── content/                 ← EMPTY scaffold (blog/pages/schema/seo, .gitkeep only, no
│                               @nuxt/content module installed) — see [[Blogs]]
├── docs/                    ← git SUBMODULE — Volume 0-9 "OS" documents (separate history)
├── obsidian/                ← this vault
├── server/api/              ← Nitro server routes (contact.post.ts)
├── public/                  ← static assets
├── nuxt.config.ts, tsconfig.json, eslint.config.mjs
└── nvidia-ai/                ← UNRELATED Python project living in this repo — not part of the web app
```

## `app/` — application code

```
app/
├── app.vue                 # root — Lenis/GSAP ticker wiring, provider-equivalent setup
├── pages/                  # file-based routing — see each page's own vault note under 02 Website
├── components/
│   ├── home/                 # HeroSection.vue + HeroParticleField.vue + HeroVisual.vue ONLY —
│   │                            reserved for the Hero sprint (see [[Hero Module]]); everything
│   │                            else that used to live here moved to sections/ or was removed
│   ├── sections/              # the other homepage narrative sections — Problem, Solution,
│   │                            Products, Technology, Industries, Trust, Cta, Faq
│   ├── core/                  # AppShell.vue ONLY — the rest of the original set (Container,
│   │                            Grid, Section, Spacer, Stack, Surface) was confirmed dead
│   │                            (zero usage — every section hand-styles native HTML instead)
│   │                            and removed in Sprint 2
│   ├── layout/                # KnowledgeProductLayout.vue — moved here in Sprint 2, the one
│   │                            clear inhabitant (shared page template, used by 12 pages)
│   ├── ui/                    # ContactForm.vue, PagePlaceholder.vue, SectionLink.vue — merged
│   │                            from the former common/ folder in Sprint 2 (typography/ was
│   │                            also confirmed fully dead and removed)
│   ├── navigation/, footer/, background/
│   └── "hero 2/"              # ⚠️ dead — superseded Chassis-era Hero, still present, see [[Hero Module]]
├── composables/              # useIntelligenceEngine, useIntelligenceTargets, useMenuOverlay,
│                               useKnowledgeProduct, usePageSeo, useStructuredData
├── plugins/                  # gsap.client.ts, lenis.ts, reveal.ts, experience.client.ts, terminal.client.ts
└── layouts/, stores/, utils/
```

## `lib/` — content, engines, vendored libraries

```
lib/
├── content/                 # 43 hand-written content files — see 04 Content notes
├── helios/                  # the Intelligence Engine — see [[Animation System]], [[Performance Budget]]
├── gsap/                     # GSAP entry point ONLY — register.ts/index.ts/config.ts. The
│                               "gsap" specifier resolves to npm gsap (^3.15.0, premium plugins
│                               free); the vendored esm/umd/minified/src build tree was
│                               unreferenced and removed (Sprint 2 completion). See [[Animation System]]
├── animation/motion.ts       # duration/ease tokens, mirrors design-tokens.css
├── seo/                      # site.ts, meta.ts, jsonld.ts — see [[SEO]], [[Schema]]
└── types/content.ts          # KnowledgeProductContent shape shared by Products/Technology/Industries
```

`lib/three/`, `lib/experience/` (empty placeholders), the orphaned `lib/experience 2/`
("Chassis" background-intelligence code, zero references), and the whole `lib/lenis/` cloned
source repo (the app's `lenis/vue` import resolves to the npm `lenis` package, not this clone)
were removed. So was the `lib/gsap/{esm,umd,minified,src}` vendored build tree (unreferenced —
no alias points to it; `register.ts` imports the bare `"gsap"` specifier = npm).

## Placement rules

| Adding… | Goes in… |
|---|---|
| A route | `app/pages/<route>.vue` |
| A homepage narrative section | `app/components/sections/` |
| Hero-specific work | `app/components/home/` for now — **hold** until the Hero sprint, see [[Hero Module]] |
| A reusable design primitive | `app/components/ui/` |
| A shared page template | `app/components/layout/` |
| A feature-specific component | next to the feature, not a generic `components/` catch-all |
| A composable (state, engine access, reactive logic) | `app/composables/` |
| A pure helper | `app/utils/` |
| Page/section content | `lib/content/<name>.ts` |
| A Helios engine addition | `lib/helios/<layer>/` (physics/entity/engine/materials/…) — see [[Animation System]] for the do-not-modify-by-default framing |
| An API endpoint | `server/api/<resource>.<method>.ts` — see [[Contact]] for the shape convention |
| A site asset | `public/` |

## Still present but intentionally kept (not dead code)

- `content/blog|pages|schema|seo` — empty scaffold, no `@nuxt/content` installed; an undecided
  placeholder, see [[Blogs]].
- `app/components/hero 2/` — tracked but confirmed unused (superseded Chassis-era Hero). Still
  broken-on-typecheck (references a missing `lib/engine/IntelligenceChassis`); held for the Hero
  sprint rather than deleted here, see [[Hero Module]].

## Confirmed dead, removed

**Sprint 2 completion pass** (re-audited each with tag-anchored grep, then removed; typecheck
error count went 74 → 72, production build clean):

- `app/components/typography/` (6 files: Caption, DisplayHeadline, MonoLabel, Paragraph,
  SectionEyebrow, SectionTitle) — zero tag usage; the live typography system is CSS tokens ([[Typography]]).
- `app/components/glass/` (5 files: GlassCard, GlassFrame, GlassImage, GlassOverlay, GlassPanel) —
  the folder's only external consumers were the dead `home/` variants below; the live glass
  system is `--glass-*` CSS custom properties, not Vue components. (Correcting an earlier note
  that called this folder "empty" — it still held all 5 files.)
- `app/components/home/{AboutSection,ArchitectureSection,EcosystemSection,MetricsSection,NextEraSection,PlatformSection,TrustBar,WhoSection}.vue`
  (8 files) — orphaned homepage-section variants never wired into any live page. `home/` now
  holds only `HeroSection.vue` + `HeroParticleField.vue` + `HeroVisual.vue`.
- `lib/lenis/` — a cloned source repo (its own package.json/playground); the app's `lenis/vue`
  resolves to the npm `lenis` package.
- `lib/gsap/{esm,umd,minified,src}` + the two stray `*-link.html` files — the vendored GSAP
  build tree. No alias resolves to it; `register.ts` imports the bare `"gsap"` specifier (npm,
  which now ships the premium plugins free). Kept the live entry: `index.ts`/`register.ts`/`config.ts`.
  The stale "resolves to lib/gsap/esm via the alias" comments in those files (and in
  `app/plugins/gsap.client.ts`) were corrected.

**Sprint 2 first pass**: `lib/experience 2/` (orphaned "Chassis" background-intelligence code),
`lib/experience/` + `lib/three/` (empty), `app/hooks/` + `app/lib/` + `app/types/` (empty),
`app/components/core/{Container,Grid,Section,Spacer,Stack,Surface}.vue` (zero usage — every
section hand-styles native HTML), the untracked stray duplicates (`"MenuOverlay 2.vue"`,
`"settings.local 2.json"`, `"terminal 2.css"`).

## Related

[[Decision Log]] · [[Animation System]] · [[Hero Module]] · [[Home Content Bible]]
