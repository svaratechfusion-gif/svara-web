<script setup lang="ts">
// PRODUCTS · PRODUCT SHOWCASE — replaces the reference projects section. A vertical
// stack where each product occupies one large showcase: a floating product label,
// serif-accent name + editorial description, and a large product visualization.
// Each item fades in on scroll (v-reveal / IntersectionObserver). Anchors the
// hero's "Explore Products" scroll (#px-showcase).
import { PX_SHOWCASE } from '~/utils/px-products'
import ProductVisual from '~/components/products/vo/ProductVisual.vue'
</script>

<template>
  <section id="px-showcase" class="vsh">
    <div class="vsh__inner">
      <header v-reveal class="vsh__head">
        <p class="vsh__eyebrow px-mono">Product Showcase</p>
        <h2 class="vsh__title">Built to solve. <span class="px-serif">Engineered to connect.</span></h2>
      </header>

      <div class="vsh__stack">
        <article v-for="(p, i) in PX_SHOWCASE" :key="p.name" v-reveal class="vsh__item">
          <div class="vsh__text">
            <span class="vsh__num px-mono">{{ String(i + 1).padStart(2, '0') }}</span>
            <div>
              <span class="vsh__label px-mono">{{ p.capability }} · SVARA Product</span>
              <h3 class="vsh__name px-serif">{{ p.name }}</h3>
              <p class="vsh__desc">{{ p.long }}</p>
            </div>
          </div>
          <div class="vsh__visual">
            <span class="vsh__float">{{ p.name }}</span>
            <div class="vsh__visual-inner"><ProductVisual :product="p" /></div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vsh { padding: clamp(64px, 9vw, 100px) 24px; }
.vsh__inner { max-width: 1200px; margin: 0 auto; }
.vsh__head { margin-bottom: clamp(48px, 6vw, 80px); }
.vsh__eyebrow { margin: 0 0 14px; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--px-muted); }
.vsh__title { margin: 0; font-size: clamp(28px, 4vw, 48px); line-height: 1.06; letter-spacing: -0.025em; color: var(--px-navy); font-weight: 500; }
.vsh__title .px-serif { font-weight: 400; }

.vsh__stack { display: flex; flex-direction: column; gap: clamp(64px, 9vw, 112px); }
.vsh__item { display: flex; flex-direction: column; gap: 28px; }

.vsh__text { display: grid; grid-template-columns: auto 1fr; gap: 20px; padding-left: clamp(0px, 6vw, 96px); }
.vsh__num { font-size: 13px; color: var(--px-blue); padding-top: 6px; }
.vsh__label { display: block; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--px-muted); }
.vsh__name { margin: 10px 0 0; font-size: clamp(30px, 4vw, 48px); font-weight: 400; letter-spacing: -0.01em; line-height: 1; color: var(--px-navy); }
.vsh__desc { margin: 16px 0 0; max-width: 60ch; font-size: clamp(15px, 1.5vw, 18px); line-height: 1.6; color: var(--px-ink); }

.vsh__visual { position: relative; }
.vsh__float { position: absolute; top: -14px; left: 24px; z-index: 2; font-size: 12px; font-weight: 600; color: var(--px-navy); padding: 8px 16px; border-radius: 999px; background: #fff; box-shadow: 0 0 0 0.5px rgba(16, 33, 74, 0.08), 0 6px 20px rgba(16, 33, 74, 0.12); }
.vsh__visual-inner { height: clamp(320px, 44vw, 520px); border-radius: 24px; overflow: hidden; box-shadow: 0 30px 70px -34px rgba(16, 33, 74, 0.4); }

@media (max-width: 640px) { .vsh__text { grid-template-columns: 1fr; gap: 8px; } .vsh__num { display: none; } }
</style>
