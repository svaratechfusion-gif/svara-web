// SVARA AUTONOMOUS AGENTS & VOICE AI — verbatim content for the immersive Explore experience.
// Factored out of AgentsExplore.vue to keep the component focused on structure, interaction and
// styling. All strings / figures are VERBATIM from the source (P05); nothing is invented.

export interface KV { k: string; v: string }
export interface Titled { t: string; b: string }

export const HERO_LINES = ['Agents that work.', 'Humans that decide.'] as const
export const BOOT: KV[] = [
  { k: 'AGENT PERCEPTION', v: 'ONLINE' },
  { k: 'PLANNING', v: 'ONLINE' },
  { k: 'EXECUTION', v: 'READY' },
  { k: 'LEARNING', v: 'ACTIVE' },
]
export const HEAD_STATUS: KV[] = [
  { k: 'AGENTS', v: 'ACTIVE' },
  { k: 'TASKS', v: 'RUNNING' },
  { k: 'TOOLS', v: 'CONNECTED' },
]
export const HERO_SYSTEMS = ['CRM', 'ERP', 'HR', 'FINANCE', 'SUPPORT', 'EMAIL', 'DOCUMENTS', 'APIs', 'WORKFLOWS']
export const HERO_PATH = ['REQUEST', 'AGENT', 'CRM', 'EMAIL', 'ERP', 'APPROVAL', 'RESULT']

export const TRAD_CHAIN = ['REQUEST', 'HUMAN', 'INTERPRET', 'TOOL', 'HUMAN', 'ACTION', 'HUMAN', 'RESULT']
export const SVARA_CHAIN = ['REQUEST', 'AGENT', 'PLAN', 'ACT', 'REASON', 'COMMUNICATE', 'RESULT']

export interface LoopNode {
  n: string; k: string; t: string
  obj?: string; normal?: string[]; flow?: string[]; list?: string[]; options?: string[]; note?: string
}
export const LOOP: LoopNode[] = [
  { n: '01', k: 'PERCEIVE', t: 'Reads inputs.', list: ['EMAILS', 'CRM', 'ERP', 'FORMS', 'DOCUMENTS', 'APIs', 'SYSTEM EVENTS'], note: 'INPUT DETECTED → CONTEXT UNDERSTOOD' },
  { n: '02', k: 'PLAN', t: 'Decomposes goals.', obj: '“Prepare and process a new customer account.”', flow: ['COLLECT DOCUMENTS', 'VERIFY INFORMATION', 'CHECK KYC', 'CREATE ACCOUNT', 'TRIGGER PROVISIONING', 'NOTIFY CUSTOMER'] },
  { n: '03', k: 'ACT', t: 'Executes across systems.', list: ['API CALL', 'DATABASE UPDATE', 'EMAIL SENT', 'FORM COMPLETED', 'WORKFLOW TRIGGERED', 'CRM UPDATED'], note: 'The agent does not merely recommend — it executes.' },
  { n: '04', k: 'REASON', t: 'Handles exceptions.', normal: ['VALID', 'APPROVE', 'COMPLETE'], flow: ['DISCREPANCY DETECTED', 'AGENT ANALYSES CONTEXT'], options: ['RETRY', 'REQUEST INFORMATION', 'ESCALATE'], note: 'Agents reason through unexpected situations instead of stopping.' },
  { n: '05', k: 'COMMUNICATE', t: 'Reports outcomes.', flow: ['TASK COMPLETE'], list: ['STATUS UPDATE', 'RESULT', 'NEXT ACTION', 'STAKEHOLDER NOTIFICATION', 'ESCALATION'], note: 'The right stakeholder, in the appropriate format.' },
  { n: '06', k: 'LEARN', t: 'Improves with use.', flow: ['OUTCOME', 'FEEDBACK', 'ANALYSIS', 'MODEL / PROMPT OPTIMISATION', 'IMPROVED EXECUTION'], note: 'Better through feedback, outcome analysis and continuous fine-tuning.' },
]

export interface AgentChain { n: string; k: string; chain: string[] }
export const TASK_AGENTS: AgentChain[] = [
  { n: '01', k: 'LEAD QUALIFICATION AGENT', chain: ['MONITOR', 'SCORE', 'ENRICH CRM', 'SCHEDULE FOLLOW-UP'] },
  { n: '02', k: 'INVOICE PROCESSING AGENT', chain: ['EXTRACT', 'VALIDATE PO', 'FLAG DISCREPANCY', 'APPROVAL', 'ACCOUNTING'] },
  { n: '03', k: 'HR ONBOARDING AGENT', chain: ['COLLECT DOCUMENTS', 'IT PROVISIONING', 'TRAINING', 'INDUCTION'] },
  { n: '04', k: 'PROCUREMENT AGENT', chain: ['MONITOR STOCK', 'GENERATE PO', 'APPROVAL', 'TRACK DELIVERY', 'UPDATE INVENTORY'] },
  { n: '05', k: 'COMPLIANCE MONITORING AGENT', chain: ['CONTINUOUS MONITORING', 'TRANSACTION ANALYSIS', 'POLICY CHECK', 'ALERT'] },
]

export interface CustomerAgent { n: string; k: string; items: string[]; tag?: string }
export const CUSTOMER_AGENTS: CustomerAgent[] = [
  { n: '01', k: 'SALES AGENT', items: ['Qualifies leads', 'Answers product questions', 'Handles objections', 'Books demos', 'Follows up'], tag: '24/7' },
  { n: '02', k: 'SUPPORT AGENT', items: ['Tier 1 & Tier 2', 'Resolve', 'Escalate', 'Provide full context', 'Learn from resolutions'] },
  { n: '03', k: 'COLLECTIONS AGENT', items: ['Personalised reminders', 'Installment negotiations', 'Document collection'], tag: 'Empathetic · Compliant' },
  { n: '04', k: 'ONBOARDING AGENT', items: ['Guides new customers', 'Captures information', 'Answers questions in real time'] },
  { n: '05', k: 'FEEDBACK AGENT', items: ['Post-interaction surveys', 'Sentiment analysis', 'Escalation routing'] },
]

export const VOICE_PIPE = ['VOICE INPUT', 'INTENT DETECTION', 'AGENT REASONING', 'SYSTEM ACTION', 'VOICE RESPONSE']
export const INBOUND_CHAIN = ['INBOUND CALL', 'UNDERSTANDING INTENT', 'INTENT: ACCOUNT QUERY', 'CRM LOOKUP', 'RESPONSE GENERATED']
export const OUTBOUND_META: KV[] = [
  { k: 'CAMPAIGN', v: 'RENEWALS' },
  { k: 'AGENTS', v: 'ACTIVE' },
  { k: 'CONTACTS', v: 'QUEUED' },
]
export const OUTBOUND_CHAIN = ['CALL', 'PERSONALISED MESSAGE', 'RESPONSE', 'NEXT ACTION']
export const OUTBOUND_USES = ['REMINDERS', 'RENEWALS', 'COLLECTIONS', 'RE-ENGAGEMENT']
export const V2A_CHAIN = ['UNDERSTAND', 'CREATE REPORT', 'CHECK SYSTEM', 'SCHEDULE MAINTENANCE', 'CONFIRM']
export const LANGS = ['ENGLISH', 'हिन्दी', 'REGIONAL INDIAN LANGUAGES']
export const EMOTION_CHAIN = ['VOICE SIGNAL', 'SENTIMENT / EMOTION ANALYSIS', 'FRUSTRATION DETECTED', 'PRIORITY ESCALATION']

export interface OrchAgent { k: string; task: string }
export const ORCH_AGENTS: OrchAgent[] = [
  { k: 'SALES', task: 'CUSTOMER DETAILS' },
  { k: 'FINANCE', task: 'PAYMENT / ACCOUNT' },
  { k: 'COMPLIANCE', task: 'VERIFICATION' },
  { k: 'OPERATIONS', task: 'PROVISIONING' },
  { k: 'CUSTOMER SUCCESS', task: 'WELCOME / TRAINING' },
]
export const SHARED_MEMORY = ['SALES AGENT', 'CUSTOMER CONTEXT', 'FINANCE AGENT', 'COMPLIANCE AGENT', 'OPERATIONS AGENT']
export const ESCALATION_CHAIN = ['HIGH-RISK DECISION', 'AGENT ANALYSES', 'HUMAN JUDGMENT REQUIRED', 'ESCALATION', 'FULL BRIEFING PROVIDED']

export interface AuditRow { ts: string; agent: string; action: string; reason: string; result: string }
export const AUDIT: AuditRow[] = [
  { ts: '10:42:18', agent: 'PROCUREMENT AGENT', action: 'PO CREATED', reason: 'STOCK BELOW THRESHOLD', result: 'SUCCESS' },
  { ts: '10:42:22', agent: 'FINANCE AGENT', action: 'APPROVAL REQUESTED', reason: 'VALUE > THRESHOLD', result: 'PENDING' },
  { ts: '10:42:31', agent: 'HUMAN ESCALATION', action: 'REVIEW REQUIRED', reason: '—', result: 'SUCCESS' },
]

export const INTEGRATION_APIS = ['REST', 'GRAPHQL', 'SOAP']
export const INTEGRATION_SYSTEMS = ['CRM', 'ERP', 'HR', 'SUPPORT DESK', 'MARKETING', 'FINANCE']
export const WORKFLOW_STEPS: KV[] = [
  { k: 'TRIGGER', v: 'NEW FORM SUBMITTED' },
  { k: 'AGENT', v: 'QUALIFY' },
  { k: 'AGENT', v: 'ENRICH CRM' },
  { k: 'AGENT', v: 'SEND FOLLOW-UP' },
  { k: 'AGENT', v: 'SCHEDULE DEMO' },
  { k: 'END', v: 'COMPLETE' },
]
export const WEBHOOKS = ['FORM SUBMISSION', 'EMAIL RECEIVED', 'THRESHOLD BREACH', 'SYSTEM EVENT']
export const ONEAIOS_CHAIN = ['AGENT COORDINATOR', 'SUPPORT AGENT', 'ANALYSIS', 'ROUTING', 'REPORT']

export interface FnEnv {
  k: string; caps: string[]; outcome: string[]
  tel: { a: number; t: number; au: number; e: number }
}
export const FUNCTIONS: FnEnv[] = [
  { k: 'SALES & REVENUE', caps: ['Lead scoring', 'Follow-up sequences', 'Proposal generation', 'Demo scheduling'], outcome: ['2–3× pipeline throughput', '40% reduction in sales cycle length'], tel: { a: 6, t: 31, au: 19, e: 2 } },
  { k: 'CUSTOMER OPERATIONS', caps: ['Query resolution', 'Onboarding', 'Renewals', 'Support tickets'], outcome: ['70% Tier 1 automation', '15–25% CSAT improvement'], tel: { a: 8, t: 44, au: 26, e: 3 } },
  { k: 'FINANCE & ACCOUNTING', caps: ['Invoice processing', 'Expense management', 'Reconciliation', 'Audit preparation'], outcome: ['80% reduction in manual finance task hours'], tel: { a: 4, t: 28, au: 17, e: 2 } },
  { k: 'HR & PEOPLE OPS', caps: ['Onboarding', 'Leave management', 'Policy Q&A', 'Performance data collection'], outcome: ['HR team capacity freed for strategic work'], tel: { a: 5, t: 22, au: 14, e: 1 } },
  { k: 'IT & OPERATIONS', caps: ['Helpdesk automation', 'Incident routing', 'System monitoring', 'Access provisioning'], outcome: ['60% reduction in IT ticket volume requiring human intervention'], tel: { a: 7, t: 39, au: 23, e: 2 } },
]

export interface Tier { n: string; k: string; spec: string[]; v: string }
export const COMMERCIAL: Tier[] = [
  { n: '01', k: 'AGENT STARTER', spec: ['3 pre-built agents', 'Deployment', '90-day optimisation support'], v: '₹1.5L–₹4L / month' },
  { n: '02', k: 'BUSINESS AUTOMATION SUITE', spec: ['10 agents', 'Voice AI', 'SVARA CRM integration', 'Multi-agent workflows'], v: '₹6L–₹18L / month' },
  { n: '03', k: 'ENTERPRISE AGENTIC PLATFORM', spec: ['Unlimited agents', 'Custom builds', 'Orchestration', 'Managed service'], v: '₹20L–₹80L / month' },
  { n: '04', k: 'IMPLEMENTATION', spec: ['Agent design', 'Integration', 'Training', 'Testing', 'Go-live'], v: '₹5L–₹50L one-time' },
]

export const FINAL_TELEMETRY: KV[] = [
  { k: 'AGENTS ACTIVE', v: '12' },
  { k: 'TASKS RUNNING', v: '47' },
  { k: 'SYSTEMS CONNECTED', v: '18' },
  { k: 'VOICE SESSIONS', v: '09' },
  { k: 'HUMAN ESCALATIONS', v: '03' },
]
export const FINAL_AGENTS = ['SALES', 'FINANCE', 'HR', 'OPERATIONS', 'SUPPORT', 'COMPLIANCE']
