<script setup lang="ts">
// ABOUT · Our Mission — the mission reinforced through motion. The mission
// statement is verbatim from Volume 08 (companyContent.architecture.components
// "Company Mission"). The six-step sequence Connect → Observe → Learn → Reason →
// Decide → Improve is the directed structure for this section (not prose from
// Volume 08). A light travels the sequence; hovering a step focuses it.
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { companyContent } from '~~/lib/content/company'

const mission = companyContent.architecture.components.find(c => c.name === 'Company Mission')?.description
  ?? 'To build the intelligence layer for enterprise operations.'

const steps = ['Connect', 'Observe', 'Learn', 'Reason', 'Decide', 'Improve']
const active = ref(0)
let timer: ReturnType<typeof setInterval> | null = null
let paused = false

function tick() { if (!paused) active.value = (active.value + 1) % steps.length }

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(tick, 1500)
})
onBeforeUnmount(() => { if (timer) clearInterval(timer) })

function focus(i: number) { active.value = i; paused = true }
function resume() { paused = false }
</script>

<template>
  <section class="amis">
    <div class="amis__inner">
      <p v-reveal class="amis__eyebrow">Our Mission</p>
      <h2 v-reveal class="amis__statement" data-split>{{ mission }}</h2>

      <ol
        v-reveal class="amis__seq"
        @mouseleave="resume"
      >
        <li
          v-for="(s, i) in steps" :key="s"
          class="amis__node" :class="{ 'is-active': active === i }"
          @mouseenter="focus(i)"
        >
          <span class="amis__dot"><span class="amis__dot-core" /></span>
          <span class="amis__label">{{ s }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.amis { padding-block: var(--section-y); }
.amis__inner { max-width: 1080px; margin-inline: auto; padding-inline: var(--container-pad); box-sizing: border-box; text-align: center; }
.amis__eyebrow { margin: 0 0 var(--space-8); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.amis__statement { margin: 0 auto; max-width: 24ch; font-size: clamp(26px, 3.6vw, 46px); font-weight: var(--weight-bold); line-height: 1.14; letter-spacing: -0.02em; color: #0d1b3e; text-wrap: balance; }

.amis__seq {
  list-style: none; margin: var(--space-20) 0 0; padding: 0;
  display: flex; justify-content: center; align-items: flex-start; gap: 0; flex-wrap: wrap;
  position: relative;
}
.amis__node {
  position: relative; flex: 1 1 0; min-width: 96px; max-width: 180px;
  display: flex; flex-direction: column; align-items: center; gap: var(--space-4);
  cursor: default; padding-top: 4px;
}
/* connector line between nodes */
.amis__node::before {
  content: ''; position: absolute; top: 12px; left: -50%; width: 100%; height: 1.5px;
  background: var(--color-border); z-index: 0;
}
.amis__node:first-child::before { display: none; }
.amis__dot {
  position: relative; z-index: 1; width: 24px; height: 24px; border-radius: 50%;
  display: grid; place-items: center; background: var(--color-bg);
  border: 1.5px solid var(--color-border);
  transition: border-color var(--motion-medium) var(--ease-smooth), transform var(--motion-medium) var(--ease-smooth);
}
.amis__dot-core { width: 8px; height: 8px; border-radius: 50%; background: var(--color-border); transition: background var(--motion-medium) var(--ease-smooth); }
.amis__label { font-size: var(--type-small); font-weight: var(--weight-medium); color: var(--color-text-secondary); transition: color var(--motion-medium) var(--ease-smooth); }
.amis__node.is-active .amis__dot { border-color: var(--color-accent); transform: scale(1.15); }
.amis__node.is-active .amis__dot-core { background: var(--color-accent); }
.amis__node.is-active .amis__label { color: #0d1b3e; font-weight: var(--weight-semibold); }
.amis__node.is-active::before { background: linear-gradient(90deg, var(--color-border), var(--color-accent)); }

@media (max-width: 640px) {
  .amis__seq { flex-direction: column; align-items: flex-start; gap: var(--space-5); max-width: 260px; margin-inline: auto; }
  .amis__node { flex-direction: row; max-width: none; width: 100%; }
  .amis__node::before { top: -50%; left: 12px; width: 1.5px; height: 100%; }
}
</style>
