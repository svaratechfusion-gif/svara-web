import type { KnowledgeProductContent } from "~~/lib/types/content"
import { generateWebSiteJsonLd, generateBreadcrumbJsonLd, generateKnowledgeProductJsonLd, generateFaqJsonLd } from "~~/lib/seo/jsonld"
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

  const jsonldSchemas: Record<string, unknown>[] = [
    generateWebSiteJsonLd(),
    generateKnowledgeProductJsonLd(content),
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
