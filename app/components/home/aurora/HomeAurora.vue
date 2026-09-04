<script setup lang="ts">
// THE AURORA BEAM — Huly's signature visual, and its strictest rule: "it should
// appear once per page, not repeated", "never as a full background fill".
//
// A narrow vertical streak running Electric Iris → Ember Pulse → white, with the warm
// radial sunburst at its base. Painted in CSS, so it costs nothing and scales cleanly,
// and it sits BEHIND the particle head — the humanoid stays the subject and the
// aurora is the sky it travels through.
//
// IT MOVES WITH THE PAGE. The beam drifts and warms as you scroll: it starts cool and
// narrow behind the hero, widens and slides toward ember through the middle of the
// narrative, and the sunburst rises to meet the close. One ScrollTrigger on the whole
// document, scrubbed, writing two custom properties — no per-frame Vue churn.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from '~~/lib/gsap'

const el = ref<HTMLElement | null>(null)
let st: ScrollTrigger | null = null

onMounted(() => {
  if (!el.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  st = ScrollTrigger.create({
    trigger: '.xp',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress
      const node = el.value
      if (!node) return
      // written as custom properties so the compositor does the work
      node.style.setProperty('--au-p', p.toFixed(4))
      node.style.setProperty('--au-shift', `${(p - 0.5) * 26}vw`)
      node.style.setProperty('--au-width', `${18 + p * 26}vw`)
      node.style.setProperty('--au-tilt', `${(p - 0.5) * 14}deg`)
    },
  })
})
onBeforeUnmount(() => st?.kill())
</script>

<template>
  <div ref="el" class="au-beam" aria-hidden="true">
    <span class="au-beam__streak" />
    <span class="au-beam__burst" />
    <span class="au-beam__grain" />
  </div>
</template>
