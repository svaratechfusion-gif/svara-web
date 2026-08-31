<script setup lang="ts">
// PRODUCTS · FEATURED PRODUCTS — replaces the reference testimonials carousel.
// One product per slide (name + short description + preview + key capabilities +
// CTA), auto-scrolling every 3s, pause on hover, prev/next controls.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { PX_FEATURED } from '~/utils/px-products'
import ProductVisual from '~/components/products/vo/ProductVisual.vue'

const items = PX_FEATURED
const idx = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function go(n: number): void { idx.value = (n + items.length) % items.length }
function next(): void { go(idx.value + 1) }
function prev(): void { go(idx.value - 1) }

function start(): void {
  stop()
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(next, 3000)
}
function stop(): void { if (timer) { clearInterval(timer); timer = null } }

onMounted(start)
onBeforeUnmount(stop)
</script>

<template>
  <section class="vf" @mouseenter="stop" @mouseleave="start">
    <div class="vf__inner">
      <header v-reveal class="vf__head">
        <h2 class="vf__title">Featured <span class="px-serif">Products.</span></h2>
        <div class="vf__nav">
          <button type="button" class="vf__arrow" aria-label="Previous product" @click="prev">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
          <button type="button" class="vf__arrow" aria-label="Next product" @click="next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
        </div>
      </header>

      <div v-reveal="{ delay: 0.08 }" class="vf__viewport">
        <div class="vf__track" :style="{ transform: `translateX(-${idx * 100}%)` }">
          <div v-for="p in items" :key="p.name" class="vf__slide">
            <article class="vf__card">
              <div class="vf__card-copy">
                <span class="vf__card-cap px-mono">{{ p.capability }} · Featured</span>
                <h3 class="vf__card-name">{{ p.name }}</h3>
                <p class="vf__card-desc">{{ p.long }}</p>
                <ul class="vf__caps">
                  <li v-for="c in p.capabilities" :key="c"><span class="vf__caps-dot" />{{ c }}</li>
                </ul>
                <NuxtLink :to="p.to" class="px-btn px-btn--primary vf__cta">View Product</NuxtLink>
              </div>
              <div class="vf__card-visual"><ProductVisual :product="p" /></div>
            </article>
          </div>
        </div>
      </div>

      <div class="vf__dots">
        <button v-for="(p, i) in items" :key="p.name" type="button" class="vf__dot" :class="{ 'is-on': i === idx }" :aria-label="`Go to ${p.name}`" @click="go(i)" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.vf { padding: clamp(80px, 12vw, 140px) 24px; }
.vf__inner { max-width: 1200px; margin: 0 auto; }
.vf__head { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: 36px; }
.vf__title { margin: 0; font-size: clamp(28px, 4.4vw, 52px); line-height: 1.05; letter-spacing: -0.025em; color: var(--px-navy); font-weight: 500; }
.vf__title .px-serif { font-weight: 400; }
.vf__nav { display: flex; gap: 10px; }
.vf__arrow { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: 999px; background: #fff; color: var(--px-navy); border: 1px solid var(--px-line); cursor: pointer; transition: transform 0.25s ease, border-color 0.25s ease; }
.vf__arrow:hover { transform: translateY(-2px); border-color: rgba(16, 33, 74, 0.3); }

.vf__viewport { overflow: hidden; border-radius: 40px; }
.vf__track { display: flex; transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
.vf__slide { flex: 0 0 100%; min-width: 100%; }
.vf__card { display: grid; grid-template-columns: 1fr; gap: 28px; align-items: center; background: #fff; border-radius: 40px; padding: 32px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 0.5px rgba(16, 33, 74, 0.06); }
@media (min-width: 820px) { .vf__card { grid-template-columns: 1fr 1fr; gap: 48px; padding: 48px; } }
.vf__card-cap { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--px-blue); }
.vf__card-name { margin: 14px 0 0; font-size: clamp(28px, 3.4vw, 44px); letter-spacing: -0.02em; line-height: 1.02; color: var(--px-navy); font-weight: 500; }
.vf__card-desc { margin: 16px 0 0; font-size: 16px; line-height: 1.6; color: var(--px-ink); max-width: 44ch; }
.vf__caps { list-style: none; margin: 22px 0 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.vf__caps li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--px-navy); }
.vf__caps-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--px-blue); flex-shrink: 0; }
.vf__cta { margin-top: 28px; align-self: flex-start; }
.vf__card-visual { height: 300px; }
@media (min-width: 820px) { .vf__card-visual { height: 340px; } }

.vf__dots { display: flex; justify-content: center; gap: 8px; margin-top: 28px; }
.vf__dot { width: 8px; height: 8px; border-radius: 999px; border: none; background: rgba(16, 33, 74, 0.16); cursor: pointer; padding: 0; transition: width 0.3s ease, background 0.3s ease; }
.vf__dot.is-on { width: 26px; background: var(--px-navy); }

@media (prefers-reduced-motion: reduce) { .vf__track { transition: none; } }
</style>
