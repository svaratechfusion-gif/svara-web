<script setup lang="ts">
// PRODUCTS · READY TO BUILD INTELLIGENCE — replaces the reference "Partner with us"
// block. A huge white CTA block; on hover, lightweight product chips spawn at the
// cursor with random rotation and fade/scale out (~1000ms), throttled ~80ms — the
// reference's interactive mouse-trail, rebuilt with SVARA products.
import { ref, onBeforeUnmount } from 'vue'
import { PX_PRODUCTS } from '~/utils/px-products'

interface Spark { id: number; x: number; y: number; rot: number; label: string }
const sparks = ref<Spark[]>([])
let seq = 0
let last = 0
let pi = 0

function onMove(e: MouseEvent): void {
  const now = performance.now()
  if (now - last < 80) return
  last = now
  const host = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const id = ++seq
  const label = PX_PRODUCTS[pi % PX_PRODUCTS.length]!.name
  pi++
  sparks.value.push({
    id,
    x: e.clientX - host.left,
    y: e.clientY - host.top,
    rot: Math.round((Math.random() * 20 - 10)),
    label,
  })
  window.setTimeout(() => { sparks.value = sparks.value.filter((s) => s.id !== id) }, 1000)
}

onBeforeUnmount(() => { sparks.value = [] })
</script>

<template>
  <section class="vp">
    <div v-reveal class="vp__block" @mousemove="onMove">
      <span
        v-for="s in sparks" :key="s.id" class="vp__spark px-mono"
        :style="{ left: s.x + 'px', top: s.y + 'px', '--rot': s.rot + 'deg' }"
      >{{ s.label }}</span>

      <div class="vp__content">
        <h2 class="vp__title">Ready to Build <span class="px-serif">Intelligence?</span></h2>
        <p class="vp__sub">Transform your enterprise with SVARA.</p>
        <NuxtLink to="/contact" class="px-btn px-btn--primary vp__cta">
          <span class="vp__cta-mark px-serif">S</span>
          Schedule Executive Consultation
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vp { padding: clamp(48px, 8vw, 88px) 24px; }
.vp__block {
  position: relative; overflow: hidden;
  max-width: 1200px; margin: 0 auto; padding: clamp(96px, 18vw, 200px) 24px;
  background: #fff; border-radius: 40px;
  box-shadow: 0 0 0 0.5px rgba(16, 33, 74, 0.06), 0 30px 80px -40px rgba(16, 33, 74, 0.3);
}
.vp__content { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; text-align: center; }
.vp__title { margin: 0; font-size: clamp(40px, 8vw, 80px); line-height: 1; letter-spacing: -0.03em; color: var(--px-navy); font-weight: 500; }
.vp__title .px-serif { font-weight: 400; }
.vp__sub { margin: 18px 0 0; font-size: clamp(16px, 1.8vw, 20px); color: var(--px-muted); }
.vp__cta { margin-top: 40px; padding: 14px 20px 14px 14px; }
.vp__cta-mark { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 999px; background: rgba(255, 255, 255, 0.14); color: #F6FCFF; font-size: 18px; }

/* cursor-spawned product chips */
.vp__spark {
  position: absolute; z-index: 1; transform: translate(-50%, -50%) rotate(var(--rot)); transform-origin: center;
  pointer-events: none; white-space: nowrap;
  font-size: 11px; letter-spacing: 0.06em; color: var(--px-navy);
  padding: 7px 12px; border-radius: 999px; background: #fff;
  box-shadow: 0 0 0 0.5px rgba(16, 33, 74, 0.08), 0 8px 24px rgba(16, 33, 74, 0.14);
  animation: vp-fade 1000ms ease-out forwards;
}
@keyframes vp-fade {
  0% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--rot)) scale(0.6); }
  18% { opacity: 1; transform: translate(-50%, -50%) rotate(var(--rot)) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -60%) rotate(var(--rot)) scale(0.7); }
}
@media (prefers-reduced-motion: reduce) { .vp__spark { display: none; } }
</style>
