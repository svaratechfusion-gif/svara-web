<script setup lang="ts">
// The eight-stage flow as the design's icon-tile timeline: circular frosted tiles
// joined by a single hairline, each with a line-art glyph and a label beneath.
import AkIcon from './AkIcon.vue'
import AkHead from './AkHead.vue'
import { AK_STATEMENT, AK_FLOW, AK_CROSS } from '~~/lib/architecture/authkit'
</script>

<template>
  <section class="ak-section ak-flow">
    <div class="ak-wrap">
      <AkHead :eyebrow="AK_STATEMENT.eyebrow" :headline="AK_STATEMENT.headline" :body="AK_STATEMENT.body" />

      <ol class="ak-flow__row">
        <li v-for="s in AK_FLOW" :key="s.n" class="ak-flow__item">
          <AkIcon :glyph="s.icon" />
          <span class="ak-flow__label">{{ s.name }}</span>
          <span class="ak-flow__n">{{ s.n }}</span>
        </li>
      </ol>

      <div class="ak-cross">
        <span class="ak-cross__label">Cross-cutting</span>
        <ul class="ak-tags">
          <li v-for="c in AK_CROSS" :key="c" class="ak-tag">{{ c }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
