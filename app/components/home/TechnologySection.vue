<script setup lang="ts">
// 07 TECHNOLOGY — seven technologies, one architecture. A central spine
// with each technology branching off it; hovering a technology lights its
// branch. Same blueprint register as Architecture — no new visual concepts.
import { ref } from 'vue'

const technologies = [
  { id: 'ai', label: 'AI', note: 'Models, inference, reasoning' },
  { id: 'cloud', label: 'Cloud', note: 'Unified data plane' },
  { id: 'vision', label: 'Vision', note: 'Perception at scale' },
  { id: 'edge', label: 'Edge', note: 'Compute at the source' },
  { id: 'sim', label: 'Simulation', note: 'Digital twins, what-if' },
  { id: 'security', label: 'Security', note: 'Enterprise-grade, by design' },
  { id: 'analytics', label: 'Analytics', note: 'Outcomes, measured' },
]
const active = ref<string | null>(null)
</script>

<template>
  <section class="techstack">
    <div class="techstack__inner">
      <div v-reveal class="techstack__head">
        <p class="techstack__eyebrow">Technology</p>
        <h2 class="techstack__title" data-split>Every technology, one architecture.</h2>
        <p v-reveal="{ delay: 0.08 }" class="techstack__sub">Not seven tools bolted together — seven capabilities engineered into a single intelligence infrastructure.</p>
      </div>

      <ul class="techstack__list" @mouseleave="active = null">
        <li
          v-for="t in technologies" :key="t.id"
          class="techstack__item"
          :class="{ 'techstack__item--dim': active && active !== t.id }"
          @mouseenter="active = t.id"
        >
          <span class="techstack__branch" aria-hidden="true" />
          <span class="techstack__label">{{ t.label }}</span>
          <span class="techstack__note mono">{{ t.note }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.techstack { background: var(--color-surface); border-block: 1px solid var(--color-border); }
.techstack__inner {
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--section-y) var(--container-pad);
  box-sizing: border-box;
}
.techstack__eyebrow {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--color-accent);
}
.techstack__title {
  margin: 0 0 var(--space-4);
  font-size: clamp(34px, 4.4vw, 64px);
  font-weight: var(--weight-bold); line-height: 1.12; letter-spacing: -0.02em;
  color: var(--color-text); text-wrap: balance;
}
.techstack__sub {
  margin: 0 0 var(--space-16);
  max-width: var(--paragraph-max);
  font-size: var(--type-body); line-height: var(--leading-body);
  color: var(--color-text-secondary);
}

/* the shared spine */
.techstack__list {
  list-style: none; margin: 0; padding: 0;
  position: relative;
  border-top: 1px solid var(--color-border);
}
.techstack__item {
  position: relative;
  display: grid;
  grid-template-columns: 34px minmax(140px, 0.4fr) 1fr;
  align-items: baseline;
  gap: var(--space-8);
  padding: var(--space-8) 0;
  border-bottom: 1px solid var(--color-border);
  transition: opacity var(--motion-medium) var(--ease-smooth);
}
.techstack__item--dim { opacity: 0.4; }
.techstack__branch {
  align-self: center;
  height: 2px;
  background: var(--color-border-strong);
  transition: background var(--motion-medium) var(--ease-smooth),
              transform var(--motion-medium) var(--ease-smooth);
  transform-origin: left center;
}
.techstack__item:hover .techstack__branch { background: var(--color-accent); transform: scaleX(1.3); }
.techstack__label {
  font-size: clamp(24px, 2.6vw, 40px);
  font-weight: var(--weight-bold); letter-spacing: -0.02em;
  color: var(--color-text);
}
.techstack__note {
  font-family: var(--font-mono); font-size: var(--type-caption);
  letter-spacing: 0.04em; color: var(--color-text-secondary);
}

@media (max-width: 700px) {
  .techstack__item {
    grid-template-columns: 24px 1fr;
    grid-template-areas: 'branch label' 'branch note';
    gap: var(--space-4) var(--space-6);
    row-gap: var(--space-2);
  }
  .techstack__branch { grid-area: branch; width: 16px; }
  .techstack__label { grid-area: label; }
  .techstack__note { grid-area: note; }
}
@media (prefers-reduced-motion: reduce) {
  .techstack__item, .techstack__branch { transition: none; }
  .techstack__item:hover .techstack__branch { transform: none; }
}
</style>
