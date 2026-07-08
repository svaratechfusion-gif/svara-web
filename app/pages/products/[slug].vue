<script setup lang="ts">
import { PRODUCTS } from "~/utils/products";
import { ArrowLeft } from "@lucide/vue";

const route = useRoute();
const slug = route.params.slug as string;

const product = PRODUCTS.find(
  (p) => p.name.toLowerCase().replace(/\s+/g, "-") === slug
);

if (!product) {
  throw createError({ statusCode: 404, message: "Product not found" });
}

useSeoMeta({
  title: `SVARA TechFusion — ${product.name}`,
  description: product.copy,
});
</script>

<template>
  <div class="page-product-detail">
    <section class="section-hero">
      <NuxtLink to="/products" class="link-explore mb-4">
        <ArrowLeft :size="16" />
        All Products
      </NuxtLink>
      <h1 class="text-hero">{{ product?.name }}</h1>
      <p class="text-body mt-6 max-w-2xl">{{ product?.copy }}</p>
    </section>

    <section class="section-content">
      <div class="card-glass max-w-3xl">
        <p class="text-body" style="color: var(--color-muted)">
          Knowledge Hub content for {{ product?.name }}.
        </p>
      </div>
    </section>
  </div>
</template>


