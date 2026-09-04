<script setup lang="ts">
/**
 * WHERE TO GO NEXT — the Content Bible's own related destinations, then the one
 * primary action. The reference allows a single filled iris CTA per screen and
 * this is it; everything above uses white or ghost pills.
 *
 * The closing film that bookends the hero's is the BAND's ground, not this
 * section's — see AxBand. Mounted here it would stop at the text column.
 */
import { companyContent } from '~~/lib/content/company'

const links = companyContent.relatedProducts
</script>

<template>
  <div>
    <div class="abx__head">
      <p class="abx__eyebrow">Next</p>
      <h2 class="abx__h2">Read further.</h2>
    </div>

    <ul class="abx__links">
      <li v-for="link in links" :key="link.url">
        <NuxtLink :to="link.url" class="abx__link">
          <span>
            <strong style="display: block; font-weight: 500; margin-bottom: 4px">{{ link.name }}</strong>
            <span class="abx__body">{{ link.description }}</span>
          </span>
          <span class="abx__link-arrow" aria-hidden="true">&#8594;</span>
        </NuxtLink>
      </li>
    </ul>

    <div class="abx__actions" style="margin-top: 48px">
      <NuxtLink to="/contact" class="abx__btn">
        Talk to SVARA <span aria-hidden="true">&#8594;</span>
      </NuxtLink>
      <NuxtLink to="/ecosystem" class="abx__btn abx__btn--ghost">Explore the ecosystem</NuxtLink>
    </div>
  </div>
</template>
