/**
 * SVARA COOKIE POLICY — the full published text.
 *
 * Supplied copy, reproduced VERBATIM: a policy is something a visitor (or a
 * regulator) may need to rely on, so nothing here is paraphrased, shortened or
 * reordered. Only two editorial changes were made, both deliberate:
 *
 *  1. The supplied draft carried "Last Updated: [Insert Date]". A bracketed
 *     placeholder must never publish — `/dpiit` and `/leadership` were shipping
 *     exactly that kind of note until recently. `updated` below is a real date;
 *     change it when the policy changes.
 *  2. Section 10 says to contact SVARA "through the appropriate contact channel
 *     available on the SVARA website", so it links to /contact rather than
 *     naming an address — the email in lib/content/contact.ts is a placeholder.
 *
 * `version` is stored alongside every consent record, so a later material change
 * can invalidate prior consent and re-prompt.
 */
import type { LegalDocument } from '../types/legal'
import { GOVERNING_LAW, GOVERNING_FORUM } from './legal-jurisdiction'

/**
 * The date the policy last changed.
 *
 * Consent keys on THIS, not on the human-readable label below: a stored consent
 * is invalidated the moment the published document changes, so the thing readers
 * are told to watch ("Last Updated", section 9) and the thing that actually
 * triggers a re-prompt are the same value and cannot drift apart. `label` is
 * display only — changing it alone has no effect on anyone's stored consent.
 */
export const COOKIE_POLICY_UPDATED = '2026-08-31'
export const COOKIE_POLICY_VERSION = COOKIE_POLICY_UPDATED
export const COOKIE_POLICY_LABEL = '1.0'

export const cookiePolicy: LegalDocument = {
  title: 'Cookie Policy',
  updated: COOKIE_POLICY_UPDATED,
  version: COOKIE_POLICY_LABEL,
  summary:
    'SVARA’s Cookie Policy explains how SVARA uses cookies and similar technologies — including pixels, tags and local storage — across its website and digital platforms, what each category of cookie does, what information they collect, and how visitors can review, change or withdraw their preferences at any time.',
  intro: [
    'This Cookie Policy explains how SVARA uses cookies and similar technologies when you visit our website, interact with our digital platforms, or use services that link to this policy.',
    'Cookies help us operate our website, understand how visitors interact with our digital experiences, improve performance, and—in certain cases—deliver more relevant content and communications.',
    'By continuing to use our website, you may consent to the use of cookies as described in this Cookie Policy, subject to your preferences and applicable law.',
  ],
  sections: [
    {
      n: '1',
      title: 'What are cookies?',
      blocks: [
        {
          body: [
            'Cookies are small text files stored on your device when you visit a website.',
            'They allow a website to recognise your device, remember certain information about your visit, and support functions such as:',
          ],
          items: [
            'maintaining website functionality',
            'remembering your preferences',
            'understanding website usage',
            'improving performance',
            'measuring engagement',
            'supporting security',
            'personalising digital experiences',
          ],
        },
        {
          body: [
            'In addition to cookies, we may use similar technologies such as pixels, tags, local storage and other identifiers.',
            'Throughout this policy, we refer to these collectively as “cookies.”',
          ],
        },
      ],
    },
    {
      n: '2',
      title: 'How SVARA uses cookies',
      blocks: [
        {
          body: [
            'SVARA uses cookies to help create a reliable, efficient and continuously improving digital experience.',
            'Depending on how you interact with our website, cookies may be used to:',
          ],
        },
        {
          heading: 'Operate the website',
          body: [
            'Some cookies are necessary for the website to function correctly. They may support navigation, security, session management and other essential functions.',
          ],
        },
        {
          heading: 'Understand website performance',
          body: [
            'We may use analytics technologies to understand how visitors interact with our website, including which pages are visited, how users navigate through the site and how different experiences perform.',
            'This information helps us improve the structure, performance and usability of our digital platforms.',
          ],
        },
        {
          heading: 'Remember preferences',
          body: [
            'Cookies may remember choices you make, such as language preferences, cookie settings or other website configurations.',
          ],
        },
        {
          heading: 'Improve our digital experiences',
          body: [
            'We may analyse aggregated interaction patterns to understand how our website, products, services and content can be improved.',
          ],
        },
        {
          heading: 'Support communications and marketing',
          body: [
            'Where permitted and where you have provided the appropriate consent, cookies may be used to measure campaign performance, understand audience engagement and help deliver more relevant communications.',
          ],
        },
      ],
    },
    {
      n: '3',
      title: 'Types of cookies we may use',
      blocks: [
        {
          heading: 'Strictly Necessary Cookies',
          body: [
            'These cookies are required for the core operation of our website.',
            'They may support:',
          ],
          items: [
            'website navigation',
            'security',
            'fraud prevention',
            'session management',
            'load balancing',
            'cookie preference management',
          ],
        },
        {
          body: [
            'Because these cookies are essential to the operation of certain services, disabling them may affect the functionality of the website.',
          ],
        },
        {
          heading: 'Performance & Analytics Cookies',
          body: [
            'These cookies help us understand how visitors use our website.',
            'They may collect information such as:',
          ],
          items: [
            'pages visited',
            'time spent on pages',
            'navigation patterns',
            'interaction behaviour',
            'device and browser information',
            'approximate geographic region',
            'website performance and error information',
          ],
        },
        {
          body: [
            'The information is generally used to analyse and improve the performance and user experience of SVARA’s digital platforms.',
          ],
        },
        {
          heading: 'Functional Cookies',
          body: [
            'Functional cookies allow the website to remember choices and preferences.',
            'For example, they may help remember:',
          ],
          items: [
            'language preferences',
            'interface settings',
            'previously selected options',
            'other personalised website configurations',
          ],
        },
        {
          body: [
            'These cookies help create a more consistent experience when you return to the website.',
          ],
        },
        {
          heading: 'Marketing & Advertising Cookies',
          body: [
            'Where enabled and permitted, these cookies may be used to understand the effectiveness of marketing activities and communications.',
            'They may help us:',
          ],
          items: [
            'measure campaign performance',
            'understand audience engagement',
            'identify how users arrive at our website',
            'improve digital communications',
            'deliver more relevant content',
          ],
        },
        {
          body: [
            'These cookies may be set by SVARA or by authorised third-party service providers.',
          ],
        },
        {
          heading: 'Cookies SVARA currently sets',
          body: [
            'At present the SVARA website sets a single cookie, and it is strictly necessary:',
          ],
          items: [
            'svara_consent — records your cookie choices, the version of this policy you were shown, and the date you chose. First-party. Persistent, expiring twelve months after the choice is made. It stores no name, no identifier and nothing that identifies you.',
          ],
        },
        {
          body: [
            'No analytics, advertising or third-party tracking technology is currently loaded by this website. The categories described above define what SVARA may use once such technologies are introduced, and each will remain gated behind the preference you set here.',
          ],
        },
      ],
    },
    {
      n: '4',
      title: 'First-party and third-party cookies',
      blocks: [
        {
          body: [
            'Cookies may be placed directly by SVARA or by third-party services that support our website and digital operations.',
          ],
        },
        {
          heading: 'First-party cookies',
          body: [
            'These are cookies set directly by SVARA and are generally used to support website functionality, preferences and analytics.',
          ],
        },
        {
          heading: 'Third-party cookies',
          body: ['Some third-party technologies may be used to support functions such as:'],
          items: [
            'analytics',
            'website performance',
            'embedded content',
            'security',
            'communications',
            'marketing measurement',
          ],
        },
        {
          body: [
            'Third-party providers may process information according to their own privacy and cookie policies.',
            'SVARA does not control all third-party cookies. We recommend reviewing the privacy and cookie policies of relevant third-party providers where applicable.',
          ],
        },
      ],
    },
    {
      n: '5',
      title: 'Information collected through cookies',
      blocks: [
        {
          body: [
            'Depending on the type of cookie and your interaction with the website, cookies may collect information such as:',
          ],
          items: [
            'IP address or approximate location',
            'browser type',
            'device type',
            'operating system',
            'pages visited',
            'referring website',
            'interaction patterns',
            'session information',
            'language preferences',
            'performance and technical information',
          ],
        },
        {
          body: [
            'This information may be used individually or in aggregated form to operate, secure and improve our digital platforms.',
          ],
        },
      ],
    },
    {
      n: '6',
      title: 'Managing your cookie preferences',
      blocks: [
        {
          body: [
            'You can manage your cookie preferences through the cookie consent or preference controls available on our website.',
            'Where available, you may choose to:',
          ],
          items: [
            'accept all cookies',
            'reject non-essential cookies',
            'customise your cookie preferences',
            'withdraw previously provided consent',
          ],
        },
        {
          body: [
            'Your preferences may need to be updated if you access the website using a different browser or device.',
          ],
        },
      ],
    },
    {
      n: '7',
      title: 'Browser controls',
      blocks: [
        {
          body: [
            'Most web browsers allow you to control cookies through their settings.',
            'Depending on your browser, you may be able to:',
          ],
          items: [
            'block cookies',
            'delete existing cookies',
            'receive notifications before cookies are stored',
            'restrict cookies from specific websites',
          ],
        },
        {
          body: [
            'Please note that blocking or deleting certain cookies may affect the functionality and performance of the SVARA website.',
            'Some features may not work as intended if essential cookies are disabled.',
          ],
        },
      ],
    },
    {
      n: '8',
      title: 'How long cookies remain on your device',
      blocks: [
        {
          body: ['Cookies may remain on your device for different periods of time.'],
        },
        {
          heading: 'Session Cookies',
          body: [
            'Session cookies are temporary and are generally removed when you close your browser.',
          ],
        },
        {
          heading: 'Persistent Cookies',
          body: [
            'Persistent cookies remain on your device for a defined period or until you delete them manually.',
            'The duration depends on the purpose of the cookie and the technology or service responsible for placing it.',
          ],
        },
      ],
    },
    {
      n: '9',
      title: 'Changes to this Cookie Policy',
      blocks: [
        {
          body: ['We may update this Cookie Policy from time to time to reflect:'],
          items: [
            'changes to our technology',
            'changes to our website or services',
            'changes in the cookies we use',
            'changes in legal or regulatory requirements',
          ],
        },
        {
          body: [
            'When we make material changes, we may update the “Last Updated” date at the top of this page and, where required, provide additional notice.',
            'We encourage you to review this Cookie Policy periodically.',
          ],
        },
      ],
    },
    {
      n: '10',
      title: 'Contact us',
      blocks: [
        {
          body: [
            'If you have questions about how SVARA uses cookies or similar technologies, please contact us through the appropriate contact channel available on the SVARA website.',
          ],
        },
      ],
    },
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
    title: 'Cookie Policy — SVARA',
    description:
      'How SVARA uses cookies and similar technologies: what each category does, what information is collected, and how to review, change or withdraw your preferences at any time.',
  },
}
