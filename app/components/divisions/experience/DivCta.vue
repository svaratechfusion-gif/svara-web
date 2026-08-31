<script setup lang="ts">
// 20 · FINAL CTA — the divisions page close. Content verbatim; presentation is
// the shared Liquid Glass CTA.
import GlassCta from '~/components/common/GlassCta.vue'
const productsTo = '/products'
</script>

<template>
  <GlassCta
    code="SVARA · UNIFIED TECHNOLOGY COMPANY"
    lead="From artificial intelligence and simulation to enterprise software, engineering infrastructure and digital growth — SVARA brings specialized capabilities together to build what comes next."
    :primary="{ label: 'Build with SVARA', to: '/contact' }"
    :secondary="{ label: 'Explore our products', to: productsTo }"
  >
    <template #eyebrow><span class="hx-index">20</span> Build With SVARA</template>
    <template #title>One partner.<br>Every layer of<br><span class="lite">transformation.</span></template>
  </GlassCta>
</template>
