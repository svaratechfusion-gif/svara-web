<script setup lang="ts">
// Top telemetry status bar — console chrome, SVARA sky palette. Live-ish values
// (client timers), never dominant. FOCUS reflects the active chapter.
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{ focus: string, shown: boolean }>()

const signals = ref(4.21)
const coherence = ref(98.4)
const bars = ref<number[]>(Array.from({ length: 32 }, () => 20 + Math.random() * 70))
let timer: ReturnType<typeof setInterval> | null = null

function rand(min: number, max: number) { return min + Math.random() * (max - min) }

onMounted(() => {
  timer = setInterval(() => {
    signals.value = Math.min(5.6, Math.max(3.4, signals.value + rand(-0.18, 0.18)))
    coherence.value = Math.min(99.4, Math.max(96.0, coherence.value + rand(-0.25, 0.25)))
    bars.value = [...bars.value.slice(1), rand(6, 100)]
  }, 150)
})
onBeforeUnmount(() => { if (timer) clearInterval(timer) })
</script>

<template>
  <header class="ect" :class="{ 'is-in': shown }">
    <div class="ect__seg ect__brand">
      <span class="ect__dot" /> SVARA_INTELLIGENCE <span class="ect__live">// LIVE</span>
    </div>
    <div class="ect__seg ect__hide-sm">SYSTEMS <b>10</b></div>
    <div class="ect__seg ect__hide-sm">NODES <b>10</b></div>
    <div class="ect__seg">SIGNALS <b>{{ signals.toFixed(2) }} M/S</b></div>
    <div class="ect__seg ect__hide-sm">COHERENCE <b>{{ coherence.toFixed(1) }}%</b></div>
    <div class="ect__seg">FOCUS <b class="ect__focus" :key="focus">{{ focus }}</b></div>
    <div class="ect__spacer" />
    <div class="ect__seg ect__wave ect__hide-sm">
      <span v-for="(b, i) in bars" :key="i" class="ect__bar" :class="{ 'is-head': i === bars.length - 1 }" :style="{ height: b + '%' }" />
    </div>
    <div class="ect__seg ect__prompt">&gt; <span class="ect__caret">_</span></div>
  </header>
</template>

<style scoped>
.ect {
  position: fixed; top: 0; left: 0; right: 0; z-index: 30;
  height: 2.5rem; display: flex; align-items: stretch;
  border-bottom: 1px solid rgba(142, 203, 255, 0.15);
  background: rgba(1, 4, 14, 0.55); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(142, 203, 255, 0.8);
  opacity: 0; transform: translateY(-100%); transition: opacity 700ms ease 350ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 350ms;
}
.ect.is-in { opacity: 1; transform: none; }
@media (min-width: 768px) { .ect { height: 2.75rem; } }
.ect__seg { display: flex; align-items: center; gap: 0.5rem; padding: 0 1rem; border-left: 1px solid rgba(142, 203, 255, 0.15); white-space: nowrap; }
.ect__seg:first-child { border-left: 0; }
.ect__seg b { color: #fff; font-weight: 600; }
.ect__brand { color: var(--brain-sky, #8ecbff); }
.ect__live { color: rgba(142, 203, 255, 0.5); }
.ect__dot { width: 6px; height: 6px; border-radius: 50%; background: var(--brain-sky, #8ecbff); animation: ect-pulse 1.6s ease-in-out infinite; }
@keyframes ect-pulse { 0%, 100% { opacity: 0.4; box-shadow: 0 0 0 0 rgba(142, 203, 255, 0.5); } 50% { opacity: 1; box-shadow: 0 0 0 4px rgba(142, 203, 255, 0); } }
.ect__focus { display: inline-block; animation: ect-slide 400ms ease; }
@keyframes ect-slide { from { opacity: 0; transform: translateX(6px); } to { opacity: 1; transform: none; } }
.ect__spacer { flex: 1; }
.ect__wave { display: flex; align-items: flex-end; gap: 2px; height: 60%; align-self: center; }
.ect__bar { width: 2px; background: rgba(142, 203, 255, 0.35); transition: height 150ms linear; }
.ect__bar.is-head { background: var(--brain-sky, #8ecbff); }
.ect__caret { animation: ec-blink 1.05s steps(1) infinite; }
@keyframes ec-blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
@media (max-width: 767px) { .ect__hide-sm { display: none; } .ect { font-size: 0.58rem; } }
</style>
