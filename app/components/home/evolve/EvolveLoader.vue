<script setup lang="ts">
// EVOLVE · boot cover. A mono percentage over a hairline track that fills with the
// accent gradient, driven by REAL milestones (fonts + first frame). Lifts on 100%.
const props = defineProps<{ progress: number, lifting: boolean }>()
const pct = computed(() => Math.round(Math.min(1, props.progress) * 100))
</script>

<template>
  <div class="el" :class="{ 'is-lifting': lifting }">
    <div class="el__col">
      <span class="el__pct">{{ pct }}%</span>
      <span class="el__track">
        <span class="el__fill" :style="{ transform: `scaleX(${Math.min(1, progress)})` }" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.el {
  position: fixed; inset: 0; z-index: 50; background: #000000;
  display: grid; place-items: center;
  transition: opacity 620ms var(--ease), transform 620ms var(--ease);
}
.el.is-lifting { opacity: 0; transform: translateY(-24px); pointer-events: none; }
.el__col { width: min(70vw, 26rem); display: flex; flex-direction: column; gap: 0.75rem; }
.el__pct { font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; color: var(--foreground-muted); }
.el__track { position: relative; width: 100%; height: var(--hairline); background: var(--rule); overflow: hidden; }
.el__fill { position: absolute; inset: 0; background: var(--gradient-accent); transform-origin: left; transform: scaleX(0); transition: transform 420ms var(--ease); }
</style>
