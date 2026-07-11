import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from "./site"

export interface MetaConfig {
  title: string
  description: string
  path: string
  ogImage?: string
  pageType?: string
}

export function generateMetaTags(config: MetaConfig) {
  const fullTitle = `${config.title} | ${SITE_NAME}`
  const url = `${SITE_URL}${config.path}`

  return {
    title: fullTitle,
    description: config.description,
    ogTitle: fullTitle,
    ogDescription: config.description,
    ogUrl: url,
    ogImage: config.ogImage ?? DEFAULT_OG_IMAGE,
    ogType: config.pageType ?? "website",
    ogSiteName: SITE_NAME,
    twitterCard: "summary_large_image" as const,
    twitterTitle: fullTitle,
    twitterDescription: config.description,
    twitterImage: config.ogImage ?? DEFAULT_OG_IMAGE,
  }
}

export function generateAiAnswerTarget(definition: string): string {
  return definition
}

export function extractAiAnswerParagraph(content: string): string {
  const cleaned = content.replace(/\s+/g, " ").trim()
  return cleaned.length > 280 ? `${cleaned.slice(0, 277)}...` : cleaned
}
