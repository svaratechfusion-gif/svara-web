<script setup lang="ts">
// Scale, as five glass cards whose dot-fields grow — the architecture expanding from
// one device to a distributed network. The dots are the illustration; the design has
// no photography, so the diagram is drawn from the system's own primitives.
import AkHead from './AkHead.vue'
import { AK_SCALE } from '~~/lib/architecture/authkit'
</script>

<template>
  <section class="ak-section ak-scale">
    <div class="ak-wrap">
      <AkHead :eyebrow="AK_SCALE.eyebrow" :headline="AK_SCALE.headline" :body="AK_SCALE.body" />

      <ol class="ak-scale__row">
        <li v-for="s in AK_SCALE.stages" :key="s.n" class="ak-card ak-scale__card">
          <span class="ak-scale__n">{{ s.n }}</span>
          <span class="ak-scale__dots" aria-hidden="true">
            <i v-for="d in s.dots" :key="d" />
          </span>
          <span class="ak-scale__label">{{ s.label }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>
