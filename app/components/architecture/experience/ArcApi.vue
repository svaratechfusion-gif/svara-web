<script setup lang="ts">
// 18 · BUILT TO CONNECT — the integration gateway between existing enterprise
// environments and SVARA intelligence. Architecture-capability language.
const surfaces = ['REST APIs', 'Webhooks', 'Event Streams', 'DB Connectors', 'Enterprise Systems', 'IoT Protocols', 'Model Endpoints', 'App Services']
const enterprise = ['ERP', 'CRM', 'Databases', 'Legacy Systems']
const svara = ['Intelligence Services', 'Agents', 'Digital Twins', 'One AI OS']
</script>

<template>
  <section class="api hx-section">
    <div class="hx-container">
      <header class="api__head">
        <p class="hx-eyebrow"><span class="hx-index">18</span> Built to Connect</p>
        <h2 class="hx-title">Intelligence <span class="lite">without silos.</span></h2>
        <p class="hx-lead">SVARA's architecture is designed to connect with existing enterprise environments rather than forcing intelligence into isolated systems.</p>
      </header>

      <div class="api__diagram" aria-hidden="true">
        <div class="api__side">
          <span class="api__side-h hx-mono-label">EXISTING ENTERPRISE</span>
          <span v-for="e in enterprise" :key="e" class="api__pill">{{ e }}</span>
        </div>

        <div class="api__gateway">
          <span class="api__gateway-dot" />
          <span class="api__gateway-name">INTEGRATION LAYER</span>
          <div class="api__surfaces"><span v-for="s in surfaces" :key="s">{{ s }}</span></div>
          <span class="api__gateway-bi">⇄</span>
        </div>

        <div class="api__side api__side--r">
          <span class="api__side-h hx-mono-label">SVARA INTELLIGENCE</span>
          <span v-for="s in svara" :key="s" class="api__pill api__pill--sig">{{ s }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.api__head { max-width: 60ch; margin-bottom: clamp(44px, 5vw, 76px); }
.api__diagram { display: grid; grid-template-columns: 0.8fr 1.4fr 0.8fr; gap: clamp(16px, 3vw, 40px); align-items: center; }
.api__side { display: flex; flex-direction: column; gap: 8px; }
.api__side-h { color: var(--ink-muted); margin-bottom: 4px; }
.api__pill { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.04em; color: var(--ink-primary); padding: 9px 12px; border: 1px solid rgba(20,34,63,0.12); border-radius: 7px; background: rgba(255,255,255,0.6); text-align: center; }
.api__pill--sig { color: var(--sig); border-color: rgba(63,111,176,0.28); }
.api__side--r { text-align: right; }

.api__gateway { position: relative; display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 24px 22px; border: 1px solid rgba(63,111,176,0.28); background: linear-gradient(158deg, rgba(255,255,255,0.66), rgba(63,111,176,0.05)); box-shadow: 0 34px 70px -42px rgba(16,42,91,0.36), inset 0 1px 0 rgba(255,255,255,0.7); clip-path: polygon(0 14px, 14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%); }
.api__gateway-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--sig); box-shadow: 0 0 0 3px rgba(63,111,176,0.16); }
.api__gateway-name { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; color: var(--ink-primary); }
.api__surfaces { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; margin-top: 6px; width: 100%; }
.api__surfaces span { font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.03em; color: var(--ink-secondary); padding: 6px 8px; border: 1px solid rgba(20,34,63,0.1); border-radius: 5px; text-align: center; background: rgba(255,255,255,0.6); }
.api__gateway-bi { margin-top: 4px; font-size: 18px; color: var(--sig); }

@media (max-width: 900px) {
  .api__diagram { grid-template-columns: 1fr; gap: 20px; }
  .api__side--r { text-align: left; }
  .api__surfaces { grid-template-columns: repeat(4, 1fr); }
}
@media (max-width: 560px) { .api__surfaces { grid-template-columns: repeat(2, 1fr); } }
</style>
