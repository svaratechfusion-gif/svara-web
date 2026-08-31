<script setup lang="ts">
// 11 · FINAL CTA — the SVARA Intelligence Fabric close. Content is verbatim from
// the Content Bible; presentation is the shared Liquid Glass CTA (GlassCta).
import { homeFinalCta } from '~~/lib/content/home'
import GlassCta from '~/components/common/GlassCta.vue'
</script>

<template>
  <GlassCta
    code="SVARA · INTELLIGENCE FABRIC / IX-∞"
    :lead="homeFinalCta.description"
    :primary="{ label: homeFinalCta.primaryCta.label, to: homeFinalCta.primaryCta.to }"
    :secondary="{ label: homeFinalCta.secondaryCta.label, to: homeFinalCta.secondaryCta.to }"
  >
    <template #eyebrow><span class="hx-index">11</span> Get Started</template>
    <template #title>{{ homeFinalCta.title }}.</template>
  </GlassCta>
</template>
