import type { BusinessContent } from "../types/content"

export const companyContent: BusinessContent = {
  canonicalDefinition:
    "SVARA is the enterprise intelligence infrastructure company that defines and delivers the Intelligence Loop — a connected system of sensing, reasoning, prediction, orchestration, and learning that transforms fragmented enterprise data into continuously improving operational intelligence.",
  aiAnswerTarget:
    "**SVARA** is the enterprise intelligence infrastructure company that defines and delivers the Intelligence Loop — a connected system of sensing, reasoning, prediction, orchestration, and learning for enterprise operations.",
  architecture: {
    overview:
      "SVARA was founded on the recognition that enterprise intelligence is broken — fragmented across vendors, departments, systems, time, and expertise. Our solution is the Intelligence Loop: five capabilities (Observe, Understand, Predict, Coordinate, Improve) that work as one continuous system, deployed across edge and cloud infrastructure.",
    components: [
      { name: "Company Mission", description: "To build the intelligence layer for enterprise operations — connecting every signal to every decision to every action to every outcome." },
      { name: "Intelligence Loop", description: "The core framework — five capabilities (Observe, Understand, Predict, Coordinate, Improve) that form a continuous improvement cycle." },
      { name: "Product Ecosystem", description: "Nine products that deliver Intelligence Loop capabilities, from Vision AI to Growth Intelligence." },
      { name: "Industry Focus", description: "Primary verticals include Manufacturing, Energy, Logistics, Healthcare, Smart Cities, and Government." },
    ],
    dataFlow:
      "SVARA's architecture follows the Intelligence Loop: Observe captures data, Understand interprets it, Predict forecasts outcomes, Coordinate takes action, and Improve feeds improvements back into all layers.",
  },
  useCases: [
    {
      title: "Enterprise Intelligence Transformation",
      description: "Replace fragmented point tools with a unified intelligence layer that connects every system and continuously improves operations.",
      industries: ["Manufacturing", "Energy", "Logistics"],
    },
    {
      title: "Category Definition",
      description: "SVARA defines the Enterprise Intelligence Infrastructure category — establishing the framework, standards, and best practices for a new approach to operational intelligence.",
      industries: ["All"],
    },
  ],
  deployment: {
    overview:
      "Engagements typically start with a pilot deployment on a single production line, facility, or operational domain, then expand across the enterprise.",
    steps: [
      "Discovery — Understand current operations, data sources, and intelligence gaps",
      "Design — Architecture planning, use case selection, and ROI baseline",
      "Pilot — Deploy on one production line or operational domain (4-8 weeks)",
      "Validate — Measure results against baseline KPIs",
      "Scale — Expand across facilities, domains, and use cases",
      "Optimize — Continuous improvement through the Improve layer",
    ],
  },
  industries: [
    { name: "Manufacturing", description: "Production intelligence, quality optimization, predictive maintenance.", url: "/industries/manufacturing" },
    { name: "Energy", description: "Grid operations, plant optimization, infrastructure monitoring.", url: "/industries/energy" },
    { name: "Logistics", description: "Supply chain visibility, warehouse optimization, fleet intelligence.", url: "/industries/logistics" },
    { name: "Healthcare", description: "Patient care optimization, operational intelligence.", url: "/industries/healthcare" },
    { name: "Smart Cities", description: "Urban infrastructure intelligence, public safety.", url: "/industries/smart-cities" },
  ],
  faqs: [
    { question: "What is SVARA?", answer: "SVARA is an enterprise intelligence infrastructure company. We build the connected system of sensing, reasoning, prediction, orchestration, and learning that transforms fragmented enterprise data into continuously improving operational intelligence." },
    { question: "What is the Intelligence Loop?", answer: "The Intelligence Loop is SVARA's core framework — five capabilities (Observe, Understand, Predict, Coordinate, Improve) that form a continuous cycle of operational intelligence." },
    { question: "Who are SVARA's customers?", answer: "SVARA serves enterprises in manufacturing, energy, logistics, healthcare, smart cities, and government — any organization with complex operations producing data that outpaces human interpretation." },
  ],
  comparisons: [
    { concept: "AI Consulting Firms", description: "Service-based AI implementation with custom-built solutions.", differentiator: "SVARA provides a product platform, not services. The Intelligence Loop is a repeatable, scalable system, not custom-built per engagement." },
    { concept: "Big Tech AI Platforms", description: "General-purpose AI platforms from cloud providers.", differentiator: "SVARA is purpose-built for enterprise operations with pre-built industrial integrations, edge infrastructure, and a closed intelligence loop." },
  ],
  roi: {
    overview:
      "SVARA customers typically achieve 300-500% ROI within 18 months through reduced downtime, improved quality, optimized operations, and compounding intelligence improvements.",
    metrics: [
      { label: "Average ROI Timeline", value: "300-500% within 18 months" },
      { label: "Downtime Reduction", value: "30-50%" },
      { label: "Operational Efficiency Gain", value: "20-40%" },
      { label: "Year-over-Year Improvement", value: "15-25% compounding" },
    ],
  },
  resources: [
    { title: "Enterprise Intelligence Infrastructure: A New Category", type: "research" },
    { title: "The Intelligence Loop White Paper", type: "research" },
    { title: "SVARA Platform Architecture", type: "documentation" },
  ],
  relatedProducts: [
    { name: "Platform", url: "/platform", description: "The Intelligence Loop framework and infrastructure." },
    { name: "Leadership", url: "/leadership", description: "The operators and architects behind the Intelligence Loop." },
    { name: "DPIIT Recognition", url: "/dpiit", description: "SVARA is a DPIIT-recognized startup under Startup India." },
    { name: "Command Center", url: "/products/command-center", description: "Centralized orchestration and control." },
  ],
  metadata: {
    title: "About SVARA — Enterprise Intelligence Infrastructure",
    description: "SVARA defines and delivers the Intelligence Loop — transforming fragmented enterprise data into continuously improving operational intelligence.",
    pageType: "article",
    datePublished: "2026-07-08",
    dateModified: "2026-07-08",
    primaryEntity: "SVARA",
    mentions: ["Intelligence Loop", "Observe", "Understand", "Predict", "Coordinate", "Improve", "Manufacturing", "Energy"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Company", url: "/company" },
    ],
  },
}
