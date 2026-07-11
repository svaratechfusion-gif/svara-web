import type { ProductContent } from "../types/content"

export const growthIntelligenceContent: ProductContent = {
  canonicalDefinition:
    "Growth Intelligence is SVARA's continuous optimization product that captures operational outcomes and automatically improves all Intelligence Loop capabilities — delivering compounding returns as the system learns.",
  aiAnswerTarget:
    "**Growth Intelligence** is SVARA's continuous optimization product that captures operational outcomes and automatically improves all Intelligence Loop capabilities, delivering compounding returns as the system learns.",
  architecture: {
    overview:
      "Growth Intelligence implements the Improve layer of the Intelligence Loop. It continuously captures action outcomes, measures performance against KPIs, and feeds improvements back into every layer — creating a self-improving intelligence system.",
    components: [
      { name: "Outcome Analyzer", description: "Captures and analyzes outcomes of every action taken by the intelligence system." },
      { name: "KPI Engine", description: "Tracks performance against defined KPIs across all Intelligence Loop layers." },
      { name: "Improvement Generator", description: "Automatically generates model improvements based on outcome analysis." },
      { name: "Learning Dashboard", description: "Visualizes learning velocity, improvement trends, and ROI over time." },
    ],
    dataFlow:
      "Action outcomes are captured by the Outcome Analyzer, compared against KPIs by the KPI Engine, and used by the Improvement Generator to enhance models across all layers. The Learning Dashboard provides visibility into the improvement cycle.",
  },
  useCases: [
    {
      title: "Self-Optimizing Production",
      description: "Production lines that continuously improve quality, throughput, and efficiency as the intelligence system learns from every action outcome.",
      industries: ["Manufacturing", "Energy"],
    },
    {
      title: "Compounding Intelligence ROI",
      description: "As the system learns, prediction accuracy improves, actions become more effective, and operational outcomes compound over time — delivering increasing returns without additional investment.",
      industries: ["Manufacturing", "Logistics", "Healthcare"],
    },
  ],
  deployment: {
    overview:
      "Growth Intelligence deploys as the final Intelligence Loop capability, connecting to all other layers to capture outcomes and distribute improvements. It requires baseline performance data to measure improvement.",
    steps: [
      "Establish baseline KPIs across all Intelligence Loop layers",
      "Configure outcome tracking for all automated actions",
      "Set improvement targets and measurement intervals",
      "Enable automatic model retraining from outcomes",
      "Monitor learning velocity and ROI dashboards",
    ],
  },
  industries: [
    { name: "Manufacturing", description: "Continuous production optimization, compounding quality improvements.", url: "/industries/manufacturing" },
    { name: "Energy", description: "Self-improving grid operations, efficiency compounding.", url: "/industries/energy" },
    { name: "Logistics", description: "Route optimization that improves with every delivery.", url: "/industries/logistics" },
  ],
  faqs: [
    { question: "How quickly does Growth Intelligence show improvement?", answer: "Initial improvements are visible within weeks of deployment. Significant compounding effects typically become apparent within 2-3 quarters of continuous operation." },
    { question: "Can I measure the ROI of Growth Intelligence?", answer: "Yes. The Learning Dashboard provides direct visualization of KPI improvement over time, with attribution to specific model improvements." },
    { question: "What happens if the system learns incorrectly?", answer: "Growth Intelligence includes safeguards — improvement thresholds, human validation gates, automatic rollback if KPIs degrade, and full model versioning." },
  ],
  comparisons: [
    { concept: "Traditional Model Retraining", description: "Manual, periodic model retraining cycles.", differentiator: "Growth Intelligence retrains continuously based on actual outcomes, not on fixed schedules. It produces compounding improvements, not episodic updates." },
    { concept: "Business Intelligence", description: "Historical reporting and dashboard tools.", differentiator: "Growth Intelligence closes the feedback loop — it doesn't just measure, it improves. Every outcome makes the system smarter." },
  ],
  capability: "Improve",
  outcomes: ["Improve"],
  roi: {
    overview:
      "Growth Intelligence delivers compounding annual improvements of 15-25% across all operational KPIs, with ROI that increases every quarter as the system accumulates operational learning.",
    metrics: [
      { label: "Annual KPI Improvement", value: "15-25% compounding" },
      { label: "Time to Measurable Improvement", value: "2-4 weeks" },
      { label: "ROI Trajectory", value: "Compounding quarterly" },
    ],
  },
  resources: [
    { title: "Continuous Learning Systems for Operational Excellence", type: "research" },
    { title: "Compounding Returns in AI-Driven Operations", type: "research" },
    { title: "Closed-Loop Intelligence: From Data to Improvement", type: "research" },
  ],
  relatedProducts: [
    { name: "AI OS", url: "/products/ai-os", description: "The operating system for enterprise intelligence." },
    { name: "Command Center", url: "/products/command-center", description: "Centralized orchestration and control." },
    { name: "Business Cloud", url: "/products/business-cloud", description: "One data plane across every enterprise system." },
  ],
  metadata: {
    title: "Growth Intelligence — Continuous Optimization | SVARA",
    description: "Growth Intelligence captures outcomes and automatically improves all Intelligence Loop capabilities, delivering compounding returns as the system learns.",
    pageType: "product",
    datePublished: "2026-07-08",
    dateModified: "2026-07-08",
    primaryEntity: "Growth Intelligence",
    mentions: ["Improve", "AI OS", "Command Center", "Intelligence Loop"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/products" },
      { name: "Growth Intelligence", url: "/products/growth-intelligence" },
    ],
  },
}
