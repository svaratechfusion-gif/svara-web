---
tags: [meta, decision]
updated: 2026-07-14
---

# Decision Log (ADRs)

Architecture Decision Records — choice, context, consequences. Newest first. Backfilled from
this session's real engineering history plus the decision to build this vault at all.

---

## ADR-0012 — Phase 01B: resolved the hydration blocker (SVG `.attr` + split-after-hydration)

- **Status:** Accepted · **Date:** 2026-07-18

**Context.** The console showed recurring `Hydration completed but contains mismatches`. Two root
causes: (1) ~19 components bound SVG coordinate attributes (`:x1/:y1/:x2/:y2/:cx/:cy`) without the
`.attr` modifier — these are read-only DOM *properties* on SVG elements, so Vue's hydration patch
hit the property path and threw `Cannot set property x1 … has only a getter`; (2) `experience.client.ts`
ran `SplitText` (which wraps `[data-split]` headings in `span.split-mask`) on `app:mounted`, mutating
the DOM *before* the Suspense-wrapped page sections finished hydrating → server plain text vs client
spans.

**Decision.** (1) Converted all 79 reactive SVG coordinate bindings to `.attr` (forces `setAttribute`).
(2) Moved the split/mask/parallax wiring from `app:mounted` to `app:suspense:resolve` (fires after
the top-level page Suspense resolves = post-hydration).

**Consequences.** Console is clean — zero hydration warnings/errors. `.attr` is now the required
pattern for any reactive SVG presentation attribute. DOM-mutating client plugins must wait for
`app:suspense:resolve`, never `app:mounted`.

---

## ADR-0011 — Phase 01B: Lenis activated as the single authoritative smooth-scroll

- **Status:** Accepted · **Date:** 2026-07-18

**Context.** Lenis was installed but dormant — the old `app/plugins/lenis.ts` only installed unused
`VueLenis` provides, `app.vue` claimed "native CSS `scroll-behavior`" (which was never actually set),
and nothing drove a scroll loop. Scrolling was plain native.

**Decision.** Replaced the provide-only plugin with `app/plugins/lenis.client.ts`: ONE Lenis
instance (`lerp: 0.1` — responsive/physical, not slippery), driven by the single `gsap.ticker`
(`gsap.ticker.add(t => lenis.raf(t*1000))`, `lagSmoothing(0)`), synced to ScrollTrigger via
`lenis.on('scroll', ScrollTrigger.update)`. Route changes reset scroll (respecting hash anchors),
`lenis.resize()` + `ScrollTrigger.refresh()`. Reduced-motion → Lenis is not created (native scroll +
ScrollTrigger still work). HMR-dispose teardown. Exposed as `$lenis` / `useLenis()`.

**Consequences.** One tick source, no competing rAF loops. `<html class="lenis">` confirms active.
Never `new Lenis()` elsewhere. Stale comments in `lib/gsap/{config,register}.ts` ("Lenis wired in
app.vue") are now wrong — the wiring lives in the plugin.

---

## ADR-0010 — Phase 01B: SVARA Material System replaces white+blue at the token layer

- **Status:** Accepted · **Date:** 2026-07-18

**Context.** Decision 04 of the rebuild directive: migrate away from the generic pure-white + one-blue
aesthetic to a physical **material** system (ceramic / vanilla / lavender-mist / titanium / graphite /
deep navy), without turning the site purple or fluorescent, and without redesigning existing pages.

**Decision.** Added a full semantic material layer to `styles/design-tokens.css`:
`--canvas-*` (ceramic off-white primary, warm vanilla, cool, lavender-mist), `--ink-*` (deep-navy
primary type → muted), `--brand-navy/-blue`, `--material-*` (ceramic/frost/crystal/titanium/aluminium/
graphite), `--light-*` (warm/cool/lavender atmospheric), `--edge-*` (soft/glass/metal), `--shadow-
contact/-elevated/-atmospheric`. The legacy `--color-*` names are **re-pointed** at these
(`--color-bg → --canvas-primary`, `--color-text → --ink-primary`, …) so every existing page inherits
the refined ceramic canvas + deep-navy ink with no redesign. `--color-accent` (brand blue) stays
interactive-only.

**Consequences.** Whole site shifted from #FFFFFF/#111 to warm ceramic + deep navy — subtle, no
layout change (verified on `/company`). Lavender & vanilla are defined but used only as atmospheric
accents, never as dominant fields. New code should prefer the material tokens over `--color-*`.

---

## ADR-0009 — Sprint 2 completion: cleared the held-back dead code after a fresh re-audit

- **Status:** Accepted
- **Date:** 2026-07-14

**Context.** Sprint 2 ("engineering unification") deferred a batch of confirmed-dead code because
its names collided with LOCKED-list wording ("Typography," "Glass system"). Closing the sprint out
required re-auditing each item from scratch rather than trusting the stale hold-list — which was
the right call, because the hold-list had **factual errors**: it claimed `app/components/glass/`
was an "empty placeholder" (it still held all 5 files) and that `typography/` was "removed in
Sprint 2" (it wasn't). A first loose grep also threw false positives — `GlassPanel` looked "used
by CtaSection" but that was a *comment* ("same recipe as GlassPanel"), not a tag.

**Decision.** Re-audited with tag-anchored grep (`<Name[ />]` / import-path only, excluding each
file's own definition), traced the dependency chains, then removed:
- `app/components/typography/` (6) — zero tag usage; live typography is CSS tokens.
- `app/components/glass/` (5) — its only external consumers were the dead `home/` variants below
  (`GlassImage` ← AboutSection/PlatformSection; `GlassPanel` ← GlassCard); live glass is `--glass-*`.
- `app/components/home/{About,Architecture,Ecosystem,Metrics,NextEra,Platform,TrustBar,Who}` (8) —
  orphaned section variants, never wired into any live page.
- `lib/lenis/` — a cloned source repo; the app's `lenis/vue` resolves to the npm `lenis` package.
- `lib/gsap/{esm,umd,minified,src}` + stray `*-link.html` — vendored GSAP build. **No alias
  resolves to it** (the only vite alias is `~/`); `register.ts` imports the bare `"gsap"` specifier
  → npm gsap ^3.15.0, which ships the former premium/Club plugins for free. Kept the live entry
  (`index.ts`/`register.ts`/`config.ts`) and corrected the stale "resolves to lib/gsap/esm via the
  alias in nuxt.config.ts" comments there and in `app/plugins/gsap.client.ts` — that alias never existed.

**Consequences.** Typecheck error count went **74 → 72** (dead files removed 2, added none; no
error references any deleted path), production build clean. The two prior contradictory notes about
lib/gsap ("vendored tree is load-bearing" vs "not load-bearing") are now settled definitively: **not**
load-bearing — npm gsap is what runs. `app/components/hero 2/` was deliberately left (Hero-related,
held for the Hero sprint; it has a pre-existing missing-module typecheck error unrelated to this pass).
Sprint 2 is complete. See [[Folder Structure]].

---

## ADR-0008 — Particle field retuned to "environmental intelligence field"; Hero gains an Orbit state

- **Status:** Accepted
- **Date:** 2026-07-14

**Context.** The ambient field (post-ADR-0007) was reported as reading like "floating bubbles
on top of the UI" — noisy, and in one specific way actually true: `.intelligence-engine`'s own
CSS carried `z-index: 5` with a comment claiming that was "above section content, below the
fixed nav." That's wrong under CSS stacking rules — a `position:fixed` element with *any*
`z-index >= 0` paints above normal in-flow static content regardless of the exact value; only a
negative z-index reliably stays behind everything. The broader request (an "environmental
intelligence field": spline-following flow, per-section choreography for every section,
content-aware dynamic opacity, plus "Hero — particles orbit around the robot head") was much
larger than that one bug. Split into what was well-defined and could ship now, vs. what needed
either concrete curve/node data or an explicit scope decision first.

**Decision — shipped this pass.**
- `.intelligence-engine` z-index: `5` → `-1` (the actual fix — matches the established pattern
  in `BackgroundCanvas.vue`; verified with a full `z-index` grep across `app/` first).
- `HeliosConfig` retuned toward "95% white, 5% blue, barely noticeable": particle size
  0.008–0.02 → 0.006–0.014; `neighborsPerParticle` 3→1, `lineOpacity` 0.32→0.06; `colorWeights`
  `[0.18,0.3,0.38,0.14]` → `[0.95,0.02,0.02,0.01]`; Flow's particle-opacity target 0.9→0.16 (in
  the requested 0.08–0.20 band).
- Added a `depthSpeed` band (back/mid/front, derived once from each particle's existing
  `noiseOffset` — no new random source) and a two-frequency sine sway (`flowSwayAmp`/`Amp2`/
  `Freq2`) replacing the old single-sine drift — a lightweight, dependency-free approximation of
  "small curl noise on a near-constant-velocity fall," not literal spline-curve following.
- **New `orbit` morph state** (Hero-only, added after the z-index/retune fixes, once the user
  confirmed — see below — that the spec's "Hero: particles orbit around the robot head" should
  actually be built rather than left as a contradiction of ADR-0007's dormant-during-Hero rule).
  `HeliosEngine.orbit(anchorNdc, edgeNdc)` converts the Hero image's on-screen center + right
  edge (read directly from `.hero-visual__img`'s `getBoundingClientRect()`, no cross-component
  ref needed) to entity-local space via the existing `ndcToWorld()`, and derives a halo radius
  from the real on-screen size rather than a guessed constant. Only `orbitFraction` (14%) of the
  particle budget actually orbits; everyone else is parked at `orbitParkY` (well outside any
  visible frame) — opacity is one global shader uniform, so "most particles invisible, a few
  visible" has to be done by moving the invisible ones out of frame, not by alpha. Parked
  particles rejoin the cloud automatically the moment `flow()` starts overwriting `target` from
  scratch on Hero-exit; nothing needs to reset them.
- **Tuning found by verification, not guessed upfront:** the first pass (`orbitRadiusMultiplier
  1.25`, opacity `0.13`) was confirmed *rendering* via a raw WebGL `readPixels` scan (29,703
  non-transparent pixels, correctly positioned at the image's edge) but was visually
  imperceptible — almost the entire ring sat behind the Hero panel's own `backdrop-filter:
  blur()`, which washes out anything drawn behind it within its bounds. Raised to `1.35`/`0.22`
  so more of the ring clears the panel's edge into open background. `0.22` deliberately exceeds
  the page-wide field's 0.08–0.20 ceiling — justified because it's a small, deliberate focal
  accent, not the ambient baseline.

**Decision — explicitly deferred, not built.** Full spline-curve flow field (no control-point
data was given); per-section choreography for Sections 1–4 (horizontal flow / merge into
ecosystem / travel between product nodes / division connections — no concrete node/curve
positions given beyond the existing section-gravity target points); content-aware *dynamic*
opacity reduction where particles overlap text (the z-index fix satisfies the core safety
concern — particles can no longer occlude text at all — but no per-region opacity mechanism
exists). All flagged to the user rather than guessed.

**Consequences.** Verified via the established RAF-occlusion workaround (manual `__heliosEngine`
frame-pumping + forced GSAP timeline progress, hook removed after each check): Hero renders with
headline/CTA/image fully visible and a faint halo at the panel's edges; a scrolled section shows
particles sitting behind all in-flow content with sparse, dim connections. Typecheck surfaced 4
(then, after the Orbit addition, still the same 74-error baseline) `noUncheckedIndexedAccess`
errors in files touched this pass (`HeliosEntity.ts`, `HeliosParticles.ts`) — confirmed via
`git diff` that every one sits in code *unchanged* by this pass (`applySectionTargets`,
`updateSprings`, the pre-existing `cdf[]`/`palette[]` indexing) — pre-existing noise, not a
regression. `app/pages/lab/helios.vue` has one unrelated, pre-existing type error (references
the old `assemble`/`dissolve`/`reassemble` states removed in ADR-0007) — stale debug page,
outside this pass's scope, untouched.

---

## ADR-0007 — Hero particle visual removed entirely; engine reduced to Dormant + Flow only

- **Status:** Accepted
- **Date:** 2026-07-14

**Context.** The Hero's particle-head visual (ADR-0006, one day old) was ordered removed
completely — no particle robot, no anatomical mesh, no dissolve/assembly shaders — replaced
with a static premium image. Before executing, confirmed with the user whether "delete the
Hero robot" meant the Hero's visual only or the entire engine: **Hero visual only** — the
shared page-wide engine must keep powering section gravity (Problem/Products/Industries/
Technology/CTA) and Footer density exactly as before.

That answer forced real surgery, not a component swap: the engine's Dormant→Assemble→Idle→
Interact→Dissolve→Flow→Reassemble lifecycle, the anatomical entity sampling (`headSDF`,
region classification, eye density), scroll-driven dissolve, and cursor "magnetic dust"
interaction all existed **only** to produce the head visual. Investigation showed cursor
interaction was *already* Hero-exclusive — it only ever applied during the `interact` state,
never during `flow` — so removing it doesn't change the ambient cloud's behavior at all.

**Decision.**
- Deleted `lib/helios/math/sdf.ts`, `lib/helios/math/regions.ts`, `lib/helios/physics/HeliosCursor.ts` entirely.
- `HeliosEntity.sample()` rewritten to generate only the ambient scatter-cloud distribution
  (no anatomical shape) — this is now both the particles' permanent `home` and the `scatter`
  morph target Flow already read from, so Flow's own formula is byte-for-byte unchanged.
- `HeliosMorph` reduced to two states: `Dormant` (motionless, **fully invisible** — opacity
  target changed from 0.3 to 0) and `Flow` (unchanged). `HeliosStore.MorphStateName` narrowed
  to match; `scroll`/`pointer` fields dropped from the store (nothing reads them anymore).
- `HeliosParticles` lost `dissolveOrder`/`computeDissolveOrder`, the `group` field, and
  `applyForce` (its only caller was the deleted cursor). `applySectionTargets`,
  `updateSprings`, `update`, `setActiveRatio` — the parts explicitly promised to stay "exactly
  as now" — are untouched.
- `HeliosConnections` topology lost its per-region bias (`isFace`/`FACE_CONNECTION_BIAS`/
  per-region spread) — now uniform kNN, same spatial-hash algorithm.
- `HeliosEngine`'s public API shrank to `initialize/destroy/flow/setEntityOffset/
  setSectionTargets/setDensity/resize` — `assemble/dissolve/dormant/reassemble/reconstruct/
  setCursor/setScroll` all removed.
- **Real regression found in testing, fixed before landing:** starting `flow()` immediately
  on mount (instead of gating it behind Hero scroll, like the old `assemble()`→dissolve→flow
  chain used to) meant the ambient cloud was visible *while the Hero was still on screen*,
  overlapping the headline — something the old scroll-gated design never allowed. Fixed by
  gating `engine.flow()` behind an `IntersectionObserver` on `.hero` (fires once, when the
  Hero scrolls out of view) instead of a continuous scroll value — Dormant's now-zero opacity
  means nothing renders at all until then.
- `HeroSection.vue`'s `.hero__visual` now renders an `<img>` instead of an empty spacer.
  **No suitable real asset existed** — the two candidates found in `public/images/` were
  both rejected and left untouched: `hero/robot-head.png` (generic stock sci-fi robot render)
  and `home/hero-core.jpg` (neon red/blue "portal" render with a logo baked in) — both
  violate this project's own no-neon/no-mechanical/accent-blue-only rules as badly as the
  thing being removed. Points at `/images/hero/intelligence-visual.svg`, a plain on-token
  placeholder (soft gradient + glass panel, no imagery) generated only so the build has a
  real file to resolve — **the real asset still needs to be supplied.**

**Consequences.** Verified end to end: Hero renders cleanly with zero particle overlap
(confirmed via the RAF-occlusion workaround, [[Performance Budget]] — both the engine's own
loop and GSAP's entrance timeline needed forcing to their settled state to check honestly);
engine correctly stays Dormant/invisible through the whole Hero, transitions to Flow exactly
once on scroll-out; section gravity re-verified quantitatively (particle count near a test
target rose 63→86 after the pull was applied) — unchanged in mechanism, still works. `hero 2/`
(the earlier, already-dead Chassis Hero) is untouched.

---

## ADR-0006 — Hero form: head-only "SVARA Intelligence Head," replacing the full-bust sentinel

- **Status:** Accepted
- **Date:** 2026-07-14

**Context.** The Hero's particle entity was a full head+neck+shoulders+chest bust (Stage 1–5,
ADR-0002). New creative direction called for a head-only form — no torso, no arms — bigger
and more architectural, with three specific requirements: (1) eyes as a subtle particle-density
effect, never a modeled feature; (2) a "jaw → cheeks → back of head → entire head" dissolve
sequence rather than the old region-by-region peel; (3) a static camera ("Apple product
photography" — no breathing).

**Decision.**
- `headSDF` (`lib/helios/math/sdf.ts`) replaces `bustSDF` — head sphere (r 0.62, up from 0.4),
  short neck, a narrow shoulder *hint* (half-width 0.52 vs the old 0.78, r 0.18 vs 0.24), hard
  cutoff just below the shoulder line. No chest ellipsoid at all.
- `Region` narrows from `head | neck | chest | shoulders` to `head | neck | shoulders`
  (`lib/helios/math/regions.ts`). Head now carries 74% of the particle quota (was 28%).
- `eyeDensityBoost()` — two small pockets parametrized ON the head sphere's own surface (yaw/
  pitch off dead-ahead at the sphere's radius, not a fixed cartesian z — a fixed z misses the
  shell once you move off-center, since the sphere curves toward the viewer). Raises local
  sampling acceptance probability; no separate geometry, shader, or glow. Head base density was
  lowered (1.5→1.15) specifically to leave contrast headroom for the boost to read at all.
- Dissolve order (`HeliosParticles.computeDissolveOrder`) gained a head-specific `jawness`
  score — front (+z) and low (−y from the head's own centroid) push a particle toward
  "dissolves first"; back-of-head and crown hold longest. Neck/shoulders keep the old
  radial-from-centroid measure (they're a minor hint now, not worth the same treatment).
- `cameraBreatheAmp` → 0 (was 0.045) — camera is now fully static; the mechanism is kept, not
  deleted, so it stays a one-line reversible knob. `cameraY` re-centered to 1.25 (was 0.62,
  chest-height for the old bust). `entityBreathePeriod` lengthened to 13s (was 8s) — "very slow,
  like breathing" — idle already had no floating/rotation to remove.
- `cursorRadius` (0.4→0.5) and `maxConnectionDistance` (0.16→0.25) scaled up proportionally
  with the bigger geometry.
- `.hero__visual`'s aspect ratio changed from the wide 3/2.35 (suited a shoulder-to-shoulder
  bust) to a portrait-leaning 1/1.15 (suits a head+neck silhouette). Grid columns (4fr/6fr,
  already visual-favoring) were left unchanged.
- Content Bible headline (`homeHero.h1`) was **not** changed — the Sprint 4 brief included a
  different headline in its layout sketch ("Engineering The Intelligence Layer Of Tomorrow"),
  read as a proportion sketch rather than approved copy, since content was explicitly locked in
  Sprints 1–3. Flagged for the user to confirm either way.

**Consequences.** Verified via the manual-pump RAF-occlusion workaround ([[Performance Budget]]):
assembled silhouette is head-only with no torso; mid-scroll shows jaw/lower-front particles
visibly detached and drifting while the head's core (crown, back) holds together, matching the
intended sequence. Eye density is implemented correctly (geometry bug from the first attempt —
placing the pocket at a fixed z that missed the curved shell — found and fixed) but reads as
genuinely subtle in screenshots; this may be inherent to the "close: just particles" requirement
rather than a defect — flagged as a live-tunable value (`EYE_POCKET_R`, the `3.2` boost
multiplier in `regions.ts`) rather than chased further blind. `lib/experience 2/`'s Chassis-era
Hero and `app/components/hero 2/` remain unrelated dead code, untouched by this change.

---

## ADR-0005 — Adopt an Obsidian vault, migrating the *pattern* not the code, from next16-claude-starter

- **Status:** Accepted
- **Date:** 2026-07-13

**Context.** A reference project (`textura-agency/next16-claude-starter`) was cloned and its
Obsidian vault + Claude Code hooks + ADR discipline read in full. It's Next.js/React/Tailwind/
`@react-spring`; SVARA is Nuxt/Vue/vanilla-CSS/GSAP/Three.js — essentially nothing in `src/`
is literally portable. What *is* portable: the vault-as-single-source-of-truth pattern, ADR
discipline, a folder-placement table, and (pending) hook-based enforcement.

**Decision.** Build `obsidian/` at the SVARA repo root, structured as: `01 Brand`,
`02 Website`, `03 Engineering`, `04 Content`, `05 Decisions` (structure specified by the user,
not copied from the starter's `meta/architecture/frontend/backend/workflows/templates`
layout). Content is written from this session's actual engineering work + existing memory
(Design Commandments, Visual Language, Ship State) + a fresh codebase survey — not
transcribed from the starter. The existing `docs/` git submodule (Volume 0-9 OS documents)
stays as-is; this vault sits alongside it as the leaner, actively-maintained layer.

**Consequences.** No code was moved or deleted to create this vault — pure addition. Cleanup
of confirmed-dead paths (below) and a Claude-hooks enforcement layer remain open, pending
user sign-off (see [[Folder Structure]]).

---

## ADR-0004 — Section-gravity target-space bug: convert NDC→world into the entity's LOCAL space

- **Status:** Accepted
- **Date:** 2026-07-12

**Context.** Stage 5 wired "section gravity" — particles pulled toward whichever homepage
section is in view during Helios's Flow state. Verification (after working around the
RAF-occlusion gotcha, see [[Performance Budget]]) showed near-zero visible pull. Root cause:
`HeliosEngine.ndcToWorld()` (and `HeliosCursor`'s own raycast) computed true camera/world-space
points, but `HeliosParticles.applyForce`/`applySectionTargets` compare against `positions`,
which live in `entity.group`'s LOCAL space — offset by `setEntityOffset()` (the page-wide
canvas placement trick introduced when the engine stopped being Hero-bound). The mismatch
(~1.2 world units) was larger than both the cursor radius (0.4) and the section-gravity radius
(0.9), so force calculations almost never found anything in range. This likely silently
degraded cursor "magnetic dust" attraction too, ever since the entity-offset mechanism was
introduced — not just section gravity.

**Decision.** `HeliosEngine.ndcToWorld()` now converts the raycast result into the entity
group's local space via `entity.group.worldToLocal()` before returning it. `HeliosCursor` was
given a reference to `entity.group` and does the same conversion on its own raycast result
before calling `particles.applyForce()`.

**Consequences.** Verified quantitatively (not just visually, given the RAF-occlusion
verification risk): particle count within the gravity radius of a test target went from 7 to
45 after applying the fix, decaying back down once the target cleared. Any future
screen-space-to-particle-space force must go through this conversion — see
[[Animation System]] "Coordinate space gotcha."

---

## ADR-0003 — Section gravity must write to a persistent offset, not a one-shot velocity impulse

- **Status:** Accepted
- **Date:** 2026-07-12

**Context.** The first implementation of `applySectionTargets` mirrored the cursor's
`applyForce` pattern — a radial-falloff velocity impulse. It had no visible effect. Root cause:
Helios's `Flow` state (`HeliosMorph.ts`) recomputes each particle's spring `target` from
scratch every frame, as a pure function of time + a fixed per-particle scatter position, with
no memory of prior frames. A one-shot velocity nudge gets immediately overridden the very next
frame when the spring chases the freshly-recomputed, gravity-unaware target.

**Decision.** Added a persistent `sectionPull` buffer to `HeliosParticles` — nearest-target
distance is computed each frame and lerped into this buffer (with exponential decay when out
of range or no targets are active), and `Flow.update()` now adds `sectionPull` into its target
computation instead of computing target in isolation. This preserves the "states write only to
`target`; the spring produces motion" discipline (see [[Animation System]]) rather than
special-casing section gravity as a velocity hack.

**Consequences.** The core architectural rule — every force composes through `target`, never
through a side-channel — held up under a genuinely non-trivial case (a continuously-regenerated
time-based target state). Worth remembering next time a new force type needs to touch a state
whose target isn't static.

---

## ADR-0002 — Hero particle engine (Helios) resurrected, Hero-scoped first, then made page-wide

- **Status:** Accepted
- **Date:** 2026-07-10 → 2026-07-12 (staged)

**Context.** The homepage Hero needed a genuine interactive particle-engine identity, not a
static placeholder. An earlier full engine (`lib/experience 2/`, the "Chassis" architecture)
existed but was superseded. Building the entire website-wide intelligence engine in one pass
was judged too risky.

**Decision.** Staged, explicitly scoped rollout:
1. Hero-only particle engine (`lib/helios/`), self-contained, no cross-section wiring.
2. Cursor "magnetic dust" attraction (local, elastic-return — never full-object rotation/chase).
3. Elegant (non-explosive) scroll dissolve: outer-before-inner, head-before-torso sequencing.
4. Expand to a page-wide `position: fixed` canvas; dissolved cloud becomes a continuous
   downward "flow" current that outlives the Hero's own scroll range.
5. "Section gravity" — the one page-wide particle system now interacts with every other
   section (Problem, Products, Industries, Technology, CTA) and thins near the Footer.

**Consequences.** One particle system for the whole page (see [[Visual Language]] rule 10),
not per-section decorative animation. `app/components/hero 2/` (the pre-Helios Chassis Hero)
is now dead code — see [[Hero Module]] for the pending cleanup.

---

## ADR-0001 — Homepage content restructure: `teaser` field, ~60% copy reduction

- **Status:** Accepted
- **Date:** 2026-07-09 (approx., prior to this vault's creation)

**Context.** Homepage sections carried full explanatory paragraphs, working against the "one
continuous story, ~90 second read" goal (see [[Brand Strategy]]). Simply trimming the
`paragraphs` arrays would have broken the dedicated pages ([[Ecosystem]], [[Divisions]], etc.)
that reuse the same content for their own full copy and SEO descriptions.

**Decision.** Added a parallel `teaser` field (60–80 words) to sections with a dedicated page,
consumed by the homepage component; the dedicated page keeps reading `paragraphs` unchanged.
Sections without a dedicated page had their description trimmed directly.

**Consequences.** Homepage copy reduced ~60% with zero collateral damage to dedicated-page
content or SEO. See [[Home Content Bible]] for the pattern going forward.

## Related

[[Version History]] · [[Folder Structure]] · [[Animation System]]
