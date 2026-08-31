// SVARA PLATFORMS — Products page enrichment layer.
// Copy (name / description / route) is imported VERBATIM from the Content
// Bible (lib/content/home → homePlatforms) and never redefined here. Only
// UI-only metadata that has no editorial voice — capability cluster, a
// mock live-dashboard schema, and an industry-relevance map — is added.
// Volume 04 (Products) of the SVARA Content Bible remains the single
// source of truth for all messaging.

import { homePlatforms, type Platform } from "~~/lib/content/home"

export type Capability = "Sense" | "Think" | "Predict" | "Act" | "Learn"

export interface DashboardMetric {
  label: string
  value: string
  /** 0–100 bar fill used by the live dashboard mock */
  fill: number
}

export interface PlatformModel extends Platform {
  capability: Capability
  /** short capability-cluster tag drawn from the Content Bible hierarchy */
  cluster: string
  /** live-dashboard mock — represents continuous enterprise intelligence */
  metrics: DashboardMetric[]
}

// Capability cluster assignment — traced from the Products Content Bible
// (Sense · Think · Predict · Act · Learn). Every product traces to one
// capability; every capability traces to the platform.
const CAPABILITY: Record<string, Capability> = {
  "Vision AI": "Sense",
  "Drone AI": "Sense",
  "Edge AI": "Think",
  "Generative & Cognitive AI": "Think",
  "Autonomous AI Agents": "Think",
  "Digital Twin": "Predict",
  "Unified Business Cloud": "Act",
  "One AI OS": "Act",
  "Digital Engineering": "Act",
  "Growth & PR Tech": "Learn",
}

// Live-dashboard mock schemas — purely representational; no marketing copy.
const DASHBOARDS: Record<string, DashboardMetric[]> = {
  "Vision AI": [
    { label: "Streams Online", value: "1,284", fill: 92 },
    { label: "Detections / sec", value: "48.2k", fill: 78 },
    { label: "Anomaly Score", value: "0.04", fill: 12 },
  ],
  "Drone AI": [
    { label: "Units in Flight", value: "37", fill: 64 },
    { label: "Coverage Map", value: "98.6%", fill: 98 },
    { label: "Inspection Queue", value: "12", fill: 40 },
  ],
  "Edge AI": [
    { label: "Edge Nodes", value: "2,914", fill: 88 },
    { label: "Inference Latency", value: "11ms", fill: 22 },
    { label: "Uptime", value: "99.98%", fill: 99 },
  ],
  "Generative & Cognitive AI": [
    { label: "Tokens / min", value: "1.9M", fill: 84 },
    { label: "Knowledge Graph", value: "412k", fill: 70 },
    { label: "Reasoning Tasks", value: "6,031", fill: 60 },
  ],
  "Autonomous AI Agents": [
    { label: "Agents Deployed", value: "248", fill: 74 },
    { label: "Workflows / hr", value: "3,402", fill: 80 },
    { label: "Autonomy Level", value: "L4", fill: 86 },
  ],
  "Digital Twin": [
    { label: "Twin Fidelity", value: "99.2%", fill: 98 },
    { label: "Simulations Run", value: "18.4k", fill: 76 },
    { label: "Forecast Horizon", value: "72h", fill: 66 },
  ],
  "Unified Business Cloud": [
    { label: "Systems Unified", value: "47", fill: 58 },
    { label: "Records Synced", value: "1.2B", fill: 90 },
    { label: "API Health", value: "100%", fill: 100 },
  ],
  "One AI OS": [
    { label: "Intent Resolved", value: "94.1%", fill: 94 },
    { label: "Active Sessions", value: "8,206", fill: 68 },
    { label: "Orchestrations", value: "52.7k", fill: 82 },
  ],
  "Digital Engineering": [
    { label: "Pipelines", value: "318", fill: 72 },
    { label: "Deployments", value: "5,914", fill: 78 },
    { label: "Build Health", value: "99.4%", fill: 99 },
  ],
  "Growth & PR Tech": [
    { label: "Engagement Lift", value: "+34%", fill: 68 },
    { label: "Reach / mo", value: "42.8M", fill: 84 },
    { label: "Conversion Index", value: "7.9", fill: 79 },
  ],
}

export const PLATFORMS: PlatformModel[] = homePlatforms.map((p) => {
  const capability = CAPABILITY[p.name] ?? "Think"
  return {
    ...p,
    capability,
    cluster: capability,
    metrics: DASHBOARDS[p.name] ?? [],
  }
})

export const PLATFORM_COUNT = PLATFORMS.length

// The five capability clusters in loop order (Observe→Understand→… is the
// Intelligence Loop; the Products Bible short-hands them as Sense/Think/
// Predict/Act/Learn). Used by the architecture + journey sections.
export const CAPABILITIES: Capability[] = ["Sense", "Think", "Predict", "Act", "Learn"]

// Industry → platform relevance map for the Industry Intelligence Mapping.
// Industries sourced verbatim from the Content Bible (homeIndustries).
// Values are indices into PLATFORMS; selecting an industry highlights the
// most relevant SVARA platforms with animated connections.
export const INDUSTRY_MAP: { name: string; to: string; platforms: number[] }[] = [
  { name: "Manufacturing", to: "/industries/manufacturing", platforms: [0, 2, 5, 8] },
  { name: "Smart Manufacturing", to: "/industries/manufacturing", platforms: [0, 2, 5, 7] },
  { name: "Healthcare", to: "/industries/healthcare", platforms: [3, 4, 7, 9] },
  { name: "Logistics & Supply Chain", to: "/industries/logistics", platforms: [1, 2, 6, 9] },
  { name: "Retail & Commerce", to: "/industries/retail", platforms: [3, 4, 6, 9] },
  { name: "Smart Cities", to: "/industries/smart-cities", platforms: [0, 1, 5, 7] },
  { name: "Energy & Utilities", to: "/industries/energy", platforms: [1, 2, 5, 8] },
  { name: "Construction", to: "/industries/construction", platforms: [0, 1, 5, 8] },
  { name: "Mining", to: "/industries/mining", platforms: [1, 2, 5, 8] },
  { name: "Agriculture", to: "/industries/agriculture", platforms: [1, 2, 5, 8] },
  { name: "Government", to: "/industries/government", platforms: [0, 4, 7, 9] },
]