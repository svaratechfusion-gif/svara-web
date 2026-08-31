---
tags: [frontend, animation, stable]
updated: 2026-07-13
---

# Animation System

SVARA's equivalent of Next16's spring-component layer — but built from three distinct pieces
rather than one library, because the jobs are genuinely different. Design rules: [[Motion Language]].

## 1. GSAP — DOM/SVG scroll animation

`gsap` is a real npm dependency (`^3.15.0`), but the app imports from **`~~/lib/gsap`**, not
the npm package directly:

```ts
import { gsap, ScrollTrigger, EASES } from "~~/lib/gsap"
```

`lib/gsap/register.ts` is the **only** place `gsap.registerPlugin` is called; `lib/gsap/index.ts`
is the single entry point every component imports. **Do not** call `gsap.registerPlugin` or set
GSAP defaults anywhere else.

> [!warning] Vendored tree appears unused — verified, not just suspected
> `lib/gsap/register.ts`'s header comment claims it vendors the **GSAP Club/premium build**
> and that every `"gsap"` / `"gsap/<Plugin>"` import "resolves to THIS directory's `esm/`
> build via the alias in `nuxt.config.ts` — never npm's copy." I checked: `nuxt.config.ts`'s
> only Vite alias is `~/` → `app/`; there is no `gsap` alias anywhere (confirmed against the
> generated `.nuxt/tsconfig.*.json` too — no `gsap` path mapping). `import { gsap } from
> "gsap"` in `register.ts` therefore resolves straight to `node_modules/gsap`. That installed
> copy (`^3.15.0`) already ships `SplitText`, `MorphSVGPlugin`, `Physics2DPlugin`,
> `InertiaPlugin`, `ScrollSmoother` directly — GSAP folded the former Club-only plugins into
> the free package. So the actually-running code path is `node_modules/gsap` end to end, and
> `lib/gsap/esm|minified|src|umd` (6.1 MB) look like a **dead vendored tree**, not load-bearing
> infrastructure — correcting what I told the user in the SVARA-3.0 migration report, where I
> called this "deliberate, leave it alone" based on the comment alone before verifying against
> the actual resolve config. Confirm with the user before deleting (it's tracked/committed,
> large, and I could still be missing something), but treat the "premium build, don't touch"
> framing as unverified going forward.

`ScrollSmoother` is registered but **never instantiated** — Lenis (below) owns smooth
scrolling; running both would double-smooth and fight over `scrollTop`.

### `v-reveal` — the one scroll-reveal primitive

`app/plugins/reveal.ts`. A Vue directive, not a component:

```vue
<div v-reveal>…</div>
<div v-reveal="{ delay: 0.1 }">…</div>
```

SSR-safe (`getSSRProps: () => ({})` — renders untouched so crawlers see complete markup),
respects `prefers-reduced-motion`, fixed recipe: `opacity 0→1` + `y: 24px→0`,
`ScrollTrigger.create({ start: 'top 88%', once: true })`, `duration.slow` / `ease.out` from
`lib/animation/motion.ts`. This is intentionally the **only** reveal recipe in the codebase —
resist inventing a second one per section.

## 2. Helios — the intelligence-engine particle system

`lib/helios/` — a custom Three.js engine, **not** a general animation library; it exists
specifically to be the one particle system powering the Hero and (since Stage 5) the whole
page. Public API: `initialize / destroy / flow / orbit / setEntityOffset /
setSectionTargets / setDensity / resize`.

**3-state lifecycle:** Dormant (invisible, pre-boot rest) → Orbit (Hero-only halo around the
Hero image, active from mount until the Hero scrolls out of view) → Flow (the page-wide
continuous downward current, starts on Hero-exit). See [[Decision Log]] ADR-0008. Update order
per frame is spec-fixed: `cursor → springs → particles → connections → morph → uniforms →
render`.

**Core discipline — states write only to `target`; the spring produces motion.** Every
force (cursor attraction via `HeliosCursor`, scroll-driven dissolve, section-gravity pull)
either sets `particles.target` directly or writes into a persistent offset buffer
(`sectionPull`) that a state's target computation reads — nothing sets `positions` outside the
spring integrator (`updateSprings` → `update`). This is what lets cursor force, scroll dissolve,
downward flow, and section gravity all compose without fighting each other. See
[[Decision Log]] for the bug this discipline surfaced (Flow state recomputing `target` from
scratch every frame silently erased a naive velocity-impulse implementation of section gravity
— fixed by moving to the persistent-offset pattern).

**Coordinate space gotcha:** particle positions/forces live in the entity group's *local*
space (`entity.group` carries a page-wide-canvas placement offset via `setEntityOffset`).
Anything computed from a screen/NDC point (cursor raycast, section-target NDC→world
conversion) must be converted via `entity.group.worldToLocal()` before comparing against
particle positions — both `HeliosCursor` and `HeliosEngine.ndcToWorld` do this. Skipping it
silently breaks attraction with no error (the force still runs, it just never gets close
enough to anything to matter).

Device-tier particle budgets and the adaptive-quality ladder: [[Performance Budget]].

## 3. Lenis — smooth scroll  #stable

**The single authoritative smooth-scroll system** (Phase 01B · [[Decision Log|ADR-0011]]).
`lenis` (`^1.3.25`). One instance, created in **`app/plugins/lenis.client.ts`** (client-only —
`new Lenis()` touches `window`).

- **Config:** `lerp: 0.1` (responsive/physical, not slippery), `smoothWheel`, native touch momentum.
- **One tick source:** `gsap.ticker.add(t => lenis.raf(t * 1000))` + `gsap.ticker.lagSmoothing(0)`.
  Lenis runs **no** rAF of its own. No component may spawn a competing scroll rAF loop.
- **ScrollTrigger sync:** `lenis.on('scroll', ScrollTrigger.update)` — pins/scrubs stay correct.
- **Routes:** on `page:finish` → reset scroll (respecting hash anchors), `lenis.resize()`,
  `ScrollTrigger.refresh()`.
- **Reduced motion:** Lenis is **not** created; native scroll + ScrollTrigger still work.
- **Teardown:** Vite HMR dispose removes the ticker callback + destroys the instance.
- **Access:** provided as `$lenis`; use the `useLenis()` composable (`app/composables/useLenis.ts`)
  for programmatic scroll. Returns `null` on server / under reduced motion.

`<html class="lenis">` when active. The old provide-only `app/plugins/lenis.ts` was removed.

> [!note] Stale comments elsewhere
> `lib/gsap/{config,register}.ts` still say "Lenis wired to gsap.ticker in app.vue" — the wiring
> now lives in the plugin, not `app.vue`. The `lib/lenis/` vendored monorepo and `lib/gsap/{esm,
> umd,minified,src}` were already deleted ([[Decision Log|ADR-0009]]); no dead trees remain.

## Related

[[Motion Language]] · [[Hero Module]] · [[Performance Budget]] · [[Folder Structure]]
