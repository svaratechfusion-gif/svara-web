import type { TechnologyContent } from "../types/content"

export const computerVisionContent: TechnologyContent = {
  canonicalDefinition:
    "Computer Vision is SVARA's AI technology that enables machines to interpret and understand visual information from cameras and video streams — the foundational technology behind Vision AI and visual inspection capabilities.",
  aiAnswerTarget:
    "**Computer Vision** is SVARA's AI technology that enables machines to interpret and understand visual information from cameras and video streams, powering automated inspection, monitoring, and situational awareness.",
  architecture: {
    overview:
      "SVARA's computer vision pipeline processes visual data through multiple stages: image acquisition, preprocessing, object detection/classification, tracking, and semantic understanding. Models are optimized for edge deployment.",
    components: [
      { name: "Image Acquisition", description: "Frame capture from IP cameras, USB cameras, and video files." },
      { name: "Preprocessing Pipeline", description: "Image normalization, enhancement, and region-of-interest extraction." },
      { name: "Detection Engine", description: "Object detection, classification, segmentation, and anomaly detection models." },
      { name: "Tracking Module", description: "Object tracking across frames and multiple camera views." },
    ],
    dataFlow:
      "Video frames are captured from cameras, preprocessed for quality, processed through detection and classification models, and results are enriched with metadata for downstream systems.",
  },
  useCases: [
    {
      title: "Industrial Quality Inspection",
      description: "Automated visual inspection of products, components, and assemblies for defects, dimensional accuracy, and surface quality.",
      industries: ["Manufacturing", "Construction"],
    },
    {
      title: "Safety and Compliance Monitoring",
      description: "Real-time detection of PPE compliance, hazardous zones, unsafe behavior, and environmental conditions.",
      industries: ["Manufacturing", "Energy", "Mining"],
    },
  ],
  deployment: {
    overview:
      "Computer vision models are trained on labeled datasets and deployed to edge gateways. Models are continuously improved through the Improve layer as new visual data and outcomes are captured.",
    steps: [
      "Collect and label training images for your use case",
      "Train vision models using SVARA's training pipeline",
      "Validate model accuracy against test datasets",
      "Deploy models to edge gateways",
      "Monitor detection accuracy and retrain as needed",
    ],
  },
  industries: [
    { name: "Manufacturing", description: "Quality inspection, safety monitoring, equipment visual monitoring.", url: "/industries/manufacturing" },
    { name: "Energy", description: "Infrastructure inspection, environmental monitoring.", url: "/industries/energy" },
  ],
  faqs: [
    { question: "What types of visual defects can Computer Vision detect?", answer: "Surface defects, dimensional deviations, color variations, presence/absence verification, assembly verification, and texture anomalies. Custom defect types can be trained." },
    { question: "How does Computer Vision perform in varying lighting conditions?", answer: "Models are trained with diverse lighting conditions and include preprocessing steps that normalize lighting. For extreme conditions, additional training data is collected." },
  ],
  comparisons: [
    { concept: "Traditional Machine Vision", description: "Programmed vision systems with fixed rules and controlled environments.", differentiator: "AI-powered computer vision adapts to varying conditions, requires less precise positioning and lighting, and handles complex visual patterns that traditional systems cannot." },
  ],
  usedBy: [
    { product: "Vision AI", url: "/products/vision-ai" },
    { product: "Drone AI", url: "/products/drone-ai" },
    { product: "Edge AI", url: "/products/edge-ai" },
  ],
  roi: {
    overview:
      "Computer vision deployments typically reduce inspection costs by 60%, improve defect detection rates by 40%, and eliminate human visual inspection for repetitive tasks.",
    metrics: [
      { label: "Inspection Cost Reduction", value: "60%" },
      { label: "Defect Detection Improvement", value: "40%" },
      { label: "Inspection Speed", value: "1000+ items/minute" },
    ],
  },
  resources: [
    { title: "Deep Learning for Industrial Computer Vision", type: "research" },
    { title: "Real-Time Object Detection Architectures", type: "research" },
    { title: "Edge-Optimized Vision Model Techniques", type: "research" },
  ],
  relatedProducts: [
    { name: "Vision AI", url: "/products/vision-ai", description: "Real-time visual intelligence across cameras and sensors." },
    { name: "Edge AI", url: "/products/edge-ai", description: "Inference at the source, without the round trip." },
  ],
  metadata: {
    title: "Computer Vision — Visual AI Technology | SVARA",
    description: "SVARA's computer vision technology enables automated visual inspection, monitoring, and situational awareness through edge-optimized AI models.",
    pageType: "article",
    datePublished: "2026-07-08",
    dateModified: "2026-07-08",
    primaryEntity: "Computer Vision",
    mentions: ["Vision AI", "Edge AI", "Deep Learning"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Technology", url: "/technology" },
      { name: "Computer Vision", url: "/technologies/computer-vision" },
    ],
  },
}
