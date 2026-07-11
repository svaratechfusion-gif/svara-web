<script setup lang="ts">
// FINAL CTA — large editorial typography, description, two buttons.
// Copy verbatim from the Content Bible.
import { homeFinalCta } from '~~/lib/content/home'
</script>

<template>
  <section class="cta">
    <div class="cta__inner">
      <h2 class="cta__title" data-split>{{ homeFinalCta.title }}</h2>
      <p v-reveal="{ delay: 0.06 }" class="cta__desc">{{ homeFinalCta.description }}</p>
      <div v-reveal="{ delay: 0.12 }" class="cta__buttons">
        <NuxtLink :to="homeFinalCta.primaryCta.to" class="cta__button">{{ homeFinalCta.primaryCta.label }}</NuxtLink>
        <NuxtLink :to="homeFinalCta.secondaryCta.to" class="cta__button cta__button--ghost">{{ homeFinalCta.secondaryCta.label }}</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta__inner {
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--section-y) var(--container-pad);
  box-sizing: border-box;
}
.cta__title {
  margin: 0 0 var(--space-8);
  max-width: 16ch;
  font-size: clamp(44px, 6vw, 96px);
  font-weight: var(--weight-extrabold);
  letter-spacing: var(--tracking-display);
  line-height: 1.05;
  color: var(--color-text);
  text-wrap: balance;
}
.cta__desc {
  margin: 0 0 var(--space-12);
  max-width: var(--paragraph-max);
  font-size: var(--type-body);
  line-height: var(--leading-body);
  color: var(--color-text-secondary);
}
.cta__buttons { display: flex; flex-wrap: wrap; gap: var(--space-4); }
.cta__button {
  display: inline-flex;
  align-items: center;
  height: 56px;
  padding-inline: var(--space-10);
  border-radius: var(--radius-pill);
  background: var(--color-text);
  color: var(--color-inverse);
  font-size: var(--type-small);
  font-weight: var(--weight-semibold);
  text-decoration: none;
  transition: background var(--motion-medium) var(--ease-smooth),
              transform var(--motion-fast) var(--ease-smooth);
}
.cta__button:hover { background: var(--color-accent); transform: translateY(-2px); }
.cta__button:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
.cta__button--ghost {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border-strong);
}
.cta__button--ghost:hover { background: transparent; color: var(--color-accent); border-color: var(--color-accent); }
@media (prefers-reduced-motion: reduce) { .cta__button { transition: none; } }
</style>
