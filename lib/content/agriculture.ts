import type { IndustryContent } from "../types/content"

export const agricultureContent: IndustryContent = {
  canonicalDefinition:
    "Agriculture is SVARA's industry vertical for crop and farm operations — where the Intelligence Loop reduces yield variance, optimizes water use, and improves input efficiency across the field and the farm.",
  aiAnswerTarget:
    "**Agriculture** is SVARA's industry vertical where the Intelligence Loop transforms farm operations through yield-variance reduction, water-use optimization, and input efficiency across the field and the operation.",
  architecture: {
    overview:
      "SVARA's agriculture architecture spans the field, the machinery, and the operation. Edge gateways run inference on equipment and in-field nodes; a central intelligence layer correlates soil, weather, and crop data for farm-wide decision support.",
    components: [
      { name: "Field Observe", description: "Cameras, soil probes, and drone imagery for real-time crop, soil-moisture, and pest-pressure monitoring." },
      { name: "Crop Understand", description: "AI models that detect stress, weed pressure, and growth-stage deviation at field and zone granularity." },
      { name: "Yield Predict", description: "Forecasting of yield variance, irrigation demand, and input needs by field and zone." },
      { name: "Operation Coordinate", description: "Automated variable-rate application plans and equipment tasking routed to the fleet." },
    ],
    dataFlow:
      "Field, soil, and equipment data flows into the Intelligence Loop. Crop insights drive variable-rate actions, predictions inform planning, and outcomes refine the models.",
  },
  useCases: [
    {
      title: "Yield Variance Reduction",
      description: "Zone-level detection of crop stress and growth-stage deviation, with targeted intervention that narrows yield variance across the field and the operation.",
      industries: ["Agriculture"],
    },
    {
      title: "Water-Use Optimization",
      description: "Soil-moisture prediction and irrigation scheduling that matches water application to live demand, reducing over-irrigation without yield loss.",
      industries: ["Agriculture"],
    },
    {
      title: "Input Efficiency",
      description: "Variable-rate fertilizer, pesticide, and seed plans driven by field-condition intelligence, lowering cost per hectare while protecting yield.",
      industries: ["Agriculture"],
    },
  ],
  deployment: {
    overview:
      "Agriculture deployment begins with a single farm or field zone, then scales across the operation. Edge gateways on equipment and in-field nodes run local inference; a central layer coordinates farm-wide plans.",
    steps: [
      "Select pilot field or farm for initial deployment",
      "Deploy in-field edge nodes and connect equipment telemetry",
      "Configure crop, soil, and irrigation models for the operation",
      "Integrate with the farm management system and weather data",
      "Validate against baseline yield, water, and input KPIs",
      "Scale across remaining fields and the wider operation",
    ],
  },
  industries: [
    { name: "Agriculture", description: "Field operations transformed by the Intelligence Loop.", url: "/industries/agriculture" },
    { name: "Mining", description: "Remote fleet and heavy-equipment operations.", url: "/industries/mining" },
    { name: "Smart Cities", description: "Resource and environmental monitoring.", url: "/industries/smart-cities" },
  ],
  faqs: [
    { question: "Does SVARA work on remote farms with limited connectivity?", answer: "Yes. Edge-first inference runs on equipment and in-field nodes. SVARA syncs plans and aggregates when bandwidth allows, so field operations continue uninterrupted." },
    { question: "How does SVARA integrate with our farm management system?", answer: "SVARA connects to common farm-management and precision-ag platforms via APIs, adding AI-powered recommendation and tasking without replacing existing systems." },
    { question: "What ROI do growers typically see?", answer: "Growers typically see 5-15% reduction in yield variance, 15-30% reduction in water use, and 10-20% reduction in input cost per hectare within the first season." },
  ],
  comparisons: [
    { concept: "Traditional Precision Agriculture", description: "Zonal prescription maps refreshed seasonally.", differentiator: "SVARA updates zone prescriptions in-season from live field conditions, closing the loop between sensing and application." },
  ],
  applicableProducts: [
    { name: "Vision AI", url: "/products/vision-ai" },
    { name: "Edge AI", url: "/products/edge-ai" },
    { name: "Drone AI", url: "/products/drone-ai" },
    { name: "Digital Twin", url: "/products/digital-twin" },
    { name: "Growth Intelligence", url: "/products/growth-intelligence" },
  ],
  roi: {
    overview:
      "Agriculture deployments typically deliver 5-15% reduction in yield variance, 15-30% reduction in water use, and 10-20% reduction in input cost per hectare within the first season.",
    metrics: [
      { label: "Yield Variance Reduction", value: "5-15%" },
      { label: "Water-Use Reduction", value: "15-30%" },
      { label: "Input Cost per Hectare Reduction", value: "10-20%" },
      { label: "Stress-Detection Lead Time", value: "3-7 days" },
    ],
  },
  resources: [
    { title: "AI-Driven Crop Monitoring and Yield Prediction", type: "research" },
    { title: "Variable-Rate Application with Real-Time Field Data", type: "research" },
    { title: "ISO 11783 Agricultural Equipment Data Standard (ISOBUS)", type: "standard" },
  ],
  relatedProducts: [
    { name: "Vision AI", url: "/products/vision-ai", description: "Real-time visual intelligence for crop and field." },
    { name: "Drone AI", url: "/products/drone-ai", description: "Aerial scouting and field-zone intelligence." },
    { name: "Growth Intelligence", url: "/products/growth-intelligence", description: "Continuous optimization of water and input plans." },
  ],
  metadata: {
    title: "Agriculture Intelligence — SVARA",
    description: "SVARA transforms farm operations through yield-variance reduction, water-use optimization, and input efficiency driven by the Intelligence Loop.",
    pageType: "article",
    datePublished: "2026-07-08",
    dateModified: "2026-07-09",
    primaryEntity: "Agriculture",
    mentions: ["Vision AI", "Edge AI", "Drone AI", "Yield Variance", "Water Use"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Industries", url: "/industries" },
      { name: "Agriculture", url: "/industries/agriculture" },
    ],
  },
}