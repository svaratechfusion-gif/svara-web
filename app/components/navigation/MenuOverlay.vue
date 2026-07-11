<script setup lang="ts">
// The navigation panel. Anchored to the bottom-right Menu dock, it expands
// UPWARD from the Menu button (transform-origin bottom) — never downward.
// A transparent catcher closes it on outside click; Escape closes it too.
import { watch, onBeforeUnmount } from 'vue'
import DesktopMenu from './DesktopMenu.vue'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}
watch(() => props.open, (open) => {
  if (typeof document === 'undefined') return
  if (open) document.addEventListener('keydown', onKey)
  else document.removeEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  if (typeof document === 'undefined') return
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <!-- outside-click catcher (transparent; keeps the Menu feeling like a control) -->
  <button
    v-show="open"
    class="menu-catcher"
    tabindex="-1"
    aria-hidden="true"
    @click="$emit('close')"
  />

  <div
    id="menu-overlay"
    class="menu-panel"
    :class="{ 'menu-panel--open': open }"
    role="dialog"
    aria-label="Site menu"
    :aria-hidden="!open"
    :inert="!open"
  >
    <DesktopMenu @navigate="$emit('close')" />
  </div>
</template>

<style scoped>
/* transparent full-viewport catcher so an outside click closes the panel */
.menu-catcher {
  position: fixed;
  inset: 0;
  z-index: 98;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: default;
}

/* the panel floats just above the Menu button and grows upward */
.menu-panel {
  position: absolute;
  right: 0;
  bottom: calc(44px + var(--space-4)); /* clear the Menu button */
  z-index: 99;
  min-width: 260px;
  max-width: min(360px, calc(100vw - var(--container-pad) * 2));
  padding: var(--space-8);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(var(--blur-glass));
  -webkit-backdrop-filter: blur(var(--blur-glass));
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-large);

  transform-origin: bottom right; /* expand upward from the button */
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px) scale(0.98);
  transition:
    opacity var(--motion-medium) var(--ease-out),
    transform var(--motion-medium) var(--ease-out),
    visibility 0s linear var(--motion-medium);
}
.menu-panel--open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
  transition:
    opacity var(--motion-medium) var(--ease-out),
    transform var(--motion-medium) var(--ease-out);
}

@media (prefers-reduced-motion: reduce) {
  .menu-panel { transition: opacity var(--motion-fast) linear; transform: none; }
  .menu-panel--open { transform: none; }
}
</style>
