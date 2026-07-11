<script setup lang="ts">
import { leadershipContent } from "~~/lib/content/leadership"
import { useKnowledgeProduct } from "~/composables/useKnowledgeProduct"

useKnowledgeProduct(leadershipContent)
</script>

<template>
  <KnowledgeProductLayout :content="leadershipContent" />
</template>