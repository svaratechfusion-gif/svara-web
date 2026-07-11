<script setup lang="ts">
import { edgeComputingContent } from "~~/lib/content/edge-computing"
import { computerVisionContent } from "~~/lib/content/computer-vision"
import { nlpContent } from "~~/lib/content/nlp"
import { sensorFusionContent } from "~~/lib/content/sensor-fusion"
import { swarmIntelligenceContent } from "~~/lib/content/swarm-intelligence"
import { useKnowledgeProduct } from "~/composables/useKnowledgeProduct"

const route = useRoute()
const slug = route.params.slug as string

const contentMap: Record<string, object> = {
  "edge-computing": edgeComputingContent,
  "computer-vision": computerVisionContent,
  nlp: nlpContent,
  "sensor-fusion": sensorFusionContent,
  "swarm-intelligence": swarmIntelligenceContent,
}

const content = contentMap[slug]
if (!content) throw createError({ statusCode: 404, message: "Knowledge product not found" })

// @ts-expect-error — content map is typed at the source
useKnowledgeProduct(content)
</script>

<template>
  <KnowledgeProductLayout v-if="content" :content="content" />
</template>
