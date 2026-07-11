<script setup lang="ts">
// Scene 7 — Industries. Twelve verticals where data outpaces people, each
// traces to a primary capability. Reads from the single source of truth
// (utils/industries.ts) so the homepage cannot drift from the index page.
import { INDUSTRIES } from "~/utils/industries";
import { ArrowRight } from "@lucide/vue";
</script>

<template>
  <section class="industries" aria-labelledby="industries-title">
    <div class="industries__inner">
      <p class="section__number">07 · Industries</p>
      <h2 id="industries-title" class="section__title">
        Built for industries<br>
        where data outpaces people.
      </h2>
      <p class="section__lead">
        The Intelligence Loop is vertical-agnostic by design — the same five
        capabilities compose differently per industry. Twelve verticals
        shipped today, more on the roadmap.
      </p>

      <ul class="industries__grid" role="list">
        <li
          v-for="industry in INDUSTRIES"
          :key="industry.slug"
          class="industry-card"
          data-reveal-item
        >
          <NuxtLink :to="`/industries/${industry.slug}`" class="industry-card__link">
            <span class="industry-card__capability">{{ industry.capability }}</span>
            <h3 class="industry-card__name">{{ industry.name }}</h3>
            <p class="industry-card__summary">{{ industry.summary }}</p>
            <span class="industry-card__explore">
              Use case <ArrowRight :size="14" aria-hidden="true" />
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.industries {
  min-height: 100svh;
  padding: 8rem 1.5rem;
  display: flex;
  align-items: center;
}
.industries__inner {
  max-width: 72rem;
  margin: 0 auto;
  width: 100%;
}
.section__number {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  margin-bottom: 1.25rem;
}
.section__title {
  font-size: clamp(2.75rem, 7vw, 5.5rem);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: -0.035em;
  margin-bottom: 1.5rem;
}
.section__lead {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--color-muted-strong);
  max-width: 48rem;
  margin-bottom: 4rem;
}
.industries__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
}
@media (min-width: 640px)  { .industries__grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .industries__grid { grid-template-columns: repeat(3, 1fr); gap: 1.25rem; } }

.industry-card {
  background: var(--color-card);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-card);
  transition: transform var(--duration-fast) ease, box-shadow var(--duration-fast) ease;
}
.industry-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-sm);
  border-color: var(--color-accent);
}
.industry-card__link {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem 1.25rem;
  text-decoration: none;
  color: var(--color-primary);
  height: 100%;
}
.industry-card__capability {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-accent);
}
.industry-card__name {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.industry-card__summary {
  flex: 1;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--color-muted-strong);
}
.industry-card__explore {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-accent);
}

@media (max-width: 640px) {
  .industries { padding: 6rem 1.25rem; }
}
</style>