<script setup lang="ts">
// SceneSnap — intentional scroll settling for architectural scenes.
// Wires Lenis Snap to [data-scene] sections so the scroll settles cleanly
// at scene boundaries instead of stopping mid-transition.
// This is scroll behavior, not animation logic.
// Only active when reduced motion is off and viewport is tall enough.

import Snap from "lenis/snap";
import { useLenis } from "lenis/vue";

const props = defineProps<{
  /** Selector for scene elements. */
  selector?: string;
  /** Snap behavior: proximity = only snap when close. */
  type?: "proximity" | "mandatory" | "lock";
  /** Snap animation duration in seconds. */
  duration?: number;
}>();

const selector = props.selector ?? "[data-scene]";
const type = props.type ?? "proximity";
const duration = props.duration ?? 0.8;

let snap: Snap | null = null;
let unsubs: (() => void)[] = [];

const reducedMotion = import.meta.client
  ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
  : false;

function init() {
  if (!import.meta.client || reducedMotion) return;

  const lenis = useLenis?.();
  if (!lenis?.value) return;

  const scenes = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (scenes.length < 2) return;

  snap = new Snap(lenis.value, {
    type,
    duration,
    easing: (t: number) => 1 - Math.pow(1 - t, 4), // smooth deceleration
  });

  // Snap to the top of each scene.
  scenes.forEach((scene) => {
    const remove = snap!.addElement(scene, { align: ["start", "start"] });
    unsubs.push(remove);
  });
}

function destroy() {
  unsubs.forEach((fn) => fn());
  unsubs = [];
  snap?.destroy();
  snap = null;
}

onMounted(() => {
  // Delay init until DOM and Lenis are fully ready.
  nextTick(() => setTimeout(init, 100));
});

onUnmounted(() => {
  destroy();
});
</script>

<template>
  <!-- Renderless component. -->
</template>
