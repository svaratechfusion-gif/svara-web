<script setup lang="ts">
// 16 · DEPLOYMENT FLEXIBILITY — a deployment topology. Framed as architecture /
// design capability, not guaranteed production infrastructure.
const options = ['EDGE', 'ON-PREMISE', 'PRIVATE CLOUD', 'PUBLIC CLOUD', 'HYBRID', 'MULTI-LOCATION']
const edges = ['Factory A · Edge', 'Factory B · Edge', 'Warehouse · Edge']
</script>

<template>
  <section class="adp hx-section">
    <div class="hx-container adp__grid">
      <header class="adp__head">
        <p class="hx-eyebrow"><span class="hx-index">16</span> Deployment Flexibility</p>
        <h2 class="hx-title">One architecture. <span class="lite">Multiple environments.</span></h2>
        <p class="hx-lead">SVARA's architecture is designed to support intelligence across distributed enterprise environments — from edge deployments to private infrastructure and cloud platforms.</p>
        <ul class="adp__options">
          <li v-for="o in options" :key="o">{{ o }}</li>
        </ul>
        <p class="adp__note hx-mono-label">* Architectural design capability — deployment shape varies by engagement</p>
      </header>

      <div class="adp__topo" aria-hidden="true">
        <div class="adp__edges">
          <div v-for="e in edges" :key="e" class="adp__edge"><span class="adp__edge-dot" />{{ e }}</div>
        </div>
        <span class="adp__link"><i class="adp__flow" /></span>
        <div class="adp__tier adp__tier--ent">ENTERPRISE PRIVATE INFRASTRUCTURE</div>
        <span class="adp__link adp__link--bi">⇅</span>
        <div class="adp__tier adp__tier--cloud">CLOUD INTELLIGENCE LAYER</div>
        <span class="adp__link"><i class="adp__flow" /></span>
        <div class="adp__tier adp__tier--cmd"><span class="adp__cmd-dot" />CENTRAL COMMAND</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.adp__grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: clamp(40px, 5vw, 90px); align-items: center; }
.adp__options { list-style: none; margin: 30px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
.adp__options li { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; color: var(--ink-secondary); padding: 6px 12px; border: 1px solid rgba(20,34,63,0.14); border-radius: var(--radius-pill); background: rgba(255,255,255,0.44); }
.adp__note { margin: 18px 0 0; color: var(--ink-muted); opacity: 0.7; text-transform: none; letter-spacing: 0.04em; }

.adp__topo { display: flex; flex-direction: column; align-items: stretch; gap: 0; }
.adp__edges { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.adp__edge { text-align: center; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.04em; color: var(--ink-primary); padding: 12px 8px; border: 1px solid rgba(20,34,63,0.14); border-radius: 8px; background: rgba(255,255,255,0.6); }
.adp__edge-dot { display: block; width: 6px; height: 6px; border-radius: 50%; background: var(--sig); margin: 0 auto 6px; }
.adp__link { position: relative; height: 26px; width: 1px; margin: 0 auto; background: rgba(20,34,63,0.18); }
.adp__link--bi { height: auto; width: auto; background: none; text-align: center; color: var(--sig); font-size: 16px; padding: 4px 0; }
.adp__flow { position: absolute; left: 50%; top: 0; width: 6px; height: 6px; margin-left: -3px; border-radius: 50%; background: var(--sig); animation: adp-down 2.4s ease-in-out infinite; }
@keyframes adp-down { 0% { top: 0; opacity: 0; } 20% { opacity: 1; } 100% { top: 20px; opacity: 0; } }
.adp__tier { text-align: center; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; color: var(--ink-primary); padding: 16px; border: 1px solid rgba(20,34,63,0.14); background: linear-gradient(158deg, rgba(255,255,255,0.6), rgba(255,255,255,0.36)); clip-path: polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%); box-shadow: 0 18px 40px -30px rgba(16,42,91,0.3); }
.adp__tier--cloud { border-color: rgba(63,111,176,0.28); }
.adp__tier--cmd { color: #fff; background: var(--ink-primary); }
.adp__cmd-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--sig); margin-right: 8px; vertical-align: middle; }

@media (max-width: 900px) { .adp__grid { grid-template-columns: 1fr; gap: 36px; } }
@media (prefers-reduced-motion: reduce) { .adp__flow { animation: none; opacity: 0; } }
</style>
