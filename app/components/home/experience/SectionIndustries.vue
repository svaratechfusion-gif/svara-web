<script setup lang="ts">
// 06 · INDUSTRIES — a scroll-driven horizontal deployment console.
//
// The seven environments used to stack VERTICALLY inside one panel — render on
// top of its dashboard — which ran the section far past a screen. They are now
// laid out HORIZONTALLY on two axes:
//
//   · across  — one industry per full-width slide; the section pins and the
//               scroll wheel drives the track sideways (GSAP ScrollTrigger,
//               scrubbed, so the camera is bound to the scroll position).
//   · within  — each slide splits the environment from its instrument: the
//               render on the left, the deployment dashboard on the right.
//
// Nothing stacks any more, so every slide fits one viewport.
//
// Same instrument grammar as the six division dashboards (`components/instrument/*`),
// so a visitor who has seen one reads the other immediately.
//
// FALLBACKS. The track is a native scroll-snap carousel in CSS. GSAP only takes
// over — adding `.is-driven`, which locks the native overflow — on a pointer-fine
// desktop with motion allowed. Without JS, below 900px, or under reduced motion
// you get the same seven slides, swiped or scrolled by hand. `gsap.matchMedia()`
// owns that switch, so it reverts cleanly on resize.
//
// ON THE FIGURES: the outcome line of each industry (OEE, response time,
// shrinkage…) is existing marketing copy. Everything ADDED here is deliberately
// operational — coverage, sites live, nodes connected, rollout progress — rather
// than more outcome claims, and the whole set is REPRESENTATIONAL: illustrative
// of the shape of a SVARA deployment, not measured customer results.
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import InstDonut from '~/components/instrument/InstDonut.vue'
import InstMetric from '~/components/instrument/InstMetric.vue'
import InstStats from '~/components/instrument/InstStats.vue'
import InstTarget from '~/components/instrument/InstTarget.vue'
import InstTrend from '~/components/instrument/InstTrend.vue'

interface Metric { l: string, v: string, d: string, dir: 'up' | 'down', s: number[] }
interface Industry {
  name: string
  line: string
  /** Basename in /public/images/home/industries. */
  img: string
  /** Describes the render's CONTENT for anyone who cannot see it. */
  imgAlt: string
  applies: string[]
  metric: string
  unit: string
  status: string
  /** The headline measure over time, and how to read it. */
  trend: { label: string, series: number[], axis: string[], mark: { i: number, v: string }, projected: number, unit: string, precision: number }
  /** What the deployed stack is made of. */
  mix: { total: string, totalLabel: string, segments: { k: string, v: number }[] }
  metrics: Metric[]
  target: { k: string, now: number, goal: number, unit: string }
}
const industries: Industry[] = [
  {
    name: 'Manufacturing', line: 'Zero-downtime production through predictive, self-optimising operations.',
    img: 'manufacturing',
    imgAlt: 'A production floor rendered half as reality and half as its live digital twin: machining cells, robotic arms and AGVs on the left, the same plant redrawn as a blue wireframe replica on the right. Vision AI markers tag quality inspection points, and readouts report predictive-maintenance health, production-optimisation efficiency and energy consumption. Below, the stack is broken out as Vision AI, Digital Twin and Edge AI, with outcomes listed as zero downtime, maximum efficiency, higher quality, lower cost and future ready.',
    applies: ['Vision AI', 'Digital Twin', 'Edge AI'], metric: '+18%', unit: 'OEE', status: 'RUNNING',
    trend: { label: 'OEE · 12 MONTHS', series: [71, 72, 74, 73, 76, 78, 79, 81, 83, 82, 85, 87, 88, 89], axis: ['Q1', 'Q2', 'Q3', 'Q4'], mark: { i: 10, v: '85% OEE' }, projected: 3, unit: '%', precision: 0 },
    mix: { total: '168', totalLabel: 'LINES', segments: [{ k: 'VISION AI', v: 44 }, { k: 'DIGITAL TWIN', v: 32 }, { k: 'EDGE AI', v: 24 }] },
    metrics: [
      { l: 'OEE', v: '+18%', d: '+4pt', dir: 'up', s: [71, 74, 76, 79, 82, 85, 87, 89] },
      { l: 'UNPLANNED STOPS', v: '−42%', d: '-9%', dir: 'down', s: [100, 91, 84, 77, 71, 65, 60, 58] },
      { l: 'LINES INSTRUMENTED', v: '168', d: '+21', dir: 'up', s: [104, 117, 128, 139, 147, 156, 162, 168] },
    ],
    target: { k: 'LINE COVERAGE', now: 74, goal: 95, unit: '%' },
  },
  {
    name: 'Smart Cities', line: 'City-scale awareness — mobility, safety and infrastructure in one view.',
    img: 'smart-cities',
    imgAlt: 'A city viewed from above with vehicles, pedestrians and infrastructure identified by tracking boxes, and drones surveying from the air. A city-overview panel reports traffic flow, active incidents, public safety and air quality. Below, three monitoring views cover mobility, public safety with crowd density, and infrastructure with structural health, feeding a two-operator control room. The stack is labelled Vision AI, Drone AI and One AI OS.',
    applies: ['Vision AI', 'Drone AI', 'One AI OS'], metric: '−34%', unit: 'RESPONSE TIME', status: 'WATCHING',
    trend: { label: 'INCIDENT RESPONSE · 12 MONTHS', series: [14.2, 13.8, 13.1, 12.6, 12.9, 12.1, 11.6, 11.2, 10.7, 10.4, 9.9, 9.7, 9.5, 9.4], axis: ['Q1', 'Q2', 'Q3', 'Q4'], mark: { i: 10, v: '9.9 min' }, projected: 3, unit: 'min', precision: 1 },
    mix: { total: '1,240', totalLabel: 'NODES', segments: [{ k: 'VISION AI', v: 41 }, { k: 'DRONE AI', v: 31 }, { k: 'ONE AI OS', v: 28 }] },
    metrics: [
      { l: 'RESPONSE TIME', v: '−34%', d: '-4.8min', dir: 'down', s: [14.2, 13.1, 12.6, 11.6, 10.7, 10.1, 9.7, 9.4] },
      { l: 'INTERSECTIONS LIVE', v: '1,240', d: '+186', dir: 'up', s: [780, 862, 934, 1010, 1084, 1152, 1204, 1240] },
      { l: 'INCIDENT RECALL', v: '96.4%', d: '+2.1%', dir: 'up', s: [91.2, 92.4, 93.1, 94.0, 94.8, 95.4, 96.0, 96.4] },
    ],
    target: { k: 'CORRIDOR COVERAGE', now: 61, goal: 90, unit: '%' },
  },
  {
    name: 'Logistics', line: 'End-to-end visibility from the dock to the doorstep.',
    img: 'logistics',
    imgAlt: 'A port and distribution hub in one view: a container ship at berth, cranes, rail, trucking lanes and warehouse docks, with a drone overhead and shipment icons tracing the route. Three screens report detection accuracy and throughput, live delivery status with in-transit and exception counts, and inventory health with stock-out, reorder and turnover figures. Data sources, systems and IoT devices flow through a central cloud to AI models, automation and integrations, watched by two operators.',
    applies: ['Vision AI', 'AI Agents', 'Business Cloud'], metric: '+22%', unit: 'THROUGHPUT', status: 'FLOWING',
    trend: { label: 'DOCK THROUGHPUT · 12 MONTHS', series: [100, 103, 107, 106, 111, 114, 117, 116, 120, 122, 124, 126, 129, 131], axis: ['Q1', 'Q2', 'Q3', 'Q4'], mark: { i: 10, v: '124 idx' }, projected: 3, unit: '', precision: 0 },
    mix: { total: '412', totalLabel: 'NODES', segments: [{ k: 'VISION AI', v: 38 }, { k: 'AI AGENTS', v: 34 }, { k: 'BUSINESS CLOUD', v: 28 }] },
    metrics: [
      { l: 'THROUGHPUT', v: '+22%', d: '+5pt', dir: 'up', s: [100, 106, 111, 116, 120, 124, 128, 131] },
      { l: 'DWELL TIME', v: '−29%', d: '-6%', dir: 'down', s: [100, 94, 88, 83, 79, 76, 73, 71] },
      { l: 'NODES CONNECTED', v: '412', d: '+64', dir: 'up', s: [248, 279, 306, 331, 356, 378, 397, 412] },
    ],
    target: { k: 'NETWORK VISIBILITY', now: 78, goal: 98, unit: '%' },
  },
  {
    name: 'Retail', line: 'Understand every aisle, shelf and shopper in real time.',
    img: 'retail',
    imgAlt: 'A supermarket floor where shoppers, baskets and trolleys are tracked, shelves are tagged by category, and a colour heatmap traces the path customers take. Panels report store traffic, conversion rate, dwell time, fresh-produce stock quality and shelf availability. Below, cameras and edge devices connect to a dashboard showing traffic overview, top categories, a store heatmap and shelf compliance. The stack is labelled Vision AI, Generative AI and Edge AI.',
    applies: ['Vision AI', 'Generative AI', 'Edge AI'], metric: '−27%', unit: 'SHRINKAGE', status: 'SENSING',
    trend: { label: 'SHRINKAGE RATE · 12 MONTHS', series: [2.4, 2.35, 2.28, 2.19, 2.22, 2.08, 1.99, 1.94, 1.87, 1.82, 1.79, 1.76, 1.74, 1.72], axis: ['Q1', 'Q2', 'Q3', 'Q4'], mark: { i: 10, v: '1.79%' }, projected: 3, unit: '%', precision: 2 },
    mix: { total: '340', totalLabel: 'STORES', segments: [{ k: 'VISION AI', v: 46 }, { k: 'GENERATIVE AI', v: 29 }, { k: 'EDGE AI', v: 25 }] },
    metrics: [
      { l: 'SHRINKAGE', v: '−27%', d: '-0.7pt', dir: 'down', s: [2.4, 2.28, 2.19, 2.05, 1.94, 1.84, 1.77, 1.72] },
      { l: 'SHELF ACCURACY', v: '97.1%', d: '+3.4%', dir: 'up', s: [91.4, 92.6, 93.8, 94.7, 95.4, 96.1, 96.7, 97.1] },
      { l: 'STORES LIVE', v: '340', d: '+58', dir: 'up', s: [196, 218, 241, 262, 284, 305, 324, 340] },
    ],
    target: { k: 'STORE ROLLOUT', now: 66, goal: 95, unit: '%' },
  },
  {
    name: 'Healthcare', line: 'Safer, faster and more coordinated clinical operations.',
    img: 'healthcare',
    imgAlt: 'A hospital in cross-section — reception, ward, imaging suite and operating theatre — connected by a sensing network, with staff, patients, an MRI scanner and an autonomous supply robot all identified. Below, a command centre shows corridor and waiting-area camera views, a three-dimensional model of the facility, patient vitals and a site map, monitored by two operators at multi-screen desks.',
    applies: ['Vision AI', 'AI Agents', 'Digital Twin'], metric: '−41%', unit: 'WAIT TIME', status: 'COORDINATING',
    trend: { label: 'PATIENT WAIT · 12 MONTHS', series: [64, 61, 58, 59, 54, 51, 48, 46, 43, 41, 39, 38, 37, 36], axis: ['Q1', 'Q2', 'Q3', 'Q4'], mark: { i: 10, v: '39 min' }, projected: 3, unit: 'min', precision: 0 },
    mix: { total: '54', totalLabel: 'DEPTS', segments: [{ k: 'AI AGENTS', v: 37 }, { k: 'VISION AI', v: 35 }, { k: 'DIGITAL TWIN', v: 28 }] },
    metrics: [
      { l: 'WAIT TIME', v: '−41%', d: '-26min', dir: 'down', s: [64, 58, 54, 48, 43, 40, 38, 36] },
      { l: 'BED TURNOVER', v: '+19%', d: '+3pt', dir: 'up', s: [100, 104, 107, 110, 113, 116, 118, 119] },
      { l: 'DEPARTMENTS LIVE', v: '54', d: '+11', dir: 'up', s: [31, 35, 39, 43, 46, 49, 52, 54] },
    ],
    target: { k: 'PATHWAY COVERAGE', now: 58, goal: 85, unit: '%' },
  },
  {
    name: 'Energy', line: 'Autonomous inspection and predictive grid intelligence.',
    img: 'energy',
    imgAlt: 'A generation and transmission landscape: high-voltage pylons and a substation in the foreground with equipment highlighted, a thermal plant, a wind farm and a solar array behind, and inspection drones surveying the assets. Below, a drone, an edge compute unit and a glowing digital-twin model of the substation feed a control room where two operators watch asset imagery, a network map, analytics and a thermal view.',
    applies: ['Drone AI', 'Edge AI', 'Digital Twin'], metric: '99.9%', unit: 'UPTIME', status: 'INSPECTING',
    trend: { label: 'GRID UPTIME · 12 MONTHS', series: [99.1, 99.2, 99.15, 99.3, 99.35, 99.4, 99.5, 99.55, 99.6, 99.7, 99.75, 99.8, 99.85, 99.9], axis: ['Q1', 'Q2', 'Q3', 'Q4'], mark: { i: 10, v: '99.75%' }, projected: 3, unit: '%', precision: 2 },
    mix: { total: '8,400', totalLabel: 'ASSETS', segments: [{ k: 'DRONE AI', v: 39 }, { k: 'EDGE AI', v: 33 }, { k: 'DIGITAL TWIN', v: 28 }] },
    metrics: [
      { l: 'UPTIME', v: '99.9%', d: '+0.8%', dir: 'up', s: [99.1, 99.2, 99.35, 99.5, 99.6, 99.7, 99.8, 99.9] },
      { l: 'INSPECTION COST', v: '−36%', d: '-8%', dir: 'down', s: [100, 93, 87, 81, 75, 71, 67, 64] },
      { l: 'ASSETS MONITORED', v: '8,400', d: '+1.4k', dir: 'up', s: [5.2, 5.8, 6.3, 6.8, 7.3, 7.8, 8.1, 8.4] },
    ],
    target: { k: 'ASSET COVERAGE', now: 81, goal: 99, unit: '%' },
  },
  {
    name: 'Construction', line: 'Site intelligence — progress, safety and assets tracked continuously.',
    img: 'construction',
    imgAlt: 'An active building site seen over the shoulder of a site engineer holding a tablet: structural frames, an excavator, a concrete mixer, a tower crane and workers, each identified by tracking markers, with survey drones overhead. A blue wireframe model of the site sits alongside. Below, drones, cameras and an edge unit feed a control room showing aerial site views, a progress model, analytics and a heatmap.',
    applies: ['Drone AI', 'Vision AI', 'Digital Twin'], metric: '−30%', unit: 'REWORK', status: 'SURVEYING',
    trend: { label: 'REWORK RATE · 12 MONTHS', series: [9.4, 9.1, 8.7, 8.9, 8.2, 7.8, 7.5, 7.1, 6.9, 6.6, 6.4, 6.2, 6.1, 5.9], axis: ['Q1', 'Q2', 'Q3', 'Q4'], mark: { i: 10, v: '6.4%' }, projected: 3, unit: '%', precision: 1 },
    mix: { total: '96', totalLabel: 'SITES', segments: [{ k: 'DRONE AI', v: 42 }, { k: 'VISION AI', v: 33 }, { k: 'DIGITAL TWIN', v: 25 }] },
    metrics: [
      { l: 'REWORK', v: '−30%', d: '-3.5pt', dir: 'down', s: [9.4, 8.7, 8.2, 7.5, 6.9, 6.5, 6.2, 5.9] },
      { l: 'SCHEDULE VARIANCE', v: '−24%', d: '-5pt', dir: 'down', s: [100, 94, 89, 85, 82, 79, 77, 76] },
      { l: 'SITES ACTIVE', v: '96', d: '+18', dir: 'up', s: [52, 59, 66, 73, 79, 86, 91, 96] },
    ],
    target: { k: 'SITE COVERAGE', now: 69, goal: 92, unit: '%' },
  },
]

const COUNT = industries.length

/** Which slide the track is currently showing — drives the nav highlight only. */
const active = ref(0)
/** True once GSAP owns the track, so the template can drop the native scroller. */
const driven = ref(false)

const sectionEl = ref<HTMLElement | null>(null)
const stageEl = ref<HTMLElement | null>(null)
const viewportEl = ref<HTMLElement | null>(null)
const trackEl = ref<HTMLElement | null>(null)

// Loosely typed on purpose, matching how the rest of the codebase holds GSAP
// handles from the dynamic import.
/* eslint-disable @typescript-eslint/no-explicit-any */
let mm: any = null
let scrollTo: ((y: number) => void) | null = null
/* eslint-enable @typescript-eslint/no-explicit-any */
let io: IntersectionObserver | null = null

const slideEls = (): HTMLElement[] =>
  Array.from(trackEl.value?.querySelectorAll<HTMLElement>('.in__slide') ?? [])

/**
 * Publishes scroll progress to CSS as `--in-p` (0→1). The nav's progress bar is
 * drawn from it, so the bar is a readout of the real scroll position rather than
 * a second animation that could drift out of step with the track.
 */
function setProgress(p: number) {
  stageEl.value?.style.setProperty('--in-p', String(p))
}

/**
 * Keeps the nav in sync while the NATIVE scroller is in charge (no-JS path,
 * touch, reduced motion). Rooted on the viewport, so it reports which slide is
 * centred in the carousel rather than where the page is.
 */
function observeNative() {
  io?.disconnect()
  if (!viewportEl.value) return
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        const i = slideEls().indexOf(e.target as HTMLElement)
        if (i >= 0) {
          active.value = i
          setProgress(COUNT > 1 ? i / (COUNT - 1) : 0)
        }
      }
    },
    { root: viewportEl.value, threshold: 0.55 },
  )
  slideEls().forEach((el) => io!.observe(el))
}

/**
 * Jumping from the nav. Under GSAP the slides are a function of PAGE scroll, so
 * selecting one means scrolling the page to the point in the pin that shows it —
 * not moving the track directly, which would immediately be overwritten by the
 * next scrub frame. Under the native scroller it is an ordinary carousel scroll.
 */
function go(i: number) {
  active.value = i
  if (driven.value && scrollTo) { scrollTo(i); return }
  slideEls()[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
}

function onNavKey(e: KeyboardEvent) {
  const back = e.key === 'ArrowLeft' || e.key === 'ArrowUp'
  const fwd = e.key === 'ArrowRight' || e.key === 'ArrowDown'
  if (!back && !fwd) return
  e.preventDefault()
  go(Math.min(COUNT - 1, Math.max(0, active.value + (fwd ? 1 : -1))))
}

onMounted(async () => {
  if (typeof window === 'undefined') return
  await nextTick()
  observeNative()

  // Without GSAP the native scroll-snap carousel above is already the whole
  // feature, so a failed import costs the pin and nothing else.
  let gsap: typeof import('~~/lib/gsap')['gsap']
  try { ({ gsap } = await import('~~/lib/gsap')) }
  catch { return }

  const lenis = (useNuxtApp() as unknown as { $lenis?: { scrollTo: (y: number) => void } }).$lenis

  mm = gsap.matchMedia()

  // The pin is DESKTOP + MOTION-ALLOWED only. Hijacking the scroll axis is
  // hostile on a touch screen — where a horizontal swipe is already the natural
  // gesture — and is exactly the kind of motion `prefers-reduced-motion` asks us
  // not to impose. matchMedia tears the whole thing down and restores the native
  // scroller if the viewport crosses back over either line.
  mm.add(
    '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
    () => {
      const track = trackEl.value
      const stage = stageEl.value
      const viewport = viewportEl.value
      if (!track || !stage || !viewport) return

      driven.value = true

      // Travel is expressed per-slide with xPercent, so it stays correct at any
      // width without re-measuring: each slide is exactly one viewport wide, so
      // -100% is precisely one slide.
      const tween = gsap.to(slideEls(), {
        xPercent: -100 * (COUNT - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          pin: stage,
          scrub: 0.6,
          // Pace tied to viewport HEIGHT, not track width: the reader is still
          // making a vertical gesture, so ~0.9 screens of scroll per industry is
          // what actually feels 1:1 under the hand.
          end: () => `+=${(COUNT - 1) * window.innerHeight * 0.9}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self: { progress: number }) => {
            setProgress(self.progress)
            active.value = Math.round(self.progress * (COUNT - 1))
          },
        },
      })

      const st = tween.scrollTrigger!
      scrollTo = (i: number) => {
        const y = st.start + ((st.end - st.start) * i) / (COUNT - 1)
        if (lenis) lenis.scrollTo(y)
        else window.scrollTo({ top: y, behavior: 'smooth' })
      }

      // Native observation would fight the transform — under the pin every slide
      // sits inside the viewport box and only the transform moves it.
      io?.disconnect()

      // Cleanup is the RETURNED function — `context.add()` would run this body
      // immediately, tearing the pin down in the same frame it was built.
      return () => {
        driven.value = false
        scrollTo = null
        gsap.set(slideEls(), { clearProps: 'transform' })
        stage.style.removeProperty('--in-p')
        observeNative()
      }
    },
  )
})

onBeforeUnmount(() => {
  mm?.revert()
  io?.disconnect()
})
</script>

<template>
  <section ref="sectionEl" class="in hx-section">
    <div class="hx-container">
      <header class="in__head">
        <p class="hx-eyebrow"><span class="hx-index">06</span> Industries</p>
        <h2 class="hx-title">One intelligence stack. <span class="lite">Every environment.</span></h2>
      </header>
    </div>

    <!-- THE PINNED STAGE. Everything from here down is one screen: the nav, then
         the track that slides sideways beneath it. -->
    <div ref="stageEl" class="in__stage">
      <div class="hx-container in__stage-in">
        <nav class="in__nav" aria-label="Industries" @keydown="onNavKey">
          <ul class="in__nav-list" role="tablist">
            <li v-for="(ind, i) in industries" :key="ind.name">
              <button
                class="in__nav-item" :class="{ 'is-active': active === i }"
                role="tab" :aria-selected="active === i" :tabindex="active === i ? 0 : -1"
                @click="go(i)"
              >
                <span class="in__nav-n hx-mono">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="in__nav-name">{{ ind.name }}</span>
              </button>
            </li>
          </ul>
          <!-- a readout of --in-p, which is written from the real scroll position -->
          <span class="in__nav-track" aria-hidden="true"><i class="in__nav-fill" /></span>
        </nav>

        <div ref="viewportEl" class="in__viewport" :class="{ 'is-driven': driven }">
          <div ref="trackEl" class="in__track">
            <article v-for="(ind, i) in industries" :key="ind.name" class="in__slide" :inert="driven && active !== i ? true : undefined">
              <!-- LEFT · the environment itself -->
              <div class="in__media">
                <a
                  class="in__art"
                  :href="`/images/home/industries/${ind.img}.png`"
                  target="_blank"
                  rel="noopener"
                  :aria-label="`${ind.name} deployment render — open the full-resolution image in a new tab`"
                >
                  <picture>
                    <source :srcset="`/images/home/industries/${ind.img}.webp`" type="image/webp">
                    <img
                      class="in__art-img"
                      :src="`/images/home/industries/${ind.img}.png`"
                      :alt="ind.imgAlt"
                      width="1254"
                      height="1254"
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                    >
                  </picture>
                  <span class="in__art-zoom" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.2" stroke="currentColor" stroke-width="1.3" /><path d="M9.2 9.2 13 13M6 4.2v3.6M4.2 6h3.6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" /></svg>
                    View full size
                  </span>
                </a>
                <p class="in__line">{{ ind.line }}</p>
                <div class="in__stack">
                  <span class="in__stack-label hx-mono-label">STACK</span>
                  <div class="in__applies">
                    <span v-for="a in ind.applies" :key="a" class="in__chip">{{ a }}</span>
                  </div>
                </div>
              </div>

              <!-- RIGHT · the instrument reading that environment -->
              <div class="in__inst hx-panel">
                <span class="hx-pin tl" /><span class="hx-pin tr" /><span class="hx-pin bl" /><span class="hx-pin br" />
                <div class="in__inst-top">
                  <span class="in__kicker hx-mono-label"><span class="hx-dot" /> DEPLOYMENT · {{ ind.name.toUpperCase() }}</span>
                  <span class="in__status">{{ ind.status }}<i /></span>
                </div>

                <!-- ANALYSIS — how the headline measure has moved, what it measures
                     out to, and what the deployment is made of. Same three reads as
                     the division instruments, so the two sections rhyme. -->
                <div class="in__an">
                  <div class="in__an-head">
                    <span class="hx-mono-label in__an-label">{{ ind.trend.label }}</span>
                    <span class="in__an-legend"><i />observed<b />projected</span>
                  </div>
                  <div class="in__an-grid">
                    <div class="in__an-chart">
                      <InstTrend
                        :series="ind.trend.series"
                        :axis="ind.trend.axis"
                        :mark-index="ind.trend.mark.i"
                        :mark-label="ind.trend.mark.v"
                        :projected="ind.trend.projected"
                        :unit="ind.trend.unit"
                        :precision="ind.trend.precision"
                        :label="ind.trend.label"
                      />
                      <InstStats
                        :series="ind.trend.series"
                        :unit="ind.trend.unit"
                        :precision="ind.trend.precision"
                      />
                    </div>
                    <InstDonut
                      label="DEPLOYED STACK"
                      :segments="ind.mix.segments"
                      :total="ind.mix.total"
                      :total-label="ind.mix.totalLabel"
                    />
                  </div>
                </div>

                <div class="in__rail">
                  <InstMetric
                    v-for="m in ind.metrics"
                    :key="m.l"
                    class="in__rail-cell"
                    :label="m.l" :value="m.v" :delta="m.d" :dir="m.dir" :series="m.s"
                  />
                </div>

                <div class="in__foot">
                  <InstTarget
                    :label="ind.target.k"
                    :now="ind.target.now"
                    :goal="ind.target.goal"
                    :unit="ind.target.unit"
                  />
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
 /* The stage is a full screen that centres its own content, so the section needs
   less bottom room than the shared rhythm gives it — but not none, or section 07
   starts the instant the pin releases. */
.in { padding-bottom: clamp(56px, 7vh, 110px); }
.in__head { margin-bottom: clamp(28px, 3.4vw, 48px); }

/* ── the pinned stage ──────────────────────────────────────────────────────
   One screen. Nav on top, track beneath it. Everything inside is sized against
   svh so the slide never exceeds the stage and re-introduces the vertical
   overflow this layout exists to remove. */
.in__stage { position: relative; height: 100vh; height: 100svh; display: flex; align-items: center; }
.in__stage-in { width: 100%; display: flex; flex-direction: column; gap: clamp(14px, 1.8vh, 22px); }

/* ── nav ───────────────────────────────────────────────────────────────── */
.in__nav { position: relative; flex: none; }
.in__nav-list {
  list-style: none; margin: 0 0 10px; padding: 0 0 12px;
  display: flex; gap: clamp(12px, 2vw, 30px); overflow-x: auto;
  scrollbar-width: none;
}
.in__nav-list::-webkit-scrollbar { display: none; }
.in__nav-item {
  display: inline-flex; align-items: baseline; gap: 8px; white-space: nowrap;
  padding: 0; background: none; border: none; cursor: pointer;
  color: var(--ink-muted); transition: color var(--motion-fast) var(--ease-smooth);
}
.in__nav-n { font-size: 10px; color: var(--ink-muted); transition: color var(--motion-fast) var(--ease-smooth); }
.in__nav-name { font-size: clamp(13px, 1.15vw, 16px); font-weight: 600; letter-spacing: -0.01em; }
.in__nav-item:hover { color: var(--ink-secondary); }
.in__nav-item.is-active { color: var(--ink-primary); }
.in__nav-item.is-active .in__nav-n { color: var(--sig); }
.in__nav-item:focus-visible { outline: 2px solid var(--sig); outline-offset: 3px; }
.in__nav-track { display: block; height: 1px; background: rgba(20, 34, 63, 0.14); }
.in__nav-fill {
  display: block; height: 100%; background: var(--sig); transform-origin: left center;
  /* --in-p is written from the live scroll position, so the bar cannot drift */
  transform: scaleX(calc(var(--in-p, 0) * 0.857 + 0.143));
}

/* ── the horizontal track ──────────────────────────────────────────────────
   By default a real scroll-snap carousel — that is the no-JS, touch and
   reduced-motion experience. `.is-driven` hands it to GSAP, which owns the
   transform and needs the native scroller out of the way. */
.in__viewport { overflow-x: auto; overflow-y: hidden; scroll-snap-type: x mandatory; scrollbar-width: none; margin-inline: calc(var(--container-pad) * -1); padding-inline: var(--container-pad); }
.in__viewport::-webkit-scrollbar { display: none; }
.in__viewport.is-driven { overflow: hidden; scroll-snap-type: none; }
.in__track { display: flex; }
.in__slide {
  flex: 0 0 100%; scroll-snap-align: center;
  display: grid; grid-template-columns: minmax(0, 0.84fr) minmax(0, 1.16fr);
  gap: clamp(20px, 2.6vw, 46px); align-items: stretch;
}

/* ── left · the environment ────────────────────────────────────────────── */
.in__media { display: flex; flex-direction: column; gap: clamp(12px, 1.6vh, 20px); min-width: 0; }
/* `__art`, not `__card`/`__tile` — svara-3d.css attaches bevel, hover-lift and a
   cursor tilt to those suffixes by attribute selector. */
.in__art {
  position: relative; display: block; overflow: hidden; border-radius: 2px;
  /* Square renders, capped against the STAGE height rather than the column
     width — the column is wide enough that a width-driven image would push the
     copy beneath it off the pinned screen. Never cropped: these compositions
     carry meaning across the whole frame (environment above, stack or control
     room below), and the zoom link opens the full resolution. */
  width: min(100%, 46svh); aspect-ratio: 1; margin-inline: auto;
}
.in__art-img { display: block; width: 100%; height: 100%; object-fit: contain; }
.in__art-zoom {
  position: absolute; right: 10px; bottom: 10px;
  display: inline-flex; align-items: center; gap: 7px; padding: 6px 10px;
  font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--ink-primary); background: rgba(255, 255, 255, 0.86);
  -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  box-shadow: inset 0 0 0 1px rgba(20, 34, 63, 0.14);
  opacity: 0; transform: translateY(4px);
  transition: opacity 220ms var(--ease-out), transform 220ms var(--ease-out);
}
.in__art:hover .in__art-zoom, .in__art:focus-visible .in__art-zoom { opacity: 1; transform: none; }
.in__art:focus-visible { outline: 2px solid var(--sig); outline-offset: 3px; }
@media (hover: none) { .in__art-zoom { opacity: 1; transform: none; } }

.in__line { margin: 0; font-size: clamp(16px, 1.5vw, 22px); font-weight: 500; letter-spacing: -0.02em; line-height: 1.25; color: var(--ink-primary); max-width: 34ch; }
.in__stack { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
.in__stack-label { color: var(--ink-muted); }
.in__applies { display: flex; flex-wrap: wrap; gap: 7px; }
.in__chip { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.04em; color: var(--ink-primary); padding: 5px 11px; border: 1px solid rgba(20, 34, 63, 0.16); border-radius: var(--radius-pill); background: rgba(255, 255, 255, 0.5); }

/* ── right · the deployment instrument ─────────────────────────────────── */
.in__inst { display: flex; flex-direction: column; padding: clamp(16px, 1.9vh, 24px) clamp(18px, 1.6vw, 28px); min-width: 0; }
.in__inst-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex: none; }
.in__kicker { display: inline-flex; align-items: center; gap: 8px; color: var(--ink-muted); }
.in__status { display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.14em; color: var(--ink-muted); }
.in__status i { width: 5px; height: 5px; border-radius: 50%; background: var(--sig); }

.in__an { margin-top: clamp(12px, 1.7vh, 20px); padding-top: clamp(12px, 1.6vh, 18px); border-top: 1px solid var(--edge-metal, rgba(20, 34, 63, 0.12)); display: flex; flex-direction: column; gap: 12px; }
.in__an-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.in__an-label { color: var(--ink-muted); }
.in__an-legend { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.1em; color: var(--ink-muted); }
.in__an-legend i, .in__an-legend b { width: 9px; height: 3px; border-radius: 1px; }
.in__an-legend i { background: var(--sig); }
.in__an-legend b { background: repeating-linear-gradient(45deg, var(--sig) 0 1px, transparent 1px 3px); opacity: 0.8; }
.in__an-grid { display: grid; grid-template-columns: minmax(0, 1.24fr) minmax(180px, 1fr); gap: clamp(16px, 2vw, 30px); align-items: start; }
.in__an-chart { display: flex; flex-direction: column; gap: 10px; min-width: 0; }

.in__rail { margin-top: clamp(12px, 1.7vh, 20px); padding-top: clamp(12px, 1.6vh, 18px); border-top: 1px solid var(--edge-metal, rgba(20, 34, 63, 0.12)); display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(12px, 1.6vw, 24px); }
.in__foot { margin-top: auto; padding-top: clamp(12px, 1.6vh, 18px); border-top: 1px solid var(--edge-metal, rgba(20, 34, 63, 0.12)); }

/* ── narrow ────────────────────────────────────────────────────────────────
   Below 900px the pin is never installed (see the matchMedia query), so the
   stage stops being one screen and the carousel is swiped by hand. */
@media (max-width: 1180px) {
  .in__an-grid { grid-template-columns: 1fr; }
}
@media (max-width: 900px) {
  .in__stage { height: auto; padding-block: 8px 4px; }
  .in__slide { grid-template-columns: 1fr; gap: 22px; }
  .in__art { width: 100%; max-width: 460px; }
  .in__rail { grid-template-columns: 1fr; gap: 16px; }
  .in__foot { margin-top: 18px; }
}
@media (prefers-reduced-motion: reduce) {
  .in__stage { height: auto; }
  .in__viewport { scroll-behavior: auto; }
}
</style>
