<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Boot sequence — the logo assembling out of a particle cloud, once per session.
         NOT inside <ClientOnly>: a session cookie is read on the server so the overlay
         ships in the initial HTML and covers from first paint. Mounting it at hydration
         instead would flash the site, cover it, then reveal it again. -->
    <BootSequence />

    <!-- Scroll progress hairline. Pure CSS consumer of `--scroll-progress`, which
         scroll-motion.client.ts publishes from the site's single gsap.ticker. -->
    <ClientOnly>
      <ScrollProgress />
    </ClientOnly>

    <!-- SVARA Intelligence Core — independent floating AI overlay (z-index 9999),
         layered ABOVE the entire site. Client-only so motion-v / window listeners
         never run during SSR. Does not touch any existing page/layout. -->
    <ClientOnly>
      <SvaraChatbot />
    </ClientOnly>

    <!-- Cookie consent. NOT inside <ClientOnly>: the choice is decoded from the
         request cookie on the server, so the dock ships in the initial HTML —
         reachable by assistive tech on first paint, and present without JS. -->
    <SvaraConsent />
  </div>
</template>

<script setup lang="ts">
import BootSequence from '~/components/boot/BootSequence.vue'
import ScrollProgress from '~/components/scroll/ScrollProgress.vue'
import SvaraChatbot from '~/components/chatbot/SvaraChatbot.vue'
import SvaraConsent from '~/components/consent/SvaraConsent.vue'
// ENTITY ANCHOR — deliberately NOT emitted here. @nuxtjs/seo already publishes
// Organization + WebSite + WebPage in one @graph with stable @ids, configured
// from `schemaOrg.identity` in nuxt.config.ts. Emitting a second Organization
// from here gave two nodes the same @id with different contents, which consumers
// merge unpredictably. Page schemas reference `#organization` / `#website`.
// Smooth scroll is owned by the single Lenis instance in
// `app/plugins/lenis.client.ts` (driven by gsap.ticker, synced to
// ScrollTrigger). No smooth-scroll wiring is needed here. See
// [[Animation System]] / [[Motion Language]] in the Obsidian vault.
</script>

<style>
/* Global terminal styles are imported via terminal.client.ts plugin */
/* This file only provides app-level layout */

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Ensure NuxtLayout fills space */
.app > div {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>