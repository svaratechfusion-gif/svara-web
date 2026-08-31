<script setup lang="ts">
// THE SVARA ECOSYSTEM — one continuous cinematic scroll, ported from the Clarix
// reference and carrying SVARA's own ecosystem narrative.
//
// The page is 2800vh tall and everything is choreographed against a single
// normalized scroll progress 0 → 1. Two fixed WebGL canvases do the heavy work
// (see lib/clarix/scene.ts): a background ASCII dot-grid that reacts to the
// cursor, and a foreground holographic model plus the particle cloud that
// assembles the SVARA mark. This component owns only the DOM overlays and
// applies their styles imperatively from the engine's per-frame callback —
// never through Vue's reactivity, which would re-render 60 times a second.
//
// Supersedes the previous seven-chapter EcoWorld build (EcoWorldCanvas /
// EcoChapter / EcoTelemetry / EcoRail); those files are kept, now unused.
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Footer from '~/components/footer/Footer.vue'
import GlobalNavigation from '~/components/navigation/GlobalNavigation.vue'
import { createClarixScene, type ClarixFrameState, type ClarixHandle } from '~~/lib/clarix/scene'
import { createTextRevealer, initTitles, updateWordAnimation } from '~~/lib/clarix/titles'
import { useStructuredData } from '~/composables/useStructuredData'
import { homePlatforms, homeIndustries, homeSection04 } from '~~/lib/content/home'
import { SITE_URL } from '~~/lib/seo/site'

definePageMeta({ layout: false })

const MODEL_URL = '/ecosystem/hero-model.glb'
const GRADIENT_URL = '/ecosystem/gradient.jpg'
/** The particle cloud assembles THIS — SVARA's own mark, black on the white page. */
const LOGO_URL = '/brand/logo/svara-logo-black.svg'

// Structural counts, read off the Content Bible so the panel cannot drift.
const pad = (n: number) => String(n).padStart(2, '0')
const STATS = [
  { num: pad(homePlatforms.length), lines: ['connected platforms'], sub: 'one intelligence layer' },
  { num: pad(homeSection04.divisions.length), lines: ['technology divisions', 'engineering the stack'], sub: '' },
  { num: pad(homeIndustries.length), lines: ['industries the ecosystem', 'is designed for'], sub: '' },
]

useHead({
  htmlAttrs: { class: 'eco-clarix' },
  bodyAttrs: { class: 'eco-clarix-body' },
})
useSeoMeta({
  title: 'The SVARA Ecosystem | One Continuous Intelligence World',
  description:
    'Travel through the SVARA intelligence ecosystem — vision, drones, edge, generative AI, agents, digital twins, One AI OS, business cloud, engineering and growth connected around one intelligence core that senses, understands, predicts and acts as one system.',
})
useStructuredData({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'The SVARA Ecosystem',
  description: 'One intelligence layer connecting the physical, digital and operational worlds.',
  hasPart: homePlatforms.map(p => ({
    '@type': 'Product', name: p.name, description: p.description, url: `${SITE_URL}${p.to}` })),
})

/** Drives the nav's preload gate (see the template). */
const revealed = ref(false)
const root = ref<HTMLElement | null>(null)
const stage = ref<HTMLElement | null>(null)
const spacer = ref<HTMLElement | null>(null)

let handle: ClarixHandle | null = null
let observer: IntersectionObserver | null = null
const reveal = createTextRevealer()

onMounted(() => {
  const el = root.value
  const container = stage.value
  const span = spacer.value
  if (!el || !container || !span) return

  observer = initTitles(el)

  // Element lookups, hoisted out of the frame callback.
  const words = [1, 2, 3].map(n => el.querySelector<HTMLElement>(`#word${n}`))
  const glass = el.querySelector<HTMLElement>('#glass-container')
  const glassGradient = el.querySelector<HTMLElement>('#glass-gradient')
  const phase4 = el.querySelector<HTMLElement>('#phase4-container')
  const phase5 = el.querySelector<HTMLElement>('#phase5-container')
  const phase6 = el.querySelector<HTMLElement>('#phase6-container')

  const onFrame = (s: ClarixFrameState) => {
    const p = s.scrollProgress

    // ── Flying words ──
    updateWordAnimation(words[0]!, p, 0.14, 0.26)
    updateWordAnimation(words[1]!, p, 0.22, 0.34)
    updateWordAnimation(words[2]!, p, 0.30, 0.40, true)

    // ── Glass stats panel: slides up, then away ──
    if (glass) {
      if (p <= 0.54) {
        const easeIn = s.phase3 * s.phase3
        const glassY = 100 - easeIn * 100
        glass.style.transform = `translateY(${glassY}vh)`
        if (glassY < 60) reveal(el, '#phase3-title')
        if (glassGradient) {
          glassGradient.style.transform = `translate(-50%, -50%) scale(${0.65 + 0.35 * s.phase3})`
          glassGradient.style.borderRadius = `${s.phase3 * 24}px`
        }
      }
      else {
        const easeOut = 1 - Math.pow(1 - s.phase4, 3)
        glass.style.transform = `translateY(${-(easeOut * 100)}vh)`
        if (glassGradient) {
          glassGradient.style.transform = 'translate(-50%, -50%) scale(1)'
          glassGradient.style.borderRadius = '24px'
        }
      }
    }

    // ── Phase 4 · the split feature ──
    if (phase4) {
      if (s.phase4 > 0 && s.phase4 < 1.0) {
        let opacity = 1.0
        let yOffset = 0
        if (s.phase4 < 0.2) {
          const t = s.phase4 / 0.2
          opacity = t
          yOffset = 50 * (1 - t)
        }
        else if (s.phase4 > 0.8) {
          const t = (s.phase4 - 0.8) / 0.2
          opacity = 1 - t
          yOffset = -50 * t
        }
        phase4.style.opacity = String(opacity)
        phase4.style.transform = `translateY(${yOffset}px)`
        phase4.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none'
        if (opacity > 0.7) reveal(el, '#phase4-title')
      }
      else {
        phase4.style.opacity = '0'
        phase4.style.pointerEvents = 'none'
      }
    }

    // ── Phase 5 · the assembled logo holds ──
    if (phase5) {
      let opacity = 0
      if (p >= 0.68 && p <= 1.0) {
        if (p < 0.74) opacity = 0
        else if (p < 0.78) opacity = (p - 0.74) / 0.04
        else if (p < 0.82) opacity = 1.0
        else if (p < 0.86) opacity = 1.0 - (p - 0.82) / 0.04
      }
      phase5.style.opacity = String(Math.max(0, Math.min(1, opacity)))
      if (opacity > 0.7) {
        reveal(el, '#phase5-title-1')
        reveal(el, '#phase5-title-2')
      }
    }

    // ── Phase 6 · finale + footer ──
    if (phase6) {
      if (p >= 0.86) {
        const bounded = Math.max(0, Math.min(1, (p - 0.86) / 0.14))
        // The finale title is FIXED, and the footer below it is transparent —
        // so without this it stays burned across the footer's own headline and
        // link columns. Retire it as the footer's top edge comes into view.
        const footerTop = span.offsetTop + span.offsetHeight
        const shown = window.scrollY + window.innerHeight - footerTop
        const footerFade = Math.max(0, Math.min(1, shown / (window.innerHeight * 0.5)))
        phase6.style.opacity = String(bounded * (1 - footerFade))
        phase6.style.transform = `scale(${0.95 + 0.05 * bounded})`
        if (bounded > 0.7) reveal(el, '#phase6-title')
      }
      else {
        phase6.style.opacity = '0'
      }
    }
  }

  handle = createClarixScene({
    container,
    scrollSpan: span,
    modelUrl: MODEL_URL,
    logoUrl: LOGO_URL,
    onFrame,
    onRevealed: () => {
      revealed.value = true
      el.querySelectorAll('.preload-hidden').forEach(n => n.classList.remove('preload-hidden'))
      const chars = el.querySelectorAll('#animated-hero-title .hero-char')
      setTimeout(() => {
        chars.forEach((char, index) => setTimeout(() => char.classList.add('revealed'), index * 25))
      }, 150)
    },
  })
})

onBeforeUnmount(() => {
  handle?.dispose()
  handle = null
  observer?.disconnect()
})
</script>

<template>
  <div ref="root" class="eco-clarix-page" :class="{ 'is-preloading': !revealed }">
    <!-- the two fixed WebGL canvases are appended here by the engine -->
    <div ref="stage" class="clarix-stage" aria-hidden="true" />

    <!-- The nav fades in with everything else on the reveal signal. The gate is
         a class on the PAGE ROOT, deliberately not a wrapper element:
         `.reveal-anim` carries `will-change: transform`, which makes any wrapper
         a containing block for `position: fixed` descendants — and that
         collapsed the menu overlay's `inset: 0` onto the wrapper's own tiny box
         instead of the viewport. -->
    <GlobalNavigation pinned />

    <!-- ══ HERO ══
         Wrapped in its own 100vh box. These pieces position with `top: 43%` and
         `bottom: 3.125rem`, which the reference resolves against the initial
         containing block — one viewport. Here `.eco-clarix-page` is `position:
         relative` and ~20,500px tall (the scroll spacer), so without this
         wrapper the headline lands 43% DOWN THE DOCUMENT and the info block
         parks on the document floor, on top of the footer. -->
    <div class="eco-clarix-page__hero">
      <h1 id="animated-hero-title" class="hero-title">
        One intelligence.<br><span class="hero-subtitle">Many worlds.</span>
      </h1>

      <div class="hero-info-block preload-hidden reveal-anim from-bottom">
        <div class="hi-top"><span>( A )</span><span>[ 001 /007 ]</span></div>
        <div class="hi-text">
          SVARA connects intelligence across digital systems, physical operations and predictive
          infrastructure — giving enterprises one continuous layer of intelligence.
        </div>
        <NuxtLink to="/products" class="hi-btn">EXPLORE PLATFORMS</NuxtLink>
      </div>
    </div>

    <!-- ══ SCROLL FLOW · the perception → understanding beats ══ -->
    <div class="scroll-content-wrapper">
      <div class="scroll-title-container">
        <h3 class="animated-title flow-title">
          First, the system sees.<br>Raw signals become<br><span style="font-weight: 500;">context.</span>
        </h3>
      </div>

      <div class="clients-container">
        <div class="clients-subtitle">THE SVARA PLATFORMS</div>
        <div class="clients-line" />
        <!-- The reference marches client logos here. These are SVARA's OWN ten
             platforms — two identical sets so the -50% → 0 loop is seamless. -->
        <div class="marquee-container">
          <div class="marquee-content">
            <NuxtLink
              v-for="(platform, i) in [...homePlatforms, ...homePlatforms]"
              :key="`${platform.name}-${i}`"
              :to="platform.to"
              class="marquee-item"
            >{{ platform.name }}</NuxtLink>
          </div>
        </div>
      </div>

      <div class="feature-container" style="align-items: flex-end; padding-right: 3.125rem; padding-left: 3.125rem; box-sizing: border-box;">
        <h3 class="feature-title animated-title flow-title" style="text-align: right;">
          Then it predicts what<br>happens next — and<br><span style="font-weight: 500;">acts.</span>
        </h3>
      </div>
    </div>

    <!-- ══ PHASE 4 · autonomy ══ -->
    <div id="phase4-container" class="phase4-container">
      <div class="split-feature-container">
        <div class="hi-top" style="width: 100%; min-width: 15rem; max-width: 20rem; margin-bottom: 0;">
          <span>( B )</span><span>[ 005 /007 ]</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-start;">
          <div class="split-top" style="text-align: left; display: inline-block;">
            <h3 id="phase4-title" class="feature-title animated-title" style="text-align: left; margin-top: 0;">
              Intelligence becomes<br><span style="font-weight: 500;">action.</span>
            </h3>
            <div class="clients-line" style="margin-top: 3rem; margin-bottom: 3rem; width: 100%; margin-left: 0; margin-right: 0;" />
          </div>
          <div class="split-bottom" style="align-items: flex-start;">
            <div class="hi-text" style="text-align: left; max-width: 30rem;">
              AI agents and connected systems move decisions from insight to execution — closing the
              loop between what the ecosystem senses and what it does about it.
            </div>
            <NuxtLink to="/products" class="hi-btn" style="margin-top: 1.5rem; text-transform: uppercase;">
              SEE THE PLATFORMS
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ FLYING WORDS · the ecosystem's spine ══ -->
    <div class="words-container" aria-hidden="true">
      <div id="word1" class="flying-word"><span class="char">S</span><span class="char">e</span><span class="char">n</span><span class="char">s</span><span class="char">e</span></div>
      <div id="word2" class="flying-word"><span class="char">P</span><span class="char">r</span><span class="char">e</span><span class="char">d</span><span class="char">i</span><span class="char">c</span><span class="char">t</span></div>
      <div id="word3" class="flying-word"><span class="char">A</span><span class="char">c</span><span class="char">t</span></div>
    </div>

    <!-- ══ PHASE 3 · the glass stats panel ══ -->
    <div id="glass-container" class="glass-container">
      <div id="glass-gradient" class="glass-gradient-wrapper">
        <img :src="GRADIENT_URL" class="glass-gradient-img" alt="">
        <div class="gradient-content">
          <div id="phase3-title" class="gc-top-left animated-title">
            Every intelligence.<br>One infrastructure.
          </div>
          <div class="gc-bottom">
            <div class="gc-bottom-left">Ecosystem architecture</div>
            <div class="gc-bottom-right">
              <div
                v-for="(stat, i) in STATS"
                :key="stat.num"
                class="stat-col"
                :class="{ 'stat-col-tall': i === 0 }"
              >
                <div class="stat-num">{{ stat.num }}</div>
                <div class="stat-desc">
                  <template v-for="(line, li) in stat.lines" :key="li">
                    {{ line }}<br>
                  </template>
                  <span v-if="stat.sub" class="stat-sub">{{ stat.sub }}</span>
                </div>
                <div class="stat-btn">→</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ PHASE 5 · the assembled mark ══ -->
    <div id="phase5-container" class="phase5-container">
      <div class="hi-top phase5-label-right"><span>( C )</span><span>[ 006 /007 ]</span></div>
      <h3 id="phase5-title-1" class="feature-title phase5-title-left animated-title">One intelligence layer</h3>
      <div class="hi-text phase5-desc-left">
        Vision, edge, agents, twins, generative intelligence and enterprise systems operate on one
        shared intelligence architecture — connecting the physical, digital and operational worlds.
      </div>
      <h3 id="phase5-title-2" class="feature-title phase5-title-right animated-title">
        Engineered for<br><span style="font-weight: 500;">enterprise</span>
      </h3>
    </div>

    <!-- ══ PHASE 6 · finale ══ -->
    <div id="phase6-container" class="phase6-container">
      <h3 id="phase6-title" class="phase6-title animated-title">
        Engineering<br><span style="font-weight: 400;">intelligence</span>
      </h3>
    </div>

    <!-- The scroll itself. Everything above is fixed or absolute, so this
         in-flow spacer is what actually makes the page 2800vh tall — and what
         the engine measures, so the footer below never stretches the phases. -->
    <div ref="spacer" class="eco-clarix-page__spacer" aria-hidden="true" />

    <!-- The site's real footer, in normal flow: you scroll into it, exactly as
         on every other page. The hand-built glass footer this replaces was a
         second, divergent copy of the site's navigation. -->
    <div class="eco-clarix-page__footer">
      <Footer />
    </div>

  </div>
</template>

<style scoped>
.clarix-stage { position: fixed; inset: 0; pointer-events: none; }
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
</style>
