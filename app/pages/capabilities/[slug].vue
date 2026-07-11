<script setup lang="ts">
import { observeContent } from "~~/lib/content/observe"
import { understandContent } from "~~/lib/content/understand"
import { predictContent } from "~~/lib/content/predict"
import { coordinateContent } from "~~/lib/content/coordinate"
import { improveContent } from "~~/lib/content/improve"
import { useKnowledgeProduct } from "~/composables/useKnowledgeProduct"

const route = useRoute()
const slug = route.params.slug as string

const contentMap: Record<string, object> = {
  observe: observeContent,
  understand: understandContent,
  predict: predictContent,
  coordinate: coordinateContent,
  improve: improveContent,
}

const content = contentMap[slug]
if (!content) throw createError({ statusCode: 404, message: "Knowledge product not found" })

// @ts-expect-error — content map is typed at the source
useKnowledgeProduct(content)
</script>

<template>
  <KnowledgeProductLayout v-if="content" :content="content" />
</template>
