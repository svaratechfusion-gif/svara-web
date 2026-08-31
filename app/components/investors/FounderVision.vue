<script setup lang="ts">
// FOUNDER VISION — elegant founder section with a concise mission
// statement. Focus on long-term enterprise infrastructure, not biography.
// Mission statement is VERBATIM from the Content Bible (company.ts Company
// Mission component). The horizon framing is verbatim from company
// canonicalDefinition.
import { founderVision } from '~/utils/investors'
</script>

<template>
  <section class="fv">
    <div class="fv__inner">
      <p class="fv__eyebrow">Founder Vision</p>
      <blockquote class="fv__mission">{{ founderVision.mission }}</blockquote>
      <p class="fv__horizon">{{ founderVision.horizon }}</p>
    </div>
  </section>
</template>

<style scoped>
.fv { background: #F1F6FE; padding: var(--space-40) var(--container-pad); display: flex; justify-content: center; }
.fv__inner { max-width: 820px; text-align: center; }
.fv__eyebrow { margin: 0 0 var(--space-8); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.fv__mission { margin: 0; font-size: clamp(28px, 3.6vw, 48px); font-weight: var(--weight-extrabold); line-height: 1.2; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.fv__horizon { margin: var(--space-10) auto 0; max-width: 60ch; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }
</style>