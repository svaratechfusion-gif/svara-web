<script setup lang="ts">
/**
 * ONE PRODUCT'S HUD DASHBOARD, for the Explore overlays.
 *
 * The ten dashboards used to pin on /products as a 1950vh film. When that film
 * was replaced by the Stride card stack they were left mounted nowhere, despite
 * a note claiming each was "one click away through the Explore overlays".
 *
 * THIS MOUNTS THEM THE WAY THE SITE ALREADY MOUNTS THEM. `HUDWindow` is not a
 * component that fits its content — it is a fixed-format instrument window, and
 * both existing mounts hand it an explicit minimum height:
 * KnowledgeProductLayout uses `clamp(620px, 50vw, 720px)`, ProductWorld gives it
 * a sized stage. Without that the window collapses toward its content, the
 * viewport inside it comes out short, and every system — whose internals are
 * laid out for a ~620-720px window — renders compressed. That is what made
 * these look broken in the overlay, and the fix is simply to honour the same
 * contract rather than to fight the symptoms.
 *
 * IT SLOWS THE SIMULATION, via `provide(SIM_CALM)` — opt-in, so nothing outside
 * an Explore overlay is affected.
 *
 * NOTHING SHARED IS RESTYLED. No overrides on HUDWindow's or the systems'
 * animations, no changes to the simulation engine they all run on. A dashboard
 * here behaves exactly as it does on /products/<slug>, which is the point: this
 * is the same component in a different frame, not a variant of it.
 */
import { computed, provide } from 'vue'
import { SVARA_OS, formatKpi } from '~/utils/svara-os'
import { SIM_CALM } from '~/composables/useSystemSim'
import HUDWindow from '~/components/products/worlds/HUDWindow.vue'
import WorldViz from '~/components/products/worlds/WorldViz.vue'

const props = defineProps<{ id: string }>()

// Slow every simulation inside this dashboard. Seen full-width and up close,
// the film-stage churn reads as a glitch; see SIM_CALM for why the clock is
// slowed rather than the frame rate raised.
provide(SIM_CALM, true)

const product = computed(() => SVARA_OS.find(p => p.id === props.id) ?? null)
const metrics = computed(() =>
  (product.value?.kpis ?? []).slice(0, 4).map(k => ({ label: k.label, value: formatKpi(k) })),
)
</script>

<template>
  <section v-if="product" class="pdash" :aria-label="`${product.short} system dashboard`">
    <p class="pdash__label">
      <span class="pdash__dot" aria-hidden="true" />Live system · {{ product.short }}
    </p>

    <HUDWindow
      :title="product.name"
      :system-id="product.n"
      :code="product.code"
      :status="product.status"
      :metrics="metrics"
      :kind="product.id"
    >
      <WorldViz :kind="product.id" />
    </HUDWindow>
  </section>
</template>

<style scoped>
/* Its own section, after the hero — so the overlay's intro keeps its own height
   and rhythm and nothing above it moves. */
.pdash { display: block; width: 100%; min-width: 0; padding: 8px 0 64px; }

.pdash__label {
  display: flex; align-items: center; gap: 8px;
  margin: 0 0 18px;
  font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
  color: rgb(255 255 255 / 0.5);
}
.pdash__dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; flex: none; }

/* THE CONTRACT. Same figure KnowledgeProductLayout uses; the systems inside are
   drawn for a window of roughly this height and misrender when given less. */
.pdash :deep(.hudw) { min-height: clamp(620px, 50vw, 720px); }
@media (max-width: 900px) { .pdash :deep(.hudw) { min-height: 680px; } }
</style>
