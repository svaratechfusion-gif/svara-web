import type { IndustryContent } from "../types/content"

export const portsContent: IndustryContent = {
  canonicalDefinition:
    "Ports is SVARA's industry vertical for maritime terminal operations — where the Intelligence Loop optimizes container handling, berth throughput, and gate-in/gate-out flows across the terminal.",
  aiAnswerTarget:
    "**Ports** is SVARA's industry vertical where the Intelligence Loop transforms terminal operations through container-handling optimization, berth throughput, and gate-flow orchestration.",
  architecture: {
    overview:
      "SVARA's port architecture spans the quay, the yard, and the gate. Edge gateways run inference on STS, RTG, and yard equipment; a central intelligence layer coordinates vessel plans, yard moves, and truck flows across the terminal.",
    components: [
      { name: "Quay Observe", description: "Cameras and crane telemetry for vessel, spreader, and container-stow monitoring in real time." },
      { name: "Yard Understand", description: "AI models that track container position, dwell, and equipment assignments across the yard." },
      { name: "Throughput Predict", description: "Forecasting of berth productivity, yard congestion, and gate-in/gate-out demand by vessel and slot." },
      { name: "Gate and Yard Coordinate", description: "Automated gate assignment, yard-move planning, and equipment dispatch routed to TOS and operators." },
    ],
    dataFlow:
      "Quay, yard, and gate data flows into the Intelligence Loop. Handling insights trigger dispatch, predictions inform berth planning, and outcomes refine the models.",
  },
  useCases: [
    {
      title: "Container Handling Optimization",
      description: "Real-time crane-cycle and spreader monitoring that identifies micro-stops and low-cycle productivity, lifting berth moves per hour without new equipment.",
      industries: ["Ports"],
    },
    {
      title: "Berth Throughput Planning",
      description: "Predictive vessel-call and berth-productivity modeling that aligns labor, equipment, and yard capacity to live vessel plans.",
      industries: ["Ports"],
    },
    {
      title: "Gate-In / Gate-Out Orchestration",
      description: "Live gate-flow prediction and slot orchestration that cuts truck turn time and yard congestion during peak arrivals.",
      industries: ["Ports"],
    },
  ],
  deployment: {
    overview:
      "Port deployment begins with a single berth or the gate, then scales across the terminal. Edge gateways run on cranes and at gate lanes, with a central command center for terminal-wide coordination.",
    steps: [
      "Select pilot berth, yard block, or gate for initial deployment",
      "Deploy edge gateways and connect crane telemetry, cameras, and OCR systems",
      "Configure handling, yard, and gate-flow models",
      "Integrate with the terminal operating system (TOS)",
      "Validate against baseline berth, yard, and gate KPIs",
      "Scale across remaining berths, blocks, and gate lanes",
    ],
  },
  industries: [
    { name: "Ports", description: "Terminal operations transformed by the Intelligence Loop.", url: "/industries/ports" },
    { name: "Logistics", description: "Landside supply chain and drayage.", url: "/industries/logistics" },
    { name: "Mining", description: "Bulk export and stockpile operations.", url: "/industries/mining" },
  ],
  faqs: [
    { question: "Does SVARA replace our terminal operating system?", answer: "No. SVARA ingests from the TOS (Navis, TBA, CyberLogitec) and crane automation via standard protocols, adding AI-driven prediction and dispatch without replacing existing systems." },
    { question: "How does SVARA handle mixed-handling terminals?", answer: "SVARA models quay, yard, and gate independently and joins them in the central intelligence layer, so container, RoRo, and bulk operations are coordinated in one loop." },
    { question: "What ROI do ports typically see?", answer: "Ports typically see 8-15% improvement in berth moves per hour, 20-35% reduction in truck turn time, and 10-20% reduction in yard-equipment idle time within the first year." },
  ],
  comparisons: [
    { concept: "Traditional Terminal Automation", description: "Rules-based TOS with reactive exception handling.", differentiator: "SVARA predicts berth, yard, and gate states and re-plans in real time, closing the loop between observation and dispatch." },
  ],
  applicableProducts: [
    { name: "Vision AI", url: "/products/vision-ai" },
    { name: "Edge AI", url: "/products/edge-ai" },
    { name: "Digital Twin", url: "/products/digital-twin" },
    { name: "AI Agents", url: "/products/ai-agents" },
    { name: "Command Center", url: "/products/command-center" },
  ],
  roi: {
    overview:
      "Ports deployments typically deliver 8-15% berth-productivity improvement, 20-35% reduction in truck turn time, and 10-20% reduction in yard-equipment idle time within the first year.",
    metrics: [
      { label: "Berth Moves per Hour", value: "+8-15%" },
      { label: "Truck Turn-Time Reduction", value: "20-35%" },
      { label: "Yard-Equipment Idle Reduction", value: "10-20%" },
      { label: "Gate Dwell-Time Reduction", value: "15-25%" },
    ],
  },
  resources: [
    { title: "AI-Driven Container Terminal Operations", type: "research" },
    { title: "Predictive Berth and Yard Planning", type: "research" },
    { title: "ISO 17712 Freight Container Standards", type: "standard" },
  ],
  relatedProducts: [
    { name: "Vision AI", url: "/products/vision-ai", description: "Real-time visual intelligence at the quay, yard, and gate." },
    { name: "Edge AI", url: "/products/edge-ai", description: "Inference on cranes and at gate lanes, without the round trip." },
    { name: "Digital Twin", url: "/products/digital-twin", description: "Simulate berth, yard, and gate plans before you execute." },
  ],
  metadata: {
    title: "Ports Intelligence — SVARA",
    description: "SVARA transforms port operations through container-handling optimization, berth-throughput planning, and gate-in/gate-out orchestration driven by the Intelligence Loop.",
    pageType: "article",
    datePublished: "2026-07-08",
    dateModified: "2026-07-09",
    primaryEntity: "Ports",
    mentions: ["Vision AI", "Edge AI", "Digital Twin", "Container Handling", "Berth Throughput"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Industries", url: "/industries" },
      { name: "Ports", url: "/industries/ports" },
    ],
  },
}