<script setup lang="ts">
// SCENE layout — for the pinned, full-viewport /products experience.
//
// Bare on purpose: no AppShell, no BackgroundCanvas, no GlobalNavigation, no site
// footer. The experience is one fixed scene that owns the whole viewport, and it
// carries its own thin editorial header and closing footer (§9, §30). A second
// fixed navigation on top of it would sit over the dashboards and break the
// composition. Every other route keeps the default layout untouched.
</script>

<template>
  <div class="scene-layout">
    <a href="#scene-main" class="scene-layout__skip">Skip to content</a>
    <main id="scene-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.scene-layout { min-height: 100dvh; background: #FFFFFF; }

.scene-layout__skip {
  position: fixed;
  top: -100px;
  left: 16px;
  z-index: 200;
  padding: 10px 18px;
  border-radius: 999px;
  background: #14223F;
  color: #fff;
  font-size: 13px;
  text-decoration: none;
  transition: top 0.2s ease;
}
.scene-layout__skip:focus { top: 16px; }
</style>
