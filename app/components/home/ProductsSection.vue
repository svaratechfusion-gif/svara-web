<script setup lang="ts">
// 05 PRODUCTS — full-width alternating rows (image ⇄ text). No cards.
// Each row near full viewport height.
import GlassImage from '~/components/glass/GlassImage.vue'
const products = [
  { name: 'Vision AI', copy: 'Real-time visual intelligence across cameras and sensors — detection, tracking, and understanding at the edge of your operations.', img: '/images/home/prod-cctv_system.jpg', to: '/products/vision-ai' },
  { name: 'Drone AI', copy: 'Autonomous aerial inspection and mapping for infrastructure, agriculture, and industrial sites.', img: '/images/home/prod-drone_system.jpg', to: '/products/drone-ai' },
  { name: 'Edge AI', copy: 'Inference at the source, without the round trip. Millisecond decisions where the data is born.', img: '/images/home/prod-iot_sensors.jpg', to: '/products/edge-ai' },
  { name: 'AI Agents', copy: 'Autonomous workflows that act, not just answer — coordinated across every enterprise system.', img: '/images/home/prod-crm_dashboard.jpg', to: '/products/ai-agents' },
  { name: 'Business Cloud', copy: 'One data plane across every enterprise system. The connective tissue of operational intelligence.', img: '/images/home/prod-erp_dashboard.jpg', to: '/products/business-cloud' },
  { name: 'Command Center', copy: 'Centralized orchestration and control — the room where the whole enterprise becomes one system.', img: '/images/home/mod-unified_dashboard.jpg', to: '/products/command-center' },
]
</script>

<template>
  <section class="products">
    <div class="products__head" v-reveal>
      <p class="products__eyebrow">Products</p>
      <h2 class="products__title" data-split>Built as one system. Deployed as you need it.</h2>
    </div>

    <article v-for="(p, i) in products" :key="p.name" class="products__row" :class="{ 'products__row--flip': i % 2 === 1 }">
      <GlassImage
        class="products__media"
        data-mask-reveal
        data-parallax="4"
        :src="p.img"
        :alt="p.name"
        ratio="16/11"
      />
      <div v-reveal="{ delay: 0.08 }" class="products__copy">
        <h3 class="products__name">{{ p.name }}</h3>
        <p class="products__desc">{{ p.copy }}</p>
        <NuxtLink :to="p.to" class="products__link">Explore {{ p.name }} →</NuxtLink>
      </div>
    </article>
  </section>
</template>

<style scoped>
.products__head {
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--section-y) var(--container-pad) 0;
  box-sizing: border-box;
}
.products__eyebrow {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--color-accent);
}
.products__title {
  margin: 0;
  max-width: 20ch;
  font-size: clamp(34px, 4.4vw, 64px);
  font-weight: var(--weight-bold); line-height: 1.12; letter-spacing: -0.02em;
  color: var(--color-text); text-wrap: balance;
}

.products__row {
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--space-24) var(--container-pad);
  min-height: 82vh;
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: var(--gap-section);
  align-items: center;
  box-sizing: border-box;
}
.products__row--flip .products__media { order: 2; }
.products__row--flip .products__copy { order: 1; }

/* frame/reflections/shadow now come from GlassImage */
.products__media { width: 100%; }

.products__name {
  margin: 0 0 var(--space-6);
  font-size: clamp(30px, 3.4vw, 48px);
  font-weight: var(--weight-bold); letter-spacing: -0.02em;
  color: var(--color-text);
}
.products__desc {
  margin: 0 0 var(--space-8);
  max-width: 46ch;
  font-size: var(--type-body); line-height: var(--leading-body);
  color: var(--color-text-secondary);
}
.products__link {
  font-size: var(--type-small); font-weight: var(--weight-semibold);
  color: var(--color-accent); text-decoration: none;
}
.products__link:hover { text-decoration: underline; }
.products__link:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }

@media (max-width: 900px) {
  .products__row { grid-template-columns: 1fr; min-height: auto; gap: var(--space-10); padding-block: var(--space-16); }
  .products__row--flip .products__media { order: 0; }
  .products__row--flip .products__copy { order: 1; }
}
</style>
