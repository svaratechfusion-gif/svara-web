<script setup lang="ts">
// BLOG — "SVARA Intelligence Journal", rebuilt on the Phantom reference: a
// monochromatic violet world of soft pills on a near-white plane, alternating into
// deep aubergine.
//
// RETAINED, UNTOUCHED: the hero. Its fixed full-viewport video and its heading
// position (metadata + h1 top-left, description + actions right) are exactly as
// they were — only the two nav buttons were repointed at the rebuilt sections.
//
// The library is still shelved by PUBLICATION LINE — Blog, White Papers, Product
// Engineering, Architecture Series, Industry Reports, Technical Notes — from
// insightSections(), so a new piece lands in its section on publication and
// nothing here enumerates titles. Everything is real and linked.
//
// BAND RHYTHM. The reference treats light and aubergine as equally native and asks
// for alternation. The hero is a dark video, so the page opens dark (featured),
// breaks to paper, alternates paper/bone through the shelves, and closes dark —
// which also means the shared footer stays on its existing dark theme, over the
// same clip (sampled at luminance ~73 across all 14s, so it stays legible).
import { knowledgeHubContent } from '~~/lib/content/knowledge-hub'
import { INSIGHTS, insightSections, seriesNotes } from '~~/lib/content/insights'
import BlogHeroCinematic from '~/components/blog-page/BlogHeroCinematic.vue'
import PhxBand from '~/components/blog-page/phantom/PhxBand.vue'
import PhxFeatured from '~/components/blog-page/phantom/PhxFeatured.vue'
import PhxShelf from '~/components/blog-page/phantom/PhxShelf.vue'
import PhxCta from '~/components/blog-page/phantom/PhxCta.vue'

/** the retained hero clip — unchanged URL */
const HERO_VIDEO
  = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4'

const published = INSIGHTS
const sections = insightSections()

// The featured slot shows the newest published article when one exists, and only
// falls back to the knowledge-hub blurb while the journal is empty.
const featured = published[0]
  ? {
      category: published[0].contentType,
      title: published[0].title,
      dek: published[0].dek,
      to: `/insights/${published[0].slug}`,
      readingTime: published[0].readingTime,
      heroImage: published[0].heroImage,
    }
  : {
      category: 'Research',
      title: knowledgeHubContent.resources[0]!.title,
      dek: knowledgeHubContent.aiAnswerTarget.replace(/\*\*/g, ''),
      to: null,
      readingTime: null,
      heroImage: undefined,
    }

// N1..N4 come from seriesNotes() — the same source the note pages use — rather than
// from a loop index, so the two can never disagree.
const noteN = new Map(seriesNotes().map(n => [n.slug, n.n]))

/** paper / bone alternate down the shelves; the reference asks for the rhythm */
const shelfMode = (i: number): 'paper' | 'bone' => (i % 2 === 0 ? 'paper' : 'bone')

useSeoMeta({
  title: 'Insights | SVARA — The Intelligence Journal',
  description: knowledgeHubContent.canonicalDefinition,
})
</script>

<template>
  <div class="blog-page">
    <!-- RETAINED: fixed full-viewport hero video at site-background level, so it
         sits behind all content AND the transparent footer. The bands below are
         opaque, so it reads as the hero's own ground and returns at the footer. -->
    <video
      class="blog-page__bg"
      :src="HERO_VIDEO"
      autoplay muted loop playsinline preload="auto"
      aria-hidden="true"
    />

    <!-- RETAINED: the hero, its video and its heading position -->
    <BlogHeroCinematic />

    <div class="phx">
      <PhxBand id="featured" mode="dark"><PhxFeatured :featured="featured" /></PhxBand>

      <PhxBand
        v-for="(sec, si) in sections" :id="si === 0 ? 'journal' : undefined"
        :key="sec.line" :mode="shelfMode(si)"
      >
        <PhxShelf :section="sec" :index="si" :note-n="noteN" />
      </PhxBand>

      <PhxBand mode="dark"><PhxCta /></PhxBand>
    </div>
  </div>
</template>

<style scoped>
/* The video is the hero's ground and the footer's. Every Phantom band between them
   is opaque, so nothing else has to know about it. z-index:-1 is site-background
   level — behind the content and behind the shared footer, which is transparent. */
.blog-page { position: relative; }
.blog-page__bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
  background: #000; /* dark fallback before the video paints */
  pointer-events: none;
}
</style>
