<script setup lang="ts">
// THE TECHNOLOGY PAGE BODY, in the Raycast component set.
//
// This is a rebuild, not a repaint. The previous pass only recoloured the existing
// sections, which left the page looking unchanged; these are the design's own
// components — the six-tile icon timeline, the key-shadowed card grids, the command
// window mockup, the dense tile inventory and the monospace meta strip.
//
// The copy is SVARA's, carried over verbatim from the sections this replaces.
// The hero above it is untouched.
import RayStatement from './RayStatement.vue'
import RayTimeline from './RayTimeline.vue'
import RayLayers from './RayLayers.vue'
import RayWindow from './RayWindow.vue'
import RayFeatures from './RayFeatures.vue'
import RayTiles from './RayTiles.vue'
import RayCta from './RayCta.vue'
</script>

<template>
  <div class="ray">
    <RayStatement />
    <RayTimeline />
    <RayLayers />
    <RayWindow />
    <RayFeatures />
    <RayTiles />
    <RayCta />
  </div>
</template>
