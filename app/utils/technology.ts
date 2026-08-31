// SVARA TECHNOLOGY — Volume 06 (Technology) content layer.
// Every canonical definition + architecture component description is
// imported VERBATIM from the per-technology content files in lib/content/
// (the KnowledgeProductContent / TechnologyContent files the detail pages
// already read). No copy is rewritten or invented here. Only UI-only
// metadata that has no editorial voice — node geometry, a constellation
// layout, mock engineering schemas, and the layered-stack ordering — is
// added so the Technology page can render a living engineering foundation.
//
// The hero constellation nodes map to the Content Bible's technology
// surfaces: Artificial Intelligence, Computer Vision, Edge AI, Digital
// Twin, AI Agents, Enterprise Cloud, API Layer, One AI OS.

import { platformContent } from "~~/lib/content/platform"
import { computerVisionContent } from "~~/lib/content/computer-vision"
import { edgeAiContent } from "~~/lib/content/edge-ai"
import { digitalTwinContent } from "~~/lib/content/digital-twin"
import { aiAgentsContent } from "~~/lib/content/ai-agents"
import { businessCloudContent } from "~~/lib/content/business-cloud"
import { aiOsContent } from "~~/lib/content/ai-os"

export interface ConstellationNode {
  name: string
  /** verbatim canonical definition powering this node */
  def: string
  /** ring position (0–1 angle) and ring radius for the constellation */
  a: number
  ring: number
}

// The 8 Technology Constellation nodes (verbatim from the brief). Each
// node carries its canonical definition verbatim from the Content Bible.
export const CONSTELLATION: ConstellationNode[] = [
  { name: "Artificial Intelligence", def: platformContent.canonicalDefinition, a: -Math.PI / 2, ring: 1 },
  { name: "Computer Vision", def: computerVisionContent.canonicalDefinition, a: -Math.PI / 2 + (Math.PI * 2) / 8, ring: 1 },
  { name: "Edge AI", def: edgeAiContent.canonicalDefinition, a: -Math.PI / 2 + (Math.PI * 2) / 8 * 2, ring: 1 },
  { name: "Digital Twin", def: digitalTwinContent.canonicalDefinition, a: -Math.PI / 2 + (Math.PI * 2) / 8 * 3, ring: 1 },
  { name: "AI Agents", def: aiAgentsContent.canonicalDefinition, a: -Math.PI / 2 + (Math.PI * 2) / 8 * 4, ring: 1 },
  { name: "Enterprise Cloud", def: businessCloudContent.canonicalDefinition, a: -Math.PI / 2 + (Math.PI * 2) / 8 * 5, ring: 1 },
  { name: "API Layer", def: businessCloudContent.architecture.components[3]!.description, a: -Math.PI / 2 + (Math.PI * 2) / 8 * 6, ring: 1 },
  { name: "One AI OS", def: aiOsContent.canonicalDefinition, a: -Math.PI / 2 + (Math.PI * 2) / 8 * 7, ring: 1 },
]

// The Intelligence Loop foundation stages — Observe → Understand →
// Reason → Predict → Automate → Optimize. Names are factual capability
// labels from the Content Bible architecture (platform.ts).
export const FOUNDATION_STAGES: string[] = [
  "Observe", "Understand", "Reason", "Predict", "Automate", "Optimize",
]

// --- per-section canonical content (verbatim from lib/content) ---

export const aiSection = {
  name: "Artificial Intelligence",
  def: platformContent.canonicalDefinition,
  overview: platformContent.architecture.overview,
  // core technologies named in the Content Bible (platform components)
  components: platformContent.architecture.components.map((c) => ({
    name: c.name,
    description: c.description,
  })),
}

export const computerVisionSection = {
  name: "Computer Vision",
  def: computerVisionContent.canonicalDefinition,
  overview: computerVisionContent.architecture.overview,
  components: computerVisionContent.architecture.components.map((c) => ({
    name: c.name,
    description: c.description,
  })),
}

export const edgeAiSection = {
  name: "Edge AI",
  def: edgeAiContent.canonicalDefinition,
  overview: edgeAiContent.architecture.overview,
  components: edgeAiContent.architecture.components.map((c) => ({
    name: c.name,
    description: c.description,
  })),
}

export const digitalTwinSection = {
  name: "Digital Twin",
  def: digitalTwinContent.canonicalDefinition,
  overview: digitalTwinContent.architecture.overview,
  components: digitalTwinContent.architecture.components.map((c) => ({
    name: c.name,
    description: c.description,
  })),
}

export const aiAgentsSection = {
  name: "AI Agents",
  def: aiAgentsContent.canonicalDefinition,
  overview: aiAgentsContent.architecture.overview,
  components: aiAgentsContent.architecture.components.map((c) => ({
    name: c.name,
    description: c.description,
  })),
}

export const enterpriseCloudSection = {
  name: "Enterprise Cloud",
  def: businessCloudContent.canonicalDefinition,
  overview: businessCloudContent.architecture.overview,
  components: businessCloudContent.architecture.components.map((c) => ({
    name: c.name,
    description: c.description,
  })),
}

// The digital engineering software delivery pipeline stages — factual
// engineering-stage names (not marketing copy).
export const DEV_PIPELINE: { stage: string; tag: string }[] = [
  { stage: "Design", tag: "spec" },
  { stage: "Develop", tag: "build" },
  { stage: "Test", tag: "verify" },
  { stage: "Deploy", tag: "release" },
  { stage: "Monitor", tag: "observe" },
  { stage: "Improve", tag: "iterate" },
]

// Security & Architecture — one connected security layer. Factual
// security-domain names (not marketing copy).
export const SECURITY_LAYERS: string[] = [
  "Zero Trust", "Encryption", "Governance", "Identity", "Compliance", "Monitoring",
]

// The Technology Stack — layered architecture (Applications → Hardware).
// Factual architecture-layer names from the Content Bible architecture.
export const TECH_STACK: string[] = [
  "Applications",
  "Enterprise Software",
  "AI Models",
  "Data Layer",
  "Cloud",
  "Infrastructure",
  "Hardware",
]

// Enterprise Cloud business systems that synchronize into One AI OS.
export const BUSINESS_SYSTEMS: string[] = [
  "ERP", "CRM", "HRM", "Finance", "Operations",
]

// The AI Agents orchestration stages: planning → reasoning → tool
// execution → API orchestration → workflow completion.
export const AGENT_FLOW: string[] = [
  "Plan", "Reason", "Execute", "Orchestrate", "Complete",
]

// The Computer Vision live inference pipeline.
export const CV_PIPELINE: string[] = [
  "Camera", "Detection", "Tracking", "Analysis", "Alert",
]

// The Edge AI cloud-to-edge metrics (representative only).
export const EDGE_METRICS: { label: string; value: string; fill: number }[] = [
  { label: "Edge Latency", value: "11ms", fill: 18 },
  { label: "Local Inference", value: "94%", fill: 94 },
  { label: "Bandwidth Saved", value: "82%", fill: 82 },
  { label: "Edge Nodes", value: "2,914", fill: 88 },
]

// The Traditional vs SVARA comparison — derived verbatim from the
// platform Content Bible comparisons (point tools vs connected system).
export const TECH_COMPARISONS = platformContent.comparisons.map((c) => ({
  concept: c.concept,
  traditional: c.description,
  svara: c.differentiator,
}))