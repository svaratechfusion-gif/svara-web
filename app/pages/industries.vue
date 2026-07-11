<script setup lang="ts">
import { ArrowRight } from "@lucide/vue"
import { useStructuredData } from "~/composables/useStructuredData"
import { INDUSTRIES_LIST } from "~/utils/industries"
import { SITE_URL } from "~~/lib/seo/site"

useSeoMeta({
  title: "Industries | SVARA — Enterprise Intelligence Infrastructure",
  description:
    "SVARA serves enterprises across manufacturing, energy, logistics, healthcare, smart cities, and more. The Intelligence Loop transforms operations in every data-heavy industry.",
})

useStructuredData({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SVARA Industries",
  description: "Twelve industries where SVARA delivers enterprise intelligence infrastructure.",
  hasPart: INDUSTRIES_LIST.map((ind) => ({
    "@type": "Thing",
    name: ind.name,
    description: ind.description,
    url: `${SITE_URL}${ind.url}`,
  })),
})
</script>

<template>
  <div class="page-industries">
    <section class="kp-section bg-white">
      <div class="kp-container">
        <span class="kp-number">SVARA</span>
        <h1 class="kp-headline">Industries</h1>
        <p class="kp-definition">
          The Intelligence Loop applies to every industry where operational data outpaces human interpretation. SVARA serves twelve industries, each with unique operational challenges and measurable outcomes.
        </p>
      </div>
    </section>

    <section class="kp-section bg-gray-50">
      <div class="kp-container">
        <div v-for="ind in INDUSTRIES_LIST" :key="ind.name" class="kp-card mb-4">
          <h2 class="kp-card-title">{{ ind.name }}</h2>
          <p class="kp-card-body">{{ ind.description }}</p>
          <NuxtLink :to="ind.url" class="kp-link mt-3">
            Explore {{ ind.name }} <ArrowRight :size="14" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-industries {
  --kp-max-w: 48rem;
}
.kp-section {
  padding: 6rem 1.5rem;
}
.kp-container {
  max-width: var(--kp-max-w);
  margin: 0 auto;
}
.kp-number {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
  display: block;
  margin-bottom: 0.5rem;
}
.kp-headline {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
}
.kp-definition {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-muted);
  max-width: 42rem;
}
.kp-card {
  background: var(--color-card);
  border: 1px solid var(--color-divider);
  border-radius: 0.75rem;
  padding: 1.5rem;
}
.kp-card-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}
.kp-card-body {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-muted);
}
.kp-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-accent);
  text-decoration: none;
}
.kp-link:hover {
  text-decoration: underline;
}
</style>
