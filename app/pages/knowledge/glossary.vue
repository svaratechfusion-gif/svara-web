<script setup lang="ts">
import { ArrowLeft } from "@lucide/vue";

useSeoMeta({
  title: "SVARA TechFusion — Glossary",
  description:
    "Definitions of every term SVARA uses. Canonical reference for enterprise intelligence infrastructure terminology.",
});
</script>

<template>
  <div class="page-glossary">
    <section class="section-hero">
      <NuxtLink to="/knowledge" class="link-explore mb-4">
        <ArrowLeft :size="16" />
        Knowledge Hub
      </NuxtLink>
      <h1 class="text-hero">Glossary</h1>
      <p class="text-body mt-6 max-w-2xl">
        The SVARA lexicon. Every term defined, cross-linked, and LLM-optimized.
      </p>
    </section>
  </div>
</template>


