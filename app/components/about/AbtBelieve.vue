<script setup lang="ts">
// ABOUT · Why We Believe — large editorial typography, premium whitespace,
// minimal distraction. Copy is VERBATIM from the Content Bible closing narrative
// (homeSection07.paragraphs[0] and [1]).
import { homeSection07 } from '~~/lib/content/home'

const lines = [homeSection07.paragraphs[0]!, homeSection07.paragraphs[1]!]
</script>

<template>
  <section class="abel">
    <div class="abel__inner">
      <p v-reveal class="abel__eyebrow">Why We Believe</p>
      <p class="abel__statement">
        <span v-for="(l, i) in lines" :key="i" v-reveal="{ delay: 0.1 * i }" class="abel__line" data-split>{{ l }} </span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.abel { padding-block: calc(var(--section-y) * 1.25); }
.abel__inner { max-width: 1080px; margin-inline: auto; padding-inline: var(--container-pad); box-sizing: border-box; text-align: center; }
.abel__eyebrow { margin: 0 0 var(--space-12); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.abel__statement { margin: 0; }
.abel__line {
  display: block; max-width: 24ch; margin: 0 auto;
  font-size: clamp(28px, 4.4vw, 58px); font-weight: var(--weight-bold); line-height: 1.14; letter-spacing: -0.025em;
  color: #0d1b3e; text-wrap: balance;
}
.abel__line + .abel__line { margin-top: var(--space-8); color: var(--color-accent); }
</style>
