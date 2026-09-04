<script setup lang="ts">
// SVARA DIGITAL GROWTH & PR TECH — immersive full-screen growth command environment, opened from
// the Growth card's "Explore" control. SAME architecture as the other product overlays (Teleport,
// own scroll container with data-lenis-prevent, page scroll-locked, Escape/backdrop close → products
// page keeps its exact position). DISTINCT identity: the GROW/SYSTEM metaphor — "Growth is not a
// campaign. It is a system." A living growth flywheel (Data → Acquisition → Conversion → Retention →
// Intelligence, looping). Electric-violet "growth intelligence" palette on a warmer violet-navy base,
// own grx/grsec/grinst namespace. All copy VERBATIM from the source (P10, imported from
// ./growth-content); ONLY the five source service areas; telemetry abstract, mentions illustrative.
import { ref, watch, computed, onBeforeUnmount, nextTick } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { useGrowthExplore } from '~/composables/useGrowthExplore'
import {
  HERO_LINES, HEAD_STATUS, HERO_SYSTEMS, HERO_TELEMETRY, TRAD, SVARA_OUT, SERVICES, STACK,
  FLYWHEEL_STAGES, JOURNEY, TOUCHPOINTS, DD_CHAIN, ATTRIBUTION, AI_ACROSS, RADAR, MATURITY, CLIENTS,
  COMMERCIAL, CC_TELEMETRY, CC_PANELS,
} from './growth-content'
import ProductDashboard from '~/components/products/worlds/ProductDashboard.vue'

const { open, closeExplore } = useGrowthExplore()

// ── interactions ─────────────────────────────────────────────────────────────
const activeService = ref(0)
const activeJourney = ref(0)
const activeRadar = ref(0)
const aState = ref<'idle' | 'running'>('idle')
const aStep = ref(-1)
const timers: ReturnType<typeof setTimeout>[] = []
function clearTimers(): void { timers.forEach(clearTimeout); timers.length = 0 }
function runAttribution(): void {
  clearTimers()
  aState.value = 'running'; aStep.value = -1
  ATTRIBUTION.forEach((_, i) => timers.push(setTimeout(() => { aStep.value = i }, 300 + i * 560)))
  timers.push(setTimeout(() => { aState.value = 'idle' }, 300 + ATTRIBUTION.length * 560 + 900))
}

// ── scroll + progress + page lock ───────────────────────────────────────────
const scroller = ref<HTMLElement | null>(null)
const progress = ref(0)
function onScroll(): void {
  const el = scroller.value
  if (!el) return
  const max = el.scrollHeight - el.clientHeight
  progress.value = max > 0 ? el.scrollTop / max : 0
}
function lock(): void {
  if (typeof document === 'undefined') return
  ;(useNuxtApp().$lenis as { stop?: () => void } | undefined)?.stop?.()
  document.documentElement.style.overflow = 'hidden'
}
function unlock(): void {
  if (typeof document === 'undefined') return
  ;(useNuxtApp().$lenis as { start?: () => void } | undefined)?.start?.()
  document.documentElement.style.overflow = ''
}
function close(): void { closeExplore() }
function onKey(e: KeyboardEvent): void { if (e.key === 'Escape') close() }
watch(open, (v) => {
  if (typeof document === 'undefined') return
  if (v) {
    lock(); document.addEventListener('keydown', onKey)
    nextTick(() => {
      if (scroller.value) scroller.value.scrollTop = 0
      progress.value = 0; clearTimers()
      aState.value = 'idle'; aStep.value = -1
      activeService.value = 0; activeJourney.value = 0; activeRadar.value = 0
    })
  } else {
    unlock(); document.removeEventListener('keydown', onKey)
  }
})
onBeforeUnmount(() => { unlock(); document.removeEventListener('keydown', onKey); clearTimers() })

const svc = computed(() => SERVICES[activeService.value]!)
const jrn = computed(() => JOURNEY[activeJourney.value]!)
</script>

<template>
  <Teleport to="body">
    <AnimatePresence>
      <motion.div
        v-if="open" class="grx" role="dialog" aria-modal="true" aria-label="SVARA Digital Growth & PR Tech"
        :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
        :transition="{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }"
      >
        <div class="grx__backdrop" aria-hidden="true" @click="close" />
        <motion.section
          class="grx__panel"
          :initial="{ opacity: 0, scale: 0.96, y: 18 }" :animate="{ opacity: 1, scale: 1, y: 0 }"
          :exit="{ opacity: 0, scale: 0.97, y: 12 }" :transition="{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }"
        >
          <span class="grx__progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />

          <!-- HEADER (fixed) -->
          <header class="grx__header">
            <div class="grx__id">
              <span class="grx__core-i" aria-hidden="true"><i /></span>
              <div>
                <p class="grx__id-title">SVARA DIGITAL GROWTH</p>
                <p class="grx__id-sub">GROWTH INTELLIGENCE SYSTEM</p>
              </div>
              <span class="grx__status"><i />SYSTEM ONLINE</span>
            </div>
            <div class="grx__head-right">
              <span v-for="s in HEAD_STATUS" :key="s.k" class="grx__hstat"><b>{{ s.k }}</b>{{ s.v }}</span>
              <button type="button" class="grx__close" @click="close">CLOSE <span aria-hidden="true">×</span></button>
            </div>
          </header>

          <div ref="scroller" class="grx__scroll" data-lenis-prevent @scroll="onScroll">
            <div class="grx__inner">
              <!-- HERO -->
              <section class="grsec grsec--hero">
                <p class="grlabel grlabel--vi">06 // Digital Growth</p>
                <h1 class="grx__lede">
                  <span v-for="(l, i) in HERO_LINES" :key="l" class="grx__lede-line" :class="{ 'grx__lede-line--accent': i === 2 }" :style="{ '--d': i }">{{ l }}</span>
                </h1>
                <p class="grx__hero-copy">SVARA transforms marketing into an intelligence-driven growth system where every touchpoint captures data, every interaction informs the next, and every rupee of spend is accountable to a measurable business outcome.</p>

                <!-- HERO VISUAL: growth intelligence core -->
                <div class="hub grinst svara-instrument">
                  <span class="grinst__label">GROWTH INTELLIGENCE CORE</span>
                  <div class="hub__ring-wrap">
                    <span class="hub__ring" aria-hidden="true" />
                    <span class="hub__center">SVARA<br>GROWTH<br>INTELLIGENCE</span>
                    <span v-for="(s, i) in HERO_SYSTEMS" :key="s.k" class="hub__node" :style="{ '--i': i, '--n': HERO_SYSTEMS.length }"><b>{{ s.n }}</b>{{ s.k }}</span>
                  </div>
                  <div class="hub__tel">
                    <span v-for="t in HERO_TELEMETRY" :key="t" class="hub__tel-cell">{{ t }}<i aria-hidden="true"><em v-for="n in 3" :key="n" /></i></span>
                  </div>
                  <p class="grsim">◦ ABSTRACT TELEMETRY — ILLUSTRATIVE, NOT ACTUAL PERFORMANCE DATA</p>
                </div>
              </section>

              <!-- the product's own HUD dashboard, in its own section -->
              <ProductDashboard id="growth" />

              <!-- PHILOSOPHY -->
              <section class="grsec">
                <div class="grsec__head"><span class="grlabel">Philosophy</span><h2 class="grsec__title">From marketing activity to business outcomes.</h2></div>
                <div class="vs">
                  <div class="vs__lane grinst svara-instrument">
                    <span class="grinst__label">TRADITIONAL MARKETING</span>
                    <div class="caps"><span v-for="t in TRAD" :key="t" class="grchip">{{ t }}</span></div>
                  </div>
                  <div class="vs__lane vs__lane--svara grinst svara-instrument">
                    <span class="grinst__label">SVARA GROWTH</span>
                    <div class="caps"><span v-for="o in SVARA_OUT" :key="o" class="grchip grchip--on">{{ o }}</span></div>
                  </div>
                </div>
              </section>

              <!-- CORE SERVICES (switcher) -->
              <section class="grsec">
                <div class="grsec__head"><span class="grlabel">Core Service Areas</span><h2 class="grsec__title">Five systems. One growth machine.</h2></div>
                <div class="switch">
                  <button
                    v-for="(s, i) in SERVICES" :key="s.id" type="button" class="switch__tab"
                    :class="{ 'is-active': activeService === i }" :style="{ '--m-accent': s.accent }" @click="activeService = i"
                  >
                    <span class="switch__dot" /><span class="switch__n">{{ s.n }}</span>{{ s.k }}
                  </button>
                </div>
                <div class="svc grinst svara-instrument" :style="{ '--m-accent': svc.accent }">
                  <span class="grinst__label">{{ svc.n }} // {{ svc.sub }}</span>
                  <p class="svc__k">{{ svc.k }}</p>
                  <p v-if="svc.pos" class="svc__pos">{{ svc.pos }}</p>
                  <div v-if="svc.funnel" class="chain-h svc__funnel">
                    <template v-for="(f, i) in svc.funnel" :key="f"><span class="chain-h__n chain-h__n--accent">{{ f }}</span><span v-if="i < svc.funnel.length - 1" class="chain-h__l" aria-hidden="true">→</span></template>
                  </div>
                  <div class="svc__groups">
                    <div v-for="g in svc.groups" :key="g.k" class="svc__group">
                      <span class="svc__g-k">{{ g.k }}</span>
                      <div v-if="g.chain" class="chain-h"><template v-for="(it, i) in g.items" :key="it"><span class="chain-h__n">{{ it }}</span><span v-if="i < g.items!.length - 1" class="chain-h__l" aria-hidden="true">→</span></template></div>
                      <div v-else-if="g.items" class="caps"><span v-for="it in g.items" :key="it" class="grchip">{{ it }}</span></div>
                      <p v-if="g.note" class="svc__g-note">{{ g.note }}</p>
                    </div>
                  </div>
                </div>
              </section>

              <!-- GROWTH STACK -->
              <section class="grsec">
                <div class="grsec__head"><span class="grlabel">The SVARA Growth Stack</span><h2 class="grsec__title">Five layers that compound.</h2></div>
                <div class="stack">
                  <template v-for="(l, i) in STACK" :key="l.n">
                    <div class="stack__layer grinst svara-instrument">
                      <span class="grinst__label">LAYER / {{ l.n }}</span>
                      <div class="stack__row">
                        <p class="stack__k">{{ l.k }}</p>
                        <div class="caps stack__tools"><span v-for="t in l.tools" :key="t" class="grchip">{{ t }}</span></div>
                        <p class="stack__out"><span class="grlabel grlabel--vi">Outcome</span>{{ l.out }}</p>
                      </div>
                    </div>
                    <span v-if="i < STACK.length - 1" class="stack__link" aria-hidden="true">↓</span>
                  </template>
                </div>
              </section>

              <!-- GROWTH FLYWHEEL -->
              <section class="grsec">
                <div class="grsec__head"><span class="grlabel">The Growth Flywheel</span><h2 class="grsec__title">Growth is a system that never stops.</h2></div>
                <div class="fly">
                  <span class="fly__ring" aria-hidden="true" />
                  <span class="fly__pulse" aria-hidden="true" />
                  <span class="fly__center">SVARA<br>GROWTH<br>INTELLIGENCE</span>
                  <span v-for="(s, i) in FLYWHEEL_STAGES" :key="s" class="fly__node" :style="{ '--i': i, '--n': FLYWHEEL_STAGES.length }">{{ s }}</span>
                </div>
                <p class="grbody fly__copy">DATA → INSIGHT → ACTION → INTERACTION → DATA — the loop compounds into growth.</p>
              </section>

              <!-- CUSTOMER JOURNEY -->
              <section class="grsec">
                <div class="grsec__head"><span class="grlabel">Customer Journey</span><h2 class="grsec__title">Every stage. The right system.</h2></div>
                <div class="jrn">
                  <div class="jrn__track">
                    <template v-for="(j, i) in JOURNEY" :key="j.k">
                      <button type="button" class="jrn__stage" :class="{ 'is-active': activeJourney === i }" @click="activeJourney = i"><i />{{ j.k }}</button>
                      <span v-if="i < JOURNEY.length - 1" class="jrn__seg" aria-hidden="true" />
                    </template>
                  </div>
                  <div class="jrn__detail grinst svara-instrument">
                    <span class="grinst__label">STAGE / {{ jrn.k }}</span>
                    <div class="caps"><span v-for="s in jrn.s" :key="s" class="grchip grchip--on">{{ s }}</span></div>
                  </div>
                </div>
              </section>

              <!-- DATA → DECISION -->
              <section class="grsec">
                <div class="grsec__head"><span class="grlabel">Data → Decision</span><h2 class="grsec__title">Every touchpoint becomes a signal.</h2></div>
                <div class="dd grinst svara-instrument">
                  <div class="caps dd__points"><span v-for="t in TOUCHPOINTS" :key="t" class="grchip">{{ t }}</span></div>
                  <span class="dd__down" aria-hidden="true">↓</span>
                  <div class="chain-h dd__chain"><template v-for="(c, i) in DD_CHAIN" :key="c"><span class="chain-h__n" :class="{ 'chain-h__n--on': i === DD_CHAIN.length - 1 }">{{ c }}</span><span v-if="i < DD_CHAIN.length - 1" class="chain-h__l" aria-hidden="true">→</span></template></div>
                </div>
              </section>

              <!-- ATTRIBUTION -->
              <section class="grsec">
                <div class="grsec__head"><span class="grlabel">Attribution Engine</span><h2 class="grsec__title">See what actually drives growth.</h2></div>
                <div class="attr grinst svara-instrument">
                  <div class="attr__top">
                    <span class="grinst__label">MULTI-TOUCH ATTRIBUTION</span>
                    <button type="button" class="grrun" @click="runAttribution">{{ aState === 'idle' ? 'TRACE PATH' : 'TRACING…' }} ↗</button>
                  </div>
                  <div class="attr__chain">
                    <template v-for="(a, i) in ATTRIBUTION" :key="a.t">
                      <span class="attr__node" :class="{ 'is-on': aStep >= i, 'attr__node--end': i === ATTRIBUTION.length - 1 }"><b>{{ a.t }}</b>{{ a.c }}</span>
                      <span v-if="i < ATTRIBUTION.length - 1" class="attr__link" :class="{ 'is-on': aStep > i }" aria-hidden="true">↓</span>
                    </template>
                  </div>
                  <p class="grbody">Full-funnel tracking from first touch to closed deal, so spend decisions are data-driven.</p>
                </div>
              </section>

              <!-- AI GROWTH ENGINE -->
              <section class="grsec">
                <div class="grsec__head"><span class="grlabel">AI Growth Engine</span><h2 class="grsec__title">AI doesn’t replace the system.<br><span>It makes the system intelligent.</span></h2></div>
                <div class="ai grinst svara-instrument">
                  <span class="grinst__label">AI ACROSS THE GROWTH SYSTEM</span>
                  <div class="caps"><span v-for="a in AI_ACROSS" :key="a" class="grchip grchip--vi">{{ a }}</span></div>
                </div>
              </section>

              <!-- BRAND INTELLIGENCE RADAR -->
              <section class="grsec">
                <div class="grsec__head"><span class="grlabel">Brand Intelligence Radar</span><h2 class="grsec__title">Signals moving toward the brand.</h2></div>
                <div class="radar">
                  <div class="radar__scope">
                    <span class="radar__sweep" aria-hidden="true" />
                    <span class="radar__ring radar__ring--1" aria-hidden="true" />
                    <span class="radar__ring radar__ring--2" aria-hidden="true" />
                    <span class="radar__center">SVARA<br>BRAND</span>
                    <button
                      v-for="(r, i) in RADAR" :key="r" type="button" class="radar__node" :class="{ 'is-active': activeRadar === i }"
                      :style="{ '--i': i, '--n': RADAR.length }" @mouseenter="activeRadar = i" @click="activeRadar = i"
                    >{{ r }}</button>
                  </div>
                  <div class="radar__detail grinst svara-instrument">
                    <span class="grinst__label">SIGNAL / {{ RADAR[activeRadar] }}</span>
                    <div class="radar__meta">
                      <span><b>MENTION</b>— illustrative —</span>
                      <span><b>SOURCE</b>{{ RADAR[activeRadar] }}</span>
                      <span><b>CATEGORY</b>Brand signal</span>
                      <span><b>STATUS</b>Monitoring</span>
                    </div>
                    <p class="grsim">◦ ILLUSTRATIVE UI PLACEHOLDER — NO ACTUAL MENTIONS OR SENTIMENT SCORES</p>
                  </div>
                </div>
              </section>

              <!-- GROWTH MATURITY -->
              <section class="grsec">
                <div class="grsec__head"><span class="grlabel">Growth Maturity</span><h2 class="grsec__title">From campaign to compounding growth.</h2></div>
                <div class="chain-h maturity"><template v-for="(m, i) in MATURITY" :key="m"><span class="chain-h__n" :class="{ 'chain-h__n--on': i === MATURITY.length - 1 }">{{ m }}</span><span v-if="i < MATURITY.length - 1" class="chain-h__l" aria-hidden="true">→</span></template></div>
              </section>

              <!-- TARGET CLIENTS -->
              <section class="grsec">
                <div class="grsec__head"><span class="grlabel">Target Clients</span><h2 class="grsec__title">Built for growth-driven organisations.</h2></div>
                <div class="grid3">
                  <div v-for="c in CLIENTS" :key="c.n" class="grmod grinst svara-instrument">
                    <span class="grinst__label">{{ c.n }}</span>
                    <p class="grmod__t">{{ c.k }}</p><p class="grmod__b">{{ c.d }}</p>
                  </div>
                </div>
              </section>

              <!-- COMMERCIAL -->
              <section class="grsec">
                <div class="grsec__head"><span class="grlabel">Commercial Models</span><h2 class="grsec__title">Four growth-system engagements.</h2></div>
                <div class="grid2">
                  <div v-for="c in COMMERCIAL" :key="c.n" class="pkg grinst svara-instrument">
                    <span class="grinst__label">PACKAGE / {{ c.n }}</span>
                    <p class="pkg__k">{{ c.k }}</p>
                    <div class="pkg__scope"><span class="grlabel grlabel--vi">Scope</span><ul><li v-for="s in c.scope" :key="s">{{ s }}</li></ul></div>
                    <p class="pkg__v">{{ c.v }}<span v-if="c.note"> {{ c.note }}</span></p>
                  </div>
                </div>
              </section>

              <!-- GROWTH COMMAND CENTER -->
              <section class="grsec">
                <div class="grsec__head"><span class="grlabel">Growth Command Center</span><h2 class="grsec__title">Every system, one growth core.</h2></div>
                <div class="cc grinst svara-instrument">
                  <span class="grinst__label">SVARA GROWTH INTELLIGENCE</span>
                  <div class="caps cc__tel"><span v-for="t in CC_TELEMETRY" :key="t" class="grchip grchip--on">{{ t }}</span></div>
                </div>
                <div class="grid4 cc__panels">
                  <div v-for="p in CC_PANELS" :key="p" class="cc__panel grinst svara-instrument"><span class="cc__dot" />{{ p }}</div>
                </div>
              </section>

              <!-- FINAL CTA -->
              <section class="grsec grsec--final">
                <p class="grx__final">Build a growth system.<br><span>Not just a campaign.</span></p>
                <p class="grx__final-copy">Growth is the system you build, the data you gather, and the intelligence you apply — every day.</p>
                <div class="grx__final-cta">
                  <NuxtLink to="/contact" class="grx__cta grx__cta--primary" @click="close">BUILD YOUR GROWTH SYSTEM <span aria-hidden="true">↗</span></NuxtLink>
                  <NuxtLink to="/technology" class="grx__cta grx__cta--ghost" @click="close">EXPLORE SVARA TECHNOLOGY</NuxtLink>
                  <NuxtLink to="/contact" class="grx__cta grx__cta--ghost" @click="close">TALK TO SVARA</NuxtLink>
                </div>
              </section>

              <footer class="grx__foot">SVARA · DIGITAL GROWTH & PR TECH · GROWTH INTELLIGENCE · v1.0</footer>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  </Teleport>
</template>

<style scoped>
.grx {
  position: fixed; inset: 0; z-index: 100000; display: flex; justify-content: center;
  --gr-bg: #0a0718; --gr-bg2: #150e30; --gr-ink: #efeaff; --gr-muted: rgba(200, 192, 235, 0.6);
  --gr-line: rgba(140, 110, 255, 0.26); --gr-blue: #6a7bff; --gr-violet: #b47dff; --gr-cyan: #4fd6ea; --gr-green: #46d69a; --gr-amber: #ffb340;
  color: var(--gr-ink); font-family: var(--font-mono, ui-monospace, monospace);
}
.grx__backdrop { position: absolute; inset: 0; background: rgba(4, 2, 12, 0.72); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); }
.grx__panel {
  position: relative; z-index: 1; width: min(1340px, 100%); height: 100%; display: flex; flex-direction: column; overflow: hidden;
  background: radial-gradient(circle at 14% 5%, rgba(180, 125, 255, 0.14), transparent 30%), radial-gradient(circle at 86% 88%, rgba(79, 214, 234, 0.08), transparent 34%), linear-gradient(160deg, var(--gr-bg2), var(--gr-bg) 58%, #05030f);
  border-left: 1px solid var(--gr-line); border-right: 1px solid var(--gr-line); box-shadow: 0 0 120px -20px rgba(0, 0, 0, 0.86);
}
.grx__progress { position: absolute; top: 0; left: 0; height: 2px; width: 100%; transform-origin: left; background: linear-gradient(90deg, var(--gr-violet), var(--gr-cyan)); z-index: 6; }

.grx__header { flex: 0 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; padding: 14px clamp(16px, 3vw, 34px); border-bottom: 1px solid var(--gr-line); background: linear-gradient(90deg, rgba(10, 7, 24, 0.92), rgba(21, 14, 48, 0.6)); }
.grx__id { display: flex; align-items: center; gap: 13px; min-width: 0; }
.grx__core-i { position: relative; width: 30px; height: 30px; border: 1px solid var(--gr-violet); display: grid; place-items: center; flex-shrink: 0; clip-path: polygon(0 6px, 6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%); }
.grx__core-i i { width: 8px; height: 8px; border-radius: 50%; background: var(--gr-violet); box-shadow: 0 0 12px var(--gr-violet); animation: grx-pulse 2.2s ease-in-out infinite; }
.grx__id-title { margin: 0; font-size: 12.5px; font-weight: 700; letter-spacing: 0.13em; color: #fff; }
.grx__id-sub { margin: 2px 0 0; font-size: 9px; letter-spacing: 0.14em; color: var(--gr-muted); }
.grx__status { display: inline-flex; align-items: center; gap: 7px; margin-left: 6px; font-size: 9.5px; letter-spacing: 0.13em; color: var(--gr-green); }
.grx__status i { width: 6px; height: 6px; border-radius: 50%; background: var(--gr-green); box-shadow: 0 0 10px var(--gr-green); }
.grx__head-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.grx__hstat { display: inline-flex; flex-direction: column; font-size: 8px; letter-spacing: 0.1em; color: var(--gr-cyan); line-height: 1.4; }
.grx__hstat b { color: var(--gr-muted); font-weight: 500; }
.grx__close { display: inline-flex; align-items: center; gap: 7px; padding: 9px 15px; border: 1px solid var(--gr-line); background: rgba(140, 110, 255, 0.06); color: var(--gr-ink); font: inherit; font-size: 10px; letter-spacing: 0.13em; cursor: pointer; transition: background 180ms, border-color 180ms; clip-path: polygon(0 5px, 5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%); }
.grx__close:hover { background: rgba(140, 110, 255, 0.16); border-color: var(--gr-violet); }

.grx__scroll { flex: 1 1 auto; min-height: 0; overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--gr-violet) transparent; }
.grx__scroll::-webkit-scrollbar { width: 8px; }
.grx__scroll::-webkit-scrollbar-thumb { background: rgba(140, 110, 255, 0.4); border-radius: 8px; }
.grx__inner { max-width: 1140px; margin-inline: auto; padding: clamp(28px, 5vw, 68px) clamp(16px, 3vw, 40px) 60px; }

/* shared primitives */
.grinst { position: relative; padding: 40px 18px 18px; background: rgba(16, 11, 38, 0.5); }
.grinst__label { position: absolute; top: 9px; left: clamp(14px, 2vw, 22px); z-index: 3; font-size: 9px; letter-spacing: 0.14em; color: var(--gr-cyan); pointer-events: none; }
.grlabel { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gr-muted); }
.grlabel--vi { color: var(--gr-violet); }
.grchip { display: inline-flex; align-items: center; padding: 7px 12px; font-size: 10px; letter-spacing: 0.05em; color: var(--gr-ink); border: 1px solid var(--gr-line); background: rgba(140, 110, 255, 0.05); }
.grchip--on { color: var(--gr-cyan); border-color: var(--gr-blue); background: rgba(106, 123, 255, 0.1); }
.grchip--vi { color: var(--gr-violet); border-color: rgba(180, 125, 255, 0.45); }
.grsim { margin: 14px 0 0; font-size: 8.5px; letter-spacing: 0.14em; color: var(--gr-muted); }
.grbody { margin: 16px 0 0; max-width: 66ch; font-size: 12.5px; line-height: 1.7; color: var(--gr-muted); }
.caps { display: flex; flex-wrap: wrap; gap: 8px; }
.grsec { padding: clamp(34px, 5vw, 60px) 0; border-top: 1px solid rgba(140, 110, 255, 0.12); }
.grsec--hero { border-top: 0; padding-top: 6px; }
.grsec__head { margin-bottom: 24px; }
.grsec__title { margin: 8px 0 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(21px, 3vw, 34px); font-weight: 650; letter-spacing: -0.01em; color: #fff; line-height: 1.12; }
.grsec__title span { color: var(--gr-violet); }

/* generic chain */
.chain-h { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; }
.chain-h__n { padding: 9px 12px; border: 1px solid var(--gr-line); background: rgba(16, 11, 38, 0.5); font-size: 10px; font-weight: 700; letter-spacing: 0.04em; color: var(--gr-muted); }
.chain-h__n--on { color: var(--gr-cyan); border-color: var(--gr-blue); background: rgba(106, 123, 255, 0.12); }
.chain-h__n--accent { color: var(--m-accent, var(--gr-cyan)); border-color: var(--m-accent, var(--gr-blue)); background: color-mix(in srgb, var(--m-accent, var(--gr-blue)) 10%, transparent); }
.chain-h__l { color: var(--gr-violet); }

/* HERO */
.grx__lede { margin: 12px 0 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(32px, 5.4vw, 66px); font-weight: 600; line-height: 1.03; letter-spacing: -0.02em; color: #fff; }
.grx__lede-line { display: block; opacity: 0; transform: translateY(14px); filter: blur(6px); animation: grx-line-in 0.72s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: calc(var(--d) * 170ms + 200ms); }
.grx__lede-line--accent { color: var(--gr-violet); }
.grx__hero-copy { margin: 20px 0 30px; max-width: 66ch; font-size: 13.5px; line-height: 1.7; color: var(--gr-muted); }

.hub__ring-wrap { position: relative; height: 330px; display: grid; place-items: center; margin-bottom: 16px; }
.hub__ring { position: absolute; width: 250px; height: 250px; border-radius: 50%; border: 1px dashed var(--gr-line); }
.hub__center { position: relative; z-index: 2; display: grid; place-items: center; width: 138px; height: 138px; border-radius: 50%; border: 1px solid var(--gr-violet); background: rgba(140, 110, 255, 0.1); font-size: 11px; font-weight: 700; letter-spacing: 0.06em; color: var(--gr-violet); text-align: center; line-height: 1.4; box-shadow: 0 0 54px -10px rgba(180, 125, 255, 0.8), inset 0 0 30px -12px rgba(79, 214, 234, 0.5); }
.hub__node { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 8px 11px; border: 1px solid var(--gr-line); background: rgba(16, 11, 38, 0.92); font-size: 9px; font-weight: 700; letter-spacing: 0.03em; color: var(--gr-ink); transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-152px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
.hub__node b { font-size: 7px; color: var(--gr-violet); }
.hub__tel { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 8px; }
.hub__tel-cell { display: flex; flex-direction: column; gap: 8px; padding: 10px; border: 1px solid var(--gr-line); background: rgba(140, 110, 255, 0.04); font-size: 8px; letter-spacing: 0.08em; color: var(--gr-muted); text-align: center; }
.hub__tel-cell i { display: flex; justify-content: center; gap: 3px; }
.hub__tel-cell em { width: 4px; height: 4px; border-radius: 50%; background: var(--gr-cyan); opacity: 0.5; animation: grx-blink 1.6s infinite; }
.hub__tel-cell em:nth-child(2) { animation-delay: 0.3s; } .hub__tel-cell em:nth-child(3) { animation-delay: 0.6s; }

/* PHILOSOPHY */
.vs { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.vs__lane--svara { border: 1px solid var(--gr-violet); }

/* SWITCHER */
.switch { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
.switch__tab { display: inline-flex; align-items: center; gap: 9px; padding: 12px 15px; background: rgba(16, 11, 38, 0.5); border: 1px solid transparent; color: var(--gr-muted); font: inherit; font-size: 11px; letter-spacing: 0.04em; cursor: pointer; transition: color 180ms, border-color 180ms, background 180ms; }
.switch__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--m-accent); box-shadow: 0 0 8px var(--m-accent); flex: none; opacity: 0.6; transition: opacity 180ms; }
.switch__n { color: var(--m-accent); font-size: 10px; }
.switch__tab.is-active { color: #fff; border-color: var(--m-accent); background: color-mix(in srgb, var(--m-accent) 10%, transparent); }
.switch__tab.is-active .switch__dot { opacity: 1; }
.svc__k { margin: 0 0 8px; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(20px, 2.6vw, 28px); font-weight: 650; color: var(--m-accent); }
.svc__pos { margin: 0 0 18px; max-width: 70ch; font-size: 12.5px; line-height: 1.7; color: var(--gr-muted); }
.svc__funnel { margin-bottom: 22px; }
.svc__groups { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px 24px; }
.svc__group { display: flex; flex-direction: column; gap: 10px; }
.svc__g-k { font-size: 10px; font-weight: 700; letter-spacing: 0.07em; color: var(--m-accent); }
.svc__g-note { margin: 0; font-size: 10.5px; line-height: 1.6; color: var(--gr-muted); }

/* GROWTH STACK */
.stack { display: flex; flex-direction: column; align-items: stretch; gap: 6px; }
.stack__row { display: grid; grid-template-columns: 0.7fr 1.6fr 1fr; gap: 16px; align-items: center; }
.stack__k { margin: 0; font-size: 12.5px; font-weight: 700; letter-spacing: 0.06em; color: #fff; }
.stack__out { margin: 0; font-size: 10.5px; line-height: 1.5; color: var(--gr-muted); display: flex; flex-direction: column; gap: 5px; }
.stack__link { align-self: center; color: var(--gr-violet); font-size: 15px; }

/* FLYWHEEL */
.fly { position: relative; height: 340px; display: grid; place-items: center; margin-bottom: 8px; }
.fly__ring { position: absolute; width: 250px; height: 250px; border-radius: 50%; border: 1px dashed var(--gr-line); animation: grx-spin 34s linear infinite; }
.fly__pulse { position: absolute; width: 8px; height: 8px; border-radius: 50%; background: var(--gr-cyan); box-shadow: 0 0 12px var(--gr-cyan); offset-path: circle(125px at center); animation: grx-orbit 7s linear infinite; }
.fly__center { position: relative; z-index: 2; display: grid; place-items: center; width: 134px; height: 134px; border-radius: 50%; border: 1px solid var(--gr-violet); background: rgba(140, 110, 255, 0.1); font-size: 11px; font-weight: 700; letter-spacing: 0.05em; color: var(--gr-violet); text-align: center; line-height: 1.4; box-shadow: 0 0 50px -12px rgba(180, 125, 255, 0.8); }
.fly__node { position: absolute; padding: 9px 13px; border: 1px solid var(--gr-blue); background: rgba(16, 11, 38, 0.92); font-size: 9.5px; font-weight: 700; letter-spacing: 0.04em; color: var(--gr-cyan); transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-152px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
.fly__copy { margin-inline: auto; text-align: center; }

/* CUSTOMER JOURNEY */
.jrn__track { display: flex; align-items: center; margin: 6px 0 18px; overflow-x: auto; padding-bottom: 6px; }
.jrn__stage { display: flex; flex-direction: column; align-items: center; gap: 8px; flex: none; font: inherit; font-size: 9.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--gr-muted); background: none; border: 0; cursor: pointer; transition: color 180ms; }
.jrn__stage i { width: 12px; height: 12px; border-radius: 50%; border: 1px solid var(--gr-line); background: rgba(16, 11, 38, 0.8); transition: background 180ms, border-color 180ms; }
.jrn__stage.is-active { color: var(--gr-violet); }
.jrn__stage.is-active i { background: var(--gr-violet); border-color: var(--gr-violet); box-shadow: 0 0 12px var(--gr-violet); }
.jrn__seg { flex: 1 0 20px; height: 1px; background: var(--gr-line); margin: 0 6px; align-self: flex-start; margin-top: 6px; }

/* DATA → DECISION */
.dd { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; }
.dd__points { justify-content: center; }
.dd__down { color: var(--gr-violet); }
.dd__chain { justify-content: center; }

/* ATTRIBUTION */
.attr__top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; flex-wrap: wrap; }
.attr__chain { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.attr__node { width: 100%; max-width: 420px; display: flex; flex-direction: column; gap: 3px; align-items: center; text-align: center; padding: 12px; border: 1px solid var(--gr-line); background: rgba(16, 11, 38, 0.5); transition: color 260ms, border-color 260ms, background 260ms; }
.attr__node b { font-size: 9px; letter-spacing: 0.1em; color: var(--gr-muted); }
.attr__node.is-on { border-color: var(--gr-blue); background: rgba(106, 123, 255, 0.08); color: var(--gr-cyan); }
.attr__node.is-on b { color: var(--gr-violet); }
.attr__node--end.is-on { border-color: var(--gr-green); color: var(--gr-green); }
.attr__link { color: rgba(150, 130, 220, 0.4); transition: color 260ms; }
.attr__link.is-on { color: var(--gr-violet); }

/* AI GROWTH */
.ai .caps { gap: 8px; }

/* RADAR */
.radar { display: grid; grid-template-columns: 1fr 0.9fr; gap: 16px; align-items: center; }
.radar__scope { position: relative; height: 320px; display: grid; place-items: center; overflow: hidden; }
.radar__ring { position: absolute; border-radius: 50%; border: 1px solid var(--gr-line); }
.radar__ring--1 { width: 160px; height: 160px; } .radar__ring--2 { width: 250px; height: 250px; }
.radar__sweep { position: absolute; width: 250px; height: 250px; border-radius: 50%; background: conic-gradient(from 0deg, rgba(180, 125, 255, 0.22), transparent 30%); animation: grx-spin 5s linear infinite; }
.radar__center { position: relative; z-index: 2; display: grid; place-items: center; width: 100px; height: 100px; border-radius: 50%; border: 1px solid var(--gr-violet); background: rgba(140, 110, 255, 0.12); font-size: 10px; font-weight: 700; letter-spacing: 0.05em; color: var(--gr-violet); text-align: center; }
.radar__node { position: absolute; z-index: 3; padding: 7px 11px; border: 1px solid var(--gr-line); background: rgba(16, 11, 38, 0.92); font: inherit; font-size: 9px; font-weight: 700; letter-spacing: 0.04em; color: var(--gr-ink); cursor: pointer; transition: color 180ms, border-color 180ms; transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-126px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
.radar__node.is-active { color: var(--gr-cyan); border-color: var(--gr-blue); }
.radar__meta { display: flex; flex-direction: column; gap: 8px; }
.radar__meta span { display: flex; gap: 12px; font-size: 10.5px; color: var(--gr-ink); }
.radar__meta b { flex: 0 0 84px; font-size: 8.5px; letter-spacing: 0.1em; color: var(--gr-cyan); padding-top: 2px; }

/* MATURITY */
.maturity { justify-content: center; }

/* CLIENTS + grids */
.grid4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.grid3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.grid2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.grmod__t { margin: 0 0 8px; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; color: #fff; }
.grmod__b { margin: 0; font-size: 10.5px; line-height: 1.6; color: var(--gr-muted); }

/* COMMERCIAL */
.pkg { display: flex; flex-direction: column; }
.pkg__k { margin: 0 0 14px; font-family: var(--font-sans, system-ui, sans-serif); font-size: 19px; font-weight: 650; color: #fff; }
.pkg__scope { margin-bottom: 14px; }
.pkg__scope ul { margin: 8px 0 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 6px; }
.pkg__scope li { position: relative; padding-left: 14px; font-size: 11px; line-height: 1.5; color: var(--gr-muted); }
.pkg__scope li::before { content: '›'; position: absolute; left: 0; color: var(--gr-violet); }
.pkg__v { margin: auto 0 0; padding-top: 12px; font-size: clamp(14px, 1.9vw, 20px); font-weight: 700; color: var(--gr-cyan); }
.pkg__v span { font-size: 10px; font-weight: 500; color: var(--gr-muted); }

/* COMMAND CENTER */
.cc__tel { justify-content: center; }
.cc__panels { margin-top: 12px; }
.cc__panel { display: flex; align-items: center; gap: 10px; padding-top: 34px; font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--gr-ink); }
.cc__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--gr-violet); box-shadow: 0 0 8px var(--gr-violet); flex: none; }

/* FINAL */
.grsec--final { text-align: center; border-top: 1px solid var(--gr-line); }
.grx__final { margin: 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(24px, 4.2vw, 48px); font-weight: 600; line-height: 1.12; color: #fff; }
.grx__final span { color: var(--gr-violet); }
.grx__final-copy { margin: 18px auto 0; max-width: 58ch; font-size: 12.5px; line-height: 1.7; color: var(--gr-muted); }
.grx__final-cta { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 26px; }
.grx__cta { display: inline-flex; align-items: center; gap: 10px; padding: 15px 26px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-decoration: none; }
.grx__cta--primary { background: var(--gr-violet); color: #0c0620; }
.grx__cta--ghost { background: transparent; color: var(--gr-ink); border: 1px solid var(--gr-line); }
.grx__foot { margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(140, 110, 255, 0.12); text-align: center; font-size: 9px; letter-spacing: 0.2em; color: var(--gr-muted); }

@keyframes grx-pulse { 50% { opacity: 0.4; } }
@keyframes grx-line-in { to { opacity: 1; transform: translateY(0); filter: blur(0); } }
@keyframes grx-blink { 0%, 100% { opacity: 0.25; } 50% { opacity: 1; } }
@keyframes grx-spin { to { transform: rotate(360deg); } }
@keyframes grx-orbit { to { offset-distance: 100%; } }

/* ── responsive ── */
@media (max-width: 900px) {
  .grid4, .grid3 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid2, .vs, .svc__groups, .radar, .stack__row { grid-template-columns: 1fr; }
  .switch { overflow-x: auto; flex-wrap: nowrap; }
  .switch__tab { flex: none; }
  .grx__hstat { display: none; }
}
@media (max-width: 560px) {
  .grid4, .grid3, .grid2 { grid-template-columns: 1fr; }
  .grx__id-sub { display: none; }
  .hub__ring-wrap, .fly, .radar__scope { height: 290px; }
  .hub__tel { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .hub__node, .fly__node { transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-120px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
  .radar__node { transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-108px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
}
@media (prefers-reduced-motion: reduce) {
  .grx__core-i i, .hub__tel-cell em, .fly__ring, .fly__pulse, .radar__sweep { animation: none; }
  .grx__lede-line { animation: none; opacity: 1; transform: none; filter: none; }
  .chain-h__n, .attr__node, .attr__link, .switch__tab, .jrn__stage i, .radar__node { transition: none; }
}
</style>
