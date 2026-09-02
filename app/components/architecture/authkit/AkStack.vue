<script setup lang="ts">
// THE REFERENCE STACK — the design's signature composition: floating glass plates.
//
// In the source these are auth-form cards fanned behind the hero; here the eight
// architecture layers are the plates. Each is a Deep Glass surface with the three-layer
// shadow stack (inset frost top, inset inner glow, dark drop), carrying the layer's
// role, what it takes in, what it gives back, and the products it powers as badges.
//
// Hovering lifts a plate out of the stack — the same "these are physical objects"
// reading the source design gets from its overlapping fan.
import { AK_REFERENCE, AK_LAYERS } from '~~/lib/architecture/authkit'
import AkHead from './AkHead.vue'
</script>

<template>
  <section class="ak-section ak-stack">
    <div class="ak-wrap">
      <AkHead :eyebrow="AK_REFERENCE.eyebrow" :headline="AK_REFERENCE.headline" :body="AK_REFERENCE.body" />

      <ol class="ak-stack__list">
        <li v-for="l in AK_LAYERS" :key="l.n" class="ak-plate">
          <div class="ak-plate__head">
            <span class="ak-plate__n">Layer {{ l.n }}</span>
            <h3 class="ak-plate__name">{{ l.name }}</h3>
            <p class="ak-plate__role">{{ l.role }}</p>
          </div>

          <dl class="ak-plate__io">
            <div><dt>Input</dt><dd>{{ l.input }}</dd></div>
            <div><dt>Output</dt><dd>{{ l.output }}</dd></div>
          </dl>

          <ul class="ak-tags ak-plate__items">
            <li v-for="i in l.items" :key="i" class="ak-tag">{{ i }}</li>
          </ul>

          <p v-if="l.products.length" class="ak-plate__products">
            <span class="ak-plate__products-l">Powers</span>
            <span>{{ l.products.join(' · ') }}</span>
          </p>
        </li>
      </ol>
    </div>
  </section>
</template>
