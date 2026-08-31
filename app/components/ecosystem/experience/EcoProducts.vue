<script setup lang="ts">
// 07 · PRODUCT ECOSYSTEM — eight specialised platforms as one interconnected
// map wired by architectural pathways. Hovering a module brings it forward,
// reveals its description, illuminates connected modules + their pathways and
// dims the rest — demonstrating interoperability, not a card grid.
import { ref, computed } from 'vue'
interface Product { name: string, desc: string, to: string, x: number, y: number }
// x in [0,100], y in [0,60] — shared by the DOM modules and the SVG pathways
const products: Product[] = [
  { name: 'Vision AI', desc: 'Cameras into structured operational intelligence.', to: '/products/vision-ai', x: 13, y: 9 },
  { name: 'Drone AI', desc: 'Autonomous aerial inspection and coverage.', to: '/products/drone-ai', x: 13, y: 30 },
  { name: 'Edge AI', desc: 'Low-latency inference at the point of action.', to: '/products/edge-ai', x: 13, y: 51 },
  { name: 'Generative AI', desc: 'Knowledge, reasoning and enterprise productivity.', to: '/products', x: 87, y: 9 },
  { name: 'AI Agents', desc: 'Digital workers that decide and execute.', to: '/products/ai-agents', x: 87, y: 30 },
  { name: 'Digital Twin', desc: 'Live simulation of the physical operation.', to: '/products/digital-twin', x: 87, y: 51 },
  { name: 'AI OS', desc: 'The orchestration layer over everything.', to: '/products/ai-os', x: 50, y: 26 },
  { name: 'Business Cloud', desc: 'Every business function, intelligently connected.', to: '/products/business-cloud', x: 50, y: 52 },
]
const links: [number, number][] = [
  [0, 2], [1, 2], [2, 6], [6, 3], [6, 4], [6, 5], [6, 7], [0, 4], [3, 4], [4, 7], [0, 5], [1, 6],
]
const active = ref(-1)
const linked = computed(() => {
  const s = new Set<number>()
  if (active.value < 0) return s
  for (const [a, b] of links) {
    if (a === active.value) s.add(b)
    if (b === active.value) s.add(a)
  }
  return s
})
function cls(i: number) {
  if (active.value < 0) return ''
  if (active.value === i) return 'is-active'
  if (linked.value.has(i)) return 'is-linked'
  return 'is-dim'
}
function pathCls(a: number, b: number) {
  if (active.value < 0) return ''
  return (active.value === a || active.value === b) ? 'is-hot' : 'is-dim'
}
</script>

<template>
  <section class="pmap hx-section">
    <div class="hx-container">
      <header class="pmap__head">
        <p class="hx-eyebrow"><span class="hx-index">07</span> Product Ecosystem</p>
        <h2 class="hx-title">Specialised intelligence. <span class="lite">Engineered to work as one.</span></h2>
      </header>

      <div class="pmap__field" :class="{ 'is-engaged': active >= 0 }">
        <ClientOnly>
          <svg class="pmap__wires" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
            <path
              v-for="([a, b], i) in links" :key="i"
              class="pmap__wire" :class="pathCls(a, b)"
              :d="`M${products[a].x} ${products[a].y} L${products[b].x} ${products[b].y}`"
              vector-effect="non-scaling-stroke"
            />
          </svg>
        </ClientOnly>

        <NuxtLink
          v-for="(p, i) in products" :key="p.name"
          :to="p.to"
          class="pmap__mod" :class="cls(i)"
          :style="{ left: `${p.x}%`, top: `${(p.y / 60) * 100}%` }"
          @mouseenter="active = i" @focus="active = i" @mouseleave="active = -1" @blur="active = -1"
        >
          <span class="pmap__jack" />
          <span class="pmap__idx hx-mono">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="pmap__name">{{ p.name }}</span>
          <span class="pmap__desc">{{ p.desc }}</span>
        </NuxtLink>
      </div>
      <p class="pmap__hint hx-mono-label"><span class="hx-dot" /> Hover a module to trace its intelligence pathways</p>
    </div>
  </section>
</template>

<style scoped>
.pmap__head { max-width: 60ch; margin-bottom: clamp(40px, 5vw, 72px); }
.pmap__field { position: relative; width: 100%; aspect-ratio: 100 / 60; }
.pmap__wires { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.pmap__wire { stroke: rgba(20,34,63,0.14); stroke-width: 1; fill: none; transition: stroke var(--motion-medium) var(--ease-smooth), opacity var(--motion-medium) var(--ease-smooth); }
.pmap__wire.is-hot { stroke: var(--sig); stroke-width: 1.6; }
.pmap__wire.is-dim { opacity: 0.25; }

.pmap__mod {
  position: absolute; transform: translate(-50%, -50%); z-index: 2;
  width: clamp(158px, 14vw, 200px); padding: 14px 16px 15px;
  background: linear-gradient(158deg, rgba(255,255,255,0.72), rgba(255,255,255,0.42));
  backdrop-filter: blur(16px);
  border: 1px solid rgba(20,34,63,0.14);
  box-shadow: 0 22px 46px -28px rgba(16,42,91,0.32), inset 0 1px 0 rgba(255,255,255,0.7);
  clip-path: polygon(0 12px, 12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%);
  transition: transform var(--motion-medium) var(--ease-out), box-shadow var(--motion-medium) var(--ease-out), border-color var(--motion-fast) var(--ease-smooth), opacity var(--motion-medium) var(--ease-smooth);
}
.pmap__jack { position: absolute; top: -5px; left: 16px; width: 9px; height: 9px; border-radius: 50%; background: #fff; border: 1px solid rgba(20,34,63,0.28); }
.pmap__idx { position: absolute; top: 13px; right: 15px; font-size: 10px; color: var(--ink-muted); }
.pmap__name { display: block; font-size: 15px; font-weight: 600; letter-spacing: -0.01em; color: var(--ink-primary); }
.pmap__desc { display: block; max-height: 0; margin-top: 0; overflow: hidden; opacity: 0; font-size: 11.5px; line-height: 1.4; color: var(--ink-secondary); transition: max-height var(--motion-medium) var(--ease-out), opacity var(--motion-medium) var(--ease-out), margin-top var(--motion-medium) var(--ease-out); }

.pmap__mod.is-active { transform: translate(-50%, calc(-50% - 4px)); z-index: 3; border-color: rgba(63,111,176,0.55); box-shadow: 0 34px 64px -26px rgba(16,42,91,0.46); }
.pmap__mod.is-active .pmap__desc { max-height: 60px; opacity: 1; margin-top: 8px; }
.pmap__mod.is-linked { border-color: rgba(63,111,176,0.4); box-shadow: 0 26px 52px -26px rgba(16,42,91,0.4); }
.pmap__mod.is-linked .pmap__jack { background: var(--sig-soft); }
.pmap__mod.is-dim { opacity: 0.4; }
.pmap__mod:focus-visible { outline: 2px solid var(--sig); outline-offset: 3px; }

.pmap__hint { display: inline-flex; align-items: center; gap: 8px; margin-top: 28px; color: var(--ink-muted); }

@media (max-width: 900px) {
  .pmap__field { aspect-ratio: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .pmap__wires { display: none; }
  .pmap__mod { position: static; transform: none; width: auto; }
  .pmap__mod.is-active { transform: none; }
  .pmap__desc, .pmap__mod.is-active .pmap__desc { max-height: none; opacity: 1; margin-top: 8px; }
  .pmap__mod.is-dim { opacity: 1; }
}
</style>
