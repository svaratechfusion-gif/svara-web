<script setup lang="ts">
// ARCHITECTURE CTA — the page's close. Minimal layout, large typography,
// premium whitespace. Copy is used VERBATIM from the Content Bible
// (homeFinalCta). No rewriting or shortening.
import { archCta } from '~/utils/architecture'

const cta = archCta
</script>

<template>
  <section class="ac">
    <div class="ac__inner">
      <h2 class="ac__title">{{ cta.title }}</h2>
      <p class="ac__desc">{{ cta.description }}</p>
      <div class="ac__ctas">
        <NuxtLink :to="cta.primaryCta.to" class="ac__cta ac__cta--solid">{{ cta.primaryCta.label }}</NuxtLink>
        <NuxtLink :to="cta.secondaryCta.to" class="ac__cta ac__cta--ghost">{{ cta.secondaryCta.label }}</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ac { background: #F8FBFF; padding: var(--space-40) var(--container-pad); display: flex; justify-content: center; }
.ac__inner { text-align: center; max-width: 820px; }
.ac__title { margin: 0; font-size: clamp(44px, 6.4vw, 96px); font-weight: var(--weight-extrabold); line-height: 1.02; letter-spacing: -0.03em; color: var(--color-ink-strong); }
.ac__desc { margin: var(--space-8) auto 0; max-width: 52ch; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }
.ac__ctas { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-4); margin-top: var(--space-10); }
.ac__cta { display: inline-flex; align-items: center; height: 56px; padding-inline: var(--space-8); border-radius: var(--radius-pill); font-size: var(--type-small); font-weight: var(--weight-semibold); text-decoration: none; transition: background var(--motion-medium) var(--ease-smooth), transform var(--motion-fast) var(--ease-smooth), color var(--motion-medium) var(--ease-smooth), border-color var(--motion-medium) var(--ease-smooth); }
.ac__cta--solid { background: var(--color-ink-strong); color: #fff; }
.ac__cta--solid:hover { background: var(--color-accent); transform: translateY(-2px); }
.ac__cta--ghost { background: transparent; color: var(--color-ink-strong); border: 1px solid var(--color-border-strong); }
.ac__cta--ghost:hover { color: var(--color-accent); border-color: var(--color-accent); }
.ac__cta:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
</style>