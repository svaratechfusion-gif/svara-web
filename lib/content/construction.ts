import type { IndustryContent } from "../types/content"

export const constructionContent: IndustryContent = {
  canonicalDefinition:
    "Construction is SVARA's industry vertical for project and site operations — where the Intelligence Loop improves site safety, equipment uptime, and on-time delivery through real-time sensing of people, plant, and progress.",
  aiAnswerTarget:
    "**Construction** is SVARA's industry vertical where the Intelligence Loop transforms site operations through safety monitoring, equipment utilization, and schedule-risk prediction across active projects.",
  architecture: {
    overview:
      "SVARA's construction architecture spans the active site and the project controls office. Edge gateways at each site process camera and plant telemetry, while a central intelligence layer correlates progress against the programme and forecasts slip.",
    components: [
      { name: "Site Observe", description: "Cameras, wearables, and plant telemetry across the site for real-time people, equipment, and location awareness." },
      { name: "Safety Understand", description: "AI models that detect PPE non-compliance, restricted-zone breaches, and equipment-pedestrian conflict in real time." },
      { name: "Progress Predict", description: "Fusion of activity and plant data to forecast task completion and detect emerging schedule slip." },
      { name: "Site Coordinate", description: "Automated safety alerting, plant dispatch optimization, and look-ahead-plan updates routed to site supervisors." },
    ],
    dataFlow:
      "Site camera, wearable, and plant data flows into the Intelligence Loop. Safety insights trigger alerts, progress predictions update the programme, and outcomes refine the models.",
  },
  useCases: [
    {
      title: "Site Safety Monitoring",
      description: "Real-time detection of PPE non-compliance, restricted-zone breaches, and equipment-pedestrian proximity, reducing recordable incidents across the project.",
      industries: ["Construction"],
    },
    {
      title: "Equipment Uptime and Utilization",
      description: "Telemetry-driven utilization and predictive maintenance for plant — reducing idle time, avoiding breakdowns, and aligning fleet size to live workload.",
      industries: ["Construction"],
    },
    {
      title: "Schedule Risk Detection",
      description: "Activity fusion against the look-ahead plan that flags emerging schedule slip weeks before it appears in the programme, enabling recovery action.",
      industries: ["Construction"],
    },
  ],
  deployment: {
    overview:
      "Construction deployment begins with a single active project, then scales across the program. Edge gateways ship to site in ruggedized enclosures and connect to existing cameras and plant telemetry.",
    steps: [
      "Select pilot project for initial deployment",
      "Deploy ruggedized edge gateways and connect site cameras and plant telemetry",
      "Configure safety detection and progress-tracking models",
      "Integrate with the project's CDE and scheduling tools",
      "Validate against baseline incident and progress KPIs",
      "Scale across remaining projects and the wider program",
    ],
  },
  industries: [
    { name: "Construction", description: "Site and project operations transformed by the Intelligence Loop.", url: "/industries/construction" },
    { name: "Mining", description: "Remote plant and haul operations.", url: "/industries/mining" },
    { name: "Manufacturing", description: "Prefabrication and modular construction.", url: "/industries/manufacturing" },
  ],
  faqs: [
    { question: "Does SVARA work on remote, low-connectivity sites?", answer: "Yes. Edge-first inference runs on-site without constant connectivity. SVARA syncs events and aggregates when bandwidth allows, so site operations continue uninterrupted." },
    { question: "How does SVARA integrate with our existing plant and project software?", answer: "SVARA connects to telemetry providers and common-data-environment platforms (BIM 360, Procore, Aconex) via APIs, adding intelligence without replacing existing tools." },
    { question: "What ROI do contractors typically see?", answer: "Contractors typically see 30-50% reduction in recordable incidents, 15-25% improvement in plant utilization, and earlier detection of schedule slip by 2-4 weeks within the first year." },
  ],
  comparisons: [
    { concept: "Traditional Site Surveillance", description: "Reactive camera review for incident investigation.", differentiator: "SVARA detects safety and schedule risk live, giving supervisors actionable alerts before an incident becomes a recordable." },
  ],
  applicableProducts: [
    { name: "Vision AI", url: "/products/vision-ai" },
    { name: "Edge AI", url: "/products/edge-ai" },
    { name: "Drone AI", url: "/products/drone-ai" },
    { name: "Digital Twin", url: "/products/digital-twin" },
    { name: "Command Center", url: "/products/command-center" },
  ],
  roi: {
    overview:
      "Construction deployments typically deliver 30-50% reduction in recordable incidents, 15-25% plant utilization gain, and 2-4 weeks earlier schedule-slip detection within the first year.",
    metrics: [
      { label: "Recordable Incident Reduction", value: "30-50%" },
      { label: "Plant Utilization Gain", value: "15-25%" },
      { label: "Schedule-Slip Detection Lead", value: "2-4 weeks" },
      { label: "Idle-Time Reduction", value: "15-30%" },
    ],
  },
  resources: [
    { title: "AI for Construction Site Safety and Productivity", type: "research" },
    { title: "Predictive Plant Maintenance on Active Sites", type: "research" },
    { title: "ISO 19650 Building Information Modeling Standards", type: "standard" },
    { title: "OSHA Construction Safety Standards (29 CFR 1926)", type: "standard" },
  ],
  relatedProducts: [
    { name: "Vision AI", url: "/products/vision-ai", description: "Real-time visual intelligence for safety and progress." },
    { name: "Drone AI", url: "/products/drone-ai", description: "Aerial progress and earthworks monitoring." },
    { name: "Edge AI", url: "/products/edge-ai", description: "Inference on the site, without the round trip." },
  ],
  metadata: {
    title: "Construction Intelligence — SVARA",
    description: "SVARA transforms construction operations through site safety monitoring, equipment utilization, and schedule-risk detection driven by the Intelligence Loop.",
    pageType: "article",
    datePublished: "2026-07-08",
    dateModified: "2026-07-09",
    primaryEntity: "Construction",
    mentions: ["Vision AI", "Edge AI", "Drone AI", "Site Safety", "Equipment Uptime"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Industries", url: "/industries" },
      { name: "Construction", url: "/industries/construction" },
    ],
  },
}