<script setup lang="ts">
// COOKIE POLICY — the full published text (lib/content/cookies.ts), rendered by
// the long-form legal renderer rather than KnowledgeProductLayout, whose section
// headings are literally "Architecture" / "Use Cases" / "ROI".
//
// The page also carries the live control: "Manage cookie preferences" opens the
// same console the consent dock opens. Withdrawal has to be as easy as consent,
// so this is one click from the policy that describes it.
import { cookiePolicy } from '~~/lib/content/cookies'
import { useLegalDocument } from '~/composables/useLegalDocument'
import { useConsent, useConsentConsole } from '~/composables/useConsent'
import LegalDoc from '~/components/legal/LegalDoc.vue'

useLegalDocument(cookiePolicy)

const consoleOpen = useConsentConsole()
const { record, rejectAll } = useConsent()

</script>

<template>
  <div class="cookies-page">

    <LegalDoc :doc="cookiePolicy">
      <template #foot>
        <div class="ckp">
          <p class="ckp__k">Your current preferences</p>
          <p class="ckp__v">
            <template v-if="record">
              Analytics {{ record.analytics ? 'on' : 'off' }} ·
              Functional {{ record.functional ? 'on' : 'off' }} ·
              Marketing {{ record.marketing ? 'on' : 'off' }}
            </template>
            <template v-else>
              No choice recorded yet — only strictly necessary cookies are in use.
            </template>
          </p>
          <div class="ckp__actions">
            <button type="button" class="ckp__btn ckp__btn--accent" @click="consoleOpen = true">
              Manage cookie preferences
            </button>
            <!-- Records an explicit refusal rather than erasing the decision:
                 withdrawal is an answer, not the absence of one. -->
            <button v-if="record" type="button" class="ckp__btn" @click="rejectAll">
              Withdraw consent
            </button>
          </div>
        </div>
      </template>
    </LegalDoc>
  </div>
</template>

<style scoped>
.ckp { padding: 22px 24px; border: 1px solid var(--sv-border-lavender, rgba(20, 34, 63, 0.14)); border-radius: 2px; }
.ckp__k { margin: 0 0 6px; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-muted); }
.ckp__v { margin: 0 0 16px; font-size: 13px; line-height: 1.6; color: var(--ink-secondary); }
.ckp__actions { display: flex; flex-wrap: wrap; gap: 8px; }
/* `__btn` is auto-chamfered by svara-controls.css, which also forces
   border-color: transparent — so the outline is an inset shadow. */
.ckp__btn {
  min-height: 40px; padding: 11px 18px;
  font-family: inherit; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
  cursor: pointer; border: 0; background: transparent; color: var(--ink-primary);
  box-shadow: inset 0 0 0 1px var(--sv-border-lavender, rgba(20, 34, 63, 0.18));
  transition: color 180ms ease, box-shadow 180ms ease;
}
.ckp__btn:hover { color: var(--sig, #3f6fb0); box-shadow: inset 0 0 0 1px var(--sig, #3f6fb0); }
.ckp__btn--accent { background: var(--sig, #3f6fb0); color: #fff; box-shadow: none; }
.ckp__btn--accent:hover { color: #fff; filter: brightness(1.08); }
</style>
