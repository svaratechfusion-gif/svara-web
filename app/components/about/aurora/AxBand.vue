<script setup lang="ts">
/**
 * One band of the page. The reference's structural rhythm IS the alternation of
 * dark and light sections at a 96px gap, so the band — not the section — is the
 * unit, and it declares its mode outright. Blending the two inside one component
 * is the thing the reference forbids.
 *
 * It also carries the rise-on-scroll, so no section has to wire its own.
 *
 * A band may take a `film` — a clip laid across its FULL width as a ground. It
 * belongs here rather than in the section because the section renders inside the
 * max-width column: an absolute ground mounted there stops at the text measure
 * and its rectangle becomes visible against the band. The ground is the band's,
 * like the mode is.
 */
import { ref } from 'vue'
import { useInViewOnce } from '~/composables/useInViewOnce'
import AxVideo from './AxVideo.vue'

withDefaults(defineProps<{
  mode?: 'dark' | 'void' | 'light' | 'linen'
  /** clip URL laid across the whole band, behind the content */
  film?: string
}>(), { mode: 'dark' })

const root = ref<HTMLElement | null>(null)
const { inView } = useInViewOnce(root, 0.12)
</script>

<template>
  <section ref="root" class="abx__band" :class="`abx__band--${mode}`">
    <div v-if="film" class="abx__hero-film" aria-hidden="true">
      <AxVideo :src="film" />
    </div>

    <div class="abx__inner abx__rise" :class="{ 'is-in': inView }">
      <slot />
    </div>
  </section>
</template>
