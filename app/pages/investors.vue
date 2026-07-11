<script setup lang="ts">
import { investorsContent } from "~~/lib/content/investors"
import { useKnowledgeProduct } from "~/composables/useKnowledgeProduct"

useKnowledgeProduct(investorsContent)
</script>

<template>
  <KnowledgeProductLayout :content="investorsContent" />
</template>
