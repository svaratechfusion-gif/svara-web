<script setup lang="ts">
// REBUILT ProblemSection — diamond-grid enterprise topology.
// 9 fragmented enterprise systems arranged on a precise 5×5
// engineering grid around the Intelligence Core. Every product
// shares horizontal and vertical alignment guides. Apple Vision
// Pro glass cards, blueprint connection lines, no floating.
import { computed, ref } from 'vue'
import { homeSection01 } from '~~/lib/content/home'
import SectionLink from '~/components/ui/SectionLink.vue'

interface Product {
  id: string
  name: string
  descriptor: string
  asset: string
  x: number  // center position % of container
  y: number  // center position % of container
}

// Diamond layout on a 5×5 virtual grid:
//   col: 0     1     2     3     4
//   row 0:                 ERP
//   row 1:        EDGE AI       CRM
//   row 2: DRONE AI        CORE       HRM
//   row 3:        CCTV              PLC
//   row 4:      CONVEYOR         SENSORS
//
// Column centers: 10 / 30 / 50 / 70 / 90 %
// Row centers:    10 / 30 / 50 / 70 / 90 %
const products: Product[] = [
  { id: 'erp', name: 'ERP', descriptor: 'Resource planning & finance core', asset: '/images/products/erp.png', x: 50, y: 10 },
  { id: 'edge-ai', name: 'Edge AI', descriptor: 'On-device inference at the edge', asset: '/images/products/edge-ai.png', x: 30, y: 30 },
  { id: 'crm', name: 'CRM', descriptor: 'Customer relationships & sales', asset: '/images/products/crm.png', x: 70, y: 30 },
  { id: 'drone', name: 'Drone AI', descriptor: 'Autonomous aerial inspection', asset: '/images/products/drone.png', x: 14, y: 50 },
  { id: 'hrm', name: 'HRM', descriptor: 'People, payroll & workforce', asset: '/images/products/hrm.png', x: 86, y: 50 },
  { id: 'cctv', name: 'CCTV', descriptor: 'Vision surveillance feeds', asset: '/images/products/cctv.png', x: 30, y: 70 },
  { id: 'plc', name: 'PLC', descriptor: 'Programmable machine control', asset: '/images/products/plc.png', x: 70, y: 70 },
  { id: 'conveyor', name: 'Conveyor', descriptor: 'Automated material handling', asset: '/images/products/conveyor.png', x: 30, y: 90 },
  { id: 'sensors', name: 'Sensors', descriptor: 'Real-time IoT telemetry', asset: '/images/products/sensors.png', x: 70, y: 90 },
]

// SVG connection lines from Core center (50, 50) to each product
const lines = products.map(p => ({ id: p.id, x2: p.x, y2: p.y }))

const hoveredId = ref<string | null>(null)
const selectedId = ref<string | null>(null)
const activeId = computed(() => hoveredId.value ?? selectedId.value)
const activeProduct = computed(() => products.find(p => p.id === activeId.value) ?? null)
</script>

<template>
  <section class="problem">
    <div class="problem__inner">
      <!-- Left: diamond-grid enterprise topology -->
      <div v-reveal class="problem__viz">
        <div class="problem__grid">
          <!-- Enterprise grid background -->
          <div class="problem__grid-bg" aria-hidden="true" />

          <!-- Blueprint connection lines -->
          <svg
            class="problem__wires"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <line
              v-for="l in lines"
              :key="l.id"
              x1="50" y1="50"
              :x2.attr="l.x2" :y2.attr="l.y2"
              class="problem__wire"
              :class="{ 'is-hot': activeId === l.id }"
            />
          </svg>

          <!-- Intelligence Core — 30% larger, exact geometric center -->
          <div class="problem__core">
            <span class="problem__core-ring" aria-hidden="true" />
            <span class="problem__core-ring problem__core-ring--outer" aria-hidden="true" />
            <div class="problem__core-lens">
              <span class="problem__core-mark">SVARA</span>
              <span class="problem__core-caption">INTELLIGENCE CORE</span>
            </div>
          </div>

          <!-- 9 glass cards on the diamond grid -->
          <button
            v-for="p in products"
            :key="p.id"
            type="button"
            class="problem__card"
            :class="{ 'is-active': activeId === p.id }"
            :style="{ left: p.x + '%', top: p.y + '%' }"
            @click="selectedId = selectedId === p.id ? null : p.id"
            @mouseenter="hoveredId = p.id"
            @mouseleave="hoveredId = null"
          >
            <span class="problem__card-frame">
              <img
                :src="p.asset"
                :alt="p.name"
                class="problem__card-img"
                width="1254" height="1254"
                loading="lazy" decoding="async"
              />
            </span>
            <span class="problem__card-label">{{ p.name }}</span>
          </button>
        </div>
      </div>

      <!-- Right: copy column (unchanged) -->
      <div class="problem__copy">
        <p v-reveal class="problem__eyebrow">The Problem</p>
        <h2 class="problem__title" data-split>{{ homeSection01.title }}</h2>
        <p v-reveal="{ delay: 0.08 }" class="problem__sub">{{ homeSection01.teaser }}</p>

        <div class="problem__focus" aria-live="polite">
          <Transition name="problem-focus" mode="out-in">
            <div v-if="activeProduct" :key="activeProduct.id" class="problem__focus-content">
              <span class="problem__focus-label">{{ activeProduct.name }}</span>
              <span class="problem__focus-copy">{{ activeProduct.descriptor }}</span>
            </div>
          </Transition>
        </div>

        <div v-reveal="{ delay: 0.13 }" class="problem__more"><SectionLink to="/ecosystem" /></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.problem {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 920px;
  background: var(--color-surface);
  border-block: 1px solid var(--color-border);
}

.problem__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.92fr);
  gap: clamp(56px, 7vw, 112px);
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding: clamp(112px, 11vw, 160px) var(--container-pad);
}

.problem__viz {
  width: 100%;
  min-width: 0;
  max-width: 720px;
  margin-inline: auto;
}

/* ============================================================
   DIAMOND GRID — the topology container
   ============================================================ */
.problem__grid {
  position: relative;
  aspect-ratio: 1 / 1;
  width: 100%;
  max-width: 720px;
  margin-inline: auto;
}

/* Enterprise engineering grid background */
.problem__grid-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: 44px;
  background-image:
    linear-gradient(rgba(16, 42, 91, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(16, 42, 91, 0.055) 1px, transparent 1px);
  background-size: 36px 36px;
  mask-image: radial-gradient(circle at 50% 50%, #000 12%, rgba(0, 0, 0, 0.82) 55%, transparent 100%);
  -webkit-mask-image: radial-gradient(circle at 50% 50%, #000 12%, rgba(0, 0, 0, 0.82) 55%, transparent 100%);
  pointer-events: none;
}

/* ============================================================
   SVG CONNECTION LINES — blueprint style
   ============================================================ */
.problem__wires {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: visible;
}

.problem__wire {
  fill: none;
  stroke: var(--color-ink-strong);
  stroke-width: 0.45;
  vector-effect: non-scaling-stroke;
  stroke-dasharray: 3 5;
  opacity: 0.09;
  transition: opacity 500ms var(--ease-smooth), stroke 500ms var(--ease-smooth);
}

.problem__wire.is-hot {
  stroke: var(--color-accent);
  opacity: 0.4;
  stroke-dasharray: none;
}

/* ============================================================
   INTELLIGENCE CORE — 30% larger, geometric center
   ============================================================ */
.problem__core {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 5;
  width: 174px;
  height: 174px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at 34% 28%, rgba(255, 255, 255, 0.12), transparent 36%),
              radial-gradient(circle at 50% 55%, #244d8d 0%, #102a5b 73%);
  box-shadow:
    0 24px 70px rgba(16, 42, 91, 0.26),
    0 0 0 1px rgba(47, 127, 230, 0.12),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
  color: #ffffff;
  text-align: center;
  transform: translate(-50%, -50%);
}

.problem__core-ring {
  position: absolute;
  inset: -10px;
  border: 1px solid rgba(47, 127, 230, 0.25);
  border-radius: 50%;
  opacity: 0.45;
  animation: core-pulse 2.8s ease-in-out infinite;
}

.problem__core-ring--outer {
  inset: -24px;
  border-width: 0.5px;
  border-style: dashed;
  border-color: rgba(47, 127, 230, 0.1);
  opacity: 0.3;
  animation-duration: 4.2s;
  animation-direction: reverse;
}

@keyframes core-pulse {
  0%, 100% { opacity: 0.45; transform: scale(1); }
  50% { opacity: 0.08; transform: scale(1.06); }
}

.problem__core-lens {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: var(--space-5);
}

.problem__core-mark {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
}

.problem__core-caption {
  font-family: var(--font-mono);
  font-size: 6.5px;
  font-weight: 600;
  letter-spacing: 0.14em;
  opacity: 0.7;
  text-transform: uppercase;
}

/* ============================================================
   PRODUCT CARDS — premium glass, identical footprint
   ============================================================ */
.problem__card {
  position: absolute;
  z-index: 3;
  width: 134px;
  aspect-ratio: 3 / 4;
  display: flex;
  flex-direction: column;
  border-radius: calc(var(--radius-glass) * 0.8);
  border: 1px solid rgba(255, 255, 255, 0.55);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(22px) saturate(1.25);
  -webkit-backdrop-filter: blur(22px) saturate(1.25);
  box-shadow:
    0 2px 8px rgba(16, 42, 91, 0.035),
    0 16px 38px rgba(16, 42, 91, 0.05),
    0 0 0 0.5px rgba(47, 127, 230, 0.035),
    inset 0 1px 0 rgba(255, 255, 255, 0.85);
  overflow: hidden;
  transform: translate(-50%, -50%);
  cursor: pointer;
  isolation: isolate;
  transition:
    transform 350ms var(--ease-out),
    box-shadow 350ms var(--ease-out);
}

/* Glass reflection sheen */
.problem__card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    128deg,
    rgba(255, 255, 255, 0.52) 0%,
    rgba(255, 255, 255, 0.08) 28%,
    rgba(255, 255, 255, 0) 56%
  );
  opacity: 0.7;
  pointer-events: none;
  z-index: 1;
  transition: opacity 350ms var(--ease-smooth), transform 350ms var(--ease-smooth);
}

/* Blue accent edge glow */
.problem__card::after {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  border: 1.5px solid rgba(47, 127, 230, 0);
  box-shadow: 0 0 0 rgba(47, 127, 230, 0);
  pointer-events: none;
  z-index: 2;
  transition:
    border-color 450ms var(--ease-smooth),
    box-shadow 450ms var(--ease-smooth);
}

/* Hover: scale 1.02, stronger shadow, blue glow — no floating */
.problem__card:hover,
.problem__card:focus-visible,
.problem__card.is-active {
  transform: translate(-50%, -50%) scale(1.02);
  box-shadow:
    0 5px 16px rgba(16, 42, 91, 0.06),
    0 26px 56px rgba(16, 42, 91, 0.12),
    0 0 0 0.5px rgba(47, 127, 230, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.85);
}

.problem__card:hover::before,
.problem__card:focus-visible::before,
.problem__card.is-active::before {
  opacity: 1;
  transform: translate3d(5%, -7%, 0);
}

.problem__card:hover::after,
.problem__card:focus-visible::after,
.problem__card.is-active::after {
  border-color: rgba(47, 127, 230, 0.3);
  box-shadow: 0 0 20px rgba(47, 127, 230, 0.08);
}

.problem__card:focus-visible {
  outline: none;
}

/* Inner content frame — normalizes visual size */
.problem__card-frame {
  position: relative;
  z-index: 1;
  flex: 1;
  display: grid;
  place-items: center;
  padding: 14px 12px 4px;
  min-height: 0;
}

.problem__card-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, #000 50%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, #000 50%, transparent 100%);
  transition: transform 400ms var(--ease-smooth);
}

.problem__card:hover .problem__card-img,
.problem__card.is-active .problem__card-img {
  transform: scale(1.04);
}

/* Product name label */
.problem__card-label {
  position: relative;
  z-index: 1;
  flex: 0 0 auto;
  padding: 4px 8px 12px;
  font-family: var(--font-mono);
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1.25;
  text-transform: uppercase;
  color: var(--color-ink-strong);
  text-align: center;
}

/* ============================================================
   RIGHT COPY COLUMN (unchanged from original)
   ============================================================ */
.problem__copy {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 580px;
}

.problem__eyebrow {
  margin: 0 0 var(--space-6);
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: var(--type-label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

.problem__title {
  margin: 0 0 var(--space-6);
  color: var(--color-text);
  font-size: clamp(38px, 4.4vw, 64px);
  font-weight: var(--weight-bold);
  line-height: 1.12;
  letter-spacing: 0;
  text-wrap: balance;
}

.problem__sub {
  max-width: var(--paragraph-max);
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--type-body);
  line-height: var(--leading-body);
}

.problem__focus {
  min-height: 48px;
  margin-top: var(--space-8);
}

.problem__focus-content {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-height: 46px;
  padding-left: var(--space-4);
  border-left: 2px solid var(--color-accent);
}

.problem__focus-label {
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: var(--type-caption);
  font-weight: var(--weight-semibold);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.problem__focus-copy {
  color: var(--color-text-secondary);
  font-size: var(--type-small);
  line-height: 1.45;
}

.problem__more { margin-top: var(--space-8); }

.problem-focus-enter-active,
.problem-focus-leave-active {
  transition: opacity 360ms var(--ease-out), transform 360ms var(--ease-out);
}

.problem-focus-enter-from,
.problem-focus-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 1120px) {
  .problem {
    min-height: 0;
  }

  .problem__inner {
    grid-template-columns: 1fr;
    gap: var(--space-16);
    padding-block: var(--section-y);
  }

  .problem__viz,
  .problem__copy {
    max-width: 720px;
  }

  .problem__grid {
    max-width: 540px;
  }

  .problem__card {
    width: 110px;
  }

  .problem__core {
    width: 150px;
    height: 150px;
  }

  .problem__core-ring { inset: -8px; }
  .problem__core-ring--outer { inset: -20px; }
  .problem__grid-bg { background-size: 28px 28px; }
}

@media (max-width: 720px) {
  .problem__inner {
    gap: var(--space-12);
  }

  .problem__title {
    font-size: clamp(34px, 10vw, 48px);
  }

  .problem__focus {
    min-height: 44px;
    margin-top: var(--space-6);
  }

  /* Collapse diamond into vertical stack */
  .problem__grid {
    aspect-ratio: auto;
    min-height: 520px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-8) 0;
  }

  .problem__grid-bg,
  .problem__wires {
    display: none;
  }

  .problem__core {
    position: static;
    width: 120px;
    height: 120px;
    transform: none;
    flex-shrink: 0;
    margin-bottom: var(--space-3);
  }

  .problem__core-ring--outer { display: none; }
  .problem__core-mark { font-size: 10px; }
  .problem__core-caption { font-size: 5.5px; }

  .problem__card {
    position: static;
    width: 100%;
    max-width: 280px;
    aspect-ratio: 4 / 3;
    transform: none;
    border-radius: var(--radius-lg);
  }

  .problem__card:hover,
  .problem__card:focus-visible,
  .problem__card.is-active {
    transform: scale(1.02);
  }

  .problem__card-frame {
    padding: 12px 10px 3px;
  }

  .problem__card-label {
    font-size: 8px;
    padding: 3px 6px 10px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .problem__wire,
  .problem__card,
  .problem__card::before,
  .problem__card::after,
  .problem__card-img {
    transition: none;
  }

  .problem__card:hover,
  .problem__card:focus-visible,
  .problem__card.is-active {
    transform: translate(-50%, -50%) scale(1.02);
  }

  @media (max-width: 720px) {
    .problem__card:hover,
    .problem__card:focus-visible,
    .problem__card.is-active {
      transform: scale(1.02);
    }
  }

  .problem__core-ring {
    animation: none;
  }

  .problem-focus-enter-active,
  .problem-focus-leave-active {
    transition: none;
  }
}
</style>
