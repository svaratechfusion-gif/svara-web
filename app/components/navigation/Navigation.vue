<script setup lang="ts">
// No traditional navbar: logo top-left; Connect top-right with the Menu
// button below it. Menu opens a fullscreen overlay. No dropdowns, no sticky
// white box — the chrome floats over the page.
import { ref } from 'vue'
import ConnectButton from './ConnectButton.vue'
import MenuButton from './MenuButton.vue'
import MenuOverlay from './MenuOverlay.vue'

const menuOpen = ref(false)
</script>

<template>
  <header class="navigation">
    <NuxtLink to="/" class="navigation__logo" aria-label="SVARA home" @click="menuOpen = false">
      SVARA
    </NuxtLink>

    <div class="navigation__actions">
      <ConnectButton />
      <MenuButton :open="menuOpen" @toggle="menuOpen = !menuOpen" />
    </div>

    <MenuOverlay :open="menuOpen" @close="menuOpen = false" />
  </header>
</template>

<style scoped>
.navigation__logo {
  position: fixed;
  top: var(--space-6);
  left: var(--container-pad);
  z-index: 100;
  font-family: var(--font-sans);
  font-size: 20px;
  font-weight: var(--weight-extrabold);
  letter-spacing: -0.02em;
  color: var(--color-text);
  text-decoration: none;
  /* glass pill so the mark stays legible over any scrolled content
     (no sticky white bar — chrome floats, content passes beneath) */
  padding: var(--space-2) var(--space-4);
  margin-left: calc(var(--space-4) * -1);
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(var(--blur-nav));
  -webkit-backdrop-filter: blur(var(--blur-nav));
  border: 1px solid var(--color-border);
}
.navigation__logo:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

.navigation__actions {
  position: fixed;
  top: var(--space-6);
  right: var(--container-pad);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-3);
}
</style>
