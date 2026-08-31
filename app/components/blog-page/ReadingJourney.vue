<script setup lang="ts">
// READING JOURNEY — interactive navigation: Latest, Trending, Technical,
// Research, Case Studies, Guides. Selecting a tab filters the article
// display. Motion represents reading progress and article transitions.
import { ref } from 'vue'
import { READING_TABS, FEATURED_ARTICLES } from '~/utils/blog-page'

const active = ref(0)
</script>

<template>
  <section class="rj">
    <div class="rj__head">
      <p class="rj__eyebrow">Reading Journey</p>
      <h2 class="rj__title">Find your next read.</h2>
    </div>

    <div class="rj__tabs" role="tablist">
      <button v-for="(tab, i) in READING_TABS" :key="tab" class="rj__tab" :class="{ 'is-on': active === i }" @click="active = i">
        {{ tab }}
      </button>
      <span class="rj__glide" :style="{ transform: `translateX(${active * 100}%)` }" />
    </div>

    <div :key="active" class="rj__articles">
      <article v-for="(a, i) in FEATURED_ARTICLES.slice(0, 4)" :key="a.title" class="rj__article" :style="{ '--d': i }">
        <div class="rj__cover">
          <img :src="a.image" :alt="a.title" loading="lazy" >
        </div>
        <div class="rj__body">
          <span class="rj__cat">{{ a.category }}</span>
          <h3 class="rj__name">{{ a.title }}</h3>
          <div class="rj__meta"><span>{{ a.date }}</span><span class="rj__sep" /><span>{{ a.readingTime }}</span></div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.rj { background: #F1F6FE; padding: var(--space-32) var(--container-pad); }
.rj__head { max-width: 760px; margin: 0 auto var(--space-12); text-align: center; }
.rj__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.rj__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }

.rj__tabs { position: relative; display: flex; max-width: 760px; margin: 0 auto var(--space-12); border-radius: var(--radius-pill); background: #fff; border: 1px solid var(--color-border); padding: 4px; overflow: hidden; }
.rj__tab { position: relative; z-index: 2; flex: 1; padding: 10px 4px; border: none; background: transparent; font-size: 13px; font-weight: var(--weight-semibold); color: var(--color-text-secondary); cursor: pointer; transition: color var(--motion-medium) var(--ease-smooth); white-space: nowrap; }
.rj__tab.is-on { color: #fff; }
.rj__glide { position: absolute; z-index: 1; top: 4px; left: 4px; width: calc((100% - 8px) / 6); height: calc(100% - 8px); border-radius: var(--radius-pill); background: var(--color-ink-strong); transition: transform var(--motion-medium) var(--ease-out); }

.rj__articles { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-6); max-width: 1180px; margin: 0 auto; }
.rj__article { display: flex; flex-direction: column; border-radius: var(--radius-lg); overflow: hidden; background: #fff; border: 1px solid var(--color-border); box-shadow: 0 4px 14px rgba(16, 42, 91, 0.05); animation: rj-reveal 0.4s var(--ease-out) backwards; animation-delay: calc(var(--d, 0) * 0.08s); }
@keyframes rj-reveal { from { opacity: 0; transform: translateY(16px); } }
.rj__cover { aspect-ratio: 16/10; overflow: hidden; background: #0E1B33; }
.rj__cover img { width: 100%; height: 100%; object-fit: cover; opacity: 0.85; transition: transform var(--motion-slow) var(--ease-out); }
.rj__article:hover .rj__cover img { transform: scale(1.04); }
.rj__body { padding: var(--space-5) var(--space-6) var(--space-6); display: flex; flex-direction: column; gap: 6px; }
.rj__cat { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-accent); }
.rj__name { margin: 0; font-size: 16px; font-weight: var(--weight-bold); line-height: 1.25; color: var(--color-ink-strong); letter-spacing: -0.01em; }
.rj__meta { display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 10px; color: var(--color-text-faint); margin-top: auto; }
.rj__sep { width: 3px; height: 3px; border-radius: 50%; background: var(--color-text-faint); }
@media (max-width: 768px) { .rj__tabs { overflow-x: auto; } .rj__tab { font-size: 11px; padding: 8px 2px; } }
@media (prefers-reduced-motion: reduce) { .rj__article { animation: none; } }
</style>