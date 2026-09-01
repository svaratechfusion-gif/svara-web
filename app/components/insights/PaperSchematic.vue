<script setup lang="ts">
// PAPER · SCHEMATIC — the dark instrument treatment for a white paper whose subject is an
// architecture. Deliberately the opposite of the broadsheet: no serif, no columns, no
// paper stock. The document is read as a system diagram — hairline rules, bracketed
// section markers, a cyclic cover, HUD panels.
//
// It uses the SITE's own monospace rather than loading a face. styles/global-font.css
// already forces Space Mono site-wide with an !important element rule, so the broadsheet
// has to fight that with its own !important serif — this design simply agrees with it,
// which is why there is not a single font-family declaration below.
import { computed } from 'vue'
import type { Insight } from '~~/lib/content/insights'

const props = defineProps<{ insight: Insight, publishedLabel: string, relatedLinks: { label: string, to: string }[] }>()
const a = props.insight

/** Blocks grouped under their H2, so each section can carry a number and a rule. */
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

/** Numbered from section ORDER — inserting a section renumbers the document. */
const toc = computed(() =>
  sections.value.filter(s => s.heading)
    .map((s, i) => ({ n: String(i + 1).padStart(2, '0'), id: s.id, heading: s.heading })),
)
const numberOf = (id: string) => toc.value.find(t => t.id === id)?.n

/** The cover loop. Taken from the first `flow` block so the cover and body cannot drift. */
const coverLoop = computed(() => {
  const f = a.blocks.find(b => b.kind === 'flow')
  return f && f.kind === 'flow' ? f.steps : []
})
</script>

<template>
  <article class="sch">
    <div class="sch__sheet">
      <!-- ── cover ─────────────────────────────────────────────────────────── -->
      <header class="sch__cover">
        <nav class="sch__crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">HOME</NuxtLink><span aria-hidden="true">/</span>
          <NuxtLink to="/blog">INSIGHTS</NuxtLink><span aria-hidden="true">/</span>
          <span aria-current="page">{{ (a.imprint?.label ?? 'White Paper').toUpperCase() }}</span>
        </nav>

        <p class="sch__stamp">
          <span class="sch__dot" aria-hidden="true" />{{ (a.imprint?.name ?? 'SVARA Research').toUpperCase() }} — {{ (a.imprint?.label ?? 'White Paper').toUpperCase() }}
        </p>

        <h1 class="sch__title">{{ a.title }}</h1>
        <p class="sch__sub">{{ a.subtitle }}</p>

        <!-- the loop, drawn as the cover device -->
        <ol v-if="coverLoop.length" class="sch__loop" aria-label="The intelligence loop">
          <li v-for="(step, i) in coverLoop" :key="i">
            <span class="sch__loop-n">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="sch__loop-l">{{ step }}</span>
          </li>
          <li class="sch__loop-back" aria-hidden="true"><span>↺ REPEAT</span></li>
        </ol>

        <dl class="sch__meta">
          <div><dt>CATEGORY</dt><dd>{{ a.category }}</dd></div>
          <div v-if="a.extent"><dt>EXTENT</dt><dd>{{ a.extent }}</dd></div>
          <div><dt>PUBLISHED</dt><dd><time :datetime="a.published">{{ publishedLabel }}</time></dd></div>
          <div><dt>READ</dt><dd>{{ a.readingTime }}</dd></div>
        </dl>
      </header>

      <!-- ── premise ───────────────────────────────────────────────────────── -->
      <section v-if="a.corePosition" class="sch__premise">
        <p class="sch__premise-label">{{ a.corePosition.heading }}</p>
        <p v-for="(p, i) in a.corePosition.paragraphs" :key="i">{{ p }}</p>
      </section>

      <!-- ── index ─────────────────────────────────────────────────────────── -->
      <nav class="sch__index" aria-labelledby="sch-index">
        <p id="sch-index" class="sch__index-head">INDEX</p>
        <ol>
          <li v-for="t in toc" :key="t.id">
            <a :href="`#${t.id}`"><span class="sch__index-n">{{ t.n }}</span><span>{{ t.heading }}</span></a>
          </li>
        </ol>
      </nav>

      <!-- ── body ──────────────────────────────────────────────────────────── -->
      <div class="sch__body">
        <section v-for="sec in sections" :key="sec.id" class="sch__section">
          <h2 v-if="sec.heading" :id="sec.id" class="sch__h2">
            <span class="sch__h2-n">[ {{ numberOf(sec.id) }} ]</span>{{ sec.heading }}
          </h2>

          <template v-for="(b, i) in sec.blocks" :key="i">
            <h3 v-if="b.kind === 'h3'" :id="b.id" class="sch__h3">{{ b.text }}</h3>
            <p v-else-if="b.kind === 'p'" class="sch__p">{{ b.text }}</p>

            <aside v-else-if="b.kind === 'statement'" class="sch__note">
              <p v-if="b.label" class="sch__note-label">{{ b.label }}</p>
              <p class="sch__note-text">{{ b.text }}</p>
            </aside>

            <ul v-else-if="b.kind === 'ul'" class="sch__list">
              <li v-for="(it, j) in b.items" :key="j">{{ it }}</li>
            </ul>
            <ol v-else-if="b.kind === 'ol'" class="sch__list sch__list--num">
              <li v-for="(it, j) in b.items" :key="j">{{ it }}</li>
            </ol>

            <dl v-else-if="b.kind === 'defs'" class="sch__defs">
              <template v-for="(d, j) in b.items" :key="j">
                <dt>{{ d.term }}</dt><dd>{{ d.text }}</dd>
              </template>
            </dl>

            <!-- a flow reads as a signal chain -->
            <ol v-else-if="b.kind === 'flow'" class="sch__chain" aria-label="Sequence">
              <li v-for="(st, j) in b.steps" :key="j" v-reveal="{ delay: j * 0.05, y: 8 }">
                <span class="sch__chain-n">{{ String(j + 1).padStart(2, '0') }}</span>
                <span class="sch__chain-l">{{ st }}</span>
              </li>
            </ol>

            <ol v-else-if="b.kind === 'stack'" class="sch__stack" aria-label="Architecture layers">
              <li v-for="(ly, j) in b.layers" :key="j" v-reveal="{ delay: j * 0.06, y: 10 }">
                <p class="sch__stack-name">{{ ly.name }}</p>
                <p class="sch__stack-items">{{ ly.items.join('  ·  ') }}</p>
              </li>
            </ol>

            <figure v-else-if="b.kind === 'scale'" class="sch__scale">
              <figcaption v-if="b.caption">{{ b.caption }}</figcaption>
              <ol>
                <li
                  v-for="(lv, j) in b.levels"
                  :key="j"
                  v-reveal="{ delay: j * 0.06, y: 10 }"
                  :style="{ '--h': `${30 + (j / Math.max(1, b.levels.length - 1)) * 70}%` }"
                >
                  <span class="sch__scale-bar" aria-hidden="true" />
                  <span class="sch__scale-n">{{ String(j + 1).padStart(2, '0') }}</span>
                  <span class="sch__scale-label">{{ lv.label }}</span>
                  <span class="sch__scale-text">{{ lv.text }}</span>
                </li>
              </ol>
            </figure>

            <!-- the drawing is hidden from assistive tech; `alt` is announced instead,
                 because box-drawing characters read aloud as punctuation soup -->
            <figure v-else-if="b.kind === 'ascii'" v-reveal class="sch__ascii">
              <figcaption v-if="b.caption">{{ b.caption }}</figcaption>
              <pre aria-hidden="true"><code>{{ b.art }}</code></pre>
              <p class="sch__sr">{{ b.alt }}</p>
            </figure>

            <div v-else-if="b.kind === 'table'" v-reveal class="sch__tablewrap">
              <table class="sch__table">
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
        </section>

        <section class="sch__section">
          <h2 id="closing" class="sch__h2"><span class="sch__h2-n">[ ✦ ]</span>{{ a.closing.heading }}</h2>
          <p v-for="(p, i) in a.closing.paragraphs" :key="i" class="sch__p">{{ p }}</p>
        </section>
      </div>

      <!-- ── footer ────────────────────────────────────────────────────────── -->
      <footer class="sch__foot">
        <div class="sch__cta">
          <p class="sch__cta-head">{{ a.cta.headline }}</p>
          <p class="sch__cta-body">{{ a.cta.body }}</p>
          <div class="sch__cta-links">
            <NuxtLink v-for="l in a.cta.links" :key="l.to" :to="l.to">{{ l.label }}<span aria-hidden="true">→</span></NuxtLink>
          </div>
        </div>
        <div class="sch__related">
          <p class="sch__related-head">RELATED</p>
          <ul><li v-for="r in relatedLinks" :key="r.to"><NuxtLink :to="r.to">{{ r.label }}</NuxtLink></li></ul>
        </div>
      </footer>
    </div>
  </article>
</template>

<style scoped>
.sch {
  --ink: #e6edf8;
  --ink-soft: rgba(206, 220, 244, 0.62);
  --rule: rgba(120, 160, 220, 0.24);
  --rule-soft: rgba(120, 160, 220, 0.12);
  --sig: #00e5ff;
  --sig2: #6ba6ff;
  background: radial-gradient(120% 80% at 50% 0%, #101a2e 0%, #0a1018 55%, #070a11 100%);
  color: var(--ink);
  padding: calc(var(--nav-height, 80px) + 28px) clamp(16px, 4vw, 48px) clamp(60px, 10vh, 120px);
}
.sch__sheet { max-width: 1000px; margin-inline: auto; }

/* ── cover ─────────────────────────────────────────────────────────────────── */
.sch__crumb { display: flex; gap: 8px; margin: 0 0 26px; font-size: 10px; letter-spacing: 0.18em; color: var(--ink-soft); }
.sch__crumb a { color: inherit; text-decoration: none; }
.sch__crumb a:hover { color: var(--sig); }

.sch__stamp { display: inline-flex; align-items: center; gap: 9px; margin: 0 0 22px; padding: 6px 14px; border: 1px solid var(--rule); font-size: 10px; letter-spacing: 0.2em; color: var(--ink-soft); }
.sch__dot { width: 6px; height: 6px; border-radius: 50%; background: var(--sig); box-shadow: 0 0 0 3px rgba(0, 229, 255, 0.16); }

.sch__title { margin: 0 0 14px; font-weight: 300; font-size: clamp(30px, 6vw, 72px); line-height: 1.02; letter-spacing: -0.03em; }
.sch__sub { margin: 0 0 34px; max-width: 56ch; font-size: clamp(14px, 1.7vw, 19px); line-height: 1.5; color: var(--ink-soft); }

/* the loop: numbered cells joined by rules, closing back on itself */
.sch__loop { margin: 0 0 34px; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 8px; }
.sch__loop li { display: flex; align-items: center; gap: 9px; padding: 8px 13px; border: 1px solid var(--rule); background: rgba(107, 166, 255, 0.05); }
.sch__loop-n { font-size: 9px; letter-spacing: 0.12em; color: var(--sig); }
.sch__loop-l { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; }
.sch__loop-back { border-style: dashed !important; color: var(--sig); font-size: 10px; letter-spacing: 0.16em; }

.sch__meta { margin: 0; display: grid; gap: 16px 32px; grid-template-columns: repeat(2, minmax(0, 1fr)); padding-top: 22px; border-top: 1px solid var(--rule); }
@media (min-width: 760px) { .sch__meta { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
.sch__meta dt { font-size: 9px; letter-spacing: 0.2em; color: var(--ink-soft); margin-bottom: 5px; }
.sch__meta dd { margin: 0; font-size: 12px; }

/* ── premise ───────────────────────────────────────────────────────────────── */
.sch__premise { margin: clamp(28px, 5vh, 48px) 0; padding: clamp(20px, 3vw, 32px); border: 1px solid var(--rule); border-left: 2px solid var(--sig); background: rgba(107, 166, 255, 0.045); }
.sch__premise-label { margin: 0 0 14px; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--sig); }
.sch__premise p { margin: 0 0 12px; font-size: clamp(13px, 1.4vw, 16px); line-height: 1.7; color: var(--ink-soft); }
.sch__premise p:last-child { margin-bottom: 0; }

/* ── index ─────────────────────────────────────────────────────────────────── */
.sch__index { padding: clamp(24px, 4vh, 40px) 0; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
.sch__index-head { margin: 0 0 16px; font-size: 10px; letter-spacing: 0.24em; color: var(--ink-soft); }
.sch__index ol { margin: 0; padding: 0; list-style: none; display: grid; gap: 0; }
@media (min-width: 760px) { .sch__index ol { grid-template-columns: 1fr 1fr; column-gap: 44px; } }
.sch__index li { border-bottom: 1px solid var(--rule-soft); }
.sch__index a { display: flex; gap: 14px; padding: 9px 0; font-size: 12.5px; color: var(--ink); text-decoration: none; }
.sch__index a:hover { color: var(--sig); }
.sch__index-n { color: var(--sig2); flex-shrink: 0; }

/* ── body ──────────────────────────────────────────────────────────────────── */
.sch__section { padding: clamp(30px, 6vh, 56px) 0; border-bottom: 1px solid var(--rule-soft); }
.sch__h2 { margin: 0 0 20px; font-weight: 400; font-size: clamp(20px, 2.6vw, 30px); line-height: 1.2; letter-spacing: -0.01em; scroll-margin-top: calc(var(--nav-height, 80px) + 20px); }
.sch__h2-n { display: block; margin-bottom: 8px; font-size: 10px; letter-spacing: 0.22em; color: var(--sig); }
.sch__h3 { margin: 26px 0 10px; font-weight: 500; font-size: 14px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--sig2); scroll-margin-top: calc(var(--nav-height, 80px) + 20px); }
.sch__p { margin: 0 0 14px; max-width: 76ch; font-size: clamp(13px, 1.35vw, 15.5px); line-height: 1.75; color: var(--ink-soft); }

.sch__list { margin: 0 0 16px; padding-left: 20px; max-width: 76ch; font-size: clamp(13px, 1.3vw, 15px); line-height: 1.7; color: var(--ink-soft); }
.sch__list--num { list-style: decimal; }
.sch__list li::marker { color: var(--sig2); }

.sch__defs { margin: 0 0 18px; max-width: 76ch; }
.sch__defs dt { font-size: 13px; letter-spacing: 0.04em; color: var(--ink); margin-top: 12px; }
.sch__defs dt::before { content: '▸ '; color: var(--sig); }
.sch__defs dd { margin: 4px 0 0 16px; font-size: 13.5px; line-height: 1.65; color: var(--ink-soft); }

.sch__note { margin: 20px 0; padding: 16px 20px; border: 1px solid var(--rule); border-left: 2px solid var(--sig); }
.sch__note-label { margin: 0 0 8px; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--sig); }
.sch__note-text { margin: 0; font-size: clamp(14px, 1.6vw, 18px); line-height: 1.45; color: var(--ink); }

/* a flow reads as a signal chain, numbered and joined */
.sch__chain { margin: 18px 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 6px; }
.sch__chain li { display: flex; align-items: center; gap: 8px; padding: 7px 12px; border: 1px solid var(--rule); background: rgba(107, 166, 255, 0.04); }
.sch__chain-n { font-size: 9px; color: var(--sig); }
.sch__chain-l { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; }

.sch__stack { margin: 20px 0; padding: 0; list-style: none; display: flex; flex-direction: column; max-width: 620px; }
.sch__stack li { position: relative; padding: 13px 16px; border: 1px solid var(--rule); background: rgba(107, 166, 255, 0.04); }
.sch__stack li + li { margin-top: 22px; }
.sch__stack li + li::before { content: ''; position: absolute; left: 28px; top: -22px; width: 1px; height: 22px; background: var(--rule); }
.sch__stack-name { margin: 0 0 5px; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--sig); }
.sch__stack-items { margin: 0; font-size: 12.5px; color: var(--ink-soft); }

.sch__scale { margin: 22px 0; }
.sch__scale figcaption { margin-bottom: 12px; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--sig); }
.sch__scale ol { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 4px; }
.sch__scale li { position: relative; display: grid; grid-template-columns: 32px minmax(0, 1fr); gap: 4px 12px; padding: 11px 14px; border: 1px solid var(--rule); overflow: hidden; }
@media (min-width: 760px) { .sch__scale li { grid-template-columns: 32px 220px minmax(0, 1fr); align-items: baseline; } }
/* fill only — a hard right edge drew a rule straight through the description text */
.sch__scale-bar { position: absolute; left: 0; top: 0; bottom: 0; width: var(--h); background: linear-gradient(90deg, rgba(0, 229, 255, 0.16), rgba(107, 166, 255, 0.02)); }
.sch__scale-n { position: relative; font-size: 9px; color: var(--sig); }
.sch__scale-label { position: relative; font-size: 12px; color: var(--ink); grid-column: 2 / -1; }
@media (min-width: 760px) { .sch__scale-label { grid-column: 2; } }
.sch__scale-text { position: relative; font-size: 12.5px; line-height: 1.6; color: var(--ink-soft); grid-column: 2 / -1; }
@media (min-width: 760px) { .sch__scale-text { grid-column: 3; } }

/* preformatted architecture drawings */
.sch__ascii { margin: 24px 0; }
.sch__ascii figcaption { margin-bottom: 10px; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--sig); }
.sch__ascii pre { margin: 0; padding: 18px; overflow-x: auto; border: 1px solid var(--rule); background: rgba(107, 166, 255, 0.045); }
.sch__ascii code { display: block; font-size: 11.5px; line-height: 1.45; color: var(--ink); white-space: pre; }
.sch__sr { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }

.sch__tablewrap { margin: 20px 0; overflow-x: auto; border: 1px solid var(--rule); }
.sch__table { width: 100%; border-collapse: collapse; font-size: 12px; min-width: 560px; }
.sch__table caption { padding: 11px 14px; text-align: left; font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-soft); border-bottom: 1px solid var(--rule); }
.sch__table th, .sch__table td { padding: 10px 14px; text-align: left; border-bottom: 1px solid var(--rule-soft); vertical-align: top; }
.sch__table thead th { font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sig2); }
.sch__table tbody td { color: var(--ink-soft); }

/* ── footer ────────────────────────────────────────────────────────────────── */
.sch__foot { display: grid; gap: clamp(24px, 4vw, 44px); padding-top: clamp(30px, 5vh, 52px); }
@media (min-width: 900px) { .sch__foot { grid-template-columns: 1.4fr 1fr; } }
.sch__cta { padding: clamp(20px, 3vw, 32px); border: 1px solid var(--sig); background: rgba(0, 229, 255, 0.04); }
.sch__cta-head { margin: 0 0 12px; font-size: clamp(14px, 1.7vw, 19px); line-height: 1.35; letter-spacing: 0.04em; }
.sch__cta-body { margin: 0 0 20px; font-size: 13px; line-height: 1.65; color: var(--ink-soft); }
.sch__cta-links { display: flex; flex-direction: column; gap: 2px; }
.sch__cta-links a { display: flex; justify-content: space-between; gap: 12px; padding: 9px 0; border-bottom: 1px solid var(--rule-soft); font-size: 12.5px; color: var(--ink); text-decoration: none; }
.sch__cta-links a:hover { color: var(--sig); padding-left: 5px; }
.sch__related-head { margin: 0 0 12px; padding-bottom: 7px; border-bottom: 1px solid var(--rule); font-size: 10px; letter-spacing: 0.22em; color: var(--ink-soft); }
.sch__related ul { margin: 0; padding: 0; list-style: none; }
.sch__related li { border-bottom: 1px solid var(--rule-soft); }
.sch__related a { display: block; padding: 9px 0; font-size: 12.5px; color: var(--ink); text-decoration: none; }
.sch__related a:hover { color: var(--sig); }

@media (prefers-reduced-motion: reduce) { .sch__cta-links a:hover { padding-left: 0; } }
</style>
