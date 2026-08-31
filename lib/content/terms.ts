/**
 * SVARA TERMS OF SERVICE — the full published text.
 *
 * Supplied copy, reproduced VERBATIM. Nothing paraphrased, shortened or
 * reordered. Two deliberate editorial decisions, consistent with the other legal
 * documents:
 *
 *  1. The draft carried "Last Updated: [Insert Date]". A bracketed placeholder
 *     must never publish. `updated` below is a real date.
 *  2. Section 21 directs the reader to "the contact information provided on the
 *     website", so the page links to /contact rather than naming an address —
 *     the email in lib/content/contact.ts is still a placeholder.
 *
 * This file previously exported `termsContent`, a four-bullet SUMMARY rendered
 * through KnowledgeProductLayout. Its three FAQs are carried over so the page
 * keeps its FAQPage schema, but each answer was ALIGNED to the real document —
 * the old ones asserted more than these Terms do (e.g. "with or without notice",
 * and a definite governing-law rule this text does not state).
 *
 * ⚠️ SUPPLIED WITH A CAVEAT FROM THE AUTHOR, REPRODUCED HERE:
 * "This should be treated as a strong website draft, not jurisdiction-specific
 * legal advice. Before launch, it should be reviewed and completed with SVARA's
 * actual legal entity name, registered address, governing jurisdiction, contact
 * details, product-specific agreements, liability position, and applicable laws."
 * In particular Section 19 names no governing jurisdiction. That gap is the
 * client's to close with counsel; it was not invented here.
 */
import type { LegalDocument } from '../types/legal'
import { GOVERNING_LAW, GOVERNING_FORUM } from './legal-jurisdiction'

export const TERMS_UPDATED = '2026-08-31'

export const termsOfService: LegalDocument = {
  title: 'Terms of Service',
  updated: TERMS_UPDATED,
  version: '1.0',
  summary:
    'SVARA’s Terms of Service govern access to and use of the SVARA website, digital platforms, products, software, applications, content and related services — covering permitted use, accounts, intellectual property, user content, AI and automated technologies, disclaimers, liability, suspension and termination.',
  intro: [],
  sections: [
    {
      n: '1',
      title: 'Introduction',
      blocks: [
        {
          body: [
            'Welcome to SVARA.',
            'These Terms of Service (“Terms”) govern your access to and use of the SVARA website, digital platforms, products, software, applications, content and related services (collectively, the “Services”).',
            'By accessing or using the Services, you agree to be bound by these Terms. If you do not agree with these Terms, you should not access or use the Services.',
            'Where you access a specific SVARA product or service, additional terms, agreements, service descriptions, licence terms, data processing agreements or other policies may also apply. Where additional terms apply, those terms will supplement these Terms and may prevail in the event of a conflict to the extent specified in those additional terms.',
          ],
        },
      ],
    },
    {
      n: '2',
      title: 'Eligibility and authority',
      blocks: [
        {
          body: ['By using the Services, you represent that:'],
          items: [
            'you are legally capable of entering into a binding agreement;',
            'you will use the Services in accordance with applicable laws and regulations;',
            'where you are using the Services on behalf of an organisation, you have the authority to bind that organisation to these Terms; and',
            'the information you provide to SVARA is accurate and not misleading.',
          ],
        },
      ],
    },
    {
      n: '3',
      title: 'Use of the Services',
      blocks: [
        {
          body: [
            'SVARA grants you a limited, non-exclusive, non-transferable and revocable right to access and use the Services for their intended and lawful purposes, subject to these Terms.',
            'You agree not to:',
          ],
          items: [
            'use the Services for unlawful, fraudulent or harmful purposes;',
            'interfere with or disrupt the operation or security of the Services;',
            'attempt to gain unauthorised access to systems, accounts, networks or data;',
            'reverse engineer, decompile or attempt to extract source code except where applicable law expressly permits it;',
            'copy, reproduce, distribute, modify or create derivative works from SVARA content or technology without authorisation;',
            'introduce malicious software, code or harmful material;',
            'misuse automated systems, APIs or other technical interfaces;',
            'infringe the rights, privacy or intellectual property of SVARA or any third party; or',
            'use the Services in a way that could damage, disable or impair SVARA’s systems or reputation.',
          ],
        },
      ],
    },
    {
      n: '4',
      title: 'Accounts and access',
      blocks: [
        {
          body: [
            'Certain SVARA products or Services may require you to create an account or receive authorised access credentials.',
            'You are responsible for:',
          ],
          items: [
            'maintaining the confidentiality of your credentials;',
            'restricting unauthorised access to your account;',
            'ensuring information associated with your account remains accurate; and',
            'notifying SVARA promptly if you believe there has been unauthorised access or a security incident involving your account.',
          ],
        },
        {
          body: [
            'SVARA may suspend, restrict or terminate access where reasonably necessary to protect the security, integrity or lawful operation of the Services.',
          ],
        },
      ],
    },
    {
      n: '5',
      title: 'Product and service availability',
      blocks: [
        {
          body: [
            'SVARA may modify, update, suspend or discontinue any part of the Services from time to time.',
            'We do not guarantee that every product, feature, integration or capability will always be available, uninterrupted or error-free.',
            'Certain Services may be:',
          ],
          items: [
            'in development;',
            'experimental or beta;',
            'available only to selected users or organisations;',
            'subject to geographic, technical or regulatory limitations; or',
            'modified as technology and business requirements evolve.',
          ],
        },
        {
          body: [
            'Where commercially agreed service levels apply, they will be governed by the applicable agreement.',
          ],
        },
      ],
    },
    {
      n: '6',
      title: 'Intellectual property',
      blocks: [
        {
          body: [
            'Unless otherwise stated, the Services and their underlying materials—including software, interfaces, designs, text, graphics, trademarks, branding, logos, documentation, models and other content—are owned by or licensed to SVARA and are protected by applicable intellectual property laws.',
            'Nothing in these Terms transfers ownership of SVARA’s intellectual property to you.',
            'You may not use SVARA’s name, logos, trademarks or other brand assets without prior written permission, except where such use is expressly authorised by applicable law.',
            'Any unauthorised use of SVARA intellectual property may result in the suspension of access and other available legal remedies.',
          ],
        },
      ],
    },
    {
      n: '7',
      title: 'User content and submissions',
      blocks: [
        {
          body: [
            'You may provide information, files, data, messages, prompts, feedback or other content when interacting with SVARA or its Services (“User Content”).',
            'You retain ownership of your User Content.',
            'However, you grant SVARA the rights reasonably necessary to host, process, transmit, analyse and use that User Content for the purpose of:',
          ],
          items: [
            'providing and maintaining the requested Services;',
            'responding to your requests;',
            'operating and improving relevant functionality;',
            'maintaining security and preventing misuse; and',
            'complying with applicable legal obligations.',
          ],
        },
        {
          body: [
            'You represent that you have the necessary rights, permissions and authority to provide User Content to SVARA.',
            'You must not submit content that is unlawful, infringing, malicious or otherwise prohibited by applicable law.',
            'The treatment of personal information contained within User Content is also subject to applicable privacy terms and agreements.',
          ],
        },
      ],
    },
    {
      n: '8',
      title: 'AI and automated technologies',
      blocks: [
        {
          body: [
            'Certain SVARA Services may use artificial intelligence, machine learning, automation, analytics or other automated technologies.',
            'Outputs generated by AI or automated systems may:',
          ],
          items: [
            'be incomplete;',
            'contain errors or inaccuracies;',
            'depend on the quality and context of input data;',
            'vary over time as systems and models evolve; or',
            'require human review and professional judgement.',
          ],
        },
        {
          body: [
            'You are responsible for reviewing and evaluating outputs before relying on them for important decisions.',
            'Unless expressly agreed otherwise in writing, SVARA does not guarantee that AI-generated outputs will be accurate, complete, unique or suitable for a particular purpose.',
            'You must not use AI-generated outputs as the sole basis for decisions where independent verification or human oversight is reasonably necessary.',
          ],
        },
      ],
    },
    {
      n: '9',
      title: 'Acceptable use of AI Services',
      blocks: [
        {
          body: ['Where you use SVARA AI-enabled Services, you must not use them to:'],
          items: [
            'violate applicable laws or regulations;',
            'infringe intellectual property, privacy or other rights;',
            'generate or distribute malicious software;',
            'attempt to compromise systems or networks;',
            'impersonate others for deceptive purposes;',
            'facilitate fraud or deception;',
            'interfere with the security or operation of other systems;',
            'submit data that you are not authorised to provide; or',
            'use the Services in a manner reasonably likely to cause unlawful harm.',
          ],
        },
        {
          body: [
            'SVARA may implement reasonable safeguards, usage restrictions or technical controls to protect its Services and users.',
          ],
        },
      ],
    },
    {
      n: '10',
      title: 'Third-party services and integrations',
      blocks: [
        {
          body: [
            'SVARA Services may connect with or rely on third-party platforms, applications, APIs, infrastructure or services.',
            'SVARA does not control all third-party services and is not responsible for their:',
          ],
          items: ['availability;', 'security;', 'content;', 'policies;', 'functionality; or', 'acts or omissions.'],
        },
        {
          body: ['Your use of third-party services may be subject to separate terms and privacy policies.'],
        },
      ],
    },
    {
      n: '11',
      title: 'Fees and commercial terms',
      blocks: [
        {
          body: [
            'Certain SVARA products or Services may be provided under separate commercial agreements.',
            'Where fees, subscriptions, implementation costs or other charges apply, the relevant pricing, payment terms and commercial conditions will be communicated through:',
          ],
          items: [
            'a service agreement;',
            'order form;',
            'statement of work;',
            'subscription agreement; or',
            'another applicable commercial document.',
          ],
        },
        {
          body: [
            'Unless otherwise agreed in writing, access to a paid Service does not create an entitlement to additional features, services or support beyond the agreed scope.',
          ],
        },
      ],
    },
    {
      n: '12',
      title: 'Confidentiality',
      blocks: [
        {
          body: [
            'Where you receive or access non-public information relating to SVARA, its technology, products, operations, customers or business, you must not disclose that information except:',
          ],
          items: [
            'where authorised by SVARA;',
            'where disclosure is required by applicable law; or',
            'where the information has lawfully become public without a breach of confidentiality.',
          ],
        },
        {
          body: [
            'Formal confidentiality obligations may also be governed by a separate non-disclosure agreement or commercial agreement.',
          ],
        },
      ],
    },
    {
      n: '13',
      title: 'Service disclaimers',
      blocks: [
        {
          body: [
            'To the maximum extent permitted by applicable law, the Services are provided on an “as is” and “as available” basis.',
            'SVARA does not guarantee that the Services will:',
          ],
          items: [
            'always be available;',
            'operate without interruption;',
            'be completely error-free;',
            'be free from all security vulnerabilities;',
            'meet every individual requirement; or',
            'produce results that are accurate or suitable for every purpose.',
          ],
        },
        {
          body: [
            'Nothing in these Terms excludes any warranty, right or protection that cannot legally be excluded under applicable law.',
          ],
        },
      ],
    },
    {
      n: '14',
      title: 'Limitation of liability',
      blocks: [
        {
          body: [
            'To the maximum extent permitted by applicable law, SVARA and its affiliates, directors, employees, partners and service providers will not be liable for indirect, incidental, special, consequential or punitive damages, including loss of profits, revenue, data, business opportunity, goodwill or anticipated savings arising from or relating to your use of, or inability to use, the Services.',
            'Where liability cannot legally be excluded, SVARA’s liability will be limited to the maximum extent permitted by applicable law and, where appropriate, may be further defined in the applicable commercial agreement.',
            'Nothing in these Terms limits or excludes liability where such limitation or exclusion is prohibited by law.',
          ],
        },
      ],
    },
    {
      n: '15',
      title: 'Indemnification',
      blocks: [
        {
          body: [
            'To the extent permitted by applicable law, you agree to indemnify and hold harmless SVARA, its affiliates, directors, employees and partners from claims, liabilities, damages, losses and reasonable expenses arising from:',
          ],
          items: [
            'your unlawful use of the Services;',
            'your breach of these Terms;',
            'your violation of applicable law; or',
            'your infringement of another person’s rights.',
          ],
        },
        { body: ['This obligation applies only to the extent permitted under applicable law.'] },
      ],
    },
    {
      n: '16',
      title: 'Suspension or termination',
      blocks: [
        {
          body: [
            'SVARA may suspend or terminate your access to all or part of the Services where reasonably necessary, including where:',
          ],
          items: [
            'you materially breach these Terms;',
            'your use creates a security or operational risk;',
            'your use is unlawful;',
            'you misuse the Services;',
            'we are required to do so by law; or',
            'continued access could reasonably cause harm to SVARA, its users or third parties.',
          ],
        },
        {
          body: [
            'Where appropriate, SVARA may provide notice and an opportunity to address the issue before suspension or termination.',
            'Termination of access does not affect any rights or obligations that by their nature should continue after termination.',
          ],
        },
      ],
    },
    {
      n: '17',
      title: 'Changes to the Services',
      blocks: [
        {
          body: [
            'Technology evolves.',
            'SVARA may modify, improve, replace or retire features, interfaces, integrations or capabilities as part of the ongoing development of its ecosystem.',
            'Where a material change affects a contracted Service, the applicable commercial agreement or applicable law may govern notice requirements and available remedies.',
          ],
        },
      ],
    },
    {
      n: '18',
      title: 'Changes to these Terms',
      blocks: [
        {
          body: [
            'SVARA may update these Terms from time to time.',
            'When changes are made, we will update the “Last Updated” date at the top of this page.',
            'Where required by applicable law, or where changes materially affect your rights, SVARA may provide additional notice or request acknowledgement before the updated Terms take effect.',
            'Your continued use of the Services after the effective date of updated Terms may constitute acceptance where permitted by applicable law.',
          ],
        },
      ],
    },
    {
      n: '19',
      title: 'Governing law and disputes',
      blocks: [
        {
          body: [
            'These Terms will be governed by the laws applicable to the relevant SVARA legal entity and the relationship between SVARA and the user, unless otherwise specified in a separate agreement.',
            `SVARA TechFusion Private Limited is incorporated in India. Accordingly, these Terms are governed by and construed in accordance with ${GOVERNING_LAW}, without regard to conflict of law principles.`,
            'Any disputes relating to the Services will be subject to the dispute-resolution process and jurisdiction specified in the applicable commercial agreement or, where no separate agreement applies, as determined by applicable law.',
            `Where no separate agreement specifies a forum, ${GOVERNING_FORUM} will have exclusive jurisdiction over any dispute arising out of or relating to these Terms or the Services.`,
            'This does not remove any protection or right available to you under the mandatory law of the country in which you reside.',
          ],
        },
      ],
    },
    {
      n: '20',
      title: 'General terms',
      blocks: [
        {
          body: [
            'If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in effect to the extent permitted by law.',
            'SVARA’s failure to enforce a provision of these Terms does not constitute a waiver of that provision.',
            'You may not assign or transfer your rights or obligations under these Terms without SVARA’s prior written consent, except where applicable law provides otherwise.',
            'SVARA may assign its rights or obligations in connection with a corporate restructuring, merger, acquisition or transfer of assets, subject to applicable law.',
            'These Terms, together with any applicable additional agreements or policies, form the agreement between you and SVARA regarding your use of the Services.',
          ],
        },
      ],
    },
    {
      n: '21',
      title: 'Contact',
      blocks: [
        {
          body: [
            'If you have questions about these Terms of Service, please contact SVARA through the contact information provided on the website.',
          ],
        },
      ],
    },
  ],
  faqs: [
    { question: 'What happens if I violate the Terms of Service?', answer: 'SVARA may suspend or terminate access to all or part of the Services where reasonably necessary — including for a material breach of these Terms, unlawful use, misuse, or use that creates a security or operational risk. Where appropriate, SVARA may provide notice and an opportunity to address the issue before suspension or termination.' },
    { question: 'Can SVARA modify these terms?', answer: 'Yes. SVARA may update these Terms from time to time and will update the “Last Updated” date at the top of the page. Where required by applicable law, or where changes materially affect your rights, SVARA may provide additional notice or request acknowledgement before the updated Terms take effect.' },
    { question: 'What law governs these terms?', answer: 'These Terms are governed by the laws applicable to the relevant SVARA legal entity and the relationship between SVARA and the user, unless otherwise specified in a separate agreement. Disputes are subject to the process and jurisdiction set out in the applicable commercial agreement or, where none applies, as determined by applicable law.' },
  ],
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
    title: 'Terms of Service — SVARA',
    description:
      'The terms governing access to and use of SVARA’s website, platforms, products and services — permitted use, accounts, intellectual property, user content, AI outputs, disclaimers, liability and termination.',
  },
}
