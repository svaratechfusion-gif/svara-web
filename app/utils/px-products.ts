// PX-PRODUCTS — curated product data for the editorial Products page rebuild.
// Names / taglines / routes / metrics come from the verified PLATFORMS layer
// (which itself draws from the Content Bible homePlatforms + representational
// dashboard mocks). Only display-name aliases (e.g. "AI Agents" for "Autonomous
// AI Agents") and short capability bullets are added here for the editorial UI.
import { PLATFORMS, type DashboardMetric } from "~/utils/platforms"

export interface PxProduct {
  name: string          // editorial display name
  tagline: string       // one-line description
  long: string          // showcase paragraph
  capabilities: string[] // 3 short capability bullets
  to: string            // product route
  capability: string    // Sense / Think / Predict / Act / Learn
  metrics: DashboardMetric[]
}

const src = (n: string) => PLATFORMS.find((p) => p.name === n)!

function make(
  name: string,
  srcName: string,
  extra: { tagline?: string; long: string; capabilities: string[]; to?: string; metrics?: DashboardMetric[] },
): PxProduct {
  const s = src(srcName)
  return {
    name,
    tagline: extra.tagline ?? s.description,
    long: extra.long,
    capabilities: extra.capabilities,
    to: extra.to ?? s.to,
    capability: s.capability,
    metrics: extra.metrics ?? s.metrics,
  }
}

export const PX_PRODUCTS: PxProduct[] = [
  make("Vision AI", "Vision AI", {
    long: "Transform camera streams into operational intelligence using computer vision, event detection and predictive analytics.",
    capabilities: ["Computer vision", "Event detection", "Predictive analytics"],
  }),
  make("Digital Twin", "Digital Twin", {
    long: "Create live digital replicas of factories, infrastructure and enterprise operations to simulate before you act.",
    capabilities: ["Live simulation", "Scenario forecasting", "Operational optimization"],
  }),
  make("AI Agents", "Autonomous AI Agents", {
    long: "Deploy autonomous agents that automate workflows, reasoning and enterprise decision-making across every system.",
    capabilities: ["Workflow automation", "Autonomous reasoning", "System orchestration"],
  }),
  make("Business Cloud", "Unified Business Cloud", {
    long: "AI-powered ERP, CRM and HRM platforms connected into one intelligent business operating system.",
    capabilities: ["AI-native ERP", "Predictive CRM", "Unified operations"],
  }),
  make("Edge AI", "Edge AI", {
    long: "Run perception and inference where the data is created — low-latency intelligence at industrial scale.",
    capabilities: ["On-device inference", "Low latency", "Offline-resilient"],
  }),
  make("Growth Intelligence", "Growth & PR Tech", {
    long: "Predict market opportunities, optimize campaigns and automate customer growth from one intelligence layer.",
    capabilities: ["Opportunity prediction", "Campaign optimization", "Growth automation"],
  }),
  // Business-Cloud sub-applications — surfaced as their own marquee cards.
  make("ERP AI", "Unified Business Cloud", {
    tagline: "AI-native ERP connecting finance, operations and supply chain.",
    long: "An AI-native ERP that connects finance, operations and supply chain into one continuously optimizing system.",
    capabilities: ["Finance intelligence", "Supply-chain sync", "Process automation"],
    to: "/products/business-cloud",
    metrics: [
      { label: "Modules Live", value: "18", fill: 60 },
      { label: "Records Synced", value: "1.2B", fill: 90 },
      { label: "Automation", value: "82%", fill: 82 },
    ],
  }),
  make("CRM AI", "Unified Business Cloud", {
    tagline: "Predict, prioritize and automate every customer relationship.",
    long: "An intelligent CRM that predicts, prioritizes and automates every customer relationship across the funnel.",
    capabilities: ["Lead scoring", "Next-best action", "Pipeline forecasting"],
    to: "/products/business-cloud",
    metrics: [
      { label: "Pipeline", value: "$4.8M", fill: 70 },
      { label: "Leads Scored", value: "26.3k", fill: 74 },
      { label: "Win Rate", value: "+19%", fill: 64 },
    ],
  }),
]

// section slices per the brief
export const PX_MARQUEE = PX_PRODUCTS // 8
export const PX_FEATURED = PX_PRODUCTS.slice(0, 6) // Vision…Growth (carousel)
export const PX_SHOWCASE = [0, 1, 2, 3, 5].map((i) => PX_PRODUCTS[i]!) // Vision, Twin, Agents, Business, Growth
