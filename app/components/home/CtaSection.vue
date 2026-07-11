<script setup lang="ts">
// 10 CTA — very clean. Large typography, single button.
</script>

<template>
  <section class="cta">
    <div class="cta__inner">
      <h2 class="cta__title" data-split>Let's build intelligence together.</h2>
      <div v-reveal="{ delay: 0.1 }">
        <NuxtLink to="/contact" class="cta__button">Connect with SVARA</NuxtLink>
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
  margin: 0 0 var(--space-12);
  max-width: 14ch;
  font-size: clamp(48px, 7vw, 112px);
  font-weight: var(--weight-extrabold);
  letter-spacing: var(--tracking-display);
  line-height: 1.05;
  color: var(--color-text);
  text-wrap: balance;
}
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
@media (prefers-reduced-motion: reduce) { .cta__button { transition: none; } }
</style>
