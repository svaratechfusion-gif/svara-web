<script setup lang="ts">
import { INDUSTRIES } from "~/utils/industries";
import { ArrowRight } from "@lucide/vue";

useSeoMeta({
  title: "SVARA TechFusion — Industries",
  description:
    "SVARA serves manufacturing, smart cities, agriculture, healthcare, retail, and logistics with enterprise intelligence infrastructure tailored to each industry's operational data.",
});
</script>

<template>
  <div class="page-industries">
    <section class="section-hero">
      <h1 class="text-hero">Industries</h1>
      <p class="text-body mt-6 max-w-2xl">
        Intelligence infrastructure, adapted to how your industry operates.
      </p>
    </section>

    <section class="section-content">
      <div v-for="industry in INDUSTRIES" :key="industry.name" class="card-glass mb-6 max-w-3xl">
        <h3 class="text-h3">{{ industry.name }}</h3>
        <p class="text-body mt-2">{{ industry.copy }}</p>
        <NuxtLink :to="`/industries/${industry.name.toLowerCase().replace(/\s+/g, '-')}`" class="link-explore mt-4">
          Explore {{ industry.name }}
          <ArrowRight :size="16" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>


