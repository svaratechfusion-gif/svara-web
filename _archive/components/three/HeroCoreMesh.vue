<script setup lang="ts">
// Must live inside <TresCanvas> as a child component — useLoop() (and any
// other TresJS composable) relies on context provided by TresCanvas via
// Vue's provide/inject, so it throws if called from the same component that
// renders <TresCanvas> itself, before that context exists.
const rotation = ref(0);

const { onBeforeRender } = useLoop();
onBeforeRender(({ delta }) => {
  // Micro rotation only — decorative background presence, not a focal
  // interactive object competing with the hero's video/text.
  rotation.value += delta * 0.08;
});
</script>

<template>
  <TresMesh :rotation="[rotation * 0.6, rotation, 0]">
    <TresIcosahedronGeometry :args="[1.2, 1]" />
    <TresMeshPhysicalMaterial color="#1D2E6D" :metalness="0.3" :roughness="0.15" :clearcoat="1" />
  </TresMesh>
</template>
