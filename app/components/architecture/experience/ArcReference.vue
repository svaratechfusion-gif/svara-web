<script setup lang="ts">
// 22 · SVARA REFERENCE ARCHITECTURE — the definitive, clearest architecture
// blueprint on the site. Eight layers + four cross-cutting rails; hover/select
// a layer for progressive disclosure (role / input / output / connected /
// related products). The payoff: the user now recognises every layer.
import { ref } from 'vue'
interface Layer { name: string, items: string[], role: string, input: string, output: string, connected: string, products: string[] }
const layers: Layer[] = [
  { name: 'Experience', items: ['One AI OS', 'Command Center', 'Enterprise Apps', 'APIs'], role: 'Where people and systems use intelligence', input: 'Orchestrated results', output: 'Actions, insights, APIs', connected: 'One AI OS · Command Center', products: ['One AI OS', 'Business Cloud'] },
  { name: 'Orchestration', items: ['Agent Orchestration', 'Workflow Engine', 'Policy Engine', 'Event Bus'], role: 'Coordinates models, agents, workflows and systems', input: 'Requests + policy', output: 'Routed, governed execution', connected: 'Agents · Workflows · Event bus', products: ['AI Agents', 'One AI OS'] },
  { name: 'Cognition', items: ['AI Agents', 'Planning', 'Reasoning', 'Memory', 'Tool Use'], role: 'Interprets objectives and decides', input: 'Context + objectives', output: 'Plans and controlled actions', connected: 'Tools · Memory · Agents', products: ['AI Agents', 'Cognitive AI'] },
  { name: 'Intelligence', items: ['Vision', 'Multimodal AI', 'Generative AI', 'Predictive AI'], role: 'Runs specialized model inference', input: 'Structured signal + context', output: 'Detections, predictions, generation', connected: 'Model router · Context engine', products: ['Vision AI', 'Generative AI'] },
  { name: 'Simulation', items: ['Digital Twins', 'Simulation', 'Forecasting'], role: 'Models and predicts outcomes', input: 'Twin state + scenarios', output: 'Forecasts + recommendations', connected: 'Digital twin · Sim engine', products: ['Digital Twin'] },
  { name: 'Data & Context', items: ['Operational Data', 'Enterprise Data', 'Knowledge', 'Vector Systems'], role: 'Unifies context across systems', input: 'Streams + enterprise data', output: 'Served, contextual intelligence', connected: 'Vectors · Knowledge · Streams', products: ['Business Cloud'] },
  { name: 'Edge & Perception', items: ['Vision AI', 'Drone AI', 'Edge AI', 'Sensors'], role: 'Perceives and computes at the source', input: 'Raw physical + digital signals', output: 'Structured intelligence events', connected: 'Edge nodes · Sensors', products: ['Vision AI', 'Drone AI', 'Edge AI'] },
  { name: 'Physical + Digital Sources', items: ['Machines', 'Cameras', 'Drones', 'IoT', 'ERP', 'CRM', 'APIs'], role: 'The connected physical and digital world', input: 'The operating environment', output: 'Signals into the stack', connected: 'Cameras · Machines · ERP · CRM', products: ['—'] },
]
const rails = ['SECURITY', 'GOVERNANCE', 'OBSERVABILITY', 'INFRASTRUCTURE']
const active = ref(0)
</script>

<template>
  <section class="aref hx-section">
    <div class="hx-container">
      <header class="aref__head">
        <p class="hx-eyebrow"><span class="hx-index">22</span> SVARA Reference Architecture</p>
        <h2 class="hx-title">The complete <span class="lite">intelligence stack.</span></h2>
        <p class="hx-lead">Every layer you've explored, assembled into one blueprint. Hover a layer to see its role, inputs, outputs and the products it powers.</p>
      </header>

      <div class="aref__body">
        <div class="aref__blueprint">
          <div class="aref__rails" aria-hidden="true">
            <span v-for="r in rails" :key="r" class="aref__rail">{{ r }}</span>
          </div>
          <ol class="aref__stack">
            <li v-for="(l, i) in layers" :key="l.name">
              <button class="aref__layer" :class="{ 'is-active': active === i }" @mouseenter="active = i" @focus="active = i" @click="active = i">
                <span class="aref__layer-n hx-mono">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="aref__layer-name">{{ l.name }}</span>
                <span class="aref__layer-items">{{ l.items.join(' · ') }}</span>
              </button>
            </li>
          </ol>
        </div>

        <div class="aref__detail">
          <span class="hx-pin tl" /><span class="hx-pin tr" /><span class="hx-pin bl" /><span class="hx-pin br" />
          <span class="aref__detail-kicker hx-mono-label"><span class="hx-dot" /> LAYER {{ String(active + 1).padStart(2, '0') }}</span>
          <Transition name="aref-swap" mode="out-in">
            <div :key="active" class="aref__detail-body">
              <h3 class="aref__detail-name">{{ layers[active].name }}</h3>
              <p class="aref__detail-role">{{ layers[active].role }}</p>
              <dl class="aref__meta">
                <div><dt>INPUT</dt><dd>{{ layers[active].input }}</dd></div>
                <div><dt>OUTPUT</dt><dd>{{ layers[active].output }}</dd></div>
                <div><dt>CONNECTED</dt><dd>{{ layers[active].connected }}</dd></div>
              </dl>
              <div class="aref__products">
                <span class="aref__products-l hx-mono-label">RELATED PRODUCTS</span>
                <div class="aref__products-list"><span v-for="p in layers[active].products" :key="p" class="aref__chip">{{ p }}</span></div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.aref__head { max-width: 60ch; margin-bottom: clamp(44px, 5vw, 76px); }
.aref__body { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: clamp(28px, 3vw, 52px); align-items: start; }

.aref__blueprint { position: relative; padding-left: 78px; }
.aref__rails { position: absolute; left: 0; top: 0; bottom: 0; display: flex; gap: 6px; }
.aref__rail { position: relative; width: 15px; writing-mode: vertical-rl; text-align: center; font-family: var(--font-mono); font-size: 7.5px; letter-spacing: 0.12em; color: var(--ink-muted); }
.aref__rail::before { content: ""; position: absolute; left: 50%; top: 0; bottom: 0; width: 1px; transform: translateX(-50%); background: linear-gradient(180deg, rgba(63,111,176,0.06), rgba(63,111,176,0.24), rgba(63,111,176,0.06)); }

.aref__stack { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
.aref__layer { position: relative; width: 100%; display: grid; grid-template-columns: auto 1fr; grid-template-areas: "n name" "n items"; align-items: center; gap: 2px 14px; padding: 14px 18px; border: 1px solid rgba(20,34,63,0.12); background: linear-gradient(158deg, rgba(255,255,255,0.5), rgba(255,255,255,0.3)); cursor: pointer; text-align: left; clip-path: polygon(0 8px, 8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%); transition: transform var(--motion-medium) var(--ease-out), border-color var(--motion-fast) var(--ease-smooth), background var(--motion-fast) var(--ease-smooth); }
.aref__layer-n { grid-area: n; font-size: 11px; letter-spacing: 0.1em; color: var(--ink-muted); }
.aref__layer-name { grid-area: name; font-size: clamp(15px, 1.5vw, 19px); font-weight: 600; letter-spacing: -0.01em; color: var(--ink-primary); }
.aref__layer-items { grid-area: items; font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.03em; color: var(--ink-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.aref__layer.is-active { transform: translateX(6px); border-color: rgba(63,111,176,0.5); background: linear-gradient(158deg, rgba(255,255,255,0.78), rgba(63,111,176,0.06)); box-shadow: 0 24px 48px -30px rgba(16,42,91,0.4); }
.aref__layer.is-active .aref__layer-n { color: var(--sig); }
.aref__layer:focus-visible { outline: 2px solid var(--sig); outline-offset: 2px; }

.aref__detail { position: sticky; top: 120px; padding: 26px 28px; background: linear-gradient(158deg, rgba(255,255,255,0.62), rgba(255,255,255,0.4)); border: 1px solid rgba(20,34,63,0.14); box-shadow: 0 34px 70px -40px rgba(16,42,91,0.34), inset 0 1px 0 rgba(255,255,255,0.7); clip-path: polygon(0 16px, 16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%); min-height: 340px; }
.aref__detail-kicker { display: inline-flex; align-items: center; gap: 8px; color: var(--ink-muted); }
.aref__detail-body { padding-top: 18px; }
.aref__detail-name { margin: 0; font-size: clamp(26px, 3vw, 40px); font-weight: 600; letter-spacing: -0.02em; line-height: 1.05; color: var(--ink-primary); }
.aref__detail-role { margin: 12px 0 0; font-size: 16px; line-height: 1.5; color: var(--ink-secondary); }
.aref__meta { margin: 20px 0 0; display: flex; flex-direction: column; gap: 12px; }
.aref__meta div { display: grid; grid-template-columns: 92px 1fr; gap: 12px; align-items: baseline; }
.aref__meta dt { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em; color: var(--ink-muted); }
.aref__meta dd { margin: 0; font-size: 13px; color: var(--ink-primary); }
.aref__products { margin-top: 22px; padding-top: 18px; border-top: 1px dashed rgba(20,34,63,0.16); }
.aref__products-l { color: var(--ink-muted); }
.aref__products-list { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 8px; }
.aref__chip { font-size: 12px; font-weight: 500; color: var(--ink-primary); padding: 6px 12px; border: 1px solid rgba(20,34,63,0.16); border-radius: var(--radius-pill); background: rgba(255,255,255,0.6); }

.aref-swap-enter-active, .aref-swap-leave-active { transition: opacity var(--motion-medium) var(--ease-out), transform var(--motion-medium) var(--ease-out); }
.aref-swap-enter-from { opacity: 0; transform: translateY(10px); }
.aref-swap-leave-to { opacity: 0; transform: translateY(-6px); }

@media (max-width: 940px) {
  .aref__body { grid-template-columns: 1fr; gap: 24px; }
  .aref__detail { position: static; }
  .aref__layer.is-active { transform: none; }
  .aref__blueprint { padding-left: 64px; }
}
@media (max-width: 560px) { .aref__layer-items { display: none; } .aref__layer { grid-template-areas: "n name"; } }
@media (prefers-reduced-motion: reduce) { .aref__layer.is-active { transform: none; } .aref-swap-enter-active, .aref-swap-leave-active { transition: opacity var(--motion-fast) linear; } .aref-swap-enter-from, .aref-swap-leave-to { transform: none; } }
</style>
