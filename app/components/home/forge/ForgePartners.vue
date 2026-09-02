<script setup lang="ts">
// PARTNER LOGO STRIP + DOTTED DIVIDERS.
//
// "Limestone background card, 40px radius, 40px padding. Logos in a single row,
// separated by vertical 1.5px Obsidian dotted dividers. No individual logo containers —
// flat inline treatment." The dotted rule, never dashed and never solid, is the
// reference's small consistent signature.
//
// The marks are SVARA's own divisions rather than third-party logos: this site has no
// partner marks it is entitled to display, and inventing them is exactly the kind of
// placeholder content that has no place on a live page.
const marks = ['Vision', 'Drone', 'Edge', 'Cognitive', 'Agents', 'Twin']
</script>

<template>
  <section class="fg fg-partners" aria-label="Across the SVARA stack">
    <div class="fg__wrap">
      <div class="fg-strip">
        <template v-for="(m, i) in marks" :key="m">
          <span class="fg-strip__mark">{{ m }}</span>
          <span v-if="i < marks.length - 1" class="fg-strip__div" aria-hidden="true" />
        </template>
      </div>
    </div>
  </section>
</template>
