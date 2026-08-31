<script setup lang="ts">
// FINAL CTA — don't end with buttons, end with emotion: huge statement,
// one glass object, one button, nothing else. No description paragraph,
// no second/ghost button. The core is a large frosted-glass "intelligence
// core" — genuine glass material (--glass-* tokens), rotating rings,
// orbiting particles — idle-animated only (no interaction; the closing
// beat, the culmination of the intelligence narrative opened by the
// Hero's core visual). Copy verbatim from the Content Bible.
import { ref } from 'vue'
import { homeFinalCta } from '~~/lib/content/home'
import { useIntelligenceTargets } from '~/composables/useIntelligenceTargets'

const root = ref<HTMLElement>()

// section gravity: a single strong-gather target — "particles gather
// again"
useIntelligenceTargets(root, () =>
  Array.from(root.value?.querySelectorAll<HTMLElement>('.core__sphere') ?? []))
</script>

<template>
  <section ref="root" class="cta">
    <div class="cta__inner">
      <div v-reveal class="core" aria-hidden="true">
        <div class="core__glow" />
        <div class="core__sphere" />
        <div class="core__ring core__ring--1" />
        <div class="core__ring core__ring--2" />
        <div class="core__orbit core__orbit--1"><span class="core__particle" /></div>
        <div class="core__orbit core__orbit--2"><span class="core__particle" /></div>
        <div class="core__orbit core__orbit--3"><span class="core__particle" /></div>
      </div>

      <div class="cta__copy">
        <h2 class="cta__title" data-split>{{ homeFinalCta.title }}</h2>
        <div v-reveal="{ delay: 0.08 }" class="cta__buttons">
          <NuxtLink :to="homeFinalCta.primaryCta.to" class="cta__button">{{ homeFinalCta.primaryCta.label }}</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta { min-height: 100vh; display: flex; align-items: center; }
.cta__inner {
  width: 100%;
  max-width: 900px;
  margin-inline: auto;
  padding: var(--section-y) var(--container-pad);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
}
.cta__copy { display: flex; flex-direction: column; align-items: center; }
.cta__title {
  margin: 0 0 var(--space-12);
  max-width: 16ch;
  font-size: clamp(44px, 6vw, 96px);
  font-weight: var(--weight-extrabold);
  letter-spacing: var(--tracking-display);
  line-height: 1.05;
  color: var(--color-text);
  text-wrap: balance;
}
.cta__buttons { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-4); }
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

/* the intelligence core — large, frosted-glass, centered above the headline */
.core { position: relative; width: 100%; aspect-ratio: 1 / 1; max-width: 320px; margin: 0 auto var(--space-10); }
.core__glow {
  position: absolute; inset: 12%;
  border-radius: 50%;
  background: radial-gradient(circle, var(--color-accent) 0%, transparent 70%);
  opacity: 0.12;
  filter: blur(32px);
  animation: core-pulse 4.5s ease-in-out infinite;
}
.core__sphere {
  position: absolute; inset: 26%;
  border-radius: 50%;
  /* genuine frosted glass — same recipe as GlassPanel, not a solid gradient */
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: var(--glass-border);
  box-shadow: var(--glass-shadow);
  animation: core-pulse 4.5s ease-in-out infinite;
  animation-delay: -1.2s;
}
.core__sphere::before {
  content: "";
  position: absolute; inset: 0;
  border-radius: inherit;
  background: var(--glass-reflection);
}
.core__ring {
  position: absolute; inset: 8%;
  border-radius: 50%;
  border: 1px solid var(--color-border-strong);
}
.core__ring--1 { animation: core-spin 14s linear infinite; }
.core__ring--2 { inset: 16%; animation: core-spin 20s linear infinite reverse; border-color: var(--color-border); }

.core__orbit {
  position: absolute; inset: 0;
  animation: core-spin 10s linear infinite;
}
.core__orbit--1 { inset: 0%; }
.core__orbit--2 { inset: 10%; animation-duration: 16s; animation-direction: reverse; }
.core__orbit--3 { inset: -8%; animation-duration: 22s; }
.core__particle {
  position: absolute;
  top: 50%; left: 0;
  width: 8px; height: 8px;
  margin-top: -4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--color-border-strong);
  box-shadow: 0 0 10px rgba(47, 127, 230, 0.35);
}

@keyframes core-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.85; }
}
@keyframes core-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 900px) {
  .core { max-width: 220px; }
}
@media (prefers-reduced-motion: reduce) {
  .cta__button { transition: none; }
  .core__glow, .core__sphere, .core__ring, .core__orbit { animation: none; }
}
</style>
