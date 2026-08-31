<script setup lang="ts">
// "CONNECTED ECOSYSTEM" — a live enterprise-intelligence simulation, refined
// into a premium product (architecture unchanged, five persistent layers):
//   L1 Enterprise Sources (left)   — iconed modules + animated status badge
//   L2 Intelligence Core (center)  — breathing sphere, rotating sheen,
//                                    terminal-style word morph
//   L3 Enterprise Platforms (right)— iconed modules that ignite on arrival
//   L4 Live Data Flow              — eased packets w/ trailing glow on fixed
//                                    curved SVG pipes: source → core → platform
//   L5 Live Scenario Feed (bottom) — rolling timeline, new cards from the right
// Everything traces to sim state on a clock: an industry every 12s, a packet
// every ~2s, status badges drifting, the core verb sliding, health/clock
// ticking. Clicking any source runs a full multi-stage scenario. Geometry:
// HTML modules are absolutely pinned to the SAME 140×76 grid the SVG pipes
// are drawn on, so pipes connect module-to-module and packets stay circular.
// Motion is CSS (offset-path + keyframes); JS only decides when/where.
import { onMounted, onBeforeUnmount, ref, reactive, computed } from 'vue'
import {
  Camera, RadioTower, Factory, Server, Users, FileText, PlaneTakeoff, Wifi, Cpu,
  Eye, Radar, CircuitBoard, Bot, Boxes, Cloud, Command, Code, TrendingUp, LoaderCircle,
} from '@lucide/vue'
import SectionLink from '~/components/ui/SectionLink.vue'

// ---- layer 1 · sources / layer 3 · platforms (with Lucide icons) ----
const sources = [
  { id: 'cameras', label: 'Cameras', icon: Camera }, { id: 'sensors', label: 'Sensors', icon: RadioTower },
  { id: 'machines', label: 'Machines', icon: Factory }, { id: 'erp', label: 'ERP', icon: Server },
  { id: 'crm', label: 'CRM', icon: Users }, { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'drones', label: 'Drone Fleet', icon: PlaneTakeoff }, { id: 'iot', label: 'IoT', icon: Wifi },
  { id: 'plc', label: 'PLC', icon: Cpu },
]
const platforms = [
  { id: 'vision-ai', label: 'Vision AI', icon: Eye }, { id: 'drone-ai', label: 'Drone AI', icon: Radar },
  { id: 'edge-ai', label: 'Edge AI', icon: CircuitBoard }, { id: 'ai-agents', label: 'AI Agents', icon: Bot },
  { id: 'digital-twin', label: 'Digital Twin', icon: Boxes }, { id: 'business-cloud', label: 'Business Cloud', icon: Cloud },
  { id: 'ai-os', label: 'One AI OS', icon: Command }, { id: 'digital-engineering', label: 'Digital Engineering', icon: Code },
  { id: 'growth-intelligence', label: 'Growth Intelligence', icon: TrendingUp },
]
const sourceIndex: Record<string, number> = Object.fromEntries(sources.map((s, i) => [s.id, i]))
const platformIndex: Record<string, number> = Object.fromEntries(platforms.map((p, i) => [p.id, i]))

// ---- shared 140×76 coordinate grid (SVG userspace + module pinning) ----
const X_SRC = 16, X_CORE = 70, X_PLAT = 124, Y_CORE = 38, VB_H = 76
function yFor(i: number) { return 6 + i * 8 } // 6..70 for i=0..8, core row = i=4 (y38)
function topPct(i: number) { return `${(yFor(i) / VB_H) * 100}%` }
function sourcePipe(i: number) { return `M${X_SRC} ${yFor(i)} C 42 ${yFor(i)} 54 ${Y_CORE} ${X_CORE} ${Y_CORE}` }
function platformPipe(j: number) { return `M${X_CORE} ${Y_CORE} C 86 ${Y_CORE} 98 ${yFor(j)} ${X_PLAT} ${yFor(j)}` }
function combined(i: number, j: number) {
  return `M${X_SRC} ${yFor(i)} C 42 ${yFor(i)} 54 ${Y_CORE} ${X_CORE} ${Y_CORE} C 86 ${Y_CORE} 98 ${yFor(j)} ${X_PLAT} ${yFor(j)}`
}
const sourcePipes = sources.map((_, i) => sourcePipe(i))
const platformPipes = platforms.map((_, j) => platformPipe(j))

// ---- layer 2 · core ----
const coreWords = ['Observing', 'Understanding', 'Reasoning', 'Predicting', 'Acting']
const coreWordIdx = ref(2)

// ---- flows: periodic industry scenarios (L5) ----
interface Flow { source: string, platform: string, event: string, result: string, conf: number }
interface Industry { name: string, flows: Flow[] }
const industries: Industry[] = [
  { name: 'Manufacturing', flows: [
    { source: 'cameras', platform: 'vision-ai', event: 'Surface crack detected', result: 'Batch rejected', conf: 98.4 },
    { source: 'machines', platform: 'digital-twin', event: 'Vibration spike on line 3', result: 'Maintenance created', conf: 97.6 },
    { source: 'plc', platform: 'ai-agents', event: 'Line rebalanced', result: 'Automated', conf: 99.1 },
  ] },
  { name: 'Healthcare', flows: [
    { source: 'sensors', platform: 'edge-ai', event: 'Patient vitals anomaly', result: 'Care team alerted', conf: 98.0 },
    { source: 'documents', platform: 'ai-os', event: 'Records reconciled', result: 'Synced', conf: 99.3 },
  ] },
  { name: 'Retail', flows: [
    { source: 'cameras', platform: 'vision-ai', event: 'Queue length rising', result: 'Staff optimized', conf: 97.8 },
    { source: 'crm', platform: 'growth-intelligence', event: 'Demand surge predicted', result: 'Campaign triggered', conf: 98.5 },
  ] },
  { name: 'Energy', flows: [
    { source: 'iot', platform: 'digital-twin', event: 'Grid load forecast', result: 'Dispatch adjusted', conf: 98.2 },
    { source: 'sensors', platform: 'ai-agents', event: 'Peak demand incoming', result: 'Load shifted', conf: 98.9 },
  ] },
  { name: 'Logistics', flows: [
    { source: 'drones', platform: 'drone-ai', event: 'Yard scan complete', result: 'Route updated', conf: 98.3 },
    { source: 'erp', platform: 'business-cloud', event: 'Inventory mismatch', result: 'ERP synchronized', conf: 99.4 },
  ] },
  { name: 'Agriculture', flows: [
    { source: 'drones', platform: 'vision-ai', event: 'Crop stress mapped', result: 'Irrigation set', conf: 97.9 },
    { source: 'iot', platform: 'edge-ai', event: 'Soil moisture low', result: 'Valve opened', conf: 98.6 },
  ] },
  { name: 'Mining', flows: [
    { source: 'sensors', platform: 'digital-twin', event: 'Slope movement detected', result: 'Alert raised', conf: 97.7 },
    { source: 'machines', platform: 'ai-agents', event: 'Haul cycle optimized', result: 'Automated', conf: 99.0 },
  ] },
  { name: 'Construction', flows: [
    { source: 'cameras', platform: 'vision-ai', event: 'PPE breach detected', result: 'Zone locked', conf: 98.8 },
    { source: 'drones', platform: 'digital-engineering', event: 'Site survey captured', result: 'Model updated', conf: 98.1 },
  ] },
  { name: 'Transportation', flows: [
    { source: 'sensors', platform: 'edge-ai', event: 'Brake wear predicted', result: 'Service booked', conf: 97.9 },
    { source: 'erp', platform: 'business-cloud', event: 'Fleet schedule drift', result: 'Synchronized', conf: 99.2 },
  ] },
]

// ---- click-to-run: a full multi-stage scenario per source (L8) ----
interface Step { platform: string, event: string, result: string, conf: number }
const sourceScenario: Record<string, Step[]> = {
  cameras: [
    { platform: 'vision-ai', event: 'Surface crack detected', result: 'Flagged', conf: 98.7 },
    { platform: 'digital-twin', event: 'Defect localized on line 3', result: 'Simulated', conf: 97.9 },
    { platform: 'ai-agents', event: 'Work order drafted', result: 'Dispatched', conf: 99.1 },
    { platform: 'business-cloud', event: 'ERP maintenance ticket', result: 'Created', conf: 99.4 },
  ],
  sensors: [
    { platform: 'edge-ai', event: 'Vibration anomaly', result: 'Detected', conf: 97.6 },
    { platform: 'digital-twin', event: 'Failure curve projected', result: 'Modeled', conf: 98.2 },
    { platform: 'ai-agents', event: 'Maintenance scheduled', result: 'Booked', conf: 99.0 },
  ],
  machines: [
    { platform: 'edge-ai', event: 'Torque drift', result: 'Detected', conf: 97.8 },
    { platform: 'digital-twin', event: 'Wear simulated', result: 'Modeled', conf: 98.4 },
    { platform: 'ai-agents', event: 'Setpoint corrected', result: 'Automated', conf: 99.2 },
  ],
  erp: [
    { platform: 'business-cloud', event: 'Inventory mismatch', result: 'Reconciled', conf: 99.3 },
    { platform: 'ai-os', event: 'Records synchronized', result: 'Synced', conf: 99.5 },
    { platform: 'growth-intelligence', event: 'Demand re-forecast', result: 'Updated', conf: 98.1 },
  ],
  crm: [
    { platform: 'growth-intelligence', event: 'Churn risk rising', result: 'Flagged', conf: 97.7 },
    { platform: 'ai-agents', event: 'Retention offer', result: 'Triggered', conf: 98.9 },
    { platform: 'ai-os', event: 'Playbook updated', result: 'Synced', conf: 99.0 },
  ],
  documents: [
    { platform: 'ai-os', event: 'Contract parsed', result: 'Extracted', conf: 98.6 },
    { platform: 'ai-agents', event: 'Obligations tracked', result: 'Scheduled', conf: 99.1 },
    { platform: 'business-cloud', event: 'Filing updated', result: 'Synced', conf: 99.4 },
  ],
  drones: [
    { platform: 'drone-ai', event: 'Corridor scanned', result: 'Mapped', conf: 98.3 },
    { platform: 'vision-ai', event: 'Thermal anomaly', result: 'Detected', conf: 97.9 },
    { platform: 'digital-engineering', event: 'Site model updated', result: 'Rebuilt', conf: 98.8 },
  ],
  iot: [
    { platform: 'edge-ai', event: 'Grid load spike', result: 'Detected', conf: 97.8 },
    { platform: 'digital-twin', event: 'Load rebalanced', result: 'Simulated', conf: 98.5 },
    { platform: 'ai-agents', event: 'Dispatch adjusted', result: 'Automated', conf: 99.1 },
  ],
  plc: [
    { platform: 'edge-ai', event: 'Cycle time drift', result: 'Detected', conf: 97.9 },
    { platform: 'ai-agents', event: 'Line rebalanced', result: 'Automated', conf: 99.0 },
    { platform: 'digital-twin', event: 'Throughput modeled', result: 'Optimized', conf: 98.6 },
  ],
}
function scenarioTargets(srcId: string) { return new Set((sourceScenario[srcId] ?? []).map(s => s.platform)) }

// ---- live state ----
type Status = 'Receiving' | 'Streaming' | 'Idle' | 'Processing'
interface PacketMeta { event: string, result: string, conf: number, industry: string }
interface Packet { id: number, srcIdx: number, platIdx: number, source: string, platform: string, path: string, duration: number }
interface FeedItem { id: number, time: string, industry: string, event: string, conf: number, result: string, platform: string }

const industryIdx = ref(0)
const flowCursor = ref(0)
const packets = ref<Packet[]>([])
const feed = ref<FeedItem[]>([])
const sourceStatus = reactive<Record<string, Status>>(Object.fromEntries(sources.map(s => [s.id, 'Idle'])) as Record<string, Status>)
const platformLit = reactive<Record<string, boolean>>({})
const corePulseKey = ref(0)
const currentTime = ref('')
const health = ref(97.9)
const hoveredSource = ref<string | null>(null)
const hoveredPlatform = ref<string | null>(null)
const hoveredCore = ref(false)

const currentIndustry = computed(() => industries[industryIdx.value]!)
const inFlightSrc = computed(() => new Set(packets.value.map(p => p.srcIdx)))
const inFlightPlat = computed(() => new Set(packets.value.map(p => p.platIdx)))
const hoveredSrcTargets = computed(() => hoveredSource.value ? scenarioTargets(hoveredSource.value) : new Set<string>())
const anyHover = computed(() => !!(hoveredSource.value || hoveredPlatform.value || hoveredCore.value))

// cross-highlight: hovering a source lights its downstream platforms + routes
// + feed entries; hovering a platform lights its upstream sources; hovering
// the core pulses every active route.
function sourceHot(id: string) {
  return hoveredSource.value === id
    || (!!hoveredPlatform.value && scenarioTargets(id).has(hoveredPlatform.value))
    || (hoveredCore.value && inFlightSrc.value.has(sourceIndex[id]!))
}
function platformHot(id: string) {
  return hoveredPlatform.value === id
    || hoveredSrcTargets.value.has(id)
    || (hoveredCore.value && inFlightPlat.value.has(platformIndex[id]!))
}
function srcPipeHot(i: number) {
  return inFlightSrc.value.has(i) || sourceHot(sources[i]!.id)
}
function platPipeHot(j: number) {
  return inFlightPlat.value.has(j) || platformHot(platforms[j]!.id)
}
function feedHot(e: FeedItem) {
  return hoveredPlatform.value === e.platform || hoveredSrcTargets.value.has(e.platform)
}

let nextPacketId = 0
let nextFeedId = 0
const packetMeta: Record<number, PacketMeta> = {}
const timers: ReturnType<typeof setInterval>[] = []
const transient: ReturnType<typeof setTimeout>[] = []
const litTimers: Record<string, ReturnType<typeof setTimeout>> = {}
let clockHandle: ReturnType<typeof setInterval> | null = null
let observer: IntersectionObserver | null = null
let running = false
let reducedMotion = false
let inView = false
const root = ref<HTMLElement>()

// run only while both in-view AND the tab is visible — a hidden tab throttles
// timers and pauses CSS animations, desyncing the packet lifecycle
function evaluate() {
  if (inView && !document.hidden) start()
  else stop()
}
function onVisibility() { evaluate() }

function nowLabel() {
  return new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
}
function updateClock() { currentTime.value = nowLabel() }

function setStreaming(id: string) {
  sourceStatus[id] = 'Streaming'
  clearTimeout(litTimers[`s-${id}`])
  litTimers[`s-${id}`] = setTimeout(() => { if (sourceStatus[id] === 'Streaming') sourceStatus[id] = 'Receiving' }, 1000)
}
function lightPlatform(id: string) {
  platformLit[id] = true
  clearTimeout(litTimers[`p-${id}`])
  litTimers[`p-${id}`] = setTimeout(() => { platformLit[id] = false }, 900)
}

const MAX_PACKETS = 7 // safety cap — never let packets pile up if arrivals
// stall (e.g. a throttled background tab pausing CSS animations)
function emit(sourceId: string, platformId: string, meta: PacketMeta) {
  if (packets.value.length >= MAX_PACKETS) return
  const srcIdx = sourceIndex[sourceId]!
  const platIdx = platformIndex[platformId]!
  const id = nextPacketId++
  const duration = 3 + Math.random() * 0.5
  packetMeta[id] = meta
  packets.value = [...packets.value, { id, srcIdx, platIdx, source: sourceId, platform: platformId, path: combined(srcIdx, platIdx), duration }]
  setStreaming(sourceId)
  transient.push(setTimeout(() => { corePulseKey.value++ }, duration * 1000 * 0.5)) // core reacts mid-journey
}

function spawnFlow() {
  const ind = currentIndustry.value
  const flow = ind.flows[flowCursor.value % ind.flows.length]!
  flowCursor.value++
  emit(flow.source, flow.platform, { event: flow.event, result: flow.result, conf: flow.conf, industry: ind.name })
}

function onPacketArrive(p: Packet) {
  packets.value = packets.value.filter(x => x.id !== p.id)
  const meta = packetMeta[p.id]
  delete packetMeta[p.id]
  lightPlatform(p.platform)
  if (meta) {
    feed.value = [...feed.value, { id: nextFeedId++, time: currentTime.value, industry: meta.industry, event: meta.event, conf: meta.conf, result: meta.result, platform: p.platform }].slice(-6)
  }
}

// L8 — click a source: run its whole scenario, staggered
function runScenario(sourceId: string) {
  if (reducedMotion) return
  const steps = sourceScenario[sourceId]
  if (!steps) return
  steps.forEach((step, k) => {
    transient.push(setTimeout(() => {
      emit(sourceId, step.platform, { event: step.event, result: step.result, conf: step.conf, industry: currentIndustry.value.name })
    }, k * 650))
  })
  health.value = Math.min(98.8, health.value + 0.2) // a visible-but-small bump
}

function nextIndustry() {
  industryIdx.value = (industryIdx.value + 1) % industries.length // sequential → never repeats immediately
  flowCursor.value = 0
}
function cycleCoreWord() { coreWordIdx.value = (coreWordIdx.value + 1) % coreWords.length }

// idle sources drift between non-streaming statuses — a couple at a time
const idleStatuses: Status[] = ['Receiving', 'Idle', 'Processing']
function flickerStatuses() {
  const n = 1 + Math.floor(Math.random() * 2)
  for (let k = 0; k < n; k++) {
    const s = sources[Math.floor(Math.random() * sources.length)]!
    if (sourceStatus[s.id] === 'Streaming') continue
    sourceStatus[s.id] = idleStatuses[Math.floor(Math.random() * idleStatuses.length)]!
  }
}
function driftHealth() {
  health.value = Math.min(98.6, Math.max(97.5, health.value + (Math.random() - 0.5) * 0.3)) // small, alive
}

function seedFeed() {
  const ind = industries[0]!
  feed.value = ind.flows.slice(0, 3).map(f => ({
    id: nextFeedId++, time: nowLabel(), industry: ind.name, event: f.event, conf: f.conf, result: f.result, platform: f.platform,
  }))
}

function start() {
  if (running || reducedMotion) return
  running = true
  spawnFlow()
  timers.push(setInterval(spawnFlow, 2000))
  timers.push(setInterval(nextIndustry, 12000))
  timers.push(setInterval(cycleCoreWord, 2500))
  timers.push(setInterval(flickerStatuses, 2000))
  timers.push(setInterval(driftHealth, 2500))
}
function stop() {
  running = false
  timers.forEach(clearInterval)
  timers.length = 0
  transient.forEach(clearTimeout)
  transient.length = 0
}

onMounted(() => {
  updateClock()
  clockHandle = setInterval(updateClock, 1000)
  seedFeed()

  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) { // static, legible snapshot — no timers, no packets
    sources.forEach((s, i) => { sourceStatus[s.id] = idleStatuses[i % idleStatuses.length]! })
    return
  }
  observer = new IntersectionObserver(([entry]) => {
    inView = !!entry?.isIntersecting
    evaluate()
  }, { threshold: 0.2 })
  if (root.value) observer.observe(root.value)
  document.addEventListener('visibilitychange', onVisibility)
})
onBeforeUnmount(() => {
  stop()
  if (clockHandle) clearInterval(clockHandle)
  Object.values(litTimers).forEach(clearTimeout)
  observer?.disconnect()
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<template>
  <section ref="root" class="solution">
    <div v-reveal class="solution__intro">
      <p class="solution__eyebrow">Connected Ecosystem</p>
      <h2 class="solution__title" data-split>Enterprise Intelligence In Action</h2>
      <div class="solution__desc">
        <p>Instead of isolated software, watch how SVARA transforms enterprise events into autonomous business decisions.</p>
      </div>
      <div class="solution__cta"><SectionLink to="/ecosystem" label="Explore Ecosystem" /></div>
    </div>

    <div class="solution__viewport-wrap">
      <div
        v-reveal class="sim"
        :class="{ 'sim--hover': anyHover, 'sim--hover-core': hoveredCore }"
      >
        <!-- header -->
        <header class="sim__header">
          <span class="sim__badge"><i aria-hidden="true" />Live</span>
          <span class="sim__brand">SVARA Live Operations</span>
          <Transition name="sim-fade" mode="out-in">
            <span :key="currentIndustry.name" class="sim__industry">{{ currentIndustry.name }}</span>
          </Transition>
          <span class="sim__header-spacer" />
          <span class="sim__stat">Health <b>{{ health.toFixed(1) }}%</b></span>
          <span class="sim__clock">{{ currentTime }}</span>
        </header>

        <!-- flow stage: L1 sources · L2 core · L3 platforms · L4 pipes+packets -->
        <div class="sim__stage">
          <svg class="sim__flow" viewBox="0 0 140 76" preserveAspectRatio="none" aria-hidden="true">
            <path
              v-for="(d, i) in sourcePipes" :key="`sp${i}`" :d="d"
              class="sim__pipe" :class="{ 'sim__pipe--hot': srcPipeHot(i) }"
            />
            <path
              v-for="(d, j) in platformPipes" :key="`pp${j}`" :d="d"
              class="sim__pipe" :class="{ 'sim__pipe--hot': platPipeHot(j) }"
            />
            <template v-for="p in packets" :key="p.id">
              <circle
                r="1.5" class="sim__packet-trail"
                :style="{ offsetPath: `path('${p.path}')`, animationDuration: `${p.duration}s` }"
              />
              <circle
                r="0.75" class="sim__packet"
                :class="{ 'sim__packet--hot': hoveredPlatform === p.platform }"
                :style="{ offsetPath: `path('${p.path}')`, animationDuration: `${p.duration}s` }"
                @animationend="onPacketArrive(p)"
              />
            </template>
          </svg>

          <!-- L1 sources -->
          <p class="sim__col-title sim__col-title--left">Enterprise Sources</p>
          <button
            v-for="(s, i) in sources" :key="s.id" type="button"
            class="sim__card sim__source"
            :class="{ 'is-hot': sourceHot(s.id), 'is-dim': anyHover && !sourceHot(s.id) }"
            :style="{ top: topPct(i) }"
            :aria-label="`${s.label} — run scenario`"
            @mouseenter="hoveredSource = s.id" @mouseleave="hoveredSource = null"
            @focus="hoveredSource = s.id" @blur="hoveredSource = null"
            @click="runScenario(s.id)"
          >
            <component :is="s.icon" :size="18" :stroke-width="1.75" class="sim__card-icon" :class="{ 'is-active': sourceStatus[s.id] === 'Streaming' || sourceStatus[s.id] === 'Receiving' }" />
            <span class="sim__card-label">{{ s.label }}</span>
            <span class="sim__status" :class="`sim__status--${sourceStatus[s.id]?.toLowerCase()}`">
              <LoaderCircle v-if="sourceStatus[s.id] === 'Processing'" :size="11" class="sim__ind-spin" />
              <span v-else-if="sourceStatus[s.id] === 'Streaming'" class="sim__ind-shimmer" />
              <span v-else class="sim__ind-dot" />
              <span class="sim__status-text">{{ sourceStatus[s.id] }}</span>
            </span>
          </button>

          <!-- L2 core -->
          <div
            class="sim__core"
            @mouseenter="hoveredCore = true" @mouseleave="hoveredCore = false"
          >
            <span :key="corePulseKey" class="sim__core-ripple" />
            <div class="sim__core-orb">
              <div class="sim__core-inner">
                <span class="sim__core-label">SVARA Intelligence Core</span>
                <div class="sim__core-wordwin">
                  <Transition name="sim-word">
                    <span :key="coreWordIdx" class="sim__core-word">{{ coreWords[coreWordIdx] }}</span>
                  </Transition>
                </div>
              </div>
            </div>
          </div>

          <!-- L3 platforms -->
          <p class="sim__col-title sim__col-title--right">Enterprise Platforms</p>
          <div
            v-for="(p, j) in platforms" :key="p.id"
            class="sim__card sim__platform"
            :class="{ 'is-lit': platformLit[p.id], 'is-hot': platformHot(p.id), 'is-dim': anyHover && !platformHot(p.id) && !platformLit[p.id] }"
            :style="{ top: topPct(j) }"
            @mouseenter="hoveredPlatform = p.id" @mouseleave="hoveredPlatform = null"
          >
            <component :is="p.icon" :size="18" :stroke-width="1.75" class="sim__card-icon" />
            <span class="sim__card-label">{{ p.label }}</span>
            <span class="sim__platform-dot" />
          </div>
        </div>

        <!-- L5 live scenario feed -->
        <div class="sim__feed">
          <span class="sim__feed-title">Live<br >Feed</span>
          <TransitionGroup tag="div" name="feed" class="sim__feed-track">
            <div
              v-for="e in feed" :key="e.id"
              class="sim__feed-item" :class="{ 'is-hot': feedHot(e) }"
            >
              <div class="sim__feed-top">
                <span class="sim__feed-time">{{ e.time }}</span>
                <span class="sim__feed-industry">{{ e.industry }}</span>
              </div>
              <div class="sim__feed-event">{{ e.event }}</div>
              <div class="sim__feed-bottom">
                <span class="sim__feed-conf">{{ e.conf.toFixed(1) }}%</span>
                <span class="sim__feed-result">{{ e.result }}</span>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.solution { background: var(--color-surface); padding-block: var(--section-y); }

/* centered application intro */
.solution__intro {
  max-width: 900px;
  margin-inline: auto;
  padding-inline: var(--container-pad);
  box-sizing: border-box;
  text-align: center;
}
.solution__eyebrow {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--color-accent);
}
.solution__title {
  margin: 0;
  font-size: clamp(38px, 5vw, 72px);
  font-weight: var(--weight-bold); line-height: 1.08; letter-spacing: -0.02em;
  color: var(--color-text); text-wrap: balance;
}
.solution__desc { margin-top: var(--space-8); }
.solution__desc p {
  margin: 0 auto; max-width: 60ch;
  font-size: var(--type-body); line-height: var(--leading-body);
  color: var(--color-text-secondary);
}
.solution__cta { margin-top: var(--space-8); display: flex; justify-content: center; }

/* full-width live viewport */
.solution__viewport-wrap {
  margin-top: 100px;
  width: 88%;
  max-width: 1600px;
  margin-inline: auto;
}
.sim {
  height: 930px;
  border-radius: 32px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: var(--glass-border);
  box-shadow: var(--shadow-large);
  box-sizing: border-box;
  padding: var(--space-8) var(--space-10);
  display: flex; flex-direction: column;
  position: relative; overflow: hidden;
}
.sim::before {
  content: ""; position: absolute; inset: 0; border-radius: inherit;
  background: var(--glass-reflection); pointer-events: none;
}

/* header */
.sim__header {
  flex-shrink: 0; display: flex; align-items: center; gap: var(--space-4);
  padding-bottom: var(--space-5); border-bottom: 1px solid var(--color-border);
  position: relative; z-index: 3;
}
.sim__badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 10px; border-radius: var(--radius-pill);
  border: 1px solid var(--color-border); background: rgba(255, 255, 255, 0.5);
  font-family: var(--font-mono); font-size: 10px; letter-spacing: var(--tracking-label);
  text-transform: uppercase; color: var(--color-text-secondary);
}
.sim__badge i { width: 6px; height: 6px; border-radius: 50%; background: var(--color-accent); animation: sim-blink 1.8s ease-in-out infinite; }
.sim__brand { font-size: var(--type-small); font-weight: var(--weight-bold); color: var(--color-text); }
.sim__industry {
  padding: 4px 10px; border-radius: var(--radius-pill);
  border: 1px solid var(--color-border); background: var(--color-accent-bg);
  font-family: var(--font-mono); font-size: 10px; letter-spacing: var(--tracking-label);
  text-transform: uppercase; color: var(--color-accent);
}
.sim__header-spacer { margin-left: auto; }
.sim__stat { font-family: var(--font-mono); font-size: 11px; color: var(--color-text-secondary); }
.sim__stat b { color: var(--color-text); font-weight: var(--weight-semibold); }
.sim__clock {
  font-family: var(--font-mono); font-size: 12px; color: var(--color-text-secondary);
  min-width: 8ch; text-align: right;
}

/* flow stage — sources/core/platforms pinned to the SVG grid */
.sim__stage { position: relative; flex: 1; min-height: 0; }
.sim__flow { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; }

.sim__pipe {
  fill: none; stroke: var(--color-accent);
  stroke-width: 1; vector-effect: non-scaling-stroke;
  opacity: 0.1;
  transition: opacity 0.4s var(--ease-smooth), stroke-width 0.4s var(--ease-smooth);
}
.sim__pipe--hot { opacity: 0.5; stroke-width: 1.5; }
.sim--hover .sim__pipe:not(.sim__pipe--hot) { opacity: 0.04; }
.sim--hover-core .sim__pipe--hot { opacity: 0.7; animation: sim-pipe-pulse 1.1s ease-in-out infinite; }

/* L4 packets — eased (accelerate then decelerate), fade in/out, trailing glow */
.sim__packet {
  fill: var(--color-accent);
  filter: drop-shadow(0 0 3px rgba(47, 127, 230, 0.95));
  animation-name: sim-packet-flow;
  animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1);
  animation-fill-mode: forwards;
}
.sim__packet--hot { fill: var(--color-ink-strong); }
.sim__packet-trail {
  fill: var(--color-accent);
  filter: blur(2px);
  animation-name: sim-packet-trail;
  animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1);
  animation-fill-mode: forwards;
  animation-delay: 0.06s; /* lags the head → comet tail */
}
@keyframes sim-packet-flow {
  0% { offset-distance: 0%; opacity: 0; }
  8% { opacity: 1; }
  90% { opacity: 1; }
  100% { offset-distance: 100%; opacity: 0; }
}
@keyframes sim-packet-trail {
  0% { offset-distance: 0%; opacity: 0; }
  14% { opacity: 0.28; }
  88% { opacity: 0.28; }
  100% { offset-distance: 100%; opacity: 0; }
}

.sim__col-title {
  position: absolute; top: -4px; z-index: 2;
  font-family: var(--font-mono); font-size: 9px; letter-spacing: var(--tracking-label);
  text-transform: uppercase; color: var(--color-text-faint);
}
.sim__col-title--left { left: 0; }
.sim__col-title--right { right: 0; }

/* shared card shell — bigger, roomier, premium (L1 · Bigger Cards) */
.sim__card {
  position: absolute; transform: translateY(-50%);
  width: 23%; min-height: 66px; z-index: 2;
  display: flex; align-items: center; gap: 12px;
  padding: 0 20px; border-radius: 16px;
  border: 1px solid var(--color-border); background: rgba(255, 255, 255, 0.68);
  box-sizing: border-box;
  transition: opacity 0.35s var(--ease-smooth), border-color 0.35s var(--ease-smooth),
              box-shadow 0.35s var(--ease-smooth), background 0.35s var(--ease-smooth), transform 0.35s var(--ease-smooth);
}
.sim__source { left: 0; text-align: left; font: inherit; color: var(--color-text); cursor: pointer; }
.sim__platform { right: 0; color: var(--color-text); }
.sim__card-icon { flex-shrink: 0; color: var(--color-text-secondary); transition: color 0.35s var(--ease-smooth); }
.sim__card-icon.is-active { color: var(--color-accent); }
.sim__card-label {
  flex: 1; min-width: 0;
  font-size: 13px; font-weight: var(--weight-medium); letter-spacing: -0.01em;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

.sim__source:hover, .sim__source:focus-visible { border-color: var(--color-accent); box-shadow: 0 6px 22px rgba(16, 42, 91, 0.1); outline: none; transform: translateY(-50%) translateX(2px); }
.sim__card.is-hot { border-color: var(--color-accent); box-shadow: 0 0 0 3px var(--color-accent-bg); }
.sim__card.is-dim { opacity: 0.34; }

/* L3 platforms ignite on arrival */
.sim__platform-dot {
  flex-shrink: 0; width: 8px; height: 8px; border-radius: 50%;
  background: var(--color-text-faint);
  transition: background 0.35s var(--ease-smooth), box-shadow 0.35s var(--ease-smooth);
}
.sim__platform.is-lit {
  border-color: var(--color-accent); background: var(--color-accent-bg);
  box-shadow: 0 0 0 3px var(--color-accent-bg), 0 8px 24px rgba(47, 127, 230, 0.2);
}
.sim__platform.is-lit .sim__card-icon { color: var(--color-accent); }
.sim__platform.is-lit .sim__platform-dot { background: var(--color-accent); box-shadow: 0 0 10px rgba(47, 127, 230, 0.85); }
.sim__platform:hover { border-color: var(--color-accent); box-shadow: 0 6px 22px rgba(16, 42, 91, 0.1); }

/* L1 · animated status badge (L3 · Status Animation) */
.sim__status {
  flex-shrink: 0;
  display: inline-flex; align-items: center; gap: 6px;
  padding: 3px 9px; border-radius: var(--radius-pill);
  border: 1px solid var(--color-border); background: rgba(255, 255, 255, 0.6);
  font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.05em; text-transform: uppercase;
}
.sim__status--receiving, .sim__status--streaming { color: var(--color-accent); }
.sim__status--processing { color: var(--color-ink-strong); }
.sim__status--idle { color: var(--color-text-faint); }
.sim__ind-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.sim__status--receiving .sim__ind-dot { animation: sim-pulse 1.4s ease-in-out infinite; }
.sim__status--idle .sim__ind-dot { animation: sim-breathe-dot 2.6s ease-in-out infinite; }
.sim__ind-shimmer {
  width: 16px; height: 5px; border-radius: 3px;
  background: linear-gradient(90deg, var(--color-accent-bg), var(--color-accent), var(--color-accent-bg));
  background-size: 220% 100%;
  animation: sim-shimmer 1.1s linear infinite;
}
.sim__ind-spin { animation: sim-spin 0.9s linear infinite; }

/* L2 core — breathing sphere, rotating sheen, subtle inner glow */
.sim__core {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  z-index: 2; display: grid; place-items: center; cursor: default;
}
.sim__core-orb {
  position: relative; z-index: 1;
  width: 208px; height: 208px; border-radius: 50%;
  display: grid; place-items: center;
  overflow: hidden;
  background:
    radial-gradient(circle at 38% 30%, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0) 44%),
    radial-gradient(circle at 50% 50%, var(--color-ink-strong), var(--color-text));
  box-shadow: 0 0 64px rgba(47, 127, 230, 0.34), inset 0 0 46px rgba(47, 127, 230, 0.28);
  animation: sim-breathe 6.5s ease-in-out infinite;
}
/* soft rotating gradient sheen */
.sim__core-orb::before {
  content: ""; position: absolute; inset: -25%;
  background: conic-gradient(from 0deg, rgba(47, 127, 230, 0) 0%, rgba(47, 127, 230, 0.32) 22%, rgba(47, 127, 230, 0) 45%, rgba(143, 209, 255, 0.22) 68%, rgba(47, 127, 230, 0) 92%);
  animation: sim-rotate 9s linear infinite;
  pointer-events: none;
}
.sim__core-inner {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  color: var(--color-inverse); text-align: center;
}
.sim__core-label {
  font-family: var(--font-mono); font-size: 9px; letter-spacing: var(--tracking-label);
  text-transform: uppercase; opacity: 0.62;
}
/* terminal-style word morph — slides upward, no fade (L6) */
.sim__core-wordwin { height: 28px; overflow: hidden; position: relative; width: 160px; }
.sim__core-word {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; font-weight: var(--weight-bold); letter-spacing: -0.01em; color: #cfe2fb;
}
.sim-word-enter-active, .sim-word-leave-active { transition: transform 0.5s var(--ease-out); }
.sim-word-enter-from { transform: translateY(100%); }
.sim-word-leave-to { transform: translateY(-100%); }
/* ripple when a packet passes through the core */
.sim__core-ripple {
  position: absolute; left: 50%; top: 50%;
  width: 208px; height: 208px; border-radius: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid var(--color-accent);
  animation: sim-ripple 1.2s var(--ease-out) forwards;
  pointer-events: none;
}
.sim--hover-core .sim__core-orb { box-shadow: 0 0 90px rgba(47, 127, 230, 0.55), inset 0 0 46px rgba(47, 127, 230, 0.3); }

/* L5 feed — bigger cards, richer typography, new-from-right */
.sim__feed {
  flex-shrink: 0; position: relative; z-index: 3;
  display: flex; align-items: stretch; gap: var(--space-4);
  padding-top: var(--space-5); margin-top: var(--space-4);
  border-top: 1px solid var(--color-border);
}
.sim__feed-title {
  flex-shrink: 0; align-self: center;
  font-family: var(--font-mono); font-size: 9px; line-height: 1.3; letter-spacing: var(--tracking-label);
  text-transform: uppercase; color: var(--color-text-faint);
}
.sim__feed-track { display: flex; justify-content: flex-end; gap: var(--space-3); overflow: hidden; flex: 1; }
.sim__feed-item {
  flex-shrink: 0; width: 210px; min-height: 68px;
  display: flex; flex-direction: column; gap: 5px;
  padding: 10px 14px; border-radius: 14px;
  border: 1px solid var(--color-border); background: rgba(255, 255, 255, 0.6);
  transition: border-color 0.35s var(--ease-smooth), background 0.35s var(--ease-smooth), box-shadow 0.35s var(--ease-smooth);
}
.sim__feed-item.is-hot { border-color: var(--color-accent); background: var(--color-accent-bg); box-shadow: 0 0 0 3px var(--color-accent-bg); }
.sim__feed-top { display: flex; align-items: center; gap: 8px; }
.sim__feed-time { font-family: var(--font-mono); font-size: 10px; color: var(--color-text-faint); }
.sim__feed-industry { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.05em; text-transform: uppercase; color: var(--color-accent); }
.sim__feed-event { font-size: 13px; font-weight: var(--weight-medium); color: var(--color-text); line-height: 1.3; }
.sim__feed-bottom { display: flex; align-items: center; gap: 8px; margin-top: auto; }
.sim__feed-conf {
  font-family: var(--font-mono); font-size: 10px; font-weight: var(--weight-semibold);
  color: var(--color-accent); padding: 1px 6px; border-radius: var(--radius-sm); background: var(--color-accent-bg);
}
.sim__feed-result { font-size: 11px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); }
/* new cards enter from the right, older slide left and out */
.feed-enter-active { transition: opacity 0.45s var(--ease-out), transform 0.45s var(--ease-out); }
.feed-leave-active { transition: opacity 0.4s var(--ease-smooth), transform 0.4s var(--ease-smooth); position: absolute; }
.feed-enter-from { opacity: 0; transform: translateX(28px); }
.feed-leave-to { opacity: 0; transform: translateX(-28px); }
.feed-move { transition: transform 0.45s var(--ease-out); }

/* transitions */
.sim-fade-enter-active, .sim-fade-leave-active { transition: opacity 0.3s var(--ease-smooth); }
.sim-fade-enter-from, .sim-fade-leave-to { opacity: 0; }

@keyframes sim-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
@keyframes sim-pulse { 0%, 100% { box-shadow: 0 0 0 0 currentColor; opacity: 1; } 50% { box-shadow: 0 0 0 3px transparent; opacity: 0.45; } }
@keyframes sim-breathe-dot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.82); } }
@keyframes sim-shimmer { from { background-position: 220% 0; } to { background-position: -20% 0; } }
@keyframes sim-spin { to { transform: rotate(360deg); } }
@keyframes sim-breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.035); } }
@keyframes sim-rotate { to { transform: rotate(360deg); } }
@keyframes sim-ripple { from { opacity: 0.5; transform: translate(-50%, -50%) scale(1); } to { opacity: 0; transform: translate(-50%, -50%) scale(1.5); } }
@keyframes sim-pipe-pulse { 0%, 100% { opacity: 0.7; } 50% { opacity: 0.35; } }

@media (max-width: 1100px) {
  .sim__card-label { font-size: 12px; }
  .sim__feed-item { width: 180px; }
}
@media (max-width: 1000px) {
  .solution__viewport-wrap { width: 94%; }
  .sim { height: auto; }
  .sim__stage { display: none; } /* the pinned grid assumes a wide 3-column stage */
  .sim__feed { flex-wrap: wrap; }
  .sim__feed-track { flex-wrap: wrap; justify-content: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  .sim__badge i, .sim__ind-dot, .sim__ind-shimmer, .sim__ind-spin,
  .sim__core-orb, .sim__core-orb::before, .sim__core-ripple { animation: none; }
  .sim__packet, .sim__packet-trail { display: none; }
  .feed-enter-active, .feed-leave-active, .feed-move,
  .sim-word-enter-active, .sim-word-leave-active { transition: none; }
}
</style>
