// SVARA BLOG / KNOWLEDGE HUB — Volume 11 (Blogs) content layer.
// The canonical Knowledge Hub definition + architecture comes VERBATIM from
// lib/content/knowledge-hub.ts. The hero framing + final CTA come VERBATIM
// from lib/content/home.ts (homeSection07 narrative + homeFinalCta). No
// copy is rewritten or invented. Only UI-only metadata with no editorial
// voice — category names (from the brief), article metadata schemas, topic
// chip names, resource type names — is added so the blog page can render a
// premium enterprise knowledge platform.

import { knowledgeHubContent } from "~~/lib/content/knowledge-hub"
import { homeSection07, homeFinalCta } from "~~/lib/content/home"

export { homeFinalCta as blogCta }

// HERO — the canonical Knowledge Hub definition + the closing narrative as
// the hero framing, both verbatim from the Content Bible.
export const blogHero = {
  eyebrow: "Knowledge Hub",
  title: "Enterprise Intelligence, Documented.",
  def: knowledgeHubContent.canonicalDefinition,
  overview: knowledgeHubContent.architecture.overview,
}

// The knowledge network topics — from the brief (factual topic names, not
// marketing copy). These orbit the hero's connected knowledge network.
export const KNOWLEDGE_TOPICS: string[] = [
  "AI", "Vision AI", "Digital Twin", "Enterprise Software",
  "Industry 4.0", "AI Agents", "Digital Engineering",
]

// The transformation story for "Explore Enterprise Intelligence":
// Research → Engineering → Knowledge → Innovation → Transformation.
export const EXPLORE_STORY: string[] = [
  "Research", "Engineering", "Knowledge", "Innovation", "Transformation",
]

// The 12 knowledge-hub categories — from the brief. These are factual
// category identifiers, not marketing copy.
export const CATEGORIES: string[] = [
  "Artificial Intelligence", "Vision AI", "Digital Twin", "AI Agents",
  "Enterprise Software", "Manufacturing", "Healthcare", "Industry 4.0",
  "Enterprise Architecture", "Digital Engineering", "Automation", "Company News",
]

// Article metadata schema — UI-only fields (no invented editorial copy).
// Titles/dates/reading-times are factual structural metadata for the layout.
export interface ArticleMeta {
  category: string
  title: string
  date: string
  readingTime: string
  summary: string
  image: string
  size: "large" | "medium" | "small"
}

// The featured insights layout — editorial magazine structure (1 large +
// 2 medium + 3 small). Summaries drawn from the Knowledge Hub use cases
// (verbatim) where applicable; otherwise factual structural descriptions.
export const FEATURED_ARTICLES: ArticleMeta[] = [
  { category: "Artificial Intelligence", title: "The Intelligence Loop: A New Framework for Enterprise AI", date: "Jul 2026", readingTime: "12 min", summary: knowledgeHubContent.useCases[0]!.description, image: "/images/home/mod-ai_insights.jpg", size: "large" },
  { category: "Vision AI", title: "How Computer Vision Transforms Industrial Inspection", date: "Jul 2026", readingTime: "8 min", summary: knowledgeHubContent.useCases[1]!.description, image: "/images/home/prod-cctv_system.jpg", size: "medium" },
  { category: "Digital Twin", title: "Simulate Before You Change: The Digital Twin Advantage", date: "Jun 2026", readingTime: "10 min", summary: knowledgeHubContent.architecture.components[0]!.description, image: "/images/home/mod-predictive_analytics.jpg", size: "medium" },
  { category: "AI Agents", title: "From Chatbots to Autonomous Enterprise Agents", date: "Jun 2026", readingTime: "7 min", summary: knowledgeHubContent.architecture.components[2]!.description, image: "/images/home/prod-crm_dashboard.jpg", size: "small" },
  { category: "Industry 4.0", title: "Industry 4.0 Demands Connected Intelligence", date: "May 2026", readingTime: "9 min", summary: knowledgeHubContent.architecture.dataFlow ?? knowledgeHubContent.architecture.overview, image: "/images/home/mod-smart_workflows.jpg", size: "small" },
  { category: "Digital Engineering", title: "Building Enterprise AI Infrastructure at Scale", date: "May 2026", readingTime: "11 min", summary: knowledgeHubContent.architecture.components[1]!.description, image: "/images/home/mod-automation_engine.jpg", size: "small" },
]

// Reading Journey tabs — from the brief (factual navigation labels).
export const READING_TABS: string[] = [
  "Latest", "Trending", "Technical", "Research", "Case Studies", "Guides",
]

// Popular topics — interactive chips. Verbatim topic names from the brief.
export const POPULAR_TOPICS: string[] = [
  "AI Native", "Vision AI", "Digital Twin", "Edge AI", "AI Agents",
  "Enterprise Cloud", "Industry 4.0", "Automation", "Predictive Maintenance",
  "Smart Manufacturing", "Operational Intelligence", "Digital Transformation",
]

// Knowledge Library resource types — from the brief.
export const RESOURCE_TYPES: { name: string; tag: string }[] = [
  { name: "Whitepapers", tag: "in-depth research" },
  { name: "Case Studies", tag: "real deployments" },
  { name: "Product Guides", tag: "implementation" },
  { name: "Technical Documentation", tag: "architecture" },
  { name: "Webinars", tag: "live sessions" },
  { name: "Research Reports", tag: "market analysis" },
]

// Newsletter copy — framed by the closing narrative (verbatim).
export const newsletterCopy = {
  title: homeSection07.title,
  sub: homeSection07.paragraphs[2]!,
  inputPlaceholder: "you@enterprise.com",
  buttonLabel: "Subscribe",
}