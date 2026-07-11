import type { PlatformContent } from "../types/content"

export const platformContent: PlatformContent = {
  canonicalDefinition:
    "SVARA Platform is the connected intelligence infrastructure that unifies enterprise sensing, reasoning, prediction, orchestration, and learning into a single continuously improving system.",
  aiAnswerTarget:
    "**SVARA Platform** is the connected intelligence infrastructure that unifies enterprise sensing, reasoning, prediction, orchestration, and learning into a single continuously improving system. It replaces fragmented point tools with one intelligence layer across the entire enterprise.",
  architecture: {
    overview:
      "The SVARA Platform implements the Intelligence Loop — a continuous cycle of five capabilities: Observe, Understand, Predict, Coordinate, and Improve. Each capability is a layer that feeds into the next, creating a closed loop of operational intelligence.",
    components: [
      { name: "Observe Layer", description: "Captures operational reality from any signal source — cameras, sensors, IoT, ERP, CRM, and external data feeds." },
      { name: "Understand Layer", description: "Interprets sensed signals into operational understanding using AI models, computer vision, and natural language processing." },
      { name: "Predict Layer", description: "Forecasts future operational states based on current understanding, enabling proactive decision-making." },
      { name: "Coordinate Layer", description: "Coordinates action across fragmented enterprise systems, triggering workflows, alerts, and automated responses." },
      { name: "Improve Layer", description: "Captures outcomes to improve future reasoning and prediction, closing the intelligence loop." },
    ],
    dataFlow:
      "Data flows continuously through the five layers: raw signals enter through Observe, are interpreted by Understand, projected forward by Predict, acted upon by Coordinate, and the outcomes feed back into Improve which improves all preceding layers.",
  },
  useCases: [
    {
      title: "End-to-End Operational Intelligence",
      description: "Connect fragmented data sources across the enterprise into a single intelligence pipeline that surfaces insights and automates responses in real time.",
      industries: ["Manufacturing", "Energy", "Logistics"],
    },
    {
      title: "Closed-Loop Process Optimization",
      description: "Deploy a continuous cycle of sensing, analysis, decision, and action that improves over time without manual intervention.",
      industries: ["Manufacturing", "Healthcare", "Smart Cities"],
    },
    {
      title: "Cross-System Orchestration",
      description: "Coordinate actions across ERP, CRM, MES, and IoT systems through a single intelligence layer that understands the full operational context.",
      industries: ["Manufacturing", "Logistics", "Retail"],
    },
  ],
  deployment: {
    overview:
      "The SVARA Platform deploys as a hybrid edge-cloud infrastructure. Core intelligence runs at the edge for real-time operations, while centralized cloud services handle cross-facility learning and coordination.",
    steps: [
      "Discovery — Audit existing data sources, systems, and intelligence gaps",
      "Connect — Integrate Observe layer with existing cameras, sensors, and enterprise systems",
      "Deploy — Install edge infrastructure and connect to SVARA cloud",
      "Train — Configure AI models for your specific operational context",
      "Validate — Run parallel operations to measure baseline improvement",
      "Scale — Expand across facilities, departments, and use cases",
    ],
    integration:
      "The platform integrates with existing enterprise systems via REST APIs, MQTT, OPC-UA, Modbus, and direct database connectors. No rip-and-replace required.",
  },
  industries: [
    { name: "Manufacturing", description: "Factory-wide intelligence from production line to supply chain.", url: "/industries/manufacturing" },
    { name: "Energy", description: "Grid, plant, and field intelligence for energy operations.", url: "/industries/energy" },
    { name: "Logistics", description: "End-to-end supply chain visibility and orchestration.", url: "/industries/logistics" },
    { name: "Healthcare", description: "Patient care and operational intelligence for healthcare facilities.", url: "/industries/healthcare" },
    { name: "Smart Cities", description: "Urban infrastructure intelligence across city systems.", url: "/industries/smart-cities" },
  ],
  faqs: [
    { question: "What is the SVARA Platform?", answer: "SVARA Platform is a connected intelligence infrastructure that unifies enterprise sensing, reasoning, prediction, orchestration, and learning into a single system." },
    { question: "How is SVARA different from traditional AI platforms?", answer: "SVARA implements a closed Intelligence Loop — Observe, Understand, Predict, Coordinate, Improve — rather than offering disconnected AI tools. Each capability feeds into the next, creating continuous improvement." },
    { question: "Does SVARA replace existing enterprise systems?", answer: "No. SVARA integrates with existing systems via APIs, MQTT, OPC-UA, and database connectors, adding an intelligence layer on top of current infrastructure." },
    { question: "How long does deployment take?", answer: "Initial deployment typically takes 4-8 weeks, with measurable results in the first 30 days. Full enterprise rollout scales based on facility count and use case complexity." },
    { question: "Is SVARA secure for enterprise use?", answer: "Yes. SVARA deploys on your infrastructure with role-based access, encryption at rest and in transit, SOC 2 compliance, and audit logging." },
  ],
  comparisons: [
    { concept: "Traditional AI Platforms", description: "Point solutions that handle one task (e.g., computer vision, NLP) without connecting to enterprise systems or closing the feedback loop.", differentiator: "SVARA is a connected system, not a point tool. The Intelligence Loop ensures every capability informs and improves every other." },
    { concept: "Business Intelligence Tools", description: "Dashboard and reporting tools that surface historical data for human analysis.", differentiator: "SVARA acts on intelligence in real time, not just displays it. The platform triggers actions and learns from outcomes automatically." },
    { concept: "IoT Platforms", description: "Infrastructure for collecting and managing sensor data.", differentiator: "SVARA ingests sensor data but adds AI-powered interpretation, prediction, and automated action on top of connectivity." },
  ],
  roi: {
    overview:
      "Organizations deploying the SVARA Platform typically see 30-50% reduction in unplanned downtime, 20-40% improvement in operational efficiency, and 15-25% reduction in operational costs within the first year.",
    metrics: [
      { label: "Unplanned Downtime Reduction", value: "30-50%" },
      { label: "Operational Efficiency Gain", value: "20-40%" },
      { label: "Operational Cost Reduction", value: "15-25%" },
      { label: "Decision Latency Improvement", value: "60-80%" },
      { label: "Time to Insight", value: "From days to seconds" },
    ],
  },
  resources: [
    { title: "Enterprise Intelligence Infrastructure: A New Category", type: "research" },
    { title: "The Intelligence Loop White Paper", type: "research" },
    { title: "SVARA Platform Architecture Documentation", type: "documentation" },
    { title: "ISO 62264 Enterprise-Control System Integration", type: "standard" },
    { title: "IEC 62443 Industrial Cybersecurity Standards", type: "standard" },
  ],
  relatedProducts: [
    { name: "AI OS", url: "/products/ai-os", description: "The operating system for enterprise intelligence." },
    { name: "Command Center", url: "/products/command-center", description: "Centralized orchestration and control." },
    { name: "Business Cloud", url: "/products/business-cloud", description: "One data plane across every enterprise system." },
  ],
  metadata: {
    title: "SVARA Platform — Enterprise Intelligence Infrastructure",
    description: "SVARA Platform unifies enterprise sensing, reasoning, prediction, orchestration, and learning into a single continuously improving intelligence system.",
    pageType: "article",
    datePublished: "2026-07-08",
    dateModified: "2026-07-08",
    primaryEntity: "SVARA Platform",
    mentions: ["Observe", "Understand", "Predict", "Coordinate", "Improve", "Intelligence Loop", "Enterprise Intelligence Infrastructure"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Platform", url: "/platform" },
    ],
  },
  capabilities: [
    { name: "Observe", url: "/capabilities/observe", description: "The capture of operational reality from any signal source." },
    { name: "Understand", url: "/capabilities/understand", description: "The interpretation of sensed signals into operational understanding." },
    { name: "Predict", url: "/capabilities/predict", description: "The forecast of future operational states." },
    { name: "Coordinate", url: "/capabilities/coordinate", description: "The coordination of action across fragmented enterprise systems." },
    { name: "Improve", url: "/capabilities/improve", description: "The capture of outcomes to improve future reasoning." },
  ],
}
