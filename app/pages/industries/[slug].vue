<script setup lang="ts">
import { INDUSTRIES } from "~/utils/industries";
import { ArrowLeft } from "@lucide/vue";

const route = useRoute();
const slug = route.params.slug as string;

const industry = INDUSTRIES.find(
  (i) => i.name.toLowerCase().replace(/\s+/g, "-") === slug
);

if (!industry) {
  throw createError({ statusCode: 404, message: "Industry not found" });
}

useSeoMeta({
  title: `SVARA TechFusion — ${industry.name}`,
  description: industry.copy,
});
</script>

<template>
  <div class="page-industry-detail">
    <section class="section-hero">
      <NuxtLink to="/industries" class="link-explore mb-4">
        <ArrowLeft :size="16" />
        All Industries
      </NuxtLink>
      <h1 class="text-hero">{{ industry?.name }}</h1>
      <p class="text-body mt-6 max-w-2xl">{{ industry?.copy }}</p>
    </section>

    <section class="section-content">
      <div class="card-glass max-w-3xl">
        <h2 class="text-h3">Challenges</h2>
        <p class="text-body mt-2" style="color: var(--color-muted)">
          The specific operational challenges {{ industry?.name }} faces.
        </p>
      </div>
      <div class="card-glass mt-6 max-w-3xl">
        <h2 class="text-h3">Use Cases</h2>
        <p class="text-body mt-2" style="color: var(--color-muted)">
          How SVARA addresses {{ industry?.name }} use cases.
        </p>
      </div>
      <div class="card-glass mt-6 max-w-3xl">
        <h2 class="text-h3">ROI</h2>
        <p class="text-body mt-2" style="color: var(--color-muted)">
          Measurable outcomes from {{ industry?.name }} deployments.
        </p>
      </div>
    </section>
  </div>
</template>


