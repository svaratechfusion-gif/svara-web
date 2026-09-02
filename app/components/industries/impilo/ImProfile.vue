<script setup lang="ts">
// ENVIRONMENT PROFILE CARD — the reference's "Patient Profile Card", in SVARA's
// terms: a branded mark, the subject's name, its identifier metadata, and
// icon-prefixed contact/detail lines. No border; it relies on tonal contrast.
//
// Every line is read from the content model — the slug, the loop stages the
// environment's own components resolve to, and how many products apply. Nothing
// is asserted about deployments or outcomes.
import ImIcon from './ImIcon.vue'

const props = defineProps<{
  name: string
  slug: string
  n: string
  caps: string[]
  stack: string[]
}>()

const rows = [
  { icon: 'layers', label: 'Architecture', value: () => `${props.caps.length} components` },
  { icon: 'cube', label: 'Applicable products', value: () => `${props.stack.length} platforms` },
  { icon: 'route', label: 'Reference', value: () => `/industries/${props.slug}` },
]
</script>

<template>
  <article class="im-profile">
    <span class="im-profile__mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
        <circle cx="12" cy="12" r="3.2" /><circle cx="12" cy="12" r="8.4" stroke-dasharray="3 4" />
      </svg>
    </span>
    <p class="im-profile__eyebrow">Environment profile</p>
    <h4 class="im-profile__name">{{ name }}</h4>
    <p class="im-profile__meta">ENV · {{ n }} / {{ slug.toUpperCase() }}</p>

    <ul class="im-profile__rows">
      <li v-for="r in rows" :key="r.label">
        <ImIcon :name="r.icon" boxed />
        <span class="im-profile__l">{{ r.label }}</span>
        <span class="im-profile__v">{{ r.value() }}</span>
      </li>
    </ul>
  </article>
</template>
