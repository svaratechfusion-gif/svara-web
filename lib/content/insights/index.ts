// The insights registry. One list, consumed by the article route, the /blog index and the
// sitemap — the same discipline as lib/content/routes.ts, so an article cannot exist
// without an index entry or a sitemap URL.
import type { Insight } from './types'
import { autonomousIntelligence } from './autonomous-intelligence'
import { whatIsComputerVision } from './what-is-computer-vision'
import { edgeAiVsCloudAi } from './edge-ai-vs-cloud-ai'
import { whatAreAiAgents } from './what-are-ai-agents'

export * from './types'

/** Newest first — this is the order the journal lists them in. */
export const INSIGHTS: readonly Insight[] = [
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
