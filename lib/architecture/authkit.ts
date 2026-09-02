// ARCHITECTURE PAGE CONTENT for the AuthKit component set.
//
// The copy is SVARA's, verbatim from the sections this replaces (ArcOverview,
// ArcDeployment, ArcEvent, ArcApi, ArcCrossCutting, ArcScale, ArcReference). Nothing
// is invented: the eight-stage flow, the eight reference layers with their roles,
// inputs, outputs and products, the event chain, the deployment targets and the scale
// stages are all transcribed.
//
// What changes is the SHAPE the content is poured into — the design's own components:
// eyebrow labels flanked by fading hairlines, a frosted icon timeline, glass plates in
// an overlapping fan, and badge tags.

/** One shape of a line-art glyph. */
export interface AkShape {
  d?: string
  cx?: number, cy?: number, r?: number
  x?: number, y?: number, w?: number, h?: number, rx?: number
}
export type AkGlyph = AkShape[]

export const AK_STATEMENT = {
  eyebrow: 'The full stack',
  headline: ['From the physical world', 'to enterprise action.'],
  body: 'SVARA is a layered intelligence architecture where every stage — from sensing and computation to reasoning and execution — can operate independently while remaining connected through one unified intelligence fabric.',
} as const

/** The eight stages, as the frosted icon timeline. */
export const AK_FLOW: { n: string, name: string, icon: AkGlyph }[] = [
  { n: '01', name: 'Sources', icon: [{ x: 3.5, y: 5, w: 17, h: 12, rx: 2 }, { d: 'M8 20h8M12 17v3' }] },
  { n: '02', name: 'Edge', icon: [{ d: 'M13.2 2.8 4.6 13.4h5.6l-1 7.8 8.6-10.6h-5.6Z' }] },
  { n: '03', name: 'Data', icon: [{ d: 'M4 6.5c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Z' }, { d: 'M4 6.5v11c0 1.7 3.6 3 8 3s8-1.3 8-3v-11' }, { d: 'M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3' }] },
  { n: '04', name: 'Intelligence', icon: [{ d: 'M12 3.5 20 8v8l-8 4.5L4 16V8Z' }, { d: 'M12 12.2 20 8M12 12.2v8.3M12 12.2 4 8' }] },
  { n: '05', name: 'Cognition', icon: [{ cx: 7, cy: 7, r: 2.4 }, { cx: 17, cy: 7, r: 2.4 }, { cx: 12, cy: 17, r: 2.4 }, { d: 'M8.6 8.8 11 14.9M15.4 8.8 13 14.9M9.4 7h5.2' }] },
  { n: '06', name: 'Orchestration', icon: [{ d: 'M4 17.5V6.5M4 6.5h11.5M4 12h8.5M4 17.5h13.5' }, { cx: 18.4, cy: 6.5, r: 1.9 }, { cx: 15.4, cy: 12, r: 1.9 }, { cx: 20.4, cy: 17.5, r: 1.9 }] },
  { n: '07', name: 'Applications', icon: [{ x: 3.5, y: 3.5, w: 7, h: 7, rx: 1.6 }, { x: 13.5, y: 3.5, w: 7, h: 7, rx: 1.6 }, { x: 3.5, y: 13.5, w: 7, h: 7, rx: 1.6 }, { x: 13.5, y: 13.5, w: 7, h: 7, rx: 1.6 }] },
  { n: '08', name: 'Action', icon: [{ d: 'M4 12h13' }, { d: 'm12.5 7 5 5-5 5' }] },
]

/** The concerns that run through every layer rather than sitting in one. */
export const AK_CROSS = ['Security', 'Governance', 'Observability', 'Infrastructure'] as const

/** The reference architecture — eight layers as glass plates. */
export interface AkLayer {
  n: string
  name: string
  role: string
  input: string
  output: string
  items: string[]
  products: string[]
}

export const AK_LAYERS: AkLayer[] = [
  { n: '01', name: 'Experience', role: 'Where people and systems use intelligence', input: 'Orchestrated results', output: 'Actions, insights, APIs', items: ['One AI OS', 'Command Center', 'Enterprise Apps', 'APIs'], products: ['One AI OS', 'Business Cloud'] },
  { n: '02', name: 'Orchestration', role: 'Coordinates models, agents, workflows and systems', input: 'Requests + policy', output: 'Routed, governed execution', items: ['Agent Orchestration', 'Workflow Engine', 'Policy Engine', 'Event Bus'], products: ['AI Agents', 'One AI OS'] },
  { n: '03', name: 'Cognition', role: 'Interprets objectives and decides', input: 'Context + objectives', output: 'Plans and controlled actions', items: ['AI Agents', 'Planning', 'Reasoning', 'Memory', 'Tool Use'], products: ['AI Agents', 'Cognitive AI'] },
  { n: '04', name: 'Intelligence', role: 'Runs specialized model inference', input: 'Structured signal + context', output: 'Detections, predictions, generation', items: ['Vision', 'Multimodal AI', 'Generative AI', 'Predictive AI'], products: ['Vision AI', 'Generative AI'] },
  { n: '05', name: 'Simulation', role: 'Models and predicts outcomes', input: 'Twin state + scenarios', output: 'Forecasts + recommendations', items: ['Digital Twins', 'Simulation', 'Forecasting'], products: ['Digital Twin'] },
  { n: '06', name: 'Data & Context', role: 'Unifies context across systems', input: 'Streams + enterprise data', output: 'Served, contextual intelligence', items: ['Operational Data', 'Enterprise Data', 'Knowledge', 'Vector Systems'], products: ['Business Cloud'] },
  { n: '07', name: 'Edge & Perception', role: 'Perceives and computes at the source', input: 'Raw physical + digital signals', output: 'Structured intelligence events', items: ['Vision AI', 'Drone AI', 'Edge AI', 'Sensors'], products: ['Vision AI', 'Drone AI', 'Edge AI'] },
  { n: '08', name: 'Physical + Digital Sources', role: 'The connected physical and digital world', input: 'The operating environment', output: 'Signals into the stack', items: ['Machines', 'Cameras', 'Drones', 'IoT', 'ERP', 'CRM', 'APIs'], products: [] },
]

/** The event chain — one detection travelling the whole stack. */
export const AK_EVENT = {
  eyebrow: 'Real-time architecture',
  headline: ['When something happens,', 'intelligence moves.'],
  body: 'An event-driven architecture means signals don\'t wait — a single detection propagates through the stack into a governed enterprise action.',
  steps: [
    'Camera detects anomaly', 'Edge inference', 'Event created', 'Event bus', 'Context enrichment',
    'AI reasoning', 'Policy check', 'Workflow triggered', 'Enterprise action', 'Result observed',
  ],
} as const

/** Deployment and connection — the two "it fits your environment" sections. */
export const AK_ENVIRONMENTS = {
  eyebrow: 'Deployment flexibility',
  headline: ['One architecture.', 'Multiple environments.'],
  body: 'SVARA\'s architecture is designed to support intelligence across distributed enterprise environments — from edge deployments to hybrid and multi-location estates.',
  targets: ['Edge', 'On-Premise', 'Private Cloud', 'Public Cloud', 'Hybrid', 'Multi-Location'],
} as const

export const AK_CONNECT = {
  eyebrow: 'Built to connect',
  headline: ['Intelligence', 'without silos.'],
  body: 'SVARA\'s architecture is designed to connect with existing enterprise environments rather than forcing intelligence into isolated tools.',
  surfaces: ['REST APIs', 'Webhooks', 'Event Streams', 'DB Connectors', 'Enterprise Systems', 'IoT Protocols', 'Model Endpoints', 'App Services'],
  enterprise: ['ERP', 'CRM', 'Databases', 'Legacy Systems'],
  svara: ['Intelligence Services', 'Agents', 'Digital Twins', 'One AI OS'],
} as const

export const AK_SCALE = {
  eyebrow: 'Architected to scale',
  headline: ['From one system', 'to an intelligence network.'],
  body: 'Edge nodes, data systems, AI services, agents and applications scale horizontally — the same architecture expands from a single device to a distributed network.',
  stages: [
    { n: '01', label: 'One Device', dots: 1 },
    { n: '02', label: 'One Site', dots: 4 },
    { n: '03', label: 'Multiple Sites', dots: 9 },
    { n: '04', label: 'Enterprise', dots: 16 },
    { n: '05', label: 'Distributed Network', dots: 25 },
  ],
} as const

export const AK_REFERENCE = {
  eyebrow: 'SVARA reference architecture',
  headline: ['The complete', 'intelligence stack.'],
  body: 'Every layer, assembled into one blueprint — its role, what it takes in, what it gives back, and the products it powers.',
} as const

export const AK_CTA = {
  eyebrow: 'Design for intelligence',
  headline: ['Architect the next', 'intelligent system.'],
  body: 'From edge environments and enterprise data to AI models, agents, simulations and applications, SVARA brings every layer together through one connected architecture.',
  primary: { label: 'Build with SVARA', to: '/contact' },
  secondary: { label: 'Explore the technology', to: '/technology' },
} as const
