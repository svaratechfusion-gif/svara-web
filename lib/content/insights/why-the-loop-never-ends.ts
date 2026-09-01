// TECHNICAL NOTE N4 — part of the SVARA Technical Notes series.
//
// kind: 'note' — the short-form treatment. Series position is NOT stored here: it is
// derived from registry order by seriesNotes(), so writing a fifth note cannot leave
// "N2 of 4" stale in four files at once.
//
// Copy is VERBATIM from the approved draft.
import type { Insight } from './types'

export const whyTheLoopNeverEnds: Insight = {
  slug: 'why-the-loop-never-ends',
  kind: 'note',
  title: 'Why the Loop Never Ends',
  subtitle: 'Intelligence is not a workflow. It is a continuous relationship with reality.',
  seoTitle: 'Why the Loop Never Ends — SVARA Technical Note N4',
  metaDescription:
    'Why is intelligence a continuous system rather than a linear workflow? A SVARA technical note on feedback, adaptation and the difference between automation and continuous intelligence.',
  category: 'Technical Notes',
  contentType: 'Technical Note',
  searchIntent: 'Informational',
  readingTime: '4 minutes',
  published: '2026-09-02',
  primaryKeywords: ['continuous intelligence', 'intelligence loop', 'feedback loop AI'],
  secondaryKeywords: ['automation vs intelligence', 'adaptation', 'observability', 'AI product design'],
  dek: 'Why is intelligence a continuous system rather than a linear workflow?',

  blocks: [
    { kind: 'p', text: 'Most software workflows have an endpoint. A form is submitted. A transaction is completed. A report is generated. The process ends.' },
    { kind: 'p', text: 'Intelligent systems are different because reality does not stop changing.' },
    { kind: 'p', text: 'A machine that was functioning normally can fail tomorrow. A logistics route can change. An energy asset can experience new conditions. A customer can behave differently.' },
    { kind: 'p', text: 'The environment continues. Which means intelligence must continue.' },
    { kind: 'p', text: 'The fundamental architecture is therefore not a line. It is a loop.' },
    { kind: 'flow', steps: ['Observe', 'Understand', 'Contextualise', 'Reason', 'Simulate', 'Decide', 'Act', 'Observe again'] },
    { kind: 'p', text: 'Every action changes the environment. That changed environment creates new signals. Those signals create new information. The intelligence system begins again.' },
    { kind: 'p', text: 'This is the difference between automation and continuous intelligence.' },
    { kind: 'p', text: 'Automation executes a predefined sequence. Continuous intelligence operates within a changing environment.' },
    { kind: 'statement', text: 'The outcome is not the end of the system. It is new input.' },
    { kind: 'p', text: 'This has important implications for how intelligent products are designed.' },
    { kind: 'p', text: 'A product cannot only focus on what decision to make. It must also consider what happens after the decision.' },
    { kind: 'ul', items: [
      'Did the action work?', 'Did the environment change as expected?',
      'Did an unexpected consequence emerge?', 'Does the model need new context?',
      'Should the next decision be different?',
    ] },
    { kind: 'p', text: 'The loop never ends because reality never becomes static.' },
  ],

  closing: {
    heading: '',
    paragraphs: [
      'An intelligent system is not defined by a single decision. It is defined by its ability to continuously adapt its understanding.',
    ],
  },

  cta: {
    headline: 'THE OUTCOME IS NOT THE END. IT IS NEW INPUT.',
    body: 'The Intelligence Loop — the framework behind autonomous intelligence.',
    links: [
      { label: 'The Intelligence Loop', to: '/insights/the-intelligence-loop' },
      { label: 'AI OS', to: '/products/ai-os' },
      { label: 'The SVARA Ecosystem', to: '/ecosystem' },
    ],
  },
  related: [
    { label: 'AI OS', to: '/products/ai-os' },
    { label: 'AI Agents', to: '/products/ai-agents' },
  ],
}
