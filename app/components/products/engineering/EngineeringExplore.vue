<script setup lang="ts">
// SVARA DIGITAL ENGINEERING — immersive full-screen engineering command environment, opened from
// the Engineering card's "Explore" control. SAME architecture as the other product overlays
// (Teleport, own scroll container with data-lenis-prevent, page scroll-locked, Escape/backdrop close
// → products page keeps its exact position). DISTINCT identity: the BUILD/ENGINEER metaphor — the
// complete technology layer around a business (Discover → Architect → Build → Integrate → Deploy →
// Evolve). Precision-engineering "blueprint" language (engineering grids, schematics, code-style
// micro-labels, live build pipelines), own eng/engsec/enginst namespace. All copy VERBATIM from the
// source (P09, imported from ./engineering-content); foundation models shown as integration nodes.
import { ref, watch, computed, onBeforeUnmount, nextTick } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { useEngineeringExplore } from '~/composables/useEngineeringExplore'
import {
  HERO_LINES, HEAD_STATUS, CORE_INNER, HERO_DOMAINS, PHASES, DOMAINS, PIPELINE, DISCOVERY,
  DISCOVERY_FLOW, QUALITY, LIVE_PIPE, STACK, MAP, AI_EXAMPLES, MODERN_CHAIN, INTEGRATIONS, ECO_CHAIN,
  ECO_PATHS, COMMERCIAL, CC_TELEMETRY, CC_PANELS,
} from './engineering-content'
import ProductDashboard from '~/components/products/worlds/ProductDashboard.vue'

const { open, closeExplore } = useEngineeringExplore()

// ── interactions ─────────────────────────────────────────────────────────────
const activeDomain = ref(0)
const activeMap = ref(0)
const pState = ref<'idle' | 'running'>('idle')
const pStep = ref(-1)
const lState = ref<'idle' | 'running'>('idle')
const lStep = ref(-1)
const timers: ReturnType<typeof setTimeout>[] = []
function clearTimers(): void { timers.forEach(clearTimeout); timers.length = 0 }
function runChain(state: typeof pState, step: typeof pStep, len: number, interval: number): void {
  clearTimers()
  state.value = 'running'; step.value = -1
  for (let i = 0; i < len; i++) timers.push(setTimeout(() => { step.value = i }, 300 + i * interval))
  timers.push(setTimeout(() => { state.value = 'idle' }, 300 + len * interval + 900))
}
function runPipeline(): void { runChain(pState, pStep, PIPELINE.length, 460) }
function runLive(): void { runChain(lState, lStep, LIVE_PIPE.length, 440) }

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
      pState.value = 'idle'; pStep.value = -1; lState.value = 'idle'; lStep.value = -1
      activeDomain.value = 0; activeMap.value = 0
    })
  } else {
    unlock(); document.removeEventListener('keydown', onKey)
  }
})
onBeforeUnmount(() => { unlock(); document.removeEventListener('keydown', onKey); clearTimers() })

const dom = computed(() => DOMAINS[activeDomain.value]!)
const map = computed(() => MAP[activeMap.value]!)
</script>

<template>
  <Teleport to="body">
    <AnimatePresence>
      <motion.div
        v-if="open" class="eng" role="dialog" aria-modal="true" aria-label="SVARA Digital Engineering"
        :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
        :transition="{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }"
      >
        <div class="eng__backdrop" aria-hidden="true" @click="close" />
        <motion.section
          class="eng__panel"
          :initial="{ opacity: 0, scale: 0.96, y: 18 }" :animate="{ opacity: 1, scale: 1, y: 0 }"
          :exit="{ opacity: 0, scale: 0.97, y: 12 }" :transition="{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }"
        >
          <span class="eng__progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />

          <!-- HEADER (fixed) -->
          <header class="eng__header">
            <div class="eng__id">
              <span class="eng__core-i" aria-hidden="true"><i /></span>
              <div>
                <p class="eng__id-title">SVARA DIGITAL ENGINEERING</p>
                <p class="eng__id-sub">CUSTOM TECHNOLOGY + AI ENGINEERING</p>
              </div>
              <span class="eng__status"><i />ENGINEERING SYSTEM ONLINE</span>
            </div>
            <div class="eng__head-right">
              <span v-for="s in HEAD_STATUS" :key="s.k" class="eng__hstat"><b>{{ s.k }}</b>{{ s.v }}</span>
              <button type="button" class="eng__close" @click="close">CLOSE <span aria-hidden="true">×</span></button>
            </div>
          </header>

          <div ref="scroller" class="eng__scroll" data-lenis-prevent @scroll="onScroll">
            <div class="eng__inner">
              <!-- HERO -->
              <section class="engsec engsec--hero">
                <p class="englabel englabel--cy">05 // Digital Engineering</p>
                <h1 class="eng__lede">
                  <span v-for="(l, i) in HERO_LINES" :key="l" class="eng__lede-line" :class="{ 'eng__lede-line--accent': i === 2 || i === 3 }" :style="{ '--d': i }">{{ l }}</span>
                </h1>
                <p class="eng__hero-copy">Custom technology built around your business — from applications and AI systems to integrations, cloud infrastructure and long-term engineering.</p>

                <!-- HERO VISUAL: engineering core + 4 domains -->
                <div class="hub enginst svara-instrument">
                  <span class="enginst__label">ENGINEERING CORE · FULL LIFECYCLE</span>
                  <div class="hub__ring-wrap">
                    <span class="hub__ring" aria-hidden="true" />
                    <span class="hub__center">
                      <span class="hub__inner"><i v-for="c in CORE_INNER" :key="c">{{ c }}</i></span>
                    </span>
                    <span
                      v-for="(d, i) in HERO_DOMAINS" :key="d.k" class="hub__node"
                      :style="{ '--i': i, '--n': HERO_DOMAINS.length, '--m-accent': d.accent }"
                    ><b>{{ d.n }}</b>{{ d.k }}</span>
                  </div>
                  <p class="engsim">◦ DISCOVER · ARCHITECT · BUILD · INTEGRATE · DEPLOY · EVOLVE</p>
                </div>
              </section>

              <!-- the product's own HUD dashboard, in its own section -->
              <ProductDashboard id="engineering" />

              <!-- STRATEGIC MODEL -->
              <section class="engsec">
                <div class="engsec__head"><span class="englabel">Strategic Model</span><h2 class="engsec__title">Engineering is the entry point.</h2></div>
                <p class="engbody">Every SVARA engineering project has two objectives: solve the client’s immediate technology challenge, and build a trusted relationship that can evolve into the wider SVARA technology ecosystem.</p>
                <div class="phases">
                  <template v-for="(p, i) in PHASES" :key="p.n">
                    <div class="phase enginst svara-instrument">
                      <span class="enginst__label">PHASE / {{ p.n }}</span>
                      <p class="phase__k">{{ p.k }}</p><p class="phase__b">{{ p.b }}</p>
                      <div v-if="p.items" class="caps phase__items"><span v-for="it in p.items" :key="it" class="engchip engchip--on">{{ it }}</span></div>
                    </div>
                    <span v-if="i < PHASES.length - 1" class="phase__link" aria-hidden="true">↓</span>
                  </template>
                </div>
              </section>

              <!-- CORE CAPABILITIES (switcher) -->
              <section class="engsec">
                <div class="engsec__head"><span class="englabel">Core Engineering Capabilities</span><h2 class="engsec__title">Four subsystems inside one architecture.</h2></div>
                <div class="switch">
                  <button
                    v-for="(d, i) in DOMAINS" :key="d.id" type="button" class="switch__tab"
                    :class="{ 'is-active': activeDomain === i }" :style="{ '--m-accent': d.accent }" @click="activeDomain = i"
                  >
                    <span class="switch__dot" /><span class="switch__n">{{ d.n }}</span>{{ d.k }}
                  </button>
                </div>
                <div class="dom enginst svara-instrument" :style="{ '--m-accent': dom.accent }">
                  <span class="enginst__label">SUBSYSTEM / {{ dom.n }} · {{ dom.sub }}</span>
                  <p class="dom__k">{{ dom.k }}</p>
                  <p class="dom__pos">{{ dom.pos }}</p>
                  <div class="dom__tiles"><div v-for="t in dom.tiles" :key="t" class="dom__tile">{{ t }}</div></div>
                  <div class="dom__groups">
                    <div v-for="g in dom.groups" :key="g.k" class="dom__group">
                      <span class="dom__g-k">{{ g.k }}</span>
                      <div v-if="g.items" class="caps"><span v-for="it in g.items" :key="it" class="engchip">{{ it }}</span></div>
                      <p v-if="g.note" class="dom__g-note">{{ g.note }}</p>
                    </div>
                  </div>
                </div>
              </section>

              <!-- ENGINEERING PIPELINE -->
              <section class="engsec">
                <div class="engsec__head"><span class="englabel">The Engineering Pipeline</span><h2 class="engsec__title">From idea to production.</h2></div>
                <div class="pipe enginst svara-instrument">
                  <div class="pipe__top">
                    <span class="enginst__label">LIFECYCLE PIPELINE</span>
                    <button type="button" class="engrun" @click="runPipeline">{{ pState === 'idle' ? 'RUN PIPELINE' : 'BUILDING…' }} ↗</button>
                  </div>
                  <div class="pipe__chain">
                    <template v-for="(s, i) in PIPELINE" :key="s">
                      <span class="pipe__node" :class="{ 'is-on': pStep >= i }">{{ s }}</span>
                      <span v-if="i < PIPELINE.length - 1" class="pipe__link" :class="{ 'is-on': pStep > i }" aria-hidden="true">→</span>
                    </template>
                  </div>
                </div>
              </section>

              <!-- DISCOVERY-FIRST -->
              <section class="engsec">
                <div class="engsec__head"><span class="englabel">Methodology</span><h2 class="engsec__title">Discovery before code.</h2></div>
                <p class="engbody">Every engagement begins with a structured discovery phase to define requirements, constraints and success metrics.</p>
                <div class="grid3">
                  <div v-for="c in DISCOVERY" :key="c.n" class="engmod enginst svara-instrument">
                    <span class="enginst__label">{{ c.n }}</span>
                    <p class="engmod__t">{{ c.k }}</p>
                    <div v-if="c.items" class="caps"><span v-for="it in c.items" :key="it" class="engchip">{{ it }}</span></div>
                    <p v-if="c.note" class="engmod__b">{{ c.note }}</p>
                  </div>
                </div>
                <div class="chain-h disc__flow"><template v-for="(f, i) in DISCOVERY_FLOW" :key="f"><span class="chain-h__n" :class="{ 'chain-h__n--on': i === DISCOVERY_FLOW.length - 1 }">{{ f }}</span><span v-if="i < DISCOVERY_FLOW.length - 1" class="chain-h__l" aria-hidden="true">→</span></template></div>
              </section>

              <!-- QUALITY + LIVE PIPELINE -->
              <section class="engsec">
                <div class="engsec__head"><span class="englabel">Quality &amp; Delivery</span><h2 class="engsec__title">Engineering without compromise.</h2></div>
                <div class="grid2">
                  <div v-for="q in QUALITY" :key="q.k" class="gate enginst svara-instrument">
                    <span class="enginst__label">{{ q.k }}</span>
                    <span class="gate__v">{{ q.v }}</span>
                    <span class="gate__d">{{ q.d }}</span>
                  </div>
                </div>
                <div class="engsec__head engsec__head--mini"><span class="englabel englabel--cy">Live engineering pipeline</span></div>
                <div class="live enginst svara-instrument">
                  <div class="live__top">
                    <span class="enginst__label">CI/CD PIPELINE</span>
                    <button type="button" class="engrun" @click="runLive">{{ lState === 'idle' ? 'RUN BUILD' : 'RUNNING…' }} ↗</button>
                  </div>
                  <div class="live__chain">
                    <template v-for="(s, i) in LIVE_PIPE" :key="s.k">
                      <span class="live__node" :class="{ 'is-on': lStep >= i, 'is-live': s.s === 'LIVE' && lStep >= i, 'is-deploy': s.s === 'DEPLOYED' && lStep >= i }">
                        <b>{{ s.k }}</b><em v-if="s.s && lStep >= i">{{ s.s }}</em>
                      </span>
                      <span v-if="i < LIVE_PIPE.length - 1" class="live__link" :class="{ 'is-on': lStep > i }" aria-hidden="true">→</span>
                    </template>
                  </div>
                </div>
              </section>

              <!-- TECH STACK -->
              <section class="engsec">
                <div class="engsec__head"><span class="englabel">The Engineering Stack</span><h2 class="engsec__title">Proven technologies, deliberately chosen.</h2></div>
                <div class="stack">
                  <div v-for="g in STACK" :key="g.k" class="stack__group enginst svara-instrument">
                    <span class="enginst__label">{{ g.k }}</span>
                    <div class="caps"><span v-for="t in g.items" :key="t" class="engchip">{{ t }}</span></div>
                  </div>
                </div>
              </section>

              <!-- ARCHITECTURE / CAPABILITY MAP -->
              <section class="engsec">
                <div class="engsec__head"><span class="englabel">Architecture Visualiser</span><h2 class="engsec__title">Hover a layer. See the stack.</h2></div>
                <div class="cmap">
                  <div class="cmap__ring-wrap">
                    <span class="cmap__ring" aria-hidden="true" />
                    <span class="cmap__center">DIGITAL<br>ENGINEERING<br>CORE</span>
                    <button
                      v-for="(m, i) in MAP" :key="m.k" type="button" class="cmap__node" :class="{ 'is-active': activeMap === i }"
                      :style="{ '--i': i, '--n': MAP.length, '--m-accent': m.accent }"
                      @mouseenter="activeMap = i" @click="activeMap = i"
                    >{{ m.k }}</button>
                  </div>
                  <div class="cmap__detail enginst svara-instrument" :style="{ '--m-accent': map.accent }">
                    <span class="enginst__label">LAYER / {{ map.k }}</span>
                    <div class="caps"><span v-for="t in map.techs" :key="t" class="engchip engchip--accent">{{ t }}</span></div>
                  </div>
                </div>
              </section>

              <!-- AI-FIRST ENGINEERING -->
              <section class="engsec">
                <div class="engsec__head"><span class="englabel">AI-First Engineering</span><h2 class="engsec__title">AI is engineered in from day one.</h2></div>
                <div class="aifirst enginst svara-instrument">
                  <div class="aifirst__flow">
                    <span class="aifirst__node">APPLICATION</span>
                    <span class="aifirst__arrow" aria-hidden="true">→</span>
                    <span class="aifirst__node aifirst__node--ai">APPLICATION <b>+ AI</b></span>
                  </div>
                  <div class="caps aifirst__ex"><span v-for="e in AI_EXAMPLES" :key="e" class="engchip engchip--violet">{{ e }}</span></div>
                  <p class="engmod__b">A capability that can be embedded where valuable — not required for every project.</p>
                </div>
              </section>

              <!-- MODERNISATION -->
              <section class="engsec">
                <div class="engsec__head"><span class="englabel">System Modernisation</span><h2 class="engsec__title">Modernise without replacing everything.</h2></div>
                <div class="modern enginst svara-instrument">
                  <span class="enginst__label">CONTINUITY, NOT DISRUPTION</span>
                  <div class="chain-h modern__flow"><template v-for="(m, i) in MODERN_CHAIN" :key="m"><span class="chain-h__n" :class="{ 'chain-h__n--on': i === MODERN_CHAIN.length - 1 }">{{ m }}</span><span v-if="i < MODERN_CHAIN.length - 1" class="chain-h__l" aria-hidden="true">→</span></template></div>
                  <p class="engmod__b">Legacy data can be exposed through modern APIs without replacing the core system.</p>
                  <div class="caps modern__int"><span v-for="i in INTEGRATIONS" :key="i" class="engchip">{{ i }}</span></div>
                </div>
              </section>

              <!-- ECOSYSTEM -->
              <section class="engsec">
                <div class="engsec__head"><span class="englabel">Engineering → SVARA Ecosystem</span><h2 class="engsec__title">Every project can become something bigger.</h2></div>
                <div class="eco enginst svara-instrument">
                  <div class="chain-h eco__flow"><template v-for="(c, i) in ECO_CHAIN" :key="c"><span class="chain-h__n" :class="{ 'chain-h__n--on': i === ECO_CHAIN.length - 1 }">{{ c }}</span><span v-if="i < ECO_CHAIN.length - 1" class="chain-h__l" aria-hidden="true">→</span></template></div>
                  <div class="caps eco__paths"><span v-for="p in ECO_PATHS" :key="p" class="engchip engchip--on">{{ p }}</span></div>
                  <span class="eco__down" aria-hidden="true">↓</span>
                  <div class="eco__recurring">RECURRING PLATFORM RELATIONSHIP</div>
                </div>
              </section>

              <!-- COMMERCIAL -->
              <section class="engsec">
                <div class="engsec__head"><span class="englabel">Commercial Models</span><h2 class="engsec__title">Four engineering engagement modes.</h2></div>
                <div class="grid2">
                  <div v-for="c in COMMERCIAL" :key="c.n" class="engage enginst svara-instrument">
                    <span class="enginst__label">ENGAGEMENT / {{ c.n }}</span>
                    <p class="engage__k">{{ c.k }}</p>
                    <div class="engage__struct"><span class="englabel englabel--cy">Structure</span><ul><li v-for="s in c.structure" :key="s">{{ s }}</li></ul></div>
                    <p class="engage__v">{{ c.v }}<span v-if="c.note"> {{ c.note }}</span></p>
                  </div>
                </div>
              </section>

              <!-- ENGINEERING COMMAND CENTER -->
              <section class="engsec">
                <div class="engsec__head"><span class="englabel">Engineering Command Center</span><h2 class="engsec__title">The whole project, one view.</h2></div>
                <div class="cc enginst svara-instrument">
                  <span class="enginst__label">PROJECT TELEMETRY</span>
                  <div class="caps cc__tel"><span v-for="t in CC_TELEMETRY" :key="t" class="engchip engchip--on">{{ t }}</span></div>
                </div>
                <div class="grid3 cc__panels">
                  <div v-for="p in CC_PANELS" :key="p" class="cc__panel enginst svara-instrument"><span class="cc__dot" />{{ p }}</div>
                </div>
              </section>

              <!-- FINAL CTA -->
              <section class="engsec engsec--final">
                <p class="eng__final">Build what your business needs.<br><span>Grow what your business becomes.</span></p>
                <p class="eng__final-copy">From custom applications and AI systems to integrations, cloud infrastructure and long-term engineering — SVARA builds technology around your business.</p>
                <p class="eng__final-line">“Every project we build is a door to something bigger.”</p>
                <div class="eng__final-cta">
                  <NuxtLink to="/contact" class="eng__cta eng__cta--primary" @click="close">START A PROJECT <span aria-hidden="true">↗</span></NuxtLink>
                  <NuxtLink to="/technology" class="eng__cta eng__cta--ghost" @click="close">EXPLORE SVARA TECHNOLOGY</NuxtLink>
                  <NuxtLink to="/contact" class="eng__cta eng__cta--ghost" @click="close">TALK TO SVARA</NuxtLink>
                </div>
              </section>

              <footer class="eng__foot">SVARA · DIGITAL ENGINEERING · CUSTOM TECHNOLOGY + AI · v1.0</footer>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  </Teleport>
</template>

<style scoped>
.eng {
  position: fixed; inset: 0; z-index: 100000; display: flex; justify-content: center;
  --de-bg: #04070f; --de-bg2: #0a1226; --de-ink: #e6ecfb; --de-muted: rgba(176, 192, 224, 0.6);
  --de-line: rgba(70, 120, 220, 0.26); --de-blue: #4a7dff; --de-cyan: #4fd6ea; --de-violet: #9a7dff; --de-green: #45cf88; --de-amber: #ffb340;
  color: var(--de-ink); font-family: var(--font-mono, ui-monospace, monospace);
}
.eng__backdrop { position: absolute; inset: 0; background: rgba(1, 3, 8, 0.72); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); }
.eng__panel {
  position: relative; z-index: 1; width: min(1340px, 100%); height: 100%; display: flex; flex-direction: column; overflow: hidden;
  background: radial-gradient(circle at 14% 5%, rgba(74, 125, 255, 0.13), transparent 30%), radial-gradient(circle at 86% 88%, rgba(79, 214, 234, 0.08), transparent 34%), linear-gradient(160deg, var(--de-bg2), var(--de-bg) 58%, #02050c);
  border-left: 1px solid var(--de-line); border-right: 1px solid var(--de-line); box-shadow: 0 0 120px -20px rgba(0, 0, 0, 0.86);
}
.eng__progress { position: absolute; top: 0; left: 0; height: 2px; width: 100%; transform-origin: left; background: linear-gradient(90deg, var(--de-blue), var(--de-cyan)); z-index: 6; }

.eng__header { flex: 0 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; padding: 14px clamp(16px, 3vw, 34px); border-bottom: 1px solid var(--de-line); background: linear-gradient(90deg, rgba(6, 12, 24, 0.92), rgba(10, 18, 38, 0.6)); }
.eng__id { display: flex; align-items: center; gap: 13px; min-width: 0; }
.eng__core-i { position: relative; width: 30px; height: 30px; border: 1px solid var(--de-blue); display: grid; place-items: center; flex-shrink: 0; clip-path: polygon(0 6px, 6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%); }
.eng__core-i i { width: 8px; height: 8px; background: var(--de-cyan); box-shadow: 0 0 12px var(--de-cyan); animation: eng-pulse 2.2s ease-in-out infinite; }
.eng__id-title { margin: 0; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; color: #fff; }
.eng__id-sub { margin: 2px 0 0; font-size: 9px; letter-spacing: 0.14em; color: var(--de-muted); }
.eng__status { display: inline-flex; align-items: center; gap: 7px; margin-left: 6px; font-size: 9.5px; letter-spacing: 0.13em; color: var(--de-green); }
.eng__status i { width: 6px; height: 6px; border-radius: 50%; background: var(--de-green); box-shadow: 0 0 10px var(--de-green); }
.eng__head-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.eng__hstat { display: inline-flex; flex-direction: column; font-size: 8px; letter-spacing: 0.1em; color: var(--de-cyan); line-height: 1.4; }
.eng__hstat b { color: var(--de-muted); font-weight: 500; }
.eng__close { display: inline-flex; align-items: center; gap: 7px; padding: 9px 15px; border: 1px solid var(--de-line); background: rgba(74, 125, 255, 0.06); color: var(--de-ink); font: inherit; font-size: 10px; letter-spacing: 0.13em; cursor: pointer; transition: background 180ms, border-color 180ms; clip-path: polygon(0 5px, 5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%); }
.eng__close:hover { background: rgba(74, 125, 255, 0.16); border-color: var(--de-blue); }

.eng__scroll { flex: 1 1 auto; min-height: 0; overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--de-blue) transparent; }
.eng__scroll::-webkit-scrollbar { width: 8px; }
.eng__scroll::-webkit-scrollbar-thumb { background: rgba(74, 125, 255, 0.4); border-radius: 8px; }
.eng__inner { max-width: 1140px; margin-inline: auto; padding: clamp(28px, 5vw, 68px) clamp(16px, 3vw, 40px) 60px; }

/* shared primitives */
.enginst { position: relative; padding: 40px 18px 18px; background: rgba(8, 16, 32, 0.5); }
.enginst__label { position: absolute; top: 9px; left: clamp(14px, 2vw, 22px); z-index: 3; font-size: 9px; letter-spacing: 0.14em; color: var(--de-cyan); pointer-events: none; }
.englabel { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--de-muted); }
.englabel--cy { color: var(--de-cyan); }
.engchip { display: inline-flex; align-items: center; padding: 7px 12px; font-size: 10px; letter-spacing: 0.05em; color: var(--de-ink); border: 1px solid var(--de-line); background: rgba(74, 125, 255, 0.05); }
.engchip--on { color: var(--de-cyan); border-color: var(--de-blue); background: rgba(74, 125, 255, 0.1); }
.engchip--violet { color: var(--de-violet); border-color: rgba(154, 125, 255, 0.45); }
.engchip--accent { color: var(--m-accent, var(--de-cyan)); border-color: var(--m-accent, var(--de-blue)); background: color-mix(in srgb, var(--m-accent, var(--de-blue)) 10%, transparent); }
.engsim { margin: 14px 0 0; font-size: 8.5px; letter-spacing: 0.14em; color: var(--de-muted); }
.engbody { margin: 16px 0 0; max-width: 66ch; font-size: 12.5px; line-height: 1.7; color: var(--de-muted); }
.caps { display: flex; flex-wrap: wrap; gap: 8px; }
.engsec { padding: clamp(34px, 5vw, 60px) 0; border-top: 1px solid rgba(74, 125, 255, 0.12); }
.engsec--hero { border-top: 0; padding-top: 6px; }
.engsec__head { margin-bottom: 24px; }
.engsec__head--mini { margin: 34px 0 16px; }
.engsec__title { margin: 8px 0 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(21px, 3vw, 34px); font-weight: 650; letter-spacing: -0.01em; color: #fff; line-height: 1.12; }
.engsec__title span { color: var(--de-cyan); }

/* generic chain */
.chain-h { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; }
.chain-h__n { padding: 9px 12px; border: 1px solid var(--de-line); background: rgba(8, 16, 32, 0.5); font-size: 10px; font-weight: 700; letter-spacing: 0.04em; color: var(--de-muted); }
.chain-h__n--on { color: var(--de-cyan); border-color: var(--de-blue); background: rgba(74, 125, 255, 0.12); }
.chain-h__l { color: var(--de-blue); }

/* HERO */
.eng__lede { margin: 12px 0 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(30px, 5vw, 60px); font-weight: 600; line-height: 1.04; letter-spacing: -0.02em; color: #fff; }
.eng__lede-line { display: block; opacity: 0; transform: translateY(14px); filter: blur(6px); animation: eng-line-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: calc(var(--d) * 150ms + 200ms); }
.eng__lede-line--accent { color: var(--de-cyan); }
.eng__hero-copy { margin: 20px 0 30px; max-width: 66ch; font-size: 13.5px; line-height: 1.7; color: var(--de-muted); }

.hub__ring-wrap { position: relative; height: 320px; display: grid; place-items: center; margin-bottom: 8px; }
.hub__ring { position: absolute; width: 244px; height: 244px; border-radius: 50%; border: 1px dashed var(--de-line); }
.hub__center { position: relative; z-index: 2; display: grid; place-items: center; width: 132px; height: 132px; border-radius: 50%; border: 1px solid var(--de-blue); background: rgba(74, 125, 255, 0.09); box-shadow: 0 0 50px -10px rgba(74, 125, 255, 0.7), inset 0 0 30px -12px rgba(79, 214, 234, 0.5); }
.hub__inner { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px; max-width: 104px; }
.hub__inner i { font-style: normal; font-size: 6.5px; letter-spacing: 0.04em; color: var(--de-cyan); border: 1px solid var(--de-line); padding: 2px 4px; }
.hub__node { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 8px 11px; border: 1px solid var(--m-accent, var(--de-line)); background: rgba(8, 16, 32, 0.92); font-size: 8.5px; font-weight: 700; letter-spacing: 0.03em; color: var(--m-accent, var(--de-ink)); transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-150px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
.hub__node b { font-size: 7px; opacity: 0.7; }

/* STRATEGIC MODEL */
.phases { display: flex; flex-direction: column; align-items: stretch; gap: 6px; margin-top: 20px; }
.phase__k { margin: 0 0 8px; font-size: 13px; font-weight: 700; letter-spacing: 0.06em; color: #fff; }
.phase__b { margin: 0; font-size: 11.5px; line-height: 1.6; color: var(--de-muted); max-width: 80ch; }
.phase__items { margin-top: 12px; }
.phase__link { align-self: center; color: var(--de-blue); font-size: 15px; }

/* SWITCHER */
.switch { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
.switch__tab { display: inline-flex; align-items: center; gap: 9px; padding: 12px 15px; background: rgba(8, 16, 32, 0.5); border: 1px solid transparent; color: var(--de-muted); font: inherit; font-size: 11px; letter-spacing: 0.04em; cursor: pointer; transition: color 180ms, border-color 180ms, background 180ms; }
.switch__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--m-accent); box-shadow: 0 0 8px var(--m-accent); flex: none; opacity: 0.6; transition: opacity 180ms; }
.switch__n { color: var(--m-accent); font-size: 10px; }
.switch__tab.is-active { color: #fff; border-color: var(--m-accent); background: color-mix(in srgb, var(--m-accent) 10%, transparent); }
.switch__tab.is-active .switch__dot { opacity: 1; }
.dom__k { margin: 0 0 8px; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(20px, 2.6vw, 28px); font-weight: 650; color: var(--m-accent); }
.dom__pos { margin: 0 0 20px; max-width: 70ch; font-size: 12.5px; line-height: 1.7; color: var(--de-muted); }
.dom__tiles { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 8px; margin-bottom: 22px; }
.dom__tile { padding: 14px 8px; border: 1px solid var(--de-line); border-top: 2px solid var(--m-accent); background: rgba(8, 16, 32, 0.5); font-size: 9px; font-weight: 700; letter-spacing: 0.03em; color: var(--de-ink); text-align: center; }
.dom__groups { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px 24px; }
.dom__group { display: flex; flex-direction: column; gap: 10px; }
.dom__g-k { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; color: var(--m-accent); }
.dom__g-note { margin: 0; font-size: 10.5px; line-height: 1.6; color: var(--de-muted); }

/* PIPELINE */
.pipe__top, .live__top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; flex-wrap: wrap; }
.pipe__chain { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; }
.pipe__node { padding: 11px 14px; border: 1px solid var(--de-line); background: rgba(8, 16, 32, 0.5); font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--de-muted); transition: color 240ms, border-color 240ms, background 240ms; }
.pipe__node.is-on { color: var(--de-cyan); border-color: var(--de-blue); background: rgba(74, 125, 255, 0.12); }
.pipe__link { color: rgba(120, 160, 230, 0.35); transition: color 240ms; }
.pipe__link.is-on { color: var(--de-blue); }

/* DISCOVERY */
.grid3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.grid2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.engmod__t { margin: 0 0 12px; font-size: 12px; font-weight: 700; letter-spacing: 0.05em; color: #fff; }
.engmod__b { margin: 12px 0 0; font-size: 10.5px; line-height: 1.6; color: var(--de-muted); }
.disc__flow { justify-content: center; margin-top: 16px; }

/* QUALITY + LIVE */
.gate { display: flex; flex-direction: column; gap: 6px; }
.gate__v { font-size: clamp(22px, 3.4vw, 34px); font-weight: 700; color: var(--de-cyan); }
.gate__d { font-size: 10px; letter-spacing: 0.04em; color: var(--de-muted); }
.live__chain { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; }
.live__node { display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 10px 12px; border: 1px solid var(--de-line); background: rgba(8, 16, 32, 0.5); font-size: 10px; font-weight: 700; letter-spacing: 0.04em; color: var(--de-muted); transition: color 240ms, border-color 240ms, background 240ms; }
.live__node b { color: var(--de-ink); }
.live__node em { font-style: normal; font-size: 8px; letter-spacing: 0.08em; color: var(--de-green); }
.live__node.is-on { border-color: var(--de-green); background: rgba(69, 207, 136, 0.06); }
.live__node.is-on b { color: #fff; }
.live__node.is-deploy { border-color: var(--de-amber); }
.live__node.is-deploy em { color: var(--de-amber); }
.live__node.is-live { border-color: var(--de-green); box-shadow: 0 0 20px -8px var(--de-green); }
.live__link { color: rgba(120, 160, 230, 0.35); transition: color 240ms; }
.live__link.is-on { color: var(--de-green); }

/* TECH STACK */
.stack { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.stack__group { display: flex; flex-direction: column; }

/* CAPABILITY MAP */
.cmap { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 16px; align-items: center; }
.cmap__ring-wrap { position: relative; height: 300px; display: grid; place-items: center; }
.cmap__ring { position: absolute; width: 220px; height: 220px; border-radius: 50%; border: 1px dashed var(--de-line); }
.cmap__center { position: relative; z-index: 2; display: grid; place-items: center; width: 130px; height: 130px; border-radius: 50%; border: 1px solid var(--de-blue); background: rgba(74, 125, 255, 0.09); font-size: 9.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--de-cyan); text-align: center; line-height: 1.4; box-shadow: 0 0 44px -10px rgba(74, 125, 255, 0.7); }
.cmap__node { position: absolute; padding: 9px 14px; border: 1px solid var(--de-line); background: rgba(8, 16, 32, 0.92); font: inherit; font-size: 10px; font-weight: 700; letter-spacing: 0.05em; color: var(--de-ink); cursor: pointer; transition: color 180ms, border-color 180ms, background 180ms; transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-132px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
.cmap__node.is-active { color: var(--m-accent); border-color: var(--m-accent); background: color-mix(in srgb, var(--m-accent) 12%, transparent); }
.cmap__detail { min-height: 90px; display: flex; flex-direction: column; justify-content: center; }

/* AI-FIRST */
.aifirst { display: flex; flex-direction: column; align-items: center; gap: 16px; text-align: center; }
.aifirst__flow { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 12px; }
.aifirst__node { padding: 12px 20px; border: 1px solid var(--de-line); background: rgba(8, 16, 32, 0.5); font-size: 12px; font-weight: 700; letter-spacing: 0.06em; color: var(--de-ink); }
.aifirst__node--ai { border-color: var(--de-violet); color: var(--de-violet); background: rgba(154, 125, 255, 0.08); }
.aifirst__node--ai b { color: var(--de-violet); }
.aifirst__ex { justify-content: center; }

/* MODERNISATION */
.modern__flow { margin-bottom: 4px; }
.modern__int { margin-top: 16px; }

/* ECOSYSTEM */
.eco { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; }
.eco__flow { justify-content: center; }
.eco__paths { justify-content: center; }
.eco__down { color: var(--de-blue); }
.eco__recurring { padding: 14px 26px; border: 1px solid var(--de-green); background: rgba(69, 207, 136, 0.08); font-size: 12px; font-weight: 700; letter-spacing: 0.08em; color: var(--de-green); }

/* COMMERCIAL */
.engage { display: flex; flex-direction: column; }
.engage__k { margin: 0 0 14px; font-family: var(--font-sans, system-ui, sans-serif); font-size: 19px; font-weight: 650; color: #fff; }
.engage__struct { margin-bottom: 14px; }
.engage__struct ul { margin: 8px 0 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 6px; }
.engage__struct li { position: relative; padding-left: 14px; font-size: 11px; line-height: 1.5; color: var(--de-muted); }
.engage__struct li::before { content: '›'; position: absolute; left: 0; color: var(--de-cyan); }
.engage__v { margin: auto 0 0; padding-top: 12px; font-size: clamp(15px, 2vw, 21px); font-weight: 700; color: var(--de-cyan); }
.engage__v span { font-size: 10px; font-weight: 500; letter-spacing: 0.04em; color: var(--de-muted); }

/* COMMAND CENTER */
.cc__tel { justify-content: center; }
.cc__panels { margin-top: 12px; }
.cc__panel { display: flex; align-items: center; gap: 10px; padding-top: 34px; font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--de-ink); }
.cc__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--de-green); box-shadow: 0 0 8px var(--de-green); flex: none; }

/* FINAL */
.engsec--final { text-align: center; border-top: 1px solid var(--de-line); }
.eng__final { margin: 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(24px, 4.2vw, 48px); font-weight: 600; line-height: 1.12; color: #fff; }
.eng__final span { color: var(--de-cyan); }
.eng__final-copy { margin: 18px auto 0; max-width: 58ch; font-size: 12.5px; line-height: 1.7; color: var(--de-muted); }
.eng__final-line { margin: 16px 0 0; font-size: 13px; font-style: italic; color: var(--de-cyan); }
.eng__final-cta { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 26px; }
.eng__cta { display: inline-flex; align-items: center; gap: 10px; padding: 15px 26px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-decoration: none; }
.eng__cta--primary { background: var(--de-blue); color: #04091c; }
.eng__cta--ghost { background: transparent; color: var(--de-ink); border: 1px solid var(--de-line); }
.eng__foot { margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(74, 125, 255, 0.12); text-align: center; font-size: 9px; letter-spacing: 0.2em; color: var(--de-muted); }

@keyframes eng-pulse { 50% { opacity: 0.4; } }
@keyframes eng-line-in { to { opacity: 1; transform: translateY(0); filter: blur(0); } }

/* ── responsive ── */
@media (max-width: 900px) {
  .grid3, .dom__tiles { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .grid2, .stack, .dom__groups, .cmap { grid-template-columns: 1fr; }
  .switch { overflow-x: auto; flex-wrap: nowrap; }
  .switch__tab { flex: none; }
  .eng__hstat { display: none; }
}
@media (max-width: 560px) {
  .grid3, .grid2, .dom__tiles { grid-template-columns: 1fr; }
  .eng__id-sub { display: none; }
  .hub__ring-wrap, .cmap__ring-wrap { height: 280px; }
  .hub__node { transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-120px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
  .cmap__node { transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-112px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
}
@media (prefers-reduced-motion: reduce) {
  .eng__core-i i { animation: none; }
  .eng__lede-line { animation: none; opacity: 1; transform: none; filter: none; }
  .pipe__node, .pipe__link, .live__node, .live__link, .switch__tab, .cmap__node { transition: none; }
}
</style>
