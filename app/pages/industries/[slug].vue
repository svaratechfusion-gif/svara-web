<script setup lang="ts">
import { manufacturingContent } from "~~/lib/content/manufacturing"
import { energyContent } from "~~/lib/content/energy"
import { logisticsContent } from "~~/lib/content/logistics"
import { healthcareContent } from "~~/lib/content/healthcare"
import { smartCitiesContent } from "~~/lib/content/smart-cities"
import { retailContent } from "~~/lib/content/retail"
import { constructionContent } from "~~/lib/content/construction"
import { miningContent } from "~~/lib/content/mining"
import { portsContent } from "~~/lib/content/ports"
import { defenseContent } from "~~/lib/content/defense"
import { governmentContent } from "~~/lib/content/government"
import { agricultureContent } from "~~/lib/content/agriculture"
import { useKnowledgeProduct } from "~/composables/useKnowledgeProduct"

const route = useRoute()
const slug = route.params.slug as string

const contentMap: Record<string, object> = {
  manufacturing: manufacturingContent,
  energy: energyContent,
  logistics: logisticsContent,
  healthcare: healthcareContent,
  "smart-cities": smartCitiesContent,
  retail: retailContent,
  construction: constructionContent,
  mining: miningContent,
  ports: portsContent,
  defense: defenseContent,
  government: governmentContent,
  agriculture: agricultureContent,
}

const content = contentMap[slug]
if (!content) throw createError({ statusCode: 404, message: "Knowledge product not found" })

// @ts-expect-error — content map is typed at the source
useKnowledgeProduct(content)
</script>

<template>
  <KnowledgeProductLayout v-if="content" :content="content" />
</template>