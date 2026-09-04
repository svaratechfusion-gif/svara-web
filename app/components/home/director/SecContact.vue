<script setup lang="ts">
/**
 * THE CLOSE — the reference's white panel, set to `mix-blend-mode: screen` so
 * the page bleeds through it rather than punching a hole in the dark: the
 * humanoid's final chapter resolves through the letterforms. It is the whole
 * section; the site's shared footer follows and carries the real contact
 * channels, legal and sitemap links.
 */
import { ref } from 'vue'
import { dxContact } from '~~/lib/content/home-view'
import ScrambleText from '~/components/home/director/ScrambleText.vue'
import RevealBox from '~/components/home/director/RevealBox.vue'
import { useInViewOnce } from '~/composables/useInViewOnce'

const root = ref<HTMLElement | null>(null)
const { inView } = useInViewOnce(root, 0.3)
</script>

<template>
  <section id="contact" ref="root" class="dx-section dxk" aria-labelledby="dxk-h">
    <RevealBox variant="panel" class="dxk__panel">
      <h2 id="dxk-h" class="dxk__title">
        <ScrambleText :text="dxContact.title" :play="inView" />
      </h2>
      <p class="dxk__sub">{{ dxContact.description }}</p>
      <div class="dxk__actions">
        <NuxtLink class="dx-btn" :to="dxContact.primaryCta.to">{{ dxContact.primaryCta.label }}</NuxtLink>
        <NuxtLink class="dx-btn dx-btn--ghost" :to="dxContact.secondaryCta.to">{{ dxContact.secondaryCta.label }}</NuxtLink>
      </div>
    </RevealBox>
  </section>
</template>
