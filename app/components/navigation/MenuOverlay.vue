<script setup lang="ts">
import { watch, onBeforeUnmount } from 'vue'
import DesktopMenu from './DesktopMenu.vue'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

// Lock body scroll while open; Escape closes.
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}
watch(() => props.open, (open) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) document.addEventListener('keydown', onKey)
  else document.removeEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div
    id="menu-overlay"
    class="menu-overlay"
    :class="{ 'menu-overlay--open': open }"
    role="dialog"
    aria-modal="true"
    aria-label="Site menu"
    :aria-hidden="!open"
    :inert="!open"
  >
    <div class="menu-overlay__inner">
      <DesktopMenu @navigate="$emit('close')" />
    </div>
  </div>
</template>

<style scoped>
.menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 90; /* below the nav chrome (100) so Close stays reachable */
  background: var(--color-bg);
  opacity: 0;
  visibility: hidden;
  transition:
    opacity var(--motion-medium) var(--ease-smooth),
    visibility 0s linear var(--motion-medium);
}
.menu-overlay--open {
  opacity: 1;
  visibility: visible;
  transition: opacity var(--motion-medium) var(--ease-smooth);
}
.menu-overlay__inner {
  height: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding: calc(var(--nav-height) + var(--space-16)) var(--container-pad) var(--space-16);
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
@media (prefers-reduced-motion: reduce) {
  .menu-overlay { transition: none; }
}
</style>
