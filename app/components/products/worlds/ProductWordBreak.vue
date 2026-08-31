<script setup lang="ts">
// PRODUCT WORD BREAK — a Clarix-style cinematic transition between two product
// systems. A single large word flies through the viewport in perspective (enter
// from depth → clear centre → exit with momentum), blurring only while moving.
// Pure shell layer: it never overlaps or touches the dashboards. Scroll-scrubbed
// via the shared GSAP ScrollTrigger; static + legible under reduced motion.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap, ScrollTrigger } from '~~/lib/gsap'

const props = defineProps<{ word: string, index: string }>()
const root = ref<HTMLElement | null>(null)
const chars = [...props.word]
let ctx: ReturnType<typeof gsap.context> | null = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !root.value) return
  ctx = gsap.context(() => {
    const letters = root.value!.querySelectorAll<HTMLElement>('.pwb__char')
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root.value!, start: 'top bottom', end: 'bottom top', scrub: 0.85 },
    })
    tl.fromTo(letters,
      { xPercent: 68, z: -720, rotateY: 42, '--b': 22, opacity: 0 },
      { xPercent: 0, z: 0, rotateY: 0, '--b': 0, opacity: 1, ease: 'power2.out', stagger: 0.035, duration: 1 })
      .to(letters,
        { xPercent: -68, z: -720, rotateY: -42, '--b': 22, opacity: 0, ease: 'power2.in', stagger: 0.035, duration: 1 })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="pwb" aria-hidden="true">
    <span class="pwb__idx">{{ index }}</span>
    <div class="pwb__stage">
      <div class="pwb__word">
        <span v-for="(c, i) in chars" :key="i" class="pwb__char">{{ c }}</span>
      </div>
    </div>
    <span class="pwb__rule" />
  </section>
</template>

<style scoped>
.pwb {
  position: relative;
  height: 62vh; min-height: 380px;
  display: grid; place-items: center;
  perspective: 1500px;
  overflow: hidden;
}
.pwb__stage { transform-style: preserve-3d; }
.pwb__word {
  margin: 0; white-space: nowrap;
  font-family: var(--font-sans, system-ui, sans-serif);
  font-weight: 200; letter-spacing: -0.03em; line-height: 1;
  font-size: clamp(3rem, 16vw, 15rem);
  color: var(--px-navy, #10214A);
}
.pwb__char { display: inline-block; will-change: transform, opacity, filter; filter: blur(calc(var(--b, 0) * 1px)); }
/* reduced-motion / no-JS: the word simply reads, centred and calm */
@media (prefers-reduced-motion: reduce) { .pwb__char { opacity: 0.14; filter: none; } }

.pwb__idx {
  position: absolute; top: clamp(20px, 5vh, 48px); left: clamp(24px, 6vw, 96px);
  font-family: var(--font-mono, monospace); font-size: 11px; letter-spacing: 0.32em;
  color: var(--px-blue, #6C87FE); opacity: 0.7;
}
.pwb__rule { position: absolute; bottom: 0; left: clamp(24px, 6vw, 96px); right: clamp(24px, 6vw, 96px); height: 1px; background: linear-gradient(90deg, transparent, rgba(16, 33, 74, 0.12) 20%, rgba(16, 33, 74, 0.12) 80%, transparent); }
</style>
