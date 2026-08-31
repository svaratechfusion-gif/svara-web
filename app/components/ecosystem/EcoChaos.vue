<script setup lang="ts">
// ECOSYSTEM · Enterprise Chaos — disconnected systems (grey, scattered) that
// scroll progressively connects into one intelligence network. Copy verbatim
// from the Content Bible (homeSection01). Scroll-scrubbed with ScrollTrigger:
// as the section passes, broken links resolve into navy connections and a
// central intelligence core resolves in.
import { onMounted, ref } from 'vue'
import { gsap, ScrollTrigger } from '~~/lib/gsap'
import { homeSection01 } from '~~/lib/content/home'

// the disconnected enterprise systems (as directed)
const systems = ['ERP', 'CRM', 'Cameras', 'IoT', 'APIs', 'Documents', 'Machines']
const CENTER = { x: 50, y: 50 }
const nodes = systems.map((label, i) => {
  const theta = -Math.PI / 2 + (i / systems.length) * Math.PI * 2
  const x = +(CENTER.x + 38 * Math.cos(theta)).toFixed(2)
  const y = +(CENTER.y + 38 * Math.sin(theta)).toFixed(2)
  return { label, x, y }
})

const root = ref<HTMLElement>()
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const q = gsap.utils.selector(root.value!)
  gsap.set(q('.echaos__link'), { opacity: 0 })
  gsap.set(q('.echaos__core'), { opacity: 0, scale: 0.85 })
  ScrollTrigger.create({
    trigger: q('.echaos__viz')[0],
    start: 'top 78%', end: 'bottom 60%', scrub: 0.6,
    onUpdate: (self) => {
      const p = self.progress
      gsap.set(q('.echaos__link'), { opacity: p })
      gsap.set(q('.echaos__node-dot'), { backgroundColor: gsap.utils.interpolate('#9aa4b5', '#102A5B', p) })
      gsap.set(q('.echaos__node'), { borderColor: gsap.utils.interpolate('#e2e6ee', '#2F7FE6', Math.max(0, (p - 0.4) / 0.6)) })
      gsap.set(q('.echaos__core'), { opacity: Math.max(0, (p - 0.5) / 0.5), scale: 0.85 + Math.max(0, (p - 0.5) / 0.5) * 0.15 })
    },
  })
})
</script>

<template>
  <section ref="root" class="echaos">
    <div class="echaos__inner">
      <div class="echaos__copy">
        <p v-reveal class="echaos__eyebrow">The Problem</p>
        <h2 v-reveal class="echaos__title" data-split>{{ homeSection01.title }}</h2>
        <p v-for="(para, i) in homeSection01.paragraphs" :key="i" v-reveal="{ delay: 0.05 * i }" class="echaos__para">{{ para }}</p>
      </div>

      <div class="echaos__viz" aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <line
            v-for="n in nodes" :key="n.label" class="echaos__link"
            :x1.attr="n.x" :y1.attr="n.y" :x2.attr="CENTER.x" :y2.attr="CENTER.y"
          />
        </svg>
        <div v-for="n in nodes" :key="n.label" class="echaos__node" :style="{ left: n.x + '%', top: n.y + '%' }">
          <span class="echaos__node-dot" />{{ n.label }}
        </div>
        <div class="echaos__core" :style="{ left: CENTER.x + '%', top: CENTER.y + '%' }">Intelligence Layer</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.echaos { padding-block: var(--section-y); }
.echaos__inner {
  max-width: var(--container-max);
  margin-inline: auto; padding-inline: var(--container-pad);
  display: grid; grid-template-columns: 5fr 7fr; gap: var(--gap-section);
  align-items: center; box-sizing: border-box;
}
.echaos__eyebrow {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent);
}
.echaos__title {
  margin: 0 0 var(--space-8);
  font-size: clamp(30px, 3.6vw, 52px);
  font-weight: var(--weight-bold); line-height: 1.12; letter-spacing: -0.02em; color: #0d1b3e;
}
.echaos__para {
  margin: 0 0 var(--space-5); max-width: 52ch;
  font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary);
}
.echaos__viz { position: relative; aspect-ratio: 1 / 1; }
.echaos__viz svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.echaos__link { stroke: var(--color-accent); stroke-width: 1; vector-effect: non-scaling-stroke; }
.echaos__node {
  position: absolute; transform: translate(-50%, -50%);
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 14px; border-radius: var(--radius-pill);
  background: var(--color-bg); border: 1px solid #e2e6ee; box-shadow: var(--shadow-soft);
  font-size: var(--type-caption); font-weight: var(--weight-medium); color: #0d1b3e; white-space: nowrap;
}
.echaos__node-dot { width: 7px; height: 7px; border-radius: 50%; background: #9aa4b5; }
.echaos__core {
  position: absolute; transform: translate(-50%, -50%);
  padding: var(--space-4) var(--space-6); border-radius: var(--radius-lg);
  background: #102A5B; color: #fff;
  font-size: var(--type-small); font-weight: var(--weight-semibold); white-space: nowrap;
  box-shadow: 0 16px 40px rgba(16, 42, 91, 0.24);
}
@media (max-width: 900px) {
  .echaos__inner { grid-template-columns: 1fr; gap: var(--space-16); }
  .echaos__viz { max-width: 460px; margin-inline: auto; width: 100%; }
}
</style>
