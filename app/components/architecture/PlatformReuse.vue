<script setup lang="ts">
// PLATFORM REUSE ARCHITECTURE — visualize shared components (Auth, Billing,
// AI Backbone, etc.) reused across every platform. A grid of shared
// components (left) maps to a grid of platforms (top); intersecting dots
// demonstrate reuse. Hovering a component highlights its reuse across all
// platforms. Reinforces that all platforms share one architecture, not
// isolated stacks.
import { ref } from 'vue'
import { SHARED_COMPONENTS, SHARED_PLATFORMS } from '~/utils/architecture'

const active = ref<number | null>(null)
</script>

<template>
  <section class="pr" @mouseleave="active = null">
    <div class="pr__head">
      <p class="pr__eyebrow">Platform Reuse Architecture</p>
      <h2 class="pr__title">Eight shared components. One ecosystem.</h2>
      <p class="pr__sub">Every SVARA platform is built on the same shared backbone — authentication, billing, the AI backbone, the API gateway, and four more — so capability compounds rather than fragments.</p>
    </div>

    <div class="pr__grid-wrap">
      <table class="pr__grid" role="table">
        <thead>
          <tr>
            <th class="pr__corner" />
            <th v-for="p in SHARED_PLATFORMS" :key="p" class="pr__col-head">{{ p }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(c, ci) in SHARED_COMPONENTS" :key="c">
            <th class="pr__row-head" :class="{ 'is-hot': active === ci }">
              <span class="pr__row-name">{{ c }}</span>
            </th>
            <td
              v-for="p in SHARED_PLATFORMS" :key="`${c}-${p}`"
              class="pr__cell"
              :class="{ 'is-hot': active === ci, 'is-on': active === ci }"
              @mouseenter="active = ci"
            >
              <span class="pr__dot" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.pr { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.pr__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.pr__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.pr__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.pr__sub { margin: var(--space-5) 0 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.pr__grid-wrap { max-width: 1100px; margin: var(--space-12) auto 0; overflow-x: auto; }
.pr__grid { border-collapse: separate; border-spacing: 0; width: 100%; }
.pr__corner { width: 140px; background: transparent; }
.pr__col-head { padding: 0 var(--space-3) var(--space-5); font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-text-faint); text-align: center; min-width: 88px; }
.pr__row-head { padding: var(--space-3) 0; text-align: right; vertical-align: middle; transition: color var(--motion-medium) var(--ease-smooth); }
.pr__row-name { font-size: 13px; font-weight: var(--weight-semibold); color: var(--color-text-secondary); white-space: nowrap; }
.pr__row-head.is-hot .pr__row-name { color: var(--color-ink-strong); }
.pr__cell { padding: var(--space-3); text-align: center; vertical-align: middle; }
.pr__dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: rgba(16, 42, 91, 0.16); transition: background var(--motion-medium) var(--ease-out), box-shadow var(--motion-medium) var(--ease-out), transform var(--motion-medium) var(--ease-out); }
.pr__cell.is-on .pr__dot { background: var(--color-accent); box-shadow: 0 0 0 4px rgba(47, 127, 230, 0.14); }
.pr__cell.is-hot { cursor: pointer; }

@media (max-width: 768px) { .pr__grid-wrap { padding-bottom: var(--space-4); } .pr__corner { width: 100px; } .pr__col-head { min-width: 64px; font-size: 8.5px; } .pr__row-name { font-size: 11px; } }
</style>