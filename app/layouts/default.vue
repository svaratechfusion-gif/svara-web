<script setup lang="ts">
import TerminalHeader from '~/components/terminal/TerminalHeader.vue'

const mainId = "main-content";
</script>

<template>
  <div class="app-layout">
    <a
      :href="`#${mainId}`"
      class="skip-link"
    >
      Skip to content
    </a>
    <TerminalHeader />
    <main :id="mainId" class="main-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.skip-link {
  position: fixed;
  top: -100px;
  left: 1rem;
  z-index: 100;
  padding: 0.75rem 1.25rem;
  background: var(--accent);
  color: var(--bg);
  border-radius: var(--panel-radius);
  font-size: 0.875rem;
  font-weight: 600;
  transition: top 200ms ease-out;
}
.skip-link:focus {
  top: 1rem;
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>