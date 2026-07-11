<script setup lang="ts">
// Scene 8 — Explore. Three entry points for a buyer who's read enough and
// wants to go deeper. One final statement closes the homepage — the same
// register as the hero, full stop.
import { ArrowRight } from "@lucide/vue";

const EXPLORE = [
  {
    title: "Platform",
    description: "The Intelligence Loop framework and the infrastructure behind it. Architecture, deployment, integrations.",
    href: "/platform",
    cta: "Read the platform brief",
  },
  {
    title: "Products",
    description: "Nine products across the five capabilities. Each one independently deployable, jointly compounding.",
    href: "/products",
    cta: "Survey the products",
  },
  {
    title: "Contact",
    description: "Tell us about your operations and what you want to improve. We respond within 24 business hours.",
    href: "/contact",
    cta: "Start a conversation",
  },
] as const;
</script>

<template>
  <section class="explore" aria-labelledby="explore-title">
    <div class="explore__inner">
      <p class="section__number">07 · Explore</p>
      <h2 id="explore-title" class="section__title">
        Three places<br>
        to start.
      </h2>

      <ul class="explore__grid" role="list">
        <li
          v-for="item in EXPLORE"
          :key="item.href"
          class="explore-card"
          data-reveal-item
        >
          <NuxtLink :to="item.href" class="explore-card__link">
            <h3 class="explore-card__title">{{ item.title }}</h3>
            <p class="explore-card__body">{{ item.description }}</p>
            <span class="explore-card__cta">
              {{ item.cta }}
              <ArrowRight :size="14" aria-hidden="true" />
            </span>
          </NuxtLink>
        </li>
      </ul>

      <p class="explore__closing">
        Engineering<br>
        The Intelligence Layer<br>
        Of Tomorrow.
      </p>
    </div>
  </section>
</template>

<style scoped>
.explore {
  min-height: 100svh;
  padding: 8rem 1.5rem 6rem;
  display: flex;
  align-items: center;
  background: var(--color-bg);
}
.explore__inner {
  max-width: 72rem;
  margin: 0 auto;
  width: 100%;
}
.section__number {
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-muted);
  margin-bottom: 1.25rem;
}
.section__title {
  font-size: clamp(2rem, 4.5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.02em;
  margin-bottom: 4rem;
}
.explore__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  margin-bottom: 6rem;
}
@media (min-width: 640px)  { .explore__grid { grid-template-columns: repeat(3, 1fr); gap: 1.75rem; } }

.explore-card {
  background: var(--color-card);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-card);
  transition: transform var(--duration-fast) ease, box-shadow var(--duration-fast) ease, border-color var(--duration-fast) ease;
}
.explore-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-accent);
}
.explore-card__link {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2.25rem 1.75rem;
  text-decoration: none;
  color: var(--color-primary);
  height: 100%;
}
.explore-card__title {
  font-size: 1.625rem;
  font-weight: 700;
  letter-spacing: -0.015em;
}
.explore-card__body {
  flex: 1;
  font-size: 1rem;
  line-height: 1.55;
  color: var(--color-muted-strong);
}
.explore-card__cta {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-accent);
}

.explore__closing {
  font-size: clamp(2.25rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.025em;
  color: var(--color-primary);
  text-align: center;
  margin-top: 4rem;
}

@media (max-width: 640px) {
  .explore { padding: 6rem 1.25rem 4rem; }
  .explore__grid { margin-bottom: 4rem; }
}
</style>