<script setup lang="ts">
// Boot loader / reveal — a breathing intelligence core over a radial navy field,
// SVARA_INTELLIGENCE wordmark, a terminal boot line that changes with progress,
// and a thin progress meter. Presentational: the page drives `progress` + `lifting`.
import { computed } from 'vue'
const props = defineProps<{ progress: number, lifting: boolean }>()
const pct = computed(() => Math.round(Math.min(1, props.progress) * 100))
const boot = computed(() => {
  const p = props.progress
  if (p < 0.28) return 'INITIALIZING INTELLIGENCE CORE'
  if (p < 0.55) return 'CONNECTING ECOSYSTEM NODES'
  if (p < 0.85) return 'CALIBRATING INTELLIGENCE LAYER'
  return 'SYSTEM ONLINE'
})
</script>

<template>
  <div class="ecl" :class="{ 'is-lifting': lifting }">
    <div class="ecl__core" aria-hidden="true">
      <span class="ecl__glow" />
      <span class="ecl__ring ecl__ring--a" />
      <span class="ecl__ring ecl__ring--b" />
      <span class="ecl__dot" />
    </div>
    <p class="ecl__brand">SVARA_INTELLIGENCE</p>
    <p class="ecl__boot"><span class="ecl__prompt">&gt;</span> {{ boot }}<span class="ecl__caret">_</span></p>
    <div class="ecl__meter"><span class="ecl__fill" :style="{ transform: `scaleX(${Math.min(1, progress)})` }" /></div>
    <p class="ecl__pct">{{ pct }}%</p>
  </div>
</template>

<style scoped>
.ecl {
  position: fixed; inset: 0; z-index: 50;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.1rem;
  background: radial-gradient(circle at 50% 44%, #04122e, #01040e 70%);
  transition: opacity 1100ms cubic-bezier(0.65, 0, 0.35, 1), transform 1100ms cubic-bezier(0.65, 0, 0.35, 1);
}
.ecl.is-lifting { opacity: 0; transform: scale(1.04); pointer-events: none; }

.ecl__core { position: relative; width: 7rem; height: 7rem; display: grid; place-items: center; margin-bottom: 1rem; animation: ecl-breathe 2.9s ease-in-out infinite; }
.ecl__glow { position: absolute; inset: -30%; border-radius: 50%; background: radial-gradient(circle, rgba(142, 203, 255, 0.3), transparent 70%); animation: ecl-glow 2.9s ease-in-out infinite; }
.ecl__ring { position: absolute; border-radius: 50%; border: 1px solid rgba(142, 203, 255, 0.4); }
.ecl__ring--a { inset: 8%; }
.ecl__ring--b { inset: 24%; }
.ecl__dot { width: 1.1rem; height: 1.1rem; border-radius: 50%; background: rgba(142, 203, 255, 0.7); filter: blur(3px); }
@keyframes ecl-breathe { 0%, 100% { transform: scale(0.85); } 50% { transform: scale(1.12); } }
@keyframes ecl-glow { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.7; } }

.ecl__brand { margin: 0; font-size: 0.8rem; letter-spacing: 0.5em; color: rgba(142, 203, 255, 0.85); }
.ecl__boot { margin: 0; font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(142, 203, 255, 0.6); }
.ecl__prompt { color: rgba(142, 203, 255, 0.4); }
.ecl__caret { animation: ec-blink 1.05s steps(1) infinite; }
@keyframes ec-blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
.ecl__meter { width: min(60vw, 18rem); height: 2px; background: rgba(142, 203, 255, 0.15); overflow: hidden; }
.ecl__fill { display: block; height: 100%; background: var(--brain-sky, #8ecbff); box-shadow: 0 0 10px rgba(31, 106, 224, 0.9); transform-origin: left; transform: scaleX(0); transition: transform 300ms ease; }
.ecl__pct { margin: 0; font-size: 0.64rem; letter-spacing: 0.2em; color: rgba(142, 203, 255, 0.5); font-variant-numeric: tabular-nums; }
@media (prefers-reduced-motion: reduce) { .ecl__core, .ecl__glow { animation: none; } }
</style>
