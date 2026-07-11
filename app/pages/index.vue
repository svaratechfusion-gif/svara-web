<script setup lang="ts">
// Homepage — SVARA Content Bible, Volume 01, in the Bible's section order.
// 01 Hero · S01 Future · S02 Connected Ecosystem · S03 Ten Platforms
// (ecosystem overview + platform detail) · S04 Six Divisions · S05
// Industries · S06 Why SVARA · S07 Next Era · Final CTA · FAQ.
import HeroSection from '~/components/home/HeroSection.vue'
import ProblemSection from '~/components/home/ProblemSection.vue'
import SolutionSection from '~/components/home/SolutionSection.vue'
import EcosystemSection from '~/components/home/EcosystemSection.vue'
import ProductsSection from '~/components/home/ProductsSection.vue'
import TechnologySection from '~/components/home/TechnologySection.vue'
import IndustriesSection from '~/components/home/IndustriesSection.vue'
import TrustSection from '~/components/home/TrustSection.vue'
import NextEraSection from '~/components/home/NextEraSection.vue'
import CtaSection from '~/components/home/CtaSection.vue'
import FaqSection from '~/components/home/FaqSection.vue'
import { homeSeo, homeFaq } from '~~/lib/content/home'
import { SITE_URL, ORGANIZATION_NAME, DEFAULT_LOGO } from '~~/lib/seo/site'

// ---- Page SEO (verbatim from the Content Bible) ----
useSeoMeta({
  title: homeSeo.title,
  description: homeSeo.description,
  keywords: [...homeSeo.primaryKeywords, ...homeSeo.secondaryKeywords, ...homeSeo.longTailKeywords].join(', '),
  ogTitle: homeSeo.title,
  ogDescription: homeSeo.description,
  ogType: 'website',
  ogUrl: homeSeo.canonical,
  ogImage: homeSeo.ogImage,
  ogSiteName: ORGANIZATION_NAME,
  twitterCard: 'summary_large_image',
  twitterTitle: homeSeo.title,
  twitterDescription: homeSeo.description,
  twitterImage: homeSeo.ogImage,
  robots: 'index, follow',
})

// ---- Structured data: Organization · WebSite · FAQPage ----
useHead({
  link: [{ rel: 'canonical', href: homeSeo.canonical }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: ORGANIZATION_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}${DEFAULT_LOGO}`,
        description: homeSeo.description,
        sameAs: [
          'https://www.linkedin.com/company/svaratechfusion',
          'https://github.com/svaratechfusion',
        ],
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: ORGANIZATION_NAME,
        url: SITE_URL,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: homeFaq.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }),
    },
  ],
})
</script>

<template>
  <div>
    <HeroSection />
    <ProblemSection />
    <SolutionSection />
    <EcosystemSection />
    <ProductsSection />
    <TechnologySection />
    <IndustriesSection />
    <TrustSection />
    <NextEraSection />
    <CtaSection />
    <FaqSection />
  </div>
</template>
