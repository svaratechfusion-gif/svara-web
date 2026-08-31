<script setup lang="ts">
// ECOSYSTEM · Industries — a dotted map field where industry nodes illuminate
// as the user scrolls, their connections animating back into the central
// intelligence network. Copy verbatim from the Content Bible (homeSection05
// + homeIndustries).
import { onMounted, ref } from 'vue'
import { gsap, ScrollTrigger } from '~~/lib/gsap'
import { homeSection05, homeIndustries } from '~~/lib/content/home'

// scattered map placements (deterministic) for a curated set of industries
const PLACES: [number, number][] = [
  [13, 32], [29, 20], [45, 30], [63, 21], [80, 30], [89, 50],
  [73, 63], [57, 72], [40, 65], [24, 58], [12, 66], [67, 45],
  [34, 46], [50, 68], [86, 68],
]
const HUB = { x: 50, y: 46 }
const nodes = homeIndustries.slice(0, PLACES.length).map((ind, i) => {
  const [x, y] = PLACES[i]!
  return { ...ind, x, y, path: `M${x} ${y} L${HUB.x} ${HUB.y}`, i }
})

const root = ref<HTMLElement>()
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const q = gsap.utils.selector(root.value!)
  gsap.set(q('.eind__node'), { opacity: 0.28 })
  gsap.set(q('.eind__link'), { opacity: 0 })
  ScrollTrigger.create({
    trigger: q('.eind__map')[0], start: 'top 78%', end: 'bottom 55%', scrub: 0.6,
    onUpdate: (self) => {
      const els = q('.eind__node'); const links = q('.eind__link')
      const n = els.length
      els.forEach((el, idx) => {
        const local = Math.min(1, Math.max(0, self.progress * n - idx))
        gsap.set(el, { opacity: 0.28 + local * 0.72 })
        if (links[idx]) gsap.set(links[idx]!, { opacity: local * 0.5 })
      })
    },
  })
})
</script>

<template>
  <section ref="root" class="eind">
    <div class="eind__head">
      <p v-reveal class="eind__eyebrow">Industries</p>
      <h2 v-reveal class="eind__title" data-split>{{ homeSection05.title }}</h2>
      <p v-reveal class="eind__sub">{{ homeSection05.intro }}</p>
    </div>

    <div v-reveal class="eind__map">
      <svg class="eind__wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line v-for="n in nodes" :key="`l${n.i}`" class="eind__link" :x1.attr="n.x" :y1.attr="n.y" :x2.attr="HUB.x" :y2.attr="HUB.y" />
      </svg>
      <div class="eind__hub" :style="{ left: HUB.x + '%', top: HUB.y + '%' }" aria-hidden="true">Intelligence Network</div>
      <NuxtLink
        v-for="n in nodes" :key="n.name" :to="n.to"
        class="eind__node" :style="{ left: n.x + '%', top: n.y + '%' }"
      ><span class="eind__node-dot" />{{ n.name }}</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.eind { padding-block: var(--section-y); }
.eind__head { max-width: var(--container-max); margin-inline: auto; padding-inline: var(--container-pad); text-align: center; box-sizing: border-box; }
.eind__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.eind__title { margin: 0; font-size: clamp(28px, 3.4vw, 48px); font-weight: var(--weight-bold); letter-spacing: -0.02em; color: #0d1b3e; }
.eind__sub { margin: var(--space-6) auto 0; max-width: 660px; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.eind__map {
  position: relative; max-width: 1200px; margin: var(--space-20) auto 0;
  aspect-ratio: 2 / 1; border-radius: var(--radius-lg);
  /* faint dotted field */
  background-image: radial-gradient(rgba(16, 42, 91, 0.14) 1px, transparent 1.4px);
  background-size: 18px 18px;
  border: 1px solid var(--color-border);
}
.eind__wires { position: absolute; inset: 0; width: 100%; height: 100%; }
.eind__link { stroke: var(--color-accent); stroke-width: 1; vector-effect: non-scaling-stroke; }
.eind__node {
  position: absolute; transform: translate(-50%, -50%);
  display: inline-flex; align-items: center; gap: 7px;
  padding: 6px 12px; border-radius: var(--radius-pill);
  background: var(--color-bg); border: 1px solid var(--color-border); box-shadow: var(--shadow-soft);
  font-size: 12px; font-weight: var(--weight-medium); color: #0d1b3e; text-decoration: none; white-space: nowrap;
  transition: border-color var(--motion-fast) var(--ease-smooth), color var(--motion-fast) var(--ease-smooth);
}
.eind__node-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--color-accent); }
.eind__node:hover { border-color: var(--color-accent); color: var(--color-accent); }
.eind__node:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
.eind__hub {
  position: absolute; transform: translate(-50%, -50%); z-index: 1;
  padding: 10px 16px; border-radius: var(--radius-pill);
  background: #102A5B; color: #fff; font-size: 12px; font-weight: var(--weight-semibold); white-space: nowrap;
  box-shadow: 0 14px 36px rgba(16, 42, 91, 0.26);
}
@media (max-width: 720px) {
  .eind__map { aspect-ratio: 1 / 1.2; }
  .eind__node { font-size: 10px; padding: 5px 9px; }
}
</style>
