<script setup lang="ts">
useSeoMeta({
  title: "SVARA TechFusion — Knowledge",
  description:
    "SVARA's knowledge hub. FAQ, glossary, case studies, and documentation for enterprise intelligence infrastructure. Optimized for search, generative AI, and LLM consumption.",
});
</script>

<template>
  <div class="page-knowledge">
    <section class="section-hero">
      <h1 class="text-hero">Knowledge</h1>
      <p class="text-body mt-6 max-w-2xl">
        Learn. Understand. Apply.
      </p>
    </section>

    <section class="section-content">
      <div class="grid max-w-4xl gap-6 sm:grid-cols-2">
        <NuxtLink to="/knowledge/faq" class="card-glass block">
          <h3 class="text-h3">FAQ</h3>
          <p class="text-caption mt-2" style="color: var(--color-muted)">
            Answers to common questions about SVARA's platform, products, and technology.
          </p>
        </NuxtLink>
        <NuxtLink to="/knowledge/glossary" class="card-glass block">
          <h3 class="text-h3">Glossary</h3>
          <p class="text-caption mt-2" style="color: var(--color-muted)">
            Definitions of every term SVARA uses, cross-linked and LLM-optimized.
          </p>
        </NuxtLink>
        <NuxtLink to="/case-studies" class="card-glass block">
          <h3 class="text-h3">Case Studies</h3>
          <p class="text-caption mt-2" style="color: var(--color-muted)">
            Real outcomes from enterprise intelligence infrastructure deployments.
          </p>
        </NuxtLink>
        <NuxtLink to="/technology" class="card-glass block">
          <h3 class="text-h3">Documentation</h3>
          <p class="text-caption mt-2" style="color: var(--color-muted)">
            Architecture references, SDK docs, and API guides.
          </p>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
