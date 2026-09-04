<script setup lang="ts">
/**
 * THE INTELLIGENCE LOOP — the company's core framework, on a light band.
 *
 * Five capabilities in one continuous run. The last step carries the ember
 * treatment rather than the iris, because Improve is where the loop closes and
 * feeds the other four — the warm accent is doing structural work, which is the
 * only way the reference allows it to be used.
 *
 * Layer names and descriptions are verbatim from lib/content/platform.ts.
 */
import { computed } from 'vue'
import { platformContent } from '~~/lib/content/platform'
import { companyContent } from '~~/lib/content/company'

const steps = computed(() =>
  platformContent.architecture.components.map((c, i) => ({
    n: String(i + 1).padStart(2, '0'),
    name: c.name.replace(/ Layer$/, ''),
    body: c.description,
  })),
)
</script>

<template>
  <div>
    <div class="abx__head">
      <p class="abx__eyebrow">The framework</p>
      <h2 class="abx__h2">Five capabilities, one continuous system.</h2>
      <p class="abx__lede">{{ companyContent.architecture.dataFlow }}</p>
    </div>

    <div class="abx__loop">
      <article v-for="step in steps" :key="step.name" class="abx__loop-step">
        <span class="abx__loop-n">{{ step.n }}</span>
        <h3 class="abx__h3">{{ step.name }}</h3>
        <p class="abx__body">{{ step.body }}</p>
      </article>
    </div>
  </div>
</template>
