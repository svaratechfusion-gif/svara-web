<script setup lang="ts">
// /technologies — the index of SVARA's foundational technologies. Each
// entry's name, canonical definition, and route are sourced VERBATIM from
// the per-technology content files in lib/content/ via the canonical
// map already used by the [slug].vue detail page. No copy is rewritten.
import { edgeComputingContent } from "~~/lib/content/edge-computing"
import { computerVisionContent } from "~~/lib/content/computer-vision"
import { nlpContent } from "~~/lib/content/nlp"
import { sensorFusionContent } from "~~/lib/content/sensor-fusion"
import { swarmIntelligenceContent } from "~~/lib/content/swarm-intelligence"
import { useStructuredData } from "~/composables/useStructuredData"
import { SITE_URL } from "~~/lib/seo/site"
import { ArrowRight } from "@lucide/vue"

interface TechEntry {
  slug: string
  name: string
  definition: string
  url: string
}

const TECHS: TechEntry[] = [
  { slug: "edge-computing", name: "Edge Computing", definition: edgeComputingContent.canonicalDefinition, url: `${SITE_URL}/technologies/edge-computing` },
  { slug: "computer-vision", name: "Computer Vision", definition: computerVisionContent.canonicalDefinition, url: `${SITE_URL}/technologies/computer-vision` },
  { slug: "nlp", name: "Natural Language Processing", definition: nlpContent.canonicalDefinition, url: `${SITE_URL}/technologies/nlp` },
  { slug: "sensor-fusion", name: "Sensor Fusion", definition: sensorFusionContent.canonicalDefinition, url: `${SITE_URL}/technologies/sensor-fusion` },
  { slug: "swarm-intelligence", name: "Swarm Intelligence", definition: swarmIntelligenceContent.canonicalDefinition, url: `${SITE_URL}/technologies/swarm-intelligence` },
]

useSeoMeta({
  title: "Technologies | SVARA — Enterprise Intelligence Infrastructure",
  description:
    "SVARA's foundational technologies — Edge Computing, Computer Vision, Natural Language Processing, Sensor Fusion, and Swarm Intelligence — power the Intelligence Loop.",
})

useStructuredData({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SVARA Technologies",
  description: "Five foundational technologies that power the Intelligence Loop.",
  hasPart: TECHS.map((t) => ({
    "@type": "Thing",
    name: t.name,
    description: t.definition,
    url: t.url,
  })),
})

const pageLead =
  "Five foundational technologies power the Intelligence Loop — from edge computing that processes data at the source to swarm intelligence that coordinates autonomous device fleets."
</script>

<template>
  <div class="page-technologies">
    <section class="tk-hero">
      <div class="tk-inner">
        <span class="tk-eyebrow">SVARA</span>
        <h1 class="tk-headline">Technologies</h1>
        <p class="tk-lead">{{ pageLead }}</p>
      </div>
    </section>

    <section class="tk-list">
      <div class="tk-inner">
        <NuxtLink
          v-for="(t, i) in TECHS" :key="t.slug"
          :to="`/technologies/${t.slug}`"
          class="tk-row"
        >
          <span class="tk-row-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="tk-row-body">
            <h2 class="tk-row-title">{{ t.name }}</h2>
            <p class="tk-row-def">{{ t.definition }}</p>
          </div>
          <ArrowRight class="tk-row-arrow" :size="18" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-technologies {
  position: relative;
  background: #F8FBFF;
  color: var(--color-text);
}

.tk-hero { padding: calc(var(--nav-height) + var(--space-20)) var(--container-pad) var(--space-16); }
.tk-inner { max-width: 760px; margin-inline: auto; }
.tk-eyebrow {
  display: block; margin-bottom: var(--space-3);
  font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--color-accent);
}
.tk-headline {
  margin: 0 0 var(--space-6);
  font-size: clamp(48px, 6vw, 88px); font-weight: 800;
  line-height: 1.04; letter-spacing: -0.03em; color: var(--color-ink-strong);
}
.tk-lead {
  margin: 0; max-width: 60ch;
  font-size: var(--type-body); line-height: var(--leading-body);
  color: var(--color-text-secondary);
}

.tk-list { padding-bottom: var(--space-32); }
.tk-row {
  display: flex; align-items: flex-start; gap: var(--space-6);
  max-width: 760px; margin-inline: auto;
  padding: var(--space-10) var(--container-pad);
  border-top: 1px solid rgba(16, 42, 91, 0.08);
  text-decoration: none; color: inherit;
  transition: background var(--motion-medium) var(--ease-smooth);
}
.tk-row:hover { background: rgba(47, 127, 230, 0.04); }
.tk-row:last-child { border-bottom: 1px solid rgba(16, 42, 91, 0.08); }
.tk-row-num {
  flex-shrink: 0;
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: 0.08em; color: var(--color-text-faint);
  margin-top: 4px;
}
.tk-row-body { flex: 1; }
.tk-row-title {
  margin: 0 0 var(--space-3);
  font-size: clamp(24px, 2.6vw, 32px); font-weight: 700;
  letter-spacing: -0.02em; color: var(--color-ink-strong);
}
.tk-row-def {
  margin: 0;
  font-size: var(--type-body); line-height: var(--leading-body);
  color: var(--color-text-secondary);
}
.tk-row-arrow {
  flex-shrink: 0; margin-top: 6px; color: var(--color-accent);
  transition: transform var(--motion-medium) var(--ease-smooth);
}
.tk-row:hover .tk-row-arrow { transform: translateX(4px); }
.tk-row:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; border-radius: var(--radius-sm); }

@media (max-width: 768px) {
  .tk-row { flex-direction: column; gap: var(--space-3); }
}
</style>