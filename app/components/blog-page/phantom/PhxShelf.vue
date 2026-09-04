<script setup lang="ts">
/**
 * ONE PUBLICATION LINE — Blog, White Papers, Product Engineering, Architecture
 * Series, Industry Reports, Technical Notes. The shelves and their order come from
 * `insightSections()`, so a new piece lands in its section on publication and
 * nothing here enumerates a title.
 *
 * THREE PRESENTATIONS, as before, because the lines genuinely differ:
 *  · articles carry banner artwork, so they lead with the picture;
 *  · notes are a numbered series read in order, so they are rows;
 *  · papers, briefs and reports have no cover art, so they list as documents.
 * All three now sit in the reference's soft geometry — 24px sheets, hairline ash
 * borders, no shadows.
 */
import type { InsightSection } from '~~/lib/content/insights'

defineProps<{
  section: InsightSection
  index: number
  noteN: Map<string, string | number>
}>()
</script>

<template>
  <div>
    <div class="phx__head">
      <span class="phx__chiplet">{{ String(index + 1).padStart(2, '0') }} · {{ section.label }}</span>
      <h2 class="phx__h2" style="margin-top: 18px">{{ section.title }}</h2>
      <p class="phx__lede">{{ section.blurb }}</p>
      <p class="phx__cap" style="margin-top: 10px">{{ String(section.items.length).padStart(2, '0') }} published</p>
    </div>

    <!-- ARTICLES — the only line with artwork -->
    <ul v-if="section.line === 'article'" class="phx__grid">
      <li v-for="post in section.items" :key="post.slug">
        <NuxtLink :to="`/insights/${post.slug}`" class="phx__sheet">
          <!-- alt="": the headline beneath already names the piece -->
          <span v-if="post.heroImage" class="phx__shot">
            <picture>
              <source :srcset="`/images/insights/${post.heroImage.name}.webp`" type="image/webp">
              <img
                :src="`/images/insights/${post.heroImage.name}.png`" alt=""
                :width="post.heroImage.width" :height="post.heroImage.height"
                loading="lazy" decoding="async"
              >
            </picture>
          </span>
          <span class="phx__chiplet">{{ post.category }}</span>
          <h3 class="phx__h3">{{ post.title }}</h3>
          <p class="phx__body">{{ post.dek }}</p>
          <span class="phx__meta">{{ post.readingTime }} read</span>
        </NuxtLink>
      </li>
    </ul>

    <!-- TECHNICAL NOTES — a numbered series, read in order -->
    <div v-else-if="section.line === 'note'" class="phx__sheet">
      <ul class="phx__rows">
        <li v-for="note in section.items" :key="note.slug">
          <NuxtLink :to="`/insights/${note.slug}`" class="phx__row">
            <span class="phx__row-n">{{ noteN.get(note.slug) }}</span>
            <span>
              <h3 class="phx__h3">{{ note.title }}</h3>
              <span class="phx__body">{{ note.subtitle }}</span>
            </span>
            <span class="phx__cap phx__row-time">{{ note.readingTime }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- LONG-FORM — number, imprint, title, extent -->
    <div v-else class="phx__sheet">
      <ul class="phx__rows">
        <li v-for="(doc, i) in section.items" :key="doc.slug">
          <NuxtLink :to="`/insights/${doc.slug}`" class="phx__row">
            <span class="phx__row-n">{{ String(i + 1).padStart(2, '0') }}</span>
            <span>
              <span class="phx__cap">{{ doc.imprint?.label ?? doc.contentType }}</span>
              <h3 class="phx__h3">{{ doc.title }}</h3>
              <span class="phx__body">{{ doc.dek }}</span>
            </span>
            <span class="phx__cap phx__row-time">
              <span v-if="doc.extent">{{ doc.extent }} · </span>{{ doc.readingTime }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
