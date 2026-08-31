<script setup lang="ts">
// ABOUT · HERO — the "Questly" editorial design language applied as a VISUAL
// SYSTEM only: full-viewport background image + grass overlay, centered headline
// with staggered fade-up, a glass information panel (the reference's search pill,
// repurposed), and a scaled "browser-chrome" showcase panel that rises in
// (ResizeObserver scale-to-fit at a fixed 896px design width). All copy is SVARA's
// own About content (Content Bible) — no invented facts, no leadership (only
// placeholder names exist), no fabricated metrics. No in-hero navbar (the global
// site header is the only nav). No Questly branding.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { companyContent } from '~~/lib/content/company'

const BG =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260611_133301_d5f2a94a-b22e-4e4a-a6b6-eacdddf1f5b0.png&w=1280&q=85'
const GRASS = 'https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1781191264/grass_eam204.png'

const body = companyContent.aiAnswerTarget.replace(/\*\*/g, '')

// info strip (verified About facts only — replaces the reference search bar)
const facts = [
  { k: 'HQ', v: 'Hyderabad, India' },
  { k: 'Focus', v: 'Enterprise Intelligence' },
  { k: 'Recognition', v: 'DPIIT · Startup India' },
  { k: 'System', v: 'The Intelligence Loop' },
]

// showcase panel — verified About content (no leadership, no dates, real counts)
const stats = [
  { label: 'PRODUCTS', value: '9', sub: 'Across the stack' },
  { label: 'LOOP STAGES', value: '5', sub: 'Observe → Improve' },
  { label: 'CORE INDUSTRIES', value: '6', sub: 'Verticals served' },
  { label: 'TRANSFORMATION', value: '4', sub: 'Fragmented → Autonomous' },
]
const pillars = [
  { k: 'Intelligence Loop', b: 'Five capabilities forming one continuous improvement cycle.' },
  { k: 'Product Ecosystem', b: 'Nine products delivering Loop capabilities — Vision AI to Growth.' },
  { k: 'Industry Focus', b: 'Manufacturing, Energy, Logistics, Healthcare, Smart Cities, Government.' },
]
const loopRows = [
  { k: 'Observe', b: 'Captures data from the physical and digital enterprise.', s: 'Sense' },
  { k: 'Understand', b: 'Interprets raw signal into structured meaning.', s: 'Reason' },
  { k: 'Predict', b: 'Forecasts outcomes before they happen.', s: 'Foresee' },
  { k: 'Coordinate', b: 'Takes action across enterprise systems.', s: 'Act' },
  { k: 'Improve', b: 'Feeds improvements back into every layer.', s: 'Learn' },
]

function discover(): void {
  if (typeof document === 'undefined') return
  document.querySelector('.ab-why')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ── ScaledDashboard: render the panel at a fixed 896px design width, scale to fit ──
const DESIGN_W = 896
const scaleWrap = ref<HTMLElement | null>(null)
const scaleInner = ref<HTMLElement | null>(null)
const scale = ref(1)
const innerH = ref(0)
let ro: ResizeObserver | null = null

function fit(): void {
  const wrap = scaleWrap.value
  const inner = scaleInner.value
  if (!wrap || !inner) return
  const s = Math.min(1, wrap.clientWidth / DESIGN_W)
  scale.value = s
  innerH.value = inner.offsetHeight * s
}

onMounted(() => {
  fit()
  ro = new ResizeObserver(fit)
  if (scaleWrap.value) ro.observe(scaleWrap.value)
  if (scaleInner.value) ro.observe(scaleInner.value)
  window.addEventListener('resize', fit, { passive: true })
})
onBeforeUnmount(() => {
  ro?.disconnect()
  window.removeEventListener('resize', fit)
})

// Nimbus Sans TW01 — the reference's typography
useHead({
  link: [
    { rel: 'stylesheet', href: 'https://db.onlinewebfonts.com/c/bb5de19d87c09a95216dc6ccd96e37c6?family=Nimbus+Sans+TW01' },
  ],
})
</script>

<template>
  <section class="au" :style="{ backgroundImage: `url('${BG}')` }">
    <!-- top spacer (clears the global nav; replaces the reference navbar row) -->
    <div class="au__spacer au__spacer--top" aria-hidden="true" />

    <!-- centered hero content -->
    <div class="au__content">
      <h1 class="au__title">
        <span class="au-fade-up">Intelligence for</span>
        <span class="au-fade-up" style="animation-delay: 100ms">the real world.</span>
      </h1>

      <!-- glass information panel (the reference search pill, repurposed) -->
      <div class="au__panel au-fade-up" style="animation-delay: 220ms">
        <span v-for="(f, i) in facts" :key="f.k" class="au__fact">
          <span class="au__fact-k">{{ f.k }}</span>
          <span class="au__fact-v">{{ f.v }}</span>
          <span v-if="i < facts.length - 1" class="au__fact-sep" aria-hidden="true" />
        </span>
      </div>

      <p class="au__desc au-fade-up" style="animation-delay: 340ms">{{ body }}</p>

      <div class="au__ctas au-fade-up" style="animation-delay: 460ms">
        <button type="button" class="au__btn au__btn--primary" @click="discover">Discover Our Story</button>
        <NuxtLink to="/contact" class="au__btn au__btn--secondary">Talk to SVARA</NuxtLink>
      </div>
    </div>

    <div class="au__spacer au__spacer--mid" aria-hidden="true" />

    <!-- scaled showcase panel (browser-chrome), rises in -->
    <div ref="scaleWrap" class="au__dash au-hero-rise" style="animation-delay: 620ms">
      <div
        ref="scaleInner"
        class="au__dash-inner"
        :style="{ transform: `scale(${scale})`, height: innerH ? innerH + 'px' : undefined }"
      >
        <div class="mk">
          <!-- title bar -->
          <div class="mk__bar">
            <span class="mk__lights"><i style="background:#ff5f57" /><i style="background:#febc2e" /><i style="background:#28c840" /></span>
            <span class="mk__url"><span class="mk__dot" />svara.tech / about</span>
            <span class="mk__bar-r" aria-hidden="true" />
          </div>

          <div class="mk__body">
            <!-- sidebar -->
            <aside class="mk__side">
              <div class="mk__brand">SVARA</div>
              <div class="mk__ws"><span class="mk__ws-badge">S</span>About · Company</div>
              <nav class="mk__nav">
                <span class="mk__nav-i is-on">Mission</span>
                <span class="mk__nav-i">Intelligence Loop</span>
                <span class="mk__nav-i">Ecosystem</span>
                <span class="mk__nav-i">Recognition</span>
              </nav>
              <div class="mk__side-lbl">TRAJECTORY</div>
              <ul class="mk__recent">
                <li><span class="mk__rdot" />Fragmented</li>
                <li><span class="mk__rdot" />Connected</li>
                <li><span class="mk__rdot" />Intelligent</li>
                <li><span class="mk__rdot" />Autonomous</li>
              </ul>
            </aside>

            <!-- main -->
            <div class="mk__main">
              <div class="mk__head">
                <span class="mk__head-badge">S</span>
                <div class="mk__head-txt">
                  <span class="mk__head-t">SVARA — Enterprise Intelligence Infrastructure</span>
                  <span class="mk__head-s">The intelligence layer for enterprise operations</span>
                </div>
                <span class="mk__gen">Intelligence Loop</span>
              </div>

              <div class="mk__stats">
                <div v-for="s in stats" :key="s.label" class="mk__stat">
                  <span class="mk__stat-l">{{ s.label }}</span>
                  <span class="mk__stat-v">{{ s.value }}</span>
                  <span class="mk__stat-s">{{ s.sub }}</span>
                </div>
              </div>

              <div class="mk__cards">
                <div v-for="p in pillars" :key="p.k" class="mk__card">
                  <span class="mk__card-t">{{ p.k }}</span>
                  <span class="mk__card-b">{{ p.b }}</span>
                </div>
              </div>

              <div class="mk__table">
                <div class="mk__tr mk__tr--head">
                  <span>Capability</span><span>Function</span><span>Role</span><span>State</span>
                </div>
                <div v-for="r in loopRows" :key="r.k" class="mk__tr">
                  <span class="mk__td-k">{{ r.k }}</span>
                  <span class="mk__td-b">{{ r.b }}</span>
                  <span class="mk__td-s">{{ r.s }}</span>
                  <span class="mk__td-st">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- grass overlay -->
    <img :src="GRASS" alt="" class="au__grass" aria-hidden="true">
  </section>
</template>

<style scoped>
.au {
  position: relative;
  min-height: 100svh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: cover;
  background-position: center;
  font-family: 'Nimbus Sans TW01', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.au__spacer { flex: 1 1 auto; flex-shrink: 0; }
.au__spacer--top { min-height: calc(var(--nav-height, 80px) + 8px); }
.au__spacer--mid { min-height: 40px; }
@media (min-width: 640px) { .au__spacer--mid { min-height: 48px; } }
@media (min-width: 1024px) { .au__spacer--mid { min-height: 64px; } }

/* hero content */
.au__content {
  position: relative;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 20px;
}

.au__title {
  margin: 0;
  color: var(--ink-primary, #14223f);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-size: 40px;
}
.au__title span { display: block; }
@media (min-width: 400px) { .au__title { font-size: 44px; } }
@media (min-width: 640px) { .au__title { font-size: 60px; } }
@media (min-width: 1024px) { .au__title { font-size: 70px; } }
@media (min-width: 1280px) { .au__title { font-size: 80px; } }

/* glass information panel */
.au__panel {
  margin-top: 20px;
  max-width: 40rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px 4px;
  padding: 12px 20px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: inset 0 0 0 1px rgba(20, 34, 63, 0.1);
}
@media (min-width: 640px) { .au__panel { margin-top: 24px; } }
.au__fact { display: inline-flex; align-items: center; gap: 8px; }
.au__fact-k { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-muted, #8a93a6); }
.au__fact-v { font-size: 12px; color: var(--ink-primary, #14223f); font-weight: 500; }
.au__fact-sep { width: 1px; height: 12px; background: rgba(20, 34, 63, 0.16); margin: 0 6px; }

.au__desc {
  margin-top: 16px;
  max-width: 28rem;
  color: var(--ink-secondary, #55607a);
  font-size: 14px;
  line-height: 1.6;
}
@media (min-width: 640px) { .au__desc { margin-top: 20px; font-size: 16px; } }
@media (min-width: 1024px) { .au__desc { font-size: 18px; } }

.au__ctas { margin-top: 16px; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 12px; }
@media (min-width: 640px) { .au__ctas { margin-top: 20px; } }
.au__btn {
  font-size: 14px; font-weight: 500; padding: 10px 24px; border-radius: 999px;
  cursor: pointer; text-decoration: none; transition: background 0.2s ease, box-shadow 0.2s ease;
}
.au__btn--primary { background: var(--ink-primary, #14223f); color: #fff; border: 1px solid var(--ink-primary, #14223f); }
.au__btn--primary:hover { background: #1d2f52; box-shadow: 0 10px 24px -12px rgba(16, 42, 91, 0.5); }
.au__btn--secondary { color: var(--ink-primary, #14223f); background: transparent; border: 1px solid rgba(20, 34, 63, 0.25); }
.au__btn--secondary:hover { background: rgba(20, 34, 63, 0.06); }

/* scaled showcase panel */
.au__dash {
  position: relative;
  z-index: 0;
  width: 92%;
  max-width: 56rem;
  margin: 0 auto;
  flex-shrink: 0;
  margin-bottom: -40px;
  overflow: hidden;
}
@media (min-width: 640px) { .au__dash { width: 84%; margin-bottom: -80px; } }
@media (min-width: 1024px) { .au__dash { width: 72%; margin-bottom: -128px; } }
.au__dash-inner { width: 896px; transform-origin: top left; }

/* grass overlay */
.au__grass { pointer-events: none; position: absolute; bottom: 0; left: 0; z-index: 10; width: 100%; user-select: none; }

/* ── browser-chrome mockup (dark, re-themed to SVARA) ─────────────────────── */
.mk { border-radius: 16px 16px 0 0; overflow: hidden; background: #1a1a1c; box-shadow: 0 -20px 80px rgba(0, 0, 0, 0.35); outline: 1px solid rgba(255, 255, 255, 0.1); text-align: left; }
.mk__bar { display: flex; align-items: center; gap: 12px; background: #242427; border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding: 10px 16px; }
.mk__lights { display: inline-flex; gap: 6px; }
.mk__lights i { width: 10px; height: 10px; border-radius: 50%; }
.mk__url { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #1a1a1c; border-radius: 6px; padding: 4px 24px; font-size: 10px; color: rgba(255, 255, 255, 0.6); }
.mk__dot { width: 6px; height: 6px; border-radius: 2px; background: rgba(255, 255, 255, 0.3); }
.mk__bar-r { width: 60px; }

.mk__body { display: grid; grid-template-columns: 22% 1fr; }
.mk__side { border-right: 1px solid rgba(255, 255, 255, 0.05); background: #1e1e21; padding: 14px 12px; }
.mk__brand { color: rgba(255, 255, 255, 0.85); font-weight: 700; letter-spacing: 0.14em; font-size: 13px; }
.mk__ws { display: flex; align-items: center; gap: 8px; margin-top: 16px; font-size: 10px; color: rgba(255, 255, 255, 0.8); }
.mk__ws-badge { display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; border-radius: 4px; background: #2f7fe6; color: #fff; font-size: 9px; font-weight: 700; }
.mk__nav { display: flex; flex-direction: column; gap: 8px; margin-top: 16px; }
.mk__nav-i { font-size: 10px; color: rgba(255, 255, 255, 0.55); }
.mk__nav-i.is-on { color: rgba(255, 255, 255, 0.95); }
.mk__side-lbl { margin-top: 18px; font-size: 8px; letter-spacing: 0.16em; color: rgba(255, 255, 255, 0.35); }
.mk__recent { list-style: none; margin: 10px 0 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.mk__recent li { display: flex; align-items: center; gap: 8px; font-size: 10px; color: rgba(255, 255, 255, 0.6); }
.mk__rdot { width: 6px; height: 6px; border-radius: 50%; background: rgba(40, 200, 64, 0.7); }

.mk__main { padding: 16px; }
.mk__head { display: flex; align-items: center; gap: 12px; }
.mk__head-badge { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 10px; background: #2f7fe6; color: #fff; font-size: 15px; font-weight: 700; }
.mk__head-txt { display: flex; flex-direction: column; flex: 1; }
.mk__head-t { font-size: 14px; font-weight: 500; color: #fff; }
.mk__head-s { font-size: 10px; color: rgba(255, 255, 255, 0.45); }
.mk__gen { font-size: 10px; color: #fff; background: rgba(47, 127, 230, 0.9); padding: 6px 12px; border-radius: 999px; white-space: nowrap; }

.mk__stats { display: grid; grid-template-columns: repeat(4, 1fr); margin-top: 16px; border-radius: 12px; background: rgba(255, 255, 255, 0.03); outline: 1px solid rgba(255, 255, 255, 0.05); }
.mk__stat { display: flex; flex-direction: column; gap: 4px; padding: 14px; border-left: 1px solid rgba(255, 255, 255, 0.05); }
.mk__stat:first-child { border-left: none; }
.mk__stat-l { font-size: 8px; letter-spacing: 0.12em; color: rgba(255, 255, 255, 0.35); }
.mk__stat-v { font-size: 20px; font-weight: 500; color: #fff; }
.mk__stat-s { font-size: 9px; color: rgba(255, 255, 255, 0.4); }

.mk__cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px; }
.mk__card { display: flex; flex-direction: column; gap: 6px; padding: 12px; border-radius: 8px; background: rgba(255, 255, 255, 0.03); outline: 1px solid rgba(255, 255, 255, 0.05); }
.mk__card-t { font-size: 11px; font-weight: 600; color: #fff; }
.mk__card-b { font-size: 9.5px; line-height: 1.5; color: rgba(255, 255, 255, 0.5); }

.mk__table { margin-top: 12px; border-radius: 8px; outline: 1px solid rgba(255, 255, 255, 0.05); overflow: hidden; }
.mk__tr { display: grid; grid-template-columns: 1.1fr 2fr 0.8fr 0.7fr; gap: 10px; align-items: center; padding: 9px 12px; border-top: 1px solid rgba(255, 255, 255, 0.05); }
.mk__tr--head { border-top: none; background: rgba(255, 255, 255, 0.03); }
.mk__tr--head span { font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255, 255, 255, 0.35); }
.mk__td-k { font-size: 11px; color: #fff; font-weight: 500; }
.mk__td-b { font-size: 10px; color: rgba(255, 255, 255, 0.5); }
.mk__td-s { font-size: 10px; color: rgba(255, 255, 255, 0.7); }
.mk__td-st { font-size: 10px; color: rgba(40, 200, 64, 0.8); }

/* ── animations (fade-up / fade-down / hero-rise) ────────────────────────── */
@keyframes au-fade-up { from { opacity: 0; transform: translateY(24px); filter: blur(6px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
@keyframes au-hero-rise { from { opacity: 0; transform: translateY(64px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
.au-fade-up { animation: au-fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
.au-hero-rise { animation: au-hero-rise 1.1s cubic-bezier(0.22, 1, 0.36, 1) both; }

@media (prefers-reduced-motion: reduce) {
  .au-fade-up, .au-hero-rise { animation: none; }
  .au__btn { transition: none; }
}
</style>
