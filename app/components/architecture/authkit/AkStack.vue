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
import { ref, computed } from 'vue'
import { AK_REFERENCE, AK_LAYERS } from '~~/lib/architecture/authkit'
import { useScrollScrub } from '~/composables/useScrollScrub'
import AkHead from './AkHead.vue'

// MOTION: the eight plates resolve in order as the stack scrolls — the plate the
// scroll has reached carries the lit edge, the ones behind it stay resolved.
const list = ref<HTMLElement | null>(null)
const { progress } = useScrollScrub(list, { start: 'top 76%', end: 'bottom 70%' })
const reached = computed(() => progress.value * AK_LAYERS.length)
</script>

<template>
  <section class="ak-section ak-stack">
    <div class="ak-wrap">
      <AkHead :eyebrow="AK_REFERENCE.eyebrow" :headline="AK_REFERENCE.headline" :body="AK_REFERENCE.body" />

      <ol ref="list" class="ak-stack__list">
        <li
          v-for="(l, i) in AK_LAYERS" :key="l.n"
          class="ak-plate"
          :class="{ 'is-resolved': reached > i, 'is-active': Math.floor(reached) === i }"
        >
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
            <li v-for="item in l.items" :key="item" class="ak-tag">{{ item }}</li>
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
