<script setup lang="ts">
// 09 · VISION / FUTURE — the cinematic beat. Oversized typography, generous
// negative space, one sophisticated centerpiece: a slow intelligence horizon
// (concentric rings + dial + a small glowing core) echoing the hero sphere.
const ticks = Array.from({ length: 60 }, (_, i) => i)
</script>

<template>
  <section class="vs">
    <div class="vs__stage" aria-hidden="true">
      <ClientOnly>
      <svg class="vs__horizon" viewBox="0 0 400 400">
        <defs>
          <radialGradient id="vsGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stop-color="#8fb0d8" stop-opacity="0.28" />
            <stop offset="0.6" stop-color="#8fb0d8" stop-opacity="0.05" />
            <stop offset="1" stop-color="#8fb0d8" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="vsCore" cx="42%" cy="38%" r="70%">
            <stop offset="0" stop-color="#ffffff" stop-opacity="0.95" />
            <stop offset="0.45" stop-color="#c7d4e6" stop-opacity="0.8" />
            <stop offset="1" stop-color="#2b3e63" stop-opacity="0.85" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="200" fill="url(#vsGlow)" />
        <g class="vs__ticks" stroke="#14223f">
          <line
v-for="t in ticks" :key="t" x1="200" :y1="t % 5 === 0 ? 40 : 44" x2="200" y2="48"
            :stroke-opacity="t % 5 === 0 ? 0.22 : 0.08" stroke-width="0.8" :transform="`rotate(${t * 6} 200 200)`" />
        </g>
        <circle cx="200" cy="200" r="176" fill="none" stroke="#14223f" stroke-opacity="0.08" />
        <circle class="vs__spin" cx="200" cy="200" r="150" fill="none" stroke="#9aa3b2" stroke-opacity="0.4" stroke-width="1" stroke-dasharray="120 40 60 200" />
        <circle class="vs__spin-r" cx="200" cy="200" r="120" fill="none" stroke="#3f6fb0" stroke-opacity="0.5" stroke-width="1.4" stroke-dasharray="70 400" stroke-linecap="round" />
        <circle cx="200" cy="200" r="90" fill="none" stroke="#14223f" stroke-opacity="0.06" />
        <circle class="vs__core-halo" cx="200" cy="200" r="46" fill="url(#vsGlow)" />
        <circle cx="200" cy="200" r="24" fill="url(#vsCore)" stroke="#14223f" stroke-opacity="0.18" />
        <ellipse cx="193" cy="192" rx="8" ry="5" fill="#fff" fill-opacity="0.7" />
      </svg>
      </ClientOnly>
    </div>

    <div class="hx-container vs__inner">
      <p class="hx-eyebrow"><span class="hx-index">09</span> The Vision</p>
      <h2 class="vs__title">
        The next era of enterprise<br><span class="lite">isn't more software.</span>
      </h2>
      <p class="vs__lead">
        It is intelligent ecosystems that observe, reason, learn and act across every business function. SVARA is engineering that future — turning operational complexity into connected intelligence.
      </p>
      <NuxtLink to="/about" class="hx-btn hx-btn--ghost vs__cta">
        Where we're heading
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M0 5h14M14 5l-4-4M14 5l-4 4" stroke="currentColor" stroke-width="1.3" /></svg>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.vs {
  position: relative; overflow: hidden;
  min-height: 92vh; display: grid; place-items: center;
  padding-block: clamp(120px, 16vh, 220px);
  isolation: isolate;
}
.vs__stage { position: absolute; inset: 0; display: grid; place-items: center; z-index: 0; }
.vs__horizon { width: min(88vw, 780px); height: auto; opacity: 0.9; }
.vs__ticks { animation: vs-rot 120s linear infinite; transform-origin: 200px 200px; }
.vs__spin { animation: vs-rot 90s linear infinite; transform-origin: 200px 200px; }
.vs__spin-r { animation: vs-rot 40s linear infinite reverse; transform-origin: 200px 200px; }
.vs__core-halo { animation: vs-breathe 6s ease-in-out infinite; transform-origin: 200px 200px; }
@keyframes vs-rot { to { transform: rotate(360deg); } }
@keyframes vs-breathe { 0%, 100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.12); } }

.vs__inner { position: relative; z-index: 1; text-align: center; display: flex; flex-direction: column; align-items: center; }
.vs__inner .hx-eyebrow::before { display: none; }
.vs__title {
  margin: 28px 0 0; font-size: var(--type-display); font-weight: 600;
  letter-spacing: -0.03em; line-height: 1.02; color: var(--ink-primary); text-wrap: balance;
}
.vs__lead { margin: 32px auto 0; max-width: 56ch; font-size: var(--type-lead); line-height: 1.6; color: var(--ink-secondary); }
.vs__cta { margin-top: 44px; }

@media (prefers-reduced-motion: reduce) {
  .vs__ticks, .vs__spin, .vs__spin-r, .vs__core-halo { animation: none; }
}
</style>
