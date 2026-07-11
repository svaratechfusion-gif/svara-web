import type { IndustryContent } from "../types/content"

export const miningContent: IndustryContent = {
  canonicalDefinition:
    "Mining is SVARA's industry vertical for extractive operations — where the Intelligence Loop enables remote operations, improves equipment duty cycles, and delivers haul-road intelligence across the mine value chain.",
  aiAnswerTarget:
    "**Mining** is SVARA's industry vertical where the Intelligence Loop transforms operations through remote control, equipment duty-cycle optimization, and haul-road intelligence across pit, plant, and port.",
  architecture: {
    overview:
      "SVARA's mining architecture spans the pit, the processing plant, and the remote operations center. Edge gateways run inference on trucks, shovels, and conveyors; a central intelligence layer coordinates fleet assignment, haul routing, and plant throughput.",
    components: [
      { name: "Fleet Observe", description: "Telemetry and cameras on trucks, shovels, and loaders for real-time payload, location, and duty-cycle awareness." },
      { name: "Haul-Road Understand", description: "AI models that assess haul-road condition, cycle times, and queue events per bench and route." },
      { name: "Equipment Predict", description: "Predictive maintenance and duty-cycle forecasting for haul fleet and processing plant assets." },
      { name: "Remote Operations Coordinate", description: "Automated dispatch, haul-route assignment, and remote-equipment operation routed from the operations center." },
    ],
    dataFlow:
      "Fleet, plant, and haul-road data flows into the Intelligence Loop. Cycle insights drive dispatch, predictions trigger maintenance, and outcomes refine the models.",
  },
  useCases: [
    {
      title: "Remote Equipment Operations",
      description: "Tele-remote and supervised-autonomous operation of drills, shovels, and dozers from a remote operations center — removing operators from the pit floor while keeping cycle times competitive.",
      industries: ["Mining"],
    },
    {
      title: "Duty-Cycle and Payload Optimization",
      description: "Real-time payload, fill-factor, and queue monitoring that optimizes truck-shovel matching and haul cycles, lifting fleet productivity without adding units.",
      industries: ["Mining"],
    },
    {
      title: "Haul-Road Intelligence",
      description: "Continuous haul-road condition assessment and route assignment that cuts rolling resistance events, cycle-time variance, and tire damage.",
      industries: ["Mining"],
    },
  ],
  deployment: {
    overview:
      "Mining deployment begins with a single pit or processing area, then scales across the operation. Edge gateways run on-asset and on-bench, with a remote operations center for fleet-wide coordination.",
    steps: [
      "Select pilot pit or plant area for initial deployment",
      "Deploy edge gateways on haul trucks and shovels, and connect existing SCADA",
      "Configure duty-cycle, payload, and haul-road models",
      "Stand up the remote operations center and integrate dispatch",
      "Validate against baseline productivity and availability KPIs",
      "Scale across remaining pits, plant, and the wider operation",
    ],
  },
  industries: [
    { name: "Mining", description: "Pit, plant, and port operations transformed by the Intelligence Loop.", url: "/industries/mining" },
    { name: "Energy", description: "Mine energy and equipment monitoring.", url: "/industries/energy" },
    { name: "Construction", description: "Earthworks and remote plant operations.", url: "/industries/construction" },
  ],
  faqs: [
    { question: "Can SVARA run on remote sites with intermittent connectivity?", answer: "Yes. Edge-first inference runs on-asset and on-bench. SVARA syncs events and aggregates to the remote operations center when bandwidth allows, so site operations continue uninterrupted." },
    { question: "How does SVARA integrate with our fleet management system?", answer: "SVARA connects to major mining FMS platforms via pre-built connectors and APIs, adding AI-powered dispatch and prediction without replacing existing systems." },
    { question: "What ROI do mines typically see?", answer: "Mines typically see 10-20% improvement in fleet productivity, 15-30% reduction in unplanned downtime, and 15-25% reduction in cycle-time variance within the first year of deployment." },
  ],
  comparisons: [
    { concept: "Traditional Fleet Management Systems", description: "Dispatch and payload reporting without predictive action.", differentiator: "SVARA predicts fleet and asset states and re-dispatches in real time, closing the loop between observation and action." },
  ],
  applicableProducts: [
    { name: "Edge AI", url: "/products/edge-ai" },
    { name: "Vision AI", url: "/products/vision-ai" },
    { name: "Drone AI", url: "/products/drone-ai" },
    { name: "Digital Twin", url: "/products/digital-twin" },
    { name: "Command Center", url: "/products/command-center" },
  ],
  roi: {
    overview:
      "Mining deployments typically deliver 10-20% fleet productivity improvement, 15-30% reduction in unplanned downtime, and 15-25% reduction in cycle-time variance within the first year.",
    metrics: [
      { label: "Fleet Productivity Gain", value: "10-20%" },
      { label: "Unplanned Downtime Reduction", value: "15-30%" },
      { label: "Cycle-Time Variance Reduction", value: "15-25%" },
      { label: "Tire and Plant Life Extension", value: "10-20%" },
    ],
  },
  resources: [
    { title: "Autonomous and Remote Mining Operations", type: "research" },
    { title: "Predictive Maintenance for Mining Equipment", type: "research" },
    { title: "ISO 19296 Mining Machine Safety Standards", type: "standard" },
  ],
  relatedProducts: [
    { name: "Edge AI", url: "/products/edge-ai", description: "Inference on-asset and on-bench, without the round trip." },
    { name: "Drone AI", url: "/products/drone-ai", description: "Aerial pit and stockpile intelligence." },
    { name: "Command Center", url: "/products/command-center", description: "Remote operations center for fleet-wide coordination." },
  ],
  metadata: {
    title: "Mining Intelligence — SVARA",
    description: "SVARA transforms mining operations through remote equipment control, duty-cycle optimization, and haul-road intelligence driven by the Intelligence Loop.",
    pageType: "article",
    datePublished: "2026-07-08",
    dateModified: "2026-07-09",
    primaryEntity: "Mining",
    mentions: ["Edge AI", "Vision AI", "Drone AI", "Remote Operations", "Haul-Road Intelligence"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Industries", url: "/industries" },
      { name: "Mining", url: "/industries/mining" },
    ],
  },
}