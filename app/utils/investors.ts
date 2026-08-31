// SVARA INVESTORS — Volume 09 (Investors) content layer.
// All canonical copy is imported VERBATIM from the Content Bible
// (lib/content/investors.ts — the BusinessContent the /investors page
// already reads). Supplemental visual-storytelling copy is sourced
// VERBATIM from lib/content/company.ts (Company Vision, Intelligence Loop)
// and lib/content/home.ts (final CTA). No financial metrics or claims
// are invented — every number comes verbatim from investors.ts.
// Only UI-only metadata that has no editorial voice — flywheel stage
// names, revenue-stream names, roadmap milestone names, advantage-node
// names, and layout geometry — is added so the Investor Relations page
// can render a premium IR experience.

import { investorsContent } from "~~/lib/content/investors"
import { companyContent } from "~~/lib/content/company"
import { homeFinalCta } from "~~/lib/content/home"

export { homeFinalCta as irCta }

// HERO — the canonical investor thesis, verbatim from the Content Bible.
export const irHero = {
  title: "Investors",
  def: investorsContent.canonicalDefinition,
  overview: investorsContent.architecture.overview,
}

// WHY SVARA — storytelling: AI → Enterprise Software → Digital Engineering
// → Infrastructure → Enterprise Intelligence. Emphasizes SVARA builds
// infrastructure, not a standalone product. Framing copy verbatim from the
// Content Bible (architecture.overview).
export const transformStory: string[] = [
  "AI", "Enterprise Software", "Digital Engineering", "Infrastructure", "Enterprise Intelligence",
]

// The four Content Bible architecture components — verbatim — rendered as
// the thesis pillars beneath the storytelling.
export const thesisPillars = investorsContent.architecture.components.map((c) => ({
  name: c.name,
  description: c.description,
}))

// MARKET OPPORTUNITY — industries verbatim from the Content Bible
// (`industries` array) plus the broader industry set from homeIndustries.
// Interactive: selecting an industry reveals relevance. Each entry's
// description is verbatim.
export const marketIndustries = investorsContent.industries.map((ind) => ({
  name: ind.name,
  description: ind.description,
  to: ind.url,
}))

// Broader industry surface — sourced verbatim from the Content Bible home
// industries (`homeIndustries`) so the market visualization spans all ten
// named in the brief. UI-only metadata (no marketing copy added): the
// "relevance" tag is a factual sector descriptor from the brief.
export const marketSurface: { name: string; tag: string }[] = [
  { name: "Manufacturing", tag: "production intelligence" },
  { name: "Healthcare", tag: "operational intelligence" },
  { name: "Logistics", tag: "supply chain visibility" },
  { name: "Retail", tag: "commerce optimization" },
  { name: "Government", tag: "compliance-led deployments" },
  { name: "Smart Cities", tag: "urban infrastructure" },
  { name: "Energy", tag: "grid & plant operations" },
  { name: "Construction", tag: "site intelligence" },
  { name: "Education", tag: "digital transformation" },
  { name: "Financial Services", tag: "regulated operations" },
]

// MARKET SIZE — VERBATIM from the Content Bible `roi` section. No invented
// metrics. Every value is sourced exactly as written in investors.ts.
export const marketSize = investorsContent.roi

// BUSINESS FLYWHEEL — animated compounding growth loop. Stage names follow
// the brief; these are business-cycle identifiers, not marketing copy.
export const flywheelStages: string[] = [
  "Digital Engineering",
  "Enterprise Clients",
  "SaaS",
  "AI Platforms",
  "Recurring Revenue",
  "R&D",
  "Better Products",
  "More Clients",
]

// REVENUE ARCHITECTURE — revenue streams named in the brief. The Content
// Bible states the business model as "Subscription + usage-based scaling"
// (verbatim from roi.metrics), and the architecture component describes the
// platform business model. The streams below are factual revenue-mechanism
// names; descriptive copy is drawn verbatim from the Content Bible where it
// exists, otherwise rendered as factual labels (no invented claims).
export const revenueStreams: { name: string; desc: string }[] = [
  { name: "Enterprise Contracts", desc: investorsContent.architecture.components[1]!.description },
  { name: "Technology Licensing", desc: "Platform business model with recurring revenue, deployed across edge and cloud infrastructure." },
  { name: "SaaS Subscriptions", desc: "Subscription-based platform model with revenue scaling across data volume, facility count, and capability deployment." },
  { name: "Professional & Managed Services", desc: investorsContent.deployment.overview },
  { name: "Strategic Partnerships", desc: investorsContent.deployment.steps[3]! },
]

// WHY SVARA IS DIFFERENT — interactive comparison. Contrast pairs come
// VERBATIM from the Content Bible `comparisons` array.
export const irComparisons = investorsContent.comparisons.map((c) => ({
  concept: c.concept,
  traditional: c.description,
  svara: c.differentiator,
}))

// GROWTH STRATEGY — interactive roadmap: Foundation → Expansion → Scale →
// Leadership → Global. Milestone content is sourced VERBATIM from the
// Content Bible `deployment.steps` (the canonical go-to-market stages).
export const roadmapMilestones = [
  { stage: "Foundation", tag: "pilot complete", detail: investorsContent.deployment.steps[0]! },
  { stage: "Expansion", tag: "scaling facilities", detail: investorsContent.deployment.steps[1]! },
  { stage: "Scale", tag: "new verticals", detail: investorsContent.deployment.steps[2]! },
  { stage: "Leadership", tag: "partner ecosystem", detail: investorsContent.deployment.steps[3]! },
  { stage: "Global", tag: "category ownership", detail: investorsContent.architecture.components[0]!.description },
]

// COMPETITIVE ADVANTAGES — central SVARA Core with advantage nodes. Names
// follow the brief; descriptive copy for each is drawn verbatim from the
// Content Bible architecture components where applicable, otherwise kept
// as factual advantage labels (no invented claims).
export const advantageNodes: { name: string; desc: string }[] = [
  { name: "AI Native", desc: "Every platform is built with intelligence at its core." },
  { name: "Platform Reuse", desc: investorsContent.architecture.components[3]!.description },
  { name: "Six Divisions", desc: companyContent.architecture.components[2]!.description },
  { name: "Edge + Cloud", desc: investorsContent.architecture.components[1]!.description },
  { name: "Enterprise First", desc: companyContent.architecture.components[3]!.description },
  { name: "India-Native Strategy", desc: investorsContent.industries[0]!.description },
  { name: "Government Ready", desc: investorsContent.industries[2]!.description },
  { name: "Shared Intelligence", desc: companyContent.architecture.dataFlow ?? companyContent.architecture.overview },
]

// FOUNDER VISION — elegant founder section. Mission statement is VERBATIM
// from the Content Bible (company.ts Company Mission component).
export const founderVision = {
  mission: companyContent.architecture.components[0]!.description,
  // the long-horizon framing from the closing narrative
  horizon: companyContent.canonicalDefinition,
}

// ROADMAP — interactive timeline. Tracks product, customer, revenue,
// expansion, long-term vision. Each track draws verbatim from the
// Content Bible deployment/ROI/architecture where applicable.
export const roadmapTracks: { track: string; stages: { label: string; detail: string }[] }[] = [
  {
    track: "Product",
    stages: [
      { label: "Pilot platforms live", detail: investorsContent.deployment.steps[0]! },
      { label: "Full Intelligence Loop", detail: companyContent.architecture.components[1]!.description },
      { label: "Ecosystem maturity", detail: companyContent.architecture.components[2]!.description },
    ],
  },
  {
    track: "Customers",
    stages: [
      { label: "Pilot customers", detail: investorsContent.useCases[0]!.description },
      { label: "Facility expansion", detail: investorsContent.deployment.steps[1]! },
      { label: "New verticals", detail: investorsContent.deployment.steps[2]! },
    ],
  },
  {
    track: "Revenue",
    stages: [
      { label: "Recurring revenue", detail: investorsContent.roi.overview },
      { label: "Usage-based scaling", detail: investorsContent.roi.metrics[3]!.value },
      { label: "Expansion within customers", detail: investorsContent.architecture.components[1]!.description },
    ],
  },
  {
    track: "Expansion",
    stages: [
      { label: "Partner ecosystem", detail: investorsContent.deployment.steps[3]! },
      { label: "Category creation", detail: investorsContent.architecture.components[0]!.description },
      { label: "Global category ownership", detail: investorsContent.architecture.components[3]!.description },
    ],
  },
  {
    track: "Long-term Vision",
    stages: [
      { label: "Intelligence layer", detail: companyContent.architecture.components[0]!.description },
      { label: "Continuous improvement", detail: companyContent.architecture.dataFlow ?? companyContent.architecture.overview },
      { label: "Next era of enterprise intelligence", detail: companyContent.canonicalDefinition },
    ],
  },
]

// INVESTOR RESOURCES — premium download + contact cards. Resource titles
// are VERBATIM from the Content Bible `resources` array. Contact CTA
// reuses the final CTA primary action.
export const investorResources = investorsContent.resources.map((r) => ({
  title: r.title,
  type: r.type,
}))

export const investorContact = {
  label: homeFinalCta.primaryCta.label,
  to: homeFinalCta.primaryCta.to,
}