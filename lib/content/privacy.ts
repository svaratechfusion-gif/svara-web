/**
 * SVARA PRIVACY POLICY — the full published text.
 *
 * Supplied copy, reproduced VERBATIM. A privacy policy is something a visitor or
 * a regulator may need to rely on, so nothing is paraphrased, shortened or
 * reordered. Two deliberate editorial decisions:
 *
 *  1. The draft carried "Last Updated: [Insert Date]". A bracketed placeholder
 *     must never publish. `updated` below is a real date; change it when the
 *     policy changes.
 *  2. Sections 10 and 15 direct the reader to "the contact channels available on
 *     the SVARA website" — so the page links to /contact rather than naming an
 *     address, since the email in lib/content/contact.ts is still a placeholder.
 *
 * This file previously exported `privacyContent`, a four-bullet SUMMARY rendered
 * through KnowledgeProductLayout (whose headings read "Architecture" / "Use
 * Cases" / "ROI"). That is replaced by the real document. The three FAQs from
 * that version are carried over so the page keeps its FAQPage schema; the
 * security answer was aligned to Section 7 rather than continuing to assert
 * practices the policy itself does not state.
 */
import type { LegalDocument } from '../types/legal'
import { GOVERNING_LAW, GOVERNING_FORUM } from './legal-jurisdiction'

export const PRIVACY_POLICY_UPDATED = '2026-08-31'

export const privacyPolicy: LegalDocument = {
  title: 'Privacy Policy',
  updated: PRIVACY_POLICY_UPDATED,
  version: '1.0',
  summary:
    'SVARA’s Privacy Policy explains how SVARA collects, uses, stores, shares and otherwise processes personal information across its website, products, platforms and services — including the legal bases for processing, international transfers, retention, and the rights available to individuals.',
  // No preamble: unlike the Cookie Policy, this document opens directly at
  // "1. Introduction", and that section already carries this line. Repeating it
  // above the contents would print the same sentence twice.
  intro: [],
  sections: [
    {
      n: '1',
      title: 'Introduction',
      blocks: [
        {
          body: [
            'At SVARA, privacy is an important part of how we design technology, build digital experiences and interact with the people and organisations we serve.',
            'This Privacy Policy explains how SVARA may collect, use, store, share and otherwise process personal information when you:',
          ],
          items: [
            'visit our website;',
            'contact us or submit an enquiry;',
            'interact with our products, platforms or services;',
            'subscribe to communications or updates;',
            'participate in events, demonstrations or other activities; or',
            'otherwise interact with SVARA.',
          ],
        },
        {
          body: [
            'This Privacy Policy should be read together with our Cookie Policy and any additional privacy notices provided in connection with specific products, services or interactions.',
          ],
        },
      ],
    },
    {
      n: '2',
      title: 'Information we may collect',
      blocks: [
        {
          body: [
            'Depending on how you interact with SVARA, we may collect information directly from you, automatically through your use of our digital platforms, or from other legitimate sources.',
          ],
        },
        {
          heading: 'Information you provide directly',
          body: ['This may include:'],
          items: [
            'name;',
            'business or organisation name;',
            'job title;',
            'email address;',
            'telephone number;',
            'country or general location;',
            'information included in messages or enquiries;',
            'product or service interests;',
            'information submitted through forms, registrations or other interactions.',
          ],
        },
        {
          heading: 'Information collected automatically',
          body: [
            'When you visit our website or use certain digital services, we may automatically collect technical and usage information, including:',
          ],
          items: [
            'IP address;',
            'browser type and version;',
            'device information;',
            'operating system;',
            'pages or features accessed;',
            'referring and exit pages;',
            'approximate location derived from technical information;',
            'date, time and duration of interactions;',
            'website navigation and interaction data;',
            'performance, diagnostic and error information.',
          ],
        },
        {
          heading: 'Information from other sources',
          body: ['Where permitted by applicable law, we may receive information from:'],
          items: [
            'business partners;',
            'service providers;',
            'publicly available sources;',
            'event or registration partners;',
            'professional or organisational networks; and',
            'other sources that you have authorised to share information with us.',
          ],
        },
      ],
    },
    {
      n: '3',
      title: 'How we use personal information',
      blocks: [
        { body: ['SVARA may use personal information for the following purposes:'] },
        {
          heading: 'To operate and provide our services',
          body: [
            'We may use information to operate our website, respond to requests, provide information, deliver products and services, and support our business relationships.',
          ],
        },
        {
          heading: 'To respond to enquiries',
          body: [
            'If you contact SVARA, we may use the information you provide to communicate with you, understand your requirements and respond to your request.',
          ],
        },
        {
          heading: 'To improve our technology and digital experiences',
          body: [
            'We may analyse how our website, platforms and services are used to improve performance, functionality, design and user experience.',
          ],
        },
        {
          heading: 'To personalise relevant experiences',
          body: [
            'Where permitted, we may use information to better understand interests, preferences and interactions so that we can provide more relevant content, communications or experiences.',
          ],
        },
        {
          heading: 'To communicate with you',
          body: ['Subject to applicable law and your preferences, we may send information about:'],
          items: [
            'SVARA products and services;',
            'technology developments;',
            'insights and research;',
            'events and announcements;',
            'business updates; and',
            'other information that may be relevant to you.',
          ],
        },
        { body: ['You may opt out of marketing communications where applicable.'] },
        {
          heading: 'To maintain security',
          body: [
            'We may use information to protect our website, systems, users and organisation against security threats, fraud, misuse and unauthorised access.',
          ],
        },
        {
          heading: 'To comply with legal obligations',
          body: [
            'We may process information where necessary to comply with applicable laws, regulations, legal processes or enforceable governmental requests.',
          ],
        },
      ],
    },
    {
      n: '4',
      title: 'Legal basis for processing',
      blocks: [
        {
          body: [
            'Where applicable data protection laws require us to identify a legal basis for processing personal information, SVARA may process information based on:',
          ],
          items: [
            'your consent;',
            'the performance of a contract or steps taken at your request before entering into a contract;',
            'compliance with legal obligations;',
            'legitimate interests, including operating, protecting and improving our business, services and technology; or',
            'another lawful basis permitted under applicable law.',
          ],
        },
        {
          body: [
            'Where processing is based on consent, you may withdraw your consent at any time, subject to applicable legal requirements.',
          ],
        },
      ],
    },
    {
      n: '5',
      title: 'How we may share information',
      blocks: [
        {
          body: ['SVARA may share personal information where necessary and appropriate with:'],
          items: [
            'companies and entities within the SVARA ecosystem;',
            'technology, cloud and infrastructure providers;',
            'professional advisers;',
            'analytics and service providers;',
            'business partners where relevant to a requested service or interaction;',
            'government authorities or other parties where required by law; and',
            'other third parties where you have provided consent or where sharing is otherwise permitted by applicable law.',
          ],
        },
        {
          body: [
            'We do not share personal information for purposes unrelated to those described in this Privacy Policy without an appropriate legal basis or your consent where required.',
          ],
        },
      ],
    },
    {
      n: '6',
      title: 'AI and intelligent technologies',
      blocks: [
        {
          body: [
            'SVARA develops and operates technologies involving artificial intelligence, automation, data intelligence and connected digital systems.',
            'Depending on the product, platform or service involved, information may be processed using automated systems to support functions such as:',
          ],
          items: [
            'data analysis;',
            'pattern recognition;',
            'automation;',
            'forecasting;',
            'recommendations;',
            'natural language interaction;',
            'system optimisation; and',
            'operational intelligence.',
          ],
        },
        {
          body: [
            'The specific processing activities associated with a SVARA product or service may be governed by additional product-specific terms, privacy notices or agreements.',
            'SVARA does not intend for automated systems to make decisions that produce legal or similarly significant effects concerning an individual without appropriate safeguards where required by applicable law.',
          ],
        },
      ],
    },
    {
      n: '7',
      title: 'Data security',
      blocks: [
        {
          body: [
            'We take appropriate technical, organisational and administrative measures designed to protect personal information against:',
          ],
          items: [
            'unauthorised access;',
            'unlawful processing;',
            'accidental loss;',
            'misuse;',
            'alteration;',
            'disclosure; and',
            'destruction.',
          ],
        },
        {
          body: [
            'Security measures may include access controls, authentication, encryption where appropriate, monitoring and other security practices.',
            'However, no internet-based system or method of electronic storage can be guaranteed to be completely secure. While we work to protect information, we cannot guarantee absolute security.',
          ],
        },
      ],
    },
    {
      n: '8',
      title: 'Data retention',
      blocks: [
        {
          body: [
            'SVARA retains personal information only for as long as reasonably necessary for the purposes for which it was collected, including:',
          ],
          items: [
            'providing products or services;',
            'responding to enquiries;',
            'maintaining business and operational records;',
            'complying with legal obligations;',
            'resolving disputes; and',
            'enforcing agreements.',
          ],
        },
        {
          body: [
            'The appropriate retention period may vary depending on the nature of the information, the purpose of processing and applicable legal requirements.',
            'When information is no longer required, we may delete, anonymise or securely dispose of it in accordance with applicable policies and legal obligations.',
          ],
        },
      ],
    },
    {
      n: '9',
      title: 'International data transfers',
      blocks: [
        {
          body: [
            'SVARA may operate, collaborate with service providers or process information across multiple geographic locations.',
            'As a result, personal information may be transferred to, stored in or processed in countries other than the country in which you are located.',
            'Where required by applicable law, we will take appropriate measures to support lawful international data transfers and protect personal information.',
          ],
        },
      ],
    },
    {
      n: '10',
      title: 'Your privacy rights',
      blocks: [
        {
          body: [
            'Depending on your location and applicable law, you may have rights relating to your personal information, including the right to:',
          ],
          items: [
            'request access to personal information we hold about you;',
            'request correction of inaccurate or incomplete information;',
            'request deletion of personal information;',
            'request restriction of certain processing;',
            'object to certain processing;',
            'withdraw consent where processing is based on consent;',
            'request portability of certain information; and',
            'opt out of certain marketing communications.',
          ],
        },
        {
          body: [
            'The availability and scope of these rights may vary depending on applicable law.',
            'To exercise applicable rights, you may contact SVARA using the contact information available on our website.',
            'We may need to verify your identity before responding to certain requests.',
          ],
        },
      ],
    },
    {
      n: '11',
      title: 'Marketing communications',
      blocks: [
        {
          body: [
            'Where permitted by applicable law, SVARA may send marketing, product, technology or business communications.',
            'You can opt out of marketing communications at any time by:',
          ],
          items: [
            'using the unsubscribe option included in relevant communications; or',
            'contacting us through the contact channels available on the SVARA website.',
          ],
        },
        {
          body: [
            'Please note that opting out of marketing communications may not prevent us from sending important service, security, transactional or administrative communications.',
          ],
        },
      ],
    },
    {
      n: '12',
      title: 'Third-party services and links',
      blocks: [
        {
          body: [
            'Our website, platforms or communications may include links to third-party websites, services or platforms.',
            'SVARA is not responsible for the privacy practices, content or security of third-party services that we do not control.',
            'We encourage you to review the privacy policies of third-party services before providing them with personal information.',
          ],
        },
      ],
    },
    {
      n: '13',
      title: 'Children’s privacy',
      blocks: [
        {
          body: [
            'SVARA’s website, products and services are not intended for individuals where parental or guardian consent is required under applicable law, unless a specific service is expressly designed for that audience.',
            'We do not knowingly collect personal information from children in violation of applicable law.',
            'If you believe that personal information relating to a child has been provided to us inappropriately, please contact us so that we can take appropriate action.',
          ],
        },
      ],
    },
    {
      n: '14',
      title: 'Changes to this Privacy Policy',
      blocks: [
        {
          body: ['We may update this Privacy Policy from time to time to reflect changes in:'],
          items: [
            'our products and services;',
            'technology;',
            'business operations;',
            'legal or regulatory requirements; or',
            'privacy practices.',
          ],
        },
        {
          body: [
            'When changes are made, we will update the Last Updated date at the top of this Privacy Policy.',
            'Where required by applicable law, we may provide additional notice or seek consent for material changes.',
            'We encourage you to review this Privacy Policy periodically.',
          ],
        },
      ],
    },
    {
      n: '15',
      title: 'Contact us',
      blocks: [
        {
          body: [
            'If you have questions, concerns or requests relating to this Privacy Policy or the way SVARA processes personal information, please contact us through the contact channels provided on the SVARA website.',
          ],
        },
      ],
    },
  ],
  faqs: [
    { question: 'What personal data does SVARA collect?', answer: 'SVARA collects name, business or organisation name, job title, email address, telephone number, country or general location, and information included in your messages or enquiries, together with technical and usage information collected automatically when you use our digital platforms. Enterprise customer data processed through the platform is subject to separate data processing agreements.' },
    { question: 'How does SVARA protect personal data?', answer: 'SVARA takes appropriate technical, organisational and administrative measures designed to protect personal information against unauthorised access, unlawful processing, accidental loss, misuse, alteration, disclosure and destruction. These may include access controls, authentication, encryption where appropriate and monitoring. No internet-based system can be guaranteed to be completely secure.' },
    { question: 'What are my data rights?', answer: 'Depending on your location and applicable law, you may have rights to access, correct, delete, restrict or port your personal data, to object to certain processing, to withdraw consent where processing is based on consent, and to opt out of certain marketing communications. The availability and scope of these rights varies by jurisdiction.' },
  ],
  governingLaw: {
    heading: 'Governing law',
    body: [
      `This policy, and any dispute or claim arising out of or in connection with it, is governed by and construed in accordance with ${GOVERNING_LAW}, without regard to conflict of law principles.`,
      `Subject to any dispute-resolution process specified in an applicable commercial agreement, ${GOVERNING_FORUM} will have exclusive jurisdiction.`,
      'This does not remove any protection or right available to you under the mandatory law of the country in which you reside.',
    ],
  },
  contact: {
    entity: 'SVARA TechFusion Private Limited',
    email: 'legal@svaratechfusion.com',
    phones: [
      { display: '+91 70938 88269', href: '+917093888269' },
      { display: '+91 70938 88369', href: '+917093888369' },
    ],
    addresses: [
      {
        label: 'Registered address',
        lines: [
          '1-132, Begampet, Rachloor, Kandukur,',
          'Rangareddy, K.V.Rangareddy – 501359,',
          'Telangana, India',
        ],
      },
      {
        label: 'Office address',
        lines: [
          'TNGO Colony Phase 2, Gachibowli,',
          'Hyderabad, Telangana 500032, India',
        ],
      },
    ],
  },
  signoff: 'SVARA — Technology. Intelligence. Transformation.',
  seo: {
    title: 'Privacy Policy — SVARA',
    description:
      'How SVARA collects, uses, stores, shares and protects personal information — legal bases, AI and automated processing, retention, international transfers, and your privacy rights.',
  },
}
