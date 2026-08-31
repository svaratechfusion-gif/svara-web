---
tags: [website, backend, stable]
updated: 2026-07-13
---

# Contact — `/contact`

`app/pages/contact.vue` renders `app/components/ui/ContactForm.vue`, which posts to
`server/api/contact.post.ts` (a Nuxt server route — the SVARA equivalent of the Next16
starter's `app/api/<resource>/route.ts` convention, arrived at independently).

## API contract

```
POST /api/contact
Body:    { name, email, message, inquiryType?, company_url? }
200      { ok: true }
400      { ok: false, error }              — missing/invalid fields
429      { ok: false, error }              — rate limited
```

- **Validation** — required fields, length caps (name ≤120, email ≤200, message ≤5000), an
  email-shape regex. Invalid input never reaches the log/send path.
- **Honeypot** — `company_url` must stay empty; a filled value returns `200 { ok: true }`
  silently (no ack leak to bots probing for the trap).
- **Rate limit** — in-memory per-IP counter, 5 requests / 10 minutes. Documented as
  "sufficient for a static deploy; swap to an upstream Redis later if needed" — revisit if the
  deploy target changes to something horizontally scaled (in-memory state won't be shared
  across instances).
- **Current behavior** — Phase 1 logs the submission server-side (`console.info`) and
  acknowledges; SMTP/CRM forwarding is an explicit follow-up once real credentials exist. The
  response contract (`{ ok, error }`) is meant to stay stable across that follow-up.

This is a genuinely good local convention worth reusing for any future `server/api/*` route —
validate → rate-limit-if-relevant → structured `{ ok, error }` (or `{ data, error }`) response
→ never leak internals in the error message.

## Related

[[Home]] · [[Folder Structure]]
