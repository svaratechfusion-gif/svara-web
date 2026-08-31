<script setup lang="ts">
// Bottom-centre chapter rail — 7 ticks. Communicates "travelling through a
// system", not a scrollbar. The active chapter's bar brightens + widens.
defineProps<{ active: number, shown: boolean }>()
const items = [0, 1, 2, 3, 4, 5, 6]
const num = (i: number) => String(i + 1).padStart(2, '0')
</script>

<template>
  <div class="ecr" :class="{ 'is-in': shown }" aria-hidden="true">
    <div v-for="i in items" :key="i" class="ecr__tick" :class="{ 'is-active': i === active }">
      <span class="ecr__bar" />
      <span class="ecr__num">{{ num(i) }}</span>
    </div>
  </div>
</template>

<style scoped>
.ecr {
  position: fixed; left: 50%; bottom: 2rem; z-index: 30; transform: translateX(-50%);
  display: flex; align-items: center; gap: 0.9rem; pointer-events: none;
  opacity: 0; transition: opacity 700ms ease 300ms;
}
.ecr.is-in { opacity: 1; }
@media (min-width: 768px) { .ecr { bottom: 2.5rem; } }
.ecr__tick { display: flex; flex-direction: column; align-items: center; gap: 0.45rem; }
.ecr__bar { height: 2px; width: 1rem; background: rgba(142, 203, 255, 0.25); transition: width 400ms cubic-bezier(0.16, 1, 0.3, 1), background 400ms ease; }
.ecr__num { font-size: 0.58rem; letter-spacing: 0.14em; color: rgba(142, 203, 255, 0.3); font-variant-numeric: tabular-nums; transition: color 400ms ease; }
.ecr__tick.is-active .ecr__bar { width: 2rem; background: rgba(142, 203, 255, 0.9); }
.ecr__tick.is-active .ecr__num { color: rgba(142, 203, 255, 0.9); }
</style>
