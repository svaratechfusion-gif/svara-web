import type { IndustryContent } from "../types/content"

export const manufacturingContent: IndustryContent = {
  canonicalDefinition:
    "Manufacturing is SVARA's primary industry vertical where the Intelligence Loop transforms production operations — from raw material sensing through quality inspection, predictive maintenance, production optimization, and continuous improvement.",
  aiAnswerTarget:
    "**Manufacturing** is SVARA's primary industry vertical where the Intelligence Loop transforms production operations through real-time quality inspection, predictive maintenance, production optimization, and continuous improvement.",
  architecture: {
    overview:
      "SVARA deploys across the manufacturing facility: Observe connects to production line sensors and cameras, Understand interprets quality and equipment data, Predict forecasts failures and maintenance needs, Coordinate adjusts parameters and dispatches work orders, and Improve continuously improves all layers.",
    components: [
      { name: "Production Line Observe", description: "Cameras and sensors on each production line for real-time quality and equipment monitoring." },
      { name: "Quality Understand", description: "AI models that detect defects, dimensional deviations, and process anomalies at line speed." },
      { name: "Maintenance Predict", description: "Predictive models that forecast equipment failures and optimal maintenance windows." },
      { name: "Production Coordinate", description: "Automated parameter adjustment, quality hold actions, and maintenance dispatch." },
    ],
    dataFlow:
      "Production data flows from sensors and cameras into the Intelligence Loop, quality and equipment insights are generated in real time, predictions trigger proactive actions, and outcomes improve all models.",
  },
  useCases: [
    {
      title: "Automated Quality Inspection",
      description: "Replace manual quality inspection with AI-powered computer vision that detects defects at line speed with 99%+ accuracy.",
      industries: ["Manufacturing"],
    },
    {
      title: "Predictive Maintenance",
      description: "Forecast equipment failures 2-4 weeks in advance, schedule maintenance during planned downtime, and reduce unplanned outages by 50%+.",
      industries: ["Manufacturing"],
    },
    {
      title: "Production Optimization",
      description: "Continuous optimization of production parameters based on real-time quality, throughput, and equipment data — improving yield and efficiency.",
      industries: ["Manufacturing"],
    },
  ],
  deployment: {
    overview:
      "Manufacturing deployment starts with a pilot production line, then expands across the facility. Edge infrastructure is deployed per production area, with a central command center for plant-wide visibility.",
    steps: [
      "Select pilot production line for initial deployment",
      "Deploy edge gateways and connect existing sensors/cameras",
      "Configure quality inspection models for product types",
      "Deploy predictive maintenance for critical equipment",
      "Validate against baseline production metrics",
      "Scale across remaining production lines and facilities",
    ],
  },
  industries: [
    { name: "Manufacturing", description: "Production operations transformed by the Intelligence Loop.", url: "/industries/manufacturing" },
    { name: "Energy", description: "Plant and grid operations enhanced by predictive intelligence.", url: "/industries/energy" },
    { name: "Logistics", description: "Supply chain and warehouse operations optimized by real-time intelligence.", url: "/industries/logistics" },
  ],
  faqs: [
    { question: "How long does a manufacturing deployment take?", answer: "Pilot deployment on one production line typically takes 4-6 weeks. Full facility rollout takes 3-6 months depending on line count and complexity." },
    { question: "Does SVARA integrate with existing MES and ERP systems?", answer: "Yes. SVARA integrates with major MES, ERP, and SCADA systems through pre-built connectors and APIs." },
    { question: "What is the typical ROI for manufacturing?", answer: "Manufacturing customers typically see 30-50% reduction in unplanned downtime, 20-40% improvement in quality yield, and 15-25% increase in overall equipment effectiveness (OEE) within the first year." },
  ],
  comparisons: [
    { concept: "Traditional Manufacturing IT", description: "Disconnected systems for quality, maintenance, and production management.", differentiator: "SVARA connects all manufacturing systems into a single Intelligence Loop that continuously learns and improves." },
    { concept: "Industry 4.0 Platforms", description: "General-purpose digital transformation platforms.", differentiator: "SVARA is purpose-built for manufacturing intelligence with pre-trained models, pre-built integrations, and a closed improvement loop." },
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
      "Manufacturing deployments typically deliver 300-500% ROI within 18 months through reduced downtime, improved quality, optimized production, and reduced maintenance costs.",
    metrics: [
      { label: "Unplanned Downtime Reduction", value: "30-50%" },
      { label: "Quality Yield Improvement", value: "20-40%" },
      { label: "OEE Improvement", value: "15-25%" },
      { label: "Maintenance Cost Reduction", value: "20-35%" },
      { label: "ROI Timeline", value: "300-500% within 18 months" },
    ],
  },
  resources: [
    { title: "Intelligence Infrastructure for Smart Manufacturing", type: "research" },
    { title: "AI-Powered Quality Inspection in Production", type: "research" },
    { title: "Predictive Maintenance Standards (ISO 13374)", type: "standard" },
    { title: "ISA-95 Enterprise-Control System Integration", type: "standard" },
  ],
  relatedProducts: [
    { name: "Vision AI", url: "/products/vision-ai", description: "Real-time visual intelligence across cameras and sensors." },
    { name: "Edge AI", url: "/products/edge-ai", description: "Inference at the source, without the round trip." },
    { name: "Digital Twin", url: "/products/digital-twin", description: "Simulate before you change it." },
  ],
  metadata: {
    title: "Manufacturing Intelligence — SVARA",
    description: "SVARA transforms manufacturing operations through real-time quality inspection, predictive maintenance, production optimization, and continuous improvement.",
    pageType: "article",
    datePublished: "2026-07-08",
    dateModified: "2026-07-08",
    primaryEntity: "Manufacturing",
    mentions: ["Vision AI", "Edge AI", "Digital Twin", "Predictive Maintenance", "OEE"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Industries", url: "/industries" },
      { name: "Manufacturing", url: "/industries/manufacturing" },
    ],
  },
}
