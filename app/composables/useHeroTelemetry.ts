// Decorative-only readouts for the hero's HUD overlay layer (per spec:
// inference latency, models deployed, signal pulse). These are fake/
// generated values with no backing system — purely atmospheric, not real
// telemetry. Must only ever be used inside <ClientOnly>: the interval ticks
// would cause an SSR/client hydration mismatch if rendered server-side.
export function useHeroTelemetry() {
  const inferenceLatencyMs = ref(12);
  const modelsDeployed = ref(37);
  const signalPulse = ref(92);

  let intervalId: ReturnType<typeof setInterval> | undefined;

  onMounted(() => {
    intervalId = setInterval(() => {
      inferenceLatencyMs.value = 9 + Math.round(Math.random() * 6);
      modelsDeployed.value = 35 + Math.round(Math.random() * 4);
      signalPulse.value = 88 + Math.round(Math.random() * 10);
    }, 1800);
  });

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId);
  });

  return { inferenceLatencyMs, modelsDeployed, signalPulse };
}
