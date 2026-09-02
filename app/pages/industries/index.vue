<script setup lang="ts">
// INDUSTRIES — operational intelligence environments. Rebuilt on the
// .svara-home DNA to the Home/Ecosystem/Products standard: an industrial
// intelligence matrix hero, then an interactive explorer where every industry
// becomes its own engineered world (IndustryBlueprint) rather than a card.
// ALL editorial copy is verified — definitions, capability (component) names
// and applicable products come VERBATIM from the Content Bible via INDUSTRIES.
// Healthcare uses its verified operational definition — no clinical claims.
import { ref, computed } from 'vue'
import { useStructuredData } from '~/composables/useStructuredData'
import { INDUSTRIES } from '~/utils/industries-page'
import { homeSection05 } from '~~/lib/content/home'
import { SITE_URL } from '~~/lib/seo/site'
import IndustryBlueprint from '~/components/industries/IndustryBlueprint.vue'
import { motion } from 'motion-v'
import { HERO_EASE } from '~/utils/hero-motion'

// HERO — the "NeuralKinetics" cinematic-video reference applied as a VISUAL
// SYSTEM only: fullscreen looping video, bottom-anchored editorial composition,
// white fade-up into the page, Inter display type, Framer-Motion staggered
// entrance. All hero copy + CTAs are SVARA's own (verified). No in-hero navbar
// (the global site header is the only nav). No reference branding/tags.
const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4'
const heroEase = HERO_EASE // shared Investors hero motion language

// Inter (300/400/500/600) — the reference's typography.
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap' },
  ],
})

// UI-only matrix geometry (no editorial voice) — eight verified-file industries
// around the intelligence core.
const MATRIX: { slug: string, short: string, x: number, y: number }[] = [
  { slug: 'manufacturing', short: 'MANUFACTURING', x: 50, y: 5 },
  { slug: 'smart-cities', short: 'SMART CITIES', x: 82, y: 19 },
  { slug: 'logistics', short: 'LOGISTICS', x: 95, y: 50 },
  { slug: 'retail', short: 'RETAIL', x: 82, y: 81 },
  { slug: 'healthcare', short: 'HEALTHCARE', x: 50, y: 95 },
  { slug: 'energy', short: 'ENERGY', x: 18, y: 81 },
  { slug: 'agriculture', short: 'AGRICULTURE', x: 5, y: 50 },
  { slug: 'construction', short: 'CONSTRUCTION', x: 18, y: 19 },
]

const nodes = computed(() =>
  MATRIX.map((m, i) => {
    const data = INDUSTRIES.find(d => d.slug === m.slug)!
    return {
      n: String(i + 1).padStart(2, '0'),
      slug: m.slug, short: m.short, x: m.x, y: m.y,
      name: data.name,
      def: data.def,
      caps: data.components.map(c => c.name),
      stack: data.platforms.map(p => p.name),
    }
  }),
)
const active = ref(0)
const current = computed(() => nodes.value[active.value]!)

useSeoMeta({
  title: 'Industries | SVARA — One Intelligence Architecture, Every Environment',
  description: homeSection05.intro,
})
useStructuredData({
  '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'SVARA Industries',
  description: homeSection05.intro,
  hasPart: nodes.value.map(n => ({ '@type': 'Thing', name: n.name })),
  url: `${SITE_URL}/industries`,
})
</script>

<template>
  <div class="industries-page">
    <!-- fixed full-viewport hero video background — it persists while the sections
         flow up over it (homepage/divisions model). z-index:-1 (site background
         level) so it sits behind all content AND the footer. -->
    <video
      class="industries-page__bg"
      :src="HERO_VIDEO"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      aria-hidden="true"
    />

    <!-- HERO — transparent over the fixed video -->
    <section class="ih">
      <motion.div
        class="ih__content"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.5, duration: 1, ease: heroEase }"
      >
        <div class="ih__row">
        <div class="ih__col ih__col--l">
        <motion.p
          class="ih__sub"
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: 0.6, duration: 0.8, ease: heroEase }"
        ><span class="ih__dot" />Intelligence Across Industries</motion.p>

        <motion.h1
          v-glitch
          class="ih__title svara-hero-h1"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: 0.8, duration: 0.8, ease: heroEase }"
        >Built for<br><span class="lite">the real world.</span></motion.h1>
        </div>

        <!-- right: subheading + CTAs -->
        <div class="ih__col ih__col--r">
        <motion.p
          v-glitch="{ intensity: 0.68, delay: 1.35 }"
          class="ih__body"
          :initial="{ opacity: 0, y: 18 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: 0.9, duration: 0.8, ease: heroEase }"
        >{{ homeSection05.intro }}</motion.p>

        <motion.div
          class="ih__ctas"
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: 1.0, duration: 0.8, ease: heroEase }"
        >
          <a href="#explorer" class="ih__cta ih__cta--primary">Explore industries</a>
          <NuxtLink to="/contact" class="ih__cta ih__cta--ghost">Talk to SVARA</NuxtLink>
        </motion.div>
        </div>
        </div>
      </motion.div>
    </section>

    <!-- sections flow up over the fixed hero video -->
    <div class="svara-home industries-page__body">
    <!-- EXPLORER — each industry, its own world -->
    <section id="explorer" class="iex hx-section">
      <div class="hx-container">
        <header v-reveal class="iex__head">
          <p class="hx-eyebrow"><span class="hx-index">→</span> Operational Environments</p>
          <!-- the design's signature callout device: a dotted-outline box around the
               single most important word. One per page, as the system requires. -->
          <h2 class="hx-title">One architecture. <span class="lite">Every <span class="iex__hl">environment.</span></span></h2>
        </header>

        <div class="iex__body">
          <ul v-reveal class="iex__list">
            <li v-for="(node, k) in nodes" :key="node.n">
              <button class="iex__item" :class="{ 'is-active': active === k }" @mouseenter="active = k" @focus="active = k" @click="active = k">
                <span class="iex__item-n hx-mono">{{ node.n }}</span><span class="iex__item-name">{{ node.name }}</span><span class="iex__item-bar" />
              </button>
            </li>
          </ul>

          <div v-reveal="{ delay: 0.08 }" class="iex__stage">
            <Transition name="iex-swap" mode="out-in">
              <div :key="active" class="iex__detail">
                <div class="iex__viz hx-panel">
                  <span class="hx-pin tl" /><span class="hx-pin tr" /><span class="hx-pin bl" /><span class="hx-pin br" />
                  <span class="iex__viz-code hx-mono">{{ current.short }} · ENVIRONMENT</span>
                  <!-- This panel renders <IndustryBlueprint>: a schematic of the
                       environment, not a feed from one. It said "LIVE" beside a
                       pulsing dot, which claims real-time customer data the page
                       has never had. Labelled for what it actually is. -->
                  <span class="iex__viz-live hx-mono-label">BLUEPRINT</span>
                  <IndustryBlueprint :slug="current.slug" class="iex__viz-art" />
                </div>

                <!-- HIGHLIGHTED METRIC CARDS — the design's hero metric display, on
                     the two numbers this page actually holds: how many capabilities
                     and how many applicable products the environment resolves to.
                     Counted from the content, never asserted. -->
                <div class="iex__metrics">
                  <div class="iex__metric">
                    <span class="iex__metric-v">{{ String(current.caps.length).padStart(2, '0') }}</span>
                    <span class="iex__metric-l">Capabilities</span>
                  </div>
                  <div class="iex__metric">
                    <span class="iex__metric-v">{{ String(current.stack.length).padStart(2, '0') }}</span>
                    <span class="iex__metric-l">Applicable products</span>
                  </div>
                </div>
                <div class="iex__copy">
                  <p class="iex__kicker hx-mono-label"><span class="iex__kicker-n">{{ current.n }}</span> · Operational Intelligence</p>
                  <h3 class="iex__detail-h">{{ current.name }}</h3>
                  <p class="iex__detail-def">{{ current.def }}</p>
                  <div class="iex__caps">
                    <span class="iex__caps-l hx-mono-label">Capabilities</span>
                    <ul><li v-for="c in current.caps" :key="c">{{ c }}</li></ul>
                  </div>
                  <div class="iex__stack">
                    <span class="iex__stack-l hx-mono-label">Applicable Products</span>
                    <div><span v-for="s in current.stack" :key="s" class="iex__chip">{{ s }}</span></div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- CLOSING CTA -->
    <section class="icta hx-section">
      <div class="hx-container">
        <div v-reveal class="icta__frame sv-frame">
          <span class="hx-pin tl" /><span class="hx-pin tr" /><span class="hx-pin bl" /><span class="hx-pin br" />
          <div class="icta__inner">
            <p class="hx-eyebrow icta__eyebrow">Your Industry</p>
            <h2 class="icta__title">Your industry.<br><span class="lite">One intelligence layer.</span></h2>
            <p class="icta__lead">Whatever you operate, SVARA connects perception, intelligence, simulation and automation into one architecture engineered for it.</p>
            <div class="icta__actions">
              <NuxtLink to="/contact" class="hx-btn hx-btn--primary">Build with SVARA
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M0 5h14M14 5l-4-4M14 5l-4 4" stroke="currentColor" stroke-width="1.3" /></svg>
              </NuxtLink>
              <NuxtLink to="/ecosystem" class="hx-btn hx-btn--ghost">Explore the ecosystem</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  </div>
</template>

<style scoped>
/* ── FIXED hero video + flowing sections (homepage/divisions model) ───────── */
.industries-page { position: relative; }
.industries-page__bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
  background: #f6f2ea;
  pointer-events: none;
}
/* sections flow up over the fixed video — transparent ground so it shows through */
.industries-page__body { position: relative; z-index: 1; background: transparent; }

/* ── HERO — cinematic fullscreen video, bottom-anchored editorial ────────── */
.ih {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  isolation: isolate;
  background: transparent; /* the fixed page video (industries-page__bg) shows through */
  font-family: 'Inter', var(--font-sans, sans-serif);
}

/* video wrapper — 80% crop on mobile, full-bleed on desktop; centered WITHOUT
   transform so Framer-Motion's scale never conflicts with positioning */
.ih__video-wrap { position: absolute; left: 10%; top: 10%; width: 80%; height: 80%; z-index: 0; overflow: hidden; will-change: transform, opacity; }
.ih__video { width: 100%; height: 100%; object-fit: cover; display: block; }

/* cinematic fade-up → resolves into the ivory ground / next section */
.ih__fade { position: absolute; left: 0; right: 0; bottom: 0; z-index: 1; height: 70%; background: linear-gradient(to top, #f6f2ea 0%, rgba(246, 242, 234, 0.8) 50%, transparent 100%); pointer-events: none; }

.ih__content { position: relative; z-index: 2; box-sizing: border-box; flex: 1 1 auto; width: 100%; max-width: var(--container-max, 1440px); margin-inline: auto; padding: calc(var(--nav-height, 80px) + 28px) var(--container-pad) clamp(48px, 9vh, 104px); display: flex; flex-direction: column; align-items: flex-start; will-change: transform, opacity; }

/* HEADING LEFT / SUBHEADING RIGHT — stacks on mobile, splits from 900px */
.ih__row { width: 100%; display: flex; flex-direction: column; align-items: flex-start; gap: 26px; }
.ih__col { width: 100%; min-width: 0; display: flex; flex-direction: column; align-items: flex-start; }
@media (min-width: 900px) {
  /* the row spans the whole hero: heading pinned TOP-LEFT, subheading BOTTOM-RIGHT */
  .ih__row { flex: 1 1 auto; flex-direction: row; align-items: stretch; gap: clamp(32px, 5vw, 80px); }
  .ih__col--l { flex: 1 1 56%; justify-content: flex-start; }
  .ih__col--r { flex: 1 1 44%; justify-content: flex-end; padding-bottom: 6px; }
}

.ih__sub { margin: 0 0 22px; display: inline-flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 400; letter-spacing: 0.01em; color: rgba(20, 34, 63, 0.6); }
.ih__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--ink-primary); flex-shrink: 0; }

.ih__title { margin: 0; font-family: 'Inter', var(--font-sans, sans-serif); font-weight: 300; font-size: clamp(2.4rem, 6.4vw, 5rem); line-height: 1; letter-spacing: -0.03em; color: var(--ink-primary); }
.ih__title .lite { color: var(--ink-secondary); }

.ih__body { margin: 0; max-width: 620px; font-family: 'Inter', var(--font-sans, sans-serif); font-weight: 400; font-size: clamp(15px, 1.4vw, 18px); line-height: 1.65; color: rgba(20, 34, 63, 0.62); }

.ih__ctas { margin-top: 28px; display: flex; flex-wrap: wrap; gap: 12px; }
.ih__cta { display: inline-flex; align-items: center; justify-content: center; padding: 14px 30px; border-radius: 999px; font-family: 'Inter', var(--font-sans, sans-serif); font-size: 13px; font-weight: 500; letter-spacing: 0.01em; text-decoration: none; cursor: pointer; transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, border-color 0.3s ease; }
.ih__cta--primary { background: var(--ink-primary); color: #fff; border: 1px solid var(--ink-primary); }
.ih__cta--primary:hover { transform: translateY(-2px); background: #1d2f52; }
.ih__cta--ghost { background: transparent; color: var(--ink-primary); border: 1px solid rgba(20, 34, 63, 0.35); }
.ih__cta--ghost:hover { border-color: var(--ink-primary); transform: translateY(-2px); }

@media (min-width: 768px) { .ih__video-wrap { left: 0; top: 0; width: 100%; height: 100%; } }
@media (max-width: 560px) { .ih__ctas { width: 100%; } .ih__cta { flex: 1; } }

.iex__head { max-width: 60ch; margin-bottom: clamp(44px, 5vw, 78px); }
.iex__body { display: grid; grid-template-columns: 0.72fr 1.28fr; gap: clamp(32px, 4vw, 68px); align-items: start; }
.iex__list { list-style: none; margin: 0; padding: 0; }
.iex__item { position: relative; width: 100%; display: grid; grid-template-columns: auto 1fr; align-items: baseline; gap: 16px; padding: 17px 4px; background: none; border: none; border-top: 1px solid var(--sv-border-subtle); text-align: left; cursor: pointer; color: var(--ink-secondary); transition: color var(--motion-fast), padding-left var(--motion-medium) var(--ease-out); }
.iex__list li:last-child .iex__item { border-bottom: 1px solid var(--sv-border-subtle); }
.iex__item-n { font-family: var(--font-mono); font-size: 11px; color: var(--ink-muted); }
.iex__item-name { font-size: clamp(17px, 1.9vw, 24px); font-weight: 600; letter-spacing: -0.02em; line-height: 1.1; }
.iex__item-bar { position: absolute; left: 0; bottom: -1px; height: 2px; width: 0; background: var(--sig); transition: width var(--motion-medium) var(--ease-out); }
.iex__item.is-active { color: var(--ink-primary); padding-left: 12px; }
.iex__item.is-active .iex__item-bar { width: 100%; }

.iex__detail { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: clamp(24px, 3vw, 44px); align-items: start; }
.iex__viz { position: relative; width: 100%; min-width: 0; aspect-ratio: 360 / 240; padding: 16px; overflow: hidden; }
.iex__viz-code { position: absolute; top: 12px; left: 16px; z-index: 2; font-size: 9px; letter-spacing: 0.14em; color: var(--ink-muted); }
.iex__viz-live { position: absolute; top: 12px; right: 14px; z-index: 2; display: inline-flex; align-items: center; gap: 6px; color: var(--ink-muted); }
.iex__viz-art { position: absolute; inset: 16px; width: calc(100% - 32px); height: calc(100% - 32px); }
.iex__copy { display: flex; flex-direction: column; }
.iex__kicker { color: var(--ink-muted); } .iex__kicker-n { color: var(--sig); font-weight: 600; }
.iex__detail-h { margin: 14px 0 0; font-size: clamp(26px, 3vw, 44px); font-weight: 600; letter-spacing: -0.028em; line-height: 1.02; color: var(--ink-primary); }
.iex__detail-def { margin: 16px 0 0; max-width: 52ch; font-size: 15px; line-height: 1.6; color: var(--ink-secondary); }
.iex__caps { margin-top: 24px; } .iex__caps-l, .iex__stack-l { color: var(--ink-muted); }
.iex__caps ul { list-style: none; margin: 12px 0 0; padding: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px 18px; }
.iex__caps li { position: relative; padding-left: 16px; font-size: 14px; color: var(--ink-primary); }
.iex__caps li::before { content: ""; position: absolute; left: 0; top: 8px; width: 5px; height: 5px; border-radius: 50%; background: var(--sig); }
.iex__stack { margin-top: 22px; } .iex__stack div { margin-top: 11px; display: flex; flex-wrap: wrap; gap: 8px; }
.iex__chip { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.04em; color: var(--ink-primary); padding: 6px 12px; border: 1px solid var(--sv-border-lavender); border-radius: var(--radius-pill); background: rgba(255,255,255,0.5); }
.iex-swap-enter-active, .iex-swap-leave-active { transition: opacity var(--motion-medium) var(--ease-out), transform var(--motion-medium) var(--ease-out); }
.iex-swap-enter-from { opacity: 0; transform: translateY(12px); } .iex-swap-leave-to { opacity: 0; transform: translateY(-8px); }

.icta__frame { padding: clamp(48px, 8vw, 110px) clamp(28px, 6vw, 90px); text-align: center; }
.icta__inner { display: flex; flex-direction: column; align-items: center; }
.icta__eyebrow::before { display: none; }
.icta__title { margin: 22px 0 0; font-size: clamp(34px, 4.4vw, 68px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.02; color: var(--ink-primary); text-wrap: balance; }
.icta__title .lite { color: var(--ink-secondary); }
.icta__lead { margin: 24px auto 0; max-width: 50ch; font-size: var(--type-lead); line-height: 1.55; color: var(--ink-secondary); }
.icta__actions { margin-top: 36px; display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; }

@media (max-width: 1080px) {
  .iex__body { grid-template-columns: 1fr; gap: 28px; }
  .iex__detail { grid-template-columns: 1fr; }
  .iex__viz { order: -1; }
}
@media (max-width: 560px) { .iex__caps ul { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { .iex-swap-enter-active, .iex-swap-leave-active { transition: opacity var(--motion-fast) linear; } }
</style>
