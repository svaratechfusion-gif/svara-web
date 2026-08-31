<script setup lang="ts">
// 04 · FLAGSHIP PRODUCTS — a cinematic horizontal product showcase.
//
// One large glass product card at a time, the next card peeking on the right,
// riding an oversized blurred version of the active illustration that crossfades
// as slides change (~10% opacity). Editorial header, engineering-grid ground,
// warm-ivory SVARA DNA throughout.
//
// Interaction system (Apple / Linear / Vercel register):
//   · horizontal slide, 820ms power3.inOut, single-step neighbour transitions
//   · magnetic prev/next arrows · dot + counter navigation
//   · keyboard (←/→) · pointer drag · touch swipe (edge resistance)
//   · autoplay every 8s (progress bar IS the timer), pause on hover/drag/offscreen
//   · per-slide text + illustration reveal, background crossfade, transit motion-blur
//   · subtle mouse parallax + idle float on the active illustration
//   · full reduced-motion + no-JS fallbacks
//
// GSAP is the single motion authority (~~/lib/gsap). Content / order / copy carried
// verbatim from the Content Bible. Renders live in /public/images/home/flagship.
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import SectionFigure from './SectionFigure.vue'

interface Flagship {
  key: string
  index: string
  category: string
  name: string
  copy: string
  specs: string[]
  to: string
  img: string
}

// Runtime-bound src (served from /public) — a static "/images/..." on <img> makes
// Vite's SFC compiler try to bundle it as an asset import and 500 if absent.
const IMG = '/images/home/flagship'

const flagships: Flagship[] = [
  { key: 'vision', index: '01', category: 'Perception', name: 'Vision AI', to: '/products/vision-ai', img: 'vision-ai',
    copy: 'Turn any camera stream into structured operational intelligence — detect, track, count and understand what happens, in real time.',
    specs: ['Real-time detection', 'Multi-camera fusion', 'Edge optimized'] },
  { key: 'twin', index: '02', category: 'Simulation', name: 'Digital Twin', to: '/products/digital-twin', img: 'digital-twin',
    copy: 'A living model of your physical operation. Simulate, monitor and optimise outcomes before you commit a single change in the real world.',
    specs: ['Live sensor sync', 'Scenario simulation', 'Predictive ops'] },
  { key: 'agents', index: '03', category: 'Autonomy', name: 'Autonomous AI Agents', to: '/products/ai-agents', img: 'ai-agents',
    copy: 'Intelligent digital workers that reason, decide and execute across your business systems — goal-driven, tool-using, around the clock.',
    specs: ['Goal-driven', 'Tool-using', 'Human-in-loop'] },
  { key: 'cloud', index: '04', category: 'Operations', name: 'Business Cloud', to: '/products/business-cloud', img: 'business-cloud',
    copy: 'Every business function — ERP, CRM, finance, HR and operations — unified on one intelligent cloud that connects data and decisions end to end.',
    specs: ['Unified data', 'Cross-function', 'Real-time'] },
  { key: 'edge', index: '05', category: 'Edge', name: 'Edge AI', to: '/products/edge-ai', img: 'edge-ai',
    copy: 'Run perception and inference on-site, where milliseconds matter — camera to edge device to cloud, with intelligence at every hop.',
    specs: ['On-device', 'Low latency', 'Cloud sync'] },
  { key: 'growth', index: '06', category: 'Growth', name: 'Growth Intelligence', to: '/products', img: 'growth-intelligence',
    copy: 'Forecast revenue, model risk and surface the moves that compound — turning operational signals into forward-looking growth intelligence.',
    specs: ['Forecasting', 'Risk models', 'Actionable insight'] },
]

const COUNT = flagships.length
const AUTOPLAY_MS = 8000
const DUR = 0.82          // 820ms — within the 700–900ms cinematic band
const EASE = 'power3.inOut'

// ---- reactive UI state ----
const active = ref(0)
const moving = ref(false)      // drives the transit motion-blur class
const stepPx = ref(0)          // measured card+gap, for the no-JS fallback transform

// ---- element refs ----
const sectionEl = ref<HTMLElement | null>(null)
const stageEl = ref<HTMLElement | null>(null)
const trackEl = ref<HTMLElement | null>(null)
const bgAEl = ref<HTMLElement | null>(null)
const bgBEl = ref<HTMLElement | null>(null)
const autoBarEl = ref<HTMLElement | null>(null)
const prevBtn = ref<HTMLElement | null>(null)
const nextBtn = ref<HTMLElement | null>(null)

// Vue only ever writes the `--fx-x` custom property; the CSS rule turns it into a
// translateX so the slider is positioned correctly on the server / no-JS / before
// GSAP loads. Once GSAP mounts it writes an inline `transform` that wins over the
// rule — so Vue and GSAP never fight over the same property.
const trackVars = computed(() => ({ '--fx-x': `${-active.value * stepPx.value}px` }))

// GSAP handles — dynamically imported; kept loosely typed as the codebase does.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let gsap: any = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ScrollTrigger: any = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let autoTween: any = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let st: any = null
let ro: ResizeObserver | null = null

let reduce = false
let inView = false
let hovering = false
let dragging = false
let revealedOnce = false
let dir = 1              // autoplay ping-pong direction
let io: IntersectionObserver | null = null
let bgFlip = false       // which blurred layer currently shows the active image

const cardEls = (): HTMLElement[] =>
  Array.from(trackEl.value?.querySelectorAll<HTMLElement>('.fx__card') ?? [])

// ---- geometry ----
function measure() {
  const first = trackEl.value?.querySelector<HTMLElement>('.fx__card')
  if (!first || !trackEl.value) return
  const cs = getComputedStyle(trackEl.value)
  const gap = parseFloat(cs.columnGap || cs.gap || '0') || 0
  stepPx.value = first.offsetWidth + gap
}
const xFor = (i: number) => -i * stepPx.value

function applyInstant() {
  if (gsap && trackEl.value) gsap.set(trackEl.value, { x: xFor(active.value) })
}

// ---- slide ----
function animateTo(i: number) {
  if (!gsap || !trackEl.value) return
  const target = xFor(i)
  gsap.killTweensOf(trackEl.value)
  if (reduce) { gsap.set(trackEl.value, { x: target }); return }
  moving.value = true
  gsap.to(trackEl.value, {
    x: target, duration: DUR, ease: EASE,
    onComplete: () => { moving.value = false },
  })
}

function crossfadeBg(i: number) {
  const url = `url("${IMG}/${flagships[i]!.img}.png")`
  const incoming = bgFlip ? bgAEl.value : bgBEl.value
  const outgoing = bgFlip ? bgBEl.value : bgAEl.value
  if (!incoming || !outgoing) return
  incoming.style.backgroundImage = url
  if (gsap && !reduce) {
    gsap.to(incoming, { opacity: 0.1, duration: DUR, ease: 'power2.inOut' })
    gsap.to(outgoing, { opacity: 0, duration: DUR, ease: 'power2.inOut' })
  } else {
    incoming.style.opacity = '0.1'
    outgoing.style.opacity = '0'
  }
  bgFlip = !bgFlip
}

function revealCard(i: number) {
  if (!gsap || reduce) return
  // Never START an opacity fade while the tab is hidden: a throttled/hidden tab
  // pauses the rAF ticker so the tween can't advance and content stays at 0.
  // `.fx__reveal` items are opacity:1 by default (SSR-visible) so skipping is safe.
  if (typeof document !== 'undefined' && document.hidden) return
  const card = cardEls()[i]
  if (!card) return
  const items = card.querySelectorAll('.fx__reveal')
  gsap.fromTo(items,
    { y: 22, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.06, delay: 0.14, overwrite: true })
  const img = card.querySelector('.fx__img')
  if (img) gsap.fromTo(img,
    { scale: 1.07, opacity: 0.55 },
    { scale: 1, opacity: 1, duration: 0.9, ease: 'power3.out', overwrite: true })
}

// ---- navigation (single-step, clamped) ----
function goTo(i: number) {
  const n = Math.max(0, Math.min(COUNT - 1, i))
  if (n === active.value) { animateTo(active.value); armAuto(); return } // snap-back on drag
  active.value = n
  crossfadeBg(n)
  animateTo(n)
  revealCard(n)
  armAuto()
}
const next = () => goTo(active.value + 1)
const prev = () => goTo(active.value - 1)

function autoTick() {
  if (active.value >= COUNT - 1) dir = -1
  if (active.value <= 0) dir = 1
  goTo(active.value + dir)
}

// ---- autoplay (the progress bar tween is the clock) ----
function autoAllowed() {
  return !reduce && inView && !hovering && !dragging
}
function armAuto() {
  if (!gsap) return
  autoTween?.kill()
  autoTween = null
  if (!autoAllowed() || !autoBarEl.value) return
  autoTween = gsap.fromTo(autoBarEl.value,
    { scaleX: 0 },
    { scaleX: 1, transformOrigin: 'left center', duration: AUTOPLAY_MS / 1000, ease: 'none', onComplete: autoTick })
}
function pauseAuto() { autoTween?.pause() }
function resumeAuto() {
  if (!autoAllowed()) return
  if (autoTween && autoTween.paused() && autoTween.progress() < 1) { autoTween.play(); return }
  armAuto()
}

// ---- pointer drag / swipe ----
let dragStartX = 0, dragBaseX = 0, dragDX = 0

function onPointerDown(e: PointerEvent) {
  if (e.button !== 0 && e.pointerType === 'mouse') return
  dragging = true
  dragStartX = e.clientX
  dragBaseX = xFor(active.value)
  dragDX = 0
  pauseAuto()
  gsap?.killTweensOf(trackEl.value)
  stageEl.value?.setPointerCapture?.(e.pointerId)
  stageEl.value?.classList.add('is-grabbing')
}
function onPointerMove(e: PointerEvent) {
  // parallax when idle, drag-follow when pressed
  if (dragging) {
    dragDX = e.clientX - dragStartX
    let x = dragBaseX + dragDX
    const min = xFor(COUNT - 1), max = xFor(0)
    if (x > max) x = max + (x - max) * 0.35        // rubber-band at edges
    if (x < min) x = min + (x - min) * 0.35
    gsap?.set(trackEl.value, { x })
    return
  }
  if (reduce) return
  const r = stageEl.value?.getBoundingClientRect()
  if (!r) return
  const px = (e.clientX - r.left) / r.width - 0.5
  const py = (e.clientY - r.top) / r.height - 0.5
  const vis = cardEls()[active.value]?.querySelector<HTMLElement>('.fx__visual')
  if (vis) { vis.style.setProperty('--px', String(px)); vis.style.setProperty('--py', String(py)) }
}
function endDrag(e: PointerEvent) {
  if (!dragging) return
  dragging = false
  stageEl.value?.classList.remove('is-grabbing')
  stageEl.value?.releasePointerCapture?.(e.pointerId)
  const threshold = Math.min(stepPx.value * 0.16, 110)
  if (dragDX <= -threshold) next()
  else if (dragDX >= threshold) prev()
  else { animateTo(active.value); resumeAuto() }
}

// ---- magnetic arrows ----
function magnet(e: PointerEvent, el: HTMLElement | null) {
  if (reduce || !gsap || !el) return
  const r = el.getBoundingClientRect()
  gsap.to(el, { x: (e.clientX - (r.left + r.width / 2)) * 0.32, y: (e.clientY - (r.top + r.height / 2)) * 0.32, duration: 0.4, ease: 'power3.out' })
}
function demagnet(el: HTMLElement | null) {
  if (!gsap || !el) return
  gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1,0.4)' })
}

// ---- keyboard ----
function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowRight') { e.preventDefault(); next() }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
  else if (e.key === 'Home') { e.preventDefault(); goTo(0) }
  else if (e.key === 'End') { e.preventDefault(); goTo(COUNT - 1) }
}

// ---- hover / visibility ----
function onEnter() { hovering = true; pauseAuto() }
function onLeave() { hovering = false; resumeAuto() }
function onVisibility() { if (document.hidden) pauseAuto(); else resumeAuto() }
function onResize() { measure(); applyInstant() }

onMounted(async () => {
  if (typeof window === 'undefined') return
  reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  await nextTick()
  measure()

  // geometry + lifecycle wiring runs even if GSAP never loads, so the CSS-var
  // fallback stays correct on resize.
  ro = new ResizeObserver(onResize)
  if (stageEl.value) ro.observe(stageEl.value)
  document.addEventListener('visibilitychange', onVisibility)

  try {
    const mod = await import('~~/lib/gsap')
    gsap = mod.gsap
    ScrollTrigger = mod.ScrollTrigger
  } catch { return } // CSS-var fallback already keeps the slider usable

  // seed the first blurred background layer; the next crossfade draws into layer B
  if (bgAEl.value) {
    bgAEl.value.style.backgroundImage = `url("${IMG}/${flagships[0]!.img}.png")`
    bgAEl.value.style.opacity = '0.1'
  }
  bgFlip = false

  applyInstant()

  const enterView = () => {
    inView = true
    if (!revealedOnce) { revealCard(active.value); revealedOnce = true }
    resumeAuto()
  }
  // ScrollTrigger drives the ENTRANCE reveal (it is already the motion authority
  // and is synced to Lenis).
  st = ScrollTrigger.create({
    trigger: sectionEl.value,
    start: 'top 82%',
    end: 'bottom 18%',
    onToggle: (self: { isActive: boolean }) => {
      if (self.isActive) enterView()
    },
  })
  if (st.isActive) enterView()

  // …but AUTOPLAY hangs off a plain IntersectionObserver, not off ScrollTrigger.
  // The whole slideshow used to stop dead if that one toggle failed to fire, with
  // no second path to recover — a silent, total loss of the feature. An observer
  // is independent of the animation loop and of scroll plumbing, so the timer
  // starts whenever the section is genuinely on screen and stops when it is not.
  io = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) { inView = true; resumeAuto() }
    else { inView = false; pauseAuto() }
  }, { threshold: 0.25 })
  if (sectionEl.value) io.observe(sectionEl.value)
})

onBeforeUnmount(() => {
  autoTween?.kill()
  st?.kill()
  io?.disconnect()
  ro?.disconnect()
  if (typeof document !== 'undefined') document.removeEventListener('visibilitychange', onVisibility)
  if (gsap && trackEl.value) gsap.killTweensOf(trackEl.value)
})
</script>

<template>
  <!-- Hover-pause is deliberately NOT on this <section>. It is full-bleed and
       tall, so on a desktop the cursor is almost always somewhere inside it once
       the section is scrolled into view — `hovering` stayed true and the
       autoplay never advanced. Pausing belongs to the carousel and its controls
       (see .fx__stage / .fx__ctrl below), which is what the visitor is actually
       engaging with. -->
  <section
    ref="sectionEl"
    class="fx hx-section"
    aria-labelledby="fx-title"
  >
    <!-- atmosphere: ivory wash · engineering grid · crossfading blurred render -->
    <div class="fx__wash" aria-hidden="true" />
    <div class="fx__grid" aria-hidden="true" />
    <div class="fx__bg" aria-hidden="true">
      <div ref="bgAEl" class="fx__bg-layer" />
      <div ref="bgBEl" class="fx__bg-layer" />
    </div>

    <div class="hx-container fx__inner">
      <!-- editorial header + controls -->
      <header class="fx__head">
        <div class="fx__headline">
        <div class="fx__intro">
          <p class="hx-eyebrow"><span class="hx-index">04</span> Flagship Products</p>
          <h2 id="fx-title" class="hx-title">
            Engineering intelligence <span class="lite">across every layer.</span>
          </h2>
          <p class="hx-lead">
            Six flagship AI systems — engineered to power enterprise transformation across
            perception, simulation, autonomy and operations.
          </p>
        </div>

        <div
          class="fx__ctrl"
          @pointerenter="onEnter"
          @pointerleave="onLeave"
          @focusin="onEnter"
          @focusout="onLeave"
        >
          <p class="fx__counter hx-mono">
            <span class="fx__counter-now">{{ String(active + 1).padStart(2, '0') }}</span>
            <span class="fx__counter-sep">/</span>
            <span class="fx__counter-total">{{ String(COUNT).padStart(2, '0') }}</span>
          </p>
          <div class="fx__arrows">
            <button
              ref="prevBtn"
              type="button"
              class="fx__arrow"
              :disabled="active === 0"
              aria-label="Previous product"
              @click="prev"
              @pointermove="magnet($event, prevBtn)"
              @pointerleave="demagnet(prevBtn)"
            >
              <svg width="17" height="12" viewBox="0 0 17 12" fill="none"><path d="M17 6H1M1 6l5-5M1 6l5 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </button>
            <button
              ref="nextBtn"
              type="button"
              class="fx__arrow"
              :disabled="active === COUNT - 1"
              aria-label="Next product"
              @click="next"
              @pointermove="magnet($event, nextBtn)"
              @pointerleave="demagnet(nextBtn)"
            >
              <svg width="17" height="12" viewBox="0 0 17 12" fill="none"><path d="M0 6h16M16 6l-5-5M16 6l-5 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </button>
          </div>
        </div>
        </div>

        <SectionFigure
          side
          name="products-stack"
          alt="A detailed breakdown of the six SVARA flagship products around a central AI OS. For each — Vision Intelligence, Autonomous Drones, Edge Intelligence, Generative Models, Intelligent Agents and Digital Twins — the diagram lists its purpose, its core capabilities, and a three-step account of how it works. The AI OS beneath connects them through a unified data fabric, model orchestration, security and governance, observability, and APIs and integrations. A footer traces the flow from data to intelligence to decisions to actions to outcomes."
          caption="How the six systems fit together on the AI OS."
          zoomable
        />
      </header>

      <!-- the cinematic slider -->
      <div
        ref="stageEl"
        class="fx__stage"
        :class="{ 'fx--moving': moving }"
        role="group"
        aria-roledescription="carousel"
        aria-label="Flagship products"
        tabindex="0"
        @pointerenter="onEnter"
        @pointerleave="onLeave"
        @focusin="onEnter"
        @focusout="onLeave"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="endDrag"
        @pointercancel="endDrag"
        @keydown="onKey"
      >
        <div ref="trackEl" class="fx__track" :style="trackVars">
          <article
            v-for="(f, i) in flagships"
            :key="f.key"
            class="fx__card"
            :class="{ 'is-active': i === active }"
            :aria-hidden="i === active ? undefined : 'true'"
          >
            <div class="fx__copy">
              <p class="fx__label hx-mono-label fx__reveal">
                <span class="fx__label-idx">{{ f.index }}</span>
                <span class="fx__label-sep">·</span>{{ f.category }}
              </p>
              <h3 class="fx__name fx__reveal">{{ f.name }}</h3>
              <p class="fx__desc fx__reveal">{{ f.copy }}</p>

              <div class="fx__caps fx__reveal">
                <p class="fx__caps-h hx-mono-label">Capabilities</p>
                <ul class="fx__caps-list">
                  <li v-for="s in f.specs" :key="s"><span class="fx__caps-dot" />{{ s }}</li>
                </ul>
              </div>

              <NuxtLink :to="f.to" class="hx-link fx__cta fx__reveal">
                Explore {{ f.name }}
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M0 5h14M14 5l-4-4M14 5l-4 4" stroke="currentColor" stroke-width="1.3" /></svg>
              </NuxtLink>
            </div>

            <div class="fx__visual">
              <div class="fx__visual-stage">
                <div class="fx__float">
                  <img
                    class="fx__img"
                    :src="`${IMG}/${f.img}.png`"
                    :alt="`${f.name} — SVARA product render`"
                    width="1254"
                    height="1254"
                    :loading="i === 0 ? 'eager' : 'lazy'"
                    decoding="async"
                    draggable="false"
                  >
                </div>
              </div>
              <span class="fx__badge hx-mono">
                <span class="fx__badge-dot" />{{ f.category }}
              </span>
            </div>
          </article>
        </div>
      </div>

      <!-- footer: autoplay progress + dot navigation -->
      <div class="fx__foot">
        <div class="fx__progress" aria-hidden="true">
          <span ref="autoBarEl" class="fx__progress-fill" />
        </div>
        <div class="fx__dots" role="tablist" aria-label="Select product">
          <button
            v-for="(f, i) in flagships"
            :key="f.key"
            type="button"
            class="fx__dot"
            :class="{ 'is-on': i === active }"
            role="tab"
            :aria-selected="i === active"
            :aria-label="f.name"
            @click="goTo(i)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fx {
  position: relative;
  overflow: hidden;                 /* clip the horizontal peek + blurred render */
  isolation: isolate;
}
.fx__inner { position: relative; z-index: 2; }

/* ---- atmosphere ---------------------------------------------------------- */
/* soft brighter-ivory wash (#FDFCF0) eased into the warm ground — no hard seam */
.fx__wash {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background: radial-gradient(120% 78% at 50% 26%, #fdfcf0 0%, rgba(253, 252, 240, 0.4) 46%, rgba(253, 252, 240, 0) 74%);
}
/* reused SVARA engineering grid — structure, not decoration */
.fx__grid {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(20, 34, 63, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(20, 34, 63, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  -webkit-mask-image: radial-gradient(130% 100% at 50% 34%, #000 52%, transparent 100%);
  mask-image: radial-gradient(130% 100% at 50% 34%, #000 52%, transparent 100%);
}
/* oversized blurred active illustration — two crossfading layers */
.fx__bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
.fx__bg-layer {
  position: absolute; inset: -22%;
  background-position: center; background-repeat: no-repeat; background-size: cover;
  filter: blur(72px) saturate(1.05);
  opacity: 0;
  will-change: opacity;
}

/* ---- header + controls --------------------------------------------------- */
.fx__head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.78fr);
  align-items: center;
  gap: clamp(28px, 4vw, 64px);
  margin-bottom: clamp(44px, 5vw, 76px);
}
/* left column — the copy, with the carousel controls beneath it */
.fx__headline { display: flex; flex-direction: column; align-items: flex-start; gap: clamp(22px, 3vw, 36px); }
.fx__intro { max-width: 62ch; }
.fx__intro .hx-title { max-width: 22ch; }

.fx__ctrl { display: flex; align-items: center; gap: 22px; }
.fx__counter { font-size: 13px; letter-spacing: 0.14em; color: var(--ink-muted); font-variant-numeric: tabular-nums; }
.fx__counter-now { color: var(--ink-primary); font-weight: 600; }
.fx__counter-sep { margin: 0 6px; opacity: 0.5; }

.fx__arrows { display: flex; gap: 12px; }
.fx__arrow {
  width: 52px; height: 52px; border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
  color: var(--ink-primary); cursor: pointer;
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid var(--sv-border-lavender);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 14px 30px -20px rgba(16, 42, 91, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: color var(--motion-fast) var(--ease-smooth),
    border-color var(--motion-fast) var(--ease-smooth),
    background var(--motion-fast) var(--ease-smooth),
    box-shadow var(--motion-medium) var(--ease-out);
}
.fx__arrow:hover:not(:disabled) {
  color: var(--sig);
  border-color: var(--sv-border-lavender-hover);
  box-shadow: 0 20px 40px -20px rgba(16, 42, 91, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.9);
}
.fx__arrow:focus-visible { outline: 2px solid var(--sig); outline-offset: 3px; }
.fx__arrow:disabled { opacity: 0.34; cursor: not-allowed; }

/* ---- slider -------------------------------------------------------------- */
.fx__stage {
  position: relative;
  overflow: hidden;
  padding-block: 34px;              /* room so card shadows/scale aren't clipped */
  margin-block: -34px;
  --fx-peek: clamp(48px, 7vw, 132px);
  --fx-gap: clamp(20px, 3vw, 44px);
}
.fx__stage:focus-visible { outline: none; }
.fx__stage.is-grabbing { cursor: grabbing; }
.fx__track {
  display: flex;
  gap: var(--fx-gap);
  align-items: stretch;
  will-change: transform;
  touch-action: pan-y;              /* let vertical scroll pass, we own horizontal */
  /* SSR / no-JS / pre-GSAP position — GSAP's inline transform overrides this rule */
  transform: translateX(var(--fx-x, 0px));
}

.fx__card {
  position: relative;
  flex: 0 0 calc(100% - var(--fx-peek));
  min-height: clamp(440px, 54vh, 640px);
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  align-items: center;
  gap: clamp(32px, 4vw, 72px);
  padding: clamp(34px, 4vw, 74px);
  /* white glass panel · subtle lavender structural border · 24px blur · rounded */
  background: linear-gradient(158deg, rgba(255, 255, 255, 0.74), rgba(255, 255, 255, 0.5));
  backdrop-filter: blur(24px) saturate(1.1);
  -webkit-backdrop-filter: blur(24px) saturate(1.1);
  border: 1px solid var(--sv-border-lavender);
  border-radius: var(--radius-glass);
  box-shadow:
    0 44px 96px -52px rgba(16, 42, 91, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.75);
  opacity: 0.4;
  transform: scale(0.95);
  transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out), filter 0.6s var(--ease-out);
}
.fx__card.is-active { opacity: 1; transform: none; }

/* transit motion-blur — reads as speed without touching the glass backdrop */
.fx--moving .fx__card.is-active .fx__img { filter: blur(2.2px); }
.fx--moving .fx__card.is-active .fx__copy { opacity: 0.82; }

/* ---- copy ---- */
.fx__copy { position: relative; z-index: 2; transition: opacity 0.4s var(--ease-smooth); }
.fx__label { display: inline-flex; align-items: center; gap: 8px; color: var(--hx-ink-3); }
.fx__label-idx { color: var(--sig); }
.fx__label-sep { opacity: 0.5; }
.fx__name {
  margin: 18px 0 0;
  font-size: clamp(38px, 4.4vw, 68px); font-weight: 600;
  letter-spacing: -0.03em; line-height: 0.98; color: var(--ink-primary);
  text-wrap: balance;
}
.fx__desc {
  margin: 22px 0 0; max-width: 44ch;
  font-size: clamp(16px, 1.2vw, 19px); line-height: 1.6;
  color: var(--ink-secondary); letter-spacing: -0.01em; text-wrap: pretty;
}
.fx__caps { margin: 30px 0 0; }
.fx__caps-h { color: var(--ink-muted); margin: 0 0 12px; }
.fx__caps-list { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 10px 24px; }
.fx__caps-list li {
  display: inline-flex; align-items: center; gap: 9px;
  font-family: var(--font-mono); font-size: 12.5px; letter-spacing: 0.02em; color: var(--ink-secondary);
}
.fx__caps-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--sig); }
.fx__cta { margin-top: 36px; }

/* ---- illustration ---- */
.fx__visual { position: relative; width: 100%; max-width: 560px; margin-inline: auto; }
.fx__visual-stage {
  position: relative; aspect-ratio: 1 / 1;
  transform: translate3d(calc(var(--px, 0) * 20px), calc(var(--py, 0) * 20px), 0);
  transition: transform 0.5s var(--ease-out);
}
.fx__visual-stage::before {                  /* soft light pooling under the render */
  content: ""; position: absolute; inset: -12%; z-index: 0; pointer-events: none;
  background: radial-gradient(closest-side, rgba(255, 255, 255, 0.9) 0%, rgba(253, 252, 240, 0.5) 52%, rgba(253, 252, 240, 0) 82%);
}
/* nested transform owners — parallax (stage) · float (wrap) · reveal scale (img) —
   so no two motion sources ever write the same element's transform */
.fx__float {
  position: relative; z-index: 1; width: 100%; height: 100%;
  animation: fx-float 7s var(--ease-smooth) infinite;
}
.fx__img {
  width: 100%; height: 100%; object-fit: contain; display: block;
  filter: drop-shadow(0 40px 60px rgba(16, 42, 91, 0.16));
  transition: filter var(--motion-medium) var(--ease-smooth);
}
.fx__badge {
  position: absolute; left: 6%; bottom: 4%; z-index: 3;
  display: inline-flex; align-items: center; gap: 7px;
  padding: 7px 13px; border-radius: var(--radius-pill);
  font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-primary);
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid var(--sv-border-subtle);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 12px 26px -16px rgba(16, 42, 91, 0.4);
}
.fx__badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--sig); box-shadow: 0 0 0 3px rgba(63, 111, 176, 0.16); }

@keyframes fx-float { 0%, 100% { transform: translateY(-6px); } 50% { transform: translateY(6px); } }

/* ---- footer: progress + dots -------------------------------------------- */
.fx__foot {
  display: flex; align-items: center; gap: 28px;
  margin-top: clamp(36px, 4vw, 56px);
}
.fx__progress { position: relative; flex: 1; height: 2px; border-radius: 2px; background: rgba(20, 34, 63, 0.1); overflow: hidden; }
.fx__progress-fill { position: absolute; inset: 0; transform: scaleX(0); transform-origin: left center; background: linear-gradient(90deg, var(--sig), var(--sig-soft)); }
.fx__dots { display: flex; align-items: center; gap: 10px; }
.fx__dot {
  width: 8px; height: 8px; border-radius: var(--radius-pill); cursor: pointer;
  background: rgba(20, 34, 63, 0.18); border: none; padding: 0;
  transition: width var(--motion-medium) var(--ease-out), background var(--motion-medium) var(--ease-out);
}
.fx__dot:hover { background: rgba(20, 34, 63, 0.36); }
.fx__dot.is-on { width: 26px; background: var(--sig); }
.fx__dot:focus-visible { outline: 2px solid var(--sig); outline-offset: 3px; }

/* ---- responsive ---------------------------------------------------------- */
@media (max-width: 1024px) {
  .fx__card { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(24px, 3vw, 44px); }
  .fx__visual { max-width: 440px; }
}
@media (max-width: 760px) {
  .fx__head { grid-template-columns: 1fr; align-items: flex-start; }
  .fx__ctrl { width: 100%; justify-content: space-between; }
  .fx__stage { --fx-peek: clamp(22px, 8vw, 46px); }
  .fx__card {
    grid-template-columns: 1fr;
    min-height: 0;
    gap: 6px;
    padding: clamp(26px, 6vw, 38px);
    text-align: left;
  }
  .fx__visual { order: -1; max-width: 340px; }
  .fx__name { font-size: clamp(32px, 8vw, 44px); }
  .fx__desc { margin-top: 16px; }
  .fx__caps { margin-top: 22px; }
  .fx__cta { margin-top: 26px; }
  .fx__foot { flex-direction: column-reverse; align-items: stretch; gap: 20px; }
  .fx__progress { width: 100%; }
  .fx__dots { justify-content: center; }
}
@media (max-width: 420px) {
  .fx__arrow { width: 46px; height: 46px; }
}

/* ---- reduced motion ------------------------------------------------------ */
@media (prefers-reduced-motion: reduce) {
  .fx__bg-layer { filter: blur(72px); }
  .fx__float { animation: none; }
  .fx__visual-stage { transform: none; transition: none; }
  .fx__card { transition: opacity 0.2s linear; transform: none; }
  .fx__card:not(.is-active) { transform: none; }
  .fx--moving .fx__card.is-active .fx__img { filter: drop-shadow(0 40px 60px rgba(16, 42, 91, 0.16)); }
}
</style>
