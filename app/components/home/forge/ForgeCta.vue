<script setup lang="ts">
// THE DARK CLOSE — the reference's Obsidian section: compressed display, a short lead
// and the pill control pair at 800px radius, Ember carrying the primary.
//
// The reference's dark section pairs an input with the submit. There is no endpoint to
// post an address to, so rather than ship a form that silently drops what someone
// types, the same composition runs on the two real destinations the page already has.
</script>

<template>
  <section class="fg fg-cta" aria-labelledby="fg-cta-title">
    <div class="fg__wrap fg-cta__inner">
      <h2 id="fg-cta-title" class="fg-display fg-display--sm">START<br>BUILDING</h2>
      <p class="fg-body fg-cta__lead">
        Tell us what you are trying to build. The best systems start as real problems
        from the field.
      </p>

      <div class="fg-cta__controls">
        <NuxtLink to="/contact" class="fg-btn fg-btn--ember">Talk to SVARA</NuxtLink>
        <NuxtLink to="/products" class="fg-btn fg-btn--chalk">Explore the stack</NuxtLink>
      </div>
    </div>
  </section>
</template>
