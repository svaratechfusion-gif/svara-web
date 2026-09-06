<script setup lang="ts">
// BOOT SEQUENCE — the SVARA logo assembling itself out of a particle cloud, over a
// readiness readout, then clearing to the site.
//
// WHY NOT THE SUPPLIED MP4: the brand intro is 10s / 2.9MB. A boot screen is the one
// element that sits between a visitor and the entire site, so its budget is ~2s and a few
// KB — gating first paint on a 10-second download is the most expensive thing a marketing
// site can do to its bounce rate. This reproduces the same idea (the mark and wordmark
// resolving out of noise) from the real logo SVG already in /public, so it costs one
// 28KB asset that is cached anyway, and it can be tied to ACTUAL readiness instead of a
// fixed running time.
//
// Rules it obeys:
//  · SHOWS ON EVERY FULL PAGE LOAD by default (see ONCE_PER_SESSION). Only a real
//    document load triggers it — in-app route changes never remount app.vue, so moving
//    around the site does not replay it.
//  · SERVER-RENDERED. A client-only boot mounts at hydration, which is AFTER first paint:
//    the site flashes, the overlay covers it, then it reveals again. Rendering it on the
//    server means the markup either contains the boot or it does not, so there is no
//    flash in either direction.
//  · NEVER TRAPS. A hard timeout dismisses it even if fonts, decode or GSAP fail, and
//    Escape / click / the skip button all exit immediately.
//  · The page HTML underneath is complete and unchanged — this is purely an overlay, and
//    a <noscript> rule hides it entirely when JS cannot run to dismiss it.
//  · REDUCED MOTION → skipped outright. It is decoration in front of content.
//  · One ticker: it draws on gsap.ticker like every other motion system here.
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { samplePoints, scatter, place, disperse, type Point } from '~~/lib/boot/particles'
import { BEATS, COLD_OPEN_S, BEAT_WEB, BEAT_PULSE, BEAT_FINAL, makeNetwork, drawNetwork, drawPulse, type Node } from '~~/lib/boot/sequence'

const LOGO = '/brand/logo/svara-logo-white.svg'
/**
 * THE TOTAL BUDGET, measured from navigation start — not from mount.
 *
 * This distinction is the whole ballgame. Hydration does not happen at t=0: on a cold
 * load it can land a second or two in, and a budget started at mount silently becomes
 * "hydration time PLUS the budget". Measured here it was producing an 8.2s boot from a
 * nominal 4.2s timeout. Anchoring to `performance.now()` (which counts from navigation)
 * means the visitor's experience is bounded no matter how slow the environment is.
 */
const BUDGET_MS = 2600 + COLD_OPEN_S * 1000
/** Nodes in the connecting-line web. Quadratic cost — see drawNetwork. */
const NETWORK_NODES = 70
/** Clamp for the assembly itself, in seconds. */
const ASSEMBLE_MIN = 0.55
const ASSEMBLE_MAX = 2.6
/**
 * Stagger as a FRACTION of the assembly, not seconds added to it. Expressed this way it
 * is inside the tween rather than appended to it, so the runway arithmetic stays honest —
 * an earlier version added a 0.32s GSAP stagger on top of `duration` and dismissed the
 * boot while the tagline was still flying in.
 */
const STAGGER_FRAC = 0.35
/** The dispersal on the way out. */
const EXIT = 0.7

/**
 * Show the boot only once per browser session, instead of on every load?
 *
 * OFF — requested: the entrance plays on every refresh and every reload of the tab,
 * not just the first visit of a session.
 *
 * The cost to be aware of: the sequence runs to a ~14.5s budget (2.6s + an 11.9s
 * cold open), so that is now paid on every single page load rather than once. If it
 * starts to feel long in front of real visitors, shorten `COLD_OPEN_S` in
 * lib/boot/sequence.ts rather than turning this back on — the flag is what the
 * request was about, the duration is a separate dial.
 *
 * The `svara-booted` session cookie is still written; it simply no longer gates
 * anything, so flipping this back to `true` restores the previous behaviour with no
 * other change.
 */
const ONCE_PER_SESSION = false

// Session cookie (no maxAge/expires) — only consulted when ONCE_PER_SESSION is on.
const booted = useCookie<string | null>('svara-booted', { sameSite: 'lax', path: '/' })

// `?boot` forces a replay regardless of the cookie. Without this the boot is effectively
// invisible to anyone developing or reviewing it: it is a once-per-session thing, so the
// second you have seen it once you cannot see it again without hunting down a cookie.
// Read from the route so it works during SSR too — the overlay has to be in the server
// HTML, not swapped in at hydration.
const forced = useRoute().query.boot !== undefined

// Evaluated during SSR: the server emits the overlay only when this visitor has not
// booted yet, which is what removes the flash.
const show = ref(forced || !ONCE_PER_SESSION || !booted.value)

/**
 * THE CHROME FIGURE, on the loading screen. Same model as the product bands, but
 * held CENTRED rather than travelling — there is nothing to scroll here, so its
 * progress is pinned at 0.5 and only its idle spin moves.
 *
 * It is lit much brighter than the page bands (exposure 0.2 -> 0.95, a paler
 * tint): those sit on a blue gradient that carries them, and this ground is
 * near-black, where the default material disappears entirely.
 *
 * It fades in only after the cold open, so it never competes with the narrative
 * beats. Its wrapper keeps its box at ALL times — `v-show` would collapse it to
 * zero, and the model factory sizes its renderer and gates its render loop on
 * that wrapper, so a hidden parent yields a zero-pixel scene that never starts.
 */
const figureEl = ref<HTMLCanvasElement | null>(null)
let figureHandle: { dispose: () => void } | null = null
/** Flips when the canvas takes over from the CSS-only first frame. */
const particlesLive = ref(false)
/** Index into BEATS; -1 once the cold open has handed over to the logo. */
const beat = ref(0)
/** The cold open is running (text on screen, logo not yet assembling). */
const coldOpen = ref(true)
const beats = BEATS

// Only JS can dismiss this overlay, so without JS it must never exist. This goes through
// useHead rather than a <noscript> in the template: a <style> tag inside an SFC template
// is a compile error ("Tags with side effect are ignored in client component templates"),
// and it silently breaks the whole component — including the timeout that dismisses it.
useHead({
  noscript: [{ children: '<style>.boot{display:none !important}</style>' }],
})
const leaving = ref(false)
const progress = ref(0)
const canvasEl = ref<HTMLCanvasElement | null>(null)
const stageEl = ref<HTMLElement | null>(null)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let gsap: any = null
let points: Point[] = []
let raf: ((t: number, d: number) => void) | null = null
let timeoutId: ReturnType<typeof setTimeout> | null = null
let done = false
/** Normalised cursor offset from centre, -0.5..0.5. Drives the web drift + text parallax. */
const pointer = { x: 0, y: 0 }

function onPointer(e: PointerEvent): void {
  pointer.x = e.clientX / window.innerWidth - 0.5
  pointer.y = e.clientY / window.innerHeight - 0.5
  const el = stageEl.value
  if (el) {
    el.style.setProperty('--mx', String(pointer.x))
    el.style.setProperty('--my', String(pointer.y))
  }
}

function lockScroll(lock: boolean): void {
  const lenis = (useNuxtApp() as unknown as { $lenis?: { stop: () => void, start: () => void } }).$lenis
  if (lock) lenis?.stop()
  else lenis?.start()
  document.documentElement.style.overflow = lock ? 'hidden' : ''
}

function finish(): void {
  if (done) return
  done = true
  if (timeoutId) clearTimeout(timeoutId)
  booted.value = '1'

  const end = () => {
    show.value = false
    if (raf) gsap?.ticker.remove(raf)
    raf = null
    lockScroll(false)
    window.removeEventListener('keydown', onKey)
    window.removeEventListener('pointermove', onPointer)
  }

  if (!gsap) { end(); return }
  leaving.value = true
  // the cloud disperses as the overlay clears — one value, same as the assembly
  const out = { t: 0 }
  gsap.to(out, {
    t: 1,
    duration: EXIT,
    ease: 'power2.in',
    onUpdate: () => disperse(points, out.t, window.innerWidth, window.innerHeight),
  })
  gsap.delayedCall(EXIT + 0.12, end)
}

function onKey(e: KeyboardEvent): void {
  if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish()
}

onMounted(async () => {
  // The cookie already kept the server from rendering it; this only catches the
  // reduced-motion case, which the server cannot know about. The CSS `display: none`
  // under that media query means such a visitor never SEES it even for one frame — this
  // just tears the machinery down.
  if (!show.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    show.value = false
    booted.value = '1'
    return
  }

  // THE BUDGET RUNS FROM HERE, NOT FROM NAVIGATION.
  //
  // It used to be `BUDGET_MS - performance.now()`, which bounded the visitor's
  // total wall-clock: a load that was already slow got a truncated entrance, or
  // none. That is defensible, but it is not what this site wants — the sequence
  // is the opening of the film and it was measured, on a throttled phone,
  // playing ONE of seven beats before cutting out (overlay gone at 153ms).
  //
  // Anchoring to the start of the sequence means the whole thing plays on every
  // load and every reload. The cost is explicit: on a slow connection the
  // visitor now waits hydration PLUS the sequence, where before they waited
  // hydration alone. `Skip` is always on screen, and reduced motion still
  // bypasses the whole thing.
  const remaining = BUDGET_MS

  lockScroll(true)
  window.addEventListener('keydown', onKey)
  window.addEventListener('pointermove', onPointer, { passive: true })
  // Backstop only — the normal path finishes on its own well before this.
  timeoutId = setTimeout(finish, remaining + 400)

  try {
    gsap = (await import('~~/lib/gsap')).gsap
  } catch {
    finish()
    return
  }

  const canvas = canvasEl.value
  const ctx = canvas?.getContext('2d')
  if (!canvas || !ctx) { finish(); return }

  const dpr = Math.min(2, window.devicePixelRatio || 1)
  const w = window.innerWidth
  const h = window.innerHeight
  canvas.width = Math.round(w * dpr)
  canvas.height = Math.round(h * dpr)
  ctx.scale(dpr, dpr)

  // the logo occupies a comfortable band across the middle of the viewport
  const boxW = Math.min(w * 0.62, 720)
  const boxH = Math.min(h * 0.4, 300)

  try {
    points = await samplePoints(LOGO, boxW, boxH)
  } catch {
    finish()
    return
  }
  if (!points.length) { finish(); return }

  // Re-check the budget: decoding and sampling happen between the check above and here,
  // and if they ate the runway the right move is to skip the particle assembly entirely.
  // The CSS logo has already shown the visitor a complete, branded entrance — running a
  // minimum-length assembly on top of it would only add delay to a load that is already
  // slow. (An earlier version clamped to ASSEMBLE_MIN here and produced a 6.9s boot.)
  // (The matching navigation-anchored guard was here. It cut the assembly off
  //  on exactly the slow loads that had already lost the cold open, so the
  //  sequence ended on a blank panel rather than on the logo.)

  // centre the sampled box in the viewport
  const ox = (w - boxW) / 2
  const oy = (h - boxH) / 2 - h * 0.04
  for (const p of points) { p.tx += ox; p.ty += oy }
  scatter(points, w, h)

  // One draw loop for both acts. `webAlpha` / `pulseT` are driven by the cold-open
  // timeline below; when it hands over, the point cloud takes the frame.
  const fx = { webAlpha: 0, pulseT: 0 }
  const nodes: Node[] = makeNetwork(NETWORK_NODES, w, h)

  const draw = (): void => {
    ctx.clearRect(0, 0, w, h)
    if (coldOpen.value) {
      drawNetwork(ctx, nodes, w, h, fx.webAlpha, pointer.x, pointer.y)
      drawPulse(ctx, w / 2, h / 2, fx.pulseT, Math.hypot(w, h) * 0.45)
      return
    }
    for (const p of points) {
      ctx.fillStyle = p.c
      ctx.fillRect(p.x, p.y, p.r, p.r)
    }
  }
  raf = () => draw()
  gsap.ticker.add(raf)

  // ── ACT ONE: the cold open ────────────────────────────────────────────────
  // A single timeline holds the schedule so the beats cannot drift apart. Each `call`
  // just moves the beat index; the DOM does the typography and CSS does the transitions.
  const tl = gsap.timeline()
  beats.forEach((bt, i) => tl.call(() => { beat.value = i }, undefined, bt.at))
  // The canvas effects are pinned to their beats by INDEX, not by hard-coded seconds —
  // re-timing the storyboard above now moves the web and the pulse with it.
  const tWeb = beats[BEAT_WEB]!.at
  const tPulse = beats[BEAT_PULSE]!.at
  const tFinal = beats[BEAT_FINAL]!.at

  // the web fades up under "everything connects through thin lines"
  tl.to(fx, { webAlpha: 1, duration: 1.3, ease: 'power2.out' }, tWeb)
  // ...and drops back for the silence before the pulse
  tl.to(fx, { webAlpha: 0.18, duration: 0.7, ease: 'power2.in' }, tPulse - 0.15)
  // one pulse, once
  tl.fromTo(fx, { pulseT: 0 }, { pulseT: 1, duration: 1.5, ease: 'power2.out' }, tPulse)
  tl.to(fx, { webAlpha: 0, duration: 0.7 }, tFinal)

  // hand over to the logo
  tl.call(() => {
    coldOpen.value = false
    beat.value = -1
    particlesLive.value = true
    startAssembly()
  }, undefined, COLD_OPEN_S)

  // ── ACT TWO: the logo assembles ───────────────────────────────────────────
  // ONE tween drives a single 0→1 value; `place()` turns it into 12000 positions with
  // the stagger baked in as a per-particle offset. The readout rides the same value, so
  // the number and the cloud cannot disagree.
  function startAssembly(): void {
    const state = { t: 0 }
    gsap.to(state, {
      t: 1,
      duration: ASSEMBLE_MAX,
      ease: 'none',            // the arrival curve lives per-particle inside place()
      onUpdate: () => {
        place(points, state.t, STAGGER_FRAC)
        progress.value = Math.round(state.t * 100)
      },
      onComplete: () => {
        progress.value = 100
        // Waiting for `load` here would reintroduce an unbounded boot (a slow image or
        // third-party script would hold the overlay open). The backstop already
        // guarantees an exit; this just takes the normal path immediately.
        finish()
      },
    })
  }
})

watch(figureEl, async (el) => {
  if (!el || figureHandle) return
  // Not on phones: the loading screen already runs a particle canvas, and a
  // second WebGL context here delays the very thing it decorates.
  if (window.innerWidth < 900 || !window.matchMedia('(pointer: fine)').matches) return
  try {
    const { createChromeModel } = await import('~~/lib/stride/chrome-model')
    figureHandle = createChromeModel(el, {
      url: '/ecosystem/hero-model.glb',
      progress: () => 0.5, // centred; the loading screen has no scroll
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      scrollSpin: false, // constant, gentle turn instead of scroll-coupled
      material: { color: '#dfe6ff', metalness: 1, roughness: 0.12, envMapIntensity: 3.4, exposure: 0.95 },
    })
  }
  catch {
    // The loader is complete without it; no need to shout on a screen that is
    // about to disappear.
  }
}, { immediate: true })

onBeforeUnmount(() => {
  figureHandle?.dispose()
  figureHandle = null
  if (timeoutId) clearTimeout(timeoutId)
  if (raf && gsap) gsap.ticker.remove(raf)
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('pointermove', onPointer)
  lockScroll(false)
})
</script>

<template>
  <Transition name="boot">
    <!-- role=status, not a dialog: it announces that the site is loading and then goes
         away on its own. aria-busy tells AT the app is not ready yet. -->
    <div
      v-if="show"
      class="boot"
      :class="{ 'is-leaving': leaving }"
      role="status"
      aria-live="polite"
      aria-busy="true"
      @click="finish"
    >
      <!-- THE FIRST FRAME. This <img> is in the server HTML, so it animates the moment
           the page paints — no JS, no hydration. Measured: hydration lands ~2.3s into a
           cold production load, and without this the visitor stared at a blank panel for
           all of it. The particle canvas below is the ENHANCEMENT: when hydration arrives
           with budget left, it takes over and this fades out. -->
      <!-- ACT ONE — the cold open. One beat is on screen at a time; the parallax comes
           from --mx/--my, which the pointer handler writes (the "screen reacts to the
           cursor" beat). aria-hidden: the whole sequence is announced once, as one
           sentence, by .boot__sr — reading seven fragments one per second to a screen
           reader would be hostile. -->
      <div v-if="coldOpen" ref="stageEl" class="boot__stage" aria-hidden="true">
        <p
          v-for="(b, i) in beats"
          :key="b.at"
          class="boot__beat"
          :class="[`boot__beat--${b.kind}`, { 'is-on': beat === i }]"
        >{{ b.text }}</p>
      </div>

      <img
        v-show="!coldOpen && !particlesLive"
        class="boot__logo"
        src="/brand/logo/svara-logo-white.svg"
        alt=""
        aria-hidden="true"
        draggable="false"
      >
      <canvas ref="canvasEl" class="boot__canvas" aria-hidden="true" />

      <!-- The wrapper always holds its box (see the note on figureEl); only the
           opacity changes, so the model has real dimensions from the first frame. -->
      <div class="boot__figure" :class="{ 'is-on': !coldOpen }" aria-hidden="true">
        <canvas ref="figureEl" class="boot__figure-canvas" />
      </div>

      <p class="boot__sr">
        SVARA TechFusion. Intelligence was never meant to live in silos — it was meant to
        become the layer beneath everything. Loading, {{ progress }} percent.
      </p>

      <div class="boot__readout" aria-hidden="true">
        <div class="boot__bar"><span :style="{ transform: `scaleX(${progress / 100})` }" /></div>
        <p class="boot__meta">
          <span>SVARA TECHFUSION</span>
          <!-- only once JS is actually driving it; a hard-coded 000 in the SSR markup
               reads as a stalled loader for however long hydration takes -->
          <span v-if="particlesLive" class="boot__pct">{{ String(progress).padStart(3, '0') }}</span>
          <span v-else class="boot__pct boot__pct--idle">••••</span>
        </p>
      </div>

      <button type="button" class="boot__skip" @click.stop="finish">Skip</button>
    </div>
  </Transition>
</template>

<style scoped>
.boot {
  position: fixed;
  inset: 0;
  z-index: 10000; /* above the chatbot (9999) — nothing outranks the boot */
  display: grid;
  place-items: center;
  /* deep brand navy, not the near-white panel the first version used — light particles
     on a light ground were effectively invisible on a real screen */
  background: radial-gradient(120% 90% at 50% 42%, #16233f 0%, #0a1020 60%, #070b16 100%);
  cursor: pointer;
}

.boot__canvas { position: absolute; inset: 0; width: 100%; height: 100%; }

/* OFF-CENTRE, deliberately. The particle logo assembles in the middle of the
   screen and is the payoff of this sequence — a centred figure covered the
   wordmark. On anything wide enough it stands to the right of the logo; below
   that there is no room beside it, so it shrinks and rises above instead.
   Sized off the smaller viewport axis so it never crowds the readout on a short
   window. Opacity-gated, never display-gated (see the note on figureEl). */
.boot__figure {
  position: absolute; left: 50%; top: 30%;
  transform: translate(-50%, -50%);
  width: min(30vmin, 190px); height: min(46vmin, 290px);
  pointer-events: none;
  opacity: 0;
  transition: opacity 900ms ease;
}
@media (min-width: 900px) {
  .boot__figure {
    left: auto; right: 7vw; top: 50%;
    transform: translateY(-50%);
    width: min(26vmin, 230px); height: min(54vmin, 430px);
  }
}
.boot__figure.is-on { opacity: 1; }
.boot__figure-canvas { display: block; width: 100%; height: 100%; }
@media (prefers-reduced-motion: reduce) { .boot__figure { transition: none; } }

/* ── the cold open ───────────────────────────────────────────────────────── */
.boot__stage {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 0 clamp(24px, 6vw, 80px);
  text-align: center;
  /* the whole stage drifts a few px with the cursor */
  transform: translate3d(calc(var(--mx, 0) * 18px), calc(var(--my, 0) * 12px), 0);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

/* every beat occupies the same cell, so they cross-fade in place rather than reflow */
.boot__beat {
  grid-area: 1 / 1;
  margin: 0;
  max-width: 20ch;
  color: #e8efff;
  opacity: 0;
  filter: blur(10px);
  transform: translateY(10px);
  transition: opacity 0.7s ease, filter 0.7s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.1;
  font-size: clamp(26px, 4.6vw, 62px);
}
.boot__beat.is-on { opacity: 1; filter: blur(0); transform: none; }

/* the technical line is small, monospaced and quiet — a system readout, not a statement */
.boot__beat--tech {
  max-width: none;
  font-family: var(--font-mono, monospace);
  font-size: clamp(11px, 1.1vw, 13px);
  font-weight: 400;
  letter-spacing: 0.28em;
  color: rgba(160, 190, 240, 0.85);
}

/* "text fragments" — the line arrives broken up, in the site's own glitch colours */
.boot__beat--frag.is-on { animation: boot-frag 0.75s steps(1) 1; }
@keyframes boot-frag {
  0%   { clip-path: inset(38% 0 44% 0); text-shadow: -6px 0 0 #00e5ff, 6px 0 0 #ff2a8a; transform: translateX(-7px); }
  22%  { clip-path: inset(6% 0 72% 0);  text-shadow: 5px 0 0 #00e5ff, -5px 0 0 #ff2a8a;  transform: translateX(9px); }
  46%  { clip-path: inset(70% 0 8% 0);  text-shadow: -4px 0 0 #00e5ff, 4px 0 0 #ff2a8a;  transform: translateX(-4px); }
  70%  { clip-path: inset(24% 0 52% 0); text-shadow: 3px 0 0 #00e5ff, -3px 0 0 #ff2a8a;  transform: translateX(3px); }
  100% { clip-path: inset(0 0 0 0);     text-shadow: none;                                transform: none; }
}

/* the SVARA flash: bigger, brighter, and on screen for a fraction of a second */
.boot__beat--pulse {
  font-family: var(--font-mono, monospace);
  font-weight: 400;
  letter-spacing: 0.34em;
  font-size: clamp(30px, 6vw, 84px);
  color: #fff;
  text-shadow: 0 0 42px rgba(0, 229, 255, 0.55);
}
.boot__beat--pulse.is-on { animation: boot-flash 0.9s ease-out 1 both; }
@keyframes boot-flash {
  0%   { opacity: 0; letter-spacing: 0.6em; }
  18%  { opacity: 1; letter-spacing: 0.34em; }
  46%  { opacity: 1; }
  100% { opacity: 0; letter-spacing: 0.3em; }
}

.boot__beat--final {
  font-family: var(--font-mono, monospace);
  font-size: clamp(15px, 1.9vw, 24px);
  letter-spacing: 0.2em;
  max-width: none;
  color: #fff;
}

/* The no-JS first frame: resolves out of a blur exactly the way the particle cloud does,
   so the handoff between the two reads as one continuous move rather than a swap. */
.boot__logo {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(62vw, 720px);
  height: auto;
  transform: translate(-50%, -54%);
  animation: boot-resolve 1.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  user-select: none;
}
/* the CSS first frame is the fallback for a no-JS / slow-hydration load, where the cold
   open never runs; once JS is driving, the sequence owns the screen instead */
.boot__stage ~ .boot__logo { animation: none; opacity: 0; }

@keyframes boot-resolve {
  0%   { opacity: 0; filter: blur(22px); transform: translate(-50%, -54%) scale(1.06); }
  60%  { opacity: 1; }
  100% { opacity: 1; filter: blur(0);    transform: translate(-50%, -54%) scale(1); }
}

/* The bar is alive from first paint too — it creeps to 90% on CSS alone, and JS only
   takes it the rest of the way. A bar frozen at 0 during hydration reads as a hang. */
.boot__bar span { animation: boot-fill 2.2s cubic-bezier(0.22, 1, 0.36, 1) both; }
@keyframes boot-fill { from { transform: scaleX(0); } to { transform: scaleX(0.9); } }
/* once JS drives it, the inline style wins and the animation must stop fighting it */
.boot__bar span[style] { animation: none; }

.boot__pct--idle { letter-spacing: 0.1em; opacity: 0.55; }

/* the visible readout sits low, out of the logo's way */
.boot__readout {
  position: absolute;
  left: 50%;
  bottom: clamp(56px, 12vh, 128px);
  transform: translateX(-50%);
  width: min(320px, 68vw);
}

.boot__bar {
  height: 1px;
  background: rgba(255, 255, 255, 0.16);
  overflow: hidden;
}
.boot__bar span {
  display: block;
  height: 100%;
  width: 100%;
  transform-origin: 0 50%;
  transform: scaleX(0);
  background: linear-gradient(90deg, #6ba6ff, #00e5ff 55%, #ff2a8a);
}

.boot__meta {
  margin: 12px 0 0;
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  letter-spacing: 0.22em;
  color: rgba(226, 234, 255, 0.6);
}
.boot__pct { color: rgba(255, 255, 255, 0.92); }

.boot__skip {
  position: absolute;
  right: clamp(16px, 4vw, 40px);
  bottom: clamp(16px, 4vw, 40px);
  padding: 8px 18px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: transparent;
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(226, 234, 255, 0.75);
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease;
}
.boot__skip:hover { color: #fff; border-color: rgba(255, 255, 255, 0.6); }

/* screen-reader text — the canvas says nothing on its own */
.boot__sr {
  position: absolute;
  width: 1px; height: 1px;
  margin: -1px; padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

.boot-leave-active { transition: opacity 0.55s ease; }
.boot-leave-to { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .boot { display: none; }
}
</style>
