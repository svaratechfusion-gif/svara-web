/**
 * SEO + schema for a long-form legal document.
 *
 * `useKnowledgeProduct` cannot be reused here — it renders and describes a
 * knowledge product (Architecture / Use Cases / ROI). This gives a legal page the
 * same machine-readable surface without that framing: meta tags, an Article node
 * carrying the AEO `abstract`, and a breadcrumb trail. Both reference the one
 * canonical Organization / WebSite pair emitted from nuxt.config's
 * `schemaOrg.identity` — nothing here emits a rival entity.
 */
import type { LegalDocument } from '~~/lib/types/legal'
import { generateArticleJsonLd, generateBreadcrumbJsonLd, generateFaqJsonLd } from '~~/lib/seo/jsonld'
import { generateMetaTags } from '~~/lib/seo/meta'
import { useStructuredData } from '~/composables/useStructuredData'
import { SITE_URL } from '~~/lib/seo/site'

export function useLegalDocument(doc: LegalDocument) {
  const route = useRoute()

  useSeoMeta(generateMetaTags({
    title: doc.seo.title,
    description: doc.seo.description,
    path: route.path,
    pageType: 'article',
  }))

  useStructuredData({
    ...generateArticleJsonLd({
      headline: doc.title,
      description: doc.seo.description,
      url: `${SITE_URL}${route.path}`,
      datePublished: doc.updated,
      dateModified: doc.updated,
      about: { name: doc.title, description: doc.summary },
    }),
    // the quotable answer for AI search, same property the product pages use
    abstract: doc.summary,
  } as Parameters<typeof useStructuredData>[0])

  if (doc.faqs?.length) {
    useStructuredData(generateFaqJsonLd(doc.faqs) as Parameters<typeof useStructuredData>[0])
  }

  useStructuredData(generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Legal', url: '/legal/privacy' },
    { name: doc.title, url: route.path },
  ]) as Parameters<typeof useStructuredData>[0])
}
