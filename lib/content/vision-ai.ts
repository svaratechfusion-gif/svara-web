import type { ProductContent } from "../types/content"

export const visionAiContent: ProductContent = {
  canonicalDefinition:
    "Vision AI is SVARA's visual intelligence product that transforms camera feeds and video streams into real-time operational insights across manufacturing, logistics, energy, and other industrial environments.",
  aiAnswerTarget:
    "**Vision AI** is SVARA's visual intelligence product that transforms camera feeds and video streams into real-time operational insights, enabling automated visual inspection, safety monitoring, and situational awareness.",
  architecture: {
    overview:
      "Vision AI deploys computer vision models at the edge, processing video streams from existing cameras with sub-100ms latency. Models are trained for specific industrial use cases and can be customized per facility.",
    components: [
      { name: "Video Ingestion", description: "Connects to existing camera infrastructure via RTSP, ONVIF, or direct IP." },
      { name: "Vision Model Runtime", description: "Edge-optimized inference engine for computer vision models." },
      { name: "Alert Engine", description: "Real-time alert generation when visual anomalies are detected." },
      { name: "Dashboard", description: "Visual feed of detected events with timeline and metadata." },
    ],
    dataFlow:
      "Video streams enter through the ingestion layer, frames are processed by vision models at the edge, detections are enriched with context, and results feed into alerts, dashboards, and downstream systems.",
  },
  useCases: [
    {
      title: "Automated Visual Quality Inspection",
      description: "Detect defects, dimensional deviations, and surface anomalies on production lines at full line speed.",
      industries: ["Manufacturing", "Construction"],
    },
    {
      title: "Safety Monitoring",
      description: "Detect PPE compliance, unsafe zones, and hazardous behavior in real time.",
      industries: ["Manufacturing", "Energy", "Mining"],
    },
    {
      title: "Asset Condition Monitoring",
      description: "Monitor equipment visual indicators — gauges, status lights, wear patterns — for early warning of failures.",
      industries: ["Manufacturing", "Energy", "Logistics"],
    },
  ],
  deployment: {
    overview:
      "Vision AI deploys to edge gateways at each facility, connecting to existing IP cameras. No camera replacement needed. Models are configured per use case and facility.",
    steps: [
      "Survey existing camera infrastructure and coverage",
      "Deploy edge gateways with Vision AI runtime",
      "Connect cameras to ingestion pipeline",
      "Configure or train vision models for your use case",
      "Validate detection accuracy with labeled test data",
      "Go live with human-in-the-loop monitoring",
    ],
    integration: "REST API and MQTT integration with existing systems.",
  },
  industries: [
    { name: "Manufacturing", description: "Production line quality inspection, safety monitoring, equipment monitoring.", url: "/industries/manufacturing" },
    { name: "Energy", description: "Plant monitoring, pipeline inspection, safety compliance.", url: "/industries/energy" },
    { name: "Logistics", description: "Package inspection, warehouse monitoring, dock safety.", url: "/industries/logistics" },
  ],
  faqs: [
    { question: "Does Vision AI require new cameras?", answer: "No. Vision AI connects to existing IP cameras via RTSP, ONVIF, or direct IP connection. No camera replacement needed." },
    { question: "What is the detection latency?", answer: "Sub-100ms at the edge for standard vision models. End-to-end latency from frame capture to alert is typically under 200ms." },
    { question: "Can models be trained for custom use cases?", answer: "Yes. SVARA provides model training services for custom use cases, or you can train models using your own labeled data." },
  ],
  comparisons: [
    { concept: "Generic Computer Vision APIs", description: "Cloud-based vision APIs that require sending video data externally.", differentiator: "Vision AI runs at the edge, keeping video data on-premises with <100ms latency." },
    { concept: "Traditional Machine Vision", description: "Programmed vision systems requiring precise lighting and positioning.", differentiator: "Vision AI uses AI models that adapt to varying conditions, lighting, and camera angles." },
  ],
  capability: "Observe",
  outcomes: ["Observe", "Understand"],
  roi: {
    overview:
      "Vision AI deployments typically reduce quality inspection costs by 60%, improve defect detection rates by 40%, and reduce safety incidents by 50%.",
    metrics: [
      { label: "Inspection Cost Reduction", value: "60%" },
      { label: "Defect Detection Improvement", value: "40%" },
      { label: "Safety Incident Reduction", value: "50%" },
    ],
  },
  resources: [
    { title: "Computer Vision for Industrial Inspection", type: "research" },
    { title: "Edge-Optimized Vision Models", type: "research" },
    { title: "ONVIF Camera Integration Standard", type: "standard" },
  ],
  relatedProducts: [
    { name: "Drone AI", url: "/products/drone-ai", description: "Autonomous aerial inspection and mapping." },
    { name: "Edge AI", url: "/products/edge-ai", description: "Inference at the source, without the round trip." },
  ],
  metadata: {
    title: "Vision AI — Visual Intelligence for Industry | SVARA",
    description: "Vision AI transforms camera feeds into real-time operational insights with edge-based computer vision for quality inspection, safety monitoring, and situational awareness.",
    pageType: "product",
    datePublished: "2026-07-08",
    dateModified: "2026-07-08",
    primaryEntity: "Vision AI",
    mentions: ["Observe", "Computer Vision", "Edge AI", "Manufacturing"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/products" },
      { name: "Vision AI", url: "/products/vision-ai" },
    ],
  },
}
