// TECHNICAL NOTE N3 — part of the SVARA Technical Notes series.
//
// kind: 'note' — the short-form treatment. Series position is NOT stored here: it is
// derived from registry order by seriesNotes(), so writing a fifth note cannot leave
// "N2 of 4" stale in four files at once.
//
// Copy is VERBATIM from the approved draft.
import type { Insight } from './types'

export const simulationBeforeAction: Insight = {
  slug: 'simulation-before-action',
  kind: 'note',
  title: 'Simulation Before Action',
  subtitle: 'The most intelligent action may be the one tested before it reaches reality.',
  seoTitle: 'Simulation Before Action — SVARA Technical Note N3',
  metaDescription:
    'Why should intelligent systems test possibilities before acting in reality? A SVARA technical note on simulation, digital twins and proportional autonomy.',
  category: 'Technical Notes',
  contentType: 'Technical Note',
  searchIntent: 'Informational',
  readingTime: '4 minutes',
  published: '2026-09-02',
  primaryKeywords: ['simulation before action', 'AI simulation', 'decision intelligence'],
  secondaryKeywords: ['digital twins', 'scenario modelling', 'controlled autonomy', 'AI agents'],
  dek: 'Why should intelligent systems test possibilities before acting in reality?',

  blocks: [
    { kind: 'p', text: 'Traditional automation follows a relatively direct path.' },
    { kind: 'flow', steps: ['Input', 'Rule', 'Action'] },
    { kind: 'p', text: 'AI systems introduce greater adaptability. But greater adaptability also creates greater uncertainty.' },
    { kind: 'p', text: 'When an intelligent system can evaluate multiple actions, the question becomes: how should it decide which action is worth taking?' },
    { kind: 'p', text: 'One answer is simulation.' },
    { kind: 'p', text: 'Before acting in the physical or operational environment, an intelligent system can evaluate possible scenarios within a model of that environment.' },
    { kind: 'p', text: 'This creates a different architecture. Instead of observe, decide, act, the loop becomes:' },
    { kind: 'flow', steps: ['Observe', 'Understand', 'Simulate', 'Compare', 'Decide', 'Act'] },
    { kind: 'p', text: 'A digital twin can provide a contextual environment. Simulation can explore potential outcomes. AI can evaluate those outcomes. Agents can coordinate the selected response.' },
    { kind: 'p', text: 'This does not mean every action requires a complex simulation. That would be unnecessary and inefficient.' },
    { kind: 'p', text: 'The principle is about proportional intelligence.' },
    { kind: 'p', text: 'Low-risk actions may be automated directly. Higher-impact decisions may require:' },
    { kind: 'ul', items: ['additional context;', 'scenario evaluation;', 'simulation;', 'human approval.'] },
    { kind: 'p', text: 'The architecture can therefore adapt autonomy according to consequence.' },
    { kind: 'statement', text: 'The question is not whether AI can act. The question is whether it has sufficiently understood the consequences of acting.' },
    { kind: 'p', text: 'Simulation introduces a layer between intelligence and reality. A place to test. A place to compare. A place to fail without creating the real-world consequence.' },
  ],

  closing: {
    heading: '',
    paragraphs: ['As AI systems become increasingly autonomous, this layer may become essential.'],
  },

  cta: {
    headline: 'TEST THE CONSEQUENCE BEFORE THE CONSEQUENCE IS REAL.',
    body: 'Explore digital twins and simulation as the layer between intelligence and reality.',
    links: [
      { label: 'Digital Twin', to: '/products/digital-twin' },
      { label: 'Simulation', to: '/divisions/simulation' },
      { label: 'What Is a Digital Twin?', to: '/insights/what-is-a-digital-twin' },
    ],
  },
  related: [
    { label: 'Digital Twin', to: '/products/digital-twin' },
    { label: 'Simulation', to: '/divisions/simulation' },
  ],
}
