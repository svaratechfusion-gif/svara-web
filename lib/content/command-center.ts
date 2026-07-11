import type { ProductContent } from "../types/content"

export const commandCenterContent: ProductContent = {
  canonicalDefinition:
    "Command Center is SVARA's centralized operations product that provides unified visibility, control, and orchestration across all Intelligence Loop capabilities and enterprise systems — the single pane of glass for enterprise intelligence.",
  aiAnswerTarget:
    "**Command Center** is SVARA's centralized operations product that provides unified visibility, control, and orchestration across all Intelligence Loop capabilities and enterprise systems.",
  architecture: {
    overview:
      "Command Center aggregates data from all Intelligence Loop layers into a unified operational interface. It provides real-time dashboards, alert management, workflow orchestration, and manual override capabilities for human operators.",
    components: [
      { name: "Operations Dashboard", description: "Real-time visualization of all intelligence capabilities and operational metrics." },
      { name: "Alert Center", description: "Unified alert management with triage, escalation, and response workflows." },
      { name: "Orchestration Console", description: "Manual and automated orchestration of actions across enterprise systems." },
      { name: "Analytics Workspace", description: "Ad-hoc analysis and reporting across all intelligence data." },
    ],
    dataFlow:
      "Command Center subscribes to data streams from all Intelligence Loop layers. Operators interact through the dashboard, manage alerts, orchestrate actions, and run analyses — all through a single interface.",
  },
  useCases: [
    {
      title: "Centralized Operations Management",
      description: "Monitor and manage all facilities, intelligence capabilities, and operational metrics from a single command center interface.",
      industries: ["Manufacturing", "Energy", "Smart Cities"],
    },
    {
      title: "Incident Response Coordination",
      description: "Detect, triage, escalate, and respond to operational incidents across multiple systems from a unified console.",
      industries: ["Manufacturing", "Energy", "Logistics"],
    },
  ],
  deployment: {
    overview:
      "Command Center deploys as a web-based operations console that connects to all Intelligence Loop layers. It is typically the final layer deployed, providing unified visibility over all other capabilities.",
    steps: [
      "Connect to all Intelligence Loop capability APIs",
      "Configure dashboards for operational domains",
      "Set up alert routing and escalation policies",
      "Define orchestration workflows",
      "Configure user roles and permissions",
      "Train operations team on unified interface",
    ],
  },
  industries: [
    { name: "Manufacturing", description: "Plant-wide operations management, multi-factory command center.", url: "/industries/manufacturing" },
    { name: "Energy", description: "Grid operations center, plant control room consolidation.", url: "/industries/energy" },
    { name: "Smart Cities", description: "City-wide operations center, cross-system incident response.", url: "/industries/smart-cities" },
  ],
  faqs: [
    { question: "Can Command Center integrate with existing control rooms?", answer: "Yes. Command Center can complement or replace existing control room interfaces, integrating data from existing systems through APIs." },
    { question: "What customization is available?", answer: "Dashboards, alerts, workflows, and views are fully customizable per operator role and operational domain." },
    { question: "Is mobile access supported?", answer: "Yes. Command Center provides responsive web access and native mobile apps for operators on the go." },
  ],
  comparisons: [
    { concept: "SCADA HMI", description: "Human-machine interfaces for industrial control systems.", differentiator: "Command Center covers the entire enterprise, not just process control. It integrates intelligence from all layers, not just sensor data." },
    { concept: "Monitoring Dashboards (Grafana, etc.)", description: "General-purpose monitoring and visualization tools.", differentiator: "Command Center is purpose-built for operations with integrated alert management, orchestration, and action execution — not just visualization." },
  ],
  capability: "Coordinate",
  outcomes: ["Coordinate"],
  roi: {
    overview:
      "Command Center deployments typically reduce operator cognitive load by 50%, improve incident response time by 60%, and eliminate context-switching between 5+ separate monitoring tools.",
    metrics: [
      { label: "Operator Cognitive Load Reduction", value: "50%" },
      { label: "Incident Response Improvement", value: "60%" },
      { label: "Consolidated Tools", value: "From 5+ to 1" },
    ],
  },
  resources: [
    { title: "Centralized Operations Centers for Enterprise Intelligence", type: "research" },
    { title: "Human-Computer Interaction in Control Rooms", type: "research" },
    { title: "ISA-101 Human-Machine Interfaces Standards", type: "standard" },
  ],
  relatedProducts: [
    { name: "AI OS", url: "/products/ai-os", description: "The operating system for enterprise intelligence." },
    { name: "Business Cloud", url: "/products/business-cloud", description: "One data plane across every enterprise system." },
    { name: "Growth Intelligence", url: "/products/growth-intelligence", description: "Continuous optimization and outcome automation." },
  ],
  metadata: {
    title: "Command Center — Centralized Intelligence Operations | SVARA",
    description: "Command Center provides unified visibility, control, and orchestration across all Intelligence Loop capabilities and enterprise systems.",
    pageType: "product",
    datePublished: "2026-07-08",
    dateModified: "2026-07-08",
    primaryEntity: "Command Center",
    mentions: ["Coordinate", "AI OS", "Business Cloud", "Operations"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/products" },
      { name: "Command Center", url: "/products/command-center" },
    ],
  },
}
