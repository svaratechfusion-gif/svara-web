<script setup lang="ts">
// Proving ground for docs/creative-direction.md's build order — now all nine
// scenes (Birth, Emergence, Intelligence, Data, SVARA, Products, Industries,
// Scale, Ending) are represented. Kept off index.vue until reviewed (per the
// approved build order in the creative direction doc).
useSeoMeta({ robots: "noindex, nofollow" });

const { globalProgress, activeProduct, activeIndustry } = useIntelligenceWorld();
</script>

<template>
  <div class="world-stage">
    <ClientOnly>
      <IntelligenceWorld />
    </ClientOnly>

    <div class="debug-readout" aria-hidden="true">
      globalProgress: {{ globalProgress.toFixed(3) }} · activeProduct: {{ activeProduct ?? "—" }} · activeIndustry:
      {{ activeIndustry ?? "—" }}
    </div>

    <SceneBirth />
    <SceneEmergence />
    <SceneIntelligence />
    <SceneData />
    <SceneSvara />
    <SceneProducts />
    <SceneIndustries />
    <SceneScale />
    <SceneEnding />
  </div>
</template>

<style scoped>
.world-stage {
  position: relative;
  background: #f9fafc;
}

.debug-readout {
  position: fixed;
  top: 96px;
  left: 24px;
  z-index: 10;
  font-family: monospace;
  font-size: 0.75rem;
  color: rgba(7, 17, 31, 0.55);
  pointer-events: none;
}
</style>
