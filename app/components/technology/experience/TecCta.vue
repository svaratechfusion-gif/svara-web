<script setup lang="ts">
// 17 · ENGINEER THE FUTURE — the technology page close. Content verbatim;
// presentation is the shared Liquid Glass CTA.
import GlassCta from '~/components/common/GlassCta.vue'
const ecoTo = '/ecosystem'
</script>

<template>
  <GlassCta
    code="SVARA · INTELLIGENCE ARCHITECTURE"
    lead="From perception at the edge to reasoning, simulation and autonomous action, SVARA engineers intelligence across the complete enterprise technology stack."
    :primary="{ label: 'Build with SVARA', to: '/contact' }"
    :secondary="{ label: 'Explore the ecosystem', to: ecoTo }"
  >
    <template #eyebrow><span class="hx-index">17</span> Engineer the Future</template>
    <template #title>Build intelligence<br><span class="lite">into your operations.</span></template>
  </GlassCta>
</template>
