<script setup lang="ts">
// SVARA DRONE INTELLIGENCE — immersive full-screen mission-control experience, opened
// from the Drone AI card's "Explore" control. Same architecture as VisionExplore (Teleport
// overlay, own scroll container with data-lenis-prevent, page scroll-locked, Escape/backdrop
// close → products page keeps its exact position). Distinct AEROSPACE-BLUE identity (navy +
// electric blue + subtle cyan + technical green status). All copy VERBATIM from the Drone
// Intelligence source; telemetry/fleet states are labelled SIMULATED (not real specs).
import { ref, watch, computed, onBeforeUnmount, nextTick } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { useDroneExplore } from '~/composables/useDroneExplore'
import ProductDashboard from '~/components/products/worlds/ProductDashboard.vue'

const { open, closeExplore } = useDroneExplore()

// ── content (verbatim from source) ──────────────────────────────────────────
const INIT = [
  { k: 'MISSION CONTROL', v: 'ONLINE' },
  { k: 'EDGE AI', v: 'ONLINE' },
  { k: 'VISION LINK', v: 'CONNECTED' },
  { k: 'FLEET NETWORK', v: 'READY' },
]
const HEAD_STATUS = [
  { k: 'FLIGHT NETWORK', v: 'ONLINE' },
  { k: 'EDGE AI', v: 'READY' },
  { k: 'VISION LINK', v: 'CONNECTED' },
]
const TELEMETRY = [
  { l: 'ALTITUDE', v: '01,240 FT' }, { l: 'SPEED', v: '18.4 M/S' }, { l: 'MISSION', v: 'PATROL-07' },
  { l: 'SIGNAL', v: '98.2%' }, { l: 'EDGE AI', v: 'ONLINE' }, { l: 'BATTERY', v: '84%' },
]
const HERO_CHAIN = ['DRONE', 'LIVE FLIGHT PATH', 'TARGET / INCIDENT', 'AI ANALYSIS', 'COMMAND CENTER']
const LAYER_CHAIN = ['FIXED CAMERAS  +  DRONE INTELLIGENCE', 'SVARA ONE AI OS', 'UNIFIED INTELLIGENCE']
const PATROL = [
  { t: 'DYNAMIC REROUTING', b: 'Mission routes automatically adapt to live alerts.' },
  { t: 'GEOFENCE ENFORCEMENT', b: 'Automatic safe-landing on signal loss or low battery.' },
  { t: 'ADAPTIVE PATROL', b: 'Patrol scheduling responds to historical incident patterns.' },
  { t: 'SWARM COORDINATION', b: 'Multiple drones receive zone assignments, coverage handoff and conflict resolution.' },
  { t: 'WEATHER-AWARE FLIGHT', b: 'Routing adapts to wind, precipitation and visibility.' },
]
const ONBOARD_CHAIN = ['EDGE GPU', 'REAL-TIME INFERENCE', 'DETECTION', 'TRACKING', 'BEHAVIOUR ANALYSIS']
const ONBOARD_CAPS = ['PERSON DETECTION', 'PERSON RE-IDENTIFICATION', 'VEHICLE TRACKING', 'AI-ASSISTED LICENCE PLATE RECOGNITION', 'SMOKE', 'FIRE', 'UNAUTHORISED GATHERINGS', 'PERIMETER BREACH', 'STRUCTURAL DAMAGE', 'THERMAL SIGNATURES', 'GESTURE ANALYSIS', 'CROWD BEHAVIOUR', 'MASS-MOVEMENT ANOMALIES']
const INCIDENT_CHAIN = ['VISION INTELLIGENCE DETECTS ANOMALY', 'DRONE SCRAMBLE', 'AERIAL VERIFICATION', 'LIVE VIDEO', 'COMMAND CENTER', 'RESPONSE']
const INCIDENT_CAPS = ['LIVE VIDEO RELAY', 'TWO-WAY AUDIO', 'EVIDENCE COLLECTION', 'GPS STAMPING', 'INCIDENT TIMELINE']
const COORD_ACTIONS = ['GATE LOCK', 'BARRIER ACTIVATION', 'PA ANNOUNCEMENT', 'LIVE OPERATOR COMMUNICATION']
const INSPECT = [
  { t: 'SOLAR ARRAYS', b: 'Thermal anomaly detection for defective cells.' },
  { t: 'TRANSMISSION LINES', b: 'Automated pylon-to-pylon flight with AI-flagged defect reporting.' },
  { t: 'CONSTRUCTION', b: '3D volumetric mapping, cut-and-fill calculations and schedule compliance.' },
  { t: 'PIPELINES & INFRASTRUCTURE', b: 'Visual + thermal inspection with defect severity classification.' },
  { t: 'PORTS & LOGISTICS YARDS', b: 'Container stack mapping, vehicle flow analysis and yard utilisation optimisation.' },
]
const SPECS = [
  { k: 'FLIGHT CONTROL', h: 'Pixhawk-compatible autopilot + SVARA Autonomous Flight Manager', fn: 'Mission execution · Obstacle avoidance · Emergency protocols · Swarm coordination' },
  { k: 'SENSOR SUITE', h: '4K RGB + Thermal IR + Zoom optics + 3-axis stabilised gimbal', fn: 'Continuous high-resolution capture.' },
  { k: 'EDGE AI COMPUTE', h: 'NVIDIA Jetson Orin NX · 100 TOPS onboard processing', fn: 'Real-time airborne inference.' },
  { k: 'COMMUNICATIONS', h: '4G LTE / 5G + Dedicated RF command link + SVARA mesh fallback', fn: 'Resilient connectivity and automatic protocol failover.' },
  { k: 'GROUND CONTROL', h: 'SVARA GCS · Web platform + Mobile app + Multi-drone fleet manager', fn: 'Mission planning · Live feeds · Swarm orchestration · Incident management' },
  { k: 'SVARA INTEGRATION', h: 'Native API bridge to Vision Intelligence + AI Wrapper platforms', fn: 'CCTV alerts trigger drone response · Drone footage enriches fixed-camera data · Unified command.' },
]
const LOOP = ['CCTV', 'DRONE', 'SVARA ONE AI OS', 'DIGITAL TWIN']
const LOOP_REL = [
  { t: 'CCTV → DRONE', b: 'Anomaly detected by Vision Intelligence triggers autonomous drone scramble for aerial investigation.' },
  { t: 'DRONE → CCTV', b: 'Drone-tracked threat enters a fixed-camera coverage zone and tracking is handed off seamlessly.' },
  { t: 'BOTH → AI WRAPPER', b: 'Alerts, events and footage metadata flow into SVARA ONE AI OS for unified incident command.' },
  { t: 'DIGITAL TWIN', b: 'Patrol routes are optimised using SVARA simulation capabilities, with coverage gaps modelled before deployment.' },
]
const FLEET = [
  { n: 'DRONE 01', s: 'ACTIVE' }, { n: 'DRONE 02', s: 'ACTIVE' }, { n: 'DRONE 03', s: 'PATROL' }, { n: 'DRONE 04', s: 'RESPONDING' },
]
const PACKAGES = [
  { n: '01', name: 'INTELLIGENCE STARTER', spec: '1–2 drones + SVARA AI platform + 1-year support + operator training', target: 'Industrial plants · Warehouses · Private campuses' },
  { n: '02', name: 'ENTERPRISE PATROL SYSTEM', spec: '3–10 drone fleet + automated docking stations + AI platform + managed service', target: 'Airports · Ports · Large manufacturing complexes · Gated communities' },
  { n: '03', name: 'SMART CITY PROGRAM', spec: 'City / district-scale network + training + multi-year operations management', target: 'Municipal governments · Police departments · Event management authorities' },
  { n: '04', name: 'INSPECTION-AS-A-SERVICE', spec: 'Scheduled flights + AI defect detection reports + compliance documentation', target: 'Energy companies · Construction firms · Telecom tower operators' },
  { n: '05', name: 'DISASTER RESPONSE', spec: 'Rapid-deploy systems + survivor detection + area mapping + emergency communications', target: 'NDRF · State DMAs · Mining companies · Coastal infrastructure operators' },
]
const COMMERCIAL = [
  { k: 'HARDWARE + SOFTWARE KIT', v: '₹8L–₹18L per system' },
  { k: 'ENTERPRISE FLEET SYSTEM', v: '₹40L–₹2Cr per site' },
  { k: 'GOVERNMENT PROGRAM', v: '₹2Cr–₹25Cr+ (tender)' },
  { k: 'INSPECTION-AS-A-SERVICE', v: '₹25K–₹2L per inspection' },
  { k: 'PLATFORM ANNUAL LICENSE', v: '₹3L–₹12L/year depending on fleet size' },
]
const INDIA = [
  { t: 'PLI ALIGNMENT', b: 'Compatibility with India-manufactured drone hardware.' },
  { t: 'CCTV CONVERGENCE', b: 'Drone intelligence integrated with fixed-camera analytics.' },
  { t: 'EDGE-FIRST RELIABILITY', b: 'Onboard processing enables mission continuity during connectivity loss.' },
  { t: 'FLEET INTELLIGENCE', b: 'Multiple drones coordinated as an intelligence network.' },
  { t: 'DATA SOVEREIGNTY', b: 'AI processing, footage and mission data stored within Indian infrastructure.' },
]

// ── interactions ─────────────────────────────────────────────────────────────
const activePkg = ref(0)
const activeInspect = ref(0)
const incidentState = ref<'idle' | 'running'>('idle')
const incidentStep = ref(-1)
const timers: ReturnType<typeof setTimeout>[] = []
function runIncident(): void {
  timers.forEach(clearTimeout); timers.length = 0
  incidentState.value = 'running'; incidentStep.value = -1
  INCIDENT_CHAIN.forEach((_, i) => timers.push(setTimeout(() => {
    incidentStep.value = i
    if (i === INCIDENT_CHAIN.length - 1) timers.push(setTimeout(() => { incidentState.value = 'idle' }, 900))
  }, 350 + i * 620)))
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
    nextTick(() => { if (scroller.value) scroller.value.scrollTop = 0; progress.value = 0; incidentState.value = 'idle'; incidentStep.value = -1 })
  } else {
    unlock(); document.removeEventListener('keydown', onKey)
  }
})
onBeforeUnmount(() => { unlock(); document.removeEventListener('keydown', onKey); timers.forEach(clearTimeout) })

const pkg = computed(() => PACKAGES[activePkg.value]!)
const insp = computed(() => INSPECT[activeInspect.value]!)
</script>

<template>
  <Teleport to="body">
    <AnimatePresence>
      <motion.div
        v-if="open" class="dex" role="dialog" aria-modal="true" aria-label="SVARA Drone Intelligence"
        :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
        :transition="{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }"
      >
        <div class="dex__backdrop" aria-hidden="true" @click="close" />
        <motion.section
          class="dex__panel"
          :initial="{ opacity: 0, scale: 0.96, y: 18 }" :animate="{ opacity: 1, scale: 1, y: 0 }"
          :exit="{ opacity: 0, scale: 0.97, y: 12 }" :transition="{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }"
        >
          <span class="dex__progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />

          <!-- HEADER (fixed) -->
          <header class="dex__header">
            <div class="dex__id">
              <span class="dex__core" aria-hidden="true"><i /></span>
              <div>
                <p class="dex__id-title">SVARA DRONE INTELLIGENCE</p>
                <p class="dex__id-sub">AUTONOMOUS AERIAL INTELLIGENCE &amp; RESPONSE PLATFORM</p>
              </div>
            </div>
            <div class="dex__head-right">
              <span class="dex__status"><i />SYSTEM ONLINE</span>
              <span v-for="s in HEAD_STATUS" :key="s.k" class="dex__hstat"><b>{{ s.k }}</b>{{ s.v }}</span>
              <button type="button" class="dex__close" @click="close">CLOSE <span aria-hidden="true">×</span></button>
            </div>
          </header>

          <div ref="scroller" class="dex__scroll" data-lenis-prevent @scroll="onScroll">
            <div class="dex__inner">
              <!-- HERO -->
              <section class="dsec dsec--hero">
                <p class="dlabel dlabel--blue">01 // Drone Intelligence</p>
                <h1 class="dex__lede">Surveillance without boundaries.<br><span>Intelligence without blind spots.</span></h1>
                <p class="dex__hero-copy">SVARA Drone Intelligence transforms aerial platforms from piloted cameras into autonomous AI-powered intelligence units that patrol, detect, respond and coordinate without constant human control.</p>
                <p class="dex__hero-sub">Where fixed cameras end, SVARA drones begin.</p>

                <div class="mctl dinst svara-instrument">
                  <span class="dinst__label">MISSION CONTROL / PATROL-07</span>
                  <div class="mctl__chain">
                    <template v-for="(c, i) in HERO_CHAIN" :key="c">
                      <span class="mctl__node">{{ c }}</span>
                      <span v-if="i < HERO_CHAIN.length - 1" class="mctl__link" aria-hidden="true">↓</span>
                    </template>
                  </div>
                  <div class="tele">
                    <div v-for="t in TELEMETRY" :key="t.l" class="tele__cell">
                      <span class="tele__v">{{ t.v }}</span><span class="tele__l">{{ t.l }}</span>
                    </div>
                  </div>
                  <p class="dsim">◦ SIMULATED INTERFACE DATA</p>
                </div>
              </section>

              <!-- the product's own HUD dashboard, in its own section -->
              <ProductDashboard id="drone" />

              <!-- MOBILE INTELLIGENCE LAYER -->
              <section class="dsec">
                <div class="dsec__head"><span class="dlabel">Ecosystem</span><h2 class="dsec__title">The intelligence layer above the drone.</h2></div>
                <p class="dbody">Drone Intelligence is not a standalone product. It is the mobile layer of SVARA's unified intelligence platform — the pair of eyes that goes where fixed cameras cannot.</p>
                <div class="mchain">
                  <template v-for="(l, i) in LAYER_CHAIN" :key="l">
                    <div class="mchain__node dinst svara-instrument">{{ l }}</div>
                    <span v-if="i < LAYER_CHAIN.length - 1" class="mchain__link" aria-hidden="true">↓</span>
                  </template>
                </div>
              </section>

              <!-- COVERAGE -->
              <section class="dsec">
                <div class="dsec__head"><span class="dlabel">Coverage</span><h2 class="dsec__title">Cover what cameras cannot.</h2></div>
                <div class="cover dinst svara-instrument">
                  <span class="dinst__label">AERIAL COVERAGE MODEL</span>
                  <div class="cover__grid" aria-hidden="true">
                    <span v-for="z in 3" :key="z" class="cover__zone" />
                    <span class="cover__drone">◈ DRONE</span>
                    <span class="cover__path" />
                  </div>
                  <div class="cover__cmp">
                    <div class="cover__cmp-cell"><span class="cover__cmp-v">500 ACRES</span><span class="cover__cmp-l">Single SVARA-equipped drone patrol</span></div>
                    <div class="cover__cmp-cell"><span class="cover__cmp-v">3,000+ CAMERAS</span><span class="cover__cmp-l">Fixed-camera equivalent coverage</span></div>
                  </div>
                  <p class="dbody">A single SVARA-equipped drone can patrol large areas continuously, respond dynamically to incidents, track moving threats, inspect infrastructure and stream live AI-classified intelligence.</p>
                </div>
              </section>

              <!-- AUTONOMOUS PATROL -->
              <section class="dsec">
                <div class="dsec__head"><span class="dlabel">01 · Autonomous Patrol</span><h2 class="dsec__title">Autonomous Patrol Intelligence</h2></div>
                <div class="grid5">
                  <div v-for="(p, i) in PATROL" :key="p.t" class="dmod dinst svara-instrument">
                    <span class="dinst__label">0{{ i + 1 }}</span>
                    <p class="dmod__t">{{ p.t }}</p><p class="dmod__b">{{ p.b }}</p>
                  </div>
                </div>
                <div class="bvlos dinst svara-instrument"><span class="dinst__label">REGULATORY</span><b>BVLOS</b> — Beyond Visual Line of Sight, with DGCA regulatory compliance tools.</div>
              </section>

              <!-- ONBOARD AI -->
              <section class="dsec">
                <div class="dsec__head"><span class="dlabel">Onboard AI</span><h2 class="dsec__title">The intelligence flies with the mission.</h2></div>
                <div class="ochain">
                  <template v-for="(c, i) in ONBOARD_CHAIN" :key="c">
                    <span class="ochain__node">{{ c }}</span>
                    <span v-if="i < ONBOARD_CHAIN.length - 1" class="ochain__link" aria-hidden="true">→</span>
                  </template>
                </div>
                <div class="caps">
                  <span v-for="c in ONBOARD_CAPS" :key="c" class="dchip">{{ c }}</span>
                </div>
              </section>

              <!-- THERMAL -->
              <section class="dsec">
                <div class="dsec__head"><span class="dlabel">Thermal Intelligence</span><h2 class="dsec__title">Vision beyond visible light.</h2></div>
                <div class="thermal">
                  <div class="thermal__side dinst svara-instrument"><span class="dinst__label">RGB VISION</span><span class="thermal__swatch thermal__swatch--rgb" /></div>
                  <div class="thermal__side dinst svara-instrument"><span class="dinst__label">THERMAL VISION</span><span class="thermal__swatch thermal__swatch--ir" /></div>
                </div>
                <div class="caps"><span class="dchip">Night operations</span><span class="dchip">Heat-signature detection</span><span class="dchip">People detection in occluded environments</span></div>
              </section>

              <!-- INCIDENT RESPONSE -->
              <section class="dsec">
                <div class="dsec__head"><span class="dlabel">Incident Response</span><h2 class="dsec__title">Incident Response Automation</h2></div>
                <div class="incid dinst svara-instrument">
                  <div class="incid__top">
                    <span class="incid__metric"><b>&lt; 90 SEC</b>AERIAL VERIFICATION</span>
                    <button type="button" class="incid__run" @click="runIncident">{{ incidentState === 'idle' ? 'RUN SEQUENCE' : 'RUNNING…' }} ↗</button>
                  </div>
                  <div class="incid__chain">
                    <template v-for="(c, i) in INCIDENT_CHAIN" :key="c">
                      <span class="incid__node" :class="{ 'is-on': incidentStep >= i }">{{ c }}</span>
                      <span v-if="i < INCIDENT_CHAIN.length - 1" class="incid__link" :class="{ 'is-on': incidentStep > i }" aria-hidden="true">↓</span>
                    </template>
                  </div>
                  <p class="dbody">Automatic scramble on SVARA Vision Intelligence alerts, with drone launch for aerial verification within 90 seconds.</p>
                  <div class="caps"><span v-for="c in INCIDENT_CAPS" :key="c" class="dchip">{{ c }}</span></div>
                </div>
              </section>

              <!-- COORDINATED RESPONSE -->
              <section class="dsec">
                <div class="dsec__head"><span class="dlabel">Coordinated Response</span><h2 class="dsec__title">One node in a larger response network.</h2></div>
                <div class="coord">
                  <div class="coord__chain">
                    <span class="coord__node">DRONE</span><span class="coord__link">↓</span>
                    <span class="coord__node">COMMAND CENTER</span><span class="coord__link">↓</span>
                    <span class="coord__node">CONNECTED SYSTEMS</span>
                  </div>
                  <div class="grid4">
                    <div v-for="a in COORD_ACTIONS" :key="a" class="dmod dinst svara-instrument"><p class="dmod__t">{{ a }}</p></div>
                  </div>
                </div>
              </section>

              <!-- INSPECTION -->
              <section class="dsec">
                <div class="dsec__head"><span class="dlabel">Inspection</span><h2 class="dsec__title">From surveillance to inspection.</h2></div>
                <div class="insp">
                  <div class="insp__tabs">
                    <button v-for="(m, i) in INSPECT" :key="m.t" type="button" class="insp__tab" :class="{ 'is-active': activeInspect === i }" @click="activeInspect = i">{{ m.t }}</button>
                  </div>
                  <div class="insp__detail dinst svara-instrument"><span class="dinst__label">MODE / {{ insp.t }}</span><p class="insp__t">{{ insp.t }}</p><p class="dbody">{{ insp.b }}</p></div>
                </div>
              </section>

              <!-- TECHNICAL SPECS -->
              <section class="dsec">
                <div class="dsec__head"><span class="dlabel">Technical Specifications</span><h2 class="dsec__title">System modules.</h2></div>
                <div class="grid3">
                  <div v-for="s in SPECS" :key="s.k" class="spec dinst svara-instrument">
                    <span class="dinst__label">MODULE</span>
                    <p class="spec__k">{{ s.k }}</p><p class="spec__h">{{ s.h }}</p>
                    <p class="spec__fn"><span class="dlabel dlabel--blue">Function</span>{{ s.fn }}</p>
                  </div>
                </div>
              </section>

              <!-- ECOSYSTEM LOOP -->
              <section class="dsec">
                <div class="dsec__head"><span class="dlabel">Ecosystem</span><h2 class="dsec__title">SVARA Ecosystem Intelligence Loop</h2></div>
                <div class="loop">
                  <span v-for="(n, i) in LOOP" :key="n" class="loop__node" :style="{ '--i': i }">{{ n }}</span>
                  <span class="loop__ring" aria-hidden="true" />
                  <span class="loop__pulse" aria-hidden="true" />
                </div>
                <div class="grid4">
                  <div v-for="r in LOOP_REL" :key="r.t" class="dmod dinst svara-instrument"><p class="dmod__t dmod__t--blue">{{ r.t }}</p><p class="dmod__b">{{ r.b }}</p></div>
                </div>
              </section>

              <!-- FLEET -->
              <section class="dsec">
                <div class="dsec__head"><span class="dlabel">Fleet Intelligence</span><h2 class="dsec__title">One mission. Multiple autonomous nodes.</h2></div>
                <div class="grid4">
                  <div v-for="d in FLEET" :key="d.n" class="fleet dinst svara-instrument">
                    <span class="fleet__dot" :class="'is-' + d.s.toLowerCase()" /><span class="fleet__n">{{ d.n }}</span><span class="fleet__s">{{ d.s }}</span>
                  </div>
                </div>
                <p class="dbody">SVARA's platform orchestrates multiple drones as a coordinated intelligence network.</p>
                <p class="dsim">◦ SIMULATED FLEET STATES</p>
              </section>

              <!-- DEPLOYMENT PACKAGES -->
              <section class="dsec">
                <div class="dsec__head"><span class="dlabel">Deployment</span><h2 class="dsec__title">Deployment Packages</h2></div>
                <div class="pkg">
                  <div class="pkg__tabs">
                    <button v-for="(p, i) in PACKAGES" :key="p.n" type="button" class="pkg__tab" :class="{ 'is-active': activePkg === i }" @click="activePkg = i">
                      <span class="pkg__tab-n">{{ p.n }}</span>{{ p.name }}
                    </button>
                  </div>
                  <div class="pkg__detail dinst svara-instrument">
                    <span class="dinst__label">PACKAGE / {{ pkg.n }}</span>
                    <p class="pkg__name">{{ pkg.name }}</p>
                    <p class="pkg__spec">{{ pkg.spec }}</p>
                    <p class="pkg__target"><span class="dlabel dlabel--blue">Target</span>{{ pkg.target }}</p>
                  </div>
                </div>
              </section>

              <!-- COMMERCIAL -->
              <section class="dsec">
                <div class="dsec__head"><span class="dlabel">Commercial Model</span><h2 class="dsec__title">System configuration.</h2></div>
                <div class="comm">
                  <div v-for="c in COMMERCIAL" :key="c.k" class="comm__mod dinst svara-instrument">
                    <span class="comm__k">{{ c.k }}</span><span class="comm__v">{{ c.v }}</span>
                  </div>
                </div>
              </section>

              <!-- INDIA -->
              <section class="dsec">
                <div class="dsec__head"><span class="dlabel">India Advantage</span><h2 class="dsec__title">Built for India's autonomous future.</h2></div>
                <div class="grid5">
                  <div v-for="(a, i) in INDIA" :key="a.t" class="dmod dinst svara-instrument"><span class="dinst__label">0{{ i + 1 }}</span><p class="dmod__t">{{ a.t }}</p><p class="dmod__b">{{ a.b }}</p></div>
                </div>
              </section>

              <!-- FINAL -->
              <section class="dsec dsec--final">
                <p class="dex__final">Where fixed cameras end,<br><span>SVARA drones begin.</span></p>
                <p class="dex__final-brand">SVARA DRONE INTELLIGENCE</p>
                <p class="dex__final-copy">Autonomous aerial intelligence for surveillance, response, inspection and operations.</p>
                <div class="dex__final-cta">
                  <NuxtLink to="/contact" class="dex__cta dex__cta--primary" @click="close">CONNECT WITH SVARA <span aria-hidden="true">↗</span></NuxtLink>
                  <NuxtLink to="/ecosystem" class="dex__cta dex__cta--ghost" @click="close">EXPLORE THE SVARA STACK</NuxtLink>
                </div>
              </section>

              <footer class="dex__foot">SVARA · DRONE INTELLIGENCE · LIVE · v1.0</footer>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  </Teleport>
</template>

<style scoped>
.dex {
  position: fixed; inset: 0; z-index: 100000; display: flex; justify-content: center;
  --dx-bg: #050a16; --dx-bg2: #0a1428; --dx-ink: #eef4ff; --dx-muted: rgba(190, 210, 240, 0.6);
  --dx-line: rgba(77, 141, 255, 0.28); --dx-blue: #4d8dff; --dx-cyan: #7cc4ff; --dx-green: #35c07a;
  color: var(--dx-ink); font-family: var(--font-mono, ui-monospace, monospace);
}
.dex__backdrop { position: absolute; inset: 0; background: rgba(2, 6, 16, 0.66); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); }
.dex__panel {
  position: relative; z-index: 1; width: min(1340px, 100%); height: 100%; display: flex; flex-direction: column; overflow: hidden;
  background: radial-gradient(circle at 15% 6%, rgba(77, 141, 255, 0.12), transparent 30%), radial-gradient(circle at 88% 84%, rgba(124, 196, 255, 0.08), transparent 34%), linear-gradient(160deg, var(--dx-bg2), var(--dx-bg) 60%, #03060f);
  border-left: 1px solid var(--dx-line); border-right: 1px solid var(--dx-line); box-shadow: 0 0 120px -20px rgba(0, 0, 0, 0.82);
}
.dex__progress { position: absolute; top: 0; left: 0; height: 2px; width: 100%; transform-origin: left; background: linear-gradient(90deg, var(--dx-blue), var(--dx-cyan)); z-index: 6; }

.dex__header { flex: 0 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; padding: 14px clamp(16px, 3vw, 34px); border-bottom: 1px solid var(--dx-line); background: linear-gradient(90deg, rgba(7, 14, 28, 0.92), rgba(12, 24, 48, 0.6)); }
.dex__id { display: flex; align-items: center; gap: 13px; min-width: 0; }
.dex__core { position: relative; width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--dx-blue); display: grid; place-items: center; flex-shrink: 0; }
.dex__core i { width: 8px; height: 8px; border-radius: 50%; background: var(--dx-blue); box-shadow: 0 0 12px var(--dx-blue); animation: dex-pulse 2.4s ease-in-out infinite; }
.dex__id-title { margin: 0; font-size: 13px; font-weight: 700; letter-spacing: 0.13em; color: #fff; }
.dex__id-sub { margin: 2px 0 0; font-size: 9px; letter-spacing: 0.14em; color: var(--dx-muted); }
.dex__head-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.dex__status { display: inline-flex; align-items: center; gap: 7px; font-size: 9.5px; letter-spacing: 0.13em; color: var(--dx-green); }
.dex__status i { width: 6px; height: 6px; border-radius: 50%; background: var(--dx-green); box-shadow: 0 0 10px var(--dx-green); }
.dex__hstat { display: inline-flex; flex-direction: column; font-size: 8px; letter-spacing: 0.1em; color: var(--dx-cyan); line-height: 1.4; }
.dex__hstat b { color: var(--dx-muted); font-weight: 500; }
.dex__close { display: inline-flex; align-items: center; gap: 7px; padding: 9px 15px; border: 1px solid var(--dx-line); background: rgba(77, 141, 255, 0.06); color: var(--dx-ink); font: inherit; font-size: 10px; letter-spacing: 0.13em; cursor: pointer; transition: background 180ms, border-color 180ms; }
.dex__close:hover { background: rgba(77, 141, 255, 0.16); border-color: var(--dx-blue); }

.dex__scroll { flex: 1 1 auto; min-height: 0; overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--dx-blue) transparent; }
.dex__scroll::-webkit-scrollbar { width: 8px; }
.dex__scroll::-webkit-scrollbar-thumb { background: rgba(77, 141, 255, 0.4); border-radius: 8px; }
.dex__inner { max-width: 1140px; margin-inline: auto; padding: clamp(28px, 5vw, 68px) clamp(16px, 3vw, 40px) 60px; }

/* shared */
.dinst { position: relative; padding: 40px 18px 18px; background: rgba(8, 16, 34, 0.5); }
.dinst__label { position: absolute; top: 9px; left: clamp(14px, 2vw, 22px); z-index: 3; font-size: 9px; letter-spacing: 0.16em; color: var(--dx-cyan); pointer-events: none; }
.dlabel { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--dx-muted); }
.dlabel--blue { color: var(--dx-cyan); }
.dchip { display: inline-flex; align-items: center; padding: 7px 12px; font-size: 10px; letter-spacing: 0.05em; color: var(--dx-ink); border: 1px solid var(--dx-line); background: rgba(77, 141, 255, 0.05); }
.dsim { margin: 14px 0 0; font-size: 8.5px; letter-spacing: 0.14em; color: var(--dx-muted); }
.dbody { margin: 16px 0 0; max-width: 62ch; font-size: 12.5px; line-height: 1.7; color: var(--dx-muted); }
.dsec { padding: clamp(34px, 5vw, 60px) 0; border-top: 1px solid rgba(77, 141, 255, 0.12); }
.dsec--hero { border-top: 0; padding-top: 6px; }
.dsec__head { margin-bottom: 24px; }
.dsec__title { margin: 8px 0 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(21px, 3vw, 34px); font-weight: 650; letter-spacing: -0.01em; color: #fff; }

.dex__lede { margin: 12px 0 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(28px, 5vw, 60px); font-weight: 600; line-height: 1.03; letter-spacing: -0.02em; color: #fff; }
.dex__lede span { color: var(--dx-cyan); }
.dex__hero-copy { margin: 22px 0 0; max-width: 62ch; font-size: 13.5px; line-height: 1.7; color: var(--dx-muted); }
.dex__hero-sub { margin: 12px 0 30px; font-size: 13px; letter-spacing: 0.02em; color: var(--dx-cyan); }

/* mission control chain + telemetry */
.mctl__chain { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 22px; }
.mctl__node { padding: 9px 14px; border: 1px solid var(--dx-blue); background: rgba(77, 141, 255, 0.07); font-size: 10.5px; font-weight: 700; letter-spacing: 0.06em; color: var(--dx-cyan); }
.mctl__link { color: var(--dx-blue); }
.tele { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 8px; }
.tele__cell { display: flex; flex-direction: column; gap: 4px; padding: 12px; border: 1px solid var(--dx-line); background: rgba(77, 141, 255, 0.04); text-align: center; }
.tele__v { font-size: 13px; font-weight: 700; color: #fff; font-variant-numeric: tabular-nums; }
.tele__l { font-size: 8px; letter-spacing: 0.1em; color: var(--dx-muted); }

.mchain { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.mchain__node { width: 100%; max-width: 560px; text-align: center; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; color: #fff; padding: 18px; }
.mchain__link { color: var(--dx-blue); }

.cover__grid { position: relative; height: 200px; margin: 8px 0 20px; border: 1px solid var(--dx-line); background: repeating-linear-gradient(0deg, rgba(77, 141, 255, 0.05) 0 1px, transparent 1px 26px), repeating-linear-gradient(90deg, rgba(77, 141, 255, 0.05) 0 1px, transparent 1px 26px); overflow: hidden; }
.cover__zone { position: absolute; width: 90px; height: 90px; border: 1px solid rgba(124, 196, 255, 0.3); border-radius: 50%; background: rgba(124, 196, 255, 0.05); }
.cover__zone:nth-child(1) { left: 12%; top: 20%; } .cover__zone:nth-child(2) { left: 34%; top: 40%; } .cover__zone:nth-child(3) { left: 18%; top: 55%; }
.cover__drone { position: absolute; right: 12%; top: 26%; font-size: 11px; font-weight: 700; color: var(--dx-cyan); }
.cover__path { position: absolute; left: 20%; top: 40%; right: 16%; height: 1px; background: linear-gradient(90deg, var(--dx-blue), transparent); }
.cover__cmp { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.cover__cmp-cell { padding: 16px; border: 1px solid var(--dx-line); background: rgba(77, 141, 255, 0.04); text-align: center; }
.cover__cmp-v { display: block; font-size: clamp(16px, 2vw, 24px); font-weight: 700; color: #fff; }
.cover__cmp-l { display: block; margin-top: 6px; font-size: 9.5px; letter-spacing: 0.06em; color: var(--dx-muted); }

.grid5 { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px; }
.grid4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.grid3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.dmod__t { margin: 0 0 8px; font-size: 11.5px; font-weight: 700; letter-spacing: 0.05em; color: #fff; }
.dmod__t--blue { color: var(--dx-cyan); }
.dmod__b { margin: 0; font-size: 10.5px; line-height: 1.6; color: var(--dx-muted); }
.bvlos { margin-top: 12px; font-size: 12px; color: var(--dx-muted); }
.bvlos b { color: var(--dx-cyan); }

.ochain { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 8px; margin-bottom: 22px; }
.ochain__node { padding: 10px 15px; border: 1px solid var(--dx-blue); background: rgba(77, 141, 255, 0.06); font-size: 10.5px; font-weight: 700; letter-spacing: 0.06em; color: var(--dx-cyan); }
.ochain__link { color: var(--dx-blue); }
.caps { display: flex; flex-wrap: wrap; gap: 8px; }

.thermal { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px; }
.thermal__side { padding-top: 34px; }
.thermal__swatch { display: block; height: 120px; }
.thermal__swatch--rgb { background: linear-gradient(135deg, #1a2b4a, #33507f); }
.thermal__swatch--ir { background: linear-gradient(135deg, #1a0b2e, #6a1f3a 45%, #d98324 78%, #ffdd55); }

.incid__top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; margin-bottom: 20px; }
.incid__metric { display: flex; flex-direction: column; }
.incid__metric b { font-size: clamp(22px, 3vw, 34px); font-weight: 700; color: var(--dx-cyan); }
.incid__metric { font-size: 9.5px; letter-spacing: 0.14em; color: var(--dx-muted); }
.incid__run { padding: 10px 16px; border: 1px solid var(--dx-blue); background: rgba(77, 141, 255, 0.08); color: var(--dx-cyan); font: inherit; font-size: 10px; letter-spacing: 0.1em; cursor: pointer; }
.incid__chain { display: flex; flex-direction: column; align-items: center; gap: 8px; margin-bottom: 8px; }
.incid__node { width: 100%; max-width: 520px; text-align: center; padding: 13px; border: 1px solid var(--dx-line); background: rgba(8, 16, 34, 0.4); font-size: 11px; font-weight: 700; letter-spacing: 0.04em; color: var(--dx-muted); transition: color 300ms, border-color 300ms, background 300ms; }
.incid__node.is-on { color: #fff; border-color: var(--dx-blue); background: rgba(77, 141, 255, 0.1); }
.incid__link { color: rgba(77, 141, 255, 0.3); transition: color 300ms; }
.incid__link.is-on { color: var(--dx-blue); }

.coord__chain { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 8px; margin-bottom: 16px; }
.coord__node { padding: 10px 16px; border: 1px solid var(--dx-blue); background: rgba(77, 141, 255, 0.06); font-size: 11px; font-weight: 700; color: var(--dx-cyan); }
.coord__link { color: var(--dx-blue); }

.insp { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 14px; }
.insp__tabs { display: flex; flex-direction: column; gap: 8px; }
.insp__tab { padding: 14px 16px; background: rgba(8, 16, 34, 0.5); border: 1px solid transparent; color: var(--dx-muted); font: inherit; font-size: 11px; letter-spacing: 0.05em; text-align: left; cursor: pointer; transition: color 180ms, background 180ms, border-color 180ms; }
.insp__tab.is-active { color: #fff; background: rgba(77, 141, 255, 0.08); border-color: var(--dx-line); }
.insp__t { margin: 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: 20px; font-weight: 650; color: #fff; }

.spec__k { margin: 0 0 8px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; color: var(--dx-cyan); }
.spec__h { margin: 0; font-size: 11px; line-height: 1.6; color: #fff; }
.spec__fn { margin: 12px 0 0; font-size: 10px; line-height: 1.6; color: var(--dx-muted); display: flex; flex-direction: column; gap: 5px; }

.loop { position: relative; height: 220px; display: grid; place-items: center; margin-bottom: 20px; }
.loop__ring { position: absolute; width: 200px; height: 200px; border-radius: 50%; border: 1px solid var(--dx-line); }
.loop__pulse { position: absolute; width: 8px; height: 8px; border-radius: 50%; background: var(--dx-cyan); box-shadow: 0 0 12px var(--dx-cyan); offset-path: circle(100px at center); animation: dex-orbit 6s linear infinite; }
.loop__node { position: absolute; padding: 9px 13px; border: 1px solid var(--dx-blue); background: rgba(8, 16, 34, 0.85); font-size: 10px; font-weight: 700; letter-spacing: 0.05em; color: var(--dx-cyan); transform: rotate(calc(var(--i) * 90deg)) translateY(-100px) rotate(calc(var(--i) * -90deg)); }

.fleet { display: flex; flex-direction: column; gap: 8px; align-items: flex-start; padding-top: 20px; }
.fleet__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--dx-green); box-shadow: 0 0 8px var(--dx-green); }
.fleet__dot.is-patrol { background: var(--dx-cyan); box-shadow: 0 0 8px var(--dx-cyan); }
.fleet__dot.is-responding { background: #ffb020; box-shadow: 0 0 8px #ffb020; }
.fleet__n { font-size: 12px; font-weight: 700; color: #fff; }
.fleet__s { font-size: 9.5px; letter-spacing: 0.1em; color: var(--dx-muted); }

.pkg { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 14px; }
.pkg__tabs { display: flex; flex-direction: column; gap: 8px; }
.pkg__tab { display: flex; align-items: center; gap: 12px; padding: 15px 16px; background: rgba(8, 16, 34, 0.5); border: 1px solid transparent; color: var(--dx-muted); font: inherit; font-size: 11px; letter-spacing: 0.05em; text-align: left; cursor: pointer; transition: color 180ms, background 180ms, border-color 180ms; }
.pkg__tab.is-active { color: #fff; background: rgba(77, 141, 255, 0.08); border-color: var(--dx-line); }
.pkg__tab-n { color: var(--dx-cyan); font-size: 11px; }
.pkg__name { margin: 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: 21px; font-weight: 650; color: #fff; }
.pkg__spec { margin: 14px 0 0; font-size: 12.5px; line-height: 1.7; color: var(--dx-ink); }
.pkg__target { margin: 14px 0 0; font-size: 11px; line-height: 1.6; color: var(--dx-muted); display: flex; flex-direction: column; gap: 5px; }

.comm { display: flex; flex-direction: column; gap: 10px; }
.comm__mod { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 8px 20px; padding: 18px 20px; }
.comm__k { font-size: 11.5px; font-weight: 700; letter-spacing: 0.06em; color: var(--dx-cyan); }
.comm__v { font-size: 14px; font-weight: 700; color: #fff; font-variant-numeric: tabular-nums; }

.dsec--final { text-align: center; border-top: 1px solid var(--dx-line); }
.dex__final { margin: 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(26px, 4.4vw, 52px); font-weight: 600; line-height: 1.08; color: #fff; }
.dex__final span { color: var(--dx-cyan); }
.dex__final-brand { margin: 22px 0 0; font-size: 12px; letter-spacing: 0.22em; color: var(--dx-muted); }
.dex__final-copy { margin: 12px auto 0; max-width: 52ch; font-size: 12.5px; line-height: 1.7; color: var(--dx-muted); }
.dex__final-cta { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 26px; }
.dex__cta { display: inline-flex; align-items: center; gap: 10px; padding: 15px 28px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-decoration: none; }
.dex__cta--primary { background: var(--dx-blue); color: #041018; }
.dex__cta--ghost { background: transparent; color: var(--dx-ink); border: 1px solid var(--dx-line); }
.dex__foot { margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(77, 141, 255, 0.12); text-align: center; font-size: 9px; letter-spacing: 0.2em; color: var(--dx-muted); }

@keyframes dex-pulse { 50% { opacity: 0.45; } }
@keyframes dex-orbit { to { offset-distance: 100%; } }

/* ── responsive ── */
@media (max-width: 900px) {
  .grid5, .grid4, .grid3 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .tele { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .insp, .pkg { grid-template-columns: 1fr; }
  .thermal, .cover__cmp { grid-template-columns: 1fr; }
  .dex__hstat { display: none; }
}
@media (max-width: 560px) {
  .grid5, .grid4, .grid3, .tele { grid-template-columns: 1fr; }
  .dex__id-sub { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .dex__core i, .loop__pulse { animation: none; }
  .incid__node, .incid__link { transition: none; }
}
</style>
