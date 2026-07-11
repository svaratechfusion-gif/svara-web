import type { IndustryContent } from "../types/content"

export const retailContent: IndustryContent = {
  canonicalDefinition:
    "Retail is SVARA's industry vertical for store operations and merchandising — where the Intelligence Loop optimizes inventory turnover, shrinkage reduction, and store operations through real-time shelf, traffic, and transaction intelligence.",
  aiAnswerTarget:
    "**Retail** is SVARA's industry vertical where the Intelligence Loop transforms store operations through inventory turnover optimization, shrinkage detection, and real-time coordination between the shelf, the backroom, and the supply chain.",
  architecture: {
    overview:
      "SVARA deploys across the retail estate: Observe connects to store cameras, shelf sensors, and POS feeds, Understand interprets shelf availability and shopper behavior, Predict forecasts demand and shrinkage, Coordinate triggers replenishment and loss-prevention actions, and Improve continuously tunes pricing, planograms, and operations.",
    components: [
      { name: "Shelf Observe", description: "Cameras and weight sensors at the shelf for real-time out-of-stock, low-stock, and planogram compliance detection." },
      { name: "Store Ops Understand", description: "AI models that fuse footfall, basket data, and shelf state to identify restock priorities and shrinkage events." },
      { name: "Demand Predict", description: "Forecasting of SKU-level demand and shrinkage risk by store, daypart, and promotion." },
      { name: "Replenishment Coordinate", description: "Automated restock dispatch, planogram corrections, and loss-prevention alerting routed to floor staff." },
    ],
    dataFlow:
      "Shelf, shopper, and POS data flows into the Intelligence Loop. Availability insights trigger replenishment, demand forecasts inform ordering, and outcomes refine the models.",
  },
  useCases: [
    {
      title: "On-Shelf Availability",
      description: "Real-time shelf monitoring that detects out-of-stocks within minutes and triggers restock before a sale is lost, lifting availability above 98%.",
      industries: ["Retail"],
    },
    {
      title: "Shrinkage and Loss Prevention",
      description: "Behavior- and shelf-state fusion that flags shrinkage events — including sweep, sweet-spot removal, and ticket switching — while cutting false alerts.",
      industries: ["Retail"],
    },
    {
      title: "Store Labor Optimization",
      description: "Task orchestration that aligns restock, recovery, and service work to live footfall and shelf priority, reducing idle time and stockout windows.",
      industries: ["Retail"],
    },
  ],
  deployment: {
    overview:
      "Retail deployment begins with a pilot store, then scales across the estate. Edge gateways per store handle shelf-camera inference locally and aggregate counts to a central intelligence layer.",
    steps: [
      "Select pilot store for initial deployment",
      "Deploy edge gateways and connect shelf cameras and sensors",
      "Configure on-shelf availability and shrinkage detection models",
      "Integrate with the POS, inventory, and workforce management systems",
      "Validate against baseline availability and shrink KPIs",
      "Scale across remaining stores and the broader estate",
    ],
  },
  industries: [
    { name: "Retail", description: "Store and inventory operations transformed by the Intelligence Loop.", url: "/industries/retail" },
    { name: "Logistics", description: "Distribution center and last-mile delivery.", url: "/industries/logistics" },
    { name: "Smart Cities", description: "Consumer density and footfall intelligence.", url: "/industries/smart-cities" },
  ],
  faqs: [
    { question: "Does SVARA store or stream shopper video?", answer: "Edge-first by design. SVARA extracts shelf and footfall counts in-store and forwards only events and aggregates centrally — no continuous raw video storage of shoppers." },
    { question: "How does SVARA integrate with our existing POS and inventory systems?", answer: "SVARA connects to major POS, inventory, and workforce-management platforms via pre-built connectors and APIs, adding AI-powered intelligence without replacing existing systems." },
    { question: "What ROI do retailers typically see?", answer: "Retailers typically see 1-3% comparable sales lift from availability gains, 20-40% reduction in shrinkage, and 15-25% improvement in labor-task efficiency within the first year." },
  ],
  comparisons: [
    { concept: "Traditional Retail Loss Prevention", description: "Reactive camera review after an incident is reported.", differentiator: "SVARA detects shrinkage events live, fusing shelf state and behavior so staff act before the loss is realized." },
  ],
  applicableProducts: [
    { name: "Vision AI", url: "/products/vision-ai" },
    { name: "Edge AI", url: "/products/edge-ai" },
    { name: "Growth Intelligence", url: "/products/growth-intelligence" },
    { name: "AI Agents", url: "/products/ai-agents" },
    { name: "Command Center", url: "/products/command-center" },
  ],
  roi: {
    overview:
      "Retail deployments typically deliver 1-3% comparable sales lift, 20-40% shrinkage reduction, and 15-25% labor-task efficiency gain within the first year.",
    metrics: [
      { label: "On-Shelf Availability", value: "98%+" },
      { label: "Shrinkage Reduction", value: "20-40%" },
      { label: "Labor-task Efficiency Gain", value: "15-25%" },
      { label: "Out-of-Stock Detection Latency", value: "<5 minutes" },
    ],
  },
  resources: [
    { title: "AI-Powered On-Shelf Availability and Store Operations", type: "research" },
    { title: "Computer Vision for Retail Loss Prevention", type: "research" },
    { title: "GS1 Retail and eCommerce Standards", type: "standard" },
  ],
  relatedProducts: [
    { name: "Vision AI", url: "/products/vision-ai", description: "Real-time visual intelligence at the shelf and the door." },
    { name: "Edge AI", url: "/products/edge-ai", description: "Inference in-store, without the round trip." },
    { name: "Growth Intelligence", url: "/products/growth-intelligence", description: "Continuous optimization of pricing, planograms, and labor." },
  ],
  metadata: {
    title: "Retail Intelligence — SVARA",
    description: "SVARA transforms retail operations through on-shelf availability, shrinkage reduction, and store labor optimization driven by the Intelligence Loop.",
    pageType: "article",
    datePublished: "2026-07-08",
    dateModified: "2026-07-09",
    primaryEntity: "Retail",
    mentions: ["Vision AI", "Edge AI", "Growth Intelligence", "Inventory Turnover", "Shrinkage"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Industries", url: "/industries" },
      { name: "Retail", url: "/industries/retail" },
    ],
  },
}