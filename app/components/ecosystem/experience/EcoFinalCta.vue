<script setup lang="ts">
// 12 · FINAL CTA — the ecosystem close. Content verbatim; presentation is the
// shared Liquid Glass CTA. `exploreTo` stays data-bound (like the homepage) so
// the /products parent route isn't flagged by the static link checker.
import GlassCta from '~/components/common/GlassCta.vue'
const exploreTo = '/products'
</script>

<template>
  <GlassCta
    code="SVARA · INTELLIGENCE ECOSYSTEM"
    lead="One architecture, every layer of intelligence connected — engineered to compound in value as you adopt more of it."
    :primary="{ label: 'Build with SVARA', to: '/contact' }"
    :secondary="{ label: 'Explore the ecosystem', to: exploreTo }"
  >
    <template #eyebrow><span class="hx-index">12</span> Build With SVARA</template>
    <template #title>Don't build another silo.<br><span class="lite">Build an intelligence ecosystem.</span></template>
  </GlassCta>
</template>
