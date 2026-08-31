<script setup lang="ts">
// CAREERS CTA — the page's close. Minimal layout, large typography,
// premium whitespace. Copy is used VERBATIM from the Content Bible
// (homeFinalCta). No rewriting or shortening.
import { careersCta } from '~/utils/careers-page'

const cta = careersCta
</script>

<template>
  <section class="cc">
    <div class="cc__inner">
      <h2 class="cc__title">{{ cta.title }}</h2>
      <p class="cc__desc">{{ cta.description }}</p>
      <div class="cc__ctas">
        <NuxtLink :to="cta.primaryCta.to" class="cc__cta cc__cta--solid">{{ cta.primaryCta.label }}</NuxtLink>
        <NuxtLink :to="cta.secondaryCta.to" class="cc__cta cc__cta--ghost">{{ cta.secondaryCta.label }}</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cc { background: #F8FBFF; padding: var(--space-40) var(--container-pad); display: flex; justify-content: center; }
.cc__inner { text-align: center; max-width: 820px; }
.cc__title { margin: 0; font-size: clamp(44px, 6.4vw, 96px); font-weight: var(--weight-extrabold); line-height: 1.02; letter-spacing: -0.03em; color: var(--color-ink-strong); }
.cc__desc { margin: var(--space-8) auto 0; max-width: 52ch; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }
.cc__ctas { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-4); margin-top: var(--space-10); }
.cc__cta { display: inline-flex; align-items: center; height: 56px; padding-inline: var(--space-8); border-radius: var(--radius-pill); font-size: var(--type-small); font-weight: var(--weight-semibold); text-decoration: none; transition: all var(--motion-medium) var(--ease-smooth); }
.cc__cta--solid { background: var(--color-ink-strong); color: #fff; }
.cc__cta--solid:hover { background: var(--color-accent); transform: translateY(-2px); }
.cc__cta--ghost { background: transparent; color: var(--color-ink-strong); border: 1px solid var(--color-border-strong); }
.cc__cta--ghost:hover { color: var(--color-accent); border-color: var(--color-accent); }
.cc__cta:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
</style>