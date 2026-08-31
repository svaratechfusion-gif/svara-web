<script setup lang="ts">
// TERMS OF SERVICE — the full published text (lib/content/terms.ts), rendered by
// the shared long-form legal renderer. It previously used KnowledgeProductLayout
// over a four-bullet summary.
import { termsOfService } from '~~/lib/content/terms'
import { useLegalDocument } from '~/composables/useLegalDocument'
import LegalDoc from '~/components/legal/LegalDoc.vue'

useLegalDocument(termsOfService)
</script>

<template>
  <div class="terms-page">
    <LegalDoc :doc="termsOfService" />
  </div>
</template>
