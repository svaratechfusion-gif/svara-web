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
import PaperSchematic from '~/components/insights/PaperSchematic.vue'
import PaperReport from '~/components/insights/PaperReport.vue'
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

/** Sibling articles first, then the product and division links the article names. */
const relatedLinks = computed(() => [...siblingInsights(a.slug), ...a.related])


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

const isPaper = computed(() => a.kind === 'paper')
/** A paper set as a dark system diagram rather than on paper stock. */
const isSchematic = computed(() => a.kind === 'paper' && a.design === 'schematic')
/** A paper set as a corporate research report. */
const isReport = computed(() => a.kind === 'paper' && a.design === 'report')

/**
 * The contents page. Numbered from the section order rather than from text typed into
 * each heading, so inserting a section renumbers the document instead of silently
 * producing two "07"s.
 */
const toc = computed(() =>
  sections.value
    .filter(sec => sec.heading)
    .map((sec, i) => ({ n: String(i + 1).padStart(2, '0'), id: sec.id, heading: sec.heading })),
)

// Broadsheet typography. The site is globally Space Mono via styles/global-font.css, so
// the serif has to be loaded here and applied with enough weight to beat that rule. The
// schematic design agrees with the global face instead, so it needs no font at all.
// press only — the schematic uses the site's mono, the report loads Inter itself
if (a.design !== 'schematic' && a.design !== 'report') useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;0,900;1,500&family=Spectral:ital,wght@0,300;0,400;0,600;1,400&display=swap' },
  ],
})


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
  '@type': a.kind === 'paper' ? 'Report' : 'Article',
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

// A white paper has no FAQ, and an empty FAQPage node is worse than none.
if (a.faqs?.length) {
  useStructuredData({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: a.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  })
}

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
  <PaperReport
    v-if="article && isReport"
    :insight="a"
    :published-label="publishedLabel"
    :related-links="relatedLinks"
  />

  <PaperSchematic
    v-else-if="article && isSchematic"
    :insight="a"
    :published-label="publishedLabel"
    :related-links="relatedLinks"
  />

  <article v-else-if="article" class="npr">
    <div class="npr__sheet">
      <!-- nameplate -->
      <header class="npr__masthead">
        <nav class="npr__crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">·</span>
          <NuxtLink to="/blog">Insights</NuxtLink>
        </nav>
        <p class="npr__nameplate">{{ isPaper ? 'SVARA Research' : 'SVARA Intelligence Journal' }}</p>
        <p class="npr__folio">
          <span>{{ a.category }}</span>
          <span><time :datetime="a.published">{{ publishedLabel }}</time></span>
          <span>{{ a.readingTime }}</span>
          <span>{{ a.contentType }}</span>
        </p>
      </header>

      <!-- ── PAPER: cover + contents ─────────────────────────────────────────── -->
      <template v-if="isPaper">
        <div class="npr__cover">
          <p class="npr__cover-kicker">A SVARA Research White Paper</p>
          <h1 class="npr__cover-title">{{ a.title }}</h1>
          <p class="npr__cover-sub">{{ a.subtitle }}</p>
          <dl class="npr__cover-meta">
            <div><dt>Category</dt><dd>{{ a.category }}</dd></div>
            <div v-if="a.extent"><dt>Extent</dt><dd>{{ a.extent }}</dd></div>
            <div><dt>Published</dt><dd><time :datetime="a.published">{{ publishedLabel }}</time></dd></div>
          </dl>
        </div>

        <section v-if="a.corePosition" class="npr__position">
          <h2 class="npr__position-head">{{ a.corePosition.heading }}</h2>
          <p v-for="(pgh, i) in a.corePosition.paragraphs" :key="i">{{ pgh }}</p>
        </section>

        <nav class="npr__toc" aria-labelledby="toc-head">
          <h2 id="toc-head" class="npr__toc-head">Contents</h2>
          <ol>
            <li v-for="t in toc" :key="t.id">
              <a :href="`#${t.id}`"><span class="npr__toc-n">{{ t.n }}</span><span>{{ t.heading }}</span></a>
            </li>
          </ol>
        </nav>
      </template>

      <!-- headline block (article) -->
      <div v-else class="npr__head">
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
              :width="a.heroImage.width"
              :height="a.heroImage.height"
              fetchpriority="high"
              decoding="async"
            >
          </picture>
        </a>
      </figure>

      <!-- body: each section gets its own column set -->
      <div class="npr__body">
        <section v-for="(sec, si) in sections" :key="sec.id" class="npr__section">
          <h2 v-if="sec.heading" :id="sec.id" class="npr__h2">
            <span v-if="isPaper && toc.find(t => t.id === sec.id)" class="npr__h2-n">{{ toc.find(t => t.id === sec.id)?.n }}</span>{{ sec.heading }}
          </h2>
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
        <section v-if="a.faqs?.length" class="npr__section">
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

/* ── PAPER: cover, core position, contents ─────────────────────────────────── */
.npr__cover { padding: clamp(40px, 9vh, 96px) 0; border-bottom: 1px solid var(--rule); text-align: center; }
.npr__cover-kicker { margin: 0 0 22px; font-size: 11px !important; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-soft); }
.npr .npr__cover-title {
  margin: 0 0 16px;
  font-family: 'Playfair Display', Georgia, serif !important;
  font-weight: 700 !important;
  font-size: clamp(32px, 6.2vw, 76px) !important;
  line-height: 1.02 !important; letter-spacing: -0.02em !important;
  max-width: 20ch; margin-inline: auto;
}
.npr__cover-sub { margin: 0 auto 30px; max-width: 52ch; font-style: italic; font-size: clamp(16px, 2vw, 24px); line-height: 1.35; color: var(--ink-soft); }
.npr__cover-meta { margin: 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 14px 44px; padding-top: 22px; border-top: 1px solid var(--rule-soft); }
.npr__cover-meta dt { font-size: 10px !important; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-soft); margin-bottom: 4px; }
.npr__cover-meta dd { margin: 0; font-size: 13px; }

/* the core position is the argument in one panel — it opens the document */
.npr__position { padding: clamp(28px, 5vh, 52px) 0; border-bottom: 1px solid var(--rule-soft); }
.npr .npr__position-head { margin: 0 0 16px; font-family: 'Playfair Display', Georgia, serif !important; font-weight: 700 !important; font-size: clamp(18px, 2.2vw, 26px) !important; }
.npr__position p { margin: 0 auto 14px; max-width: 70ch; font-size: clamp(15px, 1.5vw, 18px); line-height: 1.65; }

.npr__toc { padding: clamp(28px, 5vh, 52px) 0; border-bottom: 3px double var(--rule); }
.npr .npr__toc-head { margin: 0 0 18px; font-family: 'Playfair Display', Georgia, serif !important; font-weight: 700 !important; font-size: clamp(18px, 2.2vw, 26px) !important; }
.npr__toc ol { margin: 0; padding: 0; list-style: none; columns: 1; column-gap: 48px; }
@media (min-width: 760px) { .npr__toc ol { columns: 2; } }
.npr__toc li { break-inside: avoid; border-bottom: 1px solid var(--rule-soft); }
.npr__toc a { display: flex; gap: 14px; padding: 9px 0; font-size: 14px; color: var(--ink); text-decoration: none; }
.npr__toc a:hover { color: var(--ink-soft); }
.npr__toc-n { flex-shrink: 0; font-size: 11px; letter-spacing: 0.1em; color: var(--ink-soft); padding-top: 2px; }

/* section numbers hang beside the heading rather than sitting inside the text */
.npr__h2-n { display: block; margin-bottom: 4px; font-size: 11px !important; letter-spacing: 0.2em; color: var(--ink-soft); font-family: 'Spectral', Georgia, serif !important; font-weight: 400 !important; }

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

</style>
