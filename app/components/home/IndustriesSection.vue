<script setup lang="ts">
// 06 INDUSTRIES — horizontally scrolling panels (native scroll-snap:
// production-safe on touch + trackpad, no pin-jacking). Typographic
// panels on surface gradients; hover reveals description.
import { INDUSTRIES } from '~/utils/industries'

const panels = INDUSTRIES.slice(0, 8)
</script>

<template>
  <section class="industries">
    <div v-reveal class="industries__head">
      <p class="industries__eyebrow">Industries</p>
      <h2 class="industries__title" data-split>Same intelligence. Different worlds.</h2>
    </div>

    <div class="industries__track" tabindex="0" aria-label="Industries — scroll horizontally">
      <NuxtLink
        v-for="ind in panels"
        :key="ind.slug"
        :to="`/industries/${ind.slug}`"
        class="industries__panel glass-react"
      >
        <span class="industries__num mono">{{ String(panels.indexOf(ind) + 1).padStart(2, '0') }}</span>
        <span class="industries__name">{{ ind.name }}</span>
        <span class="industries__desc">{{ ind.summary }}</span>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.industries { padding-block: var(--section-y); }
.industries__head {
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-pad);
  margin-bottom: var(--space-16);
  box-sizing: border-box;
}
.industries__eyebrow {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--color-accent);
}
.industries__title {
  margin: 0;
  font-size: clamp(34px, 4.4vw, 64px);
  font-weight: var(--weight-bold); line-height: 1.12; letter-spacing: -0.02em;
  color: var(--color-text);
}

.industries__track {
  display: flex;
  gap: var(--gap-card);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-inline: max(var(--container-pad), calc((100vw - var(--container-max)) / 2 + var(--container-pad)));
  padding-bottom: var(--space-4);
  scrollbar-width: thin;
}
.industries__panel {
  position: relative;
  flex: 0 0 min(420px, 78vw);
  scroll-snap-align: start;
  aspect-ratio: 4 / 5;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background:
    radial-gradient(120% 100% at 20% 0%, #ffffff 0%, var(--color-surface) 60%, #E9EFF6 100%);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-decoration: none;
  overflow: hidden;
  transition: transform var(--motion-medium) var(--ease-smooth),
              box-shadow var(--motion-medium) var(--ease-smooth);
}
.industries__panel:hover { transform: translateY(-4px); box-shadow: var(--shadow-med); }
.industries__panel:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
.industries__num {
  position: absolute; top: var(--space-6); left: var(--space-8);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); color: var(--color-text-faint);
}
.industries__name {
  font-size: clamp(28px, 2.6vw, 40px);
  font-weight: var(--weight-bold); letter-spacing: -0.02em;
  color: var(--color-text);
  margin-bottom: var(--space-3);
}
.industries__desc {
  font-size: var(--type-caption); line-height: 1.55;
  color: var(--color-text-secondary);
  max-width: 32ch;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity var(--motion-medium) var(--ease-smooth),
              transform var(--motion-medium) var(--ease-smooth);
}
.industries__panel:hover .industries__desc,
.industries__panel:focus-visible .industries__desc { opacity: 1; transform: none; }

@media (hover: none) {
  .industries__desc { opacity: 1; transform: none; } /* touch: always visible */
}
@media (prefers-reduced-motion: reduce) {
  .industries__panel, .industries__desc { transition: none; }
}
</style>
