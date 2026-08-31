// SVARA AI — conversation engine (framework-free). SVARA's intelligent digital
// concierge: intelligent, concise, confident, conversational, never a brochure.
// Session-scoped context enables follow-ups ("it" → last topic). Every reply carries
// contextual suggestion chips. Nothing is invented — unknowns return the no-info reply.
// A real backend can later replace `requestReply` without touching the UI.

export type ChatRole = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  role: ChatRole
  text: string
}

// A chip either sends a prompt back into the conversation, or navigates (`to`).
export interface Suggestion {
  label: string
  prompt?: string
  to?: string
}

export type Topic =
  | 'products' | 'vision' | 'drone' | 'agents' | 'twins' | 'edge'
  | 'technology' | 'ai' | 'enterprise' | 'industry' | 'contact' | 'investor'
  | null

export interface Reply {
  text: string
  suggestions: Suggestion[]
  topic: Topic
}

export interface ChatContext {
  lastTopic: Topic
}

// ── welcome ─────────────────────────────────────────────────────────────────
export const WELCOME_LINES: readonly string[] = [
  "Hello. I'm SVARA AI.",
  "Your interface to SVARA intelligence.",
  "I can help you explore SVARA's products, technology, solutions, industries and capabilities.",
]

const s = (label: string, prompt: string): Suggestion => ({ label, prompt })
const nav = (label: string, to: string): Suggestion => ({ label, to })

export const WELCOME_SUGGESTIONS: readonly Suggestion[] = [
  s('Explore Products', 'What products does SVARA have?'),
  s('Explore Technology', 'What technology does SVARA use?'),
  s('Explore AI Systems', 'What AI systems does SVARA build?'),
  s('Enterprise Solutions', 'What enterprise solutions does SVARA offer?'),
  s('Talk to SVARA', 'I want to talk to someone.'),
]

// ── topic scripts ─────────────────────────────────────────────────────────────
const TOPICS: Record<string, Reply> = {
  products: {
    topic: 'products',
    text:
`SVARA's product stack is built around connected intelligence. The core areas:

• Vision AI — real-time visual intelligence and video analytics.
• Drone AI — autonomous aerial intelligence and response.
• AI Agents — reasoning, planning and autonomous workflow execution.
• Digital Twins — simulation and operational modeling.
• Edge AI — intelligence deployed closer to cameras, machines and sensors.
• Business Cloud — enterprise intelligence infrastructure.

These are designed to work together as one connected architecture. Would you like to explore a specific product?`,
    suggestions: [s('Vision AI', 'What is Vision AI?'), s('Drone AI', 'What is Drone AI?'), s('AI Agents', 'What are AI Agents?'), s('Digital Twin', 'What is a Digital Twin?')],
  },

  vision: {
    topic: 'vision',
    text:
`Vision AI gives machines the ability to interpret visual information in real time.

It can work with existing camera infrastructure to detect people, objects, zones, events and operational anomalies. Typical applications:

• industrial monitoring
• safety
• security
• quality inspection
• facility intelligence
• real-time alerts

Are you interested in a specific industry or use case?`,
    suggestions: [s('Work with existing cameras?', 'Can it work with existing cameras?'), s('Manufacturing', 'We are a manufacturing company.'), s('Talk to SVARA', 'I want to talk to someone.')],
  },

  drone: {
    topic: 'drone',
    text:
`Drone AI extends SVARA's intelligence layer into autonomous aerial systems. It combines:

• autonomous patrol
• onboard Edge AI
• real-time detection
• intelligent routing
• incident response

The goal is to move from simply collecting aerial footage to detecting and responding to events autonomously. Would you like to see how Drone AI connects with Vision AI?`,
    suggestions: [s('How it connects with Vision AI', 'How does Drone AI connect with Vision AI?'), s('Edge AI', 'What is Edge AI?'), s('Enterprise Solutions', 'What enterprise solutions does SVARA offer?')],
  },

  agents: {
    topic: 'agents',
    text:
`SVARA AI Agents are designed to move beyond conversation into action.

They can reason about objectives, use tools, coordinate workflows and execute multi-step operational tasks.

For example: a system could detect an operational anomaly, analyze the context, determine the likely cause, create a response plan and trigger the appropriate workflow.

Would you like an enterprise example?`,
    suggestions: [s('Enterprise example', 'Can you give an enterprise example?'), s('Explore Products', 'What products does SVARA have?'), s('Technology', 'What technology does SVARA use?')],
  },

  twins: {
    topic: 'twins',
    text:
`A Digital Twin creates a digital representation of a physical system, process or environment. SVARA uses digital twins and simulation to help enterprises:

• model operations
• test scenarios
• evaluate decisions
• predict outcomes
• optimize processes

The advantage is being able to evaluate a change digitally before making it in the physical environment.`,
    suggestions: [s('How it works', 'How does a Digital Twin work?'), s('Manufacturing example', 'Can you give a manufacturing example?'), s('Enterprise use case', 'What is an enterprise use case?')],
  },

  edge: {
    topic: 'edge',
    text:
`Edge AI moves intelligence closer to where data is generated.

Instead of sending every signal to a central cloud, AI processing can happen near cameras, machines, sensors or drones.

This can reduce latency, improve responsiveness and support real-time operational decisions.`,
    suggestions: [s('Vision AI', 'What is Vision AI?'), s('Drone AI', 'What is Drone AI?'), s('Technology', 'What technology does SVARA use?')],
  },

  technology: {
    topic: 'technology',
    text:
`SVARA's technology architecture spans multiple intelligence layers:

• Computer Vision
• Multimodal AI
• AI Agents
• Edge AI
• Digital Twins & Simulation
• Sensor Intelligence
• Enterprise Cloud
• Data and automation infrastructure

The important part isn't any single technology — the architecture connects perception → reasoning → prediction → action.`,
    suggestions: [s('Perception', 'Tell me about perception.'), s('Reasoning', 'Tell me about reasoning and AI Agents.'), s('Simulation', 'What is a Digital Twin?'), s('Autonomy', 'What is Drone AI?')],
  },

  ai: {
    topic: 'ai',
    text:
`SVARA builds AI across the full operational loop — from perception to autonomous action. Key systems:

• Vision AI — real-time visual understanding
• Edge AI — intelligence near the data source
• AI Agents — reasoning, planning and workflow execution
• Digital Twins & Simulation — modeling and prediction

Together they let systems observe, understand, predict and act.`,
    suggestions: [s('Vision AI', 'What is Vision AI?'), s('AI Agents', 'What are AI Agents?'), s('Edge AI', 'What is Edge AI?'), s('Digital Twin', 'What is a Digital Twin?')],
  },

  enterprise: {
    topic: 'enterprise',
    text:
`SVARA's enterprise architecture is designed for environments where physical operations and digital intelligence need to work together. Potential applications:

• manufacturing
• logistics
• energy
• infrastructure
• security
• facilities
• industrial operations

The exact architecture depends on the operational problem. What are you trying to improve — monitoring, automation, prediction, safety or operational efficiency?`,
    suggestions: [s('Manufacturing', 'We are a manufacturing company.'), s('Logistics', 'We work in logistics.'), s('Energy', 'We work in energy.'), s('Talk to SVARA', 'I want to talk to someone.')],
  },

  contact: {
    topic: 'contact',
    text:
`Absolutely — I can route you toward the right SVARA conversation.

What are you interested in?`,
    suggestions: [
      nav('Enterprise Solution', '/contact'),
      nav('Partnership', '/contact'),
      nav('Investment', '/contact'),
      nav('Product Demo', '/contact'),
      nav('General Enquiry', '/contact'),
    ],
  },

  investor: {
    topic: 'investor',
    text:
`SVARA is building an enterprise AI and deep-tech intelligence platform.

For investment-related conversations, the best path is to connect directly with the SVARA team so the latest company and funding information can be shared accurately.`,
    suggestions: [nav('Talk to SVARA', '/contact'), s('Explore Technology', 'What technology does SVARA use?')],
  },

  greeting: {
    topic: null,
    text:
`Hi — I'm SVARA AI, your interface to SVARA's intelligence layer.

What would you like to explore?`,
    suggestions: [...WELCOME_SUGGESTIONS],
  },
}

// ── context-aware follow-ups (resolved against ctx.lastTopic) ─────────────────
const FOLLOWUPS: Record<string, Reply> = {
  vision_cameras: {
    topic: 'vision',
    text:
`Yes — Vision AI is designed to layer onto existing camera infrastructure rather than requiring a full hardware replacement.

From there it can detect people, objects, zones, events and anomalies in real time, and raise alerts when something matters.`,
    suggestions: [s('Manufacturing', 'We are a manufacturing company.'), s('Safety use case', 'How is Vision AI used for safety?'), nav('Talk to SVARA', '/contact')],
  },
  drone_vision: {
    topic: 'drone',
    text:
`Drone AI and Vision AI share the same perception layer.

Vision AI provides the visual understanding; Drone AI carries that intelligence into autonomous aerial operations — so a drone can detect an event in flight and act on it, not just record it.`,
    suggestions: [s('Edge AI', 'What is Edge AI?'), s('Enterprise example', 'Can you give an enterprise example?'), nav('Talk to SVARA', '/contact')],
  },
  agents_example: {
    topic: 'agents',
    text:
`Here's an enterprise example.

A production line develops a recurring fault. An AI Agent detects the anomaly from Vision AI, correlates it with sensor and Edge AI data, identifies the likely cause, drafts a corrective workflow and routes it to the right team for approval — closing the loop from detection to action.`,
    suggestions: [s('Digital Twins', 'What is a Digital Twin?'), s('Enterprise Solutions', 'What enterprise solutions does SVARA offer?'), nav('Talk to SVARA', '/contact')],
  },
  twins_manufacturing: {
    topic: 'twins',
    text:
`For manufacturing, a Digital Twin could model a production line — its machines, flow and constraints.

You could then test changes virtually: adjust throughput, simulate a new layout, or predict where bottlenecks and failures are likely — before making any change on the real floor.`,
    suggestions: [s('How it works', 'How does a Digital Twin work?'), s('Vision AI', 'What is Vision AI?'), nav('Talk to SVARA', '/contact')],
  },
  twins_how: {
    topic: 'twins',
    text:
`A Digital Twin works by mirroring a physical system with live and historical data.

That model stays in sync with the real environment, so you can run simulations against it, evaluate decisions and predict outcomes without touching the physical system.`,
    suggestions: [s('Manufacturing example', 'Can you give a manufacturing example?'), s('Enterprise use case', 'What is an enterprise use case?'), nav('Talk to SVARA', '/contact')],
  },
  twins_enterprise: {
    topic: 'twins',
    text:
`At enterprise scale, Digital Twins let you evaluate operational decisions before committing to them.

Teams can model processes, test "what-if" scenarios, predict outcomes and optimize — reducing the risk and cost of changing the physical environment directly.`,
    suggestions: [s('Manufacturing example', 'Can you give a manufacturing example?'), s('AI Agents', 'What are AI Agents?'), nav('Talk to SVARA', '/contact')],
  },
}

const FALLBACK: Reply = {
  topic: null,
  text:
`I don't have enough verified information to answer that accurately.

I can help you with:

• Products
• Technology
• Enterprise Solutions
• Industries
• Contacting SVARA`,
  suggestions: [s('Products', 'What products does SVARA have?'), s('Technology', 'What technology does SVARA use?'), s('Enterprise Solutions', 'What enterprise solutions does SVARA offer?'), nav('Talk to SVARA', '/contact')],
}

function industry(name: string): Reply {
  return {
    topic: 'industry',
    text:
`${name} is a strong fit for SVARA's connected intelligence approach.

Depending on your operation, we could combine:

• Vision AI for visual monitoring and inspection
• Edge AI for low-latency machine intelligence
• AI Agents for operational workflows
• Digital Twins for simulation and optimization

If you tell me what you're trying to improve, I can help map the right SVARA capabilities to it.`,
    suggestions: [s('Vision AI', 'What is Vision AI?'), s('Digital Twin', 'What is a Digital Twin?'), nav('Talk to SVARA', '/contact')],
  }
}

const has = (q: string, ...keys: string[]): boolean => keys.some((k) => q.includes(k))

/** Resolve a reply from the user input + current session context. */
export function respond(input: string, ctx: ChatContext): Reply {
  const q = ` ${input.toLowerCase().trim()} `
  const t = ctx.lastTopic

  // 1) context-aware follow-ups (only meaningful with a prior topic)
  if (t === 'vision' && has(q, 'camera', 'existing', 'integrat')) return FOLLOWUPS.vision_cameras!
  if (t === 'drone' && has(q, 'vision', 'connect', ' how ')) return FOLLOWUPS.drone_vision!
  if (t === 'agents' && has(q, 'example', 'enterprise')) return FOLLOWUPS.agents_example!
  if (t === 'twins' && has(q, 'manufactur', 'factory', 'production')) return FOLLOWUPS.twins_manufacturing!
  if (t === 'twins' && has(q, 'how it works', 'how does', ' how ')) return FOLLOWUPS.twins_how!
  if (t === 'twins' && has(q, 'enterprise', 'use case')) return FOLLOWUPS.twins_enterprise!

  // 2) explicit topics (specific product terms before generic industry terms)
  if (has(q, 'vision')) return TOPICS.vision!
  if (has(q, 'drone', 'aerial')) return TOPICS.drone!
  if (has(q, 'agent')) return TOPICS.agents!
  if (has(q, 'digital twin', 'twin', 'simulation')) return TOPICS.twins!
  if (has(q, 'edge')) return TOPICS.edge!
  if (has(q, 'product')) return TOPICS.products!
  if (has(q, 'ai system', 'artificial intelligence', 'reasoning', 'perception')) return TOPICS.ai!
  if (has(q, 'technolog', 'architecture', 'tech stack', 'stack')) return TOPICS.technology!
  if (has(q, 'enterprise', 'solution')) return TOPICS.enterprise!

  // 3) industries
  if (has(q, 'manufactur', 'factory', 'production line')) return industry('Manufacturing')
  if (has(q, 'logistic', 'supply chain', 'warehouse')) return industry('Logistics')
  if (has(q, 'energy', 'grid', 'utilit', 'power plant')) return industry('Energy')

  // 4) intent: contact / investor / greeting
  if (has(q, 'invest', 'funding', 'valuation', 'raise', 'investor')) return TOPICS.investor!
  if (has(q, 'contact', 'talk to', 'speak', 'sales', 'demo', 'get in touch', 'reach', 'someone')) return TOPICS.contact!
  if (input.trim().length <= 12 && has(q, 'hi ', 'hey ', 'hello', 'yo ')) return TOPICS.greeting!

  // 5) no hallucination
  return FALLBACK
}

/**
 * Request an assistant reply. TODO(backend): swap the body for a real call
 * (e.g. `$fetch('/api/chat', { method:'POST', body:{ text, context } })`); the
 * caller (useSvaraChat) is unaffected.
 */
export async function requestReply(text: string, ctx: ChatContext): Promise<Reply> {
  await new Promise((resolve) => setTimeout(resolve, 450 + Math.random() * 400))
  return respond(text, ctx)
}
