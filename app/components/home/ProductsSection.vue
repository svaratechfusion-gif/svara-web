<script setup lang="ts">
// 05 PRODUCTS — full-width alternating rows (image ⇄ text). No cards.
// Each product occupies nearly one viewport: large title, short
// description, glass illustration, technical specifications. Scroll reveal.
import GlassImage from '~/components/glass/GlassImage.vue'

interface Product {
  name: string
  copy: string
  img: string
  to: string
  specs: { k: string, v: string }[]
}

const products: Product[] = [
  {
    name: 'Vision AI',
    copy: 'Real-time visual intelligence across cameras and sensors — detection, tracking, and understanding at the edge of your operations.',
    img: '/images/home/prod-cctv_system.jpg', to: '/products/vision-ai',
    specs: [{ k: 'Latency', v: '<40 ms' }, { k: 'Streams', v: '1000+ concurrent' }, { k: 'Deploy', v: 'Edge · Cloud' }],
  },
  {
    name: 'Drone AI',
    copy: 'Autonomous aerial inspection and mapping for infrastructure, agriculture, and industrial sites.',
    img: '/images/home/prod-drone_system.jpg', to: '/products/drone-ai',
    specs: [{ k: 'Coverage', v: 'Autonomous BVLOS' }, { k: 'Output', v: '3D maps · defects' }, { k: 'Fleet', v: 'Multi-drone' }],
  },
  {
    name: 'Edge AI',
    copy: 'Inference at the source, without the round trip. Millisecond decisions where the data is born.',
    img: '/images/home/prod-iot_sensors.jpg', to: '/products/edge-ai',
    specs: [{ k: 'Inference', v: 'On-device' }, { k: 'Uplink', v: 'Offline-tolerant' }, { k: 'Footprint', v: 'ARM · x86 · GPU' }],
  },
  {
    name: 'Digital Twin',
    copy: 'Simulate before you change it. A live model of your operation that predicts outcomes and de-risks every decision.',
    img: '/images/home/mod-predictive_analytics.jpg', to: '/products/digital-twin',
    specs: [{ k: 'Model', v: 'Real-time sync' }, { k: 'Sim', v: 'What-if scenarios' }, { k: 'Horizon', v: 'Predictive' }],
  },
  {
    name: 'AI Agents',
    copy: 'Autonomous workflows that act, not just answer — coordinated across every enterprise system with human oversight.',
    img: '/images/home/prod-crm_dashboard.jpg', to: '/products/ai-agents',
    specs: [{ k: 'Action', v: 'Closed-loop' }, { k: 'Reach', v: 'Cross-system' }, { k: 'Control', v: 'Human-in-loop' }],
  },
  {
    name: 'Business Cloud',
    copy: 'One data plane across every enterprise system. The connective tissue of operational intelligence.',
    img: '/images/home/prod-erp_dashboard.jpg', to: '/products/business-cloud',
    specs: [{ k: 'Data plane', v: 'Unified' }, { k: 'Connectors', v: 'ERP · CRM · IoT' }, { k: 'Security', v: 'Enterprise-grade' }],
  },
  {
    name: 'Digital Engineering',
    copy: 'We build and integrate the intelligence layer into your existing landscape — architecture, deployment, and evolution.',
    img: '/images/home/mod-automation_engine.jpg', to: '/platform',
    specs: [{ k: 'Scope', v: 'Build · Integrate' }, { k: 'Model', v: 'Co-engineered' }, { k: 'Lifecycle', v: 'Continuous' }],
  },
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
        <dl class="products__specs">
          <div v-for="s in p.specs" :key="s.k" class="products__spec">
            <dt class="mono">{{ s.k }}</dt>
            <dd>{{ s.v }}</dd>
          </div>
        </dl>
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
  min-height: 84vh;
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: var(--gap-section);
  align-items: center;
  box-sizing: border-box;
}
.products__row--flip .products__media { order: 2; }
.products__row--flip .products__copy { order: 1; }

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

/* technical specifications */
.products__specs {
  margin: 0 0 var(--space-10);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-8);
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-6);
}
.products__spec { display: flex; flex-direction: column; gap: 2px; }
.products__spec dt {
  font-family: var(--font-mono);
  font-size: var(--type-label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-text-faint);
}
.products__spec dd {
  margin: 0;
  font-size: var(--type-small);
  font-weight: var(--weight-medium);
  color: var(--color-text);
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
