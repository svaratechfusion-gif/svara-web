<script setup lang="ts">
// CAREERS — a builder experience on the .svara-home DNA at the
// Home/Ecosystem/Products standard. Culture is shown through SYSTEMS: an
// engineered "how we build" workflow loop rather than stock photography.
// Disciplines are grounded in SVARA's real product stack; no vacancies are
// fabricated — the roles section is an honest "no open roles right now" state
// routing to the talent network. Principles express engineering values, not
// claims about the current team, perks, or headcount.
import { ref, computed } from 'vue'
import { companyContent } from '~~/lib/content/company'
import CareersHeroCinematic from '~/components/careers/CareersHeroCinematic.vue'

// The hero's "Mainframe" video, now hoisted to a FIXED full-page background so the
// sections flow up over it (homepage/divisions/industries model). Same URL the hero
// component used; scrubbing is dropped in favour of an ambient autoplay loop.
const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4'

const disciplines = [
  { n: '01', name: 'AI & Machine Learning', body: 'Models that reason over real operational data — perception, prediction, and decision.' },
  { n: '02', name: 'Computer Vision', body: 'Turning raw camera and sensor streams into structured understanding at the edge.' },
  { n: '03', name: 'Edge & Embedded Systems', body: 'Running intelligence where the data is created — constrained, reliable, real-time.' },
  { n: '04', name: 'Autonomy & Drones', body: 'Aerial and ground perception for inspection, monitoring, and site intelligence.' },
  { n: '05', name: 'Simulation & Digital Twin', body: 'Modelling the physical world so systems can rehearse before they act.' },
  { n: '06', name: 'Platform & Cloud', body: 'The orchestration layer that connects every signal to every decision to every action.' },
  { n: '07', name: 'Product & Design', body: 'Making a deep intelligence system feel inevitable, clear, and usable.' },
]

const flow = [
  { k: 'Research', body: 'We start from the real problem — on the factory floor, in the field, at the edge.', x: 40 },
  { k: 'Design', body: 'Architecture and interface designed together, deep enough to be definitive.', x: 128 },
  { k: 'Build', body: 'Engineering across the whole stack — sensor to decision, no thin slices.', x: 216 },
  { k: 'Review', body: 'Cross-functional product reviews pressure-test every decision.', x: 304 },
  { k: 'Ship', body: 'Ship, measure, and feed what we learn straight back into research.', x: 392 },
]
const activeFlow = ref(0)
const currentFlow = computed(() => flow[activeFlow.value]!)

const why = [
  { title: 'Work at the intersection', body: 'AI, hardware, and heavy industry rarely meet in one place. At SVARA they are the same problem.' },
  { title: 'Own the whole stack', body: 'From sensor to decision, you build across the entire loop — not a thin slice of it.' },
  { title: 'Define a category', body: 'Enterprise Intelligence Infrastructure is new. The patterns and standards are still being written — by us.' },
]

const principles = [
  { n: '01', text: 'Own the whole stack — from sensor to decision.' },
  { n: '02', text: 'Real-world first — build for the factory floor, not the demo.' },
  { n: '03', text: 'Depth over breadth — go deep enough to be definitive.' },
  { n: '04', text: 'Build compounding systems — things that get smarter over time.' },
  { n: '05', text: 'Clarity is a feature — simple beats clever.' },
  { n: '06', text: 'Move with intent — velocity in service of the mission.' },
]

useSeoMeta({
  title: 'Careers | SVARA — Build the Intelligence Layer for Enterprise',
  description: companyContent.architecture.components[0]!.description,
})
</script>

<template>
  <div class="careers-page">
    <!-- fixed full-viewport hero video background — it persists while the sections
         flow up over it (homepage/divisions/industries model). z-index:-1 (site
         background level) so it sits behind all content AND the footer. -->
    <video
      class="careers-page__bg"
      :src="HERO_VIDEO"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      aria-hidden="true"
    />

    <!-- HERO — "Mainframe" cinematic composition, SVARA content (component),
         transparent over the fixed page video. -->
    <CareersHeroCinematic />

    <!-- everything below flows up over the fixed hero video (transparent ground) -->
    <div class="svara-home careers-page__body">
    <!-- HOW WE BUILD — culture through systems -->
    <section class="ca-flow hx-section">
      <div class="hx-container">
        <header v-reveal class="ca-flow__head">
          <p class="hx-eyebrow"><span class="hx-index">→</span> How We Build</p>
          <h2 class="hx-title">Culture is a <span class="lite">system.</span></h2>
          <p class="hx-lead">Not perks and posters — a way of working. Every product moves through the same loop, and every loop feeds the next.</p>
        </header>

        <div v-reveal="{ delay: 0.08 }" class="ca-flow__panel hx-panel">
          <span class="hx-pin tl" /><span class="hx-pin tr" /><span class="hx-pin bl" /><span class="hx-pin br" />
          <span class="ca-flow__code hx-mono">SVARA · BUILD LOOP</span>
          <ClientOnly>
            <svg class="ca-flow__svg" viewBox="0 0 432 150" fill="none" aria-hidden="true">
              <path d="M40 60 H392" stroke="var(--sv-border-lavender)" stroke-width="1.2" />
              <path d="M392 60 C420 60 420 110 392 110 L40 110 C12 110 12 60 40 60" stroke="var(--sv-border-lavender)" stroke-width="1" stroke-dasharray="4 4" fill="none" />
              <g class="ca-flow__sig" fill="var(--sig)"><circle r="3"><animateMotion dur="4.5s" repeatCount="indefinite" path="M40 60 H392 C420 60 420 110 392 110 L40 110 C12 110 12 60 40 60" /></circle></g>
              <g v-for="(f, i) in flow" :key="f.k">
                <circle :cx="f.x" cy="60" :r="activeFlow === i ? 8 : 5.5" :fill="activeFlow === i ? 'var(--sig)' : 'rgba(255,255,255,0.9)'" :stroke="activeFlow === i ? 'var(--sig)' : 'var(--sv-border-lavender-strong)'" stroke-width="1.3" />
              </g>
            </svg>
          </ClientOnly>
          <ul class="ca-flow__labels">
            <li v-for="(f, i) in flow" :key="f.k" class="ca-flow__label" :class="{ 'is-active': activeFlow === i }" @mouseenter="activeFlow = i">
              <span class="ca-flow__label-n hx-mono">0{{ i + 1 }}</span>{{ f.k }}
            </li>
          </ul>
        </div>
        <Transition name="ca-swap" mode="out-in">
          <p :key="activeFlow" class="ca-flow__detail"><b>{{ currentFlow.k }}.</b> {{ currentFlow.body }}</p>
        </Transition>
      </div>
    </section>

    <!-- WHY -->
    <section class="ca-why hx-section">
      <div class="hx-container">
        <header v-reveal class="ca-why__head">
          <p class="hx-eyebrow"><span class="hx-index">→</span> Why SVARA</p>
          <h2 class="hx-title">A rare kind of <span class="lite">problem.</span></h2>
        </header>
        <div class="ca-why__grid">
          <article v-for="(w, i) in why" :key="w.title" v-reveal="{ delay: i * 0.06 }" class="ca-why__card sv-card">
            <h3 class="ca-why__title">{{ w.title }}</h3>
            <p class="ca-why__body">{{ w.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- DISCIPLINES -->
    <section class="ca-disc hx-section">
      <div class="hx-container">
        <header v-reveal class="ca-disc__head">
          <p class="hx-eyebrow"><span class="hx-index">→</span> Disciplines</p>
          <h2 class="hx-title">Where you'd <span class="lite">work.</span></h2>
        </header>
        <ul class="ca-disc__list">
          <li v-for="d in disciplines" :key="d.n" v-reveal class="ca-disc__row">
            <span class="ca-disc__n hx-mono">{{ d.n }}</span>
            <span class="ca-disc__name">{{ d.name }}</span>
            <span class="ca-disc__body">{{ d.body }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- OPEN ROLES — honest empty state -->
    <section id="roles" class="ca-roles hx-section">
      <div class="hx-container">
        <div v-reveal class="ca-roles__frame sv-frame">
          <span class="hx-pin tl" /><span class="hx-pin tr" /><span class="hx-pin bl" /><span class="hx-pin br" />
          <p class="hx-eyebrow ca-roles__eyebrow"><span class="hx-dot" /> Open Roles</p>
          <h2 class="ca-roles__title">No open roles right now.</h2>
          <p class="ca-roles__lead">We're not actively hiring for a specific position today — but we're always interested in exceptional people. Join our talent network and we'll reach out when there's a fit.</p>
          <NuxtLink to="/contact" class="hx-btn hx-btn--primary">Join our talent network
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M0 5h14M14 5l-4-4M14 5l-4 4" stroke="currentColor" stroke-width="1.3" /></svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CULTURE -->
    <section class="ca-cult hx-section">
      <div class="hx-container">
        <header v-reveal class="ca-cult__head">
          <p class="hx-eyebrow"><span class="hx-index">→</span> Principles</p>
          <h2 class="hx-title">Six principles we <span class="lite">hold to.</span></h2>
        </header>
        <ul class="ca-cult__grid">
          <li v-for="(p, i) in principles" :key="p.n" v-reveal="{ delay: (i % 3) * 0.05 }" class="ca-cult__cell sv-card">
            <span class="ca-cult__n hx-mono">{{ p.n }}</span>
            <p class="ca-cult__text">{{ p.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- CTA -->
    <section class="ca-cta hx-section">
      <div class="hx-container">
        <div v-reveal class="ca-cta__frame sv-frame">
          <span class="hx-pin tl" /><span class="hx-pin tr" /><span class="hx-pin bl" /><span class="hx-pin br" />
          <div class="ca-cta__inner">
            <h2 class="ca-cta__title">Think you should<br><span class="lite">be here?</span></h2>
            <p class="ca-cta__lead">Tell us what you want to build. The strongest introductions start with the work.</p>
            <div class="ca-cta__actions">
              <NuxtLink to="/contact" class="hx-btn hx-btn--primary">Introduce yourself
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M0 5h14M14 5l-4-4M14 5l-4 4" stroke="currentColor" stroke-width="1.3" /></svg>
              </NuxtLink>
              <NuxtLink to="/about" class="hx-btn hx-btn--ghost">About SVARA</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  </div>
</template>

<style scoped>
/* ── FIXED hero video + flowing sections (homepage/divisions/industries model) ── */
.careers-page { position: relative; }
.careers-page__bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: 70% center;
  z-index: -1;
  background: #e9eef5; /* light fallback before the video paints */
  pointer-events: none;
}
/* sections flow up over the fixed video — transparent ground so it shows through */
.careers-page__body { position: relative; z-index: 1; background: transparent; }

.ca-flow__head, .ca-why__head, .ca-disc__head, .ca-cult__head { max-width: 60ch; margin-bottom: clamp(36px, 4vw, 58px); }
.ca-flow__panel { position: relative; padding: clamp(28px, 4vw, 48px) clamp(24px, 4vw, 52px) clamp(20px, 3vw, 34px); overflow: hidden; }
.ca-flow__code { position: absolute; top: 14px; left: 18px; font-size: 9px; letter-spacing: 0.14em; color: var(--ink-muted); }
.ca-flow__svg { width: 100%; height: auto; margin-top: 14px; }
.ca-flow__labels { list-style: none; margin: 6px 0 0; padding: 0; display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
.ca-flow__label { display: flex; flex-direction: column; align-items: center; gap: 5px; font-size: 14px; font-weight: 600; letter-spacing: -0.01em; color: var(--ink-secondary); cursor: pointer; transition: color var(--motion-fast); text-align: center; }
.ca-flow__label-n { font-size: 10px; font-weight: 400; color: var(--ink-muted); }
.ca-flow__label.is-active { color: var(--sig); }
.ca-flow__detail { margin: 24px 0 0; max-width: 60ch; font-size: 16px; line-height: 1.6; color: var(--ink-secondary); }
.ca-flow__detail b { color: var(--ink-primary); font-weight: 600; }
.ca-swap-enter-active, .ca-swap-leave-active { transition: opacity var(--motion-medium) var(--ease-out); }
.ca-swap-enter-from, .ca-swap-leave-to { opacity: 0; }

.ca-why__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.ca-why__card { padding: 30px 26px; }
.ca-why__title { margin: 0; font-size: 22px; font-weight: 600; letter-spacing: -0.02em; color: var(--ink-primary); }
.ca-why__body { margin: 14px 0 0; font-size: 15px; line-height: 1.6; color: var(--ink-secondary); }

.ca-disc__list { list-style: none; margin: 0; padding: 0; }
.ca-disc__row { display: grid; grid-template-columns: 48px 260px 1fr; gap: 24px; align-items: baseline; padding: 24px 0; border-top: 1px solid var(--sv-border-subtle); }
.ca-disc__list li:last-child { border-bottom: 1px solid var(--sv-border-subtle); }
.ca-disc__n { font-size: 12px; color: var(--ink-muted); }
.ca-disc__name { font-size: clamp(19px, 2.1vw, 26px); font-weight: 600; letter-spacing: -0.02em; line-height: 1.15; color: var(--ink-primary); }
.ca-disc__body { font-size: 15px; line-height: 1.6; color: var(--ink-secondary); max-width: 52ch; }

.ca-roles__frame { padding: clamp(44px, 7vw, 92px) clamp(28px, 6vw, 80px); text-align: center; display: flex; flex-direction: column; align-items: center; }
.ca-roles__eyebrow { justify-content: center; } .ca-roles__eyebrow::before { display: none; }
.ca-roles__title { margin: 18px 0 0; font-size: clamp(28px, 3.4vw, 48px); font-weight: 600; letter-spacing: -0.028em; color: var(--ink-primary); }
.ca-roles__lead { margin: 20px auto 30px; max-width: 50ch; font-size: 16px; line-height: 1.6; color: var(--ink-secondary); }

.ca-cult__grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.ca-cult__cell { padding: 28px 24px; display: flex; flex-direction: column; gap: 18px; min-height: 150px; }
.ca-cult__n { font-size: 12px; color: var(--sig); letter-spacing: 0.1em; }
.ca-cult__text { margin: 0; font-size: 18px; font-weight: 500; letter-spacing: -0.015em; line-height: 1.32; color: var(--ink-primary); }

.ca-cta__frame { padding: clamp(48px, 8vw, 104px) clamp(28px, 6vw, 88px); text-align: center; }
.ca-cta__inner { display: flex; flex-direction: column; align-items: center; }
.ca-cta__title { margin: 0; font-size: clamp(34px, 4.2vw, 62px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.02; color: var(--ink-primary); text-wrap: balance; }
.ca-cta__title .lite { color: var(--ink-secondary); }
.ca-cta__lead { margin: 22px auto 0; max-width: 46ch; font-size: var(--type-lead); line-height: 1.55; color: var(--ink-secondary); }
.ca-cta__actions { margin-top: 34px; display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; }

@media (max-width: 1024px) {
  .ca-why__grid { grid-template-columns: 1fr; }
  .ca-disc__row { grid-template-columns: 36px 1fr; row-gap: 6px; }
  .ca-disc__body { grid-column: 2; }
  .ca-cult__grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 620px) {
  .ca-flow__labels { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .ca-cult__grid { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .ca-flow__sig circle { animation: none; }
  .ca-swap-enter-active, .ca-swap-leave-active { transition: opacity var(--motion-fast) linear; }
}
</style>
