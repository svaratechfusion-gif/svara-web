<script setup lang="ts">
// INVESTORS CTA — the page's close. Minimal layout, large typography,
// premium whitespace. Copy is used VERBATIM from the Content Bible
// (homeFinalCta). No rewriting or shortening.
import { irCta } from '~/utils/investors'

const cta = irCta
</script>

<template>
  <section class="ic">
    <div class="ic__inner">
      <h2 class="ic__title">{{ cta.title }}</h2>
      <p class="ic__desc">{{ cta.description }}</p>
      <div class="ic__ctas">
        <NuxtLink :to="cta.primaryCta.to" class="ic__cta ic__cta--solid">{{ cta.primaryCta.label }}</NuxtLink>
        <NuxtLink :to="cta.secondaryCta.to" class="ic__cta ic__cta--ghost">{{ cta.secondaryCta.label }}</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ic { background: #F8FBFF; padding: var(--space-40) var(--container-pad); display: flex; justify-content: center; }
.ic__inner { text-align: center; max-width: 820px; }
.ic__title { margin: 0; font-size: clamp(44px, 6.4vw, 96px); font-weight: var(--weight-extrabold); line-height: 1.02; letter-spacing: -0.03em; color: var(--color-ink-strong); }
.ic__desc { margin: var(--space-8) auto 0; max-width: 52ch; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }
.ic__ctas { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-4); margin-top: var(--space-10); }
.ic__cta { display: inline-flex; align-items: center; height: 56px; padding-inline: var(--space-8); border-radius: var(--radius-pill); font-size: var(--type-small); font-weight: var(--weight-semibold); text-decoration: none; transition: all var(--motion-medium) var(--ease-smooth); }
.ic__cta--solid { background: var(--color-ink-strong); color: #fff; }
.ic__cta--solid:hover { background: var(--color-accent); transform: translateY(-2px); }
.ic__cta--ghost { background: transparent; color: var(--color-ink-strong); border: 1px solid var(--color-border-strong); }
.ic__cta--ghost:hover { color: var(--color-accent); border-color: var(--color-accent); }
.ic__cta:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
</style>