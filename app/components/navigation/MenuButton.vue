<script setup lang="ts">
defineProps<{
  open: boolean
}>()
defineEmits<{ toggle: [] }>()
</script>

<template>
  <button
    class="menu-button"
    :aria-expanded="open"
    aria-controls="menu-overlay"
    :aria-label="open ? 'Close menu' : 'Open menu'"
    @click="$emit('toggle')"
  >
    <span class="menu-button__label">{{ open ? 'Close' : 'Menu' }}</span>
    <span class="menu-button__lines" :class="{ 'menu-button__lines--open': open }" aria-hidden="true">
      <i /><i />
    </span>
  </button>
</template>

<style scoped>
.menu-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  height: 44px;
  padding-inline: var(--space-4);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: var(--type-caption);
  font-weight: var(--weight-medium);
  color: var(--color-text);
  transition: border-color var(--motion-medium) var(--ease-smooth);
}
.menu-button:hover { border-color: var(--color-text); }
.menu-button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
.menu-button__lines {
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
  width: 18px;
}
.menu-button__lines i {
  display: block;
  height: 1.5px;
  background: currentColor;
  transition: transform var(--motion-medium) var(--ease-smooth);
}
.menu-button__lines--open i:first-child { transform: translateY(2.75px) rotate(45deg); }
.menu-button__lines--open i:last-child { transform: translateY(-2.75px) rotate(-45deg); }
@media (prefers-reduced-motion: reduce) {
  .menu-button, .menu-button__lines i { transition: none; }
}
</style>
