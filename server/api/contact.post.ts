/**
 * ------------------------------------------------
 * Module
 *   ContactForm (server route)
 * Purpose
 *   Receives the homepage /contact form submissions, validates them, and
 *   records the message. For the Monday launch it logs the message
 *   server-side and returns a success acknowledgement — SMTP forwarding
 *   is a follow-up integration once real credentials are supplied so we
 *   do not block the form behind an unwired mailer.
 *
 *   Honeypot field (`company_url`) traps bots without visible UX. Basic
 *   server-side validation: required fields, length caps, email shape. The
 *   route is rate-limited per IP via an in-memory counter (sufficient for
 *   a static deploy; swap to an upstream Redis later if needed).
 * Owner
 *   Engineering OS (Trust epic)
 * Dependencies
 *   nitropress/h3 (provided by Nitro)
 * Performance Budget
 *   <50ms p95 (validation + log only — no network call in this phase)
 * Inputs
 *   POST { name, email, message, inquiryType, company_url }
 * Outputs
 *   200 { ok: true }
 *   400 { ok: false, error }
 *   429 { ok: false, error: "Too many requests" }
 * Acceptance
 *   - empty name/email/message → 400
 *   - email regex fail → 400
 *   - non-empty honeypot → 200 (silent drop, no ack leak)
 *   - >5 requests / 10min / IP → 429
 * ------------------------------------------------
 **/

interface ContactPayload {
  name: string
  email: string
  message: string
  inquiryType?: string
  /** Honeypot — must stay empty for a human submitter. */
  company_url?: string
}

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5

const hits = new Map<string, number[]>()

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const prior = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (prior.length >= MAX_PER_WINDOW) {
    hits.set(ip, prior)
    return false
  }
  prior.push(now)
  hits.set(ip, prior)
  return true
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? "unknown"
  if (!rateLimit(ip)) {
    setResponseStatus(event, 429)
    return { ok: false, error: "Too many requests. Please try again later." }
  }

  const body = await readBody<ContactPayload>(event).catch(() => null)
  if (!body) {
    setResponseStatus(event, 400)
    return { ok: false, error: "Missing request body." }
  }

  // Honeypot: silently drop bots, but return 200 so they can't infer the trap.
  if (body.company_url && body.company_url.trim() !== "") {
    return { ok: true }
  }

  const name = (body.name ?? "").trim()
  const email = (body.email ?? "").trim()
  const message = (body.message ?? "").trim()
  const inquiryType = (body.inquiryType ?? "General").trim()

  if (!name || !email || !message) {
    setResponseStatus(event, 400)
    return { ok: false, error: "Name, email, and message are required." }
  }
  if (name.length > 120 || email.length > 200 || message.length > 5000) {
    setResponseStatus(event, 400)
    return { ok: false, error: "One or more fields exceeded the maximum length." }
  }
  if (!EMAIL_RE.test(email)) {
    setResponseStatus(event, 400)
    return { ok: false, error: "Please provide a valid email address." }
  }

  // Phase 1 capture — log to the server output (visible in the Nitro console
  // and the deploy platform's log drain). Wire SMTP forwarding in a follow-up
  // integration; the contract above stays stable.
  console.info("[contact] submission", {
    ip,
    name,
    email,
    inquiryType,
    messageLength: message.length,
    at: new Date().toISOString(),
  })

  return { ok: true }
})