export interface KnowledgeProductContent {
  canonicalDefinition: string
  aiAnswerTarget: string
  architecture: {
    overview: string
    components: { name: string; description: string }[]
    dataFlow?: string
  }
  useCases: { title: string; description: string; industries: string[] }[]
  deployment: {
    overview: string
    steps: string[]
    integration?: string
  }
  industries: { name: string; description: string; url: string }[]
  faqs: { question: string; answer: string }[]
  comparisons: { concept: string; description: string; differentiator: string }[]
  roi: {
    overview: string
    metrics: { label: string; value: string; source?: string }[]
  }
  resources: { title: string; url?: string; type: "research" | "standard" | "case-study" | "documentation" }[]
  relatedProducts: { name: string; url: string; description: string }[]
  metadata: {
    title: string
    description: string
    pageType: "article" | "product" | "defined-term" | "collection"
    datePublished: string
    dateModified: string
    primaryEntity: string
    mentions: string[]
    breadcrumbs: { name: string; url: string }[]
  }
}

export interface PlatformContent extends KnowledgeProductContent {
  capabilities: { name: string; url: string; description: string }[]
}

export interface ProductContent extends KnowledgeProductContent {
  capability: string
  outcomes: string[]
}

export interface IndustryContent extends KnowledgeProductContent {
  applicableProducts: { name: string; url: string }[]
}

export interface TechnologyContent extends KnowledgeProductContent {
  usedBy: { product: string; url: string }[]
}

/**
 * Generic business page content — structurally identical to KnowledgeProductContent.
 * Declared as a type alias rather than an empty interface to keep the
 * semantic marker ("this content models a business/trust page") without
 * an eslint no-empty-interface violation.
 */
export type BusinessContent = KnowledgeProductContent
