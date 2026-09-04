<script setup lang="ts">
// SVARA VISION INTELLIGENCE — immersive full-screen product experience opened from the
// Vision AI card's "Explore" control. NOT a modal: a fixed overlay (Teleported to body,
// z-index above everything) that expands in over a dimmed/blurred page, with its OWN
// scroll container (the page behind is scroll-locked). Closing hides it → the products
// page keeps its exact position (no route change). All copy is verbatim from the Vision
// Intelligence source; nothing invented. Dark navy "vision system" palette, SVARA
// instrument/HUD language, mono type. Reduced-motion aware.
import { ref, watch, computed, onBeforeUnmount, nextTick } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { useVisionExplore } from '~/composables/useVisionExplore'
import ProductDashboard from '~/components/products/worlds/ProductDashboard.vue'

const { open, closeExplore } = useVisionExplore()

// ── content (verbatim from source) ──────────────────────────────────────────
const LAYERS = [
  { n: '01', title: 'DETECT', sub: 'Perception', body: 'Continuously scans feeds in parallel and identifies persons, vehicles, objects, fire, smoke, PPE violations, restricted items and abnormal crowd density.' },
  { n: '02', title: 'INTERPRET', sub: 'Understanding', body: 'Analyzes behaviour and contextual scene information including loitering, trespassing, falls, running, aggression and safety compliance violations.' },
  { n: '03', title: 'ALERT', sub: 'Real-Time Response', body: 'Triggers notifications to control rooms, mobile apps, SMS, email, PA systems and integrated emergency platforms.' },
  { n: '04', title: 'ANALYZE', sub: 'Intelligence', body: 'Transforms incident data into heatmaps, compliance metrics, risk-zone scores, activity patterns and incident reports.' },
  { n: '05', title: 'PREDICT', sub: 'Prevention', body: 'Uses historical behavioural patterns, environmental data and ML models to forecast emerging risks.' },
]
const DETECT_GROUPS = [
  { title: 'OBJECT & SCENE DETECTION', items: ['PERSON', 'VEHICLE', 'ANIMAL', 'ABANDONED OBJECT', 'RESTRICTED ITEM', 'FIRE', 'SMOKE', 'LIQUID SPILL', 'PPE'] },
  { title: 'BEHAVIOURAL ANALYSIS', items: ['LOITERING', 'ZONE VIOLATION', 'RUNNING', 'FALL DETECTION', 'AGGRESSIVE BEHAVIOUR', 'CROWD SURGE', 'SUSPICIOUS PATTERNS'] },
  { title: 'PREDICTIVE INTELLIGENCE', items: ['ZONE RISK SCORE', 'INCIDENT PROBABILITY', 'EQUIPMENT STRESS', 'CONGESTION FORECAST', 'EARLY HAZARD SIGNATURE', 'REPEAT-OFFENDER PATTERNS'] },
]
const CAM_METRICS = ['200+ CAMERA FEEDS', 'SUB-300MS DETECTION-TO-ALERT', 'ONVIF COMPATIBLE']
const CAM_TYPES = ['IP / RTSP', 'THERMAL', 'PTZ', '360° PANORAMIC']
const FLOW = ['CAMERAS', 'PERCEPTION', 'INTELLIGENCE', 'ALERT', 'ACTION']
const SAFETY = ['PPE COMPLIANCE', 'RESTRICTED ZONES', 'WORKER SAFETY', 'OCCUPANCY', 'AUDIT EVIDENCE']
const DEPLOY = [
  { id: 'edge', name: 'EDGE-ONLY', lines: ['Local AI inference.', 'Zero cloud dependency.'] },
  { id: 'hybrid', name: 'HYBRID', lines: ['Real-time edge analytics + cloud historical analytics, forensics and reporting.'] },
  { id: 'cloud', name: 'CLOUD-MANAGED', lines: ['Centralized AI processing + managed SaaS dashboard.'] },
]
const INTEGRATIONS = ['PSIM', 'VMS', 'REST API', 'WEBHOOKS', 'MILESTONE', 'GENETEC', 'AXIS', 'SVARA ONE AI OS']
const INDUSTRIES = ['MANUFACTURING', 'SMART CITIES', 'RETAIL & HOSPITALITY', 'TRANSPORTATION', 'HEALTHCARE', 'DATA CENTRES & OFFICES']
const TECH = [
  { k: 'COMPUTER VISION', v: 'YOLOv9 + custom fine-tuned vertical models' },
  { k: 'BEHAVIOURAL AI', v: 'LSTM + Transformer sequence models' },
  { k: 'PREDICTION', v: 'Gradient Boosted Trees + neural ensembles' },
  { k: 'EDGE INFERENCE', v: 'ONNX Runtime + TensorRT / OpenVINO' },
  { k: 'FEDERATED LEARNING', v: 'Privacy-preserving distributed training' },
  { k: 'MULTIMODAL FUSION', v: 'Cross-sensor signal correlation' },
]
const PROOF = [
  { v: '< 30 SEC', l: 'Incident response' },
  { v: '85–92%', l: 'False-positive reduction' },
  { v: '150+', l: 'Cameras managed by one operator' },
  { v: '70%', l: 'Compliance documentation effort reduction' },
]
const SEARCH_QUERY = 'Show me every person wearing a blue jacket near Gate 3 between 14:00–17:00.'
const SEARCH_MATCHES = [
  { cam: 'CAMERA 03', t: '14:32:17' },
  { cam: 'CAMERA 07', t: '14:46:02' },
  { cam: 'CAMERA 12', t: '15:08:41' },
]

// ── interactions ─────────────────────────────────────────────────────────────
const activeDeploy = ref('hybrid')
const activeIndustry = ref(0)

const searchState = ref<'idle' | 'searching' | 'done'>('idle')
const revealed = ref(0)
const timers: ReturnType<typeof setTimeout>[] = []
function runSearch(): void {
  timers.forEach(clearTimeout)
  timers.length = 0
  searchState.value = 'searching'
  revealed.value = 0
  timers.push(setTimeout(() => {
    searchState.value = 'done'
    SEARCH_MATCHES.forEach((_, i) => timers.push(setTimeout(() => { revealed.value = i + 1 }, 500 + i * 650)))
  }, 1100))
}

// ── scroll container + progress + page scroll-lock ──────────────────────────
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
  const lenis = (useNuxtApp().$lenis as { stop?: () => void } | undefined)
  lenis?.stop?.()
  document.documentElement.style.overflow = 'hidden'
}
function unlock(): void {
  if (typeof document === 'undefined') return
  const lenis = (useNuxtApp().$lenis as { start?: () => void } | undefined)
  lenis?.start?.()
  document.documentElement.style.overflow = ''
}
function close(): void { closeExplore() }
function onKey(e: KeyboardEvent): void { if (e.key === 'Escape') close() }

watch(open, (v) => {
  if (typeof document === 'undefined') return
  if (v) {
    lock()
    document.addEventListener('keydown', onKey)
    nextTick(() => { if (scroller.value) scroller.value.scrollTop = 0; progress.value = 0; searchState.value = 'idle'; revealed.value = 0 })
  } else {
    unlock()
    document.removeEventListener('keydown', onKey)
  }
})
onBeforeUnmount(() => { unlock(); document.removeEventListener('keydown', onKey); timers.forEach(clearTimeout) })

const activeIndustryName = computed(() => INDUSTRIES[activeIndustry.value])
</script>

<template>
  <Teleport to="body">
    <AnimatePresence>
      <motion.div
        v-if="open"
        class="vex"
        role="dialog"
        aria-modal="true"
        aria-label="SVARA Vision Intelligence"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        :transition="{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }"
      >
        <div class="vex__backdrop" aria-hidden="true" @click="close" />

        <motion.section
          class="vex__panel"
          :initial="{ opacity: 0, scale: 0.96, y: 18 }"
          :animate="{ opacity: 1, scale: 1, y: 0 }"
          :exit="{ opacity: 0, scale: 0.97, y: 12 }"
          :transition="{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }"
        >
          <span class="vex__progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />

          <!-- HEADER -->
          <header class="vex__header">
            <div class="vex__id">
              <span class="vex__core" aria-hidden="true"><i /></span>
              <div>
                <p class="vex__id-title">SVARA VISION INTELLIGENCE</p>
                <p class="vex__id-sub">AI-POWERED CCTV &amp; VIDEO ANALYTICS PLATFORM</p>
              </div>
            </div>
            <div class="vex__head-right">
              <span class="vex__status"><i />SYSTEM ONLINE</span>
              <button type="button" class="vex__close" @click="close">CLOSE <span aria-hidden="true">×</span></button>
            </div>
          </header>

          <div ref="scroller" class="vex__scroll" data-lenis-prevent @scroll="onScroll">
            <div class="vex__inner">
              <!-- INTRO -->
              <section class="vsec vsec--intro">
                <p class="vlabel vlabel--blue">Vision Intelligence</p>
                <h1 class="vex__lede">Cameras don't just record.<br><span>They think.</span></h1>
                <p class="vex__intro-copy">SVARA Vision Intelligence transforms existing or new CCTV infrastructure into an autonomous intelligence network that continuously sees, understands, alerts, analyzes and predicts — without requiring a human to watch every screen.</p>
              </section>

              <!-- the product's own HUD dashboard, in its own section -->
              <ProductDashboard id="vision" />

              <!-- 01 · FIVE INTELLIGENCE LAYERS -->
              <section class="vsec">
                <div class="vsec__head"><span class="vlabel">Section 01</span><h2 class="vsec__title">The Five Intelligence Layers</h2></div>
                <div class="pipe">
                  <div v-for="(l, i) in LAYERS" :key="l.n" class="pipe__stage svara-instrument">
                    <span class="svara-instrument__label">SVARA · L{{ l.n }}</span>
                    <div class="pipe__n vfont-num">{{ l.n }}</div>
                    <p class="pipe__t">{{ l.title }}</p>
                    <p class="vlabel vlabel--blue">{{ l.sub }}</p>
                    <p class="pipe__b">{{ l.body }}</p>
                    <span v-if="i < LAYERS.length - 1" class="pipe__arrow" aria-hidden="true">→</span>
                  </div>
                </div>
              </section>

              <!-- 02 · WHAT IT SEES -->
              <section class="vsec">
                <div class="vsec__head"><span class="vlabel">Section 02</span><h2 class="vsec__title">What It Sees</h2></div>
                <div class="grid3">
                  <div v-for="g in DETECT_GROUPS" :key="g.title" class="dpanel svara-instrument">
                    <span class="svara-instrument__label">MODULE</span>
                    <p class="dpanel__t">{{ g.title }}</p>
                    <ul class="dpanel__items">
                      <li v-for="it in g.items" :key="it"><span class="dpanel__dot" />{{ it }}</li>
                    </ul>
                  </div>
                </div>
              </section>

              <!-- 03 · MULTI-CAMERA INTELLIGENCE -->
              <section class="vsec">
                <div class="vsec__head"><span class="vlabel">Section 03</span><h2 class="vsec__title">Multi-Camera Intelligence</h2></div>
                <div class="mcam svara-instrument">
                  <span class="svara-instrument__label">SVARA · CONVERGENCE ENGINE</span>
                  <div class="mcam__metrics">
                    <div v-for="m in CAM_METRICS" :key="m" class="mcam__metric"><span class="mcam__metric-v">{{ m }}</span></div>
                  </div>
                  <div class="mcam__types">
                    <span v-for="t in CAM_TYPES" :key="t" class="vchip">{{ t }}</span>
                  </div>
                  <div class="flow">
                    <template v-for="(f, i) in FLOW" :key="f">
                      <span class="flow__node">{{ f }}</span>
                      <span v-if="i < FLOW.length - 1" class="flow__link" aria-hidden="true">↓</span>
                    </template>
                  </div>
                </div>
              </section>

              <!-- 04 · SAFETY & COMPLIANCE -->
              <section class="vsec">
                <div class="vsec__head"><span class="vlabel">Section 04</span><h2 class="vsec__title">Safety &amp; Compliance</h2></div>
                <div class="safety">
                  <div v-for="(s, i) in SAFETY" :key="s" class="safety__mod svara-instrument">
                    <span class="svara-instrument__label">0{{ i + 1 }}</span>
                    <p class="safety__t">{{ s }}</p>
                    <span class="safety__bar"><i :style="{ width: (72 + i * 5) + '%' }" /></span>
                  </div>
                </div>
              </section>

              <!-- 05 · AI FORENSIC SEARCH -->
              <section class="vsec">
                <div class="vsec__head"><span class="vlabel">Section 05</span><h2 class="vsec__title">AI Forensic Search</h2></div>
                <div class="fsearch svara-instrument">
                  <span class="svara-instrument__label">NATURAL-LANGUAGE / CROSS-CAMERA</span>
                  <div class="fsearch__bar">
                    <span class="fsearch__q">"{{ SEARCH_QUERY }}"</span>
                    <button type="button" class="fsearch__run" @click="runSearch">{{ searchState === 'idle' ? 'RUN QUERY' : 'RE-RUN' }} ↗</button>
                  </div>
                  <div class="fsearch__status">
                    <span v-if="searchState === 'searching'" class="fsearch__searching">SEARCHING 200+ CAMERAS<i /><i /><i /></span>
                    <span v-else-if="searchState === 'done'" class="fsearch__match">● MATCH FOUND</span>
                    <span v-else class="fsearch__idle">AWAITING QUERY</span>
                  </div>
                  <ul class="fsearch__results">
                    <li v-for="(m, i) in SEARCH_MATCHES" :key="m.cam" class="fsearch__hit" :class="{ 'is-in': revealed > i }">
                      <span class="fsearch__cam">{{ m.cam }}</span><span class="fsearch__t">{{ m.t }}</span>
                    </li>
                  </ul>
                  <div class="fsearch__caps">
                    <span class="vchip">Natural-language search</span><span class="vchip">Cross-camera tracking</span>
                    <span class="vchip">Object movement reconstruction</span><span class="vchip">Incident evidence compilation</span>
                  </div>
                </div>
              </section>

              <!-- 06 · DEPLOYMENT ARCHITECTURE -->
              <section class="vsec">
                <div class="vsec__head"><span class="vlabel">Section 06</span><h2 class="vsec__title">Deployment Architecture</h2></div>
                <div class="deploy">
                  <div class="deploy__tabs">
                    <button v-for="d in DEPLOY" :key="d.id" type="button" class="deploy__tab" :class="{ 'is-active': activeDeploy === d.id }" @click="activeDeploy = d.id">{{ d.name }}</button>
                  </div>
                  <div class="deploy__panel svara-instrument">
                    <span class="svara-instrument__label">MODE / {{ activeDeploy.toUpperCase() }}</span>
                    <template v-for="d in DEPLOY" :key="d.id">
                      <div v-if="activeDeploy === d.id" class="deploy__body">
                        <p class="deploy__name">{{ d.name }}</p>
                        <p v-for="ln in d.lines" :key="ln" class="deploy__line">{{ ln }}</p>
                      </div>
                    </template>
                  </div>
                </div>
              </section>

              <!-- 07 · ENTERPRISE INTEGRATION -->
              <section class="vsec">
                <div class="vsec__head"><span class="vlabel">Section 07</span><h2 class="vsec__title">Enterprise Integration</h2></div>
                <div class="integ">
                  <span class="integ__core">VISION<br>INTELLIGENCE</span>
                  <div class="integ__nodes">
                    <span v-for="s in INTEGRATIONS" :key="s" class="integ__node svara-instrument">{{ s }}</span>
                  </div>
                </div>
              </section>

              <!-- 08 · INDUSTRIES -->
              <section class="vsec">
                <div class="vsec__head"><span class="vlabel">Section 08</span><h2 class="vsec__title">Industries</h2></div>
                <div class="ind">
                  <div class="ind__tabs">
                    <button v-for="(n, i) in INDUSTRIES" :key="n" type="button" class="ind__tab svara-instrument" :class="{ 'is-active': activeIndustry === i }" @click="activeIndustry = i">
                      <span class="ind__tab-n vfont-num">0{{ i + 1 }}</span>{{ n }}
                    </button>
                  </div>
                  <div class="ind__detail svara-instrument">
                    <span class="svara-instrument__label">DEPLOYMENT / {{ activeIndustryName }}</span>
                    <p class="ind__detail-t">{{ activeIndustryName }}</p>
                    <p class="ind__detail-b">SVARA Vision Intelligence deployed across {{ activeIndustryName?.toLowerCase() }} environments — continuous perception, behavioural understanding, real-time alerting and predictive prevention across every camera feed.</p>
                  </div>
                </div>
              </section>

              <!-- 09 · TECHNOLOGY FOUNDATION -->
              <section class="vsec">
                <div class="vsec__head"><span class="vlabel">Section 09</span><h2 class="vsec__title">Technology Foundation</h2></div>
                <div class="tech">
                  <div v-for="t in TECH" :key="t.k" class="tech__row svara-instrument">
                    <span class="tech__k">{{ t.k }}</span><span class="tech__v">{{ t.v }}</span>
                  </div>
                </div>
              </section>

              <!-- 10 · PROOF OF VALUE -->
              <section class="vsec">
                <div class="vsec__head"><span class="vlabel">Section 10</span><h2 class="vsec__title">Proof of Value</h2></div>
                <div class="proof">
                  <div v-for="p in PROOF" :key="p.l" class="proof__mod svara-instrument">
                    <span class="proof__v vfont-num">{{ p.v }}</span>
                    <span class="proof__l">{{ p.l }}</span>
                  </div>
                </div>
              </section>

              <!-- FINAL -->
              <section class="vsec vsec--final">
                <p class="vex__final">Cameras don't just record.<br>They think.<br>They understand.<br><span>They protect.</span></p>
                <p class="vex__final-brand">SVARA VISION INTELLIGENCE</p>
                <NuxtLink to="/contact" class="vex__cta hx-btn" @click="close">CONNECT WITH SVARA <span aria-hidden="true">↗</span></NuxtLink>
              </section>

              <footer class="vex__foot">SVARA · VISION INTELLIGENCE · LIVE · v1.0</footer>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  </Teleport>
</template>

<style scoped>
.vex {
  position: fixed; inset: 0; z-index: 100000;
  display: flex; align-items: stretch; justify-content: center;
  --vx-bg: #050b18; --vx-bg2: #0a1730; --vx-ink: #eaf6ff;
  --vx-muted: rgba(190, 214, 245, 0.62); --vx-line: rgba(107, 166, 255, 0.28);
  --vx-cyan: #59e3ff; --vx-blue: #6ba6ff;
  color: var(--vx-ink);
  font-family: var(--font-mono, ui-monospace, monospace);
}
.vex__backdrop { position: absolute; inset: 0; background: rgba(3, 8, 20, 0.62); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); }

.vex__panel {
  position: relative; z-index: 1;
  width: min(1320px, 100%); height: 100%;
  display: flex; flex-direction: column;
  background:
    radial-gradient(circle at 16% 6%, rgba(89, 227, 255, 0.10), transparent 30%),
    radial-gradient(circle at 88% 82%, rgba(77, 141, 255, 0.10), transparent 34%),
    linear-gradient(160deg, var(--vx-bg2), var(--vx-bg) 60%, #03060f);
  border-left: 1px solid var(--vx-line); border-right: 1px solid var(--vx-line);
  box-shadow: 0 0 120px -20px rgba(0, 0, 0, 0.8);
  overflow: hidden;
}
.vex__progress { position: absolute; top: 0; left: 0; height: 2px; width: 100%; transform-origin: left; background: linear-gradient(90deg, var(--vx-cyan), var(--vx-blue)); z-index: 5; }

/* header */
.vex__header { flex: 0 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px clamp(16px, 3vw, 34px); border-bottom: 1px solid var(--vx-line); background: linear-gradient(90deg, rgba(7, 16, 31, 0.9), rgba(12, 29, 55, 0.6)); }
.vex__id { display: flex; align-items: center; gap: 14px; min-width: 0; }
.vex__core { position: relative; width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--vx-cyan); display: grid; place-items: center; flex-shrink: 0; }
.vex__core i { width: 8px; height: 8px; border-radius: 50%; background: var(--vx-cyan); box-shadow: 0 0 12px var(--vx-cyan); animation: vex-pulse 2.4s ease-in-out infinite; }
.vex__id-title { margin: 0; font-size: 13px; font-weight: 700; letter-spacing: 0.14em; color: #fff; }
.vex__id-sub { margin: 2px 0 0; font-size: 9px; letter-spacing: 0.16em; color: var(--vx-muted); }
.vex__head-right { display: flex; align-items: center; gap: 14px; }
.vex__status { display: inline-flex; align-items: center; gap: 7px; font-size: 9.5px; letter-spacing: 0.14em; color: var(--vx-cyan); }
.vex__status i { width: 6px; height: 6px; border-radius: 50%; background: var(--vx-cyan); box-shadow: 0 0 10px var(--vx-cyan); }
.vex__close { display: inline-flex; align-items: center; gap: 7px; padding: 9px 15px; border: 1px solid var(--vx-line); background: rgba(107, 166, 255, 0.06); color: var(--vx-ink); font: inherit; font-size: 10px; letter-spacing: 0.14em; cursor: pointer; transition: background 180ms ease, border-color 180ms ease; }
.vex__close:hover { background: rgba(107, 166, 255, 0.16); border-color: var(--vx-cyan); }

/* scroll container — the ONLY scroller */
.vex__scroll { flex: 1 1 auto; min-height: 0; overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--vx-blue) transparent; }
.vex__scroll::-webkit-scrollbar { width: 8px; }
.vex__scroll::-webkit-scrollbar-thumb { background: rgba(107, 166, 255, 0.4); border-radius: 8px; }
.vex__inner { max-width: 1120px; margin-inline: auto; padding: clamp(28px, 5vw, 72px) clamp(16px, 3vw, 40px) 60px; }

/* shared bits */
.vlabel { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--vx-muted); }
.vlabel--blue { color: var(--vx-cyan); }
.vfont-num { font-variant-numeric: tabular-nums; }
.vchip { display: inline-flex; align-items: center; padding: 6px 11px; font-size: 10px; letter-spacing: 0.06em; color: var(--vx-ink); border: 1px solid var(--vx-line); background: rgba(107, 166, 255, 0.05); }
.vsec { padding: clamp(34px, 5vw, 64px) 0; border-top: 1px solid rgba(107, 166, 255, 0.12); }
.vsec--intro { border-top: 0; padding-top: 8px; }
.vsec__head { margin-bottom: 26px; }
.vsec__title { margin: 8px 0 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(22px, 3vw, 36px); font-weight: 650; letter-spacing: -0.01em; color: #fff; }

/* intro */
.vex__lede { margin: 12px 0 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(30px, 5.4vw, 66px); font-weight: 600; line-height: 1.02; letter-spacing: -0.02em; color: #fff; }
.vex__lede span { color: var(--vx-cyan); }
.vex__intro-copy { margin: 22px 0 0; max-width: 62ch; font-size: 13.5px; line-height: 1.7; color: var(--vx-muted); }

/* 01 pipeline */
.pipe { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px; }
.pipe__stage { position: relative; padding: 40px 16px 18px; background: rgba(8, 18, 40, 0.5); }
.pipe__n { font-size: 22px; font-weight: 700; color: var(--vx-cyan); }
.pipe__t { margin: 8px 0 3px; font-size: 13px; font-weight: 700; letter-spacing: 0.06em; color: #fff; }
.pipe__b { margin: 12px 0 0; font-size: 10.5px; line-height: 1.6; color: var(--vx-muted); }
.pipe__arrow { position: absolute; right: -10px; top: 50%; transform: translateY(-50%); z-index: 3; color: var(--vx-blue); font-size: 14px; }

/* 02 grid */
.grid3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
.dpanel { position: relative; padding: 40px 20px 22px; background: rgba(8, 18, 40, 0.5); }
.dpanel__t { margin: 0 0 14px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: var(--vx-cyan); }
.dpanel__items { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 9px; }
.dpanel__items li { display: flex; align-items: center; gap: 10px; font-size: 11px; letter-spacing: 0.04em; color: var(--vx-ink); }
.dpanel__dot { width: 5px; height: 5px; border-radius: 50%; background: var(--vx-blue); flex-shrink: 0; box-shadow: 0 0 8px var(--vx-blue); }

/* 03 multi-cam */
.mcam { position: relative; padding: 42px clamp(18px, 3vw, 34px) 30px; background: rgba(8, 18, 40, 0.5); }
.mcam__metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.mcam__metric { padding: 16px; border: 1px solid var(--vx-line); background: rgba(107, 166, 255, 0.04); text-align: center; }
.mcam__metric-v { font-size: clamp(13px, 1.4vw, 17px); font-weight: 700; letter-spacing: 0.04em; color: #fff; }
.mcam__types { display: flex; flex-wrap: wrap; gap: 8px; margin: 18px 0 24px; justify-content: center; }
.flow { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 10px; }
.flow__node { padding: 10px 16px; border: 1px solid var(--vx-cyan); background: rgba(89, 227, 255, 0.06); font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: var(--vx-cyan); }
.flow__link { color: var(--vx-blue); }

/* 04 safety */
.safety { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px; }
.safety__mod { position: relative; padding: 40px 14px 18px; background: rgba(8, 18, 40, 0.5); }
.safety__t { margin: 0 0 14px; font-size: 10.5px; font-weight: 700; letter-spacing: 0.06em; color: #fff; }
.safety__bar { display: block; height: 4px; background: rgba(107, 166, 255, 0.14); }
.safety__bar i { display: block; height: 100%; background: linear-gradient(90deg, var(--vx-cyan), var(--vx-blue)); }

/* 05 forensic */
.fsearch { position: relative; padding: 42px clamp(18px, 3vw, 34px) 30px; background: rgba(8, 18, 40, 0.55); }
.fsearch__bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; padding: 16px; border: 1px solid var(--vx-line); background: rgba(3, 8, 20, 0.6); }
.fsearch__q { font-size: 12.5px; color: var(--vx-ink); }
.fsearch__run { flex-shrink: 0; padding: 10px 16px; border: 1px solid var(--vx-cyan); background: rgba(89, 227, 255, 0.08); color: var(--vx-cyan); font: inherit; font-size: 10px; letter-spacing: 0.1em; cursor: pointer; }
.fsearch__status { margin: 18px 0; font-size: 11px; letter-spacing: 0.12em; }
.fsearch__searching { color: var(--vx-blue); }
.fsearch__searching i { display: inline-block; width: 4px; height: 4px; margin-left: 3px; border-radius: 50%; background: var(--vx-blue); animation: vex-blink 1s infinite; }
.fsearch__searching i:nth-child(2) { animation-delay: 0.2s; } .fsearch__searching i:nth-child(3) { animation-delay: 0.4s; }
.fsearch__match { color: var(--vx-cyan); font-weight: 700; }
.fsearch__idle { color: var(--vx-muted); }
.fsearch__results { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.fsearch__hit { display: flex; justify-content: space-between; padding: 13px 16px; border: 1px solid var(--vx-line); background: rgba(107, 166, 255, 0.04); opacity: 0; transform: translateX(-8px); transition: opacity 400ms ease, transform 400ms ease; }
.fsearch__hit.is-in { opacity: 1; transform: none; }
.fsearch__cam { font-weight: 700; color: #fff; letter-spacing: 0.06em; }
.fsearch__t { color: var(--vx-cyan); font-variant-numeric: tabular-nums; }
.fsearch__caps { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }

/* 06 deploy */
.deploy__tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
.deploy__tab { padding: 12px 20px; border: 1px solid var(--vx-line); background: rgba(107, 166, 255, 0.04); color: var(--vx-muted); font: inherit; font-size: 11px; letter-spacing: 0.1em; cursor: pointer; transition: color 180ms, background 180ms, border-color 180ms; }
.deploy__tab.is-active { color: var(--vx-cyan); border-color: var(--vx-cyan); background: rgba(89, 227, 255, 0.08); }
.deploy__panel { position: relative; padding: 42px 24px 28px; background: rgba(8, 18, 40, 0.5); min-height: 150px; }
.deploy__name { margin: 0 0 12px; font-size: 15px; font-weight: 700; letter-spacing: 0.06em; color: #fff; }
.deploy__line { margin: 6px 0 0; font-size: 13px; line-height: 1.6; color: var(--vx-muted); max-width: 60ch; }

/* 07 integration */
.integ { display: flex; flex-direction: column; align-items: center; gap: 26px; }
.integ__core { padding: 26px 34px; border: 1px solid var(--vx-cyan); background: rgba(89, 227, 255, 0.06); text-align: center; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; color: var(--vx-cyan); line-height: 1.4; }
.integ__nodes { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; max-width: 760px; }
.integ__node { padding: 14px 18px; background: rgba(8, 18, 40, 0.5); font-size: 11px; font-weight: 600; letter-spacing: 0.06em; color: var(--vx-ink); }

/* 08 industries */
.ind { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 16px; }
.ind__tabs { display: flex; flex-direction: column; gap: 8px; }
.ind__tab { display: flex; align-items: center; gap: 12px; padding: 15px 18px; background: rgba(8, 18, 40, 0.5); color: var(--vx-muted); font: inherit; font-size: 12px; letter-spacing: 0.06em; text-align: left; cursor: pointer; transition: color 180ms, background 180ms; }
.ind__tab.is-active { color: #fff; background: rgba(89, 227, 255, 0.08); }
.ind__tab-n { color: var(--vx-cyan); font-size: 11px; }
.ind__detail { position: relative; padding: 44px 26px 26px; background: rgba(8, 18, 40, 0.5); }
.ind__detail-t { margin: 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: 22px; font-weight: 650; color: #fff; }
.ind__detail-b { margin: 16px 0 0; font-size: 12.5px; line-height: 1.7; color: var(--vx-muted); max-width: 46ch; }

/* 09 tech */
.tech { display: flex; flex-direction: column; gap: 10px; }
.tech__row { display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px 20px; padding: 18px 22px; background: rgba(8, 18, 40, 0.5); }
.tech__k { flex: 0 0 auto; min-width: 200px; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; color: var(--vx-cyan); }
.tech__v { font-size: 12.5px; color: var(--vx-muted); }

/* 10 proof */
.proof { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
.proof__mod { display: flex; flex-direction: column; gap: 10px; padding: 30px 22px; background: rgba(8, 18, 40, 0.5); }
.proof__v { font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(26px, 3vw, 40px); font-weight: 700; letter-spacing: -0.01em; color: #fff; }
.proof__l { font-size: 11px; letter-spacing: 0.04em; color: var(--vx-muted); }

/* final */
.vsec--final { text-align: center; border-top: 1px solid var(--vx-line); }
.vex__final { margin: 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(26px, 4vw, 48px); font-weight: 600; line-height: 1.1; color: #fff; }
.vex__final span { color: var(--vx-cyan); }
.vex__final-brand { margin: 24px 0 0; font-size: 12px; letter-spacing: 0.24em; color: var(--vx-muted); }
.vex__cta { display: inline-flex; align-items: center; gap: 10px; margin-top: 26px; padding: 16px 30px; background: var(--vx-cyan) !important; color: #041018 !important; font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-decoration: none; }
.vex__foot { margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(107, 166, 255, 0.12); text-align: center; font-size: 9px; letter-spacing: 0.2em; color: var(--vx-muted); }

@keyframes vex-pulse { 50% { opacity: 0.45; } }
@keyframes vex-blink { 50% { opacity: 0.2; } }

/* ── responsive ── */
@media (max-width: 900px) {
  .pipe, .safety { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .pipe__arrow { display: none; }
  .grid3, .proof { grid-template-columns: 1fr 1fr; }
  .ind { grid-template-columns: 1fr; }
  .mcam__metrics { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .pipe, .grid3, .safety, .proof { grid-template-columns: 1fr; }
  .vex__id-sub { display: none; }
  .fsearch__bar { flex-direction: column; align-items: stretch; }
}
@media (prefers-reduced-motion: reduce) {
  .vex__core i, .fsearch__searching i { animation: none; }
  .fsearch__hit { transition: none; }
}
</style>
