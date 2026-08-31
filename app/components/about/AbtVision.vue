<script setup lang="ts">
// ABOUT · Our Vision — one large editorial statement, minimal supporting visual.
// The headline is verbatim from the closing home narrative (homeSection07.title,
// Content Bible); the supporting line is composed from official Volume 08
// mission + category messaging (connect every signal to every decision; improve
// without end).
import { homeSection07 } from '~~/lib/content/home'

const headline = homeSection07.title
</script>

<template>
  <section class="avision">
    <span class="avision__halo" aria-hidden="true" />
    <div class="avision__inner">
      <p v-reveal class="avision__eyebrow">Our Vision</p>
      <h2 v-reveal class="avision__statement" data-split>{{ headline }}.</h2>
      <p v-reveal class="avision__sub">A world where every enterprise runs on connected intelligence — where every signal reaches every decision, and every operation improves without end.</p>
    </div>
  </section>
</template>

<style scoped>
.avision {
  position: relative; overflow: hidden;
  padding-block: calc(var(--section-y) * 1.2);
}
.avision__halo {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  width: min(760px, 90vw); aspect-ratio: 1 / 1; border-radius: 50%;
  background: radial-gradient(circle, rgba(47, 127, 230, 0.06) 0%, rgba(47, 127, 230, 0) 62%);
  pointer-events: none;
}
.avision__inner { position: relative; max-width: 1000px; margin-inline: auto; padding-inline: var(--container-pad); box-sizing: border-box; text-align: center; }
.avision__eyebrow { margin: 0 0 var(--space-8); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.avision__statement { margin: 0 auto; max-width: 18ch; font-size: clamp(34px, 5.6vw, 78px); font-weight: var(--weight-extrabold); line-height: 1.04; letter-spacing: -0.03em; color: #0d1b3e; text-wrap: balance; }
.avision__sub { margin: var(--space-10) auto 0; max-width: 56ch; font-size: var(--type-lead); line-height: var(--leading-body); color: var(--color-text-secondary); }
</style>
