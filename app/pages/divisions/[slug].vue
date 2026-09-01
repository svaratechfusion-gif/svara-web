<script setup lang="ts">
// DIVISION DETAIL — drawn in the same language as the product description pages
// (`components/layout/KnowledgeProductLayout.vue`): a dark HUD masthead, then
// numbered editorial sections down a narrow measure.
//
// One deliberate difference: the body sits on the CREAM ground rather than the
// products page's `bg-white` / `bg-gray-50` alternation. Those two are Tailwind
// class names and this project has no Tailwind, so they resolve to nothing and
// the products sections already fall through to the page ground. Here the grounds
// are set explicitly — --canvas-primary against --material-ceramic — so the
// alternation the products layout was reaching for actually happens.
//
// Metrics (padding, type scale, container width, card radius) are copied from
// the kp-* rules verbatim so the two page types read as one system. Class names
// are NOT shared: kp-* is `scoped` to that component and unreachable from here.
//
// Content is VERBATIM from `lib/content/divisions.ts`; this file only lays it out.
import Footer from '~/components/footer/Footer.vue'
import GlobalNavigation from '~/components/navigation/GlobalNavigation.vue'
import { useStructuredData } from '~/composables/useStructuredData'
import { divisionBySlug, hasNarrative } from '~~/lib/content/divisions'
import { SITE_URL } from '~~/lib/seo/site'

import { computed } from 'vue'

const route = useRoute()
const d = divisionBySlug(route.params.slug as string)
if (!d) throw createError({ statusCode: 404, statusText: 'Division not found' })

const full = hasNarrative(d)
const url = `${SITE_URL}/divisions/${d.slug}`

/**
 * The numbered running order. Built rather than written out because the sections
 * a division carries vary — Simulation has "Connected intelligence" between the
 * build list and the outcome, division 01 has none, and a division still
 * awaiting its write-up has only its capabilities. Hard-coded numbers would go
 * wrong the moment a write-up arrives with a different shape.
 */
/** Build-entry copy is one paragraph or several; always render it as a list. */
const paras = (c: string | string[]): string[] => (Array.isArray(c) ? c : [c])

const order = computed(() => {
  const keys: string[] = []
  if (d!.intro.length) keys.push('definition')
  if (d!.build.length) keys.push('build')
  d!.extra?.forEach((_, i) => keys.push(`extra-${i}`))
  if (d!.outcome.length) keys.push('outcome')
  keys.push('capabilities')
  return Object.fromEntries(keys.map((k, i) => [k, String(i + 1).padStart(2, '0')]))
})

useSeoMeta({ title: d.seo.title, description: d.seo.description })
// A division still awaiting its write-up has little to say that /divisions does
// not already say. Keep it out of the index until it does.
useHead({
  link: [{ rel: 'canonical', href: url }],
  meta: full ? [] : [{ name: 'robots', content: 'noindex, follow' }],
})

useStructuredData({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Divisions', item: `${SITE_URL}/divisions` },
    { '@type': 'ListItem', position: 2, name: d.title, item: url },
  ],
})
</script>

<template>
  <div v-if="d" class="dpg">
    <GlobalNavigation pinned />

    <!-- ══ MASTHEAD — the products page's HUD hero ══ -->
    <section class="dpg-hud">
      <div class="dpg-hud__grid">
        <div class="dpg-hud__copy">
          <NuxtLink to="/divisions" class="dpg-back">
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true"><path d="M16 5H2M2 5l4-4M2 5l4 4" stroke="currentColor" stroke-width="1.4" /></svg>
            All divisions
          </NuxtLink>
          <span class="dpg-hud__label">DIVISION / {{ d.n }} / {{ d.title.toUpperCase() }}</span>
          <h1 v-glitch class="dpg-hud__title">{{ d.short }}</h1>
          <p v-glitch="{ intensity: 0.68, delay: 1.35 }" class="dpg-hud__body">{{ d.tagline }}</p>
          <div class="dpg-hud__chips" aria-label="Core capabilities">
            <span v-for="c in d.capabilities" :key="c" class="dpg-hud__chip">{{ c }}</span>
          </div>
        </div>

        <div class="dpg-hud__window">
          <a
            class="dpg-hud__art"
            data-parallax-frame
            :href="`/images/divisions/${d.img}.png`"
            target="_blank"
            rel="noopener"
            :aria-label="`${d.title} — open the full-resolution render in a new tab`"
          >
            <picture>
              <source :srcset="`/images/divisions/${d.img}.webp`" type="image/webp">
              <img
                data-parallax="0.12"
                :src="`/images/divisions/${d.img}.png`"
                :alt="`${d.title} — SVARA division render`"
                width="1672"
                height="941"
                loading="eager"
                decoding="async"
                draggable="false"
              >
            </picture>
          </a>
        </div>
      </div>
    </section>

    <main>
      <!-- 01 · definition -->
      <section v-if="d.intro.length" class="dpg-section dpg-section--cream">
        <div class="dpg-container">
          <span class="dpg-number">{{ order.definition }}</span>
          <h2 class="dpg-headline">{{ d.title }}</h2>
          <p class="dpg-definition">{{ d.intro[0] }}</p>
          <p v-for="p in d.intro.slice(1)" :key="p" class="dpg-body dpg-body--stack">{{ p }}</p>
        </div>
      </section>

      <!-- 02 · what we build -->
      <section v-if="d.build.length" class="dpg-section dpg-section--ceramic">
        <div class="dpg-container">
          <span class="dpg-number">{{ order.build }}</span>
          <h2 class="dpg-title">What we build</h2>
          <div class="dpg-grid">
            <article v-for="b in d.build" :key="b.name" class="dpg-block">
              <h3 class="dpg-block-title">{{ b.name }}</h3>
              <p v-for="(para, pi) in paras(b.copy)" :key="pi" class="dpg-block-body" :class="{ 'dpg-block-body--stack': pi > 0 }">{{ para }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- any prose sections this division carries before the outcome -->
      <section
        v-for="(x, i) in d.extra ?? []"
        :key="x.heading"
        class="dpg-section"
        :class="i % 2 === 0 ? 'dpg-section--cream' : 'dpg-section--ceramic'"
      >
        <div class="dpg-container">
          <span class="dpg-number">{{ order[`extra-${i}`] }}</span>
          <h2 class="dpg-title">{{ x.heading }}</h2>
          <p v-for="para in x.paragraphs" :key="para" class="dpg-body dpg-body--stack">{{ para }}</p>
        </div>
      </section>

      <!-- the outcome -->
      <section v-if="d.outcome.length" class="dpg-section dpg-section--ceramic">
        <div class="dpg-container">
          <span class="dpg-number">{{ order.outcome }}</span>
          <h2 class="dpg-title">The outcome</h2>
          <p v-for="p in d.outcome" :key="p" class="dpg-definition dpg-body--stack">{{ p }}</p>
        </div>
      </section>

      <!-- core capabilities -->
      <section class="dpg-section dpg-section--cream">
        <div class="dpg-container">
          <span class="dpg-number">{{ order.capabilities }}</span>
          <h2 class="dpg-title">Core capabilities</h2>
          <ul class="dpg-caps">
            <li v-for="(c, i) in d.capabilities" :key="c" class="dpg-cap">
              <span class="dpg-cap__n">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="dpg-cap__name">{{ c }}</span>
            </li>
          </ul>

          <p v-if="!full" class="dpg-body dpg-pending">
            The full write-up for this division is in preparation. In the meantime,
            <NuxtLink to="/divisions">the divisions overview</NuxtLink> carries its
            instrument and live capability breakdown.
          </p>
        </div>
      </section>

      <!-- foot -->
      <section class="dpg-section dpg-section--cream">
        <div class="dpg-container dpg-foot">
          <NuxtLink to="/divisions" class="dpg-btn dpg-btn--ghost">
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true"><path d="M16 5H2M2 5l4-4M2 5l4 4" stroke="currentColor" stroke-width="1.3" /></svg>
            All divisions
          </NuxtLink>
          <NuxtLink to="/contact" class="dpg-btn dpg-btn--primary">
            Talk to this team
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true"><path d="M0 5h14M14 5l-4-4M14 5l-4 4" stroke="currentColor" stroke-width="1.3" /></svg>
          </NuxtLink>
        </div>
      </section>
    </main>

    <!-- Persistent close. Bottom-LEFT on purpose: the global chatbot trigger is
         fixed bottom-right on every route, and the nav notch owns the top edge,
         so this is the only corner free of something else. -->
    <NuxtLink to="/divisions" class="dpg-close" aria-label="Close and return to all divisions">
      <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1.5 1.5l11 11M12.5 1.5l-11 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
    </NuxtLink>

    <Footer />
  </div>
</template>

<style scoped>
/* PX, NOT REM — DELIBERATELY.
 *
 * `app/assets/css/terminal.css` sets `html { font-size: var(--text-base) }`,
 * which resolves to 12px (11px small, 13px large). Every rem on this page was
 * therefore rendering at 75% of its intended size: the 1.5rem lead was 18px,
 * not 24px, and the 48rem measure was 576px, not 768px. That is inherited from
 * the products layout, which is written in rem and has the same shortfall.
 * Sizes below are absolute so what is written is what renders.
 */
.dpg { --sig: #3f6fb0; background: var(--canvas-primary); }

/* ══ masthead ═════════════════════════════════════════════════════════════ */
.dpg-hud {
  padding: clamp(112px, 12vw, 176px) clamp(20px, 5vw, 80px) clamp(72px, 8vw, 112px);
  background:
    radial-gradient(circle at 16% 12%, rgba(89, 227, 255, 0.14), transparent 28%),
    linear-gradient(135deg, #081126, #0b1630 48%, #101e3d);
  color: #fff;
  overflow: hidden;
}
.dpg-hud__grid {
  max-width: 1540px; margin: 0 auto;
  /* Wider copy column than the products page. Product names are short ("Vision
     AI"); division names are not, and "INTELLIGENCE" is a single unbreakable
     12-character word. */
  display: grid; grid-template-columns: minmax(320px, 0.86fr) minmax(460px, 1.14fr);
  gap: clamp(40px, 5vw, 80px); align-items: center;
}
.dpg-hud__copy { min-width: 0; }
.dpg-back {
  display: inline-flex; align-items: center; gap: 10px; margin-bottom: 26px;
  padding: 10px 18px 10px 15px;
  font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
  color: rgba(207, 232, 255, 0.92); text-decoration: none;
  border: 1px solid rgba(150, 200, 255, 0.3); border-radius: var(--radius-pill);
  background: rgba(120, 180, 255, 0.1);
  transition: background 180ms ease, border-color 180ms ease;
}
.dpg-back svg { transition: transform 220ms ease; }
.dpg-back:hover { background: rgba(120, 180, 255, 0.2); border-color: rgba(150, 200, 255, 0.5); }
.dpg-back:hover svg { transform: translateX(-3px); }
.dpg-back:focus-visible { outline: 2px solid #7fb4ff; outline-offset: 3px; }

.dpg-hud__label {
  display: block; font-family: var(--font-mono);
  font-size: 12px; line-height: 1.4; letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(167, 242, 255, 0.78);
}
.dpg-hud__title {
  margin: 20px 0 0; color: #fff;
  /* Sized so the LONGEST single word fits the column. A `max-width` in `ch`
     cannot do that job: it caps where text WRAPS, and an unbreakable word
     ignores it. "INTELLIGENCE" is 12 chars x 0.6em, so 76px needs ~547px inside
     a ~628px column. */
  font-size: clamp(40px, 4vw, 76px); font-weight: 650;
  line-height: 0.9; letter-spacing: 0; text-transform: uppercase;
  overflow-wrap: break-word;
}
.dpg-hud__body {
  max-width: 620px; margin: 22px 0 0;
  color: rgba(234, 246, 255, 0.8);
  font-size: clamp(19px, 1.5vw, 24px); line-height: 1.55;
}
.dpg-hud__chips { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 26px; }
.dpg-hud__chip {
  font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(207, 232, 255, 0.9); padding: 8px 13px;
  border: 1px solid rgba(150, 200, 255, 0.26); border-radius: var(--radius-pill);
  background: rgba(120, 180, 255, 0.08);
}
/* `__art`, not `__frame`/`__card` — svara-3d.css attaches bevel and a cursor
   tilt to those suffixes by attribute selector. */
.dpg-hud__art { display: block; border-radius: 12px; overflow: hidden; box-shadow: 0 40px 90px -50px rgba(0, 0, 0, 0.9), inset 0 0 0 1px rgba(160, 200, 255, 0.18); }
.dpg-hud__art img { display: block; width: 100%; height: auto; }
.dpg-hud__art:focus-visible { outline: 2px solid #7fb4ff; outline-offset: 4px; }

/* ══ body ═════════════════════════════════════════════════════════════════ */
.dpg-section { padding: clamp(72px, 8vw, 104px) 24px; }
.dpg-section--cream { background: var(--canvas-primary); }
.dpg-section--ceramic { background: var(--material-ceramic); }
.dpg-container { max-width: 820px; margin: 0 auto; }

.dpg-number {
  display: block; margin-bottom: 10px;
  font-family: var(--font-mono); font-size: 13px; font-weight: 600;
  letter-spacing: 0.16em; text-transform: uppercase; color: var(--sig);
}
.dpg-headline { margin: 0 0 26px; font-size: clamp(32px, 3.4vw, 44px); font-weight: 700; line-height: 1.1; letter-spacing: -0.02em; color: var(--ink-primary); }
.dpg-title { margin: 0 0 26px; font-size: clamp(26px, 2.6vw, 32px); font-weight: 600; line-height: 1.2; letter-spacing: -0.015em; color: var(--ink-primary); }
/* ~70 characters a line at 820px, inside the comfortable reading band */
.dpg-definition { margin: 0; font-size: 24px; line-height: 1.55; letter-spacing: -0.01em; color: var(--ink-secondary); }
.dpg-body { margin: 0; max-width: 780px; font-size: 18px; line-height: 1.75; color: var(--ink-secondary); }
.dpg-body--stack { margin-top: 22px; }

.dpg-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 22px; margin-top: 34px; }
/* `-block`, not `-card` — `[class*="-card "]` would pull this into the 3D tilt
   system. Same reason as `__art` above. */
.dpg-block {
  padding: 26px 28px; border-radius: 12px;
  background: rgba(255, 255, 255, 0.66);
  border: 1px solid var(--edge-metal, rgba(20, 34, 63, 0.14));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
}
.dpg-block-title { margin: 0 0 12px; font-size: 21px; font-weight: 600; letter-spacing: -0.015em; line-height: 1.25; color: var(--ink-primary); }
.dpg-block-body { margin: 0; font-size: 17px; line-height: 1.68; color: var(--ink-secondary); }
.dpg-block-body--stack { margin-top: 14px; }

/* These were 12px pills lost against a 100px section. Each capability is now a
   component in its own right, on the build blocks' grid rhythm. */
.dpg-caps {
  list-style: none; margin: 0; padding: 0;
  display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;
}
.dpg-cap {
  display: flex; flex-direction: column; gap: 12px;
  padding: 24px 26px; border-radius: 12px;
  background: rgba(255, 255, 255, 0.66);
  border: 1px solid var(--edge-metal, rgba(20, 34, 63, 0.14));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
}
.dpg-cap__n { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.16em; color: var(--sig); }
.dpg-cap__name { font-size: 21px; font-weight: 600; line-height: 1.2; letter-spacing: -0.015em; color: var(--ink-primary); }

.dpg-pending { margin-top: 34px; color: var(--ink-muted); }
.dpg-pending a { color: var(--ink-primary); }

.dpg-foot { display: flex; flex-wrap: wrap; gap: 14px; }
.dpg-btn {
  display: inline-flex; align-items: center; gap: 10px; padding: 15px 24px;
  font-family: var(--font-mono); font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase;
  text-decoration: none; border-radius: var(--radius-pill);
  transition: background 180ms ease, border-color 180ms ease;
}
.dpg-btn--primary { background: var(--sig); color: #fff; border: 1px solid transparent; }
.dpg-btn--primary:hover { background: #35619c; }
.dpg-btn--ghost { background: rgba(255, 255, 255, 0.6); color: var(--ink-primary); border: 1px solid var(--edge-metal, rgba(20, 34, 63, 0.18)); }
.dpg-btn--ghost:hover { background: rgba(255, 255, 255, 0.85); }
.dpg-btn:focus-visible { outline: 2px solid var(--sig); outline-offset: 3px; }

/* z-index 90: under the nav (100) and the chat window, over the page. */
.dpg-close {
  position: fixed; left: 20px; bottom: 20px; z-index: 90;
  display: grid; place-items: center; width: 50px; height: 50px;
  border-radius: 50%; color: var(--ink-primary); text-decoration: none;
  background: rgba(255, 255, 255, 0.86);
  -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);
  border: 1px solid var(--edge-metal, rgba(20, 34, 63, 0.18));
  box-shadow: 0 12px 30px -14px rgba(16, 42, 91, 0.5);
  transition: background 180ms ease, transform 180ms ease;
}
.dpg-close:hover { background: #fff; transform: scale(1.06); }
.dpg-close:focus-visible { outline: 2px solid var(--sig); outline-offset: 3px; }

@media (max-width: 1040px) {
  .dpg-hud__grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .dpg-section { padding: 64px 20px; }
  .dpg-definition { font-size: 21px; }
  .dpg-body { font-size: 17px; }
  .dpg-close { left: 14px; bottom: 14px; width: 44px; height: 44px; }
}
@media (prefers-reduced-motion: reduce) {
  .dpg-back:hover svg, .dpg-close:hover { transform: none; }
}
</style>
