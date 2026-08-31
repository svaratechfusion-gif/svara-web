<script setup lang="ts">
// ATMOSPHERE — the air the dashboards hang in. Everything here lives BEHIND the
// dashboards and stays subtle enough that you notice the room, not the effect
// (§21). No WebGL: the site already runs Three.js scenes elsewhere and standing
// up another renderer for a haze would cost a context and a render loop for
// something four gradients do better.
//
// Three layers, back to front:
//   1. ground   — the white → #F7F9FC wash that very slowly cools as the film runs
//   2. haze     — two soft light fields that parallax the cursor for depth
//   3. motes    — a sparse drift of dust, CSS-only
//   4. grain    — monochrome film grain over the lot, BELOW the UI (z-5)
//
// The grain is static by design: it is a filmic texture, not motion. It boils
// enough visually from the scene moving underneath it.
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useSceneProgress, smooth } from '~/composables/useSceneProgress'

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")"

const ground = ref<HTMLElement | null>(null)
const hazeA = ref<HTMLElement | null>(null)
const hazeB = ref<HTMLElement | null>(null)
const grid = ref<HTMLElement | null>(null)

const pointer = { x: 0, y: 0 }
let fine = false

useSceneProgress((p) => {
  // The ground cools almost imperceptibly across the film: pure white at the
  // opening, the secondary #F7F9FC by the ecosystem, back toward white at the end.
  const cool = smooth(Math.min(1, p / 0.82)) * (1 - smooth(Math.max(0, (p - 0.86) / 0.14)))
  if (ground.value) ground.value.style.opacity = (cool * 0.9).toFixed(3)
  if (grid.value) grid.value.style.opacity = (0.5 + cool * 0.5).toFixed(3)
  apply()
})

function apply(): void {
  if (!fine) return
  const a = hazeA.value
  const b = hazeB.value
  if (a) a.style.transform = `translate3d(${(pointer.x * 34).toFixed(1)}px, ${(pointer.y * 26).toFixed(1)}px, 0)`
  // Opposite phase, further — the two fields read as different depths.
  if (b) b.style.transform = `translate3d(${(-pointer.x * 52).toFixed(1)}px, ${(-pointer.y * 40).toFixed(1)}px, 0)`
}

function onMove(e: PointerEvent): void {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1
  pointer.y = (e.clientY / window.innerHeight) * 2 - 1
  apply()
}

onMounted(() => {
  fine = window.matchMedia('(pointer: fine)').matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (fine) window.addEventListener('pointermove', onMove, { passive: true })
})
onBeforeUnmount(() => {
  if (fine) window.removeEventListener('pointermove', onMove)
})

/** Deterministic scatter — no Math.random, so the server and client agree. */
function moteStyle(i: number): Record<string, string> {
  return {
    left: `${(i * 37) % 100}%`,
    top: `${(i * 61) % 100}%`,
    animationDuration: `${26 + ((i * 13) % 22)}s`,
    animationDelay: `${-(i * 3.1).toFixed(1)}s`,
    opacity: String(0.1 + ((i * 7) % 5) / 22),
  }
}
</script>

<template>
  <div class="sa" aria-hidden="true">
    <div ref="ground" class="sa__ground" />
    <div ref="grid" class="sa__grid" />
    <div ref="hazeA" class="sa__haze sa__haze--a" />
    <div ref="hazeB" class="sa__haze sa__haze--b" />
    <div class="sa__motes">
      <span v-for="i in 14" :key="i" class="sa__mote" :style="moteStyle(i)" />
    </div>
    <div class="sa__grain" :style="{ backgroundImage: NOISE }" />
  </div>
</template>

<style scoped>
.sa { position: absolute; inset: 0; pointer-events: none; }

.sa__ground {
  position: absolute;
  inset: 0;
  opacity: 0;
  background: linear-gradient(180deg, #FFFFFF 0%, var(--ps-ground) 58%, #FFFFFF 100%);
}

/* A faint engineering grid — structure under the air, never a pattern you read. */
.sa__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(20, 34, 63, 0.028) 1px, transparent 1px),
    linear-gradient(90deg, rgba(20, 34, 63, 0.028) 1px, transparent 1px);
  background-size: 92px 92px;
  mask-image: radial-gradient(120% 90% at 50% 45%, #000 20%, transparent 78%);
  -webkit-mask-image: radial-gradient(120% 90% at 50% 45%, #000 20%, transparent 78%);
}

.sa__haze { position: absolute; inset: -18%; will-change: transform; }
.sa__haze--a {
  background: radial-gradient(46% 40% at 26% 30%, rgba(47, 127, 230, 0.09), transparent 68%);
}
.sa__haze--b {
  background: radial-gradient(52% 44% at 76% 72%, rgba(16, 42, 91, 0.075), transparent 66%);
}

.sa__motes { position: absolute; inset: 0; overflow: hidden; }
.sa__mote {
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 999px;
  background: rgba(20, 34, 63, 0.5);
  animation: sa-drift linear infinite;
}

@keyframes sa-drift {
  0% { transform: translate3d(0, 12vh, 0); }
  100% { transform: translate3d(3vw, -14vh, 0); }
}

/* Film grain: over the atmosphere, below the dashboards and UI. */
.sa__grain {
  position: absolute;
  inset: 0;
  z-index: 5;
  background-size: 160px 160px;
  mix-blend-mode: multiply;
  opacity: 0.035;
}

@media (prefers-reduced-motion: reduce) {
  .sa__mote { animation: none; }
}
</style>
