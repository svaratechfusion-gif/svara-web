<script setup lang="ts">
import { platformContent } from "~~/lib/content/platform"
import { useKnowledgeProduct } from "~/composables/useKnowledgeProduct"

useKnowledgeProduct(platformContent)
</script>

<template>
  <KnowledgeProductLayout :content="platformContent" />
</template>
