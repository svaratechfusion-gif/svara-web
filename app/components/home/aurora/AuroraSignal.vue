<script setup lang="ts">
// THE ACTIVITY ROW — Harness's git-feed component, honestly repurposed.
//
// The reference row is "avatar + commit message + metadata + status dot". A marketing
// page has no commits, and inventing a feed of them would be fabricating records — so
// the rows are the Intelligence Loop's own stages, the same six SVARA publishes, each
// with the workflow stage it sits at as its metadata and a Phosphor Mint dot.
//
// It scrubs with scroll: the dot lights stage by stage, so the panel performs the
// signal path it describes instead of listing it.
import { ref, computed } from 'vue'
import { OUTCOMES, WORKFLOW_STAGES } from '~/utils/industries-page'
import { useScrollScrub } from '~/composables/useScrollScrub'

const rows = computed(() =>
  OUTCOMES.map((name, i) => ({
    n: String(i + 1).padStart(2, '0'),
    name,
    meta: WORKFLOW_STAGES[Math.min(i, WORKFLOW_STAGES.length - 1)],
  })),
)

const panel = ref<HTMLElement | null>(null)
const { progress } = useScrollScrub(panel, { start: 'top 82%', end: 'bottom 64%' })
const reached = computed(() => progress.value * rows.value.length)
</script>

<template>
  <section class="au-signal hx-section" aria-labelledby="au-signal-t">
    <div class="hx-container au-signal__grid">
      <header class="au-head au-head--left">
        <p class="au-eyebrow">The signal path</p>
        <h2 id="au-signal-t" class="au-display au-display--sm">Every environment runs the same loop.</h2>
        <p class="au-body">
          Physical and digital inputs resolve — stage by stage — into enterprise and
          physical action. The same six steps, whatever the environment.
        </p>
        <div class="au-actions">
          <NuxtLink to="/architecture" class="au-pill au-pill--fill">See the architecture</NuxtLink>
          <NuxtLink to="/technology" class="au-pill au-pill--ghost">Explore the technology</NuxtLink>
        </div>
      </header>

      <div ref="panel" class="au-card au-card--feed">
        <div class="au-feed__head">
          <span class="au-feed__title">Intelligence Loop</span>
          <span class="au-badge au-badge--ok">{{ rows.length }} stages</span>
        </div>
        <ol class="au-feed">
          <li
            v-for="(r, i) in rows" :key="r.name"
            class="au-feed__row"
            :class="{ 'is-on': reached > i }"
          >
            <span class="au-feed__avatar" aria-hidden="true">{{ r.n }}</span>
            <span class="au-feed__msg">{{ r.name }}</span>
            <span class="au-feed__meta">{{ r.meta }}</span>
            <span class="au-feed__dot" aria-hidden="true" />
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
