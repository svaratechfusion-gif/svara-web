<script setup lang="ts">
// 09 · THE SVARA STACK — on the shared TechnologySection instrument system (wide
// variant: full-width instrument). The definitive intelligence architecture as one
// clean, interactive stack; hover/select a layer to reveal what it powers. Content
// and interaction preserved verbatim.
import { ref } from 'vue'
import TechnologySection from './TechnologySection.vue'

interface Layer { name: string, kind: 'io' | 'product' | 'tech', items: string[] }
const layers: Layer[] = [
  { name: 'Physical + Digital Inputs', kind: 'io', items: ['Cameras', 'Sensors', 'Drones', 'Enterprise data', 'APIs'] },
  { name: 'Perception', kind: 'product', items: ['Vision AI', 'Drone AI', 'Edge AI'] },
  { name: 'Context', kind: 'tech', items: ['Enterprise knowledge', 'Vector intelligence', 'Real-time data'] },
  { name: 'Cognition', kind: 'product', items: ['Cognitive AI', 'AI Agents', 'Generative AI'] },
  { name: 'Simulation', kind: 'product', items: ['Digital Twin', 'Prediction', 'Scenario Intelligence'] },
  { name: 'Autonomy', kind: 'tech', items: ['Autonomous agents', 'Robotics integration', 'Control systems'] },
  { name: 'Orchestration', kind: 'product', items: ['One AI OS', 'Enterprise Systems', 'Automation'] },
  { name: 'Enterprise + Physical Action', kind: 'io', items: ['Enterprise systems', 'Physical operations', 'Autonomous systems'] },
]
const active = ref(1)
</script>

<template>
  <TechnologySection
    n="09"
    eyebrow="The SVARA Stack"
    :headline="['One intelligence', 'architecture.']"
    body="Physical and digital inputs resolve — layer by layer — into enterprise and physical action. Hover a layer to see what it powers."
  >
    <div class="st2__body">
      <ol class="st2__stack">
        <li v-for="(l, i) in layers" :key="l.name">
          <button
            class="st2__layer" :class="[{ 'is-active': active === i }, `st2__layer--${l.kind}`]"
            @mouseenter="active = i" @focus="active = i" @click="active = i"
          >
            <span class="st2__layer-n hx-mono">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="st2__layer-name">{{ l.name }}</span>
            <span class="st2__layer-kind hx-mono-label">{{ l.kind === 'product' ? 'PRODUCTS' : l.kind === 'io' ? 'I/O' : 'CORE' }}</span>
          </button>
        </li>
      </ol>

      <div class="st2__detail">
        <span class="st2__detail-kicker hx-mono-label"><span class="hx-dot" /> LAYER {{ String(active + 1).padStart(2, '0') }}</span>
        <Transition name="st2-swap" mode="out-in">
          <div :key="active" class="st2__detail-body">
            <h3 class="st2__detail-name">{{ layers[active].name }}</h3>
            <p class="st2__detail-sub">{{ layers[active].kind === 'product' ? 'Powers these SVARA products' : layers[active].kind === 'io' ? 'Connects to' : 'Core technology' }}</p>
            <div class="st2__detail-items">
              <span v-for="it in layers[active].items" :key="it" class="st2__chip">{{ it }}</span>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </TechnologySection>
</template>

<style scoped>
/* interactive stack — inside the shared .tsec__viz instrument surface (single
   column so it fits the panel, like the other instrument visuals) */
.st2__body { display: flex; flex-direction: column; gap: 20px; align-items: stretch; }

.st2__stack { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
.st2__layer {
  position: relative; width: 100%; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 14px;
  padding: 14px 18px; border: 1px solid rgba(20,34,63,0.12); background: linear-gradient(158deg, rgba(255,255,255,0.5), rgba(255,255,255,0.3));
  cursor: pointer; text-align: left; color: var(--ink-secondary);
  clip-path: polygon(0 8px, 8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%);
  transition: transform var(--motion-medium) var(--ease-out), border-color var(--motion-fast) var(--ease-smooth), background var(--motion-fast) var(--ease-smooth);
}
.st2__layer-n { font-size: 10px; letter-spacing: 0.12em; color: var(--ink-muted); }
.st2__layer-name { font-size: clamp(15px, 1.5vw, 19px); font-weight: 600; letter-spacing: -0.01em; color: var(--ink-primary); }
.st2__layer-kind { color: var(--ink-muted); }
.st2__layer--product .st2__layer-kind { color: var(--sig); }
.st2__layer.is-active { transform: translateX(6px); border-color: rgba(63,111,176,0.5); background: linear-gradient(158deg, rgba(255,255,255,0.75), rgba(63,111,176,0.06)); box-shadow: 0 24px 48px -28px rgba(16,42,91,0.4); }
.st2__layer:focus-visible { outline: 2px solid var(--sig); outline-offset: 2px; }

.st2__detail { padding: 24px 26px; background: linear-gradient(158deg, rgba(255,255,255,0.62), rgba(255,255,255,0.4)); border: 1px solid rgba(20,34,63,0.14); box-shadow: 0 34px 70px -40px rgba(16,42,91,0.34), inset 0 1px 0 rgba(255,255,255,0.7); clip-path: polygon(0 16px, 16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%); min-height: 220px; }
.st2__detail-kicker { display: inline-flex; align-items: center; gap: 8px; color: var(--ink-muted); }
.st2__detail-body { padding-top: 18px; }
.st2__detail-name { margin: 0; font-size: clamp(24px, 3vw, 38px); font-weight: 600; letter-spacing: -0.02em; line-height: 1.05; color: var(--ink-primary); }
.st2__detail-sub { margin: 12px 0 0; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; color: var(--ink-secondary); }
.st2__detail-items { margin-top: 18px; display: flex; flex-wrap: wrap; gap: 9px; }
.st2__chip { font-size: 13px; font-weight: 500; color: var(--ink-primary); padding: 8px 14px; border: 1px solid rgba(20,34,63,0.16); border-radius: var(--radius-pill); background: rgba(255,255,255,0.6); }

.st2-swap-enter-active, .st2-swap-leave-active { transition: opacity var(--motion-medium) var(--ease-out), transform var(--motion-medium) var(--ease-out); }
.st2-swap-enter-from { opacity: 0; transform: translateY(10px); }
.st2-swap-leave-to { opacity: 0; transform: translateY(-6px); }

@media (max-width: 900px) {
  .st2__body { grid-template-columns: 1fr; gap: 24px; }
  .st2__layer.is-active { transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .st2__layer.is-active { transform: none; }
  .st2-swap-enter-active, .st2-swap-leave-active { transition: opacity var(--motion-fast) linear; }
  .st2-swap-enter-from, .st2-swap-leave-to { transform: none; }
}
</style>
