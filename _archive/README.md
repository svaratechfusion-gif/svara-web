# _archive/

Superseded code from earlier phases of the homepage. Preserved here for
reference (per the project direction: "archive, not delete"), but **not part
of the build** — no live route, layout, or component imports anything in here.

## What's here

### `components/hero/` — the Next.js-era video hero
The original homepage hero: a `<HeroVideoBackground>` behind `<HeroContent>`
copy, `<OriginField>` imperative Three.js particle scene, a `<ScrollCue>`,
and a HUD overlay (`HeroHud` / `HudLayer`) of reticles/crosshairs.

**Why superseded**: the "Birth of Intelligence" rebuild
(`app/components/three/IntelligenceWorld.vue` + the nine `Scene*.vue`
components) replaces all of this with one persistent particle world. The HUD
reticles were explicitly rejected by the creative direction
(`docs/creative-direction.md` §6: "No literal HUD reticles/crosshairs —
restrained, not sci-fi cliché").

### `components/three/OriginField.vue`
The closest precursor to the unified world — a single-canvas birth→core→
ecosystem particle morph driven by one `scrollProgress`. Its techniques
(canvas-sampled glyph targets, camera lerp-to-selected-product, per-product
clustering) were generalized into `IntelligenceWorld.vue`. Kept as the
reference implementation of those individual techniques.

### `components/three/HeroParticleField.vue` / `HeroCoreMesh.vue`
Earlier, simpler TresJS declarative versions of "particles assemble into the
core." One of the three separate WebGL contexts the unification eliminated
(see `docs/intelligence-engine-plan.md`).

### `lib/hooks/` — `useCamera`, `useGSAPScene`, `useParticles`
Early composable experiments. The shipped architecture replaced these with
the `lib/experience/` director/engine stack (`MotionDirector`,
`CameraController`, `ParticleEngine`, etc.) and `app/composables/`
(`useIntelligenceWorld`, `usePageReveal`). Zero live importers.

## Note on git history

These files were never committed (untracked at archive time). The full prior
Next.js implementation is preserved in git history at commit `474aadd`
("Snapshot: final Next.js implementation before Nuxt 3 rewrite") for anyone
who wants the complete older codebase.
