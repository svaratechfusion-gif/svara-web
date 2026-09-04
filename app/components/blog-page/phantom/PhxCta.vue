<script setup lang="ts">
/**
 * CLOSING — the reference's dark hero mode reused as a sign-off: aubergine
 * ground, centred display line, one lavender pill with its violet halo beside a
 * ghost outline.
 */
</script>

<template>
  <div style="text-align: center">
    <h2 class="phx__display">Have a question<br>we should answer?</h2>
    <p class="phx__lede" style="margin: 20px auto 0; max-width: 48ch; opacity: 0.78">
      Tell us what you're trying to build. The best insights start as real problems
      from the field.
    </p>
    <div class="phx__actions" style="justify-content: center">
      <NuxtLink to="/contact" class="phx__pill phx__pill--primary">
        Talk to SVARA <span aria-hidden="true">&#8599;</span>
      </NuxtLink>
      <NuxtLink to="/technology" class="phx__pill phx__pill--ghost">Explore the technology</NuxtLink>
    </div>
  </div>
</template>
