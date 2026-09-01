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
import { getInsight } from '~~/lib/content/insights'
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
  <article v-if="article" class="ins">
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
          <li v-for="r in a.related" :key="r.to">
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
.ins__prose > :is(.ins__p, .ins__h2, .ins__h3, .ins__list, .ins__defs, .ins__statement, .ins__faqs, .ins__flow) {
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
