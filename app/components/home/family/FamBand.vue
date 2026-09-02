<script setup lang="ts">
// THE STORYBOOK SPREAD — the reference's signature composition.
//
// "Hero is a three-column composition: left illustration cluster, centred
// headline+subtitle+CTA stack, right illustration cluster." The page's own hero is the
// particle head and is untouched, so this runs as the first content beat beneath it —
// the same composition, with the dark action card as the left-column anchor of the
// grid below, exactly as the reference arranges its 'Explore' section.
//
// Copy is SVARA's. The two pill variants are the reference's only two: the dark pill
// and the sand pill.
import FamIllustration from './FamIllustration.vue'
import FamActionCard from './FamActionCard.vue'
import FamBadge from './FamBadge.vue'

const features = [
  { title: 'Sense', body: 'Cameras, drones, sensors and enterprise systems become one structured, real-time signal.', link: 'Explore Vision AI', to: '/products/vision-ai' },
  { title: 'Reason', body: 'Models, enterprise knowledge and live context resolve into decisions a business can act on.', link: 'Explore Cognitive AI', to: '/products' },
  { title: 'Act', body: 'Agents and workflows carry decisions into real operations — beyond dashboards, into systems.', link: 'Explore AI Agents', to: '/products/ai-agents' },
]
</script>

<template>
  <section class="fam hx-section" aria-labelledby="fam-title">
    <div class="fam__wrap">
      <!-- three-column spread: cluster · centred stack · cluster -->
      <div class="fam__spread">
        <FamIllustration side="l" />

        <div class="fam__stack">
          <p class="fam__eyebrow">The intelligence layer</p>
          <h2 id="fam-title" class="fam__display">One system that senses, reasons and acts.</h2>
          <p class="fam__lead">
            SVARA connects the physical and digital world into a single intelligence
            layer — so what your systems see becomes what your business does.
          </p>
          <div class="fam__ctas">
            <NuxtLink to="/products" class="fam-pill fam-pill--dark">Explore the stack</NuxtLink>
            <NuxtLink to="/architecture" class="fam-pill fam-pill--sand">See the architecture</NuxtLink>
          </div>
        </div>

        <FamIllustration side="r" />
      </div>

      <!-- the grid: dark action card as the left anchor, hairline cards beside it -->
      <div class="fam__grid">
        <div class="fam__anchor">
          <div class="fam-tag">
            <span class="fam-tag__l">Flagship systems</span>
            <FamBadge tone="live">Production ready</FamBadge>
          </div>
          <FamActionCard />
        </div>

        <article v-for="f in features" :key="f.title" class="fam-card">
          <h3 class="fam-card__title">{{ f.title }}</h3>
          <p class="fam-card__body">{{ f.body }}</p>
          <NuxtLink :to="f.to" class="fam-demo">{{ f.link }}</NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>
