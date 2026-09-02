<script setup lang="ts">
// STRIDE — the six body sections of the Stride design, in order, as one block.
//
// Mounted on /products AFTER the pinned product film and BEFORE the finale, so the
// film plays out and this scrolls up over it (see ProductExperience.vue).
//
// The four sections omitted from the source design are omitted on purpose, not by
// oversight: its fixed site nav, its white preloader, its contact form and its footer
// all already exist on this site (GlobalNavigation, BootSequence, /contact, Footer),
// and a second copy of each would fight the originals for the same corners of the page.
//
// `.stride` carries the block's own root-size and colour tokens — see styles/stride.css
// for why it cannot inherit the site's 12px root.
//
// `id="stride"` makes the block directly addressable at /products#stride. The pinned
// film in front of it is 1950vh, so without an anchor the only way to reach this is to
// scroll roughly twenty screens.
import StrideLogoMarquee from './StrideLogoMarquee.vue'
import StrideAbout from './StrideAbout.vue'
import StrideStats from './StrideStats.vue'
import StrideShowcase from './StrideShowcase.vue'
import StrideWorks from './StrideWorks.vue'
import StrideChainProduct from './StrideChainProduct.vue'
</script>

<template>
  <div id="stride" class="stride">
    <StrideLogoMarquee />
    <StrideAbout />
    <StrideStats />
    <StrideShowcase />
    <StrideWorks />
    <StrideChainProduct />
  </div>
</template>
