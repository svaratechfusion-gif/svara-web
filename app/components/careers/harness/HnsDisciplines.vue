<script setup lang="ts">
/**
 * DISCIPLINES — the seven areas, as the reference's activity-row pattern: a
 * numbered rail, a name, a description, divided by hairlines rather than boxed
 * into cards. Seven cards would be seven competing surfaces; rows keep the band
 * quiet, which is what the reference asks of a list this long.
 *
 * These are grounded in SVARA's real product stack — they are not invented roles.
 */
const DISCIPLINES = [
  { n: '01', name: 'AI & Machine Learning', body: 'Models that reason over real operational data — perception, prediction, and decision.' },
  { n: '02', name: 'Computer Vision', body: 'Turning raw camera and sensor streams into structured understanding at the edge.' },
  { n: '03', name: 'Edge & Embedded Systems', body: 'Running intelligence where the data is created — constrained, reliable, real-time.' },
  { n: '04', name: 'Autonomy & Drones', body: 'Aerial and ground perception for inspection, monitoring, and site intelligence.' },
  { n: '05', name: 'Simulation & Digital Twin', body: 'Modelling the physical world so systems can rehearse before they act.' },
  { n: '06', name: 'Platform & Cloud', body: 'The orchestration layer that connects every signal to every decision to every action.' },
  { n: '07', name: 'Product & Design', body: 'Making a deep intelligence system feel inevitable, clear, and usable.' },
]
</script>

<template>
  <div>
    <div class="hns__head">
      <p class="hns__eyebrow">Disciplines</p>
      <h2 class="hns__h2">Where you'd work.</h2>
    </div>

    <ul class="hns__rows">
      <li v-for="d in DISCIPLINES" :key="d.n" class="hns__row">
        <span class="hns__row-n">{{ d.n }}</span>
        <span class="hns__row-name">{{ d.name }}</span>
        <span class="hns__body">{{ d.body }}</span>
      </li>
    </ul>
  </div>
</template>
