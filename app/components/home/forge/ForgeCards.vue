<script setup lang="ts">
// CONTENT CARDS + CATEGORY TAG BADGES + THE PLASMA HERO CARD.
//
// Limestone surfaces at 40px radius and 40px padding, each opening with a Sulfur pill
// tag — "the only yellow element in the system" — and a compressed headline. The image
// area at the top of a card carries the halftone motif over Ember or Obsidian, with the
// card's index set in the compressed display face — the reference builds its image areas
// from the graphic system rather than photography, so no stock imagery is invented.
//
// The Plasma card appears ONCE, as the reference requires: "used sparingly — a
// signature visual anchor."
import ForgeHalftone from './ForgeHalftone.vue'
import { SVARA_OS } from '~/utils/svara-os'

/** The image areas alternate so the grid never reads as four identical orange panels. */
const BLOCK_TONES = ['ember', 'obsidian', 'sulfur'] as const

const cards = ['vision', 'twin', 'aios'].map((id) => {
  const p = SVARA_OS.find(x => x.id === id)!
  return { id, tag: p.category, title: p.short, body: p.tagline, to: p.to }
})
</script>

<template>
  <section class="fg fg-cards" aria-label="Flagship systems">
    <div class="fg__wrap">
      <h2 class="fg-h2">THE STACK</h2>

      <div class="fg-cards__grid">
        <!-- the single plasma anchor -->
        <article class="fg-card fg-card--plasma">
          <ForgeHalftone tone="plasma" />
          <div class="fg-card__body">
            <span class="fg-tag">Platform</span>
            <h3 class="fg-card__title">ONE ENGINEERED STACK</h3>
            <p class="fg-card__meta">Ten platforms · one backbone</p>
          </div>
        </article>

        <NuxtLink v-for="(c, i) in cards" :key="c.id" :to="c.to" class="fg-card">
          <span class="fg-card__block" :class="`fg-card__block--${BLOCK_TONES[i]}`" aria-hidden="true">
            <b class="fg-card__n">{{ String(i + 2).padStart(2, '0') }}</b>
          </span>
          <div class="fg-card__body">
            <span class="fg-tag">{{ c.tag }}</span>
            <h3 class="fg-card__title">{{ c.title }}</h3>
            <p class="fg-card__meta">{{ c.body }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
