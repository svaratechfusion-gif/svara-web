<script setup lang="ts">
// Homepage narrative — one story in ten beats.
// 01 Hero · 02 Problem · 03 Solution · 04 Ecosystem · 05 Products
// 06 Architecture · 07 Technology · 08 Industries · 09 Trust · 10 CTA
import HeroSection from '~/components/home/HeroSection.vue'
import ProblemSection from '~/components/home/ProblemSection.vue'
import SolutionSection from '~/components/home/SolutionSection.vue'
import EcosystemSection from '~/components/home/EcosystemSection.vue'
import ProductsSection from '~/components/home/ProductsSection.vue'
import ArchitectureSection from '~/components/home/ArchitectureSection.vue'
import TechnologySection from '~/components/home/TechnologySection.vue'
import IndustriesSection from '~/components/home/IndustriesSection.vue'
import TrustSection from '~/components/home/TrustSection.vue'
import CtaSection from '~/components/home/CtaSection.vue'
import { usePageSeo } from '~/composables/usePageSeo'

usePageSeo({
  title: 'Enterprise Intelligence Infrastructure',
  description: 'SVARA engineers the intelligence layer for modern industry — AI-native infrastructure connecting vision, automation, simulation, and intelligence into one unified platform.',
})
useHead({ title: 'Enterprise Intelligence for Modern Industry' })
</script>

<template>
  <div>
    <HeroSection />
    <ProblemSection />
    <SolutionSection />
    <EcosystemSection />
    <ProductsSection />
    <ArchitectureSection />
    <TechnologySection />
    <IndustriesSection />
    <TrustSection />
    <CtaSection />
  </div>
</template>
