<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import ProductConsoleMount from '~/components/products/ProductConsoleMount.vue'
import ProductNavigatorMount from '~/components/products/ProductNavigatorMount.vue'
import { PLATFORMS } from '~/utils/platforms'

const CONSOLE_KIND = {
  'Vision AI': 'vision',
  'Drone AI': 'drone',
  'Edge AI': 'edge',
  'Generative & Cognitive AI': 'cognitive',
  'Autonomous AI Agents': 'agents',
  'Digital Twin': 'digital-twin',
  'Unified Business Cloud': 'business-cloud',
  'One AI OS': 'ai-os',
  'Digital Engineering': 'digital-engineering',
  'Growth & PR Tech': 'growth',
} as const

const OPERATION = {
  'Vision AI': 'Manufacturing surveillance command',
  'Drone AI': 'Autonomous fleet operations',
  'Edge AI': 'Distributed inference mesh',
  'Generative & Cognitive AI': 'Knowledge and reasoning operations',
  'Autonomous AI Agents': 'Agent workflow orchestration',
  'Digital Twin': 'Factory synchronization twin',
  'Unified Business Cloud': 'Enterprise transaction cloud',
  'One AI OS': 'AI runtime operating layer',
  'Digital Engineering': 'CAD, simulation, and delivery control',
  'Growth & PR Tech': 'Campaign and market intelligence',
} as const

const DISPLAY_NAME = {
  'Unified Business Cloud': 'Business Cloud',
  'Growth & PR Tech': 'Growth Intelligence',
  'Autonomous AI Agents': 'AI Agents',
} as const

const NAV_LABEL = {
  'Vision AI': 'Vision',
  'Drone AI': 'Drone',
  'Edge AI': 'Edge',
  'Generative & Cognitive AI': 'Cognitive',
  'Autonomous AI Agents': 'Agents',
  'Digital Twin': 'Twin',
  'Unified Business Cloud': 'Business',
  'One AI OS': 'One AI OS',
  'Digital Engineering': 'Engineering',
  'Growth & PR Tech': 'Growth',
} as const

const showcases = PLATFORMS.map((platform, index) => ({
  ...platform,
  index,
  id: platform.name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  displayName: DISPLAY_NAME[platform.name as keyof typeof DISPLAY_NAME] ?? platform.name,
  navLabel: NAV_LABEL[platform.name as keyof typeof NAV_LABEL],
  operation: OPERATION[platform.name as keyof typeof OPERATION],
  kind: CONSOLE_KIND[platform.name as keyof typeof CONSOLE_KIND],
})).filter((platform) => platform.kind)

const activated = ref(new Set<string>())
let observer: IntersectionObserver | null = null

function activate(id: string) {
  if (activated.value.has(id)) return
  activated.value = new Set([...activated.value, id])
}

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) activate((entry.target as HTMLElement).id)
    })
  }, {
    rootMargin: '0px 0px -12% 0px',
    threshold: 0.08,
  })

  showcases.forEach((item) => {
    const section = document.getElementById(item.id)
    if (section) observer?.observe(section)
  })

  const deepLink = window.location.hash.slice(1)
  if (deepLink) activate(deepLink)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section class="plc" aria-labelledby="live-products-title">
    <div class="plc__head">
      <p class="plc__eyebrow">Live Product Operations</p>
      <h2 id="live-products-title" class="plc__title">Watch SVARA operating in real time.</h2>
      <p class="plc__sub">
        Every platform below is rendered as a live enterprise control room: component-built scenes,
        telemetry, event streams, alerts, and system health moving continuously.
      </p>
    </div>

    <div class="plc__journey">
      <aside class="plc__navigator-slot">
        <ProductNavigatorMount
          :items="showcases.map((item) => ({ id: item.id, index: item.index, label: item.navLabel }))"
        />
      </aside>

      <div class="plc__chapters">
        <article
          v-for="item in showcases"
          :id="item.id"
          :key="item.name"
          class="plc-showcase"
          :class="{ 'is-revealed': activated.has(item.id) }"
        >
          <header class="plc-showcase__head">
            <div class="plc-showcase__copy">
              <div class="plc-showcase__meta">
                <span>{{ String(item.index + 1).padStart(2, '0') }}</span>
                <span>{{ item.operation }}</span>
                <span class="plc-showcase__live"><i />LIVE</span>
              </div>
              <h3 class="plc-showcase__title">{{ item.displayName }}</h3>
              <p class="plc-showcase__desc">{{ item.description }}</p>
            </div>

            <div class="plc-showcase__metrics" aria-label="Live product metrics">
              <div
                v-for="metric in item.metrics"
                :key="metric.label"
                class="plc-metric"
              >
                <span class="plc-metric__label">{{ metric.label }}</span>
                <span class="plc-metric__value">{{ metric.value }}</span>
                <span class="plc-metric__track">
                  <span class="plc-metric__fill" :style="{ width: `${metric.fill}%` }" />
                </span>
              </div>
            </div>
          </header>

          <div class="plc-showcase__dashboard">
            <ProductConsoleMount :kind="item.kind" :active="activated.has(item.id)" />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.plc {
  position: relative;
  background: #F8FBFF;
  padding: var(--space-28) var(--container-pad) var(--space-32);
  color: var(--color-text);
}

.plc__head {
  max-width: 880px;
  margin: 0 auto var(--space-10);
  text-align: center;
}

.plc__eyebrow {
  margin: 0 0 var(--space-4);
  font-family: var(--font-mono);
  font-size: var(--type-label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-accent);
}

.plc__title {
  margin: 0;
  font-size: clamp(36px, 5vw, 72px);
  line-height: 1.04;
  font-weight: var(--weight-extrabold);
  color: var(--color-ink-strong);
}

.plc__sub {
  max-width: 720px;
  margin: var(--space-5) auto 0;
  font-size: clamp(16px, 1.4vw, 19px);
  line-height: 1.65;
  color: var(--color-text-secondary);
}

.plc__journey {
  display: grid;
  grid-template-columns: 168px minmax(0, 1fr);
  gap: clamp(28px, 3vw, 52px);
  max-width: var(--container-max);
  margin: 0 auto;
}

.plc__navigator-slot {
  position: sticky;
  top: 108px;
  z-index: 20;
  align-self: start;
}

.plc__navigator-slot :deep(.pn) {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  border: 1px solid rgba(16, 42, 91, 0.1);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 12px 32px rgba(16, 42, 91, 0.06);
  backdrop-filter: blur(18px);
}

.plc__navigator-slot :deep(.pn__eyebrow) {
  padding: 4px 7px 5px;
  font-family: var(--font-mono);
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: var(--color-text-faint);
}

.plc__navigator-slot :deep(.pn__items) {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.plc__navigator-slot :deep(.pn__item) {
  position: relative;
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr) 6px;
  align-items: center;
  gap: 7px;
  width: 100%;
  min-height: 32px;
  padding: 7px;
  overflow: hidden;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  text-align: left;
}

.plc__navigator-slot :deep(.pn__active) {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(47, 127, 230, 0.22);
  border-radius: inherit;
  background: rgba(47, 127, 230, 0.08);
}

.plc__navigator-slot :deep(.pn__index),
.plc__navigator-slot :deep(.pn__label),
.plc__navigator-slot :deep(.pn__pulse) {
  position: relative;
  z-index: 1;
}

.plc__navigator-slot :deep(.pn__index) {
  font-family: var(--font-mono);
  font-size: 8.5px;
  letter-spacing: 0.08em;
  color: var(--color-text-faint);
}

.plc__navigator-slot :deep(.pn__label) {
  min-width: 0;
  overflow: hidden;
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.plc__navigator-slot :deep(.pn__item:hover),
.plc__navigator-slot :deep(.pn__item:focus-visible),
.plc__navigator-slot :deep(.pn__item.is-active) {
  color: var(--color-accent);
  outline: none;
}

.plc__navigator-slot :deep(.pn__pulse) {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(47, 127, 230, 0.12);
}

.plc-showcase {
  margin: 0 0 clamp(124px, 13vw, 188px);
  scroll-margin-top: 120px;
}

.plc-showcase__head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(420px, 0.82fr);
  gap: var(--space-10);
  align-items: end;
  margin-bottom: clamp(28px, 3vw, 46px);
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 620ms var(--ease-smooth), transform 620ms var(--ease-smooth);
}

.plc-showcase__dashboard {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 760ms var(--ease-smooth) 150ms, transform 760ms var(--ease-smooth) 150ms;
}

.plc-showcase.is-revealed .plc-showcase__head,
.plc-showcase.is-revealed .plc-showcase__dashboard {
  opacity: 1;
  transform: translateY(0);
}

.plc-showcase__copy {
  min-width: 0;
}

.plc-showcase__meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: var(--space-4);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-faint);
}

.plc-showcase__live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #D64545;
}

.plc-showcase__live i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #D64545;
  animation: plc-live 1.2s ease-in-out infinite;
}

@keyframes plc-live {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.28; transform: scale(0.82); }
}

.plc-showcase__title {
  margin: 0;
  font-size: clamp(34px, 4.8vw, 64px);
  line-height: 1.05;
  font-weight: var(--weight-extrabold);
  color: var(--color-ink-strong);
}

.plc-showcase__desc {
  max-width: 620px;
  margin: var(--space-4) 0 0;
  font-size: clamp(15px, 1.2vw, 18px);
  line-height: 1.62;
  color: var(--color-text-secondary);
}

.plc-showcase__metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.plc-metric {
  min-width: 0;
  padding: 12px 13px;
  border: 1px solid rgba(16, 42, 91, 0.08);
  border-radius: 10px;
  background: #FFFFFF;
  box-shadow: 0 8px 24px rgba(16, 42, 91, 0.04);
}

.plc-metric__label {
  display: block;
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-faint);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.plc-metric__value {
  display: block;
  margin-top: 5px;
  font-size: 20px;
  font-weight: var(--weight-semibold);
  color: var(--color-ink-strong);
  font-variant-numeric: tabular-nums;
}

.plc-metric__track {
  position: relative;
  display: block;
  height: 4px;
  margin-top: 8px;
  border-radius: 999px;
  background: rgba(16, 42, 91, 0.07);
  overflow: hidden;
}

.plc-metric__fill {
  position: absolute;
  inset: 0 auto 0 0;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--color-accent), var(--color-ink-strong));
  transform-origin: left;
  animation: plc-metric 2.4s ease-in-out infinite alternate;
}

@keyframes plc-metric {
  0% { transform: scaleX(0.92); opacity: 0.72; }
  100% { transform: scaleX(1); opacity: 1; }
}

.plc-showcase:last-child {
  margin-bottom: 0;
}

@media (max-width: 1240px) {
  .plc__journey {
    display: block;
  }

  .plc__navigator-slot {
    top: 74px;
    margin-bottom: clamp(42px, 7vw, 72px);
  }

  .plc__navigator-slot :deep(.pn) {
    flex-direction: row;
    align-items: center;
    gap: 0;
    padding: 7px;
    overflow-x: auto;
  }

  .plc__navigator-slot :deep(.pn__eyebrow) {
    flex: 0 0 auto;
    padding: 0 8px 0 4px;
  }

  .plc__navigator-slot :deep(.pn__items) {
    flex-direction: row;
    gap: 4px;
  }

  .plc__navigator-slot :deep(.pn__item) {
    display: inline-flex;
    width: auto;
    min-height: 31px;
    padding: 7px 9px;
  }

  .plc__navigator-slot :deep(.pn__index) {
    margin-right: 6px;
  }

  .plc-showcase__head {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .plc-showcase__metrics {
    grid-template-columns: repeat(3, minmax(180px, 1fr));
    overflow-x: auto;
    padding-bottom: 2px;
  }
}

@media (max-width: 768px) {
  .plc {
    padding-top: var(--space-20);
  }

  .plc__navigator-slot {
    top: 58px;
    margin-bottom: var(--space-12);
  }

  .plc__navigator-slot :deep(.pn__eyebrow) {
    display: none;
  }

  .plc__navigator-slot :deep(.pn__item) {
    padding: 7px 8px;
  }

  .plc__navigator-slot :deep(.pn__label) {
    font-size: 8.5px;
  }

  .plc-showcase {
    margin-bottom: 104px;
    scroll-margin-top: 108px;
  }

  .plc-showcase__metrics {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .plc-showcase__live i,
  .plc-metric__fill {
    animation: none;
  }

  .plc-showcase__head,
  .plc-showcase__dashboard {
    transition: none;
  }
}
</style>
