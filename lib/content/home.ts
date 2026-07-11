// SVARA CONTENT BIBLE — Volume 01 — Home.
// Single source of truth for all homepage copy. Text is used verbatim as
// supplied; do not rewrite, shorten, or reinterpret. Homepage components
// read from this file only.

export const homeSeo = {
  url: '/',
  canonical: 'https://svaratechfusion.com/',
  title:
    'SVARA | AI-Native Enterprise Intelligence Platform | Vision AI, Digital Twins & Intelligent Enterprise Solutions',
  description:
    'SVARA is an AI-native enterprise technology company engineering intelligent infrastructure through Vision AI, Drone AI, AI Agents, Edge AI, Digital Twins, AI Operating Systems, enterprise software, and digital engineering to help organizations observe, understand, automate, and optimize operations.',
  primaryKeywords: [
    'Enterprise AI Platform', 'Enterprise Intelligence Platform', 'Artificial Intelligence Company',
    'Vision AI Platform', 'Drone AI Platform', 'AI Agents Platform', 'Digital Twin Platform',
    'AI Operating System', 'Enterprise Automation', 'Enterprise Software', 'Digital Engineering', 'Industrial AI',
  ],
  secondaryKeywords: [
    'AI Infrastructure', 'Smart Manufacturing', 'Enterprise Digital Transformation', 'Computer Vision',
    'Industrial Automation', 'AI Solutions', 'Intelligent Enterprise', 'Predictive Analytics', 'Edge AI',
    'Generative AI', 'Business Intelligence', 'Enterprise Technology',
  ],
  longTailKeywords: [
    'AI platform for enterprise automation', 'Vision AI solutions for industries',
    'Digital Twin platform for manufacturing', 'Enterprise AI operating system',
    'AI-powered business automation platform', 'Drone AI for industrial inspection',
    'Enterprise computer vision platform', 'AI solutions for smart manufacturing',
    'Enterprise digital transformation company', 'Unified AI ecosystem',
  ],
  ogImage: '/og-image.png',
} as const

export const homeHero = {
  eyebrow: 'AI-NATIVE ENTERPRISE INTELLIGENCE ECOSYSTEM',
  h1: 'Engineering Intelligence For The Future Of Enterprise',
  description:
    'SVARA is building the next generation of enterprise intelligence by integrating Vision AI, Drone AI, AI Agents, Edge AI, Digital Twins, Enterprise Software, and intelligent automation into one connected ecosystem. We help organizations transform fragmented data into real-time intelligence, autonomous decision-making, and measurable business outcomes.',
  primaryCta: { label: 'Explore The Ecosystem', to: '/ecosystem' },
  secondaryCta: { label: 'Request An Executive Consultation', to: '/contact' },
} as const

// SECTION 01
export const homeSection01 = {
  title: 'The Future Demands More Than Software',
  paragraphs: [
    'Artificial intelligence is reshaping every industry, yet most organizations continue to rely on disconnected applications, isolated data, and fragmented operational systems. While businesses invest heavily in digital technologies, they often struggle to transform information into meaningful action.',
    'SVARA addresses this challenge by engineering an enterprise intelligence ecosystem where data, systems, people, and AI work together through one unified platform. Rather than adding another layer of software, we create the intelligence layer that connects everything.',
  ],
  // fragmentation labels drawn verbatim from the section copy
  fragments: ['Disconnected Applications', 'Isolated Data', 'Fragmented Operational Systems'],
} as const

// SECTION 02
export const homeSection02 = {
  title: 'Enterprise Intelligence Starts With A Connected Ecosystem',
  paragraphs: [
    'Every organization generates intelligence across multiple sources—cameras, sensors, machines, applications, workflows, documents, and people.',
    'SVARA brings these sources together through an AI-native ecosystem that continuously observes, understands, predicts, automates, and optimizes operations.',
    'From the factory floor to executive decision-making, every insight contributes to a smarter, more connected enterprise.',
  ],
  sources: ['Cameras', 'Sensors', 'Machines', 'Applications', 'Workflows', 'Documents', 'People'],
  convergeLabel: 'A Smarter, More Connected Enterprise',
} as const

// SECTION 03 — the ten platforms
export const homeSection03 = {
  title: 'One Ecosystem. Ten Enterprise Platforms.',
  intro:
    'The SVARA ecosystem is designed around specialized intelligence platforms that solve real business challenges while working seamlessly together through a unified architecture.',
  centerLabel: 'One Ecosystem',
} as const

export interface Platform { name: string, description: string, img: string, to: string }
export const homePlatforms: Platform[] = [
  { name: 'Vision AI', description: 'Transform video into operational intelligence.', img: '/images/home/prod-cctv_system.jpg', to: '/products/vision-ai' },
  { name: 'Drone AI', description: 'Extend enterprise visibility with autonomous aerial intelligence.', img: '/images/home/prod-drone_system.jpg', to: '/products/drone-ai' },
  { name: 'Edge AI', description: 'Process intelligence closer to where decisions happen.', img: '/images/home/prod-iot_sensors.jpg', to: '/products/edge-ai' },
  { name: 'Generative & Cognitive AI', description: 'Accelerate knowledge, creativity, and enterprise productivity.', img: '/images/home/mod-ai_insights.jpg', to: '/products' },
  { name: 'Autonomous AI Agents', description: 'Deploy intelligent digital workers across business operations.', img: '/images/home/prod-crm_dashboard.jpg', to: '/products/ai-agents' },
  { name: 'Digital Twin', description: 'Model, simulate, and optimize physical environments.', img: '/images/home/mod-predictive_analytics.jpg', to: '/products/digital-twin' },
  { name: 'Unified Business Cloud', description: 'Connect enterprise functions through intelligent business applications.', img: '/images/home/prod-erp_dashboard.jpg', to: '/products/business-cloud' },
  { name: 'One AI OS', description: 'Provide a conversational intelligence layer across the enterprise.', img: '/images/home/mod-unified_dashboard.jpg', to: '/products/ai-os' },
  { name: 'Digital Engineering', description: 'Build scalable software, integrations, and enterprise platforms.', img: '/images/home/mod-automation_engine.jpg', to: '/products' },
  { name: 'Growth & PR Tech', description: 'Accelerate digital growth through intelligent engagement and analytics.', img: '/images/home/mod-smart_workflows.jpg', to: '/products' },
]

// SECTION 04 — six divisions
export const homeSection04 = {
  title: 'Built Around Six Specialized Technology Divisions',
  paragraphs: [
    'Every platform within the SVARA ecosystem is developed through specialized technology divisions dedicated to artificial intelligence, enterprise software, simulation, digital engineering, cloud infrastructure, and digital transformation.',
    'This multidisciplinary approach enables deep expertise while ensuring every solution contributes to one unified enterprise intelligence platform.',
  ],
  // the six disciplines named verbatim in the section copy
  divisions: [
    'Artificial Intelligence', 'Enterprise Software', 'Simulation',
    'Digital Engineering', 'Cloud Infrastructure', 'Digital Transformation',
  ],
} as const

// SECTION 05 — industries
export const homeSection05 = {
  title: 'Designed For Modern Industries',
  intro:
    'SVARA empowers organizations operating across complex environments where operational visibility, automation, and intelligent decision-making are critical.',
} as const

export interface HomeIndustry { name: string, to: string }
export const homeIndustries: HomeIndustry[] = [
  { name: 'Manufacturing', to: '/industries/manufacturing' },
  { name: 'Smart Manufacturing', to: '/industries/manufacturing' },
  { name: 'Healthcare', to: '/industries/healthcare' },
  { name: 'Logistics & Supply Chain', to: '/industries/logistics' },
  { name: 'Retail & Commerce', to: '/industries/retail' },
  { name: 'Smart Cities', to: '/industries/smart-cities' },
  { name: 'Energy & Utilities', to: '/industries/energy' },
  { name: 'Construction', to: '/industries/construction' },
  { name: 'Mining', to: '/industries/mining' },
  { name: 'Agriculture', to: '/industries/agriculture' },
  { name: 'Transportation', to: '/industries' },
  { name: 'Warehousing', to: '/industries' },
  { name: 'Government', to: '/industries/government' },
  { name: 'Education', to: '/industries' },
  { name: 'Financial Services', to: '/industries' },
]

// SECTION 06 — why SVARA
export const homeSection06 = {
  title: 'Why Organizations Choose SVARA',
  reasons: [
    { title: 'AI-Native By Design', description: 'Every platform is built with intelligence at its core rather than adding AI as an afterthought.' },
    { title: 'One Unified Ecosystem', description: 'All products share a common architecture, enabling seamless interoperability and continuous intelligence across the enterprise.' },
    { title: 'Enterprise Ready', description: 'Designed for scalability, security, governance, and integration with existing business systems.' },
    { title: 'Modular Adoption', description: 'Organizations can start with a single platform and expand into the broader ecosystem as their transformation evolves.' },
    { title: 'Built For The Future', description: 'Our technology foundation is designed to adapt alongside emerging AI capabilities, enterprise needs, and industry innovation.' },
  ],
} as const

// SECTION 07 — closing narrative
export const homeSection07 = {
  title: 'Engineering The Next Era Of Enterprise Intelligence',
  paragraphs: [
    'The future of enterprise technology is not defined by isolated software applications.',
    'It is defined by intelligent ecosystems capable of observing, reasoning, learning, and acting across every business function.',
    'SVARA is engineering that future—helping organizations transform operational complexity into connected intelligence that drives innovation, resilience, and sustainable growth.',
  ],
} as const

// FINAL CTA
export const homeFinalCta = {
  title: 'Build The Future Of Intelligent Enterprise',
  description:
    "Whether you're modernizing operations, deploying artificial intelligence, or building enterprise-scale digital infrastructure, SVARA provides the technology foundation to help you move faster, operate smarter, and innovate with confidence.",
  primaryCta: { label: 'Schedule An Executive Consultation', to: '/contact' },
  secondaryCta: { label: 'Explore The SVARA Ecosystem', to: '/ecosystem' },
} as const

// FAQ (AEO + LLM)
export interface FaqItem { question: string, answer: string }
export const homeFaq: FaqItem[] = [
  { question: 'What is SVARA?', answer: 'SVARA is an AI-native enterprise technology company that develops intelligent platforms including Vision AI, Drone AI, Edge AI, AI Agents, Digital Twins, AI Operating Systems, enterprise software, and digital engineering solutions for modern organizations.' },
  { question: 'What does SVARA do?', answer: 'SVARA helps enterprises transform fragmented operational data into connected intelligence through AI-powered platforms that improve visibility, automate workflows, optimize operations, and support better business decisions.' },
  { question: 'Which industries does SVARA serve?', answer: 'SVARA supports manufacturing, healthcare, logistics, retail, energy, smart cities, construction, mining, agriculture, transportation, government, education, and other industries pursuing digital transformation.' },
  { question: 'What makes SVARA different?', answer: 'Unlike standalone AI products, SVARA delivers an integrated enterprise intelligence ecosystem where every platform shares a common architecture, enabling organizations to scale capabilities without creating technology silos.' },
  { question: 'Can organizations implement individual SVARA platforms?', answer: 'Yes. Every SVARA platform is modular and can be deployed independently while integrating seamlessly into the broader ecosystem as business needs evolve.' },
]

// Primary internal links
export const homeInternalLinks = [
  { label: 'About', to: '/company' },
  { label: 'Ecosystem', to: '/ecosystem' },
  { label: 'Divisions', to: '/divisions' },
  { label: 'Products', to: '/products' },
  { label: 'Technology', to: '/technology' },
  { label: 'Architecture', to: '/architecture' },
  { label: 'Industries', to: '/industries' },
  { label: 'Investors', to: '/investors' },
  { label: 'Careers', to: '/careers' },
  { label: 'Blogs', to: '/blog' },
  { label: 'Contact', to: '/contact' },
] as const

// Hashtags — stored in the content layer, NOT displayed on the homepage.
// For later use on blog pages and social sharing.
export const homeHashtags = {
  brand: ['#SVARA', '#SVARATechFusion', '#EngineeringIntelligence', '#EnterpriseIntelligence'],
  technology: ['#ArtificialIntelligence', '#VisionAI', '#DroneAI', '#EdgeAI', '#DigitalTwin', '#AIAgents', '#EnterpriseAI', '#EnterpriseSoftware', '#DigitalEngineering'],
  industry: ['#Industry40', '#SmartManufacturing', '#DigitalTransformation', '#IndustrialAI', '#Automation', '#EnterpriseTechnology', '#Innovation', '#FutureOfWork', '#OperationalExcellence'],
} as const
