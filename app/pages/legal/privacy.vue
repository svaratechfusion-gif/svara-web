<script setup lang="ts">
// PRIVACY POLICY — the full published text (lib/content/privacy.ts), rendered by
// the long-form legal renderer. It previously used KnowledgeProductLayout, whose
// section headings read "Architecture" / "Use Cases" / "ROI", over a four-bullet
// summary rather than the policy itself.
import { privacyPolicy } from '~~/lib/content/privacy'
import { useLegalDocument } from '~/composables/useLegalDocument'
import LegalDoc from '~/components/legal/LegalDoc.vue'

useLegalDocument(privacyPolicy)
</script>

<template>
  <div class="privacy-page">
    <LegalDoc :doc="privacyPolicy" />
  </div>
</template>
