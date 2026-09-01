<script setup lang="ts">
// TECHNICAL NOTE — the short-form treatment.
//
// Deliberately the quietest design in the system. A note is a page or two, so it gets no
// cover, no contents page and no numbered sections: a table of contents for a 600-word
// essay is furniture, not navigation. What it does get is the thing a series needs —
// a rail showing where you are among the notes, and a way to the next one.
//
// Typography is Inter at a generous size on a warm ground: this is the reading-chair end
// of the ecosystem, not the boardroom (report) or the workshop (schematic).
import { computed } from 'vue'
import type { Insight } from '~~/lib/content/insights'
import { seriesNotes } from '~~/lib/content/insights'

const props = defineProps<{ insight: Insight, publishedLabel: string }>()
const a = props.insight

const notes = computed(() => seriesNotes())
const index = computed(() => notes.value.findIndex(n => n.slug === a.slug))
const current = computed(() => notes.value[index.value])
const next = computed(() => notes.value[index.value + 1])
const prev = computed(() => notes.value[index.value - 1])

useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap' },
  ],
})
</script>

<template>
  <article class="note">
    <div class="note__sheet">
      <nav class="note__crumb" aria-label="Breadcrumb">
        <NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">/</span>
        <NuxtLink to="/blog">Insights</NuxtLink><span aria-hidden="true">/</span>
        <span aria-current="page">Technical Notes</span>
      </nav>

      <!-- the series rail: where this note sits among the others -->
      <nav class="note__rail" aria-label="Technical Notes series">
        <span class="note__rail-label">Technical Notes</span>
        <ol>
          <li v-for="n in notes" :key="n.slug">
            <NuxtLink
              :to="`/insights/${n.slug}`"
              :class="{ 'is-current': n.slug === a.slug }"
              :aria-current="n.slug === a.slug ? 'page' : undefined"
              :title="n.title"
            >{{ n.n }}</NuxtLink>
          </li>
        </ol>
      </nav>

      <header class="note__head">
        <p class="note__n">{{ current?.n }}</p>
        <h1 class="note__title">{{ a.title }}</h1>
        <p class="note__standfirst">{{ a.subtitle }}</p>
        <p class="note__meta">
          <time :datetime="a.published">{{ publishedLabel }}</time>
          <span aria-hidden="true">·</span>
          <span>{{ a.readingTime }}</span>
        </p>
      </header>

      <div class="note__body">
        <template v-for="(b, i) in a.blocks" :key="i">
          <h2 v-if="b.kind === 'h2'" :id="b.id" class="note__h2">{{ b.text }}</h2>
          <h3 v-else-if="b.kind === 'h3'" :id="b.id" class="note__h3">{{ b.text }}</h3>
          <p v-else-if="b.kind === 'p'" class="note__p">{{ b.text }}</p>

          <aside v-else-if="b.kind === 'statement'" class="note__pull">
            <p v-if="b.label" class="note__pull-label">{{ b.label }}</p>
            <p class="note__pull-text">{{ b.text }}</p>
          </aside>

          <ul v-else-if="b.kind === 'ul'" class="note__list">
            <li v-for="(it, j) in b.items" :key="j">{{ it }}</li>
          </ul>
          <ol v-else-if="b.kind === 'ol'" class="note__list note__list--num">
            <li v-for="(it, j) in b.items" :key="j">{{ it }}</li>
          </ol>

          <dl v-else-if="b.kind === 'defs'" class="note__defs">
            <template v-for="(d, j) in b.items" :key="j">
              <dt>{{ d.term }}</dt><dd>{{ d.text }}</dd>
            </template>
          </dl>

          <ol v-else-if="b.kind === 'flow'" class="note__flow" aria-label="Sequence">
            <li v-for="(st, j) in b.steps" :key="j" v-reveal="{ delay: j * 0.05, y: 8 }">{{ st }}</li>
          </ol>
        </template>

        <div class="note__closing">
          <p v-for="(p, i) in a.closing.paragraphs" :key="i">{{ p }}</p>
        </div>
      </div>

      <!-- the series continues -->
      <nav class="note__next" aria-label="Series navigation">
        <NuxtLink v-if="prev" :to="`/insights/${prev.slug}`" class="note__next-link">
          <span class="note__next-dir">← Previous · {{ prev.n }}</span>
          <span class="note__next-title">{{ prev.title }}</span>
        </NuxtLink>
        <NuxtLink v-if="next" :to="`/insights/${next.slug}`" class="note__next-link note__next-link--fwd">
          <span class="note__next-dir">Next · {{ next.n }} →</span>
          <span class="note__next-title">{{ next.title }}</span>
        </NuxtLink>
      </nav>

      <aside class="note__cta">
        <p class="note__cta-head">{{ a.cta.headline }}</p>
        <p class="note__cta-body">{{ a.cta.body }}</p>
        <div class="note__cta-links">
          <NuxtLink v-for="l in a.cta.links" :key="l.to" :to="l.to">{{ l.label }}<span aria-hidden="true">→</span></NuxtLink>
        </div>
      </aside>
    </div>
  </article>
</template>

<style scoped>
.note {
  --paper: #f7f6f2;
  --ink: #14161c;
  --ink-soft: #545a68;
  --rule: rgba(20, 22, 28, 0.14);
  --rule-soft: rgba(20, 22, 28, 0.08);
  --sig: #1b3bc4;
  background: var(--paper);
  color: var(--ink);
  padding: calc(var(--nav-height, 80px) + 32px) clamp(16px, 4vw, 48px) clamp(60px, 10vh, 110px);
}
.note :is(p, h1, h2, h3, li, dt, dd, a, span, time) {
  font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
}
/* a note is one column and stays narrow — this is the reading-chair end of the system */
.note__sheet { max-width: 720px; margin-inline: auto; }

.note__crumb { display: flex; gap: 8px; margin: 0 0 26px; font-size: 11px !important; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft); }
.note__crumb a { color: inherit; text-decoration: none; }
.note__crumb a:hover { color: var(--sig); }

/* series rail */
.note__rail { display: flex; align-items: center; gap: 16px; padding-bottom: 14px; border-bottom: 1px solid var(--rule); }
.note__rail-label { font-size: 10px !important; font-weight: 600 !important; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-soft); }
.note__rail ol { margin: 0; padding: 0; list-style: none; display: flex; gap: 6px; }
.note__rail a {
  display: grid; place-items: center; width: 30px; height: 30px;
  border: 1px solid var(--rule); font-size: 11px; font-weight: 500 !important;
  color: var(--ink-soft); text-decoration: none;
}
.note__rail a:hover { border-color: var(--sig); color: var(--sig); }
.note__rail a.is-current { background: var(--sig); border-color: var(--sig); color: #fff; }

.note__head { padding: clamp(30px, 6vh, 60px) 0 clamp(22px, 4vh, 40px); border-bottom: 1px solid var(--rule-soft); }
.note__n { margin: 0 0 14px; font-size: 11px !important; font-weight: 600 !important; letter-spacing: 0.2em; color: var(--sig); }
.note .note__title { margin: 0 0 16px; font-weight: 600 !important; font-size: clamp(28px, 4.6vw, 48px) !important; line-height: 1.08 !important; letter-spacing: -0.025em !important; }
.note__standfirst { margin: 0 0 22px; font-weight: 300 !important; font-size: clamp(16px, 2vw, 21px); line-height: 1.45; color: var(--ink-soft); }
.note__meta { margin: 0; display: flex; gap: 10px; font-size: 11px !important; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft); }

.note__body { padding: clamp(24px, 5vh, 44px) 0; }
.note .note__h2 { margin: 34px 0 12px; font-weight: 600 !important; font-size: clamp(17px, 2vw, 21px) !important; scroll-margin-top: calc(var(--nav-height, 80px) + 20px); }
.note .note__h3 { margin: 26px 0 10px; font-weight: 600 !important; font-size: 15px !important; color: var(--sig); }
.note__p { margin: 0 0 17px; font-size: clamp(15px, 1.6vw, 17.5px); line-height: 1.78; color: var(--ink-soft); }

.note__list { margin: 0 0 20px; padding-left: 0; list-style: none; }
.note__list li { position: relative; padding-left: 20px; margin-bottom: 8px; font-size: clamp(14.5px, 1.5vw, 16.5px); line-height: 1.65; color: var(--ink-soft); }
.note__list li::before { content: ''; position: absolute; left: 3px; top: 0.66em; width: 5px; height: 5px; border-radius: 50%; background: var(--sig); }
.note__list--num { counter-reset: n; }
.note__list--num li::before { content: counter(n); counter-increment: n; left: 0; top: 0; width: auto; height: auto; border-radius: 0; background: none; color: var(--sig); font-size: 11px; font-weight: 600; }

.note__defs { margin: 0 0 20px; }
.note__defs dt { margin-top: 14px; font-weight: 600 !important; font-size: 15px; color: var(--ink); }
.note__defs dd { margin: 4px 0 0; padding-left: 14px; border-left: 2px solid var(--rule-soft); font-size: 15px; line-height: 1.65; color: var(--ink-soft); }

/* the one loud element a note gets */
.note__pull { margin: 30px 0; padding: 22px 0; border-top: 2px solid var(--ink); border-bottom: 1px solid var(--rule); }
.note__pull-label { margin: 0 0 8px; font-size: 10px !important; font-weight: 600 !important; letter-spacing: 0.18em; text-transform: uppercase; color: var(--sig); }
.note__pull-text { margin: 0; font-weight: 400 !important; font-size: clamp(18px, 2.4vw, 25px); line-height: 1.32; color: var(--ink); }

.note__flow { margin: 22px 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 0; }
.note__flow li { position: relative; padding: 10px 0 10px 26px; font-size: 12px; font-weight: 500 !important; letter-spacing: 0.08em; text-transform: uppercase; border-bottom: 1px solid var(--rule-soft); }
.note__flow li::before { content: ''; position: absolute; left: 4px; top: 50%; width: 7px; height: 7px; margin-top: -3.5px; border-radius: 50%; border: 1px solid var(--sig); }
.note__flow li:last-child::before { background: var(--sig); }

.note__closing { margin-top: 34px; padding-top: 24px; border-top: 1px solid var(--rule); }
.note__closing p { margin: 0 0 14px; font-size: clamp(15px, 1.6vw, 17.5px); line-height: 1.7; color: var(--ink); }

/* series navigation */
.note__next { display: grid; gap: 1px; margin-top: clamp(30px, 5vh, 56px); background: var(--rule-soft); border: 1px solid var(--rule); }
@media (min-width: 640px) { .note__next { grid-template-columns: 1fr 1fr; } }
/* N1 has no previous and N4 has no next — a lone link must span both columns,
   or the pair renders as one card beside an empty grey cell. */
.note__next-link:only-child { grid-column: 1 / -1; }
.note__next-link { display: block; padding: 18px 20px; background: var(--paper); text-decoration: none; }
.note__next-link:hover { background: #fff; }
.note__next-link--fwd { text-align: right; }
.note__next-dir { display: block; margin-bottom: 6px; font-size: 10px !important; font-weight: 600 !important; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sig); }
.note__next-title { display: block; font-size: 14.5px; color: var(--ink); }

.note__cta { margin-top: clamp(26px, 4vh, 44px); padding: clamp(20px, 3vw, 30px); border: 1px solid var(--rule); }
.note .note__cta-head { margin: 0 0 10px; font-weight: 600 !important; font-size: clamp(14px, 1.7vw, 18px); }
.note__cta-body { margin: 0 0 16px; font-size: 14px; line-height: 1.6; color: var(--ink-soft); }
.note__cta-links { display: flex; flex-wrap: wrap; gap: 8px; }
.note__cta-links a { display: inline-flex; align-items: center; gap: 8px; padding: 9px 16px; border: 1px solid var(--rule); font-size: 12.5px; color: var(--ink); text-decoration: none; }
.note__cta-links a:hover { border-color: var(--sig); color: var(--sig); }
</style>
