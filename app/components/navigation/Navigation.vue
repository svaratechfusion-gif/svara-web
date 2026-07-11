<script setup lang="ts">
// Global navigation hierarchy:
//   • logo — top-left (fixed)
//   • Connect — top-right (fixed, always visible, never moves/animates)
//   • Menu — bottom-right floating dock (fixed ~48px from bottom, right-
//     aligned with Connect). Its panel expands UPWARD from the button.
// The Menu reads as a system control, not part of the content.
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

    <!-- Connect: fixed top-right, independent of the Menu -->
    <div class="navigation__connect">
      <ConnectButton />
    </div>

    <!-- Menu: fixed bottom-right dock; panel expands upward -->
    <div class="navigation__dock">
      <MenuOverlay :open="menuOpen" @close="menuOpen = false" />
      <MenuButton :open="menuOpen" @toggle="menuOpen = !menuOpen" />
    </div>
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
  /* glass pill so the mark stays legible over any scrolled content */
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

/* Connect — top-right, always visible, fixed. */
.navigation__connect {
  position: fixed;
  top: var(--space-6);
  right: var(--container-pad);
  z-index: 100;
}

/* Menu — bottom-right floating dock, right-aligned with Connect. */
.navigation__dock {
  position: fixed;
  bottom: 48px;
  right: var(--container-pad);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
}
</style>
