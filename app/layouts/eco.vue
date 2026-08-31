<script setup lang="ts">
// ECO layout — the Ecosystem experience is a full immersive intelligence world:
// a bare navy canvas with NO global header/footer/app-shell/background. Its own
// telemetry bar + chapter rail are the chrome; the SVARA wordmark in the bar links
// home. Other routes keep the default layout untouched.
</script>

<template>
  <div class="eco-layout">
    <slot />
  </div>
</template>

<style scoped>
.eco-layout { min-height: 100dvh; background: #01040e; color: #ededed; }
</style>
