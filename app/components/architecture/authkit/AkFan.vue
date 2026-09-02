<script setup lang="ts">
// THE OVERLAPPING FAN — the reference's signature composition.
//
// "Three floating glass cards layered behind/below in an overlapping fan (left card
// tilted left, center card scaled largest, right card tilted right)." In the source
// these are auth forms; here each plate is an architecture console showing what a
// layer takes in, what it gives back and what it powers — rendered with the design's
// inset field wells and its neutral pill action.
//
// The fan is decorative composition, not content: the same eight layers are listed in
// full, unstacked and readable, in the section below. So the plates are aria-hidden
// and the section carries its own text alternative.
import AkHead from './AkHead.vue'
import { AK_LAYERS, AK_REFERENCE } from '~~/lib/architecture/authkit'

// Perception at the bottom of the stack, Cognition in the middle, Experience at the
// top — the three the architecture is usually explained through.
const fan = [
  { ...AK_LAYERS.find(l => l.name === 'Edge & Perception')!, pos: 'l' },
  { ...AK_LAYERS.find(l => l.name === 'Cognition')!, pos: 'c' },
  { ...AK_LAYERS.find(l => l.name === 'Experience')!, pos: 'r' },
]
</script>

<template>
  <section class="ak-section ak-fanwrap">
    <div class="ak-wrap">
      <AkHead :eyebrow="AK_REFERENCE.eyebrow" :headline="AK_REFERENCE.headline" :body="AK_REFERENCE.body" />

      <div class="ak-fan" aria-hidden="true">
        <article v-for="c in fan" :key="c.n" class="ak-fan__card" :class="`ak-fan__card--${c.pos}`">
          <header class="ak-fan__head">
            <span class="ak-fan__n">Layer {{ c.n }}</span>
            <h3 class="ak-fan__name">{{ c.name }}</h3>
            <p class="ak-fan__role">{{ c.role }}</p>
          </header>

          <!-- the reference's inset field well, used here to hold the layer's I/O -->
          <div class="ak-field"><span class="ak-field__l">Input</span><span class="ak-field__v">{{ c.input }}</span></div>
          <div class="ak-field"><span class="ak-field__l">Output</span><span class="ak-field__v">{{ c.output }}</span></div>

          <span class="ak-fan__action">{{ c.products.length ? c.products[0] : 'Signals into the stack' }}</span>

          <p class="ak-fan__or"><span>components</span></p>
          <ul class="ak-tags ak-fan__tags">
            <li v-for="i in c.items.slice(0, 4)" :key="i" class="ak-tag">{{ i }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
