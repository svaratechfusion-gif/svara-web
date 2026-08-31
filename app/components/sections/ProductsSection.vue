<script setup lang="ts">
// RADIAL PRODUCTS SECTION — enterprise ecosystem topology.
// All 10 products orbit the Intelligence Core on a mathematically
// balanced circle. Premium Apple Vision Pro glass cards with identical
// visual footprint. Blueprint-style connection lines. No floating.
// Hover only: glow + 1.02 scale + shadow increase.
//
// References: Apple ecosystem graphics, NVIDIA GTC, Stripe Sessions,
// Nothing.tech, enterprise architecture topology.
import { onBeforeUnmount, onMounted, ref } from 'vue'
import SectionLink from '~/components/ui/SectionLink.vue'

interface Product {
  id: string
  name: string
  category: string
  asset: string
  to: string
}

const PRODUCTS: Product[] = [
  // — Observe —
  { id: 'vision-ai', name: 'Vision AI', category: 'Observe', asset: '/images/ecosystem/vision-ai.png', to: '/products/vision-ai' },
  { id: 'drone-ai', name: 'Drone AI', category: 'Observe', asset: '/images/ecosystem/drone-ai.png', to: '/products/drone-ai' },
  { id: 'edge-ai', name: 'Edge AI', category: 'Observe', asset: '/images/ecosystem/edgeai.png', to: '/products/edge-ai' },
  // — Think —
  { id: 'generative-ai', name: 'Generative AI', category: 'Think', asset: '/images/ecosystem/generative-ai.png', to: '/products' },
  { id: 'ai-agents', name: 'AI Agents', category: 'Think', asset: '/images/ecosystem/ai-agents.png', to: '/products/ai-agents' },
  { id: 'one-ai-os', name: 'One AI OS', category: 'Think', asset: '/images/ecosystem/one-ai-os.png', to: '/products/ai-os' },
  { id: 'digital-twin', name: 'Digital Twin', category: 'Think', asset: '/images/ecosystem/digital-twin.png', to: '/products/digital-twin' },
  // — Act —
  { id: 'business-cloud', name: 'Business Cloud', category: 'Act', asset: '/images/ecosystem/business-cloud.png', to: '/products/business-cloud' },
  { id: 'digital-engineering', name: 'Digital Engineering', category: 'Act', asset: '/images/ecosystem/digital-engineering.png', to: '/products' },
  { id: 'growth-intelligence', name: 'Growth Intelligence', category: 'Act', asset: '/images/ecosystem/growth-intelligence.png', to: '/products' },
]

const N = PRODUCTS.length
const ORBIT_R = 33 // orbit radius as % of container width

// Every product sits on the same imaginary circle at mathematically
// balanced angles (36° apart), starting from 12 o'clock.
const positions = PRODUCTS.map((_, i) => {
  const a = (i / N) * 2 * Math.PI - Math.PI / 2
  return {
    x: 50 + ORBIT_R * Math.cos(a),
    y: 50 + ORBIT_R * Math.sin(a),
  }
})

// SVG connection lines from core center (50, 50) to each card position
const lines = PRODUCTS.map((p, i) => ({
  id: p.id,
  x2: positions[i].x,
  y2: positions[i].y,
}))

// Core word cycling
const coreWords = ['Observing', 'Understanding', 'Reasoning', 'Automating', 'Optimizing']
const coreWordIdx = ref(0)
let wordTimer: ReturnType<typeof setInterval> | null = null
let observer: IntersectionObserver | null = null
let running = false

function startCycle() {
  if (running) return
  running = true
  wordTimer = setInterval(() => {
    coreWordIdx.value = (coreWordIdx.value + 1) % coreWords.length
  }, 2600)
}

function stopCycle() {
  running = false
  if (wordTimer) clearInterval(wordTimer)
  wordTimer = null
}

const hoveredId = ref<string | null>(null)
const root = ref<HTMLElement>()

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) startCycle()
    else stopCycle()
  }, { threshold: 0.2 })
  if (root.value) observer.observe(root.value)
})

onBeforeUnmount(() => {
  stopCycle()
  observer?.disconnect()
})
</script>

<template>
  <section ref="root" class="products">
    <div class="products__head">
      <p v-reveal class="products__eyebrow">Products</p>
      <h2 v-reveal class="products__title" data-split>Ten platforms. One connected ecosystem.</h2>
    </div>

    <!-- Radial visualization: core + orbit ring + SVG lines + cards -->
    <div class="products__orbit">
      <!-- Structural grid background -->
      <div class="products__grid-bg" aria-hidden="true" />

      <!-- Faint orbit ring — the imaginary circle -->
      <div class="products__ring" aria-hidden="true" />

      <!-- SVG: extremely subtle blueprint connection lines -->
      <svg
        class="products__wires"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <line
          v-for="l in lines"
          :key="l.id"
          x1="50" y1="50"
          :x2.attr="l.x2" :y2.attr="l.y2"
          class="products__wire"
          :class="{ 'is-hot': hoveredId === l.id }"
        />
      </svg>

      <!-- Intelligence Core — 35% larger, primary anchor -->
      <div class="products__core">
        <span class="products__core-ring" aria-hidden="true" />
        <span class="products__core-ring products__core-ring--outer" aria-hidden="true" />
        <div class="products__core-inner">
          <span class="products__core-label">SVARA<br />Intelligence Core</span>
          <div class="products__core-wordwin">
            <Transition name="core-word">
              <span :key="coreWordIdx" class="products__core-word">{{ coreWords[coreWordIdx] }}</span>
            </Transition>
          </div>
        </div>
      </div>

      <!-- 10 glass cards, each on the orbit circle -->
      <NuxtLink
        v-for="(p, i) in PRODUCTS"
        :key="p.id"
        :to="p.to"
        class="product__card"
        :style="{
          left: positions[i].x + '%',
          top: positions[i].y + '%',
          transitionDelay: (i * 0.03) + 's',
        }"
        @mouseenter="hoveredId = p.id"
        @mouseleave="hoveredId = null"
        @focus="hoveredId = p.id"
        @blur="hoveredId = null"
      >
        <!-- Inner content frame — identical for every product -->
        <span class="product__card-frame">
          <img
            :src="p.asset"
            :alt="p.name"
            class="product__card-img"
            width="1254" height="1254"
            loading="lazy" decoding="async"
          />
        </span>
        <span class="product__card-meta">
          <span class="product__card-name">{{ p.name }}</span>
        </span>
      </NuxtLink>
    </div>

    <div v-reveal class="products__more">
      <SectionLink to="/products" label="Explore all products" />
    </div>
  </section>
</template>

<style scoped>
.products {
  padding-block: var(--section-y);
  overflow: hidden;
}

.products__head {
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-pad);
  text-align: center;
  box-sizing: border-box;
}

.products__eyebrow {
  margin: 0 0 var(--space-6);
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: var(--type-label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

.products__title {
  max-width: 22ch;
  margin: 0 auto;
  color: var(--color-text);
  font-size: clamp(34px, 4.4vw, 64px);
  font-weight: var(--weight-bold);
  line-height: 1.12;
  letter-spacing: -0.02em;
  text-wrap: balance;
}

/* ============================================================
   RADIAL ORBIT — the core container
   ============================================================ */
.products__orbit {
  position: relative;
  max-width: min(1020px, 94vw);
  margin: var(--space-10) auto 0;
  aspect-ratio: 1 / 1;
}

/* Enterprise grid background */
.products__grid-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image:
    linear-gradient(rgba(16, 42, 91, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(16, 42, 91, 0.035) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(circle at 50% 50%, #000 30%, transparent 72%);
  -webkit-mask-image: radial-gradient(circle at 50% 50%, #000 30%, transparent 72%);
  pointer-events: none;
}

/* Faint orbit ring — the imaginary circle cards sit on */
.products__ring {
  position: absolute;
  left: 17%;
  top: 17%;
  width: 66%;
  height: 66%;
  border-radius: 50%;
  border: 1px dashed rgba(16, 42, 91, 0.1);
  pointer-events: none;
  z-index: 1;
}

/* ============================================================
   SVG CONNECTION LINES — blueprint style
   ============================================================ */
.products__wires {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: visible;
}

.products__wire {
  fill: none;
  stroke: var(--color-ink-strong);
  stroke-width: 0.5;
  vector-effect: non-scaling-stroke;
  stroke-dasharray: 3 4;
  opacity: 0.1;
  transition: opacity 500ms var(--ease-smooth), stroke 500ms var(--ease-smooth);
}

.products__wire.is-hot {
  stroke: var(--color-accent);
  opacity: 0.45;
  stroke-dasharray: none;
}

/* ============================================================
   INTELLIGENCE CORE — 35% larger (152px → 205px)
   ============================================================ */
.products__core {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 5;
  width: 205px;
  height: 205px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--color-ink-strong);
  box-shadow:
    0 24px 70px rgba(16, 42, 91, 0.24),
    0 0 0 1px rgba(47, 127, 230, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  color: var(--color-inverse);
  text-align: center;
  transform: translate(-50%, -50%);
}

.products__core-ring {
  position: absolute;
  inset: -12px;
  border: 1px solid rgba(47, 127, 230, 0.35);
  border-radius: 50%;
  opacity: 0.5;
  animation: core-pulse-ring 2.6s ease-in-out infinite;
}

.products__core-ring--outer {
  inset: -26px;
  border-width: 0.5px;
  border-color: rgba(47, 127, 230, 0.12);
  opacity: 0.4;
  animation-duration: 3.8s;
  animation-direction: reverse;
}

@keyframes core-pulse-ring {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.1;
    transform: scale(1.08);
  }
}

.products__core-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: var(--space-6);
}

.products__core-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: var(--tracking-label);
  line-height: 1.5;
  opacity: 0.55;
  text-transform: uppercase;
}

.products__core-wordwin {
  position: relative;
  width: 140px;
  height: 22px;
  overflow: hidden;
}

.products__core-word {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cfe2fb;
  font-size: 18px;
  font-weight: var(--weight-semibold);
  letter-spacing: -0.01em;
}

.core-word-enter-active,
.core-word-leave-active {
  transition: transform 0.5s var(--ease-out);
}
.core-word-enter-from { transform: translateY(100%); }
.core-word-leave-to { transform: translateY(-100%); }

/* ============================================================
   PRODUCT CARDS — Apple Vision Pro glass, identical footprint
   ============================================================ */
.product__card {
  position: absolute;
  z-index: 3;
  width: 154px;
  aspect-ratio: 3 / 4;
  display: flex;
  flex-direction: column;
  border-radius: calc(var(--radius-glass) * 0.85);
  /* Glass surface — translucent white acrylic, Apple Vision Pro */
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(24px) saturate(1.3);
  -webkit-backdrop-filter: blur(24px) saturate(1.3);
  /* Soft white edge */
  border: 1px solid rgba(255, 255, 255, 0.55);
  /* Premium shadow with subtle blue ambient */
  box-shadow:
    0 3px 10px rgba(16, 42, 91, 0.04),
    0 16px 40px rgba(16, 42, 91, 0.06),
    0 0 0 0.5px rgba(47, 127, 230, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.85);
  overflow: hidden;
  text-decoration: none;
  color: var(--color-ink-strong);
  cursor: pointer;
  transform: translate(-50%, -50%);
  isolation: isolate;
  transition:
    transform 350ms var(--ease-out),
    box-shadow 350ms var(--ease-out);
}

/* Glass reflection overlay — diagonal sheen */
.product__card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    128deg,
    rgba(255, 255, 255, 0.55) 0%,
    rgba(255, 255, 255, 0.1) 30%,
    rgba(255, 255, 255, 0) 58%
  );
  opacity: 0.7;
  pointer-events: none;
  z-index: 1;
  transition: opacity 350ms var(--ease-smooth), transform 350ms var(--ease-smooth);
}

/* Subtle blue edge glow on hover */
.product__card::after {
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

/* Hover: soft glow, 1.02 scale, stronger shadow — NO floating */
.product__card:hover,
.product__card:focus-visible {
  transform: translate(-50%, -50%) scale(1.02);
  box-shadow:
    0 6px 18px rgba(16, 42, 91, 0.07),
    0 28px 60px rgba(16, 42, 91, 0.12),
    0 0 0 0.5px rgba(47, 127, 230, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.85);
}

.product__card:hover::before,
.product__card:focus-visible::before {
  opacity: 1;
  transform: translate3d(5%, -7%, 0);
}

.product__card:hover::after,
.product__card:focus-visible::after {
  border-color: rgba(47, 127, 230, 0.28);
  box-shadow: 0 0 20px rgba(47, 127, 230, 0.08);
}

.product__card:focus-visible {
  outline: none;
}

/* Inner content frame — identical for every product */
.product__card-frame {
  position: relative;
  z-index: 1;
  flex: 1;
  display: grid;
  place-items: center;
  padding: 16px 14px 6px;
  min-height: 0;
}

.product__card-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* Soft vignette edges so image bleeds into the glass seamlessly */
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, #000 52%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, #000 52%, transparent 100%);
  transition: transform 400ms var(--ease-smooth);
}

.product__card:hover .product__card-img,
.product__card:focus-visible .product__card-img {
  transform: scale(1.04);
}

/* Meta area at card bottom */
.product__card-meta {
  position: relative;
  z-index: 1;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 8px 14px;
}

.product__card-name {
  font-family: var(--font-mono);
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.05em;
  line-height: 1.25;
  text-transform: uppercase;
  color: var(--color-ink-strong);
  text-align: center;
}

/* CTA */
.products__more {
  display: flex;
  justify-content: center;
  margin-top: var(--space-12);
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 1024px) {
  .product__card {
    width: 130px;
  }

  .product__card-name {
    font-size: 9px;
  }

  .product__card-frame {
    padding: 12px 10px 4px;
  }

  .products__core {
    width: 170px;
    height: 170px;
  }

  .products__core-ring {
    inset: -10px;
  }

  .products__core-ring--outer {
    inset: -22px;
  }

  .products__core-wordwin {
    width: 114px;
    height: 19px;
  }

  .products__core-word {
    font-size: 15px;
  }
}

@media (max-width: 768px) {
  .products__orbit {
    aspect-ratio: auto;
    min-height: 640px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-6);
    padding-inline: var(--container-pad);
  }

  /* Collapse the radial layout into a simple vertical stack */
  .products__grid-bg,
  .products__ring,
  .products__wires {
    display: none;
  }

  .products__core {
    position: static;
    width: 140px;
    height: 140px;
    transform: none;
    margin-bottom: var(--space-4);
    flex-shrink: 0;
  }

  .products__core-ring { inset: -8px; }
  .products__core-ring--outer { display: none; }
  .products__core-wordwin { width: 100px; height: 17px; }
  .products__core-word { font-size: 13px; }
  .products__core-label { font-size: 8px; }

  .product__card {
    position: static;
    width: 100%;
    max-width: 340px;
    aspect-ratio: 4 / 3;
    transform: none;
    border-radius: var(--radius-lg);
  }

  .product__card:hover,
  .product__card:focus-visible {
    transform: scale(1.02);
  }

  .product__card-frame {
    padding: 14px 14px 4px;
  }

  .product__card-name {
    font-size: 10px;
  }

  .product__card-meta {
    padding: 4px 10px 12px;
  }
}

@media (max-width: 480px) {
  .products__core {
    width: 120px;
    height: 120px;
  }

  .products__core-wordwin {
    width: 84px;
    height: 15px;
  }

  .products__core-word {
    font-size: 11px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .products__wire,
  .product__card,
  .product__card::before,
  .product__card::after,
  .product__card-img {
    transition: none;
  }

  .product__card:hover,
  .product__card:focus-visible {
    transform: translate(-50%, -50%) scale(1.02);
  }

  @media (max-width: 768px) {
    .product__card:hover,
    .product__card:focus-visible {
      transform: scale(1.02);
    }
  }

  .products__core-ring {
    animation: none;
  }

  .core-word-enter-active,
  .core-word-leave-active {
    transition: none;
  }
}
</style>
