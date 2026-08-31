<script setup lang="ts">
// KNOWLEDGE LIBRARY — showcase additional resource types: Whitepapers,
// Case Studies, Product Guides, Technical Documentation, Webinars, Research
// Reports. Connected visually to the Resource Center. Resource type names
// are from the brief (factual identifiers, not marketing copy).
import { RESOURCE_TYPES } from '~/utils/blog-page'
</script>

<template>
  <section class="kl">
    <div class="kl__head">
      <p class="kl__eyebrow">Knowledge Library</p>
      <h2 class="kl__title">Beyond articles — the full resource library.</h2>
      <p class="kl__sub">Explore deeper materials that go beyond the blog — from technical whitepapers to on-demand webinars.</p>
    </div>

    <div class="kl__grid">
      <div v-for="r in RESOURCE_TYPES" :key="r.name" class="kl__card">
        <span class="kl__icon" aria-hidden="true">📄</span>
        <h3 class="kl__name">{{ r.name }}</h3>
        <span class="kl__tag">{{ r.tag }}</span>
      </div>
    </div>

    <NuxtLink to="/knowledge/faq" class="kl__link">
      <span>Explore the Resource Center</span>
      <span class="kl__arrow" aria-hidden="true">→</span>
    </NuxtLink>
  </section>
</template>

<style scoped>
.kl { background: #F1F6FE; padding: var(--space-32) var(--container-pad); }
.kl__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.kl__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.kl__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.kl__sub { margin: var(--space-5) 0 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.kl__grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--space-5); }
.kl__card { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: var(--space-8); border-radius: var(--radius-lg); background: #fff; border: 1px solid var(--color-border); text-align: center; transition: all var(--motion-medium) var(--ease-out); }
.kl__card:hover { transform: translateY(-4px); border-color: rgba(47, 127, 230, 0.3); box-shadow: 0 8px 24px rgba(16, 42, 91, 0.1); }
.kl__icon { font-size: 28px; }
.kl__name { margin: 0; font-size: 16px; font-weight: var(--weight-bold); color: var(--color-ink-strong); letter-spacing: -0.01em; }
.kl__tag { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text-faint); }

.kl__link { display: inline-flex; align-items: center; gap: var(--space-3); margin: var(--space-12) auto 0; padding: 12px 28px; border-radius: var(--radius-pill); background: var(--color-ink-strong); color: #fff; font-size: 15px; font-weight: var(--weight-semibold); text-decoration: none; transition: all var(--motion-medium) var(--ease-smooth); }
.kl__link:hover { background: var(--color-accent); transform: translateY(-2px); }
.kl__arrow { transition: transform var(--motion-medium) var(--ease-smooth); }
.kl__link:hover .kl__arrow { transform: translateX(4px); }
</style>