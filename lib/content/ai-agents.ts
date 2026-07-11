import type { ProductContent } from "../types/content"

export const aiAgentsContent: ProductContent = {
  canonicalDefinition:
    "AI Agents is SVARA's autonomous workflow product that deploys intelligent agents to execute complex operational tasks — monitoring systems, making decisions, and taking actions without human intervention.",
  aiAnswerTarget:
    "**AI Agents** is SVARA's autonomous workflow product that deploys intelligent agents to execute complex operational tasks across enterprise systems, transforming intelligence into automated action.",
  architecture: {
    overview:
      "AI Agents uses a multi-agent architecture where specialized agents handle different operational domains. Agents communicate through a shared event bus, coordinate actions, and escalate to humans when confidence is low.",
    components: [
      { name: "Agent Runtime", description: "Execution environment for autonomous agent workflows." },
      { name: "Agent Registry", description: "Catalog of available agent types and their capabilities." },
      { name: "Event Bus", description: "Inter-agent communication and event distribution." },
      { name: "Human Handoff Manager", description: "Managed escalation when agents require human judgment." },
    ],
    dataFlow:
      "Operational events enter through the event bus, agents evaluate events against their decision models, execute actions, and publish outcomes back to the bus for other agents to consume.",
  },
  useCases: [
    {
      title: "Automated Production Adjustments",
      description: "Deploy agents that monitor production metrics and automatically adjust parameters to maintain optimal quality and throughput.",
      industries: ["Manufacturing", "Energy"],
    },
    {
      title: "Intelligent Alert Triage",
      description: "Agents that receive alerts, correlate with contextual data, determine root cause, and take corrective action or escalate.",
      industries: ["Manufacturing", "Healthcare", "Smart Cities"],
    },
  ],
  deployment: {
    overview:
      "AI Agents deploy alongside the Coordinate layer. Agents are configured with decision models, operating boundaries, and escalation rules. Human operators define autonomy levels per agent type.",
    steps: [
      "Define agent workflows and decision boundaries",
      "Configure connectors to enterprise systems",
      "Set autonomy levels and escalation rules",
      "Deploy agents to production with human oversight",
      "Monitor agent decisions and refine models",
    ],
  },
  industries: [
    { name: "Manufacturing", description: "Production line automation, quality control agents, maintenance dispatch.", url: "/industries/manufacturing" },
    { name: "Energy", description: "Grid balancing agents, plant operations automation.", url: "/industries/energy" },
    { name: "Logistics", description: "Route optimization agents, inventory management automation.", url: "/industries/logistics" },
  ],
  faqs: [
    { question: "How autonomous are AI Agents?", answer: "Autonomy is fully configurable — from recommend-only mode through fully autonomous execution. You set the autonomy level per agent type and can adjust at any time." },
    { question: "Can agents work together?", answer: "Yes. Agents communicate through a shared event bus, allowing multi-agent workflows where specialized agents coordinate on complex tasks." },
    { question: "What happens when an agent is uncertain?", answer: "Agents escalate to human operators with full context, recommended actions, and confidence scores. The human decides or overrides." },
  ],
  comparisons: [
    { concept: "Chatbots / Conversational AI", description: "AI systems designed for conversation and question answering.", differentiator: "AI Agents execute actions in enterprise systems, not just answer questions. They change operational states, not just inform." },
    { concept: "Robotic Process Automation", description: "Rule-based automation of repetitive digital tasks.", differentiator: "AI Agents use AI to make decisions, not just follow rules. They adapt to changing conditions and handle novel situations." },
  ],
  capability: "Understand",
  outcomes: ["Understand", "Coordinate"],
  roi: {
    overview:
      "AI Agents deployments typically automate 50-70% of operational decisions, reduce decision latency from hours to seconds, and free human operators for higher-value work.",
    metrics: [
      { label: "Operational Decisions Automated", value: "50-70%" },
      { label: "Decision Latency Reduction", value: "Hours to seconds" },
      { label: "Operator Productivity Gain", value: "3-5x" },
    ],
  },
  resources: [
    { title: "Multi-Agent Systems for Industrial Operations", type: "research" },
    { title: "Autonomous Decision-Making in Enterprise Environments", type: "research" },
    { title: "Human-in-the-Loop Agent Design Patterns", type: "research" },
  ],
  relatedProducts: [
    { name: "Digital Twin", url: "/products/digital-twin", description: "Simulate before you change it." },
    { name: "Command Center", url: "/products/command-center", description: "Centralized orchestration and control." },
    { name: "Edge AI", url: "/products/edge-ai", description: "Inference at the source, without the round trip." },
  ],
  metadata: {
    title: "AI Agents — Autonomous Workflow Intelligence | SVARA",
    description: "AI Agents deploys intelligent agents to execute complex operational tasks across enterprise systems with configurable autonomy levels.",
    pageType: "product",
    datePublished: "2026-07-08",
    dateModified: "2026-07-08",
    primaryEntity: "AI Agents",
    mentions: ["Understand", "Coordinate", "Command Center", "Digital Twin"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/products" },
      { name: "AI Agents", url: "/products/ai-agents" },
    ],
  },
}
