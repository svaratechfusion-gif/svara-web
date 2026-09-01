// ARCHITECTURE SERIES 01 — "Edge Intelligence at Industrial Scale"
//
// A new publication line: a technical architecture brief, not a white paper. It uses
// `design: 'schematic'` — the dark instrument treatment — because the brief asks for
// something that "visually feels like an engineering blueprint rather than a traditional
// document full of business narrative", and that is exactly what the schematic is.
//
// The ASCII drawings are preserved verbatim as `ascii` blocks rather than approximated
// with `stack` or `flow`: a boxed node and a branching fleet tree cannot be expressed by
// a linear layer list, and redrawing them would lose what the author actually specified.
//
// Copy is VERBATIM from the approved draft.
import type { Insight } from './types'

export const edgeIntelligenceAtIndustrialScale: Insight = {
  slug: 'edge-intelligence-at-industrial-scale',
  kind: 'paper',
  design: 'schematic',
  imprint: { name: 'SVARA Architecture Series', label: 'Architecture Brief' },
  title: 'Edge Intelligence at Industrial Scale',
  subtitle: 'Running perception and inference where the data is created — the architecture behind real-time, distributed and industrial AI systems.',
  seoTitle: 'Edge Intelligence at Industrial Scale — SVARA Architecture Series 01',
  metaDescription:
    'The engineering architecture behind SVARA’s edge intelligence layer: the six-layer edge stack, distributed intelligence, latency tiers, fleet management, resilience and the security boundary.',
  category: 'Architecture · Edge AI · Industrial Intelligence',
  contentType: 'Architecture Brief',
  searchIntent: 'Informational',
  readingTime: '18–22 minutes',
  extent: 'Architecture Series 01',
  published: '2026-09-02',
  primaryKeywords: [
    'edge intelligence architecture', 'industrial edge AI', 'edge inference',
    'distributed AI architecture', 'edge AI at scale',
  ],
  secondaryKeywords: [
    'edge node', 'model fleet management', 'latency architecture', 'sensor fusion',
    'digital twins', 'AI agents', 'AI OS', 'industrial intelligence', 'edge resilience',
  ],
  dek: 'AI is usually designed around a centralised assumption: collect the data, send it to the cloud, process it, return a result. Industrial environments break that assumption.',

  corePosition: {
    heading: 'The Central Question',
    paragraphs: [
      'AI systems are often designed around a centralised assumption: collect the data, send it to the cloud, process it, return a result. That model works for many applications.',
      'But industrial environments create a different set of constraints. Data can be generated continuously. Cameras produce high-volume visual streams. Sensors generate real-time signals. Machines operate with strict latency requirements. Connectivity may be intermittent. Some decisions cannot wait for a round trip to a remote data centre.',
      'The question therefore becomes: what if intelligence needs to exist where reality happens?',
      'This is the purpose of the edge layer. The architectural principle is simple — move compute to the data. The edge is not simply a smaller cloud. It is a distributed intelligence layer operating at the boundary between physical reality and digital intelligence.',
    ],
  },

  blocks: [
    { kind: 'h2', id: 'edge-stack', text: 'The Edge Intelligence Stack' },
    { kind: 'p', text: 'A scalable edge architecture can be represented through six layers.' },
    { kind: 'stack', layers: [
      { name: 'Layer 01 — Signal', items: ['Cameras', 'Industrial sensors', 'Drones', 'Robotics', 'IoT devices', 'Machines', 'Production equipment'] },
      { name: 'Layer 02 — Ingest', items: ['Stream ingestion', 'Sensor communication', 'Protocol handling', 'Data synchronisation', 'Buffering'] },
      { name: 'Layer 03 — Perception', items: ['Object detection', 'Classification', 'Tracking', 'Event detection'] },
      { name: 'Layer 04 — Edge Inference', items: ['Computer vision', 'Anomaly detection', 'Predictive models', 'Sensor fusion', 'Multimodal inference'] },
      { name: 'Layer 05 — Local Decision', items: ['Continue monitoring', 'Record locally', 'Trigger workflow', 'Execute approved response or escalate'] },
      { name: 'Layer 06 — Synchronisation', items: ['Digital Twins', 'AI Agents', 'One AI OS', 'Business Cloud', 'Enterprise systems', 'Central data platforms'] },
    ] },
    { kind: 'p', text: 'In the perception layer, video becomes structured information:' },
    { kind: 'flow', steps: ['Video', 'Object Detection', 'Classification', 'Tracking', 'Event Detection'] },
    { kind: 'p', text: 'The raw signal becomes structured information.' },

    { kind: 'h2', id: 'distributed-model', text: 'The Distributed Intelligence Model' },
    { kind: 'p', text: 'SVARA’s edge architecture should not be positioned as an isolated device architecture. It is part of a distributed intelligence system.' },
    { kind: 'stack', layers: [
      { name: 'Edge', items: ['Immediate perception', 'Local inference', 'Low-latency decisions', 'Filtering'] },
      { name: 'Regional / Site Layer', items: ['Coordination', 'Aggregation', 'Local services', 'Fleet management'] },
      { name: 'Cloud / Enterprise', items: ['Large-scale reasoning', 'Historical analysis', 'Cross-site intelligence', 'Orchestration', 'Model lifecycle management'] },
    ] },
    { kind: 'p', text: 'The intelligence workload is distributed according to where it creates the most value.' },
    { kind: 'statement', text: 'Not every decision belongs in the cloud. Not every model belongs on the edge. The architecture determines where intelligence should run.' },

    { kind: 'h2', id: 'raw-to-events', text: 'From Raw Data to Intelligent Events' },
    { kind: 'p', text: 'Industrial systems can generate enormous amounts of raw data. Moving everything upstream is often unnecessary.' },
    { kind: 'p', text: 'The edge architecture introduces an intelligence filter.' },
    { kind: 'flow', steps: ['Raw Input', 'Local Processing', 'Event Detection', 'Context', 'Intelligent Event'] },
    { kind: 'p', text: 'Only meaningful information enters the wider system. This transforms the flow from a data pipeline into an intelligence pipeline.' },

    { kind: 'h2', id: 'edge-node', text: 'The Industrial Edge Node' },
    { kind: 'p', text: 'At the centre of the architecture is the edge node.' },
    { kind: 'ascii',
      caption: 'The SVARA edge node',
      alt: 'A stacked diagram of the SVARA edge node with six internal layers, from top to bottom: device and sensor connectivity; data ingestion and stream handling; vision, machine learning and AI inference; an event engine; a local policy and decision layer; and synchronisation and orchestration connectors.',
      art: `┌─────────────────────────────────────┐
│           SVARA EDGE NODE           │
├─────────────────────────────────────┤
│  DEVICE & SENSOR CONNECTIVITY       │
├─────────────────────────────────────┤
│  DATA INGESTION + STREAM HANDLING   │
├─────────────────────────────────────┤
│  VISION / ML / AI INFERENCE         │
├─────────────────────────────────────┤
│  EVENT ENGINE                       │
├─────────────────────────────────────┤
│  LOCAL POLICY + DECISION LAYER      │
├─────────────────────────────────────┤
│  SYNC + ORCHESTRATION CONNECTORS    │
└─────────────────────────────────────┘` },
    { kind: 'p', text: 'The edge node becomes a local intelligence environment. It can continue performing defined workloads even when connectivity to upstream systems is constrained.' },

    { kind: 'h2', id: 'latency', text: 'The Latency Architecture' },
    { kind: 'p', text: 'Different decisions have different time requirements. A scalable architecture should recognise this.' },
    { kind: 'scale',
      caption: 'Where a decision runs, by its time budget',
      levels: [
        { label: 'Millisecond / real-time', text: 'Handled locally. Machine events, collision detection, safety-related detection, immediate anomaly recognition.' },
        { label: 'Seconds', text: 'Handled through edge or local coordination. Event analysis, workflow initiation, local alerts.' },
        { label: 'Minutes', text: 'Can move into regional or cloud intelligence. Deeper analysis, operational coordination, agent workflows.' },
        { label: 'Hours / days', text: 'Suitable for centralised systems. Historical analysis, model training, optimisation, enterprise reporting.' },
      ] },
    { kind: 'p', text: 'This creates a latency-aware intelligence architecture.' },

    { kind: 'h2', id: 'edge-loop', text: 'The SVARA Edge Intelligence Loop' },
    { kind: 'p', text: 'The edge layer participates in a continuous loop.' },
    { kind: 'flow', steps: ['Observe', 'Interpret', 'Identify', 'Decide', 'Act', 'Synchronise', 'Learn'] },
    { kind: 'p', text: 'Cameras, sensors and devices capture reality. Edge AI processes the signal. The system detects a meaningful event. Local policies determine the appropriate response. An approved action is triggered. Relevant information enters the wider SVARA ecosystem. The outcome contributes to future intelligence.' },
    { kind: 'statement', text: 'Then observe again.' },

    { kind: 'h2', id: 'connecting-stack', text: 'Connecting Edge AI to the SVARA Stack' },
    { kind: 'p', text: 'The edge layer becomes more powerful when connected to other intelligence capabilities.' },
    { kind: 'stack', layers: [
      { name: 'Vision AI', items: ['Provides visual perception'] },
      { name: 'Edge AI', items: ['Runs perception and inference near the data source'] },
      { name: 'Generative & Cognitive AI', items: ['Interprets events and supports reasoning'] },
      { name: 'Digital Twins', items: ['Provide contextual representations of the environment'] },
      { name: 'AI Agents', items: ['Coordinate investigation and response'] },
      { name: 'One AI OS', items: ['Orchestrates the intelligence workflow'] },
      { name: 'Business Cloud', items: ['Connects outcomes to enterprise operations'] },
    ] },
    { kind: 'statement', text: 'This architecture creates a path from real-time signal to enterprise action.' },

    { kind: 'h2', id: 'digital-twin-connection', text: 'The Digital Twin Connection' },
    { kind: 'p', text: 'The edge observes reality. The digital twin provides context.' },
    { kind: 'p', text: 'Consider an industrial anomaly. The edge system may detect a temperature anomaly. But the event alone is incomplete.' },
    { kind: 'p', text: 'The Digital Twin can provide:' },
    { kind: 'ul', items: [
      'asset identity;', 'location;', 'connected systems;', 'operational state;',
      'maintenance history;', 'dependencies.',
    ] },
    { kind: 'p', text: 'The combined architecture becomes edge event plus digital twin context, producing intelligent understanding.' },
    { kind: 'statement', text: 'The event is no longer just a signal. It becomes an operational situation.' },

    { kind: 'h2', id: 'agent-connection', text: 'The AI Agent Connection' },
    { kind: 'p', text: 'Once an event has context, AI agents can coordinate the next stage. For example:' },
    { kind: 'flow', steps: ['Edge AI detects an anomaly', 'Context Agent retrieves information', 'Reasoning Agent evaluates causes', 'Response Agent determines actions', 'One AI OS applies permissions', 'Business system receives the workflow'] },
    { kind: 'p', text: 'The edge becomes the beginning of an autonomous intelligence loop.' },

    { kind: 'h2', id: 'model-deployment', text: 'Model Deployment at Scale' },
    { kind: 'p', text: 'An industrial edge architecture must support more than one device. It may eventually manage ten, then a hundred, then a thousand, then ten thousand or more distributed intelligence nodes.' },
    { kind: 'p', text: 'This introduces a model lifecycle challenge. The architecture requires:' },
    { kind: 'defs', items: [
      { term: 'Model versioning', text: 'Knowing which intelligence version is running where.' },
      { term: 'Deployment', text: 'Distributing approved models.' },
      { term: 'Rollback', text: 'Returning to a stable version when necessary.' },
      { term: 'Observability', text: 'Understanding how models perform.' },
      { term: 'Evaluation', text: 'Measuring accuracy and operational outcomes.' },
      { term: 'Update management', text: 'Improving intelligence across the fleet.' },
    ] },
    { kind: 'p', text: 'The challenge is therefore not simply: can we run AI on the edge?' },
    { kind: 'statement', text: 'It is: can we operate an intelligence fleet?' },

    { kind: 'h2', id: 'fleet', text: 'The Fleet Intelligence Architecture' },
    { kind: 'ascii',
      caption: 'Fleet topology',
      alt: 'A tree diagram. One AI OS sits at the top and branches to three edge nodes, numbered 01, 02 and 03. Each edge node connects downward to its own inputs: cameras, sensors and machines respectively.',
      art: `                    ┌───────────────┐
                    │   ONE AI OS   │
                    └───────┬───────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
        ┌─────▼─────┐ ┌─────▼────┐ ┌─────▼─────┐
        │ EDGE NODE │ │ EDGE NODE│ │ EDGE NODE │
        │     01    │ │    02    │ │     03    │
        └─────┬─────┘ └─────┬────┘ └─────┬─────┘
              │             │             │
           CAMERAS       SENSORS       MACHINES` },
    { kind: 'p', text: 'The central layer can coordinate policy, intelligence lifecycle and orchestration. Each edge node performs local intelligence. This creates a distributed but governed architecture.' },

    { kind: 'h2', id: 'resilience', text: 'Resilience by Design' },
    { kind: 'p', text: 'Industrial intelligence cannot always assume perfect connectivity. The architecture should account for:' },
    { kind: 'ul', items: [
      'intermittent networks;', 'bandwidth constraints;', 'remote environments;',
      'temporary service failures.',
    ] },
    { kind: 'p', text: 'This requires local resilience. An edge node may need to:' },
    { kind: 'ul', items: [
      'continue inference;', 'store relevant events;', 'apply local policies;',
      'synchronise later;', 'recover safely.',
    ] },
    { kind: 'statement', text: 'Cloud-connected, but not cloud-dependent for every decision.' },

    { kind: 'h2', id: 'security', text: 'The Security Boundary' },
    { kind: 'p', text: 'The edge layer operates at the intersection of physical and digital environments. Security must therefore exist across multiple levels.' },
    { kind: 'defs', items: [
      { term: 'Device identity', text: 'What device is connecting?' },
      { term: 'Model integrity', text: 'What intelligence is running?' },
      { term: 'Data access', text: 'What information can move?' },
      { term: 'Action permissions', text: 'What can the edge system trigger?' },
      { term: 'Observability', text: 'What happened and when?' },
      { term: 'Update control', text: 'Who can change the system?' },
    ] },
    { kind: 'statement', text: 'Security is not an external feature. It becomes part of the architecture itself.' },

    { kind: 'h2', id: 'design-principles', text: 'Designing for Industrial Scale' },
    { kind: 'p', text: 'An edge intelligence system should be designed around several principles.' },
    { kind: 'defs', items: [
      { term: 'Distributed', text: 'Intelligence can operate across locations.' },
      { term: 'Modular', text: 'Capabilities can be added or replaced.' },
      { term: 'Observable', text: 'System and model behaviour can be monitored.' },
      { term: 'Resilient', text: 'Critical intelligence can continue under constrained conditions.' },
      { term: 'Governed', text: 'Permissions and policies control action.' },
      { term: 'Composable', text: 'The edge can connect with the broader intelligence stack.' },
      { term: 'Scalable', text: 'Architecture supports growth from pilots to large deployments.' },
    ] },

    { kind: 'h2', id: 'reference-flow', text: 'The Reference Flow: From Reality to Enterprise Action' },
    { kind: 'ascii',
      caption: 'Reference flow',
      alt: 'A vertical flow diagram. The physical environment feeds cameras, sensors and machines, which feed the SVARA Edge AI block containing ingestion, perception, inference, event detection and local decision. That produces an intelligent event, which branches to both Digital Twins and AI Agents. Both converge on One AI OS, which passes to Business Cloud, and finally to enterprise action.',
      art: `PHYSICAL ENVIRONMENT
        │
        ▼
CAMERAS / SENSORS / MACHINES
        │
        ▼
┌─────────────────────┐
│    SVARA EDGE AI    │
│                     │
│  • Ingestion        │
│  • Perception       │
│  • Inference        │
│  • Event Detection  │
│  • Local Decision   │
└──────────┬──────────┘
           │
           ▼
      INTELLIGENT EVENT
           │
     ┌─────┴─────┐
     ▼           ▼
 DIGITAL      AI AGENTS
  TWINS           │
     │            │
     └─────┬──────┘
           ▼
       ONE AI OS
           │
           ▼
     BUSINESS CLOUD
           │
           ▼
    ENTERPRISE ACTION` },

    { kind: 'h2', id: 'architectural-shift', text: 'The Architectural Shift' },
    { kind: 'p', text: 'The industrial environment is evolving from connected devices to connected intelligence.' },
    { kind: 'p', text: 'The edge layer represents a critical transition.' },
    { kind: 'p', text: 'Data is no longer simply collected. It can be interpreted where it is created.' },
    { kind: 'p', text: 'Events no longer need to wait for centralised processing. They can become immediate intelligence signals. And those signals can connect to the wider enterprise.' },
  ],

  closing: {
    heading: 'The SVARA Edge Intelligence Principle',
    paragraphs: [
      'Perceive where reality happens.',
      'Infer where data is created.',
      'Coordinate where intelligence is needed.',
      'Act through a connected system.',
      'The architecture of intelligence at the edge.',
    ],
  },

  cta: {
    headline: 'EDGE INTELLIGENCE AT INDUSTRIAL SCALE.',
    body: 'Explore the products that compose the edge layer — perception at the source, context, agency and enterprise orchestration.',
    links: [
      { label: 'Explore Edge AI', to: '/products/edge-ai' },
      { label: 'Explore Vision AI', to: '/products/vision-ai' },
      { label: 'Explore Digital Twins', to: '/products/digital-twin' },
      { label: 'Explore AI OS', to: '/products/ai-os' },
    ],
  },

  related: [
    { label: 'Edge AI', to: '/products/edge-ai' },
    { label: 'Vision AI', to: '/products/vision-ai' },
    { label: 'Drone AI', to: '/products/drone-ai' },
    { label: 'Digital Twin', to: '/products/digital-twin' },
    { label: 'AI Agents', to: '/products/ai-agents' },
    { label: 'AI OS', to: '/products/ai-os' },
    { label: 'Business Cloud', to: '/products/business-cloud' },
    { label: 'SVARA Architecture', to: '/architecture' },
  ],
}
