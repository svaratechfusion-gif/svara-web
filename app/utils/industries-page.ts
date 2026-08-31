// SVARA INDUSTRIES — Volume 07 (Industries) content layer.
// Every industry's canonical definition, architecture overview, components,
// use cases, ROI metrics, and applicable products are imported VERBATIM from
// the per-industry content files in lib/content/ (the IndustryContent files
// the /industries/[slug].vue detail pages already read). No copy is rewritten
// or invented. Three industries named in the brief (Transportation, Education,
// Financial Services) have no dedicated content file — for those, the shared
// platform canonical definition is used (no industry-specific claims invented).
// Only UI-only metadata (platform-node geometry, workflow stage names, KPI
// labels) with no editorial voice is added.

import { platformContent } from "~~/lib/content/platform"
import { homeSection05, homeFinalCta } from "~~/lib/content/home"
import { manufacturingContent } from "~~/lib/content/manufacturing"
import { healthcareContent } from "~~/lib/content/healthcare"
import { logisticsContent } from "~~/lib/content/logistics"
import { retailContent } from "~~/lib/content/retail"
import { energyContent } from "~~/lib/content/energy"
import { constructionContent } from "~~/lib/content/construction"
import { miningContent } from "~~/lib/content/mining"
import { agricultureContent } from "~~/lib/content/agriculture"
import { governmentContent } from "~~/lib/content/government"
import { smartCitiesContent } from "~~/lib/content/smart-cities"

export { homeFinalCta as industriesCta }

// HERO — the canonical industries intro from the Content Bible.
export const indHero = {
  eyebrow: "Industries",
  title: "Industries",
  def: homeSection05.intro,
}

// The 12 brief-specified industries. Each with-dedicated-file industry carries
// its VERBATIM canonical content. The three without files use the shared
// platform definition — no industry-specific claims invented.
interface IndustryModel {
  name: string
  slug: string
  def: string
  overview: string
  components: { name: string; description: string }[]
  useCases: { title: string; description: string }[]
  roiOverview: string
  roiMetrics: { label: string; value: string }[]
  platforms: { name: string }[]
}

// For the 3 industries without dedicated files — a minimal model using the
// shared platform definition. The brief explicitly says "Use the official
// Content Bible messaging for each industry" — these three have no
// industry-specific Content Bible file, so the shared platform definition
// is the only verbatim source available.
const sharedModel = {
  def: platformContent.canonicalDefinition,
  overview: platformContent.architecture.overview,
  components: platformContent.architecture.components,
  useCases: platformContent.useCases,
  roiOverview: platformContent.roi.overview,
  roiMetrics: platformContent.roi.metrics,
  platforms: [{ name: "One AI OS" }, { name: "Business Cloud" }, { name: "AI Agents" }, { name: "Vision AI" }],
}

export const INDUSTRIES: IndustryModel[] = [
  { name: "Manufacturing", slug: "manufacturing", def: manufacturingContent.canonicalDefinition, overview: manufacturingContent.architecture.overview, components: manufacturingContent.architecture.components, useCases: manufacturingContent.useCases, roiOverview: manufacturingContent.roi!.overview, roiMetrics: manufacturingContent.roi!.metrics, platforms: manufacturingContent.applicableProducts.map((p) => ({ name: p.name })) },
  { name: "Healthcare", slug: "healthcare", def: healthcareContent.canonicalDefinition, overview: healthcareContent.architecture.overview, components: healthcareContent.architecture.components, useCases: healthcareContent.useCases, roiOverview: healthcareContent.roi!.overview, roiMetrics: healthcareContent.roi!.metrics, platforms: healthcareContent.applicableProducts.map((p) => ({ name: p.name })) },
  { name: "Logistics & Supply Chain", slug: "logistics", def: logisticsContent.canonicalDefinition, overview: logisticsContent.architecture.overview, components: logisticsContent.architecture.components, useCases: logisticsContent.useCases, roiOverview: logisticsContent.roi!.overview, roiMetrics: logisticsContent.roi!.metrics, platforms: logisticsContent.applicableProducts.map((p) => ({ name: p.name })) },
  { name: "Retail & Commerce", slug: "retail", def: retailContent.canonicalDefinition, overview: retailContent.architecture.overview, components: retailContent.architecture.components, useCases: retailContent.useCases, roiOverview: retailContent.roi!.overview, roiMetrics: retailContent.roi!.metrics, platforms: retailContent.applicableProducts.map((p) => ({ name: p.name })) },
  { name: "Energy & Utilities", slug: "energy", def: energyContent.canonicalDefinition, overview: energyContent.architecture.overview, components: energyContent.architecture.components, useCases: energyContent.useCases, roiOverview: energyContent.roi!.overview, roiMetrics: energyContent.roi!.metrics, platforms: energyContent.applicableProducts.map((p) => ({ name: p.name })) },
  { name: "Construction", slug: "construction", def: constructionContent.canonicalDefinition, overview: constructionContent.architecture.overview, components: constructionContent.architecture.components, useCases: constructionContent.useCases, roiOverview: constructionContent.roi!.overview, roiMetrics: constructionContent.roi!.metrics, platforms: constructionContent.applicableProducts.map((p) => ({ name: p.name })) },
  { name: "Mining", slug: "mining", def: miningContent.canonicalDefinition, overview: miningContent.architecture.overview, components: miningContent.architecture.components, useCases: miningContent.useCases, roiOverview: miningContent.roi!.overview, roiMetrics: miningContent.roi!.metrics, platforms: miningContent.applicableProducts.map((p) => ({ name: p.name })) },
  { name: "Agriculture", slug: "agriculture", def: agricultureContent.canonicalDefinition, overview: agricultureContent.architecture.overview, components: agricultureContent.architecture.components, useCases: agricultureContent.useCases, roiOverview: agricultureContent.roi!.overview, roiMetrics: agricultureContent.roi!.metrics, platforms: agricultureContent.applicableProducts.map((p) => ({ name: p.name })) },
  { name: "Government", slug: "government", def: governmentContent.canonicalDefinition, overview: governmentContent.architecture.overview, components: governmentContent.architecture.components, useCases: governmentContent.useCases, roiOverview: governmentContent.roi!.overview, roiMetrics: governmentContent.roi!.metrics, platforms: governmentContent.applicableProducts.map((p) => ({ name: p.name })) },
  { name: "Smart Cities", slug: "smart-cities", def: smartCitiesContent.canonicalDefinition, overview: smartCitiesContent.architecture.overview, components: smartCitiesContent.architecture.components, useCases: smartCitiesContent.useCases, roiOverview: smartCitiesContent.roi!.overview, roiMetrics: smartCitiesContent.roi!.metrics, platforms: smartCitiesContent.applicableProducts.map((p) => ({ name: p.name })) },
  // Three industries without dedicated content files — shared platform model
  { name: "Transportation", slug: "transportation", ...sharedModel },
  { name: "Education", slug: "education", ...sharedModel },
  { name: "Financial Services", slug: "financial-services", ...sharedModel },
]

// The transformation story for "Every Industry Is Different"
export const TRANSFORM_STORY: string[] = [
  "Operational Challenges", "Connected Intelligence", "Automation", "Optimization", "Business Outcomes",
]

// The cross-industry workflow stages
export const WORKFLOW_STAGES: string[] = [
  "Industry", "Operational Data", "AI Platform", "Intelligence", "Automation", "Business Decisions",
]

// The 10 SVARA platforms for Platform Mapping
export const PLATFORM_SURROUND: string[] = [
  "Vision AI", "Drone AI", "Edge AI", "Generative AI", "AI Agents",
  "Digital Twin", "Unified Business Cloud", "One AI OS", "Digital Engineering", "Growth & PR Tech",
]

// Enterprise Outcomes — editorial sequence
export const OUTCOMES: string[] = [
  "Observe", "Understand", "Predict", "Automate", "Optimize", "Grow",
]

// KPI categories for the Operations Dashboard — factual operational domains
export const KPI_DOMAINS: string[] = [
  "Operational Visibility", "Automation", "Safety", "Efficiency", "Quality", "Compliance",
]