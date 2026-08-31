<script setup lang="ts">
// 24 · DESIGN FOR INTELLIGENCE — the architecture page close. Content verbatim;
// presentation is the shared Liquid Glass CTA.
import GlassCta from '~/components/common/GlassCta.vue'
const techTo = '/technology'
</script>

<template>
  <GlassCta
    code="SVARA · SYSTEM ARCHITECTURE"
    lead="From edge environments and enterprise data to AI models, agents, simulations and applications, SVARA brings every layer together through one connected architecture."
    :primary="{ label: 'Build with SVARA', to: '/contact' }"
    :secondary="{ label: 'Explore technology', to: techTo }"
  >
    <template #eyebrow><span class="hx-index">24</span> Design for Intelligence</template>
    <template #title>Architect the next<br><span class="lite">intelligent system.</span></template>
  </GlassCta>
</template>
