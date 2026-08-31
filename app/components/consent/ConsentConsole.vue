<script setup lang="ts">
/**
 * ConsentConsole — the granular preferences dialog.
 *
 * This one IS modal: `role="dialog"` + `aria-modal`, focus trapped, Escape
 * closes, focus returns to whatever opened it. It is the only part of the
 * consent layer allowed to lock scroll.
 *
 * z-index 10000 — above the chatbot's 9999 root, or the chat trigger floats over
 * the dialog.
 *
 * Toggles start from the CURRENT record and default to OFF for a first-time
 * visitor: no non-essential category is ever pre-ticked.
 */
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
import { useConsent, useConsentConsole, useConsentTheme, CONSENT_CATEGORIES, type ConsentCategory } from '~/composables/useConsent'

const open = useConsentConsole()
const theme = useConsentTheme()
const { record, commit, acceptAll, rejectAll } = useConsent()

const boxEl = ref<HTMLElement | null>(null)
let opener: HTMLElement | null = null

const CHANNELS: { k: ConsentCategory, name: string, desc: string }[] = [
  { k: 'necessary', name: 'Strictly necessary', desc: 'Required for the website to function — navigation, security, session management and remembering this choice.' },
  { k: 'analytics', name: 'Performance & analytics', desc: 'Help us understand and improve the SVARA experience.' },
  { k: 'functional', name: 'Functional', desc: 'Remember your preferences and settings.' },
  { k: 'marketing', name: 'Marketing', desc: 'Help us measure and improve our communications.' },
]

/** Draft state — nothing is written until the visitor saves. */
const draft = ref<Record<ConsentCategory, boolean>>({
  necessary: true, analytics: false, functional: false, marketing: false,
})

function syncDraft() {
  draft.value = {
    necessary: true,
    analytics: Boolean(record.value?.analytics),
    functional: Boolean(record.value?.functional),
    marketing: Boolean(record.value?.marketing),
  }
}

function close() {
  open.value = false
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') { close(); return }
  if (e.key !== 'Tab' || !boxEl.value) return
  const focusables = boxEl.value.querySelectorAll<HTMLElement>(
    'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')
  if (focusables.length === 0) return
  const first = focusables[0]!
  const last = focusables[focusables.length - 1]!
  const activeEl = document.activeElement
  if (e.shiftKey && activeEl === first) { last.focus(); e.preventDefault() }
  else if (!e.shiftKey && activeEl === last) { first.focus(); e.preventDefault() }
}

function lockScroll(lock: boolean) {
  if (typeof document === 'undefined') return
  document.documentElement.style.overflow = lock ? 'hidden' : ''
}

watch(open, async (isOpen) => {
  if (isOpen) {
    opener = (document.activeElement as HTMLElement) ?? null
    syncDraft()
    lockScroll(true)
    await nextTick()
    boxEl.value?.querySelector<HTMLElement>('button, input')?.focus()
  }
  else {
    lockScroll(false)
    opener?.focus?.()
    opener = null
  }
})

onBeforeUnmount(() => lockScroll(false))

function save() {
  commit({ analytics: draft.value.analytics, functional: draft.value.functional, marketing: draft.value.marketing })
  close()
}
function saveAll() { acceptAll(); close() }
function saveNone() { rejectAll(); close() }

const isLocked = (k: ConsentCategory) => k === 'necessary'
void CONSENT_CATEGORIES
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="cc cc__scrim"
      :data-theme="theme"
      @click.self="close"
      @keydown="onKey"
    >
      <div
        ref="boxEl"
        class="cc__box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cc-console-title"
      >
        <div class="cc__box-head">
          <div>
            <p class="cc__eyebrow"><i aria-hidden="true" />Cookie preferences</p>
            <h2 id="cc-console-title" class="cc__title">Choose what SVARA may use.</h2>
          </div>
          <button type="button" class="cc__x" aria-label="Close cookie preferences" @click="close">
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="1.4" /></svg>
          </button>
        </div>

        <div class="cc__rows">
          <div v-for="c in CHANNELS" :key="c.k" class="cc__row">
            <div class="cc__row-main">
              <p class="cc__row-k">{{ c.name }}</p>
              <p class="cc__row-d">{{ c.desc }}</p>
            </div>
            <span v-if="isLocked(c.k)" class="cc__locked">Always active</span>
            <label v-else class="cc__switch">
              <input v-model="draft[c.k]" type="checkbox" :aria-label="c.name">
              <i aria-hidden="true" />
            </label>
          </div>
        </div>

        <div class="cc__box-foot">
          <button type="button" class="cc__btn" @click="saveNone">Reject non-essential</button>
          <button type="button" class="cc__btn" @click="save">Save preferences</button>
          <button type="button" class="cc__btn cc__btn--accent" @click="saveAll">Accept all</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
