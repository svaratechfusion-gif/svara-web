<script setup lang="ts">
/**
 * PRINCIPLES — six engineering values. These describe how the company builds,
 * not claims about headcount, perks or the current team.
 */
const PRINCIPLES = [
  { n: '01', text: 'Own the whole stack — from sensor to decision.' },
  { n: '02', text: 'Real-world first — build for the factory floor, not the demo.' },
  { n: '03', text: 'Depth over breadth — go deep enough to be definitive.' },
  { n: '04', text: 'Build compounding systems — things that get smarter over time.' },
  { n: '05', text: 'Clarity is a feature — simple beats clever.' },
  { n: '06', text: 'Move with intent — velocity in service of the mission.' },
]
</script>

<template>
  <div>
    <div class="hns__head">
      <p class="hns__eyebrow">Principles</p>
      <h2 class="hns__h2">Six we hold to.</h2>
    </div>

    <ul class="hns__grid hns__grid--3" style="list-style: none; margin: 0; padding: 0">
      <li v-for="p in PRINCIPLES" :key="p.n" class="hns__plate hns__slot">
        <span class="hns__slot-n">{{ p.n }}</span>
        <p class="hns__slot-say">{{ p.text }}</p>
      </li>
    </ul>
  </div>
</template>
