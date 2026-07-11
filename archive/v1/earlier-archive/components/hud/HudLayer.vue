<script setup lang="ts">
// The reusable "HUD Layer" experience component — every page's telemetry
// panel (hero, and later the AI Command Center, etc.) renders through this
// same component with its own metrics data, so the visual language stays
// identical across the whole site regardless of what's actually being
// measured.
defineProps<{
  metrics: { label: string; value: string }[];
  position?: "top-right" | "top-left";
}>();
</script>

<template>
  <div
    class="absolute top-24 z-20 hidden flex-col gap-1 rounded-lg border border-white/20 bg-white/5 px-4 py-3 font-mono text-[11px] text-white backdrop-blur-sm sm:flex"
    :class="position === 'top-left' ? 'left-6' : 'right-6'"
  >
    <div v-for="metric in metrics" :key="metric.label" class="flex justify-between gap-6">
      <span class="opacity-60">{{ metric.label }}</span>
      <span :style="{ color: 'var(--color-electric-blue)' }">{{ metric.value }}</span>
    </div>
  </div>
</template>
