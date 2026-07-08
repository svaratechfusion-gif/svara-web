<script setup lang="ts">
import { PRODUCTS } from "~/utils/products";
import { ArrowRight } from "@lucide/vue";

useSeoMeta({
  title: "SVARA TechFusion — Products",
  description:
    "SVARA's product ecosystem spans Vision AI, Drone AI, Digital Twin, AI Agents, Edge AI, Generative AI, and Business Cloud. Each product is a capability within the intelligence infrastructure layer.",
});
</script>

<template>
  <div class="page-products">
    <section class="section-hero">
      <h1 class="text-hero">Products</h1>
      <p class="text-body mt-6 max-w-2xl">
        Capabilities, not features. Every product is a layer of intelligence.
      </p>
    </section>

    <section class="section-content">
      <div v-for="product in PRODUCTS" :key="product.name" class="card-glass mb-6 max-w-3xl">
        <h3 class="text-h3">{{ product.name }}</h3>
        <p class="text-body mt-2">{{ product.copy }}</p>
        <NuxtLink :to="`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`" class="link-explore mt-4">
          Explore {{ product.name }}
          <ArrowRight :size="16" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>


