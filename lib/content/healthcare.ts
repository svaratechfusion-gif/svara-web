import type { IndustryContent } from "../types/content"

export const healthcareContent: IndustryContent = {
  canonicalDefinition:
    "Healthcare is SVARA's industry vertical for hospital operations and clinical workflows — where the Intelligence Loop optimizes patient throughput, asset utilization, and clinical operations through real-time sensing and prediction.",
  aiAnswerTarget:
    "**Healthcare** is SVARA's industry vertical where the Intelligence Loop transforms hospital operations through patient flow optimization, clinical equipment utilization, and real-time situational awareness across facilities.",
  architecture: {
    overview:
      "SVARA deploys across the hospital environment: Observe connects to cameras, RTLS tags, and biomedical device feeds, Understand interprets patient flow and asset status, Predict forecasts admissions and equipment demand, Coordinate routes staff and equipment, and Improve continuously improves care delivery operations.",
    components: [
      { name: "Patient Flow Observe", description: "Real-time tracking of admissions, discharges, transfers, and wait times against department capacity." },
      { name: "Clinical Asset Understand", description: "AI models that locate and classify infusion pumps, ventilators, and mobile equipment across the facility." },
      { name: "Demand Predict", description: "Forecasting of admissions, ED surges, and equipment demand by department and shift." },
      { name: "Operations Coordinate", description: "Automated bed turnover dispatch, equipment redirection, and staff load balancing across units." },
    ],
    dataFlow:
      "Real-time location, sensor, and EHR event data flows into the Intelligence Loop. Flow insights trigger bed and asset actions, demand forecasts inform staffing, and outcomes refine the models.",
  },
  useCases: [
    {
      title: "Patient Throughput Optimization",
      description: "AI-driven bed management and discharge planning that reduces length-of-stay variation and ED boarding times by predicting discharge readiness and routing patients accordingly.",
      industries: ["Healthcare"],
    },
    {
      title: "Clinical Asset Utilization",
      description: "Real-time location and utilization tracking of mobile medical equipment, reducing hoarding and search time while optimizing par levels for infusion pumps and telemetry units.",
      industries: ["Healthcare"],
    },
    {
      title: "ED Surge Response",
      description: "Predictive admission and acuity modeling that pre-positions staff, beds, and equipment ahead of emergency department surge events.",
      industries: ["Healthcare"],
    },
  ],
  deployment: {
    overview:
      "Healthcare deployment begins with a single high-impact unit (typically ED or surgical services), then expands facility-wide. Edge gateways sit in each department, with a central command center for hospital-wide operational visibility.",
    steps: [
      "Select pilot unit for initial deployment",
      "Deploy edge gateways and connect RTLS, cameras, and biomedical feeds",
      "Configure patient flow and asset tracking models",
      "Integrate with EHR and nurse-call systems",
      "Validate against baseline throughput and utilization KPIs",
      "Scale across remaining departments and affiliate sites",
    ],
  },
  industries: [
    { name: "Healthcare", description: "Hospital and clinical operations transformed by the Intelligence Loop.", url: "/industries/healthcare" },
    { name: "Smart Cities", description: "Public health and emergency response intelligence.", url: "/industries/smart-cities" },
    { name: "Government", description: "Citizen-facing services and facility operations.", url: "/industries/government" },
  ],
  faqs: [
    { question: "Does SVARA access protected health information?", answer: "No. SVARA operates on operational signals — asset location, capacity, and flow events — not clinical records. Where PHI is necessary, it is handled through de-identified ingestion layered on top of the EHR." },
    { question: "How does SVARA integrate with our EHR and RTLS vendors?", answer: "SVARA connects to Epic, Cerner, and major RTLS platforms via HL7/FHIR and vendor APIs, adding operational intelligence without replacing existing clinical systems." },
    { question: "What ROI do health systems typically see?", answer: "Health systems typically see 15-30% improvement in bed turnover, 20-40% reduction in mobile asset search time, and 10-20% reduction in length-of-stay variation within the first year." },
  ],
  comparisons: [
    { concept: "Traditional Hospital RTLS", description: "Location systems that report asset position but do not act on it.", differentiator: "SVARA closes the loop — it locates assets, predicts demand, and dispatches them, then learns from each cycle." },
    { concept: "Bed Management Software", description: "Manual bed-tracking tools with static rules and reporting.", differentiator: "SVARA predicts discharges and admissions rather than just recording them, enabling proactive staffing and equipment positioning." },
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
      "Healthcare deployments typically deliver 15-30% improvement in bed turnover, 20-40% reduction in mobile asset search time, and 10-20% reduction in length-of-stay variation within the first year.",
    metrics: [
      { label: "Bed Turnover Improvement", value: "15-30%" },
      { label: "Asset Search Time Reduction", value: "20-40%" },
      { label: "Length-of-Stay Variation Reduction", value: "10-20%" },
      { label: "ED Boarding Time Reduction", value: "15-25%" },
    ],
  },
  resources: [
    { title: "Intelligent Hospital Operations and Patient Flow", type: "research" },
    { title: "Real-Time Location Systems in Clinical Environments", type: "research" },
    { title: "HL7 FHIR Interoperability Standard", type: "standard" },
    { title: "IEC 80001 Risk Management for IT-Networked Medical Devices", type: "standard" },
  ],
  relatedProducts: [
    { name: "Vision AI", url: "/products/vision-ai", description: "Real-time visual intelligence for facility and patient flow monitoring." },
    { name: "Edge AI", url: "/products/edge-ai", description: "Inference at the unit level, without the round trip." },
    { name: "Command Center", url: "/products/command-center", description: "Hospital-wide operational visibility in one pane." },
  ],
  metadata: {
    title: "Healthcare Intelligence — SVARA",
    description: "SVARA transforms hospital operations through patient flow optimization, clinical asset utilization, and real-time situational awareness across facilities.",
    pageType: "article",
    datePublished: "2026-07-08",
    dateModified: "2026-07-09",
    primaryEntity: "Healthcare",
    mentions: ["Vision AI", "Edge AI", "Digital Twin", "Patient Flow", "Asset Utilization"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Industries", url: "/industries" },
      { name: "Healthcare", url: "/industries/healthcare" },
    ],
  },
}