<script setup lang="ts">
// Client-only bridge from the Nuxt/Vue products page into the React console
// runtime. The dashboards live in lib/consoles (Framer Motion + React); this
// component owns the React root lifecycle AND presents the console as a fixed
// 16:9 LANDSCAPE design canvas that is CSS-scaled to fit its column — so the
// whole enterprise interface is always visible (never portrait-clipped),
// aspect-locked, and responsive. No console internals are changed here.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

type ProductConsoleKind =
  | 'vision'
  | 'drone'
  | 'edge'
  | 'cognitive'
  | 'agents'
  | 'digital-twin'
  | 'business-cloud'
  | 'ai-os'
  | 'digital-engineering'
  | 'growth'

const props = defineProps<{
  kind: ProductConsoleKind
  active: boolean
}>()

// fixed landscape design canvas (16:9); scaled to fit the column width
const DESIGN_W = 1280
const DESIGN_H = 720

const fit = ref<HTMLElement>()
const mount = ref<HTMLElement>()
const mounted = ref(false)
let root: any = null
let React: any = null
let Runtime: any = null
let activationTimer: ReturnType<typeof setTimeout> | null = null
let ro: ResizeObserver | null = null

function applyScale() {
  const el = fit.value
  if (!el) return
  const s = Math.min(el.clientWidth / DESIGN_W, 1.2)
  el.style.setProperty('--pcm-s', String(s))
}

async function renderConsole() {
  if (!mount.value || !mounted.value) return
  if (!React || !Runtime) {
    React = await import('react')
    const { createRoot } = await import('react-dom/client')
    Runtime = await import('~~/lib/consoles/ProductConsoleRuntime')
    root = createRoot(mount.value)
  }
  root.render(React.createElement(Runtime.default, { kind: props.kind }))
}

function activateConsole() {
  if (!props.active || mounted.value || activationTimer) return
  activationTimer = setTimeout(async () => {
    activationTimer = null
    if (!props.active || mounted.value) return
    mounted.value = true
    await nextTick()
    await renderConsole()
  }, 180)
}

onMounted(() => {
  applyScale()
  if (fit.value && typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(applyScale)
    ro.observe(fit.value)
  }
  activateConsole()
})

watch(() => props.active, () => {
  activateConsole()
})

watch(() => props.kind, () => {
  if (mounted.value) void renderConsole()
})

onBeforeUnmount(() => {
  if (activationTimer) clearTimeout(activationTimer)
  ro?.disconnect()
  root?.unmount()
  root = null
})
</script>

<template>
  <div ref="fit" class="pcm-fit">
    <div ref="mount" class="pcm-canvas" :class="{ 'is-mounted': mounted }">
      <div v-if="!mounted" class="pcm-standby" aria-hidden="true">
        <span class="pcm-standby__scan" />
        <span class="pcm-standby__label">COMMAND PLANE STANDBY</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* the 16:9 slot the scaled canvas fills exactly */
.pcm-fit {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 40px 90px -50px rgba(19, 41, 91, 0.5);
  --pcm-s: 0.6;
}
/* fixed landscape design surface — the React .cx renders into this, then the
   whole thing scales uniformly (aspect preserved, never cropped) */
.pcm-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 1280px;
  height: 720px;
  transform: scale(var(--pcm-s));
  transform-origin: top left;
}
.pcm-canvas :deep(.cx) {
  width: 100%;
  height: 100%;
  min-height: 0;
  border-radius: 16px;
}

/* standby placeholder fills the canvas */
.pcm-standby {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  overflow: hidden;
  border: 1px solid rgba(16, 42, 91, 0.1);
  border-radius: 16px;
  background:
    linear-gradient(rgba(47, 127, 230, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(47, 127, 230, 0.035) 1px, transparent 1px),
    #ffffff;
  background-size: 28px 28px;
}
.pcm-standby__scan {
  position: absolute;
  inset: 0 auto 0 0;
  width: 32%;
  background: linear-gradient(90deg, transparent, rgba(47, 127, 230, 0.08), transparent);
  animation: console-stage-scan 1.8s ease-in-out infinite;
}
.pcm-standby__label {
  position: relative;
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.16em;
  color: var(--color-text-faint);
}

@keyframes console-stage-scan {
  from { transform: translateX(-120%); }
  to { transform: translateX(360%); }
}

@media (prefers-reduced-motion: reduce) {
  .pcm-standby__scan { animation: none; }
}
</style>
