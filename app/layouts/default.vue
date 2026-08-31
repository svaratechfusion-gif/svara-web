<script setup lang="ts">
import AppShell from '~/components/core/AppShell.vue'
import GlobalNavigation from '~/components/navigation/GlobalNavigation.vue'
import Footer from '~/components/footer/Footer.vue'
import BackgroundCanvas from '~/components/background/BackgroundCanvas.vue'

const mainId = 'main-content'
</script>

<template>
  <AppShell>
    <template #background>
      <BackgroundCanvas />
    </template>

    <template #navigation>
      <a :href="`#${mainId}`" class="skip-link">Skip to content</a>
      <GlobalNavigation />
    </template>

    <div :id="mainId">
      <slot />
    </div>

    <template #footer>
      <Footer />
    </template>
  </AppShell>
</template>

<style scoped>
.skip-link {
  position: fixed;
  top: -100px;
  left: var(--space-4);
  z-index: 200;
  padding: var(--space-3) var(--space-6);
  background: var(--color-text);
  color: var(--color-inverse);
  border-radius: var(--radius-pill);
  font-size: var(--type-caption);
  font-weight: var(--weight-semibold);
  text-decoration: none;
  transition: top var(--motion-fast) var(--ease-smooth);
}
.skip-link:focus {
  top: var(--space-4);
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
</style>
