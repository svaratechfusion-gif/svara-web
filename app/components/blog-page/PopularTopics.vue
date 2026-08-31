<script setup lang="ts">
// POPULAR TOPICS — interactive topic chips. Hover previews relevant
// articles. Motion represents curiosity and discovery.
import { ref } from 'vue'
import { POPULAR_TOPICS, FEATURED_ARTICLES } from '~/utils/blog-page'

const hovered = ref<number | null>(null)

// find a relevant article for the hovered topic by matching against
// article category or title keywords
function relevantArticles(i: number) {
  const topic = POPULAR_TOPICS[i]!
  const matches = FEATURED_ARTICLES.filter((a) =>
    a.category.toLowerCase().includes(topic.toLowerCase().split(" ")[0]!) ||
    a.title.toLowerCase().includes(topic.toLowerCase().split(" ")[0]!),
  )
  return matches.length > 0 ? matches : FEATURED_ARTICLES.slice(0, 2)
}
</script>

<template>
  <section class="pt">
    <div class="pt__head">
      <p class="pt__eyebrow">Popular Topics</p>
      <h2 class="pt__title">What the enterprise AI world is reading.</h2>
    </div>

    <div class="pt__chips">
      <button
        v-for="(t, i) in POPULAR_TOPICS" :key="t"
        class="pt__chip"
        :class="{ 'is-hot': hovered === i }"
        @mouseenter="hovered = i"
        @mouseleave="hovered = null"
      >{{ t }}</button>
    </div>

    <Transition name="pt-preview">
      <div v-if="hovered !== null" :key="hovered" class="pt__preview">
        <div v-for="a in relevantArticles(hovered)" :key="a.title" class="pt__preview-item">
          <span class="pt__preview-cat">{{ a.category }}</span>
          <span class="pt__preview-title">{{ a.title }}</span>
          <span class="pt__preview-time">{{ a.readingTime }}</span>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.pt { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.pt__head { max-width: 760px; margin: 0 auto var(--space-12); text-align: center; }
.pt__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.pt__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }

.pt__chips { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; max-width: 900px; margin: 0 auto; }
.pt__chip { padding: 10px 20px; border-radius: var(--radius-pill); background: #fff; border: 1px solid var(--color-border); font-size: 14px; font-weight: var(--weight-medium); color: var(--color-text-secondary); cursor: pointer; transition: all var(--motion-medium) var(--ease-out); }
.pt__chip:hover, .pt__chip.is-hot { background: var(--color-ink-strong); color: #fff; border-color: var(--color-ink-strong); transform: translateY(-2px); box-shadow: 0 8px 22px rgba(16, 42, 91, 0.14); }

.pt__preview { max-width: 760px; margin: var(--space-8) auto 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-5); }
.pt__preview-item { display: flex; flex-direction: column; gap: 4px; padding: var(--space-5); border-radius: var(--radius-md); background: #F1F6FE; border: 1px solid var(--color-border); }
.pt__preview-cat { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-accent); }
.pt__preview-title { font-size: 15px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); line-height: 1.3; }
.pt__preview-time { font-family: var(--font-mono); font-size: 10px; color: var(--color-text-faint); }

.pt-preview-enter-active, .pt-preview-leave-active { transition: opacity var(--motion-medium) var(--ease-smooth), transform var(--motion-medium) var(--ease-out); }
.pt-preview-enter-from, .pt-preview-leave-to { opacity: 0; transform: translateY(8px); }
</style>