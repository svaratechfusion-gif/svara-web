<script setup lang="ts">
// BLOG — "SVARA Intelligence Journal", the editorial front of the Knowledge
// Hub, on the .svara-home DNA at the Home/Ecosystem/Products standard.
// Publication-grade typographic hierarchy using the design-system sans + mono
// (no new typefaces).
//
// The library is shelved by PUBLICATION LINE — Blog, White Papers, Product
// Engineering, Architecture Series, Industry Reports, Technical Notes — with the blog
// first. The shelves come from insightSections(), so a new piece lands in its section
// on publication; nothing here enumerates titles.
//
// This replaced a category filter over six hand-written placeholder cards. Those cards
// were labelled "Preview" and named work that has since been published, so the page was
// showing live white papers as unlinked previews. Everything on the page is now real
// and linked.
import { knowledgeHubContent } from '~~/lib/content/knowledge-hub'
import { INSIGHTS, insightSections, seriesNotes } from '~~/lib/content/insights'
import BlogHeroCinematic from '~/components/blog-page/BlogHeroCinematic.vue'

// The hero's cinematic video, hoisted to a FIXED full-page background so every
// section flows up over it in the hero's dark design language (homepage/architecture/
// investors model). Same URL the hero component used.
const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4'

// Everything published, newest first — used only for the featured slot; the library
// below reads the shelved view.
const published = INSIGHTS
const sections = insightSections()

// The featured slot shows the newest published article when one exists, and only falls
// back to the knowledge-hub blurb while the journal is empty.
const featured = published[0]
  ? {
      category: published[0].contentType,
      title: published[0].title,
      dek: published[0].dek,
      to: `/insights/${published[0].slug}`,
      readingTime: published[0].readingTime,
      heroImage: published[0].heroImage,
    }
  : {
      category: 'Research',
      title: knowledgeHubContent.resources[0]!.title,
      dek: knowledgeHubContent.aiAnswerTarget.replace(/\*\*/g, ''),
      to: null,
      readingTime: null,
      heroImage: undefined,
    }

// The notes shelf numbers N1..N4 from seriesNotes() — the same source the note pages
// use — rather than from its own loop index, so the two can never disagree.
const noteN = new Map(seriesNotes().map(n => [n.slug, n.n]))

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
            <!-- The article's own banner when one is featured. It is the subject of the
                 block, so the decorative radar below is the fallback, not the default. -->
            <NuxtLink v-if="featured.heroImage && featured.to" :to="featured.to" class="bfeat__shot">
              <picture>
                <source :srcset="`/images/insights/${featured.heroImage.name}.webp`" type="image/webp">
                <img
                  :src="`/images/insights/${featured.heroImage.name}.png`"
                  alt=""
                  :width="featured.heroImage.width"
                  :height="featured.heroImage.height"
                  decoding="async"
                >
              </picture>
            </NuxtLink>
            <div v-else class="bfeat__mark" aria-hidden="true">
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

    <!-- THE LIBRARY — one section per publication line, blog first. The shelves and
         their order come from insightSections(); nothing here names a title. -->
    <section
      v-for="(sec, si) in sections"
      :key="sec.line"
      class="bsec"
      :class="[`bsec--${sec.line}`, { 'bsec--first': si === 0 }]"
      :aria-labelledby="`shelf-${sec.line}`"
    >
      <div class="hx-container">
        <header v-reveal class="bsec__head">
          <p class="hx-eyebrow"><span class="hx-index">{{ String(si + 1).padStart(2, '0') }}</span> {{ sec.label }}</p>
          <h2 :id="`shelf-${sec.line}`" class="hx-title bsec__title">{{ sec.title }}</h2>
          <div class="bsec__meta">
            <p class="bsec__blurb">{{ sec.blurb }}</p>
            <span class="bsec__count hx-mono">{{ String(sec.items.length).padStart(2, '0') }} published</span>
          </div>
        </header>

        <!-- ARTICLES — the only line with banner artwork, so the only one that leads
             with an image. -->
        <ul v-if="sec.line === 'article'" v-reveal class="bsec__cards">
          <li v-for="post in sec.items" :key="post.slug" class="bsec__card sv-card">
            <NuxtLink :to="`/insights/${post.slug}`" class="bsec__card-link">
              <!-- alt="" on the card image: the headline beside it already names the
                   article. lazy + async — the article page is where the banner needs to
                   be fast, not the index. -->
              <picture v-if="post.heroImage">
                <source :srcset="`/images/insights/${post.heroImage.name}.webp`" type="image/webp">
                <img
                  class="bsec__card-img"
                  :src="`/images/insights/${post.heroImage.name}.png`"
                  alt=""
                  :width="post.heroImage.width" :height="post.heroImage.height"
                  loading="lazy" decoding="async"
                >
              </picture>
              <span class="bsec__card-cat hx-mono">{{ post.category }}</span>
              <h3 class="bsec__card-title">{{ post.title }}</h3>
              <p class="bsec__card-dek">{{ post.dek }}</p>
              <span class="bsec__card-meta hx-mono">{{ post.readingTime }} read</span>
            </NuxtLink>
          </li>
        </ul>

        <!-- TECHNICAL NOTES — a numbered series, read in order. -->
        <ol v-else-if="sec.line === 'note'" v-reveal class="bsec__notes sv-card">
          <li v-for="note in sec.items" :key="note.slug" class="bsec__note">
            <NuxtLink :to="`/insights/${note.slug}`" class="bsec__note-link">
              <span class="bsec__note-n hx-mono">{{ noteN.get(note.slug) }}</span>
              <span class="bsec__note-body">
                <h3 class="bsec__note-title">{{ note.title }}</h3>
                <span class="bsec__note-dek">{{ note.subtitle }}</span>
              </span>
              <span class="bsec__note-time hx-mono">{{ note.readingTime }}</span>
            </NuxtLink>
          </li>
        </ol>

        <!-- LONG-FORM LINES — papers, briefs and reports have no cover art, so they
             list as documents: number, imprint, title, extent. -->
        <ul v-else v-reveal class="bsec__docs">
          <li v-for="(doc, i) in sec.items" :key="doc.slug" class="bsec__doc sv-card">
            <NuxtLink :to="`/insights/${doc.slug}`" class="bsec__doc-link">
              <span class="bsec__doc-idx hx-mono">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="bsec__doc-body">
                <span class="bsec__doc-kind hx-mono">{{ doc.imprint?.label ?? doc.contentType }}</span>
                <h3 class="bsec__doc-title">{{ doc.title }}</h3>
                <span class="bsec__doc-dek">{{ doc.dek }}</span>
              </span>
              <span class="bsec__doc-meta hx-mono">
                <span v-if="doc.extent">{{ doc.extent }}</span>
                <span>{{ doc.readingTime }}</span>
              </span>
            </NuxtLink>
          </li>
        </ul>
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
/* when the banner is present it takes the larger share: it is an infographic, not an
   ornament, and at 1fr the type inside it was too small to read */
.bfeat__grid:has(.bfeat__shot) { grid-template-columns: 1fr 1.15fr; }
.bfeat__shot { display: block; align-self: stretch; }
/* alt="" and no natural crop — the headline names the article, and these banners carry
   content to their edges */
.bfeat__shot img { display: block; width: 100%; height: auto; border: 1px solid var(--sv-border-lavender, rgba(20, 34, 63, 0.18)); }
.bfeat__tag { display: inline-flex; align-items: center; gap: 8px; color: var(--ink-muted); }
.bfeat__time { margin: 0 0 12px; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.65; }

.bfeat__title { margin: 18px 0 0; font-size: clamp(28px, 3.6vw, 52px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.02; color: var(--ink-primary); text-wrap: balance; }
.bfeat__dek { margin: 20px 0 26px; max-width: 52ch; font-size: 16px; line-height: 1.6; color: var(--ink-secondary); }
.bfeat__mark { display: grid; place-items: center; }
.bfeat__mark svg { width: min(280px, 60%); }
.bfeat__ring { transform-origin: 100px 100px; animation: bfeat-spin 22s linear infinite; }
@keyframes bfeat-spin { to { transform: rotate(360deg); } }
.bfeat__mark circle[r='5'] { filter: drop-shadow(0 0 5px rgba(63,111,176,0.6)); }

/* ── THE LIBRARY: one shelf per publication line ──────────────────────────────
   Three item layouts, chosen by what the line actually is rather than for variety:
   articles have banner artwork and lead with it; papers/briefs/reports have none and
   list as documents; notes are a numbered series and list as one. */
.bsec { padding-block: clamp(38px, 6vh, 72px); }
.bsec--first { padding-top: clamp(56px, 9vh, 104px); }
.bsec__head { margin-bottom: clamp(24px, 3.4vh, 38px); }
.bsec__title { margin: 10px 0 0; }
.bsec__meta { display: flex; flex-wrap: wrap; gap: 12px 28px; justify-content: space-between; align-items: baseline; margin-top: 14px; padding-bottom: 16px; border-bottom: 1px solid var(--sv-border-lavender); }
.bsec__blurb { margin: 0; max-width: 62ch; font-size: 15px; line-height: 1.6; color: var(--ink-secondary); }
.bsec__count { flex: none; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-secondary); }

/* articles */
.bsec__cards { margin: 0; padding: 0; list-style: none; display: grid; gap: 14px; }
@media (min-width: 900px) { .bsec__cards { grid-template-columns: repeat(2, 1fr); } }
.bsec__card-link { display: block; text-decoration: none; height: 100%; }
/* NO forced aspect-ratio and NO object-fit: cover. These banners are infographics whose
   content runs to the edges, and the five are not one shape (1.50 to 1.78) — cropping
   them to a uniform 16:9 cut up to 19% off the tall ones. Uniform card heights are not
   worth losing the content the image exists to carry. */
.bsec__card-img { display: block; width: 100%; height: auto; }
.bsec__card-link > :not(picture) { margin-inline: clamp(18px, 2.4vw, 26px); }
.bsec__card-link > .bsec__card-cat { display: block; margin-top: clamp(18px, 2.4vw, 26px); }
.bsec__card-link > .bsec__card-meta { display: inline-block; margin-bottom: clamp(18px, 2.4vw, 26px); }
.bsec__card-cat { display: block; margin-bottom: 10px; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.7; }
.bsec__card-title { margin: 0 0 10px; font-size: clamp(18px, 2vw, 24px); font-weight: 400; line-height: 1.25; }
.bsec__card-dek { margin: 0 0 14px; font-size: 14px; line-height: 1.6; opacity: 0.75; }
.bsec__card-meta { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.6; }

/* papers, briefs, reports */
.bsec__docs { margin: 0; padding: 0; list-style: none; display: grid; gap: 12px; }
.bsec__doc-link { display: grid; grid-template-columns: auto 1fr auto; gap: clamp(16px, 2.4vw, 30px); align-items: start; padding: clamp(20px, 2.6vw, 30px) clamp(18px, 2.4vw, 28px); text-decoration: none; }
.bsec__doc-idx { font-size: 11px; letter-spacing: 0.12em; color: var(--sig); padding-top: 3px; }
.bsec__doc-body { display: block; min-width: 0; }
.bsec__doc-kind { display: block; margin-bottom: 9px; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.7; }
.bsec__doc-title { margin: 0 0 8px; font-size: clamp(18px, 1.9vw, 23px); font-weight: 400; line-height: 1.22; }
.bsec__doc-dek { display: block; max-width: 68ch; font-size: 14px; line-height: 1.6; opacity: 0.75; }
.bsec__doc-meta { display: grid; gap: 4px; justify-items: end; text-align: right; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.6; white-space: nowrap; }

/* the numbered series */
.bsec__notes { margin: 0; padding: clamp(6px, 1vw, 14px) clamp(18px, 2.4vw, 28px); list-style: none; }
.bsec__note + .bsec__note { border-top: 1px solid var(--sv-border-subtle); }
.bsec__note-link { display: grid; grid-template-columns: auto 1fr auto; gap: clamp(14px, 2vw, 26px); align-items: baseline; padding: 18px 4px; text-decoration: none; transition: opacity var(--motion-fast) var(--ease-smooth), transform var(--motion-fast) var(--ease-smooth); }
.bsec__note-link:hover { opacity: 0.72; transform: translateX(3px); }
.bsec__note-link:focus-visible { outline: 1px solid var(--sig); outline-offset: 3px; }
.bsec__note-n { font-size: 11px; letter-spacing: 0.12em; color: var(--sig); }
.bsec__note-body { display: block; min-width: 0; }
.bsec__note-title { margin: 0; font-size: clamp(16px, 1.6vw, 19px); font-weight: 500; letter-spacing: -0.01em; line-height: 1.3; color: var(--ink-primary); }
.bsec__note-dek { display: block; margin-top: 5px; font-size: 13.5px; line-height: 1.55; color: var(--ink-secondary); }
.bsec__note-time { flex: none; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-muted); white-space: nowrap; }

.bcta__frame { padding: clamp(48px, 8vw, 104px) clamp(28px, 6vw, 88px); text-align: center; }
.bcta__inner { display: flex; flex-direction: column; align-items: center; }
.bcta__title { margin: 0; font-size: clamp(32px, 4vw, 60px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.04; color: var(--ink-primary); text-wrap: balance; }
.bcta__title .lite { color: var(--ink-secondary); }
.bcta__lead { margin: 22px auto 0; max-width: 46ch; font-size: var(--type-lead); line-height: 1.55; color: var(--ink-secondary); }
.bcta__actions { margin-top: 34px; display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; }

@media (max-width: 940px) {
  .bfeat__grid, .bfeat__grid:has(.bfeat__shot) { grid-template-columns: 1fr; }
  .bfeat__mark { order: -1; } .bfeat__shot { order: -1; }
}
@media (max-width: 620px) {
  /* the document row's right-hand extent column has nowhere to go on a phone —
     fold it under the body rather than squeezing the title into a sliver */
  .bsec__doc-link { grid-template-columns: auto 1fr; }
  .bsec__doc-meta { grid-column: 2; justify-items: start; text-align: left; margin-top: 12px; }
  .bsec__note-link { grid-template-columns: auto 1fr; }
  .bsec__note-time { grid-column: 2; margin-top: 6px; }
}
@media (prefers-reduced-motion: reduce) { .bfeat__ring { animation: none; } }
</style>
