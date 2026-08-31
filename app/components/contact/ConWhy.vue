<script setup lang="ts">
// CONTACT · Why Organizations Partner With SVARA — five pillars. The pillar
// labels are the directed structure; supporting prose is derived (not
// verbatim Volume 12).
const pillars = [
  { k: 'Engineering', d: 'Deep systems engineering — intelligence built to run reliably inside real operations.' },
  { k: 'Innovation', d: 'Research-grade AI applied to the practical problems of data-heavy industries.' },
  { k: 'Partnership', d: 'We work alongside your teams, not at a distance — aligned to your outcomes.' },
  { k: 'Transformation', d: 'Measurable change in how your organization observes, decides and acts.' },
  { k: 'Long-Term Success', d: 'A relationship that compounds value as your operations and ambitions grow.' },
]
</script>

<template>
  <section class="cwhy">
    <div class="cwhy__head">
      <p v-reveal class="cwhy__eyebrow">Why SVARA</p>
      <h2 v-reveal class="cwhy__title" data-split>Why organizations partner with us</h2>
    </div>

    <div class="cwhy__grid">
      <article v-for="(p, i) in pillars" :key="p.k" v-reveal="{ delay: 0.06 * i }" class="cwhy__card" :class="{ 'cwhy__card--wide': i === 4 }">
        <span class="cwhy__index">{{ String(i + 1).padStart(2, '0') }}</span>
        <h3 class="cwhy__name">{{ p.k }}</h3>
        <p class="cwhy__desc">{{ p.d }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.cwhy { padding-block: var(--section-y); }
.cwhy__head { max-width: var(--container-max); margin-inline: auto; padding-inline: var(--container-pad); text-align: center; box-sizing: border-box; }
.cwhy__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.cwhy__title { margin: 0; font-size: clamp(28px, 3.4vw, 48px); font-weight: var(--weight-bold); letter-spacing: -0.02em; color: #0d1b3e; }

.cwhy__grid {
  max-width: 1100px; margin: var(--space-16) auto 0; padding-inline: var(--container-pad); box-sizing: border-box;
  display: grid; grid-template-columns: repeat(6, 1fr); gap: var(--space-6);
}
.cwhy__card {
  grid-column: span 2; padding: var(--space-8);
  border-radius: var(--radius-lg); border: 1px solid var(--color-border); background: var(--color-bg);
  transition: transform var(--motion-medium) var(--ease-smooth), box-shadow var(--motion-medium) var(--ease-smooth);
}
.cwhy__card:hover { transform: translateY(-3px); box-shadow: var(--shadow-med); }
.cwhy__card--wide { grid-column: span 6; }
.cwhy__index { font-family: var(--font-mono); font-size: var(--type-caption); color: var(--color-accent); letter-spacing: 0.04em; }
.cwhy__name { margin: var(--space-4) 0 0; font-size: var(--type-lead); font-weight: var(--weight-semibold); letter-spacing: -0.01em; color: #0d1b3e; }
.cwhy__desc { margin: var(--space-3) 0 0; font-size: var(--type-small); line-height: var(--leading-body); color: var(--color-text-secondary); }

@media (max-width: 900px) {
  .cwhy__grid { grid-template-columns: 1fr 1fr; }
  .cwhy__card, .cwhy__card--wide { grid-column: span 1; }
  .cwhy__card--wide { grid-column: span 2; }
}
@media (max-width: 560px) {
  .cwhy__grid { grid-template-columns: 1fr; }
  .cwhy__card--wide { grid-column: span 1; }
}
</style>
