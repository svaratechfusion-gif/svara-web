<script setup lang="ts">
// FEATURED INSIGHTS — editorial magazine layout: one large feature, two
// medium stories, three supporting articles. Avoids equal-sized cards.
// Article summaries are verbatim from the Content Bible (knowledge-hub).
import { FEATURED_ARTICLES } from '~/utils/blog-page'

const large = FEATURED_ARTICLES.find((a) => a.size === "large")
const mediums = FEATURED_ARTICLES.filter((a) => a.size === "medium")
const smalls = FEATURED_ARTICLES.filter((a) => a.size === "small")
</script>

<template>
  <section class="fi">
    <div class="fi__head">
      <p class="fi__eyebrow">Featured Insights</p>
      <h2 class="fi__title">Editorial perspectives on enterprise intelligence.</h2>
    </div>

    <div class="fi__grid">
      <!-- large feature -->
      <article v-if="large" class="fi__large">
        <div class="fi__cover fi__cover--large">
          <img :src="large.image" :alt="large.title" loading="lazy" >
          <span class="fi__cat">{{ large.category }}</span>
        </div>
        <div class="fi__body fi__body--large">
          <div class="fi__meta"><span>{{ large.date }}</span><span class="fi__sep" /><span>{{ large.readingTime }}</span></div>
          <h3 class="fi__title-large">{{ large.title }}</h3>
          <p class="fi__summary">{{ large.summary }}</p>
        </div>
      </article>

      <!-- two medium stories -->
      <article v-for="m in mediums" :key="m.title" class="fi__medium">
        <div class="fi__cover fi__cover--medium">
          <img :src="m.image" :alt="m.title" loading="lazy" >
          <span class="fi__cat">{{ m.category }}</span>
        </div>
        <div class="fi__body">
          <div class="fi__meta"><span>{{ m.date }}</span><span class="fi__sep" /><span>{{ m.readingTime }}</span></div>
          <h3 class="fi__title-med">{{ m.title }}</h3>
          <p class="fi__summary fi__summary--med">{{ m.summary }}</p>
        </div>
      </article>

      <!-- three supporting articles -->
      <article v-for="s in smalls" :key="s.title" class="fi__small">
        <span class="fi__small-cat">{{ s.category }}</span>
        <h4 class="fi__title-small">{{ s.title }}</h4>
        <div class="fi__meta fi__meta--small"><span>{{ s.date }}</span><span class="fi__sep" /><span>{{ s.readingTime }}</span></div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.fi { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.fi__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.fi__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.fi__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }

.fi__grid { max-width: 1180px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr; grid-template-rows: auto auto auto; gap: var(--space-6); }
.fi__large { grid-column: 1; grid-row: 1 / 3; display: flex; flex-direction: column; border-radius: var(--radius-lg); overflow: hidden; background: #fff; border: 1px solid var(--color-border); box-shadow: 0 4px 14px rgba(16, 42, 91, 0.05), 0 30px 80px rgba(16, 42, 91, 0.1); }
.fi__medium { display: flex; flex-direction: column; border-radius: var(--radius-lg); overflow: hidden; background: #fff; border: 1px solid var(--color-border); box-shadow: 0 4px 14px rgba(16, 42, 91, 0.05); }
.fi__small { padding: var(--space-6); border-radius: var(--radius-md); background: #F1F6FE; border: 1px solid var(--color-border); display: flex; flex-direction: column; gap: 6px; }
.fi__small:nth-child(4) { grid-column: 2; grid-row: 3; }
.fi__small:nth-child(5) { grid-column: 1; grid-row: 3; }
.fi__small:nth-child(6) { grid-column: 2; grid-row: 3; display: none; }

.fi__cover { position: relative; overflow: hidden; background: #0E1B33; }
.fi__cover--large { aspect-ratio: 16/9; }
.fi__cover--medium { aspect-ratio: 16/10; }
.fi__cover img { width: 100%; height: 100%; object-fit: cover; opacity: 0.85; transition: transform var(--motion-slow) var(--ease-out); }
.fi__cover:hover img { transform: scale(1.04); }
.fi__cat { position: absolute; top: 14px; left: 14px; padding: 5px 12px; border-radius: var(--radius-pill); background: rgba(16, 42, 91, 0.85); color: #fff; font-size: 11px; font-weight: var(--weight-semibold); backdrop-filter: blur(8px); }

.fi__body { padding: var(--space-8); display: flex; flex-direction: column; flex: 1; }
.fi__body--large { padding: var(--space-10); }
.fi__meta { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 11px; color: var(--color-text-faint); margin-bottom: var(--space-4); }
.fi__meta--small { margin-top: auto; }
.fi__sep { width: 3px; height: 3px; border-radius: 50%; background: var(--color-text-faint); }
.fi__title-large { margin: 0 0 var(--space-4); font-size: clamp(26px, 2.8vw, 36px); font-weight: var(--weight-extrabold); line-height: 1.15; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.fi__title-med { margin: 0 0 var(--space-3); font-size: 20px; font-weight: var(--weight-bold); line-height: 1.2; letter-spacing: -0.01em; color: var(--color-ink-strong); }
.fi__small-cat { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-accent); }
.fi__title-small { margin: 0; font-size: 16px; font-weight: var(--weight-semibold); line-height: 1.25; color: var(--color-ink-strong); }
.fi__summary { margin: 0; font-size: 14.5px; line-height: 1.6; color: var(--color-text-secondary); }
.fi__summary--med { font-size: 13.5px; }

@media (max-width: 860px) { .fi__grid { grid-template-columns: 1fr; } .fi__large { grid-column: 1; grid-row: auto; } .fi__medium { grid-column: 1; grid-row: auto; } .fi__small { grid-column: 1 !important; grid-row: auto !important; display: flex !important; } }
</style>