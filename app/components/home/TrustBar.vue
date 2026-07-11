<script setup lang="ts">
// 02 TRUSTED BY — honest recognition marks (no fake client logos).
// Gray monochrome, full color (ink) on hover.
const marks = [
  'DPIIT Recognized',
  'Women-Led Enterprise',
  'Make in India',
  'AI-First Engineering',
  'Built for Enterprise',
]
</script>

<template>
  <section class="trust" aria-label="Recognitions">
    <div class="trust__inner">
      <span v-for="m in marks" :key="m" class="trust__mark">{{ m }}</span>
    </div>
  </section>
</template>

<style scoped>
.trust {
  border-block: 1px solid var(--color-border);
  background: var(--color-surface);
}
.trust__inner {
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--space-8) var(--container-pad);
  display: flex;
  flex-wrap: nowrap;
  gap: var(--space-12);
  overflow-x: auto;
  scrollbar-width: none;
  box-sizing: border-box;
}
.trust__inner::-webkit-scrollbar { display: none; }
.trust__mark {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: var(--type-label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-text-faint);
  transition: color var(--motion-medium) var(--ease-smooth);
}
.trust__mark:hover { color: var(--color-text); }
</style>
