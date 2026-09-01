// The insights registry. One list, consumed by the article route, the /blog index and the
// sitemap — the same discipline as lib/content/routes.ts, so an article cannot exist
// without an index entry or a sitemap URL.
import type { Insight } from './types'
import { autonomousIntelligence } from './autonomous-intelligence'
import { whatIsComputerVision } from './what-is-computer-vision'
import { edgeAiVsCloudAi } from './edge-ai-vs-cloud-ai'
import { whatAreAiAgents } from './what-are-ai-agents'
import { whatIsADigitalTwin } from './what-is-a-digital-twin'
import { autonomousIntelligenceImperative } from './autonomous-intelligence-imperative'
import { theIntelligenceLoop } from './the-intelligence-loop'

export * from './types'

/** Newest first — this is the order the journal lists them in. */
export const INSIGHTS: readonly Insight[] = [
  theIntelligenceLoop,
  autonomousIntelligenceImperative,
  whatIsADigitalTwin,
  whatAreAiAgents,
  edgeAiVsCloudAi,
  whatIsComputerVision,
  autonomousIntelligence,
]

export const INSIGHT_SLUGS: readonly string[] = INSIGHTS.map(i => i.slug)

export const INSIGHT_ROUTES: readonly string[] = INSIGHTS.map(i => `/insights/${i.slug}`)

export function getInsight(slug: string): Insight | undefined {
  return INSIGHTS.find(i => i.slug === slug)
}

/**
 * Every OTHER insight, as related links.
 *
 * Sibling cross-links used to be typed into each article's `related` list. That is an
 * N×N table maintained by hand across N files: adding article 05 meant editing four
 * others, and the first one anybody forgets silently drops an edge out of the cluster.
 * Derived from the registry, the graph cannot be incomplete.
 */
export function siblingInsights(slug: string): { label: string, to: string }[] {
  return INSIGHTS.filter(i => i.slug !== slug).map(i => ({ label: i.title, to: `/insights/${i.slug}` }))
}
