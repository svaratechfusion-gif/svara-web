<script setup lang="ts">
/**
 * WHERE IT RUNS — the Content Bible's five named industries, each a real route.
 *
 * The ember bleed sits on the LAST card of the top row, so it spills off the
 * grid's right edge and reads as light entering the frame. On an inner card the
 * same bloom lands mid-composition, over body copy, and reads as a smudge.
 */
import { companyContent } from '~~/lib/content/company'

const industries = companyContent.industries
</script>

<template>
  <div>
    <div class="abx__head">
      <p class="abx__eyebrow">Where it runs</p>
      <h2 class="abx__h2">Operations complex enough to need it.</h2>
    </div>

    <div class="abx__grid abx__grid--3">
      <NuxtLink
        v-for="(industry, i) in industries" :key="industry.name"
        :to="industry.url" class="abx__card"
        :class="{ 'abx__card--glow': i === 2 }"
      >
        <span class="abx__card-n">{{ String(i + 1).padStart(2, '0') }}</span>
        <h3 class="abx__h3">{{ industry.name }}</h3>
        <p class="abx__body">{{ industry.description }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
