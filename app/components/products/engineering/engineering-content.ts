// SVARA DIGITAL ENGINEERING — verbatim content for the immersive Explore experience. Factored out
// of EngineeringExplore.vue to keep the component focused. All strings / figures are VERBATIM from
// the source (P09); nothing is invented. Foundation models (GPT-4/Claude) are shown as integration
// nodes, NOT owned by SVARA; compliance standards are not implied on every project.

export interface KV { k: string; v: string }

export const HERO_LINES = ['We build what', 'your business needs.', 'We grow what', 'your business becomes.'] as const
export const HEAD_STATUS: KV[] = [
  { k: 'BUILD', v: 'READY' }, { k: 'TESTS', v: 'GREEN' }, { k: 'DEPLOY', v: 'READY' },
]
export const CORE_INNER = ['ARCHITECTURE', 'BUILD', 'INTEGRATE', 'DEPLOY', 'EVOLVE']
export interface HeroDomain { n: string; k: string; accent: string }
export const HERO_DOMAINS: HeroDomain[] = [
  { n: '01', k: 'APPLICATIONS', accent: '#4a7dff' },
  { n: '02', k: 'AI & ML', accent: '#9a7dff' },
  { n: '03', k: 'SYSTEMS & APIs', accent: '#4fd6ea' },
  { n: '04', k: 'CLOUD & INFRA', accent: '#45cf88' },
]

export interface Phase { n: string; k: string; b: string; items?: string[] }
export const PHASES: Phase[] = [
  { n: '01', k: 'SOLVE THE PROBLEM', b: 'Custom technology addressing a specific high-priority business challenge.' },
  { n: '02', k: 'EARN THE RELATIONSHIP', b: 'Become the trusted technology partner and understand the client’s longer-term roadmap.' },
  { n: '03', k: 'INTRODUCE THE ECOSYSTEM', b: 'SVARA products become natural next steps where relevant.', items: ['CRM', 'ERP', 'AI AGENTS', 'SURVEILLANCE PRODUCTS'] },
  { n: '04', k: 'CAPTURE RECURRING REVENUE', b: 'Transition from project-based relationships toward SaaS and platform relationships.' },
]

export interface Group { k: string; items?: string[]; note?: string }
export interface Domain { id: string; n: string; k: string; sub: string; pos: string; accent: string; tiles: string[]; groups: Group[] }
export const DOMAINS: Domain[] = [
  {
    id: 'app', n: '01', k: 'MOBILE & WEB', sub: 'Application Development', accent: '#4a7dff',
    pos: 'Build high-performance digital experiences around the exact requirements of the business.',
    tiles: ['NATIVE MOBILE', 'CROSS-PLATFORM', 'PROGRESSIVE WEB APPS', 'ENTERPRISE WEB', 'AI-FIRST DESIGN'],
    groups: [
      { k: 'NATIVE iOS & ANDROID', note: 'Complex, performance-intensive applications with offline capability.' },
      { k: 'CROSS-PLATFORM', items: ['React Native', 'Flutter'] },
      { k: 'PROGRESSIVE WEB APPS', note: 'App-quality web experiences with offline functionality and device sensor access.' },
      { k: 'ENTERPRISE WEB', items: ['Customer portals', 'Partner dashboards', 'Internal operational tools'] },
      { k: 'AI-FIRST DESIGN', items: ['Chatbots', 'Recommendations', 'Predictions'] },
    ],
  },
  {
    id: 'ai', n: '02', k: 'AI & MACHINE LEARNING', sub: 'Intelligence Integration', accent: '#9a7dff',
    pos: 'Integrate intelligence directly into products, workflows and business systems.',
    tiles: ['CUSTOM AI MODELS', 'LLM INTEGRATION', 'COMPUTER VISION', 'PREDICTIVE ANALYTICS', 'NLP & DOCUMENT AI'],
    groups: [
      { k: 'CUSTOM AI MODEL DEVELOPMENT', note: 'Models trained on client-specific data.' },
      { k: 'LLM INTEGRATION', items: ['GPT-4', 'Claude', 'Custom LLMs'], note: 'Integration nodes — leveraged, not owned by SVARA.' },
      { k: 'COMPUTER VISION', items: ['Quality control', 'Document processing', 'Facial recognition', 'Object detection'] },
      { k: 'PREDICTIVE ANALYTICS', items: ['Churn prediction', 'Demand forecasting', 'Fraud detection', 'Credit scoring'] },
      { k: 'NLP / DOCUMENT AI', items: ['Contract extraction', 'Form processing', 'Email classification', 'Sentiment analysis'] },
    ],
  },
  {
    id: 'api', n: '03', k: 'SYSTEMS & APIs', sub: 'Integration & API Development', accent: '#4fd6ea',
    pos: 'Connect new technology with existing business systems without unnecessary disruption.',
    tiles: ['LEGACY MODERNISATION', 'ERP & CRM INTEGRATION', 'API ORCHESTRATION', 'DATA PIPELINES', 'EVENT STREAMING'],
    groups: [
      { k: 'LEGACY MODERNISATION', note: 'Expose legacy data through modern APIs without replacing the core system.' },
      { k: 'ERP & CRM INTEGRATION', items: ['Tally', 'SAP', 'Salesforce', 'Zoho'] },
      { k: 'THIRD-PARTY API ORCHESTRATION', items: ['Payment gateways', 'Logistics', 'Banking APIs', 'Government portals'] },
      { k: 'DATA PIPELINES', items: ['ETL', 'ELT', 'Unified analytics'] },
      { k: 'REAL-TIME EVENT STREAMING', items: ['Kafka', 'RabbitMQ'] },
    ],
  },
  {
    id: 'cloud', n: '04', k: 'CLOUD & INFRASTRUCTURE', sub: 'Infrastructure Engineering', accent: '#45cf88',
    pos: 'Infrastructure designed for scale, resilience and reliable continuous delivery.',
    tiles: ['CLOUD-NATIVE', 'DEVOPS & CI/CD', 'SECURITY ENGINEERING', 'PERFORMANCE', 'COMPLIANCE'],
    groups: [
      { k: 'CLOUD-NATIVE ARCHITECTURE', items: ['AWS', 'Azure', 'GCP'] },
      { k: 'DEVOPS & CI/CD', items: ['Build', 'Test', 'Deploy'], note: 'Automated.' },
      { k: 'SECURITY ENGINEERING', items: ['Penetration testing', 'Vulnerability assessment', 'Zero-trust architecture'] },
      { k: 'PERFORMANCE ENGINEERING', items: ['Load testing', 'Optimisation', 'Capacity planning'] },
      { k: 'COMPLIANCE INFRASTRUCTURE', items: ['DPDP Act', 'ISO 27001', 'SOC 2', 'PCI-DSS', 'Healthcare data compliance'], note: 'Not every project automatically includes every standard.' },
    ],
  },
]

export const PIPELINE = ['DISCOVER', 'ARCHITECT', 'BUILD', 'INTEGRATE', 'TEST', 'DEPLOY', 'EVOLVE']
export interface DiscoveryCard { n: string; k: string; items?: string[]; note?: string }
export const DISCOVERY: DiscoveryCard[] = [
  { n: '01', k: 'DISCOVERY', items: ['Requirements', 'Constraints', 'Success metrics'] },
  { n: '02', k: 'ARCHITECTURE REVIEW', note: 'Technical architecture is reviewed before development begins.' },
  { n: '03', k: 'AI OPPORTUNITY MAPPING', note: 'Identify where AI can create the most value in the client’s specific context.' },
]
export const DISCOVERY_FLOW = ['DISCOVERY', 'ARCHITECTURE', 'AI OPPORTUNITY', 'BUILD']

export interface QualityGate { k: string; v: string; d: string }
export const QUALITY: QualityGate[] = [
  { k: 'TEST-DRIVEN DEVELOPMENT', v: '>80%', d: 'Automated test coverage for production code' },
  { k: 'AGILE DELIVERY', v: '2 WEEK', d: 'Sprint cycles' },
  { k: 'CODE REVIEW', v: 'SENIOR', d: 'Engineer review for every production commit' },
  { k: 'SECURITY BY DESIGN', v: 'OWASP', d: 'Guidelines + security checks' },
]
export interface LiveStage { k: string; s: string }
export const LIVE_PIPE: LiveStage[] = [
  { k: 'CODE', s: '' }, { k: 'TEST', s: 'PASS' }, { k: 'REVIEW', s: 'PASS' }, { k: 'SECURITY', s: 'PASS' },
  { k: 'BUILD', s: 'PASS' }, { k: 'DEPLOY', s: 'DEPLOYED' }, { k: 'MONITOR', s: 'LIVE' },
]

export interface StackGroup { k: string; items: string[] }
export const STACK: StackGroup[] = [
  { k: 'FRONTEND & MOBILE', items: ['React', 'Next.js', 'Vue.js', 'React Native', 'Flutter', 'Tailwind CSS', 'Framer Motion'] },
  { k: 'BACKEND & APIs', items: ['Node.js', 'Python', 'FastAPI', 'Django', 'Go', 'Java', 'Spring Boot', 'REST', 'GraphQL', 'gRPC'] },
  { k: 'AI & DATA', items: ['Python ML', 'LangChain', 'PyTorch', 'TensorFlow', 'OpenAI', 'Anthropic', 'HuggingFace'] },
  { k: 'CLOUD & DEVOPS', items: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'GitHub Actions', 'Jenkins'] },
  { k: 'DATABASES', items: ['PostgreSQL', 'MongoDB', 'Redis', 'ClickHouse', 'Pinecone'] },
  { k: 'INTEGRATION', items: ['Kafka', 'RabbitMQ', 'Zapier', 'Make', 'n8n', 'Twilio', 'Razorpay', 'Shiprocket'] },
]

export interface MapNode { k: string; accent: string; techs: string[] }
export const MAP: MapNode[] = [
  { k: 'MOBILE', accent: '#4a7dff', techs: ['React', 'Next.js', 'React Native', 'Flutter'] },
  { k: 'AI', accent: '#9a7dff', techs: ['Python', 'PyTorch', 'TensorFlow', 'LLMs'] },
  { k: 'API', accent: '#4fd6ea', techs: ['REST', 'GraphQL', 'gRPC', 'Kafka'] },
  { k: 'CLOUD', accent: '#45cf88', techs: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'] },
]

export const AI_EXAMPLES = ['CHATBOT', 'RECOMMENDATIONS', 'PREDICTIONS', 'COMPUTER VISION', 'DOCUMENT AI', 'NLP']
export const MODERN_CHAIN = ['LEGACY SYSTEM', 'MODERN API', 'SVARA ENGINEERING', 'NEW EXPERIENCE', 'UNIFIED DATA']
export const INTEGRATIONS = ['TALLY', 'SAP', 'SALESFORCE', 'ZOHO']
export const ECO_CHAIN = ['CUSTOM PROJECT', 'TRUSTED PARTNERSHIP', 'BUSINESS ROADMAP', 'SVARA PRODUCTS']
export const ECO_PATHS = ['CRM', 'ERP', 'AI AGENTS', 'SURVEILLANCE PRODUCTS']

export interface Engagement { n: string; k: string; structure: string[]; v: string; note?: string }
export const COMMERCIAL: Engagement[] = [
  { n: '01', k: 'FIXED-PRICE PROJECT', structure: ['Defined scope', 'Milestones', 'Deliverables', 'Predictable budget'], v: '₹5L–₹2Cr', note: 'depending on complexity' },
  { n: '02', k: 'DEDICATED TEAM', structure: ['Monthly retainer', 'Dedicated engineering team embedded with the client', '2–10 person teams'], v: '₹3L–₹20L / month' },
  { n: '03', k: 'AI INTEGRATION SPRINT', structure: ['4–8 week focused engagement', 'Integrate AI into an existing product'], v: '₹8L–₹40L' },
  { n: '04', k: 'MAINTENANCE & SUPPORT', structure: ['Post-launch support', 'Feature additions', 'Performance monitoring'], v: '₹50K–₹5L / month' },
]

export const CC_TELEMETRY = ['PROJECT STATUS', 'BUILD', 'TEST', 'SECURITY', 'DEPLOYMENT', 'INFRASTRUCTURE']
export const CC_PANELS = ['ARCHITECTURE', 'APPLICATION', 'AI', 'INTEGRATION', 'CLOUD', 'QUALITY']
