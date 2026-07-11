<script setup lang="ts">
import HeroSection from '~/components/home/HeroSection.vue'
import TrustBar from '~/components/home/TrustBar.vue'
import WhoSection from '~/components/home/WhoSection.vue'
import PlatformSection from '~/components/home/PlatformSection.vue'
import ProductsSection from '~/components/home/ProductsSection.vue'
import IndustriesSection from '~/components/home/IndustriesSection.vue'
import TechnologySection from '~/components/home/TechnologySection.vue'
import MetricsSection from '~/components/home/MetricsSection.vue'
import AboutSection from '~/components/home/AboutSection.vue'
import CtaSection from '~/components/home/CtaSection.vue'
import { usePageSeo } from '~/composables/usePageSeo'

usePageSeo({
  title: 'Enterprise Intelligence Infrastructure',
  description: 'SVARA engineers the intelligence layer for modern industry — AI-native infrastructure connecting vision, automation, simulation, and intelligence into one unified platform.',
})
// homepage: single clean brand title (avoids the double-brand template)
useHead({ title: 'Enterprise Intelligence for Modern Industry' })
</script>

<template>
  <div>
    <HeroSection />
    <TrustBar />
    <WhoSection />
    <PlatformSection />
    <ProductsSection />
    <IndustriesSection />
    <TechnologySection />
    <MetricsSection />
    <AboutSection />
    <CtaSection />
  </div>
</template>
