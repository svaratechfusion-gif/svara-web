<script setup lang="ts">
import type { KnowledgeProductContent } from "~~/lib/types/content"
import { ArrowRight, CheckCircle, ExternalLink } from "@lucide/vue"

const props = defineProps<{
  content: KnowledgeProductContent
}>()

function sectionId(slug: string) {
  return `kp-${slug}`
}
</script>

<template>
  <article class="knowledge-product">
    <!-- 01 — Definition -->
    <section :id="sectionId('definition')" class="kp-section bg-white">
      <div class="kp-container">
        <span class="kp-number">01</span>
        <h1 class="kp-headline">{{ content.metadata.title }}</h1>
        <p class="kp-definition">
          {{ content.canonicalDefinition }}
        </p>
      </div>
    </section>

    <!-- 02 — Architecture -->
    <section :id="sectionId('architecture')" class="kp-section bg-gray-50">
      <div class="kp-container">
        <span class="kp-number">02</span>
        <h2 class="kp-title">Architecture</h2>
        <p class="kp-body">{{ content.architecture.overview }}</p>
        <div v-if="content.architecture.components.length" class="kp-grid">
          <div v-for="comp in content.architecture.components" :key="comp.name" class="kp-card">
            <h3 class="kp-card-title">{{ comp.name }}</h3>
            <p class="kp-card-body">{{ comp.description }}</p>
          </div>
        </div>
        <p v-if="content.architecture.dataFlow" class="kp-body mt-6">
          <strong>Data Flow:</strong> {{ content.architecture.dataFlow }}
        </p>
      </div>
    </section>

    <!-- 03 — Use Cases -->
    <section :id="sectionId('use-cases')" class="kp-section bg-white">
      <div class="kp-container">
        <span class="kp-number">03</span>
        <h2 class="kp-title">Use Cases</h2>
        <div v-for="uc in content.useCases" :key="uc.title" class="kp-card mb-4">
          <h3 class="kp-card-title">{{ uc.title }}</h3>
          <p class="kp-card-body">{{ uc.description }}</p>
          <div v-if="uc.industries.length" class="kp-tags">
            <span v-for="ind in uc.industries" :key="ind" class="kp-tag">{{ ind }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 04 — Deployment -->
    <section :id="sectionId('deployment')" class="kp-section bg-gray-50">
      <div class="kp-container">
        <span class="kp-number">04</span>
        <h2 class="kp-title">Deployment</h2>
        <p class="kp-body">{{ content.deployment.overview }}</p>
        <ol v-if="content.deployment.steps.length" class="kp-steps">
          <li v-for="(step, i) in content.deployment.steps" :key="i" class="kp-step">
            <span class="kp-step-num">{{ String(i + 1).padStart(2, "0") }}</span>
            <span>{{ step }}</span>
          </li>
        </ol>
        <p v-if="content.deployment.integration" class="kp-body mt-4">
          <strong>Integration:</strong> {{ content.deployment.integration }}
        </p>
      </div>
    </section>

    <!-- 05 — Industries -->
    <section v-if="content.industries.length" :id="sectionId('industries')" class="kp-section bg-white">
      <div class="kp-container">
        <span class="kp-number">05</span>
        <h2 class="kp-title">Industries</h2>
        <div v-for="ind in content.industries" :key="ind.name" class="kp-card mb-4">
          <h3 class="kp-card-title">{{ ind.name }}</h3>
          <p class="kp-card-body">{{ ind.description }}</p>
          <NuxtLink :to="ind.url" class="kp-link">
            Explore {{ ind.name }} <ArrowRight :size="14" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 06 — FAQs -->
    <section v-if="content.faqs.length" :id="sectionId('faqs')" class="kp-section bg-gray-50">
      <div class="kp-container">
        <span class="kp-number">06</span>
        <h2 class="kp-title">Frequently Asked Questions</h2>
        <div v-for="faq in content.faqs" :key="faq.question" class="kp-faq">
          <h3 class="kp-faq-q">{{ faq.question }}</h3>
          <p class="kp-faq-a">{{ faq.answer }}</p>
        </div>
      </div>
    </section>

    <!-- 07 — Comparisons -->
    <section v-if="content.comparisons.length" :id="sectionId('comparisons')" class="kp-section bg-white">
      <div class="kp-container">
        <span class="kp-number">07</span>
        <h2 class="kp-title">Comparisons</h2>
        <div v-for="cmp in content.comparisons" :key="cmp.concept" class="kp-card mb-4">
          <h3 class="kp-card-title">{{ cmp.concept }}</h3>
          <p class="kp-card-body">{{ cmp.description }}</p>
          <p class="kp-card-diff">
            <CheckCircle :size="14" class="inline-icon" />
            {{ cmp.differentiator }}
          </p>
        </div>
      </div>
    </section>

    <!-- 08 — ROI -->
    <section v-if="content.roi.metrics.length" :id="sectionId('roi')" class="kp-section bg-gray-50">
      <div class="kp-container">
        <span class="kp-number">08</span>
        <h2 class="kp-title">Return on Investment</h2>
        <p class="kp-body">{{ content.roi.overview }}</p>
        <div class="kp-metrics">
          <div v-for="m in content.roi.metrics" :key="m.label" class="kp-metric">
            <span class="kp-metric-value">{{ m.value }}</span>
            <span class="kp-metric-label">{{ m.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 09 — Resources -->
    <section v-if="content.resources.length" :id="sectionId('resources')" class="kp-section bg-white">
      <div class="kp-container">
        <span class="kp-number">09</span>
        <h2 class="kp-title">Resources</h2>
        <ul class="kp-resources">
          <li v-for="r in content.resources" :key="r.title" class="kp-resource">
            <ExternalLink :size="14" class="inline-icon" />
            <span>{{ r.title }}</span>
            <span class="kp-resource-type">{{ r.type }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- 10 — Related Products -->
    <section v-if="content.relatedProducts.length" :id="sectionId('related')" class="kp-section bg-gray-50">
      <div class="kp-container">
        <span class="kp-number">10</span>
        <h2 class="kp-title">Related Products</h2>
        <div class="kp-grid">
          <div v-for="rp in content.relatedProducts" :key="rp.name" class="kp-card">
            <h3 class="kp-card-title">{{ rp.name }}</h3>
            <p class="kp-card-body">{{ rp.description }}</p>
            <NuxtLink :to="rp.url" class="kp-link">
              Explore <ArrowRight :size="14" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped>
.knowledge-product {
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

.kp-title {
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin-bottom: 1.5rem;
}

.kp-definition {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--color-muted);
}

.kp-body {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-muted);
  max-width: 42rem;
}

.kp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
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
  margin-bottom: 0.5rem;
}

.kp-card-body {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-muted);
}

.kp-card-diff {
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--color-muted);
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-divider);
}

.kp-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.kp-tag {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: var(--color-accent-bg);
  color: var(--color-accent);
}

.kp-steps {
  list-style: none;
  padding: 0;
  margin-top: 2rem;
}

.kp-step {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-divider);
  font-size: 0.9375rem;
  line-height: 1.5;
}

.kp-step:last-child {
  border-bottom: none;
}

.kp-step-num {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-muted);
  font-variant-numeric: tabular-nums;
  min-width: 2rem;
}

.kp-faq {
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--color-divider);
}

.kp-faq:last-child {
  border-bottom: none;
}

.kp-faq-q {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.kp-faq-a {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-muted);
}

.kp-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.kp-metric {
  text-align: center;
  padding: 1.5rem;
  background: var(--color-card);
  border: 1px solid var(--color-divider);
  border-radius: 0.75rem;
}

.kp-metric-value {
  display: block;
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 0.25rem;
}

.kp-metric-label {
  font-size: 0.8125rem;
  color: var(--color-muted);
  line-height: 1.3;
}

.kp-resources {
  list-style: none;
  padding: 0;
}

.kp-resource {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-divider);
  font-size: 0.9375rem;
}

.kp-resource:last-child {
  border-bottom: none;
}

.kp-resource-type {
  margin-left: auto;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-muted);
  text-transform: capitalize;
}

.kp-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-accent);
  margin-top: 0.75rem;
  text-decoration: none;
}

.kp-link:hover {
  text-decoration: underline;
}

.inline-icon {
  display: inline;
  vertical-align: middle;
}
</style>
