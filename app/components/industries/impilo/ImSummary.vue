<script setup lang="ts">
// ARCHITECTURE SUMMARY LIST — the reference's "Billing Summary List": stacked rows
// inside a card, each a small 7px-radius icon container in Lilac Mist, a label in
// Pearl and a value in Cloud White.
//
// The rows are the environment's own architecture components, verbatim: the name is
// the value, its role is the label. No numbers are introduced.
import ImIcon from './ImIcon.vue'

defineProps<{ items: { name: string, description: string }[] }>()
const ICONS = ['eye', 'cpu', 'pulse', 'bolt', 'layers', 'target']
</script>

<template>
  <article class="im-summary">
    <header class="im-summary__head">
      <h4 class="im-summary__title">Architecture</h4>
      <span class="im-summary__count">{{ items.length }}</span>
    </header>
    <ul class="im-summary__rows">
      <li v-for="(it, i) in items" :key="it.name">
        <ImIcon :name="ICONS[i % ICONS.length]" boxed />
        <span class="im-summary__text">
          <span class="im-summary__v">{{ it.name }}</span>
          <span class="im-summary__l">{{ it.description }}</span>
        </span>
      </li>
    </ul>
  </article>
</template>
