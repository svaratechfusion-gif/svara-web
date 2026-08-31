<script setup lang="ts">
// EVOLVE · blueprint rule grid + plus-crosshairs (behind the particle canvas).
defineProps<{ active: boolean }>()
// crosshairs in REVEAL order: [left%, top%]
const marks: [number, number][] = [
  [75, 1.9375], [37.5, 11.6875], [87.5, 25.8125], [25, 50.9375],
  [75, 50.9375], [12.5, 74.875], [87.5, 74.875], [25, 99.3125],
]
</script>

<template>
  <div class="eg" :class="{ 'is-in': active }" aria-hidden="true">
    <!-- vertical rules -->
    <span class="eg__v eg__v--strong" style="left:0" />
    <span class="eg__v" style="left:12.5%" />
    <span class="eg__v" style="left:25%" />
    <span class="eg__v" style="left:37.5%" />
    <span class="eg__v" style="left:50%" />
    <span class="eg__v" style="left:62.5%" />
    <span class="eg__v" style="left:75%" />
    <!-- 87.5% split around the CTA -->
    <span class="eg__v eg__v--strong eg__v--stub" style="left:87.5%" />
    <span class="eg__v eg__v--resume" style="left:87.5%" />
    <span class="eg__v eg__v--strong" style="left:100%" />
    <!-- horizontal rule -->
    <span class="eg__h" style="top:74.875%" />
    <!-- crosshairs -->
    <span
      v-for="(m, i) in marks" :key="i" class="eg__mark"
      :style="{ left: m[0] + '%', top: m[1] + '%', '--i': i }"
    >
      <svg width="11" height="11" viewBox="0 0 11 11"><path d="M6 5H11V6H6V11H5V6H0V5H5V0H6V5Z" fill="var(--marker)" /></svg>
    </span>
  </div>
</template>

<style scoped>
.eg { position: absolute; inset: 0; z-index: 0; opacity: 0; transition: opacity 700ms var(--ease) 200ms; }
.eg.is-in { opacity: 1; }
@media (max-width: 1279px) { .eg.is-in { opacity: 0.5; } }
@media (max-width: 767px) { .eg { display: none; } }

.eg__v { position: absolute; top: 0; height: 100%; width: var(--hairline); background: var(--rule); transform: translateX(-0.5px); }
.eg__v--strong { background: var(--rule-strong); }
.eg__v--stub { height: 1rem; }
.eg__v--resume { top: 4.375rem; height: auto; bottom: 0; background: var(--rule); }
.eg__h { position: absolute; left: 0; width: 100%; height: var(--hairline); background: var(--rule); }

.eg__mark { position: absolute; width: 0.6875rem; height: 0.6875rem; transform: translate(-50%, -50%); display: grid; place-items: center; }
.eg__mark svg { width: 0.6875rem; height: 0.6875rem; display: block; opacity: 0; transform: scale(0) rotate(-45deg); transition: opacity 700ms var(--ease), transform 700ms var(--ease); transition-delay: calc(200ms + var(--i) * 40ms); transform-origin: center; }
.eg.is-in .eg__mark svg { opacity: 1; transform: scale(1) rotate(0deg); }

@media (prefers-reduced-motion: reduce) {
  .eg, .eg__mark svg { transition: none; }
}
</style>
