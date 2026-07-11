<script setup lang="ts">
import { PRODUCTS } from "~/utils/products"
import { ArrowRight } from "@lucide/vue"
import { useStructuredData } from "~/composables/useStructuredData"
import { SITE_URL } from "~~/lib/seo/site"

useSeoMeta({
  title: "Products | SVARA — Enterprise Intelligence Infrastructure",
  description:
    "SVARA's product ecosystem spans Vision AI, Drone AI, Edge AI, AI Agents, Digital Twin, Business Cloud, AI OS, Command Center, and Growth Intelligence. Each product is a capability within the Intelligence Loop.",
})

useStructuredData({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SVARA Products",
  description: "Nine products that deliver the Intelligence Loop across enterprise operations.",
  hasPart: PRODUCTS.map((p) => ({
    "@type": "Product",
    name: p.name,
    description: p.copy,
    url: `${SITE_URL}/products/${p.name.toLowerCase().replace(/\s+/g, "-")}`,
  })),
})
</script>

<template>
  <div class="page-products">
    <section class="kp-section bg-white">
      <div class="kp-container">
        <span class="kp-number">SVARA</span>
        <h1 class="kp-headline">Products</h1>
        <p class="kp-definition">
          Capabilities, not features. Every SVARA product is a layer of intelligence within the Intelligence Loop. Nine products across five capabilities — Observe, Understand, Predict, Coordinate, and Improve — working as one continuous system.
        </p>
      </div>
    </section>

    <section class="kp-section bg-gray-50">
      <div class="kp-container">
        <div v-for="product in PRODUCTS" :key="product.name" class="kp-card mb-4">
          <div class="product-card-inner">
            <span class="product-capability">{{ product.capability }}</span>
            <h2 class="kp-card-title">{{ product.name }}</h2>
            <p class="kp-card-body">{{ product.copy }}</p>
            <NuxtLink :to="`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`" class="kp-link mt-3">
              Explore {{ product.name }} <ArrowRight :size="14" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-products {
  --kp-max-w: 48rem;
}
.kp-section {
  padding: 6rem 1.5rem;
}
.kp-container {
  max-width: var(--kp-max-w);
  margin: 0 auto;
}
.kp-number {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
  display: block;
  margin-bottom: 0.5rem;
}
.kp-headline {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
}
.kp-definition {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-muted);
  max-width: 42rem;
}
.kp-card {
  background: var(--color-card);
  border: 1px solid var(--color-divider);
  border-radius: 0.75rem;
  padding: 1.5rem;
}
.kp-card-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}
.kp-card-body {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-muted);
}
.kp-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-accent);
  text-decoration: none;
}
.kp-link:hover {
  text-decoration: underline;
}
.product-card-inner {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.product-capability {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}
</style>
