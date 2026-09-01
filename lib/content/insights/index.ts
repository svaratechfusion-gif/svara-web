// The insights registry. One list, consumed by the article route, the /blog index and the
// sitemap — the same discipline as lib/content/routes.ts, so an article cannot exist
// without an index entry or a sitemap URL.
import type { Insight, InsightLine } from './types'
import { autonomousIntelligence } from './autonomous-intelligence'
import { whatIsComputerVision } from './what-is-computer-vision'
import { edgeAiVsCloudAi } from './edge-ai-vs-cloud-ai'
import { whatAreAiAgents } from './what-are-ai-agents'
import { whatIsADigitalTwin } from './what-is-a-digital-twin'
import { autonomousIntelligenceImperative } from './autonomous-intelligence-imperative'
import { theIntelligenceLoop } from './the-intelligence-loop'
import { theAiNativeEnterprise } from './the-ai-native-enterprise'
import { productEngineering } from './product-engineering'
import { edgeIntelligenceAtIndustrialScale } from './edge-intelligence-at-industrial-scale'
import { oneArchitectureEveryEnvironment } from './one-architecture-every-environment'
import { perceptionAsInfrastructure } from './perception-as-infrastructure'
import { theCaseAgainstPointTools } from './the-case-against-point-tools'
import { simulationBeforeAction } from './simulation-before-action'
import { whyTheLoopNeverEnds } from './why-the-loop-never-ends'

export * from './types'

/** Newest first — this is the order the journal lists them in. */
export const INSIGHTS: readonly Insight[] = [
  oneArchitectureEveryEnvironment,
  // Technical Notes — series order (N1..N4) is this order; seriesNotes() derives from it
  perceptionAsInfrastructure,
  theCaseAgainstPointTools,
  simulationBeforeAction,
  whyTheLoopNeverEnds,
  edgeIntelligenceAtIndustrialScale,
  productEngineering,
  theAiNativeEnterprise,
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
/**
 * The technical notes, in series order.
 *
 * Position is derived from this list rather than stored on each note, for the same reason
 * sibling links are: a hand-kept "N2 of 4" is wrong the moment a fifth note is written,
 * and it would be wrong in four files at once.
 */
export function seriesNotes(): { slug: string, title: string, n: string }[] {
  return INSIGHTS.filter(i => i.kind === 'note')
    .map((i, idx) => ({ slug: i.slug, title: i.title, n: `N${idx + 1}` }))
}

export function siblingInsights(slug: string): { label: string, to: string }[] {
  // Notes are excluded: they are a short-form series with their own navigation, and
  // adding four of them to every long-form piece's Related block buries the pieces that
  // actually belong there.
  return INSIGHTS
    .filter(i => i.slug !== slug && i.kind !== 'note')
    .map(i => ({ label: i.title, to: `/insights/${i.slug}` }))
}

/**
 * Which shelf an insight is published on.
 *
 * Inferred rather than typed into fifteen files: `kind` and `imprint` already carry the
 * answer for all but one piece. An explicit `line` on the insight always wins — that is
 * the escape hatch for Product Engineering, which is a white paper by construction but
 * is published as its own line.
 */
function lineOf(i: Insight): InsightLine {
  if (i.line) return i.line
  if (i.kind === 'note') return 'note'
  if (i.imprint?.name.includes('Architecture')) return 'architecture'
  if (i.imprint?.name.includes('Report')) return 'report'
  if (i.kind === 'paper') return 'white-paper'
  return 'article'
}

export interface InsightSection {
  line: InsightLine
  /** Section heading. */
  title: string
  /** The masthead line, shown as the eyebrow. */
  label: string
  /** One line on what this shelf is for. */
  blurb: string
  items: readonly Insight[]
}

/**
 * The journal's shelves, in reading order — blogs first, then the long-form lines,
 * then the short notes. A line with nothing published on it is dropped, so the page
 * never renders an empty shelf, and a new insight appears in its section with no
 * change here.
 */
const SECTION_ORDER: readonly Omit<InsightSection, 'items'>[] = [
  {
    line: 'article',
    title: 'Blog',
    label: 'Articles',
    blurb: 'Definitive explainers on the ideas behind autonomous intelligence — written to answer the question, not to sell the feature.',
  },
  {
    line: 'white-paper',
    title: 'White Papers',
    label: 'SVARA White Papers',
    blurb: 'Long-form position papers on where enterprise intelligence is going and what it takes to build it.',
  },
  {
    line: 'product-engineering',
    title: 'Product Engineering',
    label: 'SVARA Product Engineering',
    blurb: 'How intelligent products are actually designed, composed and shipped.',
  },
  {
    line: 'architecture',
    title: 'Architecture Series',
    label: 'SVARA Architecture Series',
    blurb: 'Engineering briefs — the system drawn as a blueprint, layer by layer.',
  },
  {
    line: 'report',
    title: 'Industry Reports',
    label: 'SVARA Industry Report Series',
    blurb: 'How one intelligence architecture meets the conditions of real operating environments.',
  },
  {
    line: 'note',
    title: 'Technical Notes',
    label: 'SVARA Technical Notes',
    blurb: 'Short notes on the principles behind intelligent systems. Numbered, and meant to be read in order.',
  },
]

export function insightSections(): InsightSection[] {
  return SECTION_ORDER
    .map(s => ({ ...s, items: INSIGHTS.filter(i => lineOf(i) === s.line) }))
    .filter(s => s.items.length > 0)
}
