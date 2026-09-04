<script setup lang="ts">
// SVARA UNIFIED BUSINESS CLOUD — immersive full-screen business operating environment, opened from
// the Business Cloud card's "Explore" control. SAME architecture as the other product overlays
// (Teleport, own scroll container with data-lenis-prevent, page scroll-locked, Escape/backdrop close
// → products page keeps its exact position). DISTINCT identity: the UNIFY metaphor — five business
// systems in ONE platform. Business-operations palette (green-forward) with FIVE COLOUR-CODED MODULES
// (CRM/ERP/HRMS/LMS/Support — five hues, one platform) + a persistent module switcher that highlights
// cross-module connections on hover. Own bcx/bcsec/bcinst namespace. All copy VERBATIM from the
// source (P08, imported from ./cloud-content); demo values labelled, no invented metrics.
import { ref, watch, computed, onBeforeUnmount, nextTick } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { useCloudExplore } from '~/composables/useCloudExplore'
import {
  HERO_LINES, HEAD_STATUS, CORE_INNER, PROBLEM_APPS, SILOS, SHARED, MODULES, ADVANTAGE, XMOD,
  DATA_SOURCES, AI_EXAMPLES, CMD_CHAIN, CC_TELEMETRY, CC_PANELS, EXEC_INDICATORS, COMMERCIAL,
} from './cloud-content'
import ProductDashboard from '~/components/products/worlds/ProductDashboard.vue'

const { open, closeExplore } = useCloudExplore()

// ── interactions ─────────────────────────────────────────────────────────────
const activeModule = ref(0)
const hovered = ref<number | null>(null)
const xState = ref<'idle' | 'running'>('idle')
const xStep = ref(-1)
const cmdState = ref<'idle' | 'running'>('idle')
const cmdStep = ref(-1)
const timers: ReturnType<typeof setTimeout>[] = []
function clearTimers(): void { timers.forEach(clearTimeout); timers.length = 0 }
function runChain(state: typeof xState, step: typeof xStep, len: number, interval: number): void {
  clearTimers()
  state.value = 'running'; step.value = -1
  for (let i = 0; i < len; i++) timers.push(setTimeout(() => { step.value = i }, 300 + i * interval))
  timers.push(setTimeout(() => { state.value = 'idle' }, 300 + len * interval + 900))
}
function runXmod(): void { runChain(xState, xStep, XMOD.length, 520) }
function runCmd(): void { runChain(cmdState, cmdStep, CMD_CHAIN.length, 460) }
function isLinked(i: number): boolean {
  return hovered.value !== null && hovered.value !== i && MODULES[hovered.value]!.links.includes(MODULES[i]!.id)
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
      xState.value = 'idle'; xStep.value = -1; cmdState.value = 'idle'; cmdStep.value = -1
      activeModule.value = 0; hovered.value = null
    })
  } else {
    unlock(); document.removeEventListener('keydown', onKey)
  }
})
onBeforeUnmount(() => { unlock(); document.removeEventListener('keydown', onKey); clearTimers() })

const mod = computed(() => MODULES[activeModule.value]!)
</script>

<template>
  <Teleport to="body">
    <AnimatePresence>
      <motion.div
        v-if="open" class="bcx" role="dialog" aria-modal="true" aria-label="SVARA Unified Business Cloud"
        :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
        :transition="{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }"
      >
        <div class="bcx__backdrop" aria-hidden="true" @click="close" />
        <motion.section
          class="bcx__panel"
          :initial="{ opacity: 0, scale: 0.96, y: 18 }" :animate="{ opacity: 1, scale: 1, y: 0 }"
          :exit="{ opacity: 0, scale: 0.97, y: 12 }" :transition="{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }"
        >
          <span class="bcx__progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />

          <!-- HEADER (fixed) -->
          <header class="bcx__header">
            <div class="bcx__id">
              <span class="bcx__core-i" aria-hidden="true"><i /></span>
              <div>
                <p class="bcx__id-title">SVARA UNIFIED BUSINESS CLOUD</p>
                <p class="bcx__id-sub">AI-POWERED BUSINESS OPERATING ENVIRONMENT</p>
              </div>
              <span class="bcx__status"><i />SYSTEM ONLINE</span>
            </div>
            <div class="bcx__head-right">
              <span v-for="s in HEAD_STATUS" :key="s.k" class="bcx__hstat"><b>{{ s.k }}</b>{{ s.v }}</span>
              <button type="button" class="bcx__close" @click="close">CLOSE <span aria-hidden="true">×</span></button>
            </div>
          </header>

          <div ref="scroller" class="bcx__scroll" data-lenis-prevent @scroll="onScroll">
            <div class="bcx__inner">
              <!-- HERO -->
              <section class="bcsec bcsec--hero">
                <p class="bclabel bclabel--cy">03 // Business Intelligence</p>
                <h1 class="bcx__lede">
                  <span v-for="(l, i) in HERO_LINES" :key="l" class="bcx__lede-line" :class="{ 'bcx__lede-line--accent': i === 1 }" :style="{ '--d': i }">{{ l }}</span>
                </h1>
                <p class="bcx__hero-say">Built for the AI era.</p>
                <p class="bcx__hero-copy">SVARA Unified Business Cloud brings sales, operations, HR, finance, training and support into one intelligent operating environment where every function shares the same data, AI layer and command interface.</p>

                <!-- HERO VISUAL: business cloud core + colour-coded modules -->
                <div class="hub bcinst svara-instrument">
                  <span class="bcinst__label">BUSINESS CLOUD CORE</span>
                  <div class="hub__ring-wrap">
                    <span class="hub__ring" aria-hidden="true" />
                    <span class="hub__center">
                      <b>BUSINESS<br>CLOUD</b>
                      <span class="hub__inner"><i v-for="c in CORE_INNER" :key="c">{{ c }}</i></span>
                    </span>
                    <span
                      v-for="(m, i) in MODULES" :key="m.id" class="hub__node"
                      :style="{ '--i': i, '--n': MODULES.length, '--m-accent': m.accent }"
                    >{{ m.k.replace('SVARA ', '') }}</span>
                  </div>
                  <div class="hub__shared">
                    <span class="bclabel">Shared</span>
                    <span v-for="s in SHARED" :key="s" class="bcchip bcchip--on">{{ s }}</span>
                  </div>
                </div>
              </section>

              <!-- the product's own HUD dashboard, in its own section -->
              <ProductDashboard id="cloud" />

              <!-- THE PROBLEM -->
              <section class="bcsec">
                <div class="bcsec__head"><span class="bclabel">The Problem</span><h2 class="bcsec__title">Business shouldn’t run on 20 different tools.</h2></div>
                <div class="prob bcinst svara-instrument">
                  <span class="bcinst__label">FRAGMENTED SOFTWARE</span>
                  <div class="caps prob__apps"><span v-for="a in PROBLEM_APPS" :key="a" class="bcchip prob__app">{{ a }}</span></div>
                  <div class="caps prob__silos"><span v-for="s in SILOS" :key="s" class="bcchip bcchip--warn">{{ s }}</span></div>
                  <span class="prob__down" aria-hidden="true">↓</span>
                  <div class="prob__one">SVARA UNIFIED BUSINESS CLOUD · ONE PLATFORM</div>
                </div>
              </section>

              <!-- PRODUCT VISION -->
              <section class="bcsec">
                <div class="bcsec__head"><span class="bclabel">Product Vision</span><h2 class="bcsec__title">Not a collection of tools.<br><span>A single business environment.</span></h2></div>
                <p class="bcbody">SVARA Unified Business Cloud is a single intelligent operating environment where sales, operations, HR, finance, training and support share the same data, the same AI layer and the same command interface.</p>
                <div class="vision bcinst svara-instrument">
                  <span class="bcinst__label">FIVE MODULES · ONE SYSTEM</span>
                  <div class="vision__mods"><span v-for="m in MODULES" :key="m.id" class="vision__mod" :style="{ '--m-accent': m.accent }">{{ m.k.replace('SVARA ', '') }}</span></div>
                  <span class="vision__down" aria-hidden="true">↓ shared ↓</span>
                  <div class="caps vision__shared"><span v-for="s in SHARED" :key="s" class="bcchip bcchip--on">{{ s }}</span></div>
                </div>
              </section>

              <!-- FIVE MODULES (switcher) -->
              <section class="bcsec">
                <div class="bcsec__head"><span class="bclabel">The Five Business Systems</span><h2 class="bcsec__title">One system, five intelligence dashboards.</h2></div>
                <div class="switch">
                  <button
                    v-for="(m, i) in MODULES" :key="m.id" type="button" class="switch__tab"
                    :class="{ 'is-active': activeModule === i, 'is-linked': isLinked(i) }"
                    :style="{ '--m-accent': m.accent }"
                    @click="activeModule = i" @mouseenter="hovered = i" @mouseleave="hovered = null"
                  >
                    <span class="switch__dot" /><span class="switch__n">{{ m.n }}</span>{{ m.k.replace('SVARA ', '') }}
                  </button>
                </div>

                <div class="mod bcinst svara-instrument" :style="{ '--m-accent': mod.accent }">
                  <span class="bcinst__label">MODULE / {{ mod.n }} · {{ mod.sub }}</span>
                  <p class="mod__k">{{ mod.k }}</p>
                  <p class="mod__pos">{{ mod.pos }}</p>
                  <div class="mod__tiles">
                    <div v-for="t in mod.tiles" :key="t" class="mod__tile">{{ t }}</div>
                  </div>
                  <div class="mod__groups">
                    <div v-for="g in mod.groups" :key="g.k" class="mod__group">
                      <span class="mod__g-k">{{ g.k }}</span>
                      <div v-if="g.chain" class="chain-h">
                        <template v-for="(it, i) in g.items" :key="it"><span class="chain-h__n">{{ it }}</span><span v-if="i < g.items.length - 1" class="chain-h__l" aria-hidden="true">→</span></template>
                      </div>
                      <div v-else class="caps"><span v-for="it in g.items" :key="it" class="bcchip">{{ it }}</span></div>
                    </div>
                  </div>
                  <div class="mod__links">
                    <span class="bclabel">Connected</span>
                    <span v-for="l in mod.links" :key="l" class="bcchip bcchip--link">{{ MODULES.find(x => x.id === l)?.k.replace('SVARA ', '') }}</span>
                    <span class="bcchip bcchip--link">ONE AI OS</span>
                  </div>
                </div>
                <p class="bcsim">◦ MODULES ARE STRONGER BECAUSE THEY ARE CONNECTED — HOVER A MODULE TO SEE ITS LINKS</p>
              </section>

              <!-- UNIFIED ADVANTAGE -->
              <section class="bcsec">
                <div class="bcsec__head"><span class="bclabel">The Unified Advantage</span><h2 class="bcsec__title">The power is in the connection.</h2></div>
                <div class="grid2">
                  <div v-for="a in ADVANTAGE" :key="a.n" class="adv bcinst svara-instrument">
                    <span class="bcinst__label">{{ a.n }}</span>
                    <div class="adv__row adv__row--siloed"><span class="adv__tag">SILOED</span><p>{{ a.siloed }}</p></div>
                    <div class="adv__row adv__row--svara"><span class="adv__tag adv__tag--svara">SVARA</span><p>{{ a.svara }}</p></div>
                  </div>
                </div>
              </section>

              <!-- CROSS-MODULE INTELLIGENCE -->
              <section class="bcsec">
                <div class="bcsec__head"><span class="bclabel">Cross-Module Intelligence</span><h2 class="bcsec__title">One business action flows through the entire platform.</h2></div>
                <div class="xmod bcinst svara-instrument">
                  <div class="xmod__top">
                    <span class="bcinst__label">LIVE WORKFLOW · CRM → LMS</span>
                    <button type="button" class="bcrun" @click="runXmod">{{ xState === 'idle' ? 'RUN WORKFLOW' : 'FLOWING…' }} ↗</button>
                  </div>
                  <div class="xmod__chain">
                    <template v-for="(x, i) in XMOD" :key="x.m">
                      <span class="xmod__node" :class="{ 'is-on': xStep >= i }"><b>{{ x.m }}</b>{{ x.t }}</span>
                      <span v-if="i < XMOD.length - 1" class="xmod__link" :class="{ 'is-on': xStep > i }" aria-hidden="true">↓</span>
                    </template>
                  </div>
                </div>
              </section>

              <!-- ONE DATA + AI LAYER -->
              <section class="bcsec">
                <div class="bcsec__head"><span class="bclabel">One Data Layer · One AI Layer</span><h2 class="bcsec__title">AI isn’t an add-on. It’s built into every function.</h2></div>
                <div class="grid2">
                  <div class="data bcinst svara-instrument">
                    <span class="bcinst__label">ONE DATA LAYER</span>
                    <div class="caps data__src"><span v-for="d in DATA_SOURCES" :key="d" class="bcchip">{{ d }}</span></div>
                    <span class="data__down" aria-hidden="true">↓</span>
                    <div class="chain-h data__flow"><span class="chain-h__n chain-h__n--on">UNIFIED BUSINESS DATA</span><span class="chain-h__l" aria-hidden="true">→</span><span class="chain-h__n">AI LAYER</span><span class="chain-h__l" aria-hidden="true">→</span><span class="chain-h__n">BUSINESS INTELLIGENCE</span></div>
                  </div>
                  <div class="ailayer bcinst svara-instrument">
                    <span class="bcinst__label">AI-FIRST · NOT AI-ADDED</span>
                    <div v-for="(a, i) in AI_EXAMPLES" :key="a.k" class="ailayer__row" :style="{ '--m-accent': MODULES[i]?.accent }">
                      <span class="ailayer__m">{{ a.k }}</span><span class="ailayer__arrow" aria-hidden="true">→</span><span class="ailayer__v">{{ a.v }}</span>
                    </div>
                  </div>
                </div>
              </section>

              <!-- UNIFIED COMMAND -->
              <section class="bcsec">
                <div class="bcsec__head"><span class="bclabel">Unified Command</span><h2 class="bcsec__title">A business execution layer inside ONE AI OS.</h2></div>
                <div class="ucmd bcinst svara-instrument">
                  <div class="ucmd__top">
                    <span class="ucmd__q">“Give me a complete view of our business performance.”</span>
                    <button type="button" class="bcrun" @click="runCmd">{{ cmdState === 'idle' ? 'RUN COMMAND' : 'ASSEMBLING…' }} ↗</button>
                  </div>
                  <div class="chain-h">
                    <template v-for="(c, i) in CMD_CHAIN" :key="c">
                      <span class="chain-h__n" :class="{ 'chain-h__n--on': cmdStep >= i }">{{ c }}</span>
                      <span v-if="i < CMD_CHAIN.length - 1" class="chain-h__l" aria-hidden="true">→</span>
                    </template>
                  </div>
                </div>
              </section>

              <!-- BUSINESS COMMAND CENTER -->
              <section class="bcsec">
                <div class="bcsec__head"><span class="bclabel">Business Command Center</span><h2 class="bcsec__title">See the business. Command the business.</h2></div>
                <div class="cc bcinst svara-instrument">
                  <span class="bcinst__label">BUSINESS TELEMETRY</span>
                  <div class="caps cc__tel"><span v-for="t in CC_TELEMETRY" :key="t" class="bcchip bcchip--on">{{ t }}</span></div>
                </div>
                <div class="grid3 cc__panels">
                  <div v-for="p in CC_PANELS" :key="p" class="cc__panel bcinst svara-instrument"><span class="cc__dot" />{{ p }}</div>
                </div>
                <div class="exec bcinst svara-instrument">
                  <span class="bcinst__label">EXECUTIVE BUSINESS BRIEFING</span>
                  <div class="caps"><span v-for="e in EXEC_INDICATORS" :key="e" class="bcchip">{{ e }}</span></div>
                  <span class="exec__arrow" aria-hidden="true">→</span>
                  <span class="exec__ai">AI INSIGHTS</span>
                  <p class="bcsim">◦ DEMONSTRATION / SAMPLE DATA</p>
                </div>
              </section>

              <!-- COMMERCIAL -->
              <section class="bcsec">
                <div class="bcsec__head"><span class="bclabel">Commercial Model</span><h2 class="bcsec__title">Not a pricing page. A business-system configuration.</h2></div>
                <div class="grid2">
                  <div v-for="c in COMMERCIAL" :key="c.n" class="conf bcinst svara-instrument">
                    <span class="bcinst__label">{{ c.n }}</span>
                    <p class="conf__k">{{ c.k }}</p>
                    <div class="conf__spec"><span class="bclabel bclabel--cy">Modules</span><div class="caps"><span v-for="s in c.spec" :key="s" class="bcchip">{{ s }}</span></div></div>
                    <p v-if="c.users" class="conf__users">{{ c.users }}</p>
                    <p class="conf__v">{{ c.v }}</p>
                  </div>
                </div>
              </section>

              <!-- FINAL CTA -->
              <section class="bcsec bcsec--final">
                <p class="bcx__final">Every function. One platform.<br><span>One AI layer. Zero fragmentation.</span></p>
                <p class="bcx__final-copy">Bring sales, operations, HR, finance, learning and support into one intelligent business environment.</p>
                <div class="bcx__final-cta">
                  <NuxtLink to="/contact" class="bcx__cta bcx__cta--primary" @click="close">EXPLORE BUSINESS CLOUD <span aria-hidden="true">↗</span></NuxtLink>
                  <NuxtLink to="/contact" class="bcx__cta bcx__cta--ghost" @click="close">TALK TO SVARA</NuxtLink>
                  <NuxtLink to="/contact" class="bcx__cta bcx__cta--ghost" @click="close">CONNECT WITH US</NuxtLink>
                </div>
              </section>

              <footer class="bcx__foot">SVARA · UNIFIED BUSINESS CLOUD · ONE PLATFORM · v1.0</footer>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  </Teleport>
</template>

<style scoped>
.bcx {
  position: fixed; inset: 0; z-index: 100000; display: flex; justify-content: center;
  --bc-bg: #05121c; --bc-bg2: #0a2033; --bc-ink: #e8f3ff; --bc-muted: rgba(184, 210, 230, 0.6);
  --bc-line: rgba(58, 134, 224, 0.26); --bc-blue: #3a86e0; --bc-cyan: #48d8e6; --bc-green: #43cf8e; --bc-violet: #9a86ff; --bc-amber: #ffab52;
  color: var(--bc-ink); font-family: var(--font-mono, ui-monospace, monospace);
}
.bcx__backdrop { position: absolute; inset: 0; background: rgba(2, 8, 14, 0.7); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); }
.bcx__panel {
  position: relative; z-index: 1; width: min(1340px, 100%); height: 100%; display: flex; flex-direction: column; overflow: hidden;
  background: radial-gradient(circle at 14% 5%, rgba(67, 207, 142, 0.1), transparent 30%), radial-gradient(circle at 86% 88%, rgba(58, 134, 224, 0.12), transparent 34%), linear-gradient(160deg, var(--bc-bg2), var(--bc-bg) 58%, #030c14);
  border-left: 1px solid var(--bc-line); border-right: 1px solid var(--bc-line); box-shadow: 0 0 120px -20px rgba(0, 0, 0, 0.84);
}
.bcx__progress { position: absolute; top: 0; left: 0; height: 2px; width: 100%; transform-origin: left; background: linear-gradient(90deg, var(--bc-green), var(--bc-cyan)); z-index: 6; }

.bcx__header { flex: 0 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; padding: 14px clamp(16px, 3vw, 34px); border-bottom: 1px solid var(--bc-line); background: linear-gradient(90deg, rgba(6, 16, 26, 0.92), rgba(10, 32, 51, 0.6)); }
.bcx__id { display: flex; align-items: center; gap: 13px; min-width: 0; }
.bcx__core-i { position: relative; width: 30px; height: 30px; border: 1px solid var(--bc-green); display: grid; place-items: center; flex-shrink: 0; clip-path: polygon(0 6px, 6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%); }
.bcx__core-i i { width: 8px; height: 8px; border-radius: 50%; background: var(--bc-green); box-shadow: 0 0 12px var(--bc-green); animation: bcx-pulse 2.2s ease-in-out infinite; }
.bcx__id-title { margin: 0; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; color: #fff; }
.bcx__id-sub { margin: 2px 0 0; font-size: 9px; letter-spacing: 0.14em; color: var(--bc-muted); }
.bcx__status { display: inline-flex; align-items: center; gap: 7px; margin-left: 6px; font-size: 9.5px; letter-spacing: 0.13em; color: var(--bc-green); }
.bcx__status i { width: 6px; height: 6px; border-radius: 50%; background: var(--bc-green); box-shadow: 0 0 10px var(--bc-green); }
.bcx__head-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.bcx__hstat { display: inline-flex; flex-direction: column; font-size: 8px; letter-spacing: 0.1em; color: var(--bc-cyan); line-height: 1.4; }
.bcx__hstat b { color: var(--bc-muted); font-weight: 500; }
.bcx__close { display: inline-flex; align-items: center; gap: 7px; padding: 9px 15px; border: 1px solid var(--bc-line); background: rgba(58, 134, 224, 0.06); color: var(--bc-ink); font: inherit; font-size: 10px; letter-spacing: 0.13em; cursor: pointer; transition: background 180ms, border-color 180ms; clip-path: polygon(0 5px, 5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%); }
.bcx__close:hover { background: rgba(58, 134, 224, 0.16); border-color: var(--bc-blue); }

.bcx__scroll { flex: 1 1 auto; min-height: 0; overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--bc-blue) transparent; }
.bcx__scroll::-webkit-scrollbar { width: 8px; }
.bcx__scroll::-webkit-scrollbar-thumb { background: rgba(58, 134, 224, 0.4); border-radius: 8px; }
.bcx__inner { max-width: 1140px; margin-inline: auto; padding: clamp(28px, 5vw, 68px) clamp(16px, 3vw, 40px) 60px; }

/* shared primitives */
.bcinst { position: relative; padding: 40px 18px 18px; background: rgba(8, 22, 36, 0.5); }
.bcinst__label { position: absolute; top: 9px; left: clamp(14px, 2vw, 22px); z-index: 3; font-size: 9px; letter-spacing: 0.14em; color: var(--bc-cyan); pointer-events: none; }
.bclabel { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--bc-muted); }
.bclabel--cy { color: var(--bc-cyan); }
.bcchip { display: inline-flex; align-items: center; padding: 7px 12px; font-size: 10px; letter-spacing: 0.05em; color: var(--bc-ink); border: 1px solid var(--bc-line); background: rgba(58, 134, 224, 0.05); }
.bcchip--on { color: var(--bc-cyan); border-color: var(--bc-blue); background: rgba(58, 134, 224, 0.1); }
.bcchip--warn { color: var(--bc-amber); border-color: rgba(255, 171, 82, 0.4); }
.bcchip--link { color: var(--bc-green); border-color: rgba(67, 207, 142, 0.45); }
.bcsim { margin: 14px 0 0; font-size: 8.5px; letter-spacing: 0.14em; color: var(--bc-muted); }
.bcbody { margin: 16px 0 0; max-width: 66ch; font-size: 12.5px; line-height: 1.7; color: var(--bc-muted); }
.caps { display: flex; flex-wrap: wrap; gap: 8px; }
.bcsec { padding: clamp(34px, 5vw, 60px) 0; border-top: 1px solid rgba(58, 134, 224, 0.12); }
.bcsec--hero { border-top: 0; padding-top: 6px; }
.bcsec__head { margin-bottom: 24px; }
.bcsec__title { margin: 8px 0 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(21px, 3vw, 34px); font-weight: 650; letter-spacing: -0.01em; color: #fff; line-height: 1.12; }
.bcsec__title span { color: var(--bc-cyan); }

/* generic chain */
.chain-h { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; }
.chain-h__n { padding: 9px 12px; border: 1px solid var(--bc-line); background: rgba(8, 22, 36, 0.5); font-size: 10px; font-weight: 700; letter-spacing: 0.04em; color: var(--bc-muted); transition: color 260ms, border-color 260ms, background 260ms; }
.chain-h__n--on { color: var(--bc-cyan); border-color: var(--bc-blue); background: rgba(58, 134, 224, 0.12); }
.chain-h__l { color: var(--bc-blue); }

/* HERO */
.bcx__lede { margin: 12px 0 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(32px, 5.4vw, 66px); font-weight: 600; line-height: 1.03; letter-spacing: -0.02em; color: #fff; }
.bcx__lede-line { display: block; opacity: 0; transform: translateY(14px); filter: blur(6px); animation: bcx-line-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: calc(var(--d) * 160ms + 200ms); }
.bcx__lede-line--accent { color: var(--bc-cyan); }
.bcx__hero-say { margin: 20px 0 0; font-size: 13px; letter-spacing: 0.04em; color: var(--bc-cyan); }
.bcx__hero-copy { margin: 14px 0 30px; max-width: 66ch; font-size: 13.5px; line-height: 1.7; color: var(--bc-muted); }

.hub__ring-wrap { position: relative; height: 330px; display: grid; place-items: center; margin-bottom: 18px; }
.hub__ring { position: absolute; width: 250px; height: 250px; border-radius: 50%; border: 1px dashed var(--bc-line); }
.hub__center { position: relative; z-index: 2; display: grid; place-items: center; gap: 8px; width: 150px; height: 150px; border-radius: 50%; border: 1px solid var(--bc-green); background: rgba(67, 207, 142, 0.08); text-align: center; box-shadow: 0 0 54px -10px rgba(67, 207, 142, 0.7), inset 0 0 30px -12px rgba(72, 216, 230, 0.5); }
.hub__center b { font-size: 12px; font-weight: 700; letter-spacing: 0.06em; color: #fff; line-height: 1.3; }
.hub__inner { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px; max-width: 120px; }
.hub__inner i { font-style: normal; font-size: 6.5px; letter-spacing: 0.06em; color: var(--bc-cyan); border: 1px solid var(--bc-line); padding: 2px 4px; }
.hub__node { position: absolute; padding: 8px 12px; border: 1px solid var(--m-accent, var(--bc-line)); background: rgba(8, 22, 36, 0.92); font-size: 9.5px; font-weight: 700; letter-spacing: 0.04em; color: var(--m-accent, var(--bc-ink)); transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-152px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
.hub__shared { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.hub__shared > .bclabel { flex: 0 0 auto; }

/* PROBLEM */
.prob { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; }
.prob__apps, .prob__silos { justify-content: center; }
.prob__app { opacity: 0.85; }
.prob__down { color: var(--bc-blue); }
.prob__one { padding: 14px 26px; border: 1px solid var(--bc-green); background: rgba(67, 207, 142, 0.08); font-size: 12px; font-weight: 700; letter-spacing: 0.08em; color: var(--bc-cyan); }

/* VISION */
.vision { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; margin-top: 20px; }
.vision__mods { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.vision__mod { padding: 10px 15px; border: 1px solid var(--m-accent); background: color-mix(in srgb, var(--m-accent) 8%, transparent); font-size: 11px; font-weight: 700; letter-spacing: 0.05em; color: var(--m-accent); }
.vision__down { font-size: 9px; letter-spacing: 0.14em; color: var(--bc-muted); }
.vision__shared { justify-content: center; }

/* FIVE MODULES */
.switch { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
.switch__tab { display: inline-flex; align-items: center; gap: 9px; padding: 12px 15px; background: rgba(8, 22, 36, 0.5); border: 1px solid transparent; color: var(--bc-muted); font: inherit; font-size: 11px; letter-spacing: 0.04em; cursor: pointer; transition: color 180ms, border-color 180ms, background 180ms; }
.switch__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--m-accent); box-shadow: 0 0 8px var(--m-accent); flex: none; opacity: 0.6; transition: opacity 180ms; }
.switch__n { color: var(--m-accent); font-size: 10px; }
.switch__tab.is-active { color: #fff; border-color: var(--m-accent); background: color-mix(in srgb, var(--m-accent) 10%, transparent); }
.switch__tab.is-active .switch__dot, .switch__tab.is-linked .switch__dot { opacity: 1; }
.switch__tab.is-linked { border-color: color-mix(in srgb, var(--m-accent) 55%, transparent); color: var(--bc-ink); }

.mod__k { margin: 0 0 8px; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(20px, 2.6vw, 28px); font-weight: 650; color: var(--m-accent); }
.mod__pos { margin: 0 0 20px; max-width: 70ch; font-size: 12.5px; line-height: 1.7; color: var(--bc-muted); }
.mod__tiles { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 8px; margin-bottom: 22px; }
.mod__tile { padding: 14px 8px; border: 1px solid var(--bc-line); border-top: 2px solid var(--m-accent); background: rgba(8, 22, 36, 0.5); font-size: 9px; font-weight: 700; letter-spacing: 0.04em; color: var(--bc-ink); text-align: center; }
.mod__groups { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px 24px; }
.mod__group { display: flex; flex-direction: column; gap: 10px; }
.mod__g-k { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; color: var(--m-accent); }
.mod__links { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--bc-line); }
.mod__links > .bclabel { flex: 0 0 auto; }

/* ADVANTAGE */
.grid2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.grid3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.adv__row { display: flex; gap: 10px; padding: 12px 0; }
.adv__row--siloed { border-bottom: 1px solid var(--bc-line); }
.adv__row p { margin: 0; font-size: 11.5px; line-height: 1.6; }
.adv__row--siloed p { color: var(--bc-muted); }
.adv__row--svara p { color: var(--bc-ink); }
.adv__tag { flex: 0 0 54px; font-size: 8px; letter-spacing: 0.1em; color: var(--bc-amber); padding-top: 2px; }
.adv__tag--svara { color: var(--bc-green); }

/* CROSS-MODULE */
.xmod__top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; flex-wrap: wrap; }
.xmod__chain { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.xmod__node { width: 100%; max-width: 460px; display: flex; flex-direction: column; gap: 3px; align-items: center; text-align: center; padding: 12px; border: 1px solid var(--bc-line); background: rgba(8, 22, 36, 0.5); transition: color 260ms, border-color 260ms, background 260ms; }
.xmod__node b { font-size: 11px; font-weight: 700; letter-spacing: 0.05em; color: var(--bc-muted); }
.xmod__node { font-size: 10px; color: var(--bc-muted); }
.xmod__node.is-on { border-color: var(--bc-green); background: rgba(67, 207, 142, 0.08); }
.xmod__node.is-on b { color: var(--bc-cyan); }
.xmod__link { color: rgba(120, 170, 210, 0.4); transition: color 260ms; }
.xmod__link.is-on { color: var(--bc-green); }

/* DATA + AI LAYER */
.data { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; }
.data__src { justify-content: center; }
.data__down { color: var(--bc-blue); }
.data__flow { justify-content: center; }
.ailayer__row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid rgba(58, 134, 224, 0.1); }
.ailayer__row:last-child { border-bottom: 0; }
.ailayer__m { flex: 0 0 68px; font-size: 11px; font-weight: 700; letter-spacing: 0.04em; color: var(--m-accent, var(--bc-cyan)); }
.ailayer__arrow { color: var(--bc-blue); }
.ailayer__v { font-size: 11.5px; color: var(--bc-ink); }

/* UNIFIED COMMAND */
.ucmd__top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
.ucmd__q { font-size: 13px; font-style: italic; color: var(--bc-ink); }

/* COMMAND CENTER */
.cc__tel { justify-content: center; }
.cc__panels { margin-top: 12px; }
.cc__panel { display: flex; align-items: center; gap: 10px; padding-top: 34px; font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--bc-ink); }
.cc__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--bc-green); box-shadow: 0 0 8px var(--bc-green); flex: none; }
.exec { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-top: 12px; }
.exec > .bcinst__label { flex: 1 0 100%; }
.exec__arrow { color: var(--bc-blue); }
.exec__ai { padding: 8px 14px; border: 1px solid var(--bc-green); background: rgba(67, 207, 142, 0.08); font-size: 10px; font-weight: 700; letter-spacing: 0.06em; color: var(--bc-green); }
.exec .bcsim { flex: 1 0 100%; }

/* COMMERCIAL */
.conf { display: flex; flex-direction: column; }
.conf__k { margin: 0 0 14px; font-family: var(--font-sans, system-ui, sans-serif); font-size: 20px; font-weight: 650; color: #fff; }
.conf__spec { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
.conf__users { margin: 0 0 12px; font-size: 10.5px; letter-spacing: 0.06em; color: var(--bc-cyan); }
.conf__v { margin: auto 0 0; padding-top: 12px; font-size: clamp(15px, 2vw, 21px); font-weight: 700; color: var(--bc-green); }

/* FINAL */
.bcsec--final { text-align: center; border-top: 1px solid var(--bc-line); }
.bcx__final { margin: 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(24px, 4.2vw, 48px); font-weight: 600; line-height: 1.12; color: #fff; }
.bcx__final span { color: var(--bc-cyan); }
.bcx__final-copy { margin: 18px auto 0; max-width: 56ch; font-size: 12.5px; line-height: 1.7; color: var(--bc-muted); }
.bcx__final-cta { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 26px; }
.bcx__cta { display: inline-flex; align-items: center; gap: 10px; padding: 15px 26px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-decoration: none; }
.bcx__cta--primary { background: var(--bc-green); color: #04140c; }
.bcx__cta--ghost { background: transparent; color: var(--bc-ink); border: 1px solid var(--bc-line); }
.bcx__foot { margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(58, 134, 224, 0.12); text-align: center; font-size: 9px; letter-spacing: 0.2em; color: var(--bc-muted); }

@keyframes bcx-pulse { 50% { opacity: 0.4; } }
@keyframes bcx-line-in { to { opacity: 1; transform: translateY(0); filter: blur(0); } }

/* ── responsive ── */
@media (max-width: 900px) {
  .grid3, .mod__tiles { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .grid2, .mod__groups { grid-template-columns: 1fr; }
  .switch { overflow-x: auto; flex-wrap: nowrap; }
  .switch__tab { flex: none; }
  .bcx__hstat { display: none; }
}
@media (max-width: 560px) {
  .grid3, .grid2, .mod__tiles { grid-template-columns: 1fr; }
  .bcx__id-sub { display: none; }
  .hub__ring-wrap { height: 290px; }
  .hub__node { transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-120px) rotate(calc(var(--i) * (-360deg / var(--n)))); font-size: 8.5px; padding: 6px 9px; }
}
@media (prefers-reduced-motion: reduce) {
  .bcx__core-i i { animation: none; }
  .bcx__lede-line { animation: none; opacity: 1; transform: none; filter: none; }
  .chain-h__n, .xmod__node, .xmod__link, .switch__tab, .switch__dot { transition: none; }
}
</style>
