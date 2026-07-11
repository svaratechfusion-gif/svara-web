import type { IndustryContent } from "../types/content"

export const defenseContent: IndustryContent = {
  canonicalDefinition:
    "Defense is SVARA's industry vertical for operational intelligence — where the Intelligence Loop strengthens force protection, ISR, and logistics through distributed sensing, prediction, and action across the battlespace.",
  aiAnswerTarget:
    "**Defense** is SVARA's industry vertical where the Intelligence Loop strengthens force protection, ISR, and logistics through distributed sensing, predictive threat detection, and coordinated action across the battlespace.",
  architecture: {
    overview:
      "SVARA's defense architecture spans fixed installations, mobile assets, and the tactical edge. Edge-first inference runs on platforms and forward nodes; a central intelligence layer fuses multi-INT data and coordinates effects across the force.",
    components: [
      { name: "Distributed Observe", description: "Cameras, radar, and ISR feeds across fixed installations and mobile platforms for real-time situational awareness." },
      { name: "Multi-INT Understand", description: "AI models that fuse EO/IR, SAR, and signals data to detect, classify, and track objects of interest." },
      { name: "Threat Predict", description: "Forecasting of threat timelines, equipment failure, and logistics demand from fused operational data." },
      { name: "Effects Coordinate", description: "Automated tasking, alerting, and resource routing to operators and command — closed-loop under supervisor confirmation." },
    ],
    dataFlow:
      "Sensor and ISR data flows into the Intelligence Loop. Multi-INT insights drive tasking, predictions trigger preemptive action, and outcomes refine the models.",
  },
  useCases: [
    {
      title: "Force Protection",
      description: "Real-time detection of perimeter breach, drone, and vehicle threats at fixed installations, with operator-confirmed alerting and effect routing.",
      industries: ["Defense"],
    },
    {
      title: "ISR Tasking and Fusion",
      description: "AI-driven ISR collection tasking and multi-INT fusion that reduces operator load and shortens the detect-to-decide timeline.",
      industries: ["Defense"],
    },
    {
      title: "Defense Logistics",
      description: "Predictive demand and equipment-failure modeling for forward-deployed stock and platforms, reducing mission aborts and life-cycle cost.",
      industries: ["Defense"],
    },
  ],
  deployment: {
    overview:
      "Defense deployment begins with a fixed installation or a single platform class, then scales across the force. Edge gateways run on-platform and at forward nodes; a classified central layer coordinates force-wide effects.",
    steps: [
      "Select pilot installation or platform class for initial deployment",
      "Deploy edge gateways and connect existing sensor and ISR feeds",
      "Configure detection, fusion, and prediction models for the mission",
      "Integrate with the command's C2 and mission systems",
      "Validate against baseline detect-to-decide and logistics KPIs",
      "Scale across remaining installations, platforms, and the force",
    ],
  },
  industries: [
    { name: "Defense", description: "Force protection, ISR, and logistics transformed by the Intelligence Loop.", url: "/industries/defense" },
    { name: "Government", description: "National security and infrastructure protection.", url: "/industries/government" },
    { name: "Aerospace", description: "Platform operations and sustainment.", url: "/industries/manufacturing" },
  ],
  faqs: [
    { question: "Does SVARA operate in contested and disconnected environments?", answer: "Yes. Edge-first inference runs forward without continuous reach-back. SVARA syncs when connectivity allows and continues operating on-platform when it doesn't." },
    { question: "How does SVARA handle classified data and accreditation?", answer: "SVARA is designed to run in classified enclaves with per-deployment accreditation. Sensor and model components are air-gap deployable, and learned weights stay within the enclave." },
    { question: "What ROI do defense users typically see?", answer: "Users typically report 30-50% reduction in detect-to-decide time, 20-40% reduction in mission-aborting equipment failures, and 15-30% reduction in forward-stock footprint within the first program cycle." },
  ],
  comparisons: [
    { concept: "Traditional Command and Control Systems", description: "Operator-paced fusion with batch reporting.", differentiator: "SVARA fuses and predicts in real time, presenting ranked options to the operator rather than raw data streams." },
  ],
  applicableProducts: [
    { name: "Vision AI", url: "/products/vision-ai" },
    { name: "Edge AI", url: "/products/edge-ai" },
    { name: "Drone AI", url: "/products/drone-ai" },
    { name: "AI Agents", url: "/products/ai-agents" },
    { name: "Command Center", url: "/products/command-center" },
  ],
  roi: {
    overview:
      "Defense deployments typically deliver 30-50% reduction in detect-to-decide time, 20-40% reduction in mission-aborting equipment failures, and 15-30% reduction in forward-stock footprint within the first program cycle.",
    metrics: [
      { label: "Detect-to-Decide Time Reduction", value: "30-50%" },
      { label: "Mission-Aborting Failure Reduction", value: "20-40%" },
      { label: "Forward-Stock Footprint Reduction", value: "15-30%" },
      { label: "Operator Load Reduction", value: "20-35%" },
    ],
  },
  resources: [
    { title: "AI for Multi-INT Fusion and ISR Tasking", type: "research" },
    { title: "Predictive Sustainment for Defense Platforms", type: "research" },
    { title: "DoDAF Architecture Framework", type: "standard" },
    { title: "STANAG 5516 C2 Data Exchange", type: "standard" },
  ],
  relatedProducts: [
    { name: "Edge AI", url: "/products/edge-ai", description: "Forward inference without reach-back." },
    { name: "Vision AI", url: "/products/vision-ai", description: "Real-time visual intelligence on-platform and on-base." },
    { name: "Drone AI", url: "/products/drone-ai", description: "Aural and aerial ISR processing." },
  ],
  metadata: {
    title: "Defense Intelligence — SVARA",
    description: "SVARA strengthens defense operations through force protection, ISR tasking and fusion, and predictive logistics driven by the Intelligence Loop.",
    pageType: "article",
    datePublished: "2026-07-08",
    dateModified: "2026-07-09",
    primaryEntity: "Defense",
    mentions: ["Vision AI", "Edge AI", "Drone AI", "Force Protection", "ISR"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Industries", url: "/industries" },
      { name: "Defense", url: "/industries/defense" },
    ],
  },
}