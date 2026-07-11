<script setup lang="ts">
// SECTION 07 — "Engineering The Next Era Of Enterprise Intelligence."
// Closing narrative rendered in the existing two-column pure-typography
// pattern (same design as the archived WhoSection — no new visual
// concept). Copy verbatim from the Content Bible.
import { homeSection07 } from '~~/lib/content/home'
</script>

<template>
  <section class="nextera">
    <div class="nextera__inner">
      <div v-reveal>
        <p class="nextera__eyebrow">Section 07</p>
        <h2 class="nextera__title" data-split>{{ homeSection07.title }}</h2>
      </div>
      <div v-reveal="{ delay: 0.1 }" class="nextera__body">
        <p v-for="(p, i) in homeSection07.paragraphs" :key="i">{{ p }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.nextera__inner {
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--section-y) var(--container-pad);
  display: grid;
  grid-template-columns: 6fr 5fr;
  gap: var(--gap-section);
  align-items: start;
  box-sizing: border-box;
}
.nextera__eyebrow {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono);
  font-size: var(--type-label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-accent);
}
.nextera__title {
  margin: 0;
  font-size: clamp(34px, 4.4vw, 64px);
  font-weight: var(--weight-bold);
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: var(--color-text);
  text-wrap: balance;
}
.nextera__body p {
  margin: 0 0 var(--space-6);
  max-width: var(--paragraph-max);
  font-size: var(--type-body);
  line-height: var(--leading-body);
  color: var(--color-text-secondary);
}
.nextera__body p:last-child { margin-bottom: 0; color: var(--color-text); }

@media (max-width: 900px) {
  .nextera__inner { grid-template-columns: 1fr; gap: var(--space-12); }
}
</style>
