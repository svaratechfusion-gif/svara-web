<script setup lang="ts">
// ABOUT · Final CTA — headline + support verbatim from the Content Bible final
// CTA (homeFinalCta.title / description). Button labels and targets follow the
// About-page brief exactly: Primary "Explore Ecosystem" (/ecosystem), Secondary
// "Contact SVARA" (/contact).
import { homeFinalCta } from '~~/lib/content/home'
</script>

<template>
  <section class="acta">
    <div class="acta__inner">
      <h2 v-reveal class="acta__title" data-split>{{ homeFinalCta.title }}</h2>
      <p v-reveal class="acta__sub">{{ homeFinalCta.description }}</p>
      <div v-reveal class="acta__actions">
        <NuxtLink to="/ecosystem" class="acta__btn acta__btn--primary">Explore Ecosystem <span aria-hidden="true">→</span></NuxtLink>
        <NuxtLink to="/contact" class="acta__btn acta__btn--ghost">Contact SVARA</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.acta { padding-block: calc(var(--section-y) * 1.2); }
.acta__inner { max-width: 900px; margin-inline: auto; padding-inline: var(--container-pad); box-sizing: border-box; text-align: center; }
.acta__title { margin: 0; font-size: clamp(34px, 5.2vw, 74px); font-weight: var(--weight-extrabold); line-height: 1.05; letter-spacing: -0.03em; color: #0d1b3e; text-wrap: balance; }
.acta__sub { margin: var(--space-8) auto 0; max-width: 46ch; font-size: var(--type-lead); line-height: var(--leading-body); color: var(--color-text-secondary); }
.acta__actions { margin-top: var(--space-12); display: inline-flex; flex-wrap: wrap; gap: var(--space-4); justify-content: center; }
.acta__btn { display: inline-flex; align-items: center; gap: 8px; height: 56px; padding-inline: var(--space-8); border-radius: var(--radius-pill); font-size: var(--type-body); font-weight: var(--weight-semibold); text-decoration: none; transition: transform var(--motion-fast) var(--ease-smooth), background var(--motion-medium) var(--ease-smooth), border-color var(--motion-medium) var(--ease-smooth), color var(--motion-medium) var(--ease-smooth); }
.acta__btn--primary { background: #102A5B; color: #fff; }
.acta__btn--primary:hover { background: var(--color-accent); transform: translateY(-2px); }
.acta__btn--ghost { border: 1px solid var(--color-border); color: #0d1b3e; }
.acta__btn--ghost:hover { border-color: var(--color-accent); color: var(--color-accent); }
</style>
