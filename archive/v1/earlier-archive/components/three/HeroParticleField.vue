<script setup lang="ts">
// Minimal scene proving the 3D pipeline renders end to end — same role a
// placeholder icosahedron played in the prior Next.js build. TresCanvas is
// client-only by design (the @tresjs/nuxt module handles this automatically,
// no <ClientOnly>/.client suffix needed here).
</script>

<template>
  <!--
    TresCanvas doesn't reliably translate an arbitrary `class` into actual
    `position: absolute` on the rendered <canvas> (confirmed: it stayed
    position:relative and consumed a full viewport height of normal document
    flow, pushing HeroContent below the section). Positioning is handled by
    this plain wrapper div instead; TresCanvas just fills it.
  -->
  <div class="pointer-events-none absolute inset-0 z-10" style="opacity: 0.5">
    <TresCanvas alpha>
      <TresPerspectiveCamera :position="[0, 0, 6]" />
      <TresAmbientLight :intensity="0.6" />
      <TresPointLight :position="[3, 3, 3]" :intensity="1.2" color="#76A8D6" />
      <HeroCoreMesh />
    </TresCanvas>
  </div>
</template>
