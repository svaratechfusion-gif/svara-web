// DIVISION DETAIL — the long-form write-up behind each division's "Learn more".
//
// SOURCE OF TRUTH for /divisions/<slug>. Division 01's narrative is client copy,
// reproduced VERBATIM — do not rewrite, tighten or re-punctuate it.
//
// ALL SIX now carry their supplied narrative, so all six are indexable and in
// the sitemap. The short-form path (empty `intro` → `noindex` + a pending note)
// is kept for any division added later, not because one is using it.

export interface DetailSection {
  name: string
  /**
   * One paragraph, or several. "Enterprise AI Copilot" is supplied as two, and a
   * single joined string would render as one wall — so the array form is carried
   * through to the markup rather than flattened here.
   */
  copy: string | string[]
}

export interface DivisionDetail {
  /** URL segment under /divisions, and the key the showcase links by. */
  slug: string
  n: string
  /** The division's own title line, as supplied. */
  title: string
  /** Display name used in navigation and breadcrumbs. */
  short: string
  tagline: string
  /** Basename in /public/images/divisions. */
  img: string
  /** Opening narrative. Empty for divisions awaiting their write-up. */
  intro: string[]
  /** "What we build" — empty for divisions awaiting their write-up. */
  build: DetailSection[]
  /**
   * Any prose sections a division carries BETWEEN "What we build" and "The
   * outcome" — Simulation has "Connected intelligence", division 01 has none.
   * Kept open-ended so a later write-up with its own extra section fits without
   * another type change.
   */
  extra?: { heading: string, paragraphs: string[] }[]
  /** "The outcome" — empty for divisions awaiting their write-up. */
  outcome: string[]
  capabilities: string[]
  seo: { title: string, description: string }
}

/** True once the long-form narrative has been supplied for a division. */
export function hasNarrative(d: DivisionDetail): boolean {
  return d.intro.length > 0
}

export const divisionDetails: DivisionDetail[] = [
  {
    slug: 'autonomous-intelligence',
    n: '01',
    title: 'Deep Tech & Autonomous Intelligence',
    short: 'Artificial Intelligence',
    tagline: 'Building intelligence that sees, understands and acts.',
    img: 'autonomous-intelligence',
    intro: [
      'Artificial intelligence becomes transformative when it can move beyond screens, reports and static data—and understand the world as it changes.',
      'SVARA\'s Deep Tech & Autonomous Intelligence division is the innovation engine behind technologies that connect AI with physical environments, operational systems and real-world decision-making. We develop advanced intelligence systems capable of perceiving, interpreting, predicting and responding to complex conditions in real time.',
      'From computer vision systems that transform cameras into active intelligence networks, to autonomous drones, edge devices, predictive models, generative AI and autonomous agent networks, this division brings together multiple layers of artificial intelligence into deployable, connected systems.',
      'Our approach is built around a simple principle: intelligence should not only analyse what has already happened. It should continuously understand what is happening, anticipate what could happen next and support—or automate—the appropriate response.',
    ],
    build: [
      {
        name: 'Computer Vision & Perception Intelligence',
        copy: 'We develop AI-powered vision systems that analyse live and recorded video to detect objects, events, behaviours and anomalies. Existing camera infrastructure can become an active intelligence layer capable of monitoring, interpreting and alerting in real time.',
      },
      {
        name: 'Autonomous AI Systems',
        copy: 'We build intelligent systems capable of operating with reduced human intervention, including autonomous drones, robotics and intelligent devices that can sense conditions, process information and respond dynamically.',
      },
      {
        name: 'Drone Intelligence',
        copy: 'Our aerial intelligence capabilities combine autonomous flight, onboard AI, object detection, live tracking and coordinated response. These systems can support surveillance, inspection, infrastructure monitoring and operational awareness across large or complex environments.',
      },
      {
        name: 'Edge AI',
        copy: 'Intelligence does not always need to travel to the cloud before a decision can be made. SVARA deploys AI directly at the source of data generation, enabling low-latency inference, offline operation, reduced bandwidth dependency and stronger data control.',
      },
      {
        name: 'Predictive Intelligence',
        copy: 'Using operational and historical data, we build forecasting and predictive systems that help organisations identify emerging patterns, anticipate risk and make better decisions before issues become critical.',
      },
      {
        name: 'Generative & Cognitive AI',
        copy: 'We develop enterprise AI systems that understand organisational context, work with documents and knowledge, generate useful outputs and support reasoning across complex business processes.',
      },
      {
        name: 'Autonomous Agent Networks',
        copy: 'AI agents can plan, execute and coordinate tasks across enterprise systems. We design agent-based intelligence capable of automating repetitive, rule-based and data-intensive work while integrating with the tools organisations already use.',
      },
    ],
    outcome: [
      'The goal is not AI as an isolated feature.',
      'The goal is an intelligence layer that can move across physical operations, enterprise systems and digital environments—turning signals into understanding and understanding into action.',
    ],
    capabilities: [
      'Computer Vision', 'Autonomous Systems', 'Drone Intelligence', 'Edge AI',
      'Predictive Analytics', 'Generative & Cognitive AI', 'AI Agents',
    ],
    seo: {
      title: 'Deep Tech & Autonomous Intelligence | SVARA Divisions',
      description: 'SVARA\'s Deep Tech & Autonomous Intelligence division builds computer vision, autonomous systems, drone intelligence, edge AI, predictive models, generative AI and agent networks — intelligence that perceives, interprets, predicts and responds in real time.',
    },
  },

  // ── awaiting their narrative ─────────────────────────────────────────────
  // Everything below is the division's existing /divisions copy, verbatim.
  {
    slug: 'enterprise-software',
    // NOTE: the supplied write-up is headed "03"; the site orders this division
    // second. Your numbering swaps this with Simulation. Left as the site has it
    // until the canonical order is confirmed — matched by NAME, which is
    // unambiguous. The title is the one from the supplied copy ("Business SaaS
    // PRODUCT Studio"); DivShowcase still reads "Business SaaS Studio".
    n: '02',
    title: 'Business SaaS Product Studio',
    short: 'Enterprise Software',
    tagline: 'The operational backbone for AI-driven organisations.',
    img: 'enterprise-software',
    intro: [
      'Modern organisations often operate across disconnected systems.',
      'Sales teams work inside one platform. Finance uses another. HR manages information elsewhere. Customer support, training, operations and reporting each develop their own technology layers.',
      'The result is fragmentation.',
      'SVARA\'s Business SaaS Product Studio is designed to bring these critical functions into a connected, AI-powered operating environment where systems share data, workflows and intelligence.',
      'Rather than adding another isolated application to an already fragmented technology stack, we build enterprise platforms that can become part of the organisation\'s operational backbone.',
    ],
    build: [
      {
        name: 'Customer Relationship Management',
        copy: 'Intelligent CRM systems that support revenue operations through lead management, sales pipelines, AI-assisted scoring, automated follow-ups and decision-oriented reporting.',
      },
      {
        name: 'Enterprise Resource Planning',
        copy: 'Connected financial, inventory, procurement and supply-chain systems designed to provide stronger operational visibility and support intelligent forecasting and analysis.',
      },
      {
        name: 'Human Resource Management',
        copy: 'Platforms that support recruitment, payroll, performance management and workforce operations, with AI capabilities for tasks such as screening, analysis and attrition prediction.',
      },
      {
        name: 'Learning Management Systems',
        copy: 'AI-powered learning environments that can support course delivery, skills development, personalised learning paths, skills-gap analysis and compliance training.',
      },
      {
        name: 'AI Helpdesk',
        copy: 'Omnichannel support systems that bring customer interactions into a connected environment while using AI to support automation, resolution intelligence and customer health analysis.',
      },
      {
        name: 'AI Agent Builder',
        copy: 'A platform approach to designing and deploying digital workers and AI-powered workflows, enabling organisations to automate tasks without requiring every automation to be built from scratch.',
      },
    ],
    extra: [
      {
        heading: 'One connected operating environment',
        paragraphs: [
          'The value of the platform does not come only from individual modules.',
          'CRM, ERP, HRM, LMS, Helpdesk and AI agents can share the same data and connect through a common intelligence layer. This creates the foundation for cross-functional automation and more complete organisational visibility.',
        ],
      },
    ],
    outcome: [
      'Business software should not simply store information.',
      'It should help organisations understand what is happening, identify what needs attention and support action across the entire operation.',
      'One platform. Connected functions. Shared intelligence.',
    ],
    capabilities: [
      'CRM', 'ERP', 'HRM', 'LMS', 'AI Helpdesk', 'AI Agent Builder', 'Enterprise Analytics',
    ],
    seo: {
      title: 'Business SaaS Product Studio | SVARA Divisions',
      description: 'SVARA\'s Business SaaS Product Studio builds connected CRM, ERP, HRM, LMS, AI Helpdesk and AI Agent Builder platforms — one operating environment where business functions share data, workflows and intelligence.',
    },
  },
  {
    slug: 'simulation',
    // NOTE: the supplied write-up is headed "02". The site orders this division
    // third (see DivShowcase). Numbering left as the site has it until the
    // canonical order is confirmed; the content is matched by NAME, which is
    // unambiguous — title and every section describe this division.
    n: '03',
    title: 'Interactive AI & Simulation',
    short: 'Simulation',
    tagline: 'Test before you build. Decide before you act.',
    img: 'simulation',
    intro: [
      'The cost of making decisions in the real world can be significant.',
      'Infrastructure changes, industrial operations, workforce training and complex system interventions often involve uncertainty, risk and substantial physical resources. SVARA\'s Interactive AI & Simulation division creates intelligent virtual environments where organisations can model, observe, test and optimise systems before taking action in the real world.',
      'At the centre of this division is the concept of simulation before deployment.',
      'By creating digital representations of physical assets, environments and operational systems, organisations can gain a deeper understanding of how those systems behave. They can test alternative scenarios, analyse potential outcomes and identify risks without immediately committing physical resources.',
    ],
    build: [
      {
        name: 'Digital Twin Platforms',
        copy: 'We create live virtual replicas of factories, campuses, infrastructure and other physical environments. These digital twins can connect with sensors and operational data to provide a continuously evolving view of real-world systems.',
      },
      {
        name: 'Real-Time Operational Simulation',
        copy: 'Physical and operational data can be represented inside interactive environments, allowing teams to observe conditions, relationships and system behaviour through a unified digital model.',
      },
      {
        name: 'Scenario Testing & What-If Analysis',
        copy: 'Before implementing major operational decisions, organisations can model different variables and explore possible outcomes. This makes it possible to compare strategies, understand trade-offs and test assumptions in a controlled environment.',
      },
      {
        name: 'Stress Analysis',
        copy: 'Complex systems can be pushed through simulated conditions to understand how they respond to failures, demand changes, environmental variables or other operational disruptions.',
      },
      {
        name: 'Industrial Simulation',
        copy: 'We apply simulation technologies to manufacturing, infrastructure and industrial environments to support process optimisation, anomaly detection and predictive maintenance.',
      },
      {
        name: 'AI Training Simulators',
        copy: 'Immersive and risk-free environments can be used to support workforce development, safety training and scenario-based learning—allowing people to practice complex situations without exposing real operations to unnecessary risk.',
      },
    ],
    extra: [
      {
        heading: 'Connected intelligence',
        paragraphs: [
          'The simulation environment becomes even more powerful when connected to the wider SVARA ecosystem.',
          'Digital twins can receive intelligence from Vision AI, Edge AI and other operational systems, creating a feedback loop between the physical environment, its virtual representation and the intelligence used to analyse it.',
        ],
      },
    ],
    outcome: [
      'Instead of relying only on historical reports or intuition, organisations can explore possibilities before making commitments.',
      'Model the system. Test the variables. Understand the outcomes. Then act.',
    ],
    capabilities: [
      'Digital Twins', 'AI Simulation', 'Scenario Testing', 'Stress Analysis',
      'Industrial Intelligence', 'Predictive Maintenance', 'Immersive Training',
    ],
    seo: {
      title: 'Interactive AI & Simulation | SVARA Divisions',
      description: 'SVARA\'s Interactive AI & Simulation division builds digital twins, real-time operational simulation, scenario testing, stress analysis, industrial simulation and AI training simulators — model the system, test the variables, understand the outcomes, then act.',
    },
  },
  {
    slug: 'digital-engineering',
    // NOTE: the supplied write-up is headed "05"; the site orders this division
    // fourth. Title is the supplied one ("...& App Development"); DivShowcase
    // still reads "Digital Engineering".
    n: '04',
    title: 'Digital Engineering & App Development',
    short: 'Digital Engineering',
    tagline: 'Engineering the technology your organisation needs next.',
    img: 'digital-engineering',
    intro: [
      'Not every organisation can solve its technology requirements with an off-the-shelf platform.',
      'Some problems require custom software. Others require legacy systems to be modernised, disconnected applications to be integrated or entirely new digital products to be engineered from the ground up.',
      'SVARA\'s Digital Engineering & App Development division is the execution arm of the ecosystem—designing, developing and deploying technology systems around real organisational requirements.',
      'From enterprise applications and mobile platforms to cloud architecture, AI integration and workflow automation, we build the digital foundations organisations need to operate, evolve and scale.',
    ],
    build: [
      {
        name: 'Custom Software Development',
        copy: 'Business-critical applications designed around specific workflows, operational models and organisational requirements.',
      },
      {
        name: 'Web & Mobile Applications',
        copy: 'Digital platforms, client portals, service applications and enterprise tools developed for modern web and mobile environments.',
      },
      {
        name: 'AI & Machine Learning Integration',
        copy: 'Integration of AI capabilities—including custom models, large language models and computer vision—into business applications and operational workflows.',
      },
      {
        name: 'Cloud Architecture',
        copy: 'Architecture, migration and scalability planning across modern cloud environments, supporting the infrastructure required for reliable and scalable digital systems.',
      },
      {
        name: 'Legacy Modernisation',
        copy: 'Modernising existing technology environments and extending the life and capabilities of critical business systems.',
      },
      {
        name: 'API Integration',
        copy: 'Connecting separate applications, databases and services into unified workflows and interoperable technology environments.',
      },
      {
        name: 'Enterprise Dashboards',
        copy: 'Decision-support and operational visibility systems that bring important information together for teams and leadership.',
      },
      {
        name: 'Workflow Automation',
        copy: 'Identifying manual and repetitive processes and redesigning them into automated, connected workflows.',
      },
    ],
    extra: [
      {
        heading: 'More than project delivery',
        paragraphs: [
          'Digital Engineering also creates a natural entry point into the wider SVARA ecosystem.',
          'A custom application can later connect with AI agents. An enterprise system can integrate with the Unified Business Cloud. Operational data can feed predictive intelligence, digital twins or AI orchestration.',
          'Each technology engagement can become part of a larger intelligence architecture.',
        ],
      },
    ],
    outcome: [
      'We build what organisations need today while creating the foundations for what they can become tomorrow.',
    ],
    capabilities: [
      'Custom Software', 'Web Applications', 'Mobile Applications', 'AI Integration',
      'Cloud Architecture', 'API Integration', 'Enterprise Dashboards', 'Workflow Automation',
    ],
    seo: {
      title: 'Digital Engineering & App Development | SVARA Divisions',
      description: 'SVARA\'s Digital Engineering & App Development division builds custom software, web and mobile applications, AI integration, cloud architecture, legacy modernisation, API integration, enterprise dashboards and workflow automation.',
    },
  },
  {
    slug: 'intelligence-platform',
    // NOTE: the supplied write-up is headed "04"; the site orders this division
    // fifth. Matched by SUBJECT — orchestration, agents, copilot and a unified
    // command layer are this division's five labels (ORCHESTRATION / REASONING /
    // AGENTS / TOOLS / MEMORY) and its render. Title is the supplied one;
    // DivShowcase still reads "One AI OS & Intelligence Platform".
    n: '05',
    title: 'AI Wrapper & Orchestration',
    short: 'Intelligence Platform',
    tagline: 'One intelligence layer. Every system connected.',
    img: 'intelligence-platform',
    intro: [
      'Organisations do not need more dashboards.',
      'They need a better way to interact with the systems they already depend on.',
      'SVARA\'s AI Wrapper & Orchestration division creates a unified intelligence layer that connects SVARA products, enterprise applications and selected third-party platforms into a single command environment.',
      'The objective is to move beyond fragmented interfaces, disconnected workflows and application switching toward a more natural model of interaction: commanding intelligence through conversation, automation and coordinated AI systems.',
    ],
    build: [
      {
        name: 'Enterprise AI Copilot',
        copy: [
          'A conversational intelligence interface that enables users to interact with business data, systems and operations using natural language.',
          'Instead of manually navigating through multiple dashboards, users can ask questions, request analysis and initiate actions through a unified AI interface.',
        ],
      },
      {
        name: 'AI Orchestration Engine',
        copy: 'An orchestration layer that coordinates actions and workflows across connected systems such as CRM, ERP, Helpdesk, Vision AI and Simulation platforms.',
      },
      {
        name: 'Cross-Platform Intelligence',
        copy: 'The ability to connect SVARA\'s ecosystem with external enterprise applications and create intelligence across systems that were previously isolated from one another.',
      },
      {
        name: 'Multi-Agent Orchestration',
        copy: 'Specialised AI agents can work together across complex tasks, allowing different agents to handle different stages of a workflow while sharing context and coordinating execution.',
      },
      {
        name: 'Unified Command Interface',
        copy: 'A central control surface designed to provide a connected view of an organisation\'s technology stack and enable interaction across systems from one environment.',
      },
      {
        name: 'Voice & Mobile Intelligence',
        copy: 'The command layer can extend beyond the desktop interface, supporting mobile and voice-based interaction where appropriate.',
      },
    ],
    extra: [
      {
        heading: 'From software navigation to intelligence interaction',
        paragraphs: [
          'The long-term direction is simple.',
          'Instead of learning how every application works individually, users should be able to express what they need to accomplish.',
          'The intelligence layer should understand the request, identify the relevant systems, coordinate the required information or actions and return a meaningful result.',
        ],
      },
    ],
    outcome: [
      'Don\'t use software. Command intelligence.',
      'AI Wrapper & Orchestration becomes the connective layer between people, data, software, AI agents and operations.',
    ],
    capabilities: [
      'Enterprise AI Copilot', 'AI Orchestration', 'Multi-Agent Systems',
      'Cross-Platform Intelligence', 'Natural Language Interface', 'Unified Command',
    ],
    seo: {
      title: 'AI Wrapper & Orchestration | SVARA Divisions',
      description: 'SVARA\'s AI Wrapper & Orchestration division builds the enterprise AI copilot, orchestration engine, multi-agent systems and unified command interface — one intelligence layer connecting people, data, software, AI agents and operations.',
    },
  },
  {
    slug: 'digital-growth',
    // The one division where the supplied write-up's number AND name both match
    // the site already.
    n: '06',
    title: 'Digital Growth & PR Tech',
    short: 'Digital Growth',
    tagline: 'Growth is not a campaign. It is a system.',
    img: 'digital-growth',
    intro: [
      'Growth becomes difficult to sustain when marketing, content, advertising, customer acquisition and brand communications operate as disconnected activities.',
      'SVARA\'s Digital Growth & PR Tech division applies technology, automation and intelligence to connect these activities into a measurable growth system.',
      'The objective is to create a continuous feedback loop where campaigns generate signals, signals improve decisions and every stage of the customer journey contributes to a clearer understanding of performance.',
    ],
    build: [
      {
        name: 'Full-Funnel Growth Architecture',
        copy: 'Connected systems that address the journey from awareness and discovery through acquisition, conversion and ongoing customer engagement.',
      },
      {
        name: 'AI Marketing Automation',
        copy: 'Technology-enabled automation for campaign workflows, content generation, audience targeting and repetitive marketing processes.',
      },
      {
        name: 'SEO & Performance Marketing',
        copy: 'Data-driven approaches to improving digital visibility, attracting relevant audiences and optimising campaigns around measurable performance and conversion outcomes.',
      },
      {
        name: 'AI Content Systems',
        copy: 'Scalable content workflows for articles, social media, email and advertising, supported by AI while remaining connected to broader brand and growth objectives.',
      },
      {
        name: 'Corporate Brand Strategy',
        copy: 'Strategic work around positioning, identity and visual communications to create stronger and more coherent market presence.',
      },
      {
        name: 'PR & Media Technology',
        copy: 'Technology-supported approaches to editorial outreach, thought leadership, media engagement and reputation monitoring.',
      },
      {
        name: 'Social Media Intelligence',
        copy: 'Analysis of digital conversations, content performance and audience signals across relevant social platforms.',
      },
      {
        name: 'CRM & Marketing Integration',
        copy: 'Connecting marketing activity with customer and revenue systems to create stronger visibility between acquisition activity and business outcomes.',
      },
    ],
    extra: [
      {
        heading: 'Closed-loop growth intelligence',
        paragraphs: [
          'The most important part of the division is the connection between activity and intelligence.',
          'Marketing should not operate separately from the rest of the business.',
          'Campaign data can inform sales. Customer interactions can improve targeting. CRM data can create better segmentation. AI can help identify patterns across the full customer journey.',
          'Over time, the growth system becomes more informed by every interaction.',
        ],
      },
    ],
    outcome: [
      'Growth is treated as an operating system—not a sequence of disconnected campaigns.',
      'Every touchpoint becomes a signal. Every signal becomes intelligence. Every insight improves the next decision.',
    ],
    capabilities: [
      'AI Marketing Automation', 'SEO', 'Performance Marketing', 'AI Content',
      'Brand Strategy', 'PR Technology', 'Social Intelligence', 'Full-Funnel Growth',
    ],
    seo: {
      title: 'Digital Growth & PR Tech | SVARA Divisions',
      description: 'SVARA\'s Digital Growth & PR Tech division builds full-funnel growth architecture, AI marketing automation, SEO and performance marketing, AI content systems, brand strategy, PR technology and social intelligence — growth as an operating system, not a sequence of campaigns.',
    },
  },
]

export const divisionBySlug = (slug: string): DivisionDetail | undefined =>
  divisionDetails.find(d => d.slug === slug)
