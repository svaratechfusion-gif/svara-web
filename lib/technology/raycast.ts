// TECHNOLOGY PAGE CONTENT for the Raycast component set.
//
// The copy is SVARA's, verbatim from the sections this replaces (TecLayers 01–05 and
// TechnologySection 06–09). Nothing is invented: the five layers, their bodies and
// their technology lists are transcribed, and the four later chapters keep their
// headlines and bodies exactly as written.
//
// What changes is the SHAPE the content is poured into — the design's own components:
// a six-tile icon timeline, a three-column feature grid, a command-window mockup, a
// dense tile grid, and a monospace meta strip.

/** One shape of a line-art glyph: a path, a circle, or a rounded rect. */
export interface RayShape {
  d?: string
  cx?: number, cy?: number, r?: number
  x?: number, y?: number, w?: number, h?: number, rx?: number
}
export type RayGlyph = RayShape[]

export interface RayLayer {
  n: string
  name: string
  headline: [string, string]
  body: string
  techs: string[]
  /** Line-art glyph, 1.5px stroke, no fill — the design's icon language. */
  icon: RayGlyph
}

/** 01–05 — the intelligence layers. */
export const RAY_LAYERS: RayLayer[] = [
  {
    n: '01',
    name: 'Perception',
    headline: ['Intelligence begins', 'with perception.'],
    body: 'SVARA transforms visual streams, sensor signals, machine telemetry and enterprise data into structured, real-time intelligence.',
    techs: ['Computer Vision', 'Multimodal Perception', 'Sensor Fusion', 'Video Intelligence', 'Drone Perception', 'Edge Inference'],
    icon: [{ cx: 12, cy: 12, r: 3.2 }, { d: 'M2.5 12S5.8 5.5 12 5.5 21.5 12 21.5 12 18.2 18.5 12 18.5 2.5 12 2.5 12Z' }],
  },
  {
    n: '02',
    name: 'Intelligence',
    headline: ['From data', 'to context.'],
    body: 'AI becomes useful when raw signals become contextual understanding — SVARA combines models, enterprise knowledge and real-time data into a continuously evolving intelligence layer.',
    techs: ['Foundation Models', 'Multimodal AI', 'Enterprise Knowledge', 'Context Engines', 'Vector Intelligence', 'Real-Time Data'],
    icon: [{ d: 'M12 3.5 20 8v8l-8 4.5L4 16V8Z' }, { d: 'M12 12.2 20 8M12 12.2v8.3M12 12.2 4 8' }],
  },
  {
    n: '03',
    name: 'Cognition',
    headline: ['Intelligence', 'that can reason.'],
    body: 'SVARA\'s cognitive systems interpret context, decompose complex objectives, plan multi-step actions and coordinate specialized AI agents across enterprise environments.',
    techs: ['AI Agents', 'Multi-Agent Systems', 'Planning', 'Tool Use', 'Reasoning', 'Memory'],
    icon: [{ cx: 7, cy: 7, r: 2.4 }, { cx: 17, cy: 7, r: 2.4 }, { cx: 12, cy: 17, r: 2.4 }, { d: 'M8.6 8.8 11 14.9M15.4 8.8 13 14.9M9.4 7h5.2' }],
  },
  {
    n: '04',
    name: 'Simulation',
    headline: ['See what', 'happens next.'],
    body: 'Digital twins and simulation systems let enterprises model environments, test scenarios and predict operational outcomes before decisions affect the real world.',
    techs: ['Digital Twins', 'Simulation', 'Predictive Models', 'Scenario Analysis', 'Forecasting', 'Synthetic Environments'],
    icon: [{ d: 'M3.5 16.5 8 10l3.4 4.2L15 8.4l5.5 8.1Z' }, { cx: 17.4, cy: 5.8, r: 1.8 }],
  },
  {
    n: '05',
    name: 'Autonomy',
    headline: ['From decision', 'to action.'],
    body: 'SVARA connects intelligence to enterprise workflows, machines and autonomous systems — moving decisions beyond dashboards and into real operations.',
    techs: ['Autonomous Agents', 'Workflow Automation', 'Robotics Integration', 'Drone Autonomy', 'Enterprise Actions', 'Control Systems'],
    icon: [{ d: 'M13.2 2.8 4.6 13.4h5.6l-1 7.8 8.6-10.6h-5.6Z' }],
  },
]

/** The sixth tile on the timeline — 08 Trusted by Design, which is a layer concern
 *  running through all five rather than a step after them. */
export const RAY_TRUST = {
  n: '08',
  name: 'Trust',
  icon: [{ d: 'M12 3.2 20 6.2v5.3c0 4.4-3.2 7.8-8 9.3-4.8-1.5-8-4.9-8-9.3V6.2Z' }, { d: 'm8.8 12 2.4 2.4 4.2-4.6' }],
}

/** The opening statement — one strong typographic beat, as the design prescribes. */
export const RAY_STATEMENT = {
  eyebrow: 'Technology',
  headline: 'Our technology stack is built for intelligence.',
  body: 'Designed to sense, reason and act across every enterprise. SVARA combines Vision AI, Autonomous AI Agents, Digital Twins, Edge AI, Business Cloud, Digital Engineering and Growth Intelligence into one integrated technology fabric.',
} as const

/** 06–09 — the architecture chapters, as feature cards. */
export const RAY_FEATURES = [
  {
    n: '06',
    title: 'Intelligence where it needs to happen',
    body: 'SVARA distributes intelligence across edge devices, enterprise infrastructure and cloud environments — balancing speed, privacy, resilience and computational scale.',
    meta: ['Edge', 'Enterprise', 'Cloud'],
    icon: [{ x: 3, y: 3.5, w: 7, h: 7, rx: 1.6 }, { x: 14, y: 3.5, w: 7, h: 7, rx: 1.6 }, { x: 8.5, y: 13.5, w: 7, h: 7, rx: 1.6 }, { d: 'M6.5 10.5v1.6h11v-1.6M12 12.1v1.4' }],
  },
  {
    n: '07',
    title: 'From model to production',
    body: 'SVARA technology is continuously engineered — models are versioned, optimized for the edge, evaluated, deployed, monitored for drift and improved.',
    meta: ['Versioned', 'Evaluated', 'Monitored'],
    icon: [{ d: 'M4 17.5V6.5M4 6.5h11.5M4 12h8.5M4 17.5h13.5' }, { cx: 18.4, cy: 6.5, r: 1.9 }, { cx: 15.4, cy: 12, r: 1.9 }, { cx: 20.4, cy: 17.5, r: 1.9 }],
  },
  {
    n: '08',
    title: 'Intelligence with control',
    body: 'SVARA is engineered so intelligence stays secure, observable and accountable — with human oversight, governance and data control built into the architecture.',
    meta: ['Secure', 'Observable', 'Accountable'],
    icon: [{ d: 'M12 3.2 20 6.2v5.3c0 4.4-3.2 7.8-8 9.3-4.8-1.5-8-4.9-8-9.3V6.2Z' }, { d: 'm8.8 12 2.4 2.4 4.2-4.6' }],
  },
] as const

/** The command-window mockup: the design's signature "product UI as the hero" block.
 *  Rows are the five layers; the active row is the one place coral appears. */
export const RAY_WINDOW = {
  placeholder: 'Search the SVARA stack…',
  hint: 'One intelligence architecture',
  rows: RAY_LAYERS.map((l, i) => ({
    n: l.n,
    name: l.name,
    detail: l.headline[1].replace(/\.$/, ''),
    active: i === 0,
  })),
  footer: ['Physical and digital inputs resolve — layer by layer — into enterprise and physical action.'],
} as const

/** Every technology in the stack, tagged with the layer it belongs to. */
export const RAY_TILES = RAY_LAYERS.flatMap(l =>
  l.techs.map(t => ({ name: t, category: l.name, n: l.n })),
)

/** The monospace meta strip — the design renders technical metadata this way. */
export const RAY_META = [
  'SVARA Intelligence Stack',
  `${RAY_LAYERS.length} layers`,
  `${RAY_TILES.length} technologies`,
  'Edge · Cloud · Hybrid',
] as const

export const RAY_CTA = {
  title: 'Build intelligence into your operations.',
  body: 'From perception at the edge to reasoning, simulation and autonomous action, SVARA engineers intelligence across the complete enterprise technology stack.',
  primary: { label: 'Build with SVARA', to: '/contact' },
  secondary: { label: 'Explore the ecosystem', to: '/ecosystem' },
} as const
