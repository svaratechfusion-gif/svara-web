<script setup lang="ts">
// Glass as a thin FRAME around arbitrary content — border + reflection ring
// with no fill, for framing diagrams or media without tinting them.
</script>

<template>
  <div class="glass-frame">
    <slot />
  </div>
</template>

<style scoped>
.glass-frame {
  position: relative;
  border: var(--glass-border);
  border-radius: var(--glass-radius);
  box-shadow: var(--glass-shadow);
  overflow: hidden;
}
.glass-frame::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--glass-reflection);
  opacity: 0.5;
  pointer-events: none;
}
.glass-frame > :deep(*) { display: block; }
</style>
