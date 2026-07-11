<script setup lang="ts">
import { privacyContent } from "~~/lib/content/privacy"
import { useKnowledgeProduct } from "~/composables/useKnowledgeProduct"

useKnowledgeProduct(privacyContent)
</script>

<template>
  <KnowledgeProductLayout :content="privacyContent" />
</template>
