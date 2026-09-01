<script setup lang="ts">
// PAPER · REPORT — the corporate research-report treatment.
//
// Drawn from the supplied references (KIOST annual report, ISECO Security Monitor, the
// "interfaces" journal), which share one language: white stock, a single vivid blue,
// full-bleed blue dividers, hairline rules, dot-matrix texture, ring diagrams and running
// folios. It is the executive register — a document meant to be read by a board.
//
// Third typographic voice of the three paper designs: serif (press), monospace
// (schematic), sans (report). The site forces Space Mono globally with an !important
// element rule, so holding a sans here costs !important on every type declaration.
import { computed } from 'vue'
import type { Insight } from '~~/lib/content/insights'

const props = defineProps<{ insight: Insight, publishedLabel: string, relatedLinks: { label: string, to: string }[] }>()
const a = props.insight

const sections = computed(() => {
  const out: { id: string, heading: string, blocks: Insight['blocks'] }[] = []
  let cur = { id: 'lede', heading: '', blocks: [] as Insight['blocks'] }
  for (const b of a.blocks) {
    if (b.kind === 'h2') {
      if (cur.blocks.length) out.push(cur)
      cur = { id: b.id, heading: b.text, blocks: [] }
    } else { cur.blocks.push(b) }
  }
  if (cur.blocks.length) out.push(cur)
  return out
})

/** Numbered from section ORDER, so inserting a section renumbers the report. */
const toc = computed(() =>
  sections.value.filter(s => s.heading)
    .map((s, i) => ({ n: String(i + 1).padStart(2, '0'), id: s.id, heading: s.heading })),
)
const numberOf = (id: string) => toc.value.find(t => t.id === id)?.n

useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' },
  ],
})
</script>

<template>
  <article class="rep">
    <!-- ── cover: full-bleed blue with the dot-matrix field ─────────────────── -->
    <header class="rep__cover">
      <div class="rep__dots" aria-hidden="true" />
      <div class="rep__cover-inner">
        <nav class="rep__crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">/</span>
          <NuxtLink to="/blog">Insights</NuxtLink><span aria-hidden="true">/</span>
          <span aria-current="page">{{ a.imprint?.label ?? 'White Paper' }}</span>
        </nav>

        <p class="rep__kicker">{{ a.imprint ? `${a.imprint.name} — ${a.imprint.label}` : 'A SVARA Research White Paper' }}</p>
        <h1 class="rep__title">{{ a.title }}</h1>
        <p class="rep__sub">{{ a.subtitle }}</p>

        <dl class="rep__meta">
          <div><dt>Category</dt><dd>{{ a.category }}</dd></div>
          <div v-if="a.extent"><dt>Extent</dt><dd>{{ a.extent }}</dd></div>
          <div><dt>Published</dt><dd><time :datetime="a.published">{{ publishedLabel }}</time></dd></div>
          <div><dt>Read</dt><dd>{{ a.readingTime }}</dd></div>
        </dl>
      </div>
    </header>

    <div class="rep__sheet">
      <!-- ── thesis ────────────────────────────────────────────────────────── -->
      <section v-if="a.corePosition" class="rep__thesis">
        <div class="rep__thesis-label">
          <span class="rep__rule" aria-hidden="true" />
          <p>{{ a.corePosition.heading }}</p>
        </div>
        <div class="rep__thesis-body">
          <p v-for="(p, i) in a.corePosition.paragraphs" :key="i">{{ p }}</p>
        </div>
      </section>

      <!-- ── contents ──────────────────────────────────────────────────────── -->
      <nav class="rep__contents" aria-labelledby="rep-contents">
        <h2 id="rep-contents">Contents</h2>
        <ol>
          <li v-for="t in toc" :key="t.id">
            <a :href="`#${t.id}`">
              <span class="rep__contents-n">{{ t.n }}</span>
              <span class="rep__contents-t">{{ t.heading }}</span>
              <span class="rep__contents-dots" aria-hidden="true" />
            </a>
          </li>
        </ol>
      </nav>

      <!-- ── body ──────────────────────────────────────────────────────────── -->
      <section v-for="sec in sections" :key="sec.id" class="rep__section">
        <!-- the full-bleed blue divider that opens each part -->
        <div v-if="sec.heading" :id="sec.id" class="rep__divider">
          <span class="rep__divider-n">{{ numberOf(sec.id) }}</span>
          <h2 class="rep__divider-h">{{ sec.heading }}</h2>
        </div>

        <div class="rep__body">
          <template v-for="(b, i) in sec.blocks" :key="i">
            <h3 v-if="b.kind === 'h3'" :id="b.id" class="rep__h3">{{ b.text }}</h3>
            <p v-else-if="b.kind === 'p'" class="rep__p">{{ b.text }}</p>

            <aside v-else-if="b.kind === 'statement'" class="rep__pull">
              <p v-if="b.label" class="rep__pull-label">{{ b.label }}</p>
              <p class="rep__pull-text">{{ b.text }}</p>
            </aside>

            <ul v-else-if="b.kind === 'ul'" class="rep__list">
              <li v-for="(it, j) in b.items" :key="j">{{ it }}</li>
            </ul>
            <ol v-else-if="b.kind === 'ol'" class="rep__list rep__list--num">
              <li v-for="(it, j) in b.items" :key="j">{{ it }}</li>
            </ol>

            <dl v-else-if="b.kind === 'defs'" class="rep__defs">
              <template v-for="(d, j) in b.items" :key="j">
                <dt>{{ d.term }}</dt><dd>{{ d.text }}</dd>
              </template>
            </dl>

            <!-- a flow as the reference's stepped process band -->
            <ol v-else-if="b.kind === 'flow'" class="rep__flow" aria-label="Process sequence">
              <li v-for="(st, j) in b.steps" :key="j" v-reveal="{ delay: j * 0.05, y: 8 }">
                <span class="rep__flow-n">{{ String(j + 1).padStart(2, '0') }}</span>
                <span class="rep__flow-l">{{ st }}</span>
              </li>
            </ol>

            <ol v-else-if="b.kind === 'stack'" class="rep__stack" aria-label="Architecture layers">
              <li v-for="(ly, j) in b.layers" :key="j" v-reveal="{ delay: j * 0.06, y: 10 }">
                <span class="rep__stack-n">{{ String(j + 1).padStart(2, '0') }}</span>
                <div>
                  <p class="rep__stack-name">{{ ly.name }}</p>
                  <p class="rep__stack-items">{{ ly.items.join(' · ') }}</p>
                </div>
              </li>
            </ol>

            <figure v-else-if="b.kind === 'scale'" class="rep__scale">
              <figcaption v-if="b.caption">{{ b.caption }}</figcaption>
              <ol>
                <li
                  v-for="(lv, j) in b.levels"
                  :key="j"
                  v-reveal="{ delay: j * 0.06, y: 10 }"
                  :style="{ '--h': `${30 + (j / Math.max(1, b.levels.length - 1)) * 70}%` }"
                >
                  <span class="rep__scale-bar" aria-hidden="true" />
                  <span class="rep__scale-label">{{ lv.label }}</span>
                  <span class="rep__scale-text">{{ lv.text }}</span>
                </li>
              </ol>
            </figure>

            <!-- drawing hidden from assistive tech; the required alt is announced instead -->
            <figure v-else-if="b.kind === 'ascii'" v-reveal class="rep__ascii">
              <figcaption v-if="b.caption">{{ b.caption }}</figcaption>
              <pre aria-hidden="true"><code>{{ b.art }}</code></pre>
              <p class="rep__sr">{{ b.alt }}</p>
            </figure>

            <div v-else-if="b.kind === 'table'" v-reveal class="rep__tablewrap">
              <table class="rep__table">
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

        <!-- running folio, as in the references -->
        <p v-if="sec.heading" class="rep__folio" aria-hidden="true">
          <span>{{ a.title }}</span><span>{{ numberOf(sec.id) }}</span>
        </p>
      </section>

      <section class="rep__section">
        <div id="closing" class="rep__divider rep__divider--end">
          <span class="rep__divider-n">✦</span>
          <h2 class="rep__divider-h">{{ a.closing.heading }}</h2>
        </div>
        <div class="rep__body">
          <p v-for="(p, i) in a.closing.paragraphs" :key="i" class="rep__p">{{ p }}</p>
        </div>
      </section>

      <!-- ── back matter ───────────────────────────────────────────────────── -->
      <footer class="rep__foot">
        <div class="rep__cta">
          <p class="rep__cta-head">{{ a.cta.headline }}</p>
          <p class="rep__cta-body">{{ a.cta.body }}</p>
          <div class="rep__cta-links">
            <NuxtLink v-for="l in a.cta.links" :key="l.to" :to="l.to">{{ l.label }}<span aria-hidden="true">→</span></NuxtLink>
          </div>
        </div>
        <div class="rep__related">
          <p class="rep__related-head">Related</p>
          <ul><li v-for="r in relatedLinks" :key="r.to"><NuxtLink :to="r.to">{{ r.label }}</NuxtLink></li></ul>
        </div>
      </footer>
    </div>
  </article>
</template>

<style scoped>
.rep {
  --paper: #ffffff;
  --paper-tint: #f4f6fb;
  --ink: #0f1420;
  --ink-soft: #52596b;
  --blue: #1b3bc4;
  --blue-deep: #142c93;
  --blue-tint: #eaeeff;
  --rule: rgba(15, 20, 32, 0.14);
  --rule-soft: rgba(15, 20, 32, 0.08);
  background: var(--paper);
  color: var(--ink);
}
.rep :is(p, h1, h2, h3, li, dt, dd, th, td, caption, a, span, time) {
  font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
}
.rep__sheet { max-width: 1080px; margin-inline: auto; padding: 0 clamp(16px, 4vw, 56px); }

/* ── cover ─────────────────────────────────────────────────────────────────── */
.rep__cover {
  position: relative;
  overflow: hidden;
  background: linear-gradient(160deg, var(--blue) 0%, var(--blue-deep) 100%);
  color: #fff;
  padding: calc(var(--nav-height, 80px) + 48px) clamp(16px, 4vw, 56px) clamp(48px, 8vh, 96px);
}
/* the dot-matrix field from the references, drawn rather than shipped as an image */
.rep__dots {
  position: absolute; inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.28) 1px, transparent 1px);
  background-size: 22px 22px;
  mask-image: radial-gradient(120% 90% at 78% 18%, #000 0%, transparent 68%);
  -webkit-mask-image: radial-gradient(120% 90% at 78% 18%, #000 0%, transparent 68%);
  pointer-events: none;
}
.rep__cover-inner { position: relative; max-width: 1080px; margin-inline: auto; }
.rep__crumb { display: flex; gap: 8px; margin: 0 0 40px; font-size: 11px !important; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255, 255, 255, 0.72); }
.rep__crumb a { color: inherit; text-decoration: none; }
.rep__crumb a:hover { color: #fff; text-decoration: underline; }
.rep__kicker { margin: 0 0 20px; font-size: 11px !important; font-weight: 600 !important; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255, 255, 255, 0.82); }
.rep .rep__title { margin: 0 0 18px; font-weight: 700 !important; font-size: clamp(32px, 6vw, 72px) !important; line-height: 1.03 !important; letter-spacing: -0.03em !important; max-width: 18ch; }
.rep__sub { margin: 0 0 44px; max-width: 54ch; font-weight: 300 !important; font-size: clamp(15px, 1.9vw, 22px); line-height: 1.45; color: rgba(255, 255, 255, 0.86); }
.rep__meta { margin: 0; display: grid; gap: 18px 32px; grid-template-columns: repeat(2, minmax(0, 1fr)); padding-top: 26px; border-top: 1px solid rgba(255, 255, 255, 0.3); }
@media (min-width: 760px) { .rep__meta { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
.rep__meta dt { font-size: 10px !important; font-weight: 600 !important; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255, 255, 255, 0.66); margin-bottom: 6px; }
.rep__meta dd { margin: 0; font-size: 13px; color: #fff; }

/* ── thesis ────────────────────────────────────────────────────────────────── */
.rep__thesis { display: grid; gap: clamp(18px, 3vw, 44px); padding: clamp(40px, 7vh, 80px) 0; border-bottom: 1px solid var(--rule); }
@media (min-width: 900px) { .rep__thesis { grid-template-columns: 210px minmax(0, 1fr); } }
.rep__thesis-label p { margin: 0; font-size: 11px !important; font-weight: 600 !important; letter-spacing: 0.18em; text-transform: uppercase; color: var(--blue); }
.rep__rule { display: block; width: 40px; height: 2px; background: var(--blue); margin-bottom: 12px; }
.rep__thesis-body p { margin: 0 0 16px; max-width: 66ch; font-size: clamp(15px, 1.6vw, 19px); line-height: 1.6; color: var(--ink); }
.rep__thesis-body p:last-child { margin-bottom: 0; }

/* ── contents ──────────────────────────────────────────────────────────────── */
.rep__contents { padding: clamp(36px, 6vh, 68px) 0; border-bottom: 1px solid var(--rule); }
.rep .rep__contents h2 { margin: 0 0 24px; font-weight: 600 !important; font-size: clamp(18px, 2.2vw, 24px) !important; }
.rep__contents ol { margin: 0; padding: 0; list-style: none; display: grid; }
@media (min-width: 860px) { .rep__contents ol { grid-template-columns: 1fr 1fr; column-gap: 56px; } }
.rep__contents li { border-bottom: 1px solid var(--rule-soft); }
.rep__contents a { display: flex; align-items: baseline; gap: 14px; padding: 11px 0; font-size: 14px; color: var(--ink); text-decoration: none; }
.rep__contents a:hover { color: var(--blue); }
.rep__contents-n { flex-shrink: 0; font-size: 11px !important; font-weight: 600 !important; letter-spacing: 0.08em; color: var(--blue); }
.rep__contents-dots { flex: 1; border-bottom: 1px dotted var(--rule); transform: translateY(-3px); }

/* ── section dividers: the full-bleed blue band ────────────────────────────── */
.rep__divider {
  position: relative;
  margin: clamp(40px, 7vh, 88px) calc(50% - 50vw) clamp(26px, 4vh, 44px);
  padding: clamp(26px, 4.5vw, 52px) max(clamp(16px, 4vw, 56px), calc(50vw - 540px + clamp(16px, 4vw, 56px)));
  background: var(--blue);
  color: #fff;
  scroll-margin-top: calc(var(--nav-height, 80px) + 12px);
}
.rep__divider--end { background: var(--ink); }
.rep__divider-n { display: block; margin-bottom: 10px; font-size: 12px !important; font-weight: 600 !important; letter-spacing: 0.2em; color: rgba(255, 255, 255, 0.7); }
.rep .rep__divider-h { margin: 0; font-weight: 600 !important; font-size: clamp(22px, 3.4vw, 40px) !important; line-height: 1.12 !important; letter-spacing: -0.02em !important; max-width: 26ch; }

/* ── body ──────────────────────────────────────────────────────────────────── */
.rep__body { max-width: 74ch; }
.rep .rep__h3 { margin: 32px 0 12px; font-weight: 600 !important; font-size: clamp(15px, 1.6vw, 18px) !important; color: var(--blue); }
.rep__p { margin: 0 0 15px; font-size: clamp(14px, 1.4vw, 16.5px); line-height: 1.72; color: var(--ink-soft); }

.rep__list { margin: 0 0 18px; padding-left: 0; list-style: none; }
.rep__list li { position: relative; padding-left: 22px; margin-bottom: 8px; font-size: clamp(14px, 1.35vw, 16px); line-height: 1.6; color: var(--ink-soft); }
.rep__list li::before { content: ''; position: absolute; left: 4px; top: 0.62em; width: 6px; height: 6px; border-radius: 50%; background: var(--blue); }
.rep__list--num { counter-reset: rep; }
.rep__list--num li::before { content: counter(rep); counter-increment: rep; left: 0; top: 0; width: auto; height: auto; border-radius: 0; background: none; color: var(--blue); font-size: 11px; font-weight: 600; }

.rep__defs { margin: 0 0 20px; }
.rep__defs dt { margin-top: 16px; font-weight: 600 !important; font-size: clamp(14px, 1.4vw, 16px); color: var(--ink); }
.rep__defs dd { margin: 5px 0 0; padding-left: 14px; border-left: 2px solid var(--blue-tint); font-size: clamp(13.5px, 1.35vw, 15.5px); line-height: 1.65; color: var(--ink-soft); }

.rep__pull { margin: 26px 0; padding: clamp(18px, 2.6vw, 28px); background: var(--blue-tint); border-left: 3px solid var(--blue); }
.rep__pull-label { margin: 0 0 8px; font-size: 10px !important; font-weight: 600 !important; letter-spacing: 0.18em; text-transform: uppercase; color: var(--blue); }
.rep__pull-text { margin: 0; font-weight: 500 !important; font-size: clamp(16px, 1.9vw, 21px); line-height: 1.42; color: var(--ink); }

/* stepped process band */
.rep__flow { margin: 22px 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 8px; }
.rep__flow li { display: flex; align-items: center; gap: 9px; padding: 9px 14px; border: 1px solid var(--rule); background: var(--paper-tint); }
.rep__flow-n { font-size: 10px !important; font-weight: 700 !important; color: var(--blue); }
.rep__flow-l { font-size: 11.5px; font-weight: 500 !important; letter-spacing: 0.04em; text-transform: uppercase; }

.rep__stack { margin: 24px 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 1px; background: var(--rule-soft); border: 1px solid var(--rule); }
.rep__stack li { display: flex; gap: 16px; padding: 14px 18px; background: var(--paper); }
.rep__stack-n { flex-shrink: 0; font-size: 11px !important; font-weight: 700 !important; color: var(--blue); padding-top: 2px; }
.rep__stack-name { margin: 0 0 4px; font-weight: 600 !important; font-size: 13px; }
.rep__stack-items { margin: 0; font-size: 12.5px; color: var(--ink-soft); }

.rep__scale { margin: 26px 0; }
.rep__scale figcaption { margin-bottom: 14px; font-size: 10px !important; font-weight: 600 !important; letter-spacing: 0.16em; text-transform: uppercase; color: var(--blue); }
.rep__scale ol { margin: 0; padding: 0; list-style: none; display: grid; gap: 1px; background: var(--rule-soft); border: 1px solid var(--rule); }
.rep__scale li { position: relative; display: grid; grid-template-columns: minmax(0, 1fr); gap: 3px; padding: 13px 18px; background: var(--paper); overflow: hidden; }
@media (min-width: 720px) { .rep__scale li { grid-template-columns: 230px minmax(0, 1fr); gap: 18px; align-items: baseline; } }
/* fill only — a hard right edge drew a rule straight through the description text */
.rep__scale-bar { position: absolute; left: 0; top: 0; bottom: 0; width: var(--h); background: linear-gradient(90deg, var(--blue-tint), rgba(234, 238, 255, 0.25)); }
.rep__scale-label { position: relative; font-weight: 600 !important; font-size: 13px; }
.rep__scale-text { position: relative; font-size: 13px; line-height: 1.6; color: var(--ink-soft); }

/* ASCII drawings. This design is otherwise sans, so the <pre> has to opt back into a
   monospace stack explicitly or box-drawing characters lose their alignment. */
.rep__ascii { margin: 28px 0; }
.rep__ascii figcaption { margin-bottom: 12px; font-size: 10px !important; font-weight: 600 !important; letter-spacing: 0.16em; text-transform: uppercase; color: var(--blue); }
.rep__ascii pre { margin: 0; padding: 20px; overflow-x: auto; border: 1px solid var(--rule); background: var(--paper-tint); }
.rep__ascii code {
  display: block; white-space: pre; color: var(--ink);
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace !important;
  font-size: 11.5px; line-height: 1.45;
}
.rep__sr { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }

.rep__tablewrap { margin: 24px 0; overflow-x: auto; }
.rep__table { width: 100%; border-collapse: collapse; font-size: 13px; min-width: 560px; }
.rep__table caption { padding: 0 0 12px; text-align: left; font-size: 10px !important; font-weight: 600 !important; letter-spacing: 0.16em; text-transform: uppercase; color: var(--blue); }
.rep__table th, .rep__table td { padding: 11px 14px; text-align: left; border-bottom: 1px solid var(--rule-soft); vertical-align: top; }
.rep__table thead th { font-size: 10px !important; font-weight: 600 !important; letter-spacing: 0.12em; text-transform: uppercase; color: #fff; background: var(--blue); border-bottom: none; }
.rep__table tbody th { font-weight: 500 !important; }
.rep__table tbody td { color: var(--ink-soft); }

/* running folio */
.rep__folio { display: flex; justify-content: space-between; margin: clamp(24px, 4vh, 44px) 0 0; padding-top: 10px; border-top: 1px solid var(--rule-soft); font-size: 10px !important; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-soft); }

/* ── back matter ───────────────────────────────────────────────────────────── */
.rep__foot { display: grid; gap: clamp(24px, 4vw, 48px); padding: clamp(44px, 7vh, 88px) 0 clamp(60px, 10vh, 120px); }
@media (min-width: 900px) { .rep__foot { grid-template-columns: 1.4fr 1fr; } }
.rep__cta { padding: clamp(24px, 3.4vw, 40px); background: var(--blue); color: #fff; }
.rep .rep__cta-head { margin: 0 0 14px; font-weight: 600 !important; font-size: clamp(15px, 1.9vw, 22px); line-height: 1.28; }
.rep__cta-body { margin: 0 0 24px; font-size: 13.5px; line-height: 1.6; color: rgba(255, 255, 255, 0.82); }
.rep__cta-links { display: flex; flex-direction: column; }
.rep__cta-links a { display: flex; justify-content: space-between; gap: 12px; padding: 11px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.24); font-size: 13.5px; color: #fff; text-decoration: none; }
.rep__cta-links a:hover { padding-left: 6px; }
.rep__related-head { margin: 0 0 12px; padding-bottom: 8px; border-bottom: 2px solid var(--blue); font-size: 10px !important; font-weight: 600 !important; letter-spacing: 0.2em; text-transform: uppercase; }
.rep__related ul { margin: 0; padding: 0; list-style: none; }
.rep__related li { border-bottom: 1px solid var(--rule-soft); }
.rep__related a { display: block; padding: 10px 0; font-size: 13.5px; color: var(--ink); text-decoration: none; }
.rep__related a:hover { color: var(--blue); }

@media (prefers-reduced-motion: reduce) { .rep__cta-links a:hover { padding-left: 0; } }
</style>
