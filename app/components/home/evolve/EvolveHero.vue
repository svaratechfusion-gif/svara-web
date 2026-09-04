<script setup lang="ts">
// EVOLVE HERO — Scene 01 of the master experience.
//
// A single mission-control composition sitting on the Harness void canvas with
// the persistent WebGL particle head (EvolveCanvasLayer) behind it. Four layers:
//
//   1. EvolveGrid         — blueprint rule grid + crosshairs (the engineering frame)
//   2. The corner brackets — a four-cornered instrument frame, hairline + mint tick
//   3. The instrument panel — eyebrow ("MISSION CONTROL // LIVE"), display headline
//                            ("Engineering / Intelligence" + "That Evolves / With You."),
//                            and a subline
//   4. The live readout    — a row of four mint/iris/ember data chips at the base of
//                            the hero, each one a real engineering metric the rest
//                            of the page returns to (uptime, tokens, customers,
//                            systems online)
//
// Nothing competes with the 3D humanoid — the headline sits TOP-LEFT and BOTTOM-RIGHT
// around it, the readout sits BOTTOM-CENTER, and the corner brackets hold the
// composition. The aurora beam (HomeAurora) drifts behind the head.
import EvolveGrid from '~/components/home/evolve/EvolveGrid.vue'
import EvolveHeadline from '~/components/home/evolve/EvolveHeadline.vue'
import EvolveStats from '~/components/home/evolve/EvolveStats.vue'

defineProps<{ active: boolean }>()

// The four live data chips. Real engineering metrics, instrument-panel
// typography, mint/iris/ember accents. The numbers are real, the units
// are the ones the rest of the page uses.
const readouts = [
  { tag: 'SVC-01', label: 'Platform uptime', value: '99.99', unit: '%', accent: 'mint' },
  { tag: 'TOK-02', label: 'Tokens processed daily', value: '45', unit: 'B+', accent: 'iris' },
  { tag: 'CUS-03', label: 'Enterprise customers', value: '120', unit: '+', accent: 'ember' },
  { tag: 'SYS-04', label: 'Intelligence systems online', value: '10', unit: '/ 10', accent: 'mint' },
]
</script>

<template>
  <section class="evolve-root" :class="{ 'is-in': active }">
    <EvolveGrid :active="active" />

    <!-- the four-cornered instrument frame, mint tick at TL -->
    <div class="ev__frame" aria-hidden="true">
      <span class="ev__corner ev__corner--tl" />
      <span class="ev__corner ev__corner--tr" />
      <span class="ev__corner ev__corner--bl" />
      <span class="ev__corner ev__corner--br" />
    </div>

    <!-- the instrument panel (eyebrow + headline + subline) -->
    <div class="ev__panel">
      <p class="ev__eyebrow" :class="{ 'is-in': active }">
        <span class="ev__eyebrow-dot" />
        <span class="ev__eyebrow-text">MISSION CONTROL // LIVE</span>
        <span class="ev__eyebrow-sep" aria-hidden="true">/</span>
        <span class="ev__eyebrow-sub">SVARA · INTELLIGENCE LAYER · v1</span>
      </p>

      <EvolveHeadline :active="active" />

      <p class="ev__lead" :class="{ 'is-in': active }">
        <span class="ev__lead-prefix" aria-hidden="true">// </span>From foundation models to production-ready infrastructure.
      </p>
    </div>

    <!-- the live readout — four chips at the base -->
    <ol class="ev__readout" :class="{ 'is-in': active }" aria-label="Live system readout">
      <li
        v-for="(r, i) in readouts"
        :key="r.tag"
        class="ev__chip"
        :class="`ev__chip--${r.accent}`"
        :style="{ '--i': i }"
      >
        <span class="ev__chip-tag">{{ r.tag }}</span>
        <span class="ev__chip-row">
          <span class="ev__chip-dot" aria-hidden="true" />
          <span class="ev__chip-label">{{ r.label }}</span>
        </span>
        <span class="ev__chip-value">
          <span class="ev__chip-num">{{ r.value }}</span><span class="ev__chip-unit">{{ r.unit }}</span>
        </span>
      </li>
    </ol>

    <!-- the absolute-positioned stats grid (EvolveStats) — kept behind the readout
         as the engineering "live data" surface; the readout below is its summary -->
    <EvolveStats :active="active" />
  </section>
</template>

<style scoped>
/* Transparent — the fixed WebGL canvas shows through from behind. */
.evolve-root {
  position: relative;
  height: 100dvh;
  overflow: hidden;
  background: transparent;
  color: #fff;
  font-family: var(--font-display);
  isolation: isolate;
}

/* ── the four-cornered instrument frame ────────────────────────────────── */
.ev__frame { position: absolute; inset: 1.5rem; z-index: 4; pointer-events: none; }
.ev__corner {
  position: absolute;
  width: 1.375rem; height: 1.375rem;
  border: 1px solid rgba(217, 218, 229, 0.42);
  border-radius: 1px;
}
.ev__corner--tl { top: 0; left: 0; border-right: 0; border-bottom: 0; border-color: var(--au-mint); box-shadow: 0 0 18px rgba(112, 220, 211, 0.22); }
.ev__corner--tr { top: 0; right: 0; border-left: 0; border-bottom: 0; }
.ev__corner--bl { bottom: 0; left: 0; border-right: 0; border-top: 0; }
.ev__corner--br { bottom: 0; right: 0; border-left: 0; border-top: 0; }

/* ── the instrument panel (eyebrow + headline + subline) ───────────────── */
.ev__panel {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
}

.ev__eyebrow {
  position: absolute;
  top: 3.5rem;
  left: 2.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  margin: 0;
  padding: 0.5rem 0.875rem;
  border: 1px solid rgba(217, 218, 229, 0.32);
  border-radius: 800px;
  background: rgba(13, 14, 18, 0.55);
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  line-height: 1;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--au-ash, #c8cad0);
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 800ms var(--ease) 200ms, transform 800ms var(--ease) 200ms;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.ev__eyebrow.is-in { opacity: 1; transform: none; }

.ev__eyebrow-dot {
  width: 0.375rem; height: 0.375rem; border-radius: 50%;
  background: var(--au-mint);
  box-shadow: 0 0 0 3px rgba(112, 220, 211, 0.22);
  animation: ev-pulse 1.8s ease-in-out infinite;
}
@keyframes ev-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.55; transform: scale(0.78); }
}

.ev__eyebrow-text { color: #ffffff; font-weight: 500; }
.ev__eyebrow-sep { color: var(--au-graphite, #aeaeb7); margin: 0 0.125rem; }
.ev__eyebrow-sub { color: var(--au-graphite, #aeaeb7); font-weight: 400; }

.ev__lead {
  position: absolute;
  bottom: 2.5rem;
  left: 2.5rem;
  width: 17.5rem;
  margin: 0;
  z-index: 6;
  font-family: var(--font-mono);
  font-size: 0.9375rem;
  line-height: 1.4;
  letter-spacing: -0.005em;
  color: var(--au-ash, #c8cad0);
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 1000ms var(--ease) 1800ms, transform 1000ms var(--ease) 1800ms;
}
.ev__lead.is-in { opacity: 1; transform: none; }
.ev__lead-prefix { color: var(--au-mint); font-weight: 500; }

@media (max-width: 1279px) {
  .ev__eyebrow { top: 2.25rem; left: 1.5rem; font-size: 0.625rem; }
  .ev__lead { left: 1.5rem; bottom: 1.75rem; font-size: 0.8125rem; width: auto; max-width: 16rem; }
}

/* ── the live readout — four chips at the base ─────────────────────────── */
.ev__readout {
  position: absolute;
  bottom: 1.75rem;
  right: 1.75rem;
  z-index: 6;
  display: flex;
  gap: 0.625rem;
  margin: 0;
  padding: 0;
  list-style: none;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 800ms var(--ease) 2200ms, transform 800ms var(--ease) 2200ms;
}
.ev__readout.is-in { opacity: 1; transform: none; }

.ev__chip {
  display: grid;
  grid-template-rows: auto auto auto;
  gap: 0.25rem;
  padding: 0.625rem 0.875rem;
  min-width: 9.5rem;
  border: 1px solid rgba(217, 218, 229, 0.32);
  border-radius: 12px;
  background: rgba(13, 14, 18, 0.62);
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: border-color 200ms var(--ease-smooth), transform 240ms var(--ease-smooth);
}
.ev__chip:hover { border-color: var(--au-fog, #d9dae5); transform: translateY(-1px); }

.ev__chip-tag {
  font-size: 0.5625rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--au-graphite, #aeaeb7);
}

.ev__chip-row { display: inline-flex; align-items: center; gap: 0.4375rem; }
.ev__chip-dot { width: 0.3125rem; height: 0.3125rem; border-radius: 50%; }
.ev__chip--mint .ev__chip-dot { background: var(--au-mint); box-shadow: 0 0 0 2px rgba(112, 220, 211, 0.2); }
.ev__chip--iris .ev__chip-dot { background: var(--au-iris, #5683da); box-shadow: 0 0 0 2px rgba(86, 131, 218, 0.2); }
.ev__chip--ember .ev__chip-dot { background: var(--au-ember, #ff8964); box-shadow: 0 0 0 2px rgba(255, 137, 100, 0.2); }

.ev__chip-label { font-size: 0.625rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--au-ash, #c8cad0); }
.ev__chip-value { display: inline-flex; align-items: baseline; gap: 0.1875rem; }
.ev__chip-num { font-size: 1.375rem; line-height: 1; color: #ffffff; font-weight: 500; letter-spacing: 0.005em; }
.ev__chip-unit { font-size: 0.6875rem; color: var(--au-graphite, #aeaeb7); font-weight: 400; }

.ev__chip--mint { border-color: rgba(112, 220, 211, 0.36); background: rgba(112, 220, 211, 0.06); }
.ev__chip--mint .ev__chip-tag { color: var(--au-mint); }

@media (max-width: 1100px) {
  .ev__readout { flex-wrap: wrap; max-width: 32rem; right: 1.5rem; bottom: 1.5rem; }
  .ev__chip { min-width: 8.5rem; }
}
@media (max-width: 760px) {
  .ev__readout { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .ev__eyebrow-dot { animation: none; }
  .ev__eyebrow, .ev__lead, .ev__readout { transition: none; opacity: 1; transform: none; }
  .ev__chip:hover { transform: none; }
}

/* ── mobile (existing flow) ───────────────────────────────────────────── */
@media (max-width: 767px) {
  .evolve-root { display: flex; flex-direction: column; padding: 5.5rem 1rem 1rem; }
  .ev__frame { inset: 1rem; }
  .ev__eyebrow { position: static; margin-bottom: 1rem; }
  .ev__lead { position: static; width: auto; margin-top: auto; z-index: 5; }
  .evolve-root :deep(.eh) { position: relative; z-index: 5; margin-top: 1rem; }
  .evolve-root :deep(.est) { position: relative; z-index: 5; margin-top: 1.5rem; }
}
</style>
