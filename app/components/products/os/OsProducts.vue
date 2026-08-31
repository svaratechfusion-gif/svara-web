<script setup lang="ts">
// OS · PRODUCT DASHBOARDS — the centerpiece. A tab rail across all ten SVARA
// products; selecting one swaps the live Mission Control dashboard in place. Each
// dashboard is built from the product's real capabilities (svara-os.ts).
import { ref } from 'vue'
import { SVARA_OS } from '~/utils/svara-os'
import MissionControl from '~/components/products/os/MissionControl.vue'

const active = ref(0)
</script>

<template>
  <section id="os-products" class="op">
    <div class="op__inner">
      <header v-reveal class="op__head">
        <p class="op__eyebrow px-mono">Ten Enterprise Product Dashboards</p>
        <h2 class="op__title">Every product is a <span class="px-serif">live operating system.</span></h2>
        <p class="op__lead">Ten flagship platforms, one shared intelligence backbone. Select any product to open its mission-control dashboard — built from its real capabilities.</p>
      </header>

      <div v-reveal="{ delay: 0.06 }" class="op__tabs" role="tablist" aria-label="SVARA products">
        <button
          v-for="(p, i) in SVARA_OS" :key="p.id" class="op__tab" :class="{ 'is-on': active === i }"
          role="tab" :aria-selected="active === i" type="button" @click="active = i"
        >
          <span class="op__tab-n hx-mono">{{ p.n }}</span>
          <span class="op__tab-name">{{ p.short }}</span>
          <span class="op__tab-cat hx-mono">{{ p.category }}</span>
        </button>
      </div>

      <div v-reveal="{ delay: 0.1 }" class="op__stage">
        <MissionControl :key="SVARA_OS[active]!.id" :product="SVARA_OS[active]!" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.op { padding: clamp(64px, 9vw, 120px) 24px; }
.op__inner { max-width: 1240px; margin: 0 auto; }
.op__head { max-width: 60ch; margin-bottom: 32px; }
.op__eyebrow { margin: 0 0 14px; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--px-muted); }
.op__title { margin: 0; font-size: clamp(28px, 4.2vw, 50px); line-height: 1.06; letter-spacing: -0.025em; color: var(--px-navy); font-weight: 500; }
.op__title .px-serif { font-weight: 400; }
.op__lead { margin: 18px 0 0; max-width: 56ch; font-size: clamp(15px, 1.4vw, 17px); line-height: 1.6; color: var(--px-ink); }

.op__tabs { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 20px; scrollbar-width: thin; }
.op__tab { flex-shrink: 0; display: flex; flex-direction: column; gap: 3px; text-align: left; padding: 11px 16px; border-radius: 2px; background: #fff; border: 1px solid var(--px-line); cursor: pointer; transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s; min-width: 128px; }
.op__tab:hover { transform: translateY(-2px); box-shadow: 0 8px 24px -12px rgba(16,33,74,0.3); }
.op__tab.is-on { border-color: var(--px-navy); box-shadow: 0 0 0 1px var(--px-navy), 0 10px 30px -14px rgba(16,33,74,0.4); }
.op__tab-n { font-size: 10px; color: var(--px-blue); letter-spacing: 0.06em; }
.op__tab-name { font-size: 14px; font-weight: 600; letter-spacing: -0.01em; color: var(--px-navy); white-space: nowrap; }
.op__tab-cat { font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--px-muted); }

.op__stage { position: relative; }
</style>
