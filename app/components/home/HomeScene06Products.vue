<script setup lang="ts">
// Scene 6 — Products. The 9 products from utils/products.ts laid out as a
// clickable ecosystem. Each tile links to /products/<slug>.
import { PRODUCTS } from "~/utils/products";
import { ArrowRight } from "@lucide/vue";

function slug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}
</script>

<template>
  <section class="products" aria-labelledby="products-title">
    <div class="products__inner">
      <p class="section__number">06 · Products</p>
      <h2 id="products-title" class="section__title">
        Nine products.<br>
        One platform.
      </h2>
      <p class="section__lead">
        Each product is one capability made operational. Together they cover
        the full loop — from the field camera to the boardroom dashboard.
      </p>

      <ul class="products__grid" role="list">
        <li
          v-for="product in PRODUCTS"
          :key="product.name"
          class="product-card"
          data-reveal-item
        >
          <NuxtLink :to="`/products/${slug(product.name)}`" class="product-card__link">
            <span class="product-card__capability">{{ product.capability }}</span>
            <h3 class="product-card__name">{{ product.name }}</h3>
            <p class="product-card__copy">{{ product.copy }}</p>
            <span class="product-card__explore">
              Explore <ArrowRight :size="14" aria-hidden="true" />
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.products {
  min-height: 100svh;
  padding: 8rem 1.5rem;
  display: flex;
  align-items: center;
}
.products__inner {
  max-width: 72rem;
  margin: 0 auto;
  width: 100%;
}
.section__number {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  margin-bottom: 1.25rem;
}
.section__title {
  font-size: clamp(2.75rem, 7vw, 5.5rem);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: -0.035em;
  margin-bottom: 1.5rem;
}
.section__lead {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--color-muted-strong);
  max-width: 48rem;
  margin-bottom: 4rem;
}
.products__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.25rem;
}
@media (min-width: 640px)  { .products__grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .products__grid { grid-template-columns: repeat(3, 1fr); } }

.product-card {
  background: var(--color-card);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-card);
  transition: transform var(--duration-fast) ease, box-shadow var(--duration-fast) ease;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
.product-card__link {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 1.75rem 1.5rem;
  text-decoration: none;
  color: var(--color-primary);
  height: 100%;
}
.product-card__capability {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-accent);
}
.product-card__name {
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: -0.015em;
}
.product-card__copy {
  flex: 1;
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--color-muted-strong);
}
.product-card__explore {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-accent);
}

@media (max-width: 640px) {
  .products { padding: 6rem 1.25rem; }
}
</style>