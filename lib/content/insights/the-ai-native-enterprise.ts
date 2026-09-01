// WHITE PAPER 03 — "The AI-Native Enterprise"
//
// design: 'report' — the corporate research-report treatment, drawn from the supplied
// references. Chosen because this is the executive register: a paper aimed at a board
// rather than at engineers, which is what separates it from WP01 (press) and WP02
// (schematic). Copy is VERBATIM from the approved draft.
//
// The AI-ENABLED vs AI-NATIVE distinction in section 03 is the paper's whole argument.
// It is the one place the piece draws a hard line, and it should not be softened.
import type { Insight } from './types'

export const theAiNativeEnterprise: Insight = {
  slug: 'the-ai-native-enterprise',
  kind: 'paper',
  design: 'report',
  title: 'The AI-Native Enterprise',
  subtitle: 'How Organisations Move From Digital Transformation to Intelligent, Adaptive and Autonomous Operations',
  seoTitle: 'The AI-Native Enterprise — SVARA Research White Paper',
  metaDescription:
    'From digital transformation to intelligent operations. A SVARA research white paper on the architecture, maturity model, governance and roadmap of the AI-native enterprise.',
  category: 'AI OS · Business SaaS · Autonomous Intelligence',
  contentType: 'White Paper',
  searchIntent: 'Informational',
  readingTime: '35–45 minutes',
  extent: '35–45 pages',
  published: '2026-09-02',
  primaryKeywords: [
    'AI-native enterprise', 'AI native organisation', 'enterprise AI architecture',
    'digital transformation to AI', 'intelligent operations',
  ],
  secondaryKeywords: [
    'AI OS', 'AI agents', 'digital workforce', 'digital twins', 'decision intelligence',
    'AI maturity model', 'AI governance', 'adaptive operations', 'enterprise AI strategy',
  ],
  dek: 'Digital transformation made organisations more connected — and more complex. The question is no longer how to digitise the organisation, but how to make it intelligent.',

  corePosition: {
    heading: 'The Core Thesis',
    paragraphs: [
      'For the past two decades, organisations have been undergoing digital transformation. They digitised records, moved infrastructure to the cloud, connected applications, automated workflows and built data platforms.',
      'But digital transformation created an unexpected challenge. Organisations became more connected — yet also more complex.',
      'Today, a typical enterprise may operate through dozens or hundreds of disconnected systems, dashboards, workflows and data sources.',
      'AI introduces a new possibility. The question is no longer simply: how do we digitise the organisation? It is becoming: how do we make the organisation intelligent?',
      'And beyond that: how do we design an organisation capable of sensing change, understanding context, reasoning about possibilities, coordinating systems and adapting over time?',
      'This is the AI-Native Enterprise.',
    ],
  },

  blocks: [
    { kind: 'h2', id: 'executive-summary', text: 'Executive Summary' },
    { kind: 'p', text: 'The modern enterprise was built around software. Different functions adopted specialised systems.' },
    { kind: 'p', text: 'Finance adopted financial platforms. Sales adopted CRM. Operations adopted ERP. Engineering adopted development and lifecycle tools. Marketing adopted automation platforms.' },
    { kind: 'p', text: 'The result was digital capability. But not necessarily organisational intelligence.' },
    { kind: 'p', text: 'The challenge is that information remains distributed. Decision-making remains fragmented.' },
    { kind: 'p', text: 'People still spend significant time:' },
    { kind: 'ul', items: [
      'searching for information;', 'interpreting dashboards;', 'connecting disconnected systems;',
      'coordinating teams;', 'initiating workflows;', 'monitoring outcomes.',
    ] },
    { kind: 'p', text: 'The AI-native enterprise introduces a different model. Instead of treating AI as another application added to the technology stack, intelligence becomes a cross-organisational layer.' },
    { kind: 'p', text: 'The enterprise can increasingly:' },
    { kind: 'flow', steps: ['Sense', 'Understand', 'Contextualise', 'Reason', 'Simulate', 'Coordinate', 'Act', 'Learn'] },
    { kind: 'p', text: 'This is not a vision of an organisation without people.' },
    { kind: 'statement', text: 'It is a vision of an organisation where technology increasingly handles the complexity between signal, understanding, decision and action.' },

    { kind: 'h2', id: 'limits', text: 'The Limits of Digital Transformation' },
    { kind: 'p', text: 'Digital transformation solved an important problem. It moved organisations away from paper-based and isolated processes.' },
    { kind: 'p', text: 'But digitisation alone does not create intelligence.' },
    { kind: 'p', text: 'A company may have:' },
    { kind: 'ul', items: [
      'cloud infrastructure;', 'enterprise applications;', 'business intelligence dashboards;',
      'automation platforms;', 'data warehouses;', 'AI tools.',
    ] },
    { kind: 'p', text: 'And still struggle to answer a simple question:' },
    { kind: 'statement', text: 'What is happening across the organisation right now, why is it happening and what should we do next?' },
    { kind: 'p', text: 'The problem is fragmentation. Different systems contain different versions of operational reality.' },
    { kind: 'p', text: 'People become the integration layer. They:' },
    { kind: 'ol', items: [
      'receive a signal;', 'investigate multiple systems;', 'gather context;', 'consult others;',
      'evaluate options;', 'make a decision;', 'initiate action.',
    ] },
    { kind: 'p', text: 'The AI-native enterprise redesigns this process. It introduces intelligence into the connections between systems.' },

    { kind: 'h2', id: 'what-is', text: 'What Is an AI-Native Enterprise?' },
    { kind: 'p', text: 'SVARA defines an AI-native enterprise as:' },
    { kind: 'statement', text: 'An organisation designed around interconnected intelligence systems that can continuously perceive change, understand context, reason about possibilities, coordinate resources and execute governed actions across the enterprise.' },
    { kind: 'p', text: 'The important distinction is between:' },
    { kind: 'defs', items: [
      { term: 'AI-enabled organisation', text: 'An existing organisation adds AI tools.' },
      { term: 'AI-native organisation', text: 'The organisation redesigns processes, systems and operating models around intelligence.' },
    ] },
    { kind: 'p', text: 'The difference is architectural.' },
    { kind: 'p', text: 'AI-native organisations do not simply ask: where can we use AI?' },
    { kind: 'statement', text: 'They ask: where should intelligence exist inside the organisation?' },

    { kind: 'h2', id: 'software-to-intelligence', text: 'From Software-Centric to Intelligence-Centric' },
    { kind: 'p', text: 'The traditional enterprise architecture looks like this:' },
    { kind: 'flow', steps: ['People', 'Applications', 'Data', 'Workflows', 'Outputs'] },
    { kind: 'p', text: 'The AI-native architecture introduces another layer.' },
    { kind: 'flow', steps: ['People + AI Agents', 'Intelligence & Reasoning', 'Context', 'Data + Digital Systems', 'Workflows + Action', 'Observation + Feedback'] },
    { kind: 'p', text: 'The organisation begins shifting from a collection of applications toward an interconnected intelligence environment.' },

    { kind: 'h2', id: 'architecture', text: 'The Architecture of the AI-Native Enterprise' },
    { kind: 'p', text: 'SVARA proposes seven foundational layers.' },
    { kind: 'stack', layers: [
      { name: 'Layer 01 — Experience', items: ['Conversational interfaces', 'Intelligent workspaces', 'AI copilots', 'Dashboards', 'Decision interfaces'] },
      { name: 'Layer 02 — Agents', items: ['Research agents', 'Operations agents', 'Customer agents', 'Engineering agents', 'Coordination agents'] },
      { name: 'Layer 03 — Intelligence', items: ['Generative AI', 'Cognitive AI', 'Machine learning', 'Predictive systems', 'Multimodal intelligence'] },
      { name: 'Layer 04 — Context', items: ['Knowledge', 'Enterprise data', 'Documents', 'Relationships', 'History', 'Digital twins'] },
      { name: 'Layer 05 — Orchestration', items: ['AI OS', 'Model routing', 'Agent orchestration', 'Workflow management', 'Permissions'] },
      { name: 'Layer 06 — Execution', items: ['APIs', 'Enterprise applications', 'Automation', 'Communication', 'Machines', 'Human workflows'] },
      { name: 'Layer 07 — Observation', items: ['Monitoring', 'Evaluation', 'Outcomes', 'Performance', 'Learning'] },
    ] },
    { kind: 'p', text: 'Together, these layers create an intelligence architecture around the enterprise.' },

    { kind: 'h2', id: 'data-context', text: 'The Data and Context Foundation' },
    { kind: 'p', text: 'AI without context can generate plausible responses. Enterprise intelligence requires something more.' },
    { kind: 'p', text: 'It must understand the organisation, its customers, its processes, its history, its constraints, its relationships and its current operational state.' },
    { kind: 'p', text: 'This requires an evolution from simple data access toward context architecture.' },
    { kind: 'statement', text: 'The key question becomes: how does intelligence know what matters right now?' },
    { kind: 'p', text: 'Context may include:' },
    { kind: 'defs', items: [
      { term: 'Structured data', text: 'Transactions, metrics and records.' },
      { term: 'Unstructured data', text: 'Documents, communications and knowledge.' },
      { term: 'Real-time data', text: 'Events, sensors and operational signals.' },
      { term: 'Relational context', text: 'How people, systems, processes and assets connect.' },
      { term: 'Historical context', text: 'What happened previously.' },
    ] },
    { kind: 'p', text: 'The context layer becomes the memory of the intelligent organisation.' },

    { kind: 'h2', id: 'intelligence-layer', text: 'The Intelligence Layer' },
    { kind: 'p', text: 'The AI-native enterprise will not depend on one model. Different forms of intelligence may perform different roles.' },
    { kind: 'defs', items: [
      { term: 'Generative AI', text: 'Communication, synthesis and content generation.' },
      { term: 'Predictive AI', text: 'Forecasting and pattern detection.' },
      { term: 'Cognitive systems', text: 'Reasoning and structured decision support.' },
      { term: 'Computer vision', text: 'Understanding visual environments.' },
      { term: 'Edge AI', text: 'Real-time intelligence near the source of data.' },
      { term: 'Specialised models', text: 'Domain-specific analysis.' },
    ] },
    { kind: 'statement', text: 'The architecture must therefore coordinate intelligence rather than simply deploy it.' },

    { kind: 'h2', id: 'agents', text: 'AI Agents and the Digital Workforce' },
    { kind: 'p', text: 'AI agents represent a significant evolution from traditional software.' },
    { kind: 'p', text: 'Traditional applications wait for instructions. Agents can potentially work toward objectives.' },
    { kind: 'p', text: 'An agent may:' },
    { kind: 'ul', items: [
      'receive a goal;', 'retrieve context;', 'create a plan;', 'use authorised tools;',
      'execute tasks;', 'evaluate progress;', 'escalate when required.',
    ] },
    { kind: 'p', text: 'This introduces the concept of a digital workforce. An organisation may eventually operate with specialised agents such as:' },
    { kind: 'defs', items: [
      { term: 'Customer Intelligence Agent', text: 'Understands customer context and coordinates responses.' },
      { term: 'Research Agent', text: 'Collects and synthesises information.' },
      { term: 'Operations Agent', text: 'Monitors workflows and identifies issues.' },
      { term: 'Finance Agent', text: 'Analyses financial events and exceptions.' },
      { term: 'Engineering Agent', text: 'Supports development and operational systems.' },
      { term: 'Orchestration Agent', text: 'Coordinates work across specialised agents.' },
    ] },
    { kind: 'p', text: 'The important shift is not simply task automation.' },
    { kind: 'statement', text: 'It is goal-oriented coordination.' },

    { kind: 'h2', id: 'digital-twins', text: 'Digital Twins and Operational Context' },
    { kind: 'p', text: 'Digital twins can provide a structured representation of operational reality.' },
    { kind: 'p', text: 'In an AI-native enterprise, they may represent physical assets, infrastructure, factories, supply chains, processes and business operations.' },
    { kind: 'p', text: 'The digital twin can provide intelligence with context. Instead of analysing isolated data, AI can understand:' },
    { kind: 'ul', items: [
      'What system does this belong to?', 'What else is connected?',
      'What is the current state?', 'What has changed?',
    ] },
    { kind: 'p', text: 'Digital twins can also support simulation.' },
    { kind: 'statement', text: 'This allows the enterprise to move from observing what happened toward exploring what may happen next.' },

    { kind: 'h2', id: 'simulation', text: 'Simulation and Decision Intelligence' },
    { kind: 'p', text: 'One of the defining characteristics of an AI-native enterprise may be its ability to evaluate multiple futures.' },
    { kind: 'p', text: 'When an event occurs, the system does not necessarily need to immediately react. It can explore what happens under each option, including doing nothing.' },
    { kind: 'p', text: 'Simulation can support more informed decision-making. The process becomes:' },
    { kind: 'flow', steps: ['Event', 'Context', 'Reasoning', 'Simulation', 'Decision', 'Action'] },
    { kind: 'p', text: 'This creates a more anticipatory operating model.' },

    { kind: 'h2', id: 'ai-os', text: 'AI OS: The Orchestration Layer' },
    { kind: 'p', text: 'As organisations deploy more AI systems, orchestration becomes essential.' },
    { kind: 'p', text: 'The AI OS can coordinate models, agents, data, context, workflows, permissions and human involvement.' },
    { kind: 'p', text: 'Its role is to help answer:' },
    { kind: 'ul', items: [
      'Which intelligence capability should handle this task?', 'What information should it access?',
      'Which agents need to collaborate?', 'What actions are permitted?',
      'When should a human become involved?',
    ] },
    { kind: 'statement', text: 'If enterprise software provides the applications, AI OS coordinates the intelligence between them.' },

    { kind: 'h2', id: 'human', text: 'Human Intelligence in an AI-Native Organisation' },
    { kind: 'p', text: 'The AI-native enterprise does not eliminate people. It changes where people create value.' },
    { kind: 'p', text: 'AI can increasingly support repetitive coordination and information processing. Humans can focus more on:' },
    { kind: 'ul', items: [
      'strategy;', 'creativity;', 'relationships;', 'judgement;', 'governance;', 'complex decision-making.',
    ] },
    { kind: 'p', text: 'The future organisation may therefore consist of human teams, AI agents and intelligent systems working as interconnected networks.' },
    { kind: 'p', text: 'Humans remain responsible for defining purpose, priorities, boundaries and accountability.' },

    { kind: 'h2', id: 'adaptive-operations', text: 'From Automation to Adaptive Operations' },
    { kind: 'p', text: 'Automation follows predefined paths. Adaptive operations respond to changing conditions.' },
    { kind: 'p', text: 'Traditional automation: IF EVENT → RUN WORKFLOW.' },
    { kind: 'p', text: 'Adaptive intelligence:' },
    { kind: 'flow', steps: ['Observe event', 'Understand context', 'Evaluate options', 'Select permitted response', 'Act', 'Observe outcome', 'Adapt'] },
    { kind: 'p', text: 'This does not mean removing structure.' },
    { kind: 'statement', text: 'It means making the structure capable of responding intelligently.' },

    { kind: 'h2', id: 'maturity', text: 'The AI-Native Enterprise Maturity Model' },
    { kind: 'scale',
      caption: 'The AI-native enterprise maturity model',
      levels: [
        { label: 'Level 01 — Digitised', text: 'Processes and information are digital.' },
        { label: 'Level 02 — Connected', text: 'Applications and data begin integrating.' },
        { label: 'Level 03 — Automated', text: 'Defined workflows execute automatically.' },
        { label: 'Level 04 — AI-Enabled', text: 'AI supports analysis and decision-making.' },
        { label: 'Level 05 — Agentic', text: 'AI agents coordinate tasks and workflows.' },
        { label: 'Level 06 — Orchestrated', text: 'Intelligence is coordinated across the organisation.' },
        { label: 'Level 07 — AI-Native', text: 'The organisation operates through interconnected, governed intelligence loops.' },
      ] },
    { kind: 'p', text: 'The goal is not to immediately reach Level 07.' },
    { kind: 'statement', text: 'The objective is to understand the organisation’s current architecture and design the next meaningful step.' },

    { kind: 'h2', id: 'use-cases', text: 'Enterprise Use Cases' },
    { kind: 'h3', id: 'uc-customer', text: 'Customer Operations' },
    { kind: 'p', text: 'Customer signal → context → reasoning → resolution → action. AI agents can coordinate activity across CRM, support and communication systems.' },
    { kind: 'h3', id: 'uc-operations', text: 'Intelligent Operations' },
    { kind: 'p', text: 'Operational events can trigger intelligence loops that:' },
    { kind: 'ul', items: [
      'identify anomalies;', 'retrieve context;', 'evaluate possible responses;', 'coordinate approved actions.',
    ] },
    { kind: 'h3', id: 'uc-engineering', text: 'Engineering' },
    { kind: 'p', text: 'AI can support the full engineering lifecycle: research, design, simulation, development, testing and monitoring.' },
    { kind: 'h3', id: 'uc-supply-chain', text: 'Supply Chain' },
    { kind: 'p', text: 'Intelligent systems can monitor demand, inventory, suppliers, logistics and disruption. Simulation and AI agents can help coordinate responses.' },
    { kind: 'h3', id: 'uc-bi', text: 'Business Intelligence' },
    { kind: 'p', text: 'Instead of static dashboards, intelligence systems can answer:' },
    { kind: 'ul', items: [
      'What changed?', 'Why did it change?', 'What should we investigate?', 'What actions are available?',
    ] },

    { kind: 'h2', id: 'governance', text: 'Governance, Security and Trust' },
    { kind: 'p', text: 'As intelligence gains access to enterprise systems, governance becomes architectural.' },
    { kind: 'p', text: 'Every AI-native organisation should define:' },
    { kind: 'defs', items: [
      { term: 'Identity', text: 'Which human, agent or system is acting?' },
      { term: 'Access', text: 'What can it access?' },
      { term: 'Permission', text: 'What actions are allowed?' },
      { term: 'Boundaries', text: 'What actions are prohibited?' },
      { term: 'Observability', text: 'Can behaviour be monitored?' },
      { term: 'Escalation', text: 'When must human approval occur?' },
      { term: 'Accountability', text: 'Who is responsible?' },
    ] },
    { kind: 'statement', text: 'Trust cannot be added after deployment. It must be designed into the intelligence architecture.' },

    { kind: 'h2', id: 'roadmap', text: 'Building the AI-Native Roadmap' },
    { kind: 'p', text: 'Organisations should avoid attempting to transform everything at once. A practical roadmap begins with intelligence loops.' },
    { kind: 'ol', items: [
      'Map the current environment — systems, data, workflows, decisions, bottlenecks.',
      'Identify high-value decisions. Where does better intelligence create meaningful value?',
      'Connect the context. Ensure intelligence can access relevant information.',
      'Introduce AI capabilities. Deploy the right intelligence for the problem.',
      'Create agentic workflows. Connect intelligence with approved tools and actions.',
      'Establish orchestration. Coordinate multiple systems and agents.',
      'Build governance. Define permissions, escalation and accountability.',
      'Measure outcomes. Observe what improves.',
    ] },
    { kind: 'p', text: 'Then expand.' },

    { kind: 'h2', id: 'future', text: 'The Future Organisation' },
    { kind: 'p', text: 'The organisation of the future may look fundamentally different.' },
    { kind: 'p', text: 'Employees may not interact with dozens of applications directly. Instead, they may increasingly work through intelligent interfaces.' },
    { kind: 'p', text: 'A leader may ask: what are the three biggest operational risks today?' },
    { kind: 'p', text: 'The intelligence layer may analyse enterprise systems, retrieve context, simulate potential consequences and identify options.' },
    { kind: 'p', text: 'The leader may then ask: show me the impact of the recommended response. And eventually: proceed within the approved budget and policy.' },
    { kind: 'p', text: 'The complexity remains.' },
    { kind: 'statement', text: 'But it increasingly exists behind an intelligent operating layer.' },
  ],

  closing: {
    heading: 'Closing Perspective',
    paragraphs: [
      'The AI-native enterprise is not defined by how many AI tools an organisation uses. It is defined by how effectively intelligence is connected to operations.',
      'The transformation is from digital systems, to connected systems, to intelligent systems, to adaptive organisations.',
      'The organisations that lead this transition will not simply deploy more AI.',
      'They will redesign how information moves. How context is created. How decisions are made. How systems coordinate. And how action connects back to learning.',
      'The enterprise of the future will not run on software alone. It will operate through connected intelligence.',
      'Sense. Understand. Reason. Simulate. Coordinate. Act. Learn.',
    ],
  },

  cta: {
    headline: 'THE AI-NATIVE ENTERPRISE — FROM DIGITAL TRANSFORMATION TO INTELLIGENT OPERATIONS.',
    body: 'Explore the architecture, orchestration and governance behind organisations designed around connected intelligence.',
    links: [
      { label: 'Explore AI OS', to: '/products/ai-os' },
      { label: 'Explore Business Cloud', to: '/products/business-cloud' },
      { label: 'Explore AI Agents', to: '/products/ai-agents' },
      { label: 'Talk to SVARA', to: '/contact' },
    ],
  },

  related: [
    { label: 'AI OS', to: '/products/ai-os' },
    { label: 'Business Cloud', to: '/products/business-cloud' },
    { label: 'AI Agents', to: '/products/ai-agents' },
    { label: 'Digital Twin', to: '/products/digital-twin' },
    { label: 'Enterprise Software', to: '/divisions/enterprise-software' },
    { label: 'Deep Tech & Autonomous Intelligence', to: '/divisions/autonomous-intelligence' },
  ],
}
