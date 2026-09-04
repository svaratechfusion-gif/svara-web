<script setup lang="ts">
// SVARA DIGITAL TWIN PLATFORM — immersive full-screen simulation environment, opened from the
// Digital Twin card's "Explore" control. SAME architecture as the other product overlays (Teleport,
// own scroll container with data-lenis-prevent, page scroll-locked, Escape/backdrop close → products
// page keeps its exact position). DISTINCT identity: the SIMULATE metaphor — a living digital replica
// of the physical world. Physical↔digital "simulation lab" language, hologram-cyan + steel-blue +
// prominent amber warnings, own twx/tsec/tinst namespace. All copy VERBATIM from the source (P06,
// imported from ./twin-content); telemetry is labelled SIMULATED. Flow: PHYSICAL → LIVE DATA →
// DIGITAL TWIN → SIMULATION → PREDICTION → DECISION.
import { ref, watch, computed, onBeforeUnmount, nextTick } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { useTwinExplore } from '~/composables/useTwinExplore'
import {
  HERO_LINES, BOOT, HEAD_STATUS, PHYS_ELEMENTS, TWIN_PAIRS, FEEDS, LIVE_METRICS, LAYERS, TIMELINE,
  SCENARIOS, WHATIF_PARAMS, WHATIF_CHAIN, EMERGENCIES, EMERGENCY_CHAIN, CAPACITY_CHAIN, URBAN_LAYERS,
  URBAN_SCENARIOS, PREDICTIVE, TRAINING_SCENARIOS, CONTROLS_3D, COLLAB_USERS, COLLAB_NOTES, XR_CHAIN,
  ECO_SYSTEMS, DIFFERENTIATORS, BUILDER_BLOCKS, VERTICALS, ARCH, TECH_STACK, API_TARGETS, COMMERCIAL,
  CMD_TELEMETRY, CMD_RING, FINAL_CHAIN,
} from './twin-content'
import ProductDashboard from '~/components/products/worlds/ProductDashboard.vue'

const { open, closeExplore } = useTwinExplore()

// ── interactions ─────────────────────────────────────────────────────────────
const activeLayer = ref(0)
const machineSpeed = ref(80)
const activeTime = ref(0)
const activeScenario = ref(0)
const activeVertical = ref(0)
const activeEmergency = ref(0)
const activeWhatif = ref(0)
const anomalyOn = ref(false)
const wiState = ref<'idle' | 'running'>('idle')
const wiStep = ref(-1)
const emState = ref<'idle' | 'running'>('idle')
const emStep = ref(-1)
const fnState = ref<'idle' | 'running'>('idle')
const fnStep = ref(-1)
const timers: ReturnType<typeof setTimeout>[] = []
function clearTimers(): void { timers.forEach(clearTimeout); timers.length = 0 }
function runChain(state: typeof wiState, step: typeof wiStep, len: number, interval: number): void {
  clearTimers()
  state.value = 'running'; step.value = -1
  for (let i = 0; i < len; i++) timers.push(setTimeout(() => { step.value = i }, 300 + i * interval))
  timers.push(setTimeout(() => { state.value = 'idle' }, 300 + len * interval + 800))
}
function runWhatif(): void { runChain(wiState, wiStep, WHATIF_CHAIN.length, 620) }
function runEmergency(): void { runChain(emState, emStep, EMERGENCY_CHAIN.length, 700) }
function runFinal(): void { runChain(fnState, fnStep, FINAL_CHAIN.length, 560) }

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
      wiState.value = 'idle'; wiStep.value = -1; emState.value = 'idle'; emStep.value = -1
      fnState.value = 'idle'; fnStep.value = -1; anomalyOn.value = false
      activeLayer.value = 0; machineSpeed.value = 80; activeTime.value = 0; activeScenario.value = 0
      activeVertical.value = 0; activeEmergency.value = 0; activeWhatif.value = 0
    })
  } else {
    unlock(); document.removeEventListener('keydown', onKey)
  }
})
onBeforeUnmount(() => { unlock(); document.removeEventListener('keydown', onKey); clearTimers() })

const layer = computed(() => LAYERS[activeLayer.value]!)
const scenario = computed(() => SCENARIOS[activeScenario.value]!)
const vert = computed(() => VERTICALS[activeVertical.value]!)
const speedAuthorised = computed(() => machineSpeed.value !== 80)
</script>

<template>
  <Teleport to="body">
    <AnimatePresence>
      <motion.div
        v-if="open" class="twx" role="dialog" aria-modal="true" aria-label="SVARA Digital Twin Platform"
        :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
        :transition="{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }"
      >
        <div class="twx__backdrop" aria-hidden="true" @click="close" />
        <motion.section
          class="twx__panel"
          :initial="{ opacity: 0, scale: 0.96, y: 18 }" :animate="{ opacity: 1, scale: 1, y: 0 }"
          :exit="{ opacity: 0, scale: 0.97, y: 12 }" :transition="{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }"
        >
          <span class="twx__progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />

          <!-- HEADER (fixed) -->
          <header class="twx__header">
            <div class="twx__id">
              <span class="twx__core" aria-hidden="true"><i /></span>
              <div>
                <p class="twx__id-title">SVARA DIGITAL TWIN</p>
                <p class="twx__id-sub">INTERACTIVE AI &amp; SIMULATION</p>
              </div>
              <span class="twx__status"><i />TWIN ONLINE</span>
            </div>
            <div class="twx__head-right">
              <span v-for="s in HEAD_STATUS" :key="s.k" class="twx__hstat"><b>{{ s.k }}</b>{{ s.v }}</span>
              <button type="button" class="twx__close" @click="close">CLOSE <span aria-hidden="true">×</span></button>
            </div>
          </header>

          <div ref="scroller" class="twx__scroll" data-lenis-prevent @scroll="onScroll">
            <div class="twx__inner">
              <!-- HERO -->
              <section class="tsec tsec--hero">
                <p class="tlabel tlabel--cy">02 // Digital Twin Intelligence</p>
                <h1 class="twx__lede">
                  <span v-for="(l, i) in HERO_LINES" :key="l" class="twx__lede-line" :class="{ 'twx__lede-line--accent': i === 1 }" :style="{ '--d': i }">{{ l }}</span>
                </h1>
                <p class="twx__hero-say">A living digital replica of the physical world.</p>
                <p class="twx__hero-copy">SVARA Digital Twin Platform creates intelligent, live virtual replicas of physical assets, systems and environments — enabling organisations to monitor operations in real time, simulate scenarios without risk, predict outcomes before they occur, and train teams without disrupting live systems.</p>

                <!-- HERO VISUAL: physical ↔ digital split -->
                <div class="split tinst svara-instrument">
                  <span class="tinst__label">ONE WORLD · TWO REALITIES</span>
                  <div class="split__grid">
                    <div class="split__side">
                      <span class="split__cap">PHYSICAL WORLD</span>
                      <div class="split__frame split__frame--phys"><span v-for="e in PHYS_ELEMENTS" :key="e" class="split__el">{{ e }}</span></div>
                    </div>
                    <div class="split__bridge" aria-hidden="true"><span class="split__pulse" /><span class="split__mid">SYNC</span></div>
                    <div class="split__side">
                      <span class="split__cap split__cap--cy">DIGITAL TWIN</span>
                      <div class="split__frame split__frame--dig"><span v-for="e in PHYS_ELEMENTS" :key="e" class="split__el split__el--dig">{{ e }}</span></div>
                    </div>
                  </div>
                  <div class="split__pairs">
                    <span v-for="p in TWIN_PAIRS" :key="p.p" class="split__pair"><b>{{ p.p }}</b><i aria-hidden="true">↔</i>{{ p.d }}</span>
                  </div>
                  <div class="split__boot">
                    <span v-for="b in BOOT" :key="b.k" class="split__boot-cell"><b>{{ b.k }}</b>{{ b.v }}</span>
                  </div>
                  <p class="tsim">◦ SIMULATED INTERFACE STATE</p>
                </div>
              </section>

              <!-- the product's own HUD dashboard, in its own section -->
              <ProductDashboard id="twin" />

              <!-- PHYSICAL → DIGITAL -->
              <section class="tsec">
                <div class="tsec__head"><span class="tlabel">Foundation</span><h2 class="tsec__title">One world. Two realities.</h2></div>
                <div class="feed tinst svara-instrument">
                  <span class="tinst__label">PHYSICAL → DIGITAL</span>
                  <div class="feed__flow">
                    <span class="feed__node">PHYSICAL ASSET</span>
                    <span class="feed__down" aria-hidden="true">↓</span>
                    <div class="caps feed__inputs"><span v-for="f in FEEDS" :key="f" class="tchip">{{ f }}</span></div>
                    <span class="feed__down" aria-hidden="true">↓</span>
                    <span class="feed__node feed__node--core">SVARA DIGITAL TWIN ENGINE</span>
                    <span class="feed__down" aria-hidden="true">↓</span>
                    <span class="feed__node feed__node--out">LIVE DIGITAL REPRESENTATION</span>
                  </div>
                </div>
              </section>

              <!-- REAL-TIME ENGINE -->
              <section class="tsec">
                <div class="tsec__head"><span class="tlabel">Real-Time Engine</span><h2 class="tsec__title">A digital twin that never stops syncing.</h2></div>
                <div class="rt tinst svara-instrument">
                  <span class="tinst__label">LIVE TWIN · SYNC ACTIVE · &lt; 500MS</span>
                  <div class="rt__metrics">
                    <div v-for="m in LIVE_METRICS" :key="m.l" class="rt__cell"><span class="rt__v">{{ m.v }}</span><span class="rt__l">{{ m.l }}</span></div>
                  </div>
                  <p class="tsim">◦ SIMULATED LIVE TELEMETRY</p>
                </div>

                <!-- multi-layer toggle -->
                <div class="tsec__head tsec__head--mini"><span class="tlabel tlabel--cy">One model · three intelligence layers</span></div>
                <div class="layers">
                  <div class="layers__tabs">
                    <button v-for="(l, i) in LAYERS" :key="l.k" type="button" class="layers__tab" :class="{ 'is-active': activeLayer === i }" @click="activeLayer = i">{{ l.k }}</button>
                  </div>
                  <div class="layers__detail tinst svara-instrument">
                    <span class="tinst__label">LAYER / {{ layer.k }}</span>
                    <p class="tbody">{{ layer.b }}</p>
                  </div>
                </div>

                <!-- bidirectional control -->
                <div class="tsec__head tsec__head--mini"><span class="tlabel tlabel--cy">Bidirectional control</span></div>
                <div class="bidi tinst svara-instrument">
                  <span class="tinst__label">DIGITAL TWIN PARAMETER · MACHINE SPEED</span>
                  <div class="bidi__row">
                    <span class="bidi__val">{{ machineSpeed }}<i>%</i></span>
                    <input class="bidi__slider" type="range" min="0" max="100" v-model.number="machineSpeed" aria-label="Machine speed">
                  </div>
                  <div class="bidi__flow" :class="{ 'is-on': speedAuthorised }">
                    <span class="bidi__step">VIRTUAL CHANGE</span><span class="bidi__arrow" aria-hidden="true">→</span>
                    <span class="bidi__step bidi__step--auth">AUTHORISED PHYSICAL UPDATE</span>
                  </div>
                  <p class="tsim">◦ CHANGES PROPAGATE TO PHYSICAL SYSTEMS ONLY WHERE AUTHORISED</p>
                </div>
              </section>

              <!-- HISTORICAL REPLAY -->
              <section class="tsec">
                <div class="tsec__head"><span class="tlabel">Historical Replay</span><h2 class="tsec__title">Rewind reality.</h2></div>
                <div class="replay tinst svara-instrument">
                  <span class="tinst__label">TIMELINE · {{ TIMELINE[activeTime] }}</span>
                  <div class="replay__track">
                    <template v-for="(t, i) in TIMELINE" :key="t">
                      <button type="button" class="replay__pt" :class="{ 'is-active': activeTime === i }" @click="activeTime = i"><i />{{ t }}</button>
                      <span v-if="i < TIMELINE.length - 1" class="replay__seg" aria-hidden="true" />
                    </template>
                  </div>
                  <div class="replay__state">
                    <span class="replay__badge">{{ activeTime === 0 ? 'LIVE STATE' : 'HISTORICAL STATE' }}</span>
                    <span class="replay__arrow" aria-hidden="true">→</span>
                    <span class="replay__badge replay__badge--cy">INCIDENT ANALYSIS</span>
                  </div>
                </div>
              </section>

              <!-- ANOMALY DETECTION -->
              <section class="tsec">
                <div class="tsec__head"><span class="tlabel">Anomaly Detection</span><h2 class="tsec__title">The twin sees what the eye misses.</h2></div>
                <div class="anom tinst svara-instrument" :class="{ 'is-alert': anomalyOn }">
                  <div class="anom__top">
                    <span class="tinst__label">ANOMALY OVERLAY</span>
                    <button type="button" class="trun" @click="anomalyOn = !anomalyOn">{{ anomalyOn ? 'RESET' : 'INJECT DEVIATION' }} ↗</button>
                  </div>
                  <div class="anom__cols">
                    <div class="anom__col"><span class="anom__k">EXPECTED STATE</span><span class="anom__bar anom__bar--ok" /></div>
                    <div class="anom__col"><span class="anom__k">ACTUAL STATE</span><span class="anom__bar" :class="anomalyOn ? 'anom__bar--alert' : 'anom__bar--ok'" /></div>
                  </div>
                  <p class="anom__msg" :class="{ 'is-on': anomalyOn }">{{ anomalyOn ? '⚠ DEVIATION DETECTED — ANOMALY FLAGGED ON AFFECTED ASSET' : 'MONITORING — ALL SYSTEMS NOMINAL' }}</p>
                </div>
              </section>

              <!-- SCENARIO SIMULATION -->
              <section class="tsec">
                <div class="tsec__head"><span class="tlabel">Scenario Simulation</span><h2 class="tsec__title">Change the world without risking the real one.</h2></div>
                <div class="scen">
                  <div class="scen__tabs">
                    <button v-for="(s, i) in SCENARIOS" :key="s.k" type="button" class="scen__tab" :class="{ 'is-active': activeScenario === i }" @click="activeScenario = i">
                      <b>{{ s.k }}</b>{{ s.d }}
                    </button>
                  </div>
                  <div class="scen__stage tinst svara-instrument">
                    <span class="tinst__label">ACTIVE / {{ scenario.k }}</span>
                    <p class="scen__name">{{ scenario.d }}</p>
                    <p class="tbody">Branch the current world into a parallel configuration and explore its behaviour — the physical system stays untouched.</p>
                  </div>
                </div>

                <!-- Monte Carlo -->
                <div class="tsec__head tsec__head--mini"><span class="tlabel tlabel--cy">Monte Carlo simulation</span></div>
                <div class="mc tinst svara-instrument">
                  <span class="tinst__label">MONTE CARLO · THOUSANDS OF SCENARIOS</span>
                  <div class="mc__fan" aria-hidden="true"><span v-for="n in 14" :key="n" class="mc__path" :style="{ '--i': n - 1 }" /></div>
                  <div class="mc__dist" aria-hidden="true"><span v-for="n in 11" :key="n" class="mc__bar" :style="{ '--h': [8, 20, 38, 62, 84, 96, 82, 60, 36, 19, 8][n - 1] }" /></div>
                  <p class="tbody">Thousands of random-variable scenarios branch from one starting point; the twin returns an outcome distribution, not a single guess.</p>
                </div>

                <!-- Emergency -->
                <div class="tsec__head tsec__head--mini"><span class="tlabel tlabel--cy">Emergency simulation</span></div>
                <div class="emerg tinst svara-instrument" :class="{ 'is-live': emState === 'running' }">
                  <div class="emerg__top">
                    <div class="emerg__tabs">
                      <button v-for="(e, i) in EMERGENCIES" :key="e" type="button" class="emerg__tab" :class="{ 'is-active': activeEmergency === i }" @click="activeEmergency = i">{{ e }}</button>
                    </div>
                    <button type="button" class="trun trun--amber" @click="runEmergency">{{ emState === 'idle' ? 'RUN SIMULATION' : 'RUNNING…' }} ↗</button>
                  </div>
                  <div class="chain-h">
                    <template v-for="(c, i) in EMERGENCY_CHAIN" :key="c">
                      <span class="chain-h__n" :class="{ 'chain-h__n--amber': emStep >= i && i < 2, 'chain-h__n--ok': emStep >= i && i === 2 }">{{ c }}</span>
                      <span v-if="i < EMERGENCY_CHAIN.length - 1" class="chain-h__l" aria-hidden="true">→</span>
                    </template>
                  </div>
                  <p class="emerg__note">SCENARIO — {{ EMERGENCIES[activeEmergency] }} · <b>ZERO REAL-WORLD RISK</b></p>
                </div>

                <!-- Capacity + Urban -->
                <div class="grid2 scen__extra">
                  <div class="tmod tinst svara-instrument">
                    <span class="tinst__label">CAPACITY PLANNING</span>
                    <div class="chain-v"><template v-for="(c, i) in CAPACITY_CHAIN" :key="c"><span class="chain-v__n">{{ c }}</span><span v-if="i < CAPACITY_CHAIN.length - 1" class="chain-v__l" aria-hidden="true">↓</span></template></div>
                  </div>
                  <div class="tmod tinst svara-instrument">
                    <span class="tinst__label">URBAN / INFRASTRUCTURE</span>
                    <div class="caps"><span v-for="u in URBAN_LAYERS" :key="u" class="tchip">{{ u }}</span></div>
                    <div class="caps tmod__gap"><span v-for="s in URBAN_SCENARIOS" :key="s" class="tchip tchip--on">{{ s }}</span></div>
                  </div>
                </div>
              </section>

              <!-- WHAT-IF -->
              <section class="tsec">
                <div class="tsec__head"><span class="tlabel">What-If Modelling</span><h2 class="tsec__title">Experiment virtually. Deploy physically.</h2></div>
                <div class="whatif tinst svara-instrument">
                  <div class="whatif__top">
                    <span class="whatif__q">“What happens if we change this?”</span>
                    <button type="button" class="trun" @click="runWhatif">{{ wiState === 'idle' ? 'SIMULATE' : 'SIMULATING…' }} ↗</button>
                  </div>
                  <div class="whatif__params">
                    <button v-for="(p, i) in WHATIF_PARAMS" :key="p" type="button" class="whatif__param" :class="{ 'is-active': activeWhatif === i }" @click="activeWhatif = i">{{ p }}</button>
                  </div>
                  <div class="chain-h whatif__chain">
                    <template v-for="(c, i) in WHATIF_CHAIN" :key="c">
                      <span class="chain-h__n" :class="{ 'chain-h__n--on': wiStep >= i }">{{ c }}</span>
                      <span v-if="i < WHATIF_CHAIN.length - 1" class="chain-h__l" aria-hidden="true">→</span>
                    </template>
                  </div>
                </div>
              </section>

              <!-- PREDICTIVE INTELLIGENCE -->
              <section class="tsec">
                <div class="tsec__head"><span class="tlabel">Predictive Intelligence</span><h2 class="tsec__title">Don’t just see what is happening.<br><span>Predict what happens next.</span></h2></div>
                <div class="grid3">
                  <div v-for="p in PREDICTIVE" :key="p.n" class="tmod tinst svara-instrument">
                    <span class="tinst__label">{{ p.n }} / {{ p.k }}</span>
                    <div v-if="p.flow" class="chain-v chain-v--tight">
                      <template v-for="(c, i) in p.flow" :key="c"><span class="chain-v__n" :class="{ 'chain-v__n--amber': c === 'DEGRADATION DETECTED' }">{{ c }}</span><span v-if="i < p.flow.length - 1" class="chain-v__l" aria-hidden="true">↓</span></template>
                    </div>
                    <div v-if="p.list" class="caps"><span v-for="l in p.list" :key="l" class="tchip">{{ l }}</span></div>
                    <p v-if="p.badge" class="tmod__badge">{{ p.badge }}</p>
                    <p v-if="p.note" class="tmod__note">{{ p.note }}</p>
                  </div>
                </div>
              </section>

              <!-- TRAINING + IMMERSIVE -->
              <section class="tsec">
                <div class="tsec__head"><span class="tlabel">Immersive Training</span><h2 class="tsec__title">Train without touching the real system.</h2></div>
                <div class="train tinst svara-instrument">
                  <span class="tinst__label">TRAINING MODE</span>
                  <div class="caps"><span v-for="s in TRAINING_SCENARIOS" :key="s" class="tchip">{{ s }}</span></div>
                  <p class="tbody">Learn on the twin before touching live systems — an operator interacts with the digital environment at zero operational risk.</p>
                </div>
                <div class="grid3 train__extra">
                  <div class="tmod tinst svara-instrument">
                    <span class="tinst__label">WEB 3D · NO INSTALL</span>
                    <div class="caps"><span v-for="c in CONTROLS_3D" :key="c" class="tchip">{{ c }}</span></div>
                  </div>
                  <div class="tmod tinst svara-instrument">
                    <span class="tinst__label">REMOTE COLLABORATION</span>
                    <div class="collab"><span v-for="u in COLLAB_USERS" :key="u.k" class="collab__u"><b>{{ u.k }}</b>{{ u.loc }}</span></div>
                    <div class="caps tmod__gap"><span v-for="n in COLLAB_NOTES" :key="n" class="tchip tchip--on">{{ n }}</span></div>
                  </div>
                  <div class="tmod tinst svara-instrument">
                    <span class="tinst__label">VR / AR READY</span>
                    <div class="chain-h"><template v-for="(x, i) in XR_CHAIN" :key="x"><span class="chain-h__n" :class="{ 'chain-h__n--on': i > 0 }">{{ x }}</span><span v-if="i < XR_CHAIN.length - 1" class="chain-h__l" aria-hidden="true">→</span></template></div>
                  </div>
                </div>
              </section>

              <!-- SVARA ECOSYSTEM -->
              <section class="tsec">
                <div class="tsec__head"><span class="tlabel">SVARA Ecosystem</span><h2 class="tsec__title">The twin doesn’t work alone.</h2></div>
                <div class="eco">
                  <div class="eco__ring" aria-hidden="true" />
                  <span class="eco__center">DIGITAL<br>TWIN CORE</span>
                  <span v-for="(s, i) in ECO_SYSTEMS" :key="s" class="eco__node" :style="{ '--i': i, '--n': ECO_SYSTEMS.length }">{{ s }}</span>
                </div>
                <p class="tbody eco__copy">Every connected system <b>feeds data into the twin</b> and <b>consumes twin data</b> — a continuous, bidirectional intelligence loop.</p>
              </section>

              <!-- DIFFERENTIATORS + NO-CODE -->
              <section class="tsec">
                <div class="tsec__head"><span class="tlabel">Differentiators</span><h2 class="tsec__title">Not a static model. A living twin.</h2></div>
                <div class="grid2">
                  <div v-for="d in DIFFERENTIATORS" :key="d.n" class="diff tinst svara-instrument">
                    <span class="tinst__label">{{ d.n }} / {{ d.k }}</span>
                    <div v-if="d.trad.length" class="diff__row"><span class="tlabel">Traditional</span><div class="caps"><span v-for="t in d.trad" :key="t" class="tchip">{{ t }}</span></div></div>
                    <div class="diff__row"><span class="tlabel tlabel--cy">SVARA</span><div class="caps"><span v-for="s in d.svara" :key="s" class="tchip tchip--on">{{ s }}</span></div></div>
                  </div>
                </div>
                <div class="tsec__head tsec__head--mini"><span class="tlabel tlabel--cy">No-code twin builder</span></div>
                <div class="builder tinst svara-instrument">
                  <span class="tinst__label">DRAG · DROP · BUILD</span>
                  <div class="caps builder__blocks"><span v-for="b in BUILDER_BLOCKS" :key="b" class="tchip">{{ b }}</span></div>
                  <span class="builder__down" aria-hidden="true">↓</span>
                  <div class="builder__out">BUILD TWIN</div>
                  <p class="tsim">◦ NO-CODE BUILDER FOR OPERATIONS · ADVANCED API FOR ENGINEERING</p>
                </div>
              </section>

              <!-- VERTICALS -->
              <section class="tsec">
                <div class="tsec__head"><span class="tlabel">Target Verticals</span><h2 class="tsec__title">Six worlds. One twin engine.</h2></div>
                <div class="vert">
                  <div class="vert__tabs">
                    <button v-for="(v, i) in VERTICALS" :key="v.k" type="button" class="vert__tab" :class="{ 'is-active': activeVertical === i }" @click="activeVertical = i">{{ v.k }}</button>
                  </div>
                  <div class="vert__detail tinst svara-instrument">
                    <span class="tinst__label">ENVIRONMENT / {{ vert.env }}</span>
                    <p class="vert__name">{{ vert.k }}</p>
                    <div class="vert__cols">
                      <div class="vert__col"><span class="tlabel tlabel--cy">Applications</span><span v-for="a in vert.apps" :key="a" class="tchip">{{ a }}</span></div>
                      <div class="vert__col"><span class="tlabel tlabel--cy">Outcome</span><span v-for="o in vert.outcome" :key="o" class="tchip tchip--on">{{ o }}</span></div>
                    </div>
                  </div>
                </div>
                <p class="tsim">◦ SOURCE-PROVIDED OUTCOMES / VALUE DRIVERS</p>
              </section>

              <!-- TECHNICAL ARCHITECTURE -->
              <section class="tsec">
                <div class="tsec__head"><span class="tlabel">Technical Architecture</span><h2 class="tsec__title">Under the twin.</h2></div>
                <div class="arch">
                  <template v-for="(l, i) in ARCH" :key="l.k">
                    <div class="arch__layer tinst svara-instrument">
                      <span class="tinst__label">LAYER / {{ String(i + 1).padStart(2, '0') }}</span>
                      <p class="arch__k">{{ l.k }}</p>
                      <div class="caps"><span v-for="it in l.items" :key="it" class="tchip">{{ it }}</span></div>
                    </div>
                    <span v-if="i < ARCH.length - 1" class="arch__link" aria-hidden="true">↓</span>
                  </template>
                </div>
                <div class="stack">
                  <div v-for="t in TECH_STACK" :key="t.k" class="stack__cell tinst svara-instrument"><span class="stack__k">{{ t.k }}</span><span class="stack__v">{{ t.v }}</span></div>
                </div>
                <div class="api tinst svara-instrument">
                  <span class="tinst__label">API-FIRST · THE TWIN IS NOT A SILO</span>
                  <div class="api__flow"><span class="api__hub">DIGITAL TWIN API</span><span class="api__arrow" aria-hidden="true">→</span><div class="caps"><span v-for="a in API_TARGETS" :key="a" class="tchip tchip--on">{{ a }}</span></div></div>
                </div>
              </section>

              <!-- COMMERCIAL -->
              <section class="tsec">
                <div class="tsec__head"><span class="tlabel">Commercial Model</span><h2 class="tsec__title">Deployment &amp; pricing.</h2></div>
                <div class="grid2">
                  <div v-for="c in COMMERCIAL" :key="c.n" class="comm tinst svara-instrument">
                    <span class="tinst__label">{{ c.n }}</span>
                    <p class="comm__k">{{ c.k }}</p>
                    <ul class="comm__spec"><li v-for="s in c.spec" :key="s">{{ s }}</li></ul>
                    <p class="comm__v">{{ c.v }}</p>
                  </div>
                </div>
              </section>

              <!-- COMMAND CENTRE + FINAL SIM -->
              <section class="tsec">
                <div class="tsec__head"><span class="tlabel">Command Centre</span><h2 class="tsec__title">SVARA Digital Twin Command.</h2></div>
                <div class="cmd tinst svara-instrument">
                  <span class="tinst__label">DIGITAL TWIN COMMAND · LIVE</span>
                  <div class="cmd__tel">
                    <div v-for="t in CMD_TELEMETRY" :key="t.k" class="cmd__cell"><span class="cmd__v">{{ t.v }}</span><span class="cmd__l">{{ t.k }}</span></div>
                  </div>
                  <div class="caps cmd__ring"><span v-for="r in CMD_RING" :key="r" class="tchip tchip--on">{{ r }}</span></div>
                  <p class="tsim">◦ SIMULATED LIVE TELEMETRY</p>
                </div>

                <!-- final simulation -->
                <div class="final tinst svara-instrument">
                  <div class="final__top">
                    <span class="final__q">REAL WORLD → “What if?” · <b>INCREASE DEMAND 20%</b></span>
                    <button type="button" class="trun" @click="runFinal">{{ fnState === 'idle' ? 'RUN SIMULATION' : 'SIMULATING…' }} ↗</button>
                  </div>
                  <div class="chain-h">
                    <template v-for="(c, i) in FINAL_CHAIN" :key="c">
                      <span class="chain-h__n" :class="{ 'chain-h__n--on': fnStep >= i }">{{ c }}</span>
                      <span v-if="i < FINAL_CHAIN.length - 1" class="chain-h__l" aria-hidden="true">→</span>
                    </template>
                  </div>
                  <p class="final__done" :class="{ 'is-on': fnStep >= FINAL_CHAIN.length - 1 }">TESTED VIRTUALLY. <span>READY FOR REALITY.</span></p>
                </div>
              </section>

              <!-- FINAL CTA -->
              <section class="tsec tsec--final">
                <p class="twx__final">Test before you build.<br>Decide before you act.<br><span>Simulate before you risk.</span></p>
                <p class="twx__final-brand">SVARA DIGITAL TWIN PLATFORM · INTERACTIVE AI &amp; SIMULATION</p>
                <div class="twx__final-cta">
                  <NuxtLink to="/contact" class="twx__cta twx__cta--primary" @click="close">BUILD YOUR DIGITAL TWIN <span aria-hidden="true">↗</span></NuxtLink>
                  <NuxtLink to="/contact" class="twx__cta twx__cta--ghost" @click="close">RUN A SIMULATION</NuxtLink>
                  <NuxtLink to="/contact" class="twx__cta twx__cta--ghost" @click="close">TALK TO SVARA</NuxtLink>
                </div>
              </section>

              <footer class="twx__foot">SVARA · DIGITAL TWIN PLATFORM · INTERACTIVE AI &amp; SIMULATION · v1.0</footer>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  </Teleport>
</template>

<style scoped>
.twx {
  position: fixed; inset: 0; z-index: 100000; display: flex; justify-content: center;
  --tw-bg: #05101c; --tw-bg2: #0a1e33; --tw-ink: #e6f2ff; --tw-muted: rgba(178, 206, 232, 0.6);
  --tw-line: rgba(60, 150, 220, 0.26); --tw-blue: #3d8fd8; --tw-cyan: #45dbe6; --tw-green: #4bd68a; --tw-amber: #ffb340;
  color: var(--tw-ink); font-family: var(--font-mono, ui-monospace, monospace);
}
.twx__backdrop { position: absolute; inset: 0; background: rgba(2, 8, 16, 0.68); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); }
.twx__panel {
  position: relative; z-index: 1; width: min(1340px, 100%); height: 100%; display: flex; flex-direction: column; overflow: hidden;
  background: radial-gradient(circle at 14% 5%, rgba(60, 150, 220, 0.13), transparent 30%), radial-gradient(circle at 86% 88%, rgba(69, 219, 230, 0.08), transparent 34%), linear-gradient(160deg, var(--tw-bg2), var(--tw-bg) 58%, #030a14);
  border-left: 1px solid var(--tw-line); border-right: 1px solid var(--tw-line); box-shadow: 0 0 120px -20px rgba(0, 0, 0, 0.84);
}
.twx__progress { position: absolute; top: 0; left: 0; height: 2px; width: 100%; transform-origin: left; background: linear-gradient(90deg, var(--tw-blue), var(--tw-cyan)); z-index: 6; }

.twx__header { flex: 0 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; padding: 14px clamp(16px, 3vw, 34px); border-bottom: 1px solid var(--tw-line); background: linear-gradient(90deg, rgba(6, 16, 28, 0.92), rgba(10, 30, 51, 0.6)); }
.twx__id { display: flex; align-items: center; gap: 13px; min-width: 0; }
.twx__core { position: relative; width: 30px; height: 30px; border: 1px solid var(--tw-blue); display: grid; place-items: center; flex-shrink: 0; clip-path: polygon(0 6px, 6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%); }
.twx__core i { width: 8px; height: 8px; border-radius: 50%; background: var(--tw-cyan); box-shadow: 0 0 12px var(--tw-cyan); animation: twx-pulse 2.2s ease-in-out infinite; }
.twx__id-title { margin: 0; font-size: 12.5px; font-weight: 700; letter-spacing: 0.13em; color: #fff; }
.twx__id-sub { margin: 2px 0 0; font-size: 9px; letter-spacing: 0.16em; color: var(--tw-muted); }
.twx__status { display: inline-flex; align-items: center; gap: 7px; margin-left: 6px; font-size: 9.5px; letter-spacing: 0.13em; color: var(--tw-green); }
.twx__status i { width: 6px; height: 6px; border-radius: 50%; background: var(--tw-green); box-shadow: 0 0 10px var(--tw-green); }
.twx__head-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.twx__hstat { display: inline-flex; flex-direction: column; font-size: 8px; letter-spacing: 0.1em; color: var(--tw-cyan); line-height: 1.4; }
.twx__hstat b { color: var(--tw-muted); font-weight: 500; }
.twx__close { display: inline-flex; align-items: center; gap: 7px; padding: 9px 15px; border: 1px solid var(--tw-line); background: rgba(60, 150, 220, 0.06); color: var(--tw-ink); font: inherit; font-size: 10px; letter-spacing: 0.13em; cursor: pointer; transition: background 180ms, border-color 180ms; clip-path: polygon(0 5px, 5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%); }
.twx__close:hover { background: rgba(60, 150, 220, 0.16); border-color: var(--tw-blue); }

.twx__scroll { flex: 1 1 auto; min-height: 0; overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--tw-blue) transparent; }
.twx__scroll::-webkit-scrollbar { width: 8px; }
.twx__scroll::-webkit-scrollbar-thumb { background: rgba(60, 150, 220, 0.4); border-radius: 8px; }
.twx__inner { max-width: 1140px; margin-inline: auto; padding: clamp(28px, 5vw, 68px) clamp(16px, 3vw, 40px) 60px; }

/* shared primitives */
.tinst { position: relative; padding: 40px 18px 18px; background: rgba(8, 20, 36, 0.5); }
.tinst__label { position: absolute; top: 9px; left: clamp(14px, 2vw, 22px); z-index: 3; font-size: 9px; letter-spacing: 0.16em; color: var(--tw-cyan); pointer-events: none; }
.tlabel { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--tw-muted); }
.tlabel--cy { color: var(--tw-cyan); }
.tchip { display: inline-flex; align-items: center; padding: 7px 12px; font-size: 10px; letter-spacing: 0.05em; color: var(--tw-ink); border: 1px solid var(--tw-line); background: rgba(60, 150, 220, 0.05); }
.tchip--on { color: var(--tw-cyan); border-color: var(--tw-blue); background: rgba(60, 150, 220, 0.1); }
.tsim { margin: 14px 0 0; font-size: 8.5px; letter-spacing: 0.14em; color: var(--tw-muted); }
.tbody { margin: 16px 0 0; max-width: 66ch; font-size: 12.5px; line-height: 1.7; color: var(--tw-muted); }
.tbody b { color: var(--tw-cyan); }
.caps { display: flex; flex-wrap: wrap; gap: 8px; }
.tsec { padding: clamp(34px, 5vw, 60px) 0; border-top: 1px solid rgba(60, 150, 220, 0.12); }
.tsec--hero { border-top: 0; padding-top: 6px; }
.tsec__head { margin-bottom: 24px; }
.tsec__head--mini { margin: 34px 0 16px; }
.tsec__title { margin: 8px 0 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(21px, 3vw, 34px); font-weight: 650; letter-spacing: -0.01em; color: #fff; line-height: 1.12; }
.tsec__title span { color: var(--tw-cyan); }

/* generic chains */
.chain-h { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; }
.chain-h__n { padding: 9px 12px; border: 1px solid var(--tw-line); background: rgba(8, 20, 36, 0.5); font-size: 10px; font-weight: 700; letter-spacing: 0.04em; color: var(--tw-muted); transition: color 260ms, border-color 260ms, background 260ms; }
.chain-h__n--on { color: #fff; border-color: var(--tw-blue); background: rgba(60, 150, 220, 0.12); }
.chain-h__n--amber { color: var(--tw-amber); border-color: rgba(255, 179, 64, 0.5); background: rgba(255, 179, 64, 0.08); }
.chain-h__n--ok { color: var(--tw-green); border-color: var(--tw-green); background: rgba(75, 214, 138, 0.08); }
.chain-h__l { color: var(--tw-blue); transition: color 260ms; }
.chain-v { display: flex; flex-direction: column; gap: 5px; }
.chain-v--tight { gap: 4px; }
.chain-v__n { text-align: center; padding: 9px; border: 1px solid var(--tw-line); background: rgba(8, 20, 36, 0.5); font-size: 10px; font-weight: 700; letter-spacing: 0.04em; color: var(--tw-ink); }
.chain-v__n--amber { color: var(--tw-amber); border-color: rgba(255, 179, 64, 0.5); }
.chain-v__l { text-align: center; color: var(--tw-blue); }

/* HERO */
.twx__lede { margin: 12px 0 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(30px, 5.4vw, 64px); font-weight: 600; line-height: 1.03; letter-spacing: -0.02em; color: #fff; }
.twx__lede-line { display: block; opacity: 0; transform: translateY(14px); filter: blur(6px); animation: twx-line-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: calc(var(--d) * 160ms + 200ms); }
.twx__lede-line--accent { color: var(--tw-cyan); }
.twx__hero-say { margin: 20px 0 0; font-size: 13px; letter-spacing: 0.04em; color: var(--tw-cyan); }
.twx__hero-copy { margin: 14px 0 30px; max-width: 66ch; font-size: 13.5px; line-height: 1.7; color: var(--tw-muted); }

/* split physical/digital */
.split__grid { display: grid; grid-template-columns: 1fr auto 1fr; align-items: stretch; gap: 12px; margin-bottom: 18px; }
.split__cap { display: block; font-size: 8px; letter-spacing: 0.2em; color: var(--tw-muted); margin-bottom: 8px; }
.split__cap--cy { color: var(--tw-cyan); }
.split__frame { display: flex; flex-wrap: wrap; gap: 6px; padding: 14px; border: 1px solid var(--tw-line); min-height: 120px; align-content: flex-start; }
.split__frame--dig { border-color: var(--tw-cyan); background: linear-gradient(180deg, rgba(69, 219, 230, 0.06), transparent), repeating-linear-gradient(0deg, rgba(69, 219, 230, 0.05) 0 1px, transparent 1px 18px); }
.split__el { padding: 6px 9px; border: 1px solid var(--tw-line); font-size: 8.5px; font-weight: 700; letter-spacing: 0.04em; color: var(--tw-ink); }
.split__el--dig { color: var(--tw-cyan); border-color: rgba(69, 219, 230, 0.4); }
.split__bridge { position: relative; width: 40px; display: grid; place-items: center; }
.split__bridge::before { content: ''; position: absolute; top: 40%; bottom: 0; width: 1px; background: linear-gradient(180deg, var(--tw-blue), transparent); }
.split__mid { font-size: 8px; letter-spacing: 0.16em; color: var(--tw-muted); transform: rotate(90deg); }
.split__pulse { position: absolute; top: 20%; width: 6px; height: 6px; border-radius: 50%; background: var(--tw-cyan); box-shadow: 0 0 10px var(--tw-cyan); animation: twx-flow 2.4s cubic-bezier(0.5, 0, 0.5, 1) infinite; }
.split__pairs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
.split__pair { display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border: 1px solid var(--tw-line); background: rgba(60, 150, 220, 0.04); font-size: 9.5px; font-weight: 700; letter-spacing: 0.03em; color: var(--tw-cyan); }
.split__pair b { color: var(--tw-ink); font-weight: 700; }
.split__pair i { color: var(--tw-blue); font-style: normal; }
.split__boot { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
.split__boot-cell { display: inline-flex; flex-direction: column; gap: 3px; padding: 10px; border: 1px solid var(--tw-line); background: rgba(60, 150, 220, 0.04); font-size: 8.5px; letter-spacing: 0.08em; color: var(--tw-green); text-align: center; }
.split__boot-cell b { color: var(--tw-muted); font-weight: 500; font-size: 8px; letter-spacing: 0.1em; }

/* FEED */
.feed__flow { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.feed__node { padding: 12px 18px; border: 1px solid var(--tw-line); background: rgba(8, 20, 36, 0.5); font-size: 11px; font-weight: 700; letter-spacing: 0.06em; color: var(--tw-ink); text-align: center; }
.feed__node--core { border-color: var(--tw-blue); background: rgba(60, 150, 220, 0.1); color: var(--tw-cyan); }
.feed__node--out { border-color: var(--tw-cyan); color: var(--tw-cyan); }
.feed__inputs { justify-content: center; }
.feed__down { color: var(--tw-blue); }

/* REAL-TIME */
.rt__metrics { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 8px; }
.rt__cell { display: flex; flex-direction: column; gap: 5px; align-items: center; text-align: center; padding: 12px 8px; border: 1px solid var(--tw-line); background: rgba(60, 150, 220, 0.04); }
.rt__v { font-size: 12.5px; font-weight: 700; color: #fff; font-variant-numeric: tabular-nums; }
.rt__l { font-size: 8px; letter-spacing: 0.08em; color: var(--tw-muted); }
.layers { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 14px; }
.layers__tabs { display: flex; flex-direction: column; gap: 8px; }
.layers__tab { padding: 14px 15px; background: rgba(8, 20, 36, 0.5); border: 1px solid transparent; color: var(--tw-muted); font: inherit; font-size: 11px; letter-spacing: 0.05em; text-align: left; cursor: pointer; transition: color 180ms, background 180ms, border-color 180ms; }
.layers__tab.is-active { color: #fff; background: rgba(60, 150, 220, 0.08); border-color: var(--tw-line); }
.bidi__row { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
.bidi__val { font-size: clamp(24px, 4vw, 40px); font-weight: 700; color: var(--tw-cyan); font-variant-numeric: tabular-nums; }
.bidi__val i { font-size: 0.5em; font-style: normal; color: var(--tw-muted); }
.bidi__slider { flex: 1; accent-color: var(--tw-cyan); height: 4px; cursor: pointer; }
.bidi__flow { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; opacity: 0.4; transition: opacity 300ms; }
.bidi__flow.is-on { opacity: 1; }
.bidi__step { padding: 9px 13px; border: 1px solid var(--tw-line); font-size: 10px; font-weight: 700; letter-spacing: 0.05em; color: var(--tw-ink); }
.bidi__step--auth { color: var(--tw-green); border-color: var(--tw-green); }
.bidi__arrow { color: var(--tw-blue); }

/* HISTORICAL REPLAY */
.replay__track { display: flex; align-items: center; margin: 6px 0 22px; }
.replay__pt { display: flex; flex-direction: column; align-items: center; gap: 8px; font: inherit; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; color: var(--tw-muted); background: none; border: 0; cursor: pointer; transition: color 180ms; }
.replay__pt i { width: 12px; height: 12px; border-radius: 50%; border: 1px solid var(--tw-line); background: rgba(8, 20, 36, 0.8); transition: background 180ms, border-color 180ms; }
.replay__pt.is-active { color: var(--tw-cyan); }
.replay__pt.is-active i { background: var(--tw-cyan); border-color: var(--tw-cyan); box-shadow: 0 0 12px var(--tw-cyan); }
.replay__seg { flex: 1; height: 1px; background: var(--tw-line); margin: 0 6px; align-self: flex-start; margin-top: 6px; }
.replay__state { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.replay__badge { padding: 10px 14px; border: 1px solid var(--tw-line); font-size: 10.5px; font-weight: 700; letter-spacing: 0.06em; color: var(--tw-ink); }
.replay__badge--cy { color: var(--tw-cyan); border-color: var(--tw-blue); }
.replay__arrow { color: var(--tw-blue); }

/* ANOMALY */
.anom { transition: border-color 300ms; }
.anom.is-alert { box-shadow: inset 0 0 0 1px rgba(255, 179, 64, 0.5); }
.anom__top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
.anom__cols { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; }
.anom__k { display: block; font-size: 9px; letter-spacing: 0.1em; color: var(--tw-muted); margin-bottom: 8px; }
.anom__bar { display: block; height: 44px; border: 1px solid var(--tw-line); }
.anom__bar--ok { background: repeating-linear-gradient(90deg, rgba(75, 214, 138, 0.16) 0 3px, transparent 3px 8px); border-color: rgba(75, 214, 138, 0.4); }
.anom__bar--alert { background: repeating-linear-gradient(90deg, rgba(255, 179, 64, 0.2) 0 3px, transparent 3px 6px); border-color: var(--tw-amber); animation: twx-flick 1.1s steps(2) infinite; }
.anom__msg { margin: 0; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; color: var(--tw-muted); }
.anom__msg.is-on { color: var(--tw-amber); }

/* SCENARIO */
.scen { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 14px; }
.scen__tabs { display: flex; flex-direction: column; gap: 8px; }
.scen__tab { display: flex; flex-direction: column; gap: 3px; padding: 13px 15px; background: rgba(8, 20, 36, 0.5); border: 1px solid transparent; color: var(--tw-muted); font: inherit; font-size: 10.5px; letter-spacing: 0.04em; text-align: left; cursor: pointer; transition: color 180ms, background 180ms, border-color 180ms; }
.scen__tab b { color: var(--tw-cyan); font-size: 11px; }
.scen__tab.is-active { color: #fff; background: rgba(60, 150, 220, 0.08); border-color: var(--tw-line); }
.scen__name { margin: 0 0 4px; font-family: var(--font-sans, system-ui, sans-serif); font-size: 20px; font-weight: 650; color: #fff; }
.mc__fan { position: relative; height: 90px; margin-bottom: 14px; }
.mc__path { position: absolute; left: 50%; bottom: 0; width: 40%; height: 1px; transform-origin: left center; background: linear-gradient(90deg, var(--tw-blue), transparent); transform: rotate(calc((var(--i) - 6.5) * 6deg)); opacity: 0.5; }
.mc__dist { display: flex; align-items: flex-end; justify-content: center; gap: 5px; height: 100px; padding-top: 6px; border-top: 1px solid var(--tw-line); }
.mc__bar { width: 22px; height: calc(var(--h) * 1%); background: linear-gradient(180deg, var(--tw-cyan), rgba(69, 219, 230, 0.2)); }
.emerg { transition: box-shadow 300ms; }
.emerg.is-live { box-shadow: inset 0 0 0 1px rgba(255, 179, 64, 0.5); }
.emerg__top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.emerg__tabs { display: flex; flex-wrap: wrap; gap: 8px; }
.emerg__tab { padding: 9px 13px; background: rgba(8, 20, 36, 0.5); border: 1px solid transparent; color: var(--tw-muted); font: inherit; font-size: 10px; letter-spacing: 0.05em; cursor: pointer; transition: color 180ms, border-color 180ms; }
.emerg__tab.is-active { color: var(--tw-amber); border-color: rgba(255, 179, 64, 0.5); }
.emerg__note { margin: 16px 0 0; font-size: 11px; letter-spacing: 0.05em; color: var(--tw-muted); }
.emerg__note b { color: var(--tw-green); }
.scen__extra { margin-top: 20px; }
.tmod__gap { margin-top: 10px; }

/* WHAT-IF */
.whatif__top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
.whatif__q { font-size: 13px; font-style: italic; color: var(--tw-ink); }
.whatif__params { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
.whatif__param { padding: 9px 13px; background: rgba(8, 20, 36, 0.5); border: 1px solid transparent; color: var(--tw-muted); font: inherit; font-size: 10px; letter-spacing: 0.05em; cursor: pointer; transition: color 180ms, border-color 180ms, background 180ms; }
.whatif__param.is-active { color: #fff; border-color: var(--tw-line); background: rgba(60, 150, 220, 0.08); }

/* PREDICTIVE / modules */
.grid3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.grid2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.tmod__badge { margin: 12px 0 0; padding: 8px 10px; border: 1px solid rgba(255, 179, 64, 0.5); background: rgba(255, 179, 64, 0.08); font-size: 9.5px; font-weight: 700; letter-spacing: 0.06em; color: var(--tw-amber); }
.tmod__note { margin: 10px 0 0; font-size: 10px; letter-spacing: 0.04em; color: var(--tw-green); }

/* TRAINING */
.train__extra { margin-top: 12px; }
.collab { display: flex; flex-wrap: wrap; gap: 8px; }
.collab__u { display: inline-flex; flex-direction: column; gap: 2px; padding: 8px 11px; border: 1px solid var(--tw-line); background: rgba(60, 150, 220, 0.04); font-size: 9.5px; font-weight: 700; color: var(--tw-cyan); }
.collab__u b { color: var(--tw-ink); font-size: 8px; letter-spacing: 0.08em; font-weight: 500; }

/* ECOSYSTEM */
.eco { position: relative; height: 300px; display: grid; place-items: center; margin-bottom: 8px; }
.eco__ring { position: absolute; width: 220px; height: 220px; border-radius: 50%; border: 1px dashed var(--tw-line); }
.eco__center { position: relative; z-index: 2; display: grid; place-items: center; width: 128px; height: 128px; border-radius: 50%; border: 1px solid var(--tw-blue); background: rgba(60, 150, 220, 0.1); font-size: 10.5px; font-weight: 700; letter-spacing: 0.06em; color: var(--tw-cyan); text-align: center; line-height: 1.4; box-shadow: 0 0 50px -12px rgba(60, 150, 220, 0.7); }
.eco__node { position: absolute; padding: 9px 12px; border: 1px solid var(--tw-line); background: rgba(8, 20, 36, 0.92); font-size: 9.5px; font-weight: 700; letter-spacing: 0.04em; color: var(--tw-ink); transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-140px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
.eco__copy { margin-inline: auto; text-align: center; }

/* DIFFERENTIATORS / BUILDER */
.diff__row { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-top: 12px; }
.diff__row > .tlabel { flex: 0 0 84px; }
.builder { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; }
.builder__blocks { justify-content: center; }
.builder__down { color: var(--tw-blue); }
.builder__out { padding: 13px 26px; border: 1px solid var(--tw-cyan); background: rgba(69, 219, 230, 0.08); font-size: 12px; font-weight: 700; letter-spacing: 0.08em; color: var(--tw-cyan); }

/* VERTICALS */
.vert { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 14px; }
.vert__tabs { display: flex; flex-direction: column; gap: 8px; }
.vert__tab { padding: 14px 15px; background: rgba(8, 20, 36, 0.5); border: 1px solid transparent; color: var(--tw-muted); font: inherit; font-size: 11px; letter-spacing: 0.04em; text-align: left; cursor: pointer; transition: color 180ms, background 180ms, border-color 180ms; }
.vert__tab.is-active { color: #fff; background: rgba(60, 150, 220, 0.08); border-color: var(--tw-line); }
.vert__name { margin: 0 0 14px; font-family: var(--font-sans, system-ui, sans-serif); font-size: 20px; font-weight: 650; color: #fff; }
.vert__cols { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.vert__col { display: flex; flex-wrap: wrap; gap: 8px; align-content: start; }
.vert__col > .tlabel { flex: 1 0 100%; margin-bottom: 2px; }

/* ARCHITECTURE */
.arch { display: flex; flex-direction: column; align-items: stretch; gap: 6px; }
.arch__k { margin: 0 0 10px; font-size: 12.5px; font-weight: 700; letter-spacing: 0.06em; color: #fff; }
.arch__link { align-self: center; color: var(--tw-blue); font-size: 15px; }
.stack { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 16px; }
.stack__cell { display: flex; flex-direction: column; gap: 6px; padding-top: 30px; }
.stack__k { font-size: 9px; letter-spacing: 0.12em; color: var(--tw-muted); }
.stack__v { font-size: 12px; font-weight: 700; color: var(--tw-cyan); }
.api { margin-top: 16px; }
.api__flow { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.api__hub { padding: 12px 18px; border: 1px solid var(--tw-blue); background: rgba(60, 150, 220, 0.1); font-size: 11px; font-weight: 700; letter-spacing: 0.06em; color: var(--tw-cyan); }
.api__arrow { color: var(--tw-blue); }

/* COMMERCIAL */
.comm { display: flex; flex-direction: column; }
.comm__k { margin: 0 0 12px; font-size: 12.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--tw-cyan); }
.comm__spec { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 6px; }
.comm__spec li { position: relative; padding-left: 14px; font-size: 11px; line-height: 1.5; color: var(--tw-muted); }
.comm__spec li::before { content: '›'; position: absolute; left: 0; color: var(--tw-cyan); }
.comm__v { margin: 16px 0 0; font-size: clamp(15px, 2vw, 22px); font-weight: 700; color: #fff; }

/* COMMAND CENTRE */
.cmd__tel { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 10px; margin-bottom: 16px; }
.cmd__cell { display: flex; flex-direction: column; gap: 6px; align-items: center; text-align: center; padding: 12px 8px; border: 1px solid var(--tw-line); background: rgba(60, 150, 220, 0.04); }
.cmd__v { font-size: 13px; font-weight: 700; color: var(--tw-cyan); }
.cmd__l { font-size: 8px; letter-spacing: 0.08em; color: var(--tw-muted); }
.cmd__ring { justify-content: center; }
.final { margin-top: 12px; }
.final__top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
.final__q { font-size: 12.5px; letter-spacing: 0.03em; color: var(--tw-ink); }
.final__q b { color: var(--tw-cyan); }
.final__done { margin: 16px 0 0; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; color: var(--tw-muted); opacity: 0.5; transition: opacity 400ms; }
.final__done.is-on { opacity: 1; }
.final__done span { color: var(--tw-green); }

/* trun buttons */
.trun { flex: none; padding: 9px 14px; border: 1px solid var(--tw-blue); background: rgba(60, 150, 220, 0.1); color: var(--tw-cyan); font: inherit; font-size: 10px; letter-spacing: 0.09em; cursor: pointer; transition: background 180ms; }
.trun:hover { background: rgba(60, 150, 220, 0.2); }
.trun--amber { border-color: rgba(255, 179, 64, 0.6); color: var(--tw-amber); background: rgba(255, 179, 64, 0.08); }
.trun--amber:hover { background: rgba(255, 179, 64, 0.16); }

/* FINAL */
.tsec--final { text-align: center; border-top: 1px solid var(--tw-line); }
.twx__final { margin: 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(24px, 4vw, 46px); font-weight: 600; line-height: 1.14; color: #fff; }
.twx__final span { color: var(--tw-cyan); }
.twx__final-brand { margin: 22px 0 0; font-size: 11px; letter-spacing: 0.16em; color: var(--tw-muted); }
.twx__final-cta { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 26px; }
.twx__cta { display: inline-flex; align-items: center; gap: 10px; padding: 15px 26px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-decoration: none; }
.twx__cta--primary { background: var(--tw-blue); color: #04101c; }
.twx__cta--ghost { background: transparent; color: var(--tw-ink); border: 1px solid var(--tw-line); }
.twx__foot { margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(60, 150, 220, 0.12); text-align: center; font-size: 9px; letter-spacing: 0.2em; color: var(--tw-muted); }

@keyframes twx-pulse { 50% { opacity: 0.4; } }
@keyframes twx-line-in { to { opacity: 1; transform: translateY(0); filter: blur(0); } }
@keyframes twx-flow { 0% { top: 20%; opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { top: 85%; opacity: 0; } }
@keyframes twx-flick { 50% { opacity: 0.5; } }

/* ── responsive ── */
@media (max-width: 900px) {
  .grid3, .rt__metrics, .cmd__tel, .split__boot { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid2, .layers, .scen, .vert, .stack, .anom__cols { grid-template-columns: 1fr; }
  .split__grid { grid-template-columns: 1fr; }
  .split__bridge { width: auto; height: 28px; }
  .split__bridge::before { top: auto; left: 40%; right: 0; height: 1px; width: auto; }
  .split__mid { transform: none; }
  .layers__tabs, .vert__tabs, .scen__tabs { flex-direction: row; flex-wrap: wrap; }
  .vert__cols { grid-template-columns: 1fr; }
  .twx__hstat { display: none; }
}
@media (max-width: 560px) {
  .grid3, .grid2, .rt__metrics, .cmd__tel, .split__boot { grid-template-columns: 1fr; }
  .twx__id-sub { display: none; }
  .eco { height: 270px; }
  .eco__node { transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-116px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
  .mc__bar { width: 14px; }
}
@media (prefers-reduced-motion: reduce) {
  .twx__core i, .split__pulse, .anom__bar--alert { animation: none; }
  .twx__lede-line { animation: none; opacity: 1; transform: none; filter: none; }
  .chain-h__n, .chain-h__l, .bidi__flow, .final__done, .emerg { transition: none; }
}
</style>
