// SVARA ONE AI OS — verbatim content for the immersive Explore experience. Factored out of
// AiosExplore.vue / AiosConsole.vue to keep the components focused. All strings / figures are
// VERBATIM from the source (P07); nothing is invented. Console responses are process-oriented
// (which systems / agents / permissions) — no fabricated business metrics (source uses placeholder
// / demonstration data).

export interface KV { k: string; v: string }

export const HERO_LINES = ["Don’t use software.", 'Command intelligence.'] as const
export const BOOT: KV[] = [
  { k: 'SYSTEMS', v: 'CONNECTED' }, { k: 'AGENTS', v: 'ACTIVE' },
  { k: 'ORCHESTRATION', v: 'READY' }, { k: 'COMMAND', v: 'ONLINE' },
]
export const HEAD_STATUS: KV[] = [
  { k: 'SYSTEMS', v: 'CONNECTED' }, { k: 'AGENTS', v: 'ACTIVE' }, { k: 'COMMANDS', v: 'READY' },
]
export const CORE_SYSTEMS = ['CRM', 'ERP', 'HR', 'FINANCE', 'OPERATIONS', 'MARKETING', 'SAAS', 'DOCUMENTS', 'DATABASES', 'SVARA SYSTEMS']

export const PROBLEM_APPS = ['CRM', 'ERP', 'HR', 'FINANCE', 'PROJECT MANAGEMENT', 'MARKETING', 'SUPPORT', 'DOCUMENTS', 'DATABASE']
export const OLD_WAY = ['OPEN CRM', 'FIND ACCOUNT', 'OPEN REPORT', 'EXPORT DATA', 'OPEN SPREADSHEET', 'CREATE FORECAST', 'EMAIL TEAM']
export const NEW_WAY = ['UNDERSTANDING INTENT', 'CRM', 'ANALYTICS', 'ACCOUNT RISK MODEL', 'CALENDAR', 'EXECUTION']
export const COMMAND_EXAMPLE = 'Generate a sales forecast, flag the at-risk accounts, and schedule follow-up calls for the bottom 10%.'

export const INTENT_PIPE = ['COMMAND RECEIVED', 'INTENT DETECTED', 'CONTEXT RESOLVED', 'SYSTEMS REQUIRED', 'ACTIONS PLANNED', 'READY TO EXECUTE']
export const CONTEXT_ITEMS = ['CONVERSATION HISTORY', 'USER ROLE', 'PAST ACTIONS', 'ORGANISATIONAL PREFERENCES']
export const ACCESS_GRANTED = ['OPERATIONS', 'REPORTING', 'APPROVED SYSTEMS']
export const ACCESS_RESTRICTED = ['FINANCE ADMIN', 'HR PRIVATE DATA']
export const AUDIT: KV[] = [
  { k: 'COMMAND', v: 'Generate quarterly forecast' },
  { k: 'REASONING STEP', v: 'Aggregate sales data' },
  { k: 'SYSTEM ACTION', v: 'CRM queried' },
  { k: 'SYSTEM ACTION', v: 'Forecast model executed' },
  { k: 'SYSTEM ACTION', v: 'Risk accounts identified' },
]

export const CONNECTORS = ['SALESFORCE', 'SAP', 'ZOHO', 'TALLY', 'QUICKBOOKS', 'WORKDAY', 'FRESHDESK', 'WHATSAPP', 'GOOGLE WORKSPACE', 'MICROSOFT 365']
export const ECO_CONNECT = ['VISION INTELLIGENCE', 'DRONE', 'AUTONOMOUS AGENTS', 'CRM', 'ERP', 'SAAS MODULES', 'DIGITAL TWIN', 'EDGE AI']
export const DATA_SOURCES = ['SQL', 'NoSQL', 'DATA WAREHOUSE', 'PDF', 'EXCEL', 'EMAIL', 'REPORTS']

export const ORCH_AGENTS = ['RESEARCH AGENT', 'DATA AGENT', 'ANALYSIS AGENT', 'REPORT AGENT', 'BRIEFING AGENT']
export const ORCH_STATUS = ['ACTIVE', 'ACTIVE', 'COMPLETE', 'WAITING', 'WAITING']
export interface ChainStep { a: string; t: string }
export const AGENT_CHAIN: ChainStep[] = [
  { a: 'AGENT A', t: 'Research' }, { a: 'AGENT B', t: 'Analyse' }, { a: 'AGENT C', t: 'Generate' },
  { a: 'AGENT D', t: 'Validate' }, { a: 'AGENT E', t: 'Deliver' },
]
export interface PriorityAgent { a: string; p: string }
export const PRIORITY: PriorityAgent[] = [
  { a: 'AGENT A', p: 'HIGH PRIORITY' }, { a: 'AGENT B', p: 'MEDIUM' }, { a: 'AGENT C', p: 'RESOURCE CONFLICT' },
]
export const ARBITRATION = ['PRIORITISING', 'RESOURCE ALLOCATION', 'EXECUTION ORDER']
export interface MonitorRow { agent: string; task: string; status: string; progress: number }
export const MONITOR: MonitorRow[] = [
  { agent: 'SALES AGENT', task: 'Forecast', status: 'RUNNING', progress: 72 },
  { agent: 'DATA AGENT', task: 'Data validation', status: 'COMPLETE', progress: 100 },
  { agent: 'REPORT AGENT', task: 'Briefing', status: 'QUEUED', progress: 0 },
]

export const CMD_PANELS = ['SECURITY ALERTS', 'AGENT ACTIVITY', 'SAAS METRICS', 'MARKETING PERFORMANCE', 'IoT STATUS', 'SYSTEM HEALTH']
export const ALERTS: KV[] = [{ k: 'CRITICAL', v: '3' }, { k: 'IMPORTANT', v: '8' }, { k: 'INFORMATIONAL', v: '27' }]
export const BRIEFING_INDICATORS = ['REVENUE', 'OPERATIONS', 'SALES', 'RISK', 'ANOMALIES']
export const MOBILE_TABS = ['COMMAND', 'ALERTS', 'AGENTS', 'SYSTEMS', 'BRIEFING']

export interface EcoCard { k: string; cmd: string; flow: string[]; done: string }
export const ECO_CARDS: EcoCard[] = [
  { k: 'VISION INTELLIGENCE', flow: ['500 CAMERAS', 'PRIORITISED SECURITY ALERTS', 'ONE AI OS'], cmd: '“Lock down the affected zone.”', done: 'VOICE COMMAND EXECUTED' },
  { k: 'DRONE INTELLIGENCE', flow: ['DRONE TASK CREATED', 'MISSION READY'], cmd: '“Launch drone to investigate the alert at Gate 7.”', done: 'No manual flight planning.' },
  { k: 'AUTONOMOUS AGENTS', flow: ['CREATE', 'MODIFY', 'MONITOR'], cmd: '“Create a workflow to monitor these operations.”', done: 'No-code agent workflow.' },
  { k: 'BUSINESS SaaS', flow: ['CRM', 'HR', 'FINANCE', 'ONE ANSWER'], cmd: '“How is Q3 comparing to plan across all divisions?”', done: '' },
  { k: 'DIGITAL TWIN', flow: ['DIGITAL TWIN', 'SIMULATION', 'PREDICTED OUTCOME'], cmd: '“Model what happens if we add a second shift to Line 3 in July.”', done: '' },
]

export interface StackLayer { k: string; items?: string[] }
export const STACK: StackLayer[] = [
  { k: 'HUMAN COMMAND' },
  { k: 'ONE AI OS' },
  { k: 'ORCHESTRATION' },
  { k: 'AGENTS' },
  { k: 'SVARA PRODUCTS', items: ['Vision', 'Drone', 'Edge', 'Digital Twin', 'SaaS'] },
  { k: 'ENTERPRISE SYSTEMS', items: ['CRM', 'ERP', 'HR', 'Finance', 'Documents', 'Databases', 'APIs'] },
]

export interface Client { n: string; k: string; d: string }
export const CLIENTS: Client[] = [
  { n: '01', k: 'MID-MARKET ENTERPRISES', d: '100–2,000 employees' },
  { n: '02', k: 'SVARA ENTERPRISE CUSTOMERS', d: 'Unified command layer' },
  { n: '03', k: 'AI-NATIVE TRANSFORMATION', d: 'Single interface for transition' },
  { n: '04', k: 'GOVERNMENT', d: 'Multiple operational systems and diverse non-technical users' },
  { n: '05', k: 'INDUSTRY CONGLOMERATES', d: 'Cross-division intelligence and executive visibility' },
]

export interface Tier { n: string; k: string; spec: string[]; v: string }
export const COMMERCIAL: Tier[] = [
  { n: '01', k: 'STARTER AI OS', spec: ['Up to 5 system integrations', '25 users', 'Standard AI models'], v: '₹1L–₹3L / month' },
  { n: '02', k: 'BUSINESS AI OS', spec: ['Up to 20 integrations', '100 users', 'Agents', 'Workflow automation'], v: '₹4L–₹12L / month' },
  { n: '03', k: 'ENTERPRISE AI OS', spec: ['Unlimited integrations', 'Unlimited users', 'Full agent orchestration', 'Custom models'], v: '₹15L–₹60L / month' },
  { n: '04', k: 'SVARA ECOSYSTEM LICENSE', spec: ['AI OS included as platform license for the full SVARA product suite'], v: 'Bundled with SVARA suite pricing' },
]

export const SIM_CHAIN = ['UNDERSTANDING', 'CONTEXT', 'SYSTEMS REQUIRED', 'AGENTS REQUIRED', 'DATA SOURCES', 'EXECUTION']
export const FINAL_TEL: KV[] = [
  { k: 'SYSTEMS', v: '24 CONNECTED' }, { k: 'AGENTS', v: '12 ACTIVE' }, { k: 'DATA SOURCES', v: '38' }, { k: 'COMMAND STATUS', v: 'READY' },
]
export const FINAL_CHIPS = ['SHOW ALERTS', 'ANALYSE SALES', 'RUN FORECAST', 'CHECK OPERATIONS', 'START WORKFLOW', 'ASK SVARA']

// ── working command console ───────────────────────────────────────────────────
export const CONSOLE_GREETING = 'ONE AI OS online. Command your business in natural language — type a command, or pick one below.'
export const CONSOLE_ROTATING = [
  'Show me today’s critical alerts.',
  'How is Q3 comparing to plan across all divisions?',
  'Find the accounts most likely to churn this quarter.',
  'Launch the workflow.',
  'Summarise yesterday’s operations.',
  'Model what happens if we add a second shift to Line 3 in July.',
]
export interface Intent { match: string[]; steps: string[]; result: string; gate?: boolean }
export const INTENTS: Intent[] = [
  { match: ['forecast', 'at-risk', 'bottom 10', 'sales forecast', 'follow-up call'], steps: ['UNDERSTANDING INTENT', 'CRM', 'ANALYTICS', 'ACCOUNT RISK MODEL', 'CALENDAR', 'EXECUTION'], result: 'Forecast generated, at-risk accounts flagged, and follow-up calls scheduled for the bottom 10%. Task complete.' },
  { match: ['q3', 'comparing to plan', 'all divisions', 'divisions'], steps: ['ANALYSING CRM', 'ANALYSING FINANCE', 'ANALYSING OPERATIONS'], result: 'Pulled from CRM, HR and Finance — one unified answer assembled across all divisions.' },
  { match: ['churn'], steps: ['UNDERSTANDING INTENT', 'CRM', 'ANALYTICS', 'ACCOUNT RISK MODEL'], result: 'Accounts most likely to churn this quarter identified and ranked.' },
  { match: ['alert', 'critical'], steps: ['ANALYSING RELEVANCE', 'PRIORITISING'], result: 'Critical 3 · Important 8 · Informational 27 — the highest-priority actions are surfaced first.' },
  { match: ['briefing', 'executive', 'summarise', 'operations'], steps: ['UNDERSTANDING', 'CONTEXT', 'SYSTEMS REQUIRED', 'AGENTS REQUIRED', 'DATA SOURCES', 'EXECUTION'], result: 'Research, Data, Analysis, Report and Briefing agents orchestrated — the executive briefing is ready.' },
  { match: ['second shift', 'line 3', 'model what happens', 'simulate'], steps: ['DIGITAL TWIN', 'SIMULATION', 'PREDICTED OUTCOME'], result: 'Digital Twin simulated the second shift on Line 3 for July — predicted outcome returned. The physical system stays untouched.' },
  { match: ['drone', 'gate 7', 'investigate'], steps: ['DRONE TASK CREATED', 'MISSION READY'], result: 'Drone dispatched to investigate Gate 7 — no manual flight planning required.' },
  { match: ['lock down', 'lockdown', 'zone'], steps: ['VISION INTELLIGENCE', 'AFFECTED ZONE'], result: 'Affected zone locked down via Vision Intelligence — voice command executed.' },
  { match: ['workflow'], steps: ['CREATE', 'MODIFY', 'MONITOR'], result: 'No-code agent workflow created and now monitoring the specified operations.' },
  { match: ['approve payment', 'payment', 'approve'], steps: ['HIGH-STAKES ACTION', 'HUMAN APPROVAL REQUIRED'], result: 'This is a high-stakes action — human approval is required before execution.', gate: true },
]
export const DEFAULT_RESPONSE: Intent = {
  match: [], steps: ['COMMAND RECEIVED', 'INTENT DETECTED', 'CONTEXT RESOLVED', 'SYSTEMS REQUIRED', 'ACTIONS PLANNED', 'READY TO EXECUTE'],
  result: 'Intent understood — systems located, agents orchestrated, permissions checked, the work executed, and the result returned.',
}
export function matchIntent(text: string): Intent {
  const t = text.toLowerCase()
  return INTENTS.find((i) => i.match.some((m) => t.includes(m))) ?? DEFAULT_RESPONSE
}
