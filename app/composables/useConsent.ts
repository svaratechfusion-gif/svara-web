/**
 * Cookie consent state — SSR-truthful, no flash, no hydration mismatch.
 *
 * ── why a cookie and not localStorage ──────────────────────────────────────
 * The banner must exist in the server-rendered HTML: a consent control that only
 * appears after hydration is invisible to assistive tech on first paint and gone
 * entirely without JS. That rules out `<ClientOnly>` (how the chatbot mounts) and
 * therefore rules out localStorage, which the server cannot read. `useCookie` is
 * read INSIDE a `useState` initializer, so the server decodes the real request
 * cookie, the decoded object travels in the Nuxt payload, and the client reuses
 * it without re-running the initializer. Server HTML and first client vdom are
 * identical, and a returning visitor's HTML simply has no banner in it.
 *
 * ── one read path ─────────────────────────────────────────────────────────
 * Every `useCookie()` call returns an INDEPENDENT ref — writing one does not
 * update another. So `useState(STATE_KEY)` is the only place anything reads
 * consent from, and `commit()` is the only place anything writes it.
 *
 * ── the site currently sets no cookies at all ──────────────────────────────
 * Verified: no analytics dependency, no tracker in nuxt.config, and nothing in
 * app/ lib/ server/ touches document.cookie or storage. This preference cookie
 * is the first, and it is itself "cookie preference management" — which the
 * Cookie Policy lists under Strictly Necessary. When analytics is added later,
 * gate it on `consent.value.analytics` and the contract already holds.
 */
import { computed } from 'vue'
import { COOKIE_POLICY_VERSION } from '~~/lib/content/cookies'

/** Categories, in the order the policy and the console present them. */
export const CONSENT_CATEGORIES = ['necessary', 'analytics', 'functional', 'marketing'] as const
export type ConsentCategory = typeof CONSENT_CATEGORIES[number]

export interface ConsentRecord {
  /** Storage-format version, so the shape can change without misreading old values. */
  v: 1
  /** Which Cookie Policy version was accepted — a material policy change re-prompts. */
  policy: string
  /** Epoch ms the choice was made. Part of the consent record a regulator may ask for. */
  at: number
  necessary: true
  analytics: boolean
  functional: boolean
  marketing: boolean
}

const COOKIE_NAME = 'svara_consent'
const STATE_KEY = 'cookie-consent'
/** Re-ask after a year, the common ceiling for consent freshness. */
const MAX_AGE_S = 60 * 60 * 24 * 365

const DENY_ALL: Omit<ConsentRecord, 'v' | 'policy' | 'at'> = {
  necessary: true, analytics: false, functional: false, marketing: false,
}

/** Compact, explicitly encoded — `useCookie` runs `destr` on read by default and
 *  would coerce a bare "1" to a number, so both directions are pinned here. */
function encode(r: ConsentRecord): string {
  return [r.v, r.policy, r.at, +r.analytics, +r.functional, +r.marketing].join('~')
}
function decode(raw: string | null | undefined): ConsentRecord | null {
  if (!raw || typeof raw !== 'string') return null
  const [v, policy, at, a, f, m] = raw.split('~')
  if (v !== '1' || !policy || !at) return null
  const ts = Number(at)
  if (!Number.isFinite(ts)) return null
  // Expiry is resolved HERE, during the useState initializer, and never in a
  // computed or a template — a Date.now() in render is the likeliest source of a
  // hydration mismatch in this design.
  if (Date.now() - ts > MAX_AGE_S * 1000) return null
  if (policy !== COOKIE_POLICY_VERSION) return null // material policy change → re-ask
  return { v: 1, policy, at: ts, necessary: true, analytics: a === '1', functional: f === '1', marketing: m === '1' }
}

export function useConsent() {
  const cookie = useCookie<string | null>(COOKIE_NAME, {
    maxAge: MAX_AGE_S,
    sameSite: 'lax',
    path: '/',
    secure: import.meta.env.PROD,
    // no httpOnly: the client must be able to act on the choice
    encode: v => v ?? '',
    decode: v => v || null,
  })

  /** The single source of truth. Null = no valid decision on record. */
  const record = useState<ConsentRecord | null>(STATE_KEY, () => decode(cookie.value))

  /** Whether the banner should be shown at all. Server-knowable, so the banner
   *  is simply absent from a returning visitor's HTML. */
  const needsDecision = computed(() => record.value === null)

  /** Has the visitor allowed this category? `necessary` is always true. */
  const allows = (c: ConsentCategory) =>
    c === 'necessary' ? true : Boolean(record.value?.[c])

  function commit(choice: Partial<Record<ConsentCategory, boolean>>) {
    const next: ConsentRecord = {
      v: 1,
      policy: COOKIE_POLICY_VERSION,
      at: Date.now(), // an event handler, never render — safe
      necessary: true,
      analytics: Boolean(choice.analytics),
      functional: Boolean(choice.functional),
      marketing: Boolean(choice.marketing),
    }
    record.value = next
    cookie.value = encode(next)
  }

  const acceptAll = () => commit({ analytics: true, functional: true, marketing: true })
  /** Reject must be exactly as easy as accept — one call, one click, same depth. */
  const rejectAll = () => commit({ ...DENY_ALL })

  /**
   * Clears the stored decision entirely, so the dock asks again from scratch.
   *
   * NOT what the "withdraw consent" control uses. Withdrawing should RECORD a
   * refusal — erasing the record instead loses the fact that the visitor
   * actively said no, and re-prompts someone who has already answered. Use
   * `rejectAll()` for withdrawal; this exists for a genuine reset (e.g. a
   * policy change or a support request).
   */
  function reset() {
    record.value = null
    cookie.value = null
  }

  return { record, needsDecision, allows, commit, acceptAll, rejectAll, reset }
}

/**
 * Which ground the consent layer is sitting on. The layer mounts in app.vue,
 * outside every page root, so it inherits none of the page-scoped dark sheets'
 * flipped --ink-* values and has to resolve the route itself. Same list the
 * notch nav inverts against; the site 301s to trailing slashes, so normalise.
 */
const DARK_GROUND = new Set([
  '/', '/products', '/technology', '/architecture',
  '/investors', '/blog', '/about', '/divisions', '/contact', '/careers',
])

export function useConsentTheme() {
  const route = useRoute()
  return computed(() => {
    const path = route.path.length > 1 ? route.path.replace(/\/+$/, '') : route.path
    return DARK_GROUND.has(path) ? 'dark' : 'light'
  })
}

/** Opens the preferences console from anywhere (footer, cookie policy page). */
export function useConsentConsole() {
  return useState<boolean>('cookie-consent-console', () => false)
}
