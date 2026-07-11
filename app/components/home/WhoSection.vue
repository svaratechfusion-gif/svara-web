<script setup lang="ts">
// 03 WHO IS SVARA — two columns, pure typography. No cards, icons, graphics.
</script>

<template>
  <section class="who">
    <div class="who__inner">
      <div v-reveal>
        <p class="who__eyebrow">Who is SVARA</p>
        <h2 class="who__title">The intelligence layer for the world's most complex industries.</h2>
      </div>
      <div v-reveal="{ delay: 0.1 }" class="who__body">
        <p>Modern enterprises run hundreds of systems that produce information — and almost none that produce coordinated intelligence. SVARA engineers the infrastructure that connects sensing, reasoning, prediction, and action into one continuously learning system.</p>
        <p>We call the problem Intelligence Fragmentation. We build the layer that ends it.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.who__inner {
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--section-y) var(--container-pad);
  display: grid;
  grid-template-columns: 6fr 5fr;
  gap: var(--gap-section);
  align-items: start;
  box-sizing: border-box;
}
.who__eyebrow {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono);
  font-size: var(--type-label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-accent);
}
.who__title {
  margin: 0;
  font-size: clamp(34px, 4.4vw, 64px);
  font-weight: var(--weight-bold);
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: var(--color-text);
  text-wrap: balance;
}
.who__body p {
  margin: 0 0 var(--space-6);
  max-width: var(--paragraph-max);
  font-size: var(--type-body);
  line-height: var(--leading-body);
  color: var(--color-text-secondary);
}
.who__body p:last-child { margin-bottom: 0; color: var(--color-text); }

@media (max-width: 900px) {
  .who__inner { grid-template-columns: 1fr; gap: var(--space-12); }
}
</style>
