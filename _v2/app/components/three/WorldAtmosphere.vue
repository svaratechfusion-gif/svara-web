<script setup lang="ts">
// The FOG and NOISE layers of the visual language — the depth cues between
// the particle world and the UI. Every layer moves with its own inertia:
//
//   · Fog veils register with AtmosphereLayer at DIFFERENT parallax depths,
//     so they drift apart from each other and from everything else as the
//     visitor scrolls (update() is driven by the one scroll fan-out in
//     MotionDirector — no listeners of our own).
//   · The grain is TIME-based and ignores scroll entirely — film grain
//     belongs to the lens, not the world. Its independence is its inertia.
//
// All DOM, zero WebGL cost; sits above the canvas, below every scene
// section (by DOM order — no z-index war).
import { useMotionDirector } from "~~/lib/experience/MotionDirector";

const veilHighRef = ref<HTMLElement | null>(null);
const veilLowRef = ref<HTMLElement | null>(null);
const vignetteRef = ref<HTMLElement | null>(null);

onMounted(() => {
  const director = useMotionDirector();
  const detach: Array<() => void> = [];
  if (veilHighRef.value) detach.push(director.atmosphere.add(veilHighRef.value, { depth: 140, opacity: 0.5 }));
  if (veilLowRef.value) detach.push(director.atmosphere.add(veilLowRef.value, { depth: 55, opacity: 0.55 }));
  if (vignetteRef.value) detach.push(director.atmosphere.add(vignetteRef.value, { depth: 14, opacity: 0.4 }));

  onUnmounted(() => {
    for (const fn of detach) fn();
  });
});
</script>

<template>
  <div class="world-atmosphere" aria-hidden="true">
    <div ref="veilHighRef" class="world-atmosphere__veil world-atmosphere__veil--high" />
    <div ref="veilLowRef" class="world-atmosphere__veil world-atmosphere__veil--low" />
    <div ref="vignetteRef" class="world-atmosphere__vignette" />
    <div class="world-atmosphere__grain" />
  </div>
</template>

<style scoped>
.world-atmosphere {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.world-atmosphere__veil {
  position: absolute;
  /* Oversized so parallax drift never exposes an edge. */
  inset: -20% -5%;
}

/* High fog: a cool wash hanging over the upper world. */
.world-atmosphere__veil--high {
  background: radial-gradient(90% 55% at 50% 8%, rgba(137, 211, 255, 0.1), transparent 70%);
}

/* Low fog: the horizon the particle world stands in. */
.world-atmosphere__veil--low {
  background: linear-gradient(to top, rgba(93, 143, 190, 0.12), transparent 42%);
}

/* Vignette: the lens's own edge falloff — barely there, always there. */
.world-atmosphere__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(120% 90% at 50% 46%, transparent 62%, rgba(7, 17, 31, 0.07) 100%);
}

/* NOISE layer: film grain via SVG turbulence, re-seeded by jumping the tile
   in steps() — time-based, indifferent to scroll. Kept faint enough that it
   reads as texture, never as dirt. */
.world-atmosphere__grain {
  position: absolute;
  inset: -100px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E");
  background-size: 240px 240px;
  opacity: 0.032;
  animation: world-atmosphere-grain 0.9s steps(3) infinite;
}

@keyframes world-atmosphere-grain {
  0% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(-38px, 22px);
  }
  66% {
    transform: translate(24px, -30px);
  }
  100% {
    transform: translate(0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .world-atmosphere__grain {
    animation: none;
  }
}
</style>
