<script setup lang="ts">
// ONE PORTFOLIO — large storytelling typography with a progressive reveal:
//   One Portfolio → Ten Platforms → One Ecosystem → Unlimited Possibilities
// Each line rises into view as the reader scrolls, mapping the SVARA
// hierarchy described in the Content Bible (one ecosystem, ten enterprise
// platforms). Motion represents the unfolding of the portfolio, not decor.
import { onMounted, ref } from 'vue'
import { gsap, ScrollTrigger  } from '~~/lib/gsap'

const root = ref<HTMLElement>()

const LINES = ['One Portfolio', 'Ten Platforms', 'One Ecosystem', 'Unlimited Possibilities']

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const q = gsap.utils.selector(root.value!)
  gsap.set(q('.op-line > span'), { yPercent: 110 })
  ScrollTrigger.create({
    trigger: root.value!,
    start: 'top 70%',
    once: true,
    onEnter: () => {
      gsap.to(q('.op-line > span'), {
        yPercent: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.22,
      })
    },
  })
})
</script>

<template>
  <section ref="root" class="op">
    <div class="op__inner">
      <p class="op__label">The Portfolio</p>
      <h2 class="op__headline">
        <span v-for="l in LINES" :key="l" class="op-line"><span>{{ l }}</span></span>
      </h2>
    </div>
  </section>
</template>

<style scoped>
.op {
  background: #F8FBFF;
  padding: var(--space-40) var(--container-pad);
  display: flex;
  justify-content: center;
}
.op__inner { text-align: center; max-width: 1100px; }
.op__label {
  margin: 0 0 var(--space-8);
  font-family: var(--font-mono);
  font-size: var(--type-label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-accent);
}
.op__headline {
  margin: 0;
  font-size: clamp(52px, 9vw, 140px);
  font-weight: var(--weight-extrabold);
  line-height: 1.0;
  letter-spacing: -0.04em;
  color: var(--color-ink-strong);
}
.op-line {
  display: block;
  overflow: hidden;
  padding-bottom: 0.08em;
  margin-bottom: -0.08em;
}
.op-line > span { display: block; }
.op-line:nth-child(even) { color: var(--color-accent); }
@media (prefers-reduced-motion: reduce) {
  .op-line > span { transform: none !important; }
}
</style>