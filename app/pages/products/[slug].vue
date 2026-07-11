<script setup lang="ts">
import { visionAiContent } from "~~/lib/content/vision-ai"
import { droneAiContent } from "~~/lib/content/drone-ai"
import { edgeAiContent } from "~~/lib/content/edge-ai"
import { aiAgentsContent } from "~~/lib/content/ai-agents"
import { digitalTwinContent } from "~~/lib/content/digital-twin"
import { businessCloudContent } from "~~/lib/content/business-cloud"
import { aiOsContent } from "~~/lib/content/ai-os"
import { commandCenterContent } from "~~/lib/content/command-center"
import { growthIntelligenceContent } from "~~/lib/content/growth-intelligence"
import { useKnowledgeProduct } from "~/composables/useKnowledgeProduct"

const route = useRoute()
const slug = route.params.slug as string

const contentMap: Record<string, object> = {
  "vision-ai": visionAiContent,
  "drone-ai": droneAiContent,
  "edge-ai": edgeAiContent,
  "ai-agents": aiAgentsContent,
  "digital-twin": digitalTwinContent,
  "business-cloud": businessCloudContent,
  "ai-os": aiOsContent,
  "command-center": commandCenterContent,
  "growth-intelligence": growthIntelligenceContent,
}

const content = contentMap[slug]
if (!content) throw createError({ statusCode: 404, message: "Knowledge product not found" })

// @ts-expect-error — content map is typed at the source
useKnowledgeProduct(content)
</script>

<template>
  <KnowledgeProductLayout v-if="content" :content="content" />
</template>
