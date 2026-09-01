<script setup lang="ts">
// INSIGHTS · ARTICLE — the long-form journal renderer behind /insights/<slug>.
//
// NOTE ON ROUTING: there is deliberately no `app/pages/insights.vue`. A `X.vue` sitting
// beside a `X/` directory makes Nuxt treat X.vue as the PARENT layout for the folder, and
// without a <NuxtPage/> inside it the child never renders while the parent still answers
// 200 — the failure that silently broke 23 pages on this site once already.
//
// Blocks come from lib/content/insights as typed nodes rather than an HTML blob, so the
// FAQ schema below reads a real field instead of parsing markup, and the index and sitemap
// read the same metadata the article owns.
import { computed } from 'vue'
import { getInsight, siblingInsights } from '~~/lib/content/insights'
import { useStructuredData } from '~/composables/useStructuredData'
import { SITE_URL } from '~~/lib/seo/site'

const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))
const article = computed(() => getInsight(slug.value))

// A missing slug must 404, not render an empty shell — an empty 200 is worse than a 404
// for both a reader and a crawler.
if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Insight not found', fatal: true })
}

const a = article.value!
const url = `${SITE_URL}/insights/${a.slug}`

// Broadsheet is the house style: an article that specifies nothing gets it, so every
// piece added from here on inherits the design without opting in.
/** Sibling articles first, then the product and division links the article names. */
const relatedLinks = computed(() => [...siblingInsights(a.slug), ...a.related])

const isPaper = computed(() => (a.layout ?? 'newspaper') === 'newspaper')

/**
 * Group the blocks under their H2 for the newspaper layout.
 *
 * Columns are applied PER SECTION rather than to the whole article. A single
 * `column-count` over a 13-minute piece makes the reader scroll to the bottom of column
 * one and back up to the top of column two — the one thing print gets for free (a fixed
 * page height) and the web does not. Section-sized columns keep the broadsheet texture
 * while the up-and-back stays within a screen or so.
 */
const sections = computed(() => {
  const out: { id: string, heading: string, blocks: typeof a.blocks }[] = []
  let cur = { id: 'lede', heading: '', blocks: [] as typeof a.blocks }
  for (const b of a.blocks) {
    if (b.kind === 'h2') {
      if (cur.blocks.length) out.push(cur)
      cur = { id: b.id, heading: b.text, blocks: [] }
    } else {
      cur.blocks.push(b)
    }
  }
  if (cur.blocks.length) out.push(cur)
  return out
})

// Broadsheet typography. The site is globally Space Mono via styles/global-font.css, so
// the serif has to be loaded here and applied with enough weight to beat that rule.
if ((a.layout ?? 'newspaper') === 'newspaper') {
  useHead({
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;0,900;1,500&family=Spectral:ital,wght@0,300;0,400;0,600;1,400&display=swap' },
    ],
  })
}

// The on-page contents: H2s only, so the rail stays scannable on a piece this long.
const contents = computed(() => a.blocks.filter(b => b.kind === 'h2') as { id: string, text: string }[])

const publishedLabel = new Date(a.published).toLocaleDateString('en-GB', {
  year: 'numeric', month: 'long', day: 'numeric',
})

useSeoMeta({
  title: a.seoTitle,
  description: a.metaDescription,
  ogTitle: a.seoTitle,
  ogDescription: a.metaDescription,
  ogType: 'article',
  articlePublishedTime: a.published,
  articleModifiedTime: a.updated,
  keywords: [...a.primaryKeywords, ...a.secondaryKeywords].join(', '),
})
useHead({ link: [{ rel: 'canonical', href: url }] })

// Article. `dateModified` is emitted ONLY when the article actually changed — restating
// the publish date as a modification is the freshness signal every thin site fakes.
useStructuredData({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: a.title,
  alternativeHeadline: a.subtitle,
  description: a.dek,
  abstract: a.metaDescription,
  articleSection: a.category,
  keywords: [...a.primaryKeywords, ...a.secondaryKeywords].join(', '),
  datePublished: a.published,
  ...(a.updated ? { dateModified: a.updated } : {}),
  inLanguage: 'en',
  isAccessibleForFree: true,
  ...(a.heroImage ? { image: `${SITE_URL}/images/insights/${a.heroImage.name}.png` } : {}),
  mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  url,
  author: { '@id': `${SITE_URL}/#organization` },
  publisher: { '@id': `${SITE_URL}/#organization` },
})

useStructuredData({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: a.faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
})

useStructuredData({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Insights', item: `${SITE_URL}/blog` },
    { '@type': 'ListItem', position: 3, name: a.title, item: url },
  ],
})
</script>

<template>
  <!-- ════════ BROADSHEET ════════ -->
  <article v-if="article && isPaper" class="npr">
    <div class="npr__sheet">
      <!-- nameplate -->
      <header class="npr__masthead">
        <nav class="npr__crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">·</span>
          <NuxtLink to="/blog">Insights</NuxtLink>
        </nav>
        <p class="npr__nameplate">SVARA Intelligence Journal</p>
        <p class="npr__folio">
          <span>{{ a.category }}</span>
          <span><time :datetime="a.published">{{ publishedLabel }}</time></span>
          <span>{{ a.readingTime }}</span>
          <span>{{ a.contentType }}</span>
        </p>
      </header>

      <!-- headline block -->
      <div class="npr__head">
        <h1 class="npr__headline">{{ a.title }}</h1>
        <p class="npr__deck">{{ a.subtitle }}</p>
        <p class="npr__standfirst">{{ a.dek }}</p>
      </div>

      <!-- banner. These are dense infographics, not decorative art: they carry pipelines
           and comparison tables that repay a closer look, so the figure links to the
           full-resolution file the way the division renders do. -->
      <figure v-if="a.heroImage" class="npr__banner">
        <a
          class="npr__banner-link"
          :href="`/images/insights/${a.heroImage.name}.png`"
          target="_blank"
          rel="noopener"
          :aria-label="`Open the full-resolution diagram for ${a.title} in a new tab`"
        >
          <picture>
            <source :srcset="`/images/insights/${a.heroImage.name}.webp`" type="image/webp">
            <img
              :src="`/images/insights/${a.heroImage.name}.png`"
              :alt="a.heroImage.alt"
              width="1672"
              height="941"
              fetchpriority="high"
              decoding="async"
            >
          </picture>
        </a>
      </figure>

      <!-- body: each section gets its own column set -->
      <div class="npr__body">
        <section v-for="(sec, si) in sections" :key="sec.id" class="npr__section">
          <h2 v-if="sec.heading" :id="sec.id" class="npr__h2">{{ sec.heading }}</h2>
          <div class="npr__cols" :class="{ 'is-lede': si === 0 }">
            <template v-for="(b, i) in sec.blocks" :key="i">
              <h3 v-if="b.kind === 'h3'" :id="b.id" class="npr__h3">{{ b.text }}</h3>
              <p v-else-if="b.kind === 'p'" class="npr__p">{{ b.text }}</p>

              <aside v-else-if="b.kind === 'statement'" class="npr__pull">
                <p v-if="b.label" class="npr__pull-label">{{ b.label }}</p>
                <p class="npr__pull-text">{{ b.text }}</p>
              </aside>

              <ul v-else-if="b.kind === 'ul'" class="npr__list">
                <li v-for="(it, j) in b.items" :key="j">{{ it }}</li>
              </ul>
              <ol v-else-if="b.kind === 'ol'" class="npr__list npr__list--num">
                <li v-for="(it, j) in b.items" :key="j">{{ it }}</li>
              </ol>

              <dl v-else-if="b.kind === 'defs'" class="npr__defs">
                <template v-for="(d, j) in b.items" :key="j">
                  <dt>{{ d.term }}</dt><dd>{{ d.text }}</dd>
                </template>
              </dl>

              <!-- figures span the full measure, as they would across a printed page -->
              <ol v-else-if="b.kind === 'flow'" class="npr__flow npr__span" aria-label="Process sequence">
                <li v-for="(st, j) in b.steps" :key="j">
                  <span>{{ st }}</span>
                  <span v-if="j < b.steps.length - 1" class="npr__flow-arrow" aria-hidden="true">→</span>
                </li>
              </ol>

              <ol v-else-if="b.kind === 'stack'" class="npr__stack npr__span" aria-label="Architecture layers">
                <li v-for="(ly, j) in b.layers" :key="j">
                  <p class="npr__stack-name">{{ ly.name }}</p>
                  <p class="npr__stack-items">{{ ly.items.join(' · ') }}</p>
                </li>
              </ol>

              <div v-else-if="b.kind === 'table'" class="npr__tablewrap npr__span">
                <table class="npr__table">
                  <caption v-if="b.caption">{{ b.caption }}</caption>
                  <thead><tr><th v-for="(hd, j) in b.headers" :key="j" scope="col">{{ hd }}</th></tr></thead>
                  <tbody>
                    <tr v-for="(row, ri) in b.rows" :key="ri">
                      <th scope="row">{{ row[0] }}</th>
                      <td v-for="(cell, ci) in row.slice(1)" :key="ci">{{ cell }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
          </div>
        </section>

        <!-- FAQ -->
        <section class="npr__section">
          <h2 id="faq" class="npr__h2">Frequently Asked Questions</h2>
          <div class="npr__cols">
            <div v-for="(f, i) in a.faqs" :key="i" class="npr__faq">
              <p class="npr__faq-q">{{ f.q }}</p>
              <p class="npr__faq-a">{{ f.a }}</p>
            </div>
          </div>
        </section>

        <section class="npr__section">
          <h2 id="closing" class="npr__h2">{{ a.closing.heading }}</h2>
          <div class="npr__cols">
            <p v-for="(pgh, i) in a.closing.paragraphs" :key="i" class="npr__p">{{ pgh }}</p>
          </div>
        </section>
      </div>

      <!-- footer rules -->
      <footer class="npr__foot">
        <div class="npr__cta">
          <p class="npr__cta-head">{{ a.cta.headline }}</p>
          <p class="npr__cta-body">{{ a.cta.body }}</p>
          <div class="npr__cta-links">
            <NuxtLink v-for="l in a.cta.links" :key="l.to" :to="l.to">{{ l.label }}<span aria-hidden="true">→</span></NuxtLink>
          </div>
        </div>
        <div class="npr__related">
          <p class="npr__related-title">Related</p>
          <ul>
            <li v-for="r in relatedLinks" :key="r.to"><NuxtLink :to="r.to">{{ r.label }}</NuxtLink></li>
          </ul>
        </div>
      </footer>
    </div>
  </article>

  <!-- ════════ SYSTEM (default) ════════ -->
  <article v-else-if="article" class="ins">
    <div class="svara-home ins__body">
      <!-- masthead -->
      <header class="ins__head hx-container">
        <nav class="ins__crumb hx-mono" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">/</span>
          <NuxtLink to="/blog">Insights</NuxtLink><span aria-hidden="true">/</span>
          <span aria-current="page">{{ a.category }}</span>
        </nav>

        <p class="ins__cat hx-mono">{{ a.category }}</p>
        <h1 class="ins__title svara-hero-h1">{{ a.title }}</h1>
        <p class="ins__sub">{{ a.subtitle }}</p>

        <dl class="ins__meta hx-mono">
          <div><dt>Published</dt><dd><time :datetime="a.published">{{ publishedLabel }}</time></dd></div>
          <div><dt>Reading time</dt><dd>{{ a.readingTime }}</dd></div>
          <div><dt>Type</dt><dd>{{ a.contentType }}</dd></div>
        </dl>
      </header>

      <figure v-if="a.heroImage" class="ins__banner hx-container">
        <a :href="`/images/insights/${a.heroImage.name}.png`" target="_blank" rel="noopener">
          <picture>
            <source :srcset="`/images/insights/${a.heroImage.name}.webp`" type="image/webp">
            <img :src="`/images/insights/${a.heroImage.name}.png`" :alt="a.heroImage.alt" width="1672" height="941" decoding="async">
          </picture>
        </a>
      </figure>

      <div class="ins__layout hx-container">
        <!-- contents rail -->
        <aside class="ins__rail" aria-label="On this page">
          <p class="ins__rail-title hx-mono">On this page</p>
          <ol class="ins__toc">
            <li v-for="c in contents" :key="c.id">
              <a :href="`#${c.id}`">{{ c.text }}</a>
            </li>
          </ol>
        </aside>

        <div class="ins__prose">
          <template v-for="(b, i) in a.blocks" :key="i">
            <h2 v-if="b.kind === 'h2'" :id="b.id" class="ins__h2">{{ b.text }}</h2>
            <h3 v-else-if="b.kind === 'h3'" :id="b.id" class="ins__h3">{{ b.text }}</h3>
            <p v-else-if="b.kind === 'p'" class="ins__p">{{ b.text }}</p>

            <figure v-else-if="b.kind === 'statement'" class="ins__statement sv-frame">
              <figcaption v-if="b.label" class="ins__statement-label hx-mono">{{ b.label }}</figcaption>
              <p>{{ b.text }}</p>
            </figure>

            <ul v-else-if="b.kind === 'ul'" class="ins__list">
              <li v-for="(it, j) in b.items" :key="j">{{ it }}</li>
            </ul>
            <ol v-else-if="b.kind === 'ol'" class="ins__list ins__list--num">
              <li v-for="(it, j) in b.items" :key="j">{{ it }}</li>
            </ol>

            <dl v-else-if="b.kind === 'defs'" class="ins__defs">
              <template v-for="(d, j) in b.items" :key="j">
                <dt>{{ d.term }}</dt>
                <dd>{{ d.text }}</dd>
              </template>
            </dl>

            <!-- the pipeline diagrams: Perception → Context → Reasoning → … -->
            <ol v-else-if="b.kind === 'flow'" class="ins__flow" aria-label="Process sequence">
              <li v-for="(st, j) in b.steps" :key="j" class="ins__flow-step">
                <span>{{ st }}</span>
                <span v-if="j < b.steps.length - 1" class="ins__flow-arrow" aria-hidden="true">→</span>
              </li>
            </ol>

            <!-- layered architecture diagram: named levels, read top to bottom -->
            <ol v-else-if="b.kind === 'stack'" class="ins__stack" aria-label="Architecture layers">
              <li v-for="(ly, j) in b.layers" :key="j" class="ins__stack-layer">
                <p class="ins__stack-name hx-mono">{{ ly.name }}</p>
                <p class="ins__stack-items">
                  <span v-for="(it, k) in ly.items" :key="k">
                    {{ it }}<span v-if="k < ly.items.length - 1" class="ins__stack-sep" aria-hidden="true"> · </span>
                  </span>
                </p>
              </li>
            </ol>

            <!-- wide tables scroll inside their own container; the page never scrolls sideways -->
            <div v-else-if="b.kind === 'table'" class="ins__tablewrap">
              <table class="ins__table">
                <caption v-if="b.caption" class="ins__table-cap">{{ b.caption }}</caption>
                <thead>
                  <tr><th v-for="(hd, j) in b.headers" :key="j" scope="col">{{ hd }}</th></tr>
                </thead>
                <tbody>
                  <tr v-for="(row, ri) in b.rows" :key="ri">
                    <th scope="row">{{ row[0] }}</th>
                    <td v-for="(cell, ci) in row.slice(1)" :key="ci">{{ cell }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>

          <!-- FAQ — the same source the FAQPage schema above reads -->
          <h2 id="faq" class="ins__h2">Frequently Asked Questions</h2>
          <div class="ins__faqs">
            <details v-for="(f, i) in a.faqs" :key="i" class="ins__faq">
              <summary>{{ f.q }}</summary>
              <p>{{ f.a }}</p>
            </details>
          </div>

          <h2 id="closing" class="ins__h2">{{ a.closing.heading }}</h2>
          <p v-for="(pgh, i) in a.closing.paragraphs" :key="i" class="ins__p">{{ pgh }}</p>
        </div>
      </div>

      <!-- related cluster -->
      <section class="ins__related hx-container" aria-labelledby="ins-related">
        <h2 id="ins-related" class="ins__related-title hx-mono">Related</h2>
        <ul class="ins__related-list">
          <li v-for="r in relatedLinks" :key="r.to">
            <NuxtLink :to="r.to">{{ r.label }}<span aria-hidden="true">→</span></NuxtLink>
          </li>
        </ul>
      </section>

      <section class="ins__cta hx-container">
        <div class="ins__cta-inner sv-frame">
          <h2 class="ins__cta-head">{{ a.cta.headline }}</h2>
          <p class="ins__cta-body">{{ a.cta.body }}</p>
          <div class="ins__cta-links">
            <NuxtLink v-for="l in a.cta.links" :key="l.to" :to="l.to" class="ins__cta-link">
              {{ l.label }}<span aria-hidden="true">→</span>
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </article>
</template>

<style scoped>
/* ══════════════════════════════════════════════════════════════════════════════
   BROADSHEET
   The site's global stylesheet repoints every element to Space Mono with a broad
   `!important` rule, so every type declaration here has to carry !important to hold a
   serif. That is the cost of the global font layer, not decoration.
   ══════════════════════════════════════════════════════════════════════════════ */
.npr {
  --paper: #f4f1e8;
  --ink: #14161a;
  --ink-soft: #4a4f57;
  --rule: rgba(20, 22, 26, 0.22);
  --rule-soft: rgba(20, 22, 26, 0.12);
  background: var(--paper);
  color: var(--ink);
  padding: calc(var(--nav-height, 80px) + 28px) clamp(16px, 4vw, 48px) clamp(60px, 10vh, 120px);
}
.npr__sheet { max-width: 1180px; margin-inline: auto; }

.npr :is(p, h1, h2, h3, li, dt, dd, th, td, caption, a, span) {
  font-family: 'Spectral', Georgia, 'Times New Roman', serif !important;
}

/* ── nameplate ─────────────────────────────────────────────────────────────── */
.npr__masthead { border-bottom: 3px double var(--rule); padding-bottom: 10px; }
.npr__crumb { display: flex; gap: 8px; margin: 0 0 10px; font-size: 11px !important; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft); }
.npr__crumb a { color: inherit; text-decoration: none; }
.npr__crumb a:hover { text-decoration: underline; }
.npr .npr__nameplate {
  margin: 0 0 10px;
  font-family: 'Playfair Display', Georgia, serif !important;
  font-weight: 900 !important;
  font-size: clamp(26px, 4.4vw, 54px);
  line-height: 1;
  letter-spacing: -0.015em;
  text-align: center;
  text-transform: uppercase;
}
.npr__folio {
  margin: 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 6px 20px;
  padding-top: 8px; border-top: 1px solid var(--rule);
  font-size: 11px !important; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-soft);
}

/* ── headline ──────────────────────────────────────────────────────────────── */
.npr__head { padding: clamp(24px, 5vh, 52px) 0; border-bottom: 1px solid var(--rule); text-align: center; }
.npr .npr__headline {
  margin: 0 0 14px;
  font-family: 'Playfair Display', Georgia, serif !important;
  font-weight: 700 !important;
  font-size: clamp(34px, 6.6vw, 82px) !important;
  line-height: 1.02 !important;
  letter-spacing: -0.02em !important;
  max-width: 18ch; margin-inline: auto;
}
.npr__deck {
  margin: 0 auto 18px; max-width: 46ch;
  font-style: italic; font-weight: 400 !important;
  font-size: clamp(17px, 2.1vw, 26px); line-height: 1.35; color: var(--ink-soft);
}
.npr__standfirst {
  margin: 0 auto; max-width: 62ch; padding-top: 16px; border-top: 1px solid var(--rule-soft);
  font-size: clamp(14px, 1.5vw, 17px); line-height: 1.6; color: var(--ink-soft);
}

/* the banner. width/height on the <img> reserve the box before it loads, so the
   headline above it never jumps — the layout-shift the LCP image usually causes */
.npr__banner { margin: 0; padding: clamp(20px, 4vh, 40px) 0; border-bottom: 1px solid var(--rule-soft); }
.npr__banner-link { display: block; border: 1px solid var(--rule); }
.npr__banner img { display: block; width: 100%; height: auto; }

/* ── body ──────────────────────────────────────────────────────────────────── */
.npr__section { padding: clamp(22px, 4vh, 40px) 0; border-bottom: 1px solid var(--rule-soft); }
.npr .npr__h2 {
  margin: 0 0 16px;
  font-family: 'Playfair Display', Georgia, serif !important;
  font-weight: 700 !important;
  font-size: clamp(22px, 2.8vw, 34px) !important;
  line-height: 1.15 !important;
  scroll-margin-top: calc(var(--nav-height, 80px) + 20px);
}

/* columns PER SECTION — see the note in the script block */
.npr__cols { column-gap: clamp(24px, 3vw, 46px); column-rule: 1px solid var(--rule-soft); }
@media (min-width: 760px)  { .npr__cols { column-count: 2; } }
@media (min-width: 1180px) { .npr__cols { column-count: 3; } }

.npr__p { margin: 0 0 12px; font-size: 15px; line-height: 1.62; text-align: justify; hyphens: auto; }
/* the drop cap opens the piece, once */
.npr .npr__cols.is-lede > .npr__p:first-of-type::first-letter {
  float: left; font-family: 'Playfair Display', Georgia, serif; font-weight: 700;
  font-size: 3.4em; line-height: 0.82; padding: 0.06em 0.08em 0 0;
}
.npr__h3 {
  margin: 16px 0 8px; font-weight: 600 !important; font-size: 15px !important;
  letter-spacing: 0.02em; break-after: avoid;
  scroll-margin-top: calc(var(--nav-height, 80px) + 20px);
}
.npr__list { margin: 0 0 12px; padding-left: 18px; font-size: 15px; line-height: 1.55; }
.npr__list--num { list-style: decimal; }
.npr__list li { margin-bottom: 4px; }
.npr__defs { margin: 0 0 12px; font-size: 15px; line-height: 1.55; }
.npr__defs dt { font-weight: 600; }
.npr__defs dd { margin: 0 0 9px; color: var(--ink-soft); }

/* pull quote — the one element allowed to break the column rhythm */
.npr__pull { margin: 14px 0; padding: 12px 0; border-top: 2px solid var(--ink); border-bottom: 1px solid var(--rule); break-inside: avoid; }
.npr__pull-label { margin: 0 0 6px; font-size: 10px !important; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-soft); }
.npr .npr__pull-text { margin: 0; font-family: 'Playfair Display', Georgia, serif !important; font-size: clamp(17px, 1.9vw, 22px); line-height: 1.25; font-style: italic; }

/* figures span every column, as a plate would across a printed page */
.npr__span { column-span: all; break-inside: avoid; margin: 18px 0; }

.npr__flow { padding: 0; list-style: none; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; }
.npr__flow li { display: inline-flex; align-items: center; gap: 10px; }
.npr__flow li > span:first-child { padding: 6px 12px; border: 1px solid var(--rule); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; }
.npr__flow-arrow { color: var(--ink-soft); }

.npr__stack { padding: 0; list-style: none; display: flex; flex-direction: column; max-width: 560px; }
.npr__stack li { position: relative; padding: 12px 16px; border: 1px solid var(--rule); }
.npr__stack li + li { margin-top: 22px; }
.npr__stack li + li::before { content: ''; position: absolute; left: 50%; top: -22px; width: 1px; height: 22px; background: var(--rule); }
.npr__stack-name { margin: 0 0 4px; font-size: 10px !important; letter-spacing: 0.16em; text-transform: uppercase; }
.npr__stack-items { margin: 0; font-size: 13px; color: var(--ink-soft); }

.npr__tablewrap { overflow-x: auto; }
.npr__table { width: 100%; border-collapse: collapse; font-size: 13px; min-width: 560px; }
.npr__table caption { padding: 8px 0; text-align: left; font-size: 10px !important; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-soft); border-bottom: 2px solid var(--ink); }
.npr__table th, .npr__table td { padding: 8px 12px; text-align: left; border-bottom: 1px solid var(--rule-soft); vertical-align: top; }
.npr__table thead th { font-size: 10px !important; letter-spacing: 0.1em; text-transform: uppercase; border-bottom: 1px solid var(--rule); }
.npr__table tbody td { color: var(--ink-soft); }

.npr__faq { break-inside: avoid; margin-bottom: 14px; }
.npr__faq-q { margin: 0 0 4px; font-weight: 600; font-size: 15px; }
.npr__faq-a { margin: 0; font-size: 14px; line-height: 1.55; color: var(--ink-soft); text-align: justify; hyphens: auto; }

/* ── footer ────────────────────────────────────────────────────────────────── */
.npr__foot { display: grid; gap: clamp(24px, 4vw, 48px); padding-top: clamp(28px, 5vh, 48px); }
@media (min-width: 900px) { .npr__foot { grid-template-columns: 1.4fr 1fr; } }
.npr__cta { border: 2px solid var(--ink); padding: clamp(20px, 3vw, 32px); }
.npr .npr__cta-head { margin: 0 0 10px; font-family: 'Playfair Display', Georgia, serif !important; font-weight: 700 !important; font-size: clamp(20px, 2.4vw, 28px); line-height: 1.1; }
.npr__cta-body { margin: 0 0 18px; font-size: 14px; line-height: 1.6; color: var(--ink-soft); }
.npr__cta-links { display: flex; flex-direction: column; gap: 6px; }
.npr__cta-links a { display: inline-flex; justify-content: space-between; gap: 12px; padding: 8px 0; border-bottom: 1px solid var(--rule-soft); font-size: 14px; color: var(--ink); text-decoration: none; }
.npr__cta-links a:hover { padding-left: 6px; }
.npr__related-title { margin: 0 0 10px; font-size: 10px !important; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-soft); border-bottom: 2px solid var(--ink); padding-bottom: 6px; }
.npr__related ul { margin: 0; padding: 0; list-style: none; }
.npr__related li { border-bottom: 1px solid var(--rule-soft); }
.npr__related a { display: block; padding: 8px 0; font-size: 14px; color: var(--ink); text-decoration: none; }
.npr__related a:hover { text-decoration: underline; }

@media (prefers-reduced-motion: reduce) { .npr__cta-links a:hover { padding-left: 0; } }

/* ══════════════════════════════════════════════════════════════════════════════
   SYSTEM (default layout)
   ══════════════════════════════════════════════════════════════════════════════ */
.ins { position: relative; background: var(--surface-page, #f6f2ea); }
.ins__body { padding-top: calc(var(--nav-height, 80px) + clamp(28px, 6vh, 72px)); }

/* ── masthead ─────────────────────────────────────────────────────────────── */
.ins__head { padding-bottom: clamp(28px, 5vh, 56px); border-bottom: 1px solid var(--sv-border-lavender, rgba(20, 34, 63, 0.12)); }
.ins__crumb { display: flex; flex-wrap: wrap; gap: 10px; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-secondary); margin-bottom: clamp(24px, 5vh, 48px); }
.ins__crumb a { color: inherit; text-decoration: none; }
.ins__crumb a:hover { color: var(--ink-primary); text-decoration: underline; }
.ins__cat { margin: 0 0 14px; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-secondary); }
.ins__title { margin: 0 0 18px; color: var(--ink-primary); max-width: 20ch; }
.ins__sub { margin: 0 0 clamp(24px, 4vh, 40px); max-width: 46ch; font-size: clamp(17px, 1.7vw, 22px); line-height: 1.5; color: var(--ink-secondary); }
.ins__meta { display: flex; flex-wrap: wrap; gap: 12px 40px; margin: 0; font-size: 11px; letter-spacing: 0.1em; }
.ins__meta dt { text-transform: uppercase; color: var(--ink-secondary); margin-bottom: 4px; }
.ins__meta dd { margin: 0; color: var(--ink-primary); }

.ins__banner { margin: 0; padding-top: clamp(24px, 4vh, 44px); }
.ins__banner img { display: block; width: 100%; height: auto; border: 1px solid var(--sv-border-lavender, rgba(20, 34, 63, 0.16)); }

/* ── layout ───────────────────────────────────────────────────────────────── */
.ins__layout { display: grid; gap: clamp(28px, 5vw, 72px); padding-top: clamp(32px, 6vh, 64px); }
@media (min-width: 1024px) { .ins__layout { grid-template-columns: 220px minmax(0, 1fr); align-items: start; } }

.ins__rail { display: none; }
@media (min-width: 1024px) {
  .ins__rail { display: block; position: sticky; top: calc(var(--nav-height, 80px) + 24px); }
}
.ins__rail-title { margin: 0 0 12px; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-secondary); }
.ins__toc { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 9px; border-left: 1px solid var(--sv-border-lavender, rgba(20, 34, 63, 0.12)); }
.ins__toc a { display: block; padding-left: 14px; font-size: 13px; line-height: 1.35; color: var(--ink-secondary); text-decoration: none; }
.ins__toc a:hover { color: var(--ink-primary); }

/* ── prose ────────────────────────────────────────────────────────────────── */
/* The reading measure belongs on the TEXT, not on the column. Capping the column itself
   forced the comparison table into a 68ch box and made it scroll horizontally while a
   third of the grid cell sat empty beside it. Tables and flow diagrams now use the full
   cell; prose keeps its measure. */
.ins__prose { max-width: 1040px; }
.ins__prose > :is(.ins__p, .ins__h2, .ins__h3, .ins__list, .ins__defs, .ins__statement, .ins__faqs, .ins__flow, .ins__stack) {
  max-width: 68ch;
}
.ins__h2 { margin: clamp(40px, 7vh, 72px) 0 18px; font-size: clamp(24px, 3vw, 36px); font-weight: 300; line-height: 1.2; letter-spacing: -0.02em; color: var(--ink-primary); scroll-margin-top: calc(var(--nav-height, 80px) + 24px); }
.ins__h3 { margin: clamp(28px, 4vh, 44px) 0 12px; font-size: clamp(17px, 1.8vw, 22px); font-weight: 500; line-height: 1.3; color: var(--ink-primary); scroll-margin-top: calc(var(--nav-height, 80px) + 24px); }
.ins__p { margin: 0 0 16px; font-size: clamp(15px, 1.35vw, 17px); line-height: 1.72; color: var(--ink-secondary); }

.ins__list { margin: 0 0 20px; padding-left: 22px; display: flex; flex-direction: column; gap: 7px; font-size: clamp(15px, 1.35vw, 17px); line-height: 1.6; color: var(--ink-secondary); }
.ins__list--num { list-style: decimal; }

.ins__defs { margin: 0 0 22px; display: flex; flex-direction: column; gap: 14px; }
.ins__defs dt { font-size: clamp(15px, 1.4vw, 17px); font-weight: 600; color: var(--ink-primary); }
.ins__defs dd { margin: 5px 0 0; font-size: clamp(14px, 1.3vw, 16px); line-height: 1.65; color: var(--ink-secondary); }

.ins__statement { margin: clamp(24px, 4vh, 40px) 0; padding: clamp(20px, 3vw, 30px); }
.ins__statement p { margin: 0; font-size: clamp(17px, 2vw, 23px); line-height: 1.4; font-weight: 300; color: var(--ink-primary); }
.ins__statement-label { margin: 0 0 10px; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-secondary); }

/* the pipeline diagrams */
.ins__flow { margin: 0 0 22px; padding: 0; list-style: none; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; }
.ins__flow-step { display: inline-flex; align-items: center; gap: 10px; }
.ins__flow-step > span:first-child { padding: 7px 14px; border: 1px solid var(--sv-border-lavender, rgba(20, 34, 63, 0.16)); border-radius: 3px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-primary); background: rgba(255, 255, 255, 0.5); }
.ins__flow-arrow { color: var(--ink-secondary); }

/* the layered architecture diagram */
.ins__stack { margin: 0 0 26px; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 0; max-width: 640px; }
.ins__stack-layer { position: relative; padding: 16px 20px; border: 1px solid var(--sv-border-lavender, rgba(20, 34, 63, 0.16)); background: rgba(255, 255, 255, 0.45); }
.ins__stack-layer + .ins__stack-layer { margin-top: 26px; }
/* the connector between levels — drawn, not typed, so it never lands in copied text */
.ins__stack-layer + .ins__stack-layer::before {
  content: ''; position: absolute; left: 50%; top: -26px; width: 1px; height: 26px;
  background: var(--sv-border-lavender, rgba(20, 34, 63, 0.3));
}
.ins__stack-layer + .ins__stack-layer::after {
  content: ''; position: absolute; left: 50%; top: -8px; width: 5px; height: 5px;
  transform: translateX(-2.5px) rotate(45deg);
  border-right: 1px solid var(--sv-border-lavender, rgba(20, 34, 63, 0.45));
  border-bottom: 1px solid var(--sv-border-lavender, rgba(20, 34, 63, 0.45));
}
.ins__stack-name { margin: 0 0 6px; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-primary); }
.ins__stack-items { margin: 0; font-size: 13px; line-height: 1.55; color: var(--ink-secondary); }
.ins__stack-sep { opacity: 0.5; }

/* wide tables scroll inside themselves — the page never scrolls sideways */
.ins__tablewrap { margin: 0 0 26px; overflow-x: auto; border: 1px solid var(--sv-border-lavender, rgba(20, 34, 63, 0.14)); }
.ins__table { width: 100%; border-collapse: collapse; font-size: 13px; min-width: 560px; }
.ins__table-cap { padding: 12px 14px; text-align: left; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-secondary); border-bottom: 1px solid var(--sv-border-lavender, rgba(20, 34, 63, 0.14)); }
.ins__table th, .ins__table td { padding: 11px 14px; text-align: left; border-bottom: 1px solid var(--sv-border-lavender, rgba(20, 34, 63, 0.1)); vertical-align: top; }
.ins__table thead th { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-secondary); font-weight: 500; }
.ins__table tbody th { font-weight: 500; color: var(--ink-primary); }
.ins__table tbody td { color: var(--ink-secondary); }

/* ── FAQ ──────────────────────────────────────────────────────────────────── */
.ins__faqs { display: flex; flex-direction: column; }
.ins__faq { border-top: 1px solid var(--sv-border-lavender, rgba(20, 34, 63, 0.12)); }
.ins__faq:last-child { border-bottom: 1px solid var(--sv-border-lavender, rgba(20, 34, 63, 0.12)); }
.ins__faq summary { padding: 16px 0; cursor: pointer; font-size: clamp(15px, 1.4vw, 17px); font-weight: 500; color: var(--ink-primary); list-style: none; display: flex; justify-content: space-between; gap: 16px; }
.ins__faq summary::-webkit-details-marker { display: none; }
.ins__faq summary::after { content: '+'; color: var(--ink-secondary); flex-shrink: 0; }
.ins__faq[open] summary::after { content: '−'; }
.ins__faq p { margin: 0 0 18px; font-size: clamp(14px, 1.3vw, 16px); line-height: 1.7; color: var(--ink-secondary); }

/* ── related + CTA ────────────────────────────────────────────────────────── */
.ins__related { padding: clamp(40px, 7vh, 80px) var(--container-pad) 0; }
.ins__related-title { margin: 0 0 18px; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-secondary); }
.ins__related-list { margin: 0; padding: 0; list-style: none; display: grid; gap: 1px; background: var(--sv-border-lavender, rgba(20, 34, 63, 0.12)); border: 1px solid var(--sv-border-lavender, rgba(20, 34, 63, 0.12)); }
@media (min-width: 640px) { .ins__related-list { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .ins__related-list { grid-template-columns: repeat(4, 1fr); } }
.ins__related-list a { display: flex; justify-content: space-between; gap: 12px; padding: 16px 18px; background: var(--surface-page, #f6f2ea); font-size: 14px; color: var(--ink-primary); text-decoration: none; transition: background 0.2s ease; }
.ins__related-list a:hover { background: rgba(255, 255, 255, 0.7); }

.ins__cta { padding: clamp(40px, 7vh, 80px) var(--container-pad) clamp(60px, 10vh, 120px); }
.ins__cta-inner { padding: clamp(28px, 5vw, 56px); }
.ins__cta-head { margin: 0 0 14px; font-size: clamp(22px, 3vw, 34px); font-weight: 300; letter-spacing: -0.01em; color: var(--ink-primary); }
.ins__cta-body { margin: 0 0 26px; max-width: 60ch; font-size: clamp(15px, 1.4vw, 17px); line-height: 1.65; color: var(--ink-secondary); }
.ins__cta-links { display: flex; flex-wrap: wrap; gap: 10px; }
.ins__cta-link { display: inline-flex; align-items: center; gap: 10px; padding: 12px 22px; border: 1px solid var(--ink-primary); border-radius: 999px; font-size: 13px; color: var(--ink-primary); text-decoration: none; transition: background 0.2s ease, color 0.2s ease; }
.ins__cta-link:hover { background: var(--ink-primary); color: #fff; }
</style>
