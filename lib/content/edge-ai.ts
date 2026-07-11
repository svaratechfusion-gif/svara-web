import type { ProductContent } from "../types/content"

export const edgeAiContent: ProductContent = {
  canonicalDefinition:
    "Edge AI is SVARA's edge inference product that runs AI models directly on industrial gateways at the source of data generation, eliminating cloud round-trips for real-time operational intelligence.",
  aiAnswerTarget:
    "**Edge AI** is SVARA's edge inference product that runs AI models directly on industrial gateways at the source of data generation, eliminating cloud round-trips for real-time operational intelligence.",
  architecture: {
    overview:
      "Edge AI deploys a lightweight inference runtime on industrial-grade edge hardware. Models are trained in the cloud and deployed to edge devices, where they perform real-time inference with local data.",
    components: [
      { name: "Edge Runtime", description: "Lightweight inference engine optimized for industrial edge hardware." },
      { name: "Model Manager", description: "Remote model deployment, versioning, and rollback for edge devices." },
      { name: "Local Data Buffer", description: "On-device storage for inference results and edge data." },
      { name: "Sync Agent", description: "Synchronized data transfer to cloud when connectivity is available." },
    ],
    dataFlow:
      "Models are trained in the SVARA cloud and deployed to edge devices via the Model Manager. Inference happens locally on the edge device. Results are stored locally and synced to cloud when connectivity permits.",
  },
  useCases: [
    {
      title: "Real-Time Quality Inspection at the Line",
      description: "Run computer vision models on edge gateways at production lines for sub-50ms defect detection without cloud dependency.",
      industries: ["Manufacturing", "Construction"],
    },
    {
      title: "Remote Site Monitoring",
      description: "Deploy AI monitoring at remote facilities with intermittent connectivity, with local processing and periodic cloud sync.",
      industries: ["Energy", "Mining", "Agriculture"],
    },
  ],
  deployment: {
    overview:
      "Edge AI deploys to existing industrial gateways or dedicated edge hardware. Models are deployed remotely through the Model Manager with zero-touch configuration.",
    steps: [
      "Select or deploy compatible edge hardware",
      "Install Edge Runtime on devices",
      "Connect to SVARA cloud for model management",
      "Deploy models from cloud to edge devices",
      "Validate inference accuracy on edge",
      "Configure sync intervals and data retention policies",
    ],
  },
  industries: [
    { name: "Manufacturing", description: "Production line edge inference, quality inspection at line speed.", url: "/industries/manufacturing" },
    { name: "Energy", description: "Remote wellhead monitoring, pipeline edge analytics.", url: "/industries/energy" },
    { name: "Mining", description: "Remote site processing, equipment edge monitoring.", url: "/industries/mining" },
  ],
  faqs: [
    { question: "What hardware does Edge AI support?", answer: "Edge AI supports NVIDIA Jetson, Intel Movidius, ARM-based gateways, and x86 industrial PCs. Custom hardware certification available." },
    { question: "How is inference accuracy maintained?", answer: "Models are continuously validated against ground truth. When accuracy drifts below threshold, models are retrained in cloud and deployed to edge automatically." },
    { question: "Can Edge AI run without internet connectivity?", answer: "Yes. Edge AI operates fully offline with local inference and data buffering. Results sync when connectivity is restored." },
  ],
  comparisons: [
    { concept: "Cloud AI", description: "AI inference that requires sending data to cloud servers.", differentiator: "Edge AI keeps all data local, provides sub-50ms inference, and operates during network outages." },
    { concept: "Embedded AI", description: "AI models integrated directly into specific devices.", differentiator: "Edge AI works with existing industrial hardware and supports flexible model deployment without hardware replacement." },
  ],
  capability: "Understand",
  outcomes: ["Understand"],
  roi: {
    overview:
      "Edge AI deployments typically reduce cloud data transfer costs by 80%, achieve 10x latency improvement, and enable AI in locations where cloud connectivity is unreliable or unavailable.",
    metrics: [
      { label: "Cloud Data Transfer Reduction", value: "80%" },
      { label: "Inference Latency", value: "< 50ms (vs. 200-500ms cloud)" },
      { label: "Offline Operation", value: "100% during network outages" },
    ],
  },
  resources: [
    { title: "Edge AI for Industrial Operations", type: "research" },
    { title: "Model Optimization for Edge Deployment", type: "research" },
    { title: "NVIDIA Jetson Edge AI Platform", type: "documentation" },
  ],
  relatedProducts: [
    { name: "Vision AI", url: "/products/vision-ai", description: "Real-time visual intelligence across cameras and sensors." },
    { name: "AI Agents", url: "/products/ai-agents", description: "Autonomous workflows that act, not just answer." },
    { name: "Drone AI", url: "/products/drone-ai", description: "Autonomous aerial inspection and mapping." },
  ],
  metadata: {
    title: "Edge AI — Inference at the Source | SVARA",
    description: "Edge AI runs inference at the source of data generation with sub-50ms latency, eliminating cloud round-trips for real-time operational intelligence.",
    pageType: "product",
    datePublished: "2026-07-08",
    dateModified: "2026-07-08",
    primaryEntity: "Edge AI",
    mentions: ["Understand", "Vision AI", "Edge Computing", "Manufacturing"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/products" },
      { name: "Edge AI", url: "/products/edge-ai" },
    ],
  },
}
