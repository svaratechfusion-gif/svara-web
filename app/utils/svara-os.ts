// SVARA-OS — the single source of truth for the Products "Digital Operating
// System" page. Every field is transcribed from the SVARA Corporate Profile &
// Portfolio (Edition 2026, DOC 2026-013…023): real product names, capabilities,
// subsystems, KPIs, commercial tiers, deployment and industries. The Mission
// Control dashboard is data-driven from this file so each product surfaces its
// ACTUAL capabilities — nothing invented.

export interface OsKpi { label: string; value: number; prefix?: string; suffix?: string }
export interface OsTier { tier: string; price: string }
export interface OsProduct {
  id: string
  n: string            // "01"
  name: string         // display name
  short: string        // nav short name
  category: string     // Intelligence / Simulation / Enterprise / Engineering / Growth
  code: string         // DOC ref
  tagline: string      // subtitle line
  summary: string      // one-paragraph description (verbatim from profile)
  modules: { k: string; v: string }[]
  capabilities: string[]
  subsystems: string[] // labelled components → node graph
  kpis: OsKpi[]
  metricLabel: string  // live chart series label
  metricUnit: string
  logs: string[]       // streaming activity log templates
  assistant: { greeting: string; suggestions: string[] }
  industries: string[]
  commercial: OsTier[]
  deployment: string
  status: string
  to: string
}

export const SVARA_OS: OsProduct[] = [
  {
    id: 'vision', n: '01', name: 'SVARA Vision Intelligence', short: 'Vision AI',
    category: 'Intelligence', code: 'DOC 2026-014',
    tagline: 'AI-Powered CCTV & Video Analytics Platform',
    summary: 'SVARA Vision Intelligence transforms any existing or new CCTV infrastructure into an autonomous intelligence network that continuously monitors, understands, and acts on what it sees — detecting events, interpreting behaviour, generating alerts, and predicting risks before they escalate.',
    modules: [
      { k: 'Detect', v: 'Identify events in real-time' },
      { k: 'Interpret', v: 'Understand context & behaviour' },
      { k: 'Alert', v: 'Notify the right people instantly' },
      { k: 'Analyse', v: 'Extract insights & patterns' },
      { k: 'Predict', v: 'Anticipate risks before they escalate' },
    ],
    capabilities: [
      'Sub-300ms detection-to-alert latency',
      '200+ simultaneous camera feeds per inference server',
      'ONVIF compatible — works with existing IP cameras',
      'Natural-language video search',
      'Edge, cloud & hybrid deployment',
      'DPDP-compliant on-premises processing',
    ],
    subsystems: ['Vision Sensor', 'Inference Engine', 'Neural Processing Unit', 'Edge Processor', 'Video Analytics Core', 'Prediction Layer'],
    kpis: [
      { label: 'Streams Online', value: 1284 },
      { label: 'Detections / sec', value: 48200 },
      { label: 'Detection Latency', value: 287, suffix: 'ms' },
      { label: 'Anomaly Score', value: 4, suffix: '%' },
    ],
    metricLabel: 'Detections / sec', metricUnit: '',
    logs: [
      'zone-A · person detected · confidence 0.97',
      'gate-12 · loitering behaviour flagged',
      'bay-07 · PPE compliance verified',
      'perimeter · intrusion alert dispatched',
      'lobby-03 · face-search match returned',
      'dock-09 · vehicle counted · queue +2',
    ],
    assistant: { greeting: 'Vision copilot online. 1,284 streams monitored across 6 sites.', suggestions: ['Search footage: "red truck at gate 4 yesterday"', 'Summarise anomalies from the last hour', 'Create alert rule for restricted zones'] },
    industries: ['Smart Cities & Municipalities', 'Manufacturing & Industrial', 'Retail & Malls', 'Transport & Infrastructure', 'BFSI & Critical Infrastructure', 'Education & Campuses'],
    commercial: [{ tier: 'Software License', price: '₹800–₹3,500 / camera / month' }, { tier: 'Enterprise Deployment', price: '₹15L–₹2Cr+ / site' }],
    deployment: 'Edge · Cloud · Hybrid', status: 'Production Ready', to: '/products/vision-ai',
  },
  {
    id: 'drone', n: '02', name: 'SVARA Drone Intelligence', short: 'Drone AI',
    category: 'Intelligence', code: 'DOC 2026-015',
    tagline: 'Autonomous Aerial Intelligence & Response Platform',
    summary: 'SVARA Drone Intelligence transforms commercial drone platforms into autonomous AI-powered intelligence units — combining autonomous navigation, onboard Edge AI, real-time object detection, fleet coordination, and intelligent mission planning to create a continuous aerial intelligence network integrated with Vision Intelligence and ONE AI OS.',
    modules: [
      { k: 'Autonomous Patrol', v: 'Dynamic route planning with intelligent rerouting' },
      { k: 'AI Detection', v: 'Real-time detection & tracking on the drone' },
      { k: 'Live Tracking', v: 'Onboard Edge AI, 200 TOPS' },
      { k: 'Mission Response', v: 'Automatic aerial dispatch on Vision AI alerts' },
      { k: 'Fleet Coordination', v: 'Single command system, multi-drone' },
    ],
    capabilities: [
      'Autonomous patrol with intelligent rerouting',
      'Onboard Edge AI — real-time detection on the drone',
      'Incident response automation on Vision AI alerts',
      'Industrial inspection — solar, transmission, critical infra',
      'Multi-drone fleet management from one command system',
      'DGCA-compliant, BVLOS-ready operational workflows',
    ],
    subsystems: ['Vision Camera 4K', 'Thermal Sensor', 'Edge AI Processor', 'RTK Navigation', 'Communication Link', 'Autonomous Control'],
    kpis: [
      { label: 'Units in Flight', value: 37 },
      { label: 'Area Coverage', value: 98, suffix: '%' },
      { label: 'Edge Compute', value: 200, suffix: ' TOPS' },
      { label: 'Inspection Queue', value: 12 },
    ],
    metricLabel: 'Fleet Telemetry', metricUnit: '',
    logs: [
      'UAV-04 · autonomous patrol · sector 7',
      'UAV-11 · thermal anomaly · transmission line',
      'dispatch · aerial response to gate-12 alert',
      'UAV-02 · RTK lock · cm-level accuracy',
      'fleet · 3 units returning · battery hot-swap',
      'UAV-19 · solar-farm inspection complete',
    ],
    assistant: { greeting: 'Fleet command online. 37 units airborne, 98% area coverage.', suggestions: ['Dispatch nearest UAV to a Vision AI alert', 'Plan a BVLOS inspection route', 'Show thermal anomalies across the fleet'] },
    industries: ['Public Safety & Security', 'Industrial & Infrastructure', 'Energy & Utilities', 'Agriculture & Environment', 'Mining & Resources', 'Real Estate & Construction'],
    commercial: [{ tier: 'Hardware + AI Kit', price: '₹8L–₹18L' }, { tier: 'Enterprise Fleet', price: '₹40L–₹2Cr' }, { tier: 'Government Solutions', price: '₹2Cr–₹25Cr+' }],
    deployment: 'Onboard Edge · Fleet Cloud', status: 'Production Ready', to: '/products/drone-ai',
  },
  {
    id: 'edge', n: '03', name: 'SVARA Edge AI Platform', short: 'Edge AI',
    category: 'Intelligence', code: 'DOC 2026-016',
    tagline: 'Real-Time Intelligence at the Source',
    summary: 'SVARA Edge AI moves intelligence directly to the devices where information is created, allowing decisions to happen at the source without waiting for cloud processing — delivering ultra-low-latency inference, resilient offline operation, enterprise-grade privacy, and scalable deployment across industrial facilities and critical operations.',
    modules: [
      { k: 'Sensor Input', v: 'Multi-protocol industrial ingestion' },
      { k: 'Local Inference', v: '5–50ms vs 200–2,000ms cloud' },
      { k: 'Decision Engine', v: 'On-device autonomous decisions' },
      { k: 'Metadata Sync', v: 'Only metadata to the cloud' },
      { k: 'Cloud Intelligence', v: 'Federated model updates' },
    ],
    capabilities: [
      '5–50ms local inference vs 200–2,000ms cloud latency',
      'Offline operation — continues without connectivity',
      '99% bandwidth reduction — only metadata synchronised',
      'Multi-hardware — NVIDIA Jetson, Hailo-8, Intel OpenVINO',
      'Over-the-air model updates without downtime',
      'Federated learning — models improve, raw data stays on-site',
    ],
    subsystems: ['Neural Processor', 'Inference Engine', 'Industrial Compute', 'Memory Stack', 'Secure Storage', 'Networking Interfaces'],
    kpis: [
      { label: 'Edge Nodes', value: 2914 },
      { label: 'Inference Latency', value: 11, suffix: 'ms' },
      { label: 'Bandwidth Saved', value: 99, suffix: '%' },
      { label: 'Uptime', value: 99, suffix: '.98%' },
    ],
    metricLabel: 'Inference Throughput', metricUnit: '',
    logs: [
      'node-2914 · local inference · 9ms',
      'plant-04 · offline mode · queue buffered',
      'OTA · model v4.2 rolled to 318 nodes',
      'federated · gradient round complete',
      'gateway-77 · metadata sync · 1.2KB',
      'jetson-orin · thermal nominal · 14W',
    ],
    assistant: { greeting: 'Edge fabric online. 2,914 nodes, 11ms median inference.', suggestions: ['Roll a new model to a device group', 'Show nodes running offline', 'Compare edge vs cloud latency'] },
    industries: ['Manufacturing & Industry 4.0', 'Oil, Gas & Petrochemicals', 'Energy & Utilities', 'Defense & Aerospace', 'Transportation & Smart Mobility', 'Smart Cities & Infrastructure'],
    commercial: [{ tier: 'Edge AI Kit', price: '₹1.2L–₹4L / device' }, { tier: 'Edge-as-a-Service', price: '₹3,500–₹12,000 / device / month' }],
    deployment: 'Edge · Cloud Hybrid', status: 'Production Ready', to: '/products/edge-ai',
  },
  {
    id: 'cognitive', n: '04', name: 'SVARA Generative & Cognitive AI', short: 'Cognitive AI',
    category: 'Intelligence', code: 'DOC 2026-017',
    tagline: 'Enterprise AI, Knowledge Automation & Decision Intelligence',
    summary: 'SVARA Generative & Cognitive AI transforms enterprise information into an active intelligence layer capable of understanding context, generating responses, automating reasoning, and supporting strategic decision-making. Knowledge is no longer stored — it becomes an active participant in every business decision.',
    modules: [
      { k: 'Ingest', v: 'Documents, contracts, policies, emails' },
      { k: 'Understand', v: 'Context from enterprise knowledge' },
      { k: 'Reason', v: 'Cognitive Intelligence Engine' },
      { k: 'Decide', v: 'Executive decision intelligence' },
      { k: 'Act', v: 'Automate document-heavy workflows' },
    ],
    capabilities: [
      'Private AI workspace — org-specific models in secure environments',
      'Document intelligence — search & analyse via natural language',
      'AI process automation for document-heavy approvals',
      'Decision intelligence — executive conversational analytics',
      'Voice AI interface to enterprise knowledge',
      'Multilingual — English, Hindi & regional Indian languages',
    ],
    subsystems: ['Cognitive Engine', 'LLM Runtime', 'Embedding Engine', 'Reasoning Layer', 'Vector Database', 'Knowledge Graph'],
    kpis: [
      { label: 'Tokens / min', value: 1900000 },
      { label: 'Knowledge Nodes', value: 412000 },
      { label: 'Reasoning Tasks', value: 6031 },
      { label: 'Grounded Accuracy', value: 96, suffix: '%' },
    ],
    metricLabel: 'Reasoning Throughput', metricUnit: '',
    logs: [
      'query · "Q3 vendor contracts expiring" · 412 docs',
      'reasoning · multi-step chain · 7 hops',
      'embedding · 2,048 chunks indexed',
      'approval · invoice #INV-8842 routed',
      'voice · Hindi query resolved · 1.4s',
      'knowledge-graph · 318 new relations',
    ],
    assistant: { greeting: 'Cognitive engine online. 412k knowledge nodes grounded.', suggestions: ['Summarise all contracts expiring this quarter', 'Draft a policy from the knowledge base', 'Explain the reasoning behind decision #4471'] },
    industries: ['Banking & Financial Services', 'Insurance', 'Manufacturing & Industry', 'Healthcare', 'Government & Public Sector', 'Retail & Consumer Business'],
    commercial: [{ tier: 'Workspace Starter', price: '₹2L–₹5L / month' }, { tier: 'Enterprise Platform', price: '₹8L–₹30L / month' }, { tier: 'On-Premises', price: '₹50L–₹5Cr+' }],
    deployment: 'Cloud · On-Prem · Private', status: 'Enterprise Ready', to: '/products',
  },
  {
    id: 'agents', n: '05', name: 'SVARA Autonomous Agents & Voice AI', short: 'AI Agents',
    category: 'Intelligence', code: 'DOC 2026-018',
    tagline: 'Agentic AI & Intelligent Voice Automation',
    summary: 'SVARA Autonomous Agents transform repetitive workflows into intelligent digital workforces capable of planning, reasoning, communicating, and executing tasks independently — qualifying leads, processing invoices, onboarding employees, coordinating approvals, and collaborating with other AI agents to achieve complex business objectives.',
    modules: [
      { k: 'Perceive', v: 'Sense intent across channels' },
      { k: 'Understand', v: 'Reasoning & planning modules' },
      { k: 'Plan', v: 'Multi-agent orchestration' },
      { k: 'Execute', v: 'End-to-end task automation' },
      { k: 'Learn', v: 'Continuous improvement' },
    ],
    capabilities: [
      'Task automation — end-to-end without manual intervention',
      'Customer-facing agents for sales, support & onboarding',
      'Voice AI — natural inbound & outbound conversations',
      'Multi-agent orchestration of complex workflows',
      'Emotion detection with automatic escalation',
      'No-code Agent Builder — deploy without engineering',
    ],
    subsystems: ['Sales Agent', 'Support Agent', 'Finance Agent', 'HR Agent', 'Operations Agent', 'Voice AI Core'],
    kpis: [
      { label: 'Agents Deployed', value: 248 },
      { label: 'Workflows / hr', value: 3402 },
      { label: 'Autonomy Level', value: 4, prefix: 'L' },
      { label: 'Escalation Rate', value: 3, suffix: '%' },
    ],
    metricLabel: 'Workflows Executed', metricUnit: '',
    logs: [
      'sales-agent · lead qualified · handoff to rep',
      'finance-agent · invoice #8842 processed',
      'voice · inbound call · intent: reschedule',
      'hr-agent · onboarding checklist · 12/14',
      'orchestrator · 4 agents · approval chain',
      'support-agent · sentiment drop · escalated',
    ],
    assistant: { greeting: 'Agent mesh online. 248 agents, 3,402 workflows/hr.', suggestions: ['Build a no-code invoice-processing agent', 'Show escalations from the last hour', 'Orchestrate a lead-to-cash workflow'] },
    industries: ['BFSI', 'Healthcare', 'Retail & E-commerce', 'Manufacturing', 'Technology', 'Real Estate', 'Logistics', 'Education'],
    commercial: [{ tier: 'Starter', price: '₹1.5L–₹4L / month' }, { tier: 'Business', price: '₹6L–₹18L / month' }, { tier: 'Enterprise', price: '₹20L–₹80L / month' }],
    deployment: 'Cloud · Hybrid', status: 'Production Ready', to: '/products/ai-agents',
  },
  {
    id: 'twin', n: '06', name: 'SVARA Digital Twin Platform', short: 'Digital Twin',
    category: 'Simulation', code: 'DOC 2026-019',
    tagline: 'Digital Twin & Immersive Intelligence',
    summary: 'SVARA Digital Twin Platform creates a living virtual replica of factories, campuses, industrial assets, and entire operational environments — continuously synchronised so engineers, operators and executives can simulate future scenarios, predict equipment failures, optimise production, and validate decisions before implementing them physically.',
    modules: [
      { k: 'Replicate', v: 'Build accurate digital representations' },
      { k: 'Simulate', v: 'Run dynamic virtual scenarios' },
      { k: 'Predict', v: 'Forecast outcomes with AI models' },
      { k: 'Optimise', v: 'Refine decisions for best results' },
      { k: 'Deploy', v: 'Implement with confidence' },
    ],
    capabilities: [
      'Live synchronisation — mirrors physical assets below 500ms',
      'Scenario simulation — Monte Carlo before operational decisions',
      'Predictive maintenance — 2–6 weeks before failure',
      'Interactive 3D environment — web-based, no client required',
      'VR & AR ready for immersive training & collaboration',
      'Native AI integration with Vision AI and Edge AI',
    ],
    subsystems: ['Sensor Gateway', 'Streaming Layer', 'Reality Sync', 'Simulation Engine', 'Prediction Model', 'Physics Engine'],
    kpis: [
      { label: 'Sync Latency', value: 480, suffix: 'ms' },
      { label: 'Twin Fidelity', value: 99, suffix: '.2%' },
      { label: 'Simulations Run', value: 18400 },
      { label: 'Forecast Horizon', value: 72, suffix: 'h' },
    ],
    metricLabel: 'Live Sync Fidelity', metricUnit: '',
    logs: [
      'line-3 · reality-sync · 462ms',
      'monte-carlo · 4,096 scenarios · complete',
      'bearing-07 · degradation · fail in ~18 days',
      'twin · production optimised · +6% throughput',
      'physics-engine · thermal model updated',
      'AR session · operator training · bay-09',
    ],
    assistant: { greeting: 'Digital twin live. 99.2% fidelity, 480ms sync.', suggestions: ['Simulate a 20% throughput increase', 'Predict maintenance across all assets', 'Compare scenario A vs scenario B'] },
    industries: ['Manufacturing', 'Automotive', 'Pharmaceuticals', 'Energy & Utilities', 'Oil & Gas', 'Smart Cities', 'Transportation', 'Data Centers'],
    commercial: [{ tier: 'Asset Twin', price: '₹3L–₹12L / month' }, { tier: 'Enterprise Platform', price: '₹15L–₹60L / month' }, { tier: 'Smart City', price: '₹2Cr–₹30Cr+' }],
    deployment: 'Web Native · Cloud · Edge', status: 'Production Ready', to: '/products/digital-twin',
  },
  {
    id: 'aios', n: '07', name: 'SVARA ONE AI OS', short: 'One AI OS',
    category: 'Enterprise', code: 'DOC 2026-020',
    tagline: 'The Enterprise Operating System for the AI Era',
    summary: 'SVARA ONE AI OS introduces a unified intelligence layer that sits above enterprise software, AI models, business applications, and operational workflows — enabling employees to interact with one conversational operating system that understands intent, orchestrates actions, and executes business workflows through natural language.',
    modules: [
      { k: 'Enterprise AI Copilot', v: 'Unified access to business data' },
      { k: 'AI Orchestration Engine', v: 'Coordinates workflows across platforms' },
      { k: 'Cross-Platform Intelligence', v: 'SAP, Salesforce, Google Workspace' },
      { k: 'Unified Command Interface', v: 'One workspace via natural language' },
      { k: 'Executive Briefing', v: 'AI summaries from enterprise-wide data' },
      { k: 'Mobile & Voice Command', v: 'Hands-free enterprise control' },
    ],
    capabilities: [
      'Natural-language command interface — replace dashboards with conversation',
      'Universal integration bus — SAP, Salesforce, Google, Microsoft',
      'Multi-agent orchestration across departments',
      'Executive intelligence briefings & recommendations',
      'Mobile command — full enterprise on iOS & Android',
      'Voice-activated enterprise control, zero-trust secured',
    ],
    subsystems: ['Conversational Core', 'Orchestration Engine', 'Integration Bus', 'Enterprise Memory', 'Decision Intelligence', 'API Fabric'],
    kpis: [
      { label: 'Systems Connected', value: 16 },
      { label: 'Agents Active', value: 128 },
      { label: 'Intent Resolved', value: 94, suffix: '.1%' },
      { label: 'Uptime', value: 99, suffix: '.99%' },
    ],
    metricLabel: 'Commands Orchestrated', metricUnit: '',
    logs: [
      'command · "close the books for March"',
      'orchestrator · SAP + Tally + Finance agent',
      'briefing · executive summary generated',
      'integration · Salesforce sync · 2,104 records',
      'voice · "approve PO-4471" · executed',
      'intent · resolved · 0.9s · 3 systems',
    ],
    assistant: { greeting: 'ONE AI OS online. 16 systems connected, 128 agents active.', suggestions: ['"Show me this week\'s revenue across all systems"', 'Orchestrate a cross-platform month-end close', 'Draft the executive intelligence briefing'] },
    industries: ['Manufacturing', 'Financial Services', 'Healthcare', 'Retail & E-commerce', 'Logistics & Supply Chain', 'Real Estate & Construction'],
    commercial: [{ tier: 'Starter', price: '₹1L–₹3L / month' }, { tier: 'Business', price: '₹4L–₹12L / month' }, { tier: 'Enterprise', price: '₹15L–₹60L / month' }],
    deployment: 'Cloud · On-Prem · Hybrid', status: 'Production Ready', to: '/products/ai-os',
  },
  {
    id: 'cloud', n: '08', name: 'SVARA Unified Business Cloud', short: 'Business Cloud',
    category: 'Enterprise', code: 'DOC 2026-021',
    tagline: 'One Platform. Every Business Function. Built For The AI Era.',
    summary: 'SVARA Unified Business Cloud consolidates every essential business function into a single AI-powered operating environment where departments share one data model, one intelligence layer and one command interface — transforming traditional enterprise software into one continuously learning intelligence platform.',
    modules: [
      { k: 'CRM', v: 'AI-powered revenue intelligence & pipeline' },
      { k: 'ERP', v: 'Finance, inventory & supply chain forecasting' },
      { k: 'HRMS', v: 'Recruitment, payroll & attrition intelligence' },
      { k: 'LMS', v: 'Personalised learning journeys' },
      { k: 'AI Helpdesk', v: 'Omnichannel support automation' },
      { k: 'AI Agent Builder', v: 'No-code autonomous digital workers' },
    ],
    capabilities: [
      'AI CRM — predictive lead scoring & revenue analytics',
      'Enterprise ERP — finance, procurement & AI demand forecasting',
      'AI HRMS — recruitment intelligence & attrition prediction',
      'Learning Management — AI-generated personalised paths',
      'Helpdesk & Customer Success — AI ticket resolution & SLA intelligence',
      'No-code Agent Builder — AI workflows without development',
    ],
    subsystems: ['CRM', 'ERP', 'HRMS', 'LMS', 'AI Helpdesk', 'Agent Builder'],
    kpis: [
      { label: 'Modules Live', value: 10 },
      { label: 'Records Synced', value: 1200000000 },
      { label: 'Systems Unified', value: 47 },
      { label: 'Automation', value: 82, suffix: '%' },
    ],
    metricLabel: 'Records Synced', metricUnit: '',
    logs: [
      'crm · lead scored · 0.91 · routed to sales',
      'erp · demand forecast · SKU-2201 · +14%',
      'hrms · attrition risk · 3 flagged',
      'helpdesk · ticket auto-resolved · SLA met',
      'agent-builder · new workflow deployed',
      'data-model · 1.2B records · unified',
    ],
    assistant: { greeting: 'Business Cloud online. 10+ modules on one unified data model.', suggestions: ['Forecast Q3 demand across the supply chain', 'Show attrition risk by department', 'Build a no-code approval workflow'] },
    industries: ['Manufacturing', 'Healthcare', 'Education', 'Retail & E-Commerce', 'Logistics & Supply Chain', 'Professional Services', 'BFSI & Fintech', 'Government & Public Sector'],
    commercial: [{ tier: 'Growth', price: '₹25K–₹60K / month' }, { tier: 'Business', price: '₹80K–₹2.5L / month' }, { tier: 'Enterprise', price: '₹3L–₹12L / month' }],
    deployment: 'Cloud Native · Shared Data', status: 'Production Ready', to: '/products/business-cloud',
  },
  {
    id: 'engineering', n: '09', name: 'SVARA Digital Engineering', short: 'Engineering',
    category: 'Engineering', code: 'DOC 2026-022',
    tagline: 'Custom Technology Solutions & Enterprise Application Development',
    summary: 'SVARA Digital Engineering delivers custom technology solutions designed around each client\'s business objectives. Every project is built on the reusable SVARA technology foundation — delivering immediate business value while creating the foundation for continuous digital transformation and ecosystem expansion.',
    modules: [
      { k: 'Discover', v: 'Understand business objectives' },
      { k: 'Design', v: 'Architecture & solution blueprint' },
      { k: 'Build', v: 'Engineering & development execution' },
      { k: 'Integrate', v: 'System integration & testing' },
      { k: 'Deploy', v: 'Production deployment & go-live' },
      { k: 'Scale', v: 'Evolve & future-readiness' },
    ],
    capabilities: [
      'Enterprise software development — mission-critical applications',
      'Native & cross-platform mobile — iOS, Android & web',
      'AI & ML integration — custom models, LLM embedding, vision',
      'Legacy modernisation — into cloud-native, API-driven platforms',
      'Cloud architecture — design & scaling across AWS, Azure, GCP',
      'Security & quality — zero-trust, 80%+ automated test coverage',
    ],
    subsystems: ['Custom Software', 'Web & Mobile', 'API Platform', 'Cloud Infrastructure', 'Workflow Automation', 'Enterprise Dashboards'],
    kpis: [
      { label: 'Pipelines', value: 318 },
      { label: 'Deployments', value: 5914 },
      { label: 'Test Coverage', value: 80, suffix: '%+' },
      { label: 'Build Health', value: 99, suffix: '.4%' },
    ],
    metricLabel: 'Deployment Frequency', metricUnit: '',
    logs: [
      'pipeline · build #5914 · green · 4m12s',
      'legacy · migrated to cloud-native API',
      'ci · 84% coverage · zero-trust scan pass',
      'deploy · blue-green · go-live confirmed',
      'integration · 12 systems · contract tests',
      'observability · p99 latency · 118ms',
    ],
    assistant: { greeting: 'Engineering platform online. 318 pipelines, 99.4% build health.', suggestions: ['Scaffold a cloud-native migration plan', 'Show failing pipelines & root cause', 'Estimate an AI-integration sprint'] },
    industries: ['Financial Services', 'Healthcare & Life Sciences', 'Manufacturing & Industry', 'Retail & E-Commerce', 'Logistics & Supply Chain', 'Education & EdTech', 'Government & Public Sector'],
    commercial: [{ tier: 'Fixed-Price Projects', price: '₹5L–₹2Cr' }, { tier: 'Dedicated Teams', price: '₹3L–₹20L / month' }, { tier: 'AI Sprints', price: '₹8L–₹40L' }],
    deployment: 'Cloud Native · Multi-Cloud', status: 'Enterprise Ready', to: '/products',
  },
  {
    id: 'growth', n: '10', name: 'SVARA Digital Growth & PR Tech', short: 'Growth',
    category: 'Growth', code: 'DOC 2026-023',
    tagline: 'AI-Powered Marketing, Growth Engineering & Brand Intelligence',
    summary: 'SVARA Digital Growth & PR Tech combines artificial intelligence, marketing automation, search intelligence, corporate branding, performance analytics, media strategy and enterprise communications into one integrated growth platform — making every campaign continuously measurable, optimised and predictive.',
    modules: [
      { k: 'Discover', v: 'Market, audience & intent intelligence' },
      { k: 'Attract', v: 'Content, SEO, AEO, GEO & paid media' },
      { k: 'Convert', v: 'Landing, offers, funnels & CTAs' },
      { k: 'Engage', v: 'Automation, nurture & personalization' },
      { k: 'Measure', v: 'Attribution & performance intelligence' },
      { k: 'Optimize', v: 'AI learning, insights & continuous growth' },
    ],
    capabilities: [
      'Search intelligence — enterprise SEO, AEO & GEO visibility',
      'AI marketing automation — campaigns, segmentation & lifecycle',
      'Performance marketing — data-driven optimisation with measurable ROI',
      'Corporate brand strategy — positioning & messaging architecture',
      'PR & media intelligence — editorial outreach & reputation',
      'Growth analytics — real-time, CRM-connected revenue reporting',
    ],
    subsystems: ['SEO Engine', 'AEO Layer', 'GEO Module', 'AI Content Studio', 'Performance Marketing', 'Revenue Attribution'],
    kpis: [
      { label: 'Engagement Lift', value: 34, prefix: '+', suffix: '%' },
      { label: 'Reach / mo', value: 42800000 },
      { label: 'Conversion Index', value: 79, suffix: '/100' },
      { label: 'Attribution', value: 100, suffix: '% Live' },
    ],
    metricLabel: 'Campaign Reach', metricUnit: '',
    logs: [
      'seo · 214 keywords · avg rank +6',
      'aeo · featured snippet captured',
      'geo · LLM citation · brand surfaced',
      'campaign · ROAS +22% · budget shifted',
      'attribution · multi-touch · revenue mapped',
      'pr · share-of-voice · +9% this week',
    ],
    assistant: { greeting: 'Growth engine online. Reach 42.8M/mo, attribution live.', suggestions: ['Optimise budget across channels for ROAS', 'Generate an AEO/GEO content plan', 'Show attribution from campaign to revenue'] },
    industries: ['SaaS & Technology', 'E-commerce & D2C', 'Healthcare & Wellness', 'Fintech & Financial Services', 'Education & EdTech', 'Real Estate & PropTech', 'Manufacturing & Industrial', 'Professional Services'],
    commercial: [{ tier: 'Starter', price: '₹40K–₹90K / month' }, { tier: 'Growth Engine', price: '₹1.5L–₹4L / month' }, { tier: 'Enterprise', price: '₹5L–₹15L / month' }],
    deployment: 'Cloud · CRM-Connected', status: 'Enterprise Ready', to: '/products',
  },
]

// Enterprise architecture — 8 engineered layers (Chapter 04 / DOC 2026-024).
export const OS_STACK: { n: string; layer: string; detail: string }[] = [
  { n: '08', layer: 'Executive Intelligence', detail: 'Strategic impact & value realization' },
  { n: '07', layer: 'Business Applications', detail: 'Processes, workflows & orchestration' },
  { n: '06', layer: 'AI Services', detail: 'AI/ML, analytics & contextual insights' },
  { n: '05', layer: 'Data Intelligence', detail: 'Semantic layer, relationships & context' },
  { n: '04', layer: 'Simulation Core', detail: 'Digital twin engine & scenario simulation' },
  { n: '03', layer: 'Platform Services', detail: 'API gateway, identity & streaming' },
  { n: '02', layer: 'Edge Runtime', detail: 'Real-time processing & local intelligence' },
  { n: '01', layer: 'Data Sources', detail: 'Devices, systems & external feeds' },
]

export const OS_TECH: { group: string; items: string }[] = [
  { group: 'AI & ML', items: 'PyTorch · Hugging Face · TensorRT · ONNX · LangChain' },
  { group: 'Application', items: 'React · TypeScript · Flutter · React Native' },
  { group: 'Backend', items: 'Python · FastAPI · Node.js · Go' },
  { group: 'Infrastructure', items: 'Docker · Kubernetes · Terraform · AWS · Azure · GCP' },
  { group: 'Data', items: 'PostgreSQL · Redis · ClickHouse · Vector DB · Kafka · Pulsar' },
  { group: 'Security', items: 'Zero Trust · Vault · WAF · SOC 2 · DPDP Compliance' },
]

// Deployment models (portfolio + platform foundation).
export const OS_DEPLOY: { k: string; v: string }[] = [
  { k: 'Enterprise Cloud', v: 'Fully managed AI infrastructure, hosted by SVARA on AWS, Azure or GCP with rapid deployment and enterprise scalability.' },
  { k: 'Edge Deployment', v: 'Intelligence at the source — ultra-low-latency inference on-device with resilient offline operation across industrial facilities.' },
  { k: 'Hybrid', v: 'Edge + cloud working as one — process locally, synchronise metadata, and train models centrally with federated learning.' },
  { k: 'Private / On-Premise', v: 'Deploy inside your own infrastructure with complete control — India-native DPDP data sovereignty and zero-trust security.' },
]

// Target markets & audiences (Chapter 07 / DOC 2026-026).
export const OS_INDUSTRIES: { name: string; entry: string }[] = [
  { name: 'SMEs & Startups', entry: 'Entry: CRM + Helpdesk' },
  { name: 'Mid-Market Enterprises', entry: 'Entry: CRM + ERP + HRMS' },
  { name: 'Large Enterprises', entry: 'Vision Intelligence + Digital Twin + ONE AI OS' },
  { name: 'Educational Institutions', entry: 'Digital Campus · LMS + HRMS' },
  { name: 'Industrial & Manufacturing', entry: 'Vision AI + Edge AI' },
  { name: 'Government & Public Sector', entry: 'Vision + Drone + Edge + Digital Twin' },
  { name: 'Healthcare & Hospitals', entry: 'Vision AI + LMS + HRMS' },
  { name: 'Retail & Commercial', entry: 'CRM + Growth Intelligence + Vision AI' },
]

// Competitive positioning (Chapter 08 / DOC 2026-027).
export const OS_DIFFERENTIATORS: { k: string; v: string }[] = [
  { k: 'Integrated Ecosystem', v: 'Six divisions. One architecture. Infinite enterprise impact.' },
  { k: 'Platform Multiplier', v: 'Reusable components that accelerate every product by ~60–70%.' },
  { k: 'Edge-First Intelligence', v: 'Compute where it matters. Act in real time.' },
  { k: 'Sovereign by Design', v: 'India-first data sovereignty and DPDP compliance.' },
  { k: 'Partnership Over Products', v: 'Long-term value through deep integration.' },
]

export const OS_PLATFORM_STATS: { label: string; value: string }[] = [
  { label: 'Flagship Platforms', value: '10+' },
  { label: 'Divisions', value: '06' },
  { label: 'AI Backbone', value: 'Shared' },
  { label: 'Architecture', value: 'Modular' },
  { label: 'Uptime SLA', value: '99.9%' },
]
