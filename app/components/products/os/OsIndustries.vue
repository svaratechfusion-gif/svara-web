<script setup lang="ts">
// OS · INDUSTRY APPLICATIONS — target markets & their entry products (Chapter 07).
import { OS_INDUSTRIES } from '~/utils/svara-os'
</script>

<template>
  <section class="oi">
    <div class="oi__inner">
      <header v-reveal class="oi__head">
        <p class="oi__eyebrow px-mono">Industry Applications</p>
        <h2 class="oi__title">Purpose-built intelligence for <span class="px-serif">every enterprise.</span></h2>
        <p class="oi__lead">SVARA delivers an intelligence ecosystem tailored to each segment — starting with the right entry product and expanding into a fully connected enterprise platform through a land-and-expand adoption model.</p>
      </header>
      <ul class="oi__grid">
        <li v-for="(ind, i) in OS_INDUSTRIES" :key="ind.name" v-reveal="{ delay: (i % 4) * 0.05 }" class="oi__cell sys-corners">
          <span class="oi__cell-n hx-mono">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="oi__cell-name">{{ ind.name }}</span>
          <span class="oi__cell-entry">{{ ind.entry }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.oi { padding: clamp(64px, 9vw, 110px) 24px; }
.oi__inner { max-width: 1140px; margin: 0 auto; }
.oi__head { max-width: 58ch; margin-bottom: 40px; }
.oi__eyebrow { margin: 0 0 14px; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--px-muted); }
.oi__title { margin: 0; font-size: clamp(28px, 4vw, 46px); line-height: 1.06; letter-spacing: -0.025em; color: var(--px-navy); font-weight: 500; }
.oi__title .px-serif { font-weight: 400; }
.oi__lead { margin: 18px 0 0; max-width: 58ch; font-size: clamp(15px, 1.4vw, 17px); line-height: 1.6; color: var(--px-ink); }
.oi__grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr; gap: 14px; }
@media (min-width: 560px) { .oi__grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 960px) { .oi__grid { grid-template-columns: repeat(4, 1fr); } }
.oi__cell { --sys-mark: rgba(16,33,74,0.24); display: flex; flex-direction: column; gap: 8px; padding: 22px 20px; border-radius: 2px; background: #fff; border: 1px solid var(--px-line); transition: transform 0.25s, box-shadow 0.25s; }
.oi__cell:hover { transform: translateY(-3px); box-shadow: 0 12px 30px -16px rgba(16,33,74,0.3); }
.oi__cell-n { font-size: 11px; color: var(--px-blue); }
.oi__cell-name { font-size: 16px; font-weight: 600; letter-spacing: -0.01em; color: var(--px-navy); }
.oi__cell-entry { font-size: 12.5px; line-height: 1.45; color: var(--px-muted); }
</style>
