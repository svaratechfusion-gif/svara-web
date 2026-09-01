<script setup lang="ts">
// BLOG — "SVARA Intelligence Journal", the editorial front of the Knowledge
// Hub, on the .svara-home DNA at the Home/Ecosystem/Products standard.
// Publication-grade typographic hierarchy using the design-system sans + mono
// (no new typefaces). Categories are the verified topic clusters; the featured
// pieces are the verified Content Bible research titles. The article grid and
// technical notes are a clearly-marked PREVIEW layout — no fabricated authors,
// dates, or live article links — ready to be wired to real posts before launch.
import { ref, computed } from 'vue'
import { knowledgeHubContent } from '~~/lib/content/knowledge-hub'
import { INSIGHTS } from '~~/lib/content/insights'
import BlogHeroCinematic from '~/components/blog-page/BlogHeroCinematic.vue'

// The hero's cinematic video, hoisted to a FIXED full-page background so every
// section flows up over it in the hero's dark design language (homepage/architecture/
// investors model). Same URL the hero component used.
const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4'

const CATEGORIES = ['All', 'Platform', 'Products', 'Technologies', 'Industries', 'Research'] as const
const activeCat = ref<(typeof CATEGORIES)[number]>('All')

// PUBLISHED articles come from lib/content/insights and link to the real page. The
// preview cards below them are unwritten placeholders and stay visibly marked as such —
// the two must never be presented as the same thing.
const published = INSIGHTS

// The featured slot shows the newest published article when one exists, and only falls
// back to the knowledge-hub blurb while the journal is empty.
const featured = published[0]
  ? {
      category: published[0].category,
      title: published[0].title,
      dek: published[0].dek,
      to: `/insights/${published[0].slug}`,
      readingTime: published[0].readingTime,
    }
  : {
      category: 'Research',
      title: knowledgeHubContent.resources[0]!.title,
      dek: knowledgeHubContent.aiAnswerTarget.replace(/\*\*/g, ''),
      to: null,
      readingTime: null,
    }

interface Insight { category: (typeof CATEGORIES)[number], type: string, title: string, dek: string }
const insights: Insight[] = [
  { category: 'Research', type: 'White Paper', title: knowledgeHubContent.resources[1]!.title, dek: 'The framework behind SVARA — how perception, reasoning, simulation and action close into one operating loop.' },
  { category: 'Platform', type: 'Essay', title: 'Inside the Intelligence Loop', dek: 'Observe, Understand, Predict, Coordinate, Improve — the five capabilities that make an enterprise intelligent.' },
  { category: 'Products', type: 'Product Engineering', title: 'From Vision AI to Autonomous Agents', dek: 'How SVARA products compose into one stack, from edge perception to enterprise-wide automation.' },
  { category: 'Technologies', type: 'Architecture', title: 'Edge Intelligence at Industrial Scale', dek: 'Running perception and inference where the data is created — the architecture of the edge layer.' },
  { category: 'Industries', type: 'Report', title: 'One Architecture, Every Environment', dek: 'How the same intelligence stack adapts across manufacturing, energy, logistics and the built world.' },
  { category: 'Research', type: 'Note', title: knowledgeHubContent.resources[2]!.title, dek: 'Why every SVARA topic is written as a definitive, structured knowledge product rather than a feature page.' },
]
const filtered = computed(() => activeCat.value === 'All' ? insights : insights.filter(i => i.category === activeCat.value))

// Technical notes rail — short-form, clearly preview.
const notes = [
  { type: 'Note', title: 'Perception as infrastructure' },
  { type: 'Note', title: 'The case against point tools' },
  { type: 'Note', title: 'Simulation before action' },
  { type: 'Note', title: 'Why the loop never ends' },
]

useSeoMeta({
  title: 'Insights | SVARA — The Intelligence Journal',
  description: knowledgeHubContent.canonicalDefinition,
})
</script>

<template>
  <div class="blog-page">
    <!-- fixed full-viewport hero video background — it persists while the sections
         flow up over it (homepage/architecture/investors model). z-index:-1 (site
         background level) so it sits behind all content AND the footer. -->
    <video
      class="blog-page__bg"
      :src="HERO_VIDEO"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      aria-hidden="true"
    />

    <!-- HERO — cinematic composition, SVARA content (component), transparent over
         the fixed page video -->
    <BlogHeroCinematic />

    <!-- everything below flows up over the fixed hero video (transparent ground);
         styles/blog-dark.css gives these sections the hero's dark design language -->
    <div class="svara-home blog-page__body">
    <!-- FEATURED LEAD -->
    <section class="bfeat">
      <div class="hx-container">
        <div v-reveal class="bfeat__frame sv-frame">
          <span class="hx-pin tl" /><span class="hx-pin tr" /><span class="hx-pin bl" /><span class="hx-pin br" />
          <div class="bfeat__grid">
            <div class="bfeat__body">
              <span class="hx-mono-label bfeat__tag"><span class="hx-dot" /> Featured · {{ featured.category }}</span>
              <h2 class="bfeat__title">{{ featured.title }}</h2>
              <p class="bfeat__dek">{{ featured.dek }}</p>
              <p v-if="featured.readingTime" class="bfeat__time hx-mono">{{ featured.readingTime }} read</p>
              <NuxtLink :to="featured.to ?? '/technology'" class="hx-link">
                {{ featured.to ? 'Read the article' : 'Read the thinking' }}
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M0 5h14M14 5l-4-4M14 5l-4 4" stroke="currentColor" stroke-width="1.3" /></svg>
              </NuxtLink>
            </div>
            <div class="bfeat__mark" aria-hidden="true">
              <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
                <circle cx="100" cy="100" r="70" fill="none" stroke="var(--sv-border-lavender-strong)" stroke-width="1" />
                <circle class="bfeat__ring" cx="100" cy="100" r="70" fill="none" stroke="var(--sig)" stroke-width="0.7" />
                <circle cx="100" cy="100" r="44" fill="none" stroke="var(--sv-border-lavender)" stroke-width="1" />
                <circle cx="100" cy="100" r="5" fill="var(--sig)" />
                <g stroke="var(--sv-border-lavender)" stroke-width="1"><path d="M100 30V100" /><path d="M100 100L160 140" /><path d="M100 100L40 140" /></g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- EDITORIAL BODY -->
    <section class="blib hx-section">
      <div class="hx-container">
        <header v-reveal class="blib__head">
          <div>
            <p class="hx-eyebrow"><span class="hx-index">→</span> Insight Library</p>
            <h2 class="hx-title">Ideas behind the <span class="lite">intelligence.</span></h2>
          </div>
          <p class="blib__note">Preview layout — the journal is being published. Cards below show its structure.</p>
        </header>

        <!-- PUBLISHED — real articles, linked. Kept above and visually separate from the
             preview cards below, which are unwritten placeholders. -->
        <div v-if="published.length" v-reveal class="bpub">
          <p class="bpub__label hx-mono"><span class="hx-dot" /> Published</p>
          <ul class="bpub__list">
            <li v-for="post in published" :key="post.slug" class="bpub__item sv-card">
              <NuxtLink :to="`/insights/${post.slug}`" class="bpub__link">
                <!-- lazy + async: these sit below the fold, and the article page is where
                     the banner needs to be fast, not the index -->
                <picture v-if="post.heroImage">
                  <source :srcset="`/images/insights/${post.heroImage.name}.webp`" type="image/webp">
                  <img
                    class="bpub__img"
                    :src="`/images/insights/${post.heroImage.name}.png`"
                    alt=""
                    width="1672" height="941" loading="lazy" decoding="async"
                  >
                </picture>
                <span class="bpub__cat hx-mono">{{ post.category }}</span>
                <h3 class="bpub__title">{{ post.title }}</h3>
                <p class="bpub__dek">{{ post.dek }}</p>
                <span class="bpub__meta hx-mono">{{ post.contentType }} · {{ post.readingTime }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div v-reveal class="blib__cats" role="tablist" aria-label="Insight categories">
          <button v-for="c in CATEGORIES" :key="c" class="blib__cat" :class="{ 'is-active': activeCat === c }" role="tab" :aria-selected="activeCat === c" @click="activeCat = c">{{ c }}</button>
        </div>

        <div class="blib__layout">
          <div class="blib__main">
            <TransitionGroup name="blib-stagger" tag="div" class="blib__grid">
              <article v-for="(post, i) in filtered" :key="post.title" class="blib__card sv-card" :class="{ 'blib__card--lead': i === 0 && activeCat === 'All' }">
                <div class="blib__card-top">
                  <span class="blib__card-cat hx-mono">{{ post.type }}</span>
                  <span class="blib__card-status">Preview</span>
                </div>
                <h3 class="blib__card-title">{{ post.title }}</h3>
                <p class="blib__card-dek">{{ post.dek }}</p>
                <span class="blib__card-idx hx-mono">{{ String(i + 1).padStart(2, '0') }} · {{ post.category }}</span>
              </article>
            </TransitionGroup>
          </div>

          <aside v-reveal="{ delay: 0.1 }" class="blib__rail">
            <span class="hx-mono-label blib__rail-h">Technical Notes</span>
            <ul class="blib__notes">
              <li v-for="(n, i) in notes" :key="n.title" class="blib__note-row">
                <span class="blib__note-n hx-mono">N{{ i + 1 }}</span>
                <span class="blib__note-title">{{ n.title }}</span>
              </li>
            </ul>
            <span class="blib__rail-foot hx-mono">Preview · not yet published</span>
          </aside>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bcta hx-section">
      <div class="hx-container">
        <div v-reveal class="bcta__frame sv-frame">
          <span class="hx-pin tl" /><span class="hx-pin tr" /><span class="hx-pin bl" /><span class="hx-pin br" />
          <div class="bcta__inner">
            <h2 class="bcta__title">Have a question<br><span class="lite">we should answer?</span></h2>
            <p class="bcta__lead">Tell us what you're trying to build. The best insights start as real problems from the field.</p>
            <div class="bcta__actions">
              <NuxtLink to="/contact" class="hx-btn hx-btn--primary">Talk to SVARA
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M0 5h14M14 5l-4-4M14 5l-4 4" stroke="currentColor" stroke-width="1.3" /></svg>
              </NuxtLink>
              <NuxtLink to="/technology" class="hx-btn hx-btn--ghost">Explore the technology</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  </div>
</template>

<style scoped>
/* ── FIXED hero video + flowing sections (homepage/architecture/investors model) ──
   Hero itself lives in BlogHeroCinematic.vue; the sections take the hero's dark
   design language via styles/blog-dark.css. */
.blog-page { position: relative; }
.blog-page__bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
  background: #000; /* dark fallback before the video paints */
  pointer-events: none;
}
/* sections flow up over the fixed video — transparent ground so it shows through */
.blog-page__body { position: relative; z-index: 1; background: transparent; }

.bfeat { padding-top: clamp(48px, 7vh, 88px); }
.bfeat__frame { padding: clamp(32px, 4vw, 56px); }
.bfeat__grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: clamp(24px, 4vw, 56px); align-items: center; }
.bfeat__tag { display: inline-flex; align-items: center; gap: 8px; color: var(--ink-muted); }
.bpub { margin-bottom: clamp(32px, 5vh, 56px); }
.bpub__label { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 16px; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; }
.bpub__list { margin: 0; padding: 0; list-style: none; display: grid; gap: 14px; }
@media (min-width: 900px) { .bpub__list { grid-template-columns: repeat(2, 1fr); } }
.bpub__link { display: block; text-decoration: none; height: 100%; }
/* alt="" on the card image: the headline beside it already names the article, so
   repeating the full diagram description here would just be noise to a screen reader */
.bpub__img { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover; }
.bpub__link > :not(picture) { margin-inline: clamp(18px, 2.4vw, 26px); }
.bpub__link > .bpub__cat { display: block; margin-top: clamp(18px, 2.4vw, 26px); }
.bpub__link > .bpub__meta { display: inline-block; margin-bottom: clamp(18px, 2.4vw, 26px); }
.bpub__cat { display: block; margin-bottom: 10px; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.7; }
.bpub__title { margin: 0 0 10px; font-size: clamp(18px, 2vw, 24px); font-weight: 400; line-height: 1.25; }
.bpub__dek { margin: 0 0 14px; font-size: 14px; line-height: 1.6; opacity: 0.75; }
.bpub__meta { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.6; }
.bfeat__time { margin: 0 0 12px; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.65; }

.bfeat__title { margin: 18px 0 0; font-size: clamp(28px, 3.6vw, 52px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.02; color: var(--ink-primary); text-wrap: balance; }
.bfeat__dek { margin: 20px 0 26px; max-width: 52ch; font-size: 16px; line-height: 1.6; color: var(--ink-secondary); }
.bfeat__mark { display: grid; place-items: center; }
.bfeat__mark svg { width: min(280px, 60%); }
.bfeat__ring { transform-origin: 100px 100px; animation: bfeat-spin 22s linear infinite; }
@keyframes bfeat-spin { to { transform: rotate(360deg); } }
.bfeat__mark circle[r='5'] { filter: drop-shadow(0 0 5px rgba(63,111,176,0.6)); }

.blib__head { display: flex; flex-wrap: wrap; gap: 20px; justify-content: space-between; align-items: flex-end; margin-bottom: 34px; }
.blib__note { max-width: 34ch; font-family: var(--font-mono); font-size: 11.5px; letter-spacing: 0.02em; line-height: 1.5; color: var(--ink-muted); }
.blib__cats { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 34px; }
.blib__cat { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.04em; color: var(--ink-secondary); padding: 9px 16px; background: rgba(255,255,255,0.5); border: 1px solid var(--sv-border-subtle); border-radius: var(--radius-pill); cursor: pointer; transition: border-color var(--motion-fast) var(--ease-smooth), color var(--motion-fast); }
.blib__cat:hover { border-color: var(--sv-border-lavender-hover); }
.blib__cat.is-active { color: var(--ink-primary); border-color: var(--sig); background: rgba(63,111,176,0.06); }

.blib__layout { display: grid; grid-template-columns: 1fr 260px; gap: clamp(28px, 4vw, 56px); align-items: start; }
.blib__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.blib__card { padding: 26px 24px 44px; min-height: 210px; display: flex; flex-direction: column; }
.blib__card--lead { grid-column: 1 / -1; min-height: 0; }
.blib__card--lead .blib__card-title { font-size: clamp(24px, 2.6vw, 34px); }
.blib__card-top { display: flex; justify-content: space-between; align-items: center; }
.blib__card-cat { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--sig); }
.blib__card-status { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-muted); padding: 3px 8px; border: 1px solid var(--sv-border-subtle); border-radius: var(--radius-pill); }
.blib__card-title { margin: 18px 0 0; font-size: 21px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.16; color: var(--ink-primary); }
.blib__card-dek { margin: 12px 0 0; font-size: 14px; line-height: 1.55; color: var(--ink-secondary); }
.blib__card-idx { position: absolute; bottom: 18px; left: 24px; font-size: 11px; color: var(--ink-muted); }

.blib__rail { position: sticky; top: calc(var(--nav-height) + 24px); border-top: 1px solid var(--sv-border-lavender); padding-top: 18px; }
.blib__rail-h { color: var(--ink-muted); }
.blib__notes { list-style: none; margin: 18px 0 0; padding: 0; }
.blib__note-row { display: grid; grid-template-columns: auto 1fr; gap: 12px; align-items: baseline; padding: 14px 0; border-bottom: 1px solid var(--sv-border-subtle); }
.blib__note-n { font-size: 10px; color: var(--sig); }
.blib__note-title { font-size: 15px; font-weight: 500; letter-spacing: -0.01em; color: var(--ink-primary); line-height: 1.3; }
.blib__rail-foot { display: block; margin-top: 16px; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-muted); }

.blib-stagger-enter-active { transition: opacity var(--motion-medium) var(--ease-out), transform var(--motion-medium) var(--ease-out); }
.blib-stagger-enter-from { opacity: 0; transform: translateY(12px); }
.blib-stagger-leave-active { transition: opacity var(--motion-fast) linear; position: absolute; }
.blib-stagger-leave-to { opacity: 0; }

.bcta__frame { padding: clamp(48px, 8vw, 104px) clamp(28px, 6vw, 88px); text-align: center; }
.bcta__inner { display: flex; flex-direction: column; align-items: center; }
.bcta__title { margin: 0; font-size: clamp(32px, 4vw, 60px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.04; color: var(--ink-primary); text-wrap: balance; }
.bcta__title .lite { color: var(--ink-secondary); }
.bcta__lead { margin: 22px auto 0; max-width: 46ch; font-size: var(--type-lead); line-height: 1.55; color: var(--ink-secondary); }
.bcta__actions { margin-top: 34px; display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; }

@media (max-width: 940px) {
  .bfeat__grid { grid-template-columns: 1fr; } .bfeat__mark { order: -1; }
  .blib__layout { grid-template-columns: 1fr; }
  .blib__rail { position: static; }
}
@media (max-width: 620px) { .blib__grid { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { .bfeat__ring { animation: none; } }
</style>
