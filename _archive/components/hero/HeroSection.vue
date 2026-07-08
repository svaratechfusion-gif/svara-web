<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    headline?: string;
    description?: string;
  }>(),
  {
    headline: "Engineering The Intelligence Layer Of Tomorrow.",
    description: "AI-native enterprise infrastructure built for industries that never stop moving.",
  }
);

const PRODUCT_NODES = [
  { name: "Vision AI", x: 50, y: 17 },
  { name: "Drone AI", x: 18, y: 38 },
  { name: "Edge AI", x: 82, y: 38 },
  { name: "Digital Twin", x: 23, y: 66 },
  { name: "AI Agents", x: 76, y: 66 },
  { name: "Business Cloud", x: 50, y: 80 },
  { name: "Command Center", x: 38, y: 88 },
  { name: "Growth Tech", x: 62, y: 88 },
];

const HEADLINE_WORDS = ["Engineering", "The Intelligence", "Layer", "Of Tomorrow."];

const sectionRef = ref<HTMLElement | null>(null);
const scrollProgress = ref(0);
const activeProduct = ref<string | null>(null);
const selectedProduct = ref<string | null>(null);
let progressFrame = 0;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const x = clamp01((value - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
}

function updateScrollProgress() {
  progressFrame = 0;
  if (!sectionRef.value) return;
  const rect = sectionRef.value.getBoundingClientRect();
  const scrollable = Math.max(1, sectionRef.value.offsetHeight - window.innerHeight);
  scrollProgress.value = clamp01(-rect.top / scrollable);
}

function requestProgressUpdate() {
  if (progressFrame) return;
  progressFrame = window.requestAnimationFrame(updateScrollProgress);
}

function selectProduct(product: string) {
  selectedProduct.value = selectedProduct.value === product ? null : product;
  activeProduct.value = product;
}

function clearActiveProduct(product: string) {
  if (selectedProduct.value === product) return;
  activeProduct.value = null;
}

function wordStyle(index: number) {
  const progress = clamp01((copyProgress.value - index * 0.13) * 1.8);
  return {
    filter: `blur(${(1 - progress) * 9}px)`,
    opacity: `${progress}`,
    transform: `translateY(${(1 - progress) * 34}px)`,
  };
}

const copyProgress = computed(() => smoothstep(0.3, 0.52, scrollProgress.value));
const copyOpacity = computed(() => copyProgress.value * (1 - smoothstep(0.62, 0.76, scrollProgress.value)));
const systemProgress = computed(() => smoothstep(0.58, 0.88, scrollProgress.value));
const cueProgress = computed(() => (scrollProgress.value < 0.05 ? 1 : 0));
const stageStyle = computed<Record<string, string>>(() => ({
  "--copy-progress": copyProgress.value.toFixed(3),
  "--copy-opacity": copyOpacity.value.toFixed(3),
  "--system-progress": systemProgress.value.toFixed(3),
  "--cue-progress": cueProgress.value.toFixed(3),
}));

onMounted(() => {
  updateScrollProgress();
  window.addEventListener("scroll", requestProgressUpdate, { passive: true });
  window.addEventListener("resize", requestProgressUpdate);
});

onUnmounted(() => {
  window.removeEventListener("scroll", requestProgressUpdate);
  window.removeEventListener("resize", requestProgressUpdate);
  if (progressFrame) window.cancelAnimationFrame(progressFrame);
});
</script>

<template>
  <section ref="sectionRef" class="origin-section" aria-label="SVARA Origin: Birth of Intelligence">
    <div class="origin-stage" :style="stageStyle">
      <ClientOnly>
        <OriginField
          :scroll-progress="scrollProgress"
          :active-product="activeProduct"
          :selected-product="selectedProduct"
        />
      </ClientOnly>

      <div class="origin-copy">
        <h1 class="origin-headline" :aria-label="props.headline">
          <span
            v-for="(word, index) in HEADLINE_WORDS"
            :key="word"
            class="origin-headline__word"
            :style="wordStyle(index)"
          >
            {{ word }}
          </span>
        </h1>
        <p class="origin-subtitle">{{ props.description }}</p>
      </div>

      <div class="origin-system" :class="{ 'origin-system--selected': selectedProduct }">
        <button
          v-for="product in PRODUCT_NODES"
          :key="product.name"
          type="button"
          class="origin-product"
          :class="{
            'origin-product--active': activeProduct === product.name,
            'origin-product--selected': selectedProduct === product.name,
          }"
          :style="{ left: `${product.x}%`, top: `${product.y}%` }"
          @pointerenter="activeProduct = product.name"
          @pointerleave="clearActiveProduct(product.name)"
          @focus="activeProduct = product.name"
          @blur="clearActiveProduct(product.name)"
          @click="selectProduct(product.name)"
        >
          {{ product.name }}
        </button>

        <div class="origin-core-label" aria-hidden="true">SVARA CORE</div>
      </div>

      <p v-if="selectedProduct" class="origin-flight-note">Entering {{ selectedProduct }}</p>

      <div class="origin-scroll-cue" aria-hidden="true">
        <span>Scroll</span>
        <span class="origin-scroll-cue__line" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.origin-section {
  position: relative;
  min-height: 330svh;
  background: #ffffff;
}

.origin-stage {
  position: sticky;
  top: 0;
  height: 100svh;
  min-height: 720px;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 52%, rgba(93, 143, 190, 0.08), rgba(93, 143, 190, 0) 28%),
    #ffffff;
  color: var(--color-primary);
}

.origin-copy {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  opacity: var(--copy-opacity);
  text-align: center;
  transform: translateY(calc((1 - var(--copy-progress)) * 28px)) scale(calc(0.97 + var(--copy-progress) * 0.03));
}

.origin-headline {
  display: flex;
  max-width: 1050px;
  flex-direction: column;
  gap: 2px;
  font-size: clamp(3.25rem, 8.5vw, 7.5rem);
  font-weight: 700;
  letter-spacing: 0;
  line-height: 0.94;
}

.origin-headline__word {
  display: block;
  color: transparent;
  background:
    radial-gradient(circle, rgba(93, 143, 190, 0.95) 0 1.5px, transparent 1.8px) 0 0 / 9px 9px,
    linear-gradient(90deg, #08111f, #12263a);
  background-clip: text;
  -webkit-background-clip: text;
  will-change: filter, opacity, transform;
}

.origin-subtitle {
  margin-top: 24px;
  max-width: 650px;
  color: var(--color-muted);
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.55;
  opacity: calc(var(--copy-progress) * 0.92);
}

.origin-system {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 4;
  opacity: var(--system-progress);
  transform: scale(calc(0.94 + var(--system-progress) * 0.06));
}

.origin-product,
.origin-core-label {
  position: absolute;
  translate: -50% -50%;
  border: 0;
  background: transparent;
  color: rgba(8, 17, 31, 0.68);
  font: inherit;
  font-size: clamp(0.78rem, 1vw, 0.94rem);
  font-weight: 600;
  letter-spacing: 0;
  white-space: nowrap;
}

.origin-product {
  pointer-events: auto;
  cursor: pointer;
  opacity: calc(var(--system-progress) * 0.82);
  transition:
    color 240ms ease,
    opacity 240ms ease,
    transform 240ms ease;
}

.origin-product::before {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 8px;
  width: 8px;
  border-radius: 999px;
  background: var(--color-svara-blue);
  box-shadow: 0 0 22px rgba(93, 143, 190, 0.54);
  content: "";
  opacity: 0.56;
  transform: translate(-50%, calc(-50% - 24px));
  transition:
    opacity 240ms ease,
    transform 240ms ease,
    box-shadow 240ms ease;
}

.origin-product:hover,
.origin-product:focus-visible,
.origin-product--active,
.origin-product--selected {
  color: #07111f;
  opacity: 1;
  outline: none;
  transform: translateY(-2px);
}

.origin-product:hover::before,
.origin-product:focus-visible::before,
.origin-product--active::before,
.origin-product--selected::before {
  opacity: 1;
  box-shadow: 0 0 34px rgba(93, 143, 190, 0.86);
  transform: translate(-50%, calc(-50% - 28px)) scale(1.45);
}

.origin-system--selected .origin-product:not(.origin-product--selected) {
  opacity: calc(var(--system-progress) * 0.26);
}

.origin-core-label {
  top: 51%;
  left: 50%;
  padding: 6px 10px;
  color: #07111f;
  font-size: 0.78rem;
  opacity: calc(var(--system-progress) * 0.72);
}

.origin-flight-note {
  position: absolute;
  right: clamp(20px, 5vw, 72px);
  bottom: clamp(24px, 7vw, 76px);
  z-index: 5;
  color: rgba(8, 17, 31, 0.62);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0;
}

.origin-scroll-cue {
  position: absolute;
  bottom: 34px;
  left: 50%;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: rgba(8, 17, 31, 0.52);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  opacity: var(--cue-progress);
  text-transform: uppercase;
  transform: translateX(-50%);
  transition: opacity 400ms ease;
}

.origin-scroll-cue__line {
  display: block;
  height: 38px;
  width: 1px;
  background: linear-gradient(to bottom, rgba(93, 143, 190, 0.7), rgba(93, 143, 190, 0));
  transform-origin: top;
  animation: origin-cue 1.6s ease-in-out 5.4s infinite;
}

@keyframes origin-cue {
  0%,
  100% {
    transform: scaleY(0.45);
  }
  50% {
    transform: scaleY(1);
  }
}

@media (max-width: 768px) {
  .origin-stage {
    min-height: 620px;
  }

  .origin-headline {
    font-size: clamp(2.75rem, 16vw, 4.7rem);
  }

  .origin-product {
    font-size: 0.72rem;
  }

  .origin-product:nth-of-type(2),
  .origin-product:nth-of-type(4) {
    left: 20% !important;
  }

  .origin-product:nth-of-type(3),
  .origin-product:nth-of-type(5) {
    left: 80% !important;
  }

  .origin-product:nth-of-type(7),
  .origin-product:nth-of-type(8) {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .origin-section {
    min-height: 160svh;
  }

  .origin-scroll-cue__line {
    animation: none;
  }
}
</style>
