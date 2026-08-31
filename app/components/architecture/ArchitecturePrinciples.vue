<script setup lang="ts">
// ARCHITECTURE PRINCIPLES — large editorial typography. Eight principles:
// AI Native, Cloud Native, API First, Secure, Scalable, Modular,
// Observable, Future Ready. Animate each principle rising into view as it
// enters the viewport — typography as architecture.
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap, ScrollTrigger } from '~~/lib/gsap'
import { PRINCIPLES } from '~/utils/architecture'

const root = ref<HTMLElement>()
const triggers: ScrollTrigger[] = []

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const items = root.value!.querySelectorAll<HTMLElement>('.ap-item')
  items.forEach((item) => {
    gsap.set(item, { opacity: 0, y: 40 })
    triggers.push(ScrollTrigger.create({
      trigger: item, start: 'top 80%', once: true,
      onEnter: () => gsap.to(item, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }),
    }))
  })
})
onBeforeUnmount(() => { triggers.forEach(t => t.kill()) })
</script>

<template>
  <section ref="root" class="ap">
    <div class="ap__head">
      <p class="ap__eyebrow">Architecture Principles</p>
      <h2 class="ap__title">Eight principles. One blueprint.</h2>
    </div>

    <ol class="ap__list" role="list">
      <li v-for="(p, i) in PRINCIPLES" :key="p" class="ap-item">
        <span class="ap-item__num">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="ap-item__name">{{ p }}</span>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.ap { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.ap__head { max-width: 760px; margin: 0 auto var(--space-20); text-align: center; }
.ap__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.ap__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }

.ap__list { list-style: none; margin: var(--space-16) auto 0; padding: 0; max-width: 1000px; display: flex; flex-direction: column; }
.ap-item { display: flex; align-items: baseline; gap: var(--space-6); padding: var(--space-8) 0; border-top: 1px solid rgba(16, 42, 91, 0.1); }
.ap-item:last-child { border-bottom: 1px solid rgba(16, 42, 91, 0.1); }
.ap-item__num { font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: 0.1em; color: var(--color-text-faint); width: 32px; flex-shrink: 0; }
.ap-item__name { font-size: clamp(32px, 6vw, 88px); font-weight: var(--weight-extrabold); letter-spacing: -0.03em; line-height: 1; color: var(--color-ink-strong); }
.ap-item:nth-child(even) .ap-item__name { color: var(--color-accent); }
</style>