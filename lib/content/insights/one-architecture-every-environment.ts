// INDUSTRY REPORT 01 — "One Architecture, Every Environment"
//
// A third publication line, on the report design with its own imprint. An industry report
// shares the executive register of a white paper — it argues to operators and boards, not
// to engineers — so it takes the same treatment rather than a fourth design invented for
// the sake of difference.
//
// The report's whole claim is that ONE architecture serves four environments. Every
// section therefore has to keep the four in the same order — manufacturing, energy,
// logistics, built world — because the argument is a comparison, and a comparison that
// reorders its terms stops being one.
//
// Copy is VERBATIM from the approved draft.
import type { Insight } from './types'

export const oneArchitectureEveryEnvironment: Insight = {
  slug: 'one-architecture-every-environment',
  kind: 'paper',
  design: 'report',
  imprint: { name: 'SVARA Industry Report Series', label: 'Industry Report' },
  title: 'One Architecture, Every Environment',
  subtitle: 'How the same intelligence stack adapts across manufacturing, energy, logistics and the built world.',
  seoTitle: 'One Architecture, Every Environment — SVARA Industry Report 01',
  metaDescription:
    'How one reusable intelligence architecture adapts across manufacturing, energy, logistics and the built world: perception, edge, context, reasoning, agency and orchestration.',
  category: 'Industrial AI · Edge Intelligence · Digital Twins · Autonomous Systems',
  contentType: 'Industry Report',
  searchIntent: 'Informational',
  readingTime: '28–34 minutes',
  extent: 'Industry Report 01',
  published: '2026-09-02',
  primaryKeywords: [
    'industrial AI architecture', 'cross-industry AI', 'manufacturing AI',
    'energy AI', 'logistics AI', 'smart building intelligence',
  ],
  secondaryKeywords: [
    'digital twins', 'edge intelligence', 'AI agents', 'AI OS', 'reusable architecture',
    'multi-site deployment', 'controlled autonomy', 'operational intelligence',
  ],
  dek: 'The environment changes. The intelligence architecture adapts. Beneath four very different industries lies one common architectural pattern.',

  corePosition: {
    heading: 'The Core Idea',
    paragraphs: [
      'Industries are different. A manufacturing facility operates through machines, production lines and quality systems. An energy environment operates through distributed infrastructure, assets, networks and continuous operational monitoring. A logistics network moves through warehouses, fleets, routes and constantly changing conditions. The built world consists of buildings, campuses, infrastructure and interconnected physical environments.',
      'Their challenges are different. Their data is different. Their operating models are different.',
      'But beneath those differences exists a common architectural pattern. Every environment has reality, signals, perception, context, reasoning and action.',
      'This is the foundation of a reusable intelligence architecture. The environment changes; the intelligence architecture adapts.',
      'That is the central idea behind this report.',
    ],
  },

  blocks: [
    { kind: 'h2', id: 'executive-summary', text: 'Executive Summary' },
    { kind: 'p', text: 'Artificial intelligence is often deployed as an industry-specific solution. Manufacturing gets manufacturing AI. Energy gets energy analytics. Logistics gets supply chain optimisation. Buildings get smart building systems.' },
    { kind: 'p', text: 'This approach can solve individual problems. But it can also create fragmented technology architectures.' },
    { kind: 'p', text: 'Each environment may independently develop:' },
    { kind: 'ul', items: [
      'data pipelines;', 'perception systems;', 'AI models;', 'operational dashboards;',
      'automation workflows;', 'digital representations;', 'governance systems.',
    ] },
    { kind: 'p', text: 'Yet many of the underlying intelligence problems are structurally similar.' },
    { kind: 'p', text: 'A manufacturing plant needs to know what is happening on the production line. An energy operator needs to know what is happening across the network. A logistics operator needs to know where the disruption is. A building operator needs to know what is happening inside the environment.' },
    { kind: 'p', text: 'Different questions. The same fundamental intelligence process.' },
    { kind: 'flow', steps: ['Observe', 'Understand', 'Contextualise', 'Reason', 'Decide', 'Act', 'Learn'] },
    { kind: 'p', text: 'SVARA proposes that intelligence systems can be designed around this reusable architecture.' },
    { kind: 'statement', text: 'The models change. The sensors change. The assets change. The workflows change. But the underlying intelligence loop remains consistent.' },

    { kind: 'h2', id: 'the-problem', text: 'The Problem: Every Industry Builds Intelligence Differently' },
    { kind: 'p', text: 'Industrial organisations often begin with isolated problems. A factory installs computer vision for quality inspection. An energy operator deploys sensors for asset monitoring. A logistics company introduces fleet tracking. A building operator installs smart monitoring systems.' },
    { kind: 'p', text: 'Each project may create value. But over time, organisations can accumulate disconnected intelligence layers. The result may be:' },
    { kind: 'defs', items: [
      { term: 'Cameras', text: 'that do not connect to operational workflows.' },
      { term: 'Sensors', text: 'that generate alerts without contextual understanding.' },
      { term: 'AI models', text: 'that make predictions without the ability to trigger action.' },
      { term: 'Digital twins', text: 'that visualise environments without connecting to live intelligence.' },
      { term: 'Automation', text: 'that follows workflows without understanding changing conditions.' },
    ] },
    { kind: 'p', text: 'The opportunity is to connect these capabilities. Not simply to create smarter individual systems, but to create a reusable architecture for intelligence itself.' },

    { kind: 'h2', id: 'multiple-environments', text: 'One Architecture, Multiple Environments' },
    { kind: 'statement', text: 'The intelligence stack should remain composable even when the environment changes.' },
    { kind: 'p', text: 'Consider four environments.' },
    { kind: 'defs', items: [
      { term: 'Manufacturing', text: 'Machines, production lines, workers, materials, robotics and quality processes.' },
      { term: 'Energy', text: 'Generation assets, transmission infrastructure, distribution systems, sensors and field operations.' },
      { term: 'Logistics', text: 'Warehouses, vehicles, inventory, routes, packages and distribution networks.' },
      { term: 'The built world', text: 'Buildings, infrastructure, spaces, occupants, systems and environmental conditions.' },
    ] },
    { kind: 'p', text: 'The physical components are different. But the intelligence architecture can follow the same structure.' },

    { kind: 'h2', id: 'universal-stack', text: 'The Universal Intelligence Stack' },
    { kind: 'p', text: 'SVARA’s cross-environment architecture consists of six fundamental layers.' },
    { kind: 'stack', layers: [
      { name: 'Layer 01 — Reality', items: ['Machines and production lines', 'Infrastructure and assets', 'Warehouses, fleets and networks', 'Buildings, spaces and infrastructure'] },
      { name: 'Layer 02 — Perception', items: ['Vision AI', 'Sensors', 'Drones', 'IoT', 'Operational data', 'Enterprise systems'] },
      { name: 'Layer 03 — Edge Intelligence', items: ['Local inference', 'Event detection', 'Anomaly recognition', 'Low-latency decisions'] },
      { name: 'Layer 04 — Context', items: ['Digital Twins', 'Asset relationships', 'Historical data', 'Operational state', 'Enterprise knowledge'] },
      { name: 'Layer 05 — Intelligence + Agency', items: ['Generative AI', 'Cognitive AI', 'Predictive systems', 'AI Agents', 'Simulation'] },
      { name: 'Layer 06 — Orchestration + Action', items: ['One AI OS', 'Business Cloud', 'Enterprise workflows', 'Automation', 'Human intervention'] },
    ] },
    { kind: 'p', text: 'This architecture can be deployed across environments.' },

    { kind: 'h2', id: 'manufacturing', text: 'Manufacturing Intelligence' },
    { kind: 'p', text: 'Manufacturing environments generate continuous operational signals. Machines operate. Materials move. Products are assembled. Quality changes. Equipment degrades.' },
    { kind: 'p', text: 'The intelligence architecture begins with perception. Vision systems inspect production, sensors monitor machines, and operational systems provide production context.' },
    { kind: 'p', text: 'Edge intelligence processes information close to the production environment. Potential tasks include:' },
    { kind: 'ul', items: [
      'anomaly detection;', 'defect identification;', 'process monitoring;',
      'equipment condition analysis.',
    ] },
    { kind: 'p', text: 'The Digital Twin connects the event to the machine, the production line, the process, maintenance history and connected assets.' },
    { kind: 'p', text: 'AI then evaluates the situation. Is this an isolated anomaly? Is it part of a larger pattern? What could happen if production continues?' },
    { kind: 'flow', steps: ['Perception', 'Edge Intelligence', 'Digital Context', 'Reasoning', 'Action'] },
    { kind: 'p', text: 'The manufacturing environment becomes a continuous intelligence loop.' },

    { kind: 'h2', id: 'energy', text: 'Energy Intelligence' },
    { kind: 'p', text: 'Energy systems operate across distributed environments. Assets may be geographically separated. Conditions change continuously.' },
    { kind: 'p', text: 'Operational decisions may depend on:' },
    { kind: 'ul', items: [
      'asset state;', 'demand;', 'weather;', 'network conditions;',
      'maintenance;', 'historical patterns.',
    ] },
    { kind: 'p', text: 'The intelligence stack can provide a common architecture.' },
    { kind: 'flow', steps: ['Observe', 'Edge', 'Context', 'Reason', 'Simulate', 'Act'] },
    { kind: 'p', text: 'Sensors, cameras, drones and operational systems collect information. Local systems identify relevant events. Digital Twins connect information to assets and networks. Intelligence evaluates possible conditions and responses. Potential operational outcomes can be explored. Agents and workflows coordinate approved action.' },
    { kind: 'p', text: 'The architecture connects distributed physical infrastructure to central intelligence.' },

    { kind: 'h2', id: 'logistics', text: 'Logistics Intelligence' },
    { kind: 'p', text: 'Logistics is fundamentally a coordination environment. Assets move. Conditions change. Schedules shift. Inventory fluctuates.' },
    { kind: 'p', text: 'A reusable intelligence architecture can connect multiple signals.' },
    { kind: 'stack', layers: [
      { name: 'Reality', items: ['Warehouses', 'Vehicles', 'Packages', 'Routes'] },
      { name: 'Perception', items: ['Vision systems', 'Tracking systems', 'Operational data', 'Sensors'] },
      { name: 'Context', items: ['Where is the asset?', 'What is connected to it?', 'What is the current operational state?'] },
      { name: 'Reasoning', items: ['What caused the disruption?', 'What will happen next?', 'What alternatives are available?'] },
      { name: 'Agency', items: ['Investigation', 'Communication', 'Workflow changes', 'Escalation'] },
      { name: 'Orchestration', items: ['One AI OS coordinates intelligence across systems'] },
    ] },
    { kind: 'p', text: 'The objective is not simply tracking logistics.' },
    { kind: 'statement', text: 'It is creating an adaptive logistics environment.' },

    { kind: 'h2', id: 'built-world', text: 'Intelligence for the Built World' },
    { kind: 'p', text: 'Buildings are increasingly becoming connected environments. They generate information through cameras, environmental sensors, access systems, energy systems and operational platforms.' },
    { kind: 'p', text: 'But connected does not automatically mean intelligent. A building may have thousands of signals. The challenge is understanding what matters.' },
    { kind: 'flow', steps: ['Observe', 'Perceive', 'Contextualise', 'Reason', 'Coordinate', 'Act'] },
    { kind: 'p', text: 'The Digital Twin understands the relationship between spaces, systems, assets, occupants and infrastructure. AI interprets the operational situation, AI Agents connect the event to workflows, and the approved response is initiated.' },
    { kind: 'p', text: 'The built world becomes an operational intelligence environment.' },

    { kind: 'h2', id: 'what-changes', text: 'What Changes Between Environments' },
    { kind: 'p', text: 'The architecture can remain consistent. The implementation does not.' },
    { kind: 'defs', items: [
      { term: 'The inputs change', text: 'Manufacturing: machine and production data. Energy: asset and network data. Logistics: movement and operational data. Built world: spatial and environmental data.' },
      { term: 'The models change', text: 'A manufacturing defect model is different from an energy anomaly model. A logistics optimisation model is different from a building perception model.' },
      { term: 'The context changes', text: 'The Digital Twin represents a different reality in each environment. But its architectural role remains the same: it provides contextual understanding.' },
      { term: 'The actions change', text: 'The intelligence architecture may trigger maintenance, workflow changes, human alerts, automated responses or enterprise processes. The action depends on the environment.' },
    ] },

    { kind: 'h2', id: 'what-stays', text: 'What Stays the Same' },
    { kind: 'p', text: 'Across every environment, the intelligence system must answer the same fundamental questions.' },
    { kind: 'defs', items: [
      { term: 'What is happening?', text: 'Perception.' },
      { term: 'What does it mean?', text: 'Reasoning.' },
      { term: 'Where does it fit?', text: 'Context.' },
      { term: 'What could happen next?', text: 'Prediction and simulation.' },
      { term: 'What should we do?', text: 'Decision intelligence.' },
      { term: 'Who or what should act?', text: 'Agents, humans and systems.' },
      { term: 'Did the action work?', text: 'Observation and feedback.' },
    ] },
    { kind: 'p', text: 'These questions form the reusable architecture.' },

    { kind: 'h2', id: 'perception-across', text: 'Perception Across Industries' },
    { kind: 'p', text: 'Perception is the first layer of intelligence. But perception does not mean the same technology everywhere.' },
    { kind: 'table',
      caption: 'Perception technology by environment',
      headers: ['Environment', 'Example perception'],
      rows: [
        ['Manufacturing', 'Vision AI, machine sensors'],
        ['Energy', 'Drones, thermal imaging, IoT'],
        ['Logistics', 'Cameras, tracking, warehouse sensors'],
        ['Built World', 'Vision, environmental and access systems'],
      ] },
    { kind: 'p', text: 'The architecture should therefore separate the perception interface from the intelligence architecture. This allows new data sources to enter the same broader system.' },

    { kind: 'h2', id: 'context-twins', text: 'Context Through Digital Twins' },
    { kind: 'p', text: 'Raw information does not explain operational reality. Consider the signal: anomaly detected.' },
    { kind: 'p', text: 'The system still needs to understand where, what, why, what is connected, what happened before and what could be affected.' },
    { kind: 'p', text: 'Digital Twins provide this contextual layer. Across environments:' },
    { kind: 'defs', items: [
      { term: 'Manufacturing', text: 'A twin represents equipment and processes.' },
      { term: 'Energy', text: 'A twin represents infrastructure and networks.' },
      { term: 'Logistics', text: 'A twin represents assets, facilities and movement.' },
      { term: 'Built world', text: 'A twin represents buildings, spaces and systems.' },
    ] },
    { kind: 'p', text: 'The representation changes. The architectural purpose remains constant.' },
    { kind: 'statement', text: 'The Digital Twin turns isolated events into contextual situations.' },

    { kind: 'h2', id: 'to-autonomous-action', text: 'From Intelligence to Autonomous Action' },
    { kind: 'p', text: 'The final value of intelligence is not simply knowing. It is the ability to improve outcomes.' },
    { kind: 'flow', steps: ['Data', 'Insight', 'Context', 'Decision', 'Action'] },
    { kind: 'p', text: 'Traditional systems often stop at insight. AI-native architectures can continue into agency.' },
    { kind: 'p', text: 'An AI Agent may investigate an event, gather context, communicate with systems, initiate workflows and monitor progress.' },
    { kind: 'p', text: 'But autonomy must operate within boundaries. The architecture should determine what can be automated, what requires approval and what must be escalated.' },
    { kind: 'statement', text: 'This creates controlled autonomy.' },

    { kind: 'h2', id: 'cross-industry-loop', text: 'The Cross-Industry Intelligence Loop' },
    { kind: 'p', text: 'The same intelligence loop can operate across multiple environments.' },
    { kind: 'ascii',
      caption: 'The cross-industry loop',
      alt: 'A vertical loop diagram. Reality produces signals, which pass through perception, edge intelligence, digital context, reasoning, simulation, AI agents, orchestration and action to an outcome. Feedback from the outcome returns to reality, closing the loop.',
      art: `REALITY
   │
   ▼
SIGNALS
   │
   ▼
PERCEPTION
   │
   ▼
EDGE INTELLIGENCE
   │
   ▼
DIGITAL CONTEXT
   │
   ▼
REASONING
   │
   ▼
SIMULATION
   │
   ▼
AI AGENTS
   │
   ▼
ORCHESTRATION
   │
   ▼
ACTION
   │
   ▼
OUTCOME
   │
   └────────► FEEDBACK ────────┐
                               │
                               ▼
                            REALITY` },
    { kind: 'statement', text: 'The loop remains. The environment changes.' },

    { kind: 'h2', id: 'reference-architecture', text: 'The SVARA Cross-Environment Reference Architecture' },
    { kind: 'ascii',
      caption: 'Cross-environment reference architecture',
      alt: 'A hierarchy. One AI OS forms the orchestration layer at the top. Below it, AI Agents, Digital Twins and AI Models together form the intelligence layer. Beneath that sit four operational environments — manufacturing, energy, logistics and the built world — alongside enterprise data, all resting on reality.',
      art: `                    ┌──────────────────────┐
                    │      ONE AI OS       │
                    │  ORCHESTRATION LAYER │
                    └──────────┬───────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
        AI AGENTS       DIGITAL TWINS       AI MODELS
             │                 │                 │
             └─────────────────┼─────────────────┘
                               │
                      INTELLIGENCE LAYER
                               │
       ┌───────────────────────┼───────────────────────┐
       │                       │                       │
  MANUFACTURING             ENERGY                LOGISTICS
       │                       │                       │
       └───────────┬───────────┴───────────┬───────────┘
                   │                       │
              BUILT WORLD           ENTERPRISE DATA
                   │                       │
                   └───────────┬───────────┘
                               │
                            REALITY` },
    { kind: 'p', text: 'The purpose of the architecture is not to make every environment identical. It is to provide a common intelligence foundation.' },

    { kind: 'h2', id: 'deployment-patterns', text: 'Deployment Patterns' },
    { kind: 'scale',
      caption: 'Deployment patterns, by breadth of connection',
      levels: [
        { label: 'Pattern 01 — Single Environment', text: 'Deploy intelligence within one operational environment. Example: manufacturing — Vision AI, edge intelligence, a digital twin and a workflow.' },
        { label: 'Pattern 02 — Multi-Site', text: 'Deploy the same architectural pattern across multiple locations. Each site can operate locally while central intelligence coordinates across the network.' },
        { label: 'Pattern 03 — Cross-Environment', text: 'Connect multiple operational environments — manufacturing, logistics, energy and enterprise operations. The intelligence architecture becomes a connective layer across environments.' },
      ] },

    { kind: 'h2', id: 'scaling', text: 'Scaling Across Sites and Environments' },
    { kind: 'p', text: 'The architecture should scale in two directions.' },
    { kind: 'defs', items: [
      { term: 'Horizontal scale', text: 'More environments, more facilities, more devices, more intelligence nodes.' },
      { term: 'Vertical scale', text: 'More capability: perception, context, reasoning, simulation, agency and orchestration.' },
    ] },
    { kind: 'p', text: 'An organisation does not need to deploy everything at once. It can begin with a single intelligence loop, then expand.' },
    { kind: 'statement', text: 'Start with one environment. Build the architecture to support many.' },

    { kind: 'h2', id: 'governance', text: 'Governance and Human Control' },
    { kind: 'p', text: 'A cross-environment intelligence architecture introduces governance requirements. Different environments may have different risk profiles.' },
    { kind: 'p', text: 'The architecture must define:' },
    { kind: 'defs', items: [
      { term: 'Identity', text: 'Who or what is acting?' },
      { term: 'Context access', text: 'What information can intelligence access?' },
      { term: 'Agent permissions', text: 'What actions can an agent perform?' },
      { term: 'Human oversight', text: 'When must people approve a decision?' },
      { term: 'Observability', text: 'Can the system explain what happened?' },
      { term: 'Auditability', text: 'Can actions be traced?' },
    ] },
    { kind: 'p', text: 'The goal is not maximum autonomy. The goal is appropriate autonomy.' },
    { kind: 'statement', text: 'The more environments intelligence connects, the more important governance becomes.' },

    { kind: 'h2', id: 'future', text: 'The Future: Environment-Agnostic Intelligence' },
    { kind: 'p', text: 'The next generation of industrial technology may move away from completely isolated intelligence systems.' },
    { kind: 'p', text: 'Instead of building a manufacturing AI architecture, an energy AI architecture, a logistics AI architecture and a building AI architecture, organisations may increasingly build one adaptable intelligence architecture with environment-specific capabilities.' },
    { kind: 'p', text: 'The architecture provides the common operating framework. Individual environments contribute their own data, models, context, policies and workflows.' },
    { kind: 'p', text: 'This creates a composable intelligence system. The underlying architecture can evolve. New environments can connect. New models can be introduced. New agents can be deployed.' },
    { kind: 'statement', text: 'The intelligence stack does not need to be rebuilt from zero.' },
  ],

  closing: {
    heading: 'Closing Perspective',
    paragraphs: [
      'Manufacturing. Energy. Logistics. The built world. They are different operational environments.',
      'But intelligence faces the same fundamental challenge everywhere: how do we transform reality into understanding — and understanding into action?',
      'The answer is not necessarily one universal AI model. It is a reusable intelligence architecture.',
      'An architecture that can observe what is happening, understand what it means, contextualise where it fits, reason about what could happen next, coordinate the appropriate intelligence, act within defined boundaries and learn from the outcome.',
      'One architecture does not mean one environment. It means one intelligence foundation capable of adapting to many realities.',
    ],
  },

  cta: {
    headline: 'ONE ARCHITECTURE, EVERY ENVIRONMENT.',
    body: 'Manufacturing. Energy. Logistics. The built world. Different environments, one intelligence stack, continuous adaptation.',
    links: [
      { label: 'Explore Industries', to: '/industries' },
      { label: 'Explore Edge AI', to: '/products/edge-ai' },
      { label: 'Explore Digital Twins', to: '/products/digital-twin' },
      { label: 'Explore AI OS', to: '/products/ai-os' },
    ],
  },

  related: [
    { label: 'Industries', to: '/industries' },
    { label: 'Manufacturing', to: '/industries/manufacturing' },
    { label: 'Energy', to: '/industries/energy' },
    { label: 'Logistics', to: '/industries/logistics' },
    { label: 'Edge AI', to: '/products/edge-ai' },
    { label: 'Vision AI', to: '/products/vision-ai' },
    { label: 'Digital Twin', to: '/products/digital-twin' },
    { label: 'AI OS', to: '/products/ai-os' },
  ],
}
