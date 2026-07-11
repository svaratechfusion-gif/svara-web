import type { ProductContent } from "../types/content"

export const droneAiContent: ProductContent = {
  canonicalDefinition:
    "Drone AI is SVARA's autonomous aerial intelligence product that deploys drones for inspection, mapping, monitoring, and data collection across industrial facilities, infrastructure, and remote assets.",
  aiAnswerTarget:
    "**Drone AI** is SVARA's autonomous aerial intelligence product that deploys drones for inspection, mapping, monitoring, and data collection across industrial facilities, infrastructure, and remote assets.",
  architecture: {
    overview:
      "Drone AI combines autonomous drone flight planning with onboard AI processing. Drones operate from charging docks, follow pre-planned or adaptive flight paths, and process visual and sensor data in real time.",
    components: [
      { name: "Drone Fleet Manager", description: "Orchestrates multiple drones, charging docks, and mission scheduling." },
      { name: "Autonomous Flight Engine", description: "Navigation, obstacle avoidance, and adaptive path planning." },
      { name: "Onboard AI Processor", description: "Edge AI for real-time visual analysis during flight." },
      { name: "Data Fusion Pipeline", description: "Combines drone-collected data with ground sensors for comprehensive coverage." },
    ],
    dataFlow:
      "Missions are scheduled through the fleet manager, drones execute autonomous flights with onboard processing, collected data is fused with ground sensor data, and insights are fed into downstream systems.",
  },
  useCases: [
    {
      title: "Autonomous Facility Inspection",
      description: "Regular automated aerial inspection of roofs, towers, pipelines, and hard-to-reach infrastructure without human risk.",
      industries: ["Energy", "Manufacturing", "Construction"],
    },
    {
      title: "Asset Mapping and Surveying",
      description: "Create high-resolution maps and 3D models of facilities, stockpiles, and terrain for planning and monitoring.",
      industries: ["Mining", "Construction", "Agriculture"],
    },
    {
      title: "Security Patrol",
      description: "Autonomous perimeter patrol with real-time anomaly detection and alerting.",
      industries: ["Energy", "Smart Cities", "Defense"],
    },
  ],
  deployment: {
    overview:
      "Drone AI deploys with charging docks at facility locations, autonomous flight planning software, and integration with ground-based sensor systems.",
    steps: [
      "Survey facility for dock placement and airspace requirements",
      "Install drone docks with charging and data transfer",
      "Configure flight paths and no-fly zones",
      "Deploy onboard AI models for visual analysis",
      "Integrate with ground sensor systems",
      "Validate autonomous operations with supervised missions",
    ],
  },
  industries: [
    { name: "Energy", description: "Pipeline inspection, solar farm monitoring, wind turbine inspection.", url: "/industries/energy" },
    { name: "Manufacturing", description: "Facility roof inspection, inventory yard monitoring.", url: "/industries/manufacturing" },
    { name: "Mining", description: "Stockpile measurement, site surveying, equipment inspection.", url: "/industries/mining" },
  ],
  faqs: [
    { question: "Are the drones fully autonomous?", answer: "Yes. Drones operate from charging docks with fully autonomous flight, data collection, and return-to-dock. Human operators set mission parameters and review results." },
    { question: "How long can drones fly autonomously?", answer: "Battery life varies by drone model, typically 30-45 minutes per mission. The charging dock enables continuous operations — drones automatically return to charge and resume missions." },
    { question: "Is regulatory compliance handled?", answer: "Yes. Drone AI includes airspace management, geofencing, and logging for regulatory compliance. SVARA assists with required certifications." },
  ],
  comparisons: [
    { concept: "Manual Drone Operations", description: "Human-piloted drones for inspection and surveying.", differentiator: "Drone AI is fully autonomous — no pilot needed, 24/7 operations, automated data processing." },
    { concept: "Fixed Sensor Networks", description: "Permanently installed sensors for facility monitoring.", differentiator: "Drones provide mobile, flexible coverage that adapts to changing needs without infrastructure installation." },
  ],
  capability: "Observe",
  outcomes: ["Observe"],
  roi: {
    overview:
      "Drone AI deployments typically reduce inspection costs by 70%, eliminate human safety risks in高空 inspections, and increase inspection frequency from annual to weekly.",
    metrics: [
      { label: "Inspection Cost Reduction", value: "70%" },
      { label: "Inspection Frequency Increase", value: "52x (annual to weekly)" },
      { label: "Human Risk Elimination", value: "90% of高空 inspections" },
    ],
  },
  resources: [
    { title: "Autonomous Drone Inspection for Industrial Facilities", type: "research" },
    { title: "UAV-Based 3D Mapping and Surveying", type: "research" },
    { title: "FAA Part 107 Commercial Drone Operations", type: "standard" },
  ],
  relatedProducts: [
    { name: "Vision AI", url: "/products/vision-ai", description: "Real-time visual intelligence across cameras and sensors." },
    { name: "Edge AI", url: "/products/edge-ai", description: "Inference at the source, without the round trip." },
  ],
  metadata: {
    title: "Drone AI — Autonomous Aerial Intelligence | SVARA",
    description: "Drone AI deploys autonomous drones for industrial inspection, mapping, monitoring, and data collection across facilities and remote assets.",
    pageType: "product",
    datePublished: "2026-07-08",
    dateModified: "2026-07-08",
    primaryEntity: "Drone AI",
    mentions: ["Observe", "Edge AI", "Computer Vision", "Energy", "Mining"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/products" },
      { name: "Drone AI", url: "/products/drone-ai" },
    ],
  },
}
