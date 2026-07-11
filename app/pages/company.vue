<script setup lang="ts">
import { companyContent } from "~~/lib/content/company"
import { useKnowledgeProduct } from "~/composables/useKnowledgeProduct"

useKnowledgeProduct(companyContent)
</script>

<template>
  <KnowledgeProductLayout :content="companyContent" />
</template>
