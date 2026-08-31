<script setup lang="ts">
// PRODUCTS · MARQUEE — infinite horizontal scroll of product-preview cards
// (dashboard mocks), duplicated for a seamless loop (reference marquee behaviour).
import { PX_MARQUEE } from '~/utils/px-products'
import ProductVisual from '~/components/products/vo/ProductVisual.vue'

const loop = [...PX_MARQUEE, ...PX_MARQUEE]
</script>

<template>
  <section class="vm" aria-label="SVARA product previews">
    <div class="vm__track">
      <NuxtLink v-for="(p, i) in loop" :key="`${p.name}-${i}`" :to="p.to" class="vm__card" :aria-hidden="i >= PX_MARQUEE.length ? 'true' : undefined">
        <ProductVisual :product="p" />
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.vm { margin: clamp(64px, 9vw, 100px) 0 clamp(56px, 8vw, 80px); overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); }
.vm__track { display: flex; width: max-content; animation: vm-scroll 44s linear infinite; }
.vm__card { flex-shrink: 0; width: 340px; height: 280px; margin: 0 12px; text-decoration: none; }
@media (min-width: 768px) { .vm__card { width: 420px; height: 340px; } }
.vm__card :deep(.pv) { transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
.vm__card:hover :deep(.pv) { transform: translateY(-6px); }

@keyframes vm-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@media (max-width: 640px) { .vm__track { animation-duration: 22s; } }
@media (prefers-reduced-motion: reduce) { .vm__track { animation: none; } }
</style>
