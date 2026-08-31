// SVARA DIGITAL GROWTH & PR TECH — verbatim content for the immersive Explore experience. Factored
// out of GrowthExplore.vue to keep the component focused. All strings are VERBATIM from the source
// (P10); ONLY the five source service areas are used (§34). No invented services, pricing, tools,
// numbers or sentiment scores — telemetry is abstract, brand mentions are illustrative placeholders.

export interface KV { k: string; v: string }

export const HERO_LINES = ['Growth is not', 'a campaign.', 'It is a system.'] as const
export const HEAD_STATUS: KV[] = [
  { k: 'DATA', v: 'LIVE' }, { k: 'SIGNALS', v: 'FLOWING' }, { k: 'ATTRIBUTION', v: 'ON' },
]
export interface HeroSystem { n: string; k: string }
export const HERO_SYSTEMS: HeroSystem[] = [
  { n: '01', k: 'ACQUISITION' }, { n: '02', k: 'CONVERSION' }, { n: '03', k: 'CONTENT' }, { n: '04', k: 'BRAND' }, { n: '05', k: 'RETENTION' },
]
export const HERO_TELEMETRY = ['TRAFFIC', 'LEADS', 'CONVERSION', 'ENGAGEMENT', 'RETENTION']
export const TRAD = ['Posts', 'Ads', 'Impressions', 'Clicks']
export const SVARA_OUT = ['Qualified Leads', 'Cost per Acquisition', 'Customer Lifetime Value', 'Revenue Attribution']

export interface Group { k: string; items?: string[]; note?: string; chain?: boolean }
export interface Service { id: string; n: string; k: string; sub: string; pos?: string; accent: string; funnel?: string[]; groups: Group[] }
export const SERVICES: Service[] = [
  {
    id: 'eng', n: '01', k: 'GROWTH ENGINEERING', sub: 'Full-Funnel System Build', accent: '#4fd6ea',
    pos: 'Design and build the complete customer acquisition machine.',
    funnel: ['DISCOVER', 'ATTRACT', 'CAPTURE', 'CONVERT', 'NURTURE', 'MEASURE'],
    groups: [
      { k: 'CONVERSION-OPTIMISED WEBSITES & LANDING PAGES', note: 'With A/B testing infrastructure.' },
      { k: 'LEAD CAPTURE SYSTEMS', items: ['Forms', 'Chatbots', 'WhatsApp flows', 'Gated content', 'CRM connection'] },
      { k: 'SEO ARCHITECTURE', items: ['Technical SEO', 'Content strategy', 'Authority building'] },
      { k: 'PAID ACQUISITION', items: ['Google', 'Meta', 'LinkedIn', 'YouTube', 'AI bidding optimisation'] },
      { k: 'MARKETING AUTOMATION', items: ['Multi-channel nurture', 'Behaviour signals', 'Intent signals'] },
      { k: 'ANALYTICS & ATTRIBUTION', items: ['FIRST TOUCH', 'CLOSED DEAL'], chain: true },
    ],
  },
  {
    id: 'content', n: '02', k: 'AI CONTENT INTELLIGENCE', sub: 'Content at the speed of modern digital channels', accent: '#b47dff',
    groups: [
      { k: 'AI CONTENT ENGINE', items: ['SEO articles', 'Social posts', 'Email campaigns', 'Ad copy', 'Video scripts'] },
      { k: 'BRAND VOICE TRAINING', items: ['BRAND VOICE', 'AI LEARNING', 'CONTENT OUTPUT'], chain: true, note: 'Learns tone, vocabulary and messaging framework.' },
      { k: 'CONTENT PERFORMANCE AI', items: ['FORMATS', 'TOPICS', 'CHANNELS', 'ENGAGEMENT SIGNALS'], chain: true },
      { k: 'PERSONALISED CONTENT', items: ['Audiences', 'Industries', 'Funnel stages'] },
      { k: 'MULTILINGUAL CONTENT', items: ['English', 'Hindi', 'Regional languages'] },
    ],
  },
  {
    id: 'pr', n: '03', k: 'PR & BRAND INTELLIGENCE', sub: 'Build authority. Manage reputation. Accelerate growth', accent: '#ffb340',
    groups: [
      { k: 'MEDIA RELATIONS', items: ['Tier-1 publications', 'Industry media', 'Digital news platforms'] },
      { k: 'PRESS RELEASE DISTRIBUTION', items: ['Drafting', 'Journalist targeting', 'Relevant media placement'] },
      { k: 'THOUGHT LEADERSHIP', items: ['CEO interviews', 'Expert commentary', 'Opinion pieces'] },
      { k: 'REPUTATION MONITORING', note: 'AI-powered brand mention tracking.' },
      { k: 'CRISIS MANAGEMENT', items: ['Negative press', 'Social media issues', 'Reputational risks'] },
      { k: 'AWARDS & RECOGNITION', note: 'Industry award submissions.' },
    ],
  },
  {
    id: 'social', n: '04', k: 'SOCIAL MEDIA INTELLIGENCE', sub: 'Social Signal Network', accent: '#46d69a',
    groups: [
      { k: 'PLATFORM MANAGEMENT', items: ['Instagram', 'LinkedIn', 'X', 'YouTube', 'WhatsApp Business'], note: 'All channels coordinated.' },
      { k: 'COMMUNITY BUILDING', items: ['Follower growth', 'Engagement campaigns', 'Audience development'] },
      { k: 'INFLUENCER AI MATCHING', items: ['AUDIENCE', 'AI MATCH', 'INFLUENCER'], chain: true, note: 'Nano · Micro · Macro.' },
      { k: 'SOCIAL LISTENING', items: ['Brand', 'Competitor', 'Industry'] },
      { k: 'PERFORMANCE ANALYTICS', items: ['Engagement rate', 'Reach', 'Conversion attribution', 'ROI'] },
    ],
  },
  {
    id: 'perf', n: '05', k: 'PERFORMANCE MARKETING', sub: 'Turn spend into measurable outcomes', accent: '#6a7bff',
    groups: [
      { k: 'PAID SEARCH & PAID SOCIAL', items: ['Campaign architecture', 'Bid management', 'Creative testing', 'Continuous optimisation'] },
      { k: 'AI AD CREATIVE', note: 'Machine-learning-driven creative variation testing.' },
      { k: 'RETARGETING SYSTEMS', items: ['Website visitors', 'Leads', 'Audience segmentation'] },
      { k: 'COST-PER-LEAD OPTIMISATION', note: 'AI continuously adjusts budget allocation across channels to minimise CPA.' },
      { k: 'REVENUE ATTRIBUTION', items: ['CHANNEL', 'TOUCHPOINT', 'CONVERSION', 'REVENUE'], chain: true },
    ],
  },
]

export interface StackLayer { n: string; k: string; tools: string[]; out: string }
export const STACK: StackLayer[] = [
  { n: '01', k: 'DATA & INTELLIGENCE', tools: ['GA4', 'Mixpanel', 'SVARA Analytics', 'Hotjar', 'CRM data layer'], out: 'Every decision backed by data — no guesswork.' },
  { n: '02', k: 'ACQUISITION', tools: ['Google Ads', 'Meta', 'LinkedIn', 'YouTube', 'Programmatic display'], out: 'Lowest CAC with highest-intent traffic.' },
  { n: '03', k: 'CONVERSION', tools: ['Landing page builders', 'A/B testing', 'Chatbots', 'Lead scoring AI'], out: 'Maximum conversion from traffic investment.' },
  { n: '04', k: 'RETENTION', tools: ['Email automation', 'WhatsApp flows', 'CRM sequences', 'Loyalty programs'], out: 'LTV maximisation · Churn reduction.' },
  { n: '05', k: 'INTELLIGENCE', tools: ['SVARA AI content engine', 'Reporting dashboards', 'Attribution models'], out: 'Continuous improvement compounding over time.' },
]

export const FLYWHEEL_STAGES = ['DATA', 'ACQUISITION', 'CONVERSION', 'RETENTION', 'INTELLIGENCE']
export interface JourneyStage { k: string; s: string[] }
export const JOURNEY: JourneyStage[] = [
  { k: 'AWARENESS', s: ['SEO', 'PR', 'SOCIAL', 'PAID MEDIA'] },
  { k: 'INTEREST', s: ['CONTENT', 'VIDEO', 'SOCIAL'] },
  { k: 'VISIT', s: ['WEBSITE', 'LANDING PAGE'] },
  { k: 'LEAD', s: ['FORM', 'CHATBOT', 'WHATSAPP'] },
  { k: 'NURTURE', s: ['EMAIL', 'WHATSAPP', 'CRM'] },
  { k: 'CONVERSION', s: ['ATTRIBUTION', 'PERFORMANCE MARKETING'] },
  { k: 'RETENTION', s: ['LOYALTY', 'CRM', 'CONTINUOUS INTELLIGENCE'] },
]
export const TOUCHPOINTS = ['WEBSITE', 'SOCIAL', 'ADS', 'CONTENT', 'PR', 'CRM', 'WHATSAPP']
export const DD_CHAIN = ['DATA LAYER', 'INTELLIGENCE', 'DECISION', 'ACTION']
export interface Touch { t: string; c: string }
export const ATTRIBUTION: Touch[] = [
  { t: 'FIRST TOUCH', c: 'SEO' }, { t: 'SECOND TOUCH', c: 'SOCIAL' }, { t: 'THIRD TOUCH', c: 'PAID SEARCH' },
  { t: 'FOURTH TOUCH', c: 'CONTENT' }, { t: 'CONVERSION', c: 'CRM' },
]
export const AI_ACROSS = ['CONTENT', 'BIDDING', 'PERSONALISATION', 'LEAD SCORING', 'SOCIAL LISTENING', 'ATTRIBUTION', 'OPTIMISATION']
export const RADAR = ['NEWS', 'SOCIAL', 'REVIEWS', 'COMPETITORS', 'INDUSTRY', 'MEDIA']
export const MATURITY = ['CAMPAIGN', 'FUNNEL', 'SYSTEM', 'INTELLIGENCE', 'COMPOUNDING GROWTH']

export interface Client { n: string; k: string; d: string }
export const CLIENTS: Client[] = [
  { n: '01', k: 'B2B TECHNOLOGY & SAAS', d: 'Pipeline generation and content marketing.' },
  { n: '02', k: 'D2C & E-COMMERCE', d: 'Performance marketing and conversion optimisation.' },
  { n: '03', k: 'PROFESSIONAL SERVICES', d: 'Legal · Financial · Consulting — brand authority and referral systems.' },
  { n: '04', k: 'SVARA PRODUCT CLIENTS', d: 'Growth services alongside SVARA product implementations.' },
  { n: '05', k: 'MID-MARKET ENTERPRISES', d: 'Transitioning from traditional to digital-first growth models.' },
]

export interface Package { n: string; k: string; scope: string[]; v: string; note?: string }
export const COMMERCIAL: Package[] = [
  { n: '01', k: 'GROWTH STARTER', scope: ['SEO', 'Social management', 'Monthly reporting', '1 brand'], v: '₹40,000–₹90,000 / month' },
  { n: '02', k: 'GROWTH ENGINE', scope: ['Full-funnel marketing system', 'Paid campaigns', 'Content', 'PR'], v: '₹1.5L–₹4L / month', note: '+ ad spend' },
  { n: '03', k: 'ENTERPRISE GROWTH', scope: ['Dedicated team', 'AI content engine', 'Brand intelligence', 'PR'], v: '₹5L–₹15L / month' },
  { n: '04', k: 'PERFORMANCE-BASED', scope: ['Base retainer', '+ % of qualified leads or attributed revenue'], v: 'Negotiated per client objective' },
]

export const CC_TELEMETRY = ['DATA', 'ACQUISITION', 'CONVERSION', 'RETENTION', 'INTELLIGENCE']
export const CC_PANELS = ['TRAFFIC', 'LEADS', 'CONTENT', 'BRAND', 'SOCIAL', 'CAMPAIGNS', 'ATTRIBUTION', 'RETENTION']
