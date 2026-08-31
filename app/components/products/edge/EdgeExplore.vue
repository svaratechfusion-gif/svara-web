<script setup lang="ts">
// SVARA EDGE AI DEPLOYMENT PLATFORM — immersive full-screen experience, opened from the
// Edge AI card's "Explore" control. SAME architecture as Vision/Drone Explore (Teleport
// overlay, own scroll container with data-lenis-prevent, page scroll-locked, Escape/backdrop
// close → products page keeps its exact position). DISTINCT identity: the COMPUTE metaphor —
// intelligence moves to the source. Cooler electric-blue "edge compute" palette. All copy /
// figures VERBATIM from the Edge AI source (P03). No invented specifications or claims.
//
//   VISION → SEE · DRONE → MOVE · EDGE → COMPUTE. The decision happens at the source.
import { ref, watch, computed, onBeforeUnmount, nextTick } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { useEdgeExplore } from '~/composables/useEdgeExplore'

const { open, closeExplore } = useEdgeExplore()

// ── content (verbatim from source) ──────────────────────────────────────────
const BOOT = [
  { k: 'LOCAL INFERENCE', v: 'ONLINE' },
  { k: 'EDGE RUNTIME', v: 'READY' },
  { k: 'DEVICE NETWORK', v: 'CONNECTED' },
  { k: 'AUTONOMOUS ACTION', v: 'READY' },
]
const HEAD_STATUS = [
  { k: 'EDGE RUNTIME', v: 'ONLINE' },
  { k: 'LOCAL INFERENCE', v: 'ACTIVE' },
  { k: 'DEVICE NETWORK', v: 'CONNECTED' },
  { k: 'MODEL STATUS', v: 'SYNCED' },
]
const SOURCES = ['CAMERA', 'SENSOR', 'DRONE', 'IoT DEVICE', 'AUDIO']
const CLOUD_STAGES = ['DATA', 'NETWORK', 'CLOUD', 'PROCESSING', 'RESPONSE']
const EDGE_STAGES = ['DATA', 'LOCAL INFERENCE', 'ACTION']
const DIMS = [
  { n: '01', k: 'RESPONSE LATENCY', cloud: '200ms–2,000ms', edge: '5–50ms' },
  { n: '02', k: 'CONNECTIVITY', cloud: 'Requires continuous stable internet.', edge: 'Operates fully offline.' },
  { n: '03', k: 'DATA PRIVACY', cloud: 'Sensitive data transmitted to remote servers.', edge: 'Processing remains on-site.' },
  { n: '04', k: 'BANDWIDTH', cloud: 'Continuous raw-data upload.', edge: 'Only metadata and alerts transmitted.' },
  { n: '05', k: 'FAILURE RESILIENCE', cloud: 'AI unavailable during connectivity / cloud incidents.', edge: 'Systems continue operating during connectivity failure.' },
  { n: '06', k: 'SCALE ECONOMICS', cloud: 'Compute costs scale with usage.', edge: 'Per-device deployment with no per-inference billing.' },
]
const PIPE = [
  { n: '01', k: 'INTELLIGENT DATA CAPTURE', sub: 'Physical data sources', items: ['4K–8K cameras', 'Thermal cameras', 'PTZ', 'Fisheye', 'Industrial sensors', 'Drones', 'IoT devices', 'Audio sensors'] },
  { n: '02', k: 'ON-DEVICE AI PROCESSING', sub: 'SVARA Edge Runtime', items: ['ONNX', 'TensorRT', 'OpenVINO', 'INT8 / FP16 quantisation', 'Knowledge distillation', 'Multi-task inference', 'Adaptive compute allocation', 'OTA model updates'] },
  { n: '03', k: 'IMMEDIATE AUTOMATED ACTION', sub: 'No cloud required', badge: 'SUB-50MS ALERT', items: ['Gate control', 'Alarm systems', 'Emergency lighting', 'PA announcements'] },
  { n: '04', k: 'SELECTIVE CLOUD SYNC', sub: 'Raw video stays local', stat: '99%', statl: 'BANDWIDTH REDUCTION', items: ['Only structured event metadata travels to cloud'] },
]
const FORMATS = ['ONNX', 'TENSORRT', 'OPENVINO']
const MULTITASK = ['DETECTION', 'CLASSIFICATION', 'BEHAVIOUR ANALYSIS']
const ACTION_CHAIN = ['SENSOR', 'EDGE AI', 'LOCAL DECISION', 'ACTUATOR']
const ACTION_SUB = ['detects anomaly', 'classifies anomaly', 'trigger response', '']
const ACTIONS = ['MACHINE STOP', 'GATE CONTROL', 'ALARM', 'EMERGENCY LIGHTING', 'PA ANNOUNCEMENT']
const NET_NODES = ['CAMERA', 'DRONE', 'PLC', 'SENSOR', 'GATE', 'MACHINE', 'IoT DEVICE']
const HARDWARE = [
  { n: '01', k: 'NVIDIA JETSON ORIN NX', perf: '100 TOPS', tier: 'Flagship', apps: ['Multi-camera analytics', 'Complex behaviour models', 'Drone payloads'] },
  { n: '02', k: 'NVIDIA JETSON ORIN NANO', perf: '40 TOPS', tier: 'Cost-efficient', apps: ['Single-camera analytics', 'IoT hubs', 'Entry-level deployments'] },
  { n: '03', k: 'HAILO-8 ACCELERATOR', perf: '26 TOPS @ 2.5W', tier: 'Ultra-low power', apps: ['Embedded smart cameras', 'Battery-powered field devices'] },
  { n: '04', k: 'INTEL NUC / x86 EDGE SERVER', perf: 'OpenVINO CPU + GPU', tier: 'Scalable', apps: ['Multi-camera hubs', 'Factory-floor processing', 'Rack deployments'] },
  { n: '05', k: 'CUSTOM SVARA EDGE GATEWAY', perf: 'Vertical-optimised builds', tier: '', apps: ['Industrial IoT', 'Oil & Gas', 'Mining', 'Maritime', 'Defence environments'] },
]
const INDUSTRIAL_CHAIN = ['MACHINE', 'SENSOR', 'EDGE AI', 'DECISION', 'ACTUATOR']
const INDUSTRIAL = [
  { t: 'MACHINE FAULT DETECTION', b: 'Vibration and thermal anomaly scoring.' },
  { t: 'WORKER PROXIMITY', b: 'Human-in-danger-zone detection.' },
  { t: 'QUALITY CONTROL', b: 'Visual defect detection at line speed.' },
  { t: 'CHEMICAL / GAS LEAKS', b: 'Multi-sensor fusion and AI anomaly classification.' },
]
const PROTOCOLS = ['OPC-UA', 'MQTT', 'MODBUS']
const CITY = [
  { t: 'TRAFFIC INTERSECTION', b: 'Adaptive traffic signals · Violation detection · Pedestrian safety.' },
  { t: 'UTILITY', b: 'Transformer thermal analysis · Infrastructure degradation detection.' },
  { t: 'SMART LIGHTING', b: 'Occupancy-aware lighting.' },
  { t: 'ENVIRONMENTAL SENSOR', b: 'Flood monitoring · Environmental early warning.' },
]
const HEALTH = [
  { t: 'PATIENT FALL DETECTION', b: 'Sub-50ms latency.' },
  { t: 'MEDICATION ROOM MONITORING', b: 'Zero video leaving premises — DPDP Act compliance.' },
  { t: 'ICU MONITORING', b: 'AI correlation of medical device feeds and camera inputs.' },
]
const MLOPS_FLOW = ['MODEL REGISTRY', 'A/B DEPLOYMENT', 'EDGE DEVICES', 'DRIFT DETECTION', 'RETRAINING', 'MODEL UPDATE']
const MLOPS_CAPS = ['FEDERATED LEARNING', 'A/B DEPLOYMENT', 'AUTOMATED DRIFT DETECTION', 'CENTRALISED MODEL REGISTRY', 'ZERO-DOWNTIME HOT-SWAP']
const FED_DEVICES = ['DEVICE 01', 'DEVICE 02', 'DEVICE 03', 'DEVICE 04']
const ARCH_INPUTS = ['VISION AI', 'DRONE AI', 'INDUSTRIAL IoT']
const ARCH_BENEFITS = ['FASTER', 'MORE PRIVATE', 'MORE RELIABLE']
const COMMERCIAL = [
  { n: '01', k: 'EDGE AI KIT', spec: 'Hardware + SVARA edge runtime + vertical AI models + 1-year support', v: '₹1.2L–₹4L', u: 'PER DEVICE' },
  { n: '02', k: 'EDGE-AS-A-SERVICE', spec: 'Software + model updates + remote monitoring', v: '₹3,500–₹12,000', u: 'PER DEVICE / MONTH' },
  { n: '03', k: 'ENTERPRISE SITE DEPLOYMENT', spec: 'Full-site edge infrastructure — design, installation, commissioning', v: '₹20L–₹5Cr+', u: 'PER SITE' },
  { n: '04', k: 'AI MODEL LICENSE', spec: 'Pre-trained vertical AI models licensed separately', v: '₹2L–₹25L', u: 'PER MODEL / YEAR' },
]
const KPI = [
  { v: '5–50ms', l: 'LOCAL INFERENCE' },
  { v: 'SUB-50MS', l: 'ALERT TRIGGERING' },
  { v: '99%', l: 'BANDWIDTH REDUCTION' },
  { v: 'OFFLINE', l: 'OPERATION' },
  { v: 'ON-SITE', l: 'DATA PROCESSING' },
]

// ── interactions ─────────────────────────────────────────────────────────────
const activeDim = ref(0)
const activeHw = ref(0)
const raceState = ref<'idle' | 'running'>('idle')
const cloudStep = ref(-1)
const edgeStep = ref(-1)
const timers: ReturnType<typeof setTimeout>[] = []
function runRace(): void {
  timers.forEach(clearTimeout); timers.length = 0
  raceState.value = 'running'; cloudStep.value = -1; edgeStep.value = -1
  // The edge path resolves dramatically faster than the cloud round-trip.
  EDGE_STAGES.forEach((_, i) => timers.push(setTimeout(() => { edgeStep.value = i }, 160 + i * 170)))
  CLOUD_STAGES.forEach((_, i) => timers.push(setTimeout(() => { cloudStep.value = i }, 160 + i * 520)))
  timers.push(setTimeout(() => { raceState.value = 'idle' }, 160 + CLOUD_STAGES.length * 520 + 700))
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
      progress.value = 0; raceState.value = 'idle'; cloudStep.value = -1; edgeStep.value = -1
    })
  } else {
    unlock(); document.removeEventListener('keydown', onKey)
  }
})
onBeforeUnmount(() => { unlock(); document.removeEventListener('keydown', onKey); timers.forEach(clearTimeout) })

const dim = computed(() => DIMS[activeDim.value]!)
const hw = computed(() => HARDWARE[activeHw.value]!)
</script>

<template>
  <Teleport to="body">
    <AnimatePresence>
      <motion.div
        v-if="open" class="eex" role="dialog" aria-modal="true" aria-label="SVARA Edge AI Deployment Platform"
        :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
        :transition="{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }"
      >
        <div class="eex__backdrop" aria-hidden="true" @click="close" />
        <motion.section
          class="eex__panel"
          :initial="{ opacity: 0, scale: 0.96, y: 18 }" :animate="{ opacity: 1, scale: 1, y: 0 }"
          :exit="{ opacity: 0, scale: 0.97, y: 12 }" :transition="{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }"
        >
          <span class="eex__progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />

          <!-- HEADER (fixed) -->
          <header class="eex__header">
            <div class="eex__id">
              <span class="eex__core" aria-hidden="true"><i /></span>
              <div>
                <p class="eex__id-title">SVARA EDGE AI</p>
                <p class="eex__id-sub">DEPLOYMENT PLATFORM</p>
              </div>
              <span class="eex__status"><i />SYSTEM ONLINE</span>
            </div>
            <div class="eex__head-right">
              <span v-for="s in HEAD_STATUS" :key="s.k" class="eex__hstat"><b>{{ s.k }}</b>{{ s.v }}</span>
              <button type="button" class="eex__close" @click="close">CLOSE <span aria-hidden="true">×</span></button>
            </div>
          </header>

          <div ref="scroller" class="eex__scroll" data-lenis-prevent @scroll="onScroll">
            <div class="eex__inner">
              <!-- HERO -->
              <section class="esec esec--hero">
                <p class="elabel elabel--blue">03 // Edge Intelligence</p>
                <h1 class="eex__lede">Intelligence where decisions happen.<br><span>Not where data travels.</span></h1>
                <p class="eex__hero-copy">SVARA Edge AI moves the intelligence layer from centralised cloud servers to the physical devices where data is generated — enabling instant analysis, zero-latency response, offline operation and data privacy at the point of action.</p>

                <!-- HERO VISUAL: source → runtime → decision -->
                <div class="src einst svara-instrument">
                  <span class="einst__label">EDGE AI DEPLOYMENT PLATFORM / REAL-TIME INTELLIGENCE AT THE SOURCE</span>
                  <div class="src__flow">
                    <div class="src__col">
                      <span class="src__cap">SOURCE</span>
                      <span v-for="s in SOURCES" :key="s" class="src__node">{{ s }}</span>
                    </div>
                    <div class="src__arrow" aria-hidden="true"><span class="src__pulse" /></div>
                    <div class="src__col src__col--center">
                      <span class="src__cap">LOCAL</span>
                      <span class="src__runtime">SVARA EDGE RUNTIME</span>
                    </div>
                    <div class="src__arrow" aria-hidden="true"><span class="src__pulse src__pulse--2" /></div>
                    <div class="src__col src__col--out">
                      <span class="src__cap">ACT</span>
                      <span class="src__node src__node--out">DECISION</span>
                      <span class="src__node src__node--out">ACTION</span>
                    </div>
                  </div>
                  <div class="src__boot">
                    <span v-for="b in BOOT" :key="b.k" class="src__boot-cell"><b>{{ b.k }}</b>{{ b.v }}</span>
                  </div>
                  <p class="esim">◦ SIMULATED INTERFACE STATE</p>
                </div>
              </section>

              <!-- LATENCY -->
              <section class="esec">
                <div class="esec__head"><span class="elabel">Latency</span><h2 class="esec__title">The distance between data and decision.</h2></div>
                <div class="race einst svara-instrument">
                  <div class="race__top">
                    <p class="ebody race__intro">The cost of a cloud round-trip is measured in milliseconds that matter. SVARA Edge AI removes the journey.</p>
                    <button type="button" class="race__run" @click="runRace">{{ raceState === 'idle' ? 'RUN COMPARISON' : 'RUNNING…' }} ↗</button>
                  </div>
                  <div class="race__lanes">
                    <div class="race__lane">
                      <div class="race__lane-h"><span class="race__lane-k">CLOUD-DEPENDENT AI</span><span class="race__lane-v race__lane-v--slow">200ms–2,000ms</span></div>
                      <div class="race__chain">
                        <template v-for="(c, i) in CLOUD_STAGES" :key="c">
                          <span class="race__node" :class="{ 'is-on': cloudStep >= i }">{{ c }}</span>
                          <span v-if="i < CLOUD_STAGES.length - 1" class="race__link" :class="{ 'is-on': cloudStep > i }" aria-hidden="true">→</span>
                        </template>
                      </div>
                    </div>
                    <div class="race__lane race__lane--edge">
                      <div class="race__lane-h"><span class="race__lane-k race__lane-k--edge">SVARA EDGE AI</span><span class="race__lane-v race__lane-v--fast">5–50ms</span></div>
                      <div class="race__chain">
                        <template v-for="(c, i) in EDGE_STAGES" :key="c">
                          <span class="race__node race__node--edge" :class="{ 'is-on': edgeStep >= i }">{{ c }}</span>
                          <span v-if="i < EDGE_STAGES.length - 1" class="race__link race__link--edge" :class="{ 'is-on': edgeStep > i }" aria-hidden="true">→</span>
                        </template>
                      </div>
                    </div>
                  </div>
                  <p class="esim">◦ SOURCE-SUPPORTED FIGURES · ILLUSTRATIVE TIMING</p>
                </div>
              </section>

              <!-- CLOUD VS EDGE -->
              <section class="esec">
                <div class="esec__head"><span class="elabel">Comparison</span><h2 class="esec__title">The decisive comparison.</h2></div>
                <div class="cmp">
                  <div class="cmp__tabs">
                    <button v-for="(d, i) in DIMS" :key="d.n" type="button" class="cmp__tab" :class="{ 'is-active': activeDim === i }" @click="activeDim = i">
                      <span class="cmp__tab-n">{{ d.n }}</span>{{ d.k }}
                    </button>
                  </div>
                  <div class="cmp__detail">
                    <div class="cmp__side einst svara-instrument">
                      <span class="einst__label">CLOUD-DEPENDENT</span>
                      <p class="cmp__side-k">{{ dim.k }}</p>
                      <p class="cmp__side-v">{{ dim.cloud }}</p>
                    </div>
                    <div class="cmp__side cmp__side--edge einst svara-instrument">
                      <span class="einst__label">SVARA EDGE</span>
                      <p class="cmp__side-k cmp__side-k--edge">{{ dim.k }}</p>
                      <p class="cmp__side-v cmp__side-v--edge">{{ dim.edge }}</p>
                    </div>
                  </div>
                </div>
              </section>

              <!-- PROCESSING PIPELINE -->
              <section class="esec">
                <div class="esec__head"><span class="elabel">Pipeline</span><h2 class="esec__title">The SVARA edge processing pipeline.</h2></div>
                <div class="pipe">
                  <template v-for="(p, i) in PIPE" :key="p.n">
                    <div class="pipe__stage einst svara-instrument">
                      <span class="einst__label">STAGE / {{ p.n }}</span>
                      <div class="pipe__head">
                        <p class="pipe__k">{{ p.k }}</p>
                        <span v-if="p.badge" class="pipe__badge">{{ p.badge }}</span>
                        <span v-if="p.stat" class="pipe__stat">{{ p.stat }}<b>{{ p.statl }}</b></span>
                      </div>
                      <p class="pipe__sub">{{ p.sub }}</p>
                      <div class="caps"><span v-for="it in p.items" :key="it" class="echip">{{ it }}</span></div>
                    </div>
                    <span v-if="i < PIPE.length - 1" class="pipe__link" aria-hidden="true">↓</span>
                  </template>
                </div>
              </section>

              <!-- EDGE RUNTIME -->
              <section class="esec">
                <div class="esec__head"><span class="elabel">Runtime</span><h2 class="esec__title">The embedded AI operating layer.</h2></div>
                <div class="rt einst svara-instrument">
                  <span class="einst__label">SVARA EDGE RUNTIME</span>
                  <div class="rt__core">SVARA EDGE RUNTIME</div>
                  <div class="rt__row"><span class="elabel elabel--blue">Formats</span><div class="caps"><span v-for="f in FORMATS" :key="f" class="echip echip--on">{{ f }}</span></div></div>
                  <div class="rt__row"><span class="elabel elabel--blue">Model compression</span><div class="caps"><span class="echip">INT8</span><span class="echip">FP16</span><span class="echip">Knowledge distillation</span></div></div>
                  <div class="rt__row"><span class="elabel elabel--blue">Multi-task inference</span><div class="caps"><span v-for="m in MULTITASK" :key="m" class="echip">{{ m }}</span></div></div>
                  <div class="rt__row"><span class="elabel elabel--blue">Adaptive compute</span><div class="rt__adapt"><span class="echip">HIGH PRIORITY</span><span class="rt__adapt-arrow" aria-hidden="true">→</span><span class="echip echip--on">MORE PROCESSING</span></div></div>
                </div>
              </section>

              <!-- AUTONOMOUS ACTION -->
              <section class="esec">
                <div class="esec__head"><span class="elabel">Automation</span><h2 class="esec__title">From detection to action.</h2></div>
                <div class="act einst svara-instrument">
                  <span class="einst__label">LOCAL DECISION LOOP</span>
                  <div class="act__chain">
                    <template v-for="(c, i) in ACTION_CHAIN" :key="c">
                      <span class="act__node"><b>{{ c }}</b><em v-if="ACTION_SUB[i]">{{ ACTION_SUB[i] }}</em></span>
                      <span v-if="i < ACTION_CHAIN.length - 1" class="act__link" aria-hidden="true">↓</span>
                    </template>
                  </div>
                  <div class="caps act__caps"><span v-for="a in ACTIONS" :key="a" class="echip echip--on">{{ a }}</span></div>
                  <p class="act__no">NO CLOUD REQUIRED.</p>
                </div>
              </section>

              <!-- DEVICE NETWORK -->
              <section class="esec">
                <div class="esec__head"><span class="elabel">Device Network</span><h2 class="esec__title">Peer-to-peer device coordination.</h2></div>
                <div class="net">
                  <span class="net__ring" aria-hidden="true" />
                  <span class="net__center">SVARA EDGE<br>INTELLIGENCE</span>
                  <span
                    v-for="(n, i) in NET_NODES" :key="n" class="net__node"
                    :style="{ '--i': i, '--n': NET_NODES.length }"
                  >{{ n }}</span>
                </div>
                <p class="ebody net__copy">Edge nodes communicate directly for swarm-level response — coordination continues at the source, without a cloud in the loop.</p>
              </section>

              <!-- HARDWARE -->
              <section class="esec">
                <div class="esec__head"><span class="elabel">Hardware</span><h2 class="esec__title">Supported hardware platforms.</h2></div>
                <div class="hw">
                  <div class="hw__tabs">
                    <button v-for="(h, i) in HARDWARE" :key="h.n" type="button" class="hw__tab" :class="{ 'is-active': activeHw === i }" @click="activeHw = i">
                      <span class="hw__tab-n">{{ h.n }}</span>{{ h.k }}
                    </button>
                  </div>
                  <div class="hw__detail einst svara-instrument">
                    <span class="einst__label">PLATFORM / {{ hw.n }}</span>
                    <p class="hw__k">{{ hw.k }}</p>
                    <div class="hw__perf">
                      <span class="hw__perf-v">{{ hw.perf }}</span>
                      <span v-if="hw.tier" class="hw__tier">{{ hw.tier }}</span>
                    </div>
                    <p class="elabel elabel--blue hw__apps-l">Primary applications</p>
                    <div class="caps"><span v-for="a in hw.apps" :key="a" class="echip">{{ a }}</span></div>
                  </div>
                </div>
              </section>

              <!-- INDUSTRIAL -->
              <section class="esec">
                <div class="esec__head"><span class="elabel">Industrial</span><h2 class="esec__title">When milliseconds matter.</h2></div>
                <div class="ichain">
                  <template v-for="(c, i) in INDUSTRIAL_CHAIN" :key="c">
                    <span class="ichain__node">{{ c }}</span>
                    <span v-if="i < INDUSTRIAL_CHAIN.length - 1" class="ichain__link" aria-hidden="true">→</span>
                  </template>
                </div>
                <div class="grid4">
                  <div v-for="(m, i) in INDUSTRIAL" :key="m.t" class="emod einst svara-instrument">
                    <span class="einst__label">0{{ i + 1 }}</span>
                    <p class="emod__t">{{ m.t }}</p><p class="emod__b">{{ m.b }}</p>
                  </div>
                </div>
                <div class="proto einst svara-instrument">
                  <span class="einst__label">PROTOCOL INTEGRATION</span>
                  <div class="caps"><span v-for="p in PROTOCOLS" :key="p" class="echip echip--on">{{ p }}</span></div>
                  <p class="ebody">Direct <b>PLC / SCADA</b> integration — Edge AI wired straight into industrial control.</p>
                </div>
              </section>

              <!-- SMART CITY -->
              <section class="esec">
                <div class="esec__head"><span class="elabel">Smart City</span><h2 class="esec__title">Distributed civic intelligence.</h2></div>
                <div class="grid4">
                  <div v-for="(c, i) in CITY" :key="c.t" class="emod einst svara-instrument">
                    <span class="einst__label">NODE / 0{{ i + 1 }}</span>
                    <p class="emod__t">{{ c.t }}</p><p class="emod__b">{{ c.b }}</p>
                  </div>
                </div>
              </section>

              <!-- HEALTHCARE -->
              <section class="esec">
                <div class="esec__head"><span class="elabel">Healthcare</span><h2 class="esec__title">Intelligence without sending the room away.</h2></div>
                <div class="grid3">
                  <div v-for="(h, i) in HEALTH" :key="h.t" class="emod einst svara-instrument">
                    <span class="einst__label">0{{ i + 1 }}</span>
                    <p class="emod__t">{{ h.t }}</p><p class="emod__b">{{ h.b }}</p>
                  </div>
                </div>
                <div class="caps health__tags"><span class="echip echip--on">LOCAL PROCESSING</span><span class="echip echip--on">PRIVACY</span><span class="echip echip--on">REAL-TIME ALERTS</span></div>
              </section>

              <!-- MLOPS -->
              <section class="esec">
                <div class="esec__head"><span class="elabel">MLOps</span><h2 class="esec__title">Intelligence that keeps evolving.</h2></div>
                <div class="flow">
                  <template v-for="(s, i) in MLOPS_FLOW" :key="s">
                    <span class="flow__node">{{ s }}</span>
                    <span v-if="i < MLOPS_FLOW.length - 1" class="flow__link" aria-hidden="true">→</span>
                  </template>
                </div>
                <div class="caps mlops__caps"><span v-for="c in MLOPS_CAPS" :key="c" class="echip">{{ c }}</span></div>
              </section>

              <!-- FEDERATED LEARNING -->
              <section class="esec">
                <div class="esec__head"><span class="elabel">Federated Learning</span><h2 class="esec__title">Every device learns. No device shares.</h2></div>
                <div class="fed">
                  <div class="fed__devices">
                    <div v-for="d in FED_DEVICES" :key="d" class="fed__device einst svara-instrument">
                      <span class="fed__dot" /><span class="fed__n">{{ d }}</span><span class="fed__learn">LEARNS LOCALLY</span>
                    </div>
                  </div>
                  <span class="fed__up" aria-hidden="true">↑ MODEL IMPROVEMENTS ONLY ↑</span>
                  <div class="fed__registry einst svara-instrument"><span class="einst__label">CENTRAL REGISTRY</span>CENTRAL MODEL REGISTRY</div>
                  <p class="fed__raw">RAW DATA NEVER LEAVES DEVICE</p>
                </div>
              </section>

              <!-- SVARA ARCHITECTURE -->
              <section class="esec">
                <div class="esec__head"><span class="elabel">Architecture</span><h2 class="esec__title">The infrastructure under the intelligence.</h2></div>
                <div class="arch">
                  <div class="arch__inputs">
                    <span v-for="a in ARCH_INPUTS" :key="a" class="arch__in">{{ a }}</span>
                  </div>
                  <span class="arch__link" aria-hidden="true">→</span>
                  <div class="arch__edge einst svara-instrument"><span class="einst__label">EDGE-FIRST</span>SVARA EDGE AI</div>
                  <span class="arch__link" aria-hidden="true">→</span>
                  <div class="arch__os">SVARA ONE AI OS</div>
                </div>
                <p class="ebody arch__copy">SVARA's Vision, Drone and Industrial IoT stack is architected edge-first. Edge AI makes the wider SVARA stack:</p>
                <div class="caps arch__benefits"><span v-for="b in ARCH_BENEFITS" :key="b" class="echip echip--on">{{ b }}</span></div>
              </section>

              <!-- COMMERCIAL -->
              <section class="esec">
                <div class="esec__head"><span class="elabel">Commercial Model</span><h2 class="esec__title">Deployment configurations.</h2></div>
                <div class="grid2">
                  <div v-for="c in COMMERCIAL" :key="c.n" class="comm einst svara-instrument">
                    <span class="einst__label">0{{ c.n }}</span>
                    <p class="comm__k">{{ c.k }}</p>
                    <p class="comm__spec">{{ c.spec }}</p>
                    <p class="comm__price"><span class="comm__v">{{ c.v }}</span><span class="comm__u">{{ c.u }}</span></p>
                  </div>
                </div>
              </section>

              <!-- KEY PERFORMANCE -->
              <section class="esec">
                <div class="esec__head"><span class="elabel">Performance</span><h2 class="esec__title">Edge AI capabilities.</h2></div>
                <div class="kpi">
                  <div v-for="k in KPI" :key="k.l" class="kpi__cell einst svara-instrument">
                    <span class="kpi__v">{{ k.v }}</span><span class="kpi__l">{{ k.l }}</span>
                  </div>
                </div>
                <p class="esim">◦ SOURCE-SUPPORTED EDGE AI CAPABILITIES</p>
              </section>

              <!-- FINAL -->
              <section class="esec esec--final">
                <p class="eex__final">Intelligence where decisions happen.<br><span>Not where data travels.</span></p>
                <p class="eex__final-brand">SVARA EDGE AI DEPLOYMENT PLATFORM</p>
                <p class="eex__final-copy">SVARA Edge AI brings intelligence directly to the devices, machines and sensors where operational decisions are made.</p>
                <div class="eex__final-cta">
                  <NuxtLink to="/contact" class="eex__cta eex__cta--primary" @click="close">CONNECT WITH SVARA <span aria-hidden="true">↗</span></NuxtLink>
                  <NuxtLink to="/ecosystem" class="eex__cta eex__cta--ghost" @click="close">EXPLORE THE SVARA STACK</NuxtLink>
                </div>
              </section>

              <footer class="eex__foot">SVARA · EDGE AI · LOCAL INFERENCE · v1.0</footer>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  </Teleport>
</template>

<style scoped>
.eex {
  position: fixed; inset: 0; z-index: 100000; display: flex; justify-content: center;
  --ex-bg: #03070f; --ex-bg2: #081326; --ex-ink: #eaf2ff; --ex-muted: rgba(186, 206, 238, 0.6);
  --ex-line: rgba(47, 107, 255, 0.28); --ex-blue: #2f6bff; --ex-cyan: #67e0ff; --ex-green: #38d29a; --ex-amber: #ffb020;
  color: var(--ex-ink); font-family: var(--font-mono, ui-monospace, monospace);
}
.eex__backdrop { position: absolute; inset: 0; background: rgba(1, 4, 12, 0.68); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); }
.eex__panel {
  position: relative; z-index: 1; width: min(1340px, 100%); height: 100%; display: flex; flex-direction: column; overflow: hidden;
  background: radial-gradient(circle at 14% 6%, rgba(47, 107, 255, 0.13), transparent 30%), radial-gradient(circle at 88% 86%, rgba(103, 224, 255, 0.08), transparent 34%), linear-gradient(160deg, var(--ex-bg2), var(--ex-bg) 60%, #02040c);
  border-left: 1px solid var(--ex-line); border-right: 1px solid var(--ex-line); box-shadow: 0 0 120px -20px rgba(0, 0, 0, 0.84);
}
.eex__progress { position: absolute; top: 0; left: 0; height: 2px; width: 100%; transform-origin: left; background: linear-gradient(90deg, var(--ex-blue), var(--ex-cyan)); z-index: 6; }

.eex__header { flex: 0 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; padding: 14px clamp(16px, 3vw, 34px); border-bottom: 1px solid var(--ex-line); background: linear-gradient(90deg, rgba(6, 12, 26, 0.92), rgba(10, 22, 46, 0.6)); }
.eex__id { display: flex; align-items: center; gap: 13px; min-width: 0; }
.eex__core { position: relative; width: 30px; height: 30px; border: 1px solid var(--ex-blue); display: grid; place-items: center; flex-shrink: 0; clip-path: polygon(0 6px, 6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%); }
.eex__core i { width: 8px; height: 8px; background: var(--ex-blue); box-shadow: 0 0 12px var(--ex-blue); animation: eex-pulse 2.4s ease-in-out infinite; }
.eex__id-title { margin: 0; font-size: 13px; font-weight: 700; letter-spacing: 0.14em; color: #fff; }
.eex__id-sub { margin: 2px 0 0; font-size: 9px; letter-spacing: 0.16em; color: var(--ex-muted); }
.eex__status { display: inline-flex; align-items: center; gap: 7px; margin-left: 6px; font-size: 9.5px; letter-spacing: 0.13em; color: var(--ex-green); }
.eex__status i { width: 6px; height: 6px; border-radius: 50%; background: var(--ex-green); box-shadow: 0 0 10px var(--ex-green); }
.eex__head-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.eex__hstat { display: inline-flex; flex-direction: column; font-size: 8px; letter-spacing: 0.1em; color: var(--ex-cyan); line-height: 1.4; }
.eex__hstat b { color: var(--ex-muted); font-weight: 500; }
.eex__close { display: inline-flex; align-items: center; gap: 7px; padding: 9px 15px; border: 1px solid var(--ex-line); background: rgba(47, 107, 255, 0.06); color: var(--ex-ink); font: inherit; font-size: 10px; letter-spacing: 0.13em; cursor: pointer; transition: background 180ms, border-color 180ms; clip-path: polygon(0 5px, 5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%); }
.eex__close:hover { background: rgba(47, 107, 255, 0.16); border-color: var(--ex-blue); }

.eex__scroll { flex: 1 1 auto; min-height: 0; overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--ex-blue) transparent; }
.eex__scroll::-webkit-scrollbar { width: 8px; }
.eex__scroll::-webkit-scrollbar-thumb { background: rgba(47, 107, 255, 0.4); border-radius: 8px; }
.eex__inner { max-width: 1140px; margin-inline: auto; padding: clamp(28px, 5vw, 68px) clamp(16px, 3vw, 40px) 60px; }

/* shared primitives */
.einst { position: relative; padding: 40px 18px 18px; background: rgba(7, 15, 32, 0.5); }
.einst__label { position: absolute; top: 9px; left: clamp(14px, 2vw, 22px); z-index: 3; font-size: 9px; letter-spacing: 0.16em; color: var(--ex-cyan); pointer-events: none; }
.elabel { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ex-muted); }
.elabel--blue { color: var(--ex-cyan); }
.echip { display: inline-flex; align-items: center; padding: 7px 12px; font-size: 10px; letter-spacing: 0.05em; color: var(--ex-ink); border: 1px solid var(--ex-line); background: rgba(47, 107, 255, 0.05); }
.echip--on { color: var(--ex-cyan); border-color: var(--ex-blue); background: rgba(47, 107, 255, 0.1); }
.esim { margin: 14px 0 0; font-size: 8.5px; letter-spacing: 0.14em; color: var(--ex-muted); }
.ebody { margin: 16px 0 0; max-width: 64ch; font-size: 12.5px; line-height: 1.7; color: var(--ex-muted); }
.ebody b { color: var(--ex-cyan); }
.caps { display: flex; flex-wrap: wrap; gap: 8px; }
.esec { padding: clamp(34px, 5vw, 60px) 0; border-top: 1px solid rgba(47, 107, 255, 0.12); }
.esec--hero { border-top: 0; padding-top: 6px; }
.esec__head { margin-bottom: 24px; }
.esec__title { margin: 8px 0 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(21px, 3vw, 34px); font-weight: 650; letter-spacing: -0.01em; color: #fff; }

.eex__lede { margin: 12px 0 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(28px, 5vw, 60px); font-weight: 600; line-height: 1.03; letter-spacing: -0.02em; color: #fff; }
.eex__lede span { color: var(--ex-cyan); }
.eex__hero-copy { margin: 22px 0 30px; max-width: 64ch; font-size: 13.5px; line-height: 1.7; color: var(--ex-muted); }

/* HERO source→runtime→decision */
.src__flow { display: grid; grid-template-columns: 1fr auto 1.2fr auto 1fr; align-items: center; gap: 10px; margin-bottom: 20px; }
.src__col { display: flex; flex-direction: column; gap: 7px; }
.src__col--center { align-items: center; }
.src__col--out { align-items: flex-end; }
.src__cap { font-size: 8px; letter-spacing: 0.2em; color: var(--ex-muted); margin-bottom: 2px; }
.src__node { padding: 8px 11px; border: 1px solid var(--ex-line); background: rgba(47, 107, 255, 0.05); font-size: 10px; font-weight: 700; letter-spacing: 0.05em; color: var(--ex-ink); text-align: center; }
.src__node--out { color: var(--ex-cyan); border-color: var(--ex-blue); background: rgba(47, 107, 255, 0.1); }
.src__runtime { display: grid; place-items: center; width: 100%; min-height: 96px; padding: 16px; border: 1px solid var(--ex-blue); background: rgba(47, 107, 255, 0.09); font-size: 12px; font-weight: 700; letter-spacing: 0.08em; color: var(--ex-cyan); text-align: center; box-shadow: inset 0 0 30px -10px rgba(47, 107, 255, 0.5); }
.src__arrow { position: relative; height: 1px; background: linear-gradient(90deg, transparent, var(--ex-blue), transparent); overflow: visible; }
.src__pulse { position: absolute; top: 50%; left: 0; width: 6px; height: 6px; border-radius: 50%; background: var(--ex-cyan); box-shadow: 0 0 10px var(--ex-cyan); translate: 0 -50%; animation: eex-run 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite; }
.src__pulse--2 { animation-delay: 0.6s; }
.src__boot { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
.src__boot-cell { display: inline-flex; flex-direction: column; gap: 3px; padding: 10px; border: 1px solid var(--ex-line); background: rgba(47, 107, 255, 0.04); font-size: 9px; letter-spacing: 0.08em; color: var(--ex-green); text-align: center; }
.src__boot-cell b { color: var(--ex-muted); font-weight: 500; font-size: 8px; letter-spacing: 0.12em; }

/* LATENCY race */
.race__top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; margin-bottom: 22px; }
.race__intro { margin: 0; max-width: 58ch; }
.race__run { flex: none; padding: 11px 18px; border: 1px solid var(--ex-blue); background: rgba(47, 107, 255, 0.1); color: var(--ex-cyan); font: inherit; font-size: 10px; letter-spacing: 0.1em; cursor: pointer; transition: background 180ms; }
.race__run:hover { background: rgba(47, 107, 255, 0.2); }
.race__lanes { display: flex; flex-direction: column; gap: 16px; }
.race__lane { padding: 16px; border: 1px solid var(--ex-line); background: rgba(7, 15, 32, 0.4); }
.race__lane--edge { border-color: var(--ex-blue); background: rgba(47, 107, 255, 0.06); }
.race__lane-h { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-bottom: 14px; flex-wrap: wrap; }
.race__lane-k { font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; color: var(--ex-muted); }
.race__lane-k--edge { color: var(--ex-cyan); }
.race__lane-v { font-size: clamp(18px, 2.4vw, 28px); font-weight: 700; font-variant-numeric: tabular-nums; }
.race__lane-v--slow { color: var(--ex-amber); }
.race__lane-v--fast { color: var(--ex-green); }
.race__chain { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; }
.race__node { padding: 9px 12px; border: 1px solid var(--ex-line); background: rgba(7, 15, 32, 0.5); font-size: 10px; font-weight: 700; letter-spacing: 0.05em; color: var(--ex-muted); transition: color 260ms, border-color 260ms, background 260ms; }
.race__node.is-on { color: #fff; border-color: var(--ex-amber); background: rgba(255, 176, 32, 0.12); }
.race__node--edge.is-on { border-color: var(--ex-green); background: rgba(56, 210, 154, 0.14); }
.race__link { color: rgba(120, 150, 200, 0.35); transition: color 260ms; }
.race__link.is-on { color: var(--ex-amber); }
.race__link--edge.is-on { color: var(--ex-green); }

/* CLOUD VS EDGE */
.cmp { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 14px; }
.cmp__tabs { display: flex; flex-direction: column; gap: 8px; }
.cmp__tab { display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: rgba(7, 15, 32, 0.5); border: 1px solid transparent; color: var(--ex-muted); font: inherit; font-size: 11px; letter-spacing: 0.05em; text-align: left; cursor: pointer; transition: color 180ms, background 180ms, border-color 180ms; }
.cmp__tab.is-active { color: #fff; background: rgba(47, 107, 255, 0.08); border-color: var(--ex-line); }
.cmp__tab-n { color: var(--ex-cyan); font-size: 11px; }
.cmp__detail { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.cmp__side-k { margin: 0 0 12px; font-size: 10px; letter-spacing: 0.1em; color: var(--ex-muted); }
.cmp__side-k--edge { color: var(--ex-cyan); }
.cmp__side-v { margin: 0; font-size: 15px; line-height: 1.5; font-weight: 650; color: var(--ex-muted); }
.cmp__side--edge { border: 1px solid var(--ex-blue); }
.cmp__side-v--edge { color: #fff; }

/* PIPELINE */
.pipe { display: flex; flex-direction: column; align-items: stretch; gap: 6px; }
.pipe__head { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.pipe__k { margin: 0; font-size: 13px; font-weight: 700; letter-spacing: 0.06em; color: #fff; }
.pipe__badge { padding: 5px 10px; border: 1px solid var(--ex-blue); background: rgba(47, 107, 255, 0.12); font-size: 9.5px; font-weight: 700; letter-spacing: 0.08em; color: var(--ex-cyan); }
.pipe__stat { display: inline-flex; align-items: baseline; gap: 8px; font-size: clamp(18px, 2.4vw, 26px); font-weight: 700; color: var(--ex-green); }
.pipe__stat b { font-size: 8.5px; font-weight: 500; letter-spacing: 0.12em; color: var(--ex-muted); }
.pipe__sub { margin: 8px 0 14px; font-size: 10.5px; letter-spacing: 0.06em; color: var(--ex-cyan); }
.pipe__link { align-self: center; color: var(--ex-blue); font-size: 15px; }

/* RUNTIME */
.rt__core { display: grid; place-items: center; min-height: 74px; margin-bottom: 18px; border: 1px solid var(--ex-blue); background: rgba(47, 107, 255, 0.1); font-size: 14px; font-weight: 700; letter-spacing: 0.1em; color: var(--ex-cyan); box-shadow: inset 0 0 40px -14px rgba(47, 107, 255, 0.6); }
.rt__row { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; padding: 12px 0; border-top: 1px solid rgba(47, 107, 255, 0.12); }
.rt__row > .elabel { flex: 0 0 150px; }
.rt__adapt { display: inline-flex; align-items: center; gap: 10px; }
.rt__adapt-arrow { color: var(--ex-blue); }

/* AUTONOMOUS ACTION */
.act__chain { display: flex; flex-direction: column; align-items: center; gap: 8px; margin-bottom: 20px; }
.act__node { width: 100%; max-width: 460px; display: flex; flex-direction: column; gap: 3px; align-items: center; text-align: center; padding: 13px; border: 1px solid var(--ex-line); background: rgba(47, 107, 255, 0.05); }
.act__node b { font-size: 12px; font-weight: 700; letter-spacing: 0.06em; color: #fff; }
.act__node em { font-style: normal; font-size: 9.5px; letter-spacing: 0.08em; color: var(--ex-muted); }
.act__link { color: var(--ex-blue); }
.act__caps { justify-content: center; }
.act__no { margin: 20px 0 0; text-align: center; font-size: 12px; font-weight: 700; letter-spacing: 0.14em; color: var(--ex-cyan); }

/* DEVICE NETWORK */
.net { position: relative; height: 340px; display: grid; place-items: center; margin-bottom: 8px; }
.net__ring { position: absolute; width: 232px; height: 232px; border-radius: 50%; border: 1px dashed var(--ex-line); }
.net__center { position: relative; z-index: 2; display: grid; place-items: center; width: 132px; height: 132px; border-radius: 50%; border: 1px solid var(--ex-blue); background: rgba(47, 107, 255, 0.1); font-size: 10px; font-weight: 700; letter-spacing: 0.08em; color: var(--ex-cyan); text-align: center; line-height: 1.4; box-shadow: 0 0 44px -10px rgba(47, 107, 255, 0.7); }
.net__node { position: absolute; padding: 8px 12px; border: 1px solid var(--ex-line); background: rgba(7, 15, 32, 0.9); font-size: 9.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--ex-ink); transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-150px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
.net__copy { margin-inline: auto; text-align: center; }

/* HARDWARE */
.hw { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 14px; }
.hw__tabs { display: flex; flex-direction: column; gap: 8px; }
.hw__tab { display: flex; align-items: center; gap: 12px; padding: 15px 16px; background: rgba(7, 15, 32, 0.5); border: 1px solid transparent; color: var(--ex-muted); font: inherit; font-size: 11px; letter-spacing: 0.04em; text-align: left; cursor: pointer; transition: color 180ms, background 180ms, border-color 180ms; }
.hw__tab.is-active { color: #fff; background: rgba(47, 107, 255, 0.08); border-color: var(--ex-line); }
.hw__tab-n { color: var(--ex-cyan); font-size: 11px; }
.hw__k { margin: 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: 20px; font-weight: 650; color: #fff; }
.hw__perf { display: flex; flex-wrap: wrap; align-items: baseline; gap: 12px; margin: 14px 0 18px; }
.hw__perf-v { font-size: clamp(20px, 2.6vw, 30px); font-weight: 700; color: var(--ex-cyan); }
.hw__tier { padding: 5px 10px; border: 1px solid var(--ex-line); font-size: 9.5px; letter-spacing: 0.08em; color: var(--ex-muted); }
.hw__apps-l { margin: 0 0 10px; }

/* INDUSTRIAL / grids */
.ichain { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 8px; margin-bottom: 22px; }
.ichain__node { padding: 10px 15px; border: 1px solid var(--ex-blue); background: rgba(47, 107, 255, 0.06); font-size: 10.5px; font-weight: 700; letter-spacing: 0.06em; color: var(--ex-cyan); }
.ichain__link { color: var(--ex-blue); }
.grid4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.grid3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.grid2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.emod__t { margin: 0 0 8px; font-size: 11.5px; font-weight: 700; letter-spacing: 0.05em; color: #fff; }
.emod__b { margin: 0; font-size: 10.5px; line-height: 1.6; color: var(--ex-muted); }
.proto { margin-top: 12px; }
.proto .ebody { margin-top: 14px; }
.health__tags { margin-top: 16px; }

/* MLOPS flow */
.flow { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 8px; margin-bottom: 20px; }
.flow__node { padding: 11px 15px; border: 1px solid var(--ex-blue); background: rgba(47, 107, 255, 0.06); font-size: 10px; font-weight: 700; letter-spacing: 0.05em; color: var(--ex-cyan); }
.flow__link { color: var(--ex-blue); }
.mlops__caps { justify-content: center; }

/* FEDERATED */
.fed { display: flex; flex-direction: column; align-items: center; gap: 14px; }
.fed__devices { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; width: 100%; }
.fed__device { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; padding-top: 20px; }
.fed__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--ex-green); box-shadow: 0 0 8px var(--ex-green); }
.fed__n { font-size: 12px; font-weight: 700; color: #fff; }
.fed__learn { font-size: 8.5px; letter-spacing: 0.12em; color: var(--ex-muted); }
.fed__up { font-size: 9px; letter-spacing: 0.16em; color: var(--ex-cyan); }
.fed__registry { width: 100%; max-width: 520px; text-align: center; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; color: #fff; padding-top: 34px; }
.fed__raw { margin: 4px 0 0; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; color: var(--ex-cyan); }

/* ARCHITECTURE */
.arch { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 12px; }
.arch__inputs { display: flex; flex-direction: column; gap: 8px; }
.arch__in { padding: 11px 16px; border: 1px solid var(--ex-line); background: rgba(47, 107, 255, 0.05); font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--ex-ink); text-align: center; }
.arch__link { color: var(--ex-blue); font-size: 18px; }
.arch__edge { text-align: center; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; color: var(--ex-cyan); padding: 34px 26px 22px; }
.arch__os { padding: 22px 26px; border: 1px solid var(--ex-blue); background: rgba(47, 107, 255, 0.1); font-size: 12px; font-weight: 700; letter-spacing: 0.08em; color: #fff; text-align: center; }
.arch__copy { margin-inline: auto; text-align: center; }
.arch__benefits { justify-content: center; margin-top: 14px; }

/* COMMERCIAL */
.comm { display: flex; flex-direction: column; }
.comm__k { margin: 0 0 10px; font-size: 12.5px; font-weight: 700; letter-spacing: 0.06em; color: var(--ex-cyan); }
.comm__spec { margin: 0; font-size: 11.5px; line-height: 1.6; color: var(--ex-muted); }
.comm__price { display: flex; flex-direction: column; gap: 4px; margin: 16px 0 0; }
.comm__v { font-size: clamp(18px, 2.4vw, 26px); font-weight: 700; color: #fff; font-variant-numeric: tabular-nums; }
.comm__u { font-size: 9px; letter-spacing: 0.12em; color: var(--ex-muted); }

/* KPI */
.kpi { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px; }
.kpi__cell { display: flex; flex-direction: column; gap: 8px; align-items: center; text-align: center; padding-top: 30px; }
.kpi__v { font-size: clamp(16px, 2.2vw, 24px); font-weight: 700; color: var(--ex-cyan); }
.kpi__l { font-size: 9px; letter-spacing: 0.1em; color: var(--ex-muted); }

/* FINAL */
.esec--final { text-align: center; border-top: 1px solid var(--ex-line); }
.eex__final { margin: 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(26px, 4.4vw, 52px); font-weight: 600; line-height: 1.08; color: #fff; }
.eex__final span { color: var(--ex-cyan); }
.eex__final-brand { margin: 22px 0 0; font-size: 12px; letter-spacing: 0.2em; color: var(--ex-muted); }
.eex__final-copy { margin: 12px auto 0; max-width: 56ch; font-size: 12.5px; line-height: 1.7; color: var(--ex-muted); }
.eex__final-cta { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 26px; }
.eex__cta { display: inline-flex; align-items: center; gap: 10px; padding: 15px 28px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-decoration: none; }
.eex__cta--primary { background: var(--ex-blue); color: #04101f; }
.eex__cta--ghost { background: transparent; color: var(--ex-ink); border: 1px solid var(--ex-line); }
.eex__foot { margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(47, 107, 255, 0.12); text-align: center; font-size: 9px; letter-spacing: 0.2em; color: var(--ex-muted); }

@keyframes eex-pulse { 50% { opacity: 0.45; } }
@keyframes eex-run { 0% { left: 0; opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { left: 100%; opacity: 0; } }

/* ── responsive ── */
@media (max-width: 900px) {
  .grid4, .grid3, .fed__devices { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid2, .kpi { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .cmp, .hw { grid-template-columns: 1fr; }
  .cmp__tabs, .hw__tabs { flex-direction: row; flex-wrap: wrap; }
  .src__flow { grid-template-columns: 1fr; }
  .src__arrow { height: 22px; width: 1px; background: linear-gradient(180deg, transparent, var(--ex-blue), transparent); margin: 0 auto; }
  .src__pulse { top: 0; left: 50%; translate: -50% 0; animation: eex-run-v 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite; }
  .src__col--out { align-items: stretch; }
  .src__boot { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .eex__hstat { display: none; }
  .net__node { transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-124px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
}
@media (max-width: 560px) {
  .grid4, .grid3, .grid2, .kpi, .fed__devices { grid-template-columns: 1fr; }
  .cmp__detail { grid-template-columns: 1fr; }
  .eex__id-sub { display: none; }
  .arch { flex-direction: column; }
  .arch__link { transform: rotate(90deg); }
  .net { height: 300px; }
}
@keyframes eex-run-v { 0% { top: 0; opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
  .eex__core i, .src__pulse { animation: none; }
  .race__node, .race__link { transition: none; }
}
</style>
