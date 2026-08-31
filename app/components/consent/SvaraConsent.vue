<script setup lang="ts">
/**
 * SvaraConsent — the consent layer root, mounted once from app.vue.
 *
 * Deliberately NOT wrapped in <ClientOnly> (unlike the chatbot): consent state is
 * server-knowable from the request cookie, so the dock renders in the initial
 * HTML. That is what makes it reachable for assistive tech on first paint, and
 * present without JS.
 *
 * The `.cc` wrapper carries the token set and the route-driven theme. It is
 * `pointer-events: none` with its children re-enabling, so an empty layer never
 * intercepts a click.
 */
import ConsentDock from './ConsentDock.vue'
import ConsentConsole from './ConsentConsole.vue'
import { useConsentTheme } from '~/composables/useConsent'

const theme = useConsentTheme()
</script>

<template>
  <div class="cc" :data-theme="theme">
    <ConsentDock />
    <ConsentConsole />
  </div>
</template>

<style scoped>
/* the layer itself is inert; only the dock and console take pointer events */
.cc { pointer-events: none; }
.cc :deep(.cc__dock) { pointer-events: auto; }
</style>
