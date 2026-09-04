<script setup lang="ts">
/**
 * WHY SVARA — three plates, and the middle one is the page's Phosphor accent.
 * The reference is strict that the mint appears on at most one card per viewport
 * and never beside the blue, so this band carries no other colour at all.
 */
const WHY = [
  { title: 'Work at the intersection', body: 'AI, hardware, and heavy industry rarely meet in one place. At SVARA they are the same problem.' },
  { title: 'Own the whole stack', body: 'From sensor to decision, you build across the entire loop — not a thin slice of it.' },
  { title: 'Define a category', body: 'Enterprise Intelligence Infrastructure is new. The patterns and standards are still being written — by us.' },
]
</script>

<template>
  <div>
    <div class="hns__head">
      <p class="hns__eyebrow">Why SVARA</p>
      <h2 class="hns__h2">A rare kind of problem.</h2>
    </div>

    <div class="hns__grid hns__grid--3">
      <article
        v-for="(w, i) in WHY" :key="w.title"
        class="hns__plate" :class="{ 'hns__plate--mint': i === 1 }"
      >
        <h3 class="hns__h3">{{ w.title }}</h3>
        <p class="hns__body" style="margin-top: 12px">{{ w.body }}</p>
      </article>
    </div>
  </div>
</template>
