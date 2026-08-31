<script setup lang="ts">
// BLOG CTA — the page's close. Minimal layout, large typography, premium
// whitespace. Copy is used VERBATIM from the Content Bible (homeFinalCta).
import { blogCta } from '~/utils/blog-page'

const cta = blogCta
</script>

<template>
  <section class="bc">
    <div class="bc__inner">
      <h2 class="bc__title">{{ cta.title }}</h2>
      <p class="bc__desc">{{ cta.description }}</p>
      <div class="bc__ctas">
        <NuxtLink :to="cta.primaryCta.to" class="bc__cta bc__cta--solid">{{ cta.primaryCta.label }}</NuxtLink>
        <NuxtLink :to="cta.secondaryCta.to" class="bc__cta bc__cta--ghost">{{ cta.secondaryCta.label }}</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bc { background: #F1F6FE; padding: var(--space-40) var(--container-pad); display: flex; justify-content: center; }
.bc__inner { text-align: center; max-width: 820px; }
.bc__title { margin: 0; font-size: clamp(44px, 6.4vw, 96px); font-weight: var(--weight-extrabold); line-height: 1.02; letter-spacing: -0.03em; color: var(--color-ink-strong); }
.bc__desc { margin: var(--space-8) auto 0; max-width: 52ch; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }
.bc__ctas { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-4); margin-top: var(--space-10); }
.bc__cta { display: inline-flex; align-items: center; height: 56px; padding-inline: var(--space-8); border-radius: var(--radius-pill); font-size: var(--type-small); font-weight: var(--weight-semibold); text-decoration: none; transition: all var(--motion-medium) var(--ease-smooth); }
.bc__cta--solid { background: var(--color-ink-strong); color: #fff; }
.bc__cta--solid:hover { background: var(--color-accent); transform: translateY(-2px); }
.bc__cta--ghost { background: transparent; color: var(--color-ink-strong); border: 1px solid var(--color-border-strong); }
.bc__cta--ghost:hover { color: var(--color-accent); border-color: var(--color-accent); }
.bc__cta:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
</style>