<script setup lang="ts">
import { dpiitContent } from "~~/lib/content/dpiit"
import { useKnowledgeProduct } from "~/composables/useKnowledgeProduct"

useKnowledgeProduct(dpiitContent)
</script>

<template>
  <KnowledgeProductLayout :content="dpiitContent" />
</template>