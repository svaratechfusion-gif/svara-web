<script setup lang="ts">
import { termsContent } from "~~/lib/content/terms"
import { useKnowledgeProduct } from "~/composables/useKnowledgeProduct"

useKnowledgeProduct(termsContent)
</script>

<template>
  <KnowledgeProductLayout :content="termsContent" />
</template>
