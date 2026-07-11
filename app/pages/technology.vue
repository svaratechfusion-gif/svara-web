<script setup lang="ts">
import { ArrowRight } from "@lucide/vue"
import { useStructuredData } from "~/composables/useStructuredData"
import { SITE_URL } from "~~/lib/seo/site"

const TECHNOLOGIES = [
  { name: "Edge Computing", description: "Distributed computing at the source of data generation for real-time intelligence.", url: "/technologies/edge-computing" },
  { name: "Computer Vision", description: "AI-powered visual interpretation for automated inspection and monitoring.", url: "/technologies/computer-vision" },
  { name: "NLP", description: "Natural language processing for document analysis and conversational interfaces.", url: "/technologies/nlp" },
  { name: "Sensor Fusion", description: "Multi-sensor data integration for complete operational awareness.", url: "/technologies/sensor-fusion" },
  { name: "Swarm Intelligence", description: "Decentralized multi-agent coordination for autonomous device fleets.", url: "/technologies/swarm-intelligence" },
]

useSeoMeta({
  title: "Technology | SVARA — Enterprise Intelligence Infrastructure",
  description:
    "SVARA's technology stack spans edge computing, computer vision, NLP, sensor fusion, and swarm intelligence — the foundations of the Intelligence Loop.",
})

useStructuredData({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SVARA Technologies",
  description: "Five foundational technologies that power the Intelligence Loop.",
  hasPart: TECHNOLOGIES.map((t) => ({
    "@type": "Thing",
    name: t.name,
    description: t.description,
    url: `${SITE_URL}${t.url}`,
  })),
})
</script>

<template>
  <div class="page-technology">
    <section class="kp-section bg-white">
      <div class="kp-container">
        <span class="kp-number">SVARA</span>
        <h1 class="kp-headline">Technology</h1>
        <p class="kp-definition">
          Five foundational technologies power the Intelligence Loop — from edge computing that processes data at the source to swarm intelligence that coordinates autonomous device fleets.
        </p>
      </div>
    </section>

    <section class="kp-section bg-gray-50">
      <div class="kp-container">
        <div v-for="tech in TECHNOLOGIES" :key="tech.name" class="kp-card mb-4">
          <h2 class="kp-card-title">{{ tech.name }}</h2>
          <p class="kp-card-body">{{ tech.description }}</p>
          <NuxtLink :to="tech.url" class="kp-link mt-3">
            Explore {{ tech.name }} <ArrowRight :size="14" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-technology {
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
