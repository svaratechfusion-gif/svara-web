// SVARA DIVISIONS — Volume 03 (Divisions) Content Bible enrichment layer.
// Division NAMES, title, teaser, and paragraphs are imported VERBATIM from
// the Content Bible (lib/content/home → homeSection04) and never redefined
// here. Only UI-only metadata that has no editorial voice — a per-studio
// visual-identity key + a live-engineering mock schema — is added so the
// Six Engineering Studios can each render a distinct application surface
// while remaining clearly one unified SVARA ecosystem.

import { homeSection04 } from "~~/lib/content/home"

export type StudioVisual =
  | "inference"   // Artificial Intelligence — AI inference, computer vision, autonomous systems
  | "twin"        // Simulation — Digital Twins, simulations, factory visualization
  | "saas"        // Enterprise Software — floating enterprise application windows
  | "os"          // Cloud Infrastructure — enterprise AI assistant, orchestration, reasoning
  | "devops"      // Digital Engineering — APIs, cloud architecture, deployments, DevOps
  | "growth"      // Digital Transformation — marketing intelligence, SEO, analytics, dashboards

export interface StudioMetric { label: string; value: string; fill: number }
export interface StudioModel {
  /** Canonical division name — verbatim from the Content Bible */
  name: string
  /** verbatim focus descriptor describing the studio's engineering surface */
  focus: string
  /** which distinct application mock this studio renders */
  visual: StudioVisual
  /** short engineering tag for the studio's studio-placard */
  tag: string
  /** live-engineering mock metrics (representative only — no marketing copy) */
  metrics: StudioMetric[]
}

// The six Bible division names are indexed in their canonical order. The
// `focus` lines are taken verbatim from the page brief (the studio visual
// identities) — they describe the engineering surface of each studio, not
// new brand messaging.
export const STUDIOS: StudioModel[] = [
  {
    name: homeSection04.divisions[0]!,
    focus: "AI inference, computer vision, autonomous systems.",
    visual: "inference",
    tag: "Deep Tech & Autonomous Intelligence",
    metrics: [
      { label: "Inference Throughput", value: "48.2k fps", fill: 84 },
      { label: "Model Latency", value: "11ms", fill: 22 },
      { label: "Active Models", value: "312", fill: 62 },
    ],
  },
  {
    name: homeSection04.divisions[1]!,
    focus: "Floating enterprise application windows.",
    visual: "saas",
    tag: "Business SaaS Studio",
    metrics: [
      { label: "Modules Live", value: "47", fill: 58 },
      { label: "Records Synced", value: "1.2B", fill: 90 },
      { label: "Sessions", value: "8,206", fill: 68 },
    ],
  },
  {
    name: homeSection04.divisions[2]!,
    focus: "Digital Twins, simulations, factory visualization.",
    visual: "twin",
    tag: "Interactive AI & Simulation",
    metrics: [
      { label: "Twin Fidelity", value: "99.2%", fill: 98 },
      { label: "Simulations Run", value: "18.4k", fill: 76 },
      { label: "Forecast Horizon", value: "72h", fill: 66 },
    ],
  },
  {
    name: homeSection04.divisions[3]!,
    focus: "APIs, cloud architecture, deployments, DevOps.",
    visual: "devops",
    tag: "Digital Engineering",
    metrics: [
      { label: "Pipelines", value: "318", fill: 72 },
      { label: "Deployments", value: "5,914", fill: 78 },
      { label: "Build Health", value: "99.4%", fill: 99 },
    ],
  },
  {
    name: homeSection04.divisions[4]!,
    focus: "Enterprise AI assistant, orchestration, reasoning.",
    visual: "os",
    tag: "One AI OS & Intelligence Platform",
    metrics: [
      { label: "Intent Resolved", value: "94.1%", fill: 94 },
      { label: "Orchestrations", value: "52.7k", fill: 82 },
      { label: "Reasoning Tasks", value: "6,031", fill: 60 },
    ],
  },
  {
    name: homeSection04.divisions[5]!,
    focus: "Marketing intelligence, SEO, analytics, campaign dashboards.",
    visual: "growth",
    tag: "Digital Growth & PR Tech",
    metrics: [
      { label: "Engagement Lift", value: "+34%", fill: 68 },
      { label: "Reach / mo", value: "42.8M", fill: 84 },
      { label: "Conversion Index", value: "7.9", fill: 79 },
    ],
  },
]

export const STUDIO_COUNT = STUDIOS.length

// The transformation pipeline for "Why Specialized Divisions Matter" —
// represented as a single visual transformation story. Labels are
// factual engineering-stage names, not marketing copy.
export const TRANSFORM_PIPELINE: { stage: string; tag: string }[] = [
  { stage: "Enterprise Transformation", tag: "the starting point" },
  { stage: "AI", tag: "intelligence" },
  { stage: "Engineering", tag: "build" },
  { stage: "Cloud", tag: "deploy" },
  { stage: "Simulation", tag: "predict" },
  { stage: "Growth", tag: "outcome" },
  { stage: "One Connected Organization", tag: "ecosystem" },
]

// The shared engineering backbone for "One Engineering Philosophy".
export const SHARED_BACKBONE: string[] = [
  "Shared Architecture",
  "Shared Security",
  "Shared Data Layer",
  "Shared Intelligence",
  "Shared Experience",
]

// The enterprise use case for "Building Complete Enterprise Solutions" —
// one problem-to-outcome flow showing multiple divisions working together.
// Stages reference the six divisions by their engineering surface.
export const SOLUTION_FLOW: { stage: string; division: string; visual: StudioVisual }[] = [
  { stage: "Problem", division: "Operational blind spots across facilities", visual: "devops" },
  { stage: "Sense", division: "Artificial Intelligence", visual: "inference" },
  { stage: "Predict", division: "Simulation", visual: "twin" },
  { stage: "Build", division: "Digital Engineering", visual: "devops" },
  { stage: "Deploy", division: "Cloud Infrastructure", visual: "os" },
  { stage: "Run", division: "Enterprise Software", visual: "saas" },
  { stage: "Grow", division: "Digital Transformation", visual: "growth" },
  { stage: "Outcome", division: "Unified enterprise intelligence", visual: "growth" },
]

// The modular adoption journey for "Enterprise Growth Journey".
export const GROWTH_STAGES: string[] = [
  "One Division",
  "Multiple Divisions",
  "Connected Enterprise",
  "Continuous Innovation",
]