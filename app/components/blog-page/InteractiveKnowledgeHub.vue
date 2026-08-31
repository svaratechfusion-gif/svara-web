<script setup lang="ts">
// INTERACTIVE KNOWLEDGE HUB — left-side category navigation, right panel
// dynamically updates with featured article, cover image, reading time,
// publish date, summary, and related articles. Category names are from the
// brief; article summaries are sourced verbatim from the Content Bible
// (knowledge-hub use cases + architecture components).
import { ref, computed } from 'vue'
import { CATEGORIES, FEATURED_ARTICLES } from '~/utils/blog-page'

const active = ref(0)
const selectedCat = computed(() => CATEGORIES[active.value]!)

// articles in the selected category (or closest match)
const featured = computed(() => {
  const match = FEATURED_ARTICLES.find((a) => a.category === selectedCat.value)
  return match ?? FEATURED_ARTICLES[active.value % FEATURED_ARTICLES.length]!
})

// related articles — other categories
const related = computed(() => FEATURED_ARTICLES.filter((a) => a.category !== featured.value.category).slice(0, 3))
</script>

<template>
  <section class="kh">
    <div class="kh__head">
      <p class="kh__eyebrow">Interactive Knowledge Hub</p>
      <h2 class="kh__title">Browse by category. Read by interest.</h2>
    </div>

    <div class="kh__layout">
      <ul class="kh__nav" role="list">
        <li v-for="(cat, i) in CATEGORIES" :key="cat" class="kh__item" :class="{ 'is-on': active === i }">
          <button @click="active = i">
            <span class="kh__item-dot" />{{ cat }}
          </button>
        </li>
      </ul>

      <div :key="featured.category" class="kh__panel">
        <div class="kh__article">
          <div class="kh__cover">
            <img :src="featured.image" :alt="featured.title" loading="lazy" >
            <span class="kh__cover-cat">{{ featured.category }}</span>
          </div>
          <div class="kh__article-body">
            <div class="kh__meta">
              <span class="kh__date">{{ featured.date }}</span>
              <span class="kh__dot" />
              <span class="kh__time">{{ featured.readingTime }}</span>
            </div>
            <h3 class="kh__article-title">{{ featured.title }}</h3>
            <p class="kh__summary">{{ featured.summary }}</p>
            <span class="kh__read">Read article →</span>
          </div>
        </div>

        <div class="kh__related">
          <h4 class="kh__related-label">Related Articles</h4>
          <div v-for="r in related" :key="r.title" class="kh__related-item">
            <span class="kh__related-cat">{{ r.category }}</span>
            <span class="kh__related-title">{{ r.title }}</span>
            <span class="kh__related-time">{{ r.readingTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.kh { background: #F1F6FE; padding: var(--space-32) var(--container-pad); }
.kh__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.kh__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.kh__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }

.kh__layout { display: grid; grid-template-columns: 280px 1fr; gap: var(--space-12); max-width: 1180px; margin: var(--space-16) auto 0; align-items: start; }
.kh__nav { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 3px; position: sticky; top: var(--space-8); }
.kh__item button { display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 14px; background: transparent; border: 1px solid transparent; border-radius: var(--radius-sm); font-size: 13.5px; font-weight: var(--weight-medium); color: var(--color-text-secondary); text-align: left; cursor: pointer; transition: all var(--motion-medium) var(--ease-smooth); }
.kh__item button:hover { background: rgba(47, 127, 230, 0.06); color: var(--color-ink-strong); }
.kh__item.is-on button { background: var(--color-ink-strong); color: #fff; }
.kh__item-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--color-accent); box-shadow: 0 0 0 3px rgba(47,127,230,0.16); flex-shrink: 0; }
.kh__item.is-on .kh__item-dot { background: #fff; }

.kh__panel { background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; box-shadow: 0 4px 14px rgba(16, 42, 91, 0.05), 0 30px 80px rgba(16, 42, 91, 0.08); animation: kh-fade 0.4s var(--ease-out); }
@keyframes kh-fade { from { opacity: 0; transform: translateY(12px); } }
.kh__article { display: grid; grid-template-columns: 1fr 1fr; }
.kh__cover { position: relative; aspect-ratio: 4/3; overflow: hidden; background: #0E1B33; }
.kh__cover img { width: 100%; height: 100%; object-fit: cover; opacity: 0.85; transition: transform var(--motion-slow) var(--ease-out); }
.kh__cover:hover img { transform: scale(1.04); }
.kh__cover-cat { position: absolute; top: 14px; left: 14px; padding: 5px 12px; border-radius: var(--radius-pill); background: rgba(16, 42, 91, 0.85); color: #fff; font-size: 11px; font-weight: var(--weight-semibold); backdrop-filter: blur(8px); }
.kh__article-body { padding: var(--space-10); display: flex; flex-direction: column; }
.kh__meta { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 11px; color: var(--color-text-faint); margin-bottom: var(--space-5); }
.kh__dot { width: 3px; height: 3px; border-radius: 50%; background: var(--color-text-faint); }
.kh__article-title { margin: 0 0 var(--space-4); font-size: clamp(22px, 2.4vw, 30px); font-weight: var(--weight-extrabold); line-height: 1.15; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.kh__summary { margin: 0 0 var(--space-6); font-size: 14.5px; line-height: 1.6; color: var(--color-text-secondary); }
.kh__read { margin-top: auto; font-size: 14px; font-weight: var(--weight-semibold); color: var(--color-accent); }

.kh__related { padding: var(--space-8); border-top: 1px solid var(--color-border); background: #F8FBFF; }
.kh__related-label { margin: 0 0 var(--space-5); font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text-faint); }
.kh__related-item { display: flex; align-items: baseline; gap: 10px; padding: var(--space-3) 0; border-top: 1px dashed var(--color-border); }
.kh__related-cat { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-accent); flex-shrink: 0; width: 100px; }
.kh__related-title { font-size: 14px; font-weight: var(--weight-medium); color: var(--color-ink-strong); flex: 1; }
.kh__related-time { font-family: var(--font-mono); font-size: 10px; color: var(--color-text-faint); flex-shrink: 0; }

@media (max-width: 860px) { .kh__layout { grid-template-columns: 1fr; } .kh__nav { position: static; flex-direction: row; flex-wrap: wrap; } .kh__item { flex: 1 1 45%; } .kh__article { grid-template-columns: 1fr; } }
</style>