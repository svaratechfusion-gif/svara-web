// SVARA UNIFIED BUSINESS CLOUD — verbatim content for the immersive Explore experience. Factored
// out of CloudExplore.vue to keep the component focused. All strings / figures are VERBATIM from
// the source (P08); nothing is invented. The five modules are colour-coded (five hues, one
// platform) — the accents are visual identity only, not source claims.

export interface KV { k: string; v: string }

export const HERO_LINES = ['One platform.', 'Every business function.'] as const
export const HEAD_STATUS: KV[] = [
  { k: 'MODULES', v: '05' }, { k: 'DATA', v: 'UNIFIED' }, { k: 'AI', v: 'ACTIVE' },
]
export const CORE_INNER = ['DATA', 'AI', 'WORKFLOWS', 'BUSINESS INTELLIGENCE']
export const PROBLEM_APPS = ['CRM', 'ERP', 'HR', 'PAYROLL', 'TRAINING', 'SUPPORT']
export const SILOS = ['DATA SILO', 'WORKFLOW SILO', 'INTELLIGENCE SILO']
export const SHARED = ['DATA', 'AI', 'WORKFLOWS', 'COMMANDS']

export interface Group { k: string; items: string[]; chain?: boolean }
export interface BizModule {
  id: string; n: string; k: string; sub: string; pos: string; accent: string
  tiles: string[]; groups: Group[]; links: string[]
}
export const MODULES: BizModule[] = [
  {
    id: 'crm', n: '01', k: 'SVARA CRM', sub: 'Revenue Intelligence Platform', accent: '#43cf8e',
    pos: 'AI-powered customer relationship management designed not to track data, but to grow revenue.',
    tiles: ['LEADS', 'PIPELINE', 'CONVERSION', 'FORECAST', 'TEAM PERFORMANCE', 'AI SIGNALS'],
    groups: [
      { k: 'LEAD CAPTURE → UNIFIED INBOX', items: ['WEBSITE', 'WHATSAPP', 'INSTAGRAM', 'LINKEDIN', 'EMAIL', 'CALL'] },
      { k: 'AI LEAD SCORE', items: ['NEW', 'QUALIFIED', 'HIGH PROBABILITY', 'CONVERT'], chain: true },
      { k: 'PREDICTIVE PIPELINE', items: ['DEAL FORECAST', 'AT-RISK OPPORTUNITIES', 'NEXT BEST ACTION'] },
      { k: 'AUTOMATED FOLLOW-UP', items: ['EMAIL', 'WHATSAPP', 'SMS'] },
      { k: 'SALES COACHING AI', items: ['CALL ANALYSIS', 'INTERACTION SCORE', 'COACHING OPPORTUNITIES'] },
      { k: 'REVENUE DASHBOARD', items: ['PIPELINE', 'CONVERSION RATE', 'TEAM PERFORMANCE', 'FORECAST ACCURACY'] },
    ],
    links: ['erp', 'support'],
  },
  {
    id: 'erp', n: '02', k: 'SVARA ERP', sub: 'Operational Intelligence', accent: '#4d9bff',
    pos: 'Business operations management connecting finance, supply chain, inventory and production in one system.',
    tiles: ['FINANCE', 'INVENTORY', 'PROCUREMENT', 'PRODUCTION', 'PROJECTS', 'AI SPEND ANALYSIS'],
    groups: [
      { k: 'FINANCIAL MANAGEMENT', items: ['GL', 'AP', 'AR', 'MULTI-CURRENCY', 'MULTI-ENTITY', 'GST-COMPLIANT TAX AUTOMATION'] },
      { k: 'INVENTORY', items: ['DEMAND FORECASTING', 'AUTOMATED REORDERING', 'SUPPLIER MANAGEMENT', 'COST TRACKING'] },
      { k: 'PRODUCTION', items: ['BOM', 'WORK ORDERS', 'SHOP FLOOR', 'QUALITY CONTROL'] },
      { k: 'PROJECT MANAGEMENT', items: ['TIME TRACKING', 'RESOURCE ALLOCATION', 'MILESTONE BILLING', 'PROFITABILITY'] },
      { k: 'AI SPEND ANALYSIS', items: ['SUPPLIER COSTS', 'SPEND PATTERNS', 'COST REDUCTION OPPORTUNITIES'] },
    ],
    links: ['crm'],
  },
  {
    id: 'hrms', n: '03', k: 'SVARA HRMS', sub: 'Workforce Intelligence', accent: '#9a86ff',
    pos: 'Human capital management designed for the modern workforce.',
    tiles: ['HIRING', 'EMPLOYEE LIFECYCLE', 'PAYROLL', 'PERFORMANCE', 'RETENTION'],
    groups: [
      { k: 'ATS', items: ['JOB POSTING', 'CANDIDATE PIPELINE', 'AI RESUME SCREENING', 'INTERVIEW SCHEDULING'] },
      { k: 'EMPLOYEE LIFECYCLE', items: ['ONBOARDING', 'CONTRACTS', 'DOCUMENTS', 'POLICIES'] },
      { k: 'PAYROLL', items: ['SALARY', 'TDS', 'PF / ESIC', 'STATUTORY DEDUCTIONS'] },
      { k: 'PERFORMANCE', items: ['OKR', 'KRA', '360 FEEDBACK', 'CALIBRATION'] },
      { k: 'ATTRITION PREDICTION', items: ['FLIGHT RISK', '30–60 DAY RISK WINDOW'] },
    ],
    links: ['lms'],
  },
  {
    id: 'lms', n: '04', k: 'SVARA LMS', sub: 'Learning & Skills Intelligence', accent: '#46d8e6',
    pos: 'AI-driven learning management that builds workforce capabilities at scale.',
    tiles: ['COURSES', 'LEARNING PATHS', 'SKILLS', 'COMPLIANCE', 'KNOWLEDGE'],
    groups: [
      { k: 'COURSE CREATION', items: ['AI-ASSISTED CONTENT', 'DOCUMENTS', 'SOPs', 'VIDEOS'] },
      { k: 'PERSONALISED LEARNING', items: ['ROLE', 'SKILL GAPS', 'PERFORMANCE'] },
      { k: 'SKILLS GAP ANALYSIS', items: ['WORKFORCE CAPABILITIES', 'ROLE REQUIREMENTS', 'INDUSTRY BENCHMARKS'] },
      { k: 'COMPLIANCE', items: ['CERTIFICATION', 'REMINDERS', 'AUDIT REPORTS'] },
      { k: 'KNOWLEDGE RETENTION', items: ['SPACED REPETITION', 'AI QUIZZES'] },
    ],
    links: ['hrms'],
  },
  {
    id: 'support', n: '05', k: 'SVARA SUPPORT DESK', sub: 'Service Intelligence', accent: '#ffab52',
    pos: 'Customer support management that resolves issues faster and learns from every interaction.',
    tiles: ['OMNICHANNEL QUEUE', 'AI CLASSIFICATION', 'RESOLUTION AI', 'SLA MONITORING', 'CUSTOMER HEALTH'],
    groups: [
      { k: 'OMNICHANNEL', items: ['EMAIL', 'WHATSAPP', 'CHAT', 'PHONE', 'SOCIAL MEDIA'] },
      { k: 'AI TICKET CLASSIFICATION', items: ['URGENCY', 'CATEGORY', 'AGENT EXPERTISE'] },
      { k: 'RESOLUTION AI', items: ['KNOWLEDGE BASE', 'SUGGESTED SOLUTION', 'AGENT RESPONSE'], chain: true },
      { k: 'SLA AUTOMATION', items: ['DEADLINE', 'ESCALATION', 'BREACH PREVENTION'] },
      { k: 'CUSTOMER HEALTH', items: ['CHURN RISK — from support interaction patterns'] },
    ],
    links: ['crm'],
  },
]

export interface Advantage { n: string; siloed: string; svara: string }
export const ADVANTAGE: Advantage[] = [
  { n: '01', siloed: 'CRM doesn’t know about support tickets.', svara: 'Sales team sees full support history before every call.' },
  { n: '02', siloed: 'HR doesn’t talk to payroll.', svara: 'Attendance, leaves and performance automatically feed payroll.' },
  { n: '03', siloed: 'ERP has no link to sales pipeline.', svara: 'Deal closures trigger procurement and delivery workflows.' },
  { n: '04', siloed: 'Training completion isn’t linked to performance.', svara: 'LMS completion data informs performance reviews and skill mapping.' },
]

export interface XStep { m: string; t: string }
export const XMOD: XStep[] = [
  { m: 'CRM', t: 'DEAL CLOSED' }, { m: 'ERP', t: 'PROCUREMENT TRIGGERED' }, { m: 'INVENTORY', t: 'STOCK CHECK' },
  { m: 'OPERATIONS', t: 'DELIVERY WORKFLOW' }, { m: 'SUPPORT', t: 'CUSTOMER ONBOARDING' }, { m: 'LMS', t: 'TRAINING ASSIGNED' },
]
export const DATA_SOURCES = ['CRM DATA', 'ERP DATA', 'HR DATA', 'LMS DATA', 'SUPPORT DATA']
export const AI_EXAMPLES: KV[] = [
  { k: 'CRM', v: 'Lead scoring' }, { k: 'ERP', v: 'Spend analysis' }, { k: 'HRMS', v: 'Attrition prediction' },
  { k: 'LMS', v: 'Personalised learning' }, { k: 'SUPPORT', v: 'Resolution AI' },
]
export const CMD_CHAIN = ['ONE AI OS', 'CRM', 'ERP', 'HRMS', 'LMS', 'SUPPORT', 'UNIFIED BUSINESS ANSWER']
export const CC_TELEMETRY = ['BUSINESS HEALTH', 'REVENUE', 'OPERATIONS', 'WORKFORCE', 'CUSTOMERS', 'LEARNING', 'SUPPORT']
export const CC_PANELS = ['REVENUE INTELLIGENCE', 'OPERATIONAL HEALTH', 'WORKFORCE STATUS', 'CUSTOMER HEALTH', 'LEARNING PROGRESS', 'SERVICE STATUS']
export const EXEC_INDICATORS = ['REVENUE', 'OPERATIONS', 'WORKFORCE', 'CUSTOMERS', 'SERVICE', 'LEARNING']

export interface Tier { n: string; k: string; spec: string[]; users: string; v: string }
export const COMMERCIAL: Tier[] = [
  { n: '01', k: 'GROWTH', spec: ['CRM', 'Support Desk', 'Basic HRMS'], users: 'Up to 25 users', v: '₹25,000–₹60,000 / month' },
  { n: '02', k: 'BUSINESS', spec: ['CRM', 'ERP', 'HRMS', 'LMS', 'Support'], users: 'Up to 100 users', v: '₹80,000–₹2.5L / month' },
  { n: '03', k: 'ENTERPRISE', spec: ['Full suite', 'SVARA AI layer', 'Agents', 'Custom modules'], users: 'Unlimited users', v: '₹3L–₹12L / month' },
  { n: '04', k: 'MODULE ADD-ONS', spec: ['Any individual module licensed separately'], users: '', v: '₹8,000–₹35,000 per module / month' },
]
