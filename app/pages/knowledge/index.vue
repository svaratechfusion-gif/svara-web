<script setup lang="ts">
import { knowledgeHubContent } from "~~/lib/content/knowledge-hub"
import { useKnowledgeProduct } from "~/composables/useKnowledgeProduct"

useKnowledgeProduct(knowledgeHubContent)
</script>

<template>
  <KnowledgeProductLayout :content="knowledgeHubContent" />
</template>
