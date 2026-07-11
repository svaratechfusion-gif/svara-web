<script setup lang="ts">
// Thin wrapper: hero-specific telemetry data, rendered through the shared
// HudLayer component so the visual language matches every other HUD on
// the site.
const { inferenceLatencyMs, modelsDeployed, signalPulse } = useHeroTelemetry();

const metrics = computed(() => [
  { label: "INFERENCE LATENCY", value: `${inferenceLatencyMs.value}ms` },
  { label: "MODELS DEPLOYED", value: `${modelsDeployed.value}` },
  { label: "SIGNAL PULSE", value: `${signalPulse.value}%` },
]);
</script>

<template>
  <!--
    Parent renders this inside <ClientOnly> (see HeroSection.vue) — no
    ClientOnly needed inside this file itself, just documenting why it's
    safe to use interval-driven reactive values here without a hydration
    mismatch: this component's whole render is already client-only.
  -->
  <HudLayer :metrics="metrics" />
</template>
