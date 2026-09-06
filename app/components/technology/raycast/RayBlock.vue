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
import RayAtmosphere from './RayAtmosphere.vue'
import RayNav from './RayNav.vue'
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
    <!-- the cinematic band, with the product window floating on it -->
    <section class="ray-window-band" aria-label="The SVARA intelligence architecture">
      <RayAtmosphere>
        <div class="ray-wrap">
          <!-- the glass nav pill floats over the gradient, above the product shot —
               the reference's hero composition -->
          <RayNav />
          <RayWindow />
          <p class="ray-sr">
            A command interface listing the five SVARA intelligence layers — Perception,
            Intelligence, Cognition, Simulation and Autonomy — resolving layer by layer
            into enterprise and physical action.
          </p>
        </div>
      </RayAtmosphere>
    </section>
    <RayFeatures />
    <RayTiles />
    <!-- The travelling chrome figure, on a ground it can read against. -->
    <FigureBand />
    <RayCta />
  </div>
</template>
