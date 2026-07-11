<script setup lang="ts">
// Minimal placeholder for internal-link routes not yet built. Uses the
// existing layout/design language; keeps links resolvable and SEO-safe
// (noindex until the real page ships).
const props = defineProps<{ title: string, blurb: string }>()

useSeoMeta({
  title: `${props.title} — SVARA TechFusion`,
  description: props.blurb,
  robots: 'noindex, follow',
})
</script>

<template>
  <section class="placeholder">
    <div class="placeholder__inner">
      <p class="placeholder__eyebrow">SVARA</p>
      <h1 class="placeholder__title">{{ title }}</h1>
      <p class="placeholder__blurb">{{ blurb }}</p>
      <NuxtLink to="/" class="placeholder__link">← Back to home</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.placeholder {
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  align-items: center;
}
.placeholder__inner {
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--section-y) var(--container-pad);
  box-sizing: border-box;
}
.placeholder__eyebrow {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--color-accent);
}
.placeholder__title {
  margin: 0 0 var(--space-6);
  font-size: clamp(48px, 6vw, 96px);
  font-weight: var(--weight-extrabold);
  letter-spacing: var(--tracking-display); line-height: 1.05;
  color: var(--color-text);
}
.placeholder__blurb {
  margin: 0 0 var(--space-10);
  max-width: var(--paragraph-max);
  font-size: var(--type-body); line-height: var(--leading-body);
  color: var(--color-text-secondary);
}
.placeholder__link {
  font-size: var(--type-small); font-weight: var(--weight-semibold);
  color: var(--color-accent); text-decoration: none;
}
.placeholder__link:hover { text-decoration: underline; }
</style>
