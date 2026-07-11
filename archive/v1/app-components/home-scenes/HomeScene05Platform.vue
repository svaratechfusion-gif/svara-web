<script setup lang="ts">
// Scene 5 — Platform. The five capabilities that make the Intelligence Loop
// operational. Each card links to its /capabilities/<slug> detail page.
import { ArrowRight } from "@lucide/vue";

const CAPABILITIES = [
  {
    slug: "observe",
    name: "Observe",
    description: "Capture operational reality from any signal source — cameras, sensors, IoT, video, logs, enterprise systems.",
  },
  {
    slug: "understand",
    name: "Understand",
    description: "Interpret what the signals mean in context — models that turn raw streams into structured operational insight.",
  },
  {
    slug: "predict",
    name: "Predict",
    description: "Forecast the next state — failures, demand, drift — early enough to act, not just to react.",
  },
  {
    slug: "coordinate",
    name: "Coordinate",
    description: "Orchestrate action across systems and people — one decision, dispatched cleanly to every place it needs to land.",
  },
  {
    slug: "improve",
    name: "Improve",
    description: "Feed every outcome back into the loop. Each cycle makes the next one smarter — intelligence that compounds.",
  },
] as const;
</script>

<template>
  <section class="platform" aria-labelledby="platform-title">
    <div class="platform__inner">
      <p class="section__number">05 · Platform</p>
      <h2 id="platform-title" class="section__title">
        Five capabilities.<br>
        One loop.
      </h2>
      <p class="section__lead">
        The Intelligence Loop is not a stack of products. It is one continuous
        cycle of observing, understanding, predicting, coordinating, and
        improving — each capability feeding the next, the loop feeding itself.
      </p>

      <ol class="platform__grid" role="list">
        <li
          v-for="(cap, i) in CAPABILITIES"
          :key="cap.slug"
          class="capability-card"
          data-reveal-item
        >
          <span class="capability-card__index">{{ String(i + 1).padStart(2, "0") }}</span>
          <h3 class="capability-card__name">{{ cap.name }}</h3>
          <p class="capability-card__body">{{ cap.description }}</p>
          <NuxtLink :to="`/capabilities/${cap.slug}`" class="capability-card__link">
            Explore {{ cap.name }}
            <ArrowRight :size="14" aria-hidden="true" />
          </NuxtLink>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.platform {
  min-height: 100svh;
  padding: 8rem 1.5rem;
  display: flex;
  align-items: center;
}
.platform__inner {
  max-width: 64rem;
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
.platform__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}
@media (min-width: 640px)  { .platform__grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .platform__grid { grid-template-columns: repeat(5, 1fr); gap: 1.25rem; } }

.capability-card {
  background: var(--color-card);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-card);
  padding: 2rem 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  transition: transform var(--duration-fast) ease, box-shadow var(--duration-fast) ease;
}
.capability-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
.capability-card__index {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-muted);
  letter-spacing: 0.08em;
}
.capability-card__name {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: var(--color-primary);
}
.capability-card__body {
  flex: 1;
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--color-muted-strong);
}
.capability-card__link {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-accent);
  text-decoration: none;
}
.capability-card__link:hover { text-decoration: underline; }

@media (max-width: 640px) {
  .capabilities { padding: 6rem 1.25rem; }
}
</style>