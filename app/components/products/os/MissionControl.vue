<script setup lang="ts">
// MissionControl — a live, data-driven enterprise dashboard for a SVARA product.
// Everything is driven by the product's REAL data (svara-os.ts): sidebar modules,
// KPI counters (animate 0→target), a streaming area chart, a pulsing subsystem
// graph, a streaming activity log, and an AI assistant that types. Light enterprise
// aesthetic (Linear/Stripe/Vercel) on SVARA navy/blue. SSR-safe: server renders
// final values; the browser animates. All intervals gate on visibility +
// prefers-reduced-motion and clean up on unmount.
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import type { OsProduct } from '~/utils/svara-os'

const props = defineProps<{ product: OsProduct }>()

// ── formatting ────────────────────────────────────────────────────────────────
function fmt(v: number): string {
  const n = Math.max(0, v)
  if (n >= 1e9) return (n / 1e9).toFixed(n % 1e9 === 0 ? 0 : 1) + 'B'
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'k'
  return String(Math.round(n))
}
function seeded(seed: string, count: number, lo = 22, hi = 92): number[] {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0 }
  const out: number[] = []
  for (let i = 0; i < count; i++) { h = (Math.imul(h, 1103515245) + 12345) >>> 0; out.push(lo + (h % 1000) / 1000 * (hi - lo)) }
  return out
}
function areaPath(pts: number[], w = 100, h = 40): string {
  const step = w / (pts.length - 1)
  const line = pts.map((y, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(2)} ${(h - (y / 100) * h).toFixed(2)}`).join(' ')
  return line
}

// ── KPI counters (SSR = target; client animates 0→target) ───────────────────────
const counts = ref<number[]>(props.product.kpis.map((k) => k.value))
function kpiText(i: number): string {
  const k = props.product.kpis[i]!
  return (k.prefix ?? '') + fmt(counts.value[i] ?? 0) + (k.suffix ?? '')
}
const kpiSparks = computed(() => props.product.kpis.map((k) => seeded(k.label + props.product.id, 14, 30, 90)))

// ── live area chart ─────────────────────────────────────────────────────────────
const series = ref<number[]>(seeded(props.product.metricLabel + props.product.id, 44, 20, 88))
const chartLine = computed(() => areaPath(series.value))
const chartArea = computed(() => `${chartLine.value} L100 40 L0 40 Z`)

// ── streaming activity log (synthetic clock, no Date → SSR-safe) ─────────────────
interface LogLine { id: number; t: string; text: string }
let clock = 9 * 3600 + 41 * 60 + 2 // 09:41:02
function hhmmss(s: number): string {
  const hh = Math.floor(s / 3600) % 24, mm = Math.floor(s / 60) % 60, ss = s % 60
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`
}
let logSeq = 0
let logCursor = 0
function seedLogs(): LogLine[] {
  const base = props.product.logs.slice(0, 4)
  return base.map((text, i) => ({ id: logSeq++, t: hhmmss(clock - (base.length - i) * 7), text }))
}
const logs = ref<LogLine[]>(seedLogs())
logCursor = 4

// ── AI assistant typing ─────────────────────────────────────────────────────────
/** The selected module. The nav used to hardcode `i === 0` and carry no handler —
 *  it looked selectable and was not. Each module already ships a description
 *  (`m.v` in svara-os.ts) that nothing rendered, so selecting one now reveals it:
 *  a real payload from real data, rather than a decorative highlight. */
const activeModule = ref(0)
watch(() => props.product, () => { activeModule.value = 0 })

const typed = ref(props.product.assistant.suggestions[0] ?? '')
let sugIdx = 0

// ── liveness control (visibility + reduced-motion) ──────────────────────────────
const rootRef = ref<HTMLElement | null>(null)
let timers: ReturnType<typeof setInterval>[] = []
let raf = 0
let io: IntersectionObserver | null = null
let running = false

function animateCounters(): void {
  const targets = props.product.kpis.map((k) => k.value)
  const start = performance.now()
  const dur = 1100
  const from = counts.value.slice()
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / dur)
    const e = 1 - Math.pow(1 - t, 3)
    counts.value = targets.map((tg, i) => (from[i] ?? 0) + (tg - (from[i] ?? 0)) * e)
    if (t < 1) raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
}

function typeLoop(): void {
  const target = props.product.assistant.suggestions[sugIdx % props.product.assistant.suggestions.length] ?? ''
  let i = 0
  typed.value = ''
  const iv = setInterval(() => {
    i++
    typed.value = target.slice(0, i)
    if (i >= target.length) {
      clearInterval(iv)
      timers = timers.filter((t) => t !== iv)
      const hold = setTimeout(() => { sugIdx++; if (running) typeLoop() }, 2600)
      // track via timers-ish: store as interval-like no-op cleanup
      timers.push(hold as unknown as ReturnType<typeof setInterval>)
    }
  }, 34)
  timers.push(iv)
}

function startLife(): void {
  if (running) return
  running = true
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // counters (always, even reduced — it's a quick one-shot)
  counts.value = props.product.kpis.map(() => 0)
  animateCounters()
  if (reduced) { counts.value = props.product.kpis.map((k) => k.value); typed.value = props.product.assistant.suggestions[0] ?? ''; return }
  // streaming chart
  timers.push(setInterval(() => {
    const next = Math.max(16, Math.min(96, (series.value[series.value.length - 1] ?? 50) + (Math.random() * 34 - 17)))
    series.value = [...series.value.slice(1), next]
  }, 1200))
  // streaming log
  timers.push(setInterval(() => {
    clock += 3 + Math.floor(Math.random() * 6)
    const text = props.product.logs[logCursor % props.product.logs.length]!
    logCursor++
    logs.value = [{ id: logSeq++, t: hhmmss(clock), text }, ...logs.value].slice(0, 6)
  }, 2100))
  // assistant typing
  typeLoop()
}
function stopLife(): void {
  running = false
  timers.forEach((t) => { clearInterval(t); clearTimeout(t as unknown as ReturnType<typeof setTimeout>) })
  timers = []
  cancelAnimationFrame(raf)
}

// restart streams when the product switches
watch(() => props.product.id, () => {
  stopLife()
  counts.value = props.product.kpis.map((k) => k.value)
  series.value = seeded(props.product.metricLabel + props.product.id, 44, 20, 88)
  logSeq = 0; logCursor = 4; clock = 9 * 3600 + 41 * 60 + 2
  logs.value = seedLogs()
  sugIdx = 0; typed.value = props.product.assistant.suggestions[0] ?? ''
  if (rootRef.value && isOnScreen) startLife()
})

let isOnScreen = false
onMounted(() => {
  if (!rootRef.value) return
  io = new IntersectionObserver((entries) => {
    const vis = entries[0]?.isIntersecting ?? false
    isOnScreen = vis
    if (vis) startLife(); else stopLife()
  }, { threshold: 0.15 })
  io.observe(rootRef.value)
})
onBeforeUnmount(() => { stopLife(); io?.disconnect() })

// subsystem node geometry (radial around a core)
const nodes = computed(() => props.product.subsystems.map((name, i) => {
  const a = (i / props.product.subsystems.length) * Math.PI * 2 - Math.PI / 2
  return { name, x: 50 + Math.cos(a) * 34, y: 50 + Math.sin(a) * 34, i }
}))
</script>

<template>
  <div ref="rootRef" class="mc">
    <!-- window bar -->
    <div class="mc__bar">
      <span class="mc__dots"><i /><i /><i /></span>
      <span class="mc__crumb hx-mono"><b>SVARA OS</b><em>/</em>{{ product.category }}<em>/</em><span class="mc__crumb-on">{{ product.short }}</span></span>
      <span class="mc__search"><svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.6" /><path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /></svg>Search intelligence…<kbd>⌘K</kbd></span>
      <span class="mc__bar-r">
        <span class="mc__chip"><span class="mc__chip-dot" />{{ product.status }}</span>
        <span class="mc__avatar">SV</span>
      </span>
    </div>

    <div class="mc__body">
      <!-- sidebar -->
      <aside class="mc__side">
        <div class="mc__mark"><span class="mc__mark-dot" />SVARA<span class="mc__mark-os">OS</span></div>
        <span class="mc__side-lbl hx-mono">MODULES</span>
        <nav class="mc__nav">
          <button
            v-for="(m, i) in product.modules"
            :key="m.k"
            class="mc__nav-i"
            :class="{ 'is-on': activeModule === i }"
            type="button"
            :aria-current="activeModule === i ? 'true' : undefined"
            @click="activeModule = i"
          >
            <span class="mc__nav-dot" />{{ m.k }}
          </button>
        </nav>
        <p class="mc__nav-desc">{{ product.modules[activeModule]?.v }}</p>
        <span class="mc__side-lbl hx-mono">SUBSYSTEMS</span>
        <ul class="mc__sys">
          <li v-for="s in product.subsystems" :key="s"><span class="mc__sys-dot" />{{ s }}</li>
        </ul>
        <div class="mc__side-foot hx-mono"><span class="mc__chip-dot" />ALL SYSTEMS NOMINAL</div>
      </aside>

      <!-- main -->
      <main class="mc__main">
        <div class="mc__head">
          <div>
            <span class="mc__head-cap hx-mono">{{ product.code }} · {{ product.category }}</span>
            <h3 class="mc__head-name">{{ product.name }}</h3>
            <p class="mc__head-tag">{{ product.tagline }}</p>
          </div>
          <div class="mc__head-actions">
            <span class="mc__deploy hx-mono">{{ product.deployment }}</span>
            <NuxtLink :to="product.to" class="mc__open">Open product<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg></NuxtLink>
          </div>
        </div>

        <!-- capability manifest (real capabilities from the profile) -->
        <div class="mc__caps">
          <span v-for="c in product.capabilities" :key="c" class="mc__cap">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>{{ c }}
          </span>
        </div>

        <!-- KPI row -->
        <div class="mc__kpis">
          <div v-for="(k, i) in product.kpis" :key="k.label" class="mc__kpi">
            <span class="mc__kpi-label">{{ k.label }}</span>
            <span class="mc__kpi-value">{{ kpiText(i) }}</span>
            <svg class="mc__kpi-spark" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">
              <path :d="areaPath(kpiSparks[i]!, 100, 24)" fill="none" stroke="var(--px-blue, #5DA8FF)" stroke-width="1.4" vector-effect="non-scaling-stroke" />
            </svg>
          </div>
        </div>

        <!-- mid: live chart + subsystem graph -->
        <div class="mc__mid">
          <section class="mc__panel mc__chart">
            <header class="mc__panel-h"><span>{{ product.metricLabel }}</span><span class="mc__panel-live hx-mono"><span class="mc__chip-dot" />LIVE</span></header>
            <svg class="mc__chart-svg" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
              <defs><linearGradient id="mc-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--px-blue, #5DA8FF)" stop-opacity="0.28" /><stop offset="1" stop-color="var(--px-blue, #5DA8FF)" stop-opacity="0" /></linearGradient></defs>
              <path :d="chartArea" fill="url(#mc-g)" />
              <path :d="chartLine" fill="none" stroke="var(--px-blue, #5DA8FF)" stroke-width="1.4" vector-effect="non-scaling-stroke" />
            </svg>
          </section>

          <section class="mc__panel mc__graph">
            <header class="mc__panel-h"><span>Subsystem Mesh</span><span class="hx-mono mc__panel-sub">{{ product.subsystems.length }} nodes</span></header>
            <svg class="mc__graph-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <g stroke="rgba(16,33,74,0.14)" stroke-width="0.5">
                <line v-for="nd in nodes" :key="`l${nd.i}`" x1="50" y1="50" :x2="nd.x" :y2="nd.y" />
              </g>
              <g v-for="nd in nodes" :key="`s${nd.i}`">
                <circle r="0.9" fill="var(--px-blue, #5DA8FF)"><animateMotion :dur="`${2.4 + (nd.i % 3) * 0.6}s`" :begin="`${nd.i * 0.3}s`" repeatCount="indefinite" :path="`M50 50 L${nd.x} ${nd.y}`" /></circle>
              </g>
              <circle v-for="nd in nodes" :key="`n${nd.i}`" :cx="nd.x" :cy="nd.y" r="3" fill="#fff" stroke="var(--px-navy, #10214A)" stroke-width="0.8" />
              <circle class="mc__graph-ring" cx="50" cy="50" r="11" fill="none" stroke="var(--px-blue, #5DA8FF)" stroke-width="0.5" opacity="0.5" />
              <circle cx="50" cy="50" r="7.5" fill="var(--px-navy, #10214A)" />
              <text x="50" y="51.4" text-anchor="middle" font-size="2.7" fill="#fff" font-family="var(--font-mono)">SVARA</text>
            </svg>
          </section>
        </div>

        <!-- low: activity log + AI assistant -->
        <div class="mc__low">
          <section class="mc__panel mc__log">
            <header class="mc__panel-h"><span>Activity Stream</span><span class="hx-mono mc__panel-sub">real-time</span></header>
            <ul class="mc__log-list">
              <li v-for="l in logs" :key="l.id" class="mc__log-row">
                <span class="mc__log-t hx-mono">{{ l.t }}</span>
                <span class="mc__log-dot" />
                <span class="mc__log-x hx-mono">{{ l.text }}</span>
              </li>
            </ul>
          </section>

          <section class="mc__panel mc__ai">
            <header class="mc__panel-h"><span>Intelligence Copilot</span><span class="hx-mono mc__panel-sub">{{ product.short }}</span></header>
            <p class="mc__ai-greet">{{ product.assistant.greeting }}</p>
            <div class="mc__ai-type"><span class="mc__ai-caret">▸</span><span class="mc__ai-text">{{ typed }}</span><span class="mc__ai-cursor" /></div>
            <div class="mc__ai-chips">
              <span v-for="s in product.assistant.suggestions" :key="s" class="mc__ai-chip">{{ s }}</span>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.mc {
  --nav: var(--px-navy, #10214A); --blue: var(--px-blue, #5DA8FF); --ink: var(--px-navy, #10214A);
  --muted: rgba(16, 33, 74, 0.55); --line: rgba(16, 33, 74, 0.1); --surf: rgba(16, 33, 74, 0.02);
  background: #fff; border-radius: 8px; overflow: hidden; color: var(--ink);
  box-shadow: 0 0 0 0.5px rgba(16, 33, 74, 0.1), 0 40px 120px -50px rgba(16, 33, 74, 0.4); font-family: var(--font-sans);
}
/* window bar */
.mc__bar { display: flex; align-items: center; gap: 14px; padding: 12px 16px; border-bottom: 1px solid var(--line); background: var(--surf); }
.mc__dots { display: inline-flex; gap: 6px; flex-shrink: 0; }
.mc__dots i { width: 9px; height: 9px; border-radius: 50%; background: rgba(16, 33, 74, 0.14); }
.mc__crumb { font-size: 11px; letter-spacing: 0.04em; color: var(--muted); display: inline-flex; align-items: center; gap: 7px; white-space: nowrap; }
.mc__crumb b { color: var(--nav); font-weight: 600; } .mc__crumb em { color: rgba(16,33,74,0.3); font-style: normal; } .mc__crumb-on { color: var(--blue); }
.mc__search { flex: 1; display: inline-flex; align-items: center; gap: 8px; max-width: 320px; margin: 0 auto; padding: 7px 12px; border-radius: 8px; background: #fff; border: 1px solid var(--line); font-size: 12px; color: var(--muted); }
.mc__search kbd { margin-left: auto; font-family: var(--font-mono); font-size: 10px; padding: 2px 6px; border-radius: 5px; background: var(--surf); border: 1px solid var(--line); }
.mc__bar-r { display: inline-flex; align-items: center; gap: 10px; flex-shrink: 0; }
.mc__chip { display: inline-flex; align-items: center; gap: 6px; font-size: 10.5px; font-family: var(--font-mono); letter-spacing: 0.06em; color: var(--nav); padding: 4px 9px; border-radius: 999px; background: rgba(93,168,255,0.1); }
.mc__chip-dot { width: 6px; height: 6px; border-radius: 50%; background: #26c281; box-shadow: 0 0 0 3px rgba(38,194,129,0.18); animation: mc-pulse 2s ease-in-out infinite; }
@keyframes mc-pulse { 50% { opacity: 0.4; } }
.mc__avatar { width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; font-size: 10px; font-weight: 600; color: #fff; background: var(--nav); }

.mc__body { display: grid; grid-template-columns: 200px 1fr; }
@media (max-width: 860px) { .mc__body { grid-template-columns: 1fr; } .mc__side { display: none; } }

/* sidebar */
.mc__side { border-right: 1px solid var(--line); background: var(--surf); padding: 16px 14px; display: flex; flex-direction: column; }
.mc__mark { display: flex; align-items: center; gap: 7px; font-weight: 700; letter-spacing: 0.1em; font-size: 14px; color: var(--nav); margin-bottom: 20px; }
.mc__mark-dot { width: 9px; height: 9px; border-radius: 2px; background: var(--blue); }
.mc__mark-os { font-family: var(--font-mono); font-size: 9px; color: var(--muted); letter-spacing: 0.1em; }
.mc__nav-desc { margin: 8px 2px 0; font-size: 11.5px; line-height: 1.45; color: var(--ink-secondary, rgba(228,233,242,0.72)); }
.mc__side-lbl { font-size: 9px; letter-spacing: 0.16em; color: var(--muted); margin: 10px 0 8px; }
.mc__nav { display: flex; flex-direction: column; gap: 2px; }
.mc__nav-i { display: flex; align-items: center; gap: 9px; padding: 7px 9px; border-radius: 7px; border: none; background: none; font-family: var(--font-sans); font-size: 12.5px; color: var(--muted); text-align: left; cursor: pointer; transition: background 0.2s, color 0.2s; }
.mc__nav-i:hover { background: #fff; color: var(--nav); }
.mc__nav-i.is-on { background: #fff; color: var(--nav); font-weight: 500; box-shadow: 0 0 0 0.5px var(--line); }
.mc__nav-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(16,33,74,0.2); }
.mc__nav-i.is-on .mc__nav-dot { background: var(--blue); }
.mc__sys { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 7px; }
.mc__sys li { display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--muted); }
.mc__sys-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--blue); opacity: 0.7; }
.mc__side-foot { margin-top: auto; padding-top: 16px; display: flex; align-items: center; gap: 7px; font-size: 9px; letter-spacing: 0.1em; color: var(--muted); }

/* main */
.mc__main { padding: 20px 22px 24px; display: flex; flex-direction: column; gap: 16px; min-width: 0; }
.mc__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.mc__head-cap { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--blue); }
.mc__head-name { margin: 8px 0 0; font-size: clamp(18px, 2vw, 24px); font-weight: 600; letter-spacing: -0.02em; color: var(--nav); }
.mc__head-tag { margin: 4px 0 0; font-size: 13px; color: var(--muted); }
.mc__head-actions { display: flex; align-items: center; gap: 12px; }
.mc__deploy { font-size: 10px; letter-spacing: 0.06em; color: var(--muted); padding: 6px 10px; border-radius: 999px; border: 1px solid var(--line); }
.mc__open { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 500; color: #fff; background: var(--nav); padding: 8px 14px; border-radius: 999px; text-decoration: none; transition: transform 0.2s; }
.mc__open:hover { transform: translateY(-1px); }

/* capability manifest */
.mc__caps { display: flex; flex-wrap: wrap; gap: 7px; }
.mc__cap { display: inline-flex; align-items: center; gap: 6px; font-size: 11.5px; color: var(--nav); padding: 6px 11px; border-radius: 999px; background: var(--surf); border: 1px solid var(--line); }
.mc__cap svg { color: var(--blue); flex-shrink: 0; }

/* KPIs */
.mc__kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
@media (max-width: 640px) { .mc__kpis { grid-template-columns: repeat(2, 1fr); } }
.mc__kpi { position: relative; padding: 14px 14px 10px; border-radius: 12px; background: var(--surf); border: 1px solid var(--line); overflow: hidden; }
.mc__kpi-label { display: block; font-size: 10.5px; letter-spacing: 0.04em; color: var(--muted); }
.mc__kpi-value { display: block; margin-top: 6px; font-size: clamp(20px, 2.4vw, 28px); font-weight: 600; letter-spacing: -0.02em; color: var(--nav); font-variant-numeric: tabular-nums; }
.mc__kpi-spark { position: absolute; bottom: 0; left: 0; width: 100%; height: 22px; opacity: 0.55; }

/* panels */
.mc__panel { border: 1px solid var(--line); border-radius: 14px; background: #fff; padding: 14px 16px; min-width: 0; }
.mc__panel-h { display: flex; align-items: center; justify-content: space-between; font-size: 12.5px; font-weight: 600; color: var(--nav); margin-bottom: 12px; }
.mc__panel-sub { font-size: 10px; color: var(--muted); letter-spacing: 0.06em; }
.mc__panel-live { display: inline-flex; align-items: center; gap: 6px; font-size: 9.5px; letter-spacing: 0.1em; color: var(--muted); }

.mc__mid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 16px; }
@media (max-width: 760px) { .mc__mid { grid-template-columns: 1fr; } }
.mc__chart-svg { width: 100%; height: 150px; display: block; }
.mc__graph { display: flex; flex-direction: column; }
.mc__graph-svg { width: 100%; flex: 1; min-height: 150px; }
.mc__graph-ring { transform-origin: 50px 50px; animation: mc-spin 26s linear infinite; }
@keyframes mc-spin { to { transform: rotate(360deg); } }

.mc__low { display: grid; grid-template-columns: 1.2fr 1fr; gap: 16px; }
@media (max-width: 760px) { .mc__low { grid-template-columns: 1fr; } }
.mc__log-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
.mc__log-row { display: grid; grid-template-columns: auto auto 1fr; align-items: center; gap: 10px; padding: 7px 4px; border-bottom: 1px solid var(--surf); animation: mc-logIn 0.4s ease-out; }
@keyframes mc-logIn { from { opacity: 0; transform: translateY(-4px); } }
.mc__log-t { font-size: 10.5px; color: var(--muted); }
.mc__log-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--blue); }
.mc__log-x { font-size: 11.5px; color: var(--nav); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.mc__ai { display: flex; flex-direction: column; }
.mc__ai-greet { margin: 0; font-size: 13px; line-height: 1.5; color: var(--nav); }
.mc__ai-type { margin: 12px 0; padding: 10px 12px; border-radius: 10px; background: var(--surf); border: 1px solid var(--line); display: flex; align-items: center; gap: 8px; min-height: 40px; }
.mc__ai-caret { color: var(--blue); font-size: 11px; }
.mc__ai-text { font-family: var(--font-mono); font-size: 12px; color: var(--nav); }
.mc__ai-cursor { width: 7px; height: 15px; background: var(--blue); opacity: 0.8; animation: mc-blink 1s step-end infinite; }
@keyframes mc-blink { 50% { opacity: 0; } }
.mc__ai-chips { margin-top: auto; display: flex; flex-wrap: wrap; gap: 7px; }
.mc__ai-chip { font-size: 11px; color: var(--nav); padding: 6px 11px; border-radius: 999px; background: var(--surf); border: 1px solid var(--line); }

@media (prefers-reduced-motion: reduce) {
  .mc__chip-dot, .mc__graph-ring, .mc__ai-cursor, .mc__log-row { animation: none; }
}
</style>
