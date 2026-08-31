import type { KnowledgeProductContent } from "~~/lib/types/content"
import { generateBreadcrumbJsonLd, generateKnowledgeProductJsonLd, generateFaqJsonLd } from "~~/lib/seo/jsonld"
import { generateMetaTags } from "~~/lib/seo/meta"
import { useStructuredData } from "~/composables/useStructuredData"

export function useKnowledgeProduct(content: KnowledgeProductContent) {
  const { metadata } = content
  const route = useRoute()

  const metaTags = generateMetaTags({
    title: metadata.title,
    description: metadata.description,
    path: route.path,
    pageType: metadata.pageType,
  })

  useSeoMeta(metaTags)

  // WebSite + Organization are emitted once sitewide from app.vue with stable
  // @ids; repeating WebSite here would put two copies of the same node on every
  // knowledge page.
  const jsonldSchemas: Record<string, unknown>[] = [
    generateKnowledgeProductJsonLd(content, route.path),
    generateBreadcrumbJsonLd(metadata.breadcrumbs),
  ]

  if (content.faqs.length > 0) {
    jsonldSchemas.push(generateFaqJsonLd(content.faqs))
  }

  jsonldSchemas.forEach((schema) => {
    useStructuredData(schema as { "@context": "https://schema.org"; "@type": string; [key: string]: unknown })
  })

  return { content }
}
