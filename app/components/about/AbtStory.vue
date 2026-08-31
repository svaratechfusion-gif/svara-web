<script setup lang="ts">
// ABOUT · Our Story — an immersive narrative, not a corporate timeline. Each
// chapter is its own scroll segment. The five chapter labels (The Challenge …
// The Future) are the directed structure for this section; the prose under each
// is sourced from Volume 08 messaging (companyContent) and the closing home
// narrative (homeSection07) — verbatim where quoted, composed from official
// copy otherwise. No dates, no milestones.
import { companyContent } from '~~/lib/content/company'
import { homeSection07 } from '~~/lib/content/home'

const chapters = [
  {
    label: 'The Challenge',
    text: companyContent.architecture.overview.split('. Our solution')[0] + '.',
  },
  {
    label: 'The Opportunity',
    text: 'A single connected system could replace fragmented point tools — one intelligence layer that connects every system and continuously improves operations.',
  },
  {
    label: 'The Vision',
    text: 'SVARA defines the Enterprise Intelligence Infrastructure category — establishing the framework, standards, and best practices for a new approach to operational intelligence.',
  },
  {
    label: 'The Company',
    text: 'To build the intelligence layer for enterprise operations — connecting every signal to every decision to every action to every outcome.',
  },
  {
    label: 'The Future',
    text: homeSection07.paragraphs[2]!,
  },
]
</script>

<template>
  <section class="astory">
    <header class="astory__head">
      <p v-reveal class="astory__eyebrow">Our Story</p>
      <h2 v-reveal class="astory__title" data-split>How SVARA came to be</h2>
    </header>

    <article
      v-for="(c, i) in chapters" :key="c.label"
      class="astory__chapter"
    >
      <div class="astory__chapter-inner">
        <span v-reveal class="astory__chapter-index">{{ String(i + 1).padStart(2, '0') }} / 05</span>
        <h3 v-reveal class="astory__chapter-label">{{ c.label }}</h3>
        <p v-reveal class="astory__chapter-text" data-split>{{ c.text }}</p>
      </div>
    </article>
  </section>
</template>

<style scoped>
.astory { padding-block: var(--section-y) 0; }
.astory__head { max-width: var(--container-max); margin-inline: auto; padding-inline: var(--container-pad); text-align: center; box-sizing: border-box; }
.astory__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.astory__title { margin: 0; font-size: clamp(28px, 3.4vw, 48px); font-weight: var(--weight-bold); letter-spacing: -0.02em; color: #0d1b3e; }

.astory__chapter {
  min-height: 82vh;
  display: flex; align-items: center;
  border-top: 1px solid var(--color-border);
  margin-top: var(--space-24);
}
.astory__chapter:first-of-type { margin-top: var(--space-20); }
.astory__chapter-inner { max-width: 1000px; margin-inline: auto; padding: var(--space-24) var(--container-pad); box-sizing: border-box; width: 100%; }
.astory__chapter-index { font-family: var(--font-mono); font-size: var(--type-caption); letter-spacing: 0.12em; color: var(--color-accent); }
.astory__chapter-label { margin: var(--space-6) 0 0; font-size: clamp(15px, 1.4vw, 18px); font-family: var(--font-mono); font-weight: var(--weight-medium); letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-text-faint); }
.astory__chapter-text { margin: var(--space-8) 0 0; max-width: 24ch; font-size: clamp(28px, 3.8vw, 52px); font-weight: var(--weight-bold); line-height: 1.14; letter-spacing: -0.02em; color: #0d1b3e; text-wrap: balance; }
@media (max-width: 720px) { .astory__chapter { min-height: 70vh; } }
</style>
