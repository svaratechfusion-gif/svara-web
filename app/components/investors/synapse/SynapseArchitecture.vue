<script setup lang="ts">
// SECTION 5 — the loop, on pure black. No video: the one still beat in the film,
// so the structure reads without competition.
//
// The reference's three "Layer" cards carry SVARA's own Intelligence Loop
// stages rather than the fictional capture/process/interface stack.
const LAYERS = [
  { n: 'Layer 01', name: 'Sense' },
  { n: 'Layer 02', name: 'Understand' },
  { n: 'Layer 03', name: 'Act' },
]
</script>

<template>
  <section class="syn-arch">
    <div class="syn-arch__inner">
      <p class="syn-arch__eyebrow">Architecture</p>
      <h2 class="syn-arch__heading">One loop. Zero fragmentation.</h2>
      <p class="syn-arch__body">
        Competitors offer single-capability AI — computer vision only, NLP only. SVARA offers the
        complete Intelligence Loop: one platform covering every capability, with compounding
        improvement across all of them.
      </p>

      <div class="syn-arch__cards">
        <div v-for="l in LAYERS" :key="l.n" class="syn-arch__card">
          <span class="syn-arch__card-n">{{ l.n }}</span>
          <span class="syn-arch__card-name">{{ l.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
