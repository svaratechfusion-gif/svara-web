<script setup lang="ts">
import { ArrowLeft } from "@lucide/vue";

useSeoMeta({
  title: "SVARA TechFusion — FAQ",
  description:
    "Frequently asked questions about SVARA's enterprise intelligence infrastructure platform, products, and technology.",
});
</script>

<template>
  <div class="page-faq">
    <section class="section-hero">
      <NuxtLink to="/knowledge" class="link-explore mb-4">
        <ArrowLeft :size="16" />
        Knowledge Hub
      </NuxtLink>
      <h1 class="text-hero">FAQ</h1>
      <p class="text-body mt-6 max-w-2xl">
        Common questions about enterprise intelligence infrastructure.
      </p>
    </section>
  </div>
</template>


