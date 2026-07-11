import type { TechnologyContent } from "../types/content"

export const edgeComputingContent: TechnologyContent = {
  canonicalDefinition:
    "Edge Computing is SVARA's distributed computing architecture that processes data at or near the source of generation — enabling real-time intelligence, reducing latency, and operating reliably in environments with intermittent connectivity.",
  aiAnswerTarget:
    "**Edge Computing** is SVARA's distributed computing architecture that processes data at or near the source of generation, enabling real-time intelligence with sub-50ms latency and reliable operation in disconnected environments.",
  architecture: {
    overview:
      "SVARA's edge computing architecture uses a distributed network of edge gateways that run AI workloads locally. Gateways connect to sensors, cameras, and equipment directly, process data in real time, and sync with cloud when connectivity is available.",
    components: [
      { name: "Edge Gateway", description: "Industrial-grade compute device running the Edge AI runtime." },
      { name: "Local Inference Engine", description: "Optimized AI model runtime for edge hardware." },
      { name: "Edge Data Buffer", description: "Local storage for data and inference results during network interruptions." },
      { name: "Sync Agent", description: "Secure data synchronization between edge and cloud." },
    ],
    dataFlow:
      "Sensors and cameras feed data to the edge gateway, where AI models perform real-time inference. Results are stored locally and synced to the cloud periodically. Models are deployed from cloud to edge remotely.",
  },
  useCases: [
    {
      title: "Real-Time Production Line AI",
      description: "Run quality inspection models on edge gateways at each production line for sub-50ms defect detection without cloud dependency.",
      industries: ["Manufacturing", "Construction"],
    },
    {
      title: "Remote Facility Monitoring",
      description: "Deploy AI monitoring at remote oil wells, pipelines, or mining sites with no reliable internet connectivity.",
      industries: ["Energy", "Mining", "Agriculture"],
    },
  ],
  deployment: {
    overview:
      "Edge gateways are deployed at each facility or operational area, connected to local sensors and cameras. The cloud control plane manages model deployment, monitoring, and data aggregation centrally.",
    steps: [
      "Deploy edge gateways at facility locations",
      "Connect sensors, cameras, and equipment to gateways",
      "Install Edge AI runtime on gateways",
      "Deploy models from cloud to edge",
      "Configure data sync intervals and policies",
      "Monitor edge device health remotely",
    ],
  },
  industries: [
    { name: "Manufacturing", description: "Production line edge inference, real-time quality control.", url: "/industries/manufacturing" },
    { name: "Energy", description: "Remote wellhead monitoring, pipeline edge analytics.", url: "/industries/energy" },
  ],
  faqs: [
    { question: "Why edge instead of cloud?", answer: "Edge computing provides sub-50ms inference latency, operates during network outages, keeps sensitive data on-premises, and reduces cloud data transfer costs by up to 80%." },
    { question: "What edge hardware does SVARA support?", answer: "SVARA supports NVIDIA Jetson, Intel Movidius, ARM-based industrial gateways, and x86 industrial PCs." },
    { question: "How are edge devices managed at scale?", answer: "All edge devices are managed centrally through the AI OS control plane — model deployment, monitoring, updates, and health checks are handled remotely." },
  ],
  comparisons: [
    { concept: "Cloud Computing", description: "Centralized data processing in remote data centers.", differentiator: "Edge computing eliminates network latency, operates offline, and keeps data local. Cloud is used for training and aggregation, not real-time inference." },
    { concept: "Fog Computing", description: "Intermediate layer between edge and cloud.", differentiator: "SVARA's architecture is two-tier (edge + cloud), optimizing for simplicity and real-time performance without intermediate layers that add latency." },
  ],
  usedBy: [
    { product: "Edge AI", url: "/products/edge-ai" },
    { product: "Vision AI", url: "/products/vision-ai" },
    { product: "Drone AI", url: "/products/drone-ai" },
  ],
  roi: {
    overview:
      "Edge computing deployments typically reduce cloud costs by 60-80%, improve inference latency by 5-10x, and enable AI in locations previously unsuitable due to connectivity constraints.",
    metrics: [
      { label: "Cloud Cost Reduction", value: "60-80%" },
      { label: "Latency Improvement", value: "5-10x vs. cloud" },
      { label: "Offline Operation", value: "100% uptime during outages" },
    ],
  },
  resources: [
    { title: "Edge Computing Architectures for Industrial AI", type: "research" },
    { title: "Real-Time Edge Inference Optimization", type: "research" },
    { title: "IEC 62443 Edge Security Standards", type: "standard" },
  ],
  relatedProducts: [
    { name: "Edge AI", url: "/products/edge-ai", description: "Inference at the source, without the round trip." },
    { name: "Vision AI", url: "/products/vision-ai", description: "Real-time visual intelligence across cameras and sensors." },
  ],
  metadata: {
    title: "Edge Computing — Distributed Intelligence | SVARA",
    description: "SVARA's edge computing architecture processes data at the source for real-time intelligence with sub-50ms latency and reliable offline operation.",
    pageType: "article",
    datePublished: "2026-07-08",
    dateModified: "2026-07-08",
    primaryEntity: "Edge Computing",
    mentions: ["Edge AI", "Vision AI", "AI OS", "Manufacturing"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Technology", url: "/technology" },
      { name: "Edge Computing", url: "/technologies/edge-computing" },
    ],
  },
}
