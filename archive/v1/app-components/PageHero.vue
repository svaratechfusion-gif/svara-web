<script setup lang="ts">
import { ArrowLeft } from "@lucide/vue";

// Consistent page hero — large heading, optional sub-text, optional breadcrumb.
withDefaults(
  defineProps<{
    title: string;
    description?: string;
    breadcrumb?: { label: string; to: string };
  }>(),
  {}
);
</script>

<template>
  <section class="flex min-h-[60svh] flex-col justify-center px-8 pb-24 pt-32">
    <div class="mx-auto w-full max-w-7xl">
      <NuxtLink
        v-if="breadcrumb"
        :to="breadcrumb.to"
        class="link-explore mb-4"
      >
        <ArrowLeft :size="16" />
        {{ breadcrumb.label }}
      </NuxtLink>
      <h1 class="text-hero">{{ title }}</h1>
      <p
        v-if="description"
        class="text-body mt-6 max-w-2xl"
      >
        {{ description }}
      </p>
    </div>
  </section>
</template>


