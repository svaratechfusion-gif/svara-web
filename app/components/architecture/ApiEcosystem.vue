<script setup lang="ts">
// API ECOSYSTEM — enterprise integrations (SAP, Oracle, Salesforce, Zoho,
// Microsoft 365, Google Workspace, IoT, PLC, Cameras) converging through
// one API Gateway into the SVARA ecosystem. Packets flow from each
// integration through the gateway and into the core — representing system
// integration, not decoration.
import { INTEGRATIONS } from '~/utils/architecture'

// position integrations along the top, spread horizontally above the gateway
const NODES = INTEGRATIONS.map((name, i) => {
  const x = 8 + (i / (INTEGRATIONS.length - 1)) * 84
  return { name, x, y: 12 }
})
</script>

<template>
  <section class="ae">
    <div class="ae__head">
      <p class="ae__eyebrow">API Ecosystem</p>
      <h2 class="ae__title">Every enterprise system, one gateway.</h2>
      <p class="ae__sub">Enterprise integrations converge through a single API Gateway into the SVARA ecosystem — no point-to-point spaghetti, one normalized data plane.</p>
    </div>

    <div class="ae__viz" aria-hidden="true">
      <!-- integration nodes along the top -->
      <div
        v-for="n in NODES" :key="n.name"
        class="ae__int"
        :style="{ left: n.x + '%', top: n.y + '%' }"
      >{{ n.name }}</div>

      <!-- converging lines + packets -->
      <svg class="ae__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path v-for="n in NODES" :key="`l${n.name}`" :d="`M${n.x} ${n.y} L50 56`" class="ae__link" />
        <circle v-for="n in NODES" :key="`p${n.name}`" r="0.6" class="ae__packet" :style="{ offsetPath: `path('M${n.x} ${n.y} L50 56')` }" />
      </svg>

      <div class="ae__gateway">
        <span class="ae__gateway-label">API Gateway</span>
      </div>
      <div class="ae__core">
        <span class="ae__core-label">SVARA Ecosystem</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ae { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.ae__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.ae__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.ae__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.ae__sub { margin: var(--space-5) 0 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.ae__viz { position: relative; width: 100%; max-width: 1100px; margin: var(--space-16) auto 0; aspect-ratio: 1.6/1; }
.ae__int { position: absolute; transform: translate(-50%, -50%); z-index: 2; padding: 6px 12px; border-radius: var(--radius-pill); background: rgba(255,255,255,0.85); backdrop-filter: blur(8px); border: 1px solid var(--color-border); font-size: 11px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); white-space: nowrap; box-shadow: 0 4px 12px rgba(16, 42, 91, 0.06); }
.ae__svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }
.ae__link { fill: none; stroke: var(--color-accent); stroke-width: 0.4; vector-effect: non-scaling-stroke; opacity: 0.25; stroke-dasharray: 2 3; animation: ae-dash 5s linear infinite; }
@keyframes ae-dash { to { stroke-dashoffset: -30; } }
.ae__packet { fill: var(--color-accent); opacity: 0.6; animation: ae-flow 2.6s linear infinite; }
@keyframes ae-flow { from { offset-distance: 0%; } to { offset-distance: 100%; } }

.ae__gateway { position: absolute; left: 50%; top: 56%; transform: translate(-50%, -50%); z-index: 3; padding: 12px 28px; border-radius: var(--radius-pill); background: var(--color-accent); color: #fff; font-weight: var(--weight-bold); box-shadow: 0 14px 40px rgba(47, 127, 230, 0.3); }
.ae__gateway-label { font-size: 14px; letter-spacing: -0.01em; }
.ae__core { position: absolute; left: 50%; bottom: 4%; transform: translateX(-50%); z-index: 3; padding: 14px 32px; border-radius: var(--radius-pill); background: var(--color-ink-strong); color: #fff; font-size: 15px; font-weight: var(--weight-bold); box-shadow: 0 20px 56px rgba(16, 42, 91, 0.22); }

@media (max-width: 768px) {
  .ae__viz { aspect-ratio: auto; min-height: 460px; }
  .ae__int { font-size: 9.5px; padding: 5px 9px; }
}
@media (prefers-reduced-motion: reduce) { .ae__link, .ae__packet { animation: none; } }
</style>