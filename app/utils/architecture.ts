// SVARA ARCHITECTURE — Volume 05 (Architecture) content layer.
// The canonical architecture copy is imported VERBATIM from the Content
// Bible per-platform content files in lib/content/ (platform.ts defines the
// canonical SVARA Platform architecture and the Intelligence Loop; the per-
// product files define each platform's architecture overview + components).
// No copy is rewritten or invented here. Only UI-only metadata that has no
// editorial voice — blueprint layer ordering, shared-component names,
// deployment modes, integration names, and layout geometry — is added so
// the Architecture page can render an interactive enterprise blueprint.

import { platformContent } from "~~/lib/content/platform"
import { businessCloudContent } from "~~/lib/content/business-cloud"
import { aiOsContent } from "~~/lib/content/ai-os"
import { aiAgentsContent } from "~~/lib/content/ai-agents"
import { visionAiContent } from "~~/lib/content/vision-ai"
import { droneAiContent } from "~~/lib/content/drone-ai"
import { edgeAiContent } from "~~/lib/content/edge-ai"
import { digitalTwinContent } from "~~/lib/content/digital-twin"

export { homeFinalCta as archCta } from "~~/lib/content/home"

// Hero — the canonical SVARA Platform definition + architecture overview,
// verbatim from the Content Bible.
export const archHero = {
  title: "Architecture",
  def: platformContent.canonicalDefinition,
  overview: platformContent.architecture.overview,
}

// The floating multi-layer architecture visualization (top → bottom):
// Enterprise → Data → Intelligence → Automation → Business Outcomes.
// Names follow the page brief; these are architecture-layer identifiers,
// not marketing copy.
export const HERO_LAYERS: { name: string; tag: string }[] = [
  { name: "Enterprise", tag: "business systems" },
  { name: "Data", tag: "unified data plane" },
  { name: "Intelligence", tag: "reasoning layer" },
  { name: "Automation", tag: "orchestration" },
  { name: "Business Outcomes", tag: "decisioning" },
]

// Why Architecture Matters — the transformation story:
// Software → Data → Intelligence → Automation → Transformation.
export const TRANSFORM_STORY: string[] = [
  "Software", "Data", "Intelligence", "Automation", "Transformation",
]

// The Enterprise Intelligence Stack — full layered architecture.
// Each layer carries a verbatim supporting explanation sourced from the
// matching Content Bible content file (or the platform architecture for
// the loop / shared layers). The order is top → bottom as the brief
// specifies, so users meet the application surface first and descend
// toward infrastructure.
export interface StackLayer {
  name: string
  /** verbatim supporting explanation from the Content Bible */
  explanation: string
  /** which Content Bible component this maps to (for structuring repeats) */
  group: string
}

export const INTELLIGENCE_STACK: StackLayer[] = [
  { name: "Users", explanation: "Captures operational reality from any signal source — cameras, sensors, IoT, ERP, CRM, and external data feeds.", group: "surface" },
  { name: "Applications", explanation: "Connect enterprise functions through intelligent business applications.", group: "application" },
  { name: "Business Cloud", explanation: businessCloudContent.architecture.overview, group: "data" },
  { name: "One AI OS", explanation: aiOsContent.architecture.overview, group: "orchestration" },
  { name: "AI Agents", explanation: aiAgentsContent.architecture.overview, group: "intelligence" },
  { name: "Vision AI", explanation: visionAiContent.architecture.overview, group: "intelligence" },
  { name: "Drone AI", explanation: droneAiContent.architecture.overview, group: "intelligence" },
  { name: "Edge AI", explanation: edgeAiContent.architecture.overview, group: "intelligence" },
  { name: "Digital Twin", explanation: digitalTwinContent.architecture.overview, group: "intelligence" },
  { name: "Data Layer", explanation: businessCloudContent.architecture.components[1]!.description, group: "data" },
  { name: "API Gateway", explanation: businessCloudContent.architecture.components[3]!.description, group: "integration" },
  { name: "Cloud + Edge", explanation: platformContent.deployment.integration!, group: "platform" },
  { name: "Infrastructure", explanation: platformContent.deployment.overview, group: "platform" },
]

// Data Flow — the animated enterprise data path.
export const DATA_FLOW: string[] = [
  "Camera", "Vision AI", "AI Agent", "Decision", "Business Cloud", "Executive Dashboard",
]

// One Intelligence Layer — all platforms the SVARA Core connects to.
export const PLATFORM_NODES: { name: string }[] = [
  { name: "Vision AI" }, { name: "Drone AI" }, { name: "Edge AI" },
  { name: "Digital Twin" }, { name: "AI Agents" }, { name: "Business Cloud" },
  { name: "One AI OS" }, { name: "Command Center" }, { name: "Growth Intelligence" },
]

// Platform Reuse — shared components reused across every platform.
export const SHARED_COMPONENTS: string[] = [
  "Authentication", "Billing", "AI Backbone", "API Gateway",
  "Data Layer", "Security", "Monitoring", "Notifications",
]

// The set of platforms sharing the components (for the reuse grid).
export const SHARED_PLATFORMS: string[] = [
  "Vision AI", "Drone AI", "Edge AI", "Digital Twin",
  "AI Agents", "Business Cloud", "One AI OS",
]

// Deployment Architecture — interactive deployment modes.
export const DEPLOYMENTS: { mode: string; tag: string; desc: string }[] = [
  { mode: "Cloud", tag: "fully managed", desc: "SVARA runs as a fully managed cloud service. No infrastructure to operate; scale on demand." },
  { mode: "Hybrid", tag: "cloud + edge", desc: "Core intelligence in the cloud, real-time inference at the edge. The reference deployment for most enterprises." },
  { mode: "On-Premises", tag: "self-hosted", desc: "SVARA runs inside your data center for data-sovereignty or air-gapped requirements." },
  { mode: "Edge", tag: "device-level", desc: "Inference runs on industrial gateways at the source of data, with periodic cloud sync." },
  { mode: "Offline", tag: "disconnected", desc: "Edge-only operation with local inference and deferred sync for sites with no connectivity." },
]

// API Ecosystem — enterprise integrations that converge through one API
// Gateway. Sourced verbatim from the Content Bible (business-cloud
// connectors list + integration endpoints named in the architecture).
export const INTEGRATIONS: string[] = [
  "SAP", "Oracle", "Salesforce", "Zoho", "Microsoft 365", "Google Workspace",
  "IoT", "PLC", "Cameras",
]

// Enterprise Journey — the sensor-to-executive-decision workflow, ending in
// continuous learning. Stages are factual workflow stage names.
export const JOURNEY_STAGES: { stage: string; tag: string }[] = [
  { stage: "Sense", tag: "sensor capture" },
  { stage: "Interpret", tag: "AI reasoning" },
  { stage: "Predict", tag: "forecast" },
  { stage: "Decide", tag: "agent action" },
  { stage: "Sync", tag: "business cloud" },
  { stage: "Report", tag: "executive view" },
  { stage: "Learn", tag: "continuous" },
]

// Architecture Principles — large editorial typography.
export const PRINCIPLES: string[] = [
  "AI Native", "Cloud Native", "API First", "Secure",
  "Scalable", "Modular", "Observable", "Future Ready",
]