<script setup lang="ts">
// OS · PRODUCT WORLDS — the product exhibition. NOT a tab-switcher of cards: a
// continuous scroll sequence of ten unique editorial compositions (ProductWorld),
// each with its own bespoke animated instrument, converging into the Enterprise
// Brain. Replaces the old OsProducts dashboard switcher.
import { SVARA_OS } from '~/utils/svara-os'
import ProductWorld from '~/components/products/worlds/ProductWorld.vue'
import ProductWordBreak from '~/components/products/worlds/ProductWordBreak.vue'
import EnterpriseBrain from '~/components/products/worlds/EnterpriseBrain.vue'

// One cinematic word flies through the viewport BEFORE each system (Clarix-style
// transitions), themed to the system ahead. Shell decoration only — the dashboards
// are untouched. Falls back to the product's short name if unmapped.
const BREAK_WORDS: Record<string, string> = {
  drone: 'AERIAL', edge: 'EDGE', cognitive: 'COGNITION', agents: 'AUTONOMY',
  twin: 'SIMULATION', aios: 'ORCHESTRATION', cloud: 'UNIFIED', engineering: 'ENGINEERED', growth: 'GROWTH',
}
</script>

<template>
  <div id="os-products" class="ow">
    <header v-reveal class="ow__intro">
      <div class="ow__intro-l">
        <p class="ow__eyebrow sys-label">The Product Exhibition</p>
        <h2 class="ow__title">Ten systems.<br><span class="ow__title-lite">One operating system.</span></h2>
      </div>
      <p class="ow__lead">Each SVARA product is its own intelligence instrument — engineered independently, connected through one core. Scroll to move through the stack; every system converges into the SVARA intelligence layer.</p>
    </header>

    <template v-for="(p, i) in SVARA_OS" :key="p.id">
      <ProductWordBreak v-if="i > 0" :word="BREAK_WORDS[p.id] ?? p.short" :index="p.n" />
      <ProductWorld :product="p" :index="i" />
    </template>

    <EnterpriseBrain />
  </div>
</template>

<style scoped>
.ow { position: relative; }
.ow__intro { max-width: 1240px; margin: 0 auto; padding: clamp(72px, 10vw, 130px) clamp(24px, 6vw, 96px) clamp(24px, 4vw, 48px); display: grid; grid-template-columns: 1fr; gap: 28px; align-items: end; }
@media (min-width: 900px) { .ow__intro { grid-template-columns: 1.3fr 0.7fr; } }
.ow__eyebrow { color: var(--px-blue, #6C87FE); }
.ow__title { margin: 16px 0 0; font-size: clamp(32px, 5.4vw, 68px); line-height: 1.02; letter-spacing: -0.03em; color: var(--px-navy, #10214A); font-weight: 500; text-transform: uppercase; }
.ow__title-lite { color: var(--px-muted, rgba(16, 33, 74, 0.5)); }
.ow__lead { margin: 0; max-width: 46ch; font-size: clamp(14px, 1.4vw, 16px); line-height: 1.6; color: var(--px-ink, #10214A); }
</style>
