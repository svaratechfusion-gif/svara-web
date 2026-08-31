<script setup lang="ts">
// EVOLVE HERO — Scene 01 of the master experience. DOM-only now: the blueprint
// grid + the display headline + stats + lead line, sitting TRANSPARENT over the
// persistent fixed WebGL canvas (EvolveCanvasLayer, behind). The boot loader,
// milestones and the canvas itself are owned by the experience (index.vue); this
// component only reveals its content once `active` flips true.
import EvolveGrid from '~/components/home/evolve/EvolveGrid.vue'
import EvolveHeadline from '~/components/home/evolve/EvolveHeadline.vue'
import EvolveStats from '~/components/home/evolve/EvolveStats.vue'

defineProps<{ active: boolean }>()
</script>

<template>
  <section class="evolve-root" :class="{ 'is-in': active }">
    <EvolveGrid :active="active" />
    <div class="ev__scrim" aria-hidden="true" />

    <EvolveHeadline :active="active" />
    <EvolveStats :active="active" />
    <p class="ev__lead" :class="{ 'is-in': active }">From foundation models to production-ready infrastructure.</p>
  </section>
</template>

<style scoped>
/* Transparent — the fixed WebGL canvas shows through from behind. */
.evolve-root { position: relative; height: 100dvh; overflow: hidden; background: transparent; color: #fff; font-family: var(--font-display); }

.ev__lead { position: absolute; bottom: 2.5rem; left: 2.5rem; width: 14.5625rem; margin: 0; z-index: 5; font-family: var(--font-mono); font-size: 1.125rem; line-height: 1.2; letter-spacing: -0.03em; color: var(--foreground); opacity: 0; transform: translateY(0.75rem); filter: blur(6px); transition: opacity 1000ms var(--ease) 2000ms, transform 1000ms var(--ease) 2000ms, filter 1000ms var(--ease) 2000ms; }
.ev__lead.is-in { opacity: 1; transform: none; filter: blur(0); }
@media (max-width: 1279px) { .ev__lead { font-size: clamp(14px, 1.25vw, 16px); } }

.ev__scrim { display: none; }

@media (max-width: 767px) {
  .evolve-root { display: flex; flex-direction: column; padding: 5.5rem 1rem 1rem; }
  .ev__scrim { display: block; position: absolute; inset: 0; z-index: 2; pointer-events: none; background: linear-gradient(180deg, rgb(0 0 0 / 0.78) 0%, transparent 34%, transparent 58%, rgb(0 0 0 / 0.55) 78%, rgb(0 0 0 / 0.78) 100%); }
  .ev__lead { position: static; width: auto; margin-top: auto; z-index: 5; }
  .evolve-root :deep(.eh) { position: relative; z-index: 5; margin-top: 1rem; }
  .evolve-root :deep(.est) { position: relative; z-index: 5; margin-top: 1.5rem; }
}
@media (prefers-reduced-motion: reduce) { .ev__lead { transition: none; opacity: 1; transform: none; filter: none; } }
</style>
