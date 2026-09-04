<script setup lang="ts">
/**
 * HOW AN ENGAGEMENT RUNS — the Content Bible's six deployment steps, split at
 * the em dash so the stage name can lead and its description follow. Nothing is
 * rewritten; the split is presentational.
 */
import { computed } from 'vue'
import { companyContent } from '~~/lib/content/company'

const steps = computed(() =>
  companyContent.deployment.steps.map((line, i) => {
    const [name, ...rest] = line.split(' — ')
    return { n: String(i + 1).padStart(2, '0'), name: name!.trim(), body: rest.join(' — ').trim() }
  }),
)
</script>

<template>
  <div>
    <div class="abx__head">
      <p class="abx__eyebrow">How we engage</p>
      <h2 class="abx__h2">A pilot first, then the enterprise.</h2>
      <p class="abx__lede">{{ companyContent.deployment.overview }}</p>
    </div>

    <div class="abx__steps">
      <article v-for="step in steps" :key="step.name" class="abx__step">
        <span class="abx__step-n">{{ step.n }}</span>
        <div>
          <h3 class="abx__step-t">{{ step.name }}</h3>
          <p class="abx__step-b">{{ step.body }}</p>
        </div>
      </article>
    </div>
  </div>
</template>
