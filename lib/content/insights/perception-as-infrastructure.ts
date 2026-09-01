// TECHNICAL NOTE N1 — part of the SVARA Technical Notes series.
//
// kind: 'note' — the short-form treatment. Series position is NOT stored here: it is
// derived from registry order by seriesNotes(), so writing a fifth note cannot leave
// "N2 of 4" stale in four files at once.
//
// Copy is VERBATIM from the approved draft.
import type { Insight } from './types'

export const perceptionAsInfrastructure: Insight = {
  slug: 'perception-as-infrastructure',
  kind: 'note',
  title: 'Perception as Infrastructure',
  subtitle: 'Seeing is no longer a feature. It is becoming part of the operating environment.',
  seoTitle: 'Perception as Infrastructure — SVARA Technical Note N1',
  metaDescription:
    'What happens when perception becomes a foundational layer of the enterprise? A SVARA technical note on computer vision, sensors and edge AI as operating infrastructure.',
  category: 'Technical Notes',
  contentType: 'Technical Note',
  searchIntent: 'Informational',
  readingTime: '4 minutes',
  published: '2026-09-02',
  primaryKeywords: ['perception as infrastructure', 'computer vision infrastructure', 'enterprise perception layer'],
  secondaryKeywords: ['edge AI', 'sensors', 'multimodal intelligence', 'operational intelligence'],
  dek: 'What happens when perception becomes a foundational layer of the enterprise?',

  blocks: [
    { kind: 'p', text: 'For decades, digital infrastructure was primarily designed to store, transmit and process information.' },
    { kind: 'p', text: 'Networks connected systems. Databases stored records. Applications provided interfaces. Cloud infrastructure provided compute.' },
    { kind: 'p', text: 'But much of the physical world remained outside the intelligence architecture.' },
    { kind: 'p', text: 'Machines operated. People moved. Assets changed state. Infrastructure degraded. Events occurred.' },
    { kind: 'p', text: 'The organisation often learned about those changes only after information was manually entered into a system.' },
    { kind: 'p', text: 'That model is changing.' },
    { kind: 'p', text: 'With computer vision, sensors, edge AI and multimodal intelligence, systems can increasingly observe operational environments directly.' },
    { kind: 'statement', text: 'Perception is becoming infrastructure.' },
    { kind: 'p', text: 'The shift is from systems that store what happened, to systems that can observe what is happening.' },
    { kind: 'p', text: 'A camera is no longer only a recording device. A sensor is no longer only a measurement device. A drone is no longer only a remote observation platform.' },
    { kind: 'p', text: 'When connected to intelligence, these become inputs into a continuously operating perception layer.' },
    { kind: 'p', text: 'The strategic implication is significant. Once perception becomes infrastructure, every relevant event can potentially become an intelligence event.' },
    { kind: 'p', text: 'But perception alone is not enough. Seeing something does not mean understanding it.' },
    { kind: 'p', text: 'The perception layer must connect to context. Context connects to reasoning. Reasoning connects to action.' },
    { kind: 'p', text: 'This is why perception should not be treated as a standalone feature. It is the beginning of the intelligence architecture.' },
  ],

  closing: {
    heading: '',
    paragraphs: [
      'Infrastructure traditionally moved data. Intelligent infrastructure begins by understanding reality.',
    ],
  },

  cta: {
    headline: 'PERCEPTION IS THE FIRST LAYER.',
    body: 'Explore the products that turn observation into operational intelligence.',
    links: [
      { label: 'Vision AI', to: '/products/vision-ai' },
      { label: 'Edge AI', to: '/products/edge-ai' },
      { label: 'Drone AI', to: '/products/drone-ai' },
    ],
  },
  related: [
    { label: 'Vision AI', to: '/products/vision-ai' },
    { label: 'Edge AI', to: '/products/edge-ai' },
  ],
}
