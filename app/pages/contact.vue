<script setup lang="ts">
// CONTACT — "Noema": a full-viewport WebGL head over a navy god-ray field, then
// the transmission console below it.
//
// The scene is a FIXED full-page layer at z-index -1 and the sections flow up
// over it on a transparent ground — the site's fixed-background model, the same
// composition as divisions / architecture / investors. So the head stays behind
// the page as you read: present, not left behind at the top.
//
// The hero itself is one viewport tall and holds only the overlay. A 50 000-point
// head materialises on a bottom→top scan as the page opens, turns slightly to
// follow the cursor with a soft light burst under it, and sheds its shadow-side
// particles upward while embers rise into it from below. Two display words are
// pinned either side of it, letter-by-letter out of a blur.
//
// Rendering is gated on the HERO's visibility, not the canvas's: a fixed canvas
// never leaves the viewport, so the scene would otherwise animate forever behind
// the form. Scrolling into the sections freezes it on its last frame, which WebGL
// keeps on screen for free.
//
// The Noema reference is a one-viewport site that never scrolls. A contact page
// has to contain a way to make contact, so the scroll stays: the hero's primary
// CTA carries you down to the existing form — the SAME real form, posting the
// same contract to /api/contact, with the path selector (Enterprise /
// Partnerships / Investors / Careers) that reshapes its context. Nothing about
// how you reach us changed; only the room you arrive in. `styles/contact-noema.css`
// re-skins that section for the dark ground.
//
// There is deliberately no preloader curtain — the reference opened on a 0→100
// counter, and those were stripped from divisions and ecosystem on request. The
// page publishes its own intro beat one frame after mount instead.
//
// Inquiry types come VERBATIM from the verified Content Bible. Only the verified
// Hyderabad HQ + "within 24 business hours" promise are shown, together with the
// real email and phone numbers (these were placeholders and hidden until now). Company / role / phone are optional and folded
// into the message so nothing is lost to the contract.
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { contactContent, CONTACT_CHANNELS } from '~~/lib/content/contact'
import { useKnowledgeProduct } from '~/composables/useKnowledgeProduct'
import HeadParticles from '~/components/contact/noema/HeadParticles.vue'
import ContactMap from '~/components/contact/ContactMap.vue'
import NoemaHero from '~/components/contact/noema/NoemaHero.vue'

/** Where the head lives. Same-origin, so the fetch needs no CORS handshake. */
const HEAD_MANIFEST = '/assets/head/points.manifest.json'

/**
 * The intro beat. Everything — the letter cascade, the bottom block, and the
 * head's materialisation scan — hangs off this single delay from mount, so they
 * play as one gesture. Short, because nothing is waiting behind a curtain; the
 * scan additionally can't start before the geometry lands (see HeadParticles).
 */
const HERO_INTRO_DELAY_MS = 260

/** The hero box — what the scene's render gate watches (see HeadParticles). */
const heroEl = ref<HTMLElement | null>(null)

const revealed = ref(false)
let introTimer: ReturnType<typeof setTimeout> | undefined
onMounted(() => {
  // A timer, deliberately NOT a rAF: a page opened into a BACKGROUND tab gets no
  // animation frames at all, and gating the headline and CTAs on one would leave
  // the hero blank until the visitor switched to it. The entrances still animate
  // from their "out" state because CSS paints that state on the first render —
  // there is nothing a frame callback would add here. (The canvas is different:
  // it *should* stay dark while hidden, and starts its scan on the first visible
  // frame instead.)
  introTimer = setTimeout(() => { revealed.value = true }, HERO_INTRO_DELAY_MS)
})
onBeforeUnmount(() => clearTimeout(introTimer))

const { $lenis } = useNuxtApp()
/** The hero's primary CTA — carry the visitor down to the real form. */
function startConversation() {
  const target = document.getElementById('form')
  if (!target) return
  const lenis = $lenis as { scrollTo?: (t: Element, o?: object) => void } | undefined
  if (lenis?.scrollTo) lenis.scrollTo(target, { offset: -24 })
  else target.scrollIntoView({ behavior: 'smooth' })
}

useKnowledgeProduct(contactContent)

const inquiryTypes = contactContent.architecture.components.map(c => c.name)

/* The Content Bible answers "how quickly can I expect a response?" with more than
   the headline number — the second sentence is the honest part, so it is shown
   under the promise rather than dropped. Sliced from that answer so the two can
   never drift apart. */
const responseNote = contactContent.faqs[0]!.answer.split('. ').slice(1).join('. ')

// Mission-control paths — each reshapes the form context.
interface Path { key: string, label: string, inquiry: string, lead: string, expect: string[], link?: { to: string, label: string } }
const paths: Path[] = [
  { key: 'enterprise', label: 'Enterprise', inquiry: 'General inquiries',
    lead: 'Deploy the Intelligence Loop across your operations.',
    expect: ['A technical discovery call', 'Architecture and use-case scoping', 'A pilot pathway'] },
  { key: 'partnerships', label: 'Partnerships', inquiry: 'Partnership',
    lead: 'For integrators, technology and channel partners.',
    expect: ['A partnership-fit review', 'Integration and go-to-market alignment', 'An enablement plan'] },
  { key: 'investors', label: 'Investors', inquiry: 'Investor relations',
    lead: 'For investment and funding conversations.',
    expect: ['An introduction to the thesis', 'Materials shared on request', 'A founder conversation'],
    link: { to: '/investors', label: 'View the investment thesis' } },
  { key: 'careers', label: 'Careers', inquiry: 'General inquiries',
    lead: 'Build the intelligence layer with us.',
    expect: ['A review of your background', 'A note when a role fits', 'An invite to the talent network'],
    link: { to: '/careers', label: 'See disciplines and roles' } },
]
const activePath = ref(0)
const path = computed(() => paths[activePath.value]!)

const form = ref({ name: '', email: '', company: '', role: '', inquiryType: paths[0]!.inquiry, message: '', phone: '' })
const company_url = ref('')
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const errorMsg = ref('')
const attempted = ref(false)

// Selecting a path presets the inquiry type (user can still override).
watch(activePath, () => { form.value.inquiryType = path.value.inquiry })

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const errors = computed(() => ({
  name: !form.value.name.trim(),
  email: !form.value.email.trim() || !EMAIL_RE.test(form.value.email.trim()),
  message: !form.value.message.trim(),
}))
const isValid = computed(() => !errors.value.name && !errors.value.email && !errors.value.message)

const FORMSUBMIT = 'https://formsubmit.co/ajax/contact@svaratechfusion.com'

async function submit() {
  attempted.value = true
  errorMsg.value = ''
  if (!isValid.value) return
  // Also the duplicate-submission guard: the button is :disabled on 'sending'.
  status.value = 'sending'

  // FormData, built explicitly from the reactive model rather than from the form
  // element. That is deliberate: `new FormData(formEl)` would need a `name` on
  // every input, and adding those would mean editing the template. Naming the
  // keys here reaches the same email with the markup untouched.
  const fd = new FormData()
  fd.append('name', form.value.name.trim())
  fd.append('email', form.value.email.trim())
  fd.append('company', form.value.company.trim())
  fd.append('role', form.value.role.trim())
  fd.append('inquiry_type', form.value.inquiryType)
  fd.append('phone', form.value.phone.trim())
  fd.append('message', form.value.message.trim())
  // Which of the four paths the visitor came through — context the reader wants.
  fd.append('path', path.value.label)

  fd.append('_subject', 'New SVARA Website Enquiry')
  fd.append('_template', 'table')
  // Replying to the notification answers the visitor, not FormSubmit.
  fd.append('_replyto', form.value.email.trim())
  // Required, not optional: without it FormSubmit interrupts with its own captcha
  // page, which would replace the success screen this page already owns.
  fd.append('_captcha', 'false')
  // The page's existing hidden field, handed to FormSubmit's own honeypot so the
  // bot trap keeps working now that the server route is gone.
  fd.append('_honey', company_url.value)

  try {
    const res = await fetch(FORMSUBMIT, {
      method: 'POST',
      body: fd,
      headers: { Accept: 'application/json' },
    })
    const data = await res.json().catch(() => null) as { success?: string | boolean, message?: string } | null
    // FormSubmit returns `success` as the STRING "true", so a truthiness check on
    // it alone would also pass for "false". Compare against both forms.
    const ok = res.ok && (data?.success === true || String(data?.success) === 'true')
    if (!ok) throw new Error(data?.message || `Submission failed (${res.status})`)
    status.value = 'success'
  }
  catch (e: unknown) {
    status.value = 'error'
    const err = e as { message?: string }
    errorMsg.value = err?.message || 'Something went wrong. Please try again, or email us directly.'
  }
}

// Without JS `revealed` never flips, so every entrance would sit at its "out"
// state forever. This lands them instead. It goes through the head rather than
// the template on purpose: Vue's compiler strips <style> out of a component
// template, so the same block written inline renders an EMPTY <noscript>.
useHead({
  noscript: [{
    innerHTML: '<style>.nmh__g,.nmo__lead,.nmo__card{opacity:1!important;transform:none!important;filter:none!important}</style>',
  }],
})

useSeoMeta({
  title: 'Contact | SVARA — Begin, then build',
  description: contactContent.metadata.description,
})
</script>

<template>
  <div class="contact-page">
    <!-- HERO — one viewport, holding only the overlay. The scene itself is the
         fixed layer below, so the sections flow up over it. -->
    <section ref="heroEl" class="contact-page__hero">
      <NoemaHero
        :revealed="revealed"
        location="Hyderabad, India"
        response="Response within 24 business hours"
        @start="startConversation"
      />
    </section>

    <!-- THE SCENE — fixed at z-index -1 (site background level), so it sits
         behind every section AND the footer. Declared after the hero so the
         `heroEl` ref is populated by the time HeadParticles mounts and reads it. -->
    <div class="contact-page__scene" aria-hidden="true">
      <HeadParticles
        :manifest-src="HEAD_MANIFEST"
        :intro-delay="HERO_INTRO_DELAY_MS"
        :gate="heroEl"
      />
    </div>

    <!-- the transmission console — unchanged markup and behaviour, re-skinned
         for the dark ground by styles/contact-noema.css -->
    <div class="svara-home contact-page__body">
    <!-- FORM — the path selector drives it -->
    <section id="form" class="co-form-sec hx-section">
      <div class="hx-container">
        <div v-reveal class="co-paths" role="tablist" aria-label="Contact paths">
          <button
            v-for="(p, i) in paths" :key="p.key" class="co-path" :class="{ 'is-active': activePath === i }"
            role="tab" :aria-selected="activePath === i" @click="activePath = i"
          >
            <span class="co-path__k">{{ p.label }}</span>
            <span class="co-path__lead">{{ p.lead }}</span>
            <span class="co-path__dot" />
          </button>
        </div>
      </div>
      <div class="hx-container co-grid">
        <aside class="co-aside">
          <!-- The Content Bible's own reach-us statement. It was defined in
               contactContent.architecture.overview and never rendered; it belongs
               at the head of this column, which is exactly what it describes. -->
          <p class="co-aside__lede">{{ contactContent.architecture.overview }}</p>

          <Transition name="co-aside-swap" mode="out-in">
            <div :key="activePath">
              <span class="hx-mono-label co-aside__ch"><span class="hx-dot" /> {{ path.label }} channel</span>
              <h2 class="co-aside__title">{{ path.lead }}</h2>
              <span class="hx-mono-label co-aside__ex-h">What to expect</span>
              <ul class="co-aside__ex">
                <li v-for="e in path.expect" :key="e">{{ e }}</li>
              </ul>
              <NuxtLink v-if="path.link" :to="path.link.to" class="hx-link co-aside__link">
                {{ path.link.label }}
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M0 5h14M14 5l-4-4M14 5l-4 4" stroke="currentColor" stroke-width="1.3" /></svg>
              </NuxtLink>
            </div>
          </Transition>
          <dl class="co-aside__meta">
            <div><dt class="hx-mono-label">Headquarters</dt><dd>{{ CONTACT_CHANNELS.headquarters }}</dd></div>
            <div>
              <dt class="hx-mono-label">Email</dt>
              <dd><a class="co-aside__ch-link" :href="`mailto:${CONTACT_CHANNELS.email}`">{{ CONTACT_CHANNELS.email }}</a></dd>
            </div>
            <div>
              <dt class="hx-mono-label">Phone</dt>
              <dd class="co-aside__phones">
                <a v-for="ph in CONTACT_CHANNELS.phones" :key="ph.href" class="co-aside__ch-link" :href="`tel:${ph.href}`">{{ ph.display }}</a>
              </dd>
            </div>
            <div>
              <dt class="hx-mono-label">Response</dt>
              <!-- The bare promise was already here; the qualifier is the Content
                   Bible's own FAQ answer, which keeps it honest when a message
                   needs coordination rather than implying every reply is instant. -->
              <dd>
                Within 24 business hours
                <span class="co-aside__note">{{ responseNote }}</span>
              </dd>
            </div>
          </dl>

          <ContactMap />

          <!-- relatedProducts from the Content Bible — defined, never surfaced -->
          <nav class="co-aside__more" aria-label="Related">
            <NuxtLink v-for="r in contactContent.relatedProducts" :key="r.url" :to="r.url">
              {{ r.name }} <span aria-hidden="true">&#8594;</span>
            </NuxtLink>
          </nav>
        </aside>

        <div class="co-panel sv-frame">
          <span class="hx-pin tl" /><span class="hx-pin tr" /><span class="hx-pin bl" /><span class="hx-pin br" />
          <span class="co-panel__code hx-mono">TRANSMISSION · {{ path.label.toUpperCase() }}</span>

          <Transition name="co-swap" mode="out-in">
            <div v-if="status === 'success'" key="success" class="co-success">
              <span class="co-success__mark"><svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M6 13.5L11 18L20 8" stroke="var(--sig)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg></span>
              <h3 class="co-success__title">Message received.</h3>
              <p class="co-success__body">Thank you — we'll be in touch within 24 business hours.</p>
            </div>

            <form v-else key="form" class="co-form" novalidate @submit.prevent="submit">
              <div class="co-row">
                <label class="co-field">
                  <span class="co-label">Name <i>*</i></span>
                  <input v-model="form.name" type="text" autocomplete="name" class="co-input" :class="{ 'is-error': attempted && errors.name }" placeholder="Your name">
                </label>
                <label class="co-field">
                  <span class="co-label">Work email <i>*</i></span>
                  <input v-model="form.email" type="email" autocomplete="email" class="co-input" :class="{ 'is-error': attempted && errors.email }" placeholder="you@company.com">
                </label>
              </div>
              <div class="co-row">
                <label class="co-field">
                  <span class="co-label">Company</span>
                  <input v-model="form.company" type="text" autocomplete="organization" class="co-input" placeholder="Company name">
                </label>
                <label class="co-field">
                  <span class="co-label">Role</span>
                  <input v-model="form.role" type="text" autocomplete="organization-title" class="co-input" placeholder="Your role">
                </label>
              </div>
              <div class="co-row">
                <label class="co-field">
                  <span class="co-label">Inquiry type</span>
                  <select v-model="form.inquiryType" class="co-input co-select">
                    <option v-for="t in inquiryTypes" :key="t" :value="t">{{ t }}</option>
                  </select>
                </label>
                <label class="co-field">
                  <span class="co-label">Phone <i class="co-opt">optional</i></span>
                  <input v-model="form.phone" type="tel" autocomplete="tel" class="co-input" placeholder="+91 …">
                </label>
              </div>
              <label class="co-field">
                <span class="co-label">Message <i>*</i></span>
                <textarea v-model="form.message" rows="5" class="co-input co-textarea" :class="{ 'is-error': attempted && errors.message }" placeholder="What are you trying to build?" />
              </label>

              <div class="co-hp" aria-hidden="true">
                <label>Company URL<input v-model="company_url" type="text" tabindex="-1" autocomplete="off"></label>
              </div>

              <p v-if="attempted && !isValid" class="co-formerror">Please complete the required fields with a valid email.</p>
              <p v-if="status === 'error'" class="co-formerror">{{ errorMsg }}</p>

              <button type="submit" class="hx-btn hx-btn--primary co-submit" :disabled="status === 'sending'">
                {{ status === 'sending' ? 'Transmitting…' : 'Send message' }}
                <svg v-if="status !== 'sending'" width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M0 5h14M14 5l-4-4M14 5l-4 4" stroke="currentColor" stroke-width="1.3" /></svg>
              </button>
            </form>
          </Transition>
        </div>
      </div>
    </section>
    </div>
  </div>
</template>

<style scoped>
/* The path selector reshapes the form context. */
.co-paths { margin: 0 0 clamp(40px, 5vw, 68px); display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.co-path { position: relative; text-align: left; padding: 22px 20px; background: rgba(255,255,255,0.5); border: 1px solid var(--sv-border-lavender); border-radius: 2px; clip-path: polygon(0 12px, 12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%); cursor: pointer; transition: border-color var(--motion-fast) var(--ease-smooth), background var(--motion-fast), transform var(--motion-medium) var(--ease-out); display: flex; flex-direction: column; gap: 8px; }
.co-path:hover { border-color: var(--sv-border-lavender-hover); transform: translateY(-2px); }
.co-path.is-active { border-color: var(--sig); background: rgba(63,111,176,0.06); }
.co-path__k { font-size: 18px; font-weight: 600; letter-spacing: -0.015em; color: var(--ink-primary); }
.co-path__lead { font-size: 13px; line-height: 1.45; color: var(--ink-secondary); }
.co-path__dot { position: absolute; top: 16px; right: 16px; width: 8px; height: 8px; border-radius: 50%; background: transparent; border: 1px solid var(--sv-border-lavender-strong); transition: background var(--motion-fast); }
.co-path.is-active .co-path__dot { background: var(--sig); border-color: var(--sig); box-shadow: 0 0 0 4px rgba(63,111,176,0.14); }

.co-grid { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: clamp(32px, 5vw, 72px); align-items: start; }
.co-aside { position: sticky; top: calc(var(--nav-height) + 24px); }
.co-aside__ch { display: inline-flex; align-items: center; gap: 8px; color: var(--ink-muted); }
.co-aside__title { margin: 16px 0 0; font-size: clamp(24px, 2.8vw, 36px); font-weight: 600; letter-spacing: -0.028em; line-height: 1.1; color: var(--ink-primary); }
.co-aside__ex-h { display: block; margin: 28px 0 0; color: var(--ink-muted); }
.co-aside__ex { list-style: none; margin: 12px 0 0; padding: 0; }
.co-aside__ex li { position: relative; padding: 9px 0 9px 20px; font-size: 15px; color: var(--ink-primary); border-bottom: 1px solid var(--sv-border-subtle); }
.co-aside__ex li::before { content: ""; position: absolute; left: 0; top: 16px; width: 6px; height: 6px; border-radius: 50%; background: var(--sig); }
.co-aside__link { margin-top: 20px; }
.co-aside__meta { margin: 34px 0 0; display: flex; flex-direction: column; gap: 18px; padding-top: 26px; border-top: 1px solid var(--sv-border-lavender); }
.co-aside__meta dt { color: var(--ink-muted); }
.co-aside__meta dd { margin: 6px 0 0; font-size: 16px; font-weight: 500; color: var(--ink-primary); }
.co-aside__phones { display: flex; flex-direction: column; gap: 4px; }
/* `.svara-home :where(a)` strips colour and underline — restore the affordance */
.co-aside__ch-link { color: var(--ink-primary); text-decoration: underline; text-underline-offset: 3px; }
.co-aside__ch-link:hover { color: var(--sig); }
.co-aside-swap-enter-active, .co-aside-swap-leave-active { transition: opacity var(--motion-medium) var(--ease-out), transform var(--motion-medium) var(--ease-out); }
.co-aside-swap-enter-from { opacity: 0; transform: translateY(8px); } .co-aside-swap-leave-to { opacity: 0; transform: translateY(-6px); }

.co-panel { position: relative; padding: clamp(30px, 4vw, 50px); }
.co-panel__code { position: absolute; top: 14px; right: 18px; font-size: 9px; letter-spacing: 0.14em; color: var(--ink-muted); }
.co-form { display: flex; flex-direction: column; gap: 20px; }
.co-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.co-field { display: flex; flex-direction: column; gap: 9px; }
.co-label { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-secondary); display: inline-flex; gap: 6px; align-items: baseline; }
.co-label i { font-style: normal; color: var(--sig); }
.co-label .co-opt { color: var(--ink-muted); font-size: 10px; letter-spacing: 0.1em; }
.co-input { width: 100%; box-sizing: border-box; font-family: var(--font-sans); font-size: 15px; color: var(--ink-primary); background: rgba(255,255,255,0.6); border: 1px solid var(--sv-border-lavender); border-radius: 10px; padding: 13px 15px; transition: border-color var(--motion-fast) var(--ease-smooth), box-shadow var(--motion-fast) var(--ease-smooth); }
.co-input::placeholder { color: var(--ink-muted); }
.co-input:hover { border-color: var(--sv-border-lavender-hover); }
.co-input:focus { outline: none; border-color: var(--sig); box-shadow: 0 0 0 3px rgba(63,111,176,0.14); }
.co-input.is-error { border-color: #c0563f; box-shadow: 0 0 0 3px rgba(192,86,63,0.12); }
.co-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236b7280' stroke-width='1.3'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 15px center; padding-right: 40px; cursor: pointer; }
.co-textarea { resize: vertical; min-height: 120px; line-height: 1.5; }
.co-hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
.co-formerror { margin: 0; font-size: 13.5px; color: #c0563f; }
.co-submit { align-self: flex-start; margin-top: 4px; }
.co-submit:disabled { opacity: 0.6; cursor: default; }

.co-success { text-align: center; padding: clamp(28px, 4vw, 56px) 0; display: flex; flex-direction: column; align-items: center; }
.co-success__mark { width: 56px; height: 56px; display: grid; place-items: center; border-radius: 50%; border: 1px solid var(--sv-border-lavender-strong); background: rgba(63,111,176,0.06); }
.co-success__title { margin: 22px 0 0; font-size: clamp(24px, 3vw, 36px); font-weight: 600; letter-spacing: -0.025em; color: var(--ink-primary); }
.co-success__body { margin: 12px 0 0; max-width: 40ch; font-size: 16px; line-height: 1.6; color: var(--ink-secondary); }
.co-swap-enter-active, .co-swap-leave-active { transition: opacity var(--motion-medium) var(--ease-out), transform var(--motion-medium) var(--ease-out); }
.co-swap-enter-from { opacity: 0; transform: translateY(10px); } .co-swap-leave-to { opacity: 0; transform: translateY(-8px); }

@media (max-width: 1024px) {
  .co-paths { grid-template-columns: repeat(2, 1fr); }
  .co-grid { grid-template-columns: 1fr; gap: 32px; }
  .co-aside { position: static; }
}
@media (max-width: 560px) {
  .co-paths { grid-template-columns: 1fr; }
  .co-row { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .co-swap-enter-active, .co-swap-leave-active, .co-aside-swap-enter-active, .co-aside-swap-leave-active { transition: opacity var(--motion-fast) linear; }
}
</style>
