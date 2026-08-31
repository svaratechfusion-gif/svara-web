<script setup lang="ts">
/**
 * LegalDoc — renders a LegalDocument in full.
 *
 * Deliberately plain: a policy has to be readable, linkable and quotable, so
 * there is no scroll-reveal on the body. `v-reveal` sets `opacity: 0` until
 * ScrollTrigger fires, which would let an anchor deep-link or a browser find
 * land a reader on invisible text in a document they may need to rely on.
 *
 * Class names avoid the `__card` / `__panel` / `__cell` / `__tile` suffixes —
 * styles/svara-3d.css attaches bevel, hover-lift and a cursor tilt to those by
 * attribute selector, which is wrong for prose.
 *
 * Sizes are px: the root font-size is 12px on this site, so rem values borrowed
 * from anywhere else render ~25% small.
 */
import { useRouter } from 'vue-router'
import type { LegalDocument } from '~~/lib/types/legal'

const props = defineProps<{ doc: LegalDocument }>()

const router = useRouter()

/**
 * Close returns the reader where they came from. Most arrive here mid-journey —
 * from the consent dock, the footer, or an in-page link — so "back" is the
 * useful action. A direct visit or a fresh tab has no history to return to,
 * where `back()` would either do nothing or leave the site entirely.
 */
function closeDoc() {
  if (import.meta.client && window.history.length > 1) router.back()
  else router.push('/')
}

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const updatedLabel = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric', month: 'long', year: 'numeric',
}).format(new Date(props.doc.updated))
</script>

<template>
  <article class="lgl">
    <button
      type="button"
      class="lgl__close"
      :aria-label="`Close the ${doc.title} and go back`"
      title="Close"
      @click="closeDoc"
    >
      <svg width="13" height="13" viewBox="0 0 12 12" aria-hidden="true"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="1.4" /></svg>
    </button>

    <header class="lgl__head">
      <p class="lgl__eyebrow">Legal</p>
      <h1 class="lgl__h1">{{ doc.title }}</h1>
      <p class="lgl__meta">
        Last updated <time :datetime="doc.updated">{{ updatedLabel }}</time>
        <span class="lgl__sep" aria-hidden="true">·</span>
        Version {{ doc.version }}
      </p>
      <p v-for="(p, i) in doc.intro" :key="`i-${i}`" class="lgl__lede">{{ p }}</p>
    </header>

    <nav class="lgl__toc" aria-label="Sections">
      <ol>
        <li v-for="s in doc.sections" :key="s.title">
          <a :href="`#${slug(s.title)}`"><span>{{ s.n }}</span>{{ s.title }}</a>
        </li>
      </ol>
    </nav>

    <section
      v-for="s in doc.sections"
      :id="slug(s.title)"
      :key="s.title"
      class="lgl__sec"
    >
      <h2 class="lgl__h2">
        <span v-if="s.n" class="lgl__n" aria-hidden="true">{{ s.n }}</span>{{ s.title }}
      </h2>
      <template v-for="(b, bi) in s.blocks" :key="bi">
        <h3 v-if="b.heading" class="lgl__h3">{{ b.heading }}</h3>
        <p v-for="(p, pi) in b.body || []" :key="`b-${bi}-${pi}`" class="lgl__p">{{ p }}</p>
        <ul v-if="b.items && b.items.length" class="lgl__ul">
          <li v-for="it in b.items" :key="it">{{ it }}</li>
        </ul>
      </template>
    </section>

    <section v-if="doc.faqs && doc.faqs.length" class="lgl__sec" aria-labelledby="lgl-faq">
      <h2 id="lgl-faq" class="lgl__h2">Common questions</h2>
      <div v-for="f in doc.faqs" :key="f.question" class="lgl__qa">
        <h3 class="lgl__h3">{{ f.question }}</h3>
        <p class="lgl__p">{{ f.answer }}</p>
      </div>
    </section>

    <section v-if="doc.governingLaw" class="lgl__sec">
      <h2 class="lgl__h2">{{ doc.governingLaw.heading }}</h2>
      <p v-for="(p, i) in doc.governingLaw.body" :key="i" class="lgl__p">{{ p }}</p>
    </section>

    <address v-if="doc.contact" class="lgl__contact">
      <p class="lgl__entity">{{ doc.contact.entity }}</p>
      <p class="lgl__p">
        <a class="lgl__link" :href="`mailto:${doc.contact.email}`">{{ doc.contact.email }}</a>
      </p>
      <p v-if="doc.contact.phones && doc.contact.phones.length" class="lgl__p lgl__phones">
        <a
          v-for="ph in doc.contact.phones"
          :key="ph.href"
          class="lgl__link"
          :href="`tel:${ph.href}`"
        >{{ ph.display }}</a>
      </p>
      <div class="lgl__addr-grid">
        <div v-for="a in doc.contact.addresses" :key="a.label">
          <p class="lgl__addr-k">{{ a.label }}</p>
          <p class="lgl__addr">
            <span v-for="(line, i) in a.lines" :key="i">{{ line }}<br v-if="i < a.lines.length - 1"></span>
          </p>
        </div>
      </div>
    </address>

    <footer class="lgl__foot">
      <slot name="foot" />
      <p v-if="doc.signoff" class="lgl__signoff">{{ doc.signoff }}</p>
    </footer>
  </article>
</template>

<style scoped>
/* Clear of the fixed nav notch. Deliberately not named `__btn`:
   svara-controls.css would chamfer it and force a transparent border, wrong for
   a small square icon control. */
.lgl__close {
  position: fixed;
  top: 76px;
  right: clamp(16px, 3vw, 34px);
  z-index: 90;
  width: 36px; height: 36px;
  display: grid; place-items: center;
  padding: 0; border: 0; cursor: pointer;
  color: var(--ink-secondary);
  background: rgba(255, 255, 255, 0.72);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: inset 0 0 0 1px var(--sv-border-lavender, rgba(20, 34, 63, 0.16));
  transition: color 180ms ease, box-shadow 180ms ease;
}
.lgl__close:hover { color: var(--ink-primary); box-shadow: inset 0 0 0 1px var(--sig, #3f6fb0); }
.lgl__close:focus-visible { outline: 2px solid var(--sig, #3f6fb0); outline-offset: 2px; }

.lgl__qa { margin-bottom: 18px; }

.lgl { max-width: 760px; margin: 0 auto; padding: clamp(90px, 12vh, 150px) 24px clamp(70px, 9vh, 120px); color: var(--ink-primary); }

.lgl__eyebrow { margin: 0 0 14px; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-muted); }
.lgl__h1 { margin: 0 0 14px; font-size: clamp(32px, 5vw, 54px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.04; }
.lgl__meta { margin: 0 0 30px; font-size: 11px; letter-spacing: 0.06em; color: var(--ink-muted); }
.lgl__sep { margin: 0 8px; }
.lgl__lede { margin: 0 0 14px; font-size: 14.5px; line-height: 1.65; color: var(--ink-secondary); }

.lgl__toc { margin: 36px 0 8px; padding: 20px 22px; border: 1px solid var(--sv-border-lavender, rgba(20, 34, 63, 0.14)); border-radius: 2px; }
.lgl__toc ol { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px 22px; }
.lgl__toc a { display: flex; gap: 10px; font-size: 12px; line-height: 1.4; color: var(--ink-secondary); text-decoration: none; }
.lgl__toc a span { color: var(--ink-muted); font-variant-numeric: tabular-nums; }
.lgl__toc a:hover { color: var(--sig, #3f6fb0); text-decoration: underline; text-underline-offset: 3px; }

/* the fixed nav notch is 60px tall — without this an anchor lands under it */
.lgl__sec { scroll-margin-top: 96px; margin-top: 46px; }
.lgl__h2 { display: flex; gap: 12px; margin: 0 0 16px; font-size: clamp(18px, 2.2vw, 24px); font-weight: 600; letter-spacing: -0.02em; line-height: 1.25; }
.lgl__n { color: var(--sig, #3f6fb0); font-variant-numeric: tabular-nums; }
.lgl__h3 { margin: 26px 0 10px; font-size: 14px; font-weight: 600; letter-spacing: -0.005em; }
.lgl__p { margin: 0 0 13px; font-size: 13.5px; line-height: 1.7; color: var(--ink-secondary); }
.lgl__ul { margin: 0 0 16px; padding: 0 0 0 20px; }
.lgl__ul li { margin: 0 0 7px; font-size: 13.5px; line-height: 1.6; color: var(--ink-secondary); }

.lgl__contact { margin-top: 40px; padding: 22px 24px; font-style: normal; border: 1px solid var(--sv-border-lavender, rgba(20, 34, 63, 0.14)); border-radius: 2px; }
.lgl__phones { display: flex; flex-wrap: wrap; gap: 6px 18px; }
.lgl__entity { margin: 0 0 6px; font-size: 13.5px; font-weight: 600; letter-spacing: -0.005em; color: var(--ink-primary); }
.lgl__addr-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px 26px; margin-top: 16px; }
.lgl__addr-k { margin: 0 0 5px; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-muted); }
.lgl__addr { margin: 0; font-size: 12.5px; line-height: 1.6; color: var(--ink-secondary); }

.lgl__foot { margin-top: 52px; padding-top: 26px; border-top: 1px solid var(--sv-border-lavender, rgba(20, 34, 63, 0.14)); }
.lgl__signoff { margin: 22px 0 0; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-muted); }

/* `.svara-home :where(a)` strips colour and underline from links — restore the
   affordance explicitly wherever this document links out. */
.lgl :deep(.lgl__link) { color: var(--sig, #3f6fb0); text-decoration: underline; text-underline-offset: 3px; }

@media (max-width: 640px) {
  .lgl__toc ol { grid-template-columns: 1fr; }
  .lgl__addr-grid { grid-template-columns: 1fr; }
}
</style>
