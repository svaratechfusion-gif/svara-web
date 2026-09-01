<script setup lang="ts">
// EVOLVE · two-part display headline, revealed letter-by-letter. "Engineering /
// Intelligence" top-left; "That Evolves / With You." bottom-right.
defineProps<{ active: boolean }>()
function letters(text: string) { return Array.from(text).map((ch) => (ch === ' ' ? ' ' : ch)) }
const A = [{ text: 'Engineering', base: 600 }, { text: 'Intelligence', base: 750 }]
const B = [{ text: 'That Evolves', base: 1400 }, { text: 'With You.', base: 1550 }]
</script>

<template>
  <h1 v-glitch="{ slice: false, delay: 2.6 }" class="eh svara-hero-h1" :class="{ 'is-in': active }">
    <span class="eh__block eh__block--a">
      <span v-for="(line, li) in A" :key="li" class="eh__line">
        <span v-for="(ch, i) in letters(line.text)" :key="i" class="eh__ch" :style="{ '--base': line.base + 'ms', '--i': i }">{{ ch }}</span>
      </span>
    </span>
    <span class="eh__block eh__block--b">
      <span v-for="(line, li) in B" :key="li" class="eh__line">
        <span v-for="(ch, i) in letters(line.text)" :key="i" class="eh__ch" :style="{ '--base': line.base + 'ms', '--i': i }">{{ ch }}</span>
      </span>
    </span>
  </h1>
</template>

<style scoped>
.eh { margin: 0; pointer-events: none; font-family: var(--font-display); font-weight: 400; font-size: 5.75rem; line-height: 1; color: var(--foreground); z-index: 5; }
@media (max-width: 1279px) { .eh { font-size: clamp(42px, 6.3889vw, 82px); } }
.eh__block { position: absolute; display: flex; flex-direction: column; }
.eh__block--a { top: 8.625rem; left: 2.5rem; align-items: flex-start; text-align: left; }
.eh__block--b { right: 2.5rem; bottom: 2.5rem; align-items: flex-end; text-align: right; }
.eh__line { display: block; white-space: nowrap; }
.eh__ch { display: inline-block; opacity: 0; transform: translateY(0.42em); filter: blur(10px); transition: opacity 1150ms var(--ease), transform 1150ms var(--ease), filter 1150ms var(--ease); transition-delay: calc(var(--base) + var(--i) * 22ms); }
.eh.is-in .eh__ch { opacity: 1; transform: none; filter: blur(0); }

@media (max-width: 767px) {
  .eh__block { position: static; align-items: flex-start; text-align: left; }
  .eh__block--b { margin-top: 1rem; }
  .eh__line { white-space: normal; }
}
@media (prefers-reduced-motion: reduce) {
  .eh__ch { transition: none; opacity: 1; transform: none; filter: none; }
}
</style>
