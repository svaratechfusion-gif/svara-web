<script setup lang="ts">
// The extension-tile grid: 8px radius, a hairline border, a tight 8px gap, the name
// at 14px and its category beneath in muted 12px. The design uses this for dense
// inventories, which is exactly what thirty technologies across five layers is.
import RayIcon from './RayIcon.vue'
import { RAY_TILES } from '~~/lib/technology/raycast'
</script>

<template>
  <section class="ray-tiles" aria-label="Technologies in the stack">
    <div class="ray-wrap">
      <ul class="ray-tiles__grid">
        <li v-for="t in RAY_TILES" :key="`${t.n}-${t.name}`" class="ray-tile">
          <RayIcon :glyph="t.icon" :size="16" class="ray-tile__icon" />
          <span class="ray-tile__body">
            <span class="ray-tile__name">{{ t.name }}</span>
            <span class="ray-tile__cat">{{ t.category }}</span>
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>
