<script setup lang="ts">
/**
 * OPEN ROLES — an honest empty state. No vacancies are fabricated here; if the
 * company is not hiring for a named position, the page says so and routes to the
 * talent network. The outlined status badge is the reference's own: never filled.
 */
</script>

<template>
  <div id="roles" class="hns__well">
    <span class="hns__label">No open roles</span>
    <h2 class="hns__h2" style="margin-top: 18px">Nothing open right now.</h2>
    <p class="hns__lede">
      We're not actively hiring for a specific position today — but we're always
      interested in exceptional people. Join our talent network and we'll reach
      out when there's a fit.
    </p>
    <div class="hns__actions">
      <NuxtLink to="/contact" class="hns__pill hns__pill--fill">
        Join our talent network <span aria-hidden="true">&#8594;</span>
      </NuxtLink>
    </div>
  </div>
</template>
